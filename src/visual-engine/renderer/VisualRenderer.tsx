"use client";

import { useMemo, useState, type CSSProperties, type DragEvent, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { resolveComponentRenderer } from "../components/renderers/registry";
import { heightScale } from "../model/proportionalSizing";
import { nodeClassNames, nodeWrapperClassName, structuralChildPresentation, combineNodeStyles, withoutBackground } from "./nodePresentation";
export { nodeClassNames } from "./nodePresentation";
import type { AnimationSpec, Breakpoint, ComponentDocument, ComponentNode, StructuralNode, SlotNode, RepeaterNode, StyleSpec } from "../model";
import { isActiveAnimation } from "../model/animation";
import type { RenderNodeOptions } from "../components/renderers/types";
import { VisualImage } from "./images/VisualImage";
import { leadingImageId } from "./images/imagePriority";
import { AnimatedNode } from "./AnimatedNode";
import { BackgroundLayers } from "./BackgroundLayers";
import { pageTextPaintStyle } from "./paintStyles";
import { EffectHost, type EffectDiagnostic, type EffectRegistry } from "../effects/core";
import { DisclosureRuntime, type DisclosurePreviewState } from "./DisclosureRuntime";
import { TabsRuntime } from "./TabsRuntime";
import { SidebarRuntime } from "./SidebarRuntime";
import { isStructuralNode, type NodePatch } from "../operations";
import { conditionalColorPresentation } from "./conditionalColors";
import { bindNode } from "./bindings";
import { repeaterGridStyle } from "./repeaterLayout";
import { instantiateNode, safeInstanceKey } from "./instances";
import { boundedCollection, collectionSourceKey, recordIdentities, type ResolvedCollectionMap, type ResolvedCollectionRecord, type ResolvedCollectionState, type ResolvedCollectionStateMap } from "./repeaters";
import { inlineTextValue, type InlineEditTarget } from "./InlineTextEditor";
import { buildResponsiveSpacingCss, hasResponsiveChildGap, responsiveChildGapClassName, responsiveSpacingClassName } from "./responsiveSpacing";
import "./visual-renderer.css";
import {
  gridPlacementClassNames,
  HEADING_BASE_CLASSES,

  TEXT_BASE_CLASSES,

} from "./styleTokens";
import type { VisualSiteContext } from "./siteContext";
import type { ThemeMode } from "../theme";

export interface VisualHostActionEvent { nodeId: string; action: import("../model").HostActionSpec; item?: ResolvedCollectionRecord }

export interface SpanOverride { nodeId: string; span: number }

/** Canvas-only live preview of a custom pixel width/height before it is committed. */
export interface SizeOverride { nodeId: string; width?: number; height?: number }

/** Canvas-only hooks that make existing components draggable for reorder/reparent drops. */
export interface CanvasNodeDragProps {
  onDragStart(nodeId: string, event: DragEvent<HTMLDivElement>): void;
}

/** Canvas-only inline text editing hooks for text-bearing nodes (headings, text, buttons, repeated entries). */
export interface InlineTextEditProps {
  editingNodeId: string | null;
  /** Field target currently being edited (null for the node's default single text field). */
  editingTarget?: InlineEditTarget | null;
  onStartEdit(nodeId: string, target?: InlineEditTarget): void;
  onCommit(nodeId: string, value: string, target?: InlineEditTarget): void;
  onCancel(nodeId: string): void;
}

interface VisualRendererBaseProps {
  document: ComponentDocument;
  publicContext?: { rootId: string; priorityImageId?: string; item?: ResolvedCollectionRecord; inherited?: InheritedAnimation };
  /** Host-only placement presentation: mark the single outer frame and its layout slot. */
  fillContainerId?: string;
  selectedNodeId?: string;
  onSelect?: (nodeId: string) => void;
  spanOverride?: SpanOverride;
  sizeOverride?: SizeOverride;
  replayTokens?: Record<string, number>;
  /** Editor-only entry animation clock in milliseconds; omitted for runtime playback. */
  motionTime?: number;
  effectRegistry?: EffectRegistry;
  onEffectDiagnostic?: (diagnostic: EffectDiagnostic) => void;
  disclosurePreview?: DisclosurePreviewState;
  interactiveDisclosures?: boolean;
  resolvedCollections?: ResolvedCollectionMap;
  /**
   * Host-reported data status per repeater id. When a repeater has an entry, only `success` renders
   * records (looked up by exact source key); other statuses render a local message instead.
   */
  collectionStates?: ResolvedCollectionStateMap;
  site?: VisualSiteContext;
  themeMode?: ThemeMode;
  inlineTextEdit?: InlineTextEditProps;
  nodeDrag?: CanvasNodeDragProps;
  /** Canvas-only structural edits triggered from controls rendered inside a node. */
  onNodePatch?: (nodeId: string, patch: NodePatch) => void;
  onHostAction?: (event: VisualHostActionEvent) => void;
  getHostActionState?: (event: VisualHostActionEvent) => { hidden?: boolean; disabled?: boolean; reason?: string };
}

export type VisualRendererProps = VisualRendererBaseProps & (
  | { mode: "canvas"; breakpoint: Breakpoint }
  | { mode?: "preview"; breakpoint?: never }
);

interface RendererContext {
  priorityImageId?: string;
  interactiveExpansions?: boolean;
  mode: "preview" | "canvas";
  breakpoint?: Breakpoint;
  /** Host-only placement presentation: mark the single outer frame and its layout slot. */
  fillContainerId?: string;
  selectedNodeId?: string;
  onSelect?: (nodeId: string) => void;
  spanOverride?: SpanOverride;
  sizeOverride?: SizeOverride;
  replayTokens?: Record<string, number>;
  motionTime?: number;
  effectRegistry?: EffectRegistry;
  onEffectDiagnostic?: (diagnostic: EffectDiagnostic) => void;
  disclosurePreview?: DisclosurePreviewState;
  interactiveDisclosures?: boolean;
  resolvedCollections?: ResolvedCollectionMap;
  collectionStates?: ResolvedCollectionStateMap;
  /** Namespace of the enclosing repeater instance; keeps DOM ids unique per rendered record. */
  instanceNamespace?: string;
  item?: ResolvedCollectionRecord;
  reducedMotion: boolean;
  site?: VisualSiteContext;
  themeMode?: ThemeMode;
  openMenuPanels: ReadonlySet<string>;
  toggleMenuPanel(nodeId: string): void;
  inlineTextEdit?: InlineTextEditProps;
  nodeDrag?: CanvasNodeDragProps;
  onNodePatch?: (nodeId: string, patch: NodePatch) => void;
  onHostAction?: (event: VisualHostActionEvent) => void;
  getHostActionState?: (event: VisualHostActionEvent) => { hidden?: boolean; disabled?: boolean; reason?: string };
  rootId: string;
  documentId: string;
}

interface InheritedAnimation { spec: AnimationSpec; delay: number; sourceId: string }

export interface VisualNodePreviewProps {
  node: ComponentNode;
  breakpoint: Breakpoint;
  site?: VisualSiteContext;
  themeMode?: ThemeMode;
  effectRegistry?: EffectRegistry;
}

function ResponsiveSpacingStyle({ css }: { css: string }) {
  return css.length > 0 ? <style data-ve-responsive-spacing="" dangerouslySetInnerHTML={{ __html: css }} /> : null;
}

/** Renders a single node on its own, for live drag previews. */
export function VisualNodePreview({ node, breakpoint, site, themeMode, effectRegistry }: VisualNodePreviewProps) {
  const responsiveSpacingCss = buildResponsiveSpacingCss(node, node.id, breakpoint);
  return <><ResponsiveSpacingStyle css={responsiveSpacingCss} />{renderNode(node, {
    mode: "canvas",
    breakpoint,
    reducedMotion: true,
    openMenuPanels: new Set(),
    toggleMenuPanel: () => undefined,
    site,
    themeMode,
    effectRegistry,
    rootId: node.id,
    documentId: node.id,
  })}</>;
}

export function VisualRenderer({ document, publicContext, fillContainerId, mode = "preview", breakpoint, selectedNodeId, onSelect, spanOverride, sizeOverride, replayTokens, motionTime, effectRegistry, onEffectDiagnostic, disclosurePreview, interactiveDisclosures, resolvedCollections, collectionStates, site, themeMode, inlineTextEdit, nodeDrag, onNodePatch, onHostAction, getHostActionState }: VisualRendererProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [openMenuPanels, setOpenMenuPanels] = useState<ReadonlySet<string>>(() => new Set());
  const toggleMenuPanel = (nodeId: string) => setOpenMenuPanels((current) => {
    const next = new Set(current);
    if (next.has(nodeId)) next.delete(nodeId); else next.add(nodeId);
    return next;
  });
  const responsiveSpacingCss = useMemo(
    () => buildResponsiveSpacingCss(document.root, document.id, mode === "canvas" ? breakpoint : undefined),
    [mode, breakpoint, document.id, document.root],
  );
  return <><ResponsiveSpacingStyle css={responsiveSpacingCss} />{renderNode(document.root, { priorityImageId: publicContext ? publicContext.priorityImageId : mode === "preview" ? leadingImageId(document.root, undefined, resolvedCollections) : undefined, item: publicContext?.item, mode, breakpoint, fillContainerId, selectedNodeId, onSelect, spanOverride, sizeOverride, replayTokens, motionTime, effectRegistry, onEffectDiagnostic, disclosurePreview, interactiveDisclosures, resolvedCollections, collectionStates, reducedMotion, site, themeMode, openMenuPanels, toggleMenuPanel, inlineTextEdit, nodeDrag, onNodePatch, onHostAction, getHostActionState, rootId: publicContext?.rootId ?? document.root.id, documentId: document.id }, publicContext?.inherited)}</>;
}

function renderNode(node: ComponentNode, context: RendererContext, inherited?: InheritedAnimation): ReactNode {
  const scale = heightScale(node.style?.sizing?.scaleFromHeight, node.style?.sizing?.height);
  const sizedNode = scale !== null ? { ...node, style: { ...node.style, sizing: { ...node.style?.sizing, height: node.style?.sizing?.scaleFromHeight } } } : node;
  const renderedNode = bindNode(sizedNode, context.item);
  const inlineEditValue = context.mode === "canvas" && context.inlineTextEdit !== undefined ? inlineTextValue(renderedNode) : null;
  const editingInline = inlineEditValue !== null
    && context.inlineTextEdit !== undefined
    && context.inlineTextEdit.editingNodeId === node.id;
  const handleStartEdit = inlineEditValue === null || context.inlineTextEdit === undefined || context.mode !== "canvas"
    ? undefined
    : (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        context.onSelect?.(node.id);
        context.inlineTextEdit?.onStartEdit(node.id);
      };
  const rootBackgroundSuppressed = context.mode === "preview" && context.site?.pageHasBackground === true && node.id === context.rootId;
  const attachments = rootBackgroundSuppressed
    ? node.effects?.filter((attachment) => context.effectRegistry?.get(attachment.effectId)?.layer !== "background")
    : node.effects;
  const hasEffectHost = !!attachments?.length && !!context.effectRegistry && !editingInline;
  const rotation = renderedNode.style?.transform?.rotate;
  const hostRotation = hasEffectHost && typeof rotation === "number" && Number.isFinite(rotation) && Math.abs(rotation) <= 180 ? rotation : undefined;
  const semanticNode = hostRotation === undefined ? renderedNode : { ...renderedNode, style: { ...renderedNode.style, transform: undefined } } as ComponentNode;
  const semantic = renderSemanticNode(semanticNode, context);
  const effected = attachments?.length && context.effectRegistry && !editingInline ? (
    <EffectHost nodeId={node.id} nodeType={node.type} attachments={attachments} registry={context.effectRegistry} reducedMotion={context.reducedMotion} onDiagnostic={context.onEffectDiagnostic} style={hostRotation === undefined ? undefined : { rotate: `${hostRotation}deg` }}>{semantic}</EffectHost>
  ) : semantic;
  const content = animateContent(node, effected, context, editingInline ? undefined : inherited);
  const isCanvas = context.mode === "canvas";
  const selected = isCanvas && context.selectedNodeId === node.id;
  const canDrag = isCanvas && context.nodeDrag !== undefined && node.id !== context.rootId && node.type !== "slot" && !editingInline;
  const handleNodeDragStart = canDrag && context.nodeDrag !== undefined
    ? (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        context.nodeDrag?.onDragStart(node.id, event);
      }
    : undefined;
  const handleSelect = (event: MouseEvent<HTMLDivElement>) => { event.preventDefault(); event.stopPropagation(); context.onSelect?.(node.id); };
  const handleSelectKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (context.interactiveDisclosures && event.target instanceof Element && event.target.closest(".ve-disclosure__trigger")) return;
    if (event.target instanceof Element && event.target.closest(".ve-tabs__tab, .ve-sidebar__item")) return;
    if (isEditableDomTarget(event.target)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation(); context.onSelect?.(node.id);
  };
  return (
    <div
      className={`${nodeWrapperClassName(node)}${handleStartEdit !== undefined ? " ve-canvas-editable-text" : ""}${editingInline ? " ve-canvas-editing-text" : ""}`}
      style={scale !== null ? { zoom: scale } : undefined}
      data-ve-fill-container={context.fillContainerId === node.id ? "true" : undefined}
      data-node-id={isCanvas ? node.id : undefined}
      data-selected={selected ? "true" : undefined}
      aria-label={isCanvas ? `Select ${node.type} ${node.id}` : undefined}
      tabIndex={isCanvas ? 0 : undefined}
      draggable={canDrag || undefined}
      onClick={isCanvas ? handleSelect : undefined}
      onDoubleClick={handleStartEdit}
      onDragStart={handleNodeDragStart}
      onKeyDown={isCanvas ? handleSelectKey : undefined}
    >{content}</div>
  );
}

function isEditableDomTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
}


