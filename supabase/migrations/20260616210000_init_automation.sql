-- =============================================================================
-- Prima Quote Agent — Part 1: core automation schema
-- Multi-insurer quote retrieval via job queue + local Windows runner.
--
-- Design notes:
--   * Multi-tenant from day one: every business row carries org_id and RLS is
--     scoped by the caller's org. A single brokerage is just one org.
--   * The Windows runner connects with the Supabase SERVICE ROLE key, which
--     bypasses RLS. Authenticated staff (the `authenticated` role) are scoped
--     by the policies below. claim_next_job is SECURITY DEFINER so a future
--     non-service runner role could also call it.
--   * Portal credentials live ONLY in Windows Credential Manager on the runner
--     box — never in this database. insurer_portals.credential_key just NAMES
--     the local credential entry.
-- =============================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Tenancy: organisations + staff profiles
-- -----------------------------------------------------------------------------
create table if not exists public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now()
);

-- One profile per auth user, linking them to an org.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  org_id      uuid not null references public.organizations (id) on delete restrict,
  full_name   text,
  created_at  timestamptz not null default now()
);

create index if not exists profiles_org_id_idx on public.profiles (org_id);

-- Returns the caller's org_id. SECURITY DEFINER so it can read profiles without
-- being blocked by (or recursing into) the RLS policies that depend on it.
create or replace function public.auth_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id from public.profiles where id = auth.uid();
$$;

-- -----------------------------------------------------------------------------
-- CRM source data: policy / risk records the agent quotes against.
-- Minimal here; the real CRM extends this. enqueue resolves policy_ref -> risk_data.
-- -----------------------------------------------------------------------------
create table if not exists public.policies (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references public.organizations (id) on delete cascade,
  policy_ref    text not null,
  product_type  text,
  risk_data     jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (org_id, policy_ref)
);

create index if not exists policies_org_ref_idx on public.policies (org_id, policy_ref);

