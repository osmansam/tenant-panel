export type ManagementPermission =
  | "project.config.read"
  | "project.schema.write"
  | "project.schema.delete"
  | "project.cache.reset"
  | "project.page.write"
  | "project.page.delete"
  | "project.roles.read"
  | "project.import"
  | "project.integrations.read"
  | "project.integrations.manage"
  | "project.localization.read"
  | "project.localization.manage"
  | "project.branding.read"
  | "project.branding.manage"
  | "project.audit.read"
  | "project.audit.configure"
  | "tenant.projects.read"
  | "tenant.projects.create"
  | "tenant.projects.update"
  | "tenant.projects.delete"
  | "tenant.integrations.read"
  | "tenant.integrations.manage"
  | "tenant.branding.read"
  | "tenant.branding.manage";

const permissionRoles: Record<ManagementPermission, readonly string[]> = {
  "project.config.read": ["project_admin", "project_developer", "project_editor", "project_viewer", "project_support"],
  "project.schema.write": ["project_admin", "project_developer"],
  "project.schema.delete": ["project_admin"],
  "project.cache.reset": ["project_admin"],
  "project.page.write": ["project_admin", "project_developer", "project_editor"],
  "project.page.delete": ["project_admin"],
  "project.roles.read": ["project_admin", "project_developer"],
  "project.import": ["project_admin", "project_developer"],
  "project.integrations.read": ["project_admin", "project_developer"],
  "project.integrations.manage": ["project_admin", "project_developer"],
  "project.localization.read": ["project_admin", "project_developer", "project_editor", "project_viewer", "project_support"],
  "project.localization.manage": ["project_admin", "project_developer", "project_editor"],
  "project.branding.read": ["project_admin", "project_developer", "project_editor", "project_viewer", "project_support"],
  "project.branding.manage": ["project_admin"],
  "project.audit.read": ["project_admin", "project_developer", "project_support"],
  "project.audit.configure": ["project_admin", "project_developer"],
  "tenant.projects.read": ["tenant_owner", "tenant_admin", "tenant_billing", "tenant_auditor"],
  "tenant.projects.create": ["tenant_owner", "tenant_admin"],
  "tenant.projects.update": ["tenant_owner", "tenant_admin"],
  "tenant.projects.delete": ["tenant_owner"],
  "tenant.integrations.read": ["tenant_owner", "tenant_admin"],
  "tenant.integrations.manage": ["tenant_owner", "tenant_admin"],
  "tenant.branding.read": ["tenant_owner", "tenant_admin", "tenant_billing", "tenant_auditor"],
  "tenant.branding.manage": ["tenant_owner", "tenant_admin"],
};

export function hasManagementPermission(
  roles: readonly string[] | undefined,
  permission: ManagementPermission,
): boolean {
  if (!roles?.length) return false;
  return permissionRoles[permission].some((role) => roles.includes(role));
}
