# Agent 6 — Directories / Phone Databases / Company Data

Agent scope: business directories, phone-number databases/reverse-lookup sites, company-data
sites (Companies House, FCA Register, Endole, CompanyCheck, 192.com etc.) for the two Prima
Insurance Brokers numbers **0330 088 1135** and **0161 826 1620**.
All access timestamps 2026-07-02, approx. 00:40–01:55 UTC.
Screenshots: `/home/user/primaeats/prima_helloprima_evidence_pack/screenshots/`
HTML archive: `/home/user/primaeats/prima_helloprima_evidence_pack/source_archive/`

## Summary

- **No directory or phone-number database was found that attributes 0330 088 1135 or
  0161 826 1620 to Hello Prima / Prima Subsidiary Ltd / Prima car insurance.** Every directory
  entry found ties both numbers to the broker family (Prima Financial Services Ltd / Prima
  Insurance Brokers / Prima Protect). On the specific "wrong number in a database" allegation:
  **not confirmed** on the sources checked.
- **The FCA Register itself contains the raw material for confusion**: FRN 842275 (Prima
  Financial Services Ltd, Prestwich, phone +44 161 826 1620) currently trades under SIX names
  including **"Prima Insurance Brokers"**, **"Prima Healthcare"** and **"Prima Life"**; FRN
  1031191 (PRIMA SUBSIDIARY LTD, London) trades under the single name **"Prima"** (effective
  24 Mar 2025). Neither firm holds the exact FCA trading name "Prima Insurance", but the
  insurer's registered trading name is the bare word "Prima" — the common element of the
  broker's name family. Both FCA entries were screenshotted with full contact details.
- **The insurer publicly brands itself "Prima Insurance"** outside the register: its own page
  helloprima.co.uk/about-us is titled "About Prima Insurance - Prima Insurance" (SERP title;
  direct fetch bot-blocked). The broker's LinkedIn page and several directory listings are
  named just "Prima Insurance". The two firms therefore present to consumers under an
  identical informal name.
- **Directory data on the broker is itself mixed/inconsistent** (Category K): the same
  business appears as "Prima Insurance Brokers" (bizseek, Cybo), "Prima Protect Insurance
  Brokers" (MEN directory, Yelp, Cylex, vymaps, Yell) and plain **"Prima Insurance"**
  (Manchester Business Hub / mpostcode.co.uk), across at least three street numbers
  (21, 29, 39 Bury New Road) and three websites (primainsurance.co.uk, primaprotect.co.uk).
  Cylex's listing (per search-index snippet) shows BOTH 0161 826 1620 and 0330 088 1135 on
  one "Prima Protect" entry with website primainsurance.co.uk.
- **Reverse-phone databases: no evidence found.** shouldianswer.co.uk and whocallsme.com have
  zero user reports/comments for either number (screenshotted). tellows.co.uk,
  who-called.co.uk, unknownphone.com and whosringing.co.uk bot-blocked all access routes, but
  Wayback CDX shows no captures for either number on those sites and no search-index snippet
  ties either number to any user report — consistent with no reports existing there.
- **Companies House**: Prima Financial Services Ltd (11940805, Brulimar House, Jubilee Road,
  Middleton M24 2LX) and Prima Subsidiary Ltd (12728615, Alto Building, 30 Stamford Street,
  London SE1 9LS) both carry SIC 66220 (insurance agents/brokers). A third active company,
  **PRIMA PROTECT LTD (10794565), shares the broker's registered office** and SIC code. No UK
  company is registered as "Hello Prima" or "Prima Insurance Ltd". So three active "Prima*"
  insurance-intermediary companies exist, two of them the broker's own group.
- **192.com holds correct, separate records for both firms** — broker: PRIMA FINANCIAL
  SERVICES LTD, 21 Bury New Road Prestwich M25 9JZ and HQ M24 2LX, tel 0161 826 1620;
  insurer: PRIMA SUBSIDIARY LTD, 30 Stamford Street SE1 9LS, tel 020 3318 9745 — but both sit
  in the same "Insurance Brokers" category under near-identical registered names.
- **Search-engine layer mixes the two firms on number queries** (Category I, indirect): SERPs
  for the broker's numbers combined with "Hello Prima"/"car insurance" return helloprima.co.uk
  and primainsurance.co.uk side by side, and the search tool's AI answer twice wrongly
  asserted the broker's numbers "are associated with Prima Insurance/Hello Prima's car
  insurance services" — a live demonstration of machine-generated conflation.
- **Hello Prima now has a Manchester hub**: helloprima.com careers page states Prima is
  "establishing our presence in London and now expanding further with a new hub in
  Manchester", with a Claims Administrator role located in Manchester — geographic overlap
  with the Prestwich/Manchester broker increases confusion potential (context only).
