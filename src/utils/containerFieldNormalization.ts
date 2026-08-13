import type { Field, PopulationSettings } from "./api/container";

const normalizePopulationSettings = (
  settings: any,
): PopulationSettings | undefined => {
  if (!settings) return undefined;

  return {
    fieldName: settings.FieldName ?? settings.fieldName ?? "",
    populatedFields:
      settings.PopulatedFields ?? settings.populatedFields ?? [],
    displayFields: settings.DisplayFields ?? settings.displayFields ?? [],
    inputSelectionField:
      settings.InputSelectionField ?? settings.inputSelectionField ?? "",
    displayLabel: settings.DisplayLabel ?? settings.displayLabel ?? "",
  };
};

export const normalizeContainerField = (field: any): Field => {
  const children = field?.Children ?? field?.children;

  return {
    name: field?.Name ?? field?.name ?? "",
    type: field?.Type ?? field?.type ?? "",
    tag: field?.Tag ?? field?.tag,
    objectSchemaName: field?.ObjectSchemaName ?? field?.objectSchemaName,
    enumList: field?.EnumList ?? field?.enumList,
    isForceDelete: field?.IsForceDelete ?? field?.isForceDelete ?? false,
    unique: field?.Unique ?? field?.unique ?? false,
    isHashed: field?.IsHashed ?? field?.isHashed ?? false,
    isLoginCredential:
      field?.IsLoginCredential ?? field?.isLoginCredential ?? false,
    isAuditIdentity:
      field?.IsAuditIdentity ?? field?.isAuditIdentity ?? false,
    isSearchable: field?.IsSearchable ?? field?.isSearchable ?? false,
    children: Array.isArray(children)
      ? children.map(normalizeContainerField)
      : undefined,
    frontend: field?.Frontend ?? field?.frontend,
    populationSettings: normalizePopulationSettings(
      field?.PopulationSettings ?? field?.populationSettings,
    ),
    equation: field?.Equation ?? field?.equation,
    authorizeRole: field?.AuthorizeRole ?? field?.authorizeRole ?? [],
    isAuthorized: field?.IsAuthorized ?? field?.isAuthorized ?? false,
    order: field?.Order ?? field?.order,
  };
};
