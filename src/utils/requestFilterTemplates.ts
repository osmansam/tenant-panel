export interface RequestFilterFieldContext {
  formKey?: string;
  label?: string;
  sourceSchemaName?: string;
  sourceFieldNames?: readonly string[];
}

export interface ParsedRequestFilterTemplate {
  raw: string;
  fieldKey: string;
  path: string[];
  source: "field" | "record";
}

const blocked = new Set(["__proto__", "prototype", "constructor"]);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

export const isSafeRequestFilterIdentifier = (part: string): boolean =>
  /^[A-Za-z_][A-Za-z0-9_$-]{0,127}$/.test(part) && !blocked.has(part);

export const isSafeRequestFilterPath = (parts: readonly string[]): boolean =>
  parts.length > 0 &&
  parts.length <= 16 &&
  parts.every((part) => typeof part === "string" && isSafeRequestFilterIdentifier(part));

const normalizeEntityToken = (value = ""): string =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const singularizeEntityToken = (token: string): string => {
  if (token.endsWith("ies") && token.length > 3) {
    return `${token.slice(0, -3)}y`;
  }
  if (token.endsWith("ses") && token.length > 3) {
    return token.slice(0, -2);
  }
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 1) {
    return token.slice(0, -1);
  }
  return token;
};

export const tokensMatchEntity = (left?: string, right?: string): boolean => {
  const a = normalizeEntityToken(left);
  const b = normalizeEntityToken(right);
  if (!a || !b) return false;
  return a === b || singularizeEntityToken(a) === singularizeEntityToken(b);
};

export function isRequestFilterTemplateString(value: string): boolean;
export function isRequestFilterTemplateString(value: unknown): value is string;
export function isRequestFilterTemplateString(value: unknown): value is string {
  return typeof value === "string" && (value.includes("{{") || value.includes("}}"));
}

export const hasRequestFilterTemplates = (
  filters?: Record<string, unknown>,
): boolean => {
  if (!isPlainObject(filters)) return false;
  return Object.values(filters).some((value) =>
    Array.isArray(value)
      ? value.some(isRequestFilterTemplateString)
      : isRequestFilterTemplateString(value),
  );
};

export function normalizeRequestFilterTargetField(
  rawTarget: string,
  context?: RequestFilterFieldContext,
  isTemplateOrEquation = false,
): string {
  const trimmed = rawTarget.trim();
  if (!trimmed) return "";
  if (context?.sourceFieldNames?.includes(trimmed)) {
    return trimmed;
  }
  const parts = trimmed.split(".").map((part) => part.trim());
  if (parts.length >= 2 && parts.every(Boolean)) {
    if (parts[parts.length - 1] === "_id") {
      return "_id";
    }
    const prefix = parts[0];
    if (
      tokensMatchEntity(prefix, context?.formKey) ||
      tokensMatchEntity(prefix, context?.label) ||
      tokensMatchEntity(prefix, context?.sourceSchemaName)
    ) {
      return parts.slice(1).join(".");
    }
    if (isTemplateOrEquation && !context?.sourceFieldNames?.length && parts.length === 2) {
      return parts[1];
    }
  }
  return parts.every(Boolean) ? parts.join(".") : trimmed;
}

export function resolveReferencedFieldKey(
  rawFieldKey: string,
  fields?: readonly { formKey: string; label?: string; sourceSchemaName?: string }[],
): string {
  const trimmed = rawFieldKey.trim();
  if (!fields?.length) return trimmed;
  if (fields.some((field) => field.formKey === trimmed)) {
    return trimmed;
  }
  const matches = fields.filter(
    (field) =>
      tokensMatchEntity(trimmed, field.formKey) ||
      tokensMatchEntity(trimmed, field.label) ||
      tokensMatchEntity(trimmed, field.sourceSchemaName),
  );
  return matches.length === 1 ? matches[0].formKey : trimmed;
}

const singleTemplatePattern = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;

