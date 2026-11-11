import type { StyleTransferPayload } from "../operations/styleTransfer";
import type { EffectRegistry } from "../effects/core";
import type { Breakpoint, ComponentDocument, ComponentNode, GridPlacement } from "../model";
import type { GridDirection } from "../layout";
import type { ValidationIssue } from "../model/validation";
import type { BesideSide, NodePatch, ReorderDirection } from "../operations";
import type { VisualTemplate } from "../templates/types";
import type { SidebarItemAction } from "../operations/sidebar";

export interface VisualBuilderState {
  document: ComponentDocument;
  selectedNodeId: string | null;
  previewBreakpoint: Breakpoint;
  status: "clean" | "dirty" | "saving" | "error";
  canUndo: boolean;
  canRedo: boolean;
  templates: VisualTemplate[];
  error: { message: string; issues: ValidationIssue[] } | null;
  recoveryIssues: VisualBuilderRecoveryIssue[];
}

export interface VisualBuilderRecoveryIssue {
  source: "document-storage" | "template-storage" | "active-document" | "storage";
  issue: ValidationIssue;
}

export interface VisualBuilderActions {
  selectNode(nodeId: string | null): void;
  applyStyleTransfer(targetNodeId: string, payload: StyleTransferPayload, registry: EffectRegistry): boolean;
  setPreviewBreakpoint(breakpoint: Breakpoint): void;
  addNode(parentId: string, node: ComponentNode, index?: number): void;
  removeNode(nodeId: string): void;
  moveNode(nodeId: string, newParentId: string, index: number): void;
  reorderNode(nodeId: string, direction: ReorderDirection): void;
  duplicateNode(nodeId: string): void;
  addAccordionItem(accordionId: string): void;
  addTabItem(tabsId: string): void;
  removeTabItem(tabId: string): void;
  changeSidebarItem(sidebarId: string, action: SidebarItemAction): void;
  addScrollScene(storyId: string): void;
  removeScrollScene(sceneId: string): void;
  updateNode(nodeId: string, patch: NodePatch): void;
  updateSelected(patch: NodePatch): void;
  promoteSelectedGrid(): void;
  moveSelectedInGrid(direction: GridDirection): void;
  resizeSelectedInGrid(size: Pick<GridPlacement, "columnSpan" | "rowSpan">): void;
  setSelectedGridPlacement(patch: Partial<GridPlacement>): void;
  convertSelectedParentToGrid(): void;
  insertNodeBeside(targetNodeId: string, side: BesideSide, node: ComponentNode, flexId: string): void;
  moveNodeBeside(targetNodeId: string, side: BesideSide, nodeId: string, flexId: string): void;
  undo(): void;
  redo(): void;
  save(): void;
  reset(): void;
  importJson(serialized: string): void;
  exportJson(): string | null;
  saveAsTemplate(name: string): void;
  importTemplateJson(serialized: string): void;
  createFromTemplate(templateId: string, name: string): void;
}

export interface VisualBuilderOptions {
  storageNamespace?: string;
  initialDocument: ComponentDocument;
  idFactory?: () => string;
  now?: () => string;
  storageMode?: "local" | "external";
  onSaveDocument?: (document: ComponentDocument) => Promise<void> | void;
  initialTemplates?: VisualTemplate[];
}
