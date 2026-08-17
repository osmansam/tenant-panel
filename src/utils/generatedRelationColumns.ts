import type {
  GeneratedRelationColumnsConfig,
  TableToggleConfig,
} from "../types/page";
import {
  isBooleanColumnEditable,
  isTableColumnVisible,
  type TableToggleState,
} from "./tableToggles";

export const GENERATED_RELATION_COLUMNS_MAX_RECORDS = 100;

export const normalizeRelationValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number")
    return Number.isFinite(value) ? String(value) : null;
  if (typeof value === "bigint") return String(value);
  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    for (const key of ["_id", "id", "$oid"]) {
      if (key in objectValue) {
        return normalizeRelationValue(objectValue[key]);
      }
    }
  }
  return null;
};

export const relationValueForSubmit = (value: unknown): unknown => {
  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    for (const key of ["_id", "id", "$oid"]) {
      if (key in objectValue) return objectValue[key];
    }
  }
  return value;
};

export const toggleRelationMembership = (
  current: unknown,
  sourceId: unknown,
  checked: boolean,
): unknown[] => {
  const values = Array.isArray(current) ? current : [];
  const normalizedSourceId = normalizeRelationValue(sourceId);
  if (!normalizedSourceId) return [...values];
  const withoutMatches = values.filter(
    (value) => normalizeRelationValue(value) !== normalizedSourceId,
  );
  if (!checked) return withoutMatches;
  return withoutMatches.length === values.length
    ? [...values, sourceId]
    : [...values];
};

export const isRelationMember = (current: unknown, sourceId: unknown): boolean => {
  const normalizedSourceId = normalizeRelationValue(sourceId);
  return Boolean(
    normalizedSourceId &&
      Array.isArray(current) &&
      current.some(
        (value) => normalizeRelationValue(value) === normalizedSourceId,
      ),
  );
};

export const relationMembershipsEqual = (left: unknown, right: unknown): boolean => {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length)
    return false;
  return left.every(
    (value, index) =>
      normalizeRelationValue(value) === normalizeRelationValue(right[index]),
  );
};

export interface GeneratedRelationColumnDescriptor {
  key: string;
  label: string;
  group: GeneratedRelationColumnsConfig;
  sourceId: unknown;
  normalizedSourceId: string;
  editable: boolean;
}

export const buildGeneratedRelationColumnDescriptors = (
  groups: GeneratedRelationColumnsConfig[] = [],
  recordsBySchema: Record<string, Array<Record<string, unknown>>> = {},
  toggleState: TableToggleState = {},
  toggles: TableToggleConfig[] = [],
): GeneratedRelationColumnDescriptor[] =>
  groups.flatMap((group) => {
    if (
      !isTableColumnVisible(group.visibilityToggle, toggleState, toggles)
    ) {
      return [];
    }
    const sourceIdField = group.sourceIdField?.trim() || "_id";
    const limit = Math.min(
      GENERATED_RELATION_COLUMNS_MAX_RECORDS,
      Math.max(1, group.sourceLimit || GENERATED_RELATION_COLUMNS_MAX_RECORDS),
    );
    const seen = new Set<string>();
    const descriptors: GeneratedRelationColumnDescriptor[] = [];
    for (const record of
      recordsBySchema[group.id] || recordsBySchema[group.sourceSchemaName] || []) {
      const sourceId = record[sourceIdField];
      const normalizedSourceId = normalizeRelationValue(sourceId);
      if (!normalizedSourceId || seen.has(normalizedSourceId)) continue;
      seen.add(normalizedSourceId);
      const rawLabel = record[group.sourceLabelField];
      const normalizedLabel =
        rawLabel === null || rawLabel === undefined
          ? ""
          : String(rawLabel).trim();
      descriptors.push({
        key: `${group.id}:${normalizedSourceId}`,
        label: normalizedLabel || normalizedSourceId,
        group,
        sourceId,
        normalizedSourceId,
        editable: isBooleanColumnEditable(
          group.booleanEditToggle,
          toggleState,
          toggles,
        ),
      });
      if (descriptors.length >= limit) break;
    }
    return descriptors;
  });
