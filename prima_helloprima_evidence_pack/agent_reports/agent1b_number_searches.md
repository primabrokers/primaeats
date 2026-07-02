# Agent 1b — Number-specific and site-specific search evidence (ID prefix: NUM-)

Date of research: 2026-07-02 (all captures made between approx. 00:55 and 01:50 UTC).
Engines used: Anthropic WebSearch (Google-index based), DuckDuckGo (html.duckduckgo.com), Bing. Google direct was CAPTCHA-blocked (see Access blockers).
Screenshots: `prima_helloprima_evidence_pack/screenshots/`; HTML copies: `prima_helloprima_evidence_pack/source_archive/`.

## Summary

- **WRONG-NUMBER VERDICT — 0330 088 1135: NOT CONFIRMED.** Across all 6 query variants on WebSearch, DuckDuckGo and Bing, no public page was found that shows 0330 088 1135 in connection with Hello Prima / helloprima.co.uk / Prima car insurance. Every indexed occurrence of the number is attributable to the broker (primainsurance.co.uk, and directory entries for "Prima Protect Insurance Brokers" / "Prima Insurance Brokers" at Bury New Road, Prestwich).
- **WRONG-NUMBER VERDICT — 0161 826 1620: NOT CONFIRMED.** Same result across all 6 query variants. The only substantive indexed source is the broker's own terms page (primainsurance.co.uk/terms-conditions/), which publishes it as the complaints/privacy phone line of Prima Financial Services Ltd, plus broker directory entries (Feefo, BIBA, yably, cylex).
- DuckDuckGo returned **explicit zero-result pages** (captured) for every number + "Hello Prima"/"HelloPrima" combination; Bing had **no exact matches** either — when exact-phrase matches do not exist Bing substitutes unrelated fallback results (captured and documented), which is itself evidence the combination is not indexed.
- **Important nuance (Category I):** although no page ties the broker's numbers to Hello Prima, Google-index (WebSearch) results for queries such as `"0330 088 1135" "Hello Prima"` and `"0161 826 1620" "Hello Prima"` return **both firms' contact pages side by side** (primainsurance.co.uk/contact/ next to helloprima.com/about-us/contact and trustpilot.com/review/helloprima.co.uk). A consumer running that search sees the two Primas interleaved, with the broker's phone number the only phone number in the results.
- **Strong brand-overlap finding (Category D/I): Hello Prima's own website titles its pages "Prima Insurance".** helloprima.co.uk pages are titled "About Prima Insurance - Prima Insurance", "Making a Motor Insurance Claim - Prima Insurance", "Privacy policy: your data protection - Prima Insurance", etc., and its claims-page meta description says "Discover how you make a car insurance claim with Prima Insurance." This is the same term as the broker's trading name "Prima Insurance Broker(s)" and materially increases search ambiguity for "Prima Insurance" contact/claims searches.
- Baseline contact details were captured for both firms (screenshots + HTML): **Broker** — 0330 088 1135, info@primainsurance.co.uk, Prima House, 21 Bury New Road, Prestwich (FCA 842275); 0161 826 1620 published only on its terms page for complaints/privacy. **Hello Prima** — phone 020 3318 9745, claims@helloprima.co.uk / help@helloprima.co.uk, live chat/WhatsApp, Alto Building, 30 Stamford Street, London SE1 9LS (FCA 1031191). The two firms' published contact details do not overlap.
- Site-specific searches of gocompare.com, comparethemarket.com, confused.com and moneysupermarket.com found **no page on any aggregator domain associating either broker number with Prima/Hello Prima**. GoCompare's car-insurance providers page lists "Prima Car Insurance" as a plain text entry with no contact details (captured).
- Two third-party "Prima car insurance" SEO/comparison pages (freepricecompare.com, insuruni.com) were checked: neither publishes any phone number for Prima; insuruni links to helloprima.co.uk. No wrong-number evidence there.
- Gaps/blockers: Google Search (CAPTCHA), Bing `site:` queries (bot challenge), helloprima.co.uk live pages (Cloudflare — mitigated via its Zendesk help centre, which is live, and Wayback Machine), ceoemail.com (bot-gated and not Wayback-archived), vymaps.com listing (404). None of these blockers is likely to conceal wrong-number evidence, since the same content was reachable through alternative routes.

## Wrong-number verdict material (deliverable)

### Number 1: 0330 088 1135
**Verdict: NOT CONFIRMED — no public evidence found associating this number with Hello Prima / Prima car insurance.**

