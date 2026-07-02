# Agent 9 — AI Answers / Knowledge Panels / Maps / Contact-Number Scraper Sites

Agent scope: whether search engines' answer boxes, AI summaries, knowledge panels, map
listings and third-party "customer service number" sites present misleading contact
details for "Prima insurance" queries. All captures 2026-07-02, approx. 01:29–01:41 UTC,
UK-localised where the engine allowed it (Bing `cc=gb`; Google `hl=en-GB&gl=gb`).

## Summary

- **Bing renders an AI-generated answer box for "prima insurance claims number" that cites
  BOTH companies as one entity.** The answer ("020 3318 9745 — To make a claim with Prima
  Insurance…") uses Hello Prima's correct claims number, but its two citation tiles are
  `helloprima.co.uk/claims` **and** `primainsurance.co.uk/contact/` (the broker's contact
  page, which displays 0330 088 1135). Bing's answer system treats the broker's contact
  page as a source about "Prima Insurance" the motor insurer (AI-03).
- **Google Maps shows two listings both named simply "Prima Insurance"**: the top result
  (5.0★, 21 Bury New Rd, Prestwich) displays **+44 330 088 1135** — the broker — while the
  second (4.4★, Alto Building, 30 Stamford St, website helloprima.co.uk) is Hello Prima and
  shows **no phone number at all** ("Add place's phone number" appears under "Add missing
  information"). A Maps user looking up their car insurer's number sees only the broker's
  number attached to a "Prima Insurance" listing (AI-07, AI-08, AI-09).
- **On Bing, for every contact-intent query tested, the broker's pages rank at or near #1
  above Hello Prima, and the broker's numbers are the only phone numbers shown in
  snippets.** "prima insurance phone number", "prima car insurance contact number", "prima
  insurance customer service" and "what is the phone number for prima car insurance uk" all
  return primainsurance.co.uk/contact as the first organic result; the snippet shows
  "0330 088 1135" twice for the phone-number query (AI-01, AI-02, AI-05).
- **Even the query "hello prima phone number" surfaces the broker's number as the only
  visible phone number.** Hello Prima's own results are flagged "Missing: phone number" by
  Bing, the broker ranks #2, and the broker's About snippet displays "Prima House, 21 Bury
  New Rd… 0330 088 1135". Bing's related-search chips for this query include "prima
  insurance brokers" and "prima manchester phone number", and a People-also-ask question is
  "How do I contact Prima House?" (the broker's building) (AI-04).
- **For "prima insurance complaints phone number", the only complaints number visible
  anywhere on the Bing SERP is the broker's 0161 826 1620**, via the broker's
  terms-and-conditions snippet ("…Prima Financial Services Ltd, Complaints Department, 21
  Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620"). A People-also-ask
  question reads "How do I register a complaint with Prima Financial Services Ltd?" (AI-06).
- **Controlled AI-summary tests reproduced the misleading-answer behaviour directly.** An
  AI search assistant synthesising live SERP data answered "prima car insurance"
  contact/complaints queries with: "Main Customer Service Number: 0330 088 1135 … These are
  the official Prima car insurance contact numbers for the UK" and "contact them in writing
  at Prima Financial Services Ltd … or by phone on 0161 826 1620". This is not Bing
  Copilot or Google AI Overviews (both inaccessible — see blockers) but demonstrates
  empirically that AI summarisers fed these SERPs output the broker's number/address as the
  car insurer's official contacts (AI-15).
- **A third-party SEO contact-directory page actively routes "Prima car insurance"
  customers to the broker's website.** kaeltripton.com's "Prima Car Insurance Contact UK
  2026: Phone, Claims & Complaints" describes Prima as "an FCA-authorised motor insurance
  provider" yet instructs: "To contact Prima car insurance in 2026, visit
  primainsurance.co.uk and navigate to the Contact Us page for the current customer service
  number, claims line, and account access options" (AI-11).
- **A claims-management lead-generation site publishes its own number as the "Prima
  Accident Number".** claimsnumber.com ("Accident Claims Helpline", an admitted independent
  CMC) titles its page "Prima Car Insurance Accident Claim Contact Phone Number 0333 006
  4465" — a number belonging to neither Prima business (AI-12).
- **A third unrelated "Prima" (Prima Group, a Liverpool housing association, freephone
  0333 355 9000) ranks in every contact-intent SERP tested**, and Bing's own "Deep dive"
  suggestion chip on the phone-number SERP was "prima free phone number 355 9000" (AI-13).
- Honest gaps: Google Search (and therefore Google AI Overviews and any Google knowledge
  panel in web search) was CAPTCHA-blocked for every query; Bing's conversational Copilot
  tab could not be driven headlessly. Findings for those surfaces are stated as
  not-capturable, not as absence of the phenomenon.

## Findings

### AI-01 — Bing SERP "prima insurance phone number": broker's number is the first number shown; Hello Prima panel has none
- **ID:** AI-01
- **Category:** I (search-result ambiguity), with A-relevant content (broker number displayed to insurer-seeking searchers)
- **Source/platform:** Bing web search (cc=gb)
- **URL:** https://www.bing.com/search?q=prima+insurance+phone+number&cc=gb
- **Page title:** prima insurance phone number - Search
- **Search query used:** prima insurance phone number
- **Date/time accessed (UTC):** 2026-07-02 01:29 UTC
- **Exact quote/snippet (verbatim):** Top-left local/entity panel: "Prima Insurance — https://www.helloprima.co.uk — Insurance agency in London, United Kingdom — 30 Stamford St, London SE1 9DJ" (no phone number shown). First organic result: "Prima Insurance Brokers — https://primainsurance.co.uk › contact — Contact | Prima — Speak to our friendly team 0330 088 1135 M Discover Our Insurance Products Business Insurance Personal Insurance News About Contact Phone 0330 088 1135 Email info@primainsurance.co.uk". Later organic rich result: "Prima | Leading Business Insurance Brokers — Phone 0330 088 1135 Email info@primainsurance.co.uk Address Prima House, 21 Bury New Rd, Greater, Prestwich, Manchester M25 9JY Get a quote now".
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.png
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.html
- **Relevance:** High
- **Direct or indirect:** Direct (as to what a searcher sees); indirect as to attribution — the number is correctly labelled "Prima Insurance Brokers"
- **Notes:** The entity/local panel Bing chose for this query is Hello Prima's (helloprima.co.uk) but carries **no phone number**; the first phone number a searcher sees on the page is the broker's 0330 088 1135, twice, in the #1 result. Hello Prima ranks #2 with no number in its snippet. This directly evidences a search journey in which a Hello Prima customer seeking "prima insurance phone number" is most likely to call 0330 088 1135. It does not prove the number is mis-attributed; the labelling is the broker's own.

### AI-02 — Bing SERP "prima car insurance contact number": broker's contact page ranks #1 for an explicitly CAR-insurance query
- **ID:** AI-02
- **Category:** I
- **Source/platform:** Bing web search (cc=gb)
- **URL:** https://www.bing.com/search?q=prima+car+insurance+contact+number&cc=gb
- **Page title:** prima car insurance contact number - Search
- **Search query used:** prima car insurance contact number
- **Date/time accessed (UTC):** 2026-07-02 01:30 UTC
- **Exact quote/snippet (verbatim):** Result 1: "Prima Insurance Brokers — https://primainsurance.co.uk › contact — Contact | Prima — Our team is here to help. Fill out the form below, and we'll respond promptly." Hello Prima result 2 annotated by Bing: "Missing: contact number | Must include: contact number". Broker rich result: "Prima | Leading Business Insurance Brokers — Phone 0330 088 1135 Email info@primainsurance.co.uk Address Prima House, 21 Bury New Rd, Greater, Prestwich, Manchester M25 9JY". Bing's suggested follow-up chips at the foot of the page included "Prima office address Prestwich".
- **Screenshot filename:** 2026-07-02_bing_prima-car-insurance-contact-number_serp.png
- **HTML archive filename:** 2026-07-02_bing_prima-car-insurance-contact-number_serp.html
- **Relevance:** High
- **Direct or indirect:** Direct (search-journey evidence)
- **Notes:** For a query that can only sensibly mean the motor insurer, the broker outranks Hello Prima, Hello Prima's own homepage is marked "Missing: contact number", and the only 03xx number in any snippet is the broker's. Bing's algorithmic follow-up suggestion "Prima office address Prestwich" steers car-insurance searchers to the broker's premises. A companion capture of the natural-language query "what is the phone number for prima car insurance uk" (screenshot 2026-07-02_bing_what-is-phone-number-prima-car-insurance_serp.png, HTML archived, 01:38 UTC) again returned primainsurance.co.uk/contact as result #1.

### AI-03 — Bing AI-generated answer box for "prima insurance claims number" cites the broker's contact page as a source
- **ID:** AI-03
- **Category:** F (claims-routing confusion) + I; also D-relevant (engine treats two firms as one)
- **Source/platform:** Bing web search generated answer ("genserp" answer box)
- **URL:** https://www.bing.com/search?q=prima+insurance+claims+number&cc=gb
- **Page title:** prima insurance claims number - Search
- **Search query used:** prima insurance claims number
- **Date/time accessed (UTC):** 2026-07-02 01:30 UTC
- **Exact quote/snippet (verbatim):** Answer box: "020 3318 9745 — To make a claim with Prima Insurance, you can call their claims number at 020 3318 9745 for immediate assistance at the scene of an accident. For other inquiries, you can fill out a contact form on their website." Source attribution shown as "Prima +1" with two citation tiles rendered beneath: "Prima — Making a Motor Insurance Claim - Prima Insurance" and "Prima Insurance Brokers — Contact | Prima". In the archived HTML the answer's citation elements are `<div class="gs_cit" data-url="https://www.helloprima.co.uk/claims">` and `<div class="gs_cit" data-url="https://primainsurance.co.uk/contact/">`.
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-claims-number_serp.png
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-claims-number_serp.html
- **Relevance:** High
- **Direct or indirect:** Direct
- **Notes:** This is the only true AI answer box captured. The number it gives (020 3318 9745) is Hello Prima's own claims line, so the headline answer is correct. But the machine-generated answer's second cited source — presented as an equal "Prima Insurance" source and one click away — is the broker's contact page (0330 088 1135). This directly evidences that Bing's AI answer system conflates the two businesses as a single "Prima Insurance" entity when answering claims-contact queries. It does not prove any customer actually mis-dialled.

### AI-04 — Bing SERP "hello prima phone number": broker's 0330 088 1135 is the only phone number visible; Bing suggests "prima insurance brokers"
- **ID:** AI-04
- **Category:** I, with A-relevant content
- **Source/platform:** Bing web search (cc=gb)
- **URL:** https://www.bing.com/search?q=hello+prima+phone+number&cc=gb
- **Page title:** hello prima phone number - Search
- **Search query used:** hello prima phone number
- **Date/time accessed (UTC):** 2026-07-02 01:31 UTC
- **Exact quote/snippet (verbatim):** Result 1 (Hello Prima homepage) annotated: "Missing: phone number | Must include: phone number". Result 2: "Prima Insurance Brokers — https://primainsurance.co.uk › contact — Contact | Prima — Our team is here to help." Broker About snippet: "About | Prima — Prima House, 21 Bury New Rd, Greater, Prestwich, Manchester M25 9JY 0330 088 1135 [email protected] Follow". People also ask included: "How do I contact Prima House?". "Deep dive into hello prima phone number" chips included: "prima manchester phone number" and "prima insurance brokers".
- **Screenshot filename:** 2026-07-02_bing_hello-prima-phone-number_serp.png
- **HTML archive filename:** 2026-07-02_bing_hello-prima-phone-number_serp.html
- **Relevance:** High
- **Direct or indirect:** Direct (search-journey evidence)
- **Notes:** Even when the customer uses the insurer's distinctive brand ("hello prima"), Bing flags the insurer's pages as lacking a phone number, ranks the broker #2, shows the broker's 0330 088 1135 as the only UK insurance phone number in any snippet, and its related-search suggestions push the searcher toward "prima insurance brokers"/"prima manchester phone number". Strong support for the misdial hypothesis; consistent with customers ending up on 0330 088 1135.

### AI-05 — Bing SERP "prima insurance customer service": broker's contact page is first organic result
- **ID:** AI-05
- **Category:** I
- **Source/platform:** Bing web search (cc=gb)
- **URL:** https://www.bing.com/search?q=prima+insurance+customer+service&cc=gb
- **Page title:** prima insurance customer service - Search
- **Search query used:** prima insurance customer service
- **Date/time accessed (UTC):** 2026-07-02 01:31 UTC
- **Exact quote/snippet (verbatim):** First organic result (after a sponsored Zendesk ad): "Prima Insurance Brokers — https://primainsurance.co.uk › contact — Contact | Prima — Our team is here to help. Fill out the form below, and we'll respond promptly." Followed by "Prima — https://www.helloprima.co.uk — Prima - Great Value Car Insurance Quotes…".
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-customer-service_serp.png
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-customer-service_serp.html
- **Relevance:** Medium
- **Direct or indirect:** Direct (search-journey evidence)
- **Notes:** Confirms the pattern across a fifth contact-intent query: broker above insurer. No answer box or phone number rendered above the fold for this query.

### AI-06 — Bing SERP "prima insurance complaints phone number": the only complaints number on the page is the broker's 0161 826 1620
- **ID:** AI-06
- **Category:** G (complaint-routing confusion) + I
- **Source/platform:** Bing web search (cc=gb)
- **URL:** https://www.bing.com/search?q=prima+insurance+complaints+phone+number&cc=gb
- **Page title:** prima insurance complaints phone number - Search
- **Search query used:** prima insurance complaints phone number
- **Date/time accessed (UTC):** 2026-07-02 01:40 UTC
- **Exact quote/snippet (verbatim):** Broker terms snippet: "Terms Conditions | Prima — https://primainsurance.co.uk › terms-conditions — If you wish to register a complaint, please contact us in writing at Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620." Hello Prima result annotated: "Missing: phone number | Must include: phone number". People also ask included: "How do I register a complaint with Prima Financial Services Ltd?"
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-complaints-phone-number_serp.png
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-complaints-phone-number_serp.html
- **Relevance:** High
- **Direct or indirect:** Direct (search-journey evidence)
- **Notes:** A Hello Prima customer searching for a complaints number sees exactly one complaints phone number and one complaints postal address on the whole SERP — both the broker's (0161 826 1620 / Prima Financial Services Ltd, Prestwich). Bing's People-also-ask even reframes the generic query as a question about Prima Financial Services Ltd. This is the plausible source of misdirected FOS-preliminary complaints to the broker.

### AI-07 — Google Maps "prima insurance": two listings both named "Prima Insurance"; only the broker's shows a phone number (+44 330 088 1135)
- **ID:** AI-07
- **Category:** K (directory/data ambiguity) + I; A-relevant content
- **Source/platform:** Google Maps
- **URL:** https://www.google.com/maps/search/prima+insurance/@53.4808,-2.2426,11z
- **Page title:** prima insurance - Google Maps
- **Search query used:** prima insurance (Maps, Manchester viewport)
- **Date/time accessed (UTC):** 2026-07-02 01:37 UTC
- **Exact quote/snippet (verbatim):** Results panel, listing 1: "Prima Insurance — 5.0 ★★★★★ — 21 Bury New Rd — Closed · Opens 9 AM — +44 330 088 1135". Listing 2: "Prima Insurance — 4.4 ★★★★ — Insurance agency · Alto Building, 30 Stamford St — Closed · Opens 9 AM" (no phone number displayed). Also listed: Prima Vets, Marsh Commercial, Broker Direct PLC, Prima Finance Brokers, Primas Law.
- **Screenshot filename:** 2026-07-02_googlemaps_prima-insurance-manchester_search.png
- **HTML archive filename:** 2026-07-02_googlemaps_prima-insurance-manchester_search.html
- **Relevance:** High
- **Direct or indirect:** Direct
- **Notes:** On Google Maps the two businesses are indistinguishable by name — both display as "Prima Insurance" with no "Brokers"/"Hello" qualifier in the list view. The broker's listing carries the phone number +44 330 088 1135; the insurer's carries none. A Maps user searching "prima insurance" to phone their car insurer is presented the broker's number as the only "Prima Insurance" number. This is the strongest maps-surface finding and directly supports the wrong-number vector, while noting the number is attached to the broker's own (correctly-located) listing rather than to Hello Prima's listing.

### AI-08 — Hello Prima's Google Business Profile has no phone number at all
- **ID:** AI-08
- **Category:** K + E (contributes to contact difficulty)
- **Source/platform:** Google Maps place card (Google Business Profile)
- **URL:** https://www.google.com/maps/search/prima+insurance/@51.5072,-0.1276,11z (resolves to the Hello Prima place card)
- **Page title:** Prima Insurance - Google Maps
- **Search query used:** prima insurance (Maps, London viewport)
- **Date/time accessed (UTC):** 2026-07-02 01:37 UTC
- **Exact quote/snippet (verbatim):** "Prima Insurance — 4.4 ★★★★ — Insurance agency — Alto Building, 30 Stamford St, London SE1 9LS, United Kingdom — helloprima.co.uk — Add missing information: Add place's phone number".
- **Screenshot filename:** 2026-07-02_googlemaps_prima-insurance-london_search.png
- **HTML archive filename:** 2026-07-02_googlemaps_prima-insurance-london_search.html
- **Relevance:** High
- **Direct or indirect:** Direct
- **Notes:** Google itself prompts "Add place's phone number" on Hello Prima's profile — i.e. the insurer's Google listing publishes no telephone number. This is the mechanism behind the whole pattern: the customer's most natural lookup surfaces (knowledge panel / Maps) contain no number for the insurer, so the broker's identically-named listing/number fills the vacuum. Also note the profile is named "Prima Insurance", not "Hello Prima".

### AI-09 — Broker's Google place card is named simply "Prima Insurance" with +44 330 088 1135
- **ID:** AI-09
- **Category:** K + I
- **Source/platform:** Google Maps place card
- **URL:** https://www.google.com/maps/search/prima+insurance+prestwich
- **Page title:** Prima Insurance - Google Maps
- **Search query used:** prima insurance prestwich (Maps)
- **Date/time accessed (UTC):** 2026-07-02 01:38 UTC
- **Exact quote/snippet (verbatim):** "Prima Insurance — 5.0 ★★★★★ — 21 Bury New Rd, Prestwich, Manchester M25 9JZ, United Kingdom — primainsurance.co.uk — +44 330 088 1135 — Claim this business".
- **Screenshot filename:** 2026-07-02_googlemaps_prima-insurance-prestwich_place.png
- **HTML archive filename:** 2026-07-02_googlemaps_prima-insurance-prestwich_place.html
- **Relevance:** Medium
- **Direct or indirect:** Direct
- **Notes:** Confirms the broker's Google listing displays name "Prima Insurance" (identical to Hello Prima's listing name) with 0330 088 1135, and is marked "Claim this business" (unclaimed/auto-generated). Neutral point: the identical naming is on Google's surface; neither firm's listing disambiguates the other.

### AI-10 — Bing Maps resolves "prima insurance uk" to Hello Prima's entity, again with no phone number
- **ID:** AI-10
- **Category:** K + I
- **Source/platform:** Bing Maps
- **URL:** https://www.bing.com/maps?q=prima+insurance+uk
- **Page title:** prima insurance uk - Bing Maps
- **Search query used:** prima insurance uk (Bing Maps)
- **Date/time accessed (UTC):** 2026-07-02 01:36 UTC
- **Exact quote/snippet (verbatim):** "Prima Insurance — https://www.helloprima.co.uk — Insurance agency in London, United Kingdom — 30 Stamford St, London SE1 9DJ — Closed · Opens 9 am — About: Great value car insurance from only £254. Choose from four fully comprehensive cover plans. Get a quote today." (No phone number displayed anywhere on the entity card.)
- **Screenshot filename:** 2026-07-02_bingmaps_prima-insurance-uk_search.png
- **HTML archive filename:** 2026-07-02_bingmaps_prima-insurance-uk_search.html
- **Relevance:** Medium
- **Direct or indirect:** Direct
- **Notes:** Bing's entity for the insurer, like Google's, is named plain "Prima Insurance" and carries no telephone number. Consistent with AI-01/AI-08: on both major engines' map/entity surfaces the insurer is number-less, leaving the broker's published numbers as the answer searchers find.

### AI-11 — Scraper/SEO contact page "Prima Car Insurance Contact UK 2026" directs motor-insurance customers to primainsurance.co.uk (the broker)
- **ID:** AI-11
- **Category:** A-adjacent misdirection (website-level wrong-contact routing) + F + K. Conservatively tagged K/F; the number the reader will reach via the recommended site is 0330 088 1135
- **Source/platform:** kaeltripton.com (third-party "contact details" SEO directory, one of "all 50 contact pages" it sells sponsorship on)
- **URL:** https://www.kaeltripton.com/prima-car-insurance-contact-uk-2026/
- **Page title:** Prima Car Insurance Contact UK 2026: Phone, Claims & Complaints
- **Search query used:** WebSearch: "prima insurance" customer service number UK contact
- **Date/time accessed (UTC):** 2026-07-02 01:35 UTC (first capture 01:35, re-capture 01:39)
- **Exact quote/snippet (verbatim):** "HOW TO CONTACT PRIMA Visit primainsurance.co.uk and navigate to the Contact Us section for current phone numbers and service hours - numbers change and the official site always carries the live version. For a 24/7 emergency claims line, check your policy schedule or the Claims section of primainsurance.co.uk - this number is also printed on your certificate of insurance." And: "To contact Prima car insurance in 2026, visit primainsurance.co.uk and navigate to the Contact Us page for the current customer service number, claims line, and account access options." And: "Prima is an FCA-authorised motor insurance provider operating in the UK market." The page's outbound link is https://www.primainsurance.co.uk/?ref=kaeltripton.com ("Visit Prima official site ->").
- **Screenshot filename:** 2026-07-02_kaeltripton_prima-car-insurance-contact-uk-2026.png
- **HTML archive filename:** 2026-07-02_kaeltripton_prima-car-insurance-contact-uk-2026.html
- **Relevance:** High
- **Direct or indirect:** Direct
- **Notes:** This page is squarely about the motor insurer ("Prima car insurance… FCA-authorised motor insurance provider") yet names primainsurance.co.uk — the broker's domain — as "Prima's official website" for the customer service number, the claims line and even "login URLs". Any reader following it lands on the broker's contact page (0330 088 1135 / info@primainsurance.co.uk). It publishes no number itself, so it is wrong-website rather than wrong-number evidence, but it is a live third-party page (dated "2026") actively conflating the two firms for contact purposes. It ranked in search results for "prima insurance customer service number" queries at capture time.

### AI-12 — Claims-management lead-gen site publishes 0333 006 4465 as the "Prima Car Insurance Accident Claim Contact Phone Number"
- **ID:** AI-12
- **Category:** F (claims-routing confusion) + K
- **Source/platform:** claimsnumber.com ("Accident Claims Helpline")
- **URL:** https://claimsnumber.com/prima-car-insurance-accident-claim/ (duplicate at https://claimsnumber.com/prima/)
- **Page title:** Prima Car Insurance Accident Claim Contact Phone Number
- **Search query used:** WebSearch: "prima car insurance" phone number 0330 contact helpline
- **Date/time accessed (UTC):** 2026-07-02 01:39–01:40 UTC
- **Exact quote/snippet (verbatim):** "Prima Car Insurance Accident Claim Contact Phone Number 0333 006 4465 … Claiming for a Car Accident Prima Insurance or injury? It doesn't get much easier than this. 0333 006 4465 Press Option 1 for New Claims Press Option 2 for Existing Claims". "…you can contact us directly on 0333 006 4465 Prima Accident Number. If you have been involved in a road traffic accident that is not your fault then please call our Prima Accident Number to get your accident claim sorted." Footer: "Accident Claims Helpline Tel: 0333 006 4465 ARE AN INDEPENDANT CLAIMS MANAGEMENT COMPANY AND ARE IN NO WAY AFFILIATED WITH OR WORK ON BEHALF OF ANY CAR INSURANCE PROVIDERS OR BROKERS… 71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ".
- **Screenshot filename:** 2026-07-02_claimsnumber_prima-car-insurance-accident-claim.png (also 2026-07-02_claimsnumber_prima_page.png)
- **HTML archive filename:** 2026-07-02_claimsnumber_prima-car-insurance-accident-claim.html (also 2026-07-02_claimsnumber_prima_page.html)
- **Relevance:** High
- **Direct or indirect:** Direct (misleading contact detail published for "Prima car insurance" claims searches); indirect as to Prima-vs-Prima confusion
- **Notes:** This is the classic "wrong-number vector" the brief describes: a search-indexed page styling a claims-management company's intercept line (0333 006 4465 — belonging to neither Prima business) as "Prima Accident Number". It evidences that "prima car insurance claims/accident number" searches are already monetised by misleading third-party numbers; it does not involve the broker's numbers.

### AI-13 — Third "Prima" (housing association) number 0333 355 9000 ranks across all contact-intent SERPs; Bing suggests it as a related search
- **ID:** AI-13
- **Category:** I
- **Source/platform:** Bing web search / primagroup.org
- **URL:** https://www.primagroup.org/news/introducing-our-new-freephone-number (as ranked in all five Bing SERPs above)
- **Page title:** Introducing Our New Freephone Number: 0333 355 9000 — Prima Group
- **Search query used:** prima insurance phone number (and all four other Bing queries)
- **Date/time accessed (UTC):** 2026-07-02 01:29–01:40 UTC
- **Exact quote/snippet (verbatim):** SERP snippet: "Introducing Our New Freephone Number: 0333 355 … — 7 Oct 2024 · Contact us on 0333 355 9000 for free from landlines and mobiles. Same team, same service, no call charges. Our old number, 0151 452 0202, still …". Bing "Deep dive into prima insurance phone number" suggestion chip: "prima free phone number 355 9000".
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.png (same capture as AI-01)
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Prima Group is a Liverpool housing association (verified via primagroup.org/contact-us: "0333 355 9000" for repairs/customer service; offers tenant home-contents insurance but is not a motor insurer). Its freephone announcement ranks on page 1 of every "prima … number" query tested, and Bing's own related-search machinery promotes "prima free phone number 355 9000" to insurance-number searchers. Context evidence that the "Prima" contact-search space is saturated with third-party numbers, increasing misdial risk generally.

### AI-14 — Cylex directory listing "Prima Insurance, London" supplies 020 3318 9745 where the engines' panels show nothing
- **ID:** AI-14
- **Category:** K
- **Source/platform:** Cylex UK business directory (as ranked #3–#8 in the Bing SERPs)
- **URL:** https://london.cylex-uk.co.uk/company/... (ranked snippet; displayed URL "https://london.cylex-uk.co.uk › company")
- **Page title (as in SERP):** Prima Insurance, London
- **Search query used:** prima insurance phone number / prima insurance complaints phone number
- **Date/time accessed (UTC):** 2026-07-02 01:29 / 01:40 UTC
- **Exact quote/snippet (verbatim):** "Prima Insurance, London — 21 Apr 2026 · Prima Insurance Alto Building, 30 Stamford St, London, Greater London England, SE1 9LS 020 3318 9745 updated on 21/04/2026 — Sunday: Closed".
- **Screenshot filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.png (same captures as AI-01/AI-06)
- **HTML archive filename:** 2026-07-02_bing_prima-insurance-phone-number_serp-agent9.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** A data-broker directory has built a "Prima Insurance" listing from Hello Prima's registered address and its claims number (020 3318 9745) and presents that claims line as the firm's general number, "updated on 21/04/2026". Attribution is to the right company, so this is not wrong-number evidence against the broker; it shows directories filling the insurer's no-published-number vacuum with whatever number they can scrape — the same mechanism that elsewhere surfaces the broker's numbers.

### AI-15 — Controlled test: AI search summaries answer "Prima car insurance" contact/complaints queries with the broker's number and address
- **ID:** AI-15
- **Category:** I (AI-summary ambiguity), A/G-relevant content
- **Source/platform:** AI search assistant summaries (Claude-based WebSearch tool synthesising live US-indexed SERP data), 3 of 4 test queries affected
- **URL:** n/a (tool output; underlying sources were primainsurance.co.uk/contact, primainsurance.co.uk/terms-conditions, helloprima.co.uk/claims, primagroup.org, kaeltripton.com, claimsnumber.com)
- **Page title:** n/a
- **Search queries used:** (a) "prima insurance" customer service number UK contact; (b) "prima car insurance" phone number 0330 contact helpline; (c) prima insurance complaints phone number UK how to complain; (d) "prima" car insurance "contact number" … UK directory
- **Date/time accessed (UTC):** 2026-07-02 01:33–01:38 UTC
- **Exact quote/snippet (verbatim):**
  - (a) "**Main Customer Service Number:** 0330 088 1135 … **Address:** Prima House, 21 Bury New Road, Prestwich, M25 9JZ … **For Motor Insurance Claims:** You can either call 020 3318 9745 or make a claim online"
  - (b) "**General Customer Enquiries:** 0330 088 1135 … The 0330 number you mentioned (0330 088 1135) is associated with Prima Insurance's Manchester office and appears to be their general customer contact line."
  - (c) "To register a complaint with Prima, contact them in writing at Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620."
  - (d) "**Main Customer Service Number:** 0330 088 1135 … These are the official Prima car insurance contact numbers for the UK."
- **Screenshot filename:** screenshot failed: not a browser surface (verbatim tool outputs preserved above and in this report)
- **HTML archive filename:** n/a
- **Relevance:** High (with the caveat below)
- **Direct or indirect:** Direct demonstration of the AI-summary failure mode; NOT evidence of what Bing Copilot or Google AI Overviews show consumers
- **Notes:** These are controlled observations made during this research, using an AI assistant that summarises live search results — the same task Google AI Overviews/Bing Copilot perform. Given the current public web corpus, the assistant repeatedly presented the broker's 0330 088 1135 / 0161 826 1620 / Prestwich address as the official contact and complaints details "for Prima car insurance", blending in Hello Prima's claims line as if one company. This directly evidences that the public source data is sufficient to make a competent AI summariser produce the misleading answer; it is consistent with (but does not prove) consumer-facing AI products doing the same. Consumer-facing Google AI Overviews and Bing Copilot could not be captured (see blockers).

## Sources checked with no relevant results

- Bing SERP "prima insurance customer service" — no answer box or phone number rendered above the organic results (pattern evidence only, AI-05).
- Bing natural-language query "what is the phone number for prima car insurance uk" — no AI answer box triggered on this render; result #1 was the broker's contact page (folded into AI-02). Captures saved: 2026-07-02_bing_what-is-phone-number-prima-car-insurance_serp.png/.html.
- Google Maps "prima insurance" with default (US) geolocation — "Google Maps can't find prima insurance"; superseded by UK-viewport captures (AI-07/AI-08).
- WebSearch for classic UK number-scraper brands (numberdirect / "contact number" directory sites) — no live numberdirect-style page publishing a "Prima Insurance" number was surfaced by the searches run; the scraper pages that do exist are kaeltripton.com (AI-11) and claimsnumber.com (AI-12).
- primagroup.org/contact-us — confirmed Prima Group is a housing association; no insurance-contact conflation on its own site (context for AI-13 only).

## Access blockers

- **Google Search (web SERPs, AI Overviews, knowledge panels):** every query via https://www.google.com/search?...&hl=en-GB&gl=gb returned Google's "unusual traffic" CAPTCHA page. One block-page capture retained as evidence: 2026-07-02_google_prima-insurance-phone-number_captcha-block-agent9.png/.html. **Whether Google AI Overviews show a phone number for these queries could not be determined** — this should be re-tested from a normal residential UK browser; earlier team captures of Google SERPs in this evidence pack are the same CAPTCHA page.
- **Bing Copilot (conversational tab):** the COPILOT tab is present on captured SERPs but the conversational surface requires an interactive, signed-in JS session and could not be driven headlessly. However, Bing's in-SERP generated answer (the AI answer surface most users see) WAS captured — see AI-03.
- **Bing "People also ask" expanded answers:** answers load on click (XHR) and are not present in the static HTML, so the answer text behind e.g. "How do I get in touch with Prima insurance?" / "How do I register a complaint with Prima Financial Services Ltd?" could not be captured.
- **helloprimacover.co.uk** (surfaced in search results as "Prima - Insurance Policy Management Portal"): DNS resolution failed through the research proxy; not inspected.
- WebSearch tool results are US-indexed (UK-specific rankings may differ from the Bing cc=gb captures, which are authoritative for this report).
