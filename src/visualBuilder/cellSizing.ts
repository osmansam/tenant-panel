import type { ComponentDocument, ComponentNode } from "../visual-engine/model";

export type VisualCellSizing = "natural" | "fill";
/** Placement metadata stays outside the reusable visual envelope. */
export function readVisualCellSizing(component: { props?: Record<string, unknown> }): VisualCellSizing {
 return component.props?.visualCellSizing === "fill" ? "fill" : "natural";
}
function fillContainer<T extends ComponentNode>(node: T): T {
 const sizing = { ...node.style?.sizing, width: "full" as const, height: "full" as const, maxWidth: "none" as const };
 delete sizing.scaleFromHeight;
 return { ...node, style: { ...node.style, sizing, custom: { ...node.style?.custom, width: "100%", height: "100%", maxWidth: "none" } } };
}
/** Only a sole outer layout container is promoted; compositions and nested cards stay authored. */
export function mainCellContainerId(document: ComponentDocument): string | undefined {
 const main = document.root.children.length === 1 ? document.root.children[0] : undefined;
 return main && ["card", "stack", "flex", "grid"].includes(main.type) ? main.id : undefined;
}
/** Fill the visible outer design, without resizing nested content or mutating saved data. */
export function withCellSizing(document: ComponentDocument, sizing: VisualCellSizing): ComponentDocument {
 if (sizing !== "fill") return document;
 const root = fillContainer(document.root);
 const children = mainCellContainerId(document) ? [fillContainer(root.children[0])] : root.children;
 return { ...document, root: { ...root, children } };
}