-- -----------------------------------------------------------------------------
-- insurer_portals: one row per insurer web portal the runner can drive.
-- -----------------------------------------------------------------------------
create table if not exists public.insurer_portals (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations (id) on delete cascade,
  insurer_name    text not null,
  portal_url      text not null,
  -- Names the Windows Credential Manager entry on the runner box. NOT a secret.
  credential_key  text not null,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists insurer_portals_org_active_idx
  on public.insurer_portals (org_id, is_active);

-- -----------------------------------------------------------------------------
-- portal_playbooks: versioned, append-only authoring of how to drive a portal
-- for a given product_type. NEVER overwrite — each edit is a new version so the
-- full history is kept for audit / rollback. is_active flags the live version.
-- -----------------------------------------------------------------------------
create table if not exists public.portal_playbooks (
  id                    uuid primary key default gen_random_uuid(),
  portal_id             uuid not null references public.insurer_portals (id) on delete cascade,
  version               int  not null,
  product_type          text not null,
  -- ordered [{ instruction, expected_screen, field_map }]
  steps                 jsonb not null default '[]'::jsonb,
  reference_screenshots text[] not null default '{}',
  notes                 text,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (portal_id, product_type, version)
);

create index if not exists portal_playbooks_lookup_idx
  on public.portal_playbooks (portal_id, product_type, is_active, version desc);

-- -----------------------------------------------------------------------------
-- automation_jobs: the work queue.
-- -----------------------------------------------------------------------------
create table if not exists public.automation_jobs (
  id             uuid primary key default gen_random_uuid(),
  org_id         uuid not null references public.organizations (id) on delete cascade,
  type           text not null default 'quote_retrieval',
  status         text not null default 'pending'
                   check (status in ('pending','claimed','running','completed','failed','needs_review')),
  portal_id      uuid references public.insurer_portals (id) on delete set null,
  product_type   text,
  risk_data      jsonb not null default '{}'::jsonb,
  requested_by   uuid references auth.users (id) on delete set null,
  requested_via  text not null default 'crm' check (requested_via in ('crm','whatsapp')),
  -- groups the parallel jobs spawned from a single quote request
  batch_id       uuid not null,
  claimed_by     text,           -- runner identifier (forward-compat for >1 runner)
  requested_at   timestamptz not null default now(),
  claimed_at     timestamptz,
  started_at     timestamptz,
  completed_at   timestamptz,
  error_message  text,
  result         jsonb
);

create index if not exists automation_jobs_claim_idx
  on public.automation_jobs (status, requested_at)
  where status = 'pending';
create index if not exists automation_jobs_batch_idx on public.automation_jobs (batch_id);
create index if not exists automation_jobs_org_idx   on public.automation_jobs (org_id);
create index if not exists automation_jobs_portal_idx on public.automation_jobs (portal_id);

-- -----------------------------------------------------------------------------
-- automation_audit_log: one row per step the runner takes (regulated audit trail).
-- -----------------------------------------------------------------------------
create table if not exists public.automation_audit_log (
  id              uuid primary key default gen_random_uuid(),
  job_id          uuid not null references public.automation_jobs (id) on delete cascade,
  step_index      int not null,
  action          text not null,
  detail          text,
  screenshot_path text,   -- object path in the portal-audit-screens bucket
  created_at      timestamptz not null default now()
);

create index if not exists automation_audit_log_job_idx
  on public.automation_audit_log (job_id, step_index);

-- -----------------------------------------------------------------------------
-- updated_at maintenance
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.policies;
create trigger set_updated_at before update on public.policies
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.insurer_portals;
create trigger set_updated_at before update on public.insurer_portals
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.portal_playbooks;
create trigger set_updated_at before update on public.portal_playbooks
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Atomic claim: SELECT ... FOR UPDATE SKIP LOCKED so multiple runners never grab
-- the same job. Returns the claimed row, or NULL when the queue is empty.
-- -----------------------------------------------------------------------------
create or replace function public.claim_next_job(
  p_runner_id text default null,
  p_job_type  text default null
)
returns public.automation_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job public.automation_jobs;
begin
  select *
    into v_job
    from public.automation_jobs
   where status = 'pending'
     and (p_job_type is null or type = p_job_type)
   order by requested_at
   for update skip locked
   limit 1;

  if v_job.id is null then
    return null;
  end if;

  update public.automation_jobs
     set status     = 'claimed',
         claimed_at = now(),
         claimed_by = p_runner_id
   where id = v_job.id
  returning * into v_job;

  return v_job;
end;
$$;

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.organizations      enable row level security;
alter table public.profiles            enable row level security;
alter table public.policies            enable row level security;
alter table public.insurer_portals     enable row level security;
alter table public.portal_playbooks    enable row level security;
alter table public.automation_jobs     enable row level security;
alter table public.automation_audit_log enable row level security;

-- organizations: members can read their own org
create policy "org members read org" on public.organizations
  for select to authenticated
  using (id = public.auth_org_id());

-- profiles: a user can read their own profile and their org-mates' profiles
create policy "read own and org profiles" on public.profiles
  for select to authenticated
  using (id = auth.uid() or org_id = public.auth_org_id());

-- policies: staff fully manage their org's policy/risk records
create policy "staff manage org policies" on public.policies
  for all to authenticated
  using (org_id = public.auth_org_id())
  with check (org_id = public.auth_org_id());

-- insurer_portals: staff fully manage their org's portals
create policy "staff manage org portals" on public.insurer_portals
  for all to authenticated
  using (org_id = public.auth_org_id())
  with check (org_id = public.auth_org_id());

-- portal_playbooks: staff manage playbooks for portals in their org
create policy "staff manage org playbooks" on public.portal_playbooks
  for all to authenticated
  using (exists (
    select 1 from public.insurer_portals p
     where p.id = portal_id and p.org_id = public.auth_org_id()
  ))
  with check (exists (
    select 1 from public.insurer_portals p
     where p.id = portal_id and p.org_id = public.auth_org_id()
  ));

-- automation_jobs: staff INSERT + READ their org's jobs. Updates are the
-- runner's job (service role bypasses RLS); staff get no update/delete.
create policy "staff read org jobs" on public.automation_jobs
  for select to authenticated
  using (org_id = public.auth_org_id());

create policy "staff insert org jobs" on public.automation_jobs
  for insert to authenticated
  with check (org_id = public.auth_org_id());

-- automation_audit_log: staff READ logs for their org's jobs. Inserts are the
-- runner's job (service role bypasses RLS).
create policy "staff read org audit" on public.automation_audit_log
  for select to authenticated
  using (exists (
    select 1 from public.automation_jobs j
     where j.id = job_id and j.org_id = public.auth_org_id()
  ));

-- Function grants
grant execute on function public.auth_org_id() to authenticated, service_role;
grant execute on function public.claim_next_job(text, text) to service_role, authenticated;

-- =============================================================================
-- Realtime: QuoteComparison subscribes to jobs as results land.
-- =============================================================================
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
     where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'automation_jobs'
  ) then
    alter publication supabase_realtime add table public.automation_jobs;
  end if;
end $$;

-- =============================================================================
-- Private storage buckets
--   portal-playbooks      reference screenshots authored in the editor
--   portal-audit-screens  per-step screenshots from runner audit trail
--   quote-docs            generated quote documents
-- All private. The runner (service role) bypasses storage RLS; authenticated
-- staff get scoped access via the policy below.
-- =============================================================================
insert into storage.buckets (id, name, public)
values
  ('portal-playbooks',     'portal-playbooks',     false),
  ('portal-audit-screens', 'portal-audit-screens', false),
  ('quote-docs',           'quote-docs',           false)
on conflict (id) do nothing;

-- Authenticated staff can read/write objects in the automation buckets.
-- (Org-path scoping can be layered on later via a path prefix convention.)
create policy "staff rw automation buckets" on storage.objects
  for all to authenticated
  using (bucket_id in ('portal-playbooks','portal-audit-screens','quote-docs'))
  with check (bucket_id in ('portal-playbooks','portal-audit-screens','quote-docs'));
