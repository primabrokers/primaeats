// UI-facing types mirroring the Supabase schema (Part 1).

export type JobStatus =
  | "pending"
  | "claimed"
  | "running"
  | "completed"
  | "failed"
  | "needs_review";

export type QuoteOutcome = "quoted" | "referred" | "declined";

export interface InsurerPortal {
  id: string;
  insurer_name: string;
  portal_url: string;
  credential_key: string;
  is_active: boolean;
}

export interface FieldMapping {
  /** Portal field label. */
  portalField: string;
  /** risk_data key that supplies the value. */
  riskField: string;
}

export interface PlaybookStep {
  instruction: string;
  expected_screen: string;
  field_map: Record<string, string>;
  /** Storage path of this step's reference screenshot, if any. */
  reference_screenshot?: string | null;
}

export interface PortalPlaybook {
  id: string;
  portal_id: string;
  version: number;
  product_type: string;
  steps: PlaybookStep[];
  reference_screenshots: string[];
  notes: string | null;
  is_active: boolean;
  updated_at: string;
}

export interface QuoteResult {
  premium_gross: number | null;
  premium_net: number | null;
  quote_ref: string | null;
  validity_date: string | null;
  excess: number | null;
  outcome: QuoteOutcome;
  notes: string | null;
  /** Optional storage path in quote-docs, if the runner produced a document. */
  quote_doc_path?: string | null;
}

export interface AutomationJob {
  id: string;
  org_id: string;
  type: string;
  status: JobStatus;
  portal_id: string | null;
  product_type: string | null;
  requested_via: "crm" | "whatsapp";
  batch_id: string;
  error_message: string | null;
  result: QuoteResult | null;
  requested_at: string;
}
