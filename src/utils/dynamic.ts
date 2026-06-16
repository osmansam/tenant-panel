import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FormElementsState } from "../types";
import { useGet, useMutationApi } from "../utils/api/factory";
import { axiosClient } from "./api/axiosClient";

export interface DynamicPayload<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export type TableSourceBinding = {
  kind?: "schema" | "pipeline" | "workflow";
  schemaName?: string;
  pipelineName?: string;
  workflowName?: string;
  fields?: string[];
  params?: Record<string, unknown>;
};

const BASE = "/dynamic";
const qs = (params: Record<string, unknown>) =>
  new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, String(v)])
  ).toString();

const listKey = (schema: string) => ["dynamic", schema, "all"] as const;

// Helper function to convert object to FormData
function toFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
}

export function useDynamicCrud<T extends { _id: string | number }>(
  schemaName: string,
  hasImageField: boolean = false
) {
  const queryKey = listKey(schemaName);
  const qc = useQueryClient();
  const { t } = useTranslation();

  // Custom create function that handles FormData
  async function createRequest(payload: Partial<T>) {
    const url = `${BASE}?${qs({ schemaName })}`;
    const data = hasImageField
      ? toFormData(payload as Record<string, unknown>)
      : payload;
    const headers = hasImageField
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    const response = await axiosClient.post<T>(url, data, { headers });
    return response.data;
  }

  // Custom update function that handles FormData
  async function updateRequest(id: string | number, updates: Partial<T>) {
    const url = `${BASE}/${id}?${qs({ schemaName })}`;
    const data = hasImageField
      ? toFormData(updates as Record<string, unknown>)
      : updates;
    const headers = hasImageField
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    const response = await axiosClient.patch<T>(url, data, { headers });
    return response.data;
  }

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createRequest,
    onMutate: async (itemDetails: Partial<T>) => {
      await qc.cancelQueries({ queryKey });
      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      qc.setQueryData(queryKey, [...previousItems, itemDetails]);
      return { previousItems };
    },
    onError: (_err: Error, _newItem, context) => {
      if (context?.previousItems) {
        qc.setQueryData<T[]>(queryKey, context.previousItems);
      }
      const errorMessage =
        (_err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "An unexpected error occurred";
      setTimeout(() => toast.error(t(errorMessage)), 200);
    },
    onSettled: async () => {
      qc.invalidateQueries({ queryKey });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string | number;
      updates: Partial<T>;
    }) => updateRequest(id, updates),
    onMutate: async ({ id, updates }) => {
      await qc.cancelQueries({ queryKey });
      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      const updatedItems = previousItems.map((item) =>
        item._id === id ? { ...item, ...updates } : item
      );
      qc.setQueryData(queryKey, updatedItems);
      return { previousItems };
    },
    onError: (_err: Error, _vars, context) => {
      if (context?.previousItems) {
        qc.setQueryData<T[]>(queryKey, context.previousItems);
      }
      const errorMessage =
        (_err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "An unexpected error occurred";
      setTimeout(() => toast.error(t(errorMessage)), 200);
    },
    onSettled: async () => {
      qc.invalidateQueries({ queryKey });
    },
  });

  const { deleteItem } = useMutationApi<T>({
    baseQuery: BASE,
    queryKey,
  });

  const createDynamicItem = (doc: Partial<T>) => createMutation.mutate(doc);

  const updateDynamicItem = (id: string | number, updates: Partial<T>) =>
    updateMutation.mutate({ id, updates });

  const deleteDynamicItem = (id: string | number) =>
    deleteItem(`${id}?${qs({ schemaName })}`);

  // Create multiple items functionality
  async function createManyRequest(payload: Array<Partial<T>>) {
    const { data } = await axiosClient.post(
      `${BASE}/multiple?${qs({ schemaName })}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  }

  const createManyMutation = useMutation({
    mutationFn: createManyRequest,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey });
      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      return { previousItems };
    },
    onSuccess: (newItems: T[]) => {
      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      qc.setQueryData<T[]>(queryKey, [...previousItems, ...newItems]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any, _vars, context) => {
      if (context?.previousItems) {
        qc.setQueryData<T[]>(queryKey, context.previousItems);
      }
      const errorMessage =
        err?.response?.data?.message || "An unexpected error occurred";
      // setTimeout(() => toast.error(t(errorMessage)), 200);
      console.log("Error creating multiple items:", errorMessage);
    },
    onSettled: async () => {
      qc.invalidateQueries({ queryKey });
    },
  });

  const createMultipleDynamicItem = (docs: Array<Partial<T>>) =>
    createManyMutation.mutate(docs);

  async function deleteManyRequest(payload: Array<{ _id: string | number }>) {
    const { data } = await axiosClient.delete(
      `${BASE}/multiple?${qs({ schemaName })}`,
      {
        data: payload,
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  }

  const deleteManyMutation = useMutation({
    mutationFn: deleteManyRequest,
    onMutate: async (payload: Array<{ _id: string | number }>) => {
      await qc.cancelQueries({ queryKey });

      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      const idsToDelete = new Set(payload.map((p) => String(p._id)));

      const updatedItems = previousItems.filter(
        (item) => !idsToDelete.has(String(item._id))
      );

      qc.setQueryData<T[]>(queryKey, updatedItems);

      return { previousItems };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any, _vars, context) => {
      if (context?.previousItems) {
        qc.setQueryData<T[]>(queryKey, context.previousItems);
      }
      const errorMessage =
        err?.response?.data?.message || "An unexpected error occurred";
      setTimeout(() => toast.error(t(errorMessage)), 200);
    },
    onSettled: async () => {
      // keep your pattern consistent with the rest of your hook
      qc.invalidateQueries({ queryKey });
    },
  });

  const deleteMultipleDynamicItem = (docs: Array<{ _id: string | number }>) =>
    deleteManyMutation.mutate(docs);

  // Update multiple items functionality
  async function updateManyRequest(
    payload: Array<{ _id: string | number; updates: Partial<T> }>
  ) {
    // Flatten the payload: merge _id with updates into a single object
    const flattenedPayload = payload.map(({ _id, updates }) => ({
      _id,
      ...updates,
    }));

    const { data } = await axiosClient.patch(
      `${BASE}/multiple?${qs({ schemaName })}`,
      flattenedPayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  }

  const updateManyMutation = useMutation({
    mutationFn: updateManyRequest,
    onMutate: async (
      payload: Array<{ _id: string | number; updates: Partial<T> }>
    ) => {
      await qc.cancelQueries({ queryKey });

      const previousItems = qc.getQueryData<T[]>(queryKey) || [];
      const updateMap = new Map(payload.map((p) => [String(p._id), p.updates]));

      const updatedItems = previousItems.map((item) => {
        const updates = updateMap.get(String(item._id));
        return updates ? { ...item, ...updates } : item;
      });

      qc.setQueryData<T[]>(queryKey, updatedItems);

      return { previousItems };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any, _vars, context) => {
      if (context?.previousItems) {
        qc.setQueryData<T[]>(queryKey, context.previousItems);
      }
      const errorMessage =
        err?.response?.data?.message || "An unexpected error occurred";
      setTimeout(() => toast.error(t(errorMessage)), 200);
    },
    onSettled: async () => {
      qc.invalidateQueries({ queryKey });
    },
  });

  const updateMultipleDynamicItem = (
    docs: Array<{ _id: string | number; updates: Partial<T> }>
  ) => updateManyMutation.mutate(docs);

  return {
    createDynamicItem,
    createMultipleDynamicItem,
    createManyMutation,
    updateDynamicItem,
    deleteDynamicItem,
    deleteMultipleDynamicItem,
    deleteManyMutation,
    updateMultipleDynamicItem,
    updateManyMutation,
  };
}

export function useExportDynamicItems() {
  const { t } = useTranslation();

  async function exportRequest(payload: {
    schemaName: string;
    fields: string[];
    filters: Record<string, unknown>;
    search: string;
    limit: number;
    page: number;
  }) {
    const response = await axiosClient.post(
      `${BASE}/export?schemaName=${payload.schemaName}`,
      payload,
      {
        responseType: "blob",
      }
    );
    return response.data;
  }

  const exportMutation = useMutation({
    mutationFn: exportRequest,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(t("Export successful"));
    },
    onError: () => {
      toast.error(t("Export failed"));
    },
  });

  return { exportDynamicItems: exportMutation.mutate };
}

export function useGetDynamicItems<T>(
  schemaName: string,
  filters?: FormElementsState
) {
  const parts = [`schemaName=${schemaName}`];

  // Add filter parameters if provided
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          // Send each array value as a separate parameter with the same key
          // This creates: age=gt-32&age=lt-123
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

  const queryString = parts.join("&");
  const path = `${BASE}?${queryString}`;
  const queryKey = filters
    ? (["dynamic", schemaName, "all", filters] as const)
    : listKey(schemaName);
  return useGet<T[]>(path, queryKey);
}

export function useGetPaginatedItems<T>(
  page: number,
  limit: number,
  schemaName: string,
  filters: FormElementsState
) {
  const baseQueryUrl = `${BASE}/page`;
  const queryKey = [
    "dynamic",
    schemaName,
    "page",
    { page, limit, filters },
  ] as const;

  const parts = [
    `schemaName=${schemaName}`,
    `page=${page}`,
    `limit=${limit}`,
    filters.sort && `sort=${filters.sort}`,
    filters.asc !== undefined && `asc=${filters.asc}`,
    filters.search &&
      `search=${
        typeof filters.search === "string"
          ? filters.search.trim()
          : filters.search
      }`,
  ];

  // Add all other filter fields as query parameters
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
        // This creates: age=gt-32&age=lt-123
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

  const queryString = parts.filter(Boolean).join("&");
  const url = `${baseQueryUrl}?${queryString}`;

  return useGet<DynamicPayload<T>>(url, queryKey, true);
}

export function useGetTableSourceItems<T>(
  page: number,
  limit: number,
  binding: TableSourceBinding,
  filters: FormElementsState
) {
  const sourceType = binding.kind || "schema";
  const schemaName = binding.schemaName || "";
  const baseQueryUrl = `${BASE}/table-source`;
  const queryKey = [
    "dynamic",
    schemaName,
    "table-source",
    sourceType,
    binding.pipelineName || "",
    binding.workflowName || "",
    { page, limit, filters, fields: binding.fields || [], params: binding.params || {} },
  ] as const;

  const parts = [
    `schemaName=${schemaName}`,
    `sourceType=${sourceType}`,
    binding.pipelineName &&
      `pipelineName=${encodeURIComponent(binding.pipelineName)}`,
    binding.workflowName &&
      `workflowName=${encodeURIComponent(binding.workflowName)}`,
    binding.fields?.length &&
      `fields=${encodeURIComponent(binding.fields.join(","))}`,
    `page=${page}`,
    `limit=${limit}`,
    filters.sort && `sort=${filters.sort}`,
    filters.asc !== undefined && `asc=${filters.asc}`,
    filters.search &&
      `search=${
        typeof filters.search === "string"
          ? filters.search.trim()
          : filters.search
      }`,
  ];

  Object.entries({ ...(binding.params || {}), ...filters }).forEach(
    ([key, value]) => {
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
    }
  );

  const queryString = parts.filter(Boolean).join("&");
  const url = `${baseQueryUrl}?${queryString}`;
  return useGet<DynamicPayload<T>>(url, queryKey, Boolean(schemaName));
}

// utils/dynamic.ts (or wherever this lives)
export function useGetSelection<T>(schemaName: string, fieldName: string) {
  // Only enable the request if both schemaName and fieldName are provided
  const enabled = Boolean(schemaName && fieldName);

  const path = `${BASE}/selection?${qs({ schemaName, fieldName })}`;

  const queryKey = [
    "dynamic",
    schemaName || "",
    "selection",
    fieldName || "",
  ] as const;

  const data = useGet<T>(path, queryKey, enabled);

  return (data ?? ([] as T)) as T;
}

export function useGetPipeline<T>(
  schemaName: string,
  pipelineName: string,
  additionalParams?: Record<string, unknown>
) {
  const hasParams = Boolean(schemaName && pipelineName);

  const params: Record<string, unknown> = {
    schemaName,
    pipelineName,
    ...additionalParams,
  };

  const queryString = qs(params);
  const path = `${BASE}/pipeline?${queryString}`;

  const queryKey = [
    "dynamic",
    schemaName || "",
    "pipeline",
    pipelineName || "",
    additionalParams || {},
  ] as const;

  const enabled = hasParams;

  const data = useGet<T>(path, queryKey, enabled);

  return (data ?? ([] as T)) as T;
}
