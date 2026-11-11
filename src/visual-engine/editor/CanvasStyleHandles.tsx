"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import type { Breakpoint, ComponentDocument, ComponentNode } from "../model";
import type { NodePatch } from "../operations";
import { clampDirectStyleValue, directStylePatch, directStyleValue, supportsDirectGap, type DirectStyleProperty } from "./directStyle";
import "./canvas-style-handles.css";

type Box = { left: number; top: number; width: number; height: number; minX: number; minY: number; maxX: number; maxY: number };
type Gesture = { pointer: number; button: HTMLButtonElement; property: DirectStyleProperty; x: number; y: number; initial: number; value: number; angle: number; centerX: number; centerY: number; rotate: number };
interface Props {
  frameRef: RefObject<HTMLDivElement | null>;
  /** Scrollable canvas viewport; falls back to the frame's parent element. */
  viewportRef?: RefObject<HTMLElement | null>;
  /** Canvas zoom factor; screen-pixel measurements divide by it. */
  zoom?: number;
  document: ComponentDocument;
  node: ComponentNode;
  breakpoint: Breakpoint;
  onDraft(patch: NodePatch | null): void;
  onCommit(patch: NodePatch): void;
}
const labels: Record<DirectStyleProperty, string> = { paddingTop: "Padding top", paddingRight: "Padding right", paddingBottom: "Padding bottom", paddingLeft: "Padding left", gap: "Child gap", borderRadius: "Corner radius", rotate: "Rotation" };

