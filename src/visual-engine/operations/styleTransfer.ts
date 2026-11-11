import { supportsChildGap } from "../model";
import type { AnimationSpec, ComponentDocument, ComponentNode, EffectAttachment, ImageNode, LayoutContainerFields, NodeType, StyleSpec } from "../model";
import { resolveNodeEffects, type EffectRegistry } from "../effects/core";
import { findNode, isStructuralNode, mapNode } from "./queryNode";
import { failure, finalizeDocument, type OperationResult } from "./result";

export const STYLE_TRANSFER_GROUPS = ["typography", "color", "spacing", "border", "sizing", "positioning", "textPaint", "background", "media", "animation", "effects"] as const;
export type StyleTransferGroup = (typeof STYLE_TRANSFER_GROUPS)[number];
export const STYLE_TRANSFER_LABELS: Record<StyleTransferGroup, string> = { typography: "Typography", color: "Colors", spacing: "Spacing", border: "Border & shadow", sizing: "Sizing", positioning: "Positioning & Sticky", textPaint: "Text paint", background: "Background paint", media: "Image appearance", animation: "Animation", effects: "Effects" };
export interface StyleTransferPayload {
  sourceType: NodeType;
  selectedGroups: StyleTransferGroup[];
  style: StyleSpec;
  animation?: AnimationSpec;
  effects?: EffectAttachment[];
  gap?: LayoutContainerFields["gap"];
  image?: Pick<ImageNode, "aspectRatio" | "objectFit">;
  excludedGroups?: Partial<Record<StyleTransferGroup, string>>;
}
export interface TransferIssue { group: StyleTransferGroup; message: string }
const textTypes: NodeType[] = ["heading", "text", "button", "badge", "link", "list", "stat", "quote", "input", "textarea", "select"];
const containerTypes: NodeType[] = ["section", "grid", "stack", "flex", "disclosure", "accordion", "tabs", "sidebar", "repeater", "card", "overlay", "form"];
const backgroundTypes: NodeType[] = ["section", "grid", "stack", "flex", "card", "overlay", "form"];

export function supportsStyleGroup(type: NodeType, group: StyleTransferGroup): boolean {
  if (type === "slot") return false;
  if (group === "typography") return textTypes.includes(type) || containerTypes.includes(type);
  if (group === "textPaint") return textTypes.includes(type);
  if (group === "media") return type === "image";
  if (group === "background") return backgroundTypes.includes(type);
  return true;
}

export function captureStyleTransfer(source: ComponentNode, selectedGroups?: StyleTransferGroup[]): StyleTransferPayload {
  const style: StyleSpec = {};
  for (const group of STYLE_TRANSFER_GROUPS) {
    if (group === "animation" || group === "effects") continue;
    if (source.style?.[group] !== undefined) Object.assign(style, { [group]: structuredClone(source.style[group]) });
  }
  // Image-backed backgrounds are never copied, even into the temporary clipboard.
  const hasImageBackground = style.background?.some((layer) => layer.kind === "image");
  if (hasImageBackground) delete style.background;
  const defaults = STYLE_TRANSFER_GROUPS.filter((group) => supportsStyleGroup(source.type, group)
    && (group !== "animation" || source.animation !== undefined)
    && (group !== "effects" || Boolean(source.effects?.length))
    && (group !== "background" || !hasImageBackground));
  return {
    sourceType: source.type, selectedGroups: [...(selectedGroups ?? defaults)], style,
    ...(hasImageBackground ? { excludedGroups: { background: "Image-backed backgrounds are excluded" } } : {}),
    ...(source.animation ? { animation: structuredClone(source.animation) } : {}),
    ...(source.effects ? { effects: source.effects.map(({ attachmentId, effectId, version, enabled, props }) => ({ attachmentId, effectId, version, enabled, props: structuredClone(props) })) } : {}),
    ...(source.type === "stack" || source.type === "flex" ? { gap: source.gap } : {}),
    ...(source.type === "image" ? { image: { ...(source.aspectRatio ? { aspectRatio: source.aspectRatio } : {}), ...(source.objectFit ? { objectFit: source.objectFit } : {}) } } : {}),
  };
}

