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
import { Checkbox, Input, Select, Textarea, type SelectOption } from "../ui";

type Props = {
  field: FormFieldConfig;
  index: number;
  containers: ContainerModel[];
  formFields: FormFieldConfig[];
  onChange: (updates: Partial<FormFieldConfig>) => void;
  onRemove: () => void;
};

type StringOption = SelectOption<string>;
const ScalarSelect = ({ label, value, options, disabled, onChange }: {
  label: string;
  value: string;
  options: readonly StringOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) => (
  <Select<StringOption>
    value={options.find((option) => option.value === value) || null}
    options={options}
    disabled={disabled}
    onChange={(selected) => {
      const option = selected as StringOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
  />
);

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
    <span className="block text-xs font-medium text-ui-muted">{label}</span>
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
  <label className="flex items-center gap-2 text-xs font-medium text-ui-foreground">
    <Checkbox
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
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
    <section className="overflow-hidden rounded-lg border border-ui-border bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-ui-border bg-ui-surface-subtle/70 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-ui-ink-hover px-1.5 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <h6 className="truncate text-sm font-semibold text-ui-foreground">
              {field.label || field.formKey || `Field ${index + 1}`}
            </h6>
          </div>
          <p className="mt-1 truncate text-xs text-ui-muted">
            {field.formKey || "Unconfigured field"} · {field.type}
          </p>
        </div>
        <button
          type="button"
          title="Remove field"
          aria-label="Remove field"
          onClick={onRemove}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ui-danger transition hover:bg-ui-danger-subtle"
        >
          <FiTrash2 size={15} />
        </button>
      </header>

      <div className="space-y-5 p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Control label="Form key">
            <Input value={field.formKey} onChange={(event) => onChange({ formKey: event.target.value })} placeholder="field name" />
          </Control>
          <Control label="Input type">
            <ScalarSelect
              label="Input type"
              value={field.type}
              onChange={(nextType) => {
                const type = nextType as TableActionInputType;
                onChange({
                  type,
                  formKeyType: formKeyTypeForInput(type, field.isMultiple),
                  isNumberButtonsActive: type === "number" && field.isNumberButtonsActive,
                });
              }}
              options={INPUT_TYPES}
            />
          </Control>
          <Control label="Label">
            <Input value={field.label || ""} onChange={(event) => onChange({ label: event.target.value })} placeholder="Field label" />
          </Control>
          <Control label="Placeholder">
            <Input value={field.placeholder || ""} onChange={(event) => onChange({ placeholder: event.target.value })} placeholder="Placeholder" />
          </Control>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Control label="Area">
            <ScalarSelect label="Area" value={field.area || "main"} onChange={(area) => onChange({ area: area as FormAreaKey })} options={AREAS} />
          </Control>
          <Control label="Width">
            <ScalarSelect label="Width" value={field.width || "full"} onChange={(width) => onChange({ width: width as FormFieldConfig["width"] })} options={[{ value: "full", label: "Full" }, { value: "half", label: "Half" }, { value: "third", label: "Third" }]} />
          </Control>
          <Control label="Order">
            <Input type="number" min={0} value={field.order ?? index + 1} onChange={(event) => onChange({ order: Number(event.target.value) })} />
          </Control>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 rounded-lg border border-ui-border bg-ui-surface-subtle px-4 py-3">
          <Toggle label="Required" checked={!!field.required} onChange={(checked) => onChange({ required: checked })} />
          <Toggle label="Disabled" checked={!!field.isDisabled} onChange={(checked) => onChange({ isDisabled: checked })} />
          <Toggle label="Multiple" checked={!!field.isMultiple} onChange={(checked) => onChange({ isMultiple: checked, formKeyType: formKeyTypeForInput(field.type, checked) })} />
          {isNumber && <Toggle label="Number buttons" checked={!!field.isNumberButtonsActive} onChange={(checked) => onChange({ isNumberButtonsActive: checked })} />}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Control label={field.isMultiple ? "Default values (comma separated)" : "Default value"}>
            {field.type === "checkbox" ? (
              <ScalarSelect label="Default value" value={String(field.defaultValue ?? false)} onChange={(defaultValue) => onChange({ defaultValue: defaultValue === "true" })} options={[{ value: "false", label: "False" }, { value: "true", label: "True" }]} />
            ) : (
              <Input type={isNumber && !field.isMultiple ? "number" : "text"} value={Array.isArray(field.defaultValue) ? field.defaultValue.join(", ") : String(field.defaultValue ?? "")} onChange={(event) => updateDefaultValue(event.target.value)} />
            )}
          </Control>
          <Control label="Minimum"><Input type="number" value={field.min ?? ""} onChange={(event) => onChange({ min: event.target.value === "" ? undefined : Number(event.target.value) })} disabled={!isNumber} /></Control>
          <Control label="Maximum"><Input type="number" value={field.max ?? ""} onChange={(event) => onChange({ max: event.target.value === "" ? undefined : Number(event.target.value) })} disabled={!isNumber} /></Control>
          <Control label="Validation message"><Input value={field.validationMessage || ""} onChange={(event) => onChange({ validationMessage: event.target.value })} /></Control>
          <Control label="Minimum length"><Input type="number" value={field.minLength ?? ""} onChange={(event) => onChange({ minLength: event.target.value === "" ? undefined : Number(event.target.value) })} /></Control>
          <Control label="Maximum length"><Input type="number" value={field.maxLength ?? ""} onChange={(event) => onChange({ maxLength: event.target.value === "" ? undefined : Number(event.target.value) })} /></Control>
          <Control label="Pattern"><Input value={field.pattern || ""} onChange={(event) => onChange({ pattern: event.target.value })} placeholder="Regular expression" /></Control>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Control label="Required condition"><Input value={field.requiredCondition || ""} onChange={(event) => onChange({ requiredCondition: event.target.value })} placeholder={'status = "active"'} /></Control>
          <Control label="Disabled condition"><Input value={field.disabledCondition || ""} onChange={(event) => onChange({ disabledCondition: event.target.value })} placeholder={'status = "closed"'} /></Control>
        </div>

        {isSelect && (
          <div className="space-y-4 rounded-lg border border-ui-border bg-ui-surface-subtle p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Control label="Options source">
                <ScalarSelect label="Options source" value={field.optionsSource || "static"} onChange={(optionsSource) => onChange({ optionsSource: optionsSource as TableActionOptionsSource })} options={[{ value: "static", label: "Static" }, { value: "schema", label: "Schema" }]} />
              </Control>
              <Control label="Source schema">
                <ScalarSelect label="Source schema" value={field.sourceSchemaName || ""} onChange={(sourceSchemaName) => onChange({ sourceSchemaName, sourceValueField: "_id", sourceLabelField: "", sourceDataFields: [], optionDisplay: undefined })} disabled={field.optionsSource !== "schema"} options={[{ value: "", label: "Select schema" }, ...containers.map((container) => ({ value: container.schemaName, label: container.schemaName }))]} />
              </Control>
              <Control label="Value field">
                <ScalarSelect label="Value field" value={field.sourceValueField || "_id"} onChange={(sourceValueField) => onChange({ sourceValueField })} disabled={field.optionsSource !== "schema" || !field.sourceSchemaName} options={[{ value: "_id", label: "_id" }, ...sourceFields.map((sourceField) => ({ value: sourceField.name, label: sourceField.name }))]} />
              </Control>
              <Control label="Label field">
                <ScalarSelect label="Label field" value={field.sourceLabelField || ""} onChange={(sourceLabelField) => onChange({ sourceLabelField })} disabled={field.optionsSource !== "schema" || !field.sourceSchemaName} options={[{ value: "", label: "Select label field" }, ...sourceFields.map((sourceField) => ({ value: sourceField.name, label: sourceField.name }))]} />
              </Control>
            </div>
            {field.optionsSource === "schema" && field.sourceSchemaName && (
              <div className="space-y-3 rounded-lg border border-ui-border bg-white p-3">
                <div>
                  <div className="text-xs font-semibold text-ui-foreground">Additional option data</div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {sourceFields.map((sourceField) => {
                      const checked = (field.sourceDataFields || []).includes(sourceField.name);
                      return (
                        <label key={sourceField.name} className="flex items-center gap-2 text-xs text-ui-foreground">
                          <Checkbox
                            checked={checked}
                            onChange={(event) => onChange({
                              sourceDataFields: event.target.checked
                                ? [...(field.sourceDataFields || []), sourceField.name]
                                : (field.sourceDataFields || []).filter((name) => name !== sourceField.name),
                            })}
                          />
                          {sourceField.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <Control label="Left option template">
                    <Input
                      value={field.optionDisplay?.leftTemplate || ""}
                      onChange={(event) => onChange({ optionDisplay: { ...field.optionDisplay, leftTemplate: event.target.value } })}
                      placeholder="{{name}}"
                    />
                  </Control>
                  <Control label="Right option template">
                    <Input
                      value={field.optionDisplay?.rightTemplate || ""}
                      onChange={(event) => onChange({ optionDisplay: { ...field.optionDisplay, rightTemplate: event.target.value } })}
                      placeholder="{{price}} ₺"
                    />
                  </Control>
                </div>
                <div className="flex items-center justify-between rounded-md border border-dashed border-ui-border px-3 py-2 text-sm text-ui-muted">
                  <span>{field.optionDisplay?.leftTemplate || (field.sourceLabelField ? `{{${field.sourceLabelField}}}` : "Left label")}</span>
                  <span className="text-right font-medium">{field.optionDisplay?.rightTemplate || "Right label"}</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Control label="Source filter condition"><Input value={field.sourceFilterCondition || ""} onChange={(event) => onChange({ sourceFilterCondition: event.target.value })} disabled={field.optionsSource !== "schema"} placeholder={'tenantId = {{tenantId}}'} /></Control>
              <Control label="Request filters">
                <Textarea
                  defaultValue={formatRequestFilters(field.sourceRequestFilters)}
                  onBlur={(event) =>
                    onChange({
                      sourceRequestFilters: parseRequestFilters(
                        event.target.value,
                      ),
                    })
                  }
                  disabled={field.optionsSource !== "schema"}
                  className="min-h-[84px] font-mono"
                  placeholder={'{"active": true}'}
                />
              </Control>
            </div>

            {(field.optionsSource || "static") === "static" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ui-muted">Static options</span>
                  <button type="button" onClick={() => onChange({ staticOptions: [...staticOptions, { value: "", label: "" }] })} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-ui-border bg-white px-2.5 text-xs font-medium text-ui-foreground hover:bg-ui-surface-subtle"><FiPlus size={13} /> Add option</button>
                </div>
                {staticOptions.map((option, optionIndex) => (
                  <div key={optionIndex} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Input value={option.value} onChange={(event) => onChange({ staticOptions: staticOptions.map((candidate, candidateIndex) => candidateIndex === optionIndex ? { ...candidate, value: event.target.value } : candidate) })} placeholder="Value" />
                    <Input value={option.label} onChange={(event) => onChange({ staticOptions: staticOptions.map((candidate, candidateIndex) => candidateIndex === optionIndex ? { ...candidate, label: event.target.value } : candidate) })} placeholder="Label" />
                    <button type="button" title="Remove option" aria-label="Remove option" onClick={() => onChange({ staticOptions: staticOptions.filter((_candidate, candidateIndex) => candidateIndex !== optionIndex) })} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ui-danger hover:bg-ui-danger-subtle"><FiTrash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <span className="mb-2 block text-xs font-medium text-ui-muted">Invalidate fields</span>
          <div className="grid max-h-36 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-ui-border bg-ui-surface-subtle p-3 sm:grid-cols-2 lg:grid-cols-3">
            {formFields.filter((candidate) => candidate.formKey && candidate.formKey !== field.formKey).map((candidate) => (
              <label key={candidate.formKey} className="flex items-center gap-2 text-xs text-ui-foreground">
                <Checkbox checked={(field.invalidateKeys || []).includes(candidate.formKey)} onChange={(event) => onChange({ invalidateKeys: event.target.checked ? [...(field.invalidateKeys || []), candidate.formKey] : (field.invalidateKeys || []).filter((key) => key !== candidate.formKey) })} />
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
