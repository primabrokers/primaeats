# Agent 3 — Reddit / Forums (workstream terminated early; partial report)

**Status note (recorded honestly):** this workstream's research agent was stopped by
the operator before completing its sweep (last activity: querying the
MoneySavingExpert forum API). This report was compiled by the coordinating agent
solely from the raw captures the workstream preserved before termination — two
Wayback-archived Reddit threads (screenshots + HTML), one SERP capture, one
Reddit-block capture, and five Reddit API (pullpush.io) JSON dumps in
`source_archive/`. Quotes below are verbatim from those preserved dumps.
**Not swept:** MoneySavingExpert forum, PistonHeads, Mumsnet, Consumer Action Group,
LegalBeagles, AVForums, and the majority of the brief's Agent-3 query list. Findings
here are therefore a floor, not a ceiling, for forum evidence.

## Summary

- The preserved Reddit material contains **no wrong-number, wrong-email or
  "wrong/different Prima" posts**, and neither broker number appears in any dump
  (negative, on partial coverage only).
- It does contain **direct first-person claims-routing confusion (Category F)**: a
  motorist who "called Prima and pressed 3" to register a non-fault accident and
  "didn't realise" they had been put through to a third-party claims-management
  company ("BD Elite") — corroborating the Trustpilot Broker Direct/BD Elite theme
  (TP-15/TP-16) from an independent platform.
- Reddit's native search was bot-blocked (captured); thread content was preserved via
  Wayback and the pullpush.io API instead.

## Findings

### RED-01 — "I called Prima and pressed 3… I had been put through to a third party claims management company"
- Category: F (claims-routing confusion) — direct, first-person
- Source/platform: Reddit r/CarTalkUK (cross-posted r/CarInsuranceUK)
- URL: https://www.reddit.com/r/CarTalkUK/comments/1kbsxb2/prima_insurance/ (cross-post: /r/CarInsuranceUK/comments/1kbkbsr/)
- Page title: "Prima insurance"
- Search query used: pullpush.io API, submissions matching "prima insurance"
- Date of post: 30 Apr 2025 (epoch 1746051067); accessed 2026-07-02 ~09:12 UTC
- Exact quote (verbatim): "Hi everyone I wanted to share my experience of a non fault claim with Prima. I had a lorry roll backwards into me at some traffic lights. I have front and back dash and so have more than enough evidence. I called Prima and pressed 3 to register a non fault accident. I didn't realise but I had been put through to a third party claims management company called BD Elite. This is where…" (dump truncates at API snippet boundary)
- Screenshot: n/a (API capture; JSON preserved)
- HTML archive: 2026-07-02_reddit_pullpush_submissions_prima-insurance.json
- Relevance: High
- Direct or indirect: Direct (first-person)
- Notes: Direct evidence that Prima's own phone tree routes claimants to a third party
  without the caller realising — claims-routing confusion inside the insurer's own
  contact journey. Does not involve the broker.

### RED-02 — "Prima have literally washed their hands of it"
- Category: F
- Source/platform: Reddit r/CarTalkUK (comment in thread 1kbsxb2)
- URL: https://www.reddit.com/r/CarTalkUK/comments/1kbsxb2/prima_insurance/mpxu292/
- Date of post: 1 May 2025 (epoch 1746060258); accessed 2026-07-02 ~09:13 UTC
- Search query used: pullpush.io API, comments for thread 1kbsxb2
- Exact quote (verbatim): "Prima have literally washed their hands of it so I will need to contact the lorry drivers insurance directly."
- HTML archive: 2026-07-02_reddit_pullpush_comments_1kbsxb2.json
- Relevance: Medium · Direct (first-person)
- Notes: claimant driven outside the insurer's own routes to progress a claim.

### RED-03 — "They tried to push me towards a 3rd party claims management company called BD Elite"
- Category: F (with L overtones)
- Source/platform: Reddit r/CarTalkUK (comment in "Best car insurance in the UK" thread)
- URL: https://www.reddit.com/r/CarTalkUK/comments/1hslnei/best_car_insurance_in_the_uk_need_advice/mp5g08h/
- Date of post: 26 Apr 2025 (epoch 1745677680); accessed 2026-07-02 ~09:14 UTC
- Search query used: pullpush.io API, comments matching "prima"
- Exact quote (verbatim): "Stay away from Prima They have good reviews but I have just had a no fault accident with dashcam footage and they are being a nightmare. They tried to push me towards a 3rd party claims management company called BD Elite (they probably own this company) who were pressuring me to sign a credit agreement which was a huge red flag. Now they want me to claim via my own insurance and pay the excess…"
- HTML archive: 2026-07-02_reddit_pullpush_comments_misc-prima.json
- Relevance: Medium · Direct (first-person)
- Notes: second independent account of the BD Elite routing; note the poster's guess
  "(they probably own this company)" is speculation and is not treated as fact.

### RED-04 — Early-days context: "everything is by phone" (2022)
- Category: L/context (not confusion)
- Source/platform: Reddit r/CarTalkUK
- URL: https://www.reddit.com/r/CarTalkUK/comments/yozulw/has_anyone_had_any_experience_with_prima_car/ivgx9uu/
- Date of post: 7 Nov 2022 (epoch 1667858208); accessed 2026-07-02 ~09:14 UTC
- Exact quote (verbatim): "Only frustration is they don't have an app or web portal yet so everything is by phone (though that isn't necessarily a bad thing, more convenience)."
- Screenshot: 2026-07-02_reddit_cartalkuk_yozulw_prima-experience_wayback.png (thread capture); HTML in source_archive
- Relevance: Low · Indirect
- Notes: historical contrast — in 2022 Prima's UK service was phone-led; by 2024 the
  published number was removed (WB-05). Context for the contact-difficulty timeline.

### RED-05 — Negative result and access blockers
- Category: negative / access record
- No occurrence of 0330 088 1135 / 0161 826 1620, the broker's email/domain, or
  "wrong Prima"/"different Prima" language in any preserved dump (5 JSON files, 21
  items, machine-checked).
- Reddit native search bot-blocked: 2026-07-02_reddit_search_prima-insurance_blocked.png/.html;
  DDG site:reddit.com SERP captured: 2026-07-02_ddg_site-reddit-prima-insurance_serp.png/.html;
  two thread captures via Wayback (r/CarTalkUK 15z7hs7, yozulw).
- **Not checked before termination:** MoneySavingExpert forum (API query in progress
  when stopped), PistonHeads, Mumsnet, Consumer Action Group, LegalBeagles, AVForums,
  and most site:reddit.com query permutations from the brief. No conclusions should be
  drawn about those sources.
