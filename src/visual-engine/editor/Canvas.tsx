"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type DragEvent, type PointerEvent } from "react";
import type { Breakpoint, ComponentDocument, ComponentNode, GridNode, NodeType } from "../model";
import type { GridDirection } from "../layout";
import { findNode, findParent, mapNode, isBesideDropTarget, isStructuralNode, type BesideSide, type NodePatch } from "../operations";
import { componentEditorRegistry } from "../components/editor";
import { BUILDER_SITE_PREVIEW, VisualNodePreview, VisualRenderer } from "../renderer";
import type { DisclosurePreviewState, InlineTextEditProps } from "../renderer";
import { CanvasSelectionOverlay, type ComponentSizeTarget, type GridPositionTarget, type GridResizeTarget } from "./CanvasSelectionOverlay";
import { inferFlowGridSpan, isPositioningGrid } from "../renderer/gridPlacementStyles";
import { fitComponentToGrid } from "./gridDrop";
import type { EffectRegistry } from "../effects/core";
import { ThemeScope, type SiteTheme, type ThemePaletteName } from "../theme";
import type { DropPosition } from "./layerDropTypes";
import { computeAlignmentGuides, hasGuides, type AlignmentGuides, type GuideRect } from "./alignmentGuides";
import { supportsDirectStyle } from "./directStyle";
import { CanvasStyleHandles } from "./CanvasStyleHandles";
import { AlignmentGuidesOverlay } from "./AlignmentGuidesOverlay";
import { clampZoom, fitZoom, screenToFrame, stepZoom, type ZoomMode } from "./canvasZoom";

const FRAME_CLASSES: Record<Breakpoint, string> = {
  mobile: "max-w-[390px]",
  tablet: "max-w-[768px]",
  desktop: "max-w-[1280px]",
};

const FRAME_WIDTH_PX: Record<Breakpoint, number> = {
  mobile: 390,
  tablet: 768,
  desktop: 1280,
};

const CANVAS_DROP_CLASSES: Record<DropPosition, string> = {
  before: "vb-canvas-drop-target--before",
  after: "vb-canvas-drop-target--after",
  inside: "vb-canvas-drop-target--inside",
};

const DROP_TARGET_CLASS = "vb-canvas-drop-target";
const DROP_OPEN_CLASS = "vb-canvas-drop-open";
const DROP_CONTAINER_CLASS = "vb-canvas-drop-container";

export interface CanvasDropTargets {
  /** Nodes that accept a before/after (or inside) drop right now. */
  open: ReadonlySet<string>;
  /** Nodes that also accept an "inside" drop (containers). */
  inside: ReadonlySet<string>;
}

export interface CanvasDropProps {
  indicator: { nodeId: string; position: DropPosition } | null;
  /** Live-valid drop targets for the active drag; null when not dragging. */
  targets?: CanvasDropTargets | null;
  /** nodeId is null when the drop lands on empty canvas space and the selection target applies. */
  onDragOver(nodeId: string | null, position: DropPosition, event: DragEvent): void;
  onDrop(nodeId: string | null, position: DropPosition, event: DragEvent): void;
  onDragEnd(): void;
  /** Starts a drag for a component already on the canvas. */
  onNodeDragStart(nodeId: string, event: DragEvent): void;
  /** Node currently being dragged, used to offer precise Grid slot drops. */
  draggingNodeId?: string | null;
  /** Library node type currently being dragged, used to offer Grid slot drops for new components. */
  draggingNodeType?: NodeType | null;
  /** Called while a slot or beside preview replaces the before/after drop indicator. */
  onPreviewDragOver?(): void;
  /** Places a dragged node, or a new library component, at an explicit flow Grid slot. */
  onGridSlotDrop?(drop: CanvasGridSlotDrop): void;
  /** True when dropping beside the target can create a Flex row. */
  canDropBeside?(targetNodeId: string): boolean;
  /** Wraps the target and the dragged component in a Flex row. */
  onDropBeside?(drop: CanvasBesideDrop): void;
}

export interface CanvasBesideDrop {
  targetNodeId: string;
  side: BesideSide;
}

export interface CanvasGridSlotDrop {
  nodeId: string | null;
  nodeType: NodeType | null;
  gridId: string;
  column: number;
  row: number;
  span: number;
}

interface CanvasGridSlot {
  nodeId: string | null;
  nodeType: NodeType | null;
  gridId: string;
  column: number;
  row: number;
  span: number;
  rect: { top: number; left: number; width: number; height: number };
}

