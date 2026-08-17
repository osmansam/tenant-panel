export type PartitionedActionConstantValues = {
  visibleDefaults: Record<string, unknown>;
  hiddenValues: Record<string, unknown>;
};

export const partitionActionConstantValues = (
  constants: Record<string, unknown> | undefined,
  effectiveFormKeys: Iterable<string>,
): PartitionedActionConstantValues => {
  const visibleKeys = new Set(effectiveFormKeys);
  const visibleDefaults: Record<string, unknown> = {};
  const hiddenValues: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(constants || {})) {
    (visibleKeys.has(key) ? visibleDefaults : hiddenValues)[key] = value;
  }

  return { visibleDefaults, hiddenValues };
};

export const buildActionInitialValues = (
  fieldDefaults: Record<string, unknown>,
  visibleDefaults: Record<string, unknown>,
  existingValues: Record<string, unknown> = {},
): Record<string, unknown> => ({
  ...fieldDefaults,
  ...visibleDefaults,
  ...existingValues,
});

export const applyHiddenActionValues = (
  payload: Record<string, unknown>,
  hiddenValues: Record<string, unknown>,
): Record<string, unknown> => ({
  ...payload,
  ...hiddenValues,
});
