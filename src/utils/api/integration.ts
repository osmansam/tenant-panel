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
  projectId?: string;
  scope?: "tenant" | "project";
  grantedProjectIds?: string[];
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

function useIntegrationContext(required = true) {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const tenantSlug = currentTenant?.slug;
  const projectSlug = currentProject?.slug;

  if (required && (!tenantSlug || !projectSlug)) {
    throw new Error("Integration credentials require a selected project");
  }

  return {
    tenantSlug: tenantSlug || "__disabled__",
    projectSlug: projectSlug || "__disabled__",
  };
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
  const { tenantSlug, projectSlug } = useIntegrationContext(enabled);
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

// Tenant identity is supplied by the tenant management session, never a project path.
const TENANT_EXTERNAL_API_PATH = "/tenant/integrations/external-api-credentials";
export function useTenantExternalAPICredentials(enabled = true) {
  const { currentTenant } = useTenant();
  return useQuery({
    queryKey: ["tenantExternalAPICredentials", currentTenant?.id || currentTenant?.slug],
    enabled: enabled && !!currentTenant,
    queryFn: async () => {
      const response = await axiosClient.get<GeneralResponse<{ credentials: ExternalAPICredential[] }>>(TENANT_EXTERNAL_API_PATH);
      return response.data.data?.credentials || [];
    },
  });
}
function useInvalidateExternalCredentials() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["tenantExternalAPICredentials"] });
    queryClient.invalidateQueries({ queryKey: ["externalAPICredentials"] });
  };
}
export function useCreateTenantExternalAPICredential() {
  const invalidate = useInvalidateExternalCredentials();
  return useMutation({
    mutationFn: async (payload: CreateExternalAPICredentialPayload) => {
      const response = await axiosClient.post<GeneralResponse<{ credential: ExternalAPICredential }>>(TENANT_EXTERNAL_API_PATH, payload);
      return response.data.data;
    },
    onSuccess: invalidate,
  });
}
export type TenantCredentialAction = {
  action: "promote" | "revoke" | "grant" | "disconnect";
  credentialId: string;
  projectId?: string;
};
export function useTenantExternalAPICredentialAction() {
  const invalidate = useInvalidateExternalCredentials();
  return useMutation({
    mutationFn: async ({ action, credentialId, projectId }: TenantCredentialAction) => {
      const base = `${TENANT_EXTERNAL_API_PATH}/${encodeURIComponent(credentialId)}`;
      if (action === "grant" || action === "disconnect") {
        if (!projectId) throw new Error("Choose a project");
        const path = `${base}/projects/${encodeURIComponent(projectId)}`;
        return action === "grant" ? axiosClient.put(path) : axiosClient.delete(path);
      }
      return axiosClient.post(`${base}/${action}`, {});
    },
    onSuccess: invalidate,
  });
}
export function isExternalAPICredentialUsable(credential: ExternalAPICredential) {
  return !credential.revokedAt && (!credential.expiresAt || credential.expiresAt === "0001-01-01T00:00:00Z" || new Date(credential.expiresAt).getTime() > Date.now());
}
export function externalAPIError(error: unknown, fallback: string): string {
  const failure = error as { response?: { data?: { data?: { error?: unknown }; message?: unknown; error?: unknown } }; message?: unknown } | null;
  const response = failure?.response?.data;
  const message = [response?.data?.error, response?.error, response?.message, failure?.message]
    .find((value): value is string => typeof value === "string" && !!value.trim());
  return message ? message.trim().slice(0, 1000) : fallback;
}