Sources checked (all on 2026-07-02):
| Query | WebSearch (Google index) | DuckDuckGo | Bing |
|---|---|---|---|
| "0330 088 1135" "Prima" | Broker pages only (primainsurance.co.uk, bizseek, Yelp "Prima Protect", mpostcode, LinkedIn) | 3 results, all primainsurance.co.uk | Broker/dir results only |
| "03300881135" "Prima" | 1 result: vymaps "Prima Protect Insurance Brokers" | 0 organic results | No exact match |
| "0330 088 1135" "Hello Prima" | No page containing both; engine interleaves both firms' pages (see NUM-10) | **No results (explicit)** | **No exact match; fallback junk served** |
| "03300881135" "HelloPrima" | No page containing both | **No results (explicit)** | **No exact match; fallback junk served** |
| "0330 088 1135" "car insurance" | Broker + unrelated US pages; no Hello Prima link | Ads only, 0 organic | No exact match |
| "03300881135" "car insurance" | Unrelated US pages only | Ads only, 0 organic | No exact match |

All positive occurrences of 0330 088 1135 found anywhere: primainsurance.co.uk (contact/home/about), bizseek.co.uk (Prima Insurance Brokers, web: primainsurance.co.uk), yelp.com (Prima Protect Insurance Brokers), mpostcode.co.uk, vymaps.com (dead link, "Prima Protect", www.primaprotect.co.uk). All are the broker or its Prima Protect trading style. None mentions car insurance or Hello Prima.

### Number 2: 0161 826 1620
**Verdict: NOT CONFIRMED — no public evidence found associating this number with Hello Prima / Prima car insurance.**

| Query | WebSearch (Google index) | DuckDuckGo | Bing |
|---|---|---|---|
| "0161 826 1620" "Prima" | primainsurance.co.uk/terms-conditions/, yably, cylex, find-open (all broker); Resolver "Prima Group" page (different company, no numbers — checked, NUM-13) | 1 result: primainsurance.co.uk/terms-conditions/ | Broker results only |
| "01618261620" "Prima" | Feefo (Prima Insurance Brokers), BIBA (Prima Financial Services Ltd); prudentplus.co.uk page (checked — no Prima content on live page, NUM-12) | 0 organic | No exact match |
| "0161 826 1620" "Hello Prima" | No page containing both; engine interleaves both firms' pages (NUM-10); ceoemail.com "Prima Subsidiary Ltd" appeared in list but is bot-gated/unverifiable (see blockers) | **No results (explicit, on retry capture)** | **No exact match; fallback junk served** |
| "01618261620" "HelloPrima" | No page containing both | **No results (explicit)** | **No exact match; fallback junk served** |
| "0161 826 1620" "car insurance" | Unrelated US results only | Ads only, 0 organic | No exact match |
| "01618261620" "car insurance" | Unrelated US results only | Ads only, 0 organic | No exact match |

All positive occurrences of 0161 826 1620 / 01618261620 found anywhere: primainsurance.co.uk/terms-conditions/ (complaints + privacy contact of Prima Financial Services Ltd), yably.co.uk, cylex-uk.co.uk, find-open.co.uk (all "Prima Protect Insurance Brokers", 39 Bury New Rd, Prestwich), feefo.com (Prima Insurance Brokers), biba.org.uk (Prima Financial Services Ltd). All broker-side. None mentions Hello Prima or car insurance.

**Overall:** No public page or snippet was found showing either broker number displayed, suggested or repeated in connection with Hello Prima / Prima car insurance. This does not prove customers never dial the broker's numbers when looking for Hello Prima; it establishes that, as of 2026-07-02, no indexed third-party page publishes that wrong association. The confusion mechanism supported by this evidence is instead search-journey ambiguity (NUM-07, NUM-10, NUM-14): both firms surface together, the broker's number is the only phone number shown, and the insurer brands itself "Prima Insurance" in its own page titles.

## Findings

