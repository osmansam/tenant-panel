"use client";

import { useCallback, useState } from "react";
import type { ComponentDocument, ComponentNode, NodeType, StructuralNode } from "../model";
import { canInsertTypeAt, findParent, isStructuralNode, moveNode } from "../operations";
import type { LayerDragPayload } from "./layerDrag";
import type { DropPosition } from "./layerDropTypes";

export type { DropPosition } from "./layerDropTypes";

export interface LayerDropIndicator {
  nodeId: string;
  position: DropPosition;
}

interface UseLayerDragStateArgs {
  document: ComponentDocument;
  onMove: (nodeId: string, newParentId: string, index: number) => void;
  onDropLibrary?: (nodeType: NodeType, parentId: string, index: number) => void;
}

export function useLayerDragState({ document, onMove, onDropLibrary }: UseLayerDragStateArgs) {
  const [indicator, setIndicator] = useState<LayerDropIndicator | null>(null);
  const [payload, setPayload] = useState<LayerDragPayload | null>(null);

  const clear = useCallback(() => {
    setIndicator(null);
    setPayload(null);
  }, []);

  const startDrag = useCallback((dragPayload: LayerDragPayload) => setPayload(dragPayload), []);

  const resolveParent = useCallback(
    (target: ComponentNode, position: DropPosition): StructuralNode | null => {
      if (position === "inside") {
        return isStructuralNode(target) ? target : null;
      }
      return findParent(document.root, target.id) ?? null;
    },
    [document.root],
  );

  const resolveIndex = useCallback(
    (target: ComponentNode, position: DropPosition, parent: StructuralNode): number => {
      if (position === "inside") return parent.children.length;
      const index = parent.children.findIndex((child) => child.id === target.id);
      if (index < 0) return parent.children.length;
      return position === "before" ? index : index + 1;
    },
    [],
  );

  const canDropAt = useCallback(
    (target: ComponentNode, position: DropPosition): boolean => {
      const parent = resolveParent(target, position);
      if (!parent || payload === null) return false;

      if (payload.kind === "library") {
        if (onDropLibrary === undefined) return false;
        return canInsertTypeAt(document.root, parent.id, payload.nodeType);
      }

      const draggedId = payload.nodeId;
      if (draggedId === target.id) return false;
      const dragged = findNodeIn(document.root, draggedId);
      if (!dragged) return false;
      if (position !== "inside" && isAncestor(dragged, parent.id)) return false;

      const index = resolveIndex(target, position, parent);
      return moveNode(document, draggedId, parent.id, Math.max(0, Math.min(index, parent.children.length))).success;
    },
    [document, onDropLibrary, payload, resolveIndex, resolveParent],
  );

  const commitDrop = useCallback(
    (target: ComponentNode, position: DropPosition) => {
      const parent = resolveParent(target, position);
      if (!parent || payload === null) return;

      if (payload.kind === "library") {
        const index = resolveIndex(target, position, parent);
        clear();
        onDropLibrary?.(payload.nodeType, parent.id, index);
        return;
      }

      const draggedId = payload.nodeId;
      const index = resolveIndex(target, position, parent);
      clear();
      // moveNode already decrements the index for same-parent moves past the source position.
      onMove(draggedId, parent.id, Math.max(0, Math.min(index, parent.children.length)));
    },
    [clear, document.root, onMove, onDropLibrary, payload, resolveIndex, resolveParent],
  );

  return { indicator, setIndicator, payload, startDrag, clear, canDropAt, commitDrop };
}

function findNodeIn(root: ComponentNode, id: string): ComponentNode | null {
  if (root.id === id) return root;
  if (!isStructuralNode(root)) return null;
  return root.children.reduce<ComponentNode | null>((hit, child) => hit ?? findNodeIn(child, id), null);
}

function isAncestor(node: ComponentNode, nodeId: string): boolean {
  if (!isStructuralNode(node)) return false;
  return node.children.some((child) => child.id === nodeId || isAncestor(child, nodeId));
}
