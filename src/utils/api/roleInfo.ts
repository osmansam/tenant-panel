import { useQuery } from "@tanstack/react-query";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";

/**
 * Role item structure
 */
export interface RoleItem {
  _id: string;
  name: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Response structure for role items endpoints
 */
export interface RoleItemsResponse {
  status: number;
  message: string;
  data: {
    items?: RoleItem[];
  };
}

export interface RoleItemResponse {
  status: number;
  message: string;
  data: {
    item?: RoleItem;
  };
}

/**
 * Fetch all role items from the role schema collection
 * Endpoint: GET /:tenantSlug/:projectSlug/roles
 * Requires: admin or developer role
 */
export async function getRoleItems(
  tenantSlug: string,
  projectSlug: string
): Promise<RoleItem[]> {
  const { data } = await axiosClient.get<RoleItemsResponse>(
    `/${tenantSlug}/${projectSlug}/roles`
  );

  if (!data.data.items) {
    throw new Error("Role items not found");
  }

  return data.data.items;
}

/**
 * Fetch a single role item by ID
 * Endpoint: GET /:tenantSlug/:projectSlug/roles/:id
 * Requires: admin or developer role
 */
export async function getRoleItemById(
  tenantSlug: string,
  projectSlug: string,
  id: string
): Promise<RoleItem> {
  const { data } = await axiosClient.get<RoleItemResponse>(
    `/${tenantSlug}/${projectSlug}/roles/${id}`
  );

  if (!data.data.item) {
    throw new Error("Role item not found");
  }

  return data.data.item;
}

/**
 * React Query hook to fetch all role items
 * Automatically uses current tenant and project context
 */
export function useRoleItems(enabled: boolean = true) {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  return useQuery({
    queryKey: ["roleItems", currentTenant?.slug, currentProject?.slug],
    queryFn: () => {
      if (!currentTenant?.slug || !currentProject?.slug) {
        throw new Error("Tenant and project context required");
      }
      return getRoleItems(currentTenant.slug, currentProject.slug);
    },
    enabled: enabled && !!currentTenant?.slug && !!currentProject?.slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * React Query hook to fetch a single role item by ID
 * Automatically uses current tenant and project context
 */
export function useRoleItem(id: string, enabled: boolean = true) {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  return useQuery({
    queryKey: ["roleItem", currentTenant?.slug, currentProject?.slug, id],
    queryFn: () => {
      if (!currentTenant?.slug || !currentProject?.slug) {
        throw new Error("Tenant and project context required");
      }
      return getRoleItemById(currentTenant.slug, currentProject.slug, id);
    },
    enabled: enabled && !!currentTenant?.slug && !!currentProject?.slug && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
