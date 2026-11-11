"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from "react";

export interface ComponentSizeValue {
  width: number;
  height: number;
}

export interface ComponentSizeBounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ComponentSizeHandlesProps {
  frameRef: RefObject<HTMLDivElement | null>;
  /** Canvas zoom factor; screen-pixel deltas divide by it. */
  zoom?: number;
  /** Frame-relative selection box the handles grow from. */
  rect: { top: number; left: number; width: number; height: number };
  /** Effective pixel size currently applied (committed custom size or measured size). */
  size: ComponentSizeValue;
  /** Frame-relative visible canvas bounds; handles outside them pin to the edge. */
  bounds?: ComponentSizeBounds | null;
  onDraft(size: { width?: number; height?: number } | null): void;
  onCommit(size: { width?: number; height?: number }): void;
  onDragStateChange(dragging: boolean): void;
}

export const MIN_COMPONENT_SIZE = 24;

export function ComponentSizeHandles(props: ComponentSizeHandlesProps) {
  return (
    <>
      <ComponentSizeHandle axis="width" {...props} />
      <ComponentSizeHandle axis="height" {...props} />
    </>
  );
}

interface ComponentSizeHandleProps extends ComponentSizeHandlesProps {
  axis: "width" | "height";
}

function ComponentSizeHandle({ axis, frameRef, zoom = 1, rect, size, bounds = null, onDraft, onCommit, onDragStateChange }: ComponentSizeHandleProps) {
  const [dragging, setDragging] = useState(false);
  const [display, setDisplay] = useState<number | null>(null);
  const initialSize = useRef(size[axis]);
  const latestDraft = useRef<number | null>(null);
  const dragStart = useRef<{ x: number; y: number; size: number } | null>(null);
  const base = Math.round(size[axis]);

  useEffect(() => onDragStateChange(dragging), [dragging, onDragStateChange]);

  const maxSize = (): number => {
    const frame = frameRef.current;
    if (frame === null) return 4000;
    const frameRect = frame.getBoundingClientRect();
    return axis === "width" ? frameRect.width / zoom - rect.left : frameRect.height / zoom - rect.top;
  };

  const draftFor = (value: number) => axis === "width" ? { width: value } : { height: value };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    initialSize.current = base;
    latestDraft.current = base;
    dragStart.current = { x: event.clientX, y: event.clientY, size: base };
    setDisplay(base);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || dragStart.current === null) return;
    const delta = (axis === "width" ? event.clientX - dragStart.current.x : event.clientY - dragStart.current.y) / zoom;
    const next = Math.round(clamp(dragStart.current.size + delta, MIN_COMPONENT_SIZE, Math.max(MIN_COMPONENT_SIZE, maxSize())));
    if (next !== latestDraft.current) {
      latestDraft.current = next;
      setDisplay(next);
      onDraft(draftFor(next));
    }
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>, commit: boolean) => {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setDragging(false);
    setDisplay(null);
    dragStart.current = null;
    const finalSize = latestDraft.current ?? initialSize.current;
    onDraft(null);
    if (commit && finalSize !== initialSize.current) onCommit(draftFor(finalSize));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && dragging) {
      setDragging(false);
      setDisplay(null);
      onDraft(null);
      event.preventDefault();
      return;
    }
    const delta = axis === "width"
      ? event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
      : event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    const next = Math.round(clamp(base + delta * step, MIN_COMPONENT_SIZE, Math.max(MIN_COMPONENT_SIZE, maxSize())));
    if (next !== base) onCommit(draftFor(next));
  };

  const width = axis === "width";
  const actualX = width ? rect.left + size.width : rect.left + size.width / 2;
  const actualY = width ? rect.top + size.height / 2 : rect.top + size.height;
  const pinned = pinPosition(actualX, actualY, width, bounds);
  const style = { left: pinned.left, top: pinned.top };
  return (
    <>
      <button
        type="button"
        role="slider"
        className={`vb-size-handle vb-size-handle--${axis}${dragging ? " vb-size-handle--active" : ""}${pinned.clamped ? " vb-size-handle--pinned" : ""}`}
        aria-label={width ? "Resize width" : "Resize height"}
        aria-orientation={width ? "horizontal" : "vertical"}
        aria-valuemin={MIN_COMPONENT_SIZE}
        aria-valuemax={Math.max(MIN_COMPONENT_SIZE, Math.round(maxSize()))}
        aria-valuenow={base}
        aria-valuetext={`${base} px`}
        title={`${width ? "Drag to resize width · ← → to adjust" : "Drag to resize height · ↑ ↓ to adjust"}${pinned.clamped ? " · edge pinned to the visible canvas" : ""}`}
        style={style}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishDrag(event, true)}
        onPointerCancel={(event) => finishDrag(event, false)}
        onKeyDown={handleKeyDown}
        onClick={(event) => event.stopPropagation()}
      />
      {dragging && display !== null ? (
        <span className="vb-overlay__size-badge" role="status" aria-live="polite" style={{ left: rect.left + 12, top: rect.top + 12 }}>
          {width ? "W" : "H"} {display} px
        </span>
      ) : null}
    </>
  );
}

const PIN_MARGIN = 10;
const CROSS_PIN_MARGIN = 28;

function pinPosition(x: number, y: number, width: boolean, bounds: ComponentSizeBounds | null) {
  if (bounds === null) return { left: x, top: y, clamped: false };
  const left = clampWithin(x, bounds.left + (width ? PIN_MARGIN : CROSS_PIN_MARGIN), bounds.right - (width ? PIN_MARGIN : CROSS_PIN_MARGIN));
  const top = clampWithin(y, bounds.top + (width ? CROSS_PIN_MARGIN : PIN_MARGIN), bounds.bottom - (width ? CROSS_PIN_MARGIN : PIN_MARGIN));
  return {
    left: left ?? x,
    top: top ?? y,
    clamped: (left !== null && left !== x) || (top !== null && top !== y),
  };
}

function clampWithin(value: number, min: number, max: number): number | null {
  if (!(max >= min)) return null;
  return Math.min(max, Math.max(min, value));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
