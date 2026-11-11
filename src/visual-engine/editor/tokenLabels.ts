import type { BackgroundToken } from "../model";
import { DEFAULT_SITE_THEME, themeGradientCss } from "../theme";
import { CANONICAL_THEME_COLOR_TOKENS, LEGACY_THEME_COLOR_TOKENS, THEME_GRADIENT_TOKENS, type ThemeGradientToken } from "../theme/types";

const SIZE_LABELS: Record<string, string> = {
  xs: "XS",
  sm: "SM",
  md: "MD",
  lg: "LG",
  xl: "XL",
  "2xl": "2XL",
  "3xl": "3XL",
  "5xl": "5XL",
  "7xl": "7XL",
  "4xl": "4XL",
  "6xl": "6XL",
  base: "Base",
};

/** Presentation-only label for a stored token value. Never changes the stored value. */
export function humanizeToken(token: string): string {
  if (/^[\d.]+rem$/.test(token)) return `${token.slice(0, -3)} rem`;
  if (/^\d+px$/.test(token)) return `${token.slice(0, -2)} px`;
  if (token === "geist") return "Geist";
  if (token === "noto-serif") return "Noto Serif";
  if (/^\d+vh$/.test(token)) return `${token.slice(0, -2)}% of viewport height`;
  const fontNames: Record<string, string> = { system: "System sans", inter: "Inter", roboto: "Roboto", "open-sans": "Open Sans", lato: "Lato", montserrat: "Montserrat", poppins: "Poppins", merriweather: "Merriweather", "playfair-display": "Playfair Display", serif: "System serif", monospace: "System monospace" };
  if (fontNames[token]) return fontNames[token];
  const size = SIZE_LABELS[token];
  if (size !== undefined) return size;
  const spaced = token.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Editor-only fallback swatches. Theme-aware controls replace these at runtime. */
const DEFAULT_GRADIENT_SWATCHES = Object.fromEntries(
  THEME_GRADIENT_TOKENS.map((token) => [token, themeGradientCss(DEFAULT_SITE_THEME.gradients.light[token])]),
) as Record<ThemeGradientToken, string>;

export const COLOR_SWATCHES: Record<BackgroundToken, string> = {
  transparent: "transparent",
  ...DEFAULT_SITE_THEME.palettes.light,
  ...DEFAULT_GRADIENT_SWATCHES,
};

export const COLOR_TOKEN_GROUPS = {
  semantic: CANONICAL_THEME_COLOR_TOKENS,
  legacy: LEGACY_THEME_COLOR_TOKENS,
  gradients: THEME_GRADIENT_TOKENS,
} as const;