- Honest gap: Yell.com, Cylex, Yelp, yably, Cybo, Endole and ContactOut could not be captured
  directly (bot walls); their content is evidenced via search-index snippets only.

## Findings

### DIR-01 — FCA Register entry for FRN 842275 (the broker)
- **Category**: K (context for D/I) 
- **Source/platform**: FCA Financial Services Register
- **URL**: https://register.fca.org.uk/s/firm?id=0010X00004UA7vEQAT
- **Page title**: Prima Financial Services Ltd
- **Search query used**: register search for "842275" (firms)
- **Date/time accessed**: 2026-07-02 ~00:50 UTC
- **Exact quote/snippet**: "Prima Financial Services Ltd Reference number: 842275 … Address … 21 Bury New Road Prestwich Manchester Bury M25 9JZ … Phone +44 1618261620 … Email info@primainsurance.co.uk … Website http://www.primainsurance.co.uk/ … Registered company number … 11940805 … This firm currently trades under 6 trading names."
  Current names table (verbatim rows): "Clapton Insurance Brokers | Trading | 03 Aug 2023", "Clapton | Trading | 23 Jul 2023", "Prima Healthcare | Trading | 09 Sept 2019", "Prima Financial Services Ltd | Registered | 02 Sept 2019", "Prima Insurance Brokers | Trading | 17 May 2019", "Prima Life | Trading | 17 May 2019".
  Previous names table: "Sunshine Life | Trading | 11 Feb 2020 – 02 Feb 2023", "Prima Commercial | Trading | 11 Sept 2019 – 08 Jul 2021", "Prima Commercia | Trading | 09 Sept 2019 – 11 Sept 2019", "Prima Private Clients | Trading | 09 Sept 2019 – 02 Feb 2023", "Prima Health | Trading | 17 May 2019 – 02 Feb 2023".
- **Screenshots**: 2026-07-02_fca-register_frn842275_trading-names.png (full page incl. trading-names tables, verified legible); also 2026-07-02_fca-register_prima-financial-services-frn842275_firm-page.png, 2026-07-02_fca-register_frn842275_firm-page-expanded.png, 2026-07-02_fca-register_search-842275_results.png
- **HTML archive**: 2026-07-02_fca-register_frn842275_trading-names.html (+ matching files for the others)
- **Relevance**: High
- **Direct or indirect**: Direct record (authoritative)
- **Notes**: The FCA shows the broker's official phone as the 0161 826 1620 number and email as info@primainsurance.co.uk. The broker's FCA trading-name family is "Prima *" (Insurance Brokers / Healthcare / Life; formerly Commercial / Private Clients / Health). It does NOT hold the bare name "Prima" or "Prima Insurance". This is the baseline record against which confusion is measured.

### DIR-02 — FCA Register entry for FRN 1031191 (the insurer)
- **Category**: K (context for D/I)
- **Source/platform**: FCA Financial Services Register
- **URL**: https://register.fca.org.uk/s/firm?id=001Sk00000Z0ACwIAN (also resolves via https://register.fca.org.uk/s/firm?id=0014G000031QtgAQAS)
- **Page title**: PRIMA SUBSIDIARY LTD
- **Search query used**: register search for "1031191" (firms)
- **Date/time accessed**: 2026-07-02 ~00:50 UTC
- **Exact quote/snippet**: "PRIMA SUBSIDIARY LTD Reference number: 1031191 … Address … 30 Stamford Street London SE1 9LS … Phone +442033189745 … Email help@helloprima.co.uk … Website www.helloprima.co.uk … Registered company number … 12728615 … This firm currently trades under 2 trading names."
  Current names table (verbatim rows): "PRIMA SUBSIDIARY LTD | Registered | 18 Aug 2025", "Prima | Trading | 24 Mar 2025". No "Previous names" section exists on the record.
  The page also displays a notice: "Notices — Restrictions / suspensions — This firm has requirements or restrictions placed on the financial services activities that it can operate."
- **Screenshots**: 2026-07-02_fca-register_frn1031191_trading-names.png (verified legible); also 2026-07-02_fca-register_prima-subsidiary-frn1031191_firm-page.png, 2026-07-02_fca-register_frn1031191_firm-page-expanded.png, 2026-07-02_fca-register_search-1031191_results.png
- **HTML archive**: 2026-07-02_fca-register_frn1031191_trading-names.html (+ matching)
- **Relevance**: High
- **Direct or indirect**: Direct record (authoritative)
- **Notes**: **Trading-name overlap assessment**: the FCA register does NOT show either firm trading as the exact string "Prima Insurance". However, the insurer's sole FCA trading name is the bare word **"Prima"** (since 24 Mar 2025), while the broker trades as "Prima Insurance Brokers", "Prima Healthcare" and "Prima Life". Any consumer search for "Prima" + insurance therefore legitimately matches both firms. The FCA shows distinct phones (broker 0161 826 1620 / insurer 020 3318 9745), emails and addresses — the register itself does not mix the contact details.

