import { brand } from "../brand";

export type SubmitResult = { ref: string; via: "endpoint" | "email" };

const endpoint = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim();

export function makeRef(prefix: string) {
  const d = new Date();
  const stamp = `${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

/**
 * Sends a booking request or enquiry.
 * With VITE_FORM_ENDPOINT set, POSTs JSON (Formspree-compatible).
 * Without it, opens the visitor's email app with the request written out.
 */
export async function sendRequest(opts: {
  prefix: string;
  subject: string;
  summary: string;
  data: Record<string, unknown>;
  replyTo?: string;
}): Promise<SubmitResult> {
  const ref = makeRef(opts.prefix);
  const subject = `${opts.subject} — ${ref}`;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _replyto: opts.replyTo, reference: ref, summary: opts.summary, ...opts.data }),
    });
    if (!res.ok) throw new Error(`The form service answered ${res.status}.`);
    return { ref, via: "endpoint" };
  }

  const body = `Reference: ${ref}\n\n${opts.summary}`;
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ref, via: "email" };
}
