import type { AutoTableCollectionSource, CollectionFilter, CollectionSort, ComponentNode } from "../../visual-engine/model";
import { collectionSourceKey } from "../../visual-engine/renderer/repeaters";

export const COLLECTION_MAX_LIMIT = 100;

/** Transport parameters owned by the table-source endpoint; records can never filter on them. */
export const RESERVED_COLLECTION_FIELDS: ReadonlySet<string> = new Set([
  "schemaName", "sourceType", "pipelineName", "workflowName", "fields", "page", "limit", "sort", "asc", "search",
]);

/** Prefixes the backend value parser interprets as comparison operators (`gte-5`). */
const OPERATOR_PREFIX = /^(?:gte|gt|lte|lt|eq)-/i;

export type CollectionFieldTypes = Readonly<Record<string, string>>;

export interface CollectionDescriptor {
  /** Canonical identity of the effective request; equal descriptors share one request. */
  readonly key: string;
  /** Key under which the renderer looks up records (`collectionSourceKey`). */
  readonly sourceKey: string;
  readonly schemaName: string;
  readonly limit: number;
  readonly filters: readonly CollectionFilter[];
  /** Types that affect wire encoding, such as exact date equality. */
  readonly filterTypes?: CollectionFieldTypes;
  readonly sort?: CollectionSort;
}

export type CollectionPlan =
  | { ok: true; descriptor: CollectionDescriptor }
  | { ok: false; reason: string };

export interface PlannedRepeater {
  repeaterId: string;
  schemaName: string;
  requiresFieldTypes: boolean;
  sourceKey: string;
  plan: CollectionPlan;
}

type Scalar = string | number | boolean;

function fail(reason: string): CollectionPlan { return { ok: false, reason }; }

