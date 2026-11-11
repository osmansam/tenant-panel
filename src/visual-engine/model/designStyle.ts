import {
  BORDER_WIDTHS, FONT_FAMILIES, LEADING_TOKENS, RADIUS_TOKENS, SHADOW_TOKENS,
  SPACING_TOKENS, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS,
  type BorderWidthToken, type FontFamily, type LeadingToken, type RadiusToken,
  type ShadowToken, type SpacingToken, type TypographySize, type TypographyWeight,
} from "./styles";
import {
  CANONICAL_THEME_COLOR_TOKENS, LEGACY_THEME_COLOR_TOKENS,
  type EditableThemeColorToken, type ThemePaletteName, type ThemeValidationResult,
  type ThemeValidationIssue,
} from "../theme/types";

export const DESIGN_PALETTE_IDS = ["original", "ocean", "forest", "plum", "ember", "rose", "slate"] as const;
export type DesignPaletteId = (typeof DESIGN_PALETTE_IDS)[number];
export const DESIGN_COLOR_TOKENS = [...CANONICAL_THEME_COLOR_TOKENS, ...LEGACY_THEME_COLOR_TOKENS] as const;

export interface DesignStyleOptions {
  palette?: DesignPaletteId;
  colors?: Partial<Record<ThemePaletteName, Partial<Record<EditableThemeColorToken, string>>>>;
  headingFont?: FontFamily;
  bodyFont?: FontFamily;
  headingSize?: TypographySize;
  bodySize?: TypographySize;
  headingWeight?: TypographyWeight;
  bodyLeading?: LeadingToken;
  buttonRadius?: RadiusToken;
  cardRadius?: RadiusToken;
  shadow?: ShadowToken;
  borderWidth?: BorderWidthToken;
  buttonPadding?: SpacingToken;
  cardPadding?: SpacingToken;
}

const tokenOptions = {
  palette: DESIGN_PALETTE_IDS, headingFont: FONT_FAMILIES, bodyFont: FONT_FAMILIES,
  headingSize: TYPOGRAPHY_SIZES, bodySize: TYPOGRAPHY_SIZES, headingWeight: TYPOGRAPHY_WEIGHTS,
  bodyLeading: LEADING_TOKENS, buttonRadius: RADIUS_TOKENS, cardRadius: RADIUS_TOKENS,
  shadow: SHADOW_TOKENS, borderWidth: BORDER_WIDTHS, buttonPadding: SPACING_TOKENS,
  cardPadding: SPACING_TOKENS,
} satisfies Record<Exclude<keyof DesignStyleOptions, "colors">, readonly string[]>;

function isRecord(input: unknown): input is Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return false;
  const prototype = Object.getPrototypeOf(input);
  return prototype === Object.prototype || prototype === null;
}

/** Strict portable settings: accepts no arbitrary CSS, unknown keys or unbounded values. */
export function parseDesignStyleOptions(input: unknown, path = "$"): ThemeValidationResult<DesignStyleOptions> {
  const issues: ThemeValidationIssue[] = [];
  const issue = (at: string, code: string, message: string) => issues.push({ path: at, code, message });
  if (!isRecord(input)) return { success: false, issues: [{ path, code: "invalid-type", message: "Expected a style settings object." }] };
  const value: Record<string, unknown> = {};
  for (const key of Object.keys(input)) {
    if (key === "colors") {
      if (!isRecord(input.colors)) { issue(`${path}.colors`, "invalid-type", "Expected light and dark color overrides."); continue; }
      const colors: NonNullable<DesignStyleOptions["colors"]> = {};
      for (const mode of Object.keys(input.colors)) {
        if (mode !== "light" && mode !== "dark") { issue(`${path}.colors.${mode}`, "unknown-key", "Unknown palette mode."); continue; }
        const raw = input.colors[mode];
        if (!isRecord(raw)) { issue(`${path}.colors.${mode}`, "invalid-type", "Expected semantic color overrides."); continue; }
        const overrides: Partial<Record<EditableThemeColorToken, string>> = {};
        for (const token of Object.keys(raw)) {
          if (!(DESIGN_COLOR_TOKENS as readonly string[]).includes(token)) { issue(`${path}.colors.${mode}.${token}`, "unknown-key", "Unknown semantic color token."); continue; }
          const color = raw[token];
          if (typeof color !== "string" || !/^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(color)) issue(`${path}.colors.${mode}.${token}`, "invalid-color", "Use a #rgb or #rrggbb hexadecimal color.");
          else overrides[token as EditableThemeColorToken] = color;
        }
        colors[mode] = overrides;
      }
      value.colors = colors;
    } else if (Object.prototype.hasOwnProperty.call(tokenOptions, key)) {
      const allowed = tokenOptions[key as keyof typeof tokenOptions] as readonly string[];
      if (typeof input[key] !== "string" || !allowed.includes(input[key])) issue(`${path}.${key}`, "invalid-token", "Unknown style setting value.");
      else value[key] = input[key];
    } else issue(`${path}.${key}`, "unknown-key", "Unknown style setting.");
  }
  return issues.length ? { success: false, issues } : { success: true, value: value as DesignStyleOptions, issues: [] };
}
