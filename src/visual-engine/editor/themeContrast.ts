import type { SiteTheme, ThemePaletteName } from "../theme";

export interface ThemeContrastWarning {
  id: "text-background" | "text-surface" | "primary-foreground-primary" | "ring-background";
  foreground: string;
  background: string;
  ratio: number;
  minimum: number;
  message: string;
}

const PAIRS = [
  { id: "text-background", foreground: "text", background: "background", minimum: 4.5 },
  { id: "text-surface", foreground: "text", background: "surface", minimum: 4.5 },
  { id: "primary-foreground-primary", foreground: "primary-foreground", background: "primary", minimum: 4.5 },
  { id: "ring-background", foreground: "ring", background: "background", minimum: 3 },
] as const;

export function contrastRatio(foreground: string, background: string): number | null {
  const first = parseOpaqueColor(foreground);
  const second = parseOpaqueColor(background);
  if (first === null || second === null) return null;
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

export function themeContrastWarnings(theme: SiteTheme, palette: ThemePaletteName): ThemeContrastWarning[] {
  const values = theme.palettes[palette];
  return PAIRS.flatMap((pair) => {
    const ratio = contrastRatio(values[pair.foreground], values[pair.background]);
    if (ratio === null || ratio >= pair.minimum) return [];
    return [{
      ...pair,
      ratio,
      message: `${label(pair.foreground)} on ${label(pair.background)} has ${ratio.toFixed(2)}:1 contrast; ${pair.minimum}:1 is recommended.`,
    }];
  });
}

function parseOpaqueColor(value: string): [number, number, number] | null {
  const text = value.trim();
  const hex = text.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].split("").map((part) => part + part).join("") : hex[1];
    return [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16)) as [number, number, number];
  }
  const rgb = text.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgb) {
    const values = rgb.slice(1).map(Number);
    return values.every((part) => part >= 0 && part <= 255) ? values as [number, number, number] : null;
  }
  const hsl = text.match(/^hsl\(\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)%\s*,\s*(\d{1,3}(?:\.\d+)?)%\s*\)$/i);
  if (!hsl) return null;
  const hue = Number(hsl[1]);
  const saturation = Number(hsl[2]);
  const lightness = Number(hsl[3]);
  if (hue > 360 || saturation > 100 || lightness > 100) return null;
  return hslToRgb(hue, saturation / 100, lightness / 100);
}

function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = (hue % 360) / 60;
  const x = chroma * (1 - Math.abs((segment % 2) - 1));
  const [red, green, blue] = segment < 1 ? [chroma, x, 0]
    : segment < 2 ? [x, chroma, 0]
      : segment < 3 ? [0, chroma, x]
        : segment < 4 ? [0, x, chroma]
          : segment < 5 ? [x, 0, chroma]
            : [chroma, 0, x];
  const match = lightness - chroma / 2;
  return [red, green, blue].map((part) => Math.round((part + match) * 255)) as [number, number, number];
}

function luminance(color: [number, number, number]): number {
  const channels = color.map((part) => {
    const value = part / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function label(value: string): string {
  return value.replace(/-/g, " ");
}
