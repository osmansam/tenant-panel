import type { CustomDimensionSpec, FontFamily } from "../model/styles";
import type {
  BackgroundToken,
  BorderWidthToken,
  Breakpoint,
  ColorToken,
  ComponentNode,
  GradientToken,
  HeightToken,
  LayoutAlignment,
  LayoutDistribution,
  LeadingToken,
  MaxWidthToken,
  ObjectFitToken,
  ObjectPositionToken,
  RadiusToken,
  ShadowToken,
  SizingAlignToken,
  SpacingToken,
  StyleSpec,
  TextAlignment,
  TrackingToken,
  TypographySize,
  TypographyWeight,
  WidthToken,
  PositionToken,
} from "../model";
import { COLOR_TOKENS, GRADIENT_TOKENS, isGradientToken } from "../model";
import { isSafeCustomLength } from "../model/styles";
import type { CSSProperties } from "react";

/** Maps CustomDimensionSpec fields to safe React inline style properties. */
export function customDimensionStyles(custom: CustomDimensionSpec | undefined): CSSProperties | undefined {
  if (!custom) return undefined;
  const style: CSSProperties = {};
  if (custom.padding) style.padding = custom.padding;
  if (custom.margin) style.margin = custom.margin;
  if (custom.gap) style.gap = custom.gap;
  if (custom.borderRadius) style.borderRadius = custom.borderRadius;
  if (custom.borderWidth) style.borderWidth = custom.borderWidth;
  if (custom.width) style.width = custom.width;
  if (custom.height) style.height = custom.height;
  if (custom.maxWidth) style.maxWidth = custom.maxWidth;
  for (const key of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] as const) {
    const value = custom[key];
    if (value !== undefined && isSafeCustomLength(value)) style[key] = value;
  }
  if (Object.keys(style).length === 0) return undefined;
  return style;
}


export const FONT_FAMILY_CLASSES: Record<FontFamily, string> = {
  "system": "ve-font-system",
  "geist": "ve-font-geist",
  "noto-serif": "ve-font-noto-serif",
  "inter": "ve-font-inter",
  "roboto": "ve-font-roboto",
  "open-sans": "ve-font-open-sans",
  "lato": "ve-font-lato",
  "montserrat": "ve-font-montserrat",
  "poppins": "ve-font-poppins",
  "merriweather": "ve-font-merriweather",
  "playfair-display": "ve-font-playfair-display",
  "serif": "ve-font-serif",
  "monospace": "ve-font-monospace",
};

export const PADDING_CLASSES: Record<SpacingToken, string> = {
  none: "p-0",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
};

export const MARGIN_CLASSES: Record<SpacingToken, string> = {
  none: "m-0",
  xs: "m-1",
  sm: "m-2",
  md: "m-4",
  lg: "m-6",
  xl: "m-8",
  "2xl": "m-12",
};


const SIDE_SPACING_CLASSES = {
  pt: { "none": "pt-0", "xs": "pt-1", "sm": "pt-2", "md": "pt-4", "lg": "pt-6", "xl": "pt-8", "2xl": "pt-12" },
  pr: { "none": "pr-0", "xs": "pr-1", "sm": "pr-2", "md": "pr-4", "lg": "pr-6", "xl": "pr-8", "2xl": "pr-12" },
  pb: { "none": "pb-0", "xs": "pb-1", "sm": "pb-2", "md": "pb-4", "lg": "pb-6", "xl": "pb-8", "2xl": "pb-12" },
  pl: { "none": "pl-0", "xs": "pl-1", "sm": "pl-2", "md": "pl-4", "lg": "pl-6", "xl": "pl-8", "2xl": "pl-12" },
  mt: { "none": "mt-0", "xs": "mt-1", "sm": "mt-2", "md": "mt-4", "lg": "mt-6", "xl": "mt-8", "2xl": "mt-12" },
  mr: { "none": "mr-0", "xs": "mr-1", "sm": "mr-2", "md": "mr-4", "lg": "mr-6", "xl": "mr-8", "2xl": "mr-12" },
  mb: { "none": "mb-0", "xs": "mb-1", "sm": "mb-2", "md": "mb-4", "lg": "mb-6", "xl": "mb-8", "2xl": "mb-12" },
  ml: { "none": "ml-0", "xs": "ml-1", "sm": "ml-2", "md": "ml-4", "lg": "ml-6", "xl": "ml-8", "2xl": "ml-12" },
} as const;

