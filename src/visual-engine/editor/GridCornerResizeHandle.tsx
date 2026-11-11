"use client";

import { useRef, useState, type PointerEvent, type RefObject } from "react";
import type { GridPlacement } from "../model";

type GridSize = Pick<GridPlacement, "columnSpan" | "rowSpan">;

export function GridCornerResizeHandle({
  frameRef,
  zoom = 1,
  columnEdges,
  rowEdges,
  placement,
  onDraft,
  onCommit,
  onDragStateChange,
}: {
  frameRef: RefObject<HTMLDivElement | null>;
  /** Canvas zoom factor; screen-pixel deltas divide by it. */
  zoom?: number;
  columnEdges: number[];
  rowEdges: number[];
  placement: GridPlacement;
  onDraft(size: GridSize | null): void;
  onCommit(size: GridSize): void;
  onDragStateChange(dragging: boolean): void;
}) {
  const [dragging, setDragging] = useState(false);
  const latest = useRef<GridSize>({ columnSpan: placement.columnSpan, rowSpan: placement.rowSpan });

  const sizeFromPointer = (clientX: number, clientY: number): GridSize => {
    const frame = frameRef.current;
    if (!frame) return latest.current;
    const frameRect = frame.getBoundingClientRect();
    const endColumn = nearestEdge(columnEdges, (clientX - frameRect.left) / zoom, placement.column, 12);
    const endRow = nearestEdge(rowEdges, (clientY - frameRect.top) / zoom, placement.row, 12);
    return { columnSpan: endColumn - placement.column + 1, rowSpan: endRow - placement.row + 1 };
  };

  const begin = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    latest.current = { columnSpan: placement.columnSpan, rowSpan: placement.rowSpan };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(true);
    onDragStateChange(true);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    latest.current = sizeFromPointer(event.clientX, event.clientY);
    onDraft(latest.current);
  };
  const finish = (event: PointerEvent<HTMLButtonElement>, commit: boolean) => {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setDragging(false);
    onDragStateChange(false);
    onDraft(null);
    if (commit && (latest.current.columnSpan !== placement.columnSpan || latest.current.rowSpan !== placement.rowSpan)) onCommit(latest.current);
  };

  return <button
    type="button"
    className={`vb-grid-corner-handle${dragging ? " vb-grid-corner-handle--active" : ""}`}
    aria-label="Resize positioned grid item"
    title="Drag to change grid width and height"
    onPointerDown={begin}
    onPointerMove={move}
    onPointerUp={(event) => finish(event, true)}
    onPointerCancel={(event) => finish(event, false)}
    onClick={(event) => event.stopPropagation()}
  />;
}

function nearestEdge(edges: number[], value: number, start: number, limit: number): number {
  let nearest = start;
  let distance = Number.POSITIVE_INFINITY;
  for (let edge = start; edge <= limit; edge += 1) {
    const candidate = Math.abs((edges[edge] ?? 0) - value);
    if (candidate < distance) {
      distance = candidate;
      nearest = edge;
    }
  }
  return nearest;
}
