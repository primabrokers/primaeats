# Agent 1a — Search Engine Evidence (general queries)

Agent: 1a (SEARCH ENGINES — general queries). ID prefix: SE-.
Date of all captures: 2026-07-02, approx 01:28–02:15 UTC.
Engines used: DuckDuckGo (html endpoint, region uk-en), Bing (cc=gb, en-GB), plus the WebSearch tool for text snippets. Google was CAPTCHA-blocked (see Access blockers).
Scope: the first (~26) general queries from the Agent 1 list; SERP screenshots + HTML archives for every query on both engines (52 captures, 0 failures), plus key landing pages a searcher would click.

## Summary

- **Confirmed: the broker's real phone number 0330 088 1135 (and email info@primainsurance.co.uk) is displayed directly on the search results page** for almost every generic "Prima" contact query on DuckDuckGo UK — including fully Hello-Prima-branded queries ("hello prima contact", "helloprima contact number", "helloprima phone number"). The number appears inside the snippet of primainsurance.co.uk/contact, which is titled simply "Contact | Prima".
- **Confirmed: for "prima insurance phone number" the broker's contact page is the #1 result on BOTH DuckDuckGo and Bing**, above helloprima.co.uk, with "0330 088 1135" visible in the snippet without any click. On Bing the #1 organic broker result sits directly beneath a map/entity card for Hello Prima's London office labelled "Prima Insurance" — the two firms are visually indistinguishable ("Prima" vs "Prima Insurance Brokers", both titled "Contact | Prima" / "Prima Insurance").
- **Confirmed: the broker's second number 0161 826 1620 appears on the SERP for complaints queries.** DDG "prima insurance complaints" and "prima complaints phone number" surface primainsurance.co.uk/terms-conditions with the snippet "…contact us in writing at Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620."
- **Confirmed: cancellation searches route to the broker.** For "prima insurance cancellation" and "prima car insurance cancellation", the broker's Terms & Conditions page ranks #1–2 on both engines with the snippet "…Prima Financial Services Ltd, Cancellations Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0330 118 0404" — a Hello Prima customer trying to cancel is shown the broker's cancellations department and a third broker phone number on the SERP itself.
- **Confirmed: both businesses appear together in the top ~10 results for 24 of 26 queries tested** (see table). For contact/phone/cancellation/wrong-number queries the broker is typically ranked #1–4.
- **Confirmed: AI search summaries conflate the two firms.** The WebSearch AI answer for "prima car insurance contact" stated verbatim: "UK Contact Information (Prima - helloprima.co.uk): General inquiries: 0330 088 1135 … or mail: Prima House, 21 Bury New Road, Prestwich, M25 9JZ" — i.e. it attributed the broker's phone number and address to helloprima.co.uk. Similar blending occurred for "prima insurance phone number", "prima car insurance phone number" and "prima insurance wrong number".
- **Confirmed: third-party SEO/claims pages compound the misdirection.** kaeltripton.com publishes "Prima Car Insurance Contact UK 2026: Phone, Claims & Complaints" that repeatedly tells readers to use primainsurance.co.uk (the broker) for customer service, claims and complaints about "Prima car insurance". claimsnumber.com (an "independent claims management company") and prima.theclaimscentre.net (a "Claims Centre" portal with Bolton 01204 numbers) also rank prominently for Prima claims queries.
- A third brand, Prima Group (a housing association, freephone 0333 355 9000), pollutes "prima complaints/contact phone number" results, adding further ambiguity; AI summaries offered its number for Prima complaints.
- Directory noise: Cylex lists Hello Prima's London office as "Prima Insurance, London"; wheree.com lists "PRIMA INSURANCE" at 71-73 Carter Ln London with no phone. These strip the "Hello" brand from the insurer, making the broker's "Prima Insurance" results look like the same firm.
- Baseline for comparison: Hello Prima's genuine contact routes are 020 3318 9745 and claims@helloprima.co.uk / help@helloprima.co.uk (verified from helloprima.co.uk/claims via Wayback capture 15 Oct 2025). Its correct number appears far less often in snippets than the broker's number does.
- **Honest gaps:** no SERP result was found in which a customer states they phoned/emailed the wrong Prima ("wrong prima", "different prima", "not the same prima" queries returned no such posts — Category D not evidenced from search engines); and no page was found publishing 0330 088 1135 / 0161 826 1620 *inside Hello Prima's own materials*. The confusion mechanism evidenced here is SERP-level co-ranking plus snippet display of the broker's details for insurer-intent queries.
- Google could not be tested (reCAPTCHA bot-block; screenshot preserved). Findings rest on DuckDuckGo UK and Bing UK, plus AI-summary behaviour.

## Which results appear for each query (top-10, 2026-07-02)

bk = rank of primainsurance.co.uk (broker); hp = rank of helloprima.co.uk/.com (insurer); num = a real broker phone number (0330 088 1135, 0161 826 1620 or 0330 118 0404) visible in SERP HTML/snippet. "-" = not in top ~10 / not present.

