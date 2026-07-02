# Agent 4 — Facebook / LinkedIn / Social Media Public Search

Investigator: Agent 4 (SOCIAL MEDIA PUBLIC SEARCH). Date of research: 2026-07-02 (UTC).
Scope: publicly indexed social media only — Facebook, LinkedIn, X/Twitter, TikTok, Instagram, YouTube — plus the two businesses' own social profiles.

## Summary

- **Confirmed (naming ambiguity on social platforms):** The two businesses' own social profiles are close to indistinguishable by name. The broker's LinkedIn company page is named simply **"Prima Insurance"** (uk.linkedin.com/company/prima-insurance-broker); Hello Prima's LinkedIn page is named **"Prima"** (linkedin.com/company/prima-assicurazioni). LinkedIn's own algorithmic **"Similar pages"** panel on the broker's page lists Hello Prima's "Prima — Insurance — Milano, Lombardia" page as the first similar page (SOC-01).
- **Confirmed:** Hello Prima's group X/Twitter handle is literally **@Prima_Insurance** ("Prima Assicurazioni (@Prima_Insurance)", joined March 2017). Anyone searching X for "Prima Insurance" is directed to the insurer's (Italian, near-dormant) account; the broker has no X account (SOC-02).
- **Confirmed (SERP-level):** In a DuckDuckGo search for `"prima insurance" facebook UK`, the top two organic results are helloprima.co.uk's "About Prima Insurance - Prima Insurance" page and primainsurance.co.uk's "Prima | Leading Business Insurance Brokers" — the insurer's own indexed page titles use the exact phrase "Prima Insurance", the broker's trading name, and the two appear directly adjacent (SOC-03).
- **Confirmed:** Hello Prima appears to have **no UK-specific social media presence at all**: no UK Facebook page, no UK Instagram, no UK X account, and no social links in the helloprima.co.uk site footer (verified via Wayback capture). Its group accounts (YouTube @helloprima, Instagram @prima_assicurazioni, Facebook prima.assicurazioni, X @Prima_Insurance) are Italy/Spain-oriented. By contrast the broker has active, publicly accessible Facebook, LinkedIn and YouTube pages under "Prima Insurance (Brokers)" showing its phone numbers and email (SOC-04, SOC-05). This is consistent with (but does not by itself prove) Hello Prima customers who search social platforms for "Prima insurance" landing on the broker's channels.
- **No public social-media post was found in which a customer states they called the wrong Prima number, used the wrong email, or contacted "the wrong Prima"** — all confusion-language queries against facebook.com, x.com/twitter.com and tiktok.com returned nothing indexed. This is stated plainly: on public, indexed social media, no direct Category A/B/D customer evidence was found.
- **No page was found on any social platform associating 0330 088 1135 or 0161 826 1620 with Hello Prima / Prima car insurance.** The only social page carrying those numbers is the broker's own Facebook/LinkedIn presence (correct association).
- A public Facebook group post (Mitsubishi Outlander PHEV UK, 2 April 2026) shows a UK consumer referring to Hello Prima simply as **"Prima insurance"** — context showing the public's shorthand for the insurer is identical to the broker's trading name (SOC-06).
- The broker's Facebook page shows "Not yet rated (0 reviews)", so no evidence of misdirected Facebook reviews exists there (a genuine negative finding, recorded honestly).
- Distractor accounts documented to avoid misattribution: @prima_uk on X and Instagram is a Manchester R&B musician, not the insurer; @hello.prima on Instagram is an empty 0-post account of unknown ownership (SOC-07).
- Key access blockers: X/Twitter native search, LinkedIn post feeds, Facebook comments/reviews and Instagram post content are login-gated; helloprima.co.uk blocks the research browser (Cloudflare). Noted in detail below; nothing was guessed around these walls.

## Findings

