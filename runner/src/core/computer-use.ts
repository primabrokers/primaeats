// Shared computer-use loop: capture screen -> reason with Claude -> act -> repeat.
//
// Generic on purpose: navigation is driven by the Anthropic computer-use tool,
// while WORKFLOW-SPECIFIC terminal signals (e.g. "report this quote",
// "needs review") are passed in as custom tools by the handler. Future
// workflows (Acturis extraction, renewals) reuse this loop unchanged.
//
// Tool/beta pairing verified against current Anthropic docs (Sonnet 4.6):
//   tool type   = computer_20251124
//   beta header = computer-use-2025-11-24
import type Anthropic from "@anthropic-ai/sdk";
import {
  mouse,
  keyboard,
  screen,
  Button,
  Key,
  Point,
} from "@nut-tree-fork/nut-js";
import screenshot from "screenshot-desktop";
import type { AuditLogger } from "./audit.js";
import type { Display } from "./types.js";

export const COMPUTER_TOOL_TYPE = "computer_20251124";
export const COMPUTER_USE_BETA = "computer-use-2025-11-24";

const MAX_TOKENS = 4096;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** A content block we hand to (or receive from) the Messages API. */
type ContentBlock = Record<string, unknown>;

/** Result of running a custom tool: either keep looping, or stop with a value. */
export type ToolStep =
  | { type: "continue"; content: ContentBlock[]; isError?: boolean }
  | { type: "terminal"; value: unknown };

export interface CustomTool {
  /** The Anthropic tool definition (name, description, input_schema). */
  definition: Record<string, unknown>;
  handle(input: Record<string, unknown>): Promise<ToolStep>;
}

export interface LoopOptions {
  anthropic: Anthropic;
  model: string;
  system: string;
  /** Reference images + the task description, as the first user turn. */
  initialUserContent: ContentBlock[];
  display: Display;
  maxIterations: number;
  audit: AuditLogger;
  customTools: CustomTool[];
}

export type LoopResult =
  | { outcome: "terminal"; value: unknown }
  | { outcome: "max_iterations" }
  | { outcome: "stopped" };

/** Read the primary display size so tool coordinates map 1:1 with pixels. */
export async function getScreenSize(): Promise<Display> {
  const width = await screen.width();
  const height = await screen.height();
  return { width, height, number: 1 };
}

/** Capture the primary display as a PNG buffer. */
export async function captureScreenshot(): Promise<Buffer> {
  return screenshot({ format: "png" });
}

/** Type literal text at the current focus (used by the loop and by handlers). */
export async function typeText(text: string): Promise<void> {
  await keyboard.type(text);
}

