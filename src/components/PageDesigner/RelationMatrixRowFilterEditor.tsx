import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type {
  RelationMatrixConfig,
  TableActionInputType,
  TableFilterPanelInputConfig,
} from "../../types/page";
import type { Field } from "../../utils/api/container";
import {
  addRelationMatrixFilterInput,
  buildRelationMatrixFilterInputs,
  removeRelationMatrixFilterInput,
  updateRelationMatrixFilterInput,
} from "./relationMatrixFilterEditor";
import { Checkbox, Input, Select, type SelectOption } from "../ui";

interface RelationMatrixFilterEditorProps {
  value: RelationMatrixConfig;
  rowFields: Field[];
  onChange: (value: RelationMatrixConfig) => void;
}

type StringOption = SelectOption<string>;
const ScalarSelect = ({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: readonly StringOption[];
  onChange: (value: string) => void;
}) => (
  <Select<StringOption>
    value={options.find((option) => option.value === value) || null}
    options={options}
    onChange={(selected) => {
      const option = selected as StringOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
  />
);

const inputTypes: Array<{ value: TableActionInputType; label: string }> = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "date", label: "Date" },
  { value: "checkbox", label: "Checkbox" },
];

const parseRequestFilters = (
  text: string,
): Record<string, unknown> | undefined => {
  if (!text.trim()) return undefined;
  try {
    const value = JSON.parse(text) as unknown;
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
};

const FilterRow = ({
  input,
  index,
  rowFields,
  onUpdate,
  onRemove,
}: {
  input: TableFilterPanelInputConfig;
  index: number;
  rowFields: Field[];
  onUpdate: (updates: Partial<TableFilterPanelInputConfig>) => void;
  onRemove: () => void;
}) => {
  const selectField = (fieldName: string) => {
    const field = rowFields.find((item) => item.name === fieldName);
    const generated = field
      ? buildRelationMatrixFilterInputs([field])[0]
      : undefined;
    onUpdate(generated || { formKey: fieldName });
  };

  return (
    <div className="rounded-xl border border-ui-border bg-ui-surface-subtle/70 p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_0.75fr_1fr_1fr_auto]">
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">Row field</span>
          <ScalarSelect
            label={`Filter ${index + 1} row field`}
            value={input.formKey}
            onChange={selectField}
            options={[
              { value: "", label: "Select field" },
              ...rowFields
              .filter((field) => field.name && !["_id", "id"].includes(field.name))
              .map((field) => ({ value: field.name, label: field.frontend?.displayName || field.name })),
            ]}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">Type</span>
          <ScalarSelect
            label={`Filter ${index + 1} type`}
            value={input.type}
            onChange={(type) => onUpdate({ type: type as TableActionInputType })}
            options={inputTypes}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">Label</span>
          <Input value={input.label || ""} onChange={(event) => onUpdate({ label: event.target.value })} />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">Placeholder</span>
          <Input value={input.placeholder || ""} onChange={(event) => onUpdate({ placeholder: event.target.value })} />
        </label>
        <button type="button" onClick={onRemove} className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ui-danger/30 bg-white text-ui-danger transition hover:bg-ui-danger-subtle" aria-label={`Remove filter ${index + 1}`}>
          <FiTrash2 />
        </button>
      </div>

      <details className="mt-3 border-t border-ui-border pt-3">
        <summary className="cursor-pointer text-xs font-semibold text-ui-foreground">Advanced options</summary>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {input.type === "select" && (
            <>
              <label className="space-y-1">
                <span className="text-xs font-medium text-ui-muted">Options source</span>
                <ScalarSelect label="Options source" value={input.optionsSource || "static"} onChange={(optionsSource) => onUpdate({ optionsSource: optionsSource as "static" | "schema" })} options={[{ value: "static", label: "Static" }, { value: "schema", label: "Schema" }]} />
              </label>
              {input.optionsSource === "schema" ? (
                <>
                  <label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Source schema</span><Input value={input.sourceSchemaName || ""} onChange={(event) => onUpdate({ sourceSchemaName: event.target.value })} /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Value field</span><Input value={input.sourceValueField || ""} onChange={(event) => onUpdate({ sourceValueField: event.target.value })} /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Label field</span><Input value={input.sourceLabelField || ""} onChange={(event) => onUpdate({ sourceLabelField: event.target.value })} /></label>
                  <label className="space-y-1 md:col-span-2"><span className="text-xs font-medium text-ui-muted">Request filters (JSON)</span><Input defaultValue={input.sourceRequestFilters ? JSON.stringify(input.sourceRequestFilters) : ""} onBlur={(event) => onUpdate({ sourceRequestFilters: parseRequestFilters(event.target.value) })} placeholder='{"active":true}' /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Source condition</span><Input value={input.sourceFilterCondition || ""} onChange={(event) => onUpdate({ sourceFilterCondition: event.target.value })} /></label>
                </>
              ) : (
                <label className="space-y-1 md:col-span-2"><span className="text-xs font-medium text-ui-muted">Static options (JSON)</span><Input value={input.staticOptionsJson || "[]"} onChange={(event) => onUpdate({ staticOptionsJson: event.target.value })} /></label>
              )}
            </>
          )}
          <label className="flex items-center gap-2 pt-5 text-sm text-ui-foreground"><Checkbox checked={Boolean(input.isMultiple)} onChange={(event) => onUpdate({ isMultiple: event.target.checked, formKeyType: event.target.checked ? "stringArray" : input.type === "number" ? "number" : "string" })} /> Multiple values</label>
          <label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Default value</span><Input value={typeof input.defaultValue === "string" || typeof input.defaultValue === "number" ? input.defaultValue : ""} onChange={(event) => onUpdate({ defaultValue: event.target.value })} /></label>
          {input.type === "number" && <><label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Minimum</span><Input type="number" value={input.min ?? ""} onChange={(event) => onUpdate({ min: event.target.value === "" ? undefined : Number(event.target.value) })} /></label><label className="space-y-1"><span className="text-xs font-medium text-ui-muted">Maximum</span><Input type="number" value={input.max ?? ""} onChange={(event) => onUpdate({ max: event.target.value === "" ? undefined : Number(event.target.value) })} /></label></>}
        </div>
      </details>
    </div>
  );
};

const RelationMatrixFilterEditor = ({ value, rowFields, onChange }: RelationMatrixFilterEditorProps) => {
  const inputs = value.filterPanel?.inputs || [];
  const defaults = buildRelationMatrixFilterInputs(rowFields);
  const defaultsEnabled = defaults.length > 0 && inputs.length === defaults.length && defaults.every((item) => inputs.some((input) => input.formKey === item.formKey));

  return (
    <div className="rounded-xl border border-ui-border bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h5 className="text-sm font-semibold text-ui-foreground">Row filters</h5>
          <p className="mt-1 text-xs text-ui-muted">These filters change matrix rows only. Relation columns stay unchanged.</p>
        </div>
        <button type="button" onClick={() => onChange(addRelationMatrixFilterInput(value))} className="inline-flex items-center gap-2 rounded-lg bg-ui-ink px-3 py-2 text-sm font-medium text-white transition hover:bg-ui-ink"><FiPlus /> Add filter</button>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-ui-foreground">
        <Checkbox checked={defaultsEnabled} disabled={!defaults.length} onChange={(event) => onChange({ ...value, filterPanel: { inputs: event.target.checked ? defaults : [] } })} />
        Enable default filters from row fields
      </label>
      <div className="mt-4 space-y-3">
        {inputs.length ? inputs.map((input, index) => (
          <FilterRow key={`${input.formKey}-${index}`} input={input} index={index} rowFields={rowFields} onUpdate={(updates) => onChange(updateRelationMatrixFilterInput(value, index, updates))} onRemove={() => onChange(removeRelationMatrixFilterInput(value, index))} />
        )) : <div className="rounded-lg border border-dashed border-ui-border px-4 py-5 text-center text-sm text-ui-muted">No row filters configured.</div>}
      </div>
    </div>
  );
};

export default RelationMatrixFilterEditor;
