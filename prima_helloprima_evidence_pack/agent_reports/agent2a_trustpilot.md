# Agent 2a — Trustpilot Deep Dive (Hello Prima / Prima Insurance Brokers)

Agent: TP- prefix. Date of research: 2026-07-02 (all captures 01:29–02:00 UTC approx; each finding lists its access time).
Scope: Trustpilot only — uk.trustpilot.com/review/helloprima.co.uk (exhaustive within public limits), uk.trustpilot.com/review/primainsurance.co.uk, Trustpilot company search, and site:trustpilot.com web searches.

## Summary

- **A Trustpilot page for primainsurance.co.uk (the broker) EXISTS** and carries exactly one review: a 1-star review dated 10 June 2026 written in the language of an aggrieved *motor policyholder* (policy dates, address-change charge, repeated chasing for proof of No Claims Bonus). The complaints match the pattern of Hello Prima's own 1-star reviews almost point-for-point. This is a **probable — not confirmed — instance of priority finding #7** (a review about Hello Prima posted to the broker's page). It cannot be confirmed from public data alone because the broker also arranges insurance. (TP-01)
- **Trustpilot's own company search for "prima insurance" returns the broker's profile FIRST, above Hello Prima** (which appears 7th). A consumer who searches Trustpilot for "prima insurance" is shown the broker's page before the insurer's. Confirmed, screenshot + HTML preserved. (TP-03)
- The broker's Trustpilot profile is claimed but populated with placeholder junk data — display name "aaa", address/city/postcode "a", email "a@gmail.com", phone "07891544866". Anyone landing on it gets no correct broker contact details, and no signal distinguishing it from Hello Prima. (TP-02)
- **No review on either Trustpilot page contains the broker's phone numbers (0330 088 1135 / 0161 826 1620), the broker's email/domain, "wrong Prima", "different Prima", "another Prima" or any explicit statement of having contacted the wrong Prima.** 950 unique reviews (334 one-star, all 73 two-star English reviews, 543 three-to-five-star surfaced by keyword search; every on-site keyword search paginated in full: wrong/different/broker/phone/contact/number/email/claim/cancel/complaint/whatsapp) were extracted and machine-searched, including business replies. This is a clear negative result and is stated as such. (Categories A–D: no direct evidence found on Trustpilot.)
- There is, however, **strong and repeated category-E evidence that Hello Prima customers cannot find a phone number and go searching for one** — including a customer who wrote that they "googled you" to find contact details (TP-05), and five separate reviews saying there is "no phone number" / "couldn't find a number" (TP-06 to TP-10). This directly supports the mechanism by which misdirected calls to Prima Insurance Brokers would occur; it does not by itself prove any call was misdirected.
- Hello Prima's Trustpilot replies give its real contact number as **020 3318 9745** and email **help@helloprima.co.uk** (TP-07) — useful baseline: neither broker number ever appears in any Prima reply.
- Consumers overwhelmingly do NOT know the insurer as "Hello Prima": of 950 unique reviews sampled, only **1** uses the name "Hello Prima", while 17 call it "Prima insurance", 9 "Prima car insurance", and the rest just "Prima". The Trustpilot business name is displayed simply as **"Prima"**. This materially supports search-journey ambiguity (category I context). (TP-19)
- Substantial category E/H/F volume: 456 one-star + 73 two-star English reviews (of 5,524 English / 5,796 total; TrustScore 4.3). Recurring themes: no phone contact at weekends, chatbot/WhatsApp-only routes, difficulty changing car/address (MTA), cancellation threats over document uploads, and claims handled by third party "Broker Direct Plc" — the last of which causes customers to rail against "Prima Insurance and Broker Direct", blurring the word "broker" around the Prima brand (TP-15, TP-16).
- Access limitation: Trustpilot shows a **login wall beyond page 10 of any filtered/paginated list**; per the no-login rule, reviews beyond the most recent 200 per star-filter could only be reached via keyword search (which was done for 11 terms, all pages captured). Evidence of the wall preserved.

## Findings

