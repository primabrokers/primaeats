import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductScene } from "../components/Scene";
import { ProductTile } from "../components/ProductTile";
import { categories, colourPhrase, defaultLightColour, hireLengths, lightColours, productBySlug, productImage, products } from "../data/catalogue";
import { gel } from "../lib/cssVar";
import { money, prefersReducedMotion, usePageTitle } from "../lib/format";
import { useBooking } from "../store/booking";
import NotFound from "./NotFound";
import "./Product.css";

export default function Product() {
  const { slug = "" } = useParams();
  const product = productBySlug(slug);
  usePageTitle(product ? `${product.name} hire` : "Not found");
  const add = useBooking((s) => s.add);
  const [qty, setQty] = useState(1);
  const [colour, setColour] = useState<string>(product ? defaultLightColour[product.category] : gel.beam());
  const [animate, setAnimate] = useState(() => !prefersReducedMotion());
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    if (product) setColour(product.colourPick ? lightColours[0].hex : defaultLightColour[product.category]);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 2400);
    return () => clearTimeout(t);
  }, [justAdded]);

  if (!product) return <NotFound />;

  const cat = categories[product.category];
  const colourName = lightColours.find((c) => c.hex === colour)?.name;
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const unit = product.unit ?? "per day";

  const onAdd = () => {
    add({ kind: "product", slug: product.slug, qty, colour: product.colourPick ? colourName : undefined });
    setJustAdded(true);
  };

  return (
    <article className="pdp" style={{ ["--gel" as string]: cat.gel }}>
      <div className="wrap pdp__top">
        <ol className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hire">Hire kit</Link>
          </li>
          <li>
            <Link to={`/hire?category=${product.category}`}>{cat.label}</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </div>

      <div className="wrap pdp__grid">
        <div className="pdp__viewer-col">
          <figure className="viewer">
            <div className="viewer__canvas">
              <ProductScene
                key={product.slug}
                kind={product.model}
                colour={colour}
                animate={animate}
                fallback={<img className="viewer__still" src={productImage(product)} alt="" />}
              />
            </div>
            <figcaption className="viewer__bar">
              <span className="muted">Drag to turn it, pinch or scroll to zoom.</span>
              <button type="button" className="btn btn-small btn-ghost" aria-pressed={!animate} onClick={() => setAnimate((a) => !a)}>
                {animate ? "Pause motion" : "Play motion"}
              </button>
            </figcaption>
          </figure>
        </div>

        <div className="pdp__buy">
          <span className="gel" style={{ ["--gel" as string]: cat.gel }}>
            {cat.label}
          </span>
          <h1>{product.name}</h1>
          <p className="lede">{product.summary}</p>

          <div className="price-block">
            <p className="price-block__main">
              <strong className="num">{money(product.dayRate)}</strong> <span className="muted">{unit}</span>
            </p>
            {product.perEvent ? (
              <p className="muted price-block__note">One price for the event, whatever the hire length.</p>
            ) : (
              <table className="price-table">
                <caption className="visually-hidden">Price by hire length</caption>
                <tbody>
                  {hireLengths.map((h) => (
                    <tr key={h.id}>
                      <th scope="row">{h.label}</th>
                      <td className="num">{money(product.dayRate * h.multiplier)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {product.capacity && <p className="price-block__cap">{product.capacity}</p>}
          </div>

          {product.colourPick && (
            <fieldset className="swatches">
              <legend>Colour</legend>
              <p className="swatches__note muted">
                Showing {colourName ? colourPhrase(colourName) : "this colour"}. We can change colours through the night too.
              </p>
              <div className="swatches__row">
                {lightColours.map((c) => (
                  <label key={c.hex} className="swatch" style={{ ["--swatch" as string]: c.hex }}>
                    <input type="radio" name="colour" value={c.hex} checked={colour === c.hex} onChange={() => setColour(c.hex)} />
                    <span className="visually-hidden">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="buy-row">
            <div className="field">
              <span className="label" id="qty-label">
                Quantity
              </span>
              <div className="stepper" role="group" aria-labelledby="qty-label">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One fewer">
                  −
                </button>
                <output aria-live="polite">{qty}</output>
                <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="One more">
                  +
                </button>
              </div>
            </div>
            <button type="button" className="btn btn-primary buy-row__add" onClick={onAdd}>
              <span key={justAdded ? "added" : "add"} className="swap-in">
                {justAdded ? "Added to booking" : "Add to booking"}
              </span>
            </button>
          </div>

          <ul className="assurances">
            <li>{product.crewed ? "Our engineer or operator is included." : product.dryHire ? "Collect it yourself, or we deliver and set up." : "Delivered and set up by our crew."}</li>
            <li>We confirm availability and a fixed price before you pay anything.</li>
          </ul>
        </div>
      </div>

      <div className="wrap pdp__details">
        <section aria-labelledby="about-title" className="pdp__about">
          <h2 id="about-title">About this kit</h2>
          {product.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
          <h3>Good for</h3>
          <ul className="tags">
            {product.goodFor.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="box-title">
          <h2 id="box-title">What you get</h2>
          <ul className="box-list">
            {product.inTheBox.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="spec-title">
          <h2 id="spec-title">Specifications</h2>
          <dl className="specs">
            {product.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {related.length > 0 && (
        <section className="section pdp__related" aria-labelledby="related-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="related-title">More {cat.label.toLowerCase()} hire</h2>
              <Link to={`/hire?category=${product.category}`} className="text-link">
                See all {cat.label.toLowerCase()}
              </Link>
            </div>
            <div className="tile-grid">
              {related.map((p) => (
                <ProductTile key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
