const PLACEHOLDER_PATTERN = /\{\{\s*([^}]+?)\s*\}\}/g;

export const getTableTemplateFields = (template?: string): string[] => {
  const fields: string[] = [];
  const seen = new Set<string>();

  for (const match of template?.matchAll(PLACEHOLDER_PATTERN) || []) {
    const field = match[1].trim();
    if (field && !seen.has(field)) {
      seen.add(field);
      fields.push(field);
    }
  }

  return fields;
};

export const renderTableColumnTemplate = (
  template: string | undefined,
  row: Record<string, unknown>,
): string =>
  (template || "")
    .replace(PLACEHOLDER_PATTERN, (_, rawField: string) => {
      const value = row[rawField.trim()];
      return value === null || value === undefined ? "" : String(value);
    })
    .replace(/\s+/g, " ")
    .trim();

