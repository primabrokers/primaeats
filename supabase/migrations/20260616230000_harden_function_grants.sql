-- =============================================================================
-- Prima Quote Agent — function exposure hardening
--
-- Supabase uses ALTER DEFAULT PRIVILEGES to grant EXECUTE directly to `anon`,
-- `authenticated` and `service_role` on every new function in `public`. That
-- exposed our SECURITY DEFINER functions to the `anon` role via /rest/v1/rpc/*.
-- For claim_next_job that is a real hole: SECURITY DEFINER bypasses RLS, so an
-- unauthenticated caller could claim/mutate jobs.
--
-- Fix: revoke EXECUTE from `anon` on all four. Trigger functions don't need an
-- EXECUTE grant for any client role at all (triggers run them regardless), so
-- those also lose `authenticated`. auth_org_id / claim_next_job keep the
-- authenticated + service_role grants the original design intended
-- (20260616210000_init_automation.sql).
-- =============================================================================

-- Trigger-only functions: no client role should reach these over the REST API.
revoke execute on function public.set_updated_at() from anon, authenticated;
revoke execute on function public.handle_batch_completion() from anon, authenticated;

-- set_updated_at was the one function missing a pinned search_path
-- (function_search_path_mutable advisory).
alter function public.set_updated_at() set search_path = public;

-- auth_org_id / claim_next_job: drop the anon grant, keep the intended roles.
revoke execute on function public.auth_org_id() from anon;
revoke execute on function public.claim_next_job(text, text) from anon;