### SOC-01 — Both businesses' LinkedIn pages are named "Prima Insurance" / "Prima"; LinkedIn lists the insurer as a "Similar page" on the broker's page
- **ID:** SOC-01
- **Category:** I (search/platform ambiguity); supports D context
- **Source/platform:** LinkedIn (public company pages, no login)
- **URL:** https://uk.linkedin.com/company/prima-insurance-broker and https://www.linkedin.com/company/prima-assicurazioni
- **Page title:** "Prima Insurance | LinkedIn" (broker) / "Prima | LinkedIn" (insurer)
- **Search query used:** `site:linkedin.com "Hello Prima" "Prima Insurance"`; `site:linkedin.com "0330 088 1135" "Prima"`; direct page loads
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):**
  - Broker page: "Prima Insurance" — "Prima Insurance - Insurance You Can Rely On. Trust… Experienced, Professional." — Website "https://www.primainsurance.co.uk" — Locations: "39 Bury New Road, Manchester, England M25 9JY, GB" — "319 followers".
  - Broker page, "Similar pages" panel (LinkedIn-generated): "Prima — Insurance — Milano, Lombardia" listed first, followed by "Prima Life — Insurance — Manchester, England".
  - Insurer page: "Prima" — "Great experience, great price. | Launched in 2015, by 2020 Prima had become the leader in Italy's online motor insurance market…" — websites helloprima.com / helloprima.co.uk / helloprima.es.
- **Screenshot filename:** 2026-07-02_linkedin_prima-insurance-broker_companypage.png; 2026-07-02_linkedin_prima-assicurazioni_companypage.png
- **HTML archive filename:** 2026-07-02_linkedin_prima-insurance-broker_companypage.html; 2026-07-02_linkedin_prima-assicurazioni_companypage.html
- **Relevance:** High
- **Direct or indirect:** Direct evidence of platform-level naming ambiguity; indirect as to actual customer confusion
- **Notes:** A LinkedIn user searching "Prima Insurance" encounters the broker's page under exactly that name and the insurer's page named "Prima", and LinkedIn's own recommendation engine treats the two as similar/related. This directly evidences that the platform itself associates the two brands; it does not prove any specific customer mixed them up.

### SOC-02 — Hello Prima's X/Twitter handle is @Prima_Insurance
- **ID:** SOC-02
- **Category:** I (ambiguity); supports D context
- **Source/platform:** X/Twitter (public profile, no login required for profile header)
- **URL:** https://x.com/prima_insurance
- **Page title:** "Prima Assicurazioni (@Prima_Insurance) / X"
- **Search query used:** `Prima Assicurazioni twitter X @PrimaAssicura OR @helloprima official account`; `"@Prima_Insurance" twitter OR x.com mention`
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** "Prima Assicurazioni @Prima_Insurance — La comodità dell'online, l'assistenza di un'agenzia. — Joined March 2017 — 1 Following 97 Followers — @prima_insurance hasn't posted"
- **Screenshot filename:** 2026-07-02_x_prima_insurance_helloprima-profile.png
- **HTML archive filename:** 2026-07-02_x_prima_insurance_helloprima-profile.html
- **Relevance:** High
- **Direct or indirect:** Direct evidence that the insurer group occupies the "Prima_Insurance" name on X; indirect as to customer confusion
- **Notes:** The Hello Prima group's own X handle is the broker's trading name verbatim. The account is Italian-language and effectively dormant (profile shows "1 posts" in header but "hasn't posted" in feed — posts deleted or geo-restricted). A UK customer searching X for "Prima Insurance" finds this account; the broker has no X presence. This is consistent with brand-namespace overlap created by the insurer's own naming choices.

