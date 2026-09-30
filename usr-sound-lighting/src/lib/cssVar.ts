/** Read a colour token from tokens.css so the 3D scenes share the site palette. */
export function cssVar(name: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export const gel = {
  amber: () => cssVar("--amber", "#ffa630"),
  steel: () => cssVar("--steel", "#6cc4ff"),
  rose: () => cssVar("--rose", "#ff5a9f"),
  lavender: () => cssVar("--lavender", "#b89dff"),
  congo: () => cssVar("--congo", "#10112e"),
  work: () => cssVar("--work", "#f1f3fa"),
};