function scalarProblem(field: string, type: string, value: unknown): string | undefined {
  switch (type) {
    case "string":
    case "enum": {
      if (typeof value !== "string") return `Filter "${field}" needs a text value.`;
      if (value === "") return `Filter "${field}" cannot match an empty string.`;
      if (value.includes(",")) return `Filter "${field}" value "${value}" contains a comma, which the list parser would split.`;
      if (value !== value.trim()) return `Filter "${field}" value has leading or trailing whitespace the parser would strip.`;
      if (/^["']|["']$/.test(value)) return `Filter "${field}" value starts or ends with a quote the parser would strip.`;
      if (OPERATOR_PREFIX.test(value)) return `Filter "${field}" value "${value}" would be read as a comparison operator.`;
      return undefined;
    }
    case "date": {
      if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Filter "${field}" needs a date in YYYY-MM-DD format.`;
      const date = new Date(`${value}T00:00:00Z`);
      return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? undefined : `Filter "${field}" needs a valid calendar date.`;
    }
    case "int":
      return typeof value === "number" && Number.isSafeInteger(value) ? undefined : `Filter "${field}" needs a whole number.`;
    case "float":
    case "double":
      return typeof value === "number" && Number.isFinite(value) ? undefined : `Filter "${field}" needs a finite number.`;
    case "bool":
    case "boolean":
      return typeof value === "boolean" ? undefined : `Filter "${field}" needs true or false.`;
    default:
      return `Filter "${field}" has type "${type}", which cannot be filtered exactly.`;
  }
}

function encodeScalar(value: Scalar): string { return String(value); }

/** Wire value for one filter (already validated by `planCollection`). */
export function encodeFilterValue(filter: CollectionFilter, fieldType?: string): string {
  if (["gt", "gte", "lt", "lte"].includes(filter.operator) || (filter.operator === "eq" && fieldType === "date")) return `${filter.operator}-${String(filter.value)}`;
  return Array.isArray(filter.value) ? (filter.value as Scalar[]).map(encodeScalar).join(",") : encodeScalar(filter.value as Scalar);
}

/**
 * Normalises a repeater source into a request descriptor, or explains why it cannot execute.
 * Nothing is dropped silently: every unrepresentable clause makes the whole plan fail.
 */
export function planCollection(source: AutoTableCollectionSource, fieldTypes?: CollectionFieldTypes): CollectionPlan {
  if (typeof source.schemaName !== "string" || source.schemaName === "") return fail("Choose a data source (schema).");
  if (!Number.isInteger(source.limit) || source.limit < 1 || source.limit > COLLECTION_MAX_LIMIT) return fail(`Limit must be a whole number from 1 to ${COLLECTION_MAX_LIMIT}.`);
  const sorts = source.sort ?? [];
  if (sorts.length > 1) return fail("Only one sort field is supported.");
  const filters = source.filters ?? [];
  const grouped = new Map<string, CollectionFilter[]>();
  const filterTypes: Record<string, string> = {};
  const normalized: CollectionFilter[] = [];
  for (const filter of filters) {
    const { field } = filter;
    if (RESERVED_COLLECTION_FIELDS.has(field)) return fail(`"${field}" is a reserved request parameter and cannot be filtered.`);
    if (field.includes(".")) return fail(`Filter "${field}" targets a nested field; only top-level fields can be filtered.`);

    const type = fieldTypes?.[field];
    if (type === undefined) return fail(`Filter "${field}" needs field metadata that is not available.`);
    filterTypes[field] = type;
    const group = grouped.get(field) ?? [];
    group.push(filter);
    grouped.set(field, group);
    if (filter.operator === "eq" || ["gt", "gte", "lt", "lte"].includes(filter.operator)) {
      if (filter.operator !== "eq" && !["int", "float", "double", "date"].includes(type)) return fail(`Filter "${field}" comparisons require a number or date field.`);
      if (filter.value === null || Array.isArray(filter.value)) return fail(`Filter "${field}" needs one non-null value.`);
      const problem = scalarProblem(field, type, filter.value);
      if (problem) return fail(problem);
    } else if (filter.operator === "in") {
      if (type === "date") return fail(`Filter "${field}" does not support date lists. Use date bounds instead.`);
      if (!Array.isArray(filter.value) || filter.value.length === 0) return fail(`Filter "${field}" needs a non-empty list.`);
      const list = filter.value as unknown[];
      if (list.some((entry) => entry === null)) return fail(`Filter "${field}" list cannot contain null.`);
      if (new Set(list.map((entry) => typeof entry)).size > 1) return fail(`Filter "${field}" list mixes value types.`);
      for (const entry of list) {
        const problem = scalarProblem(field, type, entry);
        if (problem) return fail(problem);
      }
    } else return fail(`Filter "${field}" uses an unsupported operator.`);
    normalized.push(filter);
  }
  for (const [field, group] of grouped) {
    if (group.length < 2) continue;
    const lower = group.filter(filter => filter.operator === "gt" || filter.operator === "gte");
    const upper = group.filter(filter => filter.operator === "lt" || filter.operator === "lte");
    if (group.length !== 2 || lower.length !== 1 || upper.length !== 1) return fail(`Field "${field}" has more than one filter; use one lower and one upper bound for a range.`);
    const min = lower[0].value as number | string;
    const max = upper[0].value as number | string;
    if (min > max || (min === max && (lower[0].operator === "gt" || upper[0].operator === "lt"))) return fail(`Filter "${field}" range is empty or reversed.`);
  }
  normalized.sort((a, b) => a.field < b.field ? -1 : a.field > b.field ? 1 : a.operator < b.operator ? -1 : a.operator > b.operator ? 1 : 0);
  const orderedTypes = Object.fromEntries(normalized.map(filter => [filter.field, filterTypes[filter.field]]));
  const sort = sorts[0];
  if (sort && RESERVED_COLLECTION_FIELDS.has(sort.field)) return fail(`"${sort.field}" cannot be used as a sort field.`);
  const key = JSON.stringify({ schemaName: source.schemaName, limit: source.limit, filters: normalized, filterTypes: orderedTypes, sort: sort ?? null });
  return { ok: true, descriptor: { key, sourceKey: collectionSourceKey(source), schemaName: source.schemaName, limit: source.limit, filters: normalized, filterTypes: orderedTypes, ...(sort ? { sort } : {}) } };
}

export interface DocumentCollectionPlan {
  /** One entry per repeater in document order. */
  repeaters: PlannedRepeater[];
  /** Distinct executable descriptors, in first-seen order. */
  descriptors: CollectionDescriptor[];
}

/** Collects every repeater and plans it; repeaters nested inside another repeater never execute. */
export function planDocumentCollections(root: ComponentNode, fieldTypesBySchema?: Readonly<Record<string, CollectionFieldTypes | undefined>>): DocumentCollectionPlan {
  const repeaters: PlannedRepeater[] = [];
  const descriptors = new Map<string, CollectionDescriptor>();
  const visit = (node: ComponentNode, insideRepeater: boolean) => {
    let inside = insideRepeater;
    if (node.type === "repeater") {
      const containsRepeater = (child: ComponentNode): boolean => child.type === "repeater" || ("children" in child && child.children.some(containsRepeater));
      const plan: CollectionPlan = insideRepeater || node.children.some(containsRepeater)
        ? fail("Repeaters nested inside another repeater are not supported.")
        : planCollection(node.source, fieldTypesBySchema?.[node.source.schemaName]);
      repeaters.push({ repeaterId: node.id, schemaName: node.source.schemaName, requiresFieldTypes: Boolean(node.source.filters?.length), sourceKey: collectionSourceKey(node.source), plan });
      if (plan.ok && !descriptors.has(plan.descriptor.key)) descriptors.set(plan.descriptor.key, plan.descriptor);
      inside = true;
    }
    if ("children" in node) for (const child of node.children) visit(child, inside);
  };
  visit(root, false);
  return { repeaters, descriptors: [...descriptors.values()] };
}

/** Schemas whose repeaters carry filters and therefore need runtime field metadata. */
export function schemasNeedingFieldTypes(root: ComponentNode): string[] {
  const schemas = new Set<string>();
  const visit = (node: ComponentNode) => {
    if (node.type === "repeater" && (node.source.filters?.length ?? 0) > 0) schemas.add(node.source.schemaName);
    if ("children" in node) node.children.forEach(visit);
  };
  visit(root);
  return [...schemas];
}
