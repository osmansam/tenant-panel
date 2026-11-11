import type { EffectAttachment, JsonObject } from "../../model/effects";
import type { NodeType } from "../../model/nodes";
import { validateEffectProps } from "./inputSchema";
import type { EffectLayer, EffectRegistry, RegisteredEffect } from "./types";

export type EffectRuntimeStatus = "ready" | "unavailable" | "incompatible" | "invalid-config" | "unsupported-version";
export interface EffectDiagnostic {
  attachmentId: string;
  effectId: string;
  status: Exclude<EffectRuntimeStatus, "ready">;
  code: string;
  message: string;
}
export interface ResolvedEffect {
  attachment: EffectAttachment;
  registration?: RegisteredEffect;
  status: EffectRuntimeStatus;
  diagnostics: EffectDiagnostic[];
  validatedProps?: JsonObject;
  useFallback: boolean;
}
export interface EffectRuntimeCapabilities {
  allowWebGL: boolean;
  allowPointerInteraction: boolean;
  reducedMotion: boolean;
  clientAvailable?: boolean;
}
export interface EffectNodeLike { id: string; type: NodeType; effects?: EffectAttachment[] }
export type ResolvedEffectLayers = Record<EffectLayer, ResolvedEffect[]> & { all: ResolvedEffect[] };

const DEFAULT_RUNTIME: EffectRuntimeCapabilities = { allowWebGL: true, allowPointerInteraction: true, reducedMotion: false, clientAvailable: true };

export function resolveNodeEffects(node: EffectNodeLike, registry: EffectRegistry, runtime: EffectRuntimeCapabilities = DEFAULT_RUNTIME): ResolvedEffectLayers {
  let all = (node.effects ?? []).map((attachment) => resolveOne(attachment, node.type, registry, runtime));
  all = enforceStacking(all);
  all = enforceConflicts(all);
  all = enforceRequirements(all);
  const layers: ResolvedEffectLayers = { background: [], content: [], overlay: [], interaction: [], all };
  all.forEach((effect) => {
    if (effect.attachment.enabled && (effect.status === "ready" || effect.useFallback) && effect.registration) layers[effect.registration.layer].push(effect);
  });
  return layers;
}

function resolveOne(attachment: EffectAttachment, nodeType: NodeType, registry: EffectRegistry, runtime: EffectRuntimeCapabilities): ResolvedEffect {
  const registration = registry.get(attachment.effectId);
  if (!registration) return failed(attachment, undefined, "unavailable", "effect.unavailable", "Effect is unavailable");
  if (attachment.version !== registration.schemaVersion) return failed(attachment, registration, "unsupported-version", "effect.version_unsupported", "Effect version is unsupported");
  const props = validateEffectProps(registration, attachment.props);
  if (!props.success) return failed(attachment, registration, "invalid-config", "effect.config_invalid", "Effect configuration is invalid");
  if (!registration.compatibleNodes.includes(nodeType)) return failed(attachment, registration, "incompatible", "effect.node_incompatible", "Effect is incompatible with this node");
  if (registration.runtime.usesWebGL && !runtime.allowWebGL) return failed(attachment, registration, "incompatible", "effect.webgl_unavailable", "WebGL effects are unavailable in this runtime");
  if (registration.runtime.clientRequired && runtime.clientAvailable === false) return failed(attachment, registration, "incompatible", "effect.client_required", "Effect requires a client runtime");
  if (registration.runtime.pointerInteraction === "required" && !runtime.allowPointerInteraction) return failed(attachment, registration, "incompatible", "effect.pointer_unavailable", "Pointer interaction is unavailable");
  if (runtime.reducedMotion && !registration.runtime.supportsReducedMotion) return failed(attachment, registration, "incompatible", "effect.reduced_motion_unsupported", "Effect does not support reduced motion");
  return { attachment, registration, status: "ready", diagnostics: [], validatedProps: props.value, useFallback: false };
}

function enforceStacking(all: ResolvedEffect[]): ResolvedEffect[] {
  const seen = new Set<string>();
  return all.map((effect) => {
    if (effect.status !== "ready" || !effect.attachment.enabled || effect.registration?.stacking !== "single") return effect;
    if (!seen.has(effect.attachment.effectId)) { seen.add(effect.attachment.effectId); return effect; }
    return replaceFailure(effect, "effect.stacking_single", "Only one attachment of this effect is allowed");
  });
}

function enforceConflicts(all: ResolvedEffect[]): ResolvedEffect[] {
  const conflicted = new Set<string>();
  const ready = all.filter((effect) => effect.status === "ready" && effect.attachment.enabled && effect.registration);
  for (let left = 0; left < ready.length; left += 1) {
    for (let right = left + 1; right < ready.length; right += 1) {
      const a = ready[left]!;
      const b = ready[right]!;
      if (a.registration!.conflictsWith?.includes(b.attachment.effectId) || b.registration!.conflictsWith?.includes(a.attachment.effectId)) {
        conflicted.add(a.attachment.attachmentId);
        conflicted.add(b.attachment.attachmentId);
      }
    }
  }
  return all.map((effect) => conflicted.has(effect.attachment.attachmentId) ? replaceFailure(effect, "effect.conflict", "Effect conflicts with another attachment") : effect);
}

function enforceRequirements(all: ResolvedEffect[]): ResolvedEffect[] {
  let result = all;
  let changed = true;
  while (changed) {
    changed = false;
    const readyIds = new Set(result.filter((effect) => effect.status === "ready" && effect.attachment.enabled).map((effect) => effect.attachment.effectId));
    result = result.map((effect) => {
      if (effect.status !== "ready" || !effect.attachment.enabled || !effect.registration?.requires?.some((id) => !readyIds.has(id))) return effect;
      changed = true;
      return replaceFailure(effect, "effect.requirement_missing", "A required effect is unavailable");
    });
  }
  return result;
}

function failed(attachment: EffectAttachment, registration: RegisteredEffect | undefined, status: Exclude<EffectRuntimeStatus, "ready">, code: string, message: string): ResolvedEffect {
  return { attachment, registration, status, diagnostics: [{ attachmentId: attachment.attachmentId, effectId: attachment.effectId, status, code, message }], validatedProps: registration ? defaultsForFallback(registration) : undefined, useFallback: registration?.fallback !== undefined };
}

function defaultsForFallback(registration: RegisteredEffect): JsonObject {
  return Object.fromEntries(registration.inputs.map((input) => [input.key, input.defaultValue]));
}

function replaceFailure(effect: ResolvedEffect, code: string, message: string): ResolvedEffect {
  return failed(effect.attachment, effect.registration, "incompatible", code, message);
}
