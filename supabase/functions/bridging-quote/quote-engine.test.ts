// Tests for the bridging quote engine. Run with:  deno test
import {
  assert,
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { buildQuote, QuoteError } from "./quote-engine.ts";

// Retained interest: gross-up must round-trip so the borrower nets what they asked.
Deno.test("retained: net mode grosses up and the advance matches the request", () => {
  const q = buildQuote({
    propertyValue: 1_000_000,
    mode: "net",
    amount: 500_000,
    termMonths: 12,
    monthlyRatePct: 0.85,
    interestType: "retained",
    arrangementFeePct: 2,
    valuationFee: 500,
    legalFee: 1500,
    adminFee: 295,
  });

  // netAdvance should equal the requested 500,000 (within rounding).
  assertAlmostEquals(q.netAdvance, 500_000, 0.5);

  // gross = (net + fixedDeducted) / (1 - arr - rate*term)
  //       = (500000 + 2295) / (1 - 0.02 - 0.0085*12) = 502295 / 0.878
  const expectedGross = 502_295 / (1 - 0.02 - 0.0085 * 12);
  assertAlmostEquals(q.grossLoan, expectedGross, 0.5);

  // Identity: gross = net + arrangement + retained + fixed fees.
  const reconstructed = q.netAdvance + q.fees.arrangementFee +
    q.interest.retainedInterest + q.fees.valuationFee + q.fees.legalFee +
    q.fees.adminFee + q.fees.titleInsurance;
  assertAlmostEquals(q.grossLoan, reconstructed, 0.5);

  // Retained interest = gross * rate * term.
  assertAlmostEquals(
    q.interest.retainedInterest,
    q.grossLoan * 0.0085 * 12,
    0.5,
  );
  // Retained interest is taken up front, so redemption = gross + exit (0 here).
  assertAlmostEquals(q.totalRepayable, q.grossLoan, 0.5);
});

// Gross mode is the inverse of net mode for the same product.
Deno.test("retained: gross mode is the inverse of net mode", () => {
  const net = buildQuote({
    propertyValue: 1_000_000,
    mode: "net",
    amount: 500_000,
    termMonths: 12,
    monthlyRatePct: 0.85,
    interestType: "retained",
    arrangementFeePct: 2,
    valuationFee: 500,
    legalFee: 1500,
    adminFee: 295,
  });

  const gross = buildQuote({
    propertyValue: 1_000_000,
    mode: "gross",
    amount: net.grossLoan,
    termMonths: 12,
    monthlyRatePct: 0.85,
    interestType: "retained",
    arrangementFeePct: 2,
    valuationFee: 500,
    legalFee: 1500,
    adminFee: 295,
  });

  assertAlmostEquals(gross.netAdvance, 500_000, 1);
  assertAlmostEquals(gross.grossLoan, net.grossLoan, 0.01);
});

// Rolled interest compounds and is added at redemption, not deducted up front.
Deno.test("rolled: interest compounds and lands in totalRepayable", () => {
  const q = buildQuote({
    propertyValue: 800_000,
    mode: "gross",
    amount: 400_000,
    termMonths: 12,
    monthlyRatePct: 1,
    interestType: "rolled",
    arrangementFeePct: 2,
  });

  const expectedRolled = 400_000 * (Math.pow(1.01, 12) - 1);
  assertAlmostEquals(q.interest.rolledInterest, expectedRolled, 0.5);
  assertAlmostEquals(q.totalRepayable, 400_000 + expectedRolled, 0.5);
  // Day-one advance is only reduced by the arrangement fee (2%).
  assertAlmostEquals(q.netAdvance, 400_000 * 0.98, 0.5);
  assertEquals(q.monthlyPayment, 0);
});

// Serviced interest is paid monthly; nothing rolls into the redemption figure.
Deno.test("serviced: monthly payment and flat redemption", () => {
  const q = buildQuote({
    propertyValue: 800_000,
    mode: "gross",
    amount: 400_000,
    termMonths: 12,
    monthlyRatePct: 1,
    interestType: "serviced",
    arrangementFeePct: 2,
  });

  assertAlmostEquals(q.monthlyPayment, 400_000 * 0.01, 0.5);
  assertAlmostEquals(q.interest.totalInterest, 400_000 * 0.01 * 12, 0.5);
  assertAlmostEquals(q.totalRepayable, 400_000, 0.5); // gross + exit(0)
});

// LTV breach is flagged but still returns figures (broker decides next step).
Deno.test("LTV over the product cap raises a warning", () => {
  const q = buildQuote({
    propertyValue: 500_000,
    mode: "gross",
    amount: 450_000, // 90% gross LTV
    termMonths: 12,
    monthlyRatePct: 0.85,
    interestType: "retained",
    arrangementFeePct: 2,
    maxLTVPct: 75,
  });

  assertEquals(q.ltvWithinLimit, false);
  assert(q.warnings.some((w) => w.includes("exceeds the product maximum")));
  assertAlmostEquals(q.grossLTVPct, 90, 0.01);
});

// Guard rails.
Deno.test("rejects non-positive inputs", () => {
  assertThrows(
    () =>
      buildQuote({
        propertyValue: 0,
        mode: "net",
        amount: 100_000,
        termMonths: 12,
        monthlyRatePct: 0.85,
        interestType: "retained",
        arrangementFeePct: 2,
      }),
    QuoteError,
    "propertyValue",
  );
});

Deno.test("rejects a term/rate/fee combo that eats the whole gross", () => {
  assertThrows(
    () =>
      buildQuote({
        propertyValue: 1_000_000,
        mode: "net",
        amount: 500_000,
        termMonths: 100, // 100 * 1% = 100% retained interest alone
        monthlyRatePct: 1,
        interestType: "retained",
        arrangementFeePct: 2,
      }),
    QuoteError,
    "exceed",
  );
});
