// Edge Function: whatsapp-webhook  (Part 3 of the spec)
//
// GET  — WhatsApp Cloud API verification handshake.
// POST — inbound message receiver. Verifies the signature, only acts on
//        allowlisted senders, parses intent with Claude Haiku, maps insurers to
//        active portals, then reuses the shared enqueue logic. Asks ONE
//        clarifying question on ambiguity rather than guessing.
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EnqueueError, enqueueQuoteJobs } from "../_shared/enqueue.ts";
import {
  extractInboundMessages,
  normalisePhone,
  sendWhatsAppText,
  verifyWhatsAppSignature,
  type InboundMessage,
} from "../_shared/whatsapp.ts";
import { parseIntent } from "./intent.ts";

interface Sender {
  org_id: string;
  user_id: string | null;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // --- GET: verification handshake -------------------------------------------
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token && token === Deno.env.get("WHATSAPP_VERIFY_TOKEN")) {
      return new Response(challenge ?? "", { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // --- POST: verify signature over the RAW body ------------------------------
  const raw = await req.text();
  const valid = await verifyWhatsAppSignature(
    raw,
    req.headers.get("x-hub-signature-256"),
    Deno.env.get("WHATSAPP_APP_SECRET") ?? "",
  );
  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const messages = extractInboundMessages(payload);
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
  const cfg = {
    token: Deno.env.get("WHATSAPP_TOKEN") ?? "",
    anthropicKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
  };

  // Process messages, then always 200 so WhatsApp doesn't retry.
  for (const msg of messages) {
    try {
      await handleMessage(supabase, cfg, msg);
    } catch (err) {
      console.error("handleMessage error:", (err as Error).message);
    }
  }
  return new Response("ok", { status: 200 });
});

async function handleMessage(
  supabase: SupabaseClient,
  cfg: { token: string; anthropicKey: string },
  msg: InboundMessage,
): Promise<void> {
  const reply = (body: string) =>
    sendWhatsAppText({ token: cfg.token, phoneNumberId: msg.phoneNumberId, to: msg.from, body });

  // Allowlist + org resolution in one lookup. Unknown sender -> ignore silently.
  const sender = await lookupSender(supabase, msg.from);
  if (!sender) {
    console.warn("Ignoring message from non-allowlisted sender.");
    return;
  }

  const intent = await parseIntent(cfg.anthropicKey, msg.text);

  if (!intent.policy_ref) {
    await reply("Which policy is this for? Reply with the policy reference (e.g. ABC123).");
    return;
  }

  // Map insurer names -> active portals for this org.
  const { data: portals } = await supabase
    .from("insurer_portals")
    .select("id, insurer_name")
    .eq("org_id", sender.org_id)
    .eq("is_active", true);
  const active = (portals ?? []) as Array<{ id: string; insurer_name: string }>;

  if (intent.insurer_names.length === 0) {
    await reply(
      `Which insurers should I quote? Active: ${active.map((p) => p.insurer_name).join(", ") || "none configured"}.`,
    );
    return;
  }

  const matched: Array<{ id: string; insurer_name: string }> = [];
  const unresolved: string[] = [];
  for (const name of intent.insurer_names) {
    const n = name.toLowerCase();
    const hits = active.filter((p) => {
      const pn = p.insurer_name.toLowerCase();
      return pn === n || pn.includes(n) || n.includes(pn);
    });
    if (hits.length === 1) matched.push(hits[0]!);
    else unresolved.push(name); // 0 = unknown, >1 = ambiguous — both need clarifying
  }

  if (unresolved.length > 0 || matched.length === 0) {
    await reply(
      `I couldn't match: ${unresolved.join(", ") || "(none)"}. Active insurers: ${active
        .map((p) => p.insurer_name)
        .join(", ")}. Which would you like?`,
    );
    return;
  }

  const portalIds = [...new Set(matched.map((p) => p.id))];

  try {
    const result = await enqueueQuoteJobs(supabase, {
      orgId: sender.org_id,
      requestedBy: sender.user_id,
      requestedVia: "whatsapp",
      portalIds,
      productType: intent.product_type,
      policyRef: intent.policy_ref,
    });
    await reply(
      `Getting quotes from ${result.insurerNames.join(", ")} for ${intent.policy_ref}. I'll message results shortly.`,
    );
  } catch (err) {
    if (err instanceof EnqueueError) {
      if (err.code === "policy_not_found") {
        await reply(`I couldn't find policy ${intent.policy_ref}. Can you double-check the reference?`);
        return;
      }
      await reply(`Sorry, I couldn't start that: ${err.message}`);
      return;
    }
    throw err;
  }
}

async function lookupSender(supabase: SupabaseClient, from: string): Promise<Sender | null> {
  const phone = normalisePhone(from);
  const { data } = await supabase
    .from("whatsapp_senders")
    .select("org_id, user_id")
    .eq("phone", phone)
    .eq("is_active", true)
    .maybeSingle();
  return (data as Sender | null) ?? null;
}
