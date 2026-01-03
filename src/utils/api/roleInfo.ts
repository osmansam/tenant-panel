import { useQuery } from "@tanstack/react-query";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";
import type { ContainerModel, Field } from "./container";

/**
 * Response structure for role schema endpoints
 */
export interface RoleSchemaResponse {
  status: number;
  message: string;
  data: {
    schema?: ContainerModel;
  };
}

export interface RoleSchemaFieldsResponse {
  status: number;
  message: string;
  data: {
    fields?: Field[];
  };
}

/**
 * Fetch full role schema/container information
 * Endpoint: GET /:tenantSlug/:projectSlug/role-schema
 * Requires: admin or developer role
 */
export async function getRoleSchemaInfo(
  tenantSlug: string,
  projectSlug: string
): Promise<ContainerModel> {
  const { data } = await axiosClient.get<RoleSchemaResponse>(
    `/${tenantSlug}/${projectSlug}/role-schema`
  );

  if (!data.data.schema) {
    throw new Error("Role schema not found");
  }

  return data.data.schema;
}

/**
 * Fetch only the fields for role schema
 * Endpoint: GET /api/v1/:tenantSlug/:projectSlug/role-schema/fields
 * Requires: admin or developer role
 */
export async function getRoleSchemaFields(
  tenantSlug: string,
  projectSlug: string
): Promise<Field[]> {
  const { data } = await axiosClient.get<RoleSchemaFieldsResponse>(
    `/api/v1/${tenantSlug}/${projectSlug}/role-schema/fields`
  );

  if (!data.data.fields) {
    throw new Error("Role schema fields not found");
  }

  return data.data.fields;
}

/**
 * React Query hook to fetch role schema information
 * Automatically uses current tenant and project context
 */
export function useRoleSchema(enabled: boolean = true) {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  return useQuery({
    queryKey: ["roleSchema", currentTenant?.slug, currentProject?.slug],
    queryFn: () => {
      if (!currentTenant?.slug || !currentProject?.slug) {
        throw new Error("Tenant and project context required");
      }
      return getRoleSchemaInfo(currentTenant.slug, currentProject.slug);
    },
    enabled: enabled && !!currentTenant?.slug && !!currentProject?.slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * React Query hook to fetch role schema fields
 * Automatically uses current tenant and project context
 */
export function useRoleSchemaFields(enabled: boolean = true) {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  return useQuery({
    queryKey: ["roleSchemaFields", currentTenant?.slug, currentProject?.slug],
    queryFn: () => {
      if (!currentTenant?.slug || !currentProject?.slug) {
        throw new Error("Tenant and project context required");
      }
      return getRoleSchemaFields(currentTenant.slug, currentProject.slug);
    },
    enabled: enabled && !!currentTenant?.slug && !!currentProject?.slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
