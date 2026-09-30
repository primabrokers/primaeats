import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, productImage, type Product } from "../data/catalogue";
import { money } from "../lib/format";
import { useBooking } from "../store/booking";
import "./ProductTile.css";

export function ProductTile({ product, headingLevel = 3 }: { product: Product; headingLevel?: 2 | 3 }) {
  const add = useBooking((s) => s.add);
  const cat = categories[product.category];
  const [imgOk, setImgOk] = useState(true);
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="tile" style={{ ["--gel" as string]: cat.gel }}>
      <Link to={`/hire/${product.slug}`} className="tile__media" tabIndex={-1} aria-hidden>
        {imgOk ? (
          <img src={productImage(product)} alt="" loading="lazy" width={800} height={600} onError={() => setImgOk(false)} />
        ) : (
          <span className="tile__placeholder">{cat.label}</span>
        )}
      </Link>
      <div className="tile__body">
        <span className="gel" style={{ ["--gel" as string]: cat.gel }}>
          {cat.label}
        </span>
        <H className="tile__title">
          <Link to={`/hire/${product.slug}`}>{product.name}</Link>
        </H>
        <p className="tile__summary">{product.summary}</p>
        <div className="tile__foot">
          <p className="tile__price">
            <strong className="num">{money(product.dayRate)}</strong>
            <span className="muted"> {product.unit ?? "per day"}</span>
          </p>
          <button
            type="button"
            className="btn btn-small"
            onClick={() => add({ kind: "product", slug: product.slug, qty: 1 })}
            aria-label={`Add ${product.name} to booking`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
