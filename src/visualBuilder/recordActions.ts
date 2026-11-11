import type { TableActionConfig } from "../types/page";
import type { HostActionSpec, JsonObject } from "../visual-engine/model";
import { isHostAction } from "../visual-engine/model/hostActions";
import { resolveFieldBinding } from "../visual-engine/renderer/bindings";
import { partitionActionConstantValues, buildActionInitialValues, applyHiddenActionValues } from "../utils/actionConstantValues";
import { validateSelectFilterBindings } from "../utils/selectFilters";

export interface RecordActionConfig {
  schemaName: string;
  action: TableActionConfig;
  valueBindings?: Record<string, string[]>;
}
export interface PreparedRecordAction {
  id?: string | number;
  item?: Record<string, unknown>;
  initialValues: Record<string, unknown>;
  hiddenValues: Record<string, unknown>;
}
const blocked = new Set(["__proto__", "prototype", "constructor"]);
const identifier = (value: unknown): value is string => typeof value === "string" && /^[A-Za-z_][A-Za-z0-9_-]{0,127}$/.test(value);
const safeField = (value: unknown): value is string => typeof value === "string" && value.length > 0 && value.length <= 128 && /^[A-Za-z0-9_$.-]+$/.test(value) && !value.split(".").some(part => !part || blocked.has(part));
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const formKeyTypes = new Set(["string", "number", "color", "date", "boolean", "checkbox", "stringArray", "numberArray", "intArray"]);
function validateFormField(field: Record<string, unknown>) {
  const invalid = () => { throw new Error(`Invalid form settings for ${String(field.formKey)}.`); };
  for (const key of ["id", "label", "placeholder", "requiredCondition", "disabledCondition", "staticOptionsJson", "sourceSchemaName", "sourceValueField", "sourceLabelField", "sourceFilterCondition", "pattern", "validationMessage"]) if (field[key] !== undefined && typeof field[key] !== "string") invalid();
  for (const key of ["required", "isDisabled", "isMultiple", "isNumberButtonsActive"]) if (field[key] !== undefined && typeof field[key] !== "boolean") invalid();
  for (const key of ["min", "max", "minLength", "maxLength", "order"]) if (field[key] !== undefined && (typeof field[key] !== "number" || !Number.isFinite(field[key]))) invalid();
  if (field.formKeyType !== undefined && !formKeyTypes.has(String(field.formKeyType))) invalid();
  if (field.optionsSource !== undefined && !["schema", "static"].includes(String(field.optionsSource))) invalid();
  if (field.sourceSchemaName && !identifier(field.sourceSchemaName)) invalid();
  for (const key of ["sourceDataFields", "invalidateKeys"]) if (field[key] !== undefined && (!Array.isArray(field[key]) || !(field[key] as unknown[]).every(safeField))) invalid();
  if (field.sourceRequestFilters !== undefined && !object(field.sourceRequestFilters)) invalid();
  if (field.optionDisplay !== undefined && (!object(field.optionDisplay) || ["leftTemplate", "rightTemplate"].some(key => field.optionDisplay && (field.optionDisplay as Record<string, unknown>)[key] !== undefined && typeof (field.optionDisplay as Record<string, unknown>)[key] !== "string"))) invalid();
  if (field.staticOptions !== undefined && (!Array.isArray(field.staticOptions) || !field.staticOptions.every(option => object(option) && ["string", "number"].includes(typeof option.value) && typeof option.label === "string"))) invalid();
  if (field.defaultValue !== undefined && !["string", "number", "boolean"].includes(typeof field.defaultValue) && !(Array.isArray(field.defaultValue) && field.defaultValue.every(value => ["string", "number"].includes(typeof value)))) invalid();
  if (typeof field.pattern === "string") { try { new RegExp(field.pattern); } catch { invalid(); } }
}
const inputTypes = new Set(["text", "date", "number", "select", "textarea", "image", "password", "time", "color", "checkbox", "hour", "monthYear"]);

