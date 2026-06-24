// Lendaris bridging-loan quote engine.
//
// Pure, dependency-free TypeScript so it runs unchanged in a Supabase Edge
// Function (Deno) and in a Node/Deno test. NO I/O, NO globals — given the same
// input it always returns the same illustration.
//
// This produces an INDICATIVE illustration only: gross/net loan, LTV, fees,
// interest and total repayable for a bridging facility. It is not a credit
// decision, a binding offer, or regulated advice — see `DISCLAIMER`.

export type InterestType = "retained" | "rolled" | "serviced";

/** What the caller knows up front. */
export type QuoteMode =
  | "net" // caller knows the NET advance the borrower needs in hand
  | "gross"; // caller knows the GROSS loan (the facility amount)

export interface QuoteInput {
  /** Open-market value of the security property, GBP. */
  propertyValue: number;
  /** Which of the two amounts below is the known input. */
  mode: QuoteMode;
  /**
   * GBP. If mode === "net" this is the net advance required by the borrower;
   * if mode === "gross" this is the gross loan / facility amount.
   */
  amount: number;
  /** Bridging term in whole months. */
  termMonths: number;
  /** Headline interest rate, percent PER MONTH (e.g. 0.85 = 0.85% pcm). */
  monthlyRatePct: number;
  /** How interest is handled. Bridging norm is "retained". */
  interestType: InterestType;
  /** Arrangement (lender facility) fee, percent of the GROSS loan. */
  arrangementFeePct: number;
  /** Exit fee, percent of the GROSS loan, charged at redemption. Default 0. */
  exitFeePct?: number;
  /** Fixed GBP fees deducted from the gross loan on day one. */
  brokerFee?: number;
  valuationFee?: number;
  legalFee?: number;
  adminFee?: number;
  titleInsurance?: number;
  /** Max gross LTV permitted for this product, percent. Used only to flag. */
  maxLTVPct?: number;
  /** Optional product id, echoed back for traceability. */
  product?: string;
}

export interface QuoteResult {
  currency: "GBP";
  product: string | null;
  interestType: InterestType;
  termMonths: number;
  monthlyRatePct: number;

  propertyValue: number;
  grossLoan: number;
  netAdvance: number;

  grossLTVPct: number;
  netLTVPct: number;
  maxLTVPct: number | null;
  ltvWithinLimit: boolean | null;

  fees: {
    arrangementFee: number;
    brokerFee: number;
    valuationFee: number;
    legalFee: number;
    adminFee: number;
    titleInsurance: number;
    exitFee: number;
    /** Sum of every fee above. */
    totalFees: number;
  };

  interest: {
    type: InterestType;
    /** Interest retained from the advance on day one (retained only). */
    retainedInterest: number;
    /** Compounded interest added at redemption (rolled only). */
    rolledInterest: number;
    /** Interest the borrower pays each month (serviced only). */
    monthlyInterest: number;
    /** Total interest cost over the term, however it is paid. */
    totalInterest: number;
  };

  /** Monthly payment the borrower must service (serviced only, else 0). */
  monthlyPayment: number;
  /** Lump sum to redeem the facility at the end of term. */
  totalRepayable: number;

  warnings: string[];
  disclaimer: string;
}

export const DISCLAIMER =
  "Indicative illustration only. Figures are estimates based on the inputs " +
  "provided and the current Lendaris rate card; they are not a binding offer, " +
  "a credit decision, or regulated advice. Any facility is subject to " +
  "valuation, underwriting, and full terms. Your property may be repossessed " +
  "if you do not keep up repayments on a loan secured against it.";

export class QuoteError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "QuoteError";
  }
}

/** Round to whole pence to avoid floating-point noise in money figures. */
function money(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function pct(n: number): number {
  return Math.round((n + Number.EPSILON) * 10000) / 10000;
}

function positive(name: string, v: number): number {
  if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) {
    throw new QuoteError("invalid_input", `${name} must be a positive number.`);
  }
  return v;
}

function nonNegative(name: string, v: number | undefined): number {
  const x = v ?? 0;
  if (typeof x !== "number" || !Number.isFinite(x) || x < 0) {
    throw new QuoteError("invalid_input", `${name} must be zero or positive.`);
  }
  return x;
}

/**
 * Build a bridging illustration.
 *
 * The hard part is "grossing up": the arrangement fee, and (for retained
 * interest) the whole-term interest, are percentages of the GROSS loan, while
 * the borrower cares about the NET advance. That is circular, so we solve it
 * algebraically:
 *
 *   gross = (netNeeded + fixedDeductedFees) / (1 - arr% - dayOneInterest%)
 *
 * where dayOneInterest% is rate*term for retained interest and 0 otherwise
 * (rolled/serviced interest is not taken out of the day-one advance).
 */
