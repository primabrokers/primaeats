import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { colourPhrase, hireLengths, serviceLevels } from "../data/catalogue";
import { money, usePageTitle } from "../lib/format";
import { sendRequest } from "../lib/submit";
import { describeLine, lineTotal, useBooking, useTotals, type EventDetails } from "../store/booking";
import "./Booking.css";

const eventTypes = ["Wedding", "Birthday or celebration", "Bar or bat mitzvah", "Corporate event", "Concert or live music", "School or community event", "Other"];

type Errors = Partial<Record<keyof EventDetails | "lines", string>>;

const postcodeRe = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function validate(d: EventDetails, lineCount: number): Errors {
  const e: Errors = {};
  if (!lineCount) e.lines = "Add at least one item or package to send a booking request.";
  if (!d.eventType) e.eventType = "Choose the kind of event.";
  if (!d.date) e.date = "Enter the event date.";
  else if (d.date < localToday()) e.date = "The event date is in the past. Check the date.";
  if (!d.postcode.trim()) e.postcode = "Enter the venue postcode so we can work out delivery.";
  else if (!postcodeRe.test(d.postcode.trim())) e.postcode = "That doesn't look like a UK postcode, for example M25 0ED.";
  if (!d.name.trim()) e.name = "Enter your name.";
  if (!d.email.trim()) e.email = "Enter your email address so we can send your quote.";
  else if (!emailRe.test(d.email.trim())) e.email = "Enter an email address in the format name@example.com.";
  if (!d.phone.trim()) e.phone = "Enter a phone number for the day of the event.";
  else if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a full phone number, including the area code.";
  return e;
}

