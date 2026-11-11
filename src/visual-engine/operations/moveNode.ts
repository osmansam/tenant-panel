import type { ComponentDocument } from "../model/document";
import { GRID_COLUMNS, GRID_ROWS, isPlacementInBounds, type Breakpoint, type ComponentNode, type GridPlacement } from "../model";
import { rectanglesOverlap } from "../layout";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { findNode, findParent, isProtectedSlot, isStructuralNode, mapNode } from "./queryNode";
import { canInsertNodeAt, prepareFormNodeForDestination } from "./formPlacement";

export function moveNode(document: ComponentDocument, nodeId: string, newParentId: string, index: number): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  if (node.id === document.root.id) return failure("operation.root_protected", "The document root cannot be moved");
  if (isProtectedSlot(document, nodeId)) return failure("operation.slot_protected", "Compound slots cannot be moved independently");

  const sourceParent = findParent(document.root, nodeId);
  const destination = findNode(document.root, newParentId);
  if (!sourceParent || !destination) return failure("operation.parent_not_found", "The target parent does not exist");
  if (findNode(node, newParentId)) return failure("operation.cycle", "A node cannot be moved into itself or one of its descendants");
  if (!isStructuralNode(destination)) {
    return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  }
  if (!Number.isInteger(index) || index < 0 || index > destination.children.length) {
    return failure("operation.index_invalid", "The insertion index is outside the parent children bounds");
  }

  const sourceIndex = sourceParent.children.findIndex((child) => child.id === nodeId);
  const withoutNode = mapNode(document.root, sourceParent.id, (target) => {
    if (!isStructuralNode(target)) return target;
    return { ...target, children: target.children.filter((child) => child.id !== nodeId) };
  });
  const destinationAfterRemoval = findNode(withoutNode, newParentId);
  if (!destinationAfterRemoval || !isStructuralNode(destinationAfterRemoval)) {
    return failure("operation.parent_not_found", "The target parent does not exist after removal");
  }
  const preparedNode = prepareFormNodeForDestination(withoutNode, newParentId, node);
  if (!canInsertNodeAt(withoutNode, newParentId, preparedNode)) return failure("operation.parent_rejects_child", "The target parent cannot contain this node type");
  const placement = placementForParent(preparedNode, destinationAfterRemoval);
  if (!placement.success) return placement.result;
  const nodeWithPlacement = placement.node;
  const preRemovalIndex = sourceParent.id === destination.id && index > sourceIndex ? index - 1 : index;
  const insertionIndex = Math.min(preRemovalIndex, destinationAfterRemoval.children.length);
  const root = mapNode(withoutNode, newParentId, (target) => {
    if (!isStructuralNode(target)) return target;
    return { ...target, children: [...target.children.slice(0, insertionIndex), nodeWithPlacement, ...target.children.slice(insertionIndex)] };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: nodeId });
}

function placementForParent(node: ComponentNode, parent: ReturnType<typeof findNode> & object):
  | { success: true; node: ComponentNode }
  | { success: false; result: OperationResult } {
  if (parent.type === "grid") {
    const positioned = parent.children.some((child) => child.layout?.placement !== undefined);
    if (!positioned) {
      return {
        success: true,
        node: { ...node, layout: { span: node.layout?.span ?? { mobile: 12, tablet: 12, desktop: 12 } } },
      };
    }
    const placement = {} as Record<Breakpoint, GridPlacement>;
    for (const breakpoint of ["mobile", "tablet", "desktop"] as const) {
      const occupied = parent.children
        .filter((child) => child.id !== node.id)
        .map((child) => child.layout?.placement?.[breakpoint])
        .filter((value): value is GridPlacement => value !== undefined);
      const columnSpan = node.layout?.placement?.[breakpoint].columnSpan ?? node.layout?.span?.[breakpoint] ?? 12;
      const rowSpan = node.layout?.placement?.[breakpoint].rowSpan ?? 1;
      const available = findAvailablePlacement(columnSpan, rowSpan, occupied);
      if (!available) return { success: false, result: failure("grid.area_occupied", "The item does not fit inside the positioning grid.") };
      placement[breakpoint] = available;
    }
    return { success: true, node: { ...node, layout: { ...node.layout, placement } } };
  }
  if (node.layout === undefined) return { success: true, node };
  const { layout: _layout, ...withoutLayout } = node;
  return { success: true, node: withoutLayout };
}

function findAvailablePlacement(columnSpan: number, rowSpan: number, occupied: GridPlacement[]): GridPlacement | undefined {
  for (let row = 1; row <= GRID_ROWS; row += 1) {
    for (let column = 1; column <= GRID_COLUMNS; column += 1) {
      const candidate = { column, row, columnSpan, rowSpan };
      if (isPlacementInBounds(candidate) && occupied.every((placement) => !rectanglesOverlap(candidate, placement))) return candidate;
    }
  }
  return undefined;
}
