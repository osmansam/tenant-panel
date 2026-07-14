// Enums matching backend
export enum MembershipStatus {
  INVITED = "invited",
  ACTIVE = "active",
  DISABLED = "disabled",
}

export enum RoleScope {
  TENANT = "tenant",
  PROJECT = "project",
}

export enum InviteScope {
  TENANT = "tenant",
  PROJECT = "project",
}

// Tenant role constants
export const TenantRoles = {
  OWNER: "tenant_owner",
  ADMIN: "tenant_admin",
  BILLING: "tenant_billing",
  AUDITOR: "tenant_auditor",
} as const;

// Project role constants
export const ProjectRoles = {
  ADMIN: "project_admin",
  DEVELOPER: "project_developer",
  EDITOR: "project_editor",
  VIEWER: "project_viewer",
  SUPPORT: "project_support",
} as const;

// Core types matching backend models
export type User = {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Frontend-specific fields for auth context
  _id?: string; // For backward compatibility
  role?: string; // Current primary role for display
  tenantId?: string;
  tenantName?: string;
  tenantSlug?: string;
  projectId?: string;
  projectName?: string;
  projectSlug?: string;
  roles?: string[];
  roleScope?: "tenant" | "project";
  allTenants?: Tenant[];
  [key: string]: any;
};

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  ownerUserId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  tenantId: string;
  tenantSlug: string;
  name: string;
  slug: string;
  isActive: boolean;
  isTemplate?: boolean;
  templateScope?: "tenant" | "global";
  templateIncludeItems?: boolean;
  templateDescription?: string;
  createdAt: string;
  updatedAt: string;
};

export type Role = {
  id: string;
  scope: RoleScope;
  key: string;
  displayName: string;
  description?: string;
  tenantId?: string;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TenantMembership = {
  id: string;
  tenantId: string;
  userId: string;
  roles: string[];
  status: MembershipStatus;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectMembership = {
  id: string;
  tenantId: string;
  projectId: string;
  userId: string;
  roles: string[];
  status: MembershipStatus;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type Invite = {
  id: string;
  scope: InviteScope;
  tenantId: string;
  projectId?: string;
  email: string;
  rolesToAssign: string[];
  status: MembershipStatus;
  expiresAt: string;
  createdBy: string;
  acceptedBy?: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContainerScope = {
  tenantId: string;
  projectId: string;
};

export enum RowPerPageEnum {
  FIRST = 10,
  SECOND = 20,
  THIRD = 50,
  ALL = 10000000000,
}

export enum DateFormatEnum {
  "MM/DD/YYYY" = "MM/DD/YYYY",
  "DD/MM/YYYY" = "DD/MM/YYYY",
  "YYYY/MM/DD" = "YYYY/MM/DD",
  "DD-MM-YYYY" = "DD-MM-YYYY",
  "MM-DD-YYYY" = "MM-DD-YYYY",
  "YYYY-MM-DD" = "YYYY-MM-DD",
}

export const DEFAULT_DATE_FORMAT = DateFormatEnum["MM-DD-YYYY"];

export const NUMBER_FILTER_OPERATORS = [
  { value: "=", label: "=" },
  { value: "gte", label: ">=" },
  { value: "gt", label: ">" },
  { value: "lte", label: "<=" },
  { value: "lt", label: "<" },
] as const;

export const NO_IMAGE_URL =
  "https://res.cloudinary.com/dvbg/image/upload/ar_4:4,c_crop/c_fit,h_100/davinci/no-image_pyet1d.jpg";

// Type for form element values - covers all possible form input types
export type FormElementValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | Record<string, unknown>
  | Record<string, unknown>[]
  | Date
  | File
  | null
  | undefined;

export type FormElementsState = {
  [key: string]: FormElementValue;
};

export interface OptionType {
  value: string | number;
  label: string;
  imageUrl?: string;
  bgColor?: string;
  textColor?: string;
  sourceItem?: Record<string, unknown>;
  [key: string]: string | number | boolean | Record<string, unknown> | undefined;
}