export async function runComputerUseLoop(opts: LoopOptions): Promise<LoopResult> {
  const computerTool = {
    type: COMPUTER_TOOL_TYPE,
    name: "computer",
    display_width_px: opts.display.width,
    display_height_px: opts.display.height,
    display_number: opts.display.number,
  };
  const tools = [computerTool, ...opts.customTools.map((t) => t.definition)];
  const handlersByName = new Map(
    opts.customTools.map((t) => [
      (t.definition as { name: string }).name,
      t,
    ]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any[] = [
    { role: "user", content: opts.initialUserContent },
  ];

  for (let i = 0; i < opts.maxIterations; i++) {
    const response = await opts.anthropic.beta.messages.create({
      model: opts.model,
      max_tokens: MAX_TOKENS,
      betas: [COMPUTER_USE_BETA],
      system: opts.system,
      // The beta computer-use tool/message shapes are awkward to type fully;
      // cast at this single SDK boundary while keeping our domain types strict.
      tools: tools as never,
      messages: messages as never,
    });

    messages.push({ role: "assistant", content: response.content });

    // The beta content-block union types churn; treat blocks structurally.
    const blocks = response.content as unknown as Array<Record<string, unknown>>;
    const toolUses = blocks.filter((b) => b.type === "tool_use") as Array<{
      id: string;
      name: string;
      input?: Record<string, unknown>;
    }>;

    if (toolUses.length === 0) {
      // Claude ended its turn without acting or signalling a result.
      return { outcome: "stopped" };
    }

    const toolResults: ContentBlock[] = [];
    for (const tu of toolUses) {
      const input = (tu.input ?? {}) as Record<string, unknown>;

      if (tu.name === "computer") {
        const { auditScreenshot, modelContent } = await executeComputerAction(
          input,
          opts.display,
        );
        await opts.audit.record(
          `computer:${String(input.action)}`,
          summariseAction(input),
          auditScreenshot,
        );
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: modelContent,
        });
        continue;
      }

      const handler = handlersByName.get(tu.name);
      if (!handler) {
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: `Unknown tool: ${tu.name}`,
          is_error: true,
        });
        continue;
      }

      const step = await handler.handle(input);
      if (step.type === "terminal") {
        return { outcome: "terminal", value: step.value };
      }
      toolResults.push({
        type: "tool_result",
        tool_use_id: tu.id,
        content: step.content,
        ...(step.isError ? { is_error: true } : {}),
      });
    }

    messages.push({ role: "user", content: toolResults });
  }

  return { outcome: "max_iterations" };
}

// --- computer action execution ----------------------------------------------

interface ActionInput {
  action: string;
  coordinate?: [number, number];
  start_coordinate?: [number, number];
  text?: string;
  scroll_direction?: "up" | "down" | "left" | "right";
  scroll_amount?: number;
  duration?: number;
}

/** Human-readable, secret-free summary of an action for the audit log. */
function summariseAction(input: Record<string, unknown>): string {
  const a = input as unknown as ActionInput;
  const parts: string[] = [a.action];
  if (a.coordinate) parts.push(`@${a.coordinate[0]},${a.coordinate[1]}`);
  if (a.text !== undefined) parts.push(`text=${JSON.stringify(a.text)}`);
  if (a.scroll_direction) parts.push(`scroll=${a.scroll_direction}/${a.scroll_amount ?? 1}`);
  if (a.duration !== undefined) parts.push(`duration=${a.duration}s`);
  return parts.join(" ");
}