function renderStructuralChildren(node: StructuralNode, context: RendererContext): ReactNode {
  const stagger = staggeredAnimation(node);
  return node.children.flatMap((child, index) => {
    if (child.type === "repeater" && context.mode === "preview") return renderRepeaterInstances(node, child, context);
    const override = context.spanOverride?.nodeId === child.id ? context.spanOverride.span : undefined;
    const inherited = stagger === undefined ? undefined : { spec: stagger, delay: stagger.delay + index * (stagger.stagger ?? 0), sourceId: node.id };
    return (
      <div
        key={child.id}
        {...structuralChildPresentation(node, child, context.breakpoint, override)}
        data-ve-fill-slot={context.fillContainerId === child.id ? "true" : undefined}
        data-node-wrapper-id={child.id}
      >{renderNode(child, context, inherited)}</div>
    );
  });
}

function CollectionStatusMessage({ repeaterId, state }: { repeaterId: string; state: ResolvedCollectionState }) {
  const failed = state.status === "error";
  return (
    <div className="ve-collection-status" role={failed ? "alert" : "status"} data-repeater-status={state.status} data-repeater-id={repeaterId} data-collection-reason={state.reason}>
      <p>{state.message ?? (failed ? "This content could not be loaded." : state.status === "loading" ? "Loading…" : "No items to display.")}</p>
      {failed && state.onRetry ? <button type="button" className="ve-collection-status__retry" onClick={state.onRetry}>{state.retryLabel ?? "Try again"}</button> : null}
    </div>
  );
}

