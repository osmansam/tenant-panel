import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BrandingAssetSlot,
  BrandingManagementResponse,
  BrandingPatch,
} from "../../types/branding";
import { axiosClient } from "./axiosClient";

export type BrandingScope = "tenant" | "project";

export function brandingQueryKey(scope: BrandingScope, id: string) {
  return ["branding", scope, id] as const;
}

export function normalizeBrandingResponse(
  value:
    | BrandingManagementResponse
    | { data: BrandingManagementResponse },
): BrandingManagementResponse {
  return "effective" in value ? value : value.data;
}

function brandingPath(scope: BrandingScope, projectId?: string) {
  return scope === "tenant"
    ? "/tenant/branding"
    : `/tenant/projects/${projectId}/branding`;
}

async function fetchBranding(
  scope: BrandingScope,
  projectId?: string,
): Promise<BrandingManagementResponse> {
  const response = await axiosClient.get(brandingPath(scope, projectId));
  return normalizeBrandingResponse(response.data.data || response.data);
}

export function useTenantBranding(tenantId: string) {
  return useQuery({
    queryKey: brandingQueryKey("tenant", tenantId),
    queryFn: () => fetchBranding("tenant"),
    enabled: Boolean(tenantId),
  });
}

export function useProjectBranding(projectId: string) {
  return useQuery({
    queryKey: brandingQueryKey("project", projectId),
    queryFn: () => fetchBranding("project", projectId),
    enabled: Boolean(projectId),
  });
}

export function usePatchBranding(
  scope: BrandingScope,
  id: string,
  projectId?: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch: BrandingPatch) => {
      const response = await axiosClient.patch(
        brandingPath(scope, projectId),
        patch,
      );
      return normalizeBrandingResponse(response.data.data || response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandingQueryKey(scope, id) });
      if (scope === "tenant") {
        queryClient.invalidateQueries({ queryKey: ["branding", "project"] });
      }
    },
  });
}

export function useUploadBrandingAsset(
  scope: BrandingScope,
  id: string,
  projectId?: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slot, file }: { slot: BrandingAssetSlot; file: File }) => {
      const body = new FormData();
      body.append("file", file);
      const response = await axiosClient.post(
        `${brandingPath(scope, projectId)}/assets/${slot}`,
        body,
      );
      return normalizeBrandingResponse(response.data.data || response.data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: brandingQueryKey(scope, id) }),
  });
}

export function useResetBrandingAsset(
  scope: BrandingScope,
  id: string,
  projectId?: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slot: BrandingAssetSlot) => {
      const response = await axiosClient.delete(
        `${brandingPath(scope, projectId)}/assets/${slot}`,
      );
      return normalizeBrandingResponse(response.data.data || response.data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: brandingQueryKey(scope, id) }),
  });
}