interface CanvasBesideSlot {
  targetNodeId: string;
  side: BesideSide;
  top: number;
  left: number | null;
  right: number | null;
  maxWidth: number;
  minHeight: number;
}

interface RowBand {
  top: number;
  bottom: number;
  height: number;
}

export interface CanvasProps {
  focusedCard?: { label: string; onExit(): void };
  document: ComponentDocument;
  stylePainting?: boolean;
  breakpoint: Breakpoint;
  selectedNodeId: string | null;
  replayTokens?: Record<string, number>;
  motionTime?: number;
  effectRegistry?: EffectRegistry;
  onSelect(nodeId: string): void;
  /** Commits a new span for the selected grid child at the active breakpoint (one history entry). */
  onCommitSpan(span: number): void;
  onMoveGridChild(direction: GridDirection): void;
  onResizeGridChild(size: { columnSpan: number; rowSpan: number }): void;
  /** Commits a custom pixel width/height for the selected node (one history entry). */
  onResizeComponent(size: { width?: number; height?: number }): void;
  disclosurePreview?: DisclosurePreviewState;
  theme?: SiteTheme;
  themePalette?: ThemePaletteName;
  canvasDrop?: CanvasDropProps;
  inlineTextEdit?: InlineTextEditProps;
  /** Applies structural node patches from on-canvas controls (for example table row/column edits). */
  onNodePatch?(nodeId: string, patch: NodePatch): void;
}