function repeatedLayout(node: RepeaterNode, index: number, summary = false): RepeaterNode {
  if (!node.layout?.start) return summary ? { ...node, layout: { ...node.layout, span: { mobile: 12, tablet: 12, desktop: 12 } } } : node;
  const start = { ...node.layout.start };
  for (const breakpoint of ["mobile", "tablet", "desktop"] as const) {
    const position = start[breakpoint]; if (!position) continue;
    const span = Math.min(12, Math.max(1, node.layout.span?.[breakpoint] ?? 1));
    const column = Math.max(1, Math.min(position.column, 13 - span));
    const perRow = Math.max(1, Math.floor((13 - column) / span));
    start[breakpoint] = summary ? { column: 1, row: position.row + Math.floor(Math.max(0, index - 1) / perRow) + 1 } : { column: column + index % perRow * span, row: position.row + Math.floor(index / perRow) };
  }
  return { ...node, layout: { ...node.layout, start, ...(summary ? { span: { mobile: 12, tablet: 12, desktop: 12 } } : {}) } };
}

function renderRepeaterInstances(parent: StructuralNode, repeater: RepeaterNode, context: RendererContext): ReactNode[] {
  const item = repeater.children.find((child): child is SlotNode => child.type === "slot" && child.name === "item");
  if (!item) return [];
  // Inside a repeated instance, ids carry that instance's suffix; hosts key states by the pre-instance id.
  const hostId = context.instanceNamespace && repeater.id.endsWith(`--${context.instanceNamespace}`) ? repeater.id.slice(0, -(context.instanceNamespace.length + 2)) : repeater.id;
  const state = context.collectionStates?.[hostId];
  if (state && state.status !== "success") return [<div key={`${repeater.id}:status`} {...structuralChildPresentation(parent, repeater, context.breakpoint)}><CollectionStatusMessage repeaterId={repeater.id} state={state} /></div>];
  // Hosts that report status resolve exact source keys only; sample and legacy previews may still use the schema fallback.
  const exact = context.resolvedCollections?.[collectionSourceKey(repeater.source)];
  const records = boundedCollection(state ? exact : exact ?? context.resolvedCollections?.[repeater.source.schemaName], repeater.source.limit);
  const identities = recordIdentities(records);
  const rendered = records.map((record, index) => {
    const identity = identities[index];
    const namespace = `${context.instanceNamespace ? `${context.instanceNamespace}.` : ""}${safeInstanceKey(repeater.id)}.${identity}`;
    const instanceItem = instantiateNode(item, namespace);
    const override = context.spanOverride?.nodeId === repeater.id ? context.spanOverride.span : undefined;
    return (
      <div key={`${repeater.id}:${identity}`} {...(repeater.itemsLayout ? { className: "ve-repeater-item" } : structuralChildPresentation(parent, repeatedLayout(repeater, index), context.breakpoint, override))} data-repeater-instance={`${repeater.id}:${identity}`} data-repeater-index={index}>
        <ResponsiveSpacingStyle css={buildResponsiveSpacingCss(instanceItem, context.documentId, context.breakpoint)} />
        {renderStructuralChildren(instanceItem, { ...context, item: record, instanceNamespace: namespace, priorityImageId: index === 0 && context.priorityImageId !== undefined ? `${context.priorityImageId}--${namespace}` : undefined })}
      </div>
    );
  });
  if (repeater.itemsLayout) {
    const surfaceClasses = [
      nodeClassNames(repeater, context.breakpoint),
      repeater.responsive?.spacing ? responsiveSpacingClassName(context.documentId, repeater.id) : "",
      hasResponsiveChildGap(repeater) ? responsiveChildGapClassName(context.documentId, repeater.id) : "",
    ].filter(Boolean).join(" ");
    return [<div key={repeater.id} {...structuralChildPresentation(parent, repeater, context.breakpoint)} data-repeater-region={repeater.id}>
      <div className={surfaceClasses} style={combineNodeStyles(repeater)}>
        <div className="ve-repeater-grid" data-repeater-grid={repeater.id} style={repeaterGridStyle(repeater.itemsLayout, context.breakpoint)}>{rendered}</div>
        {state?.message ? <p role="status" className="ve-collection-summary">{state.message}</p> : null}
      </div>
    </div>];
  }
  if (state?.message) rendered.push(<div key={`${repeater.id}:summary`} {...structuralChildPresentation(parent, repeatedLayout(repeater, records.length, true), context.breakpoint)}><p role="status" className="ve-collection-summary">{state.message}</p></div>);
  return rendered;
}

