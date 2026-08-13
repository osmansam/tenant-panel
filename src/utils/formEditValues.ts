type FormKey = { key: string; type: string };
type FormInput = { formKey: string; type: string; isMultiple?: boolean };

const getValueId = (value: unknown): unknown => {
  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    return objectValue._id ?? objectValue.id ?? objectValue.$oid ?? value;
  }
  return value;
};

export const prepareFormEditValues = (
  updates: Record<string, unknown>,
  formKeys: FormKey[],
  inputs: FormInput[],
): Record<string, unknown> => {
  const processed = { ...updates };

  formKeys.forEach(({ key, type }) => {
    if (!Array.isArray(updates[key])) return;
    if (!["stringArray", "intArray", "numberArray"].includes(type)) return;

    const input = inputs.find((candidate) => candidate.formKey === key);
    processed[key] = input?.type === "select" && input.isMultiple
      ? updates[key].map(getValueId)
      : updates[key].join(", ");
  });

  return processed;
};
