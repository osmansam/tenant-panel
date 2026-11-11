import { isSafeCustomColor } from "../model/paint";
import {
  CANONICAL_THEME_COLOR_TOKENS,
  LEGACY_THEME_COLOR_TOKENS,
  THEME_COLOR_TOKENS,
  THEME_GRADIENT_TOKENS,
  THEME_MODES,
  THEME_PALETTE_NAMES,
  type SiteTheme,
  type ThemeColorValue,
  type ThemeGradient,
  type ThemeGradientSet,
  type ThemePalette,
  type ThemePaletteName,
  type ThemeValidationIssue,
  type ThemeValidationResult,
} from "./types";

const paletteKeys = [...CANONICAL_THEME_COLOR_TOKENS, ...LEGACY_THEME_COLOR_TOKENS] as const;

export function parseSiteTheme(input: unknown, path = "$"): ThemeValidationResult<SiteTheme> {
  const issues: ThemeValidationIssue[] = [];
  if (!isRecord(input)) return failure(path, "theme.object_required", "Theme must be an object");
  rejectUnknown(input, ["version", "defaultMode", "palettes", "gradients"], path, issues);
  if (input.version !== 1) issues.push(issue(`${path}.version`, "theme.version_invalid", "Theme version must be 1"));
  if (!THEME_MODES.includes(input.defaultMode as never)) issues.push(issue(`${path}.defaultMode`, "theme.mode_invalid", "Theme mode is not supported"));

  const palettes = parsePalettes(input.palettes, `${path}.palettes`, issues);
  const gradients = parseGradients(input.gradients, `${path}.gradients`, issues);
  if (issues.length > 0 || !palettes || !gradients) return { success: false, issues };
  return {
    success: true,
    value: {
      version: 1,
      defaultMode: input.defaultMode as SiteTheme["defaultMode"],
      palettes,
      gradients,
    },
    issues: [],
  };
}

function parsePalettes(input: unknown, path: string, issues: ThemeValidationIssue[]): SiteTheme["palettes"] | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "theme.palettes_required", "Light and dark palettes are required"));
    return undefined;
  }
  rejectUnknown(input, THEME_PALETTE_NAMES, path, issues);
  const parsed = {} as Record<ThemePaletteName, ThemePalette>;
  for (const name of THEME_PALETTE_NAMES) {
    const value = input[name];
    const palettePath = `${path}.${name}`;
    if (!isRecord(value)) {
      issues.push(issue(palettePath, "theme.palette_required", `${name} palette is required`));
      continue;
    }
    rejectUnknown(value, paletteKeys, palettePath, issues);
    const palette: Partial<Record<(typeof paletteKeys)[number], string>> = {};
    for (const token of CANONICAL_THEME_COLOR_TOKENS) {
      if (!(token in value)) {
        issues.push(issue(`${palettePath}.${token}`, "theme.token_required", `${token} is required`));
        continue;
      }
      parsePaletteColor(value[token], `${palettePath}.${token}`, token, palette, issues);
    }
    for (const token of LEGACY_THEME_COLOR_TOKENS) {
      if (token in value) parsePaletteColor(value[token], `${palettePath}.${token}`, token, palette, issues);
    }
    parsed[name] = palette as ThemePalette;
  }
  return parsed.light && parsed.dark ? parsed : undefined;
}

function parsePaletteColor(
  value: unknown,
  path: string,
  token: (typeof paletteKeys)[number],
  palette: Partial<Record<(typeof paletteKeys)[number], string>>,
  issues: ThemeValidationIssue[],
): void {
  if (typeof value !== "string" || !isSafeCustomColor(value)) {
    issues.push(issue(path, "theme.color_invalid", "Theme colors must use a safe HEX, RGB, RGBA, HSL, or HSLA value"));
    return;
  }
  palette[token] = value.trim();
}

function parseGradients(input: unknown, path: string, issues: ThemeValidationIssue[]): SiteTheme["gradients"] | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "theme.gradients_required", "Light and dark gradients are required"));
    return undefined;
  }
  rejectUnknown(input, THEME_PALETTE_NAMES, path, issues);
  const parsed = {} as Record<ThemePaletteName, ThemeGradientSet>;
  for (const name of THEME_PALETTE_NAMES) {
    const value = input[name];
    const gradientPath = `${path}.${name}`;
    if (!isRecord(value)) {
      issues.push(issue(gradientPath, "theme.gradients_required", `${name} gradients are required`));
      continue;
    }
    rejectUnknown(value, THEME_GRADIENT_TOKENS, gradientPath, issues);
    const set = {} as ThemeGradientSet;
    for (const token of THEME_GRADIENT_TOKENS) {
      if (!(token in value)) {
        issues.push(issue(`${gradientPath}.${token}`, "theme.gradient_required", `${token} is required`));
        continue;
      }
      const gradient = parseGradient(value[token], `${gradientPath}.${token}`, issues);
      if (gradient) set[token] = gradient;
    }
    parsed[name] = set;
  }
  return parsed.light && parsed.dark ? parsed : undefined;
}

