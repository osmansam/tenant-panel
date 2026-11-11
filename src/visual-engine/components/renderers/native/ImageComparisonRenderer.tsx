"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ImageComparisonNode } from "../../../model";
import { VisualImage } from "../../../renderer/images/VisualImage";
import type { SemanticRendererContext } from "../types";
import "../../../renderer/image-comparison.css";

const ratios = { wide: "16 / 9", landscape: "4 / 3", square: "1 / 1", portrait: "3 / 4" } as const;
const bounded = (value: number) => Math.max(0, Math.min(100, value));

export function ImageComparisonRenderer({ node, context }: { node: ImageComparisonNode; context: SemanticRendererContext }) {
  const [position, setPosition] = useState(() => bounded(node.position));
  const drag = useRef<{ pointerId: number; start: number; value: number } | null>(null);
  const editable = context.mode === "canvas" && context.onNodePatch !== undefined;

  useEffect(() => {
    if (!drag.current) setPosition(bounded(node.position));
  }, [node.id, node.position]);

  const commit = (next: number) => {
    setPosition(next);
    if (editable && next !== node.position) context.onNodePatch?.(node.id, { position: next });
  };
  const pointerPosition = (event: PointerEvent<HTMLInputElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return bounds.width > 0 ? Math.round(bounded((event.clientX - bounds.left) / bounds.width * 100)) : null;
  };
  const cancel = (input: HTMLInputElement) => {
    const gesture = drag.current;
    if (!gesture) return;
    drag.current = null;
    setPosition(gesture.start);
    try { if (input.hasPointerCapture?.(gesture.pointerId)) input.releasePointerCapture(gesture.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
  };
  const start = (event: PointerEvent<HTMLInputElement>) => {
    if (event.button > 0 || event.isPrimary === false || drag.current) return;
    const next = pointerPosition(event);
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    if (context.mode === "canvas") context.onSelect?.(node.id);
    event.currentTarget.focus({ preventScroll: true });
    drag.current = { pointerId: event.pointerId, start: position, value: next };
    setPosition(next);
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
  };
  const move = (event: PointerEvent<HTMLInputElement>) => {
    const gesture = drag.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const next = pointerPosition(event);
    if (next !== null) { gesture.value = next; setPosition(next); }
  };
  const finish = (event: PointerEvent<HTMLInputElement>) => {
    const gesture = drag.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current = null;
    try { if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    commit(gesture.value);
  };
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && drag.current) { event.preventDefault(); event.stopPropagation(); cancel(event.currentTarget); return; }
    const step = event.shiftKey ? 10 : 1;
    const next = event.key === "ArrowRight" || event.key === "ArrowUp" ? position + step
      : event.key === "ArrowLeft" || event.key === "ArrowDown" ? position - step
        : event.key === "PageUp" ? position + 10 : event.key === "PageDown" ? position - 10
          : event.key === "Home" ? 0 : event.key === "End" ? 100 : null;
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    commit(bounded(next));
  };

  return <figure id={node.id} aria-label={node.accessibleLabel} className={[context.className, "ve-image-comparison"].filter(Boolean).join(" ")} style={context.combineNodeStyles(node)} data-image-comparison>
    {context.backgrounds}
    <div className="ve-image-comparison__frame" style={{ aspectRatio: ratios[node.aspectRatio] }}>
      <VisualImage geometry={{ width: 1920, height: 1080, sizes: "100vw" }} priority={context.imagePriority && position < 100} className="ve-image-comparison__image" src={node.afterSrc} alt={node.afterAlt} style={{ objectFit: node.objectFit }} draggable={false} />
      <div className="ve-image-comparison__before" data-comparison-before style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <VisualImage geometry={{ width: 1920, height: 1080, sizes: "100vw" }} priority={context.imagePriority && position === 100} className="ve-image-comparison__image" src={node.beforeSrc} alt={node.beforeAlt} style={{ objectFit: node.objectFit }} draggable={false} />
      </div>
      {node.showLabels ? <div className="ve-image-comparison__labels" aria-hidden="true"><span>{node.beforeLabel}</span><span>{node.afterLabel}</span></div> : null}
      <input className="ve-image-comparison__range" type="range" min={0} max={100} step={1} value={position} aria-label={`${node.accessibleLabel} divider`} aria-valuetext={`${position}% ${node.beforeLabel}, ${100 - position}% ${node.afterLabel}`}
        onPointerDown={start} onPointerMove={move} onPointerUp={finish}
        onPointerCancel={event => { event.stopPropagation(); cancel(event.currentTarget); }}
        onLostPointerCapture={event => cancel(event.currentTarget)}
        onKeyDown={keyDown}
        onChange={event => { if (!drag.current) commit(bounded(Number(event.target.value))); }}
        onClick={event => event.stopPropagation()}
        onDragStart={event => { event.preventDefault(); event.stopPropagation(); }}
      />
      <div className="ve-image-comparison__divider" style={{ left: `${position}%` }} aria-hidden="true"><span className="ve-image-comparison__handle"><svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5M12 5v14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span></div>
    </div>
  </figure>;
}