export function parseRequestFilterTemplate(
  raw: string,
  fields?: readonly { formKey: string; label?: string; sourceSchemaName?: string }[],
):
  | { ok: true; value: ParsedRequestFilterTemplate }
  | { ok: false; error: string } {
  const match = singleTemplatePattern.exec(raw);
  if (!match) {
    return { ok: false, error: "Invalid dependent filter." };
  }
  const inner = match[1].trim();
  const rawParts = inner.split(".");
  if (!rawParts.length || rawParts.some((part) => !part.trim())) {
    return { ok: false, error: "Invalid dependent filter." };
  }
  const parts = rawParts.map((part) => part.trim());
  if (parts.length > 16 || !isSafeRequestFilterIdentifier(parts[0])) {
    return { ok: false, error: "Invalid dependent filter." };
  }
  const recordPath = parts.slice(1);
  if (recordPath.length > 0 && !isSafeRequestFilterPath(recordPath)) {
    return {
      ok: false,
      error: "Choose a safe record field from a select input.",
    };
  }
  const fieldKey = resolveReferencedFieldKey(parts[0], fields);
  return {
    ok: true,
    value: {
      raw: `{{${[fieldKey, ...recordPath].join(".")}}}`,
      fieldKey,
      path: recordPath,
      source: recordPath.length > 0 ? "record" : "field",
    },
  };
}

const normalizeTemplateLiteral = (raw: string): string => {
  const match = singleTemplatePattern.exec(raw);
  if (!match) return raw.trim();
  const rawParts = match[1].split(".");
  if (rawParts.some((part) => !part.trim())) return raw.trim();
  const parts = rawParts.map((part) => part.trim());
  return parts.length ? `{{${parts.join(".")}}}` : raw.trim();
};

const parseScalarOrTemplateToken = (raw: string): unknown => {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (isRequestFilterTemplateString(trimmed)) {
    return normalizeTemplateLiteral(trimmed);
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) return parsed;
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((entry) =>
          typeof entry === "string" && isRequestFilterTemplateString(entry)
            ? normalizeTemplateLiteral(entry)
            : entry,
        );
      }
    } catch {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];
      return inner
        .split(",")
        .map((item) => parseScalarOrTemplateToken(item))
        .filter((item) => item !== "");
    }
  }
  return trimmed;
};

const splitEquationClauses = (input: string): string[] => {
  const clauses: string[] = [];
  let current = "";
  let braceDepth = 0;
  let bracketDepth = 0;
  let quote: '"' | "'" | null = null;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    const prev = i > 0 ? input[i - 1] : "";
    if (quote) {
      current += ch;
      if (ch === quote && prev !== "\\") {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === "{") {
      braceDepth += 1;
      current += ch;
      continue;
    }
    if (ch === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
      current += ch;
      continue;
    }
    if (ch === "[") {
      bracketDepth += 1;
      current += ch;
      continue;
    }
    if (ch === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
      current += ch;
      continue;
    }
    if (braceDepth === 0 && bracketDepth === 0) {
      if (ch === "\n" || ch === "\r" || ch === ";" || ch === ",") {
        if (current.trim()) clauses.push(current.trim());
        current = "";
        continue;
      }
      if (ch === "&" && input[i + 1] === "&") {
        if (current.trim()) clauses.push(current.trim());
        current = "";
        i += 1;
        continue;
      }
    }
    current += ch;
  }
  if (current.trim()) {
    clauses.push(current.trim());
  }
  return clauses;
};

