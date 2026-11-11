import type { ComponentNode } from "../model";
import { findNode, findParent, isProtectedSlot, isStructuralNode } from "../operations";

export interface PasteTarget {
  parentId: string;
  index: number;
}

export interface ClipboardEntry {
  node: ComponentNode;
  /** Insertion point right where the node was clipped from; used to restore cut nodes when the paste has no anchor. */
  origin: PasteTarget;
}

/** Snapshot of a node for the editor clipboard. Root, compound slots, and orphans cannot be copied independently. */
export function clipNode(root: ComponentNode, nodeId: string): ClipboardEntry | null {
  if (nodeId === root.id) return null;
  if (isProtectedSlot({ root }, nodeId)) return null;
  const node = findNode(root, nodeId);
  if (node === undefined) return null;
  const parent = findParent(root, nodeId);
  if (parent === undefined) return null;
  return {
    node: structuredClone(node),
    origin: { parentId: parent.id, index: parent.children.findIndex((child) => child.id === nodeId) },
  };
}

/** Resolves where a paste lands: inside a structural anchor, otherwise right after it; falls back to the selection, then the root end. */
export function resolvePasteTarget(root: ComponentNode, anchorId: string | null, selectedNodeId: string | null): PasteTarget | null {
  const candidateId = anchorId ?? selectedNodeId;
  const anchor = candidateId === null ? undefined : findNode(root, candidateId);
  if (anchor === undefined) {
    return isStructuralNode(root) ? { parentId: root.id, index: root.children.length } : null;
  }
  if (isStructuralNode(anchor)) return { parentId: anchor.id, index: anchor.children.length };
  const parent = findParent(root, anchor.id);
  if (parent === undefined) return null;
  return { parentId: parent.id, index: parent.children.findIndex((child) => child.id === anchor.id) + 1 };
}

/** Clamped insertion point matching the clipping origin, or null when the origin parent no longer exists. */
export function originPasteTarget(root: ComponentNode, entry: ClipboardEntry): PasteTarget | null {
  const parent = findNode(root, entry.origin.parentId);
  if (parent === undefined || !isStructuralNode(parent)) return null;
  return { parentId: parent.id, index: Math.min(entry.origin.index, parent.children.length) };
}