### SOC-03 — DuckDuckGo social-intent SERP shows both businesses adjacent; helloprima.co.uk titles itself "Prima Insurance"
- **ID:** SOC-03
- **Category:** I (search-result ambiguity)
- **Source/platform:** DuckDuckGo SERP (query with social intent: "facebook")
- **URL:** https://duckduckgo.com/html/?q=%22prima+insurance%22+facebook+UK
- **Page title:** "\"prima insurance\" facebook UK at DuckDuckGo"
- **Search query used:** `"prima insurance" facebook UK`
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** Result 1: "About Prima Insurance - Prima Insurance — www.helloprima.co.uk/about-us — Find out more about Prima, the online car insurance provider trusted since 2015…". Result 2: "Prima | Leading Business Insurance Brokers — primainsurance.co.uk". Result 3: "Mitsubishi Outlander PHEV UK | Interesting! Prima insurance ... — www.facebook.com/groups/outlanderphevuk/posts/2994131140778898/".
- **Screenshot filename:** 2026-07-02_ddg_prima-insurance-facebook-uk_serp.png
- **HTML archive filename:** 2026-07-02_ddg_prima-insurance-facebook-uk_serp.html
- **Relevance:** High
- **Direct or indirect:** Direct evidence of the two businesses appearing together for a "prima insurance" + social query; indirect as to customer confusion
- **Notes:** Hello Prima's own indexed page title uses the exact phrase "Prima Insurance" twice ("About Prima Insurance - Prima Insurance"), i.e. the insurer publicly describes itself using the broker's trading name. Broker and insurer are results 1 and 2 for the same query. This directly evidences search-journey ambiguity for users trying to find a "Prima insurance" social page.

### SOC-04 — Broker's public Facebook page: full contact details visible; zero reviews
- **ID:** SOC-04
- **Category:** I (context for misdirected contact); also establishes a negative finding for misdirected reviews
- **Source/platform:** Facebook (public page, viewable without login via /people/ URL)
- **URL:** https://www.facebook.com/people/Prima-Insurance-Brokers/100093151218173/ (also https://www.facebook.com/PrimaInsuranceBrokers/)
- **Page title:** "Prima Insurance Brokers | Prestwich | Facebook"
- **Search query used:** `"Prima Insurance Brokers" Facebook Prestwich Manchester`
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** Banner: "The UK's Leading Insurance Broker". Intro panel: "Page · Insurance brok… — 21 Bury New Rd, Pres… Prestwich, United King… — +44 161 826 1620 — info@primainsurance.… — primainsurance.co.uk — Not yet rated (0 reviews)".
- **Screenshot filename:** 2026-07-02_facebook_prima-insurance-brokers-people_page.png (plus login-walled variant 2026-07-02_facebook_primainsurancebrokers_page.png)
- **HTML archive filename:** 2026-07-02_facebook_prima-insurance-brokers-people_page.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** The broker's phone number 0161 826 1620 and email are publicly displayed on Facebook under the "Prima Insurance Brokers" name. Because Hello Prima has no UK Facebook page (SOC-05), this is the page a Facebook user finds when searching "Prima insurance" in a UK context. Importantly, the page shows "Not yet rated (0 reviews)" — **no misdirected Hello Prima reviews exist on the broker's Facebook page** (priority finding 7: no evidence found on this platform).

