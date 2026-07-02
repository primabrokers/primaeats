# Executive Summary — Prima / HelloPrima Brand Confusion Evidence Pack

**Date of investigation:** 2 July 2026 (all captures 01:00–02:00 UTC unless stated)
**Prepared by:** Multi-agent online research team (11 parallel workstreams)
**Subjects:**
- **The broker** — Prima Financial Services Ltd, trading as Prima Insurance Brokers (primainsurance.co.uk, FCA FRN 842275, Prestwich/Manchester; phones 0330 088 1135, 0161 826 1620)
- **The insurer** — Prima Subsidiary Ltd, trading as "Prima" / "Hello Prima" (helloprima.co.uk, FCA FRN 1031191, London; phone 020 3318 9745)

**Method and scale:** Only lawful, publicly accessible sources; no logins, no paywall
bypass, no contact with third parties. 10 of 11 workstream reports complete (the
Reddit/forums workstream will be appended when it completes); **415+ screenshots** and
**428+ HTML source archives** preserved in `screenshots/` and `source_archive/`;
full per-finding detail in `agent_reports/` and `evidence_register.csv`.

---

## 1. Strongest confirmed evidence

### 1.1 The broker's phone numbers are what a Hello Prima customer sees when they search (Category A-exposure / I — Confirmed)
- For **"prima insurance phone number"**, the broker's contact page is the **#1 organic
  result on both DuckDuckGo UK and Bing UK**, with "0330 088 1135" and
  info@primainsurance.co.uk rendered in the snippet — no click required. On Bing the
  broker's #1 result sits directly beneath a map/entity card for **Hello Prima's London
  office labelled "Prima Insurance"** (SE-01, SE-02; AI-01).
- Even **fully Hello-Prima-branded queries** ("hello prima contact", "helloprima contact
  number", "helloprima phone number") rank the broker's "Contact | Prima" page #2–4 with
  0330 088 1135 in the snippet; Bing flags Hello Prima's own results "Missing: phone
  number" (SE-03; AI-04).
- **Complaints queries surface 0161 826 1620**: "prima insurance complaints" / "prima
  complaints phone number" display the broker's snippet "…Prima Financial Services Ltd,
  Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on
  0161 826 1620" — the only complaints number visible on the SERP (SE-04; AI-06).
- **Cancellation queries rank the broker #1–2** with its Cancellations Department and a
  third broker number (0330 118 0404) in the snippet (SE-05).
- Quantified: both firms co-appear in the top ~10 for **24 of 26** contact/claims/
  complaints/cancellation queries; the broker's live number is snippet-visible for
  **21 of 26** queries on DuckDuckGo UK (rank table in `agent_reports/agent1a_search_engines.md`).

### 1.2 Google Maps / Google Business Profile (Category I/K — Confirmed)
Both businesses' Google listings are named identically **"Prima Insurance"**. The
broker's listing displays **+44 330 088 1135**; Hello Prima's listing displays **no
phone number at all** (Google invites the public to "Add place's phone number"). A
customer looking up "Prima Insurance" on Google/Maps for their car insurer's number can
be shown only the broker's number (REV-01, REV-02; AI-07–AI-09).

### 1.3 AI/search answer systems conflate the two firms (Category I — Confirmed, live captures)
- **Bing's AI-generated answer box** for "prima insurance claims number" cites
  `helloprima.co.uk/claims` **and** `primainsurance.co.uk/contact/` as its two sources
  for one "Prima Insurance" (AI-03 — confirmed in archived HTML citation attributes).
- A live AI search summary answered a Prima car insurance contact query by attributing
  **"0330 088 1135 … Prima House, 21 Bury New Road, Prestwich" to helloprima.co.uk**
  (SE-07), and another stated the 0330 number "is indeed associated with Hello Prima's
  car insurance" (DIR-12). A controlled test reproduced the same behaviour: "Main
  Customer Service Number: 0330 088 1135 … These are the official Prima car insurance
  contact numbers for the UK" (AI-15; method caveat recorded — not Bing Copilot/Google
  AI Overviews, which were not capturable).

### 1.4 Direct customer confusion testimony (Category D — Confirmed content; attribution qualified)
A public 5-star Google review on **Hello Prima's own Google Business Profile**
(reviewer "eleanor burnet", ~2 years ago) states verbatim:

> "I initially tried to find a phone number and called a company called Prima, who
> advised me to search for Hello Prima. All I could find was live chat or email…"