| Query | DDG bk | DDG hp | DDG num | Bing bk | Bing hp | Bing num |
|---|---|---|---|---|---|---|
| prima insurance | 3 | 1 | Y | 3 | 1 | - |
| prima insurance contact | 1 | 2 | Y | 1 | 2 | - |
| prima insurance phone number | 1 | 2 | Y | 1 | 2 | Y |
| prima insurance email | 1 | 2 | Y | 2 | 1 | Y |
| prima car insurance contact | 2 | 1 | Y | 1 | 2 | - |
| prima car insurance phone number | 2 | 3 | Y | 1 | 2 | - |
| prima car insurance email | 3 | 2 | Y | 1 | 2 | - |
| hello prima contact | 4 | 1 | Y | 4 | 1 | - |
| hello prima contact number | 2 | 1 | - | 2 | 1 | - |
| helloprima contact number | 3 | 1 | Y | 2 | 1 | - |
| helloprima phone number | 4 | 1 | Y | 4 | 1 | - |
| hello prima insurance complaints | 9 | 1 | - | - | 4 | - |
| prima insurance complaints | 7 | 2 | Y (0161) | - | 1 | Y (0161) |
| prima insurance claims | 5 | 1 | Y | 5 | 1 | - |
| prima car insurance claims | 6 | 1 | Y | 6 | 1 | - |
| prima claims phone number | 2 | 1 | Y | 2 | 1 | Y |
| prima complaints phone number | 5 | 9 | Y (0330+0161) | 5 | - | - |
| prima insurance cancellation | 2 | 1 | Y (0330 118 0404) | 2 | 1 | Y |
| prima car insurance cancellation | 1 | 2 | Y (0330 118 0404) | 1 | 2 | Y |
| prima insurance MTA | 4 | 1 | - | 4 | 1 | - |
| prima insurance change car | 4 | 1 | Y | 4 | 1 | - |
| prima insurance wrong number | 1 | 2 | Y | 1 | 2 | - |
| prima insurance wrong email | 1 | 2 | Y | 1 | 2 | - |
| prima insurance wrong prima | 3 | 1 | Y | 6 | 1 | - |
| different prima insurance | - | 3 | - | 6 | 1 | - |
| not the same prima insurance | - | 1 | - | - | 1 | - |

Both firms appear together in the top ~10 for 24/26 queries. On DDG UK the broker's live phone number/email is rendered in a snippet for 21/26 queries.

Screenshots/HTML for every row: `screenshots/2026-07-02_ddg_<slug>_serp.png`, `screenshots/2026-07-02_bing_<slug>_serp.png` and matching `.html` in `source_archive/` (slug = query with hyphens, e.g. `prima-insurance-phone-number`).

## Findings