### SOC-05 — Hello Prima has no discoverable UK social media presence; its site links no social accounts
- **ID:** SOC-05
- **Category:** I / E context (contact difficulty channel gap)
- **Source/platform:** helloprima.co.uk (via Wayback Machine), Facebook, Instagram, X, YouTube searches
- **URL:** https://web.archive.org/web/2026/https://www.helloprima.co.uk/ ; https://www.youtube.com/@helloprima ; https://www.instagram.com/prima_assicurazioni/ ; https://www.facebook.com/prima.seguros.es/
- **Page title:** "Prima - Great Value Car Insurance Quotes" (helloprima.co.uk via Wayback); "Prima - YouTube"
- **Search query used:** `site:facebook.com "helloprima"`; `"Hello Prima" UK car insurance Facebook page official`; `"Prima" UK car insurance Instagram official account helloprima`; footer inspection of archived homepage HTML
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** Archived helloprima.co.uk footer: "Prima Subsidiary Ltd, trading as 'Prima', is authorised and regulated by the Financial Conduct Authority under reference 1031191." The homepage HTML contains **no** facebook.com / instagram.com / x.com / twitter.com / tiktok.com / linkedin.com / youtube.com links (only `twitter:card` metadata tags). `site:facebook.com "helloprima"` returned only "Prima Seguros | Facebook" (Spanish page, helloprima.es). YouTube channel: "Prima — @helloprima — 789 subscribers — 50 videos — We're an international insurtech company, with a team of over 1,400 people… helloprima.com" (videos are Italy/Spain-oriented, e.g. "Prima Italy 🇮🇹 | Summer Party 2026", "THIS IS US | Ignacio Gámez (Head of Claims Spain)").
- **Screenshot filename:** 2026-07-02_wayback_helloprima-homepage_socials.png; 2026-07-02_youtube_helloprima_channel.png; 2026-07-02_instagram_prima-assicurazioni_profile.png
- **HTML archive filename:** 2026-07-02_wayback_helloprima-homepage_socials.html; 2026-07-02_youtube_helloprima_channel.html; 2026-07-02_instagram_prima-assicurazioni_profile.html
- **Relevance:** Medium-High
- **Direct or indirect:** Indirect
- **Notes:** This does not prove confusion, but supports the confusion mechanism: a UK Hello Prima customer who turns to social media to find or contact "Prima insurance" finds no insurer UK account, while the broker's "Prima Insurance"/"Prima Insurance Brokers" pages (with phone/email) are the prominent UK results on Facebook, LinkedIn and YouTube.

### SOC-06 — Public Facebook group post referring to Hello Prima as "Prima insurance"
- **ID:** SOC-06
- **Category:** I (weak, contextual); not confusion in itself
- **Source/platform:** Facebook public group "Mitsubishi Outlander PHEV UK"
- **URL:** https://www.facebook.com/groups/outlanderphevuk/posts/2994131140778898/
- **Page title:** "Mitsubishi Outlander PHEV UK | Interesting! Prima insurance have notified us to say they can no longer insure our car when it expires | Facebook"
- **Search query used:** DDG `"prima insurance" facebook UK` (post dated 2026-04-02 per SERP)
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** "Interesting! Prima insurance have notified us to say they can no longer insure our car when it expires. Anyone else have this?" (Auto-generated page meta: "Why is Prima Insurance dropping Mitsubishi Outlander PHEV UK car insurance?")
- **Screenshot filename:** 2026-07-02_facebook_outlanderphevuk-group_prima-insurance-post.png
- **HTML archive filename:** 2026-07-02_facebook_outlanderphevuk-group_prima-insurance-post.html
- **Relevance:** Low-Medium
- **Direct or indirect:** Indirect
- **Notes:** A UK consumer publicly calls the insurer "Prima insurance" — the broker's trading name — showing the public shorthand collision in the wild. Comments on the post are login-gated and were not read. This does not prove wrong-company contact; it is consistent with the naming-overlap mechanism.

### SOC-07 — Distractor "Prima" accounts documented (not the insurer, not the broker)
- **ID:** SOC-07
- **Category:** M (not relevant — recorded to prevent misattribution)
- **Source/platform:** X and Instagram
- **URL:** https://x.com/prima_uk ; https://www.instagram.com/prima_uk/ ; https://www.instagram.com/hello.prima/
- **Page title:** "Prima (@prima_uk) / X"; "Prima (@prima_uk) • Instagram photos and videos"; "(@hello.prima) • Instagram photos and videos"
- **Search query used:** `site:instagram.com helloprima OR "prima" UK car insurance`; `"@Prima_Insurance" twitter OR x.com mention`
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** X @prima_uk bio: "Fresh from a huge advert deal with global clothing giant "Pretty Little Thing" Manchester's queen of R&B Prima is back with her latest single "Know About Me"" — location "Manchester, England". Instagram @hello.prima: "0 posts 22 followers 2 following" (empty account).
- **Screenshot filename:** 2026-07-02_x_prima_uk_profile.png; 2026-07-02_instagram_prima_uk_profile.png; 2026-07-02_instagram_hello-prima_profile.png
- **HTML archive filename:** matching .html files in source_archive
- **Relevance:** Low
- **Direct or indirect:** Neither — exclusionary record
- **Notes:** @prima_uk (X and Instagram) is a Manchester musician; @hello.prima (Instagram) is an empty account of unknown ownership. Neither should be cited as either business. Their existence further crowds the "Prima" namespace on social platforms.

