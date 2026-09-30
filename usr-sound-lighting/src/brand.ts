/**
 * Everything that identifies the business lives here, so the site can be
 * re-branded without touching page code.
 *
 * Colours live in src/styles/tokens.css (the 3D scenes read them from there).
 * The logo is a vector redraw of the 200 px original (public/brand/usr-logo-original.jpg),
 * with PNG exports at 1200 and 3000 px and square icons at 64, 180 and 512 px.
 *
 * Items marked VERIFY came from public listings (Companies House, Add to Event)
 * and should be checked with the owners before launch.
 */
export const brand = {
  name: "USR Sound & Lighting",
  shortName: "USR",
  legalName: "USR Sound & Lighting Ltd",
  companyNumber: "14132502",
  registeredOffice: "68 Brooklands Road, Prestwich, Manchester, M25 0ED",
  founded: 2019,
  founders: "Uri & Shmuli Rothstein",
  base: "Prestwich, Manchester",

  logo: {
    // vector redraw of the original; PNG exports sit next to it (usr-logo-3000.png etc.)
    src: "/brand/usr-logo.svg",
    width: 1646,
    height: 1222,
    icon: "/brand/usr-icon-512.png",
    alt: "USR Sound & Lighting",
  },

  // VERIFY: public contact details. An empty phone hides it everywhere.
  email: "info@usrsoundandlighting.com",
  phone: "",
  instagram: "https://www.instagram.com/usrsoundandlighting/",
  instagramHandle: "@usrsoundandlighting",

  serviceArea: [
    "Manchester",
    "Salford",
    "Bury",
    "Bolton",
    "Stockport",
    "Trafford",
    "Oldham",
    "Rochdale",
    "Cheshire",
    "Lancashire",
    "Leeds",
    "Liverpool",
  ],
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
