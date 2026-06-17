// Parse a free-text WhatsApp message into a structured quote request using
// Claude Haiku (cheap). Strict JSON-only output; we never guess values.
import Anthropic from "npm:@anthropic-ai/sdk@0.69.0";

export interface ParsedIntent {
  policy_ref: string | null;
  insurer_names: string[];
  product_type: string | null;
}

const SYSTEM_PROMPT = `You extract a structured insurance quote request from a UK broker's free-text WhatsApp message.

Return ONLY a JSON object, no prose, no markdown, matching exactly:
{"policy_ref": string|null, "insurer_names": string[], "product_type": string|null}

Rules:
- policy_ref: the policy or quote reference if present (e.g. "ABC123"), else null.
- insurer_names: the insurers the user wants quotes from, as an array of names exactly as written (e.g. ["Aviva","AXA"]). [] if none mentioned.
- product_type: the product if clearly stated (e.g. "motor", "home", "fleet"), else null.
- Never invent a value that is not in the message. Output JSON only.`;

const EMPTY: ParsedIntent = { policy_ref: null, insurer_names: [], product_type: null };

export async function parseIntent(apiKey: string, text: string): Promise<ParsedIntent> {
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: text }],
  });

  // deno-lint-ignore no-explicit-any
  const textBlock = response.content.find((b: any) => b.type === "text") as
    | { text: string }
    | undefined;
  const raw = textBlock?.text ?? "";
  return normalise(extractJson(raw));
}

/** Tolerate stray prose by extracting the first {...} block. */
function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function normalise(parsed: unknown): ParsedIntent {
  if (!parsed || typeof parsed !== "object") return { ...EMPTY };
  const p = parsed as Record<string, unknown>;
  return {
    policy_ref: typeof p.policy_ref === "string" && p.policy_ref.trim() ? p.policy_ref.trim() : null,
    insurer_names: Array.isArray(p.insurer_names)
      ? p.insurer_names.filter((x): x is string => typeof x === "string" && x.trim() !== "").map((x) => x.trim())
      : [],
    product_type:
      typeof p.product_type === "string" && p.product_type.trim() ? p.product_type.trim() : null,
  };
}
