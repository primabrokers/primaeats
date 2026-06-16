# Prima Quote Agent

Multi-insurer quote retrieval for the Prima CRM, triggerable from the CRM or via
WhatsApp. Built for an FCA-regulated UK insurance brokerage.

Request quotes from several insurer portals **in parallel** and get the results
back both in the CRM (a live comparison table) and via WhatsApp.

---

## Architecture

Supabase Edge Functions are serverless and **cannot drive a browser/desktop**.
So this uses a **job queue + local runner** pattern:

```
Trigger (CRM button OR WhatsApp message)
  -> Edge Function enqueues job(s)            (enqueue-quote-job / whatsapp-webhook)
  -> Supabase automation_jobs table
  -> Windows runner polls, claims a job, drives the insurer portal (computer use)
  -> runner writes results + audit log back to Supabase
  -> CRM shows the live comparison; WhatsApp gets a summary reply (notify-quote-results)
```

The runner is a **shared core + per-workflow handlers** so future workflows
(Acturis extraction, renewals) slot in without rework.

### Hard rules (regulated — do not relax)

- **Never drive portals from an Edge Function.** Edge functions only enqueue.
- **Portal credentials live ONLY in Windows Credential Manager** on the runner
  PC — never in the cloud, never in git, never sent to the LLM.
- **Quote retrieval is read + generate-quote ONLY.** The runner never binds,
  pays, or submits a purchase; anything resembling that → `needs_review`.