function spacingClasses(spacing: StyleSpec["spacing"], kind: "margin" | "padding"): string[] {
  if (!spacing) return [];
  const sides = ["Top", "Right", "Bottom", "Left"] as const;
  const directional = ["X", "Y", ...sides].some((side) => spacing[`${kind}${side}` as keyof typeof spacing] !== undefined);
  const base = spacing[kind];
  if (!directional) return base === undefined ? [] : [(kind === "margin" ? MARGIN_CLASSES : PADDING_CLASSES)[base]];
  return sides.flatMap((side, index) => {
    const axis = side === "Left" || side === "Right" ? "X" : "Y";
    const value = spacing[`${kind}${side}`] ?? spacing[`${kind}${axis}`] ?? base;
    const prefix = `${kind === "margin" ? "m" : "p"}${["t", "r", "b", "l"][index]}` as keyof typeof SIDE_SPACING_CLASSES;
    return value === undefined ? [] : [SIDE_SPACING_CLASSES[prefix][value]];
  });
}

export const GAP_CLASSES: Record<SpacingToken, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

export const BACKGROUND_COLOR_CLASSES = tokenClassMap(COLOR_TOKENS, "ve-bg-");

export const BACKGROUND_GRADIENT_CLASSES = tokenClassMap(GRADIENT_TOKENS, "ve-bg-");

export const TEXT_COLOR_CLASSES = tokenClassMap(COLOR_TOKENS, "ve-text-");

export const BORDER_COLOR_CLASSES = tokenClassMap(COLOR_TOKENS, "ve-border-");

export const BORDER_WIDTH_CLASSES: Record<BorderWidthToken, string> = {
  none: "border-0",
  hairline: "border",
  thin: "border-2",
};

export const SHADOW_CLASSES: Record<ShadowToken, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export const TRACKING_CLASSES: Record<TrackingToken, string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
};

