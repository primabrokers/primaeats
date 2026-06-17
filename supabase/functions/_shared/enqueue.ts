// Shared enqueue logic for quote-retrieval jobs.
//
// Used by BOTH the CRM-facing `enqueue-quote-job` function (Part 2) and the
// `whatsapp-webhook` function (Part 3), so the queueing rules live in exactly
// one place. This module does NOT call Claude and does NOT touch insurer
// portals — it only validates input and writes `automation_jobs` rows.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export type RequestedVia = "crm" | "whatsapp";

export type EnqueueErrorCode =
  | "invalid_input"
  | "policy_not_found"
  | "no_active_portals"
  | "portals_not_found";

// Typed error so callers (e.g. the WhatsApp handler) can turn a specific
// failure into a single clarifying question rather than guessing.
export class EnqueueError extends Error {
  code: EnqueueErrorCode;
  status: number;
  details?: unknown;
  constructor(
    code: EnqueueErrorCode,
    message: string,
    status = 400,
    details?: unknown,
  ) {
    super(message);
    this.name = "EnqueueError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export interface EnqueueParams {
  /** Org the jobs belong to. Used for RLS scoping and all lookups. */
  orgId: string;
  /** auth.users id of the requester, if known. */
  requestedBy?: string | null;
  requestedVia: RequestedVia;
  /** One job is created per portal id, all sharing a batch_id. */
  portalIds: string[];
  /** Optional override; otherwise taken from the resolved policy. */
  productType?: string | null;
  /** Provide either policyRef (looked up) or riskData directly. */
  policyRef?: string | null;
  riskData?: Record<string, unknown> | null;
}

export interface EnqueueResult {
  batchId: string;
  jobIds: string[];
  productType: string;
  /** Insurer names for the chosen portals, for building reply messages. */
  insurerNames: string[];
}

/**
 * Validate input, resolve risk data, and create one pending job per portal,
 * all sharing a fresh batch_id. Throws {@link EnqueueError} on bad input,
 * unknown policy_ref, or unknown/inactive portals.
 */
export async function enqueueQuoteJobs(
  supabase: SupabaseClient,
  params: EnqueueParams,
): Promise<EnqueueResult> {
  const { orgId, requestedVia, requestedBy = null } = params;

  const portalIds = [...new Set(params.portalIds ?? [])];
  if (portalIds.length === 0) {
    throw new EnqueueError("invalid_input", "At least one portal_id is required.");
  }

  // --- resolve risk_data + product_type --------------------------------------
  let riskData = params.riskData ?? null;
  let productType = params.productType ?? null;

  if (!riskData) {
    if (!params.policyRef) {
      throw new EnqueueError(
        "invalid_input",
        "Provide either policy_ref or risk_data.",
      );
    }
    const { data: policy, error } = await supabase
      .from("policies")
      .select("policy_ref, product_type, risk_data")
      .eq("org_id", orgId)
      .eq("policy_ref", params.policyRef)
      .maybeSingle();

    if (error) {
      throw new EnqueueError("invalid_input", `Policy lookup failed: ${error.message}`, 500);
    }
    if (!policy) {
      throw new EnqueueError(
        "policy_not_found",
        `No policy found for reference "${params.policyRef}".`,
        404,
        { policyRef: params.policyRef },
      );
    }
    riskData = (policy.risk_data ?? {}) as Record<string, unknown>;
    productType = productType ?? policy.product_type;
  }

  if (!productType) {
    throw new EnqueueError(
      "invalid_input",
      "product_type could not be determined (none provided and none on the policy).",
    );
  }

  // --- validate portals: must exist, belong to the org, and be active --------
  const { data: portals, error: portalErr } = await supabase
    .from("insurer_portals")
    .select("id, insurer_name")
    .eq("org_id", orgId)
    .eq("is_active", true)
    .in("id", portalIds);

  if (portalErr) {
    throw new EnqueueError("invalid_input", `Portal lookup failed: ${portalErr.message}`, 500);
  }

  const found = portals ?? [];
  if (found.length === 0) {
    throw new EnqueueError(
      "no_active_portals",
      "None of the requested portals are active for this org.",
    );
  }
  const foundIds = new Set(found.map((p) => p.id));
  const missing = portalIds.filter((id) => !foundIds.has(id));
  if (missing.length > 0) {
    throw new EnqueueError(
      "portals_not_found",
      `Some portals are unknown or inactive: ${missing.join(", ")}.`,
      404,
      { missing },
    );
  }

  // --- create one pending job per portal, sharing a batch_id -----------------
  const batchId = crypto.randomUUID();
  const rows = found.map((p) => ({
    org_id: orgId,
    type: "quote_retrieval",
    status: "pending",
    portal_id: p.id,
    product_type: productType,
    risk_data: riskData,
    requested_by: requestedBy,
    requested_via: requestedVia,
    batch_id: batchId,
  }));

  const { data: inserted, error: insertErr } = await supabase
    .from("automation_jobs")
    .insert(rows)
    .select("id");

  if (insertErr) {
    throw new EnqueueError("invalid_input", `Failed to enqueue jobs: ${insertErr.message}`, 500);
  }

  return {
    batchId,
    jobIds: (inserted ?? []).map((r) => r.id),
    productType,
    insurerNames: found.map((p) => p.insurer_name),
  };
}