function staggeredAnimation(node: StructuralNode): AnimationSpec | undefined {
  return isActiveAnimation(node.animation) && node.animation.stagger !== undefined ? node.animation : undefined;
}

function animateContent(node: ComponentNode, content: ReactNode, context: RendererContext, inherited?: InheritedAnimation): ReactNode {
  if (inherited !== undefined) return <AnimatedNode key={animationKey(inherited.sourceId, inherited.spec, context)} animation={inherited.spec} delay={inherited.delay} motionTime={context.motionTime}>{content}</AnimatedNode>;
  if (!isActiveAnimation(node.animation) || node.animation.stagger !== undefined) return content;
  return <AnimatedNode key={animationKey(node.id, node.animation, context)} animation={node.animation} motionTime={context.motionTime}>{content}</AnimatedNode>;
}

function animationKey(nodeId: string, spec: AnimationSpec, context: RendererContext): string {
  return `${nodeId}:${spec.preset}:${spec.trigger}:${spec.duration}:${spec.delay}:${spec.easing}:${spec.once}:${spec.stagger ?? ""}:${context.replayTokens?.[nodeId] ?? 0}`;
}

function renderSemanticNode(node: ComponentNode, context: RendererContext): ReactNode {
  const renderer = resolveComponentRenderer(node.type);
  if (!renderer) {
    const unknown = node as { id?: string; type?: string };
    return process.env.NODE_ENV === "production" ? null : <div className="border border-red-500 bg-red-50 p-2 text-sm text-red-700" role="alert">Unsupported visual node: {unknown.type ?? "unknown"} ({unknown.id ?? "unknown"})</div>;
  }
  const sizeDraft = context.sizeOverride?.nodeId === node.id ? context.sizeOverride : undefined;
  const suppressBackground = context.mode === "preview" && context.site?.pageHasBackground === true && node.id === context.rootId;
  const conditional = conditionalColorPresentation(node, context.item, suppressBackground);
  const semanticNode = suppressBackground ? withoutBackground(conditional.node) : conditional.node;
  const responsiveClass = semanticNode.responsive?.spacing === undefined
    ? ""
    : ` ${responsiveSpacingClassName(context.documentId, semanticNode.id)}`;
  const responsiveGapClass = hasResponsiveChildGap(semanticNode)
    ? responsiveChildGapClassName(context.documentId, semanticNode.id)
    : undefined;
  return renderer(semanticNode as never, {
    mode: context.mode,
    imagePriority: context.priorityImageId === node.id,
    reducedMotion: context.reducedMotion,
    breakpoint: context.breakpoint,
    className: `${nodeClassNames(semanticNode, context.breakpoint)}${responsiveClass}${responsiveGapClass ? ` ${responsiveGapClass}` : ""}`,
    responsiveChildGapClassName: responsiveGapClass,
    backgrounds: <BackgroundLayers layers={semanticNode.style?.background} />,
    disclosurePreview: context.disclosurePreview,
    interactiveDisclosures: context.interactiveDisclosures,
    interactiveExpansions: context.interactiveExpansions,
    canvasSelected: context.selectedNodeId === node.id,
    selectedNodeId: context.selectedNodeId,
    inlineEditingNodeId: context.inlineTextEdit?.editingNodeId ?? null,
    inlineEditingTarget: context.inlineTextEdit?.editingTarget ?? null,
    onInlineTextCommit: context.inlineTextEdit?.onCommit,
    onInlineTextCancel: context.inlineTextEdit?.onCancel,
    onInlineTextEditStart: context.inlineTextEdit?.onStartEdit,
    onNodePatch: context.onNodePatch,
    hostActionState: node.type === "button" && node.action && context.mode === "preview"
      ? context.getHostActionState?.({ nodeId: node.id, action: node.action, item: context.item }) : undefined,
    onHostAction: node.type === "button" && node.action && context.mode === "preview" && context.onHostAction
      ? () => context.onHostAction?.({ nodeId: node.id, action: structuredClone(node.action!), ...(context.item ? { item: structuredClone(context.item) } : {}) })
      : undefined,
    onSelect: context.onSelect,
    site: conditional.textOverride && context.site ? { ...context.site, pageComponentColors: false } : context.site,
    themeMode: context.themeMode,
    currentNode: semanticNode,
    isMenuPanelOpen: (nodeId) => context.openMenuPanels.has(nodeId),
    toggleMenuPanel: context.toggleMenuPanel,
    combineNodeStyles: (target, extra) => combineNodeStyles(target, target.id === node.id && (sizeDraft !== undefined || conditional.styles) ? { ...(sizeDraft ? sizeOverrideStyles(sizeDraft) : {}), ...extra, ...conditional.styles } : extra),
    renderNode: (child, instanceKey, options) => renderNodeInstance(child, context, instanceKey, options),
    renderPreviewNode: (child, instanceKey, options) => renderNodeInstance(child, { ...context, mode: "preview", interactiveExpansions: false, selectedNodeId: undefined, onSelect: undefined, inlineTextEdit: undefined, nodeDrag: undefined, onNodePatch: undefined }, instanceKey, options),
    renderStructuralChildren: (parent) => renderStructuralChildren(parent, context),
    renderDisclosure: (disclosure, open, onOpenChange, forcedState) => renderDisclosure(disclosure, context, open, onOpenChange, forcedState),
    renderTabs: (tabs) => renderTabs(tabs, context),
  });
}

