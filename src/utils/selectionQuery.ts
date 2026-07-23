type ExtraSelectionParams =
  | Record<string, unknown>
  | readonly (readonly [string, string])[];

export interface SelectionQueryConfigParams {
  schemaName?: string;
  fieldName?: string;
  valueField?: string;
  tenantSlug?: string;
  projectSlug?: string;
  basePath?: string;
  extraParams?: ExtraSelectionParams;
  filterParams?: Record<string, unknown>;
  sourceRevision?: string;
}

const cleanEntries = (params: Record<string, unknown>) => {
  const preferredOrder = ["schemaName", "fieldName", "valueField"];
  const entries = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([left], [right]) => {
      const leftIndex = preferredOrder.indexOf(left);
      const rightIndex = preferredOrder.indexOf(right);
      if (leftIndex >= 0 || rightIndex >= 0) {
        return (
          (leftIndex >= 0 ? leftIndex : preferredOrder.length) -
          (rightIndex >= 0 ? rightIndex : preferredOrder.length)
        );
      }
      return left.localeCompare(right);
    });
  return entries;
};

const serializeEntries = (entries: readonly (readonly [string, unknown])[]) => {
  const params = new URLSearchParams();
  entries.forEach(([key, value]) => params.append(key, String(value)));
  return params.toString();
};

const stableValue = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nestedValue]) => [key, stableValue(nestedValue)]),
  );
};

const isEntryArray = (
  value: ExtraSelectionParams,
): value is readonly (readonly [string, string])[] => Array.isArray(value);

const readStoredSlug = (key: string) => {
  if (typeof window === "undefined") return "";

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return "";
    const parsed = JSON.parse(stored) as { slug?: string; id?: string };
    return parsed.slug || parsed.id || "";
  } catch {
    return "";
  }
};

export const getSelectionScopeFromStorage = () => ({
  tenantSlug: readStoredSlug("currentTenant"),
  projectSlug: readStoredSlug("currentProject"),
});

export const getSelectionQueryConfig = ({
  schemaName = "",
  fieldName = "",
  valueField = "",
  tenantSlug,
  projectSlug,
  basePath = "/dynamic",
  extraParams = {},
  filterParams = {},
  sourceRevision = "",
}: SelectionQueryConfigParams) => {
  const storageScope = getSelectionScopeFromStorage();
  const resolvedTenantSlug = tenantSlug ?? storageScope.tenantSlug ?? "";
  const resolvedProjectSlug = projectSlug ?? storageScope.projectSlug ?? "";
  const queryParams = {
    schemaName,
    fieldName,
    valueField,
  };
  const extraEntries = isEntryArray(extraParams)
    ? extraParams
    : cleanEntries(extraParams);
  const filterEntries = cleanEntries(filterParams).map(
    ([key, value]) => [`filter.${key}`, value] as const,
  );

  return {
    path: `${basePath}/selection?${serializeEntries([
      ...cleanEntries(queryParams),
      ...extraEntries,
      ...filterEntries,
    ])}`,
    queryKey: [
      "dynamic",
      resolvedTenantSlug,
      resolvedProjectSlug,
      "selection",
      schemaName,
      fieldName,
      valueField,
      sourceRevision,
      stableValue(extraParams),
      stableValue(filterParams),
    ] as const,
  };
};
