import type {
  RelationMatrixConfig,
  TableFilterPanelConfig,
  TableFilterPanelInputConfig,
  ToggleBinding,
} from "../types/page";

const COMPONENTS_WITHOUT_LEGACY_SCHEMA = [
  "tabPanel",
  "infoBlocks",
  "distributionBlocks",
  "relationMatrix",
];

export const requiresComponentSchemaName = (
  componentType: string,
): boolean => !COMPONENTS_WITHOUT_LEGACY_SCHEMA.includes(componentType);

type RelationMatrixDraft = Partial<RelationMatrixConfig> | undefined;

const cleanToggleBinding = (
  binding: ToggleBinding | undefined,
): ToggleBinding | undefined => {
  const toggleId = binding?.toggleId?.trim();
  return toggleId ? { toggleId, when: binding?.when ?? true } : undefined;
};

const trimmed = (value: string | undefined): string | undefined =>
  value?.trim() || undefined;

const cleanRequestFilters = (
  value: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined => {
  if (!value) return undefined;
  const entries = Object.entries(value).filter(([key]) => key.trim());
  return entries.length ? Object.fromEntries(entries) : undefined;
};

const cleanFilterInput = (
  input: TableFilterPanelInputConfig,
): TableFilterPanelInputConfig | undefined => {
  const formKey = input.formKey.trim();
  if (!formKey) return undefined;

  return {
    ...(trimmed(input.id) ? { id: trimmed(input.id) } : {}),
    formKey,
    type: input.type || "text",
    formKeyType: input.formKeyType || "string",
    ...(trimmed(input.label) ? { label: trimmed(input.label) } : {}),
    ...(trimmed(input.placeholder)
      ? { placeholder: trimmed(input.placeholder) }
      : {}),
    ...(input.required ? { required: true } : {}),
    ...(trimmed(input.requiredCondition)
      ? { requiredCondition: trimmed(input.requiredCondition) }
      : {}),
    ...(trimmed(input.disabledCondition)
      ? { disabledCondition: trimmed(input.disabledCondition) }
      : {}),
    ...(input.isDisabled ? { isDisabled: true } : {}),
    ...(input.isMultiple ? { isMultiple: true } : {}),
    ...(input.isNumberButtonsActive ? { isNumberButtonsActive: true } : {}),
    ...(input.optionsSource ? { optionsSource: input.optionsSource } : {}),
    ...(input.staticOptions?.length
      ? { staticOptions: input.staticOptions.map((option) => ({ ...option })) }
      : {}),
    ...(trimmed(input.staticOptionsJson)
      ? { staticOptionsJson: trimmed(input.staticOptionsJson) }
      : {}),
    ...(trimmed(input.sourceSchemaName)
      ? { sourceSchemaName: trimmed(input.sourceSchemaName) }
      : {}),
    ...(trimmed(input.sourceValueField)
      ? { sourceValueField: trimmed(input.sourceValueField) }
      : {}),
    ...(trimmed(input.sourceLabelField)
      ? { sourceLabelField: trimmed(input.sourceLabelField) }
      : {}),
    ...(input.sourceDataFields?.length
      ? { sourceDataFields: input.sourceDataFields.map((field) => field.trim()).filter(Boolean) }
      : {}),
    ...(input.optionDisplay ? { optionDisplay: { ...input.optionDisplay } } : {}),
    ...(cleanRequestFilters(input.sourceRequestFilters)
      ? { sourceRequestFilters: cleanRequestFilters(input.sourceRequestFilters) }
      : {}),
    ...(trimmed(input.sourceFilterCondition)
      ? { sourceFilterCondition: trimmed(input.sourceFilterCondition) }
      : {}),
    ...(input.invalidateKeys?.length
      ? { invalidateKeys: input.invalidateKeys.map((key) => key.trim()).filter(Boolean) }
      : {}),
    ...(input.defaultValue !== undefined ? { defaultValue: input.defaultValue } : {}),
    ...(input.min !== undefined ? { min: input.min } : {}),
    ...(input.max !== undefined ? { max: input.max } : {}),
    ...(input.minLength !== undefined ? { minLength: input.minLength } : {}),
    ...(input.maxLength !== undefined ? { maxLength: input.maxLength } : {}),
    ...(trimmed(input.pattern) ? { pattern: trimmed(input.pattern) } : {}),
    ...(trimmed(input.validationMessage)
      ? { validationMessage: trimmed(input.validationMessage) }
      : {}),
  };
};

export const cleanRelationMatrixFilterPanel = (
  filterPanel: TableFilterPanelConfig | undefined,
): TableFilterPanelConfig | undefined => {
  const inputs = (filterPanel?.inputs || [])
    .map(cleanFilterInput)
    .filter((input): input is TableFilterPanelInputConfig => Boolean(input));
  return inputs.length ? { inputs } : undefined;
};

export const cleanRelationMatrixConfig = (
  config: RelationMatrixDraft,
): RelationMatrixConfig | undefined => {
  if (!config) return undefined;

  const cleaned: RelationMatrixConfig = {
    rowSchemaName: config.rowSchemaName?.trim() || "",
    rowIdField: config.rowIdField?.trim() || "_id",
    rowLabelField: config.rowLabelField?.trim() || "",
    columnSchemaName: config.columnSchemaName?.trim() || "",
    columnIdField: config.columnIdField?.trim() || "_id",
    columnLabelField: config.columnLabelField?.trim() || "",
    targetArrayField: config.targetArrayField?.trim() || "",
    targetItemMatchField: config.targetItemMatchField?.trim() || "",
    columnLimit: Math.min(100, Math.max(1, Number(config.columnLimit) || 100)),
    ...(cleanRelationMatrixFilterPanel(config.filterPanel)
      ? { filterPanel: cleanRelationMatrixFilterPanel(config.filterPanel) }
      : {}),
    ...(config.toggles?.length
      ? { toggles: config.toggles.filter((toggle) => toggle.id !== "show-relations") }
      : {}),
    ...(cleanToggleBinding(config.editToggle)
      ? { editToggle: cleanToggleBinding(config.editToggle) }
      : {}),
  };

  if (
    !cleaned.rowSchemaName ||
    !cleaned.rowLabelField ||
    !cleaned.columnSchemaName ||
    !cleaned.columnLabelField ||
    !cleaned.targetArrayField ||
    !cleaned.targetItemMatchField
  ) {
    return undefined;
  }

  return cleaned;
};

export const isRelationMatrixConfigComplete = (
  config: RelationMatrixDraft,
): boolean => Boolean(cleanRelationMatrixConfig(config));