function parseGradient(input: unknown, path: string, issues: ThemeValidationIssue[]): ThemeGradient | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "theme.gradient_invalid", "Theme gradient must be an object"));
    return undefined;
  }
  const linear = input.kind === "linear-gradient";
  const radial = input.kind === "radial-gradient";
  if (!linear && !radial) issues.push(issue(`${path}.kind`, "theme.gradient_invalid", "Gradient kind is not supported"));
  rejectUnknown(input, linear ? ["kind", "angle", "stops"] : ["kind", "shape", "stops"], path, issues);
  if (linear && (typeof input.angle !== "number" || !Number.isFinite(input.angle) || input.angle < 0 || input.angle > 360)) {
    issues.push(issue(`${path}.angle`, "theme.gradient_invalid", "Gradient angle must be between 0 and 360"));
  }
  if (radial && input.shape !== "circle" && input.shape !== "ellipse") {
    issues.push(issue(`${path}.shape`, "theme.gradient_invalid", "Radial gradient shape is not supported"));
  }
  const stops = parseStops(input.stops, `${path}.stops`, issues);
  if (!stops || (!linear && !radial)) return undefined;
  return linear
    ? { kind: "linear-gradient", angle: input.angle as number, stops }
    : { kind: "radial-gradient", shape: input.shape as "circle" | "ellipse", stops };
}

function parseStops(input: unknown, path: string, issues: ThemeValidationIssue[]): ThemeGradient["stops"] | undefined {
  if (!Array.isArray(input) || input.length < 2) {
    issues.push(issue(path, "theme.gradient_invalid", "A theme gradient requires at least two stops"));
    return undefined;
  }
  let previous = -1;
  return input.map((entry, index) => {
    const stopPath = `${path}[${index}]`;
    if (!isRecord(entry)) {
      issues.push(issue(stopPath, "theme.gradient_invalid", "Gradient stop must be an object"));
      return { color: { kind: "custom" as const, value: "#000000" }, position: 0 };
    }
    rejectUnknown(entry, ["color", "position"], stopPath, issues);
    const position = entry.position;
    if (typeof position !== "number" || !Number.isFinite(position) || position < 0 || position > 100 || position < previous) {
      issues.push(issue(`${stopPath}.position`, "theme.gradient_invalid", "Gradient stops must be ordered from 0 to 100"));
    } else previous = position;
    return { color: parseColorValue(entry.color, `${stopPath}.color`, issues), position: typeof position === "number" ? position : 0 };
  });
}

function parseColorValue(input: unknown, path: string, issues: ThemeValidationIssue[]): ThemeColorValue {
  if (!isRecord(input)) {
    issues.push(issue(path, "theme.gradient_invalid", "Gradient color must be a token or custom color"));
    return { kind: "custom", value: "#000000" };
  }
  rejectUnknown(input, ["kind", "value"], path, issues);
  if (input.kind === "token" && typeof input.value === "string" && THEME_COLOR_TOKENS.includes(input.value as never)) {
    return { kind: "token", value: input.value as ThemeColorValue & never } as ThemeColorValue;
  }
  if (input.kind === "custom" && typeof input.value === "string" && isSafeCustomColor(input.value)) {
    return { kind: "custom", value: input.value.trim() };
  }
  issues.push(issue(path, "theme.gradient_invalid", "Gradient color is invalid"));
  return { kind: "custom", value: "#000000" };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function rejectUnknown(input: Record<string, unknown>, allowed: readonly string[], path: string, issues: ThemeValidationIssue[]): void {
  const valid = new Set(allowed);
  for (const key of Object.keys(input)) {
    if (!valid.has(key)) issues.push(issue(`${path}.${key}`, "theme.key_unknown", "Theme property is not supported"));
  }
}

function issue(path: string, code: string, message: string): ThemeValidationIssue {
  return { path, code, message };
}

function failure<T>(path: string, code: string, message: string): ThemeValidationResult<T> {
  return { success: false, issues: [issue(path, code, message)] };
}