async function executeComputerAction(
  raw: Record<string, unknown>,
  _display: Display,
): Promise<{ auditScreenshot: Buffer; modelContent: ContentBlock[] }> {
  const input = raw as unknown as ActionInput;
  const action = input.action;

  const moveTo = async (c?: [number, number]) => {
    if (c) await mouse.setPosition(new Point(c[0], c[1]));
  };

  switch (action) {
    case "screenshot":
      break;

    case "mouse_move":
      await moveTo(input.coordinate);
      break;

    case "left_click":
      await moveTo(input.coordinate);
      await mouse.click(Button.LEFT);
      break;
    case "right_click":
      await moveTo(input.coordinate);
      await mouse.click(Button.RIGHT);
      break;
    case "middle_click":
      await moveTo(input.coordinate);
      await mouse.click(Button.MIDDLE);
      break;
    case "double_click":
      await moveTo(input.coordinate);
      await mouse.doubleClick(Button.LEFT);
      break;
    case "triple_click":
      await moveTo(input.coordinate);
      await mouse.click(Button.LEFT);
      await mouse.click(Button.LEFT);
      await mouse.click(Button.LEFT);
      break;

    case "left_mouse_down":
      await moveTo(input.coordinate);
      await mouse.pressButton(Button.LEFT);
      break;
    case "left_mouse_up":
      await moveTo(input.coordinate);
      await mouse.releaseButton(Button.LEFT);
      break;

    case "left_click_drag": {
      await moveTo(input.start_coordinate);
      await mouse.pressButton(Button.LEFT);
      await moveTo(input.coordinate);
      await mouse.releaseButton(Button.LEFT);
      break;
    }

    case "type":
      if (input.text) await keyboard.type(input.text);
      break;

    case "key":
      if (input.text) await pressKeyCombo(input.text);
      break;

    case "hold_key": {
      if (input.text) {
        const keys = parseKeyCombo(input.text);
        await keyboard.pressKey(...keys);
        await sleep(Math.round((input.duration ?? 1) * 1000));
        await keyboard.releaseKey(...keys.reverse());
      }
      break;
    }

    case "scroll": {
      await moveTo(input.coordinate);
      const amount = input.scroll_amount ?? 3;
      switch (input.scroll_direction) {
        case "up": await mouse.scrollUp(amount); break;
        case "down": await mouse.scrollDown(amount); break;
        case "left": await mouse.scrollLeft(amount); break;
        case "right": await mouse.scrollRight(amount); break;
      }
      break;
    }

    case "wait":
      await sleep(Math.round((input.duration ?? 1) * 1000));
      break;

    case "cursor_position": {
      const pos = await mouse.getPosition();
      const shot = await captureScreenshot();
      return {
        auditScreenshot: shot,
        modelContent: [{ type: "text", text: `cursor at ${pos.x},${pos.y}` }],
      };
    }

    default:
      // Unknown action — capture a screenshot so the model can re-orient.
      break;
  }

  // Small settle delay so the screenshot reflects the action's effect.
  await sleep(400);
  const shot = await captureScreenshot();

  if (action === "screenshot") {
    return { auditScreenshot: shot, modelContent: [imageBlock(shot)] };
  }
  // For non-screenshot actions, return a confirmation plus the resulting screen
  // so the model always sees current state (and the audit trail stays complete).
  return {
    auditScreenshot: shot,
    modelContent: [{ type: "text", text: `Performed: ${action}` }, imageBlock(shot)],
  };
}

function imageBlock(png: Buffer): ContentBlock {
  return {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: png.toString("base64") },
  };
}

// --- key mapping (xdotool-style names -> nut-js Key) ------------------------

const KEY_MAP: Record<string, Key> = {
  return: Key.Enter,
  enter: Key.Enter,
  tab: Key.Tab,
  escape: Key.Escape,
  esc: Key.Escape,
  backspace: Key.Backspace,
  delete: Key.Delete,
  space: Key.Space,
  up: Key.Up,
  down: Key.Down,
  left: Key.Left,
  right: Key.Right,
  home: Key.Home,
  end: Key.End,
  page_up: Key.PageUp,
  pageup: Key.PageUp,
  prior: Key.PageUp,
  page_down: Key.PageDown,
  pagedown: Key.PageDown,
  next: Key.PageDown,
  insert: Key.Insert,
  ctrl: Key.LeftControl,
  control: Key.LeftControl,
  alt: Key.LeftAlt,
  shift: Key.LeftShift,
  super: Key.LeftSuper,
  cmd: Key.LeftSuper,
  win: Key.LeftSuper,
  meta: Key.LeftSuper,
};

function mapKeyToken(token: string): Key {
  const t = token.trim().toLowerCase();
  const mapped = KEY_MAP[t];
  if (mapped !== undefined) return mapped;
  const K = Key as unknown as Record<string, Key>;
  if (/^[a-z]$/.test(t)) return K[t.toUpperCase()]!;
  if (/^[0-9]$/.test(t)) return K[`Num${t}`]!;
  if (/^f[0-9]{1,2}$/.test(t)) return K[`F${t.slice(1)}`]!;
  throw new Error(`Unsupported key token: "${token}"`);
}

function parseKeyCombo(combo: string): Key[] {
  return combo.split("+").map((p) => mapKeyToken(p));
}

async function pressKeyCombo(combo: string): Promise<void> {
  const keys = parseKeyCombo(combo);
  await keyboard.pressKey(...keys);
  await keyboard.releaseKey(...[...keys].reverse());
}
