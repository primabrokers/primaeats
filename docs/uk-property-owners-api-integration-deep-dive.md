# UK Property Owners Insurance — API / E-Trade Integration Deep Dive

**Date:** 2026-06-23
**Focus:** Property Owners insurance (residential & commercial landlords, property investors, portfolios, blocks of flats, HMOs). Who offers API / e-trade integration, how brokers and partners connect, and what each route covers.

> Companion to `uk-insurer-mga-api-integration-research.md` (broad market). This document narrows to the property owners line.

---

## 1. How property owners insurance is actually traded via API in the UK

Property owners (PO) is a **commercial e-trade line**, so "API integration" almost always means one of three routes — direct carrier-to-broker APIs are the exception, not the norm:

1. **Software-house e-trade (the dominant route).** The broker integrates once with **Acturis / Open GI / SSP / Applied / CDL**; the carrier or MGA maintains the PO product (rating, rules, documents) on that platform. The broker quotes and binds inside their own back-office system. This is how most PO premium flows.
2. **Carrier/MGA "extranet + API/deep-link" route.** The insurer exposes its rating engine via an API or deep-link so the broker can quote without re-keying (e.g. ERS PIERS model, increasingly offered for commercial lines). Access is via appointment + scoped credentials.
3. **Embedded / platform API route.** An insurtech platform fronts one or more PO carriers/MGAs behind a single quote-and-buy API for a non-broker partner (e.g. a mortgage adviser, lettings platform, or PropTech app) — e.g. Uinsure, Stubben Edge, Quotall/SANDIS-built MGA APIs.

Standards underpinning this: the **Acturis product schema** in practice, and **ACORD** P&C JSON/XML messages plus **Lloyd's Blueprint Two** for delegated/coverholder placing and accounting.

---

## 2. Carriers offering Property Owners via e-trade / API

| Carrier | PO product | Scope | Integration route |
|---|---|---|---|
| **Aviva** | Property Owners (Aviva Broker) | Up to ~20 commercial/residential let properties on one policy; property damage, PO liability, money, landlord contents | Acturis & other software houses; Aviva Developer Portal (quotes/claims APIs); claims API integrated with Acturis (2025) |
| **Allianz** | **Complete Property Owner** (up to 20 premises); **Property Owners Select** & **Real Estate Select** (medium–large portfolios, residential + commercial) | SME through to large real-estate portfolios | Software-house e-trade (Acturis etc.); referral underwriting for larger risks |
| **NIG / Intact** | **Property Owners eProduct** | Residential & commercial, single & multi-location portfolios up to ~25 premises | Full-cycle eTrade via software houses; migrating to Intact Insurance platform |
| **ERS** | Specialist property/commercial alongside motor | Specialist/non-standard | **PIERS** API deep-link + Acturis/Applied/Open GI/CDL/SSP |
| **Arch, AXA** | PO products surfaced through e-trade panels | SME PO | Software-house e-trade |
| **Markel UK** | Commercial Combined / niche (PO-adjacent); PO not the headline e-trade line | Niche commercial | Markel UK Online + Acturis (PI/cyber/LEI); Broker Connect for volume |

> Note: NIG, Allianz and Aviva pages confirm the products and premise limits but **do not publish open developer-portal endpoints for PO** — access is via the software-house rails and broker appointment, not a public REST API.

---

## 3. MGAs writing Property Owners with API / e-trade distribution

The MGA channel is where most **specialist and non-standard** PO risk sits, and these MGAs distribute primarily through Acturis and broker e-trade:

