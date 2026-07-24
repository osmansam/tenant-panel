export function stripIdentityFields<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripIdentityFields(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, entryValue]) => {
      if (["id", "_id", "ID", "CreatedAt", "UpdatedAt", "createdAt", "updatedAt"].includes(key)) {
        return acc;
      }
      return {
        ...acc,
        [key]: stripIdentityFields(entryValue),
      };
    }, {} as Record<string, unknown>) as T;
  }

  return value;
}

export function parseJsonObject(value: string): Record<string, unknown> {
  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JSON must be an object");
  }
  return stripIdentityFields(parsed);
}

export function normalizePageJsonPayload(value: Record<string, unknown>) {
  return {
    ...value,
    name: String(value.name || value.Name || "").trim(),
    slug: value.slug || value.Slug || undefined,
    sections: Array.isArray(value.sections)
      ? value.sections
      : Array.isArray(value.Sections)
      ? value.Sections
      : [],
    filters: Array.isArray(value.filters)
      ? value.filters
      : Array.isArray(value.Filters)
      ? value.Filters
      : [],
    isAuthenticated:
      value.isAuthenticated ?? value.IsAuthenticated ?? true,
  };
}

export function normalizeContainerJsonPayload(value: Record<string, unknown>) {
  return {
    ...value,
    schemaName: value.schemaName || value.SchemaName,
    fields: Array.isArray(value.fields)
      ? value.fields
      : Array.isArray(value.Fields)
      ? value.Fields
      : [],
  };
}
