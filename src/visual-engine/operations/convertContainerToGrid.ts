import { packPlacements } from "../layout";
import type { Breakpoint, ComponentDocument, GridPlacementByBreakpoint, StructuralNode } from "../model";
import { canUsePositioningGrid } from "./gridPlacement";
import { findNode, findParent, mapNode } from "./queryNode";
import { failure, finalizeDocument, type OperationResult } from "./result";

const centeredPlacement: GridPlacementByBreakpoint = {
  mobile: { column: 1, row: 3, columnSpan: 12, rowSpan: 8 },
  tablet: { column: 2, row: 4, columnSpan: 10, rowSpan: 6 },
  desktop: { column: 3, row: 4, columnSpan: 8, rowSpan: 6 },
};

export function convertContainerToGrid(document: ComponentDocument, containerId: string): OperationResult {
  const target = findNode(document.root, containerId);
  if (!target || (target.type !== "stack" && target.type !== "flex")) {
    return failure("grid.container_required", "Select a Stack or Flex container to convert.");
  }
  const parent = findParent(document.root, containerId);
  if (!canUsePositioningGrid(target, parent)) {
    return failure("grid.height_required", "Choose a container height before positioning its children.");
  }
  const packed = target.children.length === 1
    ? { ok: true as const, placements: { [target.children[0].id]: centeredPlacement } }
    : packForBreakpoints(target);
  if (!packed.ok) return packed.result;

  const root = mapNode(document.root, containerId, (node) => {
    if (node.type !== "stack" && node.type !== "flex") return node;
    const { direction: _direction, alignment: _alignment, distribution: _distribution, wrap: _wrap, gap: _gap, ...common } = node;
    return {
      ...common,
      type: "grid" as const,
      columns: 12 as const,
      style: target.style?.sizing?.height !== undefined && target.style.sizing.height !== "auto"
        ? target.style
        : { ...target.style, sizing: { ...target.style?.sizing, height: "full" } },
      children: node.children.map((child) => ({
        ...child,
        layout: {
          ...child.layout,
          placement: node.children.length === 1
            ? centeredPlacement
            : packed.placements[child.id],
        },
      })),
    };
  });
  return finalizeDocument({ ...document, root: root as ComponentDocument["root"] }, { selectedNodeId: containerId });
}

function packForBreakpoints(container: Extract<StructuralNode, { type: "stack" | "flex" }>):
  | { ok: true; placements: Record<string, GridPlacementByBreakpoint> }
  | { ok: false; result: OperationResult } {
  const byId: Record<string, Partial<GridPlacementByBreakpoint>> = Object.fromEntries(container.children.map((child) => [child.id, {}]));
  for (const breakpoint of ["mobile", "tablet", "desktop"] as Breakpoint[]) {
    const packed = packPlacements(container.children.map((child) => ({
      id: child.id,
      columnSpan: breakpoint === "mobile" ? 12 : child.layout?.span?.[breakpoint] ?? 12,
      rowSpan: 1,
    })));
    if (!packed.ok) return { ok: false, result: failure(packed.code, packed.message) };
    for (const child of container.children) byId[child.id][breakpoint] = packed.placements[child.id];
  }
  return { ok: true, placements: byId as Record<string, GridPlacementByBreakpoint> };
}
