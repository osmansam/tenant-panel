"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import type { ComponentNode, InfiniteSliderNode } from "../model";
import { normalizeLinkUrl } from "../model/urls";
import { CARD_EXPANSION_EVENT } from "./ExpandableCardRuntime";
import { useAnimationVisibility } from "./useAnimationVisibility";
import "./infinite-slider.css";

interface InfiniteSliderRuntimeProps {
  node: InfiniteSliderNode;
  mode: "canvas" | "preview";
  className?: string;
  style?: CSSProperties;
  backgrounds?: ReactNode;
  controls?: ReactNode;
  reducedMotion?: boolean;
  linksEnabled?: boolean;
  renderSlide(node: ComponentNode, instanceKey?: string): ReactNode;
}

export function InfiniteSliderRuntime({ node, mode, className, style, backgrounds, controls, reducedMotion = false, linksEnabled = true, renderSlide }: InfiniteSliderRuntimeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef(0);
  const dragRef = useRef<{ pointerId: number; startX: number; lastX: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const pointerFocus = useRef(false);
  const [repeats, setRepeats] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [expandedCards, setExpandedCards] = useState<ReadonlySet<string>>(() => new Set());
  const [hydrated, setHydrated] = useState(false);
  // The server cannot know the client's motion preference. Keep the initial
  // control markup identical, then expose the appropriate controls after mount.
  useEffect(() => setHydrated(true), []);
  const instanceId = useId().replaceAll(":", "");
  const canvas = mode === "canvas";
  const animationVisible = useAnimationVisibility(viewportRef);
  const running = hydrated && animationVisible && !canvas && node.children.length > 0 && node.autoPlay && node.speed > 0 && !reducedMotion && !paused && !(node.pauseOnHover && hovered) && !focused && !dragging && expandedCards.size === 0;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const expansion = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string; open: boolean }>).detail;
      setExpandedCards(current => {
        const next = new Set(current);
        if (detail.open) next.add(detail.id); else next.delete(detail.id);
        return next;
      });
    };
    viewport.addEventListener(CARD_EXPANSION_EVENT, expansion);
    return () => viewport.removeEventListener(CARD_EXPANSION_EVENT, expansion);
  }, []);

  useEffect(() => {
    const keyboard = () => { pointerFocus.current = false; };
    document.addEventListener("keydown", keyboard, true);
    return () => document.removeEventListener("keydown", keyboard, true);
  }, []);

  const emphasize = () => {
    const viewport = viewportRef.current;
    if (!viewport || canvas) return;
    const bounds = viewport.getBoundingClientRect();
    viewport.querySelectorAll<HTMLElement>("[data-slider-slide]").forEach(slide => {
      if (!node.centerEmphasis || reducedMotion || bounds.width <= 0) {
        slide.style.removeProperty("--ve-slide-scale");
        return;
      }
      const rect = slide.getBoundingClientRect();
      const distance = Math.min(1, Math.abs(rect.left + rect.width / 2 - (bounds.left + bounds.width / 2)) / (bounds.width / 2));
      slide.style.setProperty("--ve-slide-scale", String(1 - distance * 0.14));
    });
  };
  const wrap = () => {
    const viewport = viewportRef.current;
    const period = periodRef.current;
    if (!viewport || canvas || period <= 0) return;
    if (focused && document.activeElement !== viewport && viewport.contains(document.activeElement)) return;
    if (viewport.scrollLeft < period || viewport.scrollLeft >= period * 2) {
      viewport.scrollLeft = period + ((viewport.scrollLeft - period) % period + period) % period;
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || canvas || node.children.length === 0) return;
    const measure = () => {
      const slideWidth = Math.min(node.slideWidth, Math.max(120, viewport.clientWidth * 0.82));
      const count = Math.max(1, Math.ceil((viewport.clientWidth + slideWidth) / ((slideWidth + node.gap) * node.children.length)));
      setRepeats(count);
      const groupWidth = groupRef.current?.offsetWidth ?? 0;
      const nextPeriod = groupWidth > 0 ? groupWidth + node.gap : 0;
      const previousPeriod = periodRef.current;
      const offset = previousPeriod > 0 ? ((viewport.scrollLeft - previousPeriod) % previousPeriod + previousPeriod) % previousPeriod : 0;
      periodRef.current = nextPeriod;
      if (nextPeriod > 0) viewport.scrollLeft = nextPeriod + Math.min(offset, nextPeriod - 1);
      emphasize();
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(viewport);
    if (groupRef.current) observer?.observe(groupRef.current);
    window.addEventListener("resize", measure);
    return () => { observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, [canvas, node.children.length, node.slideWidth, node.gap, repeats]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || canvas) return;
    const hideCopies = () => viewport.querySelectorAll<HTMLElement>("[data-slider-copy='true'] :is(a, button, input, textarea, select, video, audio, iframe, summary, [tabindex], [contenteditable])").forEach(element => { element.tabIndex = -1; });
    hideCopies();
    const observer = new MutationObserver(hideCopies);
    observer.observe(viewport, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [canvas, node.children, repeats]);

  useEffect(() => {
    const viewport = viewportRef.current;
    emphasize();
    if (!viewport || !running) return;
    let frame = 0;
    let previous: number | null = null;
    let position = viewport.scrollLeft;
    let lastRenderedPosition = position;
    const animate = (time: number) => {
      if (previous !== null && !document.hidden) {
        const elapsed = Math.min(time - previous, 100) / 1000;
        // Keep subpixel progress: browsers can round each scrollLeft assignment to a pixel.
        if (viewport.scrollLeft !== lastRenderedPosition) position = viewport.scrollLeft;
        position += elapsed * node.speed * (node.direction === "right" ? -1 : 1);
        const period = periodRef.current;
        if (period > 0) position = period + ((position - period) % period + period) % period;
        viewport.scrollLeft = position;
        wrap();
        lastRenderedPosition = viewport.scrollLeft;
        emphasize();
      }
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [running, node.speed, node.direction, node.centerEmphasis, reducedMotion, focused, canvas, repeats]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (canvas || event.button !== 0 || event.pointerType === "touch") return;
    if (event.target instanceof Element && event.target.closest("input, textarea, select, button:not([data-expandable-card-trigger]), [contenteditable='true']")) return;
    suppressClick.current = false;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, lastX: event.clientX, moved: false };
  };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (!drag.moved && Math.abs(event.clientX - drag.startX) < 5) return;
    event.preventDefault();
    if (!drag.moved) {
      drag.moved = true;
      setDragging(true);
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    }
    event.currentTarget.scrollLeft -= event.clientX - drag.lastX;
    drag.lastX = event.clientX;
    wrap();
    emphasize();
  };
  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    suppressClick.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    try {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch { /* Cleanup may run after this browser resource has already been released. */ }
  };

  const groups = canvas ? [1] : [0, 1, 2];
  return (
    <section
      id={node.id}
      className={[className, "ve-infinite-slider"].filter(Boolean).join(" ")}
      style={{ ...style, "--ve-slider-width": `${node.slideWidth}px`, "--ve-slider-gap": `${node.gap}px` } as CSSProperties}
      aria-label={node.accessibleLabel}
      aria-roledescription="carousel"
      data-infinite-slider
      data-slider-mode={mode}
    >
      {backgrounds}
      <div
        ref={viewportRef}
        className="ve-infinite-slider__viewport"
        data-slider-viewport
        data-slider-running={running ? "true" : "false"}
        data-slider-fade={!canvas && node.fadeEdges ? "true" : undefined}
        data-slider-dragging={dragging ? "true" : undefined}
        tabIndex={canvas || node.children.length === 0 ? undefined : 0}
        role={canvas ? undefined : "group"}
        aria-label={canvas ? undefined : `${node.accessibleLabel} slides`}
        onScroll={() => { wrap(); emphasize(); }}
        onPointerEnter={canvas ? undefined : event => { if (event.pointerType !== "touch") setHovered(true); }}
        onPointerLeave={canvas ? undefined : () => setHovered(false)}
        onPointerDownCapture={canvas ? undefined : event => {
          pointerFocus.current = true;
          const input = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']");
          setFocused(Boolean(input));
        }}
        onFocusCapture={canvas ? undefined : event => {
          const typing = event.target instanceof Element && event.target.matches("input, textarea, select, [contenteditable='true']");
          setFocused(!pointerFocus.current || typing);
        }}
        onBlurCapture={canvas ? undefined : event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onPointerDown={canvas ? undefined : startDrag}
        onPointerMove={canvas ? undefined : moveDrag}
        onPointerUp={canvas ? undefined : finishDrag}
        onPointerCancel={canvas ? undefined : finishDrag}
        onLostPointerCapture={canvas ? undefined : finishDrag}
        onDragStart={canvas ? undefined : event => { event.preventDefault(); event.stopPropagation(); }}
        onClickCapture={canvas ? undefined : event => {
          if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; }
        }}
        onKeyDownCapture={canvas ? undefined : () => setFocused(true)}
        onKeyDown={canvas ? undefined : event => {
          if (event.target !== event.currentTarget || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
          event.preventDefault();
          event.currentTarget.scrollLeft += (event.key === "ArrowRight" ? 1 : -1) * (Math.min(node.slideWidth, event.currentTarget.clientWidth * 0.82) + node.gap);
          wrap(); emphasize();
        }}
      >
        {groups.map(group => (
          <div key={group} ref={group === 0 ? groupRef : undefined} className="ve-infinite-slider__group" data-slider-group>
            {Array.from({ length: canvas ? 1 : repeats }, (_, repeat) => node.children.map((child, index) => {
              const copy = group !== 1 || repeat !== 0;
              const target = !canvas && linksEnabled && child.slideLink ? normalizeLinkUrl(child.slideLink.href) : undefined;
              const href = target?.success ? target.value : undefined;
              return (
                <div key={`${repeat}:${child.id}`} className="ve-infinite-slider__slide" data-slider-slide data-slider-copy={copy ? "true" : undefined} aria-hidden={copy ? true : undefined}>
                  <div className="ve-infinite-slider__content" role={copy ? undefined : "group"} aria-roledescription={copy ? undefined : "slide"} aria-label={copy ? undefined : `${index + 1} of ${node.children.length}`}>
                    {href ? <>
                      <a className="ve-infinite-slider__link" data-slide-link href={href} target={child.slideLink?.openInNewTab ? "_blank" : undefined} rel={child.slideLink?.openInNewTab ? "noopener noreferrer" : undefined} aria-label={child.slideLink?.accessibleLabel || `Open slide ${index + 1}`} tabIndex={copy ? -1 : undefined} draggable={false} />
                      <div className="ve-infinite-slider__linked-body">{renderSlide(child, copy ? `${instanceId}-${group}-${repeat}` : undefined)}</div>
                    </> : renderSlide(child, copy ? `${instanceId}-${group}-${repeat}` : undefined)}
                  </div>
                </div>
              );
            }))}
          </div>
        ))}
        {canvas && node.children.length === 0 ? <p className="ve-infinite-slider__empty">Add components here to create slides.</p> : null}
      </div>
      {controls || (hydrated && !canvas && node.autoPlay && !reducedMotion && node.children.length > 0) ? (
        <div className="ve-infinite-slider__controls" onKeyDown={event => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); }}>
          {controls}
          {hydrated && !canvas && node.autoPlay && !reducedMotion && node.children.length > 0 ? <button type="button" className="ve-infinite-slider__toggle" aria-label={paused ? "Play slider" : "Pause slider"} onClick={() => setPaused(value => !value)}>
            {paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5z" fill="currentColor" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
          </button> : null}
        </div>
      ) : null}
    </section>
  );
}
