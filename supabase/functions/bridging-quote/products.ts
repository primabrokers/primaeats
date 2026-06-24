// Lendaris bridging product / rate card.
//
// ⚠️ PLACEHOLDER NUMBERS — replace every value below with the real Lendaris
// rate card before using this for anything client-facing. These exist so the
// quote engine has sensible defaults to merge with per-request overrides.
//
// A product supplies DEFAULTS. Any field the GPT/caller passes explicitly in
// the request overrides the product default (see index.ts).

import type { InterestType } from "./quote-engine.ts";

export interface BridgingProduct {
  id: string;
  label: string;
  /** Headline rate, percent per month. */
  monthlyRatePct: number;
  /** Arrangement fee, percent of gross. */
  arrangementFeePct: number;
  /** Exit fee, percent of gross. */
  exitFeePct: number;
  /** Max gross LTV permitted, percent. */
  maxLTVPct: number;
  /** Default interest handling for this product. */
  defaultInterestType: InterestType;
  /** Default fixed fees, GBP. */
  valuationFee: number;
  legalFee: number;
  adminFee: number;
  titleInsurance: number;
  /** Allowed term band, whole months. */
  minTermMonths: number;
  maxTermMonths: number;
}

export const PRODUCTS: Record<string, BridgingProduct> = {
  "standard-bridge": {
    id: "standard-bridge",
    label: "Standard Bridge (1st charge, residential)",
    monthlyRatePct: 0.85,
    arrangementFeePct: 2,
    exitFeePct: 0,
    maxLTVPct: 75,
    defaultInterestType: "retained",
    valuationFee: 500,
    legalFee: 1500,
    adminFee: 295,
    titleInsurance: 0,
    minTermMonths: 1,
    maxTermMonths: 18,
  },
  "large-loan": {
    id: "large-loan",
    label: "Large Loan Bridge (£1m+, 1st charge)",
    monthlyRatePct: 0.7,
    arrangementFeePct: 1.75,
    exitFeePct: 0,
    maxLTVPct: 65,
    defaultInterestType: "retained",
    valuationFee: 1500,
    legalFee: 3500,
    adminFee: 295,
    titleInsurance: 0,
    minTermMonths: 1,
    maxTermMonths: 24,
  },
  "second-charge": {
    id: "second-charge",
    label: "Second Charge Bridge (residential)",
    monthlyRatePct: 1.1,
    arrangementFeePct: 2,
    exitFeePct: 0,
    maxLTVPct: 70,
    defaultInterestType: "retained",
    valuationFee: 500,
    legalFee: 1500,
    adminFee: 295,
    titleInsurance: 0,
    minTermMonths: 1,
    maxTermMonths: 12,
  },
};

export const DEFAULT_PRODUCT_ID = "standard-bridge";

export function getProduct(id: string | undefined): BridgingProduct {
  const product = PRODUCTS[id ?? DEFAULT_PRODUCT_ID];
  if (!product) {
    throw new Error(
      `Unknown product "${id}". Known products: ${
        Object.keys(PRODUCTS).join(", ")
      }.`,
    );
  }
  return product;
}
