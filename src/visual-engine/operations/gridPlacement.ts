import { movePlacement, rectanglesOverlap, resizePlacement, type GridDirection, type GridPlacementMap } from "../layout";
import {
  isPlacementInBounds,
  type Breakpoint,
  type ComponentDocument,
  type GridNode,
  type GridPlacement,
  type StructuralNode,
} from "../model";
import { failure, finalizeDocument, type OperationResult } from "./result";
import { findNode, findParent, mapNode } from "./queryNode";
import { packPlacements } from "../layout";

export function canUsePositioningGrid(container: StructuralNode, parent?: StructuralNode | null): boolean {
  const height = container.style?.sizing?.height;
  if (height !== undefined && height !== "auto") return true;
  const parentHeight = parent?.style?.sizing?.height;
  return (height === undefined || height === "auto") && parentHeight !== undefined && parentHeight !== "auto";
}

export function resolvePlacementMap(grid: GridNode, breakpoint: Breakpoint): GridPlacementMap | undefined {
  const entries = grid.children.map((child) => [child.id, child.layout?.placement?.[breakpoint]] as const);
  if (entries.some(([, placement]) => placement === undefined)) return undefined;
  return Object.fromEntries(entries) as GridPlacementMap;
}

export function promoteGridToPositioned(document: ComponentDocument, gridId: string): OperationResult {
  const target = findNode(document.root, gridId);
  if (!target || target.type !== "grid") return failure("grid.parent_required", "A Grid container is required.");
  if (!canUsePositioningGrid(target)) return heightFailure();

  const placements = Object.fromEntries((["mobile", "tablet", "desktop"] as const).map((breakpoint) => {
    const packed = packPlacements(target.children.map((child) => ({
      id: child.id,
      columnSpan: child.layout?.span?.[breakpoint] ?? 12,
      rowSpan: 1,
    })));
    return [breakpoint, packed];
  }));
  const failed = Object.values(placements).find((result) => !result.ok);
  if (failed && !failed.ok) return failure(failed.code, failed.message);

  const root = mapNode(document.root, gridId, (node) => {
    if (node.type !== "grid") return node;
    return {
      ...node,
      children: node.children.map((child) => ({
        ...child,
        layout: {
          ...child.layout,
          placement: {
            mobile: placements.mobile.ok ? placements.mobile.placements[child.id] : neverPlacement(),
            tablet: placements.tablet.ok ? placements.tablet.placements[child.id] : neverPlacement(),
            desktop: placements.desktop.ok ? placements.desktop.placements[child.id] : neverPlacement(),
          },
        },
      })),
    };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: gridId });
}

export function moveGridChild(document: ComponentDocument, nodeId: string, breakpoint: Breakpoint, direction: GridDirection): OperationResult {
  return updatePositionedGrid(document, nodeId, breakpoint, (placements) => movePlacement({ placements, selectedId: nodeId, direction }));
}

export function resizeGridChild(
  document: ComponentDocument,
  nodeId: string,
  breakpoint: Breakpoint,
  size: Pick<GridPlacement, "columnSpan" | "rowSpan">,
): OperationResult {
  return updatePositionedGrid(document, nodeId, breakpoint, (placements) => resizePlacement({ placements, selectedId: nodeId, ...size }));
}

export function setGridChildPlacement(
  document: ComponentDocument,
  nodeId: string,
  breakpoint: Breakpoint,
  patch: Partial<GridPlacement>,
): OperationResult {
  return updatePositionedGrid(document, nodeId, breakpoint, (placements) => {
    const current = placements[nodeId];
    if (!current) return { ok: false as const, code: "grid.item_not_found" as const, message: "The selected grid item was not found." };
    const candidate = { ...current, ...patch };
    if (!isPlacementInBounds(candidate)) return { ok: false as const, code: "grid.boundary" as const, message: "The item cannot extend beyond the grid boundary." };
    if (Object.entries(placements).some(([id, value]) => id !== nodeId && rectanglesOverlap(candidate, value))) {
      return { ok: false as const, code: "grid.area_occupied" as const, message: "This grid area is occupied." };
    }
    return { ok: true as const, placements: { ...placements, [nodeId]: candidate } };
  });
}

function updatePositionedGrid(
  document: ComponentDocument,
  nodeId: string,
  breakpoint: Breakpoint,
  operation: (placements: GridPlacementMap) => ReturnType<typeof movePlacement>,
): OperationResult {
  const parent = findParent(document.root, nodeId);
  if (!parent || parent.type !== "grid") return failure("grid.parent_required", "The selected item must be a direct Grid child.");
  const placements = resolvePlacementMap(parent, breakpoint);
  if (!placements) return failure("grid.positioning_required", "Switch this Grid to positioning mode first.");
  const result = operation(placements);
  if (!result.ok) return failure(result.code, result.message);
  const root = mapNode(document.root, parent.id, (node) => {
    if (node.type !== "grid") return node;
    return {
      ...node,
      children: node.children.map((child) => ({
        ...child,
        layout: {
          ...child.layout,
          placement: {
            ...child.layout!.placement!,
            [breakpoint]: result.placements[child.id],
          },
        },
      })),
    };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: nodeId });
}

function heightFailure(): OperationResult {
  return failure("grid.height_required", "Choose a container height before positioning its children.");
}

function neverPlacement(): GridPlacement {
  return { column: 1, row: 1, columnSpan: 1, rowSpan: 1 };
}
