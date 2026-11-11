"use client";

import { StylePainterPanel } from "./StylePainterPanel";
import { applyDesignPreset } from "../operations/designPreset";
import { StylePainterTargets } from "./StylePainterTargets";
import { useStylePainter } from "./useStylePainter";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type DragEvent } from "react";
import { ThemeProvider, useThemeMode } from "../host/ThemeProvider";
import type { AnimationSpec, BreakpointValue, ComponentDocument, ComponentNode, FlowGridPosition, GridNode, NodeType, StyleSpec } from "../model";
import { movePlacement, type GridDirection } from "../layout";
import { canInsertTypeAt, findNode, findParent, isBesideDropTarget, isProtectedSlot, isStructuralNode, mapNode, regenerateNodeIds, resolvePlacementMap } from "../operations";
import { componentEditorRegistry } from "../components/editor";
import { BUILDER_SITE_PREVIEW, VisualRenderer } from "../renderer";
import type { DisclosurePreviewState, InlineTextEditProps } from "../renderer";
import { inferFlowGridSpan } from "../renderer/gridPlacementStyles";
import { inlineTextField, inlineTargetPatch, inlineTargetValue, inlineTextValue, isInlineTargetEditable, type InlineEditTarget } from "../renderer";
import type { VisualTemplate } from "../templates/types";
import { Canvas, type CanvasBesideDrop, type CanvasDropTargets, type CanvasGridSlotDrop } from "./Canvas";
import { cardDetailsView } from "./cardDetailsView";
import { ComponentLibrary, connectMenuNode, type InsertTarget } from "./ComponentLibrary";
import { DocumentToolsDrawer, type DocumentToolsTab } from "./DocumentToolsDrawer";
import { addVersionSnapshot, loadVersionSnapshots, removeVersionSnapshot, type VersionSnapshot } from "../persistence/versionSnapshots";
import { EditorSidebar, type SidebarTab } from "./EditorSidebar";
import type { LayerTreeDragProps } from "./LayerTree";
import type { DropPosition } from "./layerDropTypes";
import { fitComponentToGrid } from "./gridDrop";
import { setLayerDragPayload } from "./layerDrag";
import { useLayerDragState } from "./useLayerDragState";
import {
  clampInspectorWidth,
  DEFAULT_INSPECTOR_PREFERENCES,
  INSPECTOR_WIDTH,
  loadInspectorPreferences,
  saveInspectorPreferences,
  loadThemePreviewPreference,
  saveThemePreviewPreference,
  type InspectorPreferences,
} from "./editorPreferences";
import { EditorToolbar } from "./EditorToolbar";
import { PanelRightIcon } from "./icons";
import { InspectorResizeHandle } from "./InspectorResizeHandle";
import { LayerTree } from "./LayerTree";
import { clipNode, originPasteTarget, resolvePasteTarget, type ClipboardEntry } from "./nodeClipboard";
import { PropertiesInspector } from "./PropertiesInspector";
import type { VisualBuilderState } from "./types";
import { useVisualBuilder } from "./useVisualBuilder";
import "./visual-builder.css";
import { proposeEffectDocumentMigration, type EffectRegistry } from "../effects/core";
import { ozmishowEffectRegistry } from "../effects/registry";
import type { SiteTheme } from "../theme";
import { ThemeScope, resolveSiteTheme, type ThemePaletteName } from "../theme";
import type { ThemeEditorStatus } from "./ThemeEditor";
import { lazy } from "react";
import { DeferredEditorTool } from "./DeferredEditorTool";

const StyleKitEditor = lazy(() => import("./StyleKitEditor").then(module => ({ default: module.StyleKitEditor })));
const MotionTimeline = lazy(() => import("./MotionTimeline").then(module => ({ default: module.MotionTimeline })));
const VersionsDialog = lazy(() => import("./VersionsDialog").then(module => ({ default: module.VersionsDialog })));
const ThemeEditor = lazy(() => import("./ThemeEditor").then(module => ({ default: module.ThemeEditor })));

export interface VisualBuilderProps {
  renderDataTools?: (props: { document: ComponentDocument; selectedId: string | null; onReplace: (document: ComponentDocument) => void; onSelect: (id: string) => void; theme?: SiteTheme }) => ReactNode;
  storageNamespace?: string;
  versionNamespace?: string;
  onDirtyChange?: (dirty: boolean) => void;
  onDocumentChange?: (document: ComponentDocument) => void;
  initialDocument: ComponentDocument;
  initialSidebarTab?: SidebarTab;
  idFactory?: () => string;
  now?: () => string;
  effectRegistry?: EffectRegistry;
  storageMode?: "local" | "external";
  onSaveDocument?: (document: ComponentDocument) => Promise<void> | void;
  initialTemplates?: VisualTemplate[];
  initialTheme?: SiteTheme;
  onSaveTheme?: (theme: SiteTheme) => Promise<void> | void;
}

