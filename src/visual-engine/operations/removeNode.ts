import type { ComponentDocument } from "../model/document";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { findNode, findParent, isProtectedSlot, mapNode } from "./queryNode";

export function removeNode(document: ComponentDocument, nodeId: string): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  if (node.id === document.root.id) return failure("operation.root_protected", "The document root cannot be removed");
  if (isProtectedSlot(document, nodeId)) return failure("operation.slot_protected", "Compound slots cannot be removed independently");

  const parent = findParent(document.root, nodeId);
  if (!parent) return failure("operation.node_not_found", "The target node has no parent");
  const root = mapNode(document.root, parent.id, (target) => {
    if (!("children" in target)) return target;
    return { ...target, children: target.children.filter((child) => child.id !== nodeId) };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: parent.id });
}
