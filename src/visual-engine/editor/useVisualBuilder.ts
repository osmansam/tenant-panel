"use client";

import { applyStyleTransfer } from "../operations/styleTransfer";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentDocument } from "../model";
import type { ValidationIssue } from "../model/validation";
import {
  addNode,
  addAccordionItem,
  addTabItem,
  removeTabItem,
  changeSidebarItem,
  addScrollScene,
  removeScrollScene,
  duplicateNode,
  moveNode,
  removeNode,
  reorderNode,
  updateNode,
  convertContainerToGrid,
  wrapNewNodeBeside,
  wrapNodeBeside,
  findNode,
  findParent,
  moveGridChild,
  promoteGridToPositioned,
  resizeGridChild,
  setGridChildPlacement,
  type OperationResult,
} from "../operations";
import { exportDocument, importDocument, importTemplate } from "../persistence/importExport";
import {
  getActiveDocumentId,
  loadDocuments,
  loadTemplates,
  saveDocument,
  saveTemplate,
  setActiveDocumentId,
  TemplateIdCollisionError,
} from "../persistence/localStorage";
import { createTemplate, instantiateTemplate } from "../templates/templateOperations";
import type { VisualTemplate } from "../templates/types";
import {
  canRedo as historyCanRedo,
  canUndo as historyCanUndo,
  EMPTY_HISTORY,
  recordChange,
  redoChange,
  undoChange,
  type DocumentHistory,
  type HistoryEntry,
} from "./history";
import type { VisualBuilderActions, VisualBuilderOptions, VisualBuilderRecoveryIssue, VisualBuilderState } from "./types";

const defaultIdFactory = () => crypto.randomUUID();
const defaultClock = () => new Date().toISOString();