### TP-01 — Sole review on the broker's Trustpilot page reads like a Hello Prima motor-policy complaint (PROBABLE priority #7)
- **Category:** D (probable) / L if it in fact concerns the broker — evidence is ambiguous
- **Source/platform:** Trustpilot (uk.trustpilot.com)
- **URL:** https://uk.trustpilot.com/review/primainsurance.co.uk (review permalink: https://uk.trustpilot.com/reviews/6a29aec5a80f9624254f7649)
- **Page title:** "aaa Reviews | Read Customer Service Reviews of primainsurance.co.uk"
- **Search query used:** direct URL check per brief ("does a Trustpilot page exist for primainsurance.co.uk")
- **Date/time accessed:** 2026-07-02 01:29 UTC
- **Exact quote (verbatim, 1 star, reviewer "customer" (GB), published 2026-06-10, experience date 2026-06-08):**
  > "Appalling company. Avoid like the plague. I made a mistake regarding the dates of my insurance- refused to change it. Charged me for changing address. So unhelpful. Can’t wait until next year when I can leave them. Sent my proof of NCB more times than I can count- still emailing me asking me for it. Terrible. Avoid"
- **Screenshot:** 2026-07-02_trustpilot_primainsurance_main.png; 2026-07-02_trustpilot_review-primainsurance-page-customer-appalling_6a29aec5a80f9624254f7649.png
- **HTML archive:** 2026-07-02_trustpilot_primainsurance_main.html; 2026-07-02_trustpilot_review-primainsurance-page-customer-appalling_6a29aec5a80f9624254f7649.html
- **Relevance:** High
- **Direct or indirect:** Indirect (probable misdirected review; not self-identifying)
- **Notes:** The review's fact pattern — refusal to change policy dates, an admin charge for a change of address, and repeated email chasing for proof of No Claims Bonus despite multiple submissions — is the signature complaint set found throughout Hello Prima's own 1-star reviews (cf. TP-08, TP-13, TP-16, and e.g. Hello Prima reviewer Alvin David, 2026-06-02: "You cannot upload documents through their link, in my case NCB. Then I receive an email saying my policy is cancelled"). NCB proof-chasing is characteristic of a personal-lines motor insurer's onboarding process; primainsurance.co.uk presents itself as a commercial/business insurance broker. There is no business reply and the reviewer does not name the product. **This is consistent with a Hello Prima customer reviewing the wrong Prima, but does not prove it.** Classified: Probable. Further confirmation would require the reviewer's own account.

### TP-02 — Broker's Trustpilot profile is claimed but populated with placeholder/junk contact data
- **Category:** K (directory/data ambiguity), context for D/I
- **Source/platform:** Trustpilot
- **URL:** https://uk.trustpilot.com/review/primainsurance.co.uk
- **Page title:** "aaa Reviews | Read Customer Service Reviews of primainsurance.co.uk"
- **Search query used:** direct URL check
- **Date/time accessed:** 2026-07-02 01:29 UTC
- **Exact data (from page's embedded profile JSON, verbatim):** displayName: "aaa"; claimed: true; category: "Insurance broker"; contact email: "a@gmail.com"; address/city/zip: "a"/"a"/"a"; phone: "07891544866"; TrustScore 3.2 / 3 stars / 1 review.
- **Screenshot:** 2026-07-02_trustpilot_primainsurance_main.png
- **HTML archive:** 2026-07-02_trustpilot_primainsurance_main.html
- **Relevance:** Medium
- **Direct or indirect:** Direct evidence of the profile's state; indirect for confusion
- **Notes:** The profile is claimed yet shows the business name as "aaa" with dummy contact details (a mobile number 07891544866 that matches neither known broker line). A consumer reaching this page can neither identify the broker properly nor obtain correct contact details, and nothing distinguishes it from "Prima" (Hello Prima). It also means the broker's own Trustpilot presence is effectively unmanaged while confusion-prone reviews can accumulate on it.

### TP-03 — Trustpilot company search for "prima insurance" ranks the broker's page FIRST, above Hello Prima
- **Category:** I (search-result ambiguity, within Trustpilot)
- **Source/platform:** Trustpilot company search
- **URL:** https://uk.trustpilot.com/search?query=prima%20insurance
- **Page title:** "Trustpilot Search Results"
- **Search query used:** on-site company search "prima insurance"
- **Date/time accessed:** 2026-07-02 01:40 UTC
- **Exact result order (verbatim from embedded results JSON):** 1) "aaa" — primainsurance.co.uk (Insurance broker, United Kingdom, 1 review); 2) Prima Assicurazioni — prima.it; 3) Prima Seguros — helloprima.es; 4) Prima Pensioen; 5) Comunale Srl Bari Partner Ufficiale Prima Assicurazioni; 6) ASEMAS; 7) **Prima — helloprima.co.uk** (5,796 reviews); 8) Primassure; then RAC/AA.
- **Screenshot:** 2026-07-02_trustpilot_search-prima-insurance_results.png
- **HTML archive:** 2026-07-02_trustpilot_search-prima-insurance_results.html
- **Relevance:** High
- **Direct or indirect:** Direct evidence of platform-level ambiguity
- **Notes:** A Hello Prima customer who searches Trustpilot for "prima insurance" (the name most customers actually use — see TP-19) is served the broker's review page as the top result, ahead of the insurer's own page. This directly evidences a plausible route by which reviews (and by extension, contact-seeking customers) end up on the wrong Prima's page. For the plain query "prima", Hello Prima ranks first (screenshot 2026-07-02_trustpilot_search-prima_results.png / matching .html).