const findTopLevelEquals = (clause: string): { index: number; length: number } | null => {
  let bracketDepth = 0;
  let quote: '"' | "'" | null = null;

  for (let i = 0; i < clause.length; i += 1) {
    const ch = clause[i];
    const prev = i > 0 ? clause[i - 1] : "";
    if (quote) {
      if (ch === quote && prev !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "[") {
      bracketDepth += 1;
      continue;
    }
    if (ch === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
      continue;
    }
    if (bracketDepth === 0 && ch === "=") {
      if (prev === "!" || prev === "<" || prev === ">") continue;
      if (clause[i + 1] === "=") {
        return { index: i, length: 2 };
      }
      return { index: i, length: 1 };
    }
  }
  return null;
};

export function cleanSourceRequestFilters(
  filters?: Record<string, unknown>,
  context?: RequestFilterFieldContext,
): Record<string, unknown> | undefined {
  if (!isPlainObject(filters)) return undefined;
  const result: Record<string, unknown> = {};
  const usedTargets = new Set<string>();

  for (const [rawKey, rawValue] of Object.entries(filters)) {
    const trimmedKey = rawKey.trim();
    if (!trimmedKey || rawValue === undefined || rawValue === null || rawValue === "") {
      continue;
    }
    const cleanedValue =
      typeof rawValue === "string"
        ? isRequestFilterTemplateString(rawValue)
          ? normalizeTemplateLiteral(rawValue)
          : rawValue.trim()
        : Array.isArray(rawValue)
          ? rawValue.map((item) =>
              typeof item === "string"
                ? isRequestFilterTemplateString(item)
                  ? normalizeTemplateLiteral(item)
                  : item.trim()
                : item,
            )
          : rawValue;

    if (cleanedValue === "" || (Array.isArray(cleanedValue) && cleanedValue.length === 0)) {
      continue;
    }

    const isTemplateVal =
      isRequestFilterTemplateString(cleanedValue) ||
      (Array.isArray(cleanedValue) && cleanedValue.some(isRequestFilterTemplateString));
    const normalizedKey = normalizeRequestFilterTargetField(
      trimmedKey,
      context,
      isTemplateVal,
    );
    const finalKey =
      normalizedKey && !usedTargets.has(normalizedKey) ? normalizedKey : trimmedKey;
    usedTargets.add(normalizedKey || trimmedKey);
    result[finalKey] = cleanedValue;
  }

  return Object.keys(result).length ? result : undefined;
}

export function parseRequestFiltersInput(
  value: string,
  context?: RequestFilterFieldContext,
): Record<string, unknown> | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("{") && !trimmed.startsWith("{{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (!isPlainObject(parsed)) return undefined;
      return cleanSourceRequestFilters(parsed, context);
    } catch {
      if (!trimmed.includes("=") && !trimmed.includes("{{")) {
        return undefined;
      }
    }
  }

  const clauses = splitEquationClauses(trimmed);
  if (!clauses.length) return undefined;

  const entries: Record<string, unknown> = {};
  const usedTargets = new Set<string>();

  for (const clause of clauses) {
    const eq = findTopLevelEquals(clause);
    if (!eq) continue;
    const lhs = clause.slice(0, eq.index).trim();
    const rhs = clause.slice(eq.index + eq.length).trim();
    if (!lhs || !rhs) continue;

    const lhsIsTemplate = isRequestFilterTemplateString(lhs);
    const rhsIsTemplate = isRequestFilterTemplateString(rhs);

    const rawTarget = lhsIsTemplate && !rhsIsTemplate ? rhs : lhs;
    const rawValue = lhsIsTemplate && !rhsIsTemplate ? lhs : rhs;

    const parsedValue = parseScalarOrTemplateToken(rawValue);
    if (
      parsedValue === undefined ||
      parsedValue === null ||
      parsedValue === "" ||
      (Array.isArray(parsedValue) && parsedValue.length === 0)
    ) {
      continue;
    }

    const normalizedTarget = normalizeRequestFilterTargetField(
      rawTarget,
      context,
      true,
    );
    if (!normalizedTarget) continue;

    const key = !usedTargets.has(normalizedTarget) ? normalizedTarget : rawTarget.trim();
    usedTargets.add(normalizedTarget);
    entries[key] = parsedValue;
  }

  return Object.keys(entries).length ? entries : undefined;
}

export const formatRequestFiltersInput = (
  filters?: Record<string, unknown>,
): string =>
  filters && Object.keys(filters).length ? JSON.stringify(filters, null, 2) : "";
