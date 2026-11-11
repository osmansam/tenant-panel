import type { Breakpoint, ComponentNode, ResponsiveSpacingSpec, SpacingToken, StyleSpec } from "../model";
import type { NodePatch } from "../operations";
export type DirectStyleProperty = "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "gap" | "borderRadius" | "rotate";
const BREAKPOINTS: readonly Breakpoint[] = ["mobile", "tablet", "desktop"];
const TOKEN_PIXELS: Record<SpacingToken, number> = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48 };
const RADIUS_PIXELS = { none: 0, sm: 2, md: 6, lg: 8, xl: 12, "3xl": 24, full: 512 };

export function clampDirectStyleValue(property: DirectStyleProperty, value: number, coarse = false): number {
  const step = coarse ? property === "rotate" ? 15 : 10 : 1;
  return Math.max(property === "rotate" ? -180 : 0, Math.min(property === "rotate" ? 180 : 512, Math.round((Number.isFinite(value) ? value : 0) / step) * step));
}

/** These runtime-owned containers currently do not apply their own StyleSpec. */
export function supportsDirectStyle(node: ComponentNode): boolean {
  return !["slot", "disclosure", "accordion", "tabs", "sidebar", "scroll-story", "scroll-scene", "repeater"].includes(node.type);
}

export function supportsDirectGap(node: ComponentNode): boolean {
  return node.type === "stack" || node.type === "flex" || (node.type === "grid" && node.mediaLayout === undefined);
}

function pixelLength(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (/^(?:\d+(?:\.\d+)?|\.\d+)(?:px)?$/.test(value)) return Number.parseFloat(value);
  if (/^(?:\d+(?:\.\d+)?|\.\d+)(?:rem|em)$/.test(value)) return Number.parseFloat(value) * 16;
  return undefined;
}

function layerValue(layer: Pick<StyleSpec, "spacing" | "custom"> | undefined, property: Exclude<DirectStyleProperty, "rotate" | "borderRadius">): number | undefined {
  if (layer === undefined) return undefined;
  const spacing = layer.spacing;
  if (property === "gap") return pixelLength(layer.custom?.gap) ?? (spacing?.gap === undefined ? undefined : TOKEN_PIXELS[spacing.gap]);
  const axis = property === "paddingTop" || property === "paddingBottom" ? "paddingY" : "paddingX";
  const token = spacing?.[property] ?? spacing?.[axis] ?? spacing?.padding;
  return pixelLength(layer.custom?.[property]) ?? pixelLength(layer.custom?.padding) ?? (token === undefined ? undefined : TOKEN_PIXELS[token]);
}

/** Numeric inspector fallback; canvas gestures read computed CSS for inherited kit styles and relative lengths. */
export function directStyleValue(node: ComponentNode, breakpoint: Breakpoint, property: DirectStyleProperty): number {
  if (property === "rotate") return node.style?.transform?.rotate ?? 0;
  if (property === "borderRadius") return pixelLength(node.style?.custom?.borderRadius) ?? (node.style?.border?.radius === undefined ? 0 : RADIUS_PIXELS[node.style.border.radius]);
  let value = layerValue(node.style, property) ?? (property === "gap" && (node.type === "stack" || node.type === "flex") ? TOKEN_PIXELS[node.gap] : 0);
  for (const target of BREAKPOINTS.slice(0, BREAKPOINTS.indexOf(breakpoint) + 1)) value = layerValue(node.responsive?.spacing?.[target], property) ?? value;
  return value;
}

/** A complete immutable node patch. null removes the custom override at the active target. */
export function directStylePatch(node: ComponentNode, breakpoint: Breakpoint, property: DirectStyleProperty, value: number | null): NodePatch {
  const number = value === null ? null : clampDirectStyleValue(property, value);
  if (property === "rotate") {
    const transform = { ...node.style?.transform };
    if (number === null) delete transform.rotate; else transform.rotate = number;
    return { style: { ...node.style, transform } };
  }
  const length = number === null ? null : `${number}px`;
  if (property !== "borderRadius" && breakpoint !== "mobile") {
    const previous = node.responsive?.spacing?.[breakpoint];
    const custom = { ...previous?.custom };
    if (length === null) delete custom[property]; else custom[property] = length;
    return { responsive: { ...node.responsive, spacing: { ...node.responsive?.spacing, [breakpoint]: { ...previous, custom } } } };
  }
  const custom = { ...node.style?.custom };
  if (length === null) delete custom[property]; else custom[property] = length;
  const patch: NodePatch = { style: { ...node.style, custom } };
  // Legacy mobile-only spacing must not mask a new base edit. Keep its unrelated sides intact.
  const mobile = node.responsive?.spacing?.mobile;
  if (property !== "borderRadius" && mobile !== undefined) {
    const next: ResponsiveSpacingSpec = { ...mobile, spacing: { ...mobile.spacing }, custom: { ...mobile.custom } };
    if (property === "gap") { delete next.spacing!.gap; delete next.custom!.gap; }
    else {
      const axis = property === "paddingTop" || property === "paddingBottom" ? "paddingY" : "paddingX";
      const affected = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] as const;
      for (const side of affected) {
        if (side === property) continue;
        const sideAxis = side === "paddingTop" || side === "paddingBottom" ? "paddingY" : "paddingX";
        const explicit = mobile.custom?.[side] ?? mobile.custom?.padding;
        const token = mobile.spacing?.[side] ?? mobile.spacing?.[sideAxis] ?? mobile.spacing?.padding;
        if (explicit !== undefined) next.custom![side] = explicit;
        else if (token !== undefined) next.custom![side] = `${TOKEN_PIXELS[token]}px`;
      }
      delete next.spacing!.padding; delete next.spacing![axis]; delete next.spacing![property];
      delete next.custom!.padding; delete next.custom![property];
    }
    patch.responsive = { ...node.responsive, spacing: { ...node.responsive?.spacing, mobile: next } };
  }
  return patch;
}
