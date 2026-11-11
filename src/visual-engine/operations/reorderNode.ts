import type { ComponentDocument } from "../model/document";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { findNode, findParent, isProtectedSlot, isStructuralNode, mapNode } from "./queryNode";

export type ReorderDirection = "up" | "down";

export function reorderNode(document: ComponentDocument, nodeId: string, direction: ReorderDirection): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  if (node.id === document.root.id) return failure("operation.root_protected", "The document root cannot be reordered");
  if (isProtectedSlot(document, nodeId)) return failure("operation.slot_protected", "Compound slots cannot be reordered independently");
  if (direction !== "up" && direction !== "down") return failure("operation.direction_invalid", "The reorder direction is not supported");

  const parent = findParent(document.root, nodeId);
  if (!parent) return failure("operation.node_not_found", "The target node has no parent");
  const currentIndex = parent.children.findIndex((child) => child.id === nodeId);
  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (nextIndex < 0 || nextIndex >= parent.children.length) {
    return failure("operation.index_invalid", "The node cannot be moved farther in that direction");
  }

  const root = mapNode(document.root, parent.id, (target) => {
    if (!isStructuralNode(target)) return target;
    const children = [...target.children];
    [children[currentIndex], children[nextIndex]] = [children[nextIndex], children[currentIndex]];
    return { ...target, children };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: nodeId });
}
