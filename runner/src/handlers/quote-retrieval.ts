import type Anthropic from "@anthropic-ai/sdk";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AuditLogger } from "../core/audit.js";
import { getPortalCredentials } from "../core/credentials.js";
import {
  captureScreenshot,
  getScreenSize,
  runComputerUseLoop,
  typeText,
  type CustomTool,
} from "../core/computer-use.js";
import {
  markCompleted,
  markFailed,
  markNeedsReview,
  markRunning,
} from "../core/queue.js";
import type {
  AutomationJob,
  InsurerPortal,
  PortalPlaybook,
  QuoteResult,
} from "../core/types.js";

const PLAYBOOK_BUCKET = "portal-playbooks";

/** Terminal value carried out of the computer-use loop by the custom tools. */
type Terminal =
  | { kind: "result"; data: QuoteResult }
  | { kind: "needs_review"; reason: string };

export async function handleQuoteRetrieval(
  supabase: SupabaseClient,
  anthropic: Anthropic,
  job: AutomationJob,
): Promise<void> {
  const audit = new AuditLogger(supabase, job.id, job.org_id);

  if (!job.portal_id || !job.product_type) {
    await markFailed(supabase, job.id, "Job is missing portal_id or product_type.");
    return;
  }

  // 1. Portal
  const { data: portal, error: portalErr } = await supabase
    .from("insurer_portals")
    .select("*")
    .eq("id", job.portal_id)
    .maybeSingle<InsurerPortal>();
  if (portalErr || !portal) {
    await markFailed(supabase, job.id, `Portal not found: ${portalErr?.message ?? job.portal_id}`);
    return;
  }

  // 2. Latest ACTIVE playbook for this product_type
  const { data: playbooks, error: pbErr } = await supabase
    .from("portal_playbooks")
    .select("*")
    .eq("portal_id", portal.id)
    .eq("product_type", job.product_type)
    .eq("is_active", true)
    .order("version", { ascending: false })
    .limit(1);
  if (pbErr) {
    await markFailed(supabase, job.id, `Playbook lookup failed: ${pbErr.message}`);
    return;
  }
  const playbook = playbooks?.[0] as PortalPlaybook | undefined;
  if (!playbook) {
    await markNeedsReview(
      supabase,
      job.id,
      `No active playbook for ${portal.insurer_name} / ${job.product_type}. Author one in the editor.`,
    );
    return;
  }

  // 3. HARD STOP (pre-flight): every field_map field must have a risk_data value.
  //    Never invent a value — flag the missing field for review instead.
  const riskData = job.risk_data ?? {};
  const missing: string[] = [];
  for (const step of playbook.steps ?? []) {
    for (const [portalField, riskField] of Object.entries(step.field_map ?? {})) {
      const v = (riskData as Record<string, unknown>)[riskField];
      if (v === undefined || v === null || v === "") {
        missing.push(`"${portalField}" (needs risk_data.${riskField})`);
      }
    }
  }
  if (missing.length > 0) {
    await markNeedsReview(
      supabase,
      job.id,
      `Missing risk_data for required field(s): ${[...new Set(missing)].join(", ")}.`,
    );
    return;
  }

  await markRunning(supabase, job.id);
  await audit.record("start", `Quote retrieval on ${portal.insurer_name} (playbook v${playbook.version})`);

  // 4. Credentials (Windows Credential Manager — never the cloud)
  let credentials;
  try {
    credentials = await getPortalCredentials(portal.credential_key);
  } catch (err) {
    await markFailed(supabase, job.id, `Credential load failed: ${(err as Error).message}`);
    return;
  }

  // 5. Reference screenshots (so Claude can match live screen vs expected_screen)
  const referenceImages = await loadReferenceImages(supabase, playbook.reference_screenshots ?? []);

  // 6. Build the system prompt + custom tools, then run the shared loop.
  const display = await getScreenSize();
  const system = buildSystemPrompt(portal, playbook, riskData as Record<string, unknown>);

  const customTools = buildCustomTools(audit, credentials);

  const initialUserContent = [
    ...referenceImages.map((img) => ({
      type: "image",
      source: { type: "base64", media_type: "image/png", data: img },
    })),
    {
      type: "text",
      text:
        `Begin the quote-retrieval workflow now for ${portal.insurer_name}. ` +
        `The portal is at ${portal.portal_url}. Take a screenshot first to see the current screen, ` +
        `then follow the numbered steps. Use \`type_secret\` for the login username/password. ` +
        `When you reach the final quote, call \`report_result\`. If anything is wrong, call \`needs_review\`.`,
    },
  ];

  let result;
  try {
    result = await runComputerUseLoop({
      anthropic,
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
      system,
      initialUserContent,
      display,
      maxIterations: Number(process.env.MAX_ITERATIONS ?? 40),
      audit,
      customTools,
    });
  } catch (err) {
    await audit.record("error", `Loop threw: ${(err as Error).message}`, await safeShot());
    await markFailed(supabase, job.id, `Computer-use loop failed: ${(err as Error).message}`);
    return;
  }

  // 7. Map the loop outcome to a job status.
  if (result.outcome === "terminal") {
    const terminal = result.value as Terminal;
    if (terminal.kind === "result") {
      await audit.record("completed", `Outcome: ${terminal.data.outcome}`, await safeShot());
      await markCompleted(supabase, job.id, terminal.data);
    } else {
      await audit.record("needs_review", terminal.reason, await safeShot());
      await markNeedsReview(supabase, job.id, terminal.reason);
    }
    return;
  }

  if (result.outcome === "max_iterations") {
    await audit.record("needs_review", "Reached max iterations without a result.", await safeShot());
    await markNeedsReview(supabase, job.id, "Reached max iterations without reaching a quote.");
    return;
  }

  // stopped: model ended its turn without signalling a result
  await audit.record("needs_review", "Model stopped without reporting a result.", await safeShot());
  await markNeedsReview(supabase, job.id, "Model ended without calling report_result or needs_review.");
}