### NUM-01 — Baseline: broker's published contact details
- Category: M (baseline context — supports assessment of A/B/C)
- Source/platform: primainsurance.co.uk (official site)
- URL: https://primainsurance.co.uk/contact/
- Page title: Contact | Prima
- Search query used: direct fetch (also surfaced by `"0330 088 1135" "Prima"`)
- Date/time accessed: 2026-07-02 ~01:05 UTC
- Exact quote: "Speak to our friendly team 0330 088 1135" / "Email info@primainsurance.co.uk" / "Prima House, 21 Bury New Road, Prestwich, M25 9JZ" / "Prima Insurance Broker is a trading style of Prima Financial Services Ltd - Authorised and Regulated by the Financial Conduct Authority (FCA REF NO 842275)"
- Screenshot: 2026-07-02_primainsurance_contact-page.png
- HTML archive: 2026-07-02_primainsurance_contact-page.html
- Relevance: High (baseline)
- Direct or indirect: Direct documentation of the broker's published details
- Notes: HTML contains 0330 088 1135 six times plus tel:03300881135 link and info@primainsurance.co.uk five times. 0161 826 1620 is NOT on the contact page.

### NUM-02 — Baseline: broker's 0161 826 1620 is its published complaints/privacy line
- Category: M (baseline context)
- Source/platform: primainsurance.co.uk
- URL: https://primainsurance.co.uk/terms-conditions/
- Page title: Terms Conditions | Prima
- Search query used: `"0161 826 1620" "Prima"` (DDG/WebSearch), then direct fetch
- Date/time accessed: 2026-07-02 ~01:10 UTC
- Exact quote: "If you wish to register a complaint, please contact us in writing at Prima Financial Services Ltd, Complaints Department, 21 Bury New Road, Prestwich, M25 9JY or by phone on 0161 826 1620."
- Screenshot: 2026-07-02_primainsurance_terms-conditions.png
- HTML archive: 2026-07-02_primainsurance_terms-conditions.html
- Relevance: High (baseline)
- Direct or indirect: Direct
- Notes: This is the only substantive indexed source of the 0161 number besides directories. Notably it is the broker's **complaints** line — a customer googling "Prima insurance complaints number" can land here (relevant to Agent 1a/搜索 journey work).

### NUM-03 — Baseline: Hello Prima's published contact details (live help centre)
- Category: M (baseline context)
- Source/platform: Hello Prima help centre (Zendesk, live)
- URL: https://help.helloprima.co.uk/hc/en-gb/p/contact_us
- Page title: Help centre | Prima car insurance — "Contact us"
- Search query used: located via Wayback CDX of helloprima.co.uk, fetched live
- Date/time accessed: 2026-07-02 ~01:15 UTC
- Exact quote: "Contact us General support ... Fastest Live chat 9am to 6pm, Monday to Saturday Whatsapp 9am to 6pm, Monday to Saturday Contact form Prefer to call? Our lines are open 9am to 6pm, Monday to Friday. ... 020 3318 9745" / "Prima Subsidiary Ltd, trading as 'Prima', is authorised and regulated by the Financial Conduct Authority under reference 1031191. Prima is registered in England (12728615). Our registered office is Alto Building, 30 Stamford Street, London, SE1 9LS."
- Screenshot: 2026-07-02_helloprima_help-contact-us.png
- HTML archive: 2026-07-02_helloprima_help-contact-us.html
- Relevance: High (baseline)
- Direct or indirect: Direct
- Notes: Hello Prima's only published general phone number is 020 3318 9745. Neither 0330 088 1135 nor 0161 826 1620 appears anywhere on its pages. Contact emphasis is chat/WhatsApp-first — context for contact-difficulty findings by other agents.

### NUM-04 — Baseline: Hello Prima complaints route
- Category: M (baseline context; G context)
- Source/platform: Hello Prima help centre (live)
- URL: https://help.helloprima.co.uk/hc/en-gb/articles/9983382260369-What-if-I-need-to-make-a-complaint
- Page title: What if I need to make a complaint? – Help centre | Prima car insurance
- Search query used: Wayback CDX + live fetch; also surfaced by `site:helloprima.co.uk "complaints"`
- Date/time accessed: 2026-07-02 ~01:15 UTC
- Exact quote (extracted text): "...complaints must be made within six months of the date of you received your final response from us. You can find further information about the FOS at www.financialombudsman.org.uk" (page also lists help@helloprima.co.uk and phone 020 3318 9745)
- Screenshot: 2026-07-02_helloprima_help-complaints.png
- HTML archive: 2026-07-02_helloprima_help-complaints.html
- Relevance: Medium (baseline)
- Direct or indirect: Direct
- Notes: Hello Prima's complaints contacts are help@helloprima.co.uk / 020 3318 9745 — entirely different from the broker's 0161 826 1620 complaints line (NUM-02). Two same-named "Prima ... Complaints Department" phone routes exist in the UK insurance sector.