function renderNodeInstance(child: ComponentNode, context: RendererContext, instanceKey?: string, options?: RenderNodeOptions): ReactNode {
  if (instanceKey !== undefined || options?.imagePriority === false) context = { ...context, priorityImageId: undefined };
  const instance = instanceKey === undefined ? child : instantiateNode(child, instanceKey);
  const content = instance.type === "repeater" && context.mode === "preview"
    ? renderStructuralChildren({ id: `${instance.id}-slide`, type: "section", children: [instance] }, context)
    : renderNode(instance, context);
  return instanceKey === undefined ? content : <><ResponsiveSpacingStyle css={buildResponsiveSpacingCss(instance, context.documentId, context.breakpoint)} />{content}</>;
}

function sizeOverrideStyles(override: SizeOverride): CSSProperties {
  return {
    ...(override.width !== undefined ? { width: `${override.width}px` } : {}),
    ...(override.height !== undefined ? { height: `${override.height}px` } : {}),
  };
}

function renderDisclosure(node: Extract<ComponentNode, { type: "disclosure" }>, context: RendererContext, open?: boolean, onOpenChange?: (open: boolean) => void, forcedState = context.disclosurePreview?.[node.id] ?? "default"): ReactNode {
  const trigger = node.children.find((child): child is SlotNode => child.type === "slot" && child.name === "trigger");
  const content = node.children.find((child): child is SlotNode => child.type === "slot" && child.name === "content");
  return <DisclosureRuntime node={node} forcedState={context.mode === "canvas" ? forcedState : "default"} interactive={context.mode === "preview" || context.interactiveDisclosures === true} open={open} onOpenChange={onOpenChange} trigger={trigger ? renderTriggerChildren(trigger, context) : null} content={content ? renderStructuralChildren(content, { ...context, priorityImageId: undefined }) : null} />;
}

