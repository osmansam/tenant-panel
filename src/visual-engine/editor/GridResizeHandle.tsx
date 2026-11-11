"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from "react";

export interface GridResizeHandleProps {
  frameRef: RefObject<HTMLDivElement | null>;
  /** Canvas zoom factor; screen-pixel deltas divide by it. */
  zoom?: number;
  /** x positions (relative to the frame) of the 13 column edges of the parent grid. */
  columnEdges: number[];
  /** 0-based index of the column where the selected item starts. */
  startColumn: number;
  span: number;
  columns: number;
  onDraft(span: number | null): void;
  onCommit(span: number): void;
  onDragStateChange(dragging: boolean): void;
}

export function GridResizeHandle({ frameRef, zoom = 1, columnEdges, startColumn, span, columns, onDraft, onCommit, onDragStateChange }: GridResizeHandleProps) {
  const [dragging, setDragging] = useState(false);
  const initialSpan = useRef(span);
  const latestDraft = useRef<number | null>(null);
  const maxSpan = Math.max(1, columns - startColumn);

  useEffect(() => onDragStateChange(dragging), [dragging, onDragStateChange]);

  const spanFromPointer = (clientX: number): number => {
    const frame = frameRef.current;
    if (frame === null) return span;
    const x = (clientX - frame.getBoundingClientRect().left) / zoom;
    let nearestEdge = startColumn + 1;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let edge = startColumn + 1; edge <= columns; edge += 1) {
      const distance = Math.abs((columnEdges[edge] ?? 0) - x);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEdge = edge;
      }
    }
    return clamp(nearestEdge - startColumn, 1, maxSpan);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    initialSpan.current = span;
    latestDraft.current = span;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    const next = spanFromPointer(event.clientX);
    if (next !== latestDraft.current) {
      latestDraft.current = next;
      onDraft(next);
    }
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>, commit: boolean) => {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setDragging(false);
    const finalSpan = latestDraft.current ?? initialSpan.current;
    onDraft(null);
    if (commit && finalSpan !== initialSpan.current) onCommit(finalSpan);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && dragging) {
      setDragging(false);
      onDraft(null);
      event.preventDefault();
      return;
    }
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = clamp(span + delta, 1, maxSpan);
    if (next !== span) onCommit(next);
  };

  return (
    <button
      type="button"
      role="slider"
      className={`vb-grid-handle${dragging ? " vb-grid-handle--active" : ""}`}
      aria-label="Resize grid span"
      aria-valuemin={1}
      aria-valuemax={maxSpan}
      aria-valuenow={span}
      aria-valuetext={`${span} of ${columns} columns`}
      title="Drag to resize · ← → to adjust"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
      onKeyDown={handleKeyDown}
      onClick={(event) => event.stopPropagation()}
    />
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