### NUM-05 — Baseline: Hello Prima claims page (Wayback copy; live page Cloudflare-gated)
- Category: M (baseline context; F context)
- Source/platform: Wayback Machine capture (2025-10-15) of helloprima.co.uk/claims
- URL: https://web.archive.org/web/20251015211203/https://www.helloprima.co.uk/claims
- Page title: Making a Motor Insurance Claim - Prima Insurance
- Search query used: direct (live URL "Just a moment..." blocked; Wayback used)
- Date/time accessed: 2026-07-02 ~01:20 UTC
- Exact quote: "Make a claim Accidents can happen day or night. So we're here 24/7 to help put things right. ... Make a claim online 020 3318 9745 claims@helloprima.co.uk" (glass: "Book repair online 0345 999 8000" — Auto Windscreens)
- Screenshot: 2026-07-02_wayback_helloprima_claims.png
- HTML archive: 2026-07-02_wayback_helloprima_claims.html
- Relevance: High (baseline)
- Direct or indirect: Direct
- Notes: Claims number is the same 020 3318 9745. Note the page title uses "Prima Insurance" (see NUM-14).

### NUM-06 — Hello Prima titles its own pages "Prima Insurance"
- Category: D / I (brand-overlap; search-result ambiguity)
- Source/platform: helloprima.co.uk via Wayback Machine (2025-05-20 capture) + live SERP evidence (NUM-14)
- URL: https://web.archive.org/web/2025/https://www.helloprima.co.uk/about-us
- Page title: **About Prima Insurance - Prima Insurance**
- Search query used: `site:helloprima.co.uk "Prima Insurance"`
- Date/time accessed: 2026-07-02 ~01:35 UTC
- Exact quote: title tag "About Prima Insurance - Prima Insurance"; body: "We're Prima Subsidiary Ltd, trading under the name of Prima."
- Screenshot: 2026-07-02_wayback_helloprima_about-us.png
- HTML archive: 2026-07-02_wayback_helloprima_about-us.html
- Relevance: High
- Direct or indirect: Indirect (supports confusion mechanism, does not document a confused customer)
- Notes: The insurer's public-facing page titles use the exact phrase "Prima Insurance", identical to the broker's trading name "Prima Insurance Broker". This is consistent with consumers conflating the two when searching "Prima Insurance" + contact/claims/complaints.

### NUM-07 — DDG SERP: broker's number searches return pages titled just "Prima"
- Category: I (search-result ambiguity)
- Source/platform: DuckDuckGo SERP
- URL: https://duckduckgo.com/html/?q=%220330%20088%201135%22%20%22Prima%22
- Page title: "0330 088 1135" "Prima" at DuckDuckGo
- Search query used: `"0330 088 1135" "Prima"`
- Date/time accessed: 2026-07-02 ~00:58 UTC
- Exact quote (result snippets, verbatim): "Contact | Prima — primainsurance.co.uk/contact/ — Speak to our friendly team 0330 088 1135"; "Prima | Leading Business Insurance Brokers — Phone 0330 088 1135 Email info@primainsurance.co.uk Address Prima House, 21 Bury New Rd, Greater, Prestwich, Manchester M25 9JY"; "About | Prima — primainsurance.co.uk/about/"
- Screenshot: 2026-07-02_ddg_num-0330-prima_serp.png
- HTML archive: 2026-07-02_ddg_num-0330-prima_serp.html
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: The broker's SERP titles read simply "Contact | Prima" / "About | Prima" — a consumer who has this number (e.g. from caller ID) and searches it sees only "Prima", with nothing distinguishing broker from insurer. Companion capture for 0161: 2026-07-02_ddg_num-0161-prima_serp.png (single result: the broker's terms page complaints paragraph, quoted at NUM-02).