export const LEADING_CLASSES: Record<LeadingToken, string> = {
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

export const OBJECT_FIT_CLASSES: Record<ObjectFitToken, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

export const OBJECT_POSITION_CLASSES: Record<ObjectPositionToken, string> = {
  center: "object-center",
  top: "object-top",
  right: "object-right",
  bottom: "object-bottom",
  left: "object-left",
};

export const TYPOGRAPHY_SIZE_CLASSES: Record<TypographySize, string> = {
  "13px": "text-[13px]",
  "15px": "text-[15px]",
  "30px": "text-[30px]",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "4xl": "text-4xl",
  "6xl": "text-6xl",
};

export const TYPOGRAPHY_WEIGHT_CLASSES: Record<TypographyWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const TEXT_ALIGNMENT_CLASSES: Record<TextAlignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const RADIUS_CLASSES: Record<RadiusToken, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const CORNER_RADIUS_CLASSES = {
  topLeftRadius: { none: "rounded-tl-none", sm: "rounded-tl-sm", md: "rounded-tl-md", lg: "rounded-tl-lg", xl: "rounded-tl-xl", "3xl": "rounded-tl-3xl", full: "rounded-tl-full" },
  topRightRadius: { none: "rounded-tr-none", sm: "rounded-tr-sm", md: "rounded-tr-md", lg: "rounded-tr-lg", xl: "rounded-tr-xl", "3xl": "rounded-tr-3xl", full: "rounded-tr-full" },
  bottomLeftRadius: { none: "rounded-bl-none", sm: "rounded-bl-sm", md: "rounded-bl-md", lg: "rounded-bl-lg", xl: "rounded-bl-xl", "3xl": "rounded-bl-3xl", full: "rounded-bl-full" },
  bottomRightRadius: { none: "rounded-br-none", sm: "rounded-br-sm", md: "rounded-br-md", lg: "rounded-br-lg", xl: "rounded-br-xl", "3xl": "rounded-br-3xl", full: "rounded-br-full" },
} as const satisfies Record<"topLeftRadius" | "topRightRadius" | "bottomLeftRadius" | "bottomRightRadius", Record<RadiusToken, string>>;

export const WIDTH_CLASSES: Record<WidthToken, string> = {
  auto: "w-auto",
  full: "w-full",
  fit: "w-fit",
  "10rem": "w-[min(10rem,100%)]",
  "15rem": "w-[min(15rem,100%)]",
  "20rem": "w-[min(20rem,100%)]",
  "30rem": "w-[min(30rem,100%)]",
  "40rem": "w-[min(40rem,100%)]",
  "60rem": "w-[min(60rem,100%)]",

  "25%": "w-1/4", "33%": "w-1/3", "50%": "w-1/2", "66%": "w-2/3", "75%": "w-3/4",
  "160px": "w-[min(160px,100%)]",
  "240px": "w-[min(240px,100%)]",
  "320px": "w-[min(320px,100%)]",
  "480px": "w-[min(480px,100%)]",
  "640px": "w-[min(640px,100%)]",
  "960px": "w-[min(960px,100%)]",

};

export const HEIGHT_CLASSES: Record<HeightToken, string> = {
  auto: "h-auto",
  "4rem": "h-[4rem]",
  "7.5rem": "h-[7.5rem]",
  "10rem": "h-[10rem]",
  "15rem": "h-[15rem]",
  "20rem": "h-[20rem]",
  "30rem": "h-[30rem]",
  "40rem": "h-[40rem]",
  "50rem": "h-[50rem]",
  "60rem": "h-[60rem]",

  full: "h-full",
  compact: "min-h-[24rem]",
  medium: "min-h-[36rem]",
  tall: "min-h-[48rem]",
  "opening-screen": "min-h-[calc(100svh-5.5rem)]",
  "full-viewport": "min-h-screen",
  "64px": "h-[64px]",
  "120px": "h-[120px]",
  "160px": "h-[160px]",
  "240px": "h-[240px]",
  "320px": "h-[320px]",
  "480px": "h-[480px]",
  "640px": "h-[640px]",
  "800px": "h-[800px]",
  "960px": "h-[960px]",
  "25vh": "h-[25svh]",
  "50vh": "h-[50svh]",
  "75vh": "h-[75svh]",
  "100vh": "h-[100svh]",

};

export const MAX_WIDTH_CLASSES: Record<MaxWidthToken, string> = {
  none: "max-w-none",
  full: "max-w-full",
  xs: "max-w-xs",
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
};

export const BUTTON_HOVER_CLASSES = tokenClassMap(COLOR_TOKENS, "ve-hover-bg-");
const BUTTON_GRADIENT_HOVER_CLASSES: Record<GradientToken, string> = {
  "gradient-primary": "hover:brightness-110",
  "gradient-hero": "hover:brightness-110",
  "gradient-surface": "hover:brightness-110",
};

export const BUTTON_BASE_CLASSES = "items-center justify-center px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 ve-focus-ring";

export const HEADING_BASE_CLASSES = "tracking-tight leading-snug";
export const TEXT_BASE_CLASSES = "leading-relaxed";

export function buttonHoverClass(background: BackgroundToken | undefined): string {
  if (background === undefined) return BUTTON_HOVER_CLASSES.primary;
  return isGradientToken(background) ? BUTTON_GRADIENT_HOVER_CLASSES[background] : BUTTON_HOVER_CLASSES[background];
}

export function backgroundClass(background: BackgroundToken): string {
  return isGradientToken(background) ? BACKGROUND_GRADIENT_CLASSES[background] : BACKGROUND_COLOR_CLASSES[background];
}

function tokenClassMap<T extends string>(tokens: readonly T[], prefix: string): Record<T, string> {
  return Object.fromEntries(tokens.map((token) => [token, `${prefix}${token}`])) as Record<T, string>;
}

export const GRID_SPAN_CLASSES = {
  mobile: {
    1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 6: "col-span-6",
    7: "col-span-7", 8: "col-span-8", 9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12",
  },
  tablet: {
    1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 5: "md:col-span-5", 6: "md:col-span-6",
    7: "md:col-span-7", 8: "md:col-span-8", 9: "md:col-span-9", 10: "md:col-span-10", 11: "md:col-span-11", 12: "md:col-span-12",
  },
  desktop: {
    1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6",
    7: "lg:col-span-7", 8: "lg:col-span-8", 9: "lg:col-span-9", 10: "lg:col-span-10", 11: "lg:col-span-11", 12: "lg:col-span-12",
  },
} as const;

export const FLEX_DIRECTION_CLASSES = {
  row: "flex-row",
  column: "flex-col",
} as const;

export const FLEX_ALIGNMENT_CLASSES: Record<LayoutAlignment, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export const SIZING_ALIGNMENT_CLASSES: Record<SizingAlignToken, string> = {
  start: "mr-auto ml-0",
  center: "mx-auto",
  end: "ml-auto",
};

export const FLEX_DISTRIBUTION_CLASSES: Record<LayoutDistribution, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const DISPLAY_CLASSES = {
  block: { mobile: "block", tablet: "md:block", desktop: "lg:block" },
  flex: { mobile: "flex", tablet: "md:flex", desktop: "lg:flex" },
  grid: { mobile: "grid", tablet: "md:grid", desktop: "lg:grid" },
  "inline-flex": { mobile: "inline-flex", tablet: "md:inline-flex", desktop: "lg:inline-flex" },
} as const;

const HIDDEN_CLASSES: Record<Breakpoint, string> = {
  mobile: "hidden",
  tablet: "md:hidden",
  desktop: "lg:hidden",
};

export const POSITION_CLASSES: Record<PositionToken, string> = {
  static: "static",
  relative: "relative",
  sticky: "ve-sticky sticky self-start",
};

export const STICKY_TOP_CLASSES: Record<SpacingToken, string> = {
  none: "top-0 ve-sticky-top-none",
  xs: "top-2 ve-sticky-top-xs",
  sm: "top-4 ve-sticky-top-sm",
  md: "top-8 ve-sticky-top-md",
  lg: "top-16 ve-sticky-top-lg",
  xl: "top-20 ve-sticky-top-xl",
  "2xl": "top-24 ve-sticky-top-2xl",
};

function optionalClass(value: string | undefined): string[] {
  return value === undefined ? [] : [value];
}

export function styleClassNames(style: StyleSpec | undefined): string {
  if (style === undefined) return "";

  return [
    ...spacingClasses(style.spacing, "padding"),
    ...spacingClasses(style.spacing, "margin"),
    ...optionalClass(style.spacing?.gap === undefined ? undefined : GAP_CLASSES[style.spacing.gap]),
    ...optionalClass(style.color?.background === undefined ? undefined : backgroundClass(style.color.background)),
    ...optionalClass(style.color?.text === undefined ? undefined : TEXT_COLOR_CLASSES[style.color.text]),
    ...optionalClass(style.typography?.family === undefined ? undefined : FONT_FAMILY_CLASSES[style.typography.family]),
    ...optionalClass(style.typography?.size === undefined ? undefined : TYPOGRAPHY_SIZE_CLASSES[style.typography.size]),
    ...optionalClass(style.typography?.weight === undefined ? undefined : TYPOGRAPHY_WEIGHT_CLASSES[style.typography.weight]),
    ...optionalClass(style.typography?.align === undefined ? undefined : TEXT_ALIGNMENT_CLASSES[style.typography.align]),
    ...optionalClass(style.typography?.tracking === undefined ? undefined : TRACKING_CLASSES[style.typography.tracking]),
    ...optionalClass(style.typography?.leading === undefined ? undefined : LEADING_CLASSES[style.typography.leading]),
    ...optionalClass(style.border?.radius === undefined ? undefined : RADIUS_CLASSES[style.border.radius]),
    ...optionalClass(style.border?.topLeftRadius === undefined ? undefined : CORNER_RADIUS_CLASSES.topLeftRadius[style.border.topLeftRadius]),
    ...optionalClass(style.border?.topRightRadius === undefined ? undefined : CORNER_RADIUS_CLASSES.topRightRadius[style.border.topRightRadius]),
    ...optionalClass(style.border?.bottomLeftRadius === undefined ? undefined : CORNER_RADIUS_CLASSES.bottomLeftRadius[style.border.bottomLeftRadius]),
    ...optionalClass(style.border?.bottomRightRadius === undefined ? undefined : CORNER_RADIUS_CLASSES.bottomRightRadius[style.border.bottomRightRadius]),
    ...optionalClass(style.border?.width === undefined ? undefined : BORDER_WIDTH_CLASSES[style.border.width]),
    ...optionalClass(style.border?.color === undefined ? undefined : BORDER_COLOR_CLASSES[style.border.color]),
    ...optionalClass(style.border?.shadow === undefined ? undefined : SHADOW_CLASSES[style.border.shadow]),
    ...optionalClass(style.sizing?.width === undefined ? undefined : WIDTH_CLASSES[style.sizing.width]),
    ...optionalClass(style.sizing?.height === undefined ? undefined : HEIGHT_CLASSES[style.sizing.height]),
    ...optionalClass(style.sizing?.maxWidth === undefined ? undefined : MAX_WIDTH_CLASSES[style.sizing.maxWidth]),
    ...optionalClass(style.sizing?.align === undefined ? undefined : SIZING_ALIGNMENT_CLASSES[style.sizing.align]),
    ...optionalClass(style.sizing?.fit === undefined ? undefined : OBJECT_FIT_CLASSES[style.sizing.fit]),
    ...optionalClass(style.sizing?.objectPosition === undefined ? undefined : OBJECT_POSITION_CLASSES[style.sizing.objectPosition]),
    ...optionalClass(style.positioning?.position === undefined ? undefined : POSITION_CLASSES[style.positioning.position]),
    ...optionalClass(style.positioning?.position === "sticky" ? (style.positioning.top !== undefined ? STICKY_TOP_CLASSES[style.positioning.top] : "top-20 ve-sticky-top-xl") : undefined),
  ].join(" ");
}

export function visibilityClassNames(node: ComponentNode, display: keyof typeof DISPLAY_CLASSES, breakpoint?: Breakpoint): string {
  const visibility = node.responsive?.visibility;
  if (breakpoint !== undefined) return visibility?.[breakpoint] === false ? "hidden" : DISPLAY_CLASSES[display].mobile;
  if (visibility === undefined) return DISPLAY_CLASSES[display].mobile;

  return (["mobile", "tablet", "desktop"] as const)
    .map((breakpoint) => (visibility[breakpoint] ? DISPLAY_CLASSES[display][breakpoint] : HIDDEN_CLASSES[breakpoint]))
    .join(" ");
}

export function gridPlacementClassNames(node: ComponentNode, breakpoint?: Breakpoint, spanOverride?: number): string {
  const span = node.layout?.span;
  if (span === undefined) return "";
  if (breakpoint !== undefined) {
    const resolved = spanOverride ?? span[breakpoint];
    return GRID_SPAN_CLASSES.mobile[resolved as keyof typeof GRID_SPAN_CLASSES.mobile];
  }

  return (["mobile", "tablet", "desktop"] as const)
    .map((breakpoint) => GRID_SPAN_CLASSES[breakpoint][span[breakpoint] as keyof (typeof GRID_SPAN_CLASSES)[typeof breakpoint]])
    .join(" ");
}
