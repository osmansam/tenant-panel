import {
  MembershipStatus,
  ProjectRoles,
  RoleScope,
  TenantRoles,
} from "../types";

/**
 * Utility functions for role and permission management
 */

// Role validation helpers
export const isTenantRole = (role: string): boolean => {
  return Object.values(TenantRoles).includes(role as any);
};

export const isProjectRole = (role: string): boolean => {
  return Object.values(ProjectRoles).includes(role as any);
};

export const isSystemRole = (role: string): boolean => {
  return isTenantRole(role) || isProjectRole(role);
};

// Permission helpers
export const hasRole = (userRoles: string[], targetRole: string): boolean => {
  return userRoles.includes(targetRole);
};

export const hasAnyRole = (
  userRoles: string[],
  targetRoles: string[]
): boolean => {
  return targetRoles.some((role) => userRoles.includes(role));
};

export const hasAllRoles = (
  userRoles: string[],
  targetRoles: string[]
): boolean => {
  return targetRoles.every((role) => userRoles.includes(role));
};

// Tenant permission helpers
export const isTenantOwner = (userRoles: string[]): boolean => {
  return hasRole(userRoles, TenantRoles.OWNER);
};

export const isTenantAdmin = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [TenantRoles.OWNER, TenantRoles.ADMIN]);
};

export const canManageTenant = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [TenantRoles.OWNER, TenantRoles.ADMIN]);
};

export const canViewTenantBilling = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [
    TenantRoles.OWNER,
    TenantRoles.ADMIN,
    TenantRoles.BILLING,
  ]);
};

export const canViewTenantAudit = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [
    TenantRoles.OWNER,
    TenantRoles.ADMIN,
    TenantRoles.AUDITOR,
  ]);
};

// Project permission helpers
export const isProjectAdmin = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [ProjectRoles.ADMIN]);
};

export const canManageProject = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [ProjectRoles.ADMIN]);
};

export const canEditProject = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [
    ProjectRoles.ADMIN,
    ProjectRoles.DEVELOPER,
    ProjectRoles.EDITOR,
  ]);
};

export const canViewProject = (userRoles: string[]): boolean => {
  return hasAnyRole(userRoles, [
    ProjectRoles.ADMIN,
    ProjectRoles.DEVELOPER,
    ProjectRoles.EDITOR,
    ProjectRoles.VIEWER,
    ProjectRoles.SUPPORT,
  ]);
};

// Role display helpers
export const getRoleDisplayName = (role: string): string => {
  const roleMap: Record<string, string> = {
    [TenantRoles.OWNER]: "Owner",
    [TenantRoles.ADMIN]: "Admin",
    [TenantRoles.BILLING]: "Billing Manager",
    [TenantRoles.AUDITOR]: "Auditor",
    [ProjectRoles.ADMIN]: "Project Admin",
    [ProjectRoles.DEVELOPER]: "Developer",
    [ProjectRoles.EDITOR]: "Editor",
    [ProjectRoles.VIEWER]: "Viewer",
    [ProjectRoles.SUPPORT]: "Support",
  };

  return roleMap[role] || role;
};

export const getRoleScope = (role: string): RoleScope | null => {
  if (isTenantRole(role)) return RoleScope.TENANT;
  if (isProjectRole(role)) return RoleScope.PROJECT;
  return null;
};

// Role hierarchy helpers
export const getTenantRoleHierarchy = (): string[] => {
  return [
    TenantRoles.OWNER,
    TenantRoles.ADMIN,
    TenantRoles.BILLING,
    TenantRoles.AUDITOR,
  ];
};

export const getProjectRoleHierarchy = (): string[] => {
  return [
    ProjectRoles.ADMIN,
    ProjectRoles.DEVELOPER,
    ProjectRoles.EDITOR,
    ProjectRoles.VIEWER,
    ProjectRoles.SUPPORT,
  ];
};

// Membership status helpers
export const isActiveMembership = (status: MembershipStatus): boolean => {
  return status === MembershipStatus.ACTIVE;
};

export const isInvitedMembership = (status: MembershipStatus): boolean => {
  return status === MembershipStatus.INVITED;
};

export const isDisabledMembership = (status: MembershipStatus): boolean => {
  return status === MembershipStatus.DISABLED;
};

export const getMembershipStatusDisplay = (
  status: MembershipStatus
): string => {
  const statusMap: Record<MembershipStatus, string> = {
    [MembershipStatus.ACTIVE]: "Active",
    [MembershipStatus.INVITED]: "Invited",
    [MembershipStatus.DISABLED]: "Disabled",
  };

  return statusMap[status] || status;
};
