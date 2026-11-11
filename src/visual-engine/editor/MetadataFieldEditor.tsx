"use client";

import { componentEditorRegistry, type EditorFieldDefinition } from "../components/editor";
import type { PropertyGroup } from "../model/capabilities";
import { isOzmishowIconId } from "../model/icons";
import type { ComponentNode, NodeType } from "../model/nodes";
import type { NodePatch } from "../operations";
import { IconPicker } from "./IconPicker";
import { InspectorCheckbox, InspectorInput, InspectorNumber, InspectorSection, InspectorSelect, InspectorTextarea } from "./InspectorSection";

export interface MetadataFieldEditorProps {
  node: ComponentNode;
  group: Extract<PropertyGroup, "content" | "media" | "behavior">;
  fields?: readonly EditorFieldDefinition[];
  onUpdate(patch: NodePatch): void;
}

const groupLabels = { content: "Content", media: "Media", behavior: "Behavior" } as const;

export function MetadataFieldEditor({ node, group, fields, onUpdate }: MetadataFieldEditorProps) {
  const definitions = (fields ?? componentEditorRegistry.get(node.type).fields ?? []).filter((field) => field.group === group);
  if (definitions.length === 0) return null;

  return (
    <InspectorSection title={groupLabels[group]}>
      {definitions.map((field) => (
        <MetadataControl key={String(field.key)} node={node} field={field} onUpdate={onUpdate} />
      ))}
    </InspectorSection>
  );
}

function MetadataControl({ node, field, onUpdate }: { node: ComponentNode; field: EditorFieldDefinition; onUpdate(patch: NodePatch): void }) {
  const key = field.key as string;
  const value = (node as unknown as Record<string, unknown>)[key];
  const patch = (next: unknown) => onUpdate({ [key]: next } as NodePatch);
  const stringValue = typeof value === "string" || typeof value === "number" ? String(value) : "";
  const commitString = (next: string) => patch(next === "" && !field.required ? undefined : next);

  switch (field.control) {
    case "text":
    case "url":
      return <InspectorInput label={field.label} ariaLabel={field.ariaLabel} value={stringValue} onChange={commitString} />;
    case "textarea":
      return <InspectorTextarea label={field.label} ariaLabel={field.ariaLabel} value={stringValue} onChange={commitString} />;
    case "boolean":
      return <InspectorCheckbox label={field.label} ariaLabel={field.ariaLabel} checked={value === true} onChange={patch} />;
    case "select":
    case "enum":
      return <InspectorSelect label={field.label} ariaLabel={field.ariaLabel} value={stringValue} options={field.options ?? []} onChange={(next) => patch(next === "" && !field.required ? undefined : typeof value === "number" ? Number(next) : next)} />;
    case "number":
      return <InspectorNumber label={field.label} ariaLabel={field.ariaLabel} value={typeof value === "number" ? value : field.min ?? 0} min={field.min ?? Number.MIN_SAFE_INTEGER} max={field.max ?? Number.MAX_SAFE_INTEGER} step={field.step} onChange={patch} />;
    case "icon":
      return <IconPicker label={field.label} value={isOzmishowIconId(value) ? value : undefined} onChange={patch} onClear={field.required ? undefined : () => patch(undefined)} />;
  }
}

export function editorFieldsFor<TType extends NodeType>(type: TType): readonly EditorFieldDefinition<TType>[] {
  return componentEditorRegistry.get(type).fields ?? [];
}
