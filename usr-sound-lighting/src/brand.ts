/**
 * Everything that identifies the business lives here, so the site can be
 * re-branded without touching page code.
 *
 * Colours live in src/styles/tokens.css (the 3D scenes read them from there).
 * To use the real logo, drop the file into public/brand/ and point logo.src at it.
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
    src: "/brand/usr-logo.svg",
    mark: "/brand/usr-mark.svg",
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
