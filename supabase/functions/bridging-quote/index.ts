// Edge Function: bridging-quote
//
// HTTP endpoint that turns a bridging-loan enquiry into an indicative
// illustration. Designed to be called by a Lendaris OpenAI Custom GPT "Action"
// — so it authenticates with a shared secret (the GPT has no Supabase JWT) and
// returns a clean, GPT-friendly JSON shape.
//
// Deploy WITHOUT Supabase JWT verification (the GPT can't mint one):
//   supabase functions deploy bridging-quote --no-verify-jwt
// and gate access with the shared secret instead:
//   supabase secrets set LENDARIS_GPT_API_KEY=<long-random-string>
//
// The caller sends:  Authorization: Bearer <LENDARIS_GPT_API_KEY>
//
// This function performs a pure calculation — no database, no portals, no LLM.
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { buildQuote, QuoteError } from "./quote-engine.ts";
import type { InterestType, QuoteInput } from "./quote-engine.ts";
import { getProduct, PRODUCTS } from "./products.ts";

interface RequestBody {
  /** Product id from the rate card. Defaults to the standard bridge. */
  product?: string;
  property_value?: number;
  /** Either net_advance OR gross_loan must be supplied (net preferred). */
  net_advance?: number;
  gross_loan?: number;
  term_months?: number;
  /** Optional overrides of the product defaults. */
  monthly_rate_pct?: number;
  interest_type?: InterestType;
  arrangement_fee_pct?: number;
  exit_fee_pct?: number;
  broker_fee?: number;
  valuation_fee?: number;
  legal_fee?: number;
  admin_fee?: number;
  title_insurance?: number;
}

function authorised(req: Request): boolean {
  const expected = Deno.env.get("LENDARIS_GPT_API_KEY");
  if (!expected) return false; // fail closed if the secret isn't configured
  const header = req.headers.get("Authorization") ?? "";
  const bearer = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  const apiKey = req.headers.get("x-api-key")?.trim() ?? "";
  const supplied = bearer || apiKey;
  // Length check first so the constant-time compare only runs on equal lengths.
  if (!supplied || supplied.length !== expected.length) return false;
  return timingSafeEqual(supplied, expected);
}

/** Constant-time string comparison to avoid leaking the secret via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }
  if (!authorised(req)) {
    return jsonResponse({ error: "Unauthorised." }, 401);
  }

  return handle(req);
});

async function handle(req: Request): Promise<Response> {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  let product;
  try {
    product = getProduct(body.product);
  } catch (err) {
    return jsonResponse(
      {
        error: (err as Error).message,
        available_products: Object.values(PRODUCTS).map((p) => ({
          id: p.id,
          label: p.label,
        })),
      },
      400,
    );
  }

  // Resolve the known amount: net advance preferred, else gross loan.
  let mode: QuoteInput["mode"];
  let amount: number;
  if (typeof body.net_advance === "number") {
    mode = "net";
    amount = body.net_advance;
  } else if (typeof body.gross_loan === "number") {
    mode = "gross";
    amount = body.gross_loan;
  } else {
    return jsonResponse(
      { error: "Provide either net_advance or gross_loan." },
      400,
    );
  }

  if (typeof body.property_value !== "number") {
    return jsonResponse({ error: "property_value is required." }, 400);
  }
  if (typeof body.term_months !== "number") {
    return jsonResponse({ error: "term_months is required." }, 400);
  }

  // Merge: explicit request value overrides product default.
  const input: QuoteInput = {
    propertyValue: body.property_value,
    mode,
    amount,
    termMonths: body.term_months,
    monthlyRatePct: body.monthly_rate_pct ?? product.monthlyRatePct,
    interestType: body.interest_type ?? product.defaultInterestType,
    arrangementFeePct: body.arrangement_fee_pct ?? product.arrangementFeePct,
    exitFeePct: body.exit_fee_pct ?? product.exitFeePct,
    valuationFee: body.valuation_fee ?? product.valuationFee,
    legalFee: body.legal_fee ?? product.legalFee,
    adminFee: body.admin_fee ?? product.adminFee,
    titleInsurance: body.title_insurance ?? product.titleInsurance,
    brokerFee: body.broker_fee ?? 0,
    maxLTVPct: product.maxLTVPct,
    product: product.id,
  };

  try {
    const quote = buildQuote(input);

    // Surface term-band guidance as a (non-blocking) warning.
    if (
      input.termMonths < product.minTermMonths ||
      input.termMonths > product.maxTermMonths
    ) {
      quote.warnings.push(
        `Term ${input.termMonths} months is outside the ${product.label} ` +
          `band of ${product.minTermMonths}–${product.maxTermMonths} months.`,
      );
    }

    return jsonResponse({ quote, product_label: product.label }, 200);
  } catch (err) {
    if (err instanceof QuoteError) {
      return jsonResponse({ error: err.message, code: err.code }, 400);
    }
    console.error("bridging-quote unexpected error:", err);
    return jsonResponse({ error: "Internal error." }, 500);
  }
}