function renderTabs(node: Extract<ComponentNode, { type: "tabs" | "sidebar" }>, context: RendererContext): ReactNode {
  const trigger = (item: Extract<ComponentNode, { type: "disclosure" }>) => item.children.find((child): child is SlotNode => child.type === "slot" && child.name === "trigger");
  const content = (item: Extract<ComponentNode, { type: "disclosure" }>) => item.children.find((child): child is SlotNode => child.type === "slot" && child.name === "content");
  if (node.type === "sidebar") return <SidebarRuntime node={node}
    inheritTextColor={node.style?.color?.text !== undefined}
    selectedNodeId={context.mode === "canvas" ? context.selectedNodeId : undefined}
    onSelectPanel={context.mode === "canvas" ? context.onSelect : undefined}
    renderLabel={item => { const slot = trigger(item); return slot ? renderTriggerChildren(slot, context, false) : null; }}
    renderPanel={item => { const slot = content(item); return slot ? renderStructuralChildren(slot, context) : null; }}
  />;
  return (
    <TabsRuntime
      node={node}
      renderLabel={(item) => {
        const slot = trigger(item);
        return slot ? renderTriggerChildren(slot, context, false) : null;
      }}
      renderPanel={(item) => {
        const slot = content(item);
        return slot ? renderStructuralChildren(slot, context) : null;
      }}
    />
  );
}

