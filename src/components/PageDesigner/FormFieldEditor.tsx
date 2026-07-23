import type { ReactNode } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  FormAreaKey,
  FormFieldConfig,
  TableActionFormKeyType,
  TableActionInputType,
  TableActionOptionsSource,
} from "../../types/page";
import { ContainerModel, Field } from "../../utils/api/container";

type Props = {
  field: FormFieldConfig;
  index: number;
  containers: ContainerModel[];
  formFields: FormFieldConfig[];
  onChange: (updates: Partial<FormFieldConfig>) => void;
  onRemove: () => void;
};

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100 disabled:text-neutral-400";

const AREAS: { value: FormAreaKey; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "main", label: "Main" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
];

const INPUT_TYPES: { value: TableActionInputType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "color", label: "Color" },
  { value: "time", label: "Time" },
  { value: "image", label: "Image" },
  { value: "password", label: "Password" },
  { value: "hour", label: "Hour" },
  { value: "monthYear", label: "Month Year" },
];

const formKeyTypeForInput = (
  type: TableActionInputType,
  isMultiple?: boolean,
): TableActionFormKeyType => {
  if (isMultiple) return type === "number" ? "numberArray" : "stringArray";
  if (type === "number") return "number";
  if (["date", "time", "hour", "monthYear"].includes(type)) return "date";
  if (type === "checkbox") return "boolean";
  if (type === "color") return "color";
  return "string";
};

const flattenFields = (fields: Field[]): Field[] =>
  fields.flatMap((field) =>
    field.children?.length ? flattenFields(field.children) : [field],
  );

const formatRequestFilters = (filters?: Record<string, unknown>) =>
  filters && Object.keys(filters).length
    ? JSON.stringify(filters, null, 2)
    : "";

const parseRequestFilters = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      return undefined;
    }

    const entries = Object.entries(parsed as Record<string, unknown>).filter(
      ([key, entryValue]) =>
        key.trim() &&
        entryValue !== undefined &&
        entryValue !== null &&
        entryValue !== "",
    );

    return entries.length ? Object.fromEntries(entries) : undefined;
  } catch {
    return undefined;
  }
};

const Control = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="space-y-1.5">
    <span className="block text-xs font-medium text-neutral-600">{label}</span>
    {children}
  </label>
);

const Toggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <label className="flex items-center gap-2 text-xs font-medium text-neutral-700">
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="h-4 w-4 rounded border-neutral-300"
    />
    {label}
  </label>
);

