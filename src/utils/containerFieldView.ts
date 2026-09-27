import type { Field } from "./api/container";

export const filterContainerFields = (fields: Field[], query: string) => {
  const normalized = query.trim().toLocaleLowerCase();

  if (!normalized) return fields;

  return fields.filter((field) =>
    [field.name, field.type, field.tag, field.objectSchemaName]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalized),
  );
};

export const canReorderFilteredFields = (query: string) => !query.trim();
