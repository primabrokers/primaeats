// WhatsApp Business Cloud API helpers, shared by whatsapp-webhook and
// notify-quote-results.

const GRAPH_VERSION = "v21.0";

/** Constant-time compare of two hex strings. */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Verify the X-Hub-Signature-256 header (HMAC-SHA256 of the raw body keyed by
 * the app secret). Pass the EXACT raw request body — re-serialised JSON breaks
 * the MAC.
 */
export async function verifyWhatsAppSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string,
): Promise<boolean> {
  if (!signatureHeader || !appSecret) return false;
  const provided = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice("sha256=".length)
    : signatureHeader;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return timingSafeEqualHex(hex, provided.toLowerCase());
}

export interface InboundMessage {
  /** Sender wa_id (digits, no '+'). */
  from: string;
  text: string;
  /** Phone number id of the business number that received it (for replies). */
  phoneNumberId: string;
}

/** Pull text messages out of a WhatsApp webhook payload. */
// deno-lint-ignore no-explicit-any
export function extractInboundMessages(payload: any): InboundMessage[] {
  const out: InboundMessage[] = [];
  for (const entry of payload?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const value = change?.value;
      const phoneNumberId: string = value?.metadata?.phone_number_id ?? "";
      for (const msg of value?.messages ?? []) {
        if (msg?.type === "text" && msg?.text?.body) {
          out.push({ from: String(msg.from), text: String(msg.text.body), phoneNumberId });
        }
      }
    }
  }
  return out;
}

/** Send a plain-text WhatsApp message. Logs (without secrets) on failure. */
export async function sendWhatsAppText(opts: {
  token: string;
  phoneNumberId: string;
  to: string;
  body: string;
  graphVersion?: string;
}): Promise<boolean> {
  const version = opts.graphVersion ?? GRAPH_VERSION;
  const res = await fetch(
    `https://graph.facebook.com/${version}/${opts.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: opts.to,
        type: "text",
        text: { body: opts.body },
      }),
    },
  );
  if (!res.ok) {
    console.error(`WhatsApp send failed (${res.status}):`, await res.text());
    return false;
  }
  return true;
}

/** Normalise a WhatsApp number to digits only (E.164 without '+'). */
export function normalisePhone(value: string): string {
  return value.replace(/\D/g, "");
}
