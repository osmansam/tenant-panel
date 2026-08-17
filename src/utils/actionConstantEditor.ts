export type ActionConstantRow = {
  id: string;
  key: string;
  valueText: string;
};

export type ActionConstantRowsResult =
  | { ok: true; values: Record<string, unknown> }
  | { ok: false; errors: Record<string, string> };

const formatActionConstantValue = (value: unknown): string => {
  if (typeof value !== "string") return JSON.stringify(value);
  if (
    value === "true" ||
    value === "false" ||
    value === "null" ||
    value.trim() !== value ||
    /^[-+]?\d/.test(value) ||
    value.startsWith("{") ||
    value.startsWith("[") ||
    value.startsWith('"')
  ) {
    return JSON.stringify(value);
  }
  return value;
};

export const actionConstantRowsFromValues = (
  values: Record<string, unknown> = {},
): ActionConstantRow[] =>
  Object.entries(values).map(([key, value], index) => ({
    id: `${key}-${index}`,
    key,
    valueText: formatActionConstantValue(value),
  }));

const parseActionConstantValue = (
  valueText: string,
): { ok: true; value: unknown } | { ok: false } => {
  const trimmed = valueText.trim();
  if (trimmed === "") return { ok: true, value: "" };

  const structured = trimmed.startsWith("{") || trimmed.startsWith("[");
  const jsonLiteral =
    structured ||
    trimmed.startsWith('"') ||
    trimmed === "true" ||
    trimmed === "false" ||
    trimmed === "null" ||
    /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(trimmed);

  if (!jsonLiteral) return { ok: true, value: valueText };
  try {
    return { ok: true, value: JSON.parse(trimmed) };
  } catch {
    return { ok: false };
  }
};

export const parseActionConstantRows = (
  rows: ActionConstantRow[],
): ActionConstantRowsResult => {
  const values: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  const seen = new Set<string>();

  for (const row of rows) {
    const key = row.key.trim();
    if (!key) {
      errors[row.id] = "Key is required";
      continue;
    }
    if (seen.has(key)) {
      errors[row.id] = "Key must be unique";
      continue;
    }
    seen.add(key);

    const parsed = parseActionConstantValue(row.valueText);
    if (!parsed.ok) {
      errors[row.id] = "Enter valid JSON for an object or array";
      continue;
    }
    values[key] = parsed.value;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, values };
};
