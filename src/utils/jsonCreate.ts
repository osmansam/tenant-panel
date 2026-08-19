export function stripIdentityFields<T>(value: T): T {
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, entryValue]) => {
      if (["id", "_id", "ID", "CreatedAt", "UpdatedAt", "createdAt", "updatedAt"].includes(key)) {
        return acc;
      }
      return {
        ...acc,
        [key]: entryValue,
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

type PageJsonRecord = Record<string, unknown> & { id?: string; _id?: string };

export function getEditablePageJson(page: PageJsonRecord): Record<string, unknown> {
  return stripIdentityFields(page);
}

export function buildPageJsonUpdate(
  originalPage: PageJsonRecord,
  editedPayload: Record<string, unknown>,
) {
  const id = originalPage._id || originalPage.id;
  if (!id) throw new Error("Page JSON update requires the original page id");
  return {
    id,
    payload: normalizePageJsonPayload(stripIdentityFields(editedPayload)),
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
