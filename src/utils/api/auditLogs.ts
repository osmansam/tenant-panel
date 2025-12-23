import { FormElementsState } from "../../types";
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

const AUDIT_BASE = "/audit-logs";

/**
 * Hook to fetch audit logs with optional filters
 * @param filters - Optional filters for the audit logs (e.g., action, userEmail, schemaName, date ranges)
 * @returns Query result with audit logs data
 */
export function useGetAuditLogs(filters?: FormElementsState) {
  const parts: string[] = [];

  // Add filter parameters if provided
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          // Send each array value as a separate parameter with the same key
          // This creates: action=create&action=update
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

  const queryString = parts.length > 0 ? `?${parts.join("&")}` : "";
  const path = `${AUDIT_BASE}${queryString}`;
  const queryKey = filters
    ? (["auditLogs", "all", filters] as const)
    : (["auditLogs", "all"] as const);

  return useGet<AuditLog[]>(path, queryKey);
}

/**
 * Hook to fetch paginated audit logs with filters
 * @param page - Current page number
 * @param limit - Number of items per page
 * @param filters - Optional filters for the audit logs
 * @returns Query result with paginated audit logs data
 */
export function useGetPaginatedAuditLogs(
  page: number,
  limit: number,
  filters?: FormElementsState
) {
  const queryKey = ["auditLogs", "page", { page, limit, filters }] as const;

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

  // Add all other filter fields as query parameters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      // Skip the standard pagination/sort/search fields
      if (
        !["sort", "asc", "search"].includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        if (Array.isArray(value)) {
          // For arrays, send each value as a separate query parameter with the same key
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
  const url = `${AUDIT_BASE}?${queryString}`;

  return useGet<PaginatedAuditLogsResponse>(url, queryKey, true);
}
