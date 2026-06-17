// Edge Function: notify-quote-results  (Part 4 of the spec)
//
// Called with { batch_id } when all jobs in a batch reach a terminal state
// (by the batch-completion DB trigger, or manually/by a poller). Composes a
// concise WhatsApp summary — one line per insurer — and sends it to the org's
// mapped recipient, with a CRM deep link to the full comparison. Dedupes so a
// batch is summarised at most once.
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendWhatsAppText } from "../_shared/whatsapp.ts";

const TERMINAL = new Set(["completed", "failed", "needs_review"]);

interface JobRow {
  org_id: string;
  portal_id: string | null;
  status: string;
  requested_by: string | null;
  result: {
    premium_gross: number | null;
    excess: number | null;
    outcome: "quoted" | "referred" | "declined";
  } | null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const gbp = (n: number | null | undefined) =>
  typeof n === "number" ? `£${n.toFixed(2)}` : "n/a";

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: { batch_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const batchId = body.batch_id;
  if (!batchId) return json({ error: "batch_id required" }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: jobsData, error } = await supabase
    .from("automation_jobs")
    .select("org_id, portal_id, status, requested_by, result")
    .eq("batch_id", batchId);
  if (error) return json({ error: error.message }, 500);

  const jobs = (jobsData ?? []) as JobRow[];
  if (jobs.length === 0) return json({ status: "no_jobs" });
  if (jobs.some((j) => !TERMINAL.has(j.status))) return json({ status: "pending" });

  // Claim the batch (insert-once dedupe). A unique-violation means already sent.
  const { error: claimErr } = await supabase
    .from("quote_batch_notifications")
    .insert({ batch_id: batchId });
  if (claimErr) return json({ status: "already_notified" });

  const orgId = jobs[0]!.org_id;
  const requestedBy = jobs[0]!.requested_by;

  const recipient = await resolveRecipient(supabase, orgId, requestedBy);
  if (!recipient) return json({ status: "no_recipient" });

  // Insurer names
  const portalIds = [...new Set(jobs.map((j) => j.portal_id).filter(Boolean))] as string[];
  const { data: portals } = await supabase
    .from("insurer_portals")
    .select("id, insurer_name")
    .in("id", portalIds);
  const names: Record<string, string> = {};
  for (const p of portals ?? []) names[p.id] = p.insurer_name;

  const lines = jobs.map((j) => formatLine(names[j.portal_id ?? ""] ?? "Unknown", j)).join("\n");

  const crmBase = (Deno.env.get("CRM_BASE_URL") ?? "").replace(/\/$/, "");
  const link = crmBase ? `\n\nFull comparison: ${crmBase}/quotes?batch=${batchId}` : "";
  const summary = `Quote results:\n${lines}${link}`;

  await sendWhatsAppText({
    token: Deno.env.get("WHATSAPP_TOKEN") ?? "",
    phoneNumberId: Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") ?? "",
    to: recipient,
    body: summary,
  });

  return json({ status: "sent" });
});

function formatLine(insurer: string, job: JobRow): string {
  if (job.status === "needs_review") return `• ${insurer}: NEEDS REVIEW`;
  if (job.status === "failed") return `• ${insurer}: FAILED`;
  const r = job.result;
  if (!r) return `• ${insurer}: no result`;
  if (r.outcome === "referred") return `• ${insurer}: REFERRED`;
  if (r.outcome === "declined") return `• ${insurer}: DECLINED`;
  return `• ${insurer}: ${gbp(r.premium_gross)} (excess ${gbp(r.excess)})`;
}

async function resolveRecipient(
  supabase: SupabaseClient,
  orgId: string,
  requestedBy: string | null,
): Promise<string | null> {
  // Prefer the staff member who requested it (WhatsApp-originated batches).
  if (requestedBy) {
    const { data } = await supabase
      .from("whatsapp_senders")
      .select("phone")
      .eq("org_id", orgId)
      .eq("user_id", requestedBy)
      .eq("is_active", true)
      .maybeSingle();
    if (data?.phone) return data.phone as string;
  }
  // Else the org's default-notify number (CRM-originated batches).
  const { data: def } = await supabase
    .from("whatsapp_senders")
    .select("phone")
    .eq("org_id", orgId)
    .eq("notify_default", true)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (def?.phone) return def.phone as string;
  return null;
}
