export const FONT_FAMILIES = ["system", "geist", "noto-serif", "inter", "roboto", "open-sans", "lato", "montserrat", "poppins", "merriweather", "playfair-display", "serif", "monospace"] as const;
export type FontFamily = (typeof FONT_FAMILIES)[number];

export const SPACING_TOKENS = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const;
export type SpacingToken = (typeof SPACING_TOKENS)[number];

export const COLOR_TOKENS = THEME_COLOR_TOKENS;
export type ColorToken = ThemeColorToken;

export const GRADIENT_TOKENS = THEME_GRADIENT_TOKENS;
export type GradientToken = ThemeGradientToken;
export type BackgroundToken = ColorToken | GradientToken;

export const TYPOGRAPHY_SIZES = [
  "13px",
  "sm",
  "15px",
  "base",
  "lg",
  "xl",
  "2xl",
  "30px",
  "4xl",
  "6xl",
] as const;
export type TypographySize = (typeof TYPOGRAPHY_SIZES)[number];

export const TYPOGRAPHY_WEIGHTS = [
  "normal",
  "medium",
  "semibold",
  "bold",
] as const;
export type TypographyWeight = (typeof TYPOGRAPHY_WEIGHTS)[number];

export const TEXT_ALIGNMENTS = ["left", "center", "right"] as const;
export type TextAlignment = (typeof TEXT_ALIGNMENTS)[number];

export const TRACKING_TOKENS = ["tight", "normal", "wide"] as const;
export type TrackingToken = (typeof TRACKING_TOKENS)[number];

export const LEADING_TOKENS = ["tight", "snug", "normal", "relaxed"] as const;
export type LeadingToken = (typeof LEADING_TOKENS)[number];

export const RADIUS_TOKENS = [
  "none",
  "sm",
  "md",
  "lg",
  "xl",
  "3xl",
  "full",
] as const;
export type RadiusToken = (typeof RADIUS_TOKENS)[number];

export const BORDER_WIDTHS = ["none", "hairline", "thin"] as const;
export type BorderWidthToken = (typeof BORDER_WIDTHS)[number];

export const SHADOW_TOKENS = ["none", "sm", "md", "lg", "xl"] as const;
export type ShadowToken = (typeof SHADOW_TOKENS)[number];

export const WIDTH_TOKENS = ["auto", "full", "fit", "10rem", "15rem", "20rem", "30rem", "40rem", "60rem", "25%", "33%", "50%", "66%", "75%", "160px", "240px", "320px", "480px", "640px", "960px"] as const;
export type WidthToken = (typeof WIDTH_TOKENS)[number];

export const HEIGHT_TOKENS = [
  "auto",
  "full",
  "compact",
  "medium",
  "tall",
  "opening-screen",
  "full-viewport",
  "4rem", "7.5rem", "10rem", "15rem", "20rem", "30rem", "40rem", "50rem", "60rem",
  "64px", "120px", "160px", "240px", "320px", "480px", "640px", "800px", "960px",
  "25vh", "50vh", "75vh", "100vh",
] as const;
export type HeightToken = (typeof HEIGHT_TOKENS)[number];

export const MAX_WIDTH_TOKENS = [
  "none",
  "full",
  "xs",
  "3xl",
  "5xl",
  "7xl",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "4xl",
  "6xl",
] as const;
export type MaxWidthToken = (typeof MAX_WIDTH_TOKENS)[number];

export const SIZING_ALIGNS = ["start", "center", "end"] as const;
export type SizingAlignToken = (typeof SIZING_ALIGNS)[number];

export const OBJECT_FITS = ["cover", "contain"] as const;
export type ObjectFitToken = (typeof OBJECT_FITS)[number];

export const OBJECT_POSITIONS = ["center", "top", "right", "bottom", "left"] as const;
export type ObjectPositionToken = (typeof OBJECT_POSITIONS)[number];

export interface ImageFilterSpec {
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  saturation?: number;
}

export const CUSTOM_LENGTH_PATTERN = /^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%|vh|vw|vmin|vmax|ch))$/i;

export function isSafeCustomLength(value: string): boolean {
  return CUSTOM_LENGTH_PATTERN.test(value.trim());
}

export interface CustomDimensionSpec {
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  gap?: string;
  borderRadius?: string;
  borderWidth?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
}

export const POSITION_TOKENS = ["static", "relative", "sticky"] as const;
export type PositionToken = (typeof POSITION_TOKENS)[number];

export interface PositioningSpec {
  position?: PositionToken;
  top?: SpacingToken;
}

export interface StyleSpec {
  spacing?: {
    padding?: SpacingToken;
    margin?: SpacingToken;
    gap?: SpacingToken;
    paddingX?: SpacingToken;
    paddingY?: SpacingToken;
    paddingTop?: SpacingToken;
    paddingRight?: SpacingToken;
    paddingBottom?: SpacingToken;
    paddingLeft?: SpacingToken;
    marginX?: SpacingToken;
    marginY?: SpacingToken;
    marginTop?: SpacingToken;
    marginRight?: SpacingToken;
    marginBottom?: SpacingToken;
    marginLeft?: SpacingToken;

  };
  color?: { text?: ColorToken; background?: BackgroundToken };
  textPaint?: ColorValue | GradientPaint;
  background?: BackgroundLayer[];
  typography?: {
    family?: FontFamily;
    size?: TypographySize;
    weight?: TypographyWeight;
    align?: TextAlignment;
    tracking?: TrackingToken;
    leading?: LeadingToken;
  };
  border?: {
    radius?: RadiusToken;

    topLeftRadius?: RadiusToken;
    topRightRadius?: RadiusToken;
    bottomLeftRadius?: RadiusToken;
    bottomRightRadius?: RadiusToken;

    width?: BorderWidthToken;
    color?: ColorToken;
    shadow?: ShadowToken;
  };
  sizing?: {
    width?: WidthToken;
    height?: HeightToken;
    scaleFromHeight?: HeightToken;
    maxWidth?: MaxWidthToken;
    align?: SizingAlignToken;
    fit?: ObjectFitToken;
    objectPosition?: ObjectPositionToken;
  };
  positioning?: PositioningSpec;
  transform?: { rotate?: number };
  media?: { opacity?: number; filters?: ImageFilterSpec };
  custom?: CustomDimensionSpec;
}

export function isGradientToken(
  value: BackgroundToken,
): value is GradientToken {
  return (GRADIENT_TOKENS as readonly string[]).includes(value);
}
import type { BackgroundLayer, ColorValue, GradientPaint } from "./paint";
import {
  THEME_COLOR_TOKENS,
  THEME_GRADIENT_TOKENS,
  type ThemeColorToken,
  type ThemeGradientToken,
} from "../theme/types";
