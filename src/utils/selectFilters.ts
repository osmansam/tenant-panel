import type {
  SelectFilterBinding,
  SelectFilterScalar,
} from "../types/selectFilters";
import {
  hasRequestFilterTemplates,
  isRequestFilterTemplateString,
  isSafeRequestFilterIdentifier,
  isSafeRequestFilterPath,
  normalizeRequestFilterTargetField,
  parseRequestFilterTemplate,
  tokensMatchEntity,
  type ParsedRequestFilterTemplate,
} from "./requestFilterTemplates";

export interface SelectFilterOption {
  value: string | number;
  sourceItem?: Record<string, unknown>;
}

export interface SelectFilterField {
  formKey: string;
  label?: string;
  type?: string;
  isMultiple?: boolean;
  sourceSchemaName?: string;
  sourceValueField?: string;
  sourceRequestFilters?: Record<string, unknown>;
  sourceFilterBindings?: SelectFilterBinding[];
  options?: readonly SelectFilterOption[];
}

const own = (value: object, key: string) =>
  Object.prototype.hasOwnProperty.call(value, key);

const object = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const blocked = new Set(["__proto__", "prototype", "constructor"]);

const pathOK = (value: unknown): value is string[] =>
  Array.isArray(value) && isSafeRequestFilterPath(value);

const nameOK = (value: unknown): value is string =>
  typeof value === "string" && pathOK(value.split("."));

const scalar = (value: unknown): value is SelectFilterScalar =>
  (typeof value === "string" && value.length > 0) ||
  (typeof value === "number" && Number.isFinite(value)) ||
  typeof value === "boolean";

export const hasDependentSelectFilters = (
  field: Pick<SelectFilterField, "sourceFilterBindings" | "sourceRequestFilters">,
): boolean =>
  Boolean(field.sourceFilterBindings?.length) ||
  hasRequestFilterTemplates(field.sourceRequestFilters);

const collectRequestFilterTemplates = (
  field: SelectFilterField,
  fields?: readonly SelectFilterField[],
): ParsedRequestFilterTemplate[] => {
  if (!object(field.sourceRequestFilters)) return [];
  const results: ParsedRequestFilterTemplate[] = [];
  for (const rawValue of Object.values(field.sourceRequestFilters)) {
    const candidates = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const candidate of candidates) {
      if (!isRequestFilterTemplateString(candidate)) continue;
      const parsed = parseRequestFilterTemplate(candidate, fields);
      if (parsed.ok) {
        results.push(parsed.value);
      }
    }
  }
  return results;
};

export const getSelectFilterDependencies = (
  field: SelectFilterField,
  fields: readonly SelectFilterField[] = [],
): string[] => {
  const fromBindings = Array.isArray(field.sourceFilterBindings)
    ? field.sourceFilterBindings.flatMap((rule) => {
        const value = rule?.value;
        return object(value) &&
          (value.source === "field" || value.source === "record") &&
          typeof value.fieldKey === "string"
          ? [value.fieldKey]
          : [];
      })
    : [];
  const fromTemplates = collectRequestFilterTemplates(field, fields).map(
    (entry) => entry.fieldKey,
  );
  return [...new Set([...fromTemplates, ...fromBindings])];
};