export function useVisualBuilder({ initialDocument, idFactory = defaultIdFactory, now = defaultClock, storageMode = "local", storageNamespace = "", onSaveDocument, initialTemplates = [] }: VisualBuilderOptions): {
  state: VisualBuilderState;
  actions: VisualBuilderActions;
} {
  const initialDocumentRef = useRef(initialDocument);
  const idFactoryRef = useRef(idFactory);
  const nowRef = useRef(now);
  const [state, setState] = useState<VisualBuilderState>(() => ({ ...initialState(initialDocumentRef.current), templates: initialTemplates }));
  const stateRef = useRef(state);
  const savedDocumentRef = useRef<ComponentDocument>(initialDocumentRef.current);
  const historyRef = useRef<DocumentHistory>(EMPTY_HISTORY);

  const updateState = useCallback((update: (current: VisualBuilderState) => VisualBuilderState) => {
    const next = withHistoryFlags(update(stateRef.current), historyRef.current);
    stateRef.current = next;
    setState(next);
  }, []);

  const documentStatus = useCallback((document: ComponentDocument): "clean" | "dirty" => {
    return document === savedDocumentRef.current ? "clean" : "dirty";
  }, []);

  const recordHistory = useCallback((current: VisualBuilderState) => {
    historyRef.current = recordChange(historyRef.current, {
      document: current.document,
      selectedNodeId: current.selectedNodeId,
    });
  }, []);

  useEffect(() => {
    if (storageMode === "external") {
      const stored = loadTemplates(storageNamespace);
      updateState(current => ({ ...current, templates: [...initialTemplates, ...stored.templates] }));
      return;
    }
    if (typeof window === "undefined") return;

    try {
      const documents = loadDocuments(initialDocumentRef.current, storageNamespace);
      const templates = loadTemplates(storageNamespace);
      const activeDocumentId = getActiveDocumentId(storageNamespace);
      const document = resolveDocument(documents.documents, activeDocumentId, initialDocumentRef.current);
      const recoveryIssues = [
        ...recoveryEntries("document-storage", documents.issues),
        ...recoveryEntries("template-storage", templates.issues),
        ...(activeDocumentId !== null && !documents.documents.some((candidate) => candidate.id === activeDocumentId)
          ? recoveryEntries("active-document", [storageIssue("storage.active_document_stale", "The active document no longer exists")])
          : []),
      ];
      savedDocumentRef.current = document;
      historyRef.current = EMPTY_HISTORY;
      updateState((current) => ({
        ...current,
        document,
        selectedNodeId: initialSelection(document),
        templates: templates.templates,
        recoveryIssues,
        ...recoveryStatus(recoveryIssues, "clean"),
      }));
    } catch {
      const issue = storageIssue("storage.unavailable", "Browser storage is unavailable");
      historyRef.current = EMPTY_HISTORY;
      updateState((current) => ({
        ...current,
        recoveryIssues: [{ source: "storage", issue }],
        status: "error",
        error: storageError([issue]),
      }));
    }
  }, [storageMode, storageNamespace, updateState]);

  const applyOperation = useCallback((operation: (document: ComponentDocument) => OperationResult) => {
    let applied = false;
    updateState((current) => {
      const result = operation(current.document);
      if (!result.success) return operationError(current, result.code, result.message);
      applied = true;
      if (result.document !== current.document) recordHistory(current);
      return successfulState(current, documentStatus(result.document), {
        document: result.document,
        selectedNodeId: result.selectedNodeId ?? current.selectedNodeId,
      });
    });
    return applied;
  }, [updateState, recordHistory, documentStatus]);

  const undo = useCallback(() => {
    updateState((current) => {
      const step = undoChange(historyRef.current, historyEntry(current));
      if (step === null) return current;
      historyRef.current = step.history;
      return successfulState(current, documentStatus(step.entry.document), {
        document: step.entry.document,
        selectedNodeId: step.entry.selectedNodeId,
      });
    });
  }, [updateState, documentStatus, storageNamespace]);

  const redo = useCallback(() => {
    updateState((current) => {
      const step = redoChange(historyRef.current, historyEntry(current));
      if (step === null) return current;
      historyRef.current = step.history;
      return successfulState(current, documentStatus(step.entry.document), {
        document: step.entry.document,
        selectedNodeId: step.entry.selectedNodeId,
      });
    });
  }, [updateState, documentStatus, storageNamespace]);

  const selectNode = useCallback((nodeId: string | null) => {
    updateState((current) => ({ ...current, selectedNodeId: nodeId }));
  }, [updateState]);

  const setPreviewBreakpoint = useCallback((previewBreakpoint: VisualBuilderState["previewBreakpoint"]) => {
    updateState((current) => ({ ...current, previewBreakpoint }));
  }, [updateState]);

  const save = useCallback(() => {
    if (stateRef.current.status === "saving") return;
    updateState((current) => ({ ...current, status: "saving", error: null }));
    const document = stateRef.current.document;
    if (storageMode === "local") {
      try {
        requireBrowserStorage();
        saveDocument(document, storageNamespace);
        setActiveDocumentId(document.id, storageNamespace);
        savedDocumentRef.current = document;
        updateState((current) => successfulState(current, current.document === document ? "clean" : "dirty", {}, ["document-storage", "active-document", "storage"]));
      } catch (error) {
        updateState((current) => ({ ...current, status: "error", error: storageError([storageIssue("storage.save_failed", messageFor(error, "Unable to save document"))]) }));
      }
      return;
    }
    if (!onSaveDocument) {
      updateState((current) => ({ ...current, status: "error", error: storageError([storageIssue("storage.save_failed", "External document persistence is unavailable")]) }));
      return;
    }
    void Promise.resolve().then(() => onSaveDocument(document)).then(() => {
      savedDocumentRef.current = document;
      updateState((current) => successfulState(current, current.document === document ? "clean" : "dirty", {}, ["document-storage", "active-document", "storage"]));
    }).catch((error) => {
      updateState((current) => ({ ...current, status: "error", error: storageError([storageIssue("storage.save_failed", messageFor(error, "Unable to save document"))]) }));
    });
  }, [onSaveDocument, storageMode, storageNamespace, updateState]);

  const reset = useCallback(() => {
    updateState((current) => {
      const document = initialDocumentRef.current;
      const selectedNodeId = initialSelection(document);
      const unchanged = current.document === document && current.selectedNodeId === selectedNodeId;
      if (!unchanged) recordHistory(current);
      return successfulState(current, documentStatus(document), {
        document,
        selectedNodeId,
      });
    });
  }, [updateState, recordHistory, documentStatus]);

  const importJson = useCallback((serialized: string) => {
    const imported = importDocument(serialized);
    if (!imported.success) {
      updateState((current) => ({ ...current, status: "error", error: { message: "Unable to import document", issues: imported.issues } }));
      return;
    }
    updateState((current) => {
      recordHistory(current);
      return successfulState(current, documentStatus(imported.value), { document: imported.value, selectedNodeId: initialSelection(imported.value) });
    });
  }, [updateState, recordHistory, documentStatus]);

  const exportJson = useCallback(() => {
    try {
      const serialized = exportDocument(stateRef.current.document);
      return serialized;
    } catch (error) {
      updateState((current) => ({ ...current, status: "error", error: { message: messageFor(error, "Unable to export document"), issues: [] } }));
      return null;
    }
  }, [updateState]);

  const saveAsTemplate = useCallback((name: string) => {
    try {
      requireBrowserStorage();
      const template = createTemplate(stateRef.current.document, name, idFactoryRef.current, nowRef.current);
      saveTemplate(template, storageNamespace);
      updateState((current) => successfulState(current, documentStatus(current.document), {
        templates: appendTemplate(current.templates, template),
      }, ["template-storage", "storage"]));
    } catch (error) {
      const issue = templateSaveIssue(error, "storage.template_save_failed", "Unable to save template");
      updateState((current) => ({ ...current, status: "error", error: { message: "Unable to save template", issues: [issue] } }));
    }
  }, [updateState, documentStatus, storageNamespace]);

  const importTemplateJson = useCallback((serialized: string) => {
    const imported = importTemplate(serialized);
    if (!imported.success) {
      updateState((current) => ({
        ...current,
        status: "error",
        error: { message: "Unable to import template", issues: imported.issues },
      }));
      return;
    }

    try {
      requireBrowserStorage();
      saveTemplate(imported.value, storageNamespace);
      updateState((current) => successfulState(current, documentStatus(current.document), {
        templates: appendTemplate(current.templates, imported.value),
      }, ["template-storage", "storage"]));
    } catch (error) {
      const issue = templateSaveIssue(error, "storage.template_save_failed", "Unable to save imported template");
      updateState((current) => ({ ...current, status: "error", error: { message: "Unable to import template", issues: [issue] } }));
    }
  }, [updateState, documentStatus, storageNamespace]);

  const createFromTemplate = useCallback((templateId: string, name: string) => {
    updateState((current) => {
      const template = current.templates.find((candidate) => candidate.id === templateId);
      if (!template) return operationError(current, "template.not_found", "The selected template does not exist");
      try {
        const document = instantiateTemplate(template, name, idFactoryRef.current);
        recordHistory(current);
        return successfulState(current, documentStatus(document), { document, selectedNodeId: document.root.id });
      } catch (error) {
        return operationError(current, "template.instantiate_failed", messageFor(error, "Unable to create document from template"));
      }
    });
  }, [updateState, recordHistory, documentStatus]);

  const actions: VisualBuilderActions = {
    selectNode,
    applyStyleTransfer: (targetNodeId, payload, registry) => applyOperation((document) => applyStyleTransfer(document, targetNodeId, payload, { registry, createId: idFactoryRef.current })),
    setPreviewBreakpoint,
    addNode: (parentId, node, index) => applyOperation((document) => addNode(document, parentId, node, index)),
    removeNode: (nodeId) => applyOperation((document) => removeNode(document, nodeId)),
    moveNode: (nodeId, newParentId, index) => applyOperation((document) => moveNode(document, nodeId, newParentId, index)),
    reorderNode: (nodeId, direction) => applyOperation((document) => reorderNode(document, nodeId, direction)),
    duplicateNode: (nodeId) => applyOperation((document) => duplicateNode(document, nodeId, idFactoryRef.current)),
    addAccordionItem: (accordionId) => applyOperation((document) => addAccordionItem(document, accordionId, idFactoryRef.current)),
    addTabItem: (tabsId) => applyOperation((document) => addTabItem(document, tabsId, idFactoryRef.current)),
    removeTabItem: (tabId) => applyOperation((document) => removeTabItem(document, tabId)),
    changeSidebarItem: (sidebarId, action) => applyOperation(document => changeSidebarItem(document, sidebarId, action, idFactoryRef.current)),
    addScrollScene: (storyId) => applyOperation((document) => addScrollScene(document, storyId, idFactoryRef.current)),
    removeScrollScene: (sceneId) => applyOperation((document) => removeScrollScene(document, sceneId)),
    updateNode: (nodeId, patch) => applyOperation((document) => updateNode(document, nodeId, patch)),
    updateSelected: (patch) => applyOperation((document) => {
      const selectedNodeId = stateRef.current.selectedNodeId;
      return selectedNodeId === null
        ? { success: false, code: "operation.selection_required", message: "Select a node before updating it" }
        : updateNode(document, selectedNodeId, patch);
    }),
    promoteSelectedGrid: () => applyOperation((document) => {
      const selectedNodeId = stateRef.current.selectedNodeId;
      if (selectedNodeId === null) return { success: false, code: "operation.selection_required", message: "Select a Grid child first." };
      const selected = findNode(document.root, selectedNodeId);
      const parent = findParent(document.root, selectedNodeId);
      const gridId = selected?.type === "grid" ? selected.id : parent?.type === "grid" ? parent.id : null;
      return gridId === null
        ? { success: false, code: "grid.parent_required", message: "Select a Grid or one of its direct children." }
        : promoteGridToPositioned(document, gridId);
    }),
    moveSelectedInGrid: (direction) => applyOperation((document) => selectedGridOperation(
      stateRef.current,
      (nodeId, breakpoint) => moveGridChild(document, nodeId, breakpoint, direction),
    )),
    resizeSelectedInGrid: (size) => applyOperation((document) => selectedGridOperation(
      stateRef.current,
      (nodeId, breakpoint) => resizeGridChild(document, nodeId, breakpoint, size),
    )),
    setSelectedGridPlacement: (patch) => applyOperation((document) => selectedGridOperation(
      stateRef.current,
      (nodeId, breakpoint) => setGridChildPlacement(document, nodeId, breakpoint, patch),
    )),
    convertSelectedParentToGrid: () => applyOperation((document) => {
      const selectedNodeId = stateRef.current.selectedNodeId;
      if (selectedNodeId === null) return { success: false, code: "operation.selection_required", message: "Select a child first." };
      const parent = findParent(document.root, selectedNodeId);
      return parent === undefined
        ? { success: false, code: "operation.parent_not_found", message: "The selected node has no convertible parent." }
        : convertContainerToGrid(document, parent.id);
    }),
    insertNodeBeside: (targetNodeId, side, node, flexId) => applyOperation((document) => wrapNewNodeBeside(document, targetNodeId, side, node, flexId)),
    moveNodeBeside: (targetNodeId, side, nodeId, flexId) => applyOperation((document) => wrapNodeBeside(document, targetNodeId, side, nodeId, flexId)),
    undo,
    redo,
    save,
    reset,
    importJson,
    exportJson,
    saveAsTemplate,
    importTemplateJson,
    createFromTemplate,
  };

  return { state, actions };
}