### SOC-08 — YouTube: both businesses present under near-identical "Prima" branding; no confused comments found
- **ID:** SOC-08
- **Category:** I (weak context)
- **Source/platform:** YouTube (public, no login)
- **URL:** https://www.youtube.com/@helloprima ; https://www.youtube.com/@Primainsurancebrokers
- **Page title:** "Prima - YouTube" / "Prima insurance brokers - YouTube"
- **Search query used:** `site:youtube.com "Hello Prima insurance"`; broker site footer link
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** Insurer channel: "Prima — @helloprima — 789 subscribers — 50 videos — Insurance, as you've never experienced it before". Broker channel: "Prima insurance brokers — @Primainsurancebrokers — 1 subscriber — 2 videos" (videos: "Prima Testimonial | Joel Robinson | Greenco", "Prima Testimonial | Alex Woolfstein | CEO Bargain Max", both "2 years ago").
- **Screenshot filename:** 2026-07-02_youtube_helloprima_channel.png; 2026-07-02_youtube_primainsurancebrokers_channel.png
- **HTML archive filename:** matching .html files in source_archive
- **Relevance:** Low
- **Direct or indirect:** Indirect
- **Notes:** Both channels brand as "Prima…". Video/comment volumes are tiny; no customer comments evidencing confusion were found on either channel. Recorded for completeness.

### SOC-09 — Broker's own numbers on social media are correctly attributed (no wrong-number hit on any social platform)
- **ID:** SOC-09
- **Category:** A — negative result (no direct wrong-number evidence on social media)
- **Source/platform:** Facebook, LinkedIn, X site-searches
- **URL:** n/a (query-level finding); broker LinkedIn https://www.linkedin.com/company/prima-insurance-broker
- **Page title:** various SERPs
- **Search query used:** `site:facebook.com "Prima insurance" "0330 088 1135"`; `site:facebook.com "Prima insurance" "0161 826 1620"`; `site:linkedin.com "0330 088 1135" "Prima"`; `site:linkedin.com "0161 826 1620" "Prima"`
- **Date/time accessed (UTC):** 2026-07-02
- **Exact quote/snippet (verbatim):** Search-tool summary for the LinkedIn number query: "The search found Prima Insurance on LinkedIn… The phone number 0330 088 1135 appears in their posts about medical insurance services, and is listed as a contact method for their medical team." No result on any social platform associated either number with Hello Prima / Prima car insurance.
- **Screenshot filename:** screenshot failed: query-level negative result across multiple SERPs; individual LinkedIn posts are login-gated (see Access blockers)
- **HTML archive filename:** n/a
- **Relevance:** Medium (as an honest negative on the top priority question)
- **Direct or indirect:** n/a (absence of evidence)
- **Notes:** **No public social-media page was found showing 0330 088 1135 or 0161 826 1620 associated with Hello Prima / Prima car insurance.** Both numbers appear on social media only in the broker's own properties, correctly attributed. Confirmed / not confirmed status for this platform family: **not confirmed** (no wrong-number evidence on social media).

## Sources checked with no relevant results

All queries below were run on 2026-07-02 and returned no publicly indexed social posts evidencing confusion, wrong numbers, wrong emails or "wrong Prima" language:

- `site:facebook.com "Hello Prima" "contact"` — no matching Facebook content (only unrelated Prima Marketing/Prima Assicurazioni pages)
- `site:facebook.com "Hello Prima" "phone"` — nothing relevant
- `site:facebook.com "Hello Prima" "claim"` — nothing relevant
- `site:facebook.com "Hello Prima" "wrong"` — nothing relevant
- `site:facebook.com "Prima car insurance" "contact"` — nothing relevant (US "Prima Insurance" agencies only)
- `site:facebook.com "Prima car insurance" "phone"` — nothing relevant
- `site:facebook.com "Prima insurance" "wrong number"` — nothing found
- `site:facebook.com "Prima insurance" "0330 088 1135"` — no Facebook hit (number found only on broker's own site/directories)
- `site:facebook.com "Prima insurance" "0161 826 1620"` — no Facebook hit
- `site:facebook.com "Prima" car insurance "can't get through" OR "no phone number" OR "cannot contact"` — nothing found
- `site:facebook.com "helloprima"` — only Prima Seguros (Spain)
- `site:linkedin.com "Prima car insurance"` — no relevant posts; only insurer company page
- `site:linkedin.com "0161 826 1620" "Prima"` — no post-level hits
- `site:linkedin.com/posts "Prima" insurance "0330 088 1135" OR "0161 826 1620"` — no individual posts indexed
- `site:x.com "Hello Prima" "contact"` — no X posts indexed
- `site:x.com "Prima insurance" "wrong number"` — no X posts indexed
- `site:x.com "Prima car insurance" "claim"` — only an unrelated "Prime Insurance Ltd" tweet
- `site:twitter.com "Prima insurance" UK contact OR claim OR phone` — no tweets indexed
- DDG `site:x.com OR site:twitter.com "hello prima" insurance` — **"No results found"** (screenshot 2026-07-02_ddg_sitex-hello-prima-insurance_serp.png; HTML archived)
- `"hello prima" OR "helloprima" twitter complaint car insurance UK` — no Twitter content surfaced
- `site:tiktok.com "Hello Prima insurance"` — no TikTok content (only Primerica discover pages)
- TikTok discover page https://www.tiktok.com/discover/prima-car-insurance — returned generic app shell "TikTok - Make Your Day", no indexed content (screenshot 2026-07-02_tiktok_discover_prima-car-insurance.png)
- `site:youtube.com "prima car insurance" UK review` — no YouTube videos/comments found (results were Trustpilot/blog sites)

## Access blockers

1. **X/Twitter native search is login-gated.** https://x.com/search?q=%22hello%20prima%22%20insurance&f=live rendered only the logged-out shell "X - The Everything App" (screenshot 2026-07-02_x_search_hello-prima-insurance_attempt.png). Public tweet search could not be performed directly; site:x.com / site:twitter.com engine queries were used instead and are recorded above. X also barely indexes tweets in third-party engines, so absence of indexed tweets is weak evidence of absence of tweets.
2. **LinkedIn post feeds are login-walled.** https://uk.linkedin.com/company/prima-insurance-broker/posts redirected to "Sign Up | LinkedIn". Company page headers/About are public (captured), but post comment threads — where confused customer comments would appear — could not be read.
3. **Facebook depth is login-gated.** The broker's page intro is public, but review tabs, comments on the Outlander PHEV group post, and Facebook's internal search require login. Public-graph search via engines was used instead.
4. **Instagram content behind login overlay.** Profile headers were captured; individual posts/comments were not accessible.
5. **helloprima.co.uk blocks the research browser** (Cloudflare "Just a moment..." on direct load; HTTP 403 to plain fetch). Wayback Machine copy used for the footer/social-links check.
6. **WebSearch tool is US-indexed**, which may under-represent UK-locale Facebook/TikTok content; DuckDuckGo HTML SERPs were captured as a cross-check.

## File inventory (this agent)

19 screenshots and 19 matching HTML archives saved under
`/home/user/primaeats/prima_helloprima_evidence_pack/screenshots/` and `/home/user/primaeats/prima_helloprima_evidence_pack/source_archive/`, filenames prefixed `2026-07-02_` as cited per finding above.