export function buildQuote(input: QuoteInput): QuoteResult {
  const propertyValue = positive("propertyValue", input.propertyValue);
  const amount = positive("amount", input.amount);
  const termMonths = positive("termMonths", input.termMonths);
  const monthlyRatePct = positive("monthlyRatePct", input.monthlyRatePct);

  if (input.mode !== "net" && input.mode !== "gross") {
    throw new QuoteError("invalid_input", 'mode must be "net" or "gross".');
  }
  if (
    input.interestType !== "retained" &&
    input.interestType !== "rolled" &&
    input.interestType !== "serviced"
  ) {
    throw new QuoteError(
      "invalid_input",
      'interestType must be "retained", "rolled", or "serviced".',
    );
  }

  const rate = monthlyRatePct / 100; // per month, as a fraction
  const arr = nonNegative("arrangementFeePct", input.arrangementFeePct) / 100;
  const exit = nonNegative("exitFeePct", input.exitFeePct) / 100;

  const brokerFee = nonNegative("brokerFee", input.brokerFee);
  const valuationFee = nonNegative("valuationFee", input.valuationFee);
  const legalFee = nonNegative("legalFee", input.legalFee);
  const adminFee = nonNegative("adminFee", input.adminFee);
  const titleInsurance = nonNegative("titleInsurance", input.titleInsurance);
  const fixedDeducted = brokerFee + valuationFee + legalFee + adminFee +
    titleInsurance;

  // Fraction of the gross loan consumed on day one by fee % + (retained) interest.
  const dayOneInterestFraction = input.interestType === "retained"
    ? rate * termMonths
    : 0;
  const dayOneFraction = arr + dayOneInterestFraction;

  if (dayOneFraction >= 1) {
    throw new QuoteError(
      "uneconomic",
      "Arrangement fee plus retained interest meet or exceed 100% of the " +
        "gross loan — reduce the term, rate, or fees.",
    );
  }

  // Resolve gross and net advance.
  let grossLoan: number;
  if (input.mode === "gross") {
    grossLoan = amount;
  } else {
    grossLoan = (amount + fixedDeducted) / (1 - dayOneFraction);
  }

  const arrangementFee = grossLoan * arr;
  const retainedInterest = input.interestType === "retained"
    ? grossLoan * rate * termMonths
    : 0;
  const netAdvance = grossLoan - arrangementFee - retainedInterest -
    fixedDeducted;

  if (netAdvance <= 0) {
    throw new QuoteError(
      "uneconomic",
      "Fees and retained interest leave no net advance for the borrower.",
    );
  }

  // Interest over the term, by type.
  let rolledInterest = 0;
  let monthlyInterest = 0;
  let totalInterest: number;
  switch (input.interestType) {
    case "retained":
      totalInterest = retainedInterest;
      break;
    case "rolled":
      // Compounded monthly, settled at redemption.
      rolledInterest = grossLoan * (Math.pow(1 + rate, termMonths) - 1);
      totalInterest = rolledInterest;
      break;
    case "serviced":
      monthlyInterest = grossLoan * rate;
      totalInterest = monthlyInterest * termMonths;
      break;
  }

  const exitFee = grossLoan * exit;

  // Lump sum to redeem at end of term.
  //  - retained: interest already taken up front → gross + exit
  //  - rolled:   gross + compounded interest + exit
  //  - serviced: interest paid monthly → gross + exit
  const totalRepayable = grossLoan +
    (input.interestType === "rolled" ? rolledInterest : 0) + exitFee;

  const grossLTVPct = (grossLoan / propertyValue) * 100;
  const netLTVPct = (netAdvance / propertyValue) * 100;
  const maxLTVPct = input.maxLTVPct ?? null;
  const ltvWithinLimit = maxLTVPct === null ? null : grossLTVPct <= maxLTVPct;

  const warnings: string[] = [];
  if (ltvWithinLimit === false) {
    warnings.push(
      `Gross LTV ${grossLTVPct.toFixed(1)}% exceeds the product maximum of ` +
        `${maxLTVPct}% — this case would need a larger deposit or a referral.`,
    );
  }

  return {
    currency: "GBP",
    product: input.product ?? null,
    interestType: input.interestType,
    termMonths,
    monthlyRatePct,
    propertyValue: money(propertyValue),
    grossLoan: money(grossLoan),
    netAdvance: money(netAdvance),
    grossLTVPct: pct(grossLTVPct),
    netLTVPct: pct(netLTVPct),
    maxLTVPct,
    ltvWithinLimit,
    fees: {
      arrangementFee: money(arrangementFee),
      brokerFee: money(brokerFee),
      valuationFee: money(valuationFee),
      legalFee: money(legalFee),
      adminFee: money(adminFee),
      titleInsurance: money(titleInsurance),
      exitFee: money(exitFee),
      totalFees: money(
        arrangementFee + brokerFee + valuationFee + legalFee + adminFee +
          titleInsurance + exitFee,
      ),
    },
    interest: {
      type: input.interestType,
      retainedInterest: money(retainedInterest),
      rolledInterest: money(rolledInterest),
      monthlyInterest: money(monthlyInterest),
      totalInterest: money(totalInterest),
    },
    monthlyPayment: money(input.interestType === "serviced" ? monthlyInterest : 0),
    totalRepayable: money(totalRepayable),
    warnings,
    disclaimer: DISCLAIMER,
  };
}
