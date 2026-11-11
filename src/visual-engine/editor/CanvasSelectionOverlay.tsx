"use client";

import { useCallback, useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import type { Breakpoint, ComponentDocument, ComponentNode, GridPlacement } from "../model";
import type { GridDirection } from "../layout";
import { findNode } from "../operations";
import { ComponentSizeHandles, type ComponentSizeBounds } from "./ComponentSizeHandles";
import { GridResizeHandle } from "./GridResizeHandle";
import { layerLabel } from "./layerLabels";
import { GridMoveControls } from "./GridMoveControls";
import { GridCornerResizeHandle } from "./GridCornerResizeHandle";

export interface GridResizeTarget {
  gridNodeId: string;
  columns: number;
  span: number;
  onDraft(span: number | null): void;
  onCommit(span: number): void;
}

export interface GridPositionTarget {
  gridNodeId: string;
  placement: GridPlacement;
  onMove(direction: GridDirection): void;
  onDraftResize(size: Pick<GridPlacement, "columnSpan" | "rowSpan"> | null): void;
  onResize(size: Pick<GridPlacement, "columnSpan" | "rowSpan">): void;
}

export interface ComponentSizeTarget {
  onDraft(size: { width?: number; height?: number } | null): void;
  onCommit(size: { width?: number; height?: number }): void;
}

export interface CanvasSelectionOverlayProps {
  frameRef: RefObject<HTMLDivElement | null>;
  /** Scrollable canvas viewport; falls back to the frame's parent element. */
  viewportRef?: RefObject<HTMLElement | null>;
  /** Canvas zoom factor; measured screen pixels are divided by it. */
  zoom?: number;
  document: ComponentDocument;
  breakpoint: Breakpoint;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  gridResize: GridResizeTarget | null;
  gridPosition?: GridPositionTarget | null;
  componentSize?: ComponentSizeTarget | null;
  draftGridSize?: Pick<GridPlacement, "columnSpan" | "rowSpan"> | null;
  draftSpan: number | null;
  draftSize?: { width?: number; height?: number } | null;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface GridMetrics {
  edges: number[];
  rowEdges: number[];
  left: number;
  top: number;
  width: number;
  height: number;
}

const BREAKPOINT_NAMES: Record<Breakpoint, string> = { mobile: "Mobile", tablet: "Tablet", desktop: "Desktop" };

export function CanvasSelectionOverlay({ frameRef, viewportRef, zoom = 1, document, breakpoint, selectedNodeId, hoveredNodeId, gridResize, gridPosition = null, componentSize = null, draftSpan, draftGridSize = null, draftSize = null }: CanvasSelectionOverlayProps) {
  const [selectedRect, setSelectedRect] = useState<Rect | null>(null);
  const [sizeRect, setSizeRect] = useState<Rect | null>(null);
  const [hoverRect, setHoverRect] = useState<Rect | null>(null);
  const [visibleBounds, setVisibleBounds] = useState<ComponentSizeBounds | null>(null);
  const [grid, setGrid] = useState<GridMetrics | null>(null);
  const [dragging, setDragging] = useState(false);
  const selectedNode = selectedNodeId === null ? null : findNode(document.root, selectedNodeId) ?? null;
  const selectedType = selectedNode?.type ?? null;
  const hoveredNode = hoveredNodeId === null ? null : findNode(document.root, hoveredNodeId) ?? null;
  const hoveredType = hoveredNode?.type ?? null;

  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (frame === null) return;
    const frameRect = frame.getBoundingClientRect();
    const scale = (value: number) => value / zoom;
    const canvas = viewportRef?.current ?? (frame.parentElement instanceof HTMLElement ? frame.parentElement : null);
    if (canvas instanceof HTMLElement && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
      const canvasRect = canvas.getBoundingClientRect();
      const left = scale(canvasRect.left + canvas.clientLeft - frameRect.left);
      const top = scale(canvasRect.top + canvas.clientTop - frameRect.top);
      setVisibleBounds((current) => sameBounds(current, {
        left,
        top,
        right: left + scale(canvas.clientWidth),
        bottom: top + scale(canvas.clientHeight),
      }));
    } else {
      setVisibleBounds((current) => sameBounds(current, null));
    }
    const selectedSelector = selectedNodeId === null
      ? null
      : gridResize !== null || gridPosition !== null
        ? `[data-node-wrapper-id="${cssEscape(selectedNodeId)}"]`
        : `[data-node-id="${cssEscape(selectedNodeId)}"]`;
    const selectedElement = selectedSelector === null ? null : frame.querySelector(selectedSelector);
    setSelectedRect((current) => sameRect(current, relativeRect(selectedElement, frameRect, scale)));
    const sizeElement = componentSize !== null && selectedType === "image" && selectedElement !== null
      ? selectedElement.querySelector("img") ?? selectedElement
      : selectedElement;
    setSizeRect((current) => sameRect(current, componentSize === null ? null : relativeRect(sizeElement, frameRect, scale)));
    const hoveredSelector = hoveredNodeId === null
      ? null
      : hoveredType === "image"
        ? `[data-node-id="${cssEscape(hoveredNodeId)}"] img`
        : `[data-node-id="${cssEscape(hoveredNodeId)}"]`;
    setHoverRect((current) => sameRect(current, hoveredSelector === null || hoveredNodeId === selectedNodeId
      ? null
      : relativeRect(frame.querySelector(hoveredSelector), frameRect, scale)));
    const activeGrid = gridPosition?.gridNodeId ?? gridResize?.gridNodeId;
    setGrid((current) => sameGrid(current, activeGrid === undefined ? null : measureGrid(frame.querySelector<HTMLElement>(`[data-node-id="${cssEscape(activeGrid)}"] > div`), frameRect, 12, scale)));
  }, [componentSize, frameRef, viewportRef, zoom, selectedNodeId, selectedType, hoveredNodeId, hoveredType, gridResize, gridPosition]);

  useLayoutEffect(() => {
    measure();
  }, [measure, document, breakpoint, draftSpan, draftSize]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (frame === null) return;
    const canvas = frame.parentElement instanceof HTMLElement ? frame.parentElement : null;
    window.addEventListener("resize", measure);
    canvas?.addEventListener("scroll", measure, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => measure());
    observer?.observe(frame);
    if (canvas !== null) observer?.observe(canvas);
    return () => {
      window.removeEventListener("resize", measure);
      canvas?.removeEventListener("scroll", measure);
      observer?.disconnect();
    };
  }, [frameRef, measure]);

  const startColumn = grid !== null && selectedRect !== null ? nearestEdgeIndex(grid.edges, selectedRect.left) : 0;
  const activeSpan = draftSpan ?? gridResize?.span ?? null;
  const effectiveSize = componentSize !== null && sizeRect !== null
    ? {
        width: draftSize?.width ?? parsePixelSize(selectedNode?.style?.custom?.width) ?? sizeRect.width,
        height: draftSize?.height ?? parsePixelSize(selectedNode?.style?.custom?.height) ?? sizeRect.height,
      }
    : null;
  const selectionRect = effectiveSize !== null && sizeRect !== null ? { ...sizeRect, ...effectiveSize } : selectedRect;

  return (
    <div className="vb-overlay" aria-hidden={dragging || gridResize !== null || gridPosition !== null || componentSize !== null ? undefined : true}>
      {hoverRect !== null ? <div className="vb-overlay__hover" style={rectStyle(hoverRect)} /> : null}

      {dragging && grid !== null ? (
        <div className="vb-overlay__guides" style={{ top: grid.top, height: grid.height }}>
          {grid.edges.slice(0, -1).map((edge, index) => (
            <div key={index} className="vb-overlay__guide" style={{ left: edge, width: Math.max(0, (grid.edges[index + 1] ?? edge) - edge) }} />
          ))}
        </div>
      ) : null}

      {selectionRect !== null && selectedNode !== null ? (
        <>
          <div className="vb-overlay__selection" style={rectStyle(selectionRect)} data-testid="canvas-selection-outline">
            <span className={`vb-overlay__label${selectionRect.top < 22 ? " vb-overlay__label--inside" : ""}`}>
              {labelFor(selectedNode)}
            </span>
          </div>
          {gridResize !== null && grid !== null && selectedRect !== null ? (
            <div className="vb-overlay__handle-anchor" style={{ top: selectedRect.top, left: selectedRect.left + selectedRect.width, height: selectedRect.height }}>
              <GridResizeHandle
                frameRef={frameRef}
                zoom={zoom}
                columnEdges={grid.edges}
                startColumn={startColumn}
                span={gridResize.span}
                columns={gridResize.columns}
                onDraft={gridResize.onDraft}
                onCommit={gridResize.onCommit}
                onDragStateChange={setDragging}
              />
              {dragging && activeSpan !== null ? (
                <span className="vb-overlay__badge" role="status" aria-live="polite">
                  {BREAKPOINT_NAMES[breakpoint]} · {activeSpan} / {gridResize.columns}
                </span>
              ) : null}
            </div>
          ) : null}
          {componentSize !== null && sizeRect !== null && effectiveSize !== null ? (
            <ComponentSizeHandles
              frameRef={frameRef}
              zoom={zoom}
              rect={sizeRect}
              size={effectiveSize}
              bounds={visibleBounds}
              onDraft={componentSize.onDraft}
              onCommit={componentSize.onCommit}
              onDragStateChange={setDragging}
            />
          ) : null}
        </>
      ) : null}
      {gridPosition !== null ? (
        <>
          <div className="vb-grid-move-anchor" style={{ top: selectedRect?.top ?? 8, left: selectedRect === null ? 92 : selectedRect.left + selectedRect.width }}><GridMoveControls
            onMove={gridPosition.onMove}
            disabled={{
              left: gridPosition.placement.column <= 1,
              right: gridPosition.placement.column + gridPosition.placement.columnSpan - 1 >= 12,
              up: gridPosition.placement.row <= 1,
              down: gridPosition.placement.row + gridPosition.placement.rowSpan - 1 >= 12,
            }}
          /></div>
          {selectedRect !== null && grid !== null ? <div className="vb-grid-corner-anchor" style={{ top: selectedRect.top + selectedRect.height, left: selectedRect.left + selectedRect.width }}>
            <GridCornerResizeHandle frameRef={frameRef} zoom={zoom} columnEdges={grid.edges} rowEdges={grid.rowEdges} placement={gridPosition.placement} onDraft={gridPosition.onDraftResize} onCommit={gridPosition.onResize} onDragStateChange={setDragging} />
            {dragging ? <span className="vb-overlay__corner-badge" role="status">{BREAKPOINT_NAMES[breakpoint]} · {draftGridSize?.columnSpan ?? gridPosition.placement.columnSpan} × {draftGridSize?.rowSpan ?? gridPosition.placement.rowSpan}</span> : null}
          </div> : null}
        </>
      ) : null}
    </div>
  );
}

