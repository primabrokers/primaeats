import type { SupabaseClient } from "@supabase/supabase-js";

const AUDIT_BUCKET = "portal-audit-screens";

/**
 * Writes one automation_audit_log row per step and uploads the accompanying
 * screenshot to the private portal-audit-screens bucket. The regulated audit
 * trail: every action the runner takes is recorded.
 *
 * NEVER pass a decrypted secret in `detail`.
 */
export class AuditLogger {
  private stepIndex = 0;

  constructor(
    private readonly supabase: SupabaseClient,
    private readonly jobId: string,
    private readonly orgId: string,
  ) {}

  async record(
    action: string,
    detail: string,
    screenshot?: Buffer,
  ): Promise<number> {
    const index = this.stepIndex++;
    let screenshotPath: string | null = null;

    if (screenshot) {
      screenshotPath = `${this.orgId}/${this.jobId}/${String(index).padStart(4, "0")}.png`;
      const { error: uploadErr } = await this.supabase.storage
        .from(AUDIT_BUCKET)
        .upload(screenshotPath, screenshot, {
          contentType: "image/png",
          upsert: true,
        });
      if (uploadErr) {
        // Don't fail the whole job over an audit-screenshot upload; record the
        // step anyway with a note so the trail still reflects what happened.
        console.error(`audit screenshot upload failed: ${uploadErr.message}`);
        screenshotPath = null;
        detail = `${detail} [screenshot upload failed: ${uploadErr.message}]`;
      }
    }

    const { error } = await this.supabase.from("automation_audit_log").insert({
      job_id: this.jobId,
      step_index: index,
      action,
      detail,
      screenshot_path: screenshotPath,
    });
    if (error) {
      console.error(`audit log insert failed: ${error.message}`);
    }
    return index;
  }
}
