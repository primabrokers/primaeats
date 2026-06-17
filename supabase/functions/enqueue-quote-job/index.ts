// Edge Function: enqueue-quote-job  (Part 2)
//
// An authenticated CRM user POSTs { policy_ref OR risk_data, portal_ids[],
// product_type? }. We create one pending automation_jobs row per portal_id,
// all sharing a batch_id, and return { batch_id, job_ids }.
//
// This function does NOT call Claude and does NOT touch insurer portals — it
// only enqueues work for the local runner to pick up.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { EnqueueError, enqueueQuoteJobs } from "../_shared/enqueue.ts";

interface RequestBody {
  policy_ref?: string;
  risk_data?: Record<string, unknown>;
  portal_ids?: string[];
  product_type?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) {
    return jsonResponse({ error: "Server is misconfigured." }, 500);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse({ error: "Missing Authorization header." }, 401);
  }

  // User-scoped client: every query/insert below runs under the caller's JWT,
  // so RLS enforces org isolation for us.
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userResult, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userResult?.user) {
    return jsonResponse({ error: "Invalid or expired session." }, 401);
  }
  const user = userResult.user;

  // Resolve the caller's org from their profile.
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("org_id")
    .eq("id", user.id)
    .maybeSingle();
  if (profileErr || !profile) {
    return jsonResponse({ error: "No profile/org found for this user." }, 403);
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  if (!Array.isArray(body.portal_ids) || body.portal_ids.length === 0) {
    return jsonResponse({ error: "portal_ids[] is required." }, 400);
  }

  try {
    const result = await enqueueQuoteJobs(supabase, {
      orgId: profile.org_id,
      requestedBy: user.id,
      requestedVia: "crm",
      portalIds: body.portal_ids,
      productType: body.product_type ?? null,
      policyRef: body.policy_ref ?? null,
      riskData: body.risk_data ?? null,
    });

    return jsonResponse({
      batch_id: result.batchId,
      job_ids: result.jobIds,
      product_type: result.productType,
      insurers: result.insurerNames,
    }, 201);
  } catch (err) {
    if (err instanceof EnqueueError) {
      return jsonResponse({ error: err.message, code: err.code, details: err.details }, err.status);
    }
    console.error("enqueue-quote-job unexpected error:", err);
    return jsonResponse({ error: "Internal error." }, 500);
  }
});
