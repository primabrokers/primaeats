// Shared runner types — kept in sync with the Supabase schema (Part 1).

export type JobStatus =
  | "pending"
  | "claimed"
  | "running"
  | "completed"
  | "failed"
  | "needs_review";

export interface AutomationJob {
  id: string;
  org_id: string;
  type: string;
  status: JobStatus;
  portal_id: string | null;
  product_type: string | null;
  risk_data: Record<string, unknown>;
  requested_by: string | null;
  requested_via: "crm" | "whatsapp";
  batch_id: string;
  claimed_by: string | null;
  error_message: string | null;
  result: QuoteResult | null;
}

export interface InsurerPortal {
  id: string;
  org_id: string;
  insurer_name: string;
  portal_url: string;
  /** Names the Windows Credential Manager entry — NOT a secret. */
  credential_key: string;
  is_active: boolean;
}

export interface PlaybookStep {
  instruction: string;
  expected_screen: string;
  /** portal field label -> risk_data key that supplies its value */
  field_map: Record<string, string>;
}

export interface PortalPlaybook {
  id: string;
  portal_id: string;
  version: number;
  product_type: string;
  steps: PlaybookStep[];
  reference_screenshots: string[];
  notes: string | null;
}

/** Extracted into automation_jobs.result on a completed job. */
export interface QuoteResult {
  premium_gross: number | null;
  premium_net: number | null;
  quote_ref: string | null;
  validity_date: string | null;
  excess: number | null;
  outcome: "quoted" | "referred" | "declined";
  notes: string | null;
}

/** Screen dimensions handed to the computer-use tool (1:1 with pixels). */
export interface Display {
  width: number;
  height: number;
  number: number;
}
