export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME_PALETTE_NAMES = ["light", "dark"] as const;
export type ThemePaletteName = (typeof THEME_PALETTE_NAMES)[number];

export const CANONICAL_THEME_COLOR_TOKENS = [
  "background",
  "surface",
  "surface-muted",
  "text",
  "text-muted",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "ring",
  "success",
  "warning",
  "danger",
] as const;
export type CanonicalThemeColorToken = (typeof CANONICAL_THEME_COLOR_TOKENS)[number];

export const LEGACY_THEME_COLOR_TOKENS = [
  "surface-sunken",
  "primary-deep",
  "primary-soft",
  "accent-soft",
  "text-subtle",
  "inverse",
  "inverse-muted",
] as const;
export type LegacyThemeColorToken = (typeof LEGACY_THEME_COLOR_TOKENS)[number];

export const THEME_COLOR_TOKENS = [
  "transparent",
  ...CANONICAL_THEME_COLOR_TOKENS,
  ...LEGACY_THEME_COLOR_TOKENS,
] as const;
export type ThemeColorToken = (typeof THEME_COLOR_TOKENS)[number];
export type EditableThemeColorToken = Exclude<ThemeColorToken, "transparent">;

export const THEME_GRADIENT_TOKENS = [
  "gradient-primary",
  "gradient-hero",
  "gradient-surface",
] as const;
export type ThemeGradientToken = (typeof THEME_GRADIENT_TOKENS)[number];

export type ThemeColorValue =
  | { kind: "token"; value: ThemeColorToken }
  | { kind: "custom"; value: string };

export interface ThemeGradientStop {
  color: ThemeColorValue;
  position: number;
}

export type ThemeGradient =
  | { kind: "linear-gradient"; angle: number; stops: ThemeGradientStop[] }
  | { kind: "radial-gradient"; shape: "circle" | "ellipse"; stops: ThemeGradientStop[] };

export type ThemePalette = Record<CanonicalThemeColorToken, string>
  & Partial<Record<LegacyThemeColorToken, string>>;
export type ResolvedThemePalette = Record<EditableThemeColorToken, string>;
export type ThemeGradientSet = Record<ThemeGradientToken, ThemeGradient>;

export interface SiteTheme {
  version: 1;
  defaultMode: ThemeMode;
  palettes: Record<ThemePaletteName, ThemePalette>;
  gradients: Record<ThemePaletteName, ThemeGradientSet>;
}

export interface ResolvedSiteTheme extends Omit<SiteTheme, "palettes"> {
  palettes: Record<ThemePaletteName, ResolvedThemePalette>;
}

export interface ThemeValidationIssue {
  path: string;
  code: string;
  message: string;
}

export type ThemeValidationResult<T> =
  | { success: true; value: T; issues: [] }
  | { success: false; issues: ThemeValidationIssue[] };
