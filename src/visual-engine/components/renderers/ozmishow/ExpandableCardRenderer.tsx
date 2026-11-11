import type { ExpandableCardNode } from "../../../model";
import { ExpandableCardRuntime } from "../../../renderer/ExpandableCardRuntime";
import type { SemanticRendererContext } from "../types";

export function ExpandableCardRenderer({ node, context }: { node: ExpandableCardNode; context: SemanticRendererContext }) {
  const face = node.children.find(child => child.type === "slot" && child.name === "preview");
  const details = node.children.find(child => child.type === "slot" && child.name === "details");
  return <ExpandableCardRuntime node={node} interactive={context.mode === "preview" && context.interactiveExpansions !== false} reducedMotion={context.reducedMotion}
    className={context.className} style={context.combineNodeStyles(node)} backgrounds={context.backgrounds}
    face={face ? context.renderNode(face) : null}
    details={details ? () => context.renderNode(details, undefined, { imagePriority: false }) : null}
    editorControls={context.mode === "canvas" && details ? <button type="button" className="ve-expandable-card__edit" onPointerDown={event => event.stopPropagation()} onClick={event => { event.preventDefault(); event.stopPropagation(); context.onSelect?.(details.id); }}>Edit full-screen details</button> : undefined}
  />;
}