export function readRecordAction(input: HostActionSpec): RecordActionConfig {
  if (!isHostAction(input) || input.name !== "record") throw new Error("This button action is not supported.");
  const config = input.config;
  if (!object(config.action)) throw new Error("Configure a button operation.");
  const action = config.action as unknown as TableActionConfig;
  if (!["create", "edit", "delete", "update", "link"].includes(action.kind)) throw new Error("Choose a supported record operation.");
  if (!(action.kind === "link" && config.schemaName === "") && !identifier(config.schemaName)) throw new Error("Choose a valid target schema.");
  const modalType = action.modalType ?? (action.kind === "delete" ? "confirm" : ["create", "edit"].includes(action.kind) ? "form" : "none");
  if (!["none", "confirm", "form"].includes(modalType)) throw new Error("Choose a valid modal type.");
  if (action.submit && (action.submit.functionName || !identifier(action.submit.workflowName) || !identifier(action.submit.workflowSchema))) throw new Error("Choose both a workflow schema and workflow name. Function-only actions are not supported.");
  if (action.submit && ["delete", "link"].includes(action.kind)) throw new Error("This operation cannot submit a workflow.");
  for (const key of ["hiddenCondition", "disabledCondition", "requiredCondition", "label", "buttonName", "path", "linkTemplate", "confirmTitle", "confirmText"] as const) if (action[key] !== undefined && typeof action[key] !== "string") throw new Error(`Invalid action ${key}.`);
  const formFields = action.formFields ?? [];
  if (!Array.isArray(formFields) || formFields.length > 50) throw new Error("Configure up to 50 form fields.");
  const seen = new Set<string>();
  for (const field of formFields) {
    if (!object(field) || !safeField(field.formKey) || blocked.has(field.formKey) || !inputTypes.has(field.type) || seen.has(field.formKey)) throw new Error("Form fields need unique valid keys and supported input types.");
    validateFormField(field);
    seen.add(field.formKey);
  }
  const filterErrors = validateSelectFilterBindings(formFields);
  if (filterErrors.length) throw new Error(filterErrors[0]);
  if (modalType === "form" && !formFields.length) throw new Error("Add form fields, or choose a confirmation/no-modal action.");
  if (action.enabled !== undefined && typeof action.enabled !== "boolean") throw new Error("Invalid action enabled setting.");
  if (action.formLayout !== undefined && (!object(action.formLayout) || ["topClassName", "generalClassName"].some(key => action.formLayout && (action.formLayout as Record<string, unknown>)[key] !== undefined && typeof (action.formLayout as Record<string, unknown>)[key] !== "string") || (action.formLayout.allowOverflow !== undefined && typeof action.formLayout.allowOverflow !== "boolean"))) throw new Error("Invalid form layout.");
  if (action.formLayout?.columns !== undefined && (typeof action.formLayout.columns !== "number" || ![1, 2, 3, 4].includes(action.formLayout.columns))) throw new Error("Form columns must be between 1 and 4.");
  if (config.valueBindings !== undefined && !object(config.valueBindings)) throw new Error("Passed values must be field mappings.");
  for (const [key, path] of Object.entries(config.valueBindings || {})) {
    if (!safeField(key) || !Array.isArray(path) || !path.length || path.length > 16 || path.some(part => typeof part !== "string" || !safeField(part) || part.includes("."))) throw new Error("Passed values need safe destination keys and item field paths.");
  }
  const constants = action.constantValues ?? (action.constantValuesJson?.trim() ? JSON.parse(action.constantValuesJson) : {});
  if (!object(constants) || Object.keys(constants).some(key => !safeField(key))) throw new Error("Constant values must be an object with valid field names.");
  return { schemaName: config.schemaName as string, action: { ...structuredClone(action), modalType, formFields: structuredClone(formFields), constantValues: structuredClone(constants) }, ...(config.valueBindings ? { valueBindings: structuredClone(config.valueBindings) as Record<string, string[]> } : {}) };
}

export function prepareRecordAction(config: RecordActionConfig, item?: Record<string, unknown>): PreparedRecordAction {
  const id = item?._id;
  const requiresId = ["edit", "update", "delete"].includes(config.action.kind);
  if (requiresId && !((typeof id === "string" && /^[A-Za-z0-9_-]+$/.test(id)) || (typeof id === "number" && Number.isFinite(id)))) throw new Error("This action requires a valid record _id.");
  const mapped: Record<string, unknown> = {};
  for (const [key, path] of Object.entries(config.valueBindings || {})) {
    const value = resolveFieldBinding(item, path);
    if (value === undefined) throw new Error(`The clicked record has no item.${path.join(".")} value for ${key}.`);
    mapped[key] = structuredClone(value);
  }
  const fields = config.action.formFields || [];
  const split = partitionActionConstantValues({ ...mapped, ...config.action.constantValues }, fields.map(field => field.formKey));
  const defaults = Object.fromEntries(fields.filter(field => field.defaultValue !== undefined).map(field => [field.formKey, field.defaultValue]));
  const editValues = ["edit", "update"].includes(config.action.kind) ? item || {} : {};
  const initialValues = buildActionInitialValues({ ...defaults, ...editValues }, split.visibleDefaults);
  return { ...(requiresId ? { id: id as string | number } : {}), ...(item ? { item: structuredClone(item) } : {}), initialValues: Object.fromEntries(fields.map(field => [field.formKey, initialValues[field.formKey]]).filter(([, value]) => value !== undefined)), hiddenValues: split.hiddenValues };
}

export function buildRecordActionPayload(config: RecordActionConfig, prepared: PreparedRecordAction, values: Record<string, unknown>): Record<string, unknown> {
  const allowed = new Set((config.action.formFields || []).map(field => field.formKey));
  const visible = Object.fromEntries(Object.entries(values).filter(([key]) => allowed.has(key) && key !== "_id"));
  const payload = applyHiddenActionValues(visible, prepared.hiddenValues);
  delete payload._id;
  return structuredClone(payload);
}

export function recordActionSpec(config: RecordActionConfig): HostActionSpec {
  const spec: HostActionSpec = { name: "record", config: JSON.parse(JSON.stringify(config)) as JsonObject };
  readRecordAction(spec); return spec;
}

export function itemPath(value: string): string[] {
  return value.trim().replace(/^\{\{\s*|\s*\}\}$/g, "").trim().replace(/^item\./, "").split(".");
}
