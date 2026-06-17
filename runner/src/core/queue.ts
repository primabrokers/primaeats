import type { SupabaseClient } from "@supabase/supabase-js";
import type { AutomationJob, JobStatus, QuoteResult } from "./types.js";

/**
 * Atomically claim the next pending job via the claim_next_job RPC
 * (SELECT ... FOR UPDATE SKIP LOCKED). Returns null when the queue is empty.
 */
export async function claimNextJob(
  supabase: SupabaseClient,
  runnerId: string,
  jobType?: string,
): Promise<AutomationJob | null> {
  const { data, error } = await supabase.rpc("claim_next_job", {
    p_runner_id: runnerId,
    p_job_type: jobType ?? null,
  });
  if (error) {
    throw new Error(`claim_next_job failed: ${error.message}`);
  }
  // The RPC returns a single automation_jobs row, or null when nothing matched.
  if (!data) return null;
  const job = (Array.isArray(data) ? data[0] : data) as AutomationJob | undefined;
  return job ?? null;
}

async function patchJob(
  supabase: SupabaseClient,
  jobId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const { error } = await supabase
    .from("automation_jobs")
    .update(patch)
    .eq("id", jobId);
  if (error) {
    throw new Error(`Failed to update job ${jobId}: ${error.message}`);
  }
}

export function markRunning(supabase: SupabaseClient, jobId: string) {
  return patchJob(supabase, jobId, {
    status: "running" satisfies JobStatus,
    started_at: new Date().toISOString(),
  });
}

export function markCompleted(
  supabase: SupabaseClient,
  jobId: string,
  result: QuoteResult,
) {
  return patchJob(supabase, jobId, {
    status: "completed" satisfies JobStatus,
    result,
    completed_at: new Date().toISOString(),
    error_message: null,
  });
}

export function markNeedsReview(
  supabase: SupabaseClient,
  jobId: string,
  reason: string,
  result?: QuoteResult | null,
) {
  return patchJob(supabase, jobId, {
    status: "needs_review" satisfies JobStatus,
    error_message: reason,
    result: result ?? null,
    completed_at: new Date().toISOString(),
  });
}

export function markFailed(
  supabase: SupabaseClient,
  jobId: string,
  error: string,
) {
  return patchJob(supabase, jobId, {
    status: "failed" satisfies JobStatus,
    error_message: error,
    completed_at: new Date().toISOString(),
  });
}
