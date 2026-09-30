import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { brand, telHref } from "../brand";
import { packageBySlug } from "../data/catalogue";
import { usePageTitle } from "../lib/format";
import { sendRequest, type SubmitResult } from "../lib/submit";
import "./Contact.css";

interface Form {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

export default function Contact() {
  usePageTitle("Contact");
  const [params] = useSearchParams();
  const about = packageBySlug(params.get("about") ?? "");
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: about ? `I'd like to know more about the ${about.name} package.` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<SubmitResult | null>(null);
  const [sendError, setSendError] = useState("");

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter an email address in the format name@example.com.";
    if (!form.message.trim()) e.message = "Tell us a little about your event or question.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await sendRequest({
        prefix: "ENQ",
        subject: `Enquiry from ${form.name}`,
        summary: `${form.message}\n\n${form.name}\n${form.email}${form.phone ? `\n${form.phone}` : ""}${form.date ? `\nEvent date: ${form.date}` : ""}`,
        replyTo: form.email,
        data: { ...form },
      });
      setSent(res);
    } catch (x) {
      setSendError(`Your message didn't send. ${x instanceof Error ? x.message : ""} Try again, or email ${brand.email}.`);
    } finally {
      setSending(false);
    }
  };

  const invalid = (k: keyof Form) => ({
    id: `c-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `c-${k}-error` : undefined,
  });

  return (
    <>
      <header className="page-head" style={{ ["--page-gel" as string]: "var(--steel)" }}>
        <div className="wrap">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Contact</li>
          </ol>
          <h1>Talk to us about your event</h1>
          <p className="lede">
            Ask a question, check a date or tell us about the venue. If you already know what you need, you can{" "}
            <Link to="/booking" className="text-link">
              send a booking request
            </Link>{" "}
            instead.
          </p>
        </div>
      </header>

      <div className="wrap contact">
        {sent ? (
          <div className="contact__sent" role="status">
            <h2>{sent.via === "email" ? "Your email app has opened" : "Message sent"}</h2>
            <p className="lede">
              {sent.via === "email"
                ? "Your message is written out and ready. Press send in your email app and it will reach us."
                : `Thanks, ${form.name.split(" ")[0]}. We'll reply to ${form.email}.`}
            </p>
            <p className="muted">
              Reference <strong className="num">{sent.ref}</strong>
            </p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input className="input" autoComplete="name" value={form.name} onChange={set("name")} {...invalid("name")} />
              {errors.name && <span className="error" id="c-name-error">{errors.name}</span>}
            </div>
            <div className="contact__pair">
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input className="input" type="email" autoComplete="email" value={form.email} onChange={set("email")} {...invalid("email")} />
                {errors.email && <span className="error" id="c-email-error">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone (optional)</label>
                <input className="input" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} id="c-phone" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-date">Event date (if you know it)</label>
              <input className="input" type="date" value={form.date} onChange={set("date")} id="c-date" />
            </div>
            <div className="field">
              <label htmlFor="c-message">Your message</label>
              <textarea className="textarea" rows={6} value={form.message} onChange={set("message")} {...invalid("message")} />
              {errors.message && <span className="error" id="c-message-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
            {sendError && (
              <p className="error" role="alert">
                {sendError}
              </p>
            )}
          </form>
        )}

        <aside className="contact__details" aria-label="Contact details">
          <div>
            <h2>Email</h2>
            <a href={`mailto:${brand.email}`} className="text-link">
              {brand.email}
            </a>
          </div>
          {brand.phone && (
            <div>
              <h2>Phone</h2>
              <a href={telHref(brand.phone)} className="text-link">
                {brand.phone}
              </a>
            </div>
          )}
          <div>
            <h2>Instagram</h2>
            <a href={brand.instagram} target="_blank" rel="noopener" className="text-link">
              {brand.instagramHandle}
            </a>
            <p className="muted">Photos and videos from recent events.</p>
          </div>
          <div>
            <h2>Where we are</h2>
            <p className="muted">
              Based in {brand.base}. We deliver across Greater Manchester, Cheshire and Lancashire, and travel further for larger
              events.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
