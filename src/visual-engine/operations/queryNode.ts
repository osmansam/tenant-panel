import type { ComponentNode, StructuralNode } from "../model/nodes";

export function isStructuralNode(node: ComponentNode): node is StructuralNode {
  return "children" in node;
}

export function findNode(node: ComponentNode, id: string): ComponentNode | undefined {
  if (node.id === id) return node;
  if (!isStructuralNode(node)) return undefined;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return undefined;
}

export function findParent(root: ComponentNode, id: string): StructuralNode | undefined {
  if (!isStructuralNode(root)) return undefined;
  for (const child of root.children) {
    if (child.id === id) return root;
    const found = findParent(child, id);
    if (found) return found;
  }
  return undefined;
}

export function findAncestors(root: ComponentNode, id: string): StructuralNode[] {
  if (!isStructuralNode(root)) return [];
  for (const child of root.children) {
    if (child.id === id) return [root];
    const nested = findAncestors(child, id);
    if (nested.length > 0) return [root, ...nested];
  }
  return [];
}

export function mapNode(root: ComponentNode, id: string, transform: (node: ComponentNode) => ComponentNode): ComponentNode {
  if (root.id === id) return transform(root);
  if (!isStructuralNode(root)) return root;

  let changed = false;
  const children = root.children.map((child) => {
    const mapped = mapNode(child, id, transform);
    changed ||= mapped !== child;
    return mapped;
  });
  return changed ? { ...root, children } : root;
}

export function collectNodeIds(node: ComponentNode, ids = new Set<string>()): Set<string> {
  ids.add(node.id);
  if (isStructuralNode(node)) node.children.forEach((child) => collectNodeIds(child, ids));
  return ids;
}

export function isProtectedSlot(document: { root: ComponentNode }, nodeId: string): boolean {
  return findNode(document.root, nodeId)?.type === "slot";
}
