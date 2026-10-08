import type {
  AccessValue,
  Field,
  RecordAccessPolicy,
  RecordAccessRule,
} from "../../utils/api/container";

const RECORD_ACCESS_ROUTES = new Set([
  "createdynamicmodelitem",
  "createmultipledynamicmodelitem",
  "getalldynamicmodelitems",
  "getalldynamicmodelitemswithpagination",
  "handlesearchdynamicmodelitem",
  "handlefilterdynamicmodelitem",
  "deletedynamicmodelitem",
  "updatedynamicmodelitem",
  "updatemultipledynamicmodelitem",
  "getdynamicmodelitem",
  "deletemultipledynamicmodelitem",
  "exportdynamicmodelitems",
  "getitemsforselection",
]);

const ASSIGNMENT_ROUTES = new Set([
  "createdynamicmodelitem",
  "createmultipledynamicmodelitem",
]);

export const AUTH_CONTEXT_OPTIONS = [
  "{{auth.tenant.id}}",
  "{{auth.project.id}}",
  "{{auth.schema}}",
  "{{auth.operation}}",
  "{{auth.identity.kind}}",
  "{{auth.user.id}}",
  "{{auth.user._id}}",
  "{{auth.user.role}}",
  "{{auth.user.roles}}",
] as const;

const userFieldContextOptions = (fields: Field[], prefix = ""): string[] =>
  fields.flatMap((field) => {
    if (field.isHashed) return [];
    const path = prefix ? `${prefix}.${field.name}` : field.name;
    const own = `{{auth.user.${path}}}`;
    return [own, ...userFieldContextOptions(field.children ?? [], path)];
  });

export const authContextOptions = (userFields: Field[] = []) =>
  Array.from(
    new Set<string>([
      ...AUTH_CONTEXT_OPTIONS,
      ...userFieldContextOptions(userFields),
    ]),
  );

export const RECORD_ACCESS_OPERATORS = ["eq", "ne", "in", "nin"] as const;

const normalizedRouteName = (routeName: string) =>
  routeName.replace(/[^a-z0-9]/gi, "").toLowerCase();

export const isRecordAccessRoute = (routeName: string) =>
  RECORD_ACCESS_ROUTES.has(normalizedRouteName(routeName));

export const routeAllowsAssignments = (routeName: string) =>
  ASSIGNMENT_ROUTES.has(normalizedRouteName(routeName));

export const assignmentFieldOptions = (fields: Field[]) =>
  fields.filter((field) => {
    const name = field.name.trim().toLowerCase();
    return (
      name !== "id" &&
      name !== "_id" &&
      !field.isHashed &&
      !field.equation?.trim()
    );
  });

export const recordRuleFieldOptions = (fields: Field[]) =>
  fields.filter((field) => {
    const name = field.name.trim().toLowerCase();
    return name !== "id" && name !== "_id";
  });

export function parseAccessValue(input: string): AccessValue {
  const value = input.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value !== "" && Number.isFinite(Number(value))) return Number(value);
  if (value.startsWith("[") || value.startsWith("{")) {
    try {
      return JSON.parse(value) as AccessValue;
    } catch {
      return input;
    }
  }
  return input;
}

export const formatAccessValue = (value: AccessValue | undefined) => {
  if (value === undefined) return "";
  if (Array.isArray(value) || (value !== null && typeof value === "object")) {
    return JSON.stringify(value);
  }
  return String(value);
};

