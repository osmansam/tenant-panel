import type {
  ResolvedSiteTheme,
  ResolvedThemePalette,
  SiteTheme,
  ThemeGradientSet,
  ThemePaletteName,
} from "./types";

const light: ResolvedThemePalette = {
  background: "#ffffff",
  surface: "#ffffff",
  "surface-muted": "#f1f5f9",
  text: "#020617",
  "text-muted": "#475569",
  primary: "#0f766e",
  "primary-foreground": "#ffffff",
  secondary: "#e2e8f0",
  "secondary-foreground": "#0f172a",
  accent: "#f59e0b",
  "accent-foreground": "#1c1917",
  border: "#cbd5e1",
  input: "#e2e8f0",
  ring: "#0f766e",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  "surface-sunken": "#f8fafc",
  "primary-deep": "#115e59",
  "primary-soft": "#ccfbf1",
  "accent-soft": "#fef3c7",
  "text-subtle": "#94a3b8",
  inverse: "#ffffff",
  "inverse-muted": "#cbd5e1",
};

const dark: ResolvedThemePalette = {
  background: "#09090b",
  surface: "#18181b",
  "surface-muted": "#27272a",
  text: "#fafafa",
  "text-muted": "#a1a1aa",
  primary: "#2dd4bf",
  "primary-foreground": "#0f172a",
  secondary: "#27272a",
  "secondary-foreground": "#fafafa",
  accent: "#fbbf24",
  "accent-foreground": "#1c1917",
  border: "#3f3f46",
  input: "#27272a",
  ring: "#2dd4bf",
  success: "#4ade80",
  warning: "#fbbf24",
  danger: "#f87171",
  "surface-sunken": "#09090b",
  "primary-deep": "#0d9488",
  "primary-soft": "#134e4a",
  "accent-soft": "#78350f",
  "text-subtle": "#71717a",
  inverse: "#09090b",
  "inverse-muted": "#27272a",
};

const gradients = (palette: ThemePaletteName): ThemeGradientSet => ({
  "gradient-primary": {
    kind: "linear-gradient",
    angle: 135,
    stops: [
      { color: { kind: "token", value: "primary" }, position: 0 },
      { color: { kind: "token", value: palette === "light" ? "primary-deep" : "accent" }, position: 100 },
    ],
  },
  "gradient-hero": {
    kind: "linear-gradient",
    angle: 135,
    stops: [
      { color: { kind: "token", value: "background" }, position: 0 },
      { color: { kind: "token", value: "primary-deep" }, position: 100 },
    ],
  },
  "gradient-surface": {
    kind: "linear-gradient",
    angle: 180,
    stops: [
      { color: { kind: "token", value: "surface" }, position: 0 },
      { color: { kind: "token", value: "surface-muted" }, position: 100 },
    ],
  },
});

export const DEFAULT_SITE_THEME: ResolvedSiteTheme = {
  version: 1,
  defaultMode: "system",
  palettes: { light, dark },
  gradients: { light: gradients("light"), dark: gradients("dark") },
};

export function resolveSiteTheme(theme: SiteTheme | undefined): ResolvedSiteTheme {
  const source = theme ?? DEFAULT_SITE_THEME;
  return {
    version: 1,
    defaultMode: source.defaultMode,
    palettes: {
      light: { ...DEFAULT_SITE_THEME.palettes.light, ...source.palettes.light },
      dark: { ...DEFAULT_SITE_THEME.palettes.dark, ...source.palettes.dark },
    },
    gradients: {
      light: structuredClone(source.gradients.light),
      dark: structuredClone(source.gradients.dark),
    },
  };
}
