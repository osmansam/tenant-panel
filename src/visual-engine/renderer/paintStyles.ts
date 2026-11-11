import type { CSSProperties } from "react";
import type { ComponentNode } from "../model";
import type { ColorValue, GradientPaint } from "../model/paint";
import { themeColorCss } from "../theme/css";
import type { VisualSiteContext } from "./siteContext";

export function colorCss(color: ColorValue): string {
  return themeColorCss(color);
}

export function gradientCss(paint: GradientPaint): string {
  const stops = paint.stops.map((stop) => `${colorCss(stop.color)} ${stop.position}%`).join(", ");
  return paint.kind === "linear-gradient"
    ? `linear-gradient(${paint.angle}deg, ${stops})`
    : `radial-gradient(${paint.shape}, ${stops})`;
}

export function textPaintStyle(
  paint: ColorValue | GradientPaint | undefined,
  options?: { pageOverride?: "text" | "muted" },
): CSSProperties | undefined {
  if (paint === undefined) return undefined;
  if (options?.pageOverride) {
    return { color: options.pageOverride === "muted" ? "var(--theme-text-muted)" : "var(--theme-text)" };
  }
  if (paint.kind === "token" || paint.kind === "custom") return { color: colorCss(paint) };
  return {
    color: "transparent",
    backgroundImage: gradientCss(paint),
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };
}

/** Replaces per-node custom text paint with the page's adaptive component colors. */
export function pageTextPaintStyle(
  node: Pick<ComponentNode, "style">,
  site: VisualSiteContext | undefined,
): CSSProperties | undefined {
  if (!site?.pageComponentColors) return textPaintStyle(node.style?.textPaint);
  return textPaintStyle(node.style?.textPaint, {
    pageOverride: isMutedTextToken(node.style?.color?.text) ? "muted" : "text",
  });
}

function isMutedTextToken(token: string | undefined): boolean {
  return token === "text-muted" || token === "text-subtle" || token === "inverse-muted";
}
