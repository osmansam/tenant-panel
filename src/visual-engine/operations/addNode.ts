import type { ComponentDocument } from "../model/document";
import type { ComponentNode } from "../model/nodes";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { collectNodeIds, findNode, isStructuralNode, mapNode } from "./queryNode";
import { canInsertNodeAt, prepareFormNodeForDestination } from "./formPlacement";

export function addNode(document: ComponentDocument, parentId: string, node: ComponentNode, index?: number): OperationResult {
  const parent = findNode(document.root, parentId);
  if (!parent) return failure("operation.parent_not_found", "The target parent does not exist");
  if (!isStructuralNode(parent)) {
    return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  }
  if (index !== undefined && (!Number.isInteger(index) || index < 0 || index > parent.children.length)) {
    return failure("operation.index_invalid", "The insertion index is outside the parent children bounds");
  }

  const preparedNode = prepareFormNodeForDestination(document.root, parentId, node);
  if (!canInsertNodeAt(document.root, parentId, preparedNode)) return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  const nodeWithPlacement: ComponentNode = parent.type === "grid" && preparedNode.layout === undefined
    ? { ...preparedNode, layout: { span: { mobile: 12, tablet: 12, desktop: 12 } } }
    : preparedNode;
  const existingIds = collectNodeIds(document.root);
  const addedIds = collectNodeIds(nodeWithPlacement);
  if (existingIds.size + addedIds.size !== new Set([...existingIds, ...addedIds]).size || addedIds.size !== countNodeIds(preparedNode)) {
    return failure("operation.id_duplicate", "Node IDs must be unique");
  }

  const insertionIndex = index ?? parent.children.length;
  const root = mapNode(document.root, parentId, (target) => {
    if (!isStructuralNode(target)) return target;
    return { ...target, children: [...target.children.slice(0, insertionIndex), nodeWithPlacement, ...target.children.slice(insertionIndex)] };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: node.id, createdNodeId: node.id });
}

function countNodeIds(node: ComponentNode): number {
  return 1 + (isStructuralNode(node) ? node.children.reduce((count, child) => count + countNodeIds(child), 0) : 0);
}