| MGA | PO proposition | Integration |
|---|---|---|
| **Pen Underwriting** | Residential & commercial property owners / residential landlords (one of UK's largest MGAs, >£900m GWP); "Property Owners on Acturis" product | Acturis e-trade quote-and-bind |
| **Arkel Underwriting** | Household, **landlord** and SME — incl. "premier let" landlord product | Acturis (e.g. distributed across Swinton's landlord panel) |
| **Geo Underwriting** (Ardonagh) | Chartered MGA with property/real-estate specialisms | Software-house e-trade + delegated facilities |
| **Bspoke Underwriting** (now NFP/Aon) | Multi-class incl. **property** and HNW | E-trade + broker facilities |
| **Towergate / Everywhen** | Commercial property owners proposition | Broker + e-trade |
| Various Lloyd's **coverholder MGAs** | PO under delegated authority | Increasingly expose a **quote-and-bind REST API** to distribution partners; Blueprint Two for placing/accounting |

Directory to mine further: the **MGAA membership directory** lists UK MGAs and their classes (many write PO/real estate).

---

## 4. Insurtech / platform routes for Property Owners

For **non-broker partners** (mortgage advisers, lettings/PropTech, portfolio landlords) the API route is via platforms:

- **Uinsure** — digital platform for mortgage brokers/advisers; **landlord insurance quotes in <60 seconds**, covering single BTL through large portfolios, HMOs, blocks of flats, commercial-residential mix, overseas and non-standard BTL. Integrated into adviser/sourcing systems (partner integrations rather than a fully public API).
- **Stubben Edge** — marketplace giving instant access to financial/insurance products; quote and bind in minutes; API-driven product build and distribution (suitable for embedding PO/landlord).
- **Konsileo** — tech-led broker covering commercial property owners, residential property owners, landlords and landowners.
- **Quotall / Embri, SANDIS, INSTANDA, Go-Insur, Insillion** — the build platforms an MGA uses to **stand up a PO quote-and-bind REST API** (quote, bind, issue, MTA, renewal, cancellation, documents, payments) for embedded/white-label distribution.
- **FloodFlash** — parametric flood cover for property owners/businesses (sensor-triggered payouts); relevant where flood is the blocker on standard PO.
- **bolttech / Qover / Bindable** — embedded aggregators able to carry home/landlord-adjacent products via a single quote-bind-pay API.

---

## 5. What "integration" gets you, by capability

| Capability | Available via | Notes |
|---|---|---|
| **Quote** | All software-house e-trade; carrier deep-link APIs; MGA/insurtech REST APIs | PO rating with portfolio/premise schedules; referral for >20–25 premises or non-standard |
| **Bind / issue** | Acturis et al.; MGA platforms (SANDIS, Quotall, INSTANDA) | Instant for in-appetite risks; referral otherwise |
| **MTA / renewal / cancellation** | Carrier APIs (ERS PIERS), MGA platforms | Full-lifecycle on most platforms |
| **Documents** | Software houses + MGA engines | Schedule, wording, certificates auto-generated |
| **Claims** | Aviva claims API (via Acturis); ICE-Tech-style platforms | Carrier claims APIs still rare for PO specifically |
| **Payments** | MGA/embedded platforms (SANDIS, Quotall) | Gateway integration for instant pay |

---

## 6. Practical guidance for a PO-focused integration

- **If you're a broker:** the fastest route is your software house (Acturis is the broadest PO panel). Enable the carrier/MGA PO products you have agencies with; use carrier deep-link APIs (ERS-style) where offered to cut re-keying.
- **If you're an MGA/coverholder:** stand up a quote-and-bind REST API on a build platform (SANDIS / Quotall / INSTANDA / Go-Insur), and also list the product on Acturis to reach the broker channel. Align to ACORD + Blueprint Two for delegated reporting.
- **If you're an embedded/PropTech partner:** integrate to an aggregator (Uinsure/Stubben Edge for landlord; bolttech/Qover for broader embedding) rather than carrier-by-carrier.
- **Confirm appetite limits:** standard e-trade PO typically caps around **20–25 premises**; larger real-estate portfolios (Allianz Real Estate Select / Property Owners Select) go to referral/manual underwriting, not straight-through API.

---

## 7. Caveats & confidence

- Most carriers (Aviva, Allianz, NIG) do **not** publish open public PO REST endpoints; PO API access is via software-house rails and broker appointment. Treat carrier "developer portals" as primarily claims/servicing for PO.
- MGA acquisitions move fast (Bspoke → NFP/Aon; Arkel via Atec on Swinton's panel) — confirm current ownership/appetite before integrating.
- Premise limits, covers and platform availability should be confirmed on each provider's current broker documentation.

---

## Sources

- [Allianz — Complete Property Owner](https://www.allianz.co.uk/broker/sme/property-owners.html) · [Property Owners Select](https://www.allianz.co.uk/broker/property-and-casualty/property-owners-select.html) · [Real Estate Select](https://www.allianz.co.uk/broker/property-and-casualty/real-estate-select.html)
- [Aviva Broker — Property Owners](https://connect.avivab2b.co.uk/broker/commercial/small-business/property-owners/) · [Aviva Developer Portal](https://developer.aviva.co.uk/)
- [NIG / Intact — Property Owners](https://nig.com/products/property-owners/)
- [ERS — Brokers, ways to trade (PIERS)](https://www.ers.com/brokers-ways-to-trade)
- [Markel UK — Broker eTrade](https://uk.markel.com/insurance/for-brokers/broker-etrade)
- [Pen Underwriting — Property Owners on Acturis](https://www.penunderwriting.co.uk/Products/Property-Owners-Acturis) · [Residential Property Owners](https://www.penunderwriting.co.uk/items/residential-property-owners) · [MGAA profile](https://mgaa.co.uk/members/pen-underwriting/)
- [Arkel Underwriting](https://arkelunderwriting.com/index.html) · [Swinton adds Arkel to landlord panel — Insurance Times](https://www.insurancetimes.co.uk/news/swinton-adds-atec-owned-mga-to-landlord-panel/1457032.article)
- [Geo Underwriting](https://www.geounderwriting.com/) · [MGAA profile](https://mgaa.co.uk/broker-services/geo-underwriting-services-limited)
- [Bspoke Underwriting (NFP/Aon acquisition)](https://aon.mediaroom.com/2025-08-07-NFP,-An-Aon-Company,-acquires-Bspoke-Insurance-Group,-Expanding-UK-Specialist-Insurance-Services)
- [Everywhen (formerly Towergate) — Commercial property owners](https://www.everywhen.co.uk/commercial-property-insurance/commercial-property-owners-insurance)
- [MGAA — Membership directory](https://mgaa.co.uk/memberships/)
- [Acturis — MGA platform](https://www.acturis.com/mga/) · [Commercial lines broking](https://www.acturis.com/commercial-lines-broking/)
- [Uinsure — Specialist landlords insurance](https://uinsure.co.uk/home/our-services/specialist-insurance/specialist-landlords-insurance/) · [Landlord insurance](https://uinsure.co.uk/home/our-services/landlord-insurance/)
- [Stubben Edge](https://www.stubbenedge.com/)
- [Konsileo — Property insurance](https://konsileo.com/property-insurance/)
- [SANDIS — Insurance API platform](https://sandis.io/platform/insurance-api)
- [Quotall — documentation](https://quotall.com/documentation/) · [Embri API docs](https://embri.co.uk/api-documentation/)
- [Apex Insurance Brokers Wiki — API-led insurance (ACORD / Blueprint Two)](https://apexinsurancebrokers.co.uk/wiki/api-led-insurance/)
- [Insurance Business — UK insurtech firms to watch (FloodFlash, Insurami)](https://www.insurancebusinessmag.com/uk/guides/insurtech-in-the-uk-key-insurance-tech-firms-brokers-need-to-watch-557348.aspx)