function labelFor(node: ComponentNode): string {
  const { type, content } = layerLabel(node);
  return `${type} · ${content}`;
}

function parsePixelSize(value: string | undefined): number | null {
  if (value === undefined) return null;
  const match = /^(\d+(?:\.\d+)?)px$/i.exec(value.trim());
  return match === null ? null : Number(match[1]);
}

function rectStyle(rect: Rect): CSSProperties {
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function relativeRect(element: Element | null, frameRect: DOMRect, scale: (value: number) => number): Rect | null {
  if (element === null) return null;
  const rect = element.getBoundingClientRect();
  return { top: scale(rect.top - frameRect.top), left: scale(rect.left - frameRect.left), width: scale(rect.width), height: scale(rect.height) };
}

function measureGrid(element: HTMLElement | null, frameRect: DOMRect, columns: number, scale: (value: number) => number): GridMetrics | null {
  if (element === null) return null;
  const rect = element.getBoundingClientRect();
  const left = scale(rect.left - frameRect.left);
  const style = typeof window === "undefined" ? null : window.getComputedStyle(element);
  const tracks = parseTracks(style?.gridTemplateColumns ?? "", columns);
  const gap = parseFloat(style?.columnGap ?? "") || 0;
  const edges: number[] = [left];
  if (tracks !== null) {
    let x = left;
    // Edge k is the right edge of column k; an item's right edge always lands exactly on one
    // of these, and its left edge sits within a gap-width of one, so nearest-edge snapping is exact.
    tracks.forEach((track, index) => {
      x += track;
      edges.push(x);
      if (index < columns - 1) x += gap;
    });
  } else {
    const columnWidth = scale(rect.width) / columns;
    for (let index = 1; index <= columns; index += 1) edges.push(left + columnWidth * index);
  }
  const top = scale(rect.top - frameRect.top);
  const rowEdges = Array.from({ length: 13 }, (_, index) => top + scale(rect.height) * index / 12);
  return { edges, rowEdges, left, top, width: scale(rect.width), height: scale(rect.height) };
}

function parseTracks(value: string, columns: number): number[] | null {
  const parts = value.trim().split(/\s+/).map((part) => parseFloat(part)).filter((part) => Number.isFinite(part));
  return parts.length === columns ? parts : null;
}

function nearestEdgeIndex(edges: number[], x: number): number {
  let nearest = 0;
  let distance = Number.POSITIVE_INFINITY;
  edges.forEach((edge, index) => {
    const candidate = Math.abs(edge - x);
    if (candidate < distance) {
      distance = candidate;
      nearest = index;
    }
  });
  return Math.min(nearest, edges.length - 2);
}

function sameRect(current: Rect | null, next: Rect | null): Rect | null {
  if (current === null || next === null) return next;
  return current.top === next.top && current.left === next.left && current.width === next.width && current.height === next.height ? current : next;
}

function sameBounds(current: ComponentSizeBounds | null, next: ComponentSizeBounds | null): ComponentSizeBounds | null {
  if (current === null || next === null) return next;
  return current.top === next.top && current.left === next.left && current.right === next.right && current.bottom === next.bottom ? current : next;
}

function sameGrid(current: GridMetrics | null, next: GridMetrics | null): GridMetrics | null {
  if (current === null || next === null) return next;
  const same = current.top === next.top && current.left === next.left && current.width === next.width && current.height === next.height && current.edges.length === next.edges.length
    && current.edges.every((edge, index) => edge === next.edges[index]) && current.rowEdges.every((edge, index) => edge === next.rowEdges[index]);
  return same ? current : next;
}

function cssEscape(value: string): string {
  return typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(value) : value.replace(/"/g, '\\"');
}
