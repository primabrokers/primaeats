import { brand } from "../brand";

export function Logo({ height = 40, className }: { height?: number; className?: string }) {
  const width = Math.round((height * brand.logo.width) / brand.logo.height);
  return <img src={brand.logo.src} alt={brand.logo.alt} width={width} height={height} className={className} />;
}
