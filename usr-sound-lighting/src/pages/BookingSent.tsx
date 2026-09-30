import { Link, useLocation } from "react-router-dom";
import { brand } from "../brand";
import { usePageTitle } from "../lib/format";
import "./Simple.css";

interface SentState {
  ref: string;
  via: "endpoint" | "email";
  name?: string;
  email?: string;
}

export default function BookingSent() {
  usePageTitle("Booking request sent");
  const state = useLocation().state as SentState | null;
  const viaEmail = state?.via === "email";

  return (
    <section className="simple wrap" aria-labelledby="sent-title">
      <div className="simple__card" style={{ ["--gel" as string]: "var(--ok)" }}>
        <h1 id="sent-title">
          {viaEmail ? "Almost there" : `Thanks${state?.name ? `, ${state.name}` : ""}. Your request is in.`}
        </h1>
        {viaEmail ? (
          <p className="lede">
            Your email app has opened with the booking request written out. Press send and it will reach us at {brand.email}.
            If nothing opened, email us and quote the reference below.
          </p>
        ) : (
          <p className="lede">
            We've got your booking request{state?.email ? ` and will reply to ${state.email}` : ""} with availability and a fixed
            quote. Nothing is booked or charged until you accept it.
          </p>
        )}
        {state?.ref && (
          <p className="ref">
            Reference <strong className="num">{state.ref}</strong>
          </p>
        )}
        <h2>What happens next</h2>
        <ol className="next-steps">
          <li>We check the date, the kit and the venue details you gave us.</li>
          <li>We send a fixed quote, and may call to ask about access or power.</li>
          <li>Accept the quote to secure the date.</li>
        </ol>
        <div className="simple__actions">
          <Link to="/hire" className="btn">
            Keep browsing
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