- Confirm each insurer portal's terms **permit automated access** before routine
  use (see [Compliance](#compliance--security)).

---

## Repository layout

```
supabase/
  migrations/           SQL schema, RLS, claim_next_job RPC, storage buckets, WhatsApp
  functions/
    _shared/            cors.ts, enqueue.ts (shared), whatsapp.ts (shared)
    enqueue-quote-job/  CRM-triggered job enqueue
    whatsapp-webhook/   WhatsApp verify + inbound receiver + intent.ts
    notify-quote-results/  batch-complete WhatsApp summary
runner/                 Windows local runner (Node + TypeScript, strict)
  src/core/             queue, credentials, audit, computer-use loop, supabase
  src/handlers/         quote-retrieval (only handler for now)
  src/index.ts          poll -> claim -> dispatch by job.type
  src/setup-credentials.ts   one-time credential setup
src/                    CRM front-end (React 18 + Vite + TS + Tailwind)
  components/ui/        shadcn-style primitives (no Radix dependency)
  features/playbooks/   PortalPlaybookEditor
  features/quotes/      GetQuotes, QuoteComparison
```

---

## Prerequisites

| Where | Needs |
|---|---|
| Supabase | A project (free tier is fine to start), the `supabase` CLI |
| CRM | Node.js LTS (≥ 20); a host for the static build (e.g. Vercel) |
| WhatsApp | A Meta/Facebook Business account + WhatsApp Business Cloud API number |
| Runner PC | **Windows**, Node.js LTS, Git, Visual Studio Build Tools (C++ workload), an Anthropic API key |

---

## 1. Supabase setup

### 1.1 Apply the migrations

```bash
supabase link --project-ref <your-ref>
supabase db push     # applies both migrations in supabase/migrations/ in order
```

This creates all tables + RLS, the atomic `claim_next_job` RPC, the three
**private** storage buckets (`portal-playbooks`, `portal-audit-screens`,
`quote-docs`), adds `automation_jobs` to the realtime publication, and installs
the WhatsApp batch-completion trigger.

### 1.2 Keys you'll need

From **Project settings → API**:
- **Project URL** and **anon key** → the CRM (`VITE_*`).
- **service-role key** → the runner and the edge functions. This is the
  "runner service role": it bypasses RLS so the runner can claim/update jobs and
  insert audit rows. Treat it as a secret; never ship it to the browser.

### 1.3 Seed the core data

There's no admin UI for organisations / users / portals yet, so seed them once
in the SQL editor. Create at least one org, link your staff login to it, and add
your insurer portals and the policies you'll quote against.

```sql
-- 1. Organisation
insert into organizations (name) values ('Prima Insurance')
  returning id;  -- note the org_id

-- 2. Link a staff auth user to the org (create the user first in
--    Authentication → Users, then use their UUID here).
insert into profiles (id, org_id, full_name)
  values ('<auth-user-uuid>', '<org_id>', 'Anthony');

-- 3. Insurer portals. credential_key NAMES the Windows Credential Manager entry
--    on the runner PC — it is NOT a secret and holds no password.
insert into insurer_portals (org_id, insurer_name, portal_url, credential_key) values
  ('<org_id>', 'Aviva', 'https://broker.aviva.co.uk', 'prima-aviva'),
  ('<org_id>', 'AXA',   'https://broker.axa.co.uk',   'prima-axa');

-- 4. A policy/risk record so policy_ref lookups resolve. risk_data keys are the
--    ones you reference in playbook field maps.
insert into policies (org_id, policy_ref, product_type, risk_data) values
  ('<org_id>', 'ABC123', 'motor', '{
     "vehicle_reg": "AB12 CDE",
     "driver_dob": "1985-04-12",
     "postcode": "EC1A 1BB"
   }'::jsonb);
```

Author the per-portal **playbooks** from the CRM (Playbook editor) once portals
exist — see [Authoring a playbook](#authoring-a-portal-playbook).

---

## 2. CRM front-end

```bash
cp .env.example .env       # VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (public)
npm install
npm run dev                # local; or `npm run build` for a static bundle
```

The anon key is safe in the browser — RLS scopes every query to the signed-in
user's org. Deploy the `dist/` build to any static host (Vercel works well; set
the two `VITE_*` env vars there). Set `CRM_BASE_URL` (below) to the deployed URL
so WhatsApp summaries can deep-link to the comparison.

---

## 3. Edge functions

```bash
# CRM calls this with the user's JWT — keep JWT verification on.
supabase functions deploy enqueue-quote-job

# Meta calls the webhook with NO Supabase JWT — disable JWT verification and
# rely on the X-Hub-Signature-256 check instead.
supabase functions deploy whatsapp-webhook --no-verify-jwt

# Called by the DB trigger with the service-role key — keep JWT verification.
supabase functions deploy notify-quote-results
```

Set the function secrets (`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` /
`SUPABASE_ANON_KEY` are injected automatically):

```bash
supabase secrets set \
  ANTHROPIC_API_KEY=sk-ant-... \
  CRM_BASE_URL=https://crm.example.com \
  WHATSAPP_VERIFY_TOKEN=<you choose this> \
  WHATSAPP_APP_SECRET=<Meta app secret> \
  WHATSAPP_TOKEN=<Cloud API access token> \
  WHATSAPP_PHONE_NUMBER_ID=<your number's phone_number_id>
```

Let the batch-completion trigger reach `notify-quote-results` (run once in SQL):

```sql
alter database postgres set app.settings.edge_base_url    = 'https://<ref>.functions.supabase.co';
alter database postgres set app.settings.service_role_key = '<service-role-key>';
```

> If you'd rather not store the service-role key in a DB setting, drop the
> trigger and instead schedule `notify-quote-results` from `pg_cron` (it already
> no-ops on incomplete or already-notified batches).

---

## 4. WhatsApp Business Cloud API

1. In **Meta for Developers**, create an app and add the **WhatsApp** product.
2. Note your test/live number's **`phone_number_id`** and generate an **access
   token** → `WHATSAPP_PHONE_NUMBER_ID` / `WHATSAPP_TOKEN`. For production use a
   permanent (system-user) token, not the 24-hour test token.
3. **App secret** (App settings → Basic) → `WHATSAPP_APP_SECRET` (used to verify
   the `X-Hub-Signature-256` on every inbound POST).
4. **Webhook**: set the callback URL to your deployed function
   `https://<ref>.functions.supabase.co/whatsapp-webhook` and the **Verify
   token** to the same value you set for `WHATSAPP_VERIFY_TOKEN`. Subscribe to
   the **`messages`** field.
5. **Sender allowlist**: only numbers in `whatsapp_senders` can trigger quotes.
   Seed your approved number(s) (digits only, no `+`), mapped to the org and the
   staff user who should receive replies:

```sql
insert into whatsapp_senders (org_id, phone, user_id, notify_default) values
  ('<org_id>', '447700900123', '<auth-user-uuid>', true);
```

Then message the number something like *"quote policy ABC123 on Aviva and AXA"*.
The webhook parses the intent, enqueues one job per insurer, and replies; when
all jobs finish you get the summary.

---

## 5. Windows runner

The runner drives the insurer portals from an office PC. It must stay **logged
in and awake** while running.

### 5.1 Prerequisites

- **Node.js LTS** (≥ 20) and **Git**.
- **Visual Studio Build Tools** with the **"Desktop development with C++"**
  workload — `keytar` and `@nut-tree-fork/nut-js` are native modules and need it
  to build on `npm install`.
- Set the display **scaling to 100%** so screen coordinates map 1:1 with pixels.
- **Antivirus/endpoint allowlist** the runner folder — synthetic mouse/keyboard
  input can trip heuristics.
- Keep the PC **logged in and awake** (disable sleep). For unattended use,
  consider running it as a scheduled task / service that restarts on logon.

> The runner uses `@nut-tree-fork/nut-js` — the maintained community fork — as
> the original `@nut-tree/nut-js` is no longer on the public npm registry.

### 5.2 Install & configure

```bash
cd runner
cp .env.example .env        # Supabase URL + SERVICE-ROLE key + Anthropic key ONLY
npm install                 # builds keytar / nut-js native modules
```

`.env` holds **only** cloud/runtime keys — never portal credentials:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ANTHROPIC_API_KEY=...
# optional: ANTHROPIC_MODEL, POLL_INTERVAL_MS, MAX_ITERATIONS, RUNNER_ID
```

### 5.3 Store portal credentials (one-time)

```bash
npm run setup-credentials
```

This lists the active portals from Supabase and prompts (password hidden) for
each one's username/password, writing them into the **Windows Credential
Manager** under each portal's `credential_key`. Re-run it to update a password.
Credentials never touch `.env`, git, Supabase, or the LLM.

### 5.4 Run

```bash
npm run build && npm start  # or `npm run dev` while developing
```

The runner polls `claim_next_job` (atomic `FOR UPDATE SKIP LOCKED`, so you can
scale to more than one runner later), drives the portal with Claude computer
use (`claude-sonnet-4-6`, tool `computer_20251124`, beta
`computer-use-2025-11-24`), writes a screenshot + audit row at every step, and
sets the job to `completed` / `needs_review` / `failed`.

---

## Authoring a portal playbook

In the CRM → **Playbook editor**:

1. Pick the portal + product type.
2. Add ordered **steps**: an instruction, an **expected-screen** label (so the
   runner can tell when the playbook is stale), and **field mappings** — each
   maps a portal field label to the `risk_data` key that supplies its value.
3. Upload a **reference screenshot** per step (so Claude matches the live screen
   against what it should look like).
4. **Save** — this writes a **new version**. Prior versions are deactivated, not
   overwritten, so the full history is kept for audit and rollback.

The runner loads the latest active version for the product type at quote time.

---

## How a quote flows

1. **Trigger** — CRM "Get quotes" (pick portals) or a WhatsApp message.
2. **Enqueue** — one `automation_jobs` row per portal, sharing a `batch_id`.
3. **Claim & run** — the runner claims a job, logs in (via the `type_secret`
   tool so the password never reaches the LLM), follows the playbook, and
   extracts `{ premium_gross, premium_net, quote_ref, validity_date, excess,
   outcome, notes }`. `referred` / `declined` are valid outcomes, not failures.
4. **Live comparison** — the CRM `QuoteComparison` table fills in via realtime.
5. **Notify** — when every job in the batch is terminal, `notify-quote-results`
   sends a one-line-per-insurer WhatsApp summary with a CRM deep link.

---

## Compliance & security

- **Read + generate-quote only.** The runner is instructed and gated to stop
  before any bind / pay / purchase control → `needs_review`.
- **No invented data.** A playbook field with no matching `risk_data` value
  stops the job (`needs_review`) naming the field — it never guesses.
- **Stale-playbook safety.** If the live screen matches no expected screen, the
  job stops for review rather than improvising.
- **Full audit trail.** Every step writes an `automation_audit_log` row and a
  screenshot to the private `portal-audit-screens` bucket.
- **Credential isolation.** Portal logins live only in Windows Credential
  Manager; the cloud and the LLM never see them.
- **Automated-access terms.** Confirm each insurer portal's terms of use permit
  automated access before routine use — some broker portals prohibit it.

---

## Environment variables

**CRM (`.env`, public):**

| Var | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (RLS-scoped) |

**Runner (`runner/.env`):**

| Var | Purpose |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Runner service role (bypasses RLS) |
| `ANTHROPIC_API_KEY` | Computer-use loop |
| `ANTHROPIC_MODEL` | optional (default `claude-sonnet-4-6`) |
| `POLL_INTERVAL_MS` | optional (default `5000`) |
| `MAX_ITERATIONS` | optional (default `40`) |
| `RUNNER_ID` | optional runner identifier |

**Edge function secrets:**

| Var | Used by |
|---|---|
| `ANTHROPIC_API_KEY` | whatsapp-webhook (intent parse) |
| `WHATSAPP_VERIFY_TOKEN` | whatsapp-webhook (GET verify) |
| `WHATSAPP_APP_SECRET` | whatsapp-webhook (signature) |
| `WHATSAPP_TOKEN` | whatsapp-webhook, notify-quote-results (send) |
| `WHATSAPP_PHONE_NUMBER_ID` | whatsapp-webhook, notify-quote-results (send) |
| `CRM_BASE_URL` | notify-quote-results (deep link) |

---

## Build order / status

1. ✅ SQL migration + RPC + RLS + buckets
2. ✅ `enqueue-quote-job` + shared enqueue module
3. ✅ Runner core + quote-retrieval handler
4. ✅ PortalPlaybookEditor + GetQuotes + QuoteComparison
5. ✅ WhatsApp webhook + intent parse + notify-quote-results
6. ✅ README + setup-credentials
