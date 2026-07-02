# Search Journey Report — What a Consumer Sees

**Date:** 2 July 2026. Detail: `agent_reports/agent1a_search_engines.md` (SE-, incl.
full 26-query rank table), `agent_reports/agent9_ai_answers_maps.md` (AI-),
`agent_reports/agent1b_number_searches.md` (NUM-).

**Method:** every query run on DuckDuckGo UK (`duckduckgo.com/html`) and Bing UK, with
full-page screenshots and HTML archives (`screenshots/2026-07-02_ddg_<query-slug>_serp.png`,
`..._bing_...`, matching `.html` in `source_archive/`). Google Search was
reCAPTCHA-blocked on every attempt (block page preserved); Google *Maps* was accessible.
AI-answer surfaces (Google AI Overviews, Bing Copilot tab) could not be rendered
headlessly — machine conflation was instead demonstrated via captured AI search
summaries (SE-07, AI-15, DIR-12) and Bing's inline AI answer box (AI-03).

---

## The six journeys from the brief

### 1. "prima insurance"
Hello Prima ranks #1, the broker #3 on both engines. Both firms present as "Prima" /
"Prima Insurance" with visually indistinguishable titles. The broker's snippet exposes
its phone/email on DDG. **Ambiguous from the first query.**

### 2. "prima car insurance contact"
Broker #1 on Bing, #2 on DDG (insurer #1) — for an unambiguously *car-insurance* query.
The broker's number is visible in the DDG snippet. A consumer clicking the top Bing
result lands on the broker's contact page (0330 088 1135, info@primainsurance.co.uk).

### 3. "prima insurance claims"
Insurer #1; broker #5; third-party claims pages (claimsnumber.com — a claims-management
company's own 0333 number; prima.theclaimscentre.net — Bolton 01204 numbers) rank
prominently (SE-09–SE-11). Bing's AI answer box for "prima insurance claims number"
gives Hello Prima's correct number but cites the **broker's contact page** as one of
its two sources (AI-03).

### 4. "prima insurance complaints"
The broker's terms page snippet displays: "…Prima Financial Services Ltd, Complaints
Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on **0161 826 1620**" —
the only complaints number visible on the SERP (SE-04, AI-06). Bing People-also-ask:
"How do I register a complaint with Prima Financial Services Ltd?"

### 5. "prima insurance phone number"
**The broker's contact page is the #1 result on BOTH engines, with 0330 088 1135 (and
email) rendered in the snippet — no click needed** (SE-01/SE-02, AI-01). On Bing it
sits directly beneath a map/entity card for Hello Prima's London office labelled
"Prima Insurance". Hello Prima's results show no number ("Missing: phone number").

### 6. "hello prima contact number"
Even fully branded: insurer #1, but the broker ranks #2 with its "Contact | Prima"
title; on related branded queries ("helloprima phone number", "hello prima phone
number") the broker's snippet shows 0330 088 1135 and Bing renders the broker's full
entity card (number + Prestwich address). Bing's related-search chips include "prima
insurance brokers" and "prima manchester phone number"; a People-also-ask entry is
"How do I contact Prima House?" — the broker's building (SE-03, AI-04).

## Quantified picture (26 queries tested)
- Both firms co-appear in the top ~10 for **24/26** queries.
- The broker's live phone number/email is rendered in a DDG snippet for **21/26** queries.
- For contact/phone/cancellation/wrong-number-intent queries the broker ranks #1–4.
- Cancellation queries additionally expose a third broker number (0330 118 0404,
  Cancellations Department) at rank #1–2 (SE-05).
Full rank table: `agent_reports/agent1a_search_engines.md`.

## Maps and AI layers
- **Google Maps "prima insurance":** two listings, both named "Prima Insurance". The
  broker's shows +44 330 088 1135; Hello Prima's shows no number and an open "Add
  place's phone number" prompt (REV-01/02, AI-07–09). Manchester-viewpoint searches
  resolve to the broker.
- **AI summaries:** attributed the broker's number+address to helloprima.co.uk (SE-07);
  asserted the 0330 number "is indeed associated with Hello Prima's car insurance"
  (DIR-12); controlled test output "Main Customer Service Number: 0330 088 1135 …
  official Prima car insurance contact numbers" (AI-15).
- **Noise:** a third "Prima" (Prima Group, Liverpool housing association, 0333 355
  9000) ranks in every contact-intent SERP and was offered by AI summaries for Prima
  complaints (SE-11 context, AI-13).

## Why the journey ends at the broker
Hello Prima publishes no phone number a searcher can find (removed from its help
article in 2024; no /contact page has ever existed on its main site — WB-05/06), its
own page titles say "Prima Insurance" (WB-04), aggregators hand customers the bare
name "Prima" (AGG-01–04), and the open web's top-ranked, snippet-visible answer to
"who do I ring about my Prima policy" is — on every engine tested — Prima Insurance
Brokers' 0330 088 1135, with 0161 826 1620 surfacing specifically for complaints.

**Conclusion:** the captured search journeys make it *plausible to likely* that a Hello
Prima customer seeking phone contact ends up calling Prima Insurance Brokers. The pack
proves the journey, not the completed calls; call-log evidence from the broker would
close that gap.
