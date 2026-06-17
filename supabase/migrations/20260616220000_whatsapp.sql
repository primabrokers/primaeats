-- =============================================================================
-- Prima Quote Agent — Part 5: WhatsApp support
--   * whatsapp_senders       : the sender allowlist AND phone -> org/user map
--   * quote_batch_notifications : per-batch dedupe so a summary is sent once
--   * batch-completion trigger : when all jobs in a batch reach a terminal
--     state, POST the batch_id to the notify-quote-results edge function
-- =============================================================================

-- pg_net lets the DB call the edge function when a batch completes.
create extension if not exists pg_net;

-- -----------------------------------------------------------------------------
-- whatsapp_senders: only these numbers may trigger quotes (the allowlist), and
-- each maps to the org (and optionally the staff user) the request belongs to.
-- `phone` is stored as digits only (E.164 without '+'), matching the WhatsApp
-- Cloud API `from`/`to` format.
-- -----------------------------------------------------------------------------
create table if not exists public.whatsapp_senders (
  id             uuid primary key default gen_random_uuid(),
  org_id         uuid not null references public.organizations (id) on delete cascade,
  phone          text not null unique,
  user_id        uuid references auth.users (id) on delete set null,
  -- receives summaries for CRM-originated batches in this org
  notify_default boolean not null default false,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

create index if not exists whatsapp_senders_org_idx on public.whatsapp_senders (org_id);

-- -----------------------------------------------------------------------------
-- quote_batch_notifications: insert-once dedupe. The unique batch_id PK means a
-- racing trigger/poller can only claim a batch once.
-- -----------------------------------------------------------------------------
create table if not exists public.quote_batch_notifications (
  batch_id    uuid primary key,
  channel     text not null default 'whatsapp',
  notified_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Batch-completion trigger: fire notify-quote-results when every job in the
-- batch is terminal. Best-effort — a notification failure must never block the
-- job update. Configure these once per project (see README Part 7):
--   alter database postgres set app.settings.edge_base_url = 'https://<ref>.functions.supabase.co';
--   alter database postgres set app.settings.service_role_key = '<service-role-key>';
-- -----------------------------------------------------------------------------
create or replace function public.handle_batch_completion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pending int;
  v_base text := current_setting('app.settings.edge_base_url', true);
  v_key  text := current_setting('app.settings.service_role_key', true);
begin
  if new.status not in ('completed', 'failed', 'needs_review') then
    return new;
  end if;

  select count(*) into v_pending
    from public.automation_jobs
   where batch_id = new.batch_id
     and status not in ('completed', 'failed', 'needs_review');
  if v_pending > 0 then
    return new;
  end if;

  if v_base is not null and v_key is not null then
    begin
      perform net.http_post(
        url := v_base || '/notify-quote-results',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || v_key
        ),
        body := jsonb_build_object('batch_id', new.batch_id)
      );
    exception
      when others then
        -- swallow: the job update must succeed regardless of notification
        null;
    end;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_batch_completion on public.automation_jobs;
create trigger trg_batch_completion
  after update of status on public.automation_jobs
  for each row execute function public.handle_batch_completion();

-- =============================================================================
-- RLS
-- =============================================================================
alter table public.whatsapp_senders enable row level security;
alter table public.quote_batch_notifications enable row level security;

-- Staff manage their org's WhatsApp senders. The webhook/runner use the service
-- role (bypasses RLS).
create policy "staff manage org whatsapp senders" on public.whatsapp_senders
  for all to authenticated
  using (org_id = public.auth_org_id())
  with check (org_id = public.auth_org_id());

-- quote_batch_notifications is service-role-only (no authenticated policies).
