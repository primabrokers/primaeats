import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { packages, productBySlug, productImage } from "../data/catalogue";
import { money, usePageTitle } from "../lib/format";
import { useBooking } from "../store/booking";
import "./Packages.css";

export default function Packages() {
  usePageTitle("Packages");
  const add = useBooking((s) => s.add);
  const { hash } = useLocation();
  // this page is lazy-loaded, so the router's scroll-to-hash runs before it exists
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Packages</li>
          </ol>
          <h1>Packages</h1>
          <p className="lede">
            Everything a typical event of each kind needs, delivered, set up and taken away by our crew. Prices are a starting
            point for a single event day — we tailor every package to the venue and guest count.
          </p>
        </div>
      </header>

      <div className="wrap pkg-list">
        {packages.map((pkg) => (
          <section key={pkg.slug} id={pkg.slug} className="pkg" style={{ ["--gel" as string]: pkg.gel }} aria-labelledby={`${pkg.slug}-title`}>
            <div className="pkg__intro">
              <h2 id={`${pkg.slug}-title`}>{pkg.name}</h2>
              <p className="muted">{pkg.forWho}</p>
              <p className="pkg__price">
                <span className="muted">from</span> <strong className="num">{money(pkg.from)}</strong>
              </p>
              <div className="pkg__actions">
                <button type="button" className="btn btn-primary" onClick={() => add({ kind: "package", slug: pkg.slug, qty: 1 })}>
                  Add to booking
                </button>
                <Link to={`/contact?about=${pkg.slug}`} className="btn btn-ghost">
                  Ask about it
                </Link>
              </div>
            </div>
            <div className="pkg__body">
              <h3 className="visually-hidden">Included</h3>
              <ul className="pkg__items">
                {pkg.includes.map((item) => {
                  const product = item.slug ? productBySlug(item.slug) : undefined;
                  return (
                    <li key={item.label}>
                      <span className="pkg__thumb" aria-hidden>
                        {product && <img src={productImage(product)} alt="" loading="lazy" />}
                      </span>
                      {product ? (
                        <Link to={`/hire/${product.slug}`} className="pkg__item-link">
                          {item.label}
                        </Link>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="pkg__note">{pkg.notes}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