### TP-04 — Hello Prima's Trustpilot profile displays no phone/email/address at all
- **Category:** E (context — contact difficulty)
- **Source/platform:** Trustpilot
- **URL:** https://uk.trustpilot.com/review/helloprima.co.uk
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** direct URL
- **Date/time accessed:** 2026-07-02 01:29 UTC
- **Exact data (embedded profile JSON, verbatim):** displayName: "Prima"; claimed: true; category "Car and Motor Insurance Agency"; contactInfo: email "", address "", city "", phone "", country "GB". 5,796 total reviews, TrustScore 4.3.
- **Screenshot:** 2026-07-02_trustpilot_helloprima_main_page1.png
- **HTML archive:** 2026-07-02_trustpilot_helloprima_main_page1.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Hello Prima's claimed Trustpilot profile publishes no phone number, email or address. Combined with TP-05–TP-10 (customers unable to find a number) this supports the claim that customers must search the open web for "Prima insurance" contact details — where the broker ranks prominently (see Agent 1's SERP work).

### TP-05 — Customer had to Google Prima to find contact/phone details after the aggregator journey
- **Category:** E (supports priority #5 mechanism)
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/672a07c45942a5011c8a3479
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk" (search results page)
- **Search query used:** on-site review search ?search=contact
- **Date/time accessed:** 2026-07-02 01:32 UTC
- **Exact quote (verbatim, 4 stars, Peter frederick cooper (GB), published 2024-11-05):**
  > "Well once i got through to you....all went well,  working with the \"confussed.com\" site very poor....found your site there, but not how to take up insurance..ie ...phone contact etc...googled you..then went OK"
- **Screenshot:** 2026-07-02_trustpilot_review-cooper-googled-you_672a07c45942a5011c8a3479.png
- **HTML archive:** 2026-07-02_trustpilot_review-cooper-googled-you_672a07c45942a5011c8a3479.html
- **Relevance:** High
- **Direct or indirect:** Indirect (proves the search-elsewhere behaviour, not a misdial)
- **Notes:** First-person confirmation that a Prima customer, unable to find "phone contact etc", resorted to Googling "Prima". This is the exact journey in which the broker's prominent SERP presence for "prima insurance" contact queries can capture Hello Prima customers. This does not prove the customer reached the wrong Prima — in this case they got through. A second Googling instance: reviewer Vannin (2 stars, published 2024-10-09, review id 67068a8f4b6ffe2d0e9d1213, verbatim excerpt): "I had an unentertaining chat with the 'bot' that couldn't understand the problem… I have since Googled and found the Prima link - use 'Prima Policy Document' in your search" — a customer driven to Google mid-policy because Prima's own channels failed (archived in 2026-07-02_trustpilot_helloprima_stars2_page3.html, with matching screenshot .png).

### TP-06 — "at first I couldn't find a number to actually speak to a person"
- **Category:** E
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/69970ab2f4084cf0d7008e04
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** corpus scan of 1–2 star pagination (stars filter)
- **Date/time accessed:** 2026-07-02 01:33 UTC
- **Exact quote (verbatim, 5 stars, Jax (GB), published 2026-02-19):**
  > "Was really concerned about having to contact Prima as at first I couldn’t find a number to actually speak to a person, after a few moments of chatting to a bot they gave me a number . The person I spoke to was very friendly and understanding, she fully understood my situation and dealt with it immediately, can’t praise her service highly enough…"
- **Screenshot:** 2026-07-02_trustpilot_review-jax-couldnt-find-number_69970ab2f4084cf0d7008e04.png
- **HTML archive:** 2026-07-02_trustpilot_review-jax-couldnt-find-number_69970ab2f4084cf0d7008e04.html
- **Relevance:** High
- **Direct or indirect:** Indirect
- **Notes:** Even a satisfied customer records that Prima's phone number is not findable up front and is only released via chatbot. Customers less patient with the bot are the population at risk of dialling whatever "Prima Insurance" number a search engine shows them.

### TP-07 — "There's no phone number to call which is worrying" (Prima's reply reveals its real number)
- **Category:** E
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/6a1f34a896343c6fc6fba9c3
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=contact; also stars=1 pagination
- **Date/time accessed:** 2026-07-02 01:32 UTC
- **Exact quote (verbatim, 1 star, Petesgirl (GB), published 2026-06-02):**
  > "This is a review about the Live Chat function. I made contact to make a change to my policy but the advisor just abandoned the chat! There's no phone number to call which is worrying"
- **Prima's official reply (verbatim excerpt, 2026-06-05):** "…could you please email your full name and policy number to help@helloprima.co.uk…? Alternatively, you can give us a call on 020 3318 9745 and we'll be happy to help. All the best, Funmi"
- **Screenshot:** 2026-07-02_trustpilot_review-petesgirl-no-phone-number_6a1f34a896343c6fc6fba9c3.png
- **HTML archive:** 2026-07-02_trustpilot_review-petesgirl-no-phone-number_6a1f34a896343c6fc6fba9c3.html
- **Relevance:** High
- **Direct or indirect:** Indirect
- **Notes:** Customer believes Prima has no phone number. Prima's reply documents its genuine contact details (020 3318 9745, help@helloprima.co.uk) — establishing the baseline that the broker's 0330/0161 numbers are NOT Hello Prima's, and that customers are not reliably aware of the real number.

### TP-08 — "can't find a phone number to deal with a human"
- **Category:** E
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/683156998207742cb2b579b4
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=phone
- **Date/time accessed:** 2026-07-02 01:32 UTC
- **Exact quote (verbatim, 1 star, Ethan.m (GB), published 2025-05-24):**
  > "No idea  how good as haven't had to deal with yet however  just realising I can't find a phone number  to deal with a human so wondering  if this been a poor choice   ,and as you asked for a review  before I can make an honest opinion  ."
- **Screenshot:** 2026-07-02_trustpilot_review-ethanm-cant-find-phone-number_683156998207742cb2b579b4.png
- **HTML archive:** 2026-07-02_trustpilot_review-ethanm-cant-find-phone-number_683156998207742cb2b579b4.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Repeat instance of the not-findable-number theme (category E).

### TP-09 — "if i wanted to contact them ,no phone number , but email or a chat bot"
- **Category:** E / H
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/655673a1409ef70c6cbd00a8
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=cancel
- **Date/time accessed:** 2026-07-02 01:32 UTC
- **Exact quote (verbatim excerpt, 1 star, john (GB), published 2023-11-16, title "Had  to cancel"):**
  > "so today after 46 days of car insurance i have had to cancel my car insurance after receiving an email wanting a picture of my license , my v5 for the car , a utility bill with my name and address + my personal  bank statement with the payment shown from my card purchase and if i didnt supply them i would have my insurance cancelled .if i wanted to contact them ,no phone number , but email or a chat bot. in forty years of being insured ive never come across this ."
- **Screenshot:** 2026-07-02_trustpilot_review-john-no-phone-number_655673a1409ef70c6cbd00a8.png
- **HTML archive:** 2026-07-02_trustpilot_review-john-no-phone-number_655673a1409ef70c6cbd00a8.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** 2023 instance — shows the "no phone number" perception long predates 2026. Also evidences document-demand/cancellation pattern relevant to TP-01's fact pattern.

### TP-10 — "Do you have a telephone contact number?" (customer trying to stop payment)
- **Category:** E / H
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/63723727252cba2c02d82618
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=contact
- **Date/time accessed:** 2026-07-02 01:32 UTC
- **Exact quote (verbatim, 1 star, Colin reilly (GB), published 2022-11-14, title "Unable to contact you"):**
  > "I have tried to contact you to stop my payment and refund it to me but so far I haven't been able to do this Do you have a telephone contact number?"
- **Screenshot:** 2026-07-02_trustpilot_review-reilly-telephone-contact-number_63723727252cba2c02d82618.png
- **HTML archive:** 2026-07-02_trustpilot_review-reilly-telephone-contact-number_63723727252cba2c02d82618.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** A customer with a payment issue publicly asking whether Prima even has a phone number (2022). Payment-related contact failure is the highest-risk scenario for misdirected calls/payments.

### TP-11 — Customer emailed "a @prima email address" and was told it was the wrong address
- **Category:** E (B-adjacent, but within Hello Prima's own domains — ambiguous)
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/678fd705ea5abe64c101a732
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=wrong
- **Date/time accessed:** 2026-07-02 01:31 UTC
- **Exact quote (verbatim, 2 stars, steve (GB), published 2025-01-21):**
  > "Not the greatest at communications. Send them an email to a @prima email address. They  replied saying it was the wrong address and we needed to send the same email to another @prima email address.\nWould or really have been that difficult to just forward it yourself, to a different department in the same company. This will now result in an unnecessary delay."
- **Screenshot:** 2026-07-02_trustpilot_review-steve-wrong-email-address_678fd705ea5abe64c101a732.png
- **HTML archive:** 2026-07-02_trustpilot_review-steve-wrong-email-address_678fd705ea5abe64c101a732.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect / weak-ambiguous
- **Notes:** The reviewer does not name the domain, so this cannot be read as emailing the broker; most plausibly two Hello Prima departments. Preserved because it is the closest Trustpilot gets to wrong-email evidence, and it shows "@prima" email ambiguity confusing a customer.

### TP-12 — Phone menu misrouting: "kept getting to wrong area"
- **Category:** E / H
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/6a395fa0e51d52aa99a0db58
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=wrong
- **Date/time accessed:** 2026-07-02 01:31 UTC
- **Exact quote (verbatim, 2 stars, Sue Stannard (GB), published 2026-06-22, title "Nightmare…"):**
  > "Going through chat absolute nightmare then  the change I needed I couldn't explain to a bot ... Then trying to get through by phone , kept getting to wrong area and then ages to answer \nOnly when I spoke to an actual human being was there a result but obviously only paying for the privilege of changing to a temporary address only to be charged again no doubt when I move to my permanent residence 😔"
- **Screenshot:** 2026-07-02_trustpilot_review-stannard-wrong-area_6a395fa0e51d52aa99a0db58.png
- **HTML archive:** 2026-07-02_trustpilot_review-stannard-wrong-area_6a395fa0e51d52aa99a0db58.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Contact difficulty + address-change charge (same complaint pair as the TP-01 review on the broker's page, 12 days earlier).

### TP-13 — Change-car (MTA) impossible to do with a human; auto-renewal hard to switch off
- **Category:** H
- **Source/platform:** Trustpilot review of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/69ca335a1386f35d24d8baa7
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=wrong (also surfaced by ?search=whatsapp)
- **Date/time accessed:** 2026-07-02 01:31 UTC
- **Exact quote (verbatim, 1 star, Mr Brian Griffiths (GB), published 2026-03-30):**
  > "I purchased insurance from Prima, i didn't claim from them. When it came time to change my car, mid insurance term, i could not talk to a human. The AI assistant repeatedly got what i was telling them wrong. The Whatsapp chat was equally useless. I decided to buy insurance from another comapany, to turn off the autorenewall, was almost impossible, lots of barriers and lack of support from customer services."
- **Screenshot:** 2026-07-02_trustpilot_review-griffiths-change-car-no-human_69ca335a1386f35d24d8baa7.png
- **HTML archive:** 2026-07-02_trustpilot_review-griffiths-change-car-no-human_69ca335a1386f35d24d8baa7.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Representative of a large cluster of MTA/change-car complaints (search "cancel" = 115 hits, "claim" = 205, "phone" = 198, "contact" = 148, "email" = 274, "number" = 100 in Hello Prima's English reviews). Category H — no cross-Prima confusion asserted.

### TP-14 — Cancellation/refund chaos; wrong bank account; £25 phone charge; no customer portal
- **Category:** H (plus E)
- **Source/platform:** Trustpilot reviews of helloprima.co.uk (two reviews grouped for context)
- **URL:** https://uk.trustpilot.com/reviews/699b5fce46188368bad68a8e and https://uk.trustpilot.com/reviews/67447d3299b5480305aaf6e7
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** ?search=cancel / ?search=wrong
- **Date/time accessed:** 2026-07-02 01:31–01:32 UTC
- **Exact quotes (verbatim):**
  - OP (GB), 1 star, published 2026-02-22: "…After I paid this people they have put wrong information in my policy so I went back to check and my Money supermarket is correct but their policy then send me they have charged me for two cars.\n\nAfter wasting 1 hour I found that they don’t even have a Log In portal for the customer.\nSo the only way to deal with them is by phone and they will charge you £25.\n\nSo now I want to cancel my policy 1 hour after I have bought it and I can’t!!!!…"
  - Tasha Clark (GB), 1 star, published 2024-11-25: "…1st it was 25 working days, I chased up after 5/6 weeks and they said they'd sent it but to the wrong account which I explicitly told them had been closed and provided them with the up to date details… Constantly chasing and they just keep apologising and making excuses. Joke of a company!"
- **Screenshot:** within 2026-07-02_trustpilot_helloprima_search-cancel_page1.png and 2026-07-02_trustpilot_helloprima_search-wrong_page1.png
- **HTML archive:** 2026-07-02_trustpilot_helloprima_search-cancel_page1.html; 2026-07-02_trustpilot_helloprima_search-wrong_page1.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Category H evidence of cancellation/refund difficulty; the "wrong account"/"wrong information" language is internal to Hello Prima, NOT cross-Prima confusion — recorded without overstatement.

### TP-15 — Claims routed to third party "Broker Direct Plc"; customers attack "Prima Insurance and Broker Direct"
- **Category:** F (claims-routing; also naming/context — customers write "Prima Insurance")
- **Source/platform:** Trustpilot reviews of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/6830628014d1b97060b331dc and https://uk.trustpilot.com/reviews/67e6e45d0600300059db0521
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=broker
- **Date/time accessed:** 2026-07-02 01:31 UTC
- **Exact quotes (verbatim excerpts):**
  - WAQAR ASHRAF (GB), 1 star, published 2025-05-25: "Avoid Prima Insurance and Broker Direct Plc (the company they instructed for claim handling) at ALL COSTS. I was involved in a non-fault accident with one of their policyholders… Now, they won’t even let me speak with my claims handler… Final advice: NEVER, EVER deal with Prima Insurance and Broker Direct Plc (the company they instructed for claim handling) directly."
  - Doug Rosario (GB), 1 star, published 2025-03-28: "I spent two days on the phone trying to get some help from, apparently an insurance company. First of all they sub the work to a third party, Broker Direct, says it all! So speaking to people who care is impossible."
- **Screenshot:** 2026-07-02_trustpilot_helloprima_search-broker_page1.png
- **HTML archive:** 2026-07-02_trustpilot_helloprima_search-broker_page1.html
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Claims are outsourced (Broker Direct Plc), producing multi-party routing that customers already find opaque; claimants publicly brand the insurer "Prima Insurance". This supports (does not prove) the risk that claim-related callers searching "Prima insurance claims" reach the Manchester broker. Note: third-party claimant, and the word "broker" here refers to Broker Direct Plc — not Prima Insurance Brokers.

### TP-16 — Customers confused about WHAT Prima is (broker? insurer? Gibraltar underwriter?)
- **Category:** D-adjacent context (identity confusion, not two-Prima confusion) / L
- **Source/platform:** Trustpilot reviews of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/reviews/69429b5d90ecc85d719abf64 and https://uk.trustpilot.com/reviews/696679923cce3f0218f91985
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** on-site review search ?search=broker
- **Date/time accessed:** 2026-07-02 01:31 UTC
- **Exact quotes (verbatim):**
  - qwerty qwerty (GB), 1 star, published 2025-12-17, title "watch out": "watch out, this company is a broker for Alwyn insurance based in Gibraltar and there have been a few issues with them. I was not happy when I bought a policy and only then did they disclose this so I cancelled."
  - Alena (GB), 1 star, published 2026-01-13, title "Worst company ": "This company works with a broker no online account to access policy.  Email to say Insurance was cancelled at 23.53 so had to find another provider.  Then to be told that in policy was not cancelled.  This company has caused stress never had from another company aslo need to upload list of documents."
- **Screenshot:** 2026-07-02_trustpilot_helloprima_search-broker_page1.png
- **HTML archive:** 2026-07-02_trustpilot_helloprima_search-broker_page1.html
- **Relevance:** Low–Medium
- **Direct or indirect:** Indirect
- **Notes:** Customers describe Hello Prima itself as "a broker". This blurring of "Prima"/"broker" in public reviews is background context for why "Prima Insurance Brokers" is a plausible-looking match to a confused Hello Prima customer. Not evidence of actual cross-company contact.

### TP-17 — Wide can't-contact cluster (representative verbatim set)
- **Category:** E
- **Source/platform:** Trustpilot reviews of helloprima.co.uk
- **URL:** https://uk.trustpilot.com/review/helloprima.co.uk?stars=1 (pages 1–10) and permalinks below
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** stars=1 / stars=2 pagination + ?search=contact/phone/number
- **Date/time accessed:** 2026-07-02 01:36–01:44 UTC
- **Exact quotes (verbatim excerpts, all GB):**
  - Alvin David, 1 star, 2026-06-02: "What an awful insurer. You cannot get through to them over the telephone. You cannot upload documents through their link, in my case NCB. Then I receive an email saying my policy is cancelled."
  - Stephen Maloney, 1 star, 2026-06-08: "Its mission Impossible to get hold of them to make any changes or speak to someone!  If you like speaking to chat bots and not humans then this is the company for you."
  - Mike James, 1 star, 2026-04-14: "So I contacted the prima, which has taken over an hour and only by text on a phone as it's impossible to speak to someone."
  - Idne Jones, 1 star, 2026-03-11: "I Can't get through to customer services. This company insured my car several months ago."
  - Christopher, 1 star, 2025-08-29: "an insurance company you can't contact over the weekend to arrange change of cover is hopeless"
  - Amy Casey, 1 star, 2024-03-26: "They had the wrong number for me so txt messages would've bounced, no one bothered to call" (note: Prima holding a wrong number FOR the customer — not a wrong Prima number)
- **Screenshot:** 2026-07-02_trustpilot_helloprima_stars1_page1.png … stars1_page10.png; stars2_page1–4; stars12_page1–10
- **HTML archive:** matching .html files for each page listed above
- **Relevance:** Medium (volume evidence)
- **Direct or indirect:** Indirect
- **Notes:** Establishes scale and persistence (2022–2026) of contact difficulty. None of these allege contacting the wrong company — categorised E, not D.

### TP-18 — Trustpilot search for "prima" (control query)
- **Category:** I (context)
- **Source/platform:** Trustpilot company search
- **URL:** https://uk.trustpilot.com/search?query=prima
- **Page title:** "Trustpilot Search Results"
- **Search query used:** on-site company search "prima"
- **Date/time accessed:** 2026-07-02 01:40 UTC
- **Exact result order (verbatim):** 1) Prima — helloprima.co.uk; 2) Prima Assicurazioni — prima.it; 3) Prima Seguros — helloprima.es; 4) PRIMA Leisure; 5) 3D Prima; then Primark etc. (broker's page not in top 10 for this query).
- **Screenshot:** 2026-07-02_trustpilot_search-prima_results.png
- **HTML archive:** 2026-07-02_trustpilot_search-prima_results.html
- **Relevance:** Low
- **Direct or indirect:** Indirect
- **Notes:** Control: for the bare term "prima" Hello Prima ranks first. The inversion happens precisely when the customer adds the word "insurance" (TP-03) — the form of the name customers actually use (TP-19).

### TP-19 — Customers call the insurer "Prima" / "Prima insurance", almost never "Hello Prima"
- **Category:** I (naming-ambiguity context)
- **Source/platform:** Trustpilot corpus analysis (950 unique reviews extracted this session)
- **URL:** https://uk.trustpilot.com/review/helloprima.co.uk (all captured pages)
- **Page title:** "Prima Reviews | Read Customer Service Reviews of helloprima.co.uk"
- **Search query used:** machine scan of all extracted review texts
- **Date/time accessed:** 2026-07-02 01:44 UTC
- **Exact figures:** Of 950 unique reviews: "prima insurance" appears in 17; "prima car insurance" in 9; "hello prima"/"helloprima" in **1**. Trustpilot displays the business simply as "Prima".
- **Screenshot:** n/a (aggregate analysis; underlying pages all archived)
- **HTML archive:** all 2026-07-02_trustpilot_helloprima_*.html files
- **Relevance:** Medium
- **Direct or indirect:** Indirect
- **Notes:** Supports the search-journey theory: a customer who cannot contact "Prima insurance" will search that exact phrase — which is the broker's actual trading name and domain (primainsurance.co.uk). This does not prove confusion occurred; it explains why it plausibly would.

### TP-20 — Negative result: no broker phone number, email, address, or "wrong/different Prima" statement anywhere in the Trustpilot corpus
- **Category:** A/B/C/D — no evidence found (explicit negative finding)
- **Source/platform:** Trustpilot (helloprima.co.uk + primainsurance.co.uk pages)
- **URL:** all pages listed in this report
- **Page title:** various (archived)
- **Search query used:** machine grep of 950 unique extracted reviews + business replies for: 0330 088 1135 / 03300881135 / 0161 826 1620 / 01618261620 / "Prestwich" / "Bury New Road" / "Prima Insurance Brokers" / "Prima Financial" / "wrong Prima" / "different Prima" / "another Prima" / "not the same Prima" / "wrong company" / "rang|called|phoned the wrong"; plus Trustpilot on-site searches (?search=wrong ×2 pages, ?search=different ×3 pages) and Google web searches (site:trustpilot.com … "wrong number" / "wrong Prima" / "different Prima" / broker numbers).
- **Date/time accessed:** 2026-07-02 01:29–01:50 UTC
- **Exact quote/snippet:** zero matches for all patterns above.
- **Screenshot:** n/a (negative result across archived pages)
- **HTML archive:** all archived Trustpilot HTML files this session
- **Relevance:** High (honesty/credibility)
- **Direct or indirect:** n/a
- **Notes:** No public Trustpilot evidence was found that the broker's numbers/details are being circulated to Hello Prima customers, or that any reviewer says they contacted "the wrong Prima". The Trustpilot evidence supports the *mechanism* of confusion (TP-01, TP-03, TP-05–TP-10, TP-19) but not completed misdirected contact. Stated plainly per the brief.

## Sources checked with no relevant results
- Trustpilot on-site searches with zero cross-Prima hits: ?search=wrong (30 results, 2 pages — all internal-Prima "wrong" usages), ?search=different (43 results, 3 pages — "different car/company/story", no "different Prima"), ?search=whatsapp (40, 2 pages), ?search=complaint (29, 2 pages), ?search=broker (9 — Broker Direct/Alwyn/self-description only).
- Larger searches fully paginated and scanned with no cross-Prima hits: ?search=phone (198), ?search=contact (148), ?search=number (100), ?search=email (274), ?search=claim (205), ?search=cancel (115).
- WebSearch: site:trustpilot.com helloprima.co.uk "wrong number"; site:trustpilot.com helloprima "wrong Prima" OR "different Prima" OR "wrong company"; site:trustpilot.com "primainsurance.co.uk"; site:trustpilot.com helloprima.co.uk "can't get through" OR "cannot get through" OR "no contact number"; trustpilot "prima insurance" review "0330 088 1135" OR "0161 826 1620" — none returned any snippet tying broker contact details to Hello Prima on Trustpilot.
- Trustpilot company search "prima" — broker page absent from top results (control, TP-18).
- No other Trustpilot page for the broker was found (no /review/www.primainsurance.co.uk variant surfaced by search).

## Access blockers
- **Trustpilot login wall beyond page 10 of any filtered review list** ("Trustpilot Login - Connect and share your reviews"). Encountered at ?stars=1&stars=2&page=11. Evidence preserved: screenshots/2026-07-02_trustpilot_helloprima_stars12_page11_login-wall.png and matching .html. Per the brief's rules, no login was created. Consequence: of 456 English 1-star reviews, the oldest ~256 could not be enumerated by star filter; keyword search (11 terms, all pages) was used to reach older reviews instead (e.g. TP-09 from 2023, TP-10 from 2022 were recovered this way). Reviews in other languages (272 of 5,796) were not systematically reviewed.
- Trustpilot on-site review search does not support multi-word phrases reliably; single-word terms were used per the brief.
- The reviewer identity behind TP-01 ("customer") cannot be established from public data; confirmation that it concerns Hello Prima would require the reviewer's own evidence.

## Capture inventory (this agent)
- 98 screenshots matching 2026-07-02_trustpilot_* in prima_helloprima_evidence_pack/screenshots/ (both companies' main pages, 1–2 star combined pages 1–10, stars=1 pages 1–10, stars=2 pages 1–4, 11 keyword searches paginated to every public page — wrong ×2, different ×3, broker ×1, phone ×10, contact ×8, number ×5, email ×10, claim ×10, cancel ×6, complaint ×2, whatsapp ×2 — 2 company-search results pages, 10 review permalinks, 1 login-wall proof).
- 98 matching HTML files in prima_helloprima_evidence_pack/source_archive/.
- 950 unique reviews (with business replies) machine-extracted from the archived HTML and scanned; rating mix of the sample: 334×1★, 73×2★, 55×3★, 80×4★, 408×5★.
