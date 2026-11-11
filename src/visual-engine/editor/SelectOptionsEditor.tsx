"use client";

import type { SelectNode, SelectOption } from "../model";
import type { NodePatch } from "../operations";
import { InspectorInput, InspectorSection } from "./InspectorSection";

export function SelectOptionsEditor({ node, onUpdate }: { node: SelectNode; onUpdate(patch: NodePatch): void }) {
  const update = (index: number, patch: Partial<SelectOption>) => onUpdate({ options: node.options.map((option, optionIndex) => optionIndex === index ? { ...option, ...patch } : option) });
  const move = (index: number, offset: -1 | 1) => {
    const target = index + offset;
    if (target < 0 || target >= node.options.length) return;
    const options = node.options.map((option) => ({ ...option }));
    [options[index], options[target]] = [options[target], options[index]];
    onUpdate({ options });
  };
  return <InspectorSection title="Select options">
    {node.options.map((option, index) => <div key={index} className="vb-field vb-field--stacked">
      <InspectorInput label={`Option ${index + 1} value`} ariaLabel={`Option ${index + 1} value`} value={option.value} onChange={(value) => update(index, { value })} />
      <InspectorInput label={`Option ${index + 1} label`} ariaLabel={`Option ${index + 1} label`} value={option.label} onChange={(label) => update(index, { label })} />
      <div className="flex gap-1">
        <button type="button" className="vb-button" aria-label={`Move option ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}>Up</button>
        <button type="button" className="vb-button" aria-label={`Move option ${index + 1} down`} disabled={index === node.options.length - 1} onClick={() => move(index, 1)}>Down</button>
        <button type="button" className="vb-button" aria-label={`Remove option ${index + 1}`} disabled={node.options.length === 1} onClick={() => onUpdate({ options: node.options.filter((_, optionIndex) => optionIndex !== index) })}>Remove</button>
        <button type="button" className="vb-button" aria-label={`Add option after ${index + 1}`} disabled={node.options.length >= 50} onClick={() => onUpdate({ options: [...node.options.slice(0, index + 1), { value: nextOptionValue(node.options), label: "New option" }, ...node.options.slice(index + 1)] })}>Add after</button>
      </div>
    </div>)}
  </InspectorSection>;
}

function nextOptionValue(options: readonly SelectOption[]): string {
  const used = new Set(options.map((option) => option.value));
  for (let index = options.length + 1; ; index += 1) {
    const candidate = `option_${index}`;
    if (!used.has(candidate)) return candidate;
  }
}
