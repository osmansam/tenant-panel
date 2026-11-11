import type { ColorToken } from "./styles";

export type ColorValue =
  | { kind: "token"; value: ColorToken }
  | { kind: "custom"; value: string };

export interface GradientStop {
  color: ColorValue;
  position: number;
}

export type GradientPaint =
  | { kind: "linear-gradient"; angle: number; stops: GradientStop[] }
  | { kind: "radial-gradient"; shape: "circle" | "ellipse"; stops: GradientStop[] };

export type BackgroundLayer =
  | { kind: "solid"; color: ColorValue; opacity?: number }
  | (GradientPaint & { opacity?: number })
  | {
      kind: "image";
      src: string;
      fit: "cover" | "contain" | "fill";
      position: "center" | "top" | "right" | "bottom" | "left";
      repeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
      opacity?: number;
    }
  | {
      kind: "video";
      src: string;
      fit: "cover" | "contain";
      position: "center" | "top" | "right" | "bottom" | "left";
      muted: true;
      loop: true;
      opacity?: number;
    }
  | {
      kind: "svg";
      src: string;
      fit: "cover" | "contain" | "fill";
      position: "center" | "top" | "right" | "bottom" | "left";
      opacity?: number;
    };

const HEX_COLOR = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const RGB_COLOR = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i;
const HSL_COLOR = /^hsla?\(\s*(?:\d{1,3}(?:\.\d+)?)\s*,\s*(?:\d{1,3}(?:\.\d+)?)%\s*,\s*(?:\d{1,3}(?:\.\d+)?)%(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i;

export function isSafeCustomColor(value: string): boolean {
  return HEX_COLOR.test(value.trim()) || RGB_COLOR.test(value.trim()) || HSL_COLOR.test(value.trim());
}
