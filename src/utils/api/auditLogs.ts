import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FormElementsState } from "../../types";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";
import { useGet } from "./factory";

export interface AuditLog {
  _id: string;
  timestamp: string | Date;
  userId?: string;
  userEmail?: string;
  roles?: string[];
  schemaName?: string;
  documentIds?: string[];
  action: string;
  description?: string;
  before?: unknown;
  after?: unknown;
  ip?: string;
  userAgent?: string;
}

export interface PaginatedAuditLogsResponse {
  items: AuditLog[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface AuditLogsAuthorizationConfig {
  isAuthorized: boolean;
  authorizeRole: string[];
}

interface GeneralResponse<T> {
  status: number;
  message: string;
  data: T;
}

function useAuditLogsContext() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const tenantSlug = currentTenant?.slug;
  const projectSlug = currentProject?.slug;

  if (!tenantSlug || !projectSlug) {
    throw new Error("Audit logs require tenant and project context");
  }

  return { tenantSlug, projectSlug };
}

export function buildAuditLogsPath(
  tenantSlug: string,
  projectSlug: string,
  suffix = ""
) {
  return `/${tenantSlug}/${projectSlug}/audit-logs${suffix}`;
}

function buildQueryString(filters?: FormElementsState) {
  const parts: string[] = [];

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null && item !== "") {
              const trimmedItem =
                typeof item === "string" ? item.trim() : String(item);
              parts.push(`${key}=${encodeURIComponent(trimmedItem)}`);
            }
          });
        } else if (value instanceof Date) {
          parts.push(`${key}=${value.toISOString()}`);
        } else {
          const trimmedValue =
            typeof value === "string" ? value.trim() : String(value);
          parts.push(`${key}=${encodeURIComponent(trimmedValue)}`);
        }
      }
    });
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export function useGetAuditLogs(filters?: FormElementsState) {
  const { tenantSlug, projectSlug } = useAuditLogsContext();
  const path = buildAuditLogsPath(
    tenantSlug,
    projectSlug,
    buildQueryString(filters)
  );
  const queryKey = filters
    ? (["auditLogs", "all", tenantSlug, projectSlug, filters] as const)
    : (["auditLogs", "all", tenantSlug, projectSlug] as const);

  return useGet<AuditLog[]>(path, queryKey);
}

export function useGetPaginatedAuditLogs(
  page: number,
  limit: number,
  filters?: FormElementsState
) {
  const { tenantSlug, projectSlug } = useAuditLogsContext();
  const queryKey = [
    "auditLogs",
    "page",
    tenantSlug,
    projectSlug,
    { page, limit, filters },
  ] as const;

  const parts = [
    `page=${page}`,
    `limit=${limit}`,
    filters?.sort && `sort=${filters.sort}`,
    filters?.asc !== undefined && `asc=${filters.asc}`,
    filters?.search &&
      `search=${
        typeof filters.search === "string"
          ? filters.search.trim()
          : filters.search
      }`,
  ];

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (
        !["sort", "asc", "search"].includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null && item !== "") {
              const trimmedItem =
                typeof item === "string" ? item.trim() : String(item);
              parts.push(`${key}=${encodeURIComponent(trimmedItem)}`);
            }
          });
        } else if (value instanceof Date) {
          parts.push(`${key}=${value.toISOString()}`);
        } else {
          const trimmedValue =
            typeof value === "string" ? value.trim() : String(value);
          parts.push(`${key}=${encodeURIComponent(trimmedValue)}`);
        }
      }
    });
  }

  const queryString = parts.filter(Boolean).join("&");
  const url = buildAuditLogsPath(tenantSlug, projectSlug, `?${queryString}`);

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosClient.get<PaginatedAuditLogsResponse>(url);
      return response.data;
    },
  });
}

export function useAuditLogsAuthorizationConfig(enabled = true) {
  const { tenantSlug, projectSlug } = useAuditLogsContext();
  const path = buildAuditLogsPath(tenantSlug, projectSlug, "/config");

  return useQuery({
    queryKey: ["auditLogsConfig", tenantSlug, projectSlug],
    enabled: enabled && !!tenantSlug && !!projectSlug,
    queryFn: async () => {
      const response = await axiosClient.get<GeneralResponse<AuditLogsAuthorizationConfig>>(
        path
      );
      return response.data.data;
    },
  });
}

export function useUpdateAuditLogsAuthorizationConfig() {
  const { tenantSlug, projectSlug } = useAuditLogsContext();
  const queryClient = useQueryClient();
  const path = buildAuditLogsPath(tenantSlug, projectSlug, "/config");

  return useMutation({
    mutationFn: async (payload: AuditLogsAuthorizationConfig) => {
      const response = await axiosClient.patch<GeneralResponse<AuditLogsAuthorizationConfig>>(
        path,
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auditLogsConfig", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["auditLogs", "page", tenantSlug, projectSlug],
      });
      toast.success("Audit logs authorization updated");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update audit logs authorization";
      toast.error(errorMessage);
    },
  });
}
