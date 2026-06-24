# Lendaris Bridging GPT

A first slice of the **Lendaris bridging-lender** app: an OpenAI **Custom GPT**
that produces indicative bridging-loan illustrations on demand.

> ⚠️ **Indicative only.** This calculates illustrations from a placeholder rate
> card. It is not a credit decision, a binding offer, or regulated advice.
> Replace the rate card with real Lendaris figures and confirm the maths with
> Compliance before any client-facing use.

```
ChatGPT Custom GPT  ──(Action: getBridgingQuote)──▶  Supabase Edge Function
                                                     bridging-quote
                                                       └─ quote-engine.ts  (pure calc)
                                                       └─ products.ts       (rate card)
```

The GPT collects the property value, amount required, and term, calls the
`bridging-quote` edge function over HTTPS (authenticated with a shared secret),
and presents the illustration. The function is a **pure calculation** — no
database, no portals, no LLM — so it is fast, deterministic, and auditable.

## Layout

```
lendaris/
  README.md                     this file
  openapi/bridging-quote.yaml   OpenAPI 3.1 schema to paste into the GPT Action
  gpt/instructions.md           GPT name, system prompt, starters, action setup
supabase/functions/bridging-quote/
  quote-engine.ts               gross-up math (retained / rolled / serviced), LTV, fees
  products.ts                   PLACEHOLDER rate card — replace before real use
  index.ts                      HTTP edge function + shared-secret auth
  quote-engine.test.ts          engine tests (deno test)
```

## What a quote covers

- **Gross-up**: solves the circular relationship where the arrangement fee and
  (for retained interest) the whole-term interest are percentages of the gross
  loan, so the borrower nets exactly the `net_advance` they asked for.
- **Three interest treatments**: `retained` (deducted up front), `rolled`
  (compounded, settled at redemption), `serviced` (paid monthly).
- **LTV**: gross and net LTV, flagged against the product's max.
- **Fees**: arrangement, broker, valuation, legal, admin, title, exit.
- **Redemption**: the lump sum to repay at end of term (plus the monthly payment
  when interest is serviced).

## Deploy

```bash
# 1. Set the shared secret the GPT will send as a Bearer token.
supabase secrets set LENDARIS_GPT_API_KEY=$(openssl rand -hex 32)

# 2. Deploy WITHOUT Supabase JWT verification — the GPT has no Supabase JWT;
#    access is gated by the shared secret instead.
supabase functions deploy bridging-quote --no-verify-jwt
```

Then wire up the GPT following `gpt/instructions.md` (use the same
`LENDARIS_GPT_API_KEY` as the Action's Bearer key, and set the schema's server
URL to `https://<PROJECT_REF>.functions.supabase.co`).

## Smoke test the endpoint

```bash
curl -s -X POST \
  https://<PROJECT_REF>.functions.supabase.co/bridging-quote \
  -H "Authorization: Bearer $LENDARIS_GPT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"property_value":1000000,"net_advance":500000,"term_months":12}' | jq
```

## Run the tests

```bash
deno test supabase/functions/bridging-quote/quote-engine.test.ts
```

## Before going live — checklist

- [ ] Replace every number in `products.ts` with the real Lendaris rate card.
- [ ] Confirm the gross-up and interest conventions match how Lendaris quotes
      (retained interest on gross for the full term vs. net, day-one deductions,
      exit-fee basis).
- [ ] Decide the regulated/unregulated split and whether the disclaimer wording
      is approved by Compliance.
- [ ] Keep the GPT private/unlisted until the above are signed off.

## Roadmap (next slices)

1. **Save quotes** to a `bridging_quotes` table (case reference, who/when) for
   an audit trail and recall.
2. **Decision-in-principle** action: affordability/exit-strategy checks → a
   referral or a soft yes/no.
3. **CRM surface**: a Lendaris front-end (mirroring the Prima CRM patterns in
   this repo) to list cases and quotes.
4. **Document generation**: a branded illustration PDF from a saved quote.