export function validateSelectFilterBindings(
  fields: readonly SelectFilterField[],
): string[] {
  const errors: string[] = [];
  const byKey = new Map(fields.map((field) => [field.formKey, field]));

  for (const field of fields) {
    const hasBindings = field.sourceFilterBindings !== undefined;
    const hasRequestFilters = field.sourceRequestFilters !== undefined;
    if (!hasBindings && !hasRequestFilters) continue;

    const fail = (message: string) =>
      errors.push(`${field.formKey}: ${message}`);
    const targets = new Set<string>();
    const ids = new Set<string>();

    if (hasRequestFilters) {
      if (!object(field.sourceRequestFilters)) {
        fail("Invalid dependent filter.");
      } else {
        const entries = Object.entries(field.sourceRequestFilters);
        if (entries.length > 32) {
          fail("Use at most 32 dependent filters.");
        }
        for (const [rawKey, rawValue] of entries) {
          const isTemplateVal =
            isRequestFilterTemplateString(rawValue) ||
            (Array.isArray(rawValue) &&
              rawValue.some(isRequestFilterTemplateString));
          const target = normalizeRequestFilterTargetField(
            rawKey,
            field,
            isTemplateVal,
          );
          if (!nameOK(target)) {
            fail("Invalid dependent filter.");
            continue;
          }
          if (targets.has(target)) {
            fail(
              "Dependent filters need unique targets and IDs, including fixed request filters.",
            );
          }
          targets.add(target);

          if (!isTemplateVal) continue;

          const items = Array.isArray(rawValue) ? rawValue : [rawValue];
          if (!items.length) {
            fail("Choose a valid fixed value for this comparison.");
            continue;
          }
          for (const item of items) {
            if (isRequestFilterTemplateString(item)) {
              const parsed = parseRequestFilterTemplate(item, fields);
              if (!parsed.ok) {
                fail(parsed.error);
                continue;
              }
              const refKey = parsed.value.fieldKey;
              if (!isSafeRequestFilterIdentifier(refKey) || !byKey.has(refKey)) {
                fail("The referenced input no longer exists.");
              } else if (refKey === field.formKey) {
                fail("An input cannot depend on itself.");
              }
              if (
                parsed.value.source === "record" &&
                !pathOK(parsed.value.path)
              ) {
                fail("Choose a safe record field from a select input.");
              }
            } else if (!scalar(item)) {
              fail("Choose a valid fixed value for this comparison.");
            }
          }
        }
      }
    }

    if (hasBindings) {
      if (
        !Array.isArray(field.sourceFilterBindings) ||
        field.sourceFilterBindings.length > 32
      ) {
        fail("Use at most 32 dependent filters.");
        continue;
      }
      for (const rule of field.sourceFilterBindings) {
        if (
          !object(rule) ||
          !nameOK(rule.id) ||
          !nameOK(rule.field) ||
          !["eq", "in"].includes(rule.operator) ||
          !object(rule.value)
        ) {
          fail("Invalid dependent filter.");
          continue;
        }
        const normalizedTarget = normalizeRequestFilterTargetField(
          rule.field,
          field,
          true,
        );
        if (
          targets.has(rule.field) ||
          targets.has(normalizedTarget) ||
          ids.has(rule.id)
        ) {
          fail(
            "Dependent filters need unique targets and IDs, including fixed request filters.",
          );
        }
        targets.add(rule.field);
        targets.add(normalizedTarget);
        ids.add(rule.id);
        const value = rule.value;
        if (value.source === "literal") {
          if (
            rule.operator === "eq"
              ? !scalar(value.value)
              : !Array.isArray(value.value) ||
                !value.value.length ||
                !value.value.every(scalar)
          ) {
            fail("Choose a valid fixed value for this comparison.");
          }
        } else if (value.source === "field" || value.source === "record") {
          if (!nameOK(value.fieldKey) || !byKey.has(value.fieldKey)) {
            fail("The referenced input no longer exists.");
          } else if (value.fieldKey === field.formKey) {
            fail("An input cannot depend on itself.");
          }
          if (
            value.source === "record" &&
            (!pathOK(value.path) || byKey.get(value.fieldKey)?.type !== "select")
          ) {
            fail("Choose a safe record field from a select input.");
          }
        } else {
          fail("Choose a supported value source.");
        }
      }
    }
  }

  for (const field of fields) {
    const visit = (key: string, seen: Set<string>): boolean =>
      key === field.formKey ||
      (!seen.has(key) &&
        (seen.add(key),
        getSelectFilterDependencies(
          byKey.get(key) || { formKey: key },
          fields,
        ).some((next) => visit(next, seen))));
    if (
      getSelectFilterDependencies(field, fields).some((key) =>
        visit(key, new Set()),
      )
    ) {
      errors.push(`${field.formKey}: Dependent input cycle detected.`);
    }
  }

  return [...new Set(errors)];
}

const readPath = (value: unknown, path: readonly string[]): unknown => {
  for (const part of path) {
    if (!object(value) || !own(value, part) || blocked.has(part)) {
      return undefined;
    }
    value = value[part];
  }
  return value;
};

const readRecordPathWithFallback = (
  record: unknown,
  path: readonly string[],
  parent?: SelectFilterField,
): unknown => {
  const direct = readPath(record, path);
  if (direct !== undefined) return direct;

  if (path.length >= 2 && path[path.length - 1] === "_id") {
    const prefixVal = readPath(record, path.slice(0, -1));
    if (
      scalar(prefixVal) ||
      (Array.isArray(prefixVal) && prefixVal.length > 0 && prefixVal.every(scalar))
    ) {
      return prefixVal;
    }
    if (path.length === 2) {
      const altId =
        readPath(record, [`${path[0]}Id`]) ??
        readPath(record, [`${path[0]}_id`]);
      if (scalar(altId)) return altId;
    }
  }

  if (
    path.length >= 2 &&
    (tokensMatchEntity(path[0], parent?.formKey) ||
      tokensMatchEntity(path[0], parent?.label) ||
      tokensMatchEntity(path[0], parent?.sourceSchemaName))
  ) {
    return readRecordPathWithFallback(record, path.slice(1), parent);
  }

  return undefined;
};

