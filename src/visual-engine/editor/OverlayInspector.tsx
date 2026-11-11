"use client";

import { COLOR_TOKENS, type OverlayNode } from "../model";
import type { NodePatch } from "../operations";
import { InspectorCheckbox, InspectorInput, InspectorNumber, InspectorSection, InspectorSelect } from "./InspectorSection";

export function OverlayInspector({ node, onUpdate }: { node: OverlayNode; onUpdate(patch: NodePatch): void }) {
  const tint = node.tint ?? { color: { kind: "token" as const, value: "text" as const }, opacity: 0.35 };
  const colorMode = tint.color.kind === "custom" ? "custom" : tint.color.value;
  return <InspectorSection title="Overlay treatment">
    <InspectorCheckbox label="Enable tint" checked={node.tint !== undefined} onChange={(enabled) => onUpdate({ tint: enabled ? tint : undefined })} />
    {node.tint ? <>
      <InspectorSelect label="Tint color" value={colorMode} options={[...COLOR_TOKENS.map((value) => ({ value, label: value })), { value: "custom", label: "Custom" }]} onChange={(value) => onUpdate({ tint: { ...tint, color: value === "custom" ? { kind: "custom", value: tint.color.kind === "custom" ? tint.color.value : "#000000" } : { kind: "token", value: value as typeof COLOR_TOKENS[number] } } })} />
      {tint.color.kind === "custom" ? <InspectorInput label="Custom tint" value={tint.color.value} onChange={(value) => onUpdate({ tint: { ...tint, color: { kind: "custom", value } } })} /> : null}
      <InspectorNumber label="Tint opacity" value={tint.opacity} min={0} max={1} step={0.05} onChange={(opacity) => onUpdate({ tint: { ...tint, opacity } })} />
    </> : null}
    <p>Mobile Stack mode places Content below Background. Background and Content slots remain protected.</p>
  </InspectorSection>;
}
