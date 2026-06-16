# Prima Quote Agent

Multi-insurer quote retrieval for the Prima CRM, triggerable from the CRM or via
WhatsApp. FCA-regulated UK insurance brokerage.

> **Status:** in-progress build. Schema (Part 1) and the `enqueue-quote-job`
> Edge Function (Part 2) are in place. Remaining parts (runner, CRM UI,
> WhatsApp, full README) follow the build order below.

## Architecture

Supabase Edge Functions are serverless and **cannot drive a browser/desktop**.
We use a **job queue + local runner** pattern:

```
Trigger (CRM button OR WhatsApp message)
  -> Edge Function enqueues job(s)        (enqueue-quote-job / whatsapp-webhook)
  -> Supabase automation_jobs table
  -> Windows runner polls, claims a job, drives the insurer portal (computer-use)
  -> runner writes results + audit log back to Supabase
  -> CRM shows live comparison; WhatsApp gets a summary reply
```

**Hard rules (regulated):**
- Never drive portals from an Edge Function.
- Portal credentials live ONLY in Windows Credential Manager on the runner box —
  never in the cloud, never in git.
- Quote retrieval is **read + generate quote only** — never bind, pay, or submit
  a purchase.

## Layout

```
supabase/
  migrations/   SQL schema, RLS, claim_next_job RPC, storage buckets
  functions/
    _shared/    cors.ts, enqueue.ts (shared enqueue logic)
    enqueue-quote-job/   CRM-triggered job enqueue
runner/         Windows local runner (core + handlers)
  core/         queue, credentials, audit, computer-use loop
  handlers/     quote-retrieval (only handler for now)
src/            CRM front-end (React 18 + Vite + TS + Tailwind + shadcn-style UI)
  components/ui/  hand-written shadcn-style primitives (no Radix dep)
  features/playbooks/   PortalPlaybookEditor
  features/quotes/      GetQuotes, QuoteComparison
```

## Part 1 — schema

`supabase/migrations/20260616210000_init_automation.sql` creates:

- `organizations`, `profiles` — multi-tenant scoping (one brokerage = one org).
- `policies` — CRM policy/risk records the agent quotes against.
- `insurer_portals` — one row per insurer portal; `credential_key` NAMES the
  Windows Credential Manager entry (not a secret).
- `portal_playbooks` — versioned, append-only authoring of how to drive a portal
  per product type. Never overwritten; each edit is a new version.
- `automation_jobs` — the work queue.
- `automation_audit_log` — per-step audit trail.
- `claim_next_job(p_runner_id, p_job_type)` — atomic `FOR UPDATE SKIP LOCKED`
  claim so multiple runners never grab the same job.
- RLS scoping every table by the caller's org; private storage buckets
  `portal-playbooks`, `portal-audit-screens`, `quote-docs`.

Apply with the Supabase CLI:

```bash
supabase db push       # or: supabase migration up
```

## Part 2 — enqueue-quote-job

Authenticated CRM users POST:

```jsonc
// POST /functions/v1/enqueue-quote-job
{
  "policy_ref": "ABC123",      // OR provide "risk_data": { ... }
  "portal_ids": ["<uuid>", "<uuid>"],
  "product_type": "motor"      // optional; falls back to the policy's product_type
}
// -> 201 { batch_id, job_ids: [...], product_type, insurers: [...] }
```

It creates one `pending` job per `portal_id`, all sharing a `batch_id`, and does
**not** call Claude or touch portals. The enqueue rules live in
`supabase/functions/_shared/enqueue.ts` so the WhatsApp webhook (Part 3) reuses
them.

Deploy:

```bash
supabase functions deploy enqueue-quote-job
```

## Part 3 — Windows runner (core + quote-retrieval handler)

`runner/` is a strict-TypeScript Node app: **poll → claim → dispatch**.

- `core/queue.ts` — claims jobs via the `claim_next_job` RPC and drives status
  transitions (running / completed / needs_review / failed).
- `core/credentials.ts` — reads portal username/password from **Windows
  Credential Manager** (keytar) by `credential_key`. Never from env/git/Supabase.
- `core/audit.ts` — at every step writes an `automation_audit_log` row and
  uploads a screenshot to `portal-audit-screens`.
- `core/computer-use.ts` — the shared screenshot → reason → act loop. Anthropic
  SDK, model `claude-sonnet-4-6`. **Verified computer-use pairing for Sonnet 4.6:
  tool type `computer_20251124` + beta header `computer-use-2025-11-24`** (the
  older `computer_20250124` / `computer-use-2025-01-24` 400s on this model).
  Input via `@nut-tree-fork/nut-js` (the maintained fork — the original
  `@nut-tree/nut-js` is no longer on the public npm registry); screen capture via
  `screenshot-desktop`.
- `handlers/quote-retrieval.ts` — loads the portal + latest active playbook +
  reference screenshots, builds the system prompt, and runs the loop. Credentials
  are typed via a `type_secret` tool so the password is **never sent to the LLM**.
  Extracts `{ premium_gross, premium_net, quote_ref, validity_date, excess,
  outcome, notes }`. **REFERRED/DECLINED are valid outcomes, not failures.**

**Hard-stop rules (regulated), enforced in the handler + system prompt:**
- Never click bind/pay/confirm-purchase → `needs_review`.
- A `field_map` field with no `risk_data` value → `needs_review` naming the
  field (pre-flight check; never invents a value).
- Live screen matches no `expected_screen` → `needs_review` (stale playbook).

Run it (on the Windows office PC):

```bash
cd runner
cp .env.example .env      # Supabase URL + service-role key + Anthropic key ONLY
npm install               # native modules (keytar, nut-js) need VS Build Tools
npm run setup-credentials # store each portal's login in Credential Manager
npm run build && npm start
```

## Part 4 — CRM front-end

React 18 + Vite + TypeScript + Tailwind, with hand-written shadcn-style
primitives (`src/components/ui/`) so there's no Radix dependency to install.
Auth is email/password via Supabase; RLS scopes everything to the user's org.

- **`PortalPlaybookEditor`** — pick a portal + product type, add ordered steps
  (instruction + expected-screen label + field mappings), upload a reference
  screenshot per step. **Save writes a NEW version** (prior versions are
  deactivated, never overwritten) — history is kept for audit/rollback.
- **`GetQuotes`** — on a policy reference, tick the active portals to quote and
  fire `enqueue-quote-job` (parallel jobs, one `batch_id`).
- **`QuoteComparison`** — subscribes to all jobs in the `batch_id` via Supabase
  realtime; the table fills in live as each result lands (insurer, gross
  premium, excess, outcome badge: quoted/referred/declined, needs-review amber),
  with a signed-URL link to each quote doc when present.

Run it:

```bash
cp .env.example .env      # VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (public)
npm install
npm run dev               # or: npm run build
```

## Build order

1. ✅ SQL migration + RPC + RLS + buckets
2. ✅ enqueue-quote-job + shared enqueue module
3. ✅ Runner core + quote-retrieval handler
4. ✅ PortalPlaybookEditor + GetQuotes + QuoteComparison
5. ⏳ WhatsApp webhook + intent parse + notify-results
6. ⏳ README + setup-credentials (full)