const resolveFieldOrRecordReference = (
  reference:
    | { source: "field"; fieldKey: string }
    | { source: "record"; fieldKey: string; path: string[] },
  fields: readonly SelectFilterField[],
  values: Record<string, unknown>,
  optionsByField: ReadonlyMap<string, readonly SelectFilterOption[]>,
  allowScalarInputFallback = false,
): unknown => {
  const current = own(values, reference.fieldKey)
    ? values[reference.fieldKey]
    : undefined;
  const parent = fields.find(
    (candidate) => candidate.formKey === reference.fieldKey,
  );

  if (reference.source === "field") {
    if (object(current)) {
      const valueField = parent?.sourceValueField || "_id";
      return readPath(current, [valueField]) ?? readPath(current, ["_id"]);
    }
    if (Array.isArray(current)) {
      const valueField = parent?.sourceValueField || "_id";
      return current.map((entry) =>
        object(entry)
          ? (readPath(entry, [valueField]) ?? readPath(entry, ["_id"]))
          : entry,
      );
    }
    return current;
  }

  const options =
    optionsByField.get(reference.fieldKey) || parent?.options || [];
  const selected = Array.isArray(current) ? current : [current];
  const hasSelectOptions =
    parent?.type === "select" &&
    (Boolean(parent?.sourceSchemaName) ||
      Boolean(parent?.options?.length) ||
      optionsByField.has(reference.fieldKey));

  const records = selected.map((id) => {
    if (object(id)) {
      return readRecordPathWithFallback(id, reference.path, parent);
    }
    if (!scalar(id)) return undefined;
    const record = options.find(
      (option) => option.value === id || String(option.value) === String(id),
    )?.sourceItem;
    const fromRecord = readRecordPathWithFallback(record, reference.path, parent);
    if (fromRecord !== undefined) return fromRecord;

    const usesIdValueField =
      !parent?.sourceValueField || parent.sourceValueField === "_id";
    if (!usesIdValueField) return undefined;

    if (reference.path.length === 1 && reference.path[0] === "_id") {
      return id;
    }
    if (
      allowScalarInputFallback &&
      reference.path.length === 2 &&
      reference.path[1] === "_id" &&
      (!hasSelectOptions ||
        tokensMatchEntity(reference.path[0], parent?.formKey) ||
        tokensMatchEntity(reference.path[0], parent?.label) ||
        tokensMatchEntity(reference.path[0], parent?.sourceSchemaName))
    ) {
      return id;
    }
    return undefined;
  });

  return Array.isArray(current) ? records : records[0];
};

const missingRefMessage =
  "Choose the referenced input value first; its selected record field must be available.";

