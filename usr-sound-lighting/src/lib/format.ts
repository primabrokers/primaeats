import { useEffect } from "react";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export const money = (n: number) => gbp.format(Math.round(n));

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | USR Sound & Lighting` : "USR Sound & Lighting — event sound, lighting and staging hire in Manchester";
  }, [title]);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
