# Agent 7 — Wayback Machine / Historical Evidence

Agent scope: web.archive.org (Wayback Machine / CDX API) historical evidence for helloprima.co.uk, primainsurance.co.uk, aggregators and archived Trustpilot pages.
All captures enumerated via the CDX API (`https://web.archive.org/cdx/search/cdx`). Raw archived HTML saved with `id_` (unmodified) snapshots; screenshots taken of the rendered Wayback replay pages.
Date of research: 2026-07-02 (accessed approx. 01:15–02:00 UTC).

## Summary

- **Prior use of the name is clearly with the broker.** primainsurance.co.uk is archived from **26 Oct 2021** trading as "Prima Insurance Brokers" with **0330 088 1135** displayed in the header and an FCA footer citing **FRN 842275** and "Prima Financial Services Ltd", Prima House, Bury New Road, Manchester. Hello Prima's UK site had no archived content until **29 May 2023** (a Google-Ads landing page); its first full-site capture is 7 Dec 2023, and its own archived timeline says it "Launched here in the UK" in 2022.
- **Hello Prima has repeatedly described itself as "Prima Insurance" in archived pages.** From the first full capture (7 Dec 2023) to the latest archived capture (15 Oct 2025), its claims page `<title>` is "Making a Motor Insurance Claim - **Prima Insurance**", its about page was "About Us - **Prima Insurance**", later "About **Prima Insurance** - Prima Insurance", and even its 404 title is "Page not found - Prima Insurance". Its meta description says "Discover how you make a car insurance claim with **Prima Insurance**". These title tags are exactly what search engines display, directly supporting search-result ambiguity with "Prima Insurance" (the broker).
- **Hello Prima removed its published customer-service phone number from its main contact FAQ between 21 Feb 2024 and 11 Sep 2024.** The archived help article "How can I contact you?" listed "Call us 02033189745" in Dec 2023/Feb 2024; by Sep 2024 the number was gone from the article (chat/WhatsApp emphasised, link to a contact page). The number 020 3318 9745 remained on the help-centre `contact_us` page, but with prominent "Busiest call times / it's faster to contact us on live chat or WhatsApp" warnings.
- **No archived Hello Prima page ever displayed 0330 088 1135 or 0161 826 1620.** Confirmed across every snapshot downloaded (2023–2025). Hello Prima's only published numbers historically were 020 3318 9745 (claims/support), 0333 999 0100 (Autoglass), 0333 070 2684 (RAC). Wrong-number evidence in the Wayback record: **not confirmed**.
- **Hello Prima never had an archived `/contact` or `/complaints` page on its main site** (CDX returns zero captures for helloprima.co.uk/contact, /contact-us, /complaints, /help, /support). Contact details lived only on the separate help.helloprima.co.uk subdomain — consistent with customers struggling to find contact details via the main site or search and landing on the broker instead (context for Category E).
- **FCA footer evolution captured:** May 2023 → at least 12 Jun 2025: "Prima Subsidiary Ltd is an Appointed Representative of Pro MGA Solutions Ltd… FCA reference **770419**" (registered office 71-73 Carter Lane). By 15 Sep 2025: "Prima Subsidiary Ltd, trading as 'Prima', is authorised and regulated by the FCA under reference **1031191**" (Alto Building, 30 Stamford Street). So for most of its UK life Hello Prima's pages did not even display FRN 1031191.
- **The broker's archived contact details are stable 2021→2026:** 0330 088 1135 and info@primainsurance.co.uk, Prima House, 21/29 Bury New Road, Prestwich/Manchester, FCA REF NO 842275. The 0161 826 1620 number never appears in any archived primainsurance.co.uk page.
- **Aggregators:** No Wayback captures exist of any Prima/Hello Prima brand page on gocompare.com, comparethemarket.com, confused.com, moneysupermarket.com, money.co.uk or finder.com. The only archived aggregator brand page is **Quotezone** "Prima Car Insurance Review" (18 Apr 2024, 4 Oct 2024, 14 Jan 2025), which calls the insurer simply "Prima" throughout and shows no contact details and no disambiguation from the broker.
- **Archived Trustpilot (helloprima.co.uk) captures preserve historical review counts:** 2,449 reviews (13 Sep 2024) → 3,236 (29 Mar 2025) → 4,475 (21 Jan 2026); TrustScore 4.6 → 4.5. No captures show the broker's numbers; a Mar 2025 archived review complains claims are subcontracted to "Broker Direct" (claims-routing context). No Wayback captures exist of a Trustpilot page for primainsurance.co.uk.
- Honest gaps: Wayback captures of Hello Prima pages are sparse (roughly monthly, main pages only), so exact change dates can only be bracketed; no archived SERPs or Google-cache snippets are available; deleted Trustpilot reviews are only recoverable if they were on the first page at capture time — none of the archived pages happened to contain wrong-number reviews.

