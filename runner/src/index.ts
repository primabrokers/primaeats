import "dotenv/config";
import os from "node:os";
import Anthropic from "@anthropic-ai/sdk";
import { createRunnerClient } from "./core/supabase.js";
import { claimNextJob, markFailed } from "./core/queue.js";
import { handleQuoteRetrieval } from "./handlers/quote-retrieval.js";
import type { AutomationJob } from "./core/types.js";

const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS ?? 5000);
const RUNNER_ID = process.env.RUNNER_ID ?? `${os.hostname()}:${process.pid}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let running = true;

async function dispatch(
  supabase: ReturnType<typeof createRunnerClient>,
  anthropic: Anthropic,
  job: AutomationJob,
): Promise<void> {
  console.log(`[${new Date().toISOString()}] claimed job ${job.id} (type=${job.type})`);
  try {
    switch (job.type) {
      case "quote_retrieval":
        await handleQuoteRetrieval(supabase, anthropic, job);
        break;
      default:
        await markFailed(supabase, job.id, `No handler for job type "${job.type}".`);
    }
  } catch (err) {
    // Last-resort guard: the handler should set terminal status itself, but if
    // it throws, ensure the job doesn't stay stuck in 'running'.
    console.error(`job ${job.id} threw:`, err);
    try {
      await markFailed(supabase, job.id, `Unhandled error: ${(err as Error).message}`);
    } catch (markErr) {
      console.error(`failed to mark job ${job.id} failed:`, markErr);
    }
  }
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing ANTHROPIC_API_KEY in environment (.env).");
  }
  const supabase = createRunnerClient();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  console.log(`Prima quote runner started as "${RUNNER_ID}". Polling every ${POLL_INTERVAL_MS}ms.`);

  while (running) {
    let job: AutomationJob | null = null;
    try {
      job = await claimNextJob(supabase, RUNNER_ID);
    } catch (err) {
      console.error("claim error:", (err as Error).message);
      await sleep(POLL_INTERVAL_MS);
      continue;
    }

    if (!job) {
      await sleep(POLL_INTERVAL_MS);
      continue;
    }

    await dispatch(supabase, anthropic, job);
    // Loop straight back to drain the queue; only idle-sleep when empty.
  }

  console.log("Runner stopped.");
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    if (!running) process.exit(1);
    console.log(`\nReceived ${signal}, finishing current job then exiting…`);
    running = false;
  });
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
