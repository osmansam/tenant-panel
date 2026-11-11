import type { CSSProperties } from "react";
import type { Breakpoint, ComponentNode, StructuralNode, StyleSpec } from "../model";
import { usesFlexChildGap } from "../model";
import { expandableHeightClasses, hasExpandableContent } from "./contentHeight";
import { hasResponsiveChildGap } from "./responsiveSpacing";
import { flowGridStartStyle, gridChildPlacementStyle, isPositioningGrid } from "./gridPlacementStyles";
import { FLEX_ALIGNMENT_CLASSES, FLEX_DIRECTION_CLASSES, FLEX_DISTRIBUTION_CLASSES, FONT_FAMILY_CLASSES, GAP_CLASSES, SIZING_ALIGNMENT_CLASSES, STICKY_TOP_CLASSES, customDimensionStyles, gridPlacementClassNames, styleClassNames, visibilityClassNames } from "./styleTokens";
export function nodeClassNames(node: ComponentNode, breakpoint?: Breakpoint): string {
  const flexChildGap = usesFlexChildGap(node.type)
    && (node.style?.spacing?.gap !== undefined || node.style?.custom?.gap !== undefined || hasResponsiveChildGap(node));
  const layoutClass = node.type === "grid"
    ? visibilityClassNames(node, "grid", breakpoint) + " grid-cols-12"
    : node.type === "flex" || node.type === "stack"
      ? [visibilityClassNames(node, "flex", breakpoint), FLEX_DIRECTION_CLASSES[node.direction], FLEX_ALIGNMENT_CLASSES[node.alignment], FLEX_DISTRIBUTION_CLASSES[node.distribution], node.wrap ? "flex-wrap" : "flex-nowrap", GAP_CLASSES[node.gap]].join(" ")
      : flexChildGap
        ? `${visibilityClassNames(node, "flex", breakpoint)} flex-col`
        : node.type === "button"
          ? visibilityClassNames(node, "inline-flex", breakpoint)
          : visibilityClassNames(node, "block", breakpoint);
  return expandableHeightClasses(node, [layoutClass, styleClassNames(node.style), `ve-responsive-${breakpoint ?? "preview"}`].filter(Boolean).join(" "));
}

export function childItemAlignmentClass(parent: StructuralNode, child: ComponentNode): string {
  if (parent.type !== "flex" && parent.type !== "stack") return "";
  const align = child.style?.sizing?.align;
  if (align === undefined) return "";
  const width = child.style?.sizing?.width;
  if (width === "full" || (width !== undefined && width.endsWith("%"))) return "";
  const customWidth = child.style?.custom?.width?.trim();
  if (customWidth !== undefined && customWidth !== "" && customWidth.endsWith("%")) return "";
  return SIZING_ALIGNMENT_CLASSES[align];
}

export function withoutBackground(node: ComponentNode): ComponentNode {
  const style = node.style;
  if (style === undefined || (style.background === undefined && style.color?.background === undefined)) return node;
  const nextStyle: StyleSpec = { ...style };
  delete nextStyle.background;
  if (nextStyle.color !== undefined) {
    const nextColor = { ...nextStyle.color };
    delete nextColor.background;
    nextStyle.color = nextColor;
  }
  return { ...node, style: nextStyle };
}

export function combineNodeStyles(node: ComponentNode, extra?: CSSProperties): CSSProperties | undefined {
  const custom = customDimensionStyles(node.style?.custom);
  const rotate = node.style?.transform?.rotate;
  const rotation = typeof rotate === "number" && Number.isFinite(rotate) && rotate >= -180 && rotate <= 180 ? { rotate: `${rotate}deg` } : undefined;
  if (!custom && !extra && !rotation) return undefined;
  return { ...custom, ...rotation, ...extra };
}
export function nodeWrapperClassName(node: ComponentNode): string {
  const sticky = node.style?.positioning?.position === "sticky" ? ` ve-sticky sticky self-start ${node.style.positioning.top ? STICKY_TOP_CLASSES[node.style.positioning.top] : "top-20 ve-sticky-top-xl"}` : "";
  return `min-w-0 max-w-full [overflow-wrap:anywhere]${sticky}${node.style?.typography?.family ? ` ${FONT_FAMILY_CLASSES[node.style.typography.family]}` : ""}${node.style?.sizing?.height === "full" && !hasExpandableContent(node) ? " h-full" : ""}`;
}

export function structuralChildPresentation(parent: StructuralNode, child: ComponentNode, breakpoint?: Breakpoint, override?: number) {
  const positioned = parent.type === "grid" && isPositioningGrid(parent);
  const sticky = child.style?.positioning?.position === "sticky" ? `ve-sticky sticky self-start ${child.style.positioning.top ? STICKY_TOP_CLASSES[child.style.positioning.top] : "top-20 ve-sticky-top-xl"}` : "";
  const flowStart = parent.type === "grid" && !positioned ? child.layout?.start : undefined;
  const usesFlowStart = flowStart !== undefined && (breakpoint === undefined || flowStart[breakpoint] !== null);
  const flowSpan = override !== undefined && breakpoint !== undefined ? { ...(child.layout?.span ?? { mobile: 12, tablet: 12, desktop: 12 }), [breakpoint]: override } : child.layout?.span;
  return {
    className: ["min-w-0 max-w-full", sticky, childItemAlignmentClass(parent, child), parent.style?.background?.length ? "relative z-10" : "", child.style?.sizing?.height === "full" && !hasExpandableContent(child) ? "h-full" : "", positioned ? "ve-positioned-grid-child" : parent.type === "grid" ? usesFlowStart ? "ve-flow-grid-child" : gridPlacementClassNames(child, breakpoint, override) : ""].filter(Boolean).join(" ") || undefined,
    style: positioned && child.layout?.placement ? gridChildPlacementStyle(child.layout.placement, breakpoint) : usesFlowStart && flowStart !== undefined ? flowGridStartStyle(flowStart, flowSpan, breakpoint) : undefined,
  };
}