export function CanvasStyleHandles({ frameRef, viewportRef, zoom = 1, document: source, node, breakpoint, onDraft, onCommit }: Props) {
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const [draft, setDraft] = useState<{ property: DirectStyleProperty; value: number } | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const callbacks = useRef({ onDraft, onCommit });
  callbacks.current = { onDraft, onCommit };
  const semantic = useCallback(() => {
    const wrapper = frameRef.current?.querySelector<HTMLElement>(`[data-node-id="${CSS.escape(node.id)}"]`);
    if (!wrapper) return null;
    // Effects and animations wrap the semantic element. Its responsive class is
    // attached by the renderer; children have their own nearest canvas wrapper.
    const element = Array.from(wrapper.querySelectorAll<HTMLElement>(`.ve-responsive-${breakpoint}`))
      .find(candidate => candidate.closest("[data-node-id]") === wrapper);
    return element ?? wrapper.firstElementChild as HTMLElement | null;
  }, [frameRef, node.id, breakpoint]);
  const measure = useCallback(() => {
    const frame = frameRef.current, element = semantic();
    if (!frame || !element) { setBox(null); return; }
    const r = element.getBoundingClientRect(), f = frame.getBoundingClientRect();
    const viewport = (viewportRef?.current ?? frame.parentElement)?.getBoundingClientRect();
    const s = (value: number) => value / zoom;
    // Rects are screen pixels under the zoom transform; convert to frame units.
    const next: Box = { left: s(r.left - f.left), top: s(r.top - f.top), width: s(r.width), height: s(r.height),
      minX: Math.max(0, s((viewport?.left ?? f.left) - f.left)) + 12, minY: Math.max(0, s((viewport?.top ?? f.top) - f.top)) + 12,
      maxX: Math.min(s(f.width), s((viewport?.right ?? f.right) - f.left)) - 12, maxY: Math.min(s(f.height), s((viewport?.bottom ?? f.bottom) - f.top)) - 12 };
    setBox(old => JSON.stringify(old) === JSON.stringify(next) ? old : next);
  }, [frameRef, viewportRef, semantic, zoom]);
  useLayoutEffect(measure, [measure, source]);
  useEffect(() => {
    measure();
    const frame = frameRef.current, element = semantic();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (frame) observer?.observe(frame);
    if (element) observer?.observe(element);
    window.addEventListener("resize", measure); frame?.parentElement?.addEventListener("scroll", measure);
    return () => { observer?.disconnect(); window.removeEventListener("resize", measure); frame?.parentElement?.removeEventListener("scroll", measure); };
  }, [frameRef, semantic, measure]);
  const cancel = useCallback(() => {
    const active = gesture.current;
    gesture.current = null;
    if (active) { try { if (active.button.hasPointerCapture?.(active.pointer)) active.button.releasePointerCapture(active.pointer); } catch { /* Cleanup may run after this browser resource has already been released. */ } }
    setDraft(null); callbacks.current.onDraft(null);
  }, []);
  useEffect(() => { cancel(); }, [source, node.id, breakpoint, cancel]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && gesture.current) { event.preventDefault(); event.stopPropagation(); cancel(); } };
    window.addEventListener("keydown", escape, true);
    return () => { window.removeEventListener("keydown", escape, true); const active = gesture.current; gesture.current = null; if (active) { try { active.button.releasePointerCapture?.(active.pointer); } catch { /* Cleanup may run after this browser resource has already been released. */ } callbacks.current.onDraft(null); } };
  }, [cancel]);

  const value = (property: DirectStyleProperty) => {
    if (draft?.property === property) return draft.value;
    const style = semantic() ? getComputedStyle(semantic()!) : null;
    const raw = property === "rotate" ? style?.rotate : property === "gap" ? style?.gap : property === "borderRadius" ? style?.borderTopLeftRadius : style?.[property];
    const computed = raw === undefined ? NaN : parseFloat(raw);
    return Number.isFinite(computed) ? Math.round(computed) : directStyleValue(node, breakpoint, property);
  };
  const begin = (event: PointerEvent<HTMLButtonElement>, property: DirectStyleProperty) => {
    if (event.button > 0 || event.isPrimary === false || gesture.current) return;
    event.preventDefault(); event.stopPropagation(); event.currentTarget.focus({ preventScroll: true });
    const r = semantic()?.getBoundingClientRect();
    const centerX = (r?.left ?? 0) + (r?.width ?? 0) / 2, centerY = (r?.top ?? 0) + (r?.height ?? 0) / 2;
    const initial = value(property);
    gesture.current = { pointer: event.pointerId, button: event.currentTarget, property, x: event.clientX, y: event.clientY, initial, value: initial,
      centerX, centerY, angle: Math.atan2(event.clientY - centerY, event.clientX - centerX), rotate: (node.style?.transform?.rotate ?? 0) * Math.PI / 180 };
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    setDraft({ property, value: initial });
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointer) return;
    event.preventDefault(); event.stopPropagation();
    const dx = (event.clientX - active.x) / zoom, dy = (event.clientY - active.y) / zoom;
    const localX = dx * Math.cos(active.rotate) + dy * Math.sin(active.rotate), localY = dy * Math.cos(active.rotate) - dx * Math.sin(active.rotate);
    let delta = active.property === "paddingRight" ? -localX : active.property === "paddingBottom" ? -localY : active.property === "paddingTop" ? localY : localX;
    if (active.property === "gap") delta = node.type === "stack" || node.type === "flex" ? node.direction === "column" ? localY : localX : localY;
    if (active.property === "rotate") {
      delta = (Math.atan2(event.clientY - active.centerY, event.clientX - active.centerX) - active.angle) * 180 / Math.PI;
      delta = ((delta + 540) % 360) - 180;
    }
    active.value = clampDirectStyleValue(active.property, active.initial + delta, event.shiftKey);
    setDraft({ property: active.property, value: active.value });
    callbacks.current.onDraft(directStylePatch(node, breakpoint, active.property, active.value));
  };
  const finish = (event: PointerEvent<HTMLButtonElement>) => {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointer) return;
    event.preventDefault(); event.stopPropagation(); gesture.current = null;
    try { if (active.button.hasPointerCapture?.(active.pointer)) active.button.releasePointerCapture(active.pointer); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    if (active.value !== active.initial) callbacks.current.onCommit(directStylePatch(node, breakpoint, active.property, active.value));
    setDraft(null); callbacks.current.onDraft(null);
  };
  if (!box) return null;
  const pin = (x: number, y: number) => ({ left: Math.max(box.minX, Math.min(box.maxX, x)), top: Math.max(box.minY, Math.min(box.maxY, y)) });
  const centerX = box.left + box.width / 2, centerY = box.top + box.height / 2;
  const points: Record<DirectStyleProperty, { x: number; y: number }> = {
    paddingTop: { x: centerX, y: box.top + Math.min(box.height / 3, value("paddingTop")) },
    paddingRight: { x: box.left + box.width - Math.min(box.width / 3, value("paddingRight")), y: centerY },
    paddingBottom: { x: centerX, y: box.top + box.height - Math.min(box.height / 3, value("paddingBottom")) },
    paddingLeft: { x: box.left + Math.min(box.width / 3, value("paddingLeft")), y: centerY },
    gap: { x: centerX + 44, y: centerY }, borderRadius: { x: box.left + box.width - 18, y: box.top + 18 }, rotate: { x: centerX + 80, y: box.top + 18 },
  };
  return <div className="vb-direct-style" onClick={event => event.stopPropagation()} onDoubleClick={event => event.stopPropagation()} onPointerDown={event => event.stopPropagation()} onKeyDown={event => event.stopPropagation()}>
    <button type="button" className="vb-direct-style__toggle" aria-label="Style controls" aria-pressed={open} style={pin(box.left + 42, box.top - 16)} onClick={() => { if (open) cancel(); setOpen(!open); }}>Style <span>{open ? "−" : "+"}</span></button>
    {open ? <>
      <div className="vb-direct-style__wash" style={{ left: box.left, top: box.top, width: box.width, height: box.height }} />
      {(Object.keys(labels) as DirectStyleProperty[]).filter(property => property !== "gap" || supportsDirectGap(node)).map(property => <button
        key={property} type="button" role="slider" className={`vb-direct-style__handle vb-direct-style__handle--${property}`} style={pin(points[property].x, points[property].y)}
        aria-label={labels[property]} aria-valuemin={property === "rotate" ? -180 : 0} aria-valuemax={property === "rotate" ? 180 : 512} aria-valuenow={value(property)} aria-valuetext={`${value(property)}${property === "rotate" ? " degrees" : " pixels"}`}
        title={`${labels[property]} · drag to adjust · arrow keys: 1${property === "rotate" ? "°" : "px"} · Shift: ${property === "rotate" ? "15°" : "10px"}`}
        onPointerDown={event => begin(event, property)} onPointerMove={move} onPointerUp={finish} onPointerCancel={cancel} onLostPointerCapture={() => { if (gesture.current) cancel(); }}
        onKeyDown={event => {
          if (event.key === "Escape") { event.preventDefault(); cancel(); return; }
          if (gesture.current) return;
          const delta = ["ArrowRight", "ArrowUp"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 0;
          const next = event.key === "Home" ? property === "rotate" ? -180 : 0 : event.key === "End" ? property === "rotate" ? 180 : 512 : delta ? value(property) + delta * (event.shiftKey ? property === "rotate" ? 15 : 10 : 1) : null;
          if (next === null) return;
          event.preventDefault(); callbacks.current.onCommit(directStylePatch(node, breakpoint, property, clampDirectStyleValue(property, next)));
        }}
      >{property === "rotate" ? "↻" : property === "borderRadius" ? "◜" : property === "gap" ? "↔" : property === "paddingTop" || property === "paddingBottom" ? "↕" : "↔"}</button>)}
      {draft ? <output className="vb-direct-style__readout" style={pin(centerX, box.top + box.height - 18)}>{labels[draft.property]} {draft.value}{draft.property === "rotate" ? "°" : "px"}</output> : null}
    </> : null}
  </div>;
}