This directly evidences a Hello Prima customer telephoning a *different company called
Prima* while hunting for contact details. It does not name which Prima was dialled
(REV-03).

### 1.5 Probable misdirected review on the broker's Trustpilot page (Category D — Probable, not confirmed)
A Trustpilot page for primainsurance.co.uk exists with exactly one review — 1-star,
10 June 2026, written in the language of an aggrieved **motor policyholder** (policy-date
change refused, address-change charge, repeated NCB proof requests), matching Hello
Prima's own 1-star review pattern point-for-point. Probable instance of a Hello Prima
review posted to the broker's page; not confirmable from public data alone (TP-01).
Separately confirmed: Trustpilot's own search for "prima insurance" returns the
**broker's profile first**, Hello Prima seventh (TP-03).

### 1.6 The confusion engine: Hello Prima brands itself "Prima Insurance" and publishes no findable phone number (Categories I/E — Confirmed)
- Hello Prima's own page titles used the exact phrase **"Prima Insurance"** continuously
  from Dec 2023 to Oct 2025 ("About Prima Insurance - Prima Insurance", "Making a Motor
  Insurance Claim - Prima Insurance") — these title tags are what search engines display
  (WB-04, NUM-14, SOC-03).
- Hello Prima **removed its published phone number** from its "How can I contact you?"
  help article between 21 Feb and 11 Sep 2024, and **never had a /contact or /complaints
  page on its main site** (zero Wayback captures) (WB-05, WB-06).
- Trustpilot reviews repeatedly evidence customers hunting for a number: "I…googled you"
  (TP-05); "There's no phone number to call which is worrying" (TP-07); "at first I
  couldn't find a number to actually speak to a person" (TP-06); multiple Google reviews
  the same (REV-04–REV-09).
- Consumers do not know the insurer as "Hello Prima": of 950 Trustpilot reviews sampled,
  **1** says "Hello Prima"; the rest say "Prima" / "Prima insurance" / "Prima car
  insurance" (TP-19).

### 1.7 Third-party pages route Prima car-insurance customers to the broker (Categories D/F/G — Confirmed, with caveat)
kaeltripton.com publishes "Prima Car Insurance Contact UK 2026: Phone, Claims &
Complaints", describing Prima as an FCA-authorised **motor insurance provider** and
repeatedly instructing readers to use **primainsurance.co.uk** for customer service,
24/7 claims and complaints; helloprima.co.uk is never mentioned (AGG-08, AI-11, SE-09).
**Caveat for legal review:** its links to the broker's site carry
`?ref=kaeltripton.com` with `rel="sponsored nofollow"` — markup normally indicating a
paid/affiliate link. Whether any commercial relationship exists with the broker should
be established before this item is relied on as independent evidence.
Also: claimsnumber.com (a claims-management company) advertises its own line
(0333 006 4465) as the "Prima Car Insurance Accident Claim" number (AGG-09, AI-12).

### 1.8 Aggregators sell the product under the bare name "Prima" with no contact route (Category J — Confirmed)
Go.Compare lists **"Prima Car Insurance"**; Confused.com and Uswitch list **"Prima" /
Prima Essentials / Prima Plus / Prima Premier**. None uses "Hello Prima"; none shows
any contact details or disambiguation. Go.Compare's own guidance pushes post-sale
queries to "the insurer" — i.e. to a brand name the customer must then search for
(AGG-01–AGG-04, AGG-07). Compare the Market could not be inspected (bot-blocked, not
indexed, no archives) despite reviews confirming Prima is sold there (AGG-05).

### 1.9 Priority of name use and registrations (context — Confirmed, primary sources)
- FCA Register: the broker has traded as **"Prima Insurance Brokers" since 17 May 2019**;
  the insurer's FCA trading name is bare **"Prima"** (effective 24 Mar 2025, authorised
  18 Aug 2025; previously an appointed representative displaying FRN 770419) (LEG-01–03, WB-08).
- Wayback: primainsurance.co.uk archived from **26 Oct 2021** with 0330 088 1135; Hello
  Prima's UK site has no archived content before **29 May 2023** (WB-01).
- UK trade marks (class 36, motor insurance): only PRIMA ASSICURAZIONI S.p.A. holds live
  "hello prima"/"HELLO PRIMA"/"prima +" marks (filed 05/07/2021). **No "prima insurance"
  mark exists; the broker owns no registered marks** — its position would rest on
  unregistered rights/passing off (LEG-16, LEG-17 — matter for lawyers, recorded neutrally).

