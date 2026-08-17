import type { PopulationSettings } from "./api/container";

export const buildPopulationSettings = (
  settings: PopulationSettings,
): PopulationSettings | undefined => {
  const hasUserConfiguration =
    settings.populatedFields.length > 0 ||
    settings.displayFields.length > 0 ||
    Boolean(settings.inputSelectionField) ||
    Boolean(settings.displayLabel.trim());

  if (!hasUserConfiguration) return undefined;

  const isComplete =
    Boolean(settings.fieldName) &&
    settings.populatedFields.length > 0 &&
    settings.displayFields.length > 0 &&
    Boolean(settings.inputSelectionField) &&
    Boolean(settings.displayLabel.trim());

  if (!isComplete) {
    throw new Error("Complete all population settings fields");
  }

  return {
    ...settings,
    displayLabel: settings.displayLabel.trim(),
  };
};