function selectedGridOperation(
  state: VisualBuilderState,
  operation: (nodeId: string, breakpoint: VisualBuilderState["previewBreakpoint"]) => OperationResult,
): OperationResult {
  return state.selectedNodeId === null
    ? { success: false, code: "operation.selection_required", message: "Select a Grid child first." }
    : operation(state.selectedNodeId, state.previewBreakpoint);
}

function initialSelection(document: ComponentDocument): string | null {
  return document.root.children.length === 0 ? document.root.id : null;
}

function initialState(document: ComponentDocument): VisualBuilderState {
  return {
    document,
    selectedNodeId: initialSelection(document),
    previewBreakpoint: "desktop",
    status: "clean",
    canUndo: false,
    canRedo: false,
    templates: [],
    error: null,
    recoveryIssues: [],
  };
}

function historyEntry(state: VisualBuilderState): HistoryEntry {
  return { document: state.document, selectedNodeId: state.selectedNodeId };
}

function withHistoryFlags(state: VisualBuilderState, history: DocumentHistory): VisualBuilderState {
  return { ...state, canUndo: historyCanUndo(history), canRedo: historyCanRedo(history) };
}

function resolveDocument(documents: ComponentDocument[], activeDocumentId: string | null, fallback: ComponentDocument): ComponentDocument {
  return documents.find((document) => document.id === activeDocumentId) ?? fallback;
}

