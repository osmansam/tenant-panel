import type {
  AccessValue,
  RecordAccessPolicy,
  RecordAccessRule,
} from "./api/container";

export interface CanonicalContainerRouteSpec {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean;
  method: string;
  access?: RecordAccessPolicy;
}

export type CanonicalContainerRoutes = Record<
  string,
  CanonicalContainerRouteSpec
>;

// Dynamic function execution is paused in the backend. Keep its saved route
// metadata, but exclude it from route displays and bulk permission changes.
export const isContainerRouteAvailable = (routeName: string): boolean =>
  routeName.toLowerCase() !== "executedynamiccode";

type UnknownRecord = Record<string, unknown>;

const asRecord = (value: unknown): UnknownRecord =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};

const asString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const asBoolean = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;

const asStringArray = (value: unknown): string[] | undefined =>
  Array.isArray(value) ? value.map((item) => String(item)) : undefined;

const normalizeAccessRule = (
  rule: UnknownRecord,
): RecordAccessRule => {
  const field = asString(rule.field ?? rule.Field);
  const context = asString(rule.context ?? rule.Context);
  const value = Object.prototype.hasOwnProperty.call(rule, "value")
    ? rule.value
    : rule.Value;
  const operator = asString(rule.operator ?? rule.Operator) ?? "eq";

  return {
    ...(field !== undefined ? { field } : {}),
    ...(context !== undefined ? { context } : {}),
    operator,
    ...(value !== undefined ? { value: value as AccessValue } : {}),
  };
};

const normalizeRecordAccessPolicy = (
  policy: UnknownRecord,
): RecordAccessPolicy => {
  const assign = policy.assign ?? policy.Assign;
  const any = policy.any ?? policy.Any;

  return {
    ...(assign !== undefined
      ? { assign: { ...(assign as Record<string, AccessValue>) } }
      : {}),
    ...(Array.isArray(any)
      ? { any: any.map((item) => normalizeAccessRule(asRecord(item))) }
      : {}),
  };
};

export function normalizeContainerRouteSpec(
  routeSpec: UnknownRecord = {},
): CanonicalContainerRouteSpec {
  const access = routeSpec.access ?? routeSpec.Access;

  return {
    isAuthenticated:
      asBoolean(routeSpec.isAuthenticated ?? routeSpec.IsAuthenticated) ?? false,
    isAuthorized:
      asBoolean(routeSpec.isAuthorized ?? routeSpec.IsAuthorized) ?? false,
    authorizeRole:
      asStringArray(routeSpec.authorizeRole ?? routeSpec.AuthorizeRole) ?? [],
    isActive: asBoolean(routeSpec.isActive ?? routeSpec.IsActive) ?? false,
    method: asString(routeSpec.method ?? routeSpec.Method) ?? "GET",
    ...(access !== undefined
      ? { access: normalizeRecordAccessPolicy(asRecord(access)) }
      : {}),
  };
}

export function normalizeContainerRoutes(
  routes: UnknownRecord = {},
): CanonicalContainerRoutes {
  return Object.fromEntries(
    Object.entries(routes).map(([routeName, routeSpec]) => [
      routeName,
      normalizeContainerRouteSpec(asRecord(routeSpec)),
    ]),
  );
}

export function updateContainerRouteSpec(
  routes: UnknownRecord,
  routeName: string,
  updates: Partial<CanonicalContainerRouteSpec>,
): CanonicalContainerRoutes {
  const normalizedRoutes = normalizeContainerRoutes(routes);

  return {
    ...normalizedRoutes,
    [routeName]: normalizeContainerRouteSpec({
      ...normalizeContainerRouteSpec(asRecord(normalizedRoutes[routeName])),
      ...updates,
    }),
  };
}

export function toggleContainerRouteFlag(
  routes: UnknownRecord,
  routeName: string,
  flag: "isActive" | "isAuthenticated" | "isAuthorized",
  value: boolean,
): CanonicalContainerRoutes {
  return updateContainerRouteSpec(routes, routeName, { [flag]: value });
}