export function VisualBuilder({ renderDataTools, initialDocument, initialSidebarTab = "layers", idFactory, now, effectRegistry = ozmishowEffectRegistry, storageMode = "local", onSaveDocument, initialTemplates, initialTheme, onSaveTheme, storageNamespace = "", onDirtyChange, onDocumentChange, versionNamespace = storageNamespace }: VisualBuilderProps) {
  const { state, actions } = useVisualBuilder({ initialDocument, idFactory, now, storageMode, storageNamespace, onSaveDocument, initialTemplates });
  const [preview, setPreview] = useState(false);
  const detailView = useMemo(() => cardDetailsView(state.document, state.selectedNodeId), [state.document, state.selectedNodeId]);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>(initialSidebarTab);
  const [drawerTab, setDrawerTab] = useState<DocumentToolsTab | null>(null);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [styleEditorOpen, setStyleEditorOpen] = useState(false);
  const [motionOpen, setMotionOpen] = useState(false);
  const [motionTime, setMotionTime] = useState(0);
  const [motionDraft, setMotionDraft] = useState<{ id: string; animation: AnimationSpec } | null>(null);
  const [versions, setVersions] = useState<VersionSnapshot[]>([]);
  const [inspector, setInspector] = useState<InspectorPreferences>(DEFAULT_INSPECTOR_PREFERENCES);
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);
  const [replayTokens, setReplayTokens] = useState<Record<string, number>>({});
  const shownDocument = detailView?.document ?? state.document;
  const motionDocument = useMemo(() => motionDraft === null ? shownDocument : {
    ...shownDocument, root: mapNode(shownDocument.root, motionDraft.id, node => ({ ...node, animation: motionDraft.animation })) as ComponentDocument["root"],
  }, [shownDocument, motionDraft]);
  useEffect(() => { setMotionTime(0); setMotionDraft(null); }, [state.document.id]);
  const [disclosurePreview, setDisclosurePreview] = useState<DisclosurePreviewState>({});
  const themeEditorEnabled = initialTheme !== undefined && onSaveTheme !== undefined;
  const [savedTheme, setSavedTheme] = useState<SiteTheme | null>(() => initialTheme ? structuredClone(initialTheme) : null);
  const [themeDraft, setThemeDraft] = useState<SiteTheme | null>(() => initialTheme ? structuredClone(initialTheme) : null);
  const [themeStatus, setThemeStatus] = useState<ThemeEditorStatus>("clean");
  useEffect(() => { onDirtyChange?.(state.status !== "clean" || themeStatus !== "clean"); }, [state.status, themeStatus, onDirtyChange]);
  useEffect(() => { onDocumentChange?.(state.document); }, [state.document, onDocumentChange]);
  const themeDraftRef = useRef(themeDraft); themeDraftRef.current = themeDraft;
  const [themeError, setThemeError] = useState<string | null>(null);
  const [themePalette, setThemePalette] = useState<ThemePaletteName>("light");
  const previewTheme = useMemo(() => resolveSiteTheme(themeDraft ?? initialTheme), [themeDraft, initialTheme]);

  const painter = useStylePainter(state.document, effectRegistry, actions.applyStyleTransfer);
  const selectTarget = (nodeId: string) => { if (!painter.paint(nodeId)) actions.selectNode(nodeId); };

  const [editingState, setEditingState] = useState<{ nodeId: string | null; target?: InlineEditTarget | null }>({ nodeId: null });
  const startEditing = useCallback((nodeId: string, target?: InlineEditTarget) => setEditingState({ nodeId, target: target ?? null }), []);
  const stopEditing = useCallback(() => setEditingState({ nodeId: null }), []);

  const createLibraryNode = useCallback((nodeType: NodeType, parentId: string) => {
    const editor = componentEditorRegistry.get(nodeType);
    const node = connectMenuNode(editor.createDefault(idFactory ?? (() => crypto.randomUUID())), state.document.root);
    const parent = findNode(state.document.root, parentId);
    if (parent?.type !== "grid") return node;
    const fitted = fitComponentToGrid(node);
    return { ...fitted, layout: { ...fitted.layout, span: flowSpanMap(parent) } };
  }, [idFactory, state.document.root]);
  const dropLibraryNode = useCallback((nodeType: NodeType, parentId: string, index: number) => {
    actions.addNode(parentId, createLibraryNode(nodeType, parentId), index);
  }, [actions.addNode, createLibraryNode]);
  const layerDrag = useLayerDragState({ document: state.document, onMove: actions.moveNode, onDropLibrary: dropLibraryNode });

  const [clipboard, setClipboard] = useState<ClipboardEntry | null>(null);
  const copyNode = useCallback((nodeId: string) => {
    const clip = clipNode(state.document.root, nodeId);
    if (clip === null) return false;
    setClipboard(clip);
    return true;
  }, [state.document.root]);
  const cutNode = useCallback((nodeId: string) => {
    if (!copyNode(nodeId)) return false;
    actions.removeNode(nodeId);
    return true;
  }, [actions.removeNode, copyNode]);
  const pasteNode = useCallback((anchorId?: string | null) => {
    if (clipboard === null) return false;
    const anchor = anchorId ?? null;
    const restoreOrigin = anchor === null && state.selectedNodeId === clipboard.origin.parentId;
    const target = (restoreOrigin ? originPasteTarget(state.document.root, clipboard) : null)
      ?? resolvePasteTarget(state.document.root, anchor, state.selectedNodeId);
    if (target === null) return false;
    actions.addNode(target.parentId, regenerateNodeIds(clipboard.node, idFactory ?? (() => crypto.randomUUID())), target.index);
    return true;
  }, [actions.addNode, clipboard, idFactory, state.document.root, state.selectedNodeId]);

  const placeGridSlot = useCallback((drop: CanvasGridSlotDrop) => {
    const grid = findNode(state.document.root, drop.gridId);
    if (grid === undefined || grid.type !== "grid") return;
    const column = Math.max(1, Math.min(drop.column, 13 - Math.max(1, Math.min(12, drop.span))));
    const row = Math.max(1, drop.row);
    if (drop.nodeId !== null) {
      const node = findNode(state.document.root, drop.nodeId);
      if (node === undefined) return;
      const layout = node.layout ?? {};
      const start = {
        mobile: layout.start?.mobile ?? null,
        tablet: layout.start?.tablet ?? null,
        desktop: layout.start?.desktop ?? null,
      };
      start[state.previewBreakpoint] = { column, row };
      actions.updateNode(drop.nodeId, { layout: { ...layout, start } });
      return;
    }
    if (drop.nodeType === null) return;
    const node = createLibraryNode(drop.nodeType, grid.id);
    const start: BreakpointValue<FlowGridPosition | null> = { mobile: null, tablet: null, desktop: null };
    start[state.previewBreakpoint] = { column, row };
    actions.addNode(grid.id, { ...node, layout: { ...node.layout, span: node.layout?.span ?? flowSpanMap(grid), start } }, grid.children.length);
  }, [actions.addNode, actions.updateNode, createLibraryNode, state.document.root, state.previewBreakpoint]);

  const placeBeside = useCallback((drop: CanvasBesideDrop) => {
    const payload = layerDrag.payload;
    if (payload === null) return;
    const target = findNode(state.document.root, drop.targetNodeId);
    const parent = target === undefined ? undefined : findParent(state.document.root, target.id);
    if (target === undefined || parent === undefined) return;
    const flexId = (idFactory ?? (() => crypto.randomUUID()))();
    if (payload.kind === "library") {
      actions.insertNodeBeside(target.id, drop.side, createLibraryNode(payload.nodeType, parent.id), flexId);
    } else {
      actions.moveNodeBeside(target.id, drop.side, payload.nodeId, flexId);
    }
    layerDrag.clear();
  }, [actions.insertNodeBeside, actions.moveNodeBeside, createLibraryNode, idFactory, layerDrag, state.document.root]);

  const canDropBeside = useCallback((targetNodeId: string): boolean => {
    const payload = layerDrag.payload;
    if (payload === null) return false;
    const target = findNode(state.document.root, targetNodeId);
    const parent = target === undefined ? undefined : findParent(state.document.root, target.id);
    if (target === undefined || parent === undefined || !isBesideDropTarget(target, parent)) return false;
    if (!canInsertTypeAt(state.document.root, parent.id, "flex")) return false;
    if (payload.kind === "library") return canInsertTypeAt(state.document.root, parent.id, payload.nodeType);
    if (payload.nodeId === target.id) return false;
    if (isProtectedSlot(state.document, payload.nodeId)) return false;
    const dragged = findNode(state.document.root, payload.nodeId);
    return dragged !== undefined && findNode(dragged, target.id) === undefined;
  }, [layerDrag.payload, state.document]);

  const dragTargets = useMemo<CanvasDropTargets | null>(() => {
    if (layerDrag.payload === null) return null;
    const open = new Set<string>();
    const inside = new Set<string>();
    const walk = (node: ComponentNode) => {
      if (layerDrag.canDropAt(node, "before") || layerDrag.canDropAt(node, "after")) open.add(node.id);
      if (isStructuralNode(node)) {
        if (layerDrag.canDropAt(node, "inside")) { open.add(node.id); inside.add(node.id); }
        node.children.forEach(walk);
      }
    };
    walk(state.document.root);
    return { open, inside };
  }, [layerDrag, state.document]);

  const dragHandlers = useMemo<LayerTreeDragProps>(() => ({
    indicator: layerDrag.indicator,
    dragActive: layerDrag.payload !== null,
    draggingNodeId: layerDrag.payload?.kind === "node" ? layerDrag.payload.nodeId : null,
    canDrop: layerDrag.canDropAt,
    onDragStart: (nodeId, event) => {
      setLayerDragPayload(event, { kind: "node", nodeId });
      layerDrag.startDrag({ kind: "node", nodeId });
    },
    onDragOver: (node, position, event) => {
      event.dataTransfer.dropEffect = layerDrag.canDropAt(node, position) ? "move" : "none";
      layerDrag.setIndicator(layerDrag.canDropAt(node, position) ? { nodeId: node.id, position } : null);
    },
    onDrop: (_node, position, _event) => {
      const target = findNode(state.document.root, _node.id);
      if (target) layerDrag.commitDrop(target, position);
    },
    onDragEnd: () => layerDrag.clear(),
  }), [actions.moveNode, layerDrag, state.document.root]);

  const canvasDropProps = useMemo(() => ({
    indicator: layerDrag.indicator,
    targets: dragTargets,
    onDragOver: (nodeId: string | null, position: DropPosition, event: DragEvent) => {
      const node = nodeId !== null ? findNode(state.document.root, nodeId) : (insertTarget?.parent ?? state.document.root);
      if (!node) return;
      const effectivePosition = nodeId !== null ? position : "inside" as const;
      event.dataTransfer.dropEffect = layerDrag.canDropAt(node, effectivePosition) ? "move" : "none";
      layerDrag.setIndicator(layerDrag.canDropAt(node, effectivePosition) ? { nodeId: node.id, position: effectivePosition } : null);
    },
    onDrop: (nodeId: string | null, position: DropPosition, _event: DragEvent) => {
      const node = nodeId !== null ? findNode(state.document.root, nodeId) : (insertTarget?.parent ?? state.document.root);
      if (!node) return;
      const effectivePosition = nodeId !== null ? position : "inside" as const;
      layerDrag.commitDrop(node, effectivePosition);
    },
    onDragEnd: () => layerDrag.clear(),
    onNodeDragStart: (nodeId: string, event: DragEvent) => {
      setLayerDragPayload(event, { kind: "node", nodeId });
      layerDrag.startDrag({ kind: "node", nodeId });
      actions.selectNode(nodeId);
    },
    draggingNodeId: layerDrag.payload?.kind === "node" ? layerDrag.payload.nodeId : null,
    draggingNodeType: layerDrag.payload?.kind === "library" ? layerDrag.payload.nodeType : null,
    onPreviewDragOver: () => layerDrag.setIndicator(null),
    onGridSlotDrop: (drop: CanvasGridSlotDrop) => {
      placeGridSlot(drop);
      layerDrag.clear();
    },
    canDropBeside,
    onDropBeside: placeBeside,
  }), [actions.moveNode, actions.selectNode, canDropBeside, dragTargets, layerDrag, placeBeside, placeGridSlot, state.document.root]);
  const selectedNode = state.selectedNodeId === null ? null : findNode(state.document.root, state.selectedNodeId) ?? null;
  const selectedParent = state.selectedNodeId === null ? null : findParent(state.document.root, state.selectedNodeId) ?? null;
  const selectedParentContainer = selectedParent === null ? null : findParent(state.document.root, selectedParent.id) ?? null;
  const selectedRepeater = state.selectedNodeId === null ? null : findRepeaterAncestor(state.document, state.selectedNodeId);
  const insertTarget = resolveInsertTarget(selectedNode, selectedParent)
    ?? (isStructuralNode(state.document.root)
      ? { parent: state.document.root, index: state.document.root.children.length }
      : null);
  const editingNodeId = editingState.nodeId;
  const startCanvasEdit = useCallback((nodeId: string, target?: InlineEditTarget) => {
    if (painter.active) return;
    actions.selectNode(nodeId);
    const node = findNode(state.document.root, nodeId);
    if (node === undefined) return;
    if (target !== undefined && target !== null) {
      if (isInlineTargetEditable(node, target) && inlineTargetValue(node, target) !== null) startEditing(nodeId, target);
      return;
    }
    if (inlineTextField(node) !== null) startEditing(nodeId);
  }, [actions.selectNode, painter.active, startEditing, state.document.root]);
  const commitCanvasEdit = useCallback((nodeId: string, value: string, target?: InlineEditTarget) => {
    const node = findNode(state.document.root, nodeId);
    const field = node !== undefined && target === undefined ? inlineTextField(node) : null;
    const current = field !== null && node !== undefined ? inlineTextValue(node) : null;
    if (field !== null && value.trim().length > 0 && value.trim() !== current) {
      actions.updateNode(nodeId, { [field]: value });
    }
    if (node !== undefined && target !== undefined && target !== null
      && isInlineTargetEditable(node, target) && value.trim().length > 0) {
      const patch = inlineTargetPatch(node, value, target);
      const currentTarget = inlineTargetValue(node, target);
      if (value !== currentTarget) actions.updateNode(nodeId, patch);
    }
    stopEditing();
  }, [actions.updateNode, inlineTextValue, state.document.root, stopEditing]);
  const cancelCanvasEdit = useCallback(() => stopEditing(), [stopEditing]);
  const inlineTextEdit = useMemo<InlineTextEditProps>(() => ({
    editingNodeId,
    editingTarget: editingState.target,
    onStartEdit: startCanvasEdit,
    onCommit: commitCanvasEdit,
    onCancel: cancelCanvasEdit,
  }), [cancelCanvasEdit, commitCanvasEdit, editingNodeId, editingState.target, startCanvasEdit]);
  const recovering = state.recoveryIssues.length > 0;
  const migrationProposal = useMemo(() => proposeEffectDocumentMigration(state.document, effectRegistry), [state.document, effectRegistry]);

  useEffect(() => {
    if (!preview) return;
    const exitPreview = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[data-project-dialog][open]")) setPreview(false);
    };
    document.addEventListener("keydown", exitPreview);
    return () => document.removeEventListener("keydown", exitPreview);
  }, [preview]);

  useEffect(() => {
    if (preview) return;
    const handleUndoShortcut = (event: KeyboardEvent) => {
      if (styleEditorOpen || !(event.metaKey || event.ctrlKey)) return;
      if (isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if (key === "z") {
        event.preventDefault();
        if (event.shiftKey) actions.redo();
        else actions.undo();
      } else if (key === "y") {
        event.preventDefault();
        actions.redo();
      }
    };
    document.addEventListener("keydown", handleUndoShortcut);
    return () => document.removeEventListener("keydown", handleUndoShortcut);
  }, [actions.undo, actions.redo, preview, styleEditorOpen]);

  useEffect(() => {
    setInspector(loadInspectorPreferences());
    setThemePalette(loadThemePreviewPreference());
    setPreferencesHydrated(true);
  }, []);

  useEffect(() => {
    if (preferencesHydrated) saveInspectorPreferences(inspector);
  }, [inspector, preferencesHydrated]);

  const changeThemePalette = useCallback((palette: ThemePaletteName) => {
    setThemePalette(palette);
    saveThemePreviewPreference(palette);
  }, []);

  const resizeInspector = useCallback((width: number) => {
    setInspector((current) => ({ ...current, width: clampInspectorWidth(width) }));
  }, []);
  const resetInspectorWidth = useCallback(() => {
    setInspector((current) => ({ ...current, width: INSPECTOR_WIDTH.default }));
  }, []);
  const toggleInspector = useCallback(() => {
    setInspector((current) => ({ ...current, collapsed: !current.collapsed }));
  }, []);

  const commitSpan = useCallback((span: number) => {
    const current = selectedNode?.layout?.span;
    if (current === undefined) return;
    actions.updateSelected({ layout: { span: { ...current, [state.previewBreakpoint]: span } } });
  }, [actions.updateSelected, selectedNode, state.previewBreakpoint]);

  const resizeComponent = useCallback((size: { width?: number; height?: number }) => {
    if (selectedNode === null) return;
    const style: StyleSpec = { ...selectedNode.style };
    if (size.width !== undefined) {
      style.custom = { ...style.custom, width: `${Math.round(size.width)}px` };
      style.sizing = withoutSizeToken(style.sizing, "width");
    }
    if (size.height !== undefined) {
      style.custom = { ...style.custom, height: `${Math.round(size.height)}px` };
      style.sizing = withoutSizeToken(style.sizing, "height");
    }
    actions.updateSelected({ style });
  }, [actions.updateSelected, selectedNode]);

  const moveSelectionByArrow = useCallback((key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
    if (selectedNode === null || selectedNode.type === "slot") return false;
    if (selectedParent !== null && selectedParent.type === "grid" && selectedNode.layout?.placement?.[state.previewBreakpoint] !== undefined) {
      const direction: GridDirection = key === "ArrowUp" ? "up" : key === "ArrowDown" ? "down" : key === "ArrowLeft" ? "left" : "right";
      const placements = resolvePlacementMap(selectedParent, state.previewBreakpoint);
      if (placements === undefined) return false;
      if (!movePlacement({ placements, selectedId: selectedNode.id, direction }).ok) return false;
      actions.moveSelectedInGrid(direction);
      return true;
    }
    const flowStart = selectedNode.layout?.start?.[state.previewBreakpoint];
    if (flowStart && selectedParent !== null && selectedParent.type === "grid") {
      const span = Math.max(1, Math.min(12, selectedNode.layout?.span?.[state.previewBreakpoint] ?? 1));
      const next = key === "ArrowLeft"
        ? { column: Math.max(1, flowStart.column - span), row: flowStart.row }
        : key === "ArrowRight"
          ? { column: Math.min(13 - span, flowStart.column + span), row: flowStart.row }
          : key === "ArrowUp"
            ? { column: flowStart.column, row: Math.max(1, flowStart.row - 1) }
            : { column: flowStart.column, row: flowStart.row + 1 };
      if (next.column === flowStart.column && next.row === flowStart.row) return false;
      const start = {
        mobile: selectedNode.layout?.start?.mobile ?? null,
        tablet: selectedNode.layout?.start?.tablet ?? null,
        desktop: selectedNode.layout?.start?.desktop ?? null,
      };
      start[state.previewBreakpoint] = next;
      actions.updateNode(selectedNode.id, { layout: { ...selectedNode.layout, start } });
      return true;
    }
    if (selectedParent === null) return false;
    if ((selectedParent.type === "flex" || selectedParent.type === "stack") && selectedParent.direction === "column" && (key === "ArrowLeft" || key === "ArrowRight")) {
      const inherited = selectedParent.alignment === "center" ? "center" : selectedParent.alignment === "end" ? "end" : "start";
      const current = selectedNode.style?.sizing?.align ?? inherited;
      const order = ["start", "center", "end"] as const;
      const nextIndex = order.indexOf(current) + (key === "ArrowRight" ? 1 : -1);
      if (nextIndex < 0 || nextIndex >= order.length) return false;
      const next = order[nextIndex];
      actions.updateNode(selectedNode.id, { style: { ...selectedNode.style, sizing: { ...selectedNode.style?.sizing, align: next } } });
      return true;
    }
    const direction = key === "ArrowUp" || key === "ArrowLeft" ? "up" : "down";
    const index = selectedParent.children.findIndex((child) => child.id === selectedNode.id);
    if (index < 0) return false;
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= selectedParent.children.length) return false;
    actions.reorderNode(selectedNode.id, direction);
    return true;
  }, [actions.moveSelectedInGrid, actions.reorderNode, actions.updateNode, selectedNode, selectedParent, state.previewBreakpoint]);

  const resizeSpanByShortcut = useCallback((delta: number) => {
    if (selectedNode === null || selectedParent?.type !== "grid") return false;
    if (selectedNode.layout?.placement?.[state.previewBreakpoint] !== undefined) return false;
    const spans = selectedNode.layout?.span ?? { mobile: 12, tablet: 12, desktop: 12 };
    const currentSpan = spans[state.previewBreakpoint];
    if (currentSpan === undefined) return false;
    const start = selectedNode.layout?.start?.[state.previewBreakpoint];
    const maxSpan = start ? Math.max(1, 13 - start.column) : 12;
    const next = Math.min(maxSpan, Math.max(1, currentSpan + delta));
    if (next === currentSpan) return false;
    actions.updateSelected({ layout: { ...selectedNode.layout, span: { ...spans, [state.previewBreakpoint]: next } } });
    return true;
  }, [actions.updateSelected, selectedNode, selectedParent, state.previewBreakpoint]);

  useEffect(() => {
    if (preview) return;
    const handleEditShortcut = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isEditableTarget(event.target)) return;
      if ((event.metaKey || event.ctrlKey) && event.altKey && !event.shiftKey) {
        const isCopyStyle = event.code === "KeyC" || event.key.toLowerCase() === "c";
        const isPasteStyle = event.code === "KeyV" || event.key.toLowerCase() === "v";
        if (!isCopyStyle && !isPasteStyle) return;
        if (state.selectedNodeId === null) return;
        const selected = findNode(state.document.root, state.selectedNodeId);
        if (selected === undefined) return;
        if (isCopyStyle) {
          if (selected.type === "slot") return;
          event.preventDefault();
          painter.capture(selected);
        } else if (painter.pasteStyle(selected.id)) {
          event.preventDefault();
        }
        return;
      }
      if (!event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey
        && (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        if (moveSelectionByArrow(event.key)) event.preventDefault();
        return;
      }
      if (event.altKey && !event.metaKey && !event.ctrlKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        if (resizeSpanByShortcut(event.key === "ArrowRight" ? 1 : -1)) event.preventDefault();
        return;
      }
      if (!event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey
        && (event.key === "Delete" || event.key === "Backspace")) {
        if (state.selectedNodeId === null) return;
        const selected = findNode(state.document.root, state.selectedNodeId);
        if (selected === undefined || selected.id === state.document.root.id || selected.type === "slot") return;
        event.preventDefault();
        actions.removeNode(selected.id);
        return;
      }
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      const key = event.key.toLowerCase();
      if (key === "c" || key === "x") {
        if (state.selectedNodeId === null) return;
        const acted = key === "c" ? copyNode(state.selectedNodeId) : cutNode(state.selectedNodeId);
        if (acted) event.preventDefault();
      } else if (key === "v") {
        if (pasteNode()) event.preventDefault();
      } else if (key === "d") {
        if (state.selectedNodeId === null) return;
        event.preventDefault();
        actions.duplicateNode(state.selectedNodeId);
      }
    };
    document.addEventListener("keydown", handleEditShortcut);
    return () => document.removeEventListener("keydown", handleEditShortcut);
  }, [actions.duplicateNode, actions.removeNode, copyNode, cutNode, moveSelectionByArrow, painter.capture, painter.pasteStyle, pasteNode, preview, resizeSpanByShortcut, state.document.root, state.selectedNodeId]);

  const replayAnimation = useCallback((nodeId: string) => {
    setReplayTokens((current) => ({ ...current, [nodeId]: (current[nodeId] ?? 0) + 1 }));
  }, []);

  const selectFromCanvas = useCallback((nodeId: string) => {
    selectTarget(nodeId);
  }, [actions.selectNode, painter.paint]);

  const closeDrawer = useCallback(() => setDrawerTab(null), []);

  const changeThemeDraft = useCallback((theme: SiteTheme) => {
    setThemeDraft(theme);
    setThemeStatus("dirty");
    setThemeError(null);
  }, []);

  const saveThemeDraft = useCallback(async (theme: SiteTheme) => {
    if (!themeEditorEnabled || onSaveTheme === undefined) return;
    setThemeStatus("saving");
    setThemeError(null);
    try {
      await onSaveTheme(theme);
      setSavedTheme(structuredClone(theme));
      setThemeStatus(JSON.stringify(themeDraftRef.current) === JSON.stringify(theme) ? "clean" : "dirty");
    } catch (error) {
      setThemeStatus("error");
      setThemeError(error instanceof Error ? error.message : "Site theme save failed");
    }
  }, [onSaveTheme, themeEditorEnabled]);

  if (preview) {
    const rendered = <VisualRenderer document={state.document} mode="preview" effectRegistry={effectRegistry} site={BUILDER_SITE_PREVIEW} />;
    return (
      <main className="visual-builder__preview" aria-label="Visual preview">
        <BuilderThemePreview theme={previewTheme} initialMode={themePalette}>{rendered}</BuilderThemePreview>
      </main>
    );
  }

  const useTemplate = (template: VisualTemplate) => {
    painter.cancel();
    actions.createFromTemplate(template.id, `Created from ${template.name}`);
  };

  const createVersion = (name: string) => {
    try {
      setVersions(addVersionSnapshot(state.document.id, { id: crypto.randomUUID(), name, createdAt: new Date().toISOString(), document: state.document }, versionNamespace));
    } catch { /* storage unavailable or full: the list simply does not change */ }
  };
  const restoreVersion = (snapshotId: string) => {
    const snapshot = versions.find((candidate) => candidate.id === snapshotId);
    if (!snapshot) return;
    try {
      setVersions(addVersionSnapshot(state.document.id, { id: crypto.randomUUID(), name: `Before restoring ${snapshot.name}`, createdAt: new Date().toISOString(), document: state.document }, versionNamespace));
    } catch { /* restoring is still undoable through history */ }
    painter.cancel();
    actions.importJson(JSON.stringify(snapshot.document));
    setVersionsOpen(false);
  };
  const deleteVersion = (snapshotId: string) => {
    try { setVersions(removeVersionSnapshot(state.document.id, snapshotId, versionNamespace)); } catch { /* keep the list unchanged */ }
  };

  const workspaceStyle = { "--vb-right-width": inspector.collapsed ? "0px" : `${inspector.width}px` } as CSSProperties;

  return (
    <main className="visual-builder" data-builder-theme={themePalette}>
      <EditorToolbar
        documentName={state.document.name}
        canCopyStyle={selectedNode !== null && selectedNode.type !== "slot"}
        painterActive={painter.clipboard !== null}
        onCopyStyle={() => { if (selectedNode) painter.capture(selectedNode); }}
        status={state.status}
        breakpoint={state.previewBreakpoint}
        canUndo={state.canUndo}
        canRedo={state.canRedo}
        inspectorCollapsed={inspector.collapsed}
        onToggleInspector={toggleInspector}
        onBreakpointChange={actions.setPreviewBreakpoint}
        onUndo={actions.undo}
        onRedo={actions.redo}
        onSave={actions.save}
        onPreview={() => { painter.cancel(); setPreview(true); }}
        onReset={() => { painter.cancel(); actions.reset(); }}
        onOpenTemplates={() => setDrawerTab("templates")}
        onOpenStyleEditor={() => { painter.cancel(); setStyleEditorOpen(true); }}
        motionOpen={motionOpen}
        onToggleMotion={() => { painter.cancel(); stopEditing(); setMotionDraft(null); if (!motionOpen) setMotionTime(0); setMotionOpen(value => !value); }}
        onOpenDocumentTools={() => setDrawerTab("document")}
        onOpenVersions={() => { painter.cancel(); setVersions(loadVersionSnapshots(state.document.id, versionNamespace)); setVersionsOpen(true); }}        onApplyDesignStyle={preset => { painter.cancel(); actions.importJson(JSON.stringify(applyDesignPreset(state.document, preset))); }}
        themePalette={themePalette}
        onThemePaletteChange={changeThemePalette}
        onOpenTheme={themeEditorEnabled ? () => setDrawerTab("theme") : undefined}
      />

      {renderDataTools?.({ document: state.document, selectedId: state.selectedNodeId, onReplace: document => actions.importJson(JSON.stringify(document)), onSelect: actions.selectNode, theme: themeDraft || initialTheme })}
      {recovering ? (
        <p className="vb-banner vb-banner--recovery" role="status" aria-label="Recovery status">
          {recoveryMessage(state.recoveryIssues)}
        </p>
      ) : null}

      {migrationProposal.changedAttachmentIds.length > 0 ? (
        <section className="vb-banner" role="status" aria-label="Effect migration available">
          <span>{migrationProposal.changedAttachmentIds.length} effect configuration{migrationProposal.changedAttachmentIds.length === 1 ? "" : "s"} can be migrated.</span>
          <button type="button" className="vb-button" onClick={() => { painter.cancel(); actions.importJson(JSON.stringify(migrationProposal.migrated)); }}>Migrate effect configurations</button>
        </section>
      ) : null}

      {migrationProposal.diagnostics.length > 0 ? (
        <p className="vb-banner vb-banner--error" role="status">Some effect configurations cannot be migrated and were left unchanged.</p>
      ) : null}

      {state.error !== null ? (
        <section className="vb-banner vb-banner--error" role="alert" aria-label="Builder error">
          <strong>{state.error.message}</strong>
          <ul aria-label="Import issues">
            {state.error.issues.map((issue, index) => (
              <li key={`${issue.path}-${issue.code}-${index}`}>{issue.path} — {issue.code}: {issue.message}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <StylePainterPanel painter={painter} document={state.document} registry={effectRegistry} />
      <StylePainterTargets painter={painter} document={state.document} registry={effectRegistry}>
      <div
        className={`visual-builder__workspace${inspector.collapsed ? " visual-builder__workspace--inspector-collapsed" : ""}`}
        style={workspaceStyle}
        data-testid="visual-workspace"
      >
        <EditorSidebar
          tab={sidebarTab}
          onTabChange={setSidebarTab}
          layers={
            <LayerTree
              root={state.document.root}
              selectedNodeId={state.selectedNodeId}
              drag={dragHandlers}
              onSelect={selectTarget}
              onReorder={actions.reorderNode}
              onDuplicate={actions.duplicateNode}
              onDelete={actions.removeNode}
              onMove={actions.moveNode}
              onCopy={copyNode}
              onCut={cutNode}
              onPaste={pasteNode}
              canPaste={clipboard !== null}
            />
          }
          library={
            <ComponentLibrary
              documentKind={state.document.kind ?? "section"}
              documentRoot={state.document.root}
              target={insertTarget}
              idFactory={idFactory}
              onDragStart={(_nodeType, event) => layerDrag.startDrag({ kind: "library", nodeType: _nodeType })}
              onAdd={(node) => {
                if (insertTarget !== null) actions.addNode(insertTarget.parent.id, node, insertTarget.index);
              }}
            />
          }
        />

        <div className="vb-canvas-stage">
        <Canvas
          document={motionOpen ? motionDocument : shownDocument}
          focusedCard={detailView ? { label: detailView.card.accessibleLabel, onExit: () => actions.selectNode(detailView.card.id) } : undefined}
          stylePainting={painter.active}
          breakpoint={state.previewBreakpoint}
          selectedNodeId={state.selectedNodeId}
          replayTokens={replayTokens}
          motionTime={motionOpen ? motionTime : undefined}
          effectRegistry={effectRegistry}
          disclosurePreview={disclosurePreview}
          theme={previewTheme}
          themePalette={themePalette}
          onSelect={selectFromCanvas}
          onCommitSpan={commitSpan}
          onMoveGridChild={actions.moveSelectedInGrid}
          onResizeGridChild={actions.resizeSelectedInGrid}
          onResizeComponent={resizeComponent}
          canvasDrop={motionOpen ? undefined : canvasDropProps}
          inlineTextEdit={motionOpen ? undefined : inlineTextEdit}
          onNodePatch={motionOpen ? undefined : actions.updateNode}
        />
        {motionOpen ? <DeferredEditorTool name="Motion" onClose={() => setMotionOpen(false)}><MotionTimeline
          key={state.document.id}
          document={state.document}
          time={motionTime}
          selectedNodeId={state.selectedNodeId}
          onTimeChange={setMotionTime}
          onSelect={actions.selectNode}
          onUpdate={(id, animation) => actions.updateNode(id, { animation })}
          onDraft={(id, animation) => setMotionDraft(id !== null && animation ? { id, animation } : null)}
          onClose={() => { setMotionOpen(false); setMotionDraft(null); }}
        /></DeferredEditorTool> : null}
        </div>

        {inspector.collapsed ? (
          <button type="button" className="vb-inspector-reopen" aria-label="Show inspector" title="Show inspector" onClick={toggleInspector}>
            <PanelRightIcon collapsed size={14} />
          </button>
        ) : null}

        <div className="vb-sidebar vb-sidebar--right" aria-hidden={inspector.collapsed ? true : undefined} data-testid="visual-inspector-column">
          {!inspector.collapsed ? <InspectorResizeHandle width={inspector.width} onResize={resizeInspector} onReset={resetInspectorWidth} /> : null}
          {drawerTab === null ? (
            <PropertiesInspector
              node={selectedNode}
              parent={selectedParent}
              parentContainer={selectedParentContainer}
              breakpoint={state.previewBreakpoint}
              onUpdate={actions.updateSelected}
              onCreateProjectPage={undefined}
              onEditCardDetails={selectedNode?.type === "expandable-card" ? () => {
                const details = selectedNode.children.find(child => child.type === "slot" && child.name === "details");
                if (details) actions.selectNode(details.id);
              } : undefined}
              onPromoteGrid={actions.promoteSelectedGrid}
              onSetGridPlacement={actions.setSelectedGridPlacement}
              onConvertParentToGrid={actions.convertSelectedParentToGrid}
              onReplayAnimation={replayAnimation}
              effectRegistry={effectRegistry}
              disclosurePreview={selectedNode?.type === "disclosure" ? disclosurePreview[selectedNode.id] ?? "default" : "default"}
              onDisclosurePreview={selectedNode?.type === "disclosure" ? (value) => setDisclosurePreview((current) => ({ ...current, [selectedNode.id]: value })) : undefined}
              onAddAccordionItem={selectedNode?.type === "accordion" ? () => actions.addAccordionItem(selectedNode.id) : undefined}
              onAddTabItem={selectedNode?.type === "tabs" ? () => actions.addTabItem(selectedNode.id) : undefined}
              onRemoveTabItem={selectedNode?.type === "disclosure" && selectedParent?.type === "tabs" ? () => actions.removeTabItem(selectedNode.id) : undefined}
              onSidebarItemAction={selectedNode?.type === "sidebar" ? action => actions.changeSidebarItem(selectedNode.id, action) : undefined}
              onSelectNode={actions.selectNode}
              onAddScrollScene={selectedNode?.type === "scroll-story" ? () => actions.addScrollScene(selectedNode.id) : undefined}
              onRemoveScrollScene={selectedNode?.type === "scroll-scene" && selectedParent?.type === "scroll-story" ? () => actions.removeScrollScene(selectedNode.id) : undefined}
              bindingAlias={selectedRepeater?.itemAlias}
              bindingSchemaName={selectedRepeater?.source.schemaName}
            />
          ) : (
            <DocumentToolsDrawer
              tab={drawerTab}
              onTabChange={setDrawerTab}
              onClose={closeDrawer}
              templates={state.templates}
              onSaveAsTemplate={actions.saveAsTemplate}
              onImportTemplate={actions.importTemplateJson}
              onUseTemplate={useTemplate}
              onSelectStarter={(doc) => {
                painter.cancel();
                actions.importJson(JSON.stringify(doc));
                closeDrawer();
              }}
              onImportDocument={(value) => { painter.cancel(); actions.importJson(value); }}
              onExportDocument={actions.exportJson}
              themeEditor={themeEditorEnabled && themeDraft && savedTheme ? <DeferredEditorTool key="theme" name="Theme editor" onClose={closeDrawer}><ThemeEditor
                draft={themeDraft}
                saved={savedTheme}
                palette={themePalette}
                status={themeStatus}
                error={themeError}
                onPaletteChange={changeThemePalette}
                onChange={changeThemeDraft}
                onSave={saveThemeDraft}
              /></DeferredEditorTool> : undefined}
            />
          )}
        </div>
      </div>
      </StylePainterTargets>
      {styleEditorOpen ? <DeferredEditorTool name="Styles" onClose={() => setStyleEditorOpen(false)}><StyleKitEditor
        storageNamespace={storageNamespace}
        document={state.document}
        initialPalette={themePalette}
        onClose={() => setStyleEditorOpen(false)}
        onApply={doc => { painter.cancel(); actions.importJson(JSON.stringify(doc)); setStyleEditorOpen(false); }}
        renderDocument={(doc, palette, breakpoint) => <ThemeScope theme={previewTheme} palette={palette} scopeId="style-kit-preview"><VisualRenderer document={doc} mode="canvas" breakpoint={breakpoint} effectRegistry={effectRegistry} site={BUILDER_SITE_PREVIEW} /></ThemeScope>}
      /></DeferredEditorTool> : null}
      {versionsOpen ? <DeferredEditorTool name="Versions" onClose={() => setVersionsOpen(false)}><VersionsDialog
        current={state.document}
        snapshots={versions}
        onCreate={createVersion}
        onRestore={restoreVersion}
        onDelete={deleteVersion}
        onClose={() => setVersionsOpen(false)}
        renderDocument={(doc) => <BuilderThemePreview theme={previewTheme} initialMode={themePalette}><VisualRenderer document={doc} mode="preview" effectRegistry={effectRegistry} site={BUILDER_SITE_PREVIEW} /></BuilderThemePreview>}
      /></DeferredEditorTool> : null}
    </main>
  );
}

function BuilderThemePreview({ theme, initialMode, children }: { theme: SiteTheme; initialMode: ThemePaletteName; children: ReactNode }) {
  return (
    <ThemeProvider projectKey="visual-builder-preview" defaultMode={initialMode} persist={false}>
      <BuilderThemePreviewScope theme={theme}>{children}</BuilderThemePreviewScope>
    </ThemeProvider>
  );
}

function BuilderThemePreviewScope({ theme, children }: { theme: SiteTheme; children: ReactNode }) {
  const { resolved } = useThemeMode();
  return <ThemeScope theme={theme} palette={resolved} scopeId="visual-builder-preview">{children}</ThemeScope>;
}

function findRepeaterAncestor(document: ComponentDocument, nodeId: string) {
  let parent = findParent(document.root, nodeId);
  while (parent) {
    if (parent.type === "repeater") return parent;
    parent = findParent(document.root, parent.id);
  }
  return null;
}

function resolveInsertTarget(
  selectedNode: ReturnType<typeof findNode> | null,
  selectedParent: ReturnType<typeof findParent> | null,
): InsertTarget | null {
  if (!selectedNode) return null;
  if (isStructuralNode(selectedNode)) return { parent: selectedNode, index: selectedNode.children.length };
  if (!selectedParent) return null;
  return { parent: selectedParent, index: selectedParent.children.findIndex((child) => child.id === selectedNode.id) + 1 };
}

function flowSpanMap(grid: GridNode): BreakpointValue<number> {
  return {
    mobile: inferFlowGridSpan(grid, "mobile"),
    tablet: inferFlowGridSpan(grid, "tablet"),
    desktop: inferFlowGridSpan(grid, "desktop"),
  };
}

function withoutSizeToken(sizing: StyleSpec["sizing"], key: "width" | "height"): StyleSpec["sizing"] {
  if (sizing === undefined) return undefined;
  const next = { ...sizing };
  delete next[key];
  return Object.keys(next).length === 0 ? undefined : next;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
}

function recoveryMessage(issues: VisualBuilderState["recoveryIssues"]): string {
  const sources = new Set(issues.map((entry) => entry.source));
  const messages = [
    sources.has("document-storage") ? "Recovered with the supplied document because stored documents were invalid." : null,
    sources.has("template-storage") ? "Recovered without stored templates because template storage was invalid." : null,
    sources.has("active-document") ? "Recovered with the supplied document because the active document ID was stale." : null,
    sources.has("storage") ? "Browser storage was unavailable; the supplied document remains active." : null,
  ];
  return messages.filter((message): message is string => message !== null).join(" ");
}
