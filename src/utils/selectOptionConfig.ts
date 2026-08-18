import { FormFieldConfig, FormFieldMappingConfig } from "../types/page";

const tokenPattern = /{{\s*([A-Za-z_][A-Za-z0-9_.]*)\s*}}/g;

export const extractTemplateFields = (template = "") =>
  Array.from(template.matchAll(tokenPattern), (match) => match[1])
    .filter((field, index, fields) => fields.indexOf(field) === index);

const readPath = (record: Record<string, unknown>, path: string): unknown =>
  path.split(".").reduce<unknown>((value, key) =>
    value && typeof value === "object"
      ? (value as Record<string, unknown>)[key]
      : undefined, record);

export const renderOptionTemplate = (
  template: string,
  record: Record<string, unknown>,
) => template.replace(tokenPattern, (_token, path: string) => {
  const value = readPath(record, path);
  return value === undefined || value === null || typeof value === "object"
    ? ""
    : String(value);
}).trim();

export const getEffectiveSelectDataFields = (
  field: FormFieldConfig,
  mappings: FormFieldMappingConfig[] = [],
) => Array.from(new Set([
  field.sourceValueField || "_id",
  field.sourceLabelField || field.sourceValueField || "_id",
  ...(field.sourceDataFields || []),
  ...extractTemplateFields(field.optionDisplay?.leftTemplate),
  ...extractTemplateFields(field.optionDisplay?.rightTemplate),
  ...mappings
    .filter((mapping) => mapping.sourceFormKey === field.formKey)
    .map((mapping) => mapping.sourceField),
].map((value) => value.trim()).filter(Boolean))).sort();
