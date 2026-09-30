import { useParams } from "react-router-dom";
import { ProductScene } from "../components/Scene";
import { categories, lightColours, productBySlug } from "../data/catalogue";

/**
 * Bare 3D render of one product on a transparent background.
 * `npm run renders` screenshots this route to make the catalogue thumbnails.
 */
export default function RenderModel() {
  const { slug = "" } = useParams();
  const product = productBySlug(slug);
  if (!product) return <p>Unknown product</p>;
  const colour = product.colourPick
    ? lightColours[0].hex
    : { sound: "#6cc4ff", lighting: "#ffa630", staging: "#ff5a9f", effects: "#b89dff" }[product.category];
  document.documentElement.style.background = "transparent";
  document.body.style.background = "transparent";
  return (
    <div style={{ position: "fixed", inset: 0 }} data-category={categories[product.category].label}>
      <ProductScene kind={product.model} colour={colour} cutout animate={false} autoRotate={false} interactive={false} fallback={null} />
    </div>
  );
}
