import type { ComponentDocument } from "../model/document";
import type { ComponentNode } from "../model/nodes";
import { addNode } from "./addNode";
import { collectNodeIds, findNode, findParent, isProtectedSlot, isStructuralNode } from "./queryNode";
import { failure, type OperationResult } from "./result";

export type IdFactory = () => string;

const defaultIdFactory: IdFactory = () => crypto.randomUUID();

export function regenerateNodeIds(node: ComponentNode, idFactory: IdFactory = defaultIdFactory): ComponentNode {
  const clone = structuredClone(node) as ComponentNode;
  return regenerate(clone, idFactory);
}

export function duplicateNode(document: ComponentDocument, nodeId: string, idFactory: IdFactory = defaultIdFactory): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  if (node.id === document.root.id) return failure("operation.root_protected", "The document root cannot be duplicated");
  if (isProtectedSlot(document, nodeId)) return failure("operation.slot_protected", "Compound slots cannot be duplicated independently");

  const parent = findParent(document.root, nodeId);
  if (!parent) return failure("operation.node_not_found", "The target node has no parent");
  const copy = regenerateNodeIds(node, idFactory);
  if (parent.type === "sidebar" && copy.type === "disclosure") copy.defaultOpen = false;
  const copyIds = collectNodeIds(copy);
  if (copyIds.size !== countNodes(copy) || [...copyIds].some((id) => collectNodeIds(document.root).has(id))) {
    return failure("operation.id_duplicate", "The generated IDs must be unique");
  }
  const index = parent.children.findIndex((child) => child.id === nodeId) + 1;
  return addNode(document, parent.id, copy, index);
}

function regenerate(node: ComponentNode, idFactory: IdFactory): ComponentNode {
  if (!isStructuralNode(node)) return { ...node, id: idFactory() };
  return { ...node, id: idFactory(), children: node.children.map((child) => regenerate(child, idFactory)) };
}

function countNodes(node: ComponentNode): number {
  return 1 + (isStructuralNode(node) ? node.children.reduce((count, child) => count + countNodes(child), 0) : 0);
}