export function inspectStyleTransfer(target: ComponentNode, payload: StyleTransferPayload, registry: EffectRegistry): TransferIssue[] {
  const issues: TransferIssue[] = [];
  for (const group of payload.selectedGroups) {
    const reject = (message: string) => issues.push({ group, message: `${STYLE_TRANSFER_LABELS[group] ?? group}: ${message}` });
    if (payload.excludedGroups?.[group]) { reject(payload.excludedGroups[group]!); continue; }
    if (!STYLE_TRANSFER_GROUPS.includes(group) || !supportsStyleGroup(payload.sourceType, group) || !supportsStyleGroup(target.type, group)) {
      reject(`Not supported by ${target.type}`); continue;
    }
    if (group === "spacing" && (payload.gap !== undefined || payload.style.spacing?.gap !== undefined) && !supportsChildGap(target.type)) reject("Container gap is not supported by this target");
    if (group === "sizing" && target.type !== "image" && (payload.image !== undefined || payload.style.sizing?.fit !== undefined || payload.style.sizing?.objectPosition !== undefined)) reject("Image fit and aspect ratio require an Image");
    if (group === "background" && (payload.style.background?.some((layer) => layer.kind === "image") || target.style?.background?.some((layer) => layer.kind === "image"))) reject("Image-backed backgrounds are excluded; deselect Background paint");
    if (group === "animation" && payload.animation) {
      if (payload.animation.stagger !== undefined && !isStructuralNode(target)) reject("Stagger requires a container");
      if (payload.animation.shuffle !== undefined && (target.type !== "grid" || !target.mediaLayout)) reject("Shuffle requires a media layout grid");
    }
    if (group === "effects") {
      const resolved = resolveNodeEffects({ id: target.id, type: target.type, effects: payload.effects ?? [] }, registry);
      for (const effect of resolved.all) if (effect.status !== "ready") reject(effect.diagnostics[0]?.message ?? "Effect is incompatible");
    }
  }
  return issues;
}

export function applyStyleTransfer(document: ComponentDocument, targetNodeId: string, payload: StyleTransferPayload, { registry, createId = () => crypto.randomUUID() }: { registry: EffectRegistry; createId?: () => string }): OperationResult {
  const target = findNode(document.root, targetNodeId);
  if (!target) return failure("operation.node_not_found", "The target node does not exist");
  const issues = inspectStyleTransfer(target, payload, registry);
  if (issues.length) return failure("style.incompatible", issues.map((issue) => issue.message).join("; "));
  const next = { ...target, style: { ...target.style } } as ComponentNode;
  for (const group of new Set(payload.selectedGroups)) {
    if (group === "animation") {
      if (payload.animation) next.animation = structuredClone(payload.animation); else delete next.animation;
    } else if (group === "effects") {
      if (payload.effects?.length) next.effects = structuredClone(payload.effects); else delete next.effects;
    } else {
      if (payload.style[group] !== undefined) Object.assign(next.style!, { [group]: structuredClone(payload.style[group]) });
      else delete next.style![group];
    }
    if (group === "spacing" && (next.type === "stack" || next.type === "flex")) {
      next.gap = payload.gap ?? payload.style.spacing?.gap ?? "none";
      if (next.style?.spacing) delete next.style.spacing.gap;
    }
    if (group === "spacing" && payload.gap !== undefined && supportsChildGap(next.type) && next.type !== "stack" && next.type !== "flex") next.style!.spacing = { ...next.style!.spacing, gap: payload.gap };
    if (group === "sizing" && next.type === "image") {
      delete next.aspectRatio; delete next.objectFit;
      if (payload.image?.aspectRatio !== undefined) next.aspectRatio = payload.image.aspectRatio;
      if (payload.image?.objectFit !== undefined) next.objectFit = payload.image.objectFit;
    }
  }
  if (!Object.keys(next.style ?? {}).length) delete next.style;
  const stable = (value: unknown): unknown => Array.isArray(value) ? value.map(stable) : value !== null && typeof value === "object" ? Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([key, entry]) => [key, stable(entry)])) : value;
  const comparable = (node: ComponentNode) => JSON.stringify(stable({ ...node, effects: node.effects?.map(({ attachmentId: _id, ...effect }) => effect) }));
  if (comparable(next) === comparable(target)) return { success: true, document, selectedNodeId: targetNodeId };
  if (payload.selectedGroups.includes("effects") && next.effects) {
    const ids = new Set<string>();
    const collect = (node: ComponentNode) => { node.effects?.forEach((effect) => ids.add(effect.attachmentId)); if (isStructuralNode(node)) node.children.forEach(collect); };
    collect(document.root);
    const replacements: EffectAttachment[] = [];
    for (const effect of next.effects) {
      const attachmentId = createId();
      if (!attachmentId || ids.has(attachmentId)) return failure("effect.id_duplicate", "Transferred effect IDs must be unique");
      ids.add(attachmentId);
      replacements.push({ ...effect, attachmentId });
    }
    next.effects = replacements;
  }
  return finalizeDocument({ ...document, root: mapNode(document.root, targetNodeId, () => next) as ComponentDocument["root"] }, { selectedNodeId: targetNodeId });
}
