import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/format";
import "./Simple.css";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="simple wrap" aria-labelledby="nf-title">
      <div className="simple__card">
        <h1 id="nf-title">This page isn't on the rig</h1>
        <p className="lede">The link may be old, or the item may no longer be available to hire.</p>
        <div className="simple__actions">
          <Link to="/hire" className="btn btn-primary">
            Browse hire kit
          </Link>
          <Link to="/" className="btn btn-ghost">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