### NUM-08 — DDG explicit zero results for every number + Hello Prima combination
- Category: A assessed — **no evidence found** (exculpatory/absence evidence)
- Source/platform: DuckDuckGo SERPs
- URLs: duckduckgo.com/html/?q= for `"0330 088 1135" "Hello Prima"`, `"03300881135" "HelloPrima"`, `"0161 826 1620" "Hello Prima"` (retry), `"01618261620" "HelloPrima"`, `"01618261620" "Prima"`, `"03300881135" "Prima"`
- Page titles: e.g. "0330 088 1135" "Hello Prima" at DuckDuckGo
- Search queries used: as listed
- Date/time accessed: 2026-07-02 ~00:58–01:40 UTC
- Exact quote: DDG no-results state (zero organic results rendered; "No results." marker present in HTML)
- Screenshots: 2026-07-02_ddg_num-0330-helloprima_serp.png; 2026-07-02_ddg_num-03300881135-helloprima_serp.png; 2026-07-02_ddg_num-0161-helloprima_serp_retry.png; 2026-07-02_ddg_num-01618261620-helloprima_serp.png; 2026-07-02_ddg_num-01618261620-prima_serp.png; 2026-07-02_ddg_num-03300881135-prima_serp.png
- HTML archives: matching .html filenames
- Relevance: High (for the wrong-number verdict)
- Direct or indirect: Direct absence evidence
- Notes: These captures directly evidence that, on DDG's index at the capture date, no page pairs either broker phone number with "Hello Prima"/"HelloPrima".

### NUM-09 — Bing: no exact matches for number + HelloPrima; fallback results documented
- Category: A assessed — no evidence found (with documented engine behaviour)
- Source/platform: Bing SERPs
- URLs: bing.com/search?q= for the same 12 number queries
- Page titles: e.g. "03300881135" "HelloPrima" - Search
- Search queries used: all 12 number-specific variants
- Date/time accessed: 2026-07-02 ~00:58–01:10 UTC
- Exact quote: none relevant — when the exact phrases do not co-occur anywhere, Bing serves unrelated filler results (observed: ramp.com, smule.com, reddit.com, food/0330-number-explainer pages). No result contained both a broker number and Hello Prima.
- Screenshots: 2026-07-02_bing_num-0330-helloprima_serp.png, 2026-07-02_bing_num-03300881135-helloprima_serp.png, 2026-07-02_bing_num-0161-helloprima_serp.png, 2026-07-02_bing_num-01618261620-helloprima_serp.png (plus the other 8 bing_num-* captures)
- HTML archives: matching .html filenames
- Relevance: Medium-High (verdict support)
- Direct or indirect: Direct absence evidence
- Notes: Caution for readers of the raw HTML: the query string echoes make "helloprima"/number strings appear in the page; snippet-level extraction confirms zero genuine co-occurrence results.

### NUM-10 — Google-index results interleave both Primas for number+"Hello Prima" searches
- Category: I (search-result ambiguity)
- Source/platform: Anthropic WebSearch (Google-index based)
- URL: n/a (engine results list; see note)
- Page title: n/a
- Search query used: `"0330 088 1135" "Hello Prima"` and `"0161 826 1620" "Hello Prima"`
- Date/time accessed: 2026-07-02 ~00:56 UTC
- Exact quote (returned results list, in order, for the 0330 query): "Contact - Prima Insurance (primainsurance.co.uk/contact/)"; "Prima Protect Insurance Brokers | 0330 088 1135 | Bury (bizseek.co.uk)"; "Prima Insurance | LinkedIn"; "Prima Insurance | Financial Services | Manchester Business Hub (mpostcode.co.uk)"; "Start the conversation - Prima (helloprima.com/about-us/contact)"; "PRIMA PROTECT INSURANCE BROKERS ... Yelp"; "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk (trustpilot.com)"
- Screenshot: n/a (API results; DDG/Bing SERP screenshots of the same queries show zero-result state instead — engines differ)
- HTML archive: n/a
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: No single page contains both the number and "Hello Prima"; but on a loose-matching engine the *results page itself* mixes broker contact pages (with the 0330 number in the visible snippet) and Hello Prima pages. This is consistent with a consumer searching for Hello Prima's number being presented the broker's number. It does not prove any customer actually dialled it.

### NUM-11 — Directory entries tie 0330 088 1135 / 0161 826 1620 to the broker only
- Category: K (directory context — correct association, no mixing found)
- Source/platform: bizseek.co.uk (captured); also seen in SERPs: yelp.com, vymaps.com, yably.co.uk, cylex-uk.co.uk, find-open.co.uk, feefo.com, biba.org.uk, mpostcode.co.uk
- URL: https://www.bizseek.co.uk/prima-protect-insurance-brokers-0330-088-1135
- Page title: Prima Insurance Brokers | Bury | Shragi
- Search query used: `"0330 088 1135" "Prima"`
- Date/time accessed: 2026-07-02 ~01:45 UTC
- Exact quote: "Prima Insurance Brokers 29 Bury New Rd, Greater, Prestwich, Manchester M25 9JY, United Kingdom ... Phone: 0330 088 1135 ... Web: primainsurance.co.uk"
- Screenshot: 2026-07-02_bizseek_prima-protect-0330.png
- HTML archive: 2026-07-02_bizseek_prima-protect-0330.html
- Relevance: Medium (verdict support)
- Direct or indirect: Direct
- Notes: Page contains no car-insurance or Hello Prima content. vymaps listing ("Prima Protect Insurance Brokers (03300881135)", www.primaprotect.co.uk per SERP snippet) now returns "Page not found!" (capture: 2026-07-02_vymaps_prima-protect-03300881135.png). No directory found mixing the two businesses' details in these searches.

