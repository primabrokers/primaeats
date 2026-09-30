import { brand } from "../brand";

export function Logo({ height = 40, className }: { height?: number; className?: string }) {
  return <img src={brand.logo.src} alt={brand.logo.alt} height={height} style={{ height, width: "auto" }} className={className} />;
}
