/** Read a colour token from tokens.css so the 3D scenes share the site palette. */
export function cssVar(name: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Logo colours for the 3D scenes. */
export const gel = {
  beam: () => cssVar("--beam-brand", "#9a4de0"),
  white: () => cssVar("--beam-white", "#f2eef6"),
  top: () => cssVar("--brand-top", "#c589e3"),
  brand: () => cssVar("--brand", "#7a38b3"),
  bg: () => cssVar("--bg", "#333333"),
  bgDeep: () => cssVar("--bg-deep", "#2a2a2a"),
  text: () => cssVar("--text", "#f5f5f5"),
};