export function Canvas({ document, focusedCard, stylePainting = false, breakpoint, selectedNodeId, replayTokens, motionTime, effectRegistry, onSelect, onCommitSpan, onMoveGridChild, onResizeGridChild, onResizeComponent, disclosurePreview, theme, themePalette, canvasDrop, inlineTextEdit, onNodePatch }: CanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [zoomMode, setZoomMode] = useState<ZoomMode>("fit");
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [frameHeight, setFrameHeight] = useState<number | null>(null);
  const [draftSpan, setDraftSpan] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [draftGridSize, setDraftGridSize] = useState<{ columnSpan: number; rowSpan: number } | null>(null);
  const [draftSize, setDraftSize] = useState<{ width?: number; height?: number } | null>(null);
  const [gridSlot, setGridSlot] = useState<CanvasGridSlot | null>(null);
  const [besideSlot, setBesideSlot] = useState<CanvasBesideSlot | null>(null);
  const [guides, setGuides] = useState<AlignmentGuides | null>(null);
  const grabOffset = useRef<{ x: number; y: number } | null>(null);

  const [styleDraft, setStyleDraft] = useState<{ id: string; patch: NodePatch } | null>(null);
  const canStyle = onNodePatch !== undefined && motionTime === undefined && !stylePainting && !inlineTextEdit?.editingNodeId;
  const styledDocument = useMemo(() => !canStyle || !styleDraft ? document : {
    ...document, root: mapNode(document.root, styleDraft.id, node => ({ ...node, ...styleDraft.patch } as ComponentNode)) as ComponentDocument["root"],
  }, [document, styleDraft, canStyle]);
  useEffect(() => setStyleDraft(null), [document, selectedNodeId, breakpoint, canStyle]);

  const selectedNode = selectedNodeId === null ? null : findNode(document.root, selectedNodeId) ?? null;
  const selectedParent = selectedNodeId === null ? null : findParent(document.root, selectedNodeId) ?? null;
  const committedSpan = selectedNode?.layout?.span?.[breakpoint];
  const gridNodeId = selectedParent?.type === "grid" ? selectedParent.id : null;
  const gridColumns = selectedParent?.type === "grid" ? selectedParent.columns : 12;
  const gridResize = useMemo<GridResizeTarget | null>(() => (
    gridNodeId !== null && committedSpan !== undefined && selectedNode?.type !== "image"
      ? { gridNodeId, columns: gridColumns, span: committedSpan, onDraft: setDraftSpan, onCommit: onCommitSpan }
      : null
  ), [gridNodeId, gridColumns, committedSpan, onCommitSpan, selectedNode?.type]);
  const gridPosition = useMemo<GridPositionTarget | null>(() => {
    const placement = selectedNode?.layout?.placement?.[breakpoint];
    if (gridNodeId === null || placement === undefined) return null;
    return { gridNodeId, placement, onMove: onMoveGridChild, onDraftResize: setDraftGridSize, onResize: onResizeGridChild };
  }, [breakpoint, gridNodeId, onMoveGridChild, onResizeGridChild, selectedNode]);
  const componentSize = useMemo<ComponentSizeTarget | null>(() => (
    selectedNode !== null && selectedNode.type !== "slot" && selectedParent !== null
      && (selectedParent.type !== "grid" || selectedNode.type === "image")
      ? { onDraft: setDraftSize, onCommit: onResizeComponent }
      : null
  ), [onResizeComponent, selectedNode, selectedParent]);
  const sizeOverride = draftSize !== null && selectedNodeId !== null ? { nodeId: selectedNodeId, ...draftSize } : undefined;
  const gridSlotPreviewNode = useMemo(() => {
    if (gridSlot?.nodeType == null) return null;
    let sequence = 0;
    const editor = componentEditorRegistry.get(gridSlot.nodeType);
    return fitComponentToGrid(editor.createDefault(() => `vb-grid-drag-preview-${sequence++}`));
  }, [gridSlot?.nodeType]);
  const besideTargetId = besideSlot?.targetNodeId ?? null;
  const besidePreviewNode = useMemo(() => {
    if (besideTargetId === null) return null;
    const draggedNodeId = canvasDrop?.draggingNodeId ?? null;
    if (draggedNodeId !== null) return findNode(document.root, draggedNodeId) ?? null;
    const nodeType = canvasDrop?.draggingNodeType ?? null;
    if (nodeType === null) return null;
    let sequence = 0;
    return componentEditorRegistry.get(nodeType).createDefault(() => `vb-beside-drag-preview-${sequence++}`);
  }, [besideTargetId, canvasDrop?.draggingNodeId, canvasDrop?.draggingNodeType, document.root]);

  const trackHover = useCallback((event: PointerEvent<HTMLElement>) => {
    if (draftSpan !== null) return;
    const target = event.target instanceof Element ? event.target.closest("[data-node-id]") : null;
    setHoveredNodeId(target?.getAttribute("data-node-id") ?? null);
  }, [draftSpan]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    return () => {
      frame.querySelectorAll(`.${DROP_TARGET_CLASS}`).forEach((element) => element.classList.remove(DROP_TARGET_CLASS, ...Object.values(CANVAS_DROP_CLASSES)));
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const modifiers = Object.values(CANVAS_DROP_CLASSES);
    frame.querySelectorAll(`.${DROP_TARGET_CLASS}`).forEach((element) => element.classList.remove(DROP_TARGET_CLASS, ...modifiers));
    if (canvasDrop?.indicator === undefined || canvasDrop.indicator === null) return;
    const target = frame.querySelector(`[data-node-id="${CSS.escape(canvasDrop.indicator.nodeId)}"]`);
    if (!target) return;
    target.classList.add(DROP_TARGET_CLASS, CANVAS_DROP_CLASSES[canvasDrop.indicator.position]);
  }, [canvasDrop?.indicator]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const targets = canvasDrop?.targets;
    if (!targets || targets.open.size === 0 || gridSlot !== null || besideSlot !== null) return;
    const apply = (element: Element) => {
      const id = element.getAttribute("data-node-id") ?? "";
      if (!targets.open.has(id)) return;
      element.classList.add(DROP_OPEN_CLASS);
      if (targets.inside.has(id)) element.classList.add(DROP_CONTAINER_CLASS);
    };
    frame.querySelectorAll("[data-node-id]").forEach(apply);
    return () => frame.querySelectorAll(`.${DROP_OPEN_CLASS}, .${DROP_CONTAINER_CLASS}`).forEach((element) => element.classList.remove(DROP_OPEN_CLASS, DROP_CONTAINER_CLASS));
  }, [canvasDrop?.targets, gridSlot, besideSlot]);

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const measureViewport = useCallback(() => {
    const viewport = viewportRef.current;
    const frame = frameRef.current;
    if (viewport === null || frame === null) return;
    setViewportWidth(viewport.clientWidth > 0 ? viewport.clientWidth : null);
    const height = screenToFrame(frame.getBoundingClientRect().height, zoomRef.current);
    setFrameHeight((current) => current !== null && Math.abs(current - height) < 0.5 ? current : Math.max(1, height));
  }, []);
  useLayoutEffect(() => { measureViewport(); }, [measureViewport, breakpoint, document, zoom]);
  useEffect(() => {
    const viewport = viewportRef.current;
    const frame = frameRef.current;
    measureViewport();
    window.addEventListener("resize", measureViewport);
    viewport?.addEventListener("scroll", measureViewport, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureViewport);
    if (frame) observer?.observe(frame);
    if (viewport) observer?.observe(viewport);
    return () => {
      window.removeEventListener("resize", measureViewport);
      viewport?.removeEventListener("scroll", measureViewport);
      observer?.disconnect();
    };
  }, [measureViewport]);

  // Fit is the default zoom: at narrower viewports the whole desktop frame
  // stays visible instead of overflowing into horizontal navigation.
  useEffect(() => {
    if (zoomMode !== "fit" || viewportWidth === null) return;
    setZoom(fitZoom(viewportWidth, FRAME_WIDTH_PX[breakpoint]));
  }, [breakpoint, viewportWidth, zoomMode]);

  const applyZoom = useCallback((next: number) => {
    setZoom(clampZoom(next));
    setZoomMode("custom");
  }, []);
  const zoomIn = useCallback(() => applyZoom(stepZoom(zoomRef.current, 1)), [applyZoom]);
  const zoomOut = useCallback(() => applyZoom(stepZoom(zoomRef.current, -1)), [applyZoom]);
  const resetZoom = useCallback(() => applyZoom(1), [applyZoom]);
  const fitToScreen = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport === null) return;
    setZoom(fitZoom(viewport.clientWidth, FRAME_WIDTH_PX[breakpoint]));
    setZoomMode("fit");
  }, [breakpoint]);

  const resolveBeside = (event: DragEvent): CanvasBesideSlot | null => {
    const frame = frameRef.current;
    if (frame === null || canvasDrop === undefined) return null;
    if ((canvasDrop.draggingNodeId ?? null) === null && (canvasDrop.draggingNodeType ?? null) === null) return null;
    if (!(event.target instanceof Element)) return null;
    const element = event.target.closest("[data-node-id]");
    const targetNodeId = element?.getAttribute("data-node-id") ?? null;
    if (element === null || targetNodeId === null) return null;
    const target = findNode(document.root, targetNodeId);
    const parent = target === undefined ? undefined : findParent(document.root, target.id);
    if (target === undefined || !isBesideDropTarget(target, parent)) return null;
    if (canvasDrop.canDropBeside !== undefined && !canvasDrop.canDropBeside(target.id)) return null;

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const verticalBand = rect.height * 0.2;
    if (event.clientY < rect.top + verticalBand || event.clientY > rect.bottom - verticalBand) return null;
    const horizontalBand = Math.min(rect.width * 0.25, 72);
    const side: BesideSide | null = event.clientX <= rect.left + horizontalBand
      ? "left"
      : event.clientX >= rect.right - horizontalBand
        ? "right"
        : null;
    if (side === null) return null;

    const frameRect = frame.getBoundingClientRect();
    const gap = 8;
    return {
      targetNodeId: target.id,
      side,
      top: screenToFrame(rect.top - frameRect.top, zoom),
      left: side === "right" ? screenToFrame(rect.right - frameRect.left + gap, zoom) : null,
      right: side === "left" ? screenToFrame(frameRect.right - rect.left + gap, zoom) : null,
      maxWidth: screenToFrame(Math.max(96, Math.min(rect.width, 260)), zoom),
      minHeight: screenToFrame(rect.height, zoom),
    };
  };

  const resolveGridSlot = (event: DragEvent): CanvasGridSlot | null => {
    const frame = frameRef.current;
    if (frame === null) return null;
    const draggingNodeId = canvasDrop?.draggingNodeId ?? null;
    const libraryType = canvasDrop?.draggingNodeType ?? null;
    if (draggingNodeId === null && libraryType === null) return null;

    const node = draggingNodeId === null ? undefined : findNode(document.root, draggingNodeId);
    if (draggingNodeId !== null && node === undefined) return null;

    let grid: GridNode | null = null;
    if (node !== undefined) {
      const parent = findParent(document.root, node.id) ?? null;
      if (parent === null || parent.type !== "grid" || isPositioningGrid(parent)) return null;
      grid = parent;
    } else {
      const target = event.target instanceof Element ? event.target.closest("[data-node-id]") : null;
      const targetId = target?.getAttribute("data-node-id") ?? null;
      if (targetId === null) return null;
      const targetNode = findNode(document.root, targetId);
      if (targetNode === undefined) return null;
      let ancestor: ComponentNode | undefined = targetNode;
      while (ancestor !== undefined && ancestor.type !== "grid") ancestor = findParent(document.root, ancestor.id);
      if (ancestor === undefined || ancestor.type !== "grid" || isPositioningGrid(ancestor)) return null;
      if (targetNode.id !== ancestor.id) return null;
      grid = ancestor;
    }

    const gridHost = frame.querySelector(`[data-node-id="${CSS.escape(grid.id)}"]`);
    const gridElement = gridHost?.querySelector<HTMLElement>(".grid-cols-12") ?? null;
    if (gridElement === null) return null;
    const gridRect = gridElement.getBoundingClientRect();
    if (gridRect.width === 0 || gridRect.height === 0) return null;
    if (event.clientX < gridRect.left || event.clientX > gridRect.right || event.clientY < gridRect.top || event.clientY > gridRect.bottom) return null;

    const frameRect = frame.getBoundingClientRect();
    const toFrame = (value: number) => screenToFrame(value, zoom);
    // Element rects are screen pixels under the zoom transform, while computed
    // styles and track sizes are layout pixels; only rect-derived values convert.
    const gridLeft = toFrame(gridRect.left - frameRect.left);
    const style = window.getComputedStyle(gridElement);
    const borderLeft = parseFloat(style.borderLeftWidth) || 0;
    const borderRight = parseFloat(style.borderRightWidth) || 0;
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const columnGap = parseFloat(style.columnGap) || 0;
    const rowGap = parseFloat(style.rowGap) || 0;
    const contentLeft = gridLeft + borderLeft + paddingLeft;
    const contentWidth = Math.max(1, toFrame(gridRect.width) - borderLeft - borderRight - paddingLeft - paddingRight);
    const tracks = resolveTracks(style.gridTemplateColumns, contentWidth, columnGap);
    const column = columnAt(tracks, contentLeft, columnGap, toFrame(event.clientX - frameRect.left));
    const span = node !== undefined
      ? Math.max(1, Math.min(12, node.layout?.span?.[breakpoint] ?? 1))
      : inferFlowGridSpan(grid, breakpoint);
    const slotCount = Math.max(1, Math.floor(12 / span));
    const slotIndex = Math.min(slotCount - 1, Math.max(0, Math.floor((column - 1) / span)));
    const startColumn = slotIndex * span + 1;

    const bands = measureRowBands(gridElement);
    const { row, band } = resolveRow(bands, event.clientY, rowGap);
    const overlapping = grid.children.some((child) => {
      if (node !== undefined && child.id === node.id) return false;
      const other = child.layout?.start?.[breakpoint];
      if (!other || other.row !== row) return false;
      const otherSpan = Math.max(1, child.layout?.span?.[breakpoint] ?? 1);
      return startColumn < other.column + otherSpan && startColumn + span > other.column;
    });
    if (overlapping) return null;

    const slotTracks = tracks.slice(startColumn - 1, startColumn - 1 + span);
    const slotLeft = tracks.slice(0, startColumn - 1).reduce((sum, value) => sum + value, 0) + columnGap * (startColumn - 1);
    const slotWidth = slotTracks.reduce((sum, value) => sum + value, 0) + columnGap * Math.max(0, slotTracks.length - 1);
    const draggedWrapper = node === undefined ? null : gridElement.querySelector(`[data-node-wrapper-id="${CSS.escape(node.id)}"]`);
    const draggedRect = draggedWrapper?.getBoundingClientRect();
    const newRow = row > bands.length && bands.length > 0;
    const top = newRow
      ? toFrame((bands[bands.length - 1]?.bottom ?? gridRect.top) - frameRect.top) + rowGap
      : toFrame((band?.top ?? gridRect.top) - frameRect.top);
    const height = toFrame(band?.height ?? draggedRect?.height ?? 64);
    return {
      nodeId: node?.id ?? null,
      nodeType: node === undefined ? libraryType : null,
      gridId: grid.id,
      column: startColumn,
      row,
      span,
      rect: {
        top,
        left: contentLeft + slotLeft,
        width: slotWidth,
        height: newRow ? toFrame(draggedRect?.height ?? height) : height,
      },
    };
  };

  const resolveCanvasPosition = (element: Element, nodeId: string, event: DragEvent): DropPosition => {
    const node = findNode(document.root, nodeId);
    const rect = element.getBoundingClientRect();
    if (node !== undefined && isStructuralNode(node)) {
      const band = Math.min(rect.height * 0.3, 12);
      if (event.clientY < rect.top + band) return "before";
      if (event.clientY > rect.bottom - band) return "after";
      return "inside";
    }
    return event.clientY <= rect.top + rect.height / 2 ? "before" : "after";
  };

  const locateDrop = (event: DragEvent): { nodeId: string | null; position: DropPosition } | null => {
    if (!(event.target instanceof Element) || canvasDrop === undefined) return null;
    const element = event.target.closest("[data-node-id]");
    if (element === null) return { nodeId: null, position: "inside" };
    const nodeId = element.getAttribute("data-node-id");
    if (nodeId === null) return { nodeId: null, position: "inside" };
    return { nodeId, position: resolveCanvasPosition(element, nodeId, event) };
  };

  const clearGuides = () => {
    grabOffset.current = null;
    setGuides((current) => current === null ? current : null);
  };

  const updateGuides = (event: DragEvent) => {
    const frame = frameRef.current;
    const draggedId = canvasDrop?.draggingNodeId ?? null;
    if (frame === null || draggedId === null) return;
    const dragged = frame.querySelector<HTMLElement>(`[data-node-wrapper-id="${CSS.escape(draggedId)}"]`);
    if (dragged === null) return;
    const rect = dragged.getBoundingClientRect();
    if (grabOffset.current === null) grabOffset.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const frameRect = frame.getBoundingClientRect();
    const toFrame = (value: number) => screenToFrame(value, zoom);
    const moving = {
      left: toFrame(event.clientX - grabOffset.current.x - frameRect.left),
      top: toFrame(event.clientY - grabOffset.current.y - frameRect.top),
      width: toFrame(rect.width),
      height: toFrame(rect.height),
    };
    const others: GuideRect[] = [];
    frame.querySelectorAll<HTMLElement>("[data-node-wrapper-id]").forEach((element) => {
      if (element === dragged || dragged.contains(element) || element.contains(dragged)) return;
      const box = element.getBoundingClientRect();
      others.push({ left: toFrame(box.left - frameRect.left), top: toFrame(box.top - frameRect.top), width: toFrame(box.width), height: toFrame(box.height) });
    });
    const next = computeAlignmentGuides(moving, others);
    setGuides(hasGuides(next) ? next : null);
  };

  const handleDragOver = (event: DragEvent) => {
    if (canvasDrop === undefined || stylePainting) return;
    updateGuides(event);
    const beside = resolveBeside(event);
    if (beside !== null) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setBesideSlot((current) => sameBesideSlot(current, beside));
      setGridSlot((current) => current === null ? current : null);
      canvasDrop.onPreviewDragOver?.();
      return;
    }
    setBesideSlot((current) => current === null ? current : null);
    const slot = resolveGridSlot(event);
    if (slot !== null) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setGridSlot((current) => sameGridSlot(current, slot));
      canvasDrop.onPreviewDragOver?.();
      return;
    }
    setGridSlot((current) => current === null ? current : null);
    const located = locateDrop(event);
    if (located === null) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    canvasDrop.onDragOver(located.nodeId, located.position, event);
  };

  const handleDrop = (event: DragEvent) => {
    clearGuides();
    if (canvasDrop === undefined || stylePainting) return;
    const beside = resolveBeside(event);
    if (beside !== null) {
      event.preventDefault();
      event.stopPropagation();
      setBesideSlot(null);
      canvasDrop.onDropBeside?.({ targetNodeId: beside.targetNodeId, side: beside.side });
      return;
    }
    setBesideSlot(null);
    const slot = resolveGridSlot(event);
    if (slot !== null) {
      event.preventDefault();
      event.stopPropagation();
      setGridSlot(null);
      canvasDrop.onGridSlotDrop?.({
        nodeId: slot.nodeId,
        nodeType: slot.nodeType,
        gridId: slot.gridId,
        column: slot.column,
        row: slot.row,
        span: slot.span,
      });
      return;
    }
    setGridSlot(null);
    const located = locateDrop(event);
    if (located === null) return;
    event.preventDefault();
    event.stopPropagation();
    canvasDrop.onDrop(located.nodeId, located.position, event);
  };

  return (
    <section
      className="visual-builder__canvas"
      aria-label="Canvas"
      onPointerMove={trackHover}
      onPointerLeave={() => setHoveredNodeId(null)}
    >
      {focusedCard ? <div className="vb-card-details-banner"><span>Editing full-screen details · {focusedCard.label}</span><button type="button" className="vb-button" onClick={focusedCard.onExit}>Back to page</button></div> : null}
      <div ref={viewportRef} className="vb-canvas-viewport">
        <div className="vb-canvas-holder" style={{ width: FRAME_WIDTH_PX[breakpoint] * zoom, height: frameHeight === null ? undefined : frameHeight * zoom }}>
          <div
            ref={frameRef}
            className={`visual-builder__canvas-frame ${FRAME_CLASSES[breakpoint]}`}
            data-breakpoint={breakpoint}
            data-testid="visual-canvas-frame"
            data-theme={theme === undefined ? undefined : themePalette}
            style={{ width: FRAME_WIDTH_PX[breakpoint], transform: zoom === 1 ? undefined : `scale(${zoom})` }}
            onDragOver={canvasDrop !== undefined && !stylePainting ? handleDragOver : undefined}
            onDrop={canvasDrop !== undefined && !stylePainting ? handleDrop : undefined}
            onDragEnd={canvasDrop !== undefined && !stylePainting ? () => { setGridSlot(null); setBesideSlot(null); clearGuides(); canvasDrop.onDragEnd(); } : undefined}
            onDragLeave={canvasDrop !== undefined && !stylePainting ? (event) => {
              const next = event.relatedTarget;
              if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                clearGuides();
                setGridSlot(null);
                setBesideSlot(null);
              }
            } : undefined}
          >
        {theme !== undefined && themePalette !== undefined ? <ThemeScope theme={theme} palette={themePalette} scopeId="visual-builder-canvas"><VisualRenderer
          document={styledDocument}
          mode="canvas"
          breakpoint={breakpoint}
          selectedNodeId={selectedNodeId ?? undefined}
          onSelect={onSelect}
          spanOverride={draftSpan !== null && selectedNodeId !== null ? { nodeId: selectedNodeId, span: draftSpan } : undefined}
          sizeOverride={sizeOverride}
          replayTokens={replayTokens}
          motionTime={motionTime}
          effectRegistry={effectRegistry}
          disclosurePreview={disclosurePreview}
          site={BUILDER_SITE_PREVIEW}
          themeMode={themePalette}
          inlineTextEdit={inlineTextEdit}
          nodeDrag={canvasDrop !== undefined && !stylePainting ? { onDragStart: canvasDrop.onNodeDragStart } : undefined}
          onNodePatch={onNodePatch}
        /></ThemeScope> : <VisualRenderer
          document={styledDocument}
          mode="canvas"
          breakpoint={breakpoint}
          selectedNodeId={selectedNodeId ?? undefined}
          onSelect={onSelect}
          spanOverride={draftSpan !== null && selectedNodeId !== null ? { nodeId: selectedNodeId, span: draftSpan } : undefined}
          sizeOverride={sizeOverride}
          replayTokens={replayTokens}
          motionTime={motionTime}
          effectRegistry={effectRegistry}
          disclosurePreview={disclosurePreview}
          site={BUILDER_SITE_PREVIEW}
          inlineTextEdit={inlineTextEdit}
          nodeDrag={canvasDrop !== undefined && !stylePainting ? { onDragStart: canvasDrop.onNodeDragStart } : undefined}
          onNodePatch={onNodePatch}
        />}
        {gridSlot !== null ? (
          <div
            className="vb-grid-slot-preview"
            data-testid="grid-slot-preview"
            aria-hidden="true"
            style={{ top: gridSlot.rect.top, left: gridSlot.rect.left, width: gridSlot.rect.width, minHeight: gridSlot.rect.height }}
          >
            {gridSlotPreviewNode !== null ? (
              <div className="vb-grid-slot-preview__content">
                <VisualNodePreview
                  node={gridSlotPreviewNode}
                  breakpoint={breakpoint}
                  effectRegistry={effectRegistry}
                  site={BUILDER_SITE_PREVIEW}
                  themeMode={themePalette}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {besideSlot !== null ? (
          <div
            className={`vb-beside-preview vb-beside-preview--${besideSlot.side}`}
            data-testid="beside-preview"
            aria-hidden="true"
            style={{ top: besideSlot.top, left: besideSlot.left ?? undefined, right: besideSlot.right ?? undefined, maxWidth: besideSlot.maxWidth, minHeight: besideSlot.minHeight }}
          >
            <span className="vb-beside-preview__badge">Row</span>
            {besidePreviewNode !== null ? (
              <div className="vb-beside-preview__content">
                <VisualNodePreview
                  node={besidePreviewNode}
                  breakpoint={breakpoint}
                  effectRegistry={effectRegistry}
                  site={BUILDER_SITE_PREVIEW}
                  themeMode={themePalette}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {canStyle && selectedNode && supportsDirectStyle(selectedNode) ? <CanvasStyleHandles
          key={`${document.id}:${selectedNode.id}:${breakpoint}`}
          frameRef={frameRef} document={document} node={selectedNode} breakpoint={breakpoint} zoom={zoom} viewportRef={viewportRef}
          onDraft={patch => setStyleDraft(patch ? { id: selectedNode.id, patch } : null)}
          onCommit={patch => onNodePatch?.(selectedNode.id, patch)}
        /> : null}
        {guides !== null ? <AlignmentGuidesOverlay guides={guides} /> : null}
        <CanvasSelectionOverlay
          frameRef={frameRef}
          viewportRef={viewportRef}
          zoom={zoom}
          document={document}
          breakpoint={breakpoint}
          selectedNodeId={selectedNodeId}
          hoveredNodeId={stylePainting ? null : hoveredNodeId}
          gridResize={stylePainting ? null : gridResize}
          gridPosition={stylePainting ? null : gridPosition}
          componentSize={stylePainting ? null : componentSize}
          draftGridSize={draftGridSize}
          draftSpan={draftSpan}
          draftSize={draftSize}
        />
          </div>
        </div>
        <div className="vb-canvas-zoom" role="group" aria-label="Canvas zoom">
          <button type="button" className="vb-canvas-zoom__button" aria-label="Zoom out" title="Zoom out" onClick={zoomOut}>−</button>
          <button type="button" className="vb-canvas-zoom__value" aria-label="Reset zoom to 100%" title="Reset zoom to 100%" onClick={resetZoom}>{Math.round(zoom * 100)}%</button>
          <button type="button" className="vb-canvas-zoom__button" aria-label="Zoom in" title="Zoom in" onClick={zoomIn}>+</button>
          <button type="button" className="vb-canvas-zoom__fit" aria-label="Fit to screen" title="Fit to screen" aria-pressed={zoomMode === "fit"} onClick={fitToScreen}>Fit</button>
        </div>
      </div>
    </section>
  );
}

function sameBesideSlot(current: CanvasBesideSlot | null, next: CanvasBesideSlot): CanvasBesideSlot | null {
  if (current === null) return next;
  return current.targetNodeId === next.targetNodeId
    && current.side === next.side
    && current.top === next.top
    && current.left === next.left
    && current.right === next.right
    && current.maxWidth === next.maxWidth
    && current.minHeight === next.minHeight
    ? current
    : next;
}

function sameGridSlot(current: CanvasGridSlot | null, next: CanvasGridSlot): CanvasGridSlot | null {
  if (current === null) return next;
  return current.nodeId === next.nodeId
    && current.column === next.column
    && current.row === next.row
    && current.rect.top === next.rect.top
    && current.rect.left === next.rect.left
    && current.rect.width === next.rect.width
    && current.rect.height === next.rect.height
    ? current
    : next;
}

function measureRowBands(gridElement: HTMLElement): RowBand[] {
  const bands: RowBand[] = [];
  for (const wrapper of Array.from(gridElement.children)) {
    if (!(wrapper instanceof HTMLElement) || !wrapper.hasAttribute("data-node-wrapper-id")) continue;
    const rect = wrapper.getBoundingClientRect();
    if (rect.height <= 0) continue;
    const existing = bands.find((band) => Math.abs(band.top - rect.top) <= 2);
    if (existing) {
      existing.bottom = Math.max(existing.bottom, rect.bottom);
      existing.height = existing.bottom - existing.top;
    } else {
      bands.push({ top: rect.top, bottom: rect.bottom, height: rect.height });
    }
  }
  return bands.sort((a, b) => a.top - b.top);
}

function resolveRow(bands: RowBand[], y: number, rowGap: number): { row: number; band: RowBand | null } {
  if (bands.length === 0) return { row: 1, band: null };
  const containing = bands.find((band) => y >= band.top - rowGap / 2 && y <= band.bottom + rowGap / 2);
  if (containing) return { row: bands.indexOf(containing) + 1, band: containing };
  if (y < bands[0].top) return { row: 1, band: bands[0] };
  if (y > bands[bands.length - 1].bottom) return { row: bands.length + 1, band: bands[bands.length - 1] };
  let nearest = bands[0];
  for (const band of bands) {
    if (Math.abs(y - (band.top + band.height / 2)) < Math.abs(y - (nearest.top + nearest.height / 2))) nearest = band;
  }
  return { row: bands.indexOf(nearest) + 1, band: nearest };
}

function resolveTracks(value: string, contentWidth: number, gap: number): number[] {
  const parts = value.trim().split(/\s+/).map((part) => parseFloat(part)).filter((part) => Number.isFinite(part));
  if (parts.length === 12) return parts;
  const width = Math.max(0, (contentWidth - gap * 11) / 12);
  return Array.from({ length: 12 }, () => width);
}

function columnAt(tracks: number[], contentLeft: number, gap: number, x: number): number {
  let left = contentLeft;
  for (let index = 0; index < tracks.length; index += 1) {
    const right = left + tracks[index];
    if (x <= right) return index + 1;
    left = right + gap;
  }
  return 12;
}
