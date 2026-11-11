import type { ComponentDocument } from "../model/document";
import { cloneJsonObject, type EffectAttachment, type JsonObject } from "../model/effects";
import { defaultsForEffect, resolveNodeEffects, validateEffectProps, type EffectRegistry, type RegisteredEffect } from "../effects/core";
import { findNode } from "./queryNode";
import { failure, type OperationResult } from "./result";
import { updateNode } from "./updateNode";

export function addEffect(document: ComponentDocument, nodeId: string, registration: RegisteredEffect, createId: () => string, registry: EffectRegistry): OperationResult {
  const node = findNode(document.root, nodeId);
  if (!node) return failure("operation.node_not_found", "The target node does not exist");
  const attachment: EffectAttachment = { attachmentId: createId(), effectId: registration.id, version: registration.schemaVersion, enabled: true, props: defaultsForEffect(registration) };
  const effects = [...(node.effects ?? []), attachment];
  const resolution = resolveNodeEffects({ id: node.id, type: node.type, effects }, registry);
  const added = resolution.all.find((effect) => effect.attachment.attachmentId === attachment.attachmentId);
  if (added?.status !== "ready") return failure("effect.incompatible", added?.diagnostics[0]?.message ?? "Effect is incompatible");
  return updateNode(document, nodeId, { effects });
}

export function updateEffectProps(document: ComponentDocument, nodeId: string, attachmentId: string, patch: JsonObject, registry: EffectRegistry): OperationResult {
  const target = locate(document, nodeId, attachmentId);
  if (!target.success) return target.result;
  const registration = registry.get(target.attachment.effectId);
  if (!registration) return failure("effect.unavailable", "Effect is unavailable");
  const props = { ...target.attachment.props, ...cloneJsonObject(patch) };
  if (!validateEffectProps(registration, props).success) return failure("effect.props_invalid", "Effect properties are invalid");
  return replace(document, nodeId, target.effects.map((effect) => effect.attachmentId === attachmentId ? { ...effect, props } : effect));
}

export function setEffectEnabled(document: ComponentDocument, nodeId: string, attachmentId: string, enabled: boolean, registry: EffectRegistry): OperationResult {
  const target = locate(document, nodeId, attachmentId);
  if (!target.success) return target.result;
  const effects = target.effects.map((effect) => effect.attachmentId === attachmentId ? { ...effect, enabled } : effect);
  if (enabled) {
    const node = findNode(document.root, nodeId)!;
    const resolved = resolveNodeEffects({ id: node.id, type: node.type, effects }, registry).all.find((effect) => effect.attachment.attachmentId === attachmentId);
    if (resolved?.status !== "ready") return failure("effect.incompatible", resolved?.diagnostics[0]?.message ?? "Effect is incompatible");
  }
  return replace(document, nodeId, effects);
}

export function moveEffect(document: ComponentDocument, nodeId: string, attachmentId: string, toIndex: number): OperationResult {
  const target = locate(document, nodeId, attachmentId);
  if (!target.success) return target.result;
  if (!Number.isInteger(toIndex) || toIndex < 0 || toIndex >= target.effects.length) return failure("effect.index_invalid", "Effect destination index is invalid");
  const effects = [...target.effects];
  const [moved] = effects.splice(effects.findIndex((effect) => effect.attachmentId === attachmentId), 1);
  effects.splice(toIndex, 0, moved!);
  return replace(document, nodeId, effects);
}

export function duplicateEffect(document: ComponentDocument, nodeId: string, attachmentId: string, registry: EffectRegistry, createId: () => string): OperationResult {
  const target = locate(document, nodeId, attachmentId);
  if (!target.success) return target.result;
  const registration = registry.get(target.attachment.effectId);
  if (!registration) return failure("effect.unavailable", "Effect is unavailable");
  if (registration.stacking === "single") return failure("effect.incompatible", "This effect cannot be duplicated");
  const copy: EffectAttachment = { ...target.attachment, attachmentId: createId(), props: cloneJsonObject(target.attachment.props), ...(target.attachment.metadata ? { metadata: cloneJsonObject(target.attachment.metadata) } : {}) };
  const index = target.effects.findIndex((effect) => effect.attachmentId === attachmentId);
  const effects = [...target.effects.slice(0, index + 1), copy, ...target.effects.slice(index + 1)];
  const node = findNode(document.root, nodeId)!;
  const resolved = resolveNodeEffects({ id: node.id, type: node.type, effects }, registry).all.find((effect) => effect.attachment.attachmentId === copy.attachmentId);
  if (resolved?.status !== "ready") return failure("effect.incompatible", resolved?.diagnostics[0]?.message ?? "Effect is incompatible");
  return replace(document, nodeId, effects);
}

export function removeEffect(document: ComponentDocument, nodeId: string, attachmentId: string): OperationResult {
  const target = locate(document, nodeId, attachmentId);
  if (!target.success) return target.result;
  return replace(document, nodeId, target.effects.filter((effect) => effect.attachmentId !== attachmentId));
}

function replace(document: ComponentDocument, nodeId: string, effects: EffectAttachment[]): OperationResult { return updateNode(document, nodeId, { effects }); }

function locate(document: ComponentDocument, nodeId: string, attachmentId: string): { success: true; effects: EffectAttachment[]; attachment: EffectAttachment } | { success: false; result: OperationResult } {
  const node = findNode(document.root, nodeId);
  if (!node) return { success: false, result: failure("operation.node_not_found", "The target node does not exist") };
  const effects = node.effects ?? [];
  const attachment = effects.find((effect) => effect.attachmentId === attachmentId);
  return attachment ? { success: true, effects, attachment } : { success: false, result: failure("effect.attachment_not_found", "Effect attachment does not exist") };
}