### NUM-12 — Indexed lead not reproducible: prudentplus.co.uk "Salford car insurance" page
- Category: M (checked, not relevant / weak)
- Source/platform: prudentplus.co.uk
- URL: https://www.prudentplus.co.uk/car-insurance/cheap-car-insurance-in-salford.html
- Page title: Compare Car Insurance Quotes | UK Pricing Factors
- Search query used: `"01618261620" "Prima"` (WebSearch listed this page)
- Date/time accessed: 2026-07-02 ~01:00 UTC
- Exact quote: none — the live page contains zero occurrences of "Prima" and zero occurrences of either phone number (verified by grep of archived HTML)
- Screenshot: 2026-07-02_prudentplus_salford-car-insurance.png
- HTML archive: 2026-07-02_prudentplus_salford-car-insurance.html
- Relevance: Low
- Direct or indirect: n/a
- Notes: A *car-insurance* comparison page matching an index query for the broker's number was the single most suspicious lead of the number sweep; on capture the page (a Quotezone-powered quote form) shows no Prima content. Possible stale index or dynamic local-business block. Does not support a wrong-number finding; flagged for the Wayback agent to check historical versions.

### NUM-13 — "Prima Group" Resolver page is a third, unrelated Prima
- Category: M (context: multiple "Prima" entities in complaint channels)
- Source/platform: resolver.co.uk
- URL: https://www.resolver.co.uk/companies/prima-group-complaints/contact-details
- Page title: Prima Group Complaints Email & Phone | Resolver UK
- Search query used: `"0161 826 1620" "Prima"` (WebSearch listed it; loose match)
- Date/time accessed: 2026-07-02 ~00:59 UTC
- Exact quote: "We currently do not have the address for Prima Group" / "We currently do not have the phone number for Prima Group" (Property sector listing)
- Screenshot: not taken (page verified to contain no relevant contact details or insurance content)
- HTML archive: n/a
- Relevance: Low
- Direct or indirect: Indirect
- Notes: Confirms neither broker number appears there. Illustrates the crowded "Prima" namespace (housing association Prima Group, primagroup.org) but is not motor-insurance confusion evidence.

### NUM-14 — site:helloprima.co.uk "Prima Insurance": insurer's pages branded "Prima Insurance" in SERPs
- Category: D / I
- Source/platform: DuckDuckGo SERP (+ WebSearch corroboration)
- URL: https://duckduckgo.com/html/?q=site%3Ahelloprima.co.uk%20%22Prima%20Insurance%22
- Page title: site:helloprima.co.uk "Prima Insurance" at DuckDuckGo
- Search query used: `site:helloprima.co.uk "Prima Insurance"`
- Date/time accessed: 2026-07-02 ~01:30 UTC
- Exact quote (verbatim SERP snippets): "About Prima Insurance - Prima Insurance — www.helloprima.co.uk/about-us — Find out more about Prima, the online car insurance provider trusted since 2015."; "Making a Motor Insurance Claim - Prima Insurance — www.helloprima.co.uk/claims — Discover how you make a car insurance claim with Prima Insurance. Contact our UK based customer service team today or visit our website."; "Cookie Policy: understanding our cookie usage - Prima Insurance"; "Terms and conditions: our terms of use - Prima Insurance"; "Privacy policy: your data protection - Prima Insurance — We, Prima Subsidiary Ltd, trading as Prima..."
- Screenshot: 2026-07-02_ddg_site-helloprima-prima-insurance_serp.png
- HTML archive: 2026-07-02_ddg_site-helloprima-prima-insurance_serp.html
- Relevance: High
- Direct or indirect: Indirect (mechanism evidence)
- Notes: This directly evidences that Hello Prima presents itself to search engines as "Prima Insurance" — the same phrase as the broker's registered trading style. In combined SERPs for "Prima Insurance contact/claims", both firms therefore compete under near-identical names. WebSearch returned the same six helloprima.co.uk pages for this query.