### SE-01 — Broker phone + email shown as #1 result for "prima insurance phone number" (DDG)
- Category: A (wrong-number exposure) + I (search-result ambiguity)
- Source/platform: DuckDuckGo (html endpoint, region UK)
- URL: https://duckduckgo.com/html/?q=prima+insurance+phone+number&kl=uk-en
- Page title: "prima insurance phone number at DuckDuckGo"
- Search query used: prima insurance phone number
- Date/time accessed (UTC): 2026-07-02 ~01:45
- Exact quote/snippet (verbatim, result #1, primainsurance.co.uk/contact/, titled "Contact | Prima"): "Business Insurance Personal Insurance News About Contact Phone 0330 088 1135 Email info@primainsurance.co.uk Business Insurance Personal Insurance News About Contact Secure payment"
- Screenshot: 2026-07-02_ddg_prima-insurance-phone-number_serp.png
- HTML archive: 2026-07-02_ddg_prima-insurance-phone-number_serp.html
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: The broker's number and email are the first thing a consumer sees, ranked above helloprima.co.uk (#2). Result #6 ("Prima | Leading Business Insurance Brokers", primainsurance.co.uk) repeats the same number. A Hello Prima customer searching this exact phrase is more likely to dial 0330 088 1135 than any Hello Prima number. This directly evidences the mechanism by which misdirected calls would occur; it does not by itself prove any individual call happened.

### SE-02 — Bing #1 result for "prima insurance phone number" is the broker, beneath a Hello Prima entity card
- Category: A + I
- Source/platform: Bing
- URL: https://www.bing.com/search?q=prima+insurance+phone+number&cc=gb&setlang=en-GB
- Page title: "prima insurance phone number - Search"
- Search query used: prima insurance phone number
- Date/time accessed (UTC): 2026-07-02 ~01:45
- Exact quote/snippet: Entity card top-left: "Prima Insurance — Insurance agency in London, United Kingdom — 30 Stamford St, London SE1 9DJ" (this is Hello Prima; Website button links to helloprima.co.uk). First organic result, attributed "Prima Insurance Brokers / primainsurance.co.uk › contact — Contact | Prima": "Speak to our friendly team 0330 088 1135 M Discover Our Insurance Products Business Insurance Personal Insurance News About …". Result #6: "Prima | Leading Business Insurance Brokers — Phone 0330 088 1135 Email info@primainsurance.co.uk Address Prima House, 21 Bury New Rd, Greater, …"
- Screenshot: 2026-07-02_bing_prima-insurance-phone-number_serp.png
- HTML archive: 2026-07-02_bing_prima-insurance-phone-number_serp.html
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: The juxtaposition (insurer's map card labelled "Prima Insurance" immediately above the broker's phone number) is the clearest single capture of the confusion mechanism. Both use the bare name "Prima".

### SE-03 — Broker's contact page ranks #2–4 even for fully Hello-Prima-branded queries
- Category: I (+ A where number shows)
- Source/platform: DuckDuckGo UK and Bing
- URLs: https://duckduckgo.com/html/?q=hello+prima+contact+number&kl=uk-en ; …helloprima+contact+number… ; …helloprima+phone+number… ; …hello+prima+contact… ; and Bing equivalents
- Page titles: "hello prima contact number at DuckDuckGo" etc.
- Search queries used: hello prima contact; hello prima contact number; helloprima contact number; helloprima phone number
- Date/time accessed (UTC): 2026-07-02 ~01:40–01:50
- Exact quote/snippet: DDG "hello prima contact number" result #2 = "Contact | Prima || https://primainsurance.co.uk/contact/". For "helloprima contact number" (#3) and "helloprima phone number" (#4) the same result renders the snippet "…Contact Phone 0330 088 1135 Email info@primainsurance.co.uk…". Bing "hello prima contact number" also ranks primainsurance.co.uk › contact at #2.
- Screenshots: 2026-07-02_ddg_hello-prima-contact-number_serp.png; 2026-07-02_ddg_helloprima-contact-number_serp.png; 2026-07-02_ddg_helloprima-phone-number_serp.png; 2026-07-02_ddg_hello-prima-contact_serp.png; matching 2026-07-02_bing_*.png
- HTML archives: matching .html files
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: Even a customer who knows the brand "Hello Prima" and searches for it by name is served the broker's contact page (titled just "Contact | Prima") within the top 2–4 results, with the broker's number in the snippet. Supplementary: a same-day team capture of Bing "hello prima phone number" (2026-07-02_bing_hello-prima-phone-number_serp.png/.html, shared archive) shows Bing's right-hand/inline entity block for primainsurance.co.uk/about rendering "Prima Insurance Brokers … Prima House, 21 Bury New Rd, Greater, Prestwich, Manchester M25 9JY 0330 088 1135 [email address] Follow" on the SERP for that branded query.

### SE-04 — Broker's 0161 826 1620 complaints number surfaces for "prima insurance complaints" / "prima complaints phone number"
- Category: G (complaint-routing confusion) + A + I
- Source/platform: DuckDuckGo UK (also present in Bing SERP HTML for "prima insurance complaints")
- URL: https://duckduckgo.com/html/?q=prima+complaints+phone+number&kl=uk-en and …prima+insurance+complaints…
- Page titles: "prima complaints phone number at DuckDuckGo"; "prima insurance complaints at DuckDuckGo"
- Search queries used: prima insurance complaints; prima complaints phone number
- Date/time accessed (UTC): 2026-07-02 ~01:55
- Exact quote/snippet (verbatim, snippet of primainsurance.co.uk/terms-conditions/, titled "Terms Conditions | Prima"): "If you wish to register a complaint , please contact us in writing at Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620. If you wish to obtain a copy of the firm's Complaint Handling Procedure, please be in contact with us. Please be assured that we treat complaints seriously."
- Screenshots: 2026-07-02_ddg_prima-complaints-phone-number_serp.png; 2026-07-02_ddg_prima-insurance-complaints_serp.png; 2026-07-02_bing_prima-insurance-complaints_serp.png
- HTML archives: matching .html files
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: A Hello Prima customer wanting to complain is shown, on the SERP itself, the broker's Complaints Department postal address and 0161 826 1620. Also notable: the top results for "prima complaints phone number" are complaints pages of Prima Group (a housing association) and Resolver's "Prima Group Complaints" page — three unrelated "Prima" complaint routes on one page, none of them Hello Prima's.

### SE-05 — Cancellation searches surface the broker's Cancellations Department (0330 118 0404) at #1–2
- Category: H (cancellation difficulty/routing) + I
- Source/platform: DuckDuckGo UK and Bing
- URL: https://duckduckgo.com/html/?q=prima+car+insurance+cancellation&kl=uk-en (and prima insurance cancellation; Bing equivalents)
- Page title: "prima car insurance cancellation at DuckDuckGo"
- Search queries used: prima insurance cancellation; prima car insurance cancellation
- Date/time accessed (UTC): 2026-07-02 ~01:56
- Exact quote/snippet (verbatim, snippet of primainsurance.co.uk/terms-conditions/, ranked #1 on DDG for "prima car insurance cancellation"): "7. Cancellation rights If you wish to cancel your policy please contact us in writing at Prima Financial Services Ltd, Cancellations Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0330 118 0404."
- Screenshots: 2026-07-02_ddg_prima-car-insurance-cancellation_serp.png; 2026-07-02_ddg_prima-insurance-cancellation_serp.png; 2026-07-02_bing_prima-insurance-cancellation_serp.png; 2026-07-02_bing_prima-car-insurance-cancellation_serp.png
- HTML archives: matching .html files
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: For the exact phrase a Hello Prima customer would use to cancel a car policy, the broker's T&Cs outrank (DDG #1) or tie with Hello Prima's own T&Cs, and display the broker's cancellation address and phone line in the snippet. This is a plausible route for misdirected cancellation letters/calls and payments.

### SE-06 — Broker details on the generic "prima insurance" SERP; carousel interleaves both firms
- Category: I (+ A)
- Source/platform: DuckDuckGo UK; Bing
- URL: https://duckduckgo.com/html/?q=prima+insurance&kl=uk-en ; https://www.bing.com/search?q=prima+insurance&cc=gb
- Page titles: "prima insurance at DuckDuckGo"; "prima insurance - Search"
- Search query used: prima insurance
- Date/time accessed (UTC): 2026-07-02 01:28 (Bing/DDG first run; DDG re-captured with UK region ~01:36)
- Exact quote/snippet: DDG result #3 (primainsurance.co.uk/contact/): "Business Insurance Personal Insurance News About Contact Phone 0330 088 1135 Email info@primainsurance.co.uk …". DDG result #8 (primainsurance.co.uk/about/): "Prima Insurance Broker is a trading style of Prima Financial Services Ltd - Authorised and Regulated by the Financial Conduct Authority (FCA REF NO 842275) Prima House, Prima House, 21 Bury New Road, Prestwich, M25 9JZ - …". Bing top-card row mixes "Prima - Great Value Car Insurance Quotes" (Prima/helloprima.co.uk) with "Contact | Prima" attributed to "Prima Insurance Brokers", plus Trustpilot helloprima.co.uk.
- Screenshots: 2026-07-02_ddg_prima-insurance_serp.png; 2026-07-02_bing_prima-insurance_serp.png
- HTML archives: matching .html files
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: Bing's "Deep dive" suggestions for this query include "prima insurance contact number" — steering users toward exactly the queries where the broker ranks #1.

### SE-07 — WebSearch AI summary attributes broker's number and address to helloprima.co.uk
- Category: A + B + C (via AI-generated search summary) 
- Source/platform: WebSearch tool (Claude-based AI search summarisation over live web results)
- URL: n/a (tool output; underlying links included primainsurance.co.uk/contact/ and helloprima.co.uk)
- Page title: n/a
- Search query used: prima car insurance contact
- Date/time accessed (UTC): 2026-07-02 ~01:35
- Exact quote/snippet (verbatim from AI answer): "UK Contact Information (Prima - helloprima.co.uk): General inquiries: 0330 088 1135, email: [email protected], or mail: Prima House, 21 Bury New Road, Prestwich, M25 9JZ" — followed by "General inquiries and quotes: Use the 0330 088 1135 number or email".
- Screenshot: screenshot failed: tool output is text-only (verbatim preserved here and in this report's archive)
- HTML archive: n/a
- Relevance: High
- Direct or indirect: Direct (for the proposition that AI search summaries conflate the firms); Indirect (as to real-world consumer journeys — this specific tool is not a consumer product, but it summarises the same SERPs consumers' AI assistants read)
- Notes: The same pattern recurred: for "prima insurance phone number" the AI answer listed "UK-Based Prima Insurance: General contact: 0330 088 1135" alongside Hello Prima's claims numbers 0333 006 4465 and 020 3318 9745 as if one company; for "prima car insurance phone number" it gave "Alternative general number: 0330 088 1135"; for "prima insurance wrong number" it offered "General Contact: 0330 088 1135". For "prima insurance email" it attributed the broker's email/address as "Prima Insurance's contact email". This is consistent with the brief's concern that AI summaries generate misleading contact details; it supports (but does not by itself prove) that consumer-facing AI assistants (Google AI Overviews, Bing Copilot, ChatGPT etc.) drawing on the same sources will do likewise.

### SE-08 — AI summary gives the broker's cancellation route for "prima car insurance cancellation"
- Category: H (via AI summary)
- Source/platform: WebSearch tool AI summary
- URL: n/a (underlying top links: primainsurance.co.uk/terms-conditions/, helloprima.co.uk policy booklet PDF)
- Page title: n/a
- Search query used: prima car insurance cancellation (also: prima insurance cancellation)
- Date/time accessed (UTC): 2026-07-02 ~01:52
- Exact quote/snippet (verbatim from AI answer titled "How to Cancel Prima Car Insurance"): "If you wish to cancel your policy, you can contact Prima in writing at Prima Financial Services Ltd, Cancellations Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0330 118 0404."
- Screenshot: screenshot failed: tool output is text-only
- HTML archive: n/a
- Relevance: High
- Direct or indirect: Direct (AI-summary conflation)
- Notes: The instruction is drawn from the broker's T&Cs but presented as the way to cancel a Prima CAR insurance policy. It even repeated broker-specific terms (£40 admin fee, Wills Ways partnership clawback) as though they applied to the car policy.

### SE-09 — kaeltripton.com: "Prima Car Insurance Contact UK 2026" article directs readers to primainsurance.co.uk for contact, claims and complaints
- Category: F + G (claims/complaint-routing confusion), supports A/B indirectly
- Source/platform: kaeltripton.com (SEO content site; ranks on WebSearch for "prima insurance complaints")
- URL: https://www.kaeltripton.com/prima-car-insurance-contact-uk-2026/
- Page title: "Prima Car Insurance Contact UK 2026: Phone, Claims & Complaints"
- Search query used: prima insurance complaints (WebSearch); page then fetched directly
- Date/time accessed (UTC): 2026-07-02 ~01:50
- Exact quotes (verbatim): "To contact Prima car insurance in 2026, visit primainsurance.co.uk and navigate to the Contact Us page for the current customer service number, claims line, and account access options." — "★ HOW TO CONTACT PRIMA Visit primainsurance.co.uk and navigate to the Contact Us section for current phone numbers and service hours - numbers change and the official site always carries the live version. For a 24/7 emergency claims line, check your policy schedule or the Claims section of primainsurance.co.uk" — "What is Prima's customer service phone number? Prima's customer service phone number is listed on the Contact Us page at primainsurance.co.uk ." — "How do I file a complaint about Prima? Submit your complaint via the complaints channel on primainsurance.co.uk. Prima must issue a final response within 8 weeks under FCA DISP rules." — "Prima official website: primainsurance.co.uk"
- Screenshot: 2026-07-02_kaeltripton_prima-car-insurance-contact-uk-2026_seo-article.png
- HTML archive: 2026-07-02_kaeltripton_prima-car-insurance-contact-uk-2026_seo-article.html
- Relevance: High
- Direct or indirect: Direct (a third-party page about "Prima car insurance" that names the broker's website as the official contact/claims/complaints channel)
- Notes: The page never mentions helloprima.co.uk, and the primainsurance.co.uk links carry ?ref=kaeltripton.com. Any Hello Prima car-insurance customer landing here is explicitly told to take their customer service, claims and complaints to the broker's website. This directly evidences third-party misattribution of "Prima car insurance" to primainsurance.co.uk.

### SE-10 — "Making a claim - Claims Centre" (prima.theclaimscentre.net) ranks #2–3 for Prima claims queries
- Category: F (claims-routing ambiguity)
- Source/platform: DuckDuckGo UK SERPs; site itself Cloudflare-blocked, verified via Wayback
- URL: https://prima.theclaimscentre.net/ (and /Claim/Motor)
- Page title: "Making a claim - Claims Centre"
- Search queries used: prima insurance claims (DDG #2 and #3); prima claims phone number (DDG #3 and #5); prima insurance phone number (DDG #8)
- Date/time accessed (UTC): 2026-07-02 ~02:00 (Wayback capture of 2025-10 snapshots)
- Exact quote/snippet (verbatim from Wayback copy of prima.theclaimscentre.net): "Get in touch If you would like to discuss anything related to your claim or have any queries please feel free to get in touch. 01204 600 316 We are always happy to help" (root domain theclaimscentre.net shows "01204 600 299 … claims@theclaimscentre.net").
- Screenshots: 2026-07-02_wayback_theclaimscentre-prima_claims-portal.png (live capture 2026-07-02_theclaimscentre_prima-claims-portal_page.png shows Cloudflare block)
- HTML archive: 2026-07-02_wayback_theclaimscentre-prima_claims-portal.html
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: A Prima-branded claims portal on a third-party claims platform (Bolton 01204 numbers) outranks or sits beside both firms for "prima insurance claims". Whether it is a legitimate outsourced handler for either Prima could not be verified (no operator identification on captured pages). Either way it adds a third claims route to an already ambiguous SERP; if it serves the broker's book, Hello Prima customers clicking "Making a claim" here would be filing details with the wrong firm's handler.

### SE-11 — claimsnumber.com "Prima Car Insurance Accident Claim Contact Phone Number" (independent claims-management company) ranks for Prima phone queries
- Category: F
- Source/platform: claimsnumber.com; appears in WebSearch results for "prima insurance phone number", "prima car insurance contact", "prima car insurance phone number", "prima claims phone number"
- URL: https://claimsnumber.com/prima-car-insurance-accident-claim/
- Page title: "Prima Car Insurance Accident Claim Contact Phone Number"
- Search query used: prima insurance phone number (WebSearch)
- Date/time accessed (UTC): 2026-07-02 ~01:38
- Exact quote/snippet (verbatim): "Accident Claims Helpline Tel: 0333 006 4465" … "[WE ARE] AN INDEPENDANT CLAIMS MANAGEMENT COMPANY AND ARE IN NO WAY AFFILIATED WITH OR WORK ON BEHALF OF ANY CAR INSURANCE PROVIDERS OR BROKERS."
- Screenshot: 2026-07-02_claimsnumber_prima-car-insurance-accident-claim_page.png
- HTML archive: 2026-07-02_claimsnumber_prima-car-insurance-accident-claim_page.html
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: Does NOT show the broker's numbers (checked: no 0330 088 1135 / 0161 826 1620). Relevant as context: consumers searching for a Prima claims number are intercepted by a claims-management firm's number (0333 006 4465), demonstrating that "Prima" phone-number searches are already monetised/ambiguous territory.

### SE-12 — Cylex directory listing "Prima Insurance, London" ranks on phone-number SERPs
- Category: K (directory ambiguity) + I
- Source/platform: Cylex UK via DDG/Bing SERPs
- URL: https://london.cylex-uk.co.uk/company/prima-insurance-28049231.html
- Page title (SERP): "Prima Insurance, London"
- Search queries used: prima insurance phone number (DDG #3, Bing #3); prima car insurance contact (DDG #5); hello prima contact number (DDG #9); prima insurance wrong number (DDG #6)
- Date/time accessed (UTC): 2026-07-02 ~01:45
- Exact quote/snippet (verbatim, DDG): "Check Prima Insurance in London, Stamford Street on Cylex and find ☎ 020 3318 9…, contact info, opening hours." (Bing: "21 Apr 2026 · Prima Insurance Alto Building, 30 Stamford St, London, Greater London England, SE1 9LS 020 3318 9745 updated on …")
- Screenshot: 2026-07-02_ddg_prima-insurance-phone-number_serp.png (visible at #3); 2026-07-02_bing_prima-insurance-phone-number_serp.png
- HTML archive: matching .html files
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: This listing is Hello Prima's London office but branded "Prima Insurance" — the broker's trading name. It shows the *correct* Hello Prima number, but by stripping the "Hello" brand it reinforces that "Prima Insurance" = the car insurer, making the broker's identically-branded results (with 0330 088 1135) indistinguishable to consumers.

### SE-13 — wheree.com scraped listing "PRIMA INSURANCE … Auto Insurance Service in Castle Baynard, London City"
- Category: K
- Source/platform: wheree.com (prima-insurance.wheree.com), found via WebSearch for "prima insurance phone number" / "prima claims phone number" / "prima insurance wrong number"
- URL: https://prima-insurance.wheree.com/
- Page title: "PRIMA INSURANCE - Reviews, Photos & Phone Number - Updated July 2026 - Auto Insurance Service in Castle Baynard, London City - Wheree"
- Search query used: prima insurance phone number (WebSearch)
- Date/time accessed (UTC): 2026-07-02 ~01:48
- Exact quote/snippet (verbatim from page JSON-LD): '"telephone": "", "address": { "@type": "PostalAddress", "streetAddress": "71- 73 Carter Ln, London EC4V 5EQ, United Kingdom"'
- Screenshot: 2026-07-02_wheree_prima-insurance_directory-listing.png
- HTML archive: 2026-07-02_wheree_prima-insurance_directory-listing.html
- Relevance: Low
- Direct or indirect: Indirect
- Notes: An auto-generated data-broker page titled "PRIMA INSURANCE … Phone Number" for what appears to be Hello Prima's old Carter Lane address, with an EMPTY telephone field. Consumers landing here for a phone number find none — the kind of dead-end that pushes them back to the SERP where the broker's number is displayed. Deeper directory analysis is Agent 6's scope.

### SE-14 — Prima Group (housing association) pollutes complaints/contact SERPs and AI answers
- Category: I
- Source/platform: DuckDuckGo UK, Bing, WebSearch
- URL: https://www.primagroup.org/complaints ; https://www.primagroup.org/news/introducing-our-new-freephone-number ; https://www.resolver.co.uk/companies/prima-group-complaints/contact-details
- Page titles: "Complaints — Prima Group"; "Introducing Our New Freephone Number: 0333 355 9000 — Prima Group"; "Prima Group Complaints Email & Phone | Resolver UK"
- Search queries used: prima complaints phone number (DDG #1–4); prima insurance complaints (DDG #1); prima insurance phone number (DDG #5); hello prima contact number (DDG #7–8)
- Date/time accessed (UTC): 2026-07-02 ~01:55
- Exact quote/snippet (verbatim from WebSearch AI answer to "prima car insurance contact"): "Prima Group (Roadside Assistance/Emergency): For emergency repairs or incidents: 0333 355 9000" — the AI mislabelled a housing association's repairs line as Prima car-insurance "roadside assistance".
- Screenshots: 2026-07-02_ddg_prima-complaints-phone-number_serp.png; 2026-07-02_ddg_prima-insurance-complaints_serp.png
- HTML archive: matching .html files
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: Demonstrates that "Prima" phone/complaints queries are a genuinely confusing namespace; strengthens the argument that consumers rely on whichever "Prima" number the SERP shows — most often the broker's.

### SE-15 — "prima insurance claims" SERPs: Hello Prima #1 but broker and third parties immediately follow
- Category: F + I
- Source/platform: DuckDuckGo UK and Bing
- URL: https://duckduckgo.com/html/?q=prima+insurance+claims&kl=uk-en (and prima car insurance claims; Bing equivalents)
- Page title: "prima insurance claims at DuckDuckGo"
- Search queries used: prima insurance claims; prima car insurance claims; prima claims phone number
- Date/time accessed (UTC): 2026-07-02 ~01:50
- Exact quote/snippet: DDG order for "prima insurance claims": 1. helloprima.co.uk/claims; 2–3. prima.theclaimscentre.net; 5. primainsurance.co.uk/contact ("…Phone 0330 088 1135 Email info@primainsurance.co.uk…"). For "prima claims phone number": 1. helloprima.co.uk/claims; 2. primainsurance.co.uk/contact (broker number in snippet).
- Screenshots: 2026-07-02_ddg_prima-insurance-claims_serp.png; 2026-07-02_ddg_prima-car-insurance-claims_serp.png; 2026-07-02_ddg_prima-claims-phone-number_serp.png; Bing equivalents
- HTML archives: matching .html files
- Relevance: High
- Direct or indirect: Direct (SERP-level)
- Notes: Hello Prima wins the top slot for claims queries, but the broker's phone number is still the first phone number physically visible on the page for "prima claims phone number" (the helloprima.co.uk snippet shows no number, while the broker snippet at #2 does).

### SE-16 — "wrong prima" / "different prima" / "not the same prima" queries: no direct customer testimony found via search engines
- Category: D — no evidence found (I for the SERP composition)
- Source/platform: DuckDuckGo UK, Bing, WebSearch
- URLs: SERPs archived (see below)
- Page titles: "prima insurance wrong prima at DuckDuckGo" etc.
- Search queries used: prima insurance wrong prima; different prima insurance; not the same prima insurance; prima insurance wrong number; prima insurance wrong email
- Date/time accessed (UTC): 2026-07-02 ~02:00
- Exact quote/snippet: No result contained a customer stating they contacted the "wrong Prima". Notably, DDG "prima insurance wrong number" still returns primainsurance.co.uk/contact as result #1 with the broker's number in the snippet — i.e. even a customer who suspects they have a wrong number is fed the broker's number again.
- Screenshots: 2026-07-02_ddg_prima-insurance-wrong-prima_serp.png; 2026-07-02_ddg_different-prima-insurance_serp.png; 2026-07-02_ddg_not-the-same-prima-insurance_serp.png; 2026-07-02_ddg_prima-insurance-wrong-number_serp.png; 2026-07-02_ddg_prima-insurance-wrong-email_serp.png; Bing equivalents
- HTML archives: matching .html files
- Relevance: Medium (honest negative + the wrong-number SERP composition)
- Direct or indirect: n/a (negative finding)
- Notes: This does not prove such testimony doesn't exist (review/forum agents may find it inside platforms search engines don't snippet); it means general web search does not currently surface it.

### SE-17 — Baseline: Hello Prima's genuine contact details (for contrast)
- Category: M (context — not confusion evidence itself)
- Source/platform: helloprima.co.uk via Wayback Machine (live page Cloudflare-blocked to our fetcher)
- URL: https://web.archive.org/web/20251015211203/https://www.helloprima.co.uk/claims
- Page title: "Making a Motor Insurance Claim - Prima Insurance"
- Search query used: n/a (direct capture)
- Date/time accessed (UTC): 2026-07-02 ~02:05
- Exact quote/snippet (verbatim): "Make a claim online 020 3318 9745 claims@helloprima.co.uk" … "If you need immediate assistance at the scene of the accident, call us on 020 3318 9745. In all other circumstances, it's faster to make a claim online ."
- Screenshot: 2026-07-02_wayback_helloprima-claims-page_official.png (live-block evidence: 2026-07-02_helloprima_claims-page_official.png shows "Just a moment…" Cloudflare page)
- HTML archive: 2026-07-02_wayback_helloprima-claims-page_official.html
- Relevance: Medium (baseline)
- Direct or indirect: Indirect
- Notes: Hello Prima's correct number (020 3318 9745) rarely appears in SERP snippets for the tested queries (its pages rank, but snippets usually contain no phone number), whereas the broker's 0330 088 1135 is rendered in snippet text across most queries. The asymmetry — insurer ranks but hides its number behind a click/help-centre, broker's number is printed on the SERP — is the engine of the plausible misdial journey. Also captured: the broker's own live contact page for reference (2026-07-02_primainsurance_contact-page_official-broker.png/.html: "Get in touch Phone 0330 088 1135 Email info@primainsurance.co.uk Address Prima House, 21 Bury New Road, Prestwich, M25 9JZ").

## Search journey analysis (consumer walkthrough)

What a UK consumer plausibly sees and does (all statements below are backed by the dated screenshots listed above):

1. **"prima insurance"** — Hello Prima ranks #1 on both engines, but positions 3 and 7–8 (DDG) / a top carousel card and organic #3 (Bing) belong to the broker, titled "Contact | Prima" and "About | Prima". On DDG the broker's snippet already shows "Phone 0330 088 1135 Email info@primainsurance.co.uk". Nothing on the page explains that these are two different companies.
2. **"prima car insurance contact"** — broker's contact page is #1 (Bing) / #2 (DDG) with the number in the DDG snippet. A consumer wanting to "contact Prima about my car insurance" very plausibly calls 0330 088 1135 without ever leaving the results page.
3. **"prima insurance claims"** — Hello Prima's claims page is #1, but a Prima-branded third-party "Claims Centre" is #2–3 and the broker (with phone number) #5. A hurried post-accident user may call the first phone number they can see — which is the broker's or the Claims Centre's, not Hello Prima's.
4. **"prima insurance complaints"** — the SERP shows a housing association's complaints page first (DDG), Trustpilot for helloprima.co.uk second, and the broker's T&Cs snippet reading "…register a complaint … Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620". A complaining Hello Prima customer is handed the broker's complaints address/number on the SERP.
5. **"prima insurance phone number"** — the strongest case: broker #1 on both engines with 0330 088 1135 in the visible snippet; on Bing this sits directly under a Hello Prima map card labelled "Prima Insurance". The single most likely outcome of this search is a call to the broker.
6. **"hello prima contact number"** — even with the distinctive "hello" brand, the broker's "Contact | Prima" page is #2 on both engines (and for the one-word variants "helloprima contact number"/"helloprima phone number" the broker's number appears in the snippet). Hello Prima publishes no phone number in its own SERP snippets, so the only phone number printed on the page is, again, the broker's.

**Conclusion:** Yes — on the evidence captured 2026-07-02, a consumer searching any of the six journey phrases on DuckDuckGo UK or Bing UK could very plausibly end up phoning Prima Insurance Brokers (0330 088 1135, or 0161 826 1620 for complaints, or 0330 118 0404 for cancellations). The mechanism is threefold: (a) the broker's pages rank #1–4 for insurer-intent queries and its snippets print live phone numbers; (b) Hello Prima's pages rank but expose no number in snippets; (c) third-party pages (kaeltripton.com, Claims Centre, claims-management sites, directories) either point "Prima car insurance" users to primainsurance.co.uk outright or add further ambiguous "Prima" numbers. This directly evidences search-journey conditions for misdirected contact; it does not by itself prove volumes of actual misdirected calls — that requires the broker's call logs or customer testimony (other agents' scope).

## Sources checked with no relevant results

- WebSearch "prima insurance MTA" — dominated by US MTA (transport authority) results; no confusion evidence.
- WebSearch "prima insurance change car" — Hello Prima portal guidance and generic MSE/MoneySuperMarket articles only.
- WebSearch/DDG/Bing "different prima insurance", "not the same prima insurance", "prima insurance wrong prima" — no customer testimony of wrong-Prima contact (see SE-16).
- freepricecompare.com "Prima Car Insurance - Affordable Cover and Quick Response" — checked in full: no phone numbers or broker references; links only to helloprima.co.uk (no confusion evidence; correctly attributed).
- insuruni.com/prima-car-insurance/ — checked in full: no contact details; links to helloprima.co.uk only.
- Bing SERPs for "hello prima insurance complaints", "not the same prima insurance" — helloprima.co.uk results only, no broker presence.

## Access blockers

- **Google Search**: reCAPTCHA bot-block on every attempt ("Our systems have detected unusual traffic…"). Evidence: 2026-07-02_google_prima-insurance_serp.png (+ .html). Google SERPs, AI Overviews and Google Business Profile panels could not be captured; given DDG(=Bing-backed) and Bing both show the pattern, Google likely behaves similarly, but this is unverified.
- **trustguide.ai** /reviews/prima-insurance ("Read Prima Insurance 547 Reviews Summary 2026") — HTTP 403 to fetcher and Cloudflare "Just a moment…" to the browser (screenshot 2026-07-02_trustguide_prima-insurance_reviews-summary.png shows the block). Unresolved question: which "Prima" its 547 reviews aggregate; WebSearch snippets from it mixed helloprima Trustpilot themes with a quote naming "claim handling partner Broker Direct Plc". Worth a retry by another route.
- **helloprima.co.uk** and **prima.theclaimscentre.net** live pages — Cloudflare-challenged for automated capture; both were captured via Wayback Machine instead (Oct 2025 snapshots).
- WebSearch tool is US-routed; its link lists sometimes lean US (Yelp, Nationwide agencies). DDG/Bing captures were forced to UK region (kl=uk-en / cc=gb) and are the authoritative rank evidence in this report.