export default function Booking() {
  usePageTitle("Your booking");
  const navigate = useNavigate();
  const { lines, hireLength, service, details, setQty, remove, setHireLength, setService, setDetails, clear } = useBooking();
  const totals = useTotals();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const today = useMemo(localToday, []);

  // collection only works when everything is dry-hire kit
  useEffect(() => {
    if (service === "collect" && lines.length > 0 && !totals.allDryHire) setService("delivered");
  }, [service, lines.length, totals.allDryHire, setService]);

  useEffect(() => {
    if (submitted) setErrors(validate(details, lines.length));
  }, [details, lines.length, submitted]);

  const field = <K extends keyof EventDetails>(key: K) => ({
    id: `f-${key}`,
    name: key,
    value: details[key] as string,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `f-${key}-error` : undefined,
    onChange: (e: { target: { value: string } }) => setDetails({ [key]: e.target.value } as Partial<EventDetails>),
  });
  const err = (key: keyof EventDetails) =>
    errors[key] ? (
      <span className="error" id={`f-${key}-error`}>
        {errors[key]}
      </span>
    ) : null;

  const multiplierLabel = hireLengths.find((h) => h.id === hireLength)?.label ?? "";
  const serviceInfo = serviceLevels.find((s) => s.id === service)!;

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(details, lines.length);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      const el = first === "lines" ? document.getElementById("kit-title") : document.getElementById(`f-${first}`);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      (el as HTMLElement | null)?.focus?.({ preventScroll: true });
      return;
    }
    setSending(true);
    setSendError("");
    const itemsText = lines
      .map((l) => {
        const d = describeLine(l);
        return d ? `- ${l.qty} × ${d.name}${l.colour ? ` (${l.colour})` : ""} — ${money(lineTotal(d, l.qty, totals.multiplier))}` : "";
      })
      .join("\n");
    const summary = [
      `KIT (${multiplierLabel})`,
      itemsText,
      "",
      `SERVICE: ${serviceInfo.label}${serviceInfo.fee ? ` (${money(serviceInfo.fee)})` : ""}`,
      `ESTIMATE: ${totals.anyFrom ? "from " : ""}${money(totals.total)}`,
      "",
      "EVENT",
      `${details.eventType} on ${details.date}${details.startTime ? `, ${details.startTime}` : ""}${details.endTime ? `–${details.endTime}` : ""}`,
      `Guests: ${details.guests || "not given"}`,
      `Venue: ${details.venue || "not given"}, ${details.postcode.toUpperCase()} (${details.setting})`,
      `Access and power: ${details.access || "not given"}`,
      "",
      "CONTACT",
      `${details.name}, ${details.email}, ${details.phone}`,
      details.notes ? `\nNOTES\n${details.notes}` : "",
    ].join("\n");
    try {
      const res = await sendRequest({
        prefix: "USR",
        subject: `Booking request: ${details.eventType}, ${details.date}`,
        summary,
        replyTo: details.email,
        data: { lines, hireLength, service, details, estimate: totals.total },
      });
      clear();
      navigate("/booking/sent", { state: { ...res, name: details.name.split(" ")[0], email: details.email } });
    } catch (x) {
      setSendError(`Your request didn't send. ${x instanceof Error ? x.message : ""} Check your connection and try again, or email us directly.`);
    } finally {
      setSending(false);
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <header className="page-head page-head--tight">
        <div className="wrap">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Your booking</li>
          </ol>
          <h1>Your booking</h1>
          <p className="lede">
            Tell us about the event and we'll check availability, then send a fixed quote. Nothing is charged until you accept it.
          </p>
        </div>
      </header>

      <form ref={formRef} className="wrap booking" onSubmit={onSubmit} noValidate>
        <div className="booking__main">
          {submitted && errorCount > 0 && (
            <div className="alert" role="alert">
              <strong>{errorCount === 1 ? "One thing needs fixing" : `${errorCount} things need fixing`} before we can send this.</strong>
              <ul>
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>
                    <a href={k === "lines" ? "#kit-title" : `#f-${k}`}>{v}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <section className="form-section" aria-labelledby="kit-title">
            <h2 id="kit-title" tabIndex={-1}>
              <span className="form-section__n num" aria-hidden>1</span>
              Your kit
            </h2>
            {lines.length === 0 ? (
              <div className="empty-kit">
                <p>Your booking is empty. Add kit from the catalogue or start from a package.</p>
                <div className="empty-kit__actions">
                  <Link to="/hire" className="btn btn-primary">
                    Browse hire kit
                  </Link>
                  <Link to="/packages" className="btn">
                    See packages
                  </Link>
                </div>
                {errors.lines && <span className="error">{errors.lines}</span>}
              </div>
            ) : (
              <ul className="lines">
                <AnimatePresence initial={false}>
                  {lines.map((l) => {
                    const d = describeLine(l);
                    if (!d) return null;
                    return (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="line"
                        style={{ ["--gel" as string]: d.gel }}
                      >
                        <span className="line__thumb" aria-hidden>
                          {d.image && <img src={d.image} alt="" />}
                        </span>
                        <div className="line__info">
                          <Link to={d.href} className="line__name">
                            {d.name}
                          </Link>
                          <span className="muted line__meta">
                            {d.fromPrice ? "from " : ""}
                            {money(d.unitPrice)} {d.unit}
                            {l.colour ? `, ${colourPhrase(l.colour)}` : ""}
                          </span>
                        </div>
                        <div className="stepper stepper--small" role="group" aria-label={`Quantity of ${d.name}`}>
                          <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label="One fewer" disabled={l.qty <= 1}>
                            −
                          </button>
                          <output>{l.qty}</output>
                          <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label="One more">
                            +
                          </button>
                        </div>
                        <span className="line__total num">{money(lineTotal(d, l.qty, totals.multiplier))}</span>
                        <button type="button" className="line__remove" onClick={() => remove(l.key)}>
                          Remove<span className="visually-hidden"> {d.name}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
                <li className="lines__more">
                  <Link to="/hire" className="text-link">
                    Add more kit
                  </Link>
                </li>
              </ul>
            )}

            <fieldset className="form-fieldset">
              <legend>How long do you need it?</legend>
              <div className="choice-grid choice-grid--3">
                {hireLengths.map((h) => (
                  <label key={h.id} className="choice">
                    <input type="radio" name="hireLength" value={h.id} checked={hireLength === h.id} onChange={() => setHireLength(h.id)} />
                    <strong>{h.label}</strong>
                    <span className="muted">{h.multiplier === 1 ? "Standard day rate" : `${h.multiplier}× the day rate`}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section className="form-section" aria-labelledby="event-title">
            <h2 id="event-title">
              <span className="form-section__n num" aria-hidden>2</span>
              Your event
            </h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-eventType">Kind of event</label>
                <select className="select" {...field("eventType")}>
                  <option value="">Choose one</option>
                  {eventTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {err("eventType")}
              </div>
              <div className="field">
                <label htmlFor="f-date">Event date</label>
                <input className="input" type="date" min={today} {...field("date")} />
                {err("date")}
              </div>
              <div className="field">
                <label htmlFor="f-startTime">Starts</label>
                <input className="input" type="time" {...field("startTime")} />
              </div>
              <div className="field">
                <label htmlFor="f-endTime">Finishes</label>
                <input className="input" type="time" {...field("endTime")} />
              </div>
              <div className="field">
                <label htmlFor="f-guests">Number of guests</label>
                <input className="input" type="number" inputMode="numeric" min={1} placeholder="e.g. 150" {...field("guests")} />
                <span className="hint">A rough number is fine. It helps us size the sound.</span>
              </div>
              <div className="field">
                <label htmlFor="f-venue">Venue name</label>
                <input className="input" type="text" autoComplete="organization" placeholder="If you have one yet" {...field("venue")} />
              </div>
              <div className="field">
                <label htmlFor="f-postcode">Venue postcode</label>
                <input className="input input--postcode" type="text" autoComplete="postal-code" autoCapitalize="characters" {...field("postcode")} />
                {err("postcode")}
              </div>
              <fieldset className="field form-fieldset form-fieldset--inline">
                <legend className="label">Where is it?</legend>
                <div className="segmented">
                  {(["indoor", "outdoor", "marquee"] as const).map((s) => (
                    <label key={s}>
                      <input type="radio" name="setting" value={s} checked={details.setting === s} onChange={() => setDetails({ setting: s })} />
                      <span>{s[0].toUpperCase() + s.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field field--wide">
                <label htmlFor="f-access">Access and power</label>
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="Stairs or lifts, how close we can park, when we can get in to set up, and where the sockets are."
                  {...field("access")}
                />
              </div>
            </div>
          </section>

          <section className="form-section" aria-labelledby="service-title">
            <h2 id="service-title">
              <span className="form-section__n num" aria-hidden>3</span>
              Delivery and set-up
            </h2>
            <div className="choice-grid">
              {serviceLevels.map((s) => {
                const disabled = s.id === "collect" && lines.length > 0 && !totals.allDryHire;
                return (
                  <label key={s.id} className="choice">
                    <input type="radio" name="service" value={s.id} checked={service === s.id} disabled={disabled} onChange={() => setService(s.id)} />
                    <strong>{s.label}</strong>
                    <span className="choice__price num">{s.fee ? `+${money(s.fee)}` : "Free"}</span>
                    <span className="muted">
                      {disabled ? "Some items in your booking need our crew to install them." : s.detail}
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="hint form-note">Delivery is priced for Greater Manchester. We'll confirm the cost for venues further out.</p>
          </section>

          <section className="form-section" aria-labelledby="you-title">
            <h2 id="you-title">
              <span className="form-section__n num" aria-hidden>4</span>
              Your details
            </h2>
            <div className="form-grid">
              <div className="field field--wide">
                <label htmlFor="f-name">Your name</label>
                <input className="input" type="text" autoComplete="name" {...field("name")} />
                {err("name")}
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input className="input" type="email" autoComplete="email" {...field("email")} />
                {err("email")}
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input className="input" type="tel" autoComplete="tel" {...field("phone")} />
                {err("phone")}
              </div>
              <div className="field field--wide">
                <label htmlFor="f-notes">Anything else?</label>
                <textarea className="textarea" rows={4} placeholder="Colour scheme, running order, first-dance song, or questions." {...field("notes")} />
              </div>
            </div>
            <p className="hint form-note">We only use your details to reply about this booking.</p>
          </section>
        </div>

        <aside className="booking__summary" aria-labelledby="summary-title">
          <div className="summary">
            <h2 id="summary-title">Estimate</h2>
            <dl className="summary__rows">
              <div>
                <dt>
                  Kit <span className="muted">({lines.length ? multiplierLabel.toLowerCase() : "nothing added yet"})</span>
                </dt>
                <dd className="num">{money(totals.kit)}</dd>
              </div>
              <div>
                <dt>{serviceInfo.label}</dt>
                <dd className="num">{lines.length ? (serviceInfo.fee ? money(serviceInfo.fee) : "Free") : "—"}</dd>
              </div>
              <div className="summary__total">
                <dt>Estimated total</dt>
                <dd className="num">
                  {totals.anyFrom && <span className="muted summary__from">from </span>}
                  {money(totals.total)}
                </dd>
              </div>
            </dl>
            <p className="summary__note muted">
              This is a guide price. Your quote confirms the final price, including any travel beyond Greater Manchester.
            </p>
            <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
              {sending ? "Sending your request…" : "Send booking request"}
            </button>
            {sendError && (
              <p className="error" role="alert">
                {sendError}
              </p>
            )}
          </div>
        </aside>
      </form>
    </>
  );
}