export function validateRecordAccessPolicy(
  policy: RecordAccessPolicy | undefined,
  fields: Field[],
  allowAssignments: boolean,
  contextOptions: readonly string[] = AUTH_CONTEXT_OPTIONS,
): string[] {
  const errors: string[] = [];
  const assignments = Object.entries(policy?.assign ?? {});
  const rules = policy?.any ?? [];
  const fieldNames = new Set(fields.map((field) => field.name));
  const assignableNames = new Set(
    assignmentFieldOptions(fields).map((field) => field.name),
  );

  if (assignments.length === 0 && rules.length === 0) {
    errors.push("Add at least one assignment or allow rule");
  }
  if (!allowAssignments && assignments.length > 0) {
    errors.push("Trusted assignments are supported only for create routes");
  }
  assignments.forEach(([field, value], index) => {
    if (!assignableNames.has(field)) {
      errors.push(`Assignment ${index + 1}: select an eligible field`);
    }
    if (value === undefined || value === "") {
      errors.push(`Assignment ${index + 1}: value is required`);
    }
    if (
      typeof value === "string" &&
      value.includes("{{") &&
      !contextOptions.includes(value)
    ) {
      errors.push(`Assignment ${index + 1}: select an approved auth value`);
    }
  });

  rules.forEach((rule, index) => {
    const label = `Rule ${index + 1}`;
    if (!!rule.field === !!rule.context) {
      errors.push(`${label}: select exactly one record field or auth context`);
    } else if (rule.field && !fieldNames.has(rule.field)) {
      errors.push(`${label}: select an existing record field`);
    } else if (rule.context && !contextOptions.includes(rule.context)) {
      errors.push(`${label}: select an approved auth context`);
    }
    if (!(RECORD_ACCESS_OPERATORS as readonly string[]).includes(rule.operator)) {
      errors.push(`${label}: select a supported operator`);
    }
    if (rule.value === undefined || rule.value === "") {
      errors.push(`${label}: value is required`);
    } else if (
      (rule.operator === "in" || rule.operator === "nin") &&
      !Array.isArray(rule.value) &&
      !(
        typeof rule.value === "string" &&
        rule.value.startsWith("{{auth.user.") &&
        contextOptions.includes(rule.value)
      )
    ) {
      errors.push(`${label}: ${rule.operator} requires a JSON array or array auth value`);
    } else if (
      typeof rule.value === "string" &&
      rule.value.includes("{{") &&
      !contextOptions.includes(rule.value)
    ) {
      errors.push(`${label}: select an approved auth value`);
    }
  });
  return errors;
}

export function normalizeRecordAccessPolicy(
  policy: RecordAccessPolicy | undefined,
): RecordAccessPolicy | undefined {
  if (!policy) return undefined;
  const assign = Object.fromEntries(
    Object.entries(policy.assign ?? {}).filter(([field]) => field.trim() !== ""),
  );
  const any = (policy.any ?? []).map(
    (rule): RecordAccessRule => ({
      ...(rule.field ? { field: rule.field } : {}),
      ...(rule.context ? { context: rule.context } : {}),
      operator: rule.operator,
      ...(rule.value !== undefined ? { value: rule.value } : {}),
    }),
  );
  if (Object.keys(assign).length === 0 && any.length === 0) return undefined;
  return {
    ...(Object.keys(assign).length > 0 ? { assign } : {}),
    ...(any.length > 0 ? { any } : {}),
  };
}

export function summarizeRecordAccessPolicy(policy: RecordAccessPolicy | undefined) {
  const assignments = Object.keys(policy?.assign ?? {}).length;
  const rules = policy?.any?.length ?? 0;
  if (assignments === 0 && rules === 0) return "No policy";
  const describeValue = (value: AccessValue | undefined) => {
    const labels: Record<string, string> = {
      "{{auth.user.id}}": "current user ID",
      "{{auth.user._id}}": "current user ID",
      "{{auth.user.role}}": "user role",
      "{{auth.user.roles}}": "user roles",
      "{{auth.identity.kind}}": "identity kind",
      "{{auth.tenant.id}}": "tenant ID",
      "{{auth.project.id}}": "project ID",
      "{{auth.schema}}": "schema",
      "{{auth.operation}}": "operation",
    };
    if (typeof value === "string") {
      return (
        labels[value] ??
        value.replace(/^{{auth\.user\./, "user ").replace(/}}$/, "")
      );
    }
    return JSON.stringify(value);
  };
  const operatorLabels: Record<string, string> = {
    eq: "equals",
    ne: "does not equal",
    in: "is in",
    nin: "is not in",
  };
  const parts: string[] = [];
  if (assignments > 0) {
    parts.push(
      Object.entries(policy?.assign ?? {})
        .map(([field, value]) => `Set ${field} = ${describeValue(value)}`)
        .join(", "),
    );
  }
  if (rules > 0) {
    parts.push(
      `Allow ${(policy?.any ?? [])
        .map((rule) => {
          const left = rule.field ?? describeValue(rule.context);
          return `${left} ${operatorLabels[rule.operator] ?? rule.operator} ${describeValue(rule.value)}`;
        })
        .join(" OR ")}`,
    );
  }
  return parts.join(" · ");
}
