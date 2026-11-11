"use client";

import { useEffect, useRef, type CSSProperties, type DragEvent } from "react";
import type { ComponentNode, StructuralNode } from "../model";
import { isStructuralNode, type ReorderDirection } from "../operations";
import { ChevronIcon, NodeTypeIcon } from "./icons";
import { layerLabel } from "./layerLabels";
import { NodeContextMenu } from "./NodeContextMenu";
import type { DropPosition } from "./layerDropTypes";
import type { LayerTreeDragProps } from "./LayerTree";

export interface LayerTreeNodeProps {
  node: ComponentNode;
  depth: number;
  index: number;
  siblingCount: number;
  isRoot?: boolean;
  selectedNodeId: string | null;
  collapsed: ReadonlySet<string>;
  drag?: LayerTreeDragProps;
  moveParentsFor(node: ComponentNode): StructuralNode[];
  onToggle(nodeId: string): void;
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

export function LayerTreeNode(props: LayerTreeNodeProps) {
  const {
    node, depth, index, siblingCount, isRoot = false, selectedNodeId, collapsed,
    drag, moveParentsFor, onToggle, onSelect,
    onReorder, onDuplicate, onDelete, onMove, onCopy, onCut, onPaste, canPaste,
  } = props;
  const rowRef = useRef<HTMLDivElement>(null);
  const selected = selectedNodeId === node.id;
  const structural = isStructuralNode(node);
  const expanded = structural && !collapsed.has(node.id);
  const { type, content } = layerLabel(node);
  const dragging = drag !== undefined && drag.draggingNodeId === node.id;
  const indicator = drag?.indicator !== null && drag?.indicator !== undefined && drag.indicator.nodeId === node.id
    ? drag.indicator.position
    : null;
  const droppable = drag !== undefined && drag.dragActive && !dragging && drag.canDrop(node, "before");

  useEffect(() => {
    if (selected) rowRef.current?.scrollIntoView?.({ block: "nearest" });
  }, [selected]);

  const resolvePosition = (event: DragEvent): DropPosition => {
    const row = rowRef.current;
    if (!row) return "before";
    const rect = row.getBoundingClientRect();
    if (structural) {
      const band = Math.min(rect.height * 0.3, 12);
      if (event.clientY < rect.top + band) return "before";
      if (event.clientY > rect.bottom - band) return "after";
      return "inside";
    }
    return event.clientY <= rect.top + rect.height / 2 ? "before" : "after";
  };

  return (
    <li
      role="treeitem"
      aria-level={depth + 1}
      aria-selected={selected}
      aria-expanded={structural ? expanded : undefined}
      className="vb-layer"
    >
      <div
        ref={rowRef}
        className={`vb-layer__row${selected ? " vb-layer__row--selected" : ""}${dragging ? " vb-layer__row--dragging" : ""}${droppable ? " vb-layer__row--droppable" : ""}${indicator ? ` vb-layer__row--drop-${indicator}` : ""}`}
        style={{ "--depth": depth } as CSSProperties}
        data-layer-id={node.id}
        draggable={drag !== undefined && !isRoot}
        onDragStart={drag && !isRoot ? (event) => drag.onDragStart(node.id, event) : undefined}
        onDragOver={drag ? (event) => {
          if (!drag.dragActive) return;
          event.preventDefault();
          event.stopPropagation();
          const position = resolvePosition(event);
          if (drag.draggingNodeId === node.id) return;
          drag.onDragOver(node, position, event);
        } : undefined}
        onDrop={drag ? (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!drag.dragActive || drag.indicator === null || drag.indicator.nodeId !== node.id) return;
          drag.onDrop(node, drag.indicator.position, event);
        } : undefined}
        onDragEnd={drag ? () => drag.onDragEnd() : undefined}
        data-testid={`layer-row-${node.id}`}
      >
        {structural ? (
          <button
            type="button"
            className="vb-layer__chevron"
            aria-label={`${expanded ? "Collapse" : "Expand"} ${node.id}`}
            onClick={() => onToggle(node.id)}
          >
            <ChevronIcon open={expanded} size={12} />
          </button>
        ) : (
          <span className="vb-layer__chevron vb-layer__chevron--spacer" aria-hidden="true" />
        )}
        <button type="button" className="vb-layer__select" aria-pressed={selected} onClick={() => onSelect(node.id)}>
          <NodeTypeIcon type={node.type} className="vb-layer__icon" />
          <span className="vb-layer__text">
            {content && content.trim().toLowerCase() !== type.trim().toLowerCase() ? (
              <>
                <span className="vb-layer__type">{type}</span> · <span className="vb-layer__content">{content}</span>
              </>
            ) : (
              <span className="vb-layer__type">{type}</span>
            )}
          </span>
        </button>
        <NodeContextMenu
          node={node}
          isRoot={isRoot}
          atFirstSibling={index === 0}
          atLastSibling={index === siblingCount - 1}
          moveParents={moveParentsFor(node)}
          onReorder={onReorder}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onMove={onMove}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          canPaste={canPaste}
        />
      </div>
      {structural && expanded && node.children.length > 0 ? (
        <ul role="group" className="vb-layers__group">
          {node.children.map((child, childIndex) => (
            <LayerTreeNode
              key={child.id}
              {...props}
              node={child}
              depth={depth + 1}
              index={childIndex}
              siblingCount={node.children.length}
              isRoot={false}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
