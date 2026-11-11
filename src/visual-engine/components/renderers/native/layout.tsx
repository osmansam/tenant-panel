import { SlotMediaGrid } from "../../../renderer/SlotMediaGrid";
import { isPositioningGrid } from "../../../renderer/gridPlacementStyles";
import type { ComponentRendererMap } from "../types";
import { SectionRenderer } from "./SectionRenderer";

const surfaceClass = (className: string, hasBackground: boolean, extra = "") =>
  [className, extra, hasBackground ? "relative isolate" : ""].filter(Boolean).join(" ");

export const layoutRenderers = {
  section: (node, context) => <SectionRenderer node={node} context={context} />,
  grid: (node, context) => node.mediaLayout !== undefined ? (
    <div className={surfaceClass(context.className, !!node.style?.background?.length, "overflow-hidden")} style={context.combineNodeStyles(node)}>
      {context.backgrounds}
      <div className="col-span-12 min-w-0">
        <SlotMediaGrid node={node as typeof node & { mediaLayout: NonNullable<typeof node.mediaLayout> }} breakpoint={context.breakpoint} renderImage={context.renderNode} />
      </div>
    </div>
  ) : (
    <div className={surfaceClass(context.className, !!node.style?.background?.length, isPositioningGrid(node) ? "ve-positioning-grid" : "")} style={context.combineNodeStyles(node)}>
      {context.backgrounds}{context.renderStructuralChildren(node)}
    </div>
  ),
  stack: (node, context) => (
    <div className={surfaceClass(context.className, !!node.style?.background?.length)} style={context.combineNodeStyles(node)}>
      {context.backgrounds}{context.renderStructuralChildren(node)}
    </div>
  ),
  flex: (node, context) => (
    <div className={surfaceClass(context.className, !!node.style?.background?.length)} style={context.combineNodeStyles(node)}>
      {context.backgrounds}{context.renderStructuralChildren(node)}
    </div>
  ),
  slot: (node, context) => <div className={surfaceClass(context.className, !!node.style?.background?.length)} style={context.combineNodeStyles(node)}>{context.backgrounds}{context.renderStructuralChildren(node)}</div>,
} satisfies Pick<ComponentRendererMap, "section" | "grid" | "stack" | "flex" | "slot">;
