const roleLabels: Record<string, string> = {
  tenant_owner: "Tenant owner",
  tenant_admin: "Tenant administrator",
  tenant_billing: "Billing manager",
  tenant_auditor: "Tenant auditor",
  tenant_viewer: "Tenant viewer",
  project_admin: "Project administrator",
  project_developer: "Project developer",
  project_editor: "Project editor",
  project_viewer: "Project viewer",
  project_support: "Project support",
  user: "Member",
};

export const getRoleLabel = (role: string) => roleLabels[role] || role;
