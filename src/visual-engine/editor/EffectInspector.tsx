"use client";

import { useState } from "react";
import type { ComponentNode, EffectAttachment, JsonObject, JsonValue } from "../model";
import {
  defaultsForEffect,
  resolveNodeEffects,
  type EffectInput,
  type EffectRegistry,
  type EffectRuntimeStatus,
} from "../effects/core";
import type { NodePatch } from "../operations";
import { InspectorCheckbox, InspectorInput, InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";
import { ColorPaintControl } from "./ColorPaintControl";
import type { ColorValue } from "../model/paint";

export interface EffectInspectorProps {
  node: ComponentNode;
  registry: EffectRegistry;
  onUpdate(patch: NodePatch): void;
}

export function EffectInspector({ node, registry, onUpdate }: EffectInspectorProps) {
  const compatible = registry.list().filter((effect) => effect.compatibleNodes.includes(node.type));
  const [search, setSearch] = useState("");
  const [runtimeFilter, setRuntimeFilter] = useState("all");
  const filtered = compatible.filter((effect) => {
    const kind = effect.runtime.kind ?? (effect.runtime.usesWebGL ? "webgl" : "dom");
    return (runtimeFilter === "all" || runtimeFilter === kind) && `${effect.name} ${effect.description ?? ""}`.toLowerCase().includes(search.trim().toLowerCase());
  }).sort((left, right) => left.name.localeCompare(right.name));
  const [selectedEffectId, setSelectedEffectId] = useState(compatible[0]?.id ?? "");
  const effectiveEffectId = filtered.some((effect) => effect.id === selectedEffectId) ? selectedEffectId : filtered[0]?.id ?? "";
  const selectedRegistration = filtered.find(effect => effect.id === effectiveEffectId);
  const current = node.effects ?? [];
  const resolved = resolveNodeEffects(node, registry);

  const add = () => {
    const registration = filtered.find((effect) => effect.id === effectiveEffectId);
    if (!registration) return;
    const attachment: EffectAttachment = {
      attachmentId: createAttachmentId(),
      effectId: registration.id,
      version: registration.schemaVersion,
      enabled: true,
      props: defaultsForEffect(registration),
    };
    commitTarget(node, registry, [...current, attachment], attachment.attachmentId, onUpdate);
  };

  return (
    <InspectorSection title="Effects" defaultOpen>
      {compatible.length > 0 ? (
        <div className="vb-effect-add">
          <label className="vb-field">
            <span className="vb-field__label">Search effects</span>
            <input className="vb-field__control" type="search" aria-label="Search effects" value={search} onChange={event => setSearch(event.target.value)} />
          </label>
          <InspectorSelect
            label="Effect runtime"
            value={runtimeFilter}
            options={[
              { value: "all", label: "All runtimes" }, { value: "css", label: "CSS" }, { value: "dom", label: "DOM" },
              { value: "canvas2d", label: "Canvas" }, { value: "webgl", label: "WebGL" }, { value: "three", label: "Three.js" }, { value: "ogl", label: "OGL" },
            ]}
            onChange={setRuntimeFilter}
          />
          <InspectorSelect
            label="Effect to add"
            value={effectiveEffectId}
            options={filtered.map((effect) => ({ value: effect.id, label: effect.name }))}
            onChange={setSelectedEffectId}
          />
          {selectedRegistration ? <small className="vb-effect-add__meta">{costLabel(selectedRegistration.runtime.performanceCost)} · {runtimeLabel(selectedRegistration.runtime.kind ?? (selectedRegistration.runtime.usesWebGL ? "webgl" : "dom"))}</small> : <small>No compatible effects match these filters.</small>}
          <button type="button" className="vb-button" disabled={!selectedRegistration} onClick={add}>Add effect</button>
        </div>
      ) : null}
      {current.map((attachment, index) => {
        const registration = registry.get(attachment.effectId);
        const resolution = resolved.all.find((entry) => entry.attachment.attachmentId === attachment.attachmentId);
        return (
          <article className="vb-effect-card" key={attachment.attachmentId}>
            <header className="vb-effect-card__header">
              <div>
                <strong>{registration?.name ?? "Unknown effect"}</strong>
                {registration ? <small>{registration.provider} · {registration.layer}</small> : null}
              </div>
              <InspectorCheckbox
                label="Enabled"
                ariaLabel={`Enable effect ${attachment.attachmentId}`}
                checked={attachment.enabled}
                onChange={(enabled) => commitTarget(node, registry, replaceValue(current, index, { ...attachment, enabled }), attachment.attachmentId, onUpdate)}
              />
            </header>
            {resolution && resolution.status !== "ready" ? <EffectWarning status={resolution.status} effectId={attachment.effectId} /> : null}
            {registration?.inputs.map((input) => (
              <EffectControl
                key={input.key}
                input={input}
                value={attachment.props[input.key] ?? input.defaultValue}
                onChange={(value) => commitTarget(node, registry, replaceValue(current, index, { ...attachment, props: { ...attachment.props, [input.key]: value } }), attachment.attachmentId, onUpdate)}
              />
            ))}
            <div className="vb-effect-card__actions">
              <button type="button" aria-label={`Move effect ${attachment.attachmentId} up`} disabled={index === 0} onClick={() => move(onUpdate, current, index, index - 1)}>↑</button>
              <button type="button" aria-label={`Move effect ${attachment.attachmentId} down`} disabled={index === current.length - 1} onClick={() => move(onUpdate, current, index, index + 1)}>↓</button>
              {registration?.stacking === "multiple" ? <button type="button" aria-label={`Duplicate effect ${attachment.attachmentId}`} onClick={() => duplicate(node, registry, onUpdate, current, index, attachment)}>Duplicate</button> : null}
              <button type="button" aria-label={`Remove effect ${attachment.attachmentId}`} onClick={() => onUpdate({ effects: current.filter((_, candidate) => candidate !== index) })}>Remove</button>
            </div>
          </article>
        );
      })}
    </InspectorSection>
  );
}

function costLabel(cost: "low" | "medium" | "high"): string { return `${cost.charAt(0).toUpperCase()}${cost.slice(1)} cost`; }
function runtimeLabel(kind: string): string { return ({ canvas2d: "Canvas", webgl: "WebGL", three: "Three.js", ogl: "OGL", css: "CSS", dom: "DOM" } as Record<string, string>)[kind] ?? kind; }

function EffectControl({ input, value, onChange }: { input: EffectInput; value: JsonValue; onChange(value: JsonValue): void }) {
  if (input.kind === "boolean") return <InspectorCheckbox label={input.label} checked={value === true} onChange={onChange} />;
  if (input.kind === "number") return <InspectorNumber label={input.label} value={typeof value === "number" ? value : input.defaultValue} min={input.min} max={input.max} step={input.step} onChange={onChange} />;
  if (input.kind === "select") return <InspectorSelect label={input.label} value={typeof value === "string" ? value : input.defaultValue} options={input.options} onChange={onChange} />;
  if (input.kind === "color") {
    const fallback = typeof input.defaultValue === "string" ? input.defaultValue : "#000000";
    const color: ColorValue = typeof value === "string"
      ? { kind: "custom", value }
      : isColorValue(value) ? value : { kind: "custom", value: fallback };
    return <ColorPaintControl label={input.label} value={color} allowTokens={input.acceptsSemantic === true} onChange={(next) => onChange(input.acceptsSemantic === true ? next : next.value)} />;
  }
  return <InspectorInput label={input.label} value={typeof value === "string" ? value : input.defaultValue} onChange={onChange} />;
}

function isColorValue(value: JsonValue): value is ColorValue {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    && (value.kind === "token" || value.kind === "custom")
    && typeof value.value === "string";
}

const warningLabels: Record<Exclude<EffectRuntimeStatus, "ready">, string> = {
  unavailable: "Effect unavailable",
  incompatible: "Effect incompatible",
  "invalid-config": "Invalid effect configuration",
  "unsupported-version": "Unsupported effect version",
};

function EffectWarning({ status, effectId }: { status: Exclude<EffectRuntimeStatus, "ready">; effectId: string }) {
  return <p className="vb-effect-card__warning" role="status">{warningLabels[status]}: {effectId}</p>;
}

function replaceValue(effects: EffectAttachment[], index: number, attachment: EffectAttachment): EffectAttachment[] { return effects.map((current, candidate) => candidate === index ? attachment : current); }

function move(onUpdate: EffectInspectorProps["onUpdate"], effects: EffectAttachment[], from: number, to: number) {
  if (to < 0 || to >= effects.length) return;
  const reordered = [...effects];
  const [attachment] = reordered.splice(from, 1);
  reordered.splice(to, 0, attachment!);
  onUpdate({ effects: reordered });
}

function duplicate(node: ComponentNode, registry: EffectRegistry, onUpdate: EffectInspectorProps["onUpdate"], effects: EffectAttachment[], index: number, attachment: EffectAttachment) {
  const copy: EffectAttachment = {
    ...attachment,
    attachmentId: createAttachmentId(),
    props: structuredClone(attachment.props) as JsonObject,
    ...(attachment.metadata ? { metadata: structuredClone(attachment.metadata) as JsonObject } : {}),
  };
  commitTarget(node, registry, [...effects.slice(0, index + 1), copy, ...effects.slice(index + 1)], copy.attachmentId, onUpdate);
}

function commitTarget(node: ComponentNode, registry: EffectRegistry, effects: EffectAttachment[], attachmentId: string, onUpdate: EffectInspectorProps["onUpdate"]): void {
  const target = resolveNodeEffects({ id: node.id, type: node.type, effects }, registry).all.find((effect) => effect.attachment.attachmentId === attachmentId);
  if (target?.attachment.enabled && target.status !== "ready") return;
  onUpdate({ effects });
}

let attachmentSequence = 0;
function createAttachmentId(): string {
  attachmentSequence += 1;
  return `effect-${Date.now().toString(36)}-${attachmentSequence.toString(36)}`;
}
