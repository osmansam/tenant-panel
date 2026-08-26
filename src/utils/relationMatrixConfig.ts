import type {
  RelationMatrixConfig,
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