### DIR-03 — Insurer's own page titled "Prima Insurance"
- **Category**: D/I (indirect)
- **Source/platform**: helloprima.co.uk via search-index titles (direct fetch bot-blocked)
- **URL**: https://www.helloprima.co.uk/about-us
- **Page title**: "About Prima Insurance - Prima Insurance"
- **Search query used**: `"0161 826 1620" "Hello Prima" OR "car insurance"` (title appeared in results); also observed in multiple other SERPs
- **Date/time accessed**: 2026-07-02 ~01:10 UTC
- **Exact quote/snippet**: SERP result title verbatim: "About Prima Insurance - Prima Insurance" (url https://www.helloprima.co.uk/about-us)
- **Screenshot filename**: screenshot failed: helloprima.co.uk served a Cloudflare "Just a moment..." challenge to headless browser; 2026-07-02_helloprima_about-us_prima-insurance-title.png shows the challenge page. Title evidenced in SERP captures 2026-07-02_ddg_0161-826-1620_serp.png (and Agent 1's SERP set).
- **HTML archive**: 2026-07-02_helloprima_about-us_prima-insurance-title.html (challenge page)
- **Relevance**: High
- **Direct or indirect**: Indirect (title via search index)
- **Notes**: Shows the insurer presents itself to search engines as "Prima Insurance" — the identical informal name used by/for the broker (see DIR-07, DIR-05) — despite its FCA trading name being only "Prima". This is central to why contact-detail searches cross-contaminate.

### DIR-04 — Companies House records: both companies + a third "Prima" broker entity
- **Category**: K
- **Source/platform**: Companies House (find-and-update.company-information.service.gov.uk)
- **URLs**:
  - https://find-and-update.company-information.service.gov.uk/company/11940805
  - https://find-and-update.company-information.service.gov.uk/company/12728615
  - https://find-and-update.company-information.service.gov.uk/company/10794565
  - https://find-and-update.company-information.service.gov.uk/advanced-search/get-results?companyNameIncludes=prima&status=active&sicCodes=66220
- **Page titles**: "PRIMA FINANCIAL SERVICES LTD overview…", "PRIMA SUBSIDIARY LTD overview…", "PRIMA PROTECT LTD overview…", "Advanced company search results…"
- **Search queries used**: "prima insurance", "prima financial services", "prima subsidiary", "hello prima", advanced search companyNameIncludes=prima + SIC 66220
- **Date/time accessed**: 2026-07-02 ~00:45–01:05 UTC
- **Exact quote/snippet**:
  - PRIMA FINANCIAL SERVICES LTD, 11940805, Active, incorporated 11 April 2019, "Brulimar House Jubilee Road, Middleton, Manchester, United Kingdom, M24 2LX", SIC 65110 (Life insurance) and 66220 (Activities of insurance agents and brokers).
  - PRIMA SUBSIDIARY LTD, 12728615, Active, incorporated 8 July 2020, "Alto Building, 30 Stamford Street, London, United Kingdom, SE1 9LS", SIC 66220.
  - PRIMA PROTECT LTD, 10794565, Active, incorporated 30 May 2017, "Brulimar House Jubilee Road, Middleton, Manchester, England, M24 2LX", SIC 66220.
- **Screenshots**: 2026-07-02_companieshouse_prima-financial-services-11940805_overview.png, 2026-07-02_companieshouse_prima-subsidiary-12728615_overview.png, 2026-07-02_companieshouse_prima-protect-10794565_overview.png, 2026-07-02_companieshouse_advanced-search-prima-sic66220_results.png, 2026-07-02_companieshouse_search-prima-insurance_results.png, 2026-07-02_companieshouse_search-prima-subsidiary_results.png
- **HTML archive**: matching .html files for all six
- **Relevance**: Medium-High
- **Direct or indirect**: Direct records (authoritative)
- **Notes**: Similar-name count: exactly **three active UK companies named "Prima*" with SIC 66220** — the broker (Prima Financial Services Ltd), the broker-affiliated Prima Protect Ltd (same registered office), and the insurer (Prima Subsidiary Ltd). No company is registered as "Hello Prima" (searched — 7,285 fuzzy matches, none "Hello Prima") and no active company is registered as "Prima Insurance Ltd". Note the registered offices (Middleton M24 / London SE1) differ from the trading addresses shown on the FCA register and directories — one more layer where address data diverges.

### DIR-05 — bizseek directory: "Prima Insurance Brokers" with 0330 088 1135
- **Category**: K
- **Source/platform**: bizseek.co.uk (UK business directory)
- **URL**: https://www.bizseek.co.uk/prima-protect-insurance-brokers-0330-088-1135
- **Page title**: "Prima Insurance Brokers | Bury | Shragi"
- **Search query used**: `"0330 088 1135"`
- **Date/time accessed**: 2026-07-02 ~01:15 UTC
- **Exact quote/snippet**: "The phone number for Prima Insurance Brokers is 0330 088 1135 . … Prima Insurance Brokers is located at 29 Bury New Rd, Greater, Prestwich, Manchester M25 [9JY] … The website for Prima Insurance Brokers is primainsurance.co.uk ."
- **Screenshot filename**: 2026-07-02_bizseek_prima-protect-0330-088-1135_listing.png
- **HTML archive**: 2026-07-02_bizseek_prima-protect-0330-088-1135_listing.html
- **Relevance**: Medium
- **Direct or indirect**: Direct (directory record)
- **Notes**: Ties 0330 088 1135 to the **correct business** (the broker), but under a URL slug naming "prima-protect" while displaying "Prima Insurance Brokers", website primainsurance.co.uk, and a third street number (29 Bury New Rd vs FCA's 21 and MEN's 39). Correct business / mixed data.

### DIR-06 — Manchester Evening News directory: "Prima Protect Insurance Brokers", 0330 088 1135
- **Category**: K
- **Source/platform**: Manchester Evening News business directory
- **URL**: https://directory.manchestereveningnews.co.uk/company/1109904570761216
- **Page title**: "Prima Protect Insurance Brokers in 39 Bury New Road, Prestwich, Manchester, Greater Manchester, M25 9JY - Manchester Evening News"
- **Search query used**: DDG SERP for `"0330 088 1135"` (result link)
- **Date/time accessed**: 2026-07-02 ~01:40 UTC
- **Exact quote/snippet**: "Prima Protect Insurance Brokers Category : Insurance Brokers Address: 39 Bury New Road, Prestwich, Manchester, Greater Manchester, M25 9JY Landline: 0330 088 1135 Website: www.primaprotect.co.uk … 0 Reviews"
- **Screenshot filename**: 2026-07-02_men-directory_prima_listing.png
- **HTML archive**: 2026-07-02_men-directory_prima_listing.html
- **Relevance**: Medium
- **Direct or indirect**: Direct (directory record)
- **Notes**: Named local-Manchester directory target from the brief. Number tied to the **correct business** (broker group), under the "Prima Protect" name. No mention of car insurance or Hello Prima.

### DIR-07 — Manchester Business Hub lists the broker as plain "Prima Insurance" with 0330 088 1135
- **Category**: K + I (naming ambiguity in a directory)
- **Source/platform**: Manchester Business Hub (mpostcode.co.uk) — Manchester B2B directory
- **URLs**: https://www.mpostcode.co.uk/business-directory/financial/prima-insurance/ and https://www.mpostcode.co.uk/business-directory/insurance/prima-insurance/
- **Page title**: "Prima Insurance | Financial Services | Manchester Business Hub"
- **Search query used**: `site:yell.com "prima insurance" OR "prima financial" OR "prima protect" Manchester` (result link)
- **Date/time accessed**: 2026-07-02 ~01:20 UTC
- **Exact quote/snippet**: "Financial Services Prima Insurance 39 Bury New Road Manchester M25 9JY … [A]t Prima Protect, we come to work every day because we want to, and treat you like family. 0330 088 1135 info@primaprotect.co.uk www.primaprotect.co.uk"
- **Screenshot filenames**: 2026-07-02_mpostcode_prima-insurance-financial_listing.png, 2026-07-02_mpostcode_prima-insurance-insurance_listing.png
- **HTML archive**: matching .html files
- **Relevance**: High
- **Direct or indirect**: Direct (directory record)
- **Notes**: A Manchester directory presents the broker under the bare heading **"Prima Insurance"** — the exact informal name the car insurer uses for itself (DIR-03) — with the 0330 088 1135 number. This does not put the broker's number on Hello Prima, but it evidences that directory listings expose the broker's numbers under the generic "Prima Insurance" label that Hello Prima customers search for. Strongest directory-side ambiguity found.

### DIR-08 — Cylex listing mixes both broker numbers under "Prima Protect" with primainsurance.co.uk
- **Category**: K
- **Source/platform**: Cylex UK directory (prestwich.cylex-uk.co.uk)
- **URL**: https://prestwich.cylex-uk.co.uk/company/prima-protect-insurance-brokers-26844736.html
- **Page title (from SERP)**: "▷ Prima Protect Insurance Brokers, Prestwich"
- **Search query used**: `site:cylex-uk.co.uk OR site:scoot.co.uk OR site:thomsonlocal.com "prima" insurance Manchester OR Prestwich`
- **Date/time accessed**: 2026-07-02 ~01:25 UTC
- **Exact quote/snippet**: Search-index snippet (verbatim from search result summary): "Prima Protect Insurance Brokers is located at 39 Bury New Rd, Prestwich, Greater Manchester, M25 9JY, with phone numbers 0161 826 1620 and 0330 088 1135, and website primainsurance.co.uk."
- **Screenshot filename**: screenshot failed: Cylex served Cloudflare "Just a moment..." to browser and HTTP 403 to fetcher. Challenge page saved as 2026-07-02_cylex_prima-protect-insurance-brokers_listing.png.
- **HTML archive**: 2026-07-02_cylex_prima-protect-insurance-brokers_listing.html (challenge page only)
- **Relevance**: Medium
- **Direct or indirect**: Indirect (search-index snippet; direct page not capturable)
- **Notes**: Shows one directory record carrying BOTH numbers, the "Prima Protect" name and the primainsurance.co.uk website — data from three identities of the broker group merged in one listing. Correct business family; internally mixed data.

### DIR-09 — 192.com: separate, correct records for broker and insurer, same category
- **Category**: K
- **Source/platform**: 192.com business directory
- **URLs**:
  - Broker (trading addr): https://www.192.com/atoz/business/manchester-m25/insurance-brokers/prima-financial-services-ltd/e724495fb37a5c3bb7d6b2154194ccf7395fa505/comp/
  - Broker (HQ): https://www.192.com/atoz/business/manchester-m24/insurance-brokers/prima-financial-services-ltd/e28f03a466e6451d7da9e330292357f2b0dfb1ed/comp/
  - Insurer: https://www.192.com/atoz/business/london-ec4v/insurance-brokers/prima-subsidiary-ltd/544cf8a6509cebb02259ffc2b2ad23d9b01e8f63/comp/
- **Page titles**: "PRIMA FINANCIAL SERVICES LTD - Insurance Brokers in M25 9JZ - 192.com"; "…M24 2LX…"; "PRIMA SUBSIDIARY LTD - Insurance Brokers in SE1 9LS - 192.com"
- **Search query used**: DDG SERP for `"0161 826 1620"`; `site:192.com … "Prima Subsidiary"`
- **Date/time accessed**: 2026-07-02 ~01:30–01:45 UTC
- **Exact quote/snippet**:
  - "PRIMA FINANCIAL SERVICES LTD Insurance Brokers in Manchester … 21 Bury New Road, Prestwich, Manchester, Greater Manchester, M25 9JZ 0161 826 1620"
  - "PRIMA FINANCIAL SERVICES LTD Insurance Brokers in Manchester … Brulimar House Jubilee Road, Middleton, M24 2Lx … 0161 826 1620 Headquarters"
  - "PRIMA SUBSIDIARY LTD Alto Building, 30 Stamford Street, London, Se1 9Ls, SE1 9LS 020 3318 9745"
- **Screenshot filenames**: 2026-07-02_192com_prima-financial-services-m25_listing.png, 2026-07-02_192com_prima-financial-services-m24_listing.png, 2026-07-02_192com_prima-subsidiary-ec4v_listing.png, 2026-07-02_192com_insurance-brokers-m25_search.png
- **HTML archive**: matching .html files
- **Relevance**: Medium
- **Direct or indirect**: Direct (directory records)
- **Notes**: 192.com does NOT mix the numbers — each firm has its own correct phone. But both appear in the identical "Insurance Brokers" category under near-identical names (PRIMA FINANCIAL SERVICES LTD vs PRIMA SUBSIDIARY LTD), and the insurer also has a stale second address record (71-73 Carter Lane, Fleet Street EC4V 5EQ per SERP title). A consumer scanning 192.com for "Prima … insurance" sees two similarly named "Insurance Brokers" — the broker's record with 0161 826 1620 ranks for Manchester searches.

### DIR-10 — BIBA broker directory: broker's number + personal email published
- **Category**: K
- **Source/platform**: British Insurance Brokers' Association broker directory
- **URL**: https://www.biba.org.uk/find-insurance/broker-directory/prima-financial-services-ltd/
- **Page title**: "Prima Financial Services Ltd - BIBA"
- **Search query used**: `"Prima Financial Services" 842275 insurance brokers Prestwich`
- **Date/time accessed**: 2026-07-02 ~01:20 UTC
- **Exact quote/snippet**: "Prima Financial Services Ltd Main Contact Information http://primaprotect.co.uk anthony@primainsurance.co.uk 01618261620 Bury New Road Prestwich Greater Manchester M25 9JY"
- **Screenshot filename**: 2026-07-02_biba_prima-financial-services_broker-directory.png
- **HTML archive**: 2026-07-02_biba_prima-financial-services_broker-directory.html
- **Relevance**: Medium
- **Direct or indirect**: Direct (directory record)
- **Notes**: Industry directory ties 0161 826 1620 to the correct firm. Also demonstrates the broker's own split identity (name "Prima Financial Services Ltd", website primaprotect.co.uk, email @primainsurance.co.uk) which feeds inconsistent directory data downstream.

### DIR-11 — Reverse-phone lookup databases: NO reports associating either number with anything
- **Category**: K (negative result — important)
- **Source/platform**: shouldianswer.co.uk, whocallsme.com (captured); tellows.co.uk, who-called.co.uk, unknownphone.com, whosringing.co.uk (blocked)
- **URLs**:
  - https://www.shouldianswer.co.uk/phone-number/03300881135 and /01618261620
  - https://whocallsme.com/Phone-Number.aspx/03300881135 and /01618261620
  - (blocked) https://www.tellows.co.uk/num/03300881135, /num/01618261620; https://who-called.co.uk/Number/03300881135, /01618261620; https://www.unknownphone.com/phone/…; https://whosringing.co.uk/number/…
- **Page titles**: "Who called you from 03300881135 (+443300881135) ? | shouldianswer.co.uk"; "03300881135 - who calls me from 03300881135?"; etc.
- **Search query used**: direct number lookups; plus `"0330 088 1135" OR "03300881135" who called OR spam OR review`
- **Date/time accessed**: 2026-07-02 ~01:00–01:10 UTC
- **Exact quote/snippet**:
  - shouldianswer (both numbers): "This phone number has no rating because we have no users reviews and no information about any suspicious activity for this phone number in our database ."
  - whocallsme (both numbers): "There are no comments yet about 03300881135." / "There are no comments yet about 01618261620."
- **Screenshot filenames**: 2026-07-02_shouldianswer_03300881135_lookup.png, 2026-07-02_shouldianswer_01618261620_lookup.png, 2026-07-02_whocallsme_03300881135_lookup.png, 2026-07-02_whocallsme_01618261620_lookup.png; blocked-page evidence: 2026-07-02_tellows_*.png, 2026-07-02_who-called_*.png, 2026-07-02_unknownphone_*.png, 2026-07-02_whosringing_*.png
- **HTML archive**: matching .html files for all of the above
- **Relevance**: Medium (as a documented negative)
- **Direct or indirect**: Direct (database lookups)
- **Notes**: **No caller-comment on any accessible reverse-lookup site associates 0330 088 1135 or 0161 826 1620 with Hello Prima, car insurance, or anything else** — the numbers have no community reports at all. For the blocked sites, Wayback CDX returned zero archived captures for these number pages and no search-engine snippet references them, consistent with no reports existing there either. No evidence found (stated clearly per brief).

### DIR-12 — Search layer mixes both firms on number+brand queries; AI answer conflates them
- **Category**: I (indirect)
- **Source/platform**: DuckDuckGo HTML SERPs (captured); WebSearch engine results
- **URLs**: https://duckduckgo.com/html/?q=%220330%20088%201135%22 ; https://duckduckgo.com/html/?q=%220161%20826%201620%22
- **Page titles**: `"0330 088 1135" at DuckDuckGo`; `"0161 826 1620" at DuckDuckGo`
- **Search queries used**: `"0330 088 1135" "Hello Prima" OR "car insurance"`; `"0161 826 1620" "Hello Prima" OR "car insurance"`; `"Prima Insurance" "0330 088 1135" -site:primainsurance.co.uk`; plus the plain-number DDG queries
- **Date/time accessed**: 2026-07-02 ~01:35 UTC
- **Exact quote/snippet**: For `"0330 088 1135" "Hello Prima" OR "car insurance"` the result set interleaved primainsurance.co.uk/contact/, helloprima.com, helloprima.co.uk ("Prima - Great Value Car Insurance Quotes"), uk.linkedin.com/company/prima-insurance-broker and bizseek's number listing. The search engine's own AI summary asserted, wrongly: "So the phone number 0330 088 1135 is indeed associated with Prima Insurance/Hello Prima's car insurance services." (Recorded verbatim from the tool output; this is machine conflation, not a human statement.)
- **Screenshot filenames**: 2026-07-02_ddg_0330-088-1135_serp.png, 2026-07-02_ddg_0161-826-1620_serp.png
- **HTML archive**: 2026-07-02_ddg_0330-088-1135_serp.html, 2026-07-02_ddg_0161-826-1620_serp.html
- **Relevance**: Medium-High
- **Direct or indirect**: Indirect
- **Notes**: This does not prove any human was misled, but demonstrates that (a) contact searches mixing the broker's numbers with Hello Prima's brand return both firms interleaved, and (b) automated summarisation layers can and do output the broker's number "for" Hello Prima. Complements Agent 1/Agent 9 SERP work.

### DIR-13 — Hello Prima's Manchester hub (geographic overlap, context)
- **Category**: I (context)
- **Source/platform**: helloprima.com careers site
- **URL**: https://www.helloprima.com/careers/locations/the-uk
- **Page title**: "The United Kingdom - Prima"
- **Search query used**: `site:yell.com "prima insurance" OR "prima financial" OR "prima protect" Manchester` (surfaced in results)
- **Date/time accessed**: 2026-07-02 ~01:20 UTC
- **Exact quote/snippet**: "…we decided to take Prima global. We set our sights on the UK, one of the world's largest car insurance markets, establishing our presence in London and now expanding further with a new hub in Manchester." Job list includes "Claims Administrator new Claims Manchester, United Kingdom". "In Manchester, our team is located in a modern, centrally based workspace near the city's Cathedral."
- **Screenshot filename**: 2026-07-02_helloprima_careers-uk-manchester-hub.png
- **HTML archive**: 2026-07-02_helloprima_careers-uk-manchester-hub.html
- **Relevance**: Medium
- **Direct or indirect**: Indirect (context)
- **Notes**: Both firms now operate in Manchester (broker in Prestwich/Bury New Road; insurer's claims staff "near the city's Cathedral"). Local-search and local-directory ambiguity ("Prima insurance Manchester") is therefore likely to increase. Context only — not confusion evidence in itself.

### DIR-14 — Other directory listings tying the numbers to the broker family (Yelp, vymaps, Cybo, yably, Yell)
- **Category**: K
- **Source/platform**: Yelp, vymaps.com, Cybo, yably.co.uk, Yell.com
- **URLs**:
  - https://www.yelp.com/biz/prima-protect-insurance-brokers-manchester
  - https://vymaps.com/GB/Prima-Protect-Insurance-Brokers-839721899501775/
  - https://www.cybo.com/GB-biz/prima-insurance-brokers
  - https://yably.co.uk/reviews/prestwich/prima-protect-insurance-brokers-39-bury-new-rd
  - https://www.yell.com/biz/prima-protect-insurance-brokers-manchester-9212345/
- **Page titles (from SERPs, verbatim)**:
  - "PRIMA PROTECT INSURANCE BROKERS - Updated April 2026 - 39 Bury New Road, Manchester, United Kingdom - Life Insurance - Phone Number - Yelp"
  - "Prima Protect Insurance Brokers, North West England (03300881135)" (vymaps)
  - "Prima Insurance Brokers - 29 Bury New Rd, Greater, Prestwich ... - Cybo"
  - "Reviews about Prima Protect Insurance Brokers in Prestwich 39 Bury New Rd" (yably)
  - Yell result title displayed as "Are you human?" (bot wall)
- **Search queries used**: `"0330 088 1135"`, `"03300881135"`, `"0161 826 1620" OR "01618261620" Prima insurance broker directory`
- **Date/time accessed**: 2026-07-02 ~00:40–01:45 UTC
- **Exact quote/snippet**: vymaps search snippet: number "(03300881135)" in its title, "their website at www.primaprotect.co.uk". yably search snippet: "Prima Protect Insurance Brokers can be reached at 0161 826 1620 … 4.90/5 rating with 598 reviews across multiple sources, including 579 reviews on Google."
- **Screenshot filenames**: 2026-07-02_vymaps_prima-protect-insurance-brokers_listing.png (full listing captured); blocked-page captures: 2026-07-02_yelp_prima-protect-insurance-brokers_listing.png, 2026-07-02_cybo_prima-insurance-brokers_listing.png, 2026-07-02_yably_prima-protect-insurance-brokers_reviews.png, 2026-07-02_yell_prima-protect-insurance-brokers_listing.png; SERP evidence in 2026-07-02_ddg_0330-088-1135_serp.png
- **HTML archive**: matching .html files (blocked ones contain challenge pages)
- **Relevance**: Medium
- **Direct or indirect**: Mixed (vymaps direct; others via search-index snippets)
- **Notes**: All tie the numbers to the **correct business family**, but under three different names, at least three street numbers, and (Yelp) the category "Life Insurance". No car-insurance categorisation of the broker's numbers was found in any directory. Yelp/Cybo/yably/Yell content could not be captured directly (bot walls) — snippet-level evidence only.

### DIR-15 — CompanyCheck / Endole company-data sites
- **Category**: K
- **Source/platform**: companycheck.co.uk (captured), open.endole.co.uk (blocked; snippet)
- **URLs**: https://companycheck.co.uk/company/11940805 ; https://companycheck.co.uk/company/12728615 ; https://open.endole.co.uk/insight/company/12728615-prima-subsidiary-ltd ; https://open.endole.co.uk/insight/company/11940805-prima-financial-services-ltd
- **Page titles**: "PRIMA FINANCIAL SERVICES LTD | Company Summary"; "PRIMA SUBSIDIARY LTD | Company Summary"; "Prima Subsidiary Ltd - Company Profile - Endole"
- **Search query used**: `site:192.com OR site:endole.co.uk OR site:companycheck.co.uk "Prima Financial Services" OR "Prima Subsidiary"`
- **Date/time accessed**: 2026-07-02 ~01:40 UTC
- **Exact quote/snippet**: Endole search snippet (verbatim from result summary): "Prima Subsidiary Ltd is an active company incorporated on 8 July 2020 with the registered office located in London, Greater London. The company has locations at both 71-73, Carter Lane, Fleet Street, London, EC4V 5EQ and SE1 9LS."
- **Screenshot filenames**: 2026-07-02_companycheck_prima-financial-services-11940805.png, 2026-07-02_companycheck_prima-subsidiary-12728615.png; Endole blocked: 2026-07-02_endole_prima-subsidiary-12728615_profile.png, 2026-07-02_endole_prima-financial-services-11940805_profile.png (challenge pages)
- **HTML archive**: matching .html files
- **Relevance**: Low
- **Direct or indirect**: Direct (CompanyCheck) / indirect (Endole snippet)
- **Notes**: Company-data aggregators mirror Companies House and do not carry the phone numbers; no mixing found. Endole/192.com retain the insurer's older Carter Lane EC4V address alongside the current SE1 address (stale data, minor).

## Sources checked with no relevant results

- ThomsonLocal — https://www.thomsonlocal.com/search/prima-insurance/prestwich-greater-manchester: 71 insurance results in area, **no Prima entry of any kind** (checked 2026-07-02 ~01:30 UTC).
- Scoot — site search unreachable (SSL error) and `site:scoot.co.uk "Prima Insurance"` returned nothing relevant.
- opendi.co.uk, ukplaces.com, the-dots.com — site-restricted searches returned no Prima listings.
- Companies House search "hello prima" — no company registered as "Hello Prima".
- LeadIQ data-broker profile for Prima (https://leadiq.com/c/prima/5a1d9d5e2300005b008d370f) — Prima Assicurazioni/helloprima profile lists Milan HQ and no UK phone numbers at all; no cross-contamination with the broker's numbers.
- ZoomInfo/RocketReach/Apollo cross-search — no results tying "Prima Subsidiary"/helloprima to any UK phone number.
- Number permutation searches with no relevant/new results: `"+443300881135" OR "+44 330 088 1135" Prima` (nothing UK-relevant); `"0161 826 1620"` plain (no UK results beyond those recorded); `"0330 088 1135"/"03300881135"` + "HelloPrima"/"Hello Prima"/"car insurance" and `"0161 826 1620"/"01618261620"` + same — **no third-party page found that prints either broker number next to Hello Prima branding**; results were only the two firms' own sites appearing together (recorded as DIR-12).
- Facebook lead from number SERP (facebook.com/groups/510010749582300/posts/1558755188041179/) — post is about SMS energy-meter calls; irrelevant (Category M).
- prudentplus.co.uk "Salford Car Insurance" page (surfaced in `"01618261620"` search) — fetched; contains no Prima mention and no broker number; irrelevant (Category M).
- Wayback CDX for tellows/who-called/unknownphone/whosringing number pages — zero captures (supports the "no reports exist" negative in DIR-11).

## Access blockers

- **tellows.co.uk, who-called.co.uk, unknownphone.com, whosringing.co.uk** — Cloudflare bot walls against both headless browser and fetcher; no Wayback captures exist. Community-report content (if any) unverifiable, but absence of any search-index or archive trace strongly suggests no reports exist for either number.
- **Yell.com** — "Are you human?" / "Just a moment..." walls; listing `prima-protect-insurance-brokers-manchester-9212345` exists (SERP title) but content not capturable; no Wayback capture.
- **Cylex, yably, Yelp, Cybo, vymaps (intermittent), Endole, ContactOut** — 403/Cloudflare to fetcher; evidence preserved via search-index snippets and (vymaps) one successful browser capture.
- **helloprima.co.uk** — Cloudflare challenge to headless browser; page titles evidenced via SERPs (other agents captured Wayback copies: see 2026-07-02_wayback_helloprima_about-us.png).
- **Google SERPs** — captcha-blocked (used DDG/Bing per common instructions); Bing began serving challenges near end of session (one SERP capture failed).
- FCA Register is a JS app; trading-name tables required a custom Playwright script (fca_trading_names.mjs in scratchpad tools) to expand accordions — successful, tables captured.
