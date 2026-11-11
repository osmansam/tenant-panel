"use client";

import type { ComponentNode, StructuralNode } from "../model";
import { isStructuralNode, type ReorderDirection } from "../operations";
import { DotsIcon } from "./icons";
import { describeLayer } from "./layerLabels";
import { Menu, MenuHeading, MenuItem, MenuSeparator } from "./Menu";

export interface NodeContextMenuProps {
  node: ComponentNode;
  isRoot: boolean;
  atFirstSibling: boolean;
  atLastSibling: boolean;
  moveParents: StructuralNode[];
  onReorder?: (nodeId: string, direction: ReorderDirection) => void;
  onDuplicate?: (nodeId: string) => void;
  onDelete?: (nodeId: string) => void;
  onMove?: (nodeId: string, newParentId: string, index: number) => void;
  onCopy?: (nodeId: string) => void;
  onCut?: (nodeId: string) => void;
  onPaste?: (nodeId: string) => void;
  canPaste?: boolean;
}

export function NodeContextMenu({ node, isRoot, atFirstSibling, atLastSibling, moveParents, onReorder, onDuplicate, onDelete, onMove, onCopy, onCut, onPaste, canPaste = false }: NodeContextMenuProps) {
  return (
    <Menu label={`Actions for ${node.id}`} trigger={<DotsIcon />} triggerClassName="vb-icon-button vb-layer__actions">
      <MenuItem label="Copy" ariaLabel={`Copy ${node.id}`} disabled={isRoot || !onCopy} onSelect={() => onCopy?.(node.id)} />
      <MenuItem label="Cut" ariaLabel={`Cut ${node.id}`} disabled={isRoot || !onCut} onSelect={() => onCut?.(node.id)} />
      <MenuItem label="Paste" ariaLabel={isStructuralNode(node) ? `Paste into ${node.id}` : `Paste after ${node.id}`} disabled={!canPaste || !onPaste} onSelect={() => onPaste?.(node.id)} />
      <MenuSeparator />
      <MenuItem label="Duplicate" ariaLabel={`Duplicate ${node.id}`} disabled={isRoot || !onDuplicate} onSelect={() => onDuplicate?.(node.id)} />
      <MenuItem label="Move up" ariaLabel={`Move ${node.id} up`} disabled={isRoot || atFirstSibling || !onReorder} onSelect={() => onReorder?.(node.id, "up")} />
      <MenuItem label="Move down" ariaLabel={`Move ${node.id} down`} disabled={isRoot || atLastSibling || !onReorder} onSelect={() => onReorder?.(node.id, "down")} />
      {!isRoot && moveParents.length > 0 && onMove ? (
        <>
          <MenuSeparator />
          <MenuHeading>Move to</MenuHeading>
          {moveParents.map((parent) => (
            <MenuItem
              key={parent.id}
              label={describeLayer(parent)}
              ariaLabel={`Move ${node.id} to ${parent.id}`}
              onSelect={() => onMove(node.id, parent.id, parent.children.length)}
            />
          ))}
        </>
      ) : null}
      <MenuSeparator />
      <MenuItem label="Delete" ariaLabel={`Delete ${node.id}`} destructive disabled={isRoot || !onDelete} onSelect={() => onDelete?.(node.id)} />
    </Menu>
  );
}