## Findings

### WB-01 — Broker's prior use of "Prima Insurance" name and 0330 088 1135
- **Category:** I (search-result ambiguity — prior-use/brand-overlap background)
- **Source/platform:** Wayback Machine — primainsurance.co.uk
- **URL:** https://web.archive.org/web/20211026143816/https://primainsurance.co.uk/
- **Page title:** "Prima Insurance Brokers - Leading Business Insurance Brokers"
- **Search query used:** CDX `url=primainsurance.co.uk` (earliest capture)
- **Date/time accessed (UTC):** 2026-07-02 ~01:20
- **Exact quote/snippet (verbatim):** "Prima Insurance Brokers Manchesters leading business insurance brokers." — header: "Blog Contact Us Call 0330 088 1135" — footer: "…Financial Conduct Authority (FCA REF NO 842275) Prima House, 29 Bury New Road, Manchester, M25 9JY - Prima Financial Services Ltd is a company regi[stered]…"
- **Screenshot:** 2026-07-02_wayback_primainsurance-home-20211026_earliest-broker-capture.png
- **HTML archive:** wayback_20211026_primainsurance_home.html
- **Relevance:** High
- **Direct or indirect:** Indirect (prior-use evidence, not confusion itself)
- **Notes:** Earliest Wayback capture of the broker's domain (2021-10-26 14:38:16 UTC). Establishes the broker publicly trading on primainsurance.co.uk with the 0330 088 1135 number, FRN 842275 and Prima House address **before** Hello Prima's UK website had any archived content (first Hello Prima content capture: 29 May 2023; the domain's first capture at all, 6 Dec 2021, is just an http→https redirect and Jan 2022–Mar 2023 captures are 503/403 holding responses). This does not prove confusion, but supports prior use of "Prima Insurance" as a UK web identity by the broker. Identical footer text (FCA 842275, 0330 088 1135) also confirmed in captures of 2022-01-21, 2022-11-30, 2024-05-24, 2025-01-07 and 2026-01-17.

### WB-02 — Broker's published contact details stable 2021→2026; 0161 826 1620 never archived
- **Category:** M (background; negative check)
- **Source/platform:** Wayback Machine — primainsurance.co.uk/contact/
- **URL:** https://web.archive.org/web/20240624234826/https://primainsurance.co.uk/contact/ (also https://web.archive.org/web/20260117105654/https://primainsurance.co.uk/contact/)
- **Page title:** "Contact | Prima"
- **Search query used:** CDX `url=primainsurance.co.uk/contact*`
- **Date/time accessed (UTC):** 2026-07-02 ~01:35
- **Exact quote/snippet (verbatim):** "Prima House, 21 Bury New Road, Prestwich, M25 9JZ Send a Message Our team is here to help. Fill out the form below, and we'll respond promptly." Phone shown: 0330 088 1135; email (Cloudflare-decoded): info@primainsurance.co.uk.
- **Screenshot:** 2026-07-02_wayback_primainsurance-contact-20240624_broker-contact-details.png
- **HTML archive:** wayback_20240624_primainsurance_contact.html, wayback_20260117_primainsurance_contact.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Confirms which details a consumer would find historically for "Prima Insurance": 0330 088 1135 / info@primainsurance.co.uk / Prima House, Bury New Road, Prestwich. The second number 0161 826 1620 does not appear in any archived primainsurance.co.uk capture checked (2021, 2022×2, 2024×2, 2025, 2026). 2024 site rebrand shortened header brand to "Prima | Leading Business Insurance Brokers" with banner "Speak to our friendly team 0330 088 1135" (screenshot 2026-07-02_wayback_primainsurance-home-20240524_rebrand-prima-0330-banner.png; HTML wayback_20240524_primainsurance_home.html).

### WB-03 — Hello Prima UK web-presence timeline (launch evidence)
- **Category:** M (background)
- **Source/platform:** Wayback Machine — helloprima.co.uk (CDX)
- **URL:** https://web.archive.org/web/20230529042558/https://www.helloprima.co.uk/l/hello-prima?gclid=Cj0KCQjwsIejBhDOARIsANYqkD10-eQVxTxcKeRBuqdyLJa2vJgIDyqDV1BSfY7KL8N4M5_xIbef8c8aAha-EALw_wcB
- **Page title:** "Prima | Join millions of drivers who count on Prima"
- **Search query used:** CDX `url=helloprima.co.uk` and `url=helloprima.co.uk/*` (collapse=urlkey)
- **Date/time accessed (UTC):** 2026-07-02 ~01:25
- **Exact quote/snippet (verbatim):** "Our story began in Italy, where over 2.5 million drivers have insured through us since 2015. Now we're in the UK, ready to serve you and millions more." Footer: "Prima Subsidiary Ltd is an Appointed Representative of Pro MGA Solutions Ltd who is authorised and regulated by the Financial Conduct Authority under reference 770419. Prima Subsidiary Ltd is registered in England (No:12728615), Registered Office: 71-73 Carter Lane, London, EC4V 5EQ."
- **Screenshot:** 2026-07-02_wayback_helloprima-landing-20230529_earliest-content-capture.png
- **HTML archive:** wayback_20230529_helloprima_landing.html
- **Relevance:** High
- **Direct or indirect:** Indirect
- **Notes:** CDX timeline for helloprima.co.uk: first capture 2021-12-06 21:26:41 (301 redirect only); 2022-01-15 (HTTP 503); 2023-02-05 (503), 2023-03-16 (403); first real content 2023-05-29 04:25:58 (this Google-Ads landing page, `/l/hello-prima?gclid=…`); first full homepage 200 capture 2023-12-07 04:06:34. The archived About Us timeline (WB-04) states "2022 Launched here in the UK". Contact block on this earliest page: "Contact us Claims and support 020 3318 9745" with (decoded) help@helloprima.co.uk and claims@helloprima.co.uk. Establishes the broker's web identity (WB-01) predates any archived Hello Prima UK content by ~19 months.

### WB-04 — Hello Prima's own pages titled "Prima Insurance" (2023 through 2025)
- **Category:** I (search-result ambiguity — brand overlap created by Hello Prima's own SEO titles); also supports D indirectly
- **Source/platform:** Wayback Machine — www.helloprima.co.uk
- **URL:** https://web.archive.org/web/20231207035817/https://www.helloprima.co.uk/about-us ; https://web.archive.org/web/20231207040457/https://www.helloprima.co.uk/claims ; https://web.archive.org/web/20250520225232/https://www.helloprima.co.uk/about-us ; https://web.archive.org/web/20251015211203/https://www.helloprima.co.uk/claims
- **Page titles:** "About Us - Prima Insurance" (2023-12-07); "Making a Motor Insurance Claim - Prima Insurance" (2023-12-07 → 2025-10-15, unchanged); "About Prima Insurance - Find out more about us" (2024-03-04); "About Prima Insurance - Prima Insurance" (2025-05-20)
- **Search query used:** CDX capture lists for /about-us and /claims; title/meta extraction from id_ snapshots
- **Date/time accessed (UTC):** 2026-07-02 ~01:30–01:55
- **Exact quote/snippet (verbatim):** `<title>Making a Motor Insurance Claim - Prima Insurance</title>`; meta description: "Discover how you make a car insurance claim with Prima Insurance. Contact our UK based customer serv[ice]…"; og:title "Making a Motor Insurance Claim - Prima Insurance"; 404 page title embedded in 2025-06-12 homepage payload: "Page not found - Prima Insurance".
- **Screenshots:** 2026-07-02_wayback_helloprima-aboutus-20231207_title-prima-insurance.png; 2026-07-02_wayback_helloprima-claims-20231207_claims-number-0203.png; 2026-07-02_wayback_helloprima-aboutus-20250520_title-about-prima-insurance.png; 2026-07-02_wayback_helloprima-claims-20251015_fca-1031191-footer.png
- **HTML archive:** wayback_20231207_helloprima_aboutus.html; wayback_20231207_helloprima_claims.html; wayback_20240304_helloprima_about-us.html; wayback_20240423_helloprima_claims.html; wayback_20250520_helloprima_about-us.html; wayback_20250915_helloprima_claims.html; wayback_20251015_helloprima_claims.html
- **Relevance:** High
- **Direct or indirect:** Direct evidence of brand overlap (Hello Prima using the exact term "Prima Insurance"); indirect evidence of confusion
- **Notes:** This is the strongest historical answer to "Did they historically call themselves 'Prima Insurance' rather than 'Hello Prima'?" — yes, in the page titles and meta descriptions that search engines index and display, continuously from the first full-site capture (Dec 2023) to the latest archived capture (Oct 2025). On-page brand is "Prima" ("We're Prima"); "Hello Prima" is effectively only the domain name. This directly evidences that a consumer searching "Prima Insurance claims/about" would see Hello Prima results labelled "Prima Insurance" alongside the broker whose registered web identity is Prima Insurance (Brokers) — a plausible engine of two-way misdirection.

### WB-05 — Hello Prima removed its phone number from its "How can I contact you?" article (2024)
- **Category:** E (contact difficulty with Hello Prima — historical route change)
- **Source/platform:** Wayback Machine — help.helloprima.co.uk
- **URL:** https://web.archive.org/web/20231206233846/https://help.helloprima.co.uk/hc/en-gb/articles/18380998247313-How-can-I-contact-you- (phone listed); https://web.archive.org/web/20240911093752/https://help.helloprima.co.uk/hc/en-gb/articles/18380998247313-How-can-I-contact-you (phone removed)
- **Page title:** "How can I contact you? – Help centre | Prima car insurance"
- **Search query used:** CDX `url=help.helloprima.co.uk/hc/en-gb/articles/18380998247313*`
- **Date/time accessed (UTC):** 2026-07-02 ~01:40
- **Exact quote/snippet (verbatim):**
  - 2023-12-06 / 2024-02-21 captures: "There are multiple ways to get in touch with our UK-based customer care team. Live chat This is the fastest way to speak with us. We're online Monday to Saturday, 9am to 6pm. Email help@helloprima.co.uk We'll aim to respond within 48 hours. Call us 02033189745 Lines are open Monday to Friday, 9am to 6pm." (Updated 07 September 2023 14:45)
  - 2024-09-11 capture (and all later: 2025-02-10, 2025-05-15, 2025-08-13, 2025-09-11): "How can I contact you? For details of all the ways you can reach us, head to our contact us page." — no phone number anywhere in the article.
- **Screenshots:** 2026-07-02_wayback_helloprima-help-contact-20231206_phone-02033189745-listed.png; 2026-07-02_wayback_helloprima-help-contact-20240911_phone-removed.png
- **HTML archive:** wayback_20231206_helloprima_help_how-can-i-contact-you.html; wayback_20240221_helloprima_help_how-can-i-contact-you.html; wayback_20240911_helloprima_help_how-can-i-contact-you.html; wayback_20250911_helloprima_help_how-can-i-contact-you.html
- **Relevance:** High
- **Direct or indirect:** Indirect (supports why customers hunt for a "Prima insurance phone number" on Google)
- **Notes:** The change is bracketed between 2024-02-21 and 2024-09-11 (no intermediate captures). The number survives on the separate `contact_us` page (WB-06) but the primary FAQ answer stopped displaying it. This is consistent with (but does not by itself prove) customers being unable to easily find Hello Prima's number and instead finding the broker's 0330 088 1135 in search results.

### WB-06 — Hello Prima contact_us page: chat-first, phone de-emphasised with "busiest call times" warnings
- **Category:** E (contact difficulty — context)
- **Source/platform:** Wayback Machine — help.helloprima.co.uk/hc/en-gb/p/contact_us
- **URL:** https://web.archive.org/web/20240615135512/https://help.helloprima.co.uk/hc/en-gb/p/contact_us (also 2025-08-13 capture)
- **Page title:** "Help centre | Prima car insurance"
- **Search query used:** CDX `url=help.helloprima.co.uk/hc/en-gb/p/contact_us`
- **Date/time accessed (UTC):** 2026-07-02 ~01:45
- **Exact quote/snippet (verbatim):** "Contact us General support … Fastest Live chat 9am to 6pm, Monday to Saturday Whatsapp 9am to 6pm, Monday to Saturday You can also email us anytime. We'll aim to get back to you within two working days. help@helloprima.co.uk Prefer to call? Our lines are open 9am to 6pm, Monday to Friday. Busiest call times Our lines get very busy from 9.30am to 10am and 12pm to 3pm. If you need help during these times, it's faster to contact us on live chat or WhatsApp. Mon Tue Wed Thu Fri 020 3318 9745"
- **Screenshot:** 2026-07-02_wayback_helloprima-contactus-20240615_chat-first-phone-busy-warning.png
- **HTML archive:** wayback_20240615_helloprima_contact-us-page.html; wayback_20250813_helloprima_contact-us-page.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Confirms Hello Prima's correct number was 020 3318 9745 throughout, published only on this help-subdomain page and framed as the least-preferred channel. No 0330/0161 numbers. Identical structure in the 2025-08-13 capture.

### WB-07 — Wrong-number check across all archived Hello Prima pages: NOT CONFIRMED (negative result)
- **Category:** A (direct wrong-number evidence — none found)
- **Source/platform:** Wayback Machine — all helloprima.co.uk / help.helloprima.co.uk snapshots downloaded
- **URL:** (all snapshots listed in this report)
- **Page title:** various
- **Search query used:** regex scan of all saved id_ HTML for `0330 088 1135`, `03300881135`, `0161 826 1620`, `01618261620` and all other phone patterns
- **Date/time accessed (UTC):** 2026-07-02 ~01:30–02:00
- **Exact quote/snippet:** Phones actually found on Hello Prima archived pages: 020 3318 9745 (claims/support, also in schema.org structured data of the 2025-06-12 homepage: `"contactPoint":{"@type":"ContactPoint","contactType":"customer service","telephone":"02033189745","email":"claims@helloprima.co.uk"…}`), 0333 999 0100 (Autoglass), 0333 070 2684 (RAC UK), 0345 999 8000 (later claims page). Emails: help@helloprima.co.uk, claims@helloprima.co.uk.
- **Screenshot:** n/a (negative result; underlying HTML archived)
- **HTML archive:** all wayback_*helloprima*.html files
- **Relevance:** High (honesty/completeness)
- **Direct or indirect:** Direct negative
- **Notes:** No public archived Hello Prima page ever displayed the broker's numbers. If the wrong number reached customers, the Wayback record indicates it did not come from helloprima.co.uk itself.

### WB-08 — Hello Prima FCA footer evolution: AR of Pro MGA (770419) until mid-2025, then own FRN 1031191
- **Category:** M (background; relevant to FCA-register/complaints-routing context)
- **Source/platform:** Wayback Machine — helloprima.co.uk footers
- **URL:** https://web.archive.org/web/20250612221352/https://www.helloprima.co.uk/ (old footer); https://web.archive.org/web/20250915130213/https://www.helloprima.co.uk/claims (new footer)
- **Page title:** "Prima - Great Value Car Insurance Quotes" / "Making a Motor Insurance Claim - Prima Insurance"
- **Search query used:** footer extraction across snapshots 2023-05-29 → 2025-10-15
- **Date/time accessed (UTC):** 2026-07-02 ~01:45
- **Exact quote/snippet (verbatim):**
  - Until at least 2025-06-12: "Prima Subsidiary Ltd is an Appointed Representative of Pro MGA Solutions Ltd who is authorised and regulated by the Financial Conduct Authority under reference 770419. Prima Subsidiary Ltd is registered in England (No:12728615), Registered Office: 71-73 Carter Lane, London, EC4V 5EQ."
  - By 2025-09-15: "Prima Subsidiary Ltd, trading as 'Prima', is authorised and regulated by the Financial Conduct Authority under reference 1031191. Prima is registered in England (12728615). Our registered office is Alto Building, 30 Stamford Street, London, SE1 9LS."
  - Interim variant (about-us, 2025-05-20): "Prima Subsidiary Ltd, trading under the name of Prima. … We're the appointed representative of Pro MGA Solutions Ltd, who is authorised and regulated by the Financial Conduct Authority (FCA) under reference number 770419. We sell car insurance that's underwritten by Alwyn Insurance Company Limited (registered company number 106261). Alwyn is authorised and regulated by the Gibraltar Financial Services Commission…"
- **Screenshot:** 2026-07-02_wayback_helloprima-claims-20251015_fca-1031191-footer.png
- **HTML archive:** wayback_20250612_helloprima_home.html; wayback_20250915_helloprima_claims.html; wayback_20250520_helloprima_about-us.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Change bracketed between 2025-06-12 and 2025-09-15. For most of its UK history Hello Prima's site displayed FRN 770419 (Pro MGA), not 1031191 — so an FCA-register search for "Prima Insurance" in that period would surface the broker (842275) and Pro MGA rather than a "Prima" firm, adding to identification difficulty.

### WB-09 — Hello Prima complaints route history
- **Category:** G (complaint-routing — context)
- **Source/platform:** Wayback Machine — help.helloprima.co.uk complaints article
- **URL:** https://web.archive.org/web/20251017082046/https://help.helloprima.co.uk/hc/en-gb/articles/9983382260369-What-if-I-need-to-make-a-complaint (earliest capture 2023-12-07 has empty article body)
- **Page title:** "What if I need to make a complaint? – Help centre | Prima car insurance"
- **Search query used:** CDX `url=help.helloprima.co.uk/hc/en-gb/articles/9983382260369*`
- **Date/time accessed (UTC):** 2026-07-02 ~01:48
- **Exact quote/snippet (verbatim):** "Making a complaint To make sure that your complaint is handled quickly and efficiently, please either: Talk to us on live chat or call 020 3318 9745 Email help@helloprima.co.uk Write to Complaints Manager, Prima, Alto Building, 30 Stamford Street, London, SE1 9LS … Should you wish, you have the right to refer your complaint to the Financial Ombudsman Service (FOS)."
- **Screenshot:** screenshot failed: not taken (content preserved in HTML; lower priority)
- **HTML archive:** wayback_20231207_helloprima_complaints-article.html; wayback_20251017_helloprima_complaints-article.html
- **Relevance:** Low-Medium
- **Direct or indirect:** Indirect
- **Notes:** Confirms correct complaint route addresses "Complaints Manager, Prima" with no "Hello" — a letter or search for "Prima complaints" is ambiguous between the two firms. The Dec 2023 capture of this article rendered with an empty body (likely JS-loaded), so the complaints wording at launch could not be verified.

### WB-10 — Quotezone archived "Prima Car Insurance Review" page: brand shown simply as "Prima"
- **Category:** J (aggregator ambiguity)
- **Source/platform:** Wayback Machine — quotezone.co.uk
- **URL:** https://web.archive.org/web/20240418120204/https://www.quotezone.co.uk/car-insurance/providers/prima (also captures 2024-10-04, 2025-01-14)
- **Page title:** "Prima Car Insurance Review | Compare Car Insurance Quotes Now"
- **Search query used:** CDX domain scan `url=quotezone.co.uk&matchType=domain&filter=original:.*prima.*`
- **Date/time accessed (UTC):** 2026-07-02 ~01:50
- **Exact quote/snippet (verbatim):** "Prima claims to be an affordable insurance provider and many reviews seem to corroborate this." (page refers to the insurer as "Prima" / "Prima car insurance" throughout; no phone number, no address, no mention of "Hello Prima" as distinct from other Primas)
- **Screenshot:** 2026-07-02_wayback_quotezone-prima-20240418_provider-review-page.png
- **HTML archive:** wayback_20240418_quotezone_prima.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** The only archived aggregator brand page found for the insurer. It uses the bare name "Prima" with URL slug /providers/prima — consistent with aggregator-side ambiguity, though it shows no wrong contact details (it shows none at all).

### WB-11 — No archived Prima pages on GoCompare / CompareTheMarket / Confused / MoneySuperMarket (negative result)
- **Category:** J (aggregator ambiguity — no archive evidence either way)
- **Source/platform:** Wayback Machine CDX
- **URL:** n/a
- **Page title:** n/a
- **Search query used:** CDX probes: `gocompare.com/car-insurance/prima*`, `gocompare.com/car-insurance/hello-prima*`, `comparethemarket.com/car-insurance/prima*`, `comparethemarket.com/car-insurance/providers/prima*`, `confused.com/car-insurance/prima*`, `confused.com/car-insurance/hello-prima*`, `moneysupermarket.com/car-insurance/prima*`, `moneysupermarket.com/car-insurance/hello-prima*`, `money.co.uk/car-insurance/prima*`, `finder.com/uk/car-insurance/prima*` — all returned zero captures. Domain-wide filtered CDX scans (`filter=original:.*hello.?prima.*`) on the four main aggregators returned no rows before the API timed out.
- **Date/time accessed (UTC):** 2026-07-02 ~01:52
- **Exact quote/snippet:** n/a (empty CDX result sets)
- **Screenshot:** n/a
- **HTML archive:** n/a
- **Relevance:** Medium (honesty)
- **Direct or indirect:** Direct negative
- **Notes:** No public evidence was found in the Wayback record that GoCompare or the other main aggregators published a Prima brand/contact page (right or wrong). Historic quote-journey pages sit behind sessions and are not archived. This neither supports nor refutes aggregator-sourced wrong numbers; live-journey checks are Agent 5's scope.

### WB-12 — Archived Trustpilot pages for helloprima.co.uk: historical review counts preserved
- **Category:** L (context; review-platform history) with one F-context quote
- **Source/platform:** Wayback Machine — uk.trustpilot.com / www.trustpilot.com
- **URL:** https://web.archive.org/web/20240913034553/https://uk.trustpilot.com/review/helloprima.co.uk?utm_medium=trustbox&utm_source=Carousel ; https://web.archive.org/web/20250329113808/https://uk.trustpilot.com/review/helloprima.co.uk ; https://web.archive.org/web/20260121203743/https://www.trustpilot.com/review/helloprima.co.uk
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** CDX `url=trustpilot.com/review/helloprima.co.uk`, `url=uk.trustpilot.com/review/helloprima.co.uk*`
- **Date/time accessed (UTC):** 2026-07-02 ~01:50
- **Exact quote/snippet (verbatim):** Meta descriptions: "Do you agree with Prima's 4-star rating? Check out what 2,449 people have written so far…" (2024-09-13); "…3,236 people…" (2025-03-29); "…4,475 people…" (2026-01-21). From the 2025-03-29 capture, an archived negative review: "…on the phone trying to get some help from, apparently an insurance company. First of all they sub the work to a third party, Broker Direct, says it all! So speaking to people who care is impossible. Then they arranged a hire car, while I waited on the phone…" (reviewer Alex Burton, "Terrible, don't waste your time. Car was damaged in a hit and run…").
- **Screenshots:** 2026-07-02_wayback_trustpilot-helloprima-20240913_2449-reviews.png; 2026-07-02_wayback_trustpilot-helloprima-20250329_3236-reviews.png; 2026-07-02_wayback_trustpilot-helloprima-20260121_4475-reviews.png
- **HTML archive:** wayback_20240913_trustpilot_helloprima.html; wayback_20250329_trustpilot_helloprima.html; wayback_20260121_trustpilot_helloprima.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Captures only show the ~20 most recent reviews at capture time; scans of all three snapshots found no occurrence of 0330 088 1135 / 0161 826 1620, "wrong Prima" or "different Prima". Trustpilot profile note in captures: "If you ever need help, there's a London-based support team and 24/7 claims line." No Wayback captures exist for trustpilot.com/review/primainsurance.co.uk (checked .com and uk. variants), so historical evidence of misdirected reviews on the broker's profile cannot be obtained from the archive.

### WB-13 — Hello Prima main-site never had archived contact/complaints pages
- **Category:** E (contact difficulty — structural context)
- **Source/platform:** Wayback Machine CDX — helloprima.co.uk
- **URL:** n/a (empty result sets)
- **Page title:** n/a
- **Search query used:** CDX `url=helloprima.co.uk/contact`, `/contact-us`, `/complaints`, `/help`, `/support`, `/faq` — all zero captures (faq returned a transient 503 once, then empty). Full site map of archived 200-status pages: /, /about-us, /claims, /account, /brand, /home, /l/hello-prima, /privacy-policy, /cookie-policy, /terms-and-conditions.
- **Date/time accessed (UTC):** 2026-07-02 ~01:28
- **Exact quote/snippet:** n/a
- **Screenshot:** n/a
- **HTML archive:** CDX outputs summarised in this report
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** All contact information sat on the help.helloprima.co.uk Zendesk subdomain, one level removed from the main site and less likely to rank for "prima insurance contact number" searches. Consistent with the confusion hypothesis; does not prove it.

### WB-14 — Hello Prima homepage brand presentation over time: "Prima", not "Hello Prima"
- **Category:** I (search-result ambiguity — context)
- **Source/platform:** Wayback Machine — www.helloprima.co.uk
- **URL:** https://web.archive.org/web/20231207040634/https://www.helloprima.co.uk/
- **Page title:** "Prima - Great Value Car Insurance Quotes" (unchanged 2023-12-07 → 2025-10-15 captures)
- **Search query used:** CDX homepage capture list; title extraction
- **Date/time accessed (UTC):** 2026-07-02 ~01:32
- **Exact quote/snippet (verbatim):** "We're Prima" (about page); Trustpilot-sourced homepage quotes referring to the firm as "Prima insurance": "I search for cheaper insurance for comparison but nothing like Prima insurance." (A Omotosho, homepage-embedded review, 2023-12-07 capture)
- **Screenshot:** 2026-07-02_wayback_helloprima-home-20231207_first-full-homepage.png
- **HTML archive:** wayback_20231207_helloprima_home.html; wayback_20250612_helloprima_home.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Throughout the archive the consumer-facing brand is "Prima"; "Hello Prima" appears only as the domain. Combined with WB-04 title tags, the archived record shows the insurer's public identity converged on exactly the phrase "Prima insurance".

## Sources checked with no relevant results

- CDX: helloprima.co.uk/contact, /contact-us, /complaints, /help, /support, /faq — no captures (WB-13).
- CDX: trustpilot.com/review/primainsurance.co.uk and uk.trustpilot.com/review/primainsurance.co.uk — no captures.
- CDX URL probes for Prima brand pages on gocompare.com, comparethemarket.com, confused.com, moneysupermarket.com, money.co.uk, finder.com/uk — no captures (WB-11).
- Domain-wide CDX filter `.*[/-]prima([^r].*|$)` on gocompare.com, comparethemarket.com, confused.com, moneysupermarket.com, finder.com, money.co.uk, nimblefins.co.uk, smartmoneypeople.com — only false-positive "primary" asset URLs; no Prima brand pages.
- Scan of all downloaded Hello Prima snapshots for 0330 088 1135 / 03300881135 / 0161 826 1620 / 01618261620 — zero hits (WB-07).
- Scan of three archived Trustpilot snapshots for "0330", "0161 826", "wrong", "different Prima" — zero relevant hits.
- Earliest helloprima.co.uk capture (2021-12-06) is only an http→https 301; no content to assess.

## Access blockers

- WebFetch tool is blocked for web.archive.org in this environment ("Claude Code is unable to fetch"); worked around using curl against the CDX API and `id_` raw snapshots, plus the headless-Chromium screenshot helper for rendered replay pages (all successful).
- Wayback CDX domain-wide filtered queries on very large aggregator domains (gocompare.com, comparethemarket.com, moneysupermarket.com with `filter=original:.*hello.?prima.*`) time out server-side; mitigated with targeted URL probes, so a Prima page at an unguessed URL path cannot be fully excluded.
- Archived Trustpilot captures only preserve the first page of reviews at capture time; deleted reviews outside those windows are unrecoverable from the archive.
- The 2023-12-07 capture of the Hello Prima complaints article has an empty (JS-loaded) body, so launch-era complaints wording could not be verified.
- Aggregator quote journeys (where wrong contact details would most plausibly have been passed) are session-based and never archived by the Wayback Machine.