const FormFieldEditor = ({
  field,
  index,
  containers,
  formFields,
  onChange,
  onRemove,
}: Props) => {
  const sourceContainer = containers.find(
    (container) => container.schemaName === field.sourceSchemaName,
  );
  const sourceFields = flattenFields(sourceContainer?.fields || []);
  const isNumber = field.type === "number";
  const isSelect = field.type === "select";
  const staticOptions = field.staticOptions || [];

  const updateDefaultValue = (rawValue: string) => {
    if (field.isMultiple) {
      const values = rawValue
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      onChange({
        defaultValue:
          field.formKeyType === "numberArray"
            ? values.map(Number).filter(Number.isFinite)
            : values,
      });
      return;
    }
    onChange({
      defaultValue:
        field.type === "number" && rawValue !== "" ? Number(rawValue) : rawValue,
    });
  };

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 bg-neutral-50/70 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-neutral-900 px-1.5 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <h6 className="truncate text-sm font-semibold text-neutral-900">
              {field.label || field.formKey || `Field ${index + 1}`}
            </h6>
          </div>
          <p className="mt-1 truncate text-xs text-neutral-500">
            {field.formKey || "Unconfigured field"} · {field.type}
          </p>
        </div>
        <button
          type="button"
          title="Remove field"
          aria-label="Remove field"
          onClick={onRemove}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50"
        >
          <FiTrash2 size={15} />
        </button>
      </header>

      <div className="space-y-5 p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Control label="Form key">
            <input value={field.formKey} onChange={(event) => onChange({ formKey: event.target.value })} className={inputClass} placeholder="field name" />
          </Control>
          <Control label="Input type">
            <select
              value={field.type}
              onChange={(event) => {
                const type = event.target.value as TableActionInputType;
                onChange({
                  type,
                  formKeyType: formKeyTypeForInput(type, field.isMultiple),
                  isNumberButtonsActive: type === "number" && field.isNumberButtonsActive,
                });
              }}
              className={inputClass}
            >
              {INPUT_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
            </select>
          </Control>
          <Control label="Label">
            <input value={field.label || ""} onChange={(event) => onChange({ label: event.target.value })} className={inputClass} placeholder="Field label" />
          </Control>
          <Control label="Placeholder">
            <input value={field.placeholder || ""} onChange={(event) => onChange({ placeholder: event.target.value })} className={inputClass} placeholder="Placeholder" />
          </Control>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Control label="Area">
            <select value={field.area || "main"} onChange={(event) => onChange({ area: event.target.value as FormAreaKey })} className={inputClass}>
              {AREAS.map((area) => <option key={area.value} value={area.value}>{area.label}</option>)}
            </select>
          </Control>
          <Control label="Width">
            <select value={field.width || "full"} onChange={(event) => onChange({ width: event.target.value as FormFieldConfig["width"] })} className={inputClass}>
              <option value="full">Full</option>
              <option value="half">Half</option>
              <option value="third">Third</option>
            </select>
          </Control>
          <Control label="Order">
            <input type="number" min={0} value={field.order ?? index + 1} onChange={(event) => onChange({ order: Number(event.target.value) })} className={inputClass} />
          </Control>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
          <Toggle label="Required" checked={!!field.required} onChange={(checked) => onChange({ required: checked })} />
          <Toggle label="Disabled" checked={!!field.isDisabled} onChange={(checked) => onChange({ isDisabled: checked })} />
          <Toggle label="Multiple" checked={!!field.isMultiple} onChange={(checked) => onChange({ isMultiple: checked, formKeyType: formKeyTypeForInput(field.type, checked) })} />
          {isNumber && <Toggle label="Number buttons" checked={!!field.isNumberButtonsActive} onChange={(checked) => onChange({ isNumberButtonsActive: checked })} />}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Control label={field.isMultiple ? "Default values (comma separated)" : "Default value"}>
            {field.type === "checkbox" ? (
              <select value={String(field.defaultValue ?? false)} onChange={(event) => onChange({ defaultValue: event.target.value === "true" })} className={inputClass}>
                <option value="false">False</option><option value="true">True</option>
              </select>
            ) : (
              <input type={isNumber && !field.isMultiple ? "number" : "text"} value={Array.isArray(field.defaultValue) ? field.defaultValue.join(", ") : String(field.defaultValue ?? "")} onChange={(event) => updateDefaultValue(event.target.value)} className={inputClass} />
            )}
          </Control>
          <Control label="Minimum"><input type="number" value={field.min ?? ""} onChange={(event) => onChange({ min: event.target.value === "" ? undefined : Number(event.target.value) })} disabled={!isNumber} className={inputClass} /></Control>
          <Control label="Maximum"><input type="number" value={field.max ?? ""} onChange={(event) => onChange({ max: event.target.value === "" ? undefined : Number(event.target.value) })} disabled={!isNumber} className={inputClass} /></Control>
          <Control label="Validation message"><input value={field.validationMessage || ""} onChange={(event) => onChange({ validationMessage: event.target.value })} className={inputClass} /></Control>
          <Control label="Minimum length"><input type="number" value={field.minLength ?? ""} onChange={(event) => onChange({ minLength: event.target.value === "" ? undefined : Number(event.target.value) })} className={inputClass} /></Control>
          <Control label="Maximum length"><input type="number" value={field.maxLength ?? ""} onChange={(event) => onChange({ maxLength: event.target.value === "" ? undefined : Number(event.target.value) })} className={inputClass} /></Control>
          <Control label="Pattern"><input value={field.pattern || ""} onChange={(event) => onChange({ pattern: event.target.value })} className={inputClass} placeholder="Regular expression" /></Control>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Control label="Required condition"><input value={field.requiredCondition || ""} onChange={(event) => onChange({ requiredCondition: event.target.value })} className={inputClass} placeholder={'status = "active"'} /></Control>
          <Control label="Disabled condition"><input value={field.disabledCondition || ""} onChange={(event) => onChange({ disabledCondition: event.target.value })} className={inputClass} placeholder={'status = "closed"'} /></Control>
        </div>

        {isSelect && (
          <div className="space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Control label="Options source">
                <select value={field.optionsSource || "static"} onChange={(event) => onChange({ optionsSource: event.target.value as TableActionOptionsSource })} className={inputClass}>
                  <option value="static">Static</option><option value="schema">Schema</option>
                </select>
              </Control>
              <Control label="Source schema">
                <select value={field.sourceSchemaName || ""} onChange={(event) => onChange({ sourceSchemaName: event.target.value, sourceValueField: "_id", sourceLabelField: "" })} disabled={field.optionsSource !== "schema"} className={inputClass}>
                  <option value="">Select schema</option>
                  {containers.map((container) => <option key={container.schemaName} value={container.schemaName}>{container.schemaName}</option>)}
                </select>
              </Control>
              <Control label="Value field">
                <select value={field.sourceValueField || "_id"} onChange={(event) => onChange({ sourceValueField: event.target.value })} disabled={field.optionsSource !== "schema" || !field.sourceSchemaName} className={inputClass}>
                  <option value="_id">_id</option>{sourceFields.map((sourceField) => <option key={sourceField.name} value={sourceField.name}>{sourceField.name}</option>)}
                </select>
              </Control>
              <Control label="Label field">
                <select value={field.sourceLabelField || ""} onChange={(event) => onChange({ sourceLabelField: event.target.value })} disabled={field.optionsSource !== "schema" || !field.sourceSchemaName} className={inputClass}>
                  <option value="">Select label field</option>{sourceFields.map((sourceField) => <option key={sourceField.name} value={sourceField.name}>{sourceField.name}</option>)}
                </select>
              </Control>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Control label="Source filter condition"><input value={field.sourceFilterCondition || ""} onChange={(event) => onChange({ sourceFilterCondition: event.target.value })} disabled={field.optionsSource !== "schema"} className={inputClass} placeholder={'tenantId = {{tenantId}}'} /></Control>
              <Control label="Request filters">
                <textarea
                  defaultValue={formatRequestFilters(field.sourceRequestFilters)}
                  onBlur={(event) =>
                    onChange({
                      sourceRequestFilters: parseRequestFilters(
                        event.target.value,
                      ),
                    })
                  }
                  disabled={field.optionsSource !== "schema"}
                  className={`${inputClass} min-h-[84px] font-mono`}
                  placeholder={'{"active": true}'}
                />
              </Control>
            </div>

            {(field.optionsSource || "static") === "static" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-600">Static options</span>
                  <button type="button" onClick={() => onChange({ staticOptions: [...staticOptions, { value: "", label: "" }] })} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100"><FiPlus size={13} /> Add option</button>
                </div>
                {staticOptions.map((option, optionIndex) => (
                  <div key={optionIndex} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <input value={option.value} onChange={(event) => onChange({ staticOptions: staticOptions.map((candidate, candidateIndex) => candidateIndex === optionIndex ? { ...candidate, value: event.target.value } : candidate) })} className={inputClass} placeholder="Value" />
                    <input value={option.label} onChange={(event) => onChange({ staticOptions: staticOptions.map((candidate, candidateIndex) => candidateIndex === optionIndex ? { ...candidate, label: event.target.value } : candidate) })} className={inputClass} placeholder="Label" />
                    <button type="button" title="Remove option" aria-label="Remove option" onClick={() => onChange({ staticOptions: staticOptions.filter((_candidate, candidateIndex) => candidateIndex !== optionIndex) })} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50"><FiTrash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <span className="mb-2 block text-xs font-medium text-neutral-600">Invalidate fields</span>
          <div className="grid max-h-36 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
            {formFields.filter((candidate) => candidate.formKey && candidate.formKey !== field.formKey).map((candidate) => (
              <label key={candidate.formKey} className="flex items-center gap-2 text-xs text-neutral-700">
                <input type="checkbox" checked={(field.invalidateKeys || []).includes(candidate.formKey)} onChange={(event) => onChange({ invalidateKeys: event.target.checked ? [...(field.invalidateKeys || []), candidate.formKey] : (field.invalidateKeys || []).filter((key) => key !== candidate.formKey) })} className="h-4 w-4 rounded border-neutral-300" />
                <span className="truncate">{candidate.label || candidate.formKey}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormFieldEditor;