// --- helpers -----------------------------------------------------------------

async function safeShot(): Promise<Buffer | undefined> {
  try {
    return await captureScreenshot();
  } catch {
    return undefined;
  }
}

async function loadReferenceImages(
  supabase: SupabaseClient,
  paths: string[],
): Promise<string[]> {
  const out: string[] = [];
  for (const path of paths) {
    const { data, error } = await supabase.storage.from(PLAYBOOK_BUCKET).download(path);
    if (error || !data) continue;
    const buf = Buffer.from(await data.arrayBuffer());
    out.push(buf.toString("base64"));
  }
  return out;
}

function buildSystemPrompt(
  portal: InsurerPortal,
  playbook: PortalPlaybook,
  riskData: Record<string, unknown>,
): string {
  const steps = (playbook.steps ?? [])
    .map((step, i) => {
      const fields = Object.entries(step.field_map ?? {})
        .map(([portalField, riskField]) => {
          const value = riskData[riskField];
          return `      - Enter "${formatValue(value)}" into the "${portalField}" field`;
        })
        .join("\n");
      return [
        `  Step ${i + 1}: ${step.instruction}`,
        `    Expected screen: ${step.expected_screen}`,
        fields ? `    Field entry:\n${fields}` : `    (no field entry on this step)`,
      ].join("\n");
    })
    .join("\n\n");

  return `You are a UK insurance broking assistant operating ${portal.insurer_name}'s quote portal on a Windows desktop via the computer tool. You request quotes ONLY — you read screens, enter risk data, and generate a quotation.

REGULATED HARD-STOP RULES (these override everything else):
1. NEVER click any control that binds, purchases, pays, confirms a purchase, or accepts terms to incur a liability. If a step would lead there, STOP and call needs_review immediately. Generating/viewing a quotation is allowed; committing to buy is NOT.
2. NEVER invent or guess a field value. Only enter the values listed under each step. If a needed value is absent, call needs_review naming the field.
3. If the live screen does not match the step's "Expected screen" (the playbook is stale), STOP and call needs_review describing the mismatch — do NOT improvise an alternative path.

CREDENTIALS:
- The portal username and password are NOT shown to you. To log in: click the username field, call type_secret with field="username"; click the password field, call type_secret with field="password"; then click the login/submit control.

WORKFLOW for ${portal.insurer_name} (${portal.portal_url}):
${steps}

${playbook.notes ? `PORTAL NOTES:\n${playbook.notes}\n\n` : ""}HOW TO OPERATE:
- Work one step at a time. Take a screenshot to confirm the current screen before acting, and after significant actions.
- Match the live screen against the reference screenshots provided to confirm you are on the expected screen.
- When you have a final quotation on screen, call report_result with the premium(s), quote reference, validity date, excess, and outcome. REFERRED and DECLINED are valid outcomes — report them; they are not failures.
- Keep going until you call report_result or needs_review.`;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function buildCustomTools(
  audit: AuditLogger,
  credentials: { username: string; password: string },
): CustomTool[] {
  const typeSecret: CustomTool = {
    definition: {
      name: "type_secret",
      description:
        "Type a stored portal credential into the CURRENTLY FOCUSED field. The actual value is never revealed to you. Click the target field first, then call this.",
      input_schema: {
        type: "object",
        properties: {
          field: { type: "string", enum: ["username", "password"] },
        },
        required: ["field"],
      },
    },
    async handle(input) {
      const field = input.field === "password" ? "password" : "username";
      await typeText(credentials[field]);
      const shot = await safeShot();
      // Audit records THAT a secret was entered, never the value.
      await audit.record(`type_secret:${field}`, `Entered ${field} (value redacted)`, shot);
      const content: Record<string, unknown>[] = [
        { type: "text", text: `Entered the ${field}.` },
      ];
      if (shot) {
        content.push({
          type: "image",
          source: { type: "base64", media_type: "image/png", data: shot.toString("base64") },
        });
      }
      return { type: "continue", content };
    },
  };

  const reportResult: CustomTool = {
    definition: {
      name: "report_result",
      description:
        "Report the final quotation outcome. Call this once you can see the quote on screen. REFERRED and DECLINED are valid outcomes.",
      input_schema: {
        type: "object",
        properties: {
          premium_gross: { type: ["number", "null"], description: "Gross annual premium incl. taxes/fees" },
          premium_net: { type: ["number", "null"], description: "Net premium excl. taxes/fees" },
          quote_ref: { type: ["string", "null"], description: "Insurer quote reference" },
          validity_date: { type: ["string", "null"], description: "Quote validity/expiry date (YYYY-MM-DD if shown)" },
          excess: { type: ["number", "null"], description: "Policy excess" },
          outcome: { type: "string", enum: ["quoted", "referred", "declined"] },
          notes: { type: ["string", "null"], description: "Anything notable (referral reason, conditions, etc.)" },
        },
        required: ["outcome"],
      },
    },
    async handle(input) {
      const data: QuoteResult = {
        premium_gross: numOrNull(input.premium_gross),
        premium_net: numOrNull(input.premium_net),
        quote_ref: strOrNull(input.quote_ref),
        validity_date: strOrNull(input.validity_date),
        excess: numOrNull(input.excess),
        outcome: (["quoted", "referred", "declined"].includes(String(input.outcome))
          ? input.outcome
          : "quoted") as QuoteResult["outcome"],
        notes: strOrNull(input.notes),
      };
      return { type: "terminal", value: { kind: "result", data } satisfies Terminal };
    },
  };

  const needsReview: CustomTool = {
    definition: {
      name: "needs_review",
      description:
        "Stop and flag the job for human review. Use for: a missing field value, a screen that does not match the playbook, or any action that would bind/pay/purchase.",
      input_schema: {
        type: "object",
        properties: {
          reason: { type: "string", description: "Why this needs human review" },
          field: { type: ["string", "null"], description: "The field involved, if any" },
        },
        required: ["reason"],
      },
    },
    async handle(input) {
      const reason = input.field
        ? `${String(input.reason)} (field: ${String(input.field)})`
        : String(input.reason);
      return { type: "terminal", value: { kind: "needs_review", reason } satisfies Terminal };
    },
  };

  return [typeSecret, reportResult, needsReview];
}

function numOrNull(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

function strOrNull(v: unknown): string | null {
  if (typeof v === "string" && v.trim() !== "") return v;
  return null;
}