function renderTriggerChildren(slot: StructuralNode, context: RendererContext, selectableOnCanvas = true): ReactNode {
  return slot.children.map((child) => {
    const canvasProps = context.mode === "canvas" && selectableOnCanvas ? {
      "data-node-id": child.id,
      "data-selected": context.selectedNodeId === child.id ? "true" : undefined,
      onClick: (event: MouseEvent<HTMLElement>) => { event.preventDefault(); event.stopPropagation(); context.onSelect?.(child.id); },
    } : {};
    const conditional = conditionalColorPresentation(bindNode(child, context.item), context.item);
    const painted = conditional.node;
    const site = conditional.textOverride && context.site ? { ...context.site, pageComponentColors: false } : context.site;
    if (painted.type === "heading" || painted.type === "text") {
      const className = withBaseline(nodeClassNames(painted, context.breakpoint), painted.style?.typography, painted.type === "heading" ? HEADING_BASE_CLASSES : TEXT_BASE_CLASSES);
      return <span key={child.id} className={className} style={combineNodeStyles(painted, { ...pageTextPaintStyle(painted, site), ...conditional.styles })} {...canvasProps}>{painted.text}</span>;
    }
    if (painted.type === "image") return <span key={child.id} {...canvasProps}><VisualImage className={nodeClassNames(painted, context.breakpoint)} style={combineNodeStyles(painted, conditional.styles)} src={painted.src} alt={painted.alt} priority={context.priorityImageId === child.id} /></span>;
    if (painted.type === "divider") return <span key={child.id} className="ve-disclosure__divider" style={combineNodeStyles(painted, conditional.styles)} aria-hidden={context.mode === "preview" ? "true" : undefined} {...canvasProps} />;
    return <span key={child.id}>{renderNode(child, context)}</span>;
  });
}

function withBaseline(className: string, typography: StyleSpec["typography"] | undefined, baseline: string): string {
  const applied = baseline.split(" ").filter((token) => token.startsWith("tracking-") ? typography?.tracking === undefined : typography?.leading === undefined);
  return [className, ...applied].filter(Boolean).join(" ");
}
