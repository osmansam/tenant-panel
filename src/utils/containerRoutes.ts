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

const normalizeAccessRule = (
  rule: Record<string, any>,
): RecordAccessRule => {
  const field = rule.field ?? rule.Field;
  const context = rule.context ?? rule.Context;
  const value = Object.prototype.hasOwnProperty.call(rule, "value")
    ? rule.value
    : rule.Value;

  return {
    ...(field !== undefined ? { field } : {}),
    ...(context !== undefined ? { context } : {}),
    operator: rule.operator ?? rule.Operator ?? "eq",
    ...(value !== undefined ? { value: value as AccessValue } : {}),
  };
};

const normalizeRecordAccessPolicy = (
  policy: Record<string, any>,
): RecordAccessPolicy => {
  const assign = policy.assign ?? policy.Assign;
  const any = policy.any ?? policy.Any;

  return {
    ...(assign !== undefined
      ? { assign: { ...(assign as Record<string, AccessValue>) } }
      : {}),
    ...(Array.isArray(any) ? { any: any.map(normalizeAccessRule) } : {}),
  };
};

export function normalizeContainerRouteSpec(
  routeSpec: Record<string, any> = {},
): CanonicalContainerRouteSpec {
  const access = routeSpec.access ?? routeSpec.Access;

  return {
    isAuthenticated:
      routeSpec.isAuthenticated ?? routeSpec.IsAuthenticated ?? false,
    isAuthorized: routeSpec.isAuthorized ?? routeSpec.IsAuthorized ?? false,
    authorizeRole: routeSpec.authorizeRole ?? routeSpec.AuthorizeRole ?? [],
    isActive: routeSpec.isActive ?? routeSpec.IsActive ?? false,
    method: routeSpec.method ?? routeSpec.Method ?? "GET",
    ...(access !== undefined
      ? { access: normalizeRecordAccessPolicy(access) }
      : {}),
  };
}

export function normalizeContainerRoutes(
  routes: Record<string, any> = {},
): CanonicalContainerRoutes {
  return Object.fromEntries(
    Object.entries(routes).map(([routeName, routeSpec]) => [
      routeName,
      normalizeContainerRouteSpec(routeSpec),
    ]),
  );
}

export function updateContainerRouteSpec(
  routes: Record<string, any>,
  routeName: string,
  updates: Partial<CanonicalContainerRouteSpec>,
): CanonicalContainerRoutes {
  const normalizedRoutes = normalizeContainerRoutes(routes);

  return {
    ...normalizedRoutes,
    [routeName]: normalizeContainerRouteSpec({
      ...normalizeContainerRouteSpec(normalizedRoutes[routeName]),
      ...updates,
    }),
  };
}

export function toggleContainerRouteFlag(
  routes: Record<string, any>,
  routeName: string,
  flag: "isActive" | "isAuthenticated" | "isAuthorized",
  value: boolean,
): CanonicalContainerRoutes {
  return updateContainerRouteSpec(routes, routeName, { [flag]: value });
}