### NUM-15 — site:primainsurance.co.uk "Prima Insurance": broker equally branded "Prima Insurance"
- Category: I
- Source/platform: DuckDuckGo SERP (+ WebSearch corroboration)
- URL: https://duckduckgo.com/html/?q=site%3Aprimainsurance.co.uk%20%22Prima%20Insurance%22
- Page title: site:primainsurance.co.uk "Prima Insurance" at DuckDuckGo
- Search query used: `site:primainsurance.co.uk "Prima Insurance"`
- Date/time accessed: 2026-07-02 ~01:30 UTC
- Exact quote (verbatim snippets): "Prima | Leading Business Insurance Brokers — primainsurance.co.uk"; "About | Prima — Prima Insurance Broker is a trading style of Prima Financial Services Ltd - Authorised and Regulated by the Financial Conduct Authority (FCA REF NO 842275) Prima House, Prima House, 21 Bur[y]..."; "Personal Health Insurance | Prima — At Prima Insurance, we understand that your health and well-being are paramount."
- Screenshot: 2026-07-02_ddg_site-primainsurance-prima-insurance_serp.png
- HTML archive: 2026-07-02_ddg_site-primainsurance-prima-insurance_serp.html
- Relevance: Medium
- Direct or indirect: Indirect
- Notes: Together with NUM-14: two FCA-regulated firms both describe themselves as "Prima Insurance" in indexed content. WebSearch also surfaced a dev subdomain (dev.primainsurance.co.uk/our-company/).

### NUM-16 — GoCompare lists "Prima Car Insurance" with no contact details
- Category: J (aggregator context — no wrong details found)
- Source/platform: gocompare.com
- URL: https://www.gocompare.com/car-insurance/providers/
- Page title: Car Insurance Companies | GoCompare
- Search query used: `site:gocompare.com "Prima car insurance"` (WebSearch), then direct capture
- Date/time accessed: 2026-07-02 ~01:33 UTC
- Exact quote (raw HTML): "<li>Post Office</li>\n<li>Prima Car Insurance</li>\n<li>Principal Insurance</li>"
- Screenshot: 2026-07-02_gocompare_car-insurance-providers.png
- HTML archive: 2026-07-02_gocompare_car-insurance-providers.html
- Relevance: Medium
- Direct or indirect: Direct (of what GoCompare publishes)
- Notes: Brand shown as "Prima Car Insurance" (no "Hello"); a plain list item with no link, phone number, email or address. **No wrong number found on GoCompare.** Site-search for `site:gocompare.com "Prima" "0330 088 1135"` and `... "0161 826 1620"` returned no gocompare.com pages on any engine (DDG explicit no-results captures: 2026-07-02_ddg_site-gocompare-prima-0330_serp.png, ..._0161_serp.png; Bing bot-gated — see blockers).

### NUM-17 — Aggregator site-searches: no "Hello Prima"/"Prima car insurance" pages with contact details found
- Category: J (no evidence found)
- Source/platform: comparethemarket.com, confused.com, moneysupermarket.com via DDG/Bing/WebSearch
- URLs (SERPs): duckduckgo.com/html/?q=site%3Acomparethemarket.com..., etc.
- Page titles: e.g. site:comparethemarket.com "Hello Prima" at DuckDuckGo
- Search queries used: `site:comparethemarket.com "Hello Prima"`, `site:comparethemarket.com "Prima car insurance"`, `site:confused.com "Hello Prima"`, `site:confused.com "Prima car insurance"`, `site:moneysupermarket.com "Hello Prima"`, `site:moneysupermarket.com "Prima car insurance"`, `site:gocompare.com "Hello Prima"`
- Date/time accessed: 2026-07-02 ~01:28–01:40 UTC
- Exact quote: DDG returned explicit no-results states for all seven; WebSearch returned no on-domain pages containing the phrases (only off-domain Trustpilot/helloprima pages). WebSearch context note (verbatim from its summary of comparethemarket partner data): "Prima is listed as one of Compare the Market's insurance partners, with multiple Prima product options available including Prima, Prima Essentials, Prima Plus, and Prima Premier."
- Screenshots: 2026-07-02_ddg_site-comparethemarket-hello-prima_serp.png; ..._comparethemarket-prima-car-insurance_serp.png; ..._confused-hello-prima_serp.png; ..._confused-prima-car-insurance_serp.png; ..._moneysupermarket-hello-prima_serp.png; ..._moneysupermarket-prima-car-insurance_serp.png; ..._gocompare-hello-prima_serp.png (+ matching bing_site-* captures, bot-gated)
- HTML archives: matching .html filenames
- Relevance: Medium (verdict support)
- Direct or indirect: Direct absence evidence
- Notes: No aggregator page was found publishing any phone/email for Prima, wrong or right. Aggregator brand usage observed: "Prima Car Insurance" (GoCompare), "Prima"/"Prima Essentials/Plus/Premier" (CTM partner listing). Deeper aggregator journeys are Agent 5's scope.