---

## 2. What was NOT found (stated plainly)

1. **No public page anywhere was found that publishes 0330 088 1135 or 0161 826 1620 as
   Hello Prima's / Prima car insurance's number.** Checked exhaustively across search
   engines (explicit zero-result captures preserved), all ten aggregator domains, 950
   Trustpilot reviews, directories, reverse-phone databases, social platforms and the
   whole Wayback record of helloprima.co.uk (NUM-08, AGG-12, TP-20, DIR-11, SOC-09, WB-07).
   Verdict: **not confirmed** — see `wrong_number_investigation.md`.
2. **No customer post says in terms "I called the wrong Prima number"** on any indexed
   public platform (the closest is REV-03 above, plus the probable TP-01 review).
3. **No misdirected reviews confirmed on the broker's Google/Feefo profiles** (only 4
   Google reviews, all genuine; Feefo reviews all 2021–early 2022) (REV-12).
4. **Reverse-phone databases hold zero reports** for either broker number (DIR-11).
5. Smart Money People, Reviews.io, Review Centre and MSE list neither business (REV-17).

These negatives matter: the pack evidences a strong, multi-channel **confusion
mechanism** and individual instances of consumer confusion, but does **not** currently
contain a public capture of the broker's numbers being published *as* Hello Prima's.
Completed misdirected contacts would need the broker's own call logs, call recordings,
misdirected emails/complaints and staff attestations to evidence.

## 3. Confirmed facts vs allegation status

| Allegation (from brief) | Status |
|---|---|
| Broker's numbers shown/suggested in connection with Hello Prima | **Partially confirmed** — shown *to* Hello-Prima-intent searchers at rank #1 (SE-01/02/03) and attributed to Hello Prima by AI summaries (SE-07, DIR-12, AI-15); **not confirmed** as published by any static page |
| Customers cannot reach Hello Prima / cannot find number | **Confirmed** — repeated first-person reviews (TP-05–TP-10, REV-04–09) |
| Customers told "wrong Prima" | **One confirmed instance** (REV-03, wrong Prima not named); otherwise not found |
| Aggregator displayed broker's contact details for Hello Prima | **Not confirmed** — no aggregator shows any contact details at all (AGG-12); ambiguity is the bare "Prima" branding (Cat J) |
| Search engines/AI generate misleading contact details | **Confirmed** (SE-07, AI-03, AI-15, DIR-12) |
| Reviews wrongly posted to the broker | **Probable, one instance** (TP-01) |
| Directory mixing of the two firms' data | **Not confirmed** for wrong numbers; naming mixing confirmed (DIR-07 "Prima Insurance" = broker; Cylex "Prima Insurance, London" = insurer) |

## 4. Regulatory materiality (context only — see `agent_reports/agent8_legal_regulatory.md`)
Misdirected contacts, claims, complaints and personal data engage: FCA Principle 7 /
ICOBS 2.2.2R (clear, fair, not misleading), Consumer Duty PRIN 2A.2.8R–2A.2.9R
(foreseeable harm incl. distribution chain) and PRIN 2A.6.2R (consumer support without
unreasonable barriers), DISP 1.7.1R (prompt forwarding of wrong-firm complaints) and
DISP 1.6.2R (8-week/FOS clock), and UK GDPR Art. 4(12)/5(1)(f) if personal data reaches
the wrong firm. Nothing in this pack shows either firm has breached any rule.

## 5. Recommended next evidence steps
1. Broker call logs/recordings and misdirected email/complaint/payment records
   (first-party evidence of completed misdirection — the gap in this pack).
2. Re-test Google AI Overviews and Bing Copilot from a UK residential/consumer browser
   (bot-blocked here; block pages preserved).
3. Establish whether any commercial relationship exists with kaeltripton.com (see §1.7 caveat).
4. Compare the Market provider pages via a consumer browser (uninspectable here).
5. Trustpilot pages beyond the page-10 login wall, via an authenticated account if
   lawyers approve.

*Forensic note: every finding cited above carries a screenshot and (where feasible) an
HTML source archive; filenames are recorded per finding in `evidence_register.csv` and
the agent reports. Nothing in this summary overstates the underlying captures; where a
finding is probable rather than confirmed it is labelled as such.*
