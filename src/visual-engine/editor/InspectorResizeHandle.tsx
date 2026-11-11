"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { INSPECTOR_WIDTH } from "./editorPreferences";

export interface InspectorResizeHandleProps {
  width: number;
  onResize(width: number): void;
  onReset(): void;
}

const KEYBOARD_STEP = 16;

/** Drag the inspector's left edge to resize it. The inspector grows leftwards, so moving the pointer left widens it. */
export function InspectorResizeHandle({ width, onResize, onReset }: InspectorResizeHandleProps) {
  const drag = useRef<{ startX: number; startWidth: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = { startX: event.clientX, startWidth: width };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current === null) return;
    onResize(drag.current.startWidth + (drag.current.startX - event.clientX));
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current === null) return;
    drag.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") onResize(width + KEYBOARD_STEP);
    else if (event.key === "ArrowRight") onResize(width - KEYBOARD_STEP);
    else if (event.key === "Home") onResize(INSPECTOR_WIDTH.max);
    else if (event.key === "End") onResize(INSPECTOR_WIDTH.min);
    else return;
    event.preventDefault();
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize inspector"
      aria-valuemin={INSPECTOR_WIDTH.min}
      aria-valuemax={INSPECTOR_WIDTH.max}
      aria-valuenow={width}
      title="Drag to resize · double-click to reset"
      tabIndex={0}
      className="vb-resize-handle"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={onReset}
      onKeyDown={handleKeyDown}
    />
  );
}
