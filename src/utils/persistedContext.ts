import type { Project, Tenant, User } from "../types";

function discardStoredRecord(key: string) {
  try { localStorage.removeItem(key); } catch { /* Storage may be unavailable. */ }
}

function readStoredRecord(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  } catch { /* Recover from stale or malformed local cache data. */ }
  discardStoredRecord(key);
  return null;
}

const isWorkspaceRecord = (value: Record<string, unknown>) =>
  typeof value.id === "string" && typeof value.name === "string" && typeof value.slug === "string";

export function readStoredUser(): User | undefined {
  const value = readStoredRecord("user");
  if (!value) return undefined;
  const validRoles = value.roles === undefined || (Array.isArray(value.roles) && value.roles.every((role) => typeof role === "string"));
  const validTenants = value.allTenants === undefined || (Array.isArray(value.allTenants) && value.allTenants.every((tenant) => tenant && typeof tenant === "object" && isWorkspaceRecord(tenant as Record<string, unknown>)));
  if (typeof value.email !== "string" || !validRoles || !validTenants) {
    discardStoredRecord("user");
    return undefined;
  }
  return { ...value, _id: value._id || value.id } as User;
}

export function readStoredTenant(): Tenant | null {
  const value = readStoredRecord("currentTenant");
  if (value && isWorkspaceRecord(value)) return value as Tenant;
  if (value) discardStoredRecord("currentTenant");
  return null;
}

export function readStoredProject(): Project | null {
  const value = readStoredRecord("currentProject");
  if (value && isWorkspaceRecord(value)) return value as Project;
  if (value) discardStoredRecord("currentProject");
  return null;
}
