import type { ComponentNode } from "../model";

/** Library components dropped into a Grid cell should fill the cell instead of shrink-wrapping. */
export function fitComponentToGrid(node: ComponentNode): ComponentNode {
  const style = node.style;
  if (style?.sizing?.width !== undefined || style?.custom?.width !== undefined) return node;
  return { ...node, style: { ...style, sizing: { ...style?.sizing, width: "full" } } };
}