function operationError(state: VisualBuilderState, code: string, message: string): VisualBuilderState {
  return { ...state, status: "error", error: { message, issues: [storageIssue(code, message)] } };
}

function storageError(issues: ValidationIssue[]): { message: string; issues: ValidationIssue[] } {
  return { message: issues[0]?.message ?? "Browser storage is unavailable", issues };
}

function storageIssue(code: string, message: string): ValidationIssue {
  return { path: "$", code, message };
}

function recoveryEntries(source: VisualBuilderRecoveryIssue["source"], issues: ValidationIssue[]): VisualBuilderRecoveryIssue[] {
  return issues.map((issue) => ({ source, issue }));
}

function recoveryStatus(recoveryIssues: VisualBuilderRecoveryIssue[], documentStatus: "clean" | "dirty"):
  Pick<VisualBuilderState, "status" | "error"> {
  if (recoveryIssues.length === 0) return { status: documentStatus, error: null };
  return { status: "error", error: storageError(recoveryIssues.map((entry) => entry.issue)) };
}

function successfulState(
  current: VisualBuilderState,
  documentStatus: "clean" | "dirty",
  patch: Partial<VisualBuilderState>,
  clearedSources: VisualBuilderRecoveryIssue["source"][] = [],
): VisualBuilderState {
  const recoveryIssues = current.recoveryIssues.filter((entry) => !clearedSources.includes(entry.source));
  return { ...current, ...patch, recoveryIssues, ...recoveryStatus(recoveryIssues, documentStatus) };
}

function appendTemplate(templates: VisualTemplate[], template: VisualTemplate): VisualTemplate[] {
  return [...templates, template];
}

function templateSaveIssue(error: unknown, fallbackCode: string, fallbackMessage: string): ValidationIssue {
  return error instanceof TemplateIdCollisionError
    ? error.issue
    : storageIssue(fallbackCode, messageFor(error, fallbackMessage));
}

function messageFor(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

function requireBrowserStorage(): void {
  if (typeof window === "undefined") throw new Error("Browser storage is unavailable");
}