export function resolveSelectFilters(
  field: SelectFilterField,
  fields: readonly SelectFilterField[],
  values: Record<string, unknown>,
  optionsByField: ReadonlyMap<
    string,
    readonly SelectFilterOption[]
  > = new Map(),
): {
  ready: boolean;
  filters: Record<string, SelectFilterScalar | SelectFilterScalar[] | unknown>;
  message?: string;
} {
  const invalid = validateSelectFilterBindings(fields).find((message) =>
    message.startsWith(`${field.formKey}:`),
  );
  if (invalid) return { ready: false, filters: {}, message: invalid };

  const filters: Record<string, unknown> = {};

  for (const [rawKey, rawValue] of Object.entries(
    field.sourceRequestFilters || {},
  )) {
    const isTemplateVal =
      isRequestFilterTemplateString(rawValue) ||
      (Array.isArray(rawValue) && rawValue.some(isRequestFilterTemplateString));
    const target = normalizeRequestFilterTargetField(
      rawKey,
      field,
      isTemplateVal,
    );
    if (!isTemplateVal) {
      filters[target] = rawValue;
      continue;
    }

    if (Array.isArray(rawValue)) {
      const resolvedItems: unknown[] = [];
      for (const item of rawValue) {
        if (isRequestFilterTemplateString(item)) {
          const parsed = parseRequestFilterTemplate(item, fields);
          if (!parsed.ok) {
            return { ready: false, filters: {}, message: parsed.error };
          }
          const resolved = resolveFieldOrRecordReference(
            parsed.value.source === "record"
              ? {
                  source: "record",
                  fieldKey: parsed.value.fieldKey,
                  path: parsed.value.path,
                }
              : { source: "field", fieldKey: parsed.value.fieldKey },
            fields,
            values,
            optionsByField,
            true,
          );
          if (Array.isArray(resolved)) {
            resolvedItems.push(...resolved);
          } else {
            resolvedItems.push(resolved);
          }
        } else {
          resolvedItems.push(item);
        }
      }
      if (!resolvedItems.length || !resolvedItems.every(scalar)) {
        return { ready: false, filters: {}, message: missingRefMessage };
      }
      filters[target] = [...new Set(resolvedItems)];
      continue;
    }

    if (typeof rawValue === "string") {
      const parsed = parseRequestFilterTemplate(rawValue, fields);
      if (!parsed.ok) {
        return { ready: false, filters: {}, message: parsed.error };
      }
      const resolved = resolveFieldOrRecordReference(
        parsed.value.source === "record"
          ? {
              source: "record",
              fieldKey: parsed.value.fieldKey,
              path: parsed.value.path,
            }
          : { source: "field", fieldKey: parsed.value.fieldKey },
        fields,
        values,
        optionsByField,
        true,
      );
      if (Array.isArray(resolved)) {
        const list = resolved.flat();
        if (!list.length || !list.every(scalar)) {
          return { ready: false, filters: {}, message: missingRefMessage };
        }
        filters[target] = [...new Set(list)];
      } else {
        if (!scalar(resolved)) {
          return { ready: false, filters: {}, message: missingRefMessage };
        }
        filters[target] = resolved;
      }
    }
  }

  for (const rule of field.sourceFilterBindings || []) {
    const reference = rule.value;
    const target = normalizeRequestFilterTargetField(rule.field, field, true);
    const value =
      reference.source === "literal"
        ? reference.value
        : resolveFieldOrRecordReference(
            reference,
            fields,
            values,
            optionsByField,
            false,
          );
    if (rule.operator === "in") {
      const list = Array.isArray(value) ? value.flat() : [value];
      if (!list.length || !list.every(scalar)) {
        return { ready: false, filters: {}, message: missingRefMessage };
      }
      filters[target] = [...new Set(list)];
    } else {
      if (!scalar(value)) {
        return { ready: false, filters: {}, message: missingRefMessage };
      }
      filters[target] = value;
    }
  }

  return { ready: true, filters };
}

export function referencedSelectRecordFields(
  fields: readonly SelectFilterField[],
  key: string,
): string[] {
  const fromBindings = fields.flatMap((field) =>
    Array.isArray(field.sourceFilterBindings)
      ? field.sourceFilterBindings.flatMap((rule) =>
          rule.value?.source === "record" &&
          rule.value.fieldKey === key &&
          pathOK(rule.value.path)
            ? [rule.value.path.join(".")]
            : [],
        )
      : [],
  );
  const fromTemplates = fields.flatMap((field) =>
    collectRequestFilterTemplates(field, fields).flatMap((template) =>
      template.source === "record" &&
      template.fieldKey === key &&
      pathOK(template.path)
        ? [template.path.join(".")]
        : [],
    ),
  );
  return [...new Set([...fromBindings, ...fromTemplates])].sort();
}

export function clearDependentSelectValues<T extends Record<string, unknown>>(
  fields: readonly SelectFilterField[],
  previous: T,
  next: T,
): T {
  const changed = new Set(
    Object.keys(next).filter(
      (key) => JSON.stringify(previous[key]) !== JSON.stringify(next[key]),
    ),
  );
  for (const key of Object.keys(previous)) {
    if (!own(next, key)) changed.add(key);
  }
  const cleared = new Set<string>();
  let result = next;
  for (let pass = 0; pass < fields.length; pass += 1) {
    let added = false;
    for (const field of fields) {
      if (
        !cleared.has(field.formKey) &&
        getSelectFilterDependencies(field, fields).some((key) =>
          changed.has(key),
        )
      ) {
        if (result === next) result = { ...next };
        result[field.formKey as keyof T] = (
          field.isMultiple ? [] : ""
        ) as T[keyof T];
        cleared.add(field.formKey);
        changed.add(field.formKey);
        added = true;
      }
    }
    if (!added) break;
  }
  return result;
}
