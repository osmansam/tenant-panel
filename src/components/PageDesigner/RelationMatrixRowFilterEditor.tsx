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

interface RelationMatrixFilterEditorProps {
  value: RelationMatrixConfig;
  rowFields: Field[];
  onChange: (value: RelationMatrixConfig) => void;
}

const inputClassName =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100";

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
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_0.75fr_1fr_1fr_auto]">
        <label className="space-y-1">
          <span className="text-xs font-medium text-neutral-600">Row field</span>
          <select
            value={input.formKey}
            onChange={(event) => selectField(event.target.value)}
            className={inputClassName}
          >
            <option value="">Select field</option>
            {rowFields
              .filter((field) => field.name && !["_id", "id"].includes(field.name))
              .map((field) => (
                <option key={field.name} value={field.name}>
                  {field.frontend?.displayName || field.name}
                </option>
              ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-neutral-600">Type</span>
          <select
            value={input.type}
            onChange={(event) => onUpdate({ type: event.target.value as TableActionInputType })}
            className={inputClassName}
          >
            {inputTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-neutral-600">Label</span>
          <input value={input.label || ""} onChange={(event) => onUpdate({ label: event.target.value })} className={inputClassName} />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-neutral-600">Placeholder</span>
          <input value={input.placeholder || ""} onChange={(event) => onUpdate({ placeholder: event.target.value })} className={inputClassName} />
        </label>
        <button type="button" onClick={onRemove} className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition hover:bg-red-50" aria-label={`Remove filter ${index + 1}`}>
          <FiTrash2 />
        </button>
      </div>

      <details className="mt-3 border-t border-neutral-200 pt-3">
        <summary className="cursor-pointer text-xs font-semibold text-violet-700">Advanced options</summary>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {input.type === "select" && (
            <>
              <label className="space-y-1">
                <span className="text-xs font-medium text-neutral-600">Options source</span>
                <select value={input.optionsSource || "static"} onChange={(event) => onUpdate({ optionsSource: event.target.value as "static" | "schema" })} className={inputClassName}>
                  <option value="static">Static</option>
                  <option value="schema">Schema</option>
                </select>
              </label>
              {input.optionsSource === "schema" ? (
                <>
                  <label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Source schema</span><input value={input.sourceSchemaName || ""} onChange={(event) => onUpdate({ sourceSchemaName: event.target.value })} className={inputClassName} /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Value field</span><input value={input.sourceValueField || ""} onChange={(event) => onUpdate({ sourceValueField: event.target.value })} className={inputClassName} /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Label field</span><input value={input.sourceLabelField || ""} onChange={(event) => onUpdate({ sourceLabelField: event.target.value })} className={inputClassName} /></label>
                  <label className="space-y-1 md:col-span-2"><span className="text-xs font-medium text-neutral-600">Request filters (JSON)</span><input defaultValue={input.sourceRequestFilters ? JSON.stringify(input.sourceRequestFilters) : ""} onBlur={(event) => onUpdate({ sourceRequestFilters: parseRequestFilters(event.target.value) })} className={inputClassName} placeholder='{"active":true}' /></label>
                  <label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Source condition</span><input value={input.sourceFilterCondition || ""} onChange={(event) => onUpdate({ sourceFilterCondition: event.target.value })} className={inputClassName} /></label>
                </>
              ) : (
                <label className="space-y-1 md:col-span-2"><span className="text-xs font-medium text-neutral-600">Static options (JSON)</span><input value={input.staticOptionsJson || "[]"} onChange={(event) => onUpdate({ staticOptionsJson: event.target.value })} className={inputClassName} /></label>
              )}
            </>
          )}
          <label className="flex items-center gap-2 pt-5 text-sm text-neutral-700"><input type="checkbox" checked={Boolean(input.isMultiple)} onChange={(event) => onUpdate({ isMultiple: event.target.checked, formKeyType: event.target.checked ? "stringArray" : input.type === "number" ? "number" : "string" })} /> Multiple values</label>
          <label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Default value</span><input value={typeof input.defaultValue === "string" || typeof input.defaultValue === "number" ? input.defaultValue : ""} onChange={(event) => onUpdate({ defaultValue: event.target.value })} className={inputClassName} /></label>
          {input.type === "number" && <><label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Minimum</span><input type="number" value={input.min ?? ""} onChange={(event) => onUpdate({ min: event.target.value === "" ? undefined : Number(event.target.value) })} className={inputClassName} /></label><label className="space-y-1"><span className="text-xs font-medium text-neutral-600">Maximum</span><input type="number" value={input.max ?? ""} onChange={(event) => onUpdate({ max: event.target.value === "" ? undefined : Number(event.target.value) })} className={inputClassName} /></label></>}
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
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h5 className="text-sm font-semibold text-neutral-900">Row filters</h5>
          <p className="mt-1 text-xs text-neutral-500">These filters change matrix rows only. Relation columns stay unchanged.</p>
        </div>
        <button type="button" onClick={() => onChange(addRelationMatrixFilterInput(value))} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"><FiPlus /> Add filter</button>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" checked={defaultsEnabled} disabled={!defaults.length} onChange={(event) => onChange({ ...value, filterPanel: { inputs: event.target.checked ? defaults : [] } })} />
        Enable default filters from row fields
      </label>
      <div className="mt-4 space-y-3">
        {inputs.length ? inputs.map((input, index) => (
          <FilterRow key={`${input.formKey}-${index}`} input={input} index={index} rowFields={rowFields} onUpdate={(updates) => onChange(updateRelationMatrixFilterInput(value, index, updates))} onRemove={() => onChange(removeRelationMatrixFilterInput(value, index))} />
        )) : <div className="rounded-lg border border-dashed border-neutral-300 px-4 py-5 text-center text-sm text-neutral-500">No row filters configured.</div>}
      </div>
    </div>
  );
};

export default RelationMatrixFilterEditor;
