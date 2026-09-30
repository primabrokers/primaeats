/** Read a colour token from tokens.css so the 3D scenes share the site palette. */
export function cssVar(name: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export const gel = {
  beam: () => cssVar("--beam-brand", "#9d55ff"),
  brand: () => cssVar("--brand", "#7b2fc4"),
  sound: () => cssVar("--gel-sound", "#5ec8ff"),
  staging: () => cssVar("--gel-staging", "#ff5cc8"),
  effects: () => cssVar("--gel-effects", "#ece4fb"),
  bg: () => cssVar("--bg", "#1b1b1f"),
  text: () => cssVar("--text", "#f6f4f8"),
};
