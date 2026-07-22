import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";

export type IntegrationPermissionKind =
  | "dynamicRoute"
  | "workflow"
  | "api"
  | "pipeline";

export interface IntegrationPermission {
  kind: IntegrationPermissionKind;
  schemaName: string;
  route?: string;
  name?: string;
  method: string;
}

export interface IntegrationCredential {
  id: string;
  tenantId: string;
  projectId: string;
  name: string;
  permissions: IntegrationPermission[];
  expiresAt: string;
  revokedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string | null;
}

export interface CreateIntegrationCredentialPayload {
  name: string;
  permissions: IntegrationPermission[];
  expiresAt: string;
}

export type ExternalAPIAuthType = "bearer" | "header";

export interface ExternalAPICredential {
  id: string;
  tenantId: string;
  projectId: string;
  name: string;
  authType: ExternalAPIAuthType;
  headerName?: string;
  allowedDomains: string[];
  expiresAt?: string | null;
  revokedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string | null;
}

export interface ExternalAPICredentialFormValues {
  name: string;
  authType: ExternalAPIAuthType;
  headerName?: string;
  secret: string;
  allowedDomains: string;
  expiresAt?: string;
}

export interface CreateExternalAPICredentialPayload {
  name: string;
  authType: ExternalAPIAuthType;
  headerName?: string;
  secret: string;
  allowedDomains: string[];
  expiresAt?: string;
}

interface GeneralResponse<T> {
  status: number;
  message: string;
  data: T;
}

function useIntegrationContext() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const tenantSlug = currentTenant?.slug;
  const projectSlug = currentProject?.slug;

  if (!tenantSlug || !projectSlug) {
    throw new Error("Integration credentials require a selected project");
  }

  return { tenantSlug, projectSlug };
}

function buildIntegrationPath(tenantSlug: string, projectSlug: string) {
  return `/${tenantSlug}/${projectSlug}/integrations/credentials`;
}

export function buildExternalAPICredentialPath(
  tenantSlug: string,
  projectSlug: string
) {
  return `/${tenantSlug}/${projectSlug}/integrations/external-api-credentials`;
}

export function normalizeExternalAPICredentialPayload(
  values: ExternalAPICredentialFormValues
): CreateExternalAPICredentialPayload {
  const payload: CreateExternalAPICredentialPayload = {
    name: values.name.trim(),
    authType: values.authType,
    secret: values.secret.trim(),
    allowedDomains: values.allowedDomains
      .split(",")
      .map((domain) => domain.trim())
      .filter(Boolean),
  };

  if (values.authType === "header") {
    payload.headerName = values.headerName?.trim() || "";
  }
  if (values.expiresAt) {
    payload.expiresAt = new Date(values.expiresAt).toISOString();
  }

  return payload;
}

export function useIntegrationCredentials(enabled = true) {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const path = buildIntegrationPath(tenantSlug, projectSlug);

  return useQuery({
    queryKey: ["integrationCredentials", tenantSlug, projectSlug],
    enabled: enabled && !!tenantSlug && !!projectSlug,
    queryFn: async () => {
      const response = await axiosClient.get<
        GeneralResponse<{ credentials: IntegrationCredential[] }>
      >(path);
      return response.data.data?.credentials || [];
    },
  });
}

export function useCreateIntegrationCredential() {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const queryClient = useQueryClient();
  const path = buildIntegrationPath(tenantSlug, projectSlug);

  return useMutation({
    mutationFn: async (payload: CreateIntegrationCredentialPayload) => {
      const response = await axiosClient.post<
        GeneralResponse<{
          credential: IntegrationCredential;
          token: string;
        }>
      >(path, payload);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integrationCredentials", tenantSlug, projectSlug],
      });
      toast.success("Integration credential created");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create integration credential";
      toast.error(message);
    },
  });
}

export function useRevokeIntegrationCredential() {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const queryClient = useQueryClient();
  const basePath = buildIntegrationPath(tenantSlug, projectSlug);

  return useMutation({
    mutationFn: async (credentialId: string) => {
      const response = await axiosClient.post(
        `${basePath}/${credentialId}/revoke`,
        {}
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integrationCredentials", tenantSlug, projectSlug],
      });
      toast.success("Integration credential revoked");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to revoke integration credential";
      toast.error(message);
    },
  });
}

export function useExternalAPICredentials(enabled = true) {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const path = buildExternalAPICredentialPath(tenantSlug, projectSlug);

  return useQuery({
    queryKey: ["externalAPICredentials", tenantSlug, projectSlug],
    enabled: enabled && !!tenantSlug && !!projectSlug,
    queryFn: async () => {
      const response = await axiosClient.get<
        GeneralResponse<{ credentials: ExternalAPICredential[] }>
      >(path);
      return response.data.data?.credentials || [];
    },
  });
}

export function useCreateExternalAPICredential() {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const queryClient = useQueryClient();
  const path = buildExternalAPICredentialPath(tenantSlug, projectSlug);

  return useMutation({
    mutationFn: async (payload: CreateExternalAPICredentialPayload) => {
      const response = await axiosClient.post<
        GeneralResponse<{
          credential: ExternalAPICredential;
        }>
      >(path, payload);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["externalAPICredentials", tenantSlug, projectSlug],
      });
      toast.success("External API credential created");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create external API credential";
      toast.error(message);
    },
  });
}

export function useRevokeExternalAPICredential() {
  const { tenantSlug, projectSlug } = useIntegrationContext();
  const queryClient = useQueryClient();
  const basePath = buildExternalAPICredentialPath(tenantSlug, projectSlug);

  return useMutation({
    mutationFn: async (credentialId: string) => {
      const response = await axiosClient.post(
        `${basePath}/${credentialId}/revoke`,
        {}
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["externalAPICredentials", tenantSlug, projectSlug],
      });
      toast.success("External API credential revoked");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to revoke external API credential";
      toast.error(message);
    },
  });
}