### NUM-18 — Third-party "Prima car insurance" SEO pages publish no phone numbers
- Category: M (checked; no wrong-number evidence)
- Source/platform: freepricecompare.com; insuruni.com
- URLs: https://freepricecompare.com/insurance/car-insurance/prima-car-insurance-affordable-quotes/ ; https://insuruni.com/prima-car-insurance/
- Page titles: "Prima Car Insurance - Affordable Cover and Quick Response"; "Prima Car Insurance: 10 Essential Benefits for Smart Drivers"
- Search query used: surfaced by `site:confused.com "Prima car insurance"` (loose match)
- Date/time accessed: 2026-07-02 ~01:32 UTC
- Exact quote: insuruni instructs "you call Prima's claims team" (no number given) and links "helloprima.co.uk"; freepricecompare shows no Prima contact details
- Screenshot: not taken (no evidential content; verified by fetch)
- HTML archive: n/a
- Relevance: Low
- Direct or indirect: n/a
- Notes: Checked specifically because third-party SEO pages are the most likely place for a wrong number to be published. Neither shows the broker's numbers.

## Sources checked with no relevant results
- DDG + Bing + WebSearch, all 12 number-specific query variants (see verdict tables) — no Hello Prima association for either number.
- DDG + Bing (bot-gated) + WebSearch: `site:gocompare.com "Prima" "0330 088 1135"`, `site:gocompare.com "Prima" "0161 826 1620"`, `site:gocompare.com "Hello Prima"`, `site:comparethemarket.com "Hello Prima"/"Prima car insurance"`, `site:confused.com "Hello Prima"/"Prima car insurance"`, `site:moneysupermarket.com "Hello Prima"/"Prima car insurance"` — no on-domain results.
- `site:helloprima.co.uk "contact"/"claims"/"complaints"` — only Hello Prima's own official pages/PDFs (policy booklet, IPID, initial disclosure document); no broker numbers anywhere on-domain.
- resolver.co.uk Prima Group page — different company, no numbers.
- prudentplus.co.uk Salford car-insurance page — no Prima content on live page.
- freepricecompare.com and insuruni.com Prima pages — no phone numbers.
- gocompare.com/car-insurance/providers/ — "Prima Car Insurance" listed, no contact details.

## Access blockers
- **Google Search**: hard CAPTCHA ("Our systems have detected unusual traffic") for direct SERP capture; captures kept as proof of block (2026-07-02_google_num-0330-helloprima_serp.png, ..._0161-helloprima_serp.png). Google-index coverage obtained via WebSearch instead.
- **Bing `site:` queries**: bot challenge "One last step — Please solve the challenge below" for all 15 site-specific queries and on retry after 45s delays (captures kept, e.g. 2026-07-02_bing_site-helloprima-prima-insurance_serp.png and *_retry.*). Bing did serve the 12 plain number queries normally.
- **helloprima.co.uk (www)**: Cloudflare "Just a moment..." on live fetch of /, /contact-us and /claims. Mitigated: help.helloprima.co.uk (Zendesk) loads live and carries the official contact/complaints pages; /claims and /about-us captured via Wayback Machine.
- **ceoemail.com** (s.php?id=l-12033716, "Prima Subsidiary Ltd (Customer Service and Complaints)"): bot-gated live ("Your visit to ceoemail.com") and not archived in Wayback. Appeared in a loose-match results list for `"0161 826 1620" "Hello Prima"`; unable to verify what number (if any) it lists for Prima Subsidiary Ltd. Flagged as the single unverifiable lead of this workstream.
- **vymaps.com** Prima Protect listing: now 404 (capture kept).
