"use client";

import { useEffect, useState, type DragEvent } from "react";
import type { ComponentDocument, ComponentNode, StructuralNode } from "../model";
import { findParent, isStructuralNode, moveNode, type ReorderDirection } from "../operations";
import { LayerTreeNode } from "./LayerTreeNode";
import type { LayerDropIndicator } from "./useLayerDragState";
import type { DropPosition } from "./layerDropTypes";

export interface LayerTreeDragProps {
  indicator: LayerDropIndicator | null;
  dragActive: boolean;
  draggingNodeId: string | null;
  canDrop(node: ComponentNode, position: DropPosition): boolean;
  onDragStart(nodeId: string, event: DragEvent): void;
  onDragOver(node: ComponentNode, position: DropPosition, event: DragEvent): void;
  onDrop(node: ComponentNode, position: DropPosition, event: DragEvent): void;
  onDragEnd(): void;
}

export interface LayerTreeProps {
  root: ComponentDocument["root"];
  selectedNodeId: string | null;
  drag?: LayerTreeDragProps;
  onSelect(nodeId: string): void;
  onReorder?: (nodeId: string, direction: ReorderDirection) => void;
  onDuplicate?: (nodeId: string) => void;
  onDelete?: (nodeId: string) => void;
  onMove?: (nodeId: string, newParentId: string, index: number) => void;
  onCopy?: (nodeId: string) => void;
  onCut?: (nodeId: string) => void;
  onPaste?: (nodeId: string) => void;
  canPaste?: boolean;
}

export function LayerTree({ root, selectedNodeId, drag, onSelect, onReorder, onDuplicate, onDelete, onMove, onCopy, onCut, onPaste, canPaste }: LayerTreeProps) {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());
  const document = { version: 1, id: "layer-tree", name: "Layer tree", root } as const satisfies ComponentDocument;

  useEffect(() => {
    if (selectedNodeId === null) return;
    const ancestors = ancestorIds(root, selectedNodeId);
    setCollapsed((current) => {
      if (!ancestors.some((id) => current.has(id))) return current;
      const next = new Set(current);
      ancestors.forEach((id) => next.delete(id));
      return next;
    });
  }, [root, selectedNodeId]);

  const toggle = (nodeId: string) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  return (
    <nav aria-label="Layers" className="vb-layers" data-testid="layer-tree">
      <ul role="tree" aria-label="Layer tree" className="vb-layers__list">
        <LayerTreeNode
          node={root}
          depth={0}
          index={0}
          siblingCount={1}
          isRoot
          selectedNodeId={selectedNodeId}
          collapsed={collapsed}
          drag={drag}
          moveParentsFor={(node) => validMoveParents(document, node)}
          onToggle={toggle}
          onSelect={onSelect}
          onReorder={onReorder}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onMove={onMove}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          canPaste={canPaste}
        />
      </ul>
    </nav>
  );
}

function validMoveParents(document: ComponentDocument, node: ComponentNode): StructuralNode[] {
  if (node.id === document.root.id) return [];
  return collectStructuralNodes(document.root).filter((candidate) => moveNode(document, node.id, candidate.id, candidate.children.length).success);
}

function collectStructuralNodes(node: ComponentNode): StructuralNode[] {
  if (!isStructuralNode(node)) return [];
  return [node, ...node.children.flatMap(collectStructuralNodes)];
}

function ancestorIds(root: ComponentNode, nodeId: string): string[] {
  const ids: string[] = [];
  let parent = findParent(root, nodeId);
  while (parent) {
    ids.push(parent.id);
    parent = findParent(root, parent.id);
  }
  return ids;
}
