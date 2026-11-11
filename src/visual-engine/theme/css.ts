import { resolveSiteTheme } from "./defaults";
import {
  THEME_COLOR_TOKENS,
  THEME_GRADIENT_TOKENS,
  type ResolvedSiteTheme,
  type SiteTheme,
  type ThemeColorToken,
  type ThemeColorValue,
  type ThemeGradient,
  type ThemePaletteName,
} from "./types";

const SAFE_SCOPE_ID = /^[A-Za-z0-9_-]+$/;

export function themeColorVariable(token: ThemeColorToken): `--theme-${ThemeColorToken}` {
  return `--theme-${token}`;
}

export function themeColorCss(color: ThemeColorValue): string {
  if (color.kind === "custom") return color.value.trim();
  return color.value === "transparent" ? "transparent" : `var(${themeColorVariable(color.value)})`;
}

export function themeGradientCss(gradient: ThemeGradient): string {
  const stops = gradient.stops
    .map((stop) => `${themeColorCss(stop.color)} ${stop.position}%`)
    .join(", ");
  return gradient.kind === "linear-gradient"
    ? `linear-gradient(${gradient.angle}deg, ${stops})`
    : `radial-gradient(${gradient.shape}, ${stops})`;
}

export function themeCssVariables(
  theme: SiteTheme | ResolvedSiteTheme,
  palette: ThemePaletteName,
): Record<string, string> {
  const resolved = resolveSiteTheme(theme);
  const variables: Record<string, string> = {};
  for (const token of THEME_COLOR_TOKENS) {
    if (token !== "transparent") variables[themeColorVariable(token)] = resolved.palettes[palette][token];
  }
  for (const token of THEME_GRADIENT_TOKENS) {
    variables[`--theme-${token}`] = themeGradientCss(resolved.gradients[palette][token]);
  }
  return variables;
}

export function serializeSiteThemeCss(
  theme: SiteTheme | ResolvedSiteTheme | undefined,
  scopeId: string,
): string {
  if (!SAFE_SCOPE_ID.test(scopeId)) throw new Error("Theme scope must contain only letters, numbers, underscores, or hyphens");
  const resolved = resolveSiteTheme(theme);
  const scope = `[data-theme-scope="${scopeId}"]`;
  const light = `${declarations(themeCssVariables(resolved, "light"))}background-color:var(--theme-background);color:var(--theme-text);color-scheme:light;`;
  const dark = `${declarations(themeCssVariables(resolved, "dark"))}background-color:var(--theme-background);color:var(--theme-text);color-scheme:dark;`;
  return [
    `${scope}{${light}}`,
    `${scope}[data-default-mode="dark"]{${dark}}`,
    `@media (prefers-color-scheme: dark){${scope}[data-default-mode="system"]{${dark}}}`,
    `html[data-theme="light"] ${scope}{${light}}`,
    `html[data-theme="dark"] ${scope}{${dark}}`,
    `html ${scope}[data-theme="light"]{${light}}`,
    `html ${scope}[data-theme="dark"]{${dark}}`,
  ].join("\n");
}

function declarations(variables: Record<string, string>): string {
  return Object.entries(variables).map(([name, value]) => `${name}:${value};`).join("");
}
