import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductTile } from "../components/ProductTile";
import { categories, products, type Category } from "../data/catalogue";
import { usePageTitle } from "../lib/format";
import "./Hire.css";

type Sort = "recommended" | "price-asc" | "price-desc";

export default function Hire() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") as Category | null) ?? null;
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as Sort | null) ?? "recommended";
  const dryOnly = params.get("dry") === "1";
  const active = category && categories[category] ? category : null;
  usePageTitle(active ? `${categories[active].label} hire` : "Hire kit");

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = products.filter(
      (p) =>
        (!active || p.category === active) &&
        (!dryOnly || p.dryHire) &&
        (!needle || `${p.name} ${p.summary} ${p.goodFor.join(" ")}`.toLowerCase().includes(needle)),
    );
    if (sort === "price-asc") out.sort((a, b) => a.dayRate - b.dayRate);
    if (sort === "price-desc") out.sort((a, b) => b.dayRate - a.dayRate);
    return out;
  }, [active, q, sort, dryOnly]);

  return (
    <>
      <header className="page-head" style={{ ["--page-gel" as string]: active ? categories[active].gel : "var(--amber)" }}>
        <div className="wrap">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Hire kit</li>
          </ol>
          <h1>{active ? `${categories[active].label} hire` : "Hire kit"}</h1>
          <p className="lede">
            {active
              ? categories[active].blurb
              : "Everything we hire, with prices for a single event day. Add what you need to your booking and we'll confirm availability and a fixed quote."}
          </p>
        </div>
      </header>

      <section className="section hire" aria-label="Catalogue">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter kit">
            <div className="filters__cats">
              <button type="button" className="cat-chip" aria-pressed={!active} onClick={() => update("category", null)}>
                All kit
              </button>
              {(Object.keys(categories) as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="cat-chip"
                  aria-pressed={active === c}
                  onClick={() => update("category", active === c ? null : c)}
                  style={{ ["--gel" as string]: categories[c].gel }}
                >
                  <span className="cat-chip__swatch" aria-hidden />
                  {categories[c].label}
                </button>
              ))}
            </div>
            <div className="filters__tools">
              <label className="visually-hidden" htmlFor="hire-search">
                Search kit
              </label>
              <input
                id="hire-search"
                className="input"
                type="search"
                placeholder="Search, e.g. uplighting or wedding"
                value={q}
                onChange={(e) => update("q", e.target.value || null)}
              />
              <label className="visually-hidden" htmlFor="hire-sort">
                Sort
              </label>
              <select id="hire-sort" className="select" value={sort} onChange={(e) => update("sort", e.target.value === "recommended" ? null : e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
              <label className="toggle">
                <input type="checkbox" checked={dryOnly} onChange={(e) => update("dry", e.target.checked ? "1" : null)} />
                Collect it yourself
              </label>
            </div>
          </div>

          <p className="hire__count muted" aria-live="polite">
            {list.length === 1 ? "1 item" : `${list.length} items`}
          </p>

          {list.length ? (
            <div className="tile-grid">
              {list.map((p) => (
                <ProductTile key={p.slug} product={p} headingLevel={2} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing matches that search</h2>
              <p className="muted">Try a different word, or clear the filters to see everything we hire.</p>
              <button type="button" className="btn" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </button>
            </div>
          )}

          <aside className="hire__help">
            <div>
              <h2>Not sure what you need?</h2>
              <p className="muted">Tell us about the room and the guest count and we'll put a list together for you.</p>
            </div>
            <div className="hire__help-actions">
              <Link to="/packages" className="btn">
                See packages
              </Link>
              <Link to="/contact" className="btn btn-primary">
                Ask for a recommendation
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
