# Aggregator / Comparison-Site Investigation

**Date:** 2 July 2026. Detail: `agent_reports/agent5_aggregators.md` (AGG-01–AGG-12),
supported by NUM-16, WB-10/11, SE-09/10.

## Headline conclusions

1. **No aggregator page displays Prima Insurance Brokers' phone numbers, email or
   address in connection with Hello Prima / Prima car insurance** (AGG-12). This is a
   clear negative finding, stated as required by the brief.
2. **No aggregator that lists the insurer uses the name "Hello Prima", and none
   publishes any contact details for it.** The consumer is handed the bare brand word
   "Prima" and left to find contact details by searching the open web (Category J
   ambiguity) — where the broker's details dominate (see `search_journey_report.md`).
3. The most significant mis-routing evidence sits **outside** the major aggregators, on
   SEO "contact directory" and claims-management pages (kaeltripton.com,
   claimsnumber.com).

## How each site describes Prima / Hello Prima

| Aggregator | Public Prima listing? | Exact brand name used | Contact details shown | Notes |
|---|---|---|---|---|
| Go.Compare | Yes — car-insurance providers directory | **"Prima Car Insurance"** | None | Listed since ≥ 25 May 2025 (Wayback, AGG-07). Go.Compare's contact page: "Go.Compare is a comparison website and not an insurer or a broker… you buy it from the insurer" — post-sale queries pushed to "Prima" with no details (AGG-02) |
| Compare the Market | **Uninspectable** | n/a | n/a | Live pages Cloudflare-blocked; nothing indexed; zero Wayback snapshots — though Trustpilot reviewers confirm buying Prima via CtM (AGG-05) |
| Confused.com | Yes — two provider directories | **"Prima", "Prima Essentials", "Prima Plus", "Prima Premier"** | None | Bare names only (AGG-03) |
| MoneySuperMarket | No | n/a | n/a | Providers directory omits Prima despite reviewers buying there (AGG-06) |
| Quotezone | No (current provider list) | n/a | n/a | But historical "Prima Car Insurance Review" page archived 2024–2025 calls the insurer simply **"Prima"**, no contact details (WB-10) |
| Uswitch | Yes — providers table | **"Prima" + Essentials/Plus/Premier** | None | (AGG-04) |
| Mustard / Money.co.uk | No mention found | n/a | n/a | SERP no-result evidence |
| Which? | No — not among 25 insurers reviewed | n/a | n/a | |
| Defaqto | No consumer page indexed | n/a | n/a | Despite helloprima.co.uk advertising "5 Star Defaqto" ratings |

## Third-party contact/claims pages found via aggregator-pattern queries

- **kaeltripton.com** — "Prima Car Insurance Contact UK 2026: Phone, Claims &
  Complaints": describes Prima as an FCA-authorised motor insurance provider and
  directs customer service, 24/7 claims and FCA complaints to **primainsurance.co.uk**
  (11+ hyperlinked references; "Prima official website: primainsurance.co.uk" in its
  sources; helloprima.co.uk never mentioned). Strongest routing-confusion capture
  (AGG-08). **Caveat:** links carry `?ref=kaeltripton.com` `rel="sponsored nofollow"` —
  possible affiliate/paid markup; check for any commercial relationship before relying
  on it as independent evidence.
- **claimsnumber.com/prima/** — "Prima Car Insurance Accident Claim Contact Phone
  Number **0333 006 4465**" — a claims-management company's own line presented as the
  Prima accident number (AGG-09).
- **freepricecompare.com**, **fairerfinance.com**, **procustomer.co.uk**,
  **tradersunion.com** — use bare "Prima"/"Prima Insurance Company" branding for the
  insurer; Traders Union's review page for helloprima.co.uk lists primainsurance.co.uk
  in its own comparison table (AGG-10/11, REV-14–16).

## Is any aggregator causing confusion?

On the evidence captured: the major aggregators do not publish wrong contact details —
their contribution to confusion is **selling the product under the undifferentiated
name "Prima" (or "Prima Car Insurance") with no contact route**, which combines with
Hello Prima's own absent/hidden phone number and "Prima Insurance" page titles to push
post-sale customers into open-web searches dominated by the broker's details. Whether
an aggregator's *post-sale account area or policy documents* show ambiguous details
could not be tested (out of bounds — no accounts/quote journeys were created).

## Gaps
Compare the Market entirely uninspectable (AGG-05); quote journeys and logged-in areas
out of scope; several site: queries returned nothing on DuckDuckGo and were re-run on
Bing (documented in the agent report).
