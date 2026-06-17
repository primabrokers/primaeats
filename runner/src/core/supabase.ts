import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Build the runner's Supabase client using the SERVICE-ROLE key. This bypasses
 * RLS so the runner can claim/update jobs and insert audit rows. The key lives
 * only in the local .env (gitignored) — never in the cloud or git.
 */
export function createRunnerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment (.env).",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
