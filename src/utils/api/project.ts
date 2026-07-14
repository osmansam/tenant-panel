import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { axiosClient } from "./axiosClient";
import { useGet, useMutationApi } from "./factory";

// Project types - Updated to match API response
export interface Project {
  id: string; // API uses id, not _id
  _id: string; // For factory compatibility - mapped from id
  tenantId: string;
  tenantSlug: string;
  name: string;
  slug: string;
  description?: string; // Not in API response but might be added later
  isActive: boolean; // API uses isActive instead of status
  isTemplate?: boolean;
  templateScope?: "tenant" | "global";
  templateIncludeItems?: boolean;
  templateDescription?: string;
  status?: "active" | "inactive" | "archived"; // Keep for compatibility
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Not in current API response
  settings?: Record<string, any>; // Not in current API response
}

export interface CreateProjectPayload {
  name: string;
  slug: string;
  templateProjectId?: string;
  includeTemplateItems?: boolean;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  status?: "active" | "inactive" | "archived";
  settings?: Record<string, any>;
}

export interface UpdateProjectTemplatePayload {
  isTemplate: boolean;
  templateIncludeItems?: boolean;
  templateDescription?: string;
}

export function getProjectId(project: Partial<Project>): string {
  const rawProject = project as Record<string, any>;
  const rawId = rawProject.id || rawProject._id;
  if (typeof rawId === "string") return rawId;
  if (rawId && typeof rawId === "object" && "hex" in rawId) {
    return String((rawId as { hex: string }).hex);
  }
  if (rawId && typeof rawId === "object" && "$oid" in rawId) {
    return String((rawId as { $oid: string }).$oid);
  }
  return rawId ? String(rawId) : "";
}

// Constants
const BASE_QUERY = "/tenant/projects";
const QUERY_KEY = ["projects"];

// Sort function for projects (by creation date, newest first)
const projectSortFunction = (a: Partial<Project>, b: Partial<Project>) => {
  const dateA = new Date(a.createdAt || 0).getTime();
  const dateB = new Date(b.createdAt || 0).getTime();
  return dateB - dateA;
};

// React Query hooks using factory pattern
export function useProjects(enabled: boolean = true) {
  const response = useGet<{
    status: number;
    message: string;
    data: { projects: Project[] };
  }>(BASE_QUERY, QUERY_KEY, enabled);

  // Extract projects array from nested response structure and map id to _id for factory compatibility
  const projects = response?.data?.projects || [];
  return projects.map((project) => ({
    ...project,
    id: getProjectId(project),
    _id: getProjectId(project),
  }));
}

export function useProject(id: string, enabled: boolean = true) {
  return useGet<Project>(
    `${BASE_QUERY}/${id}`,
    ["project", id],
    enabled && !!id
  );
}

export function useProjectTemplates(enabled: boolean = true) {
  const response = useGet<{
    status: number;
    message: string;
    data: { templates: Project[] };
  }>(`${BASE_QUERY}/templates`, [...QUERY_KEY, "templates"], enabled);

  const templates = response?.data?.templates || [];
  return templates.map((project) => ({
    ...project,
    id: getProjectId(project),
    _id: getProjectId(project),
  }));
}

export function useProjectMutations() {
  return useMutationApi<Project>({
    baseQuery: BASE_QUERY,
    queryKey: QUERY_KEY,
    isInvalidate: true,
    sortFunction: projectSortFunction,
  });
}

// Direct create project implementation (not using factory due to response format mismatch)
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const createMutation = useMutation({
    mutationFn: async (payload: CreateProjectPayload) => {
      const response = await axiosClient.post(`${BASE_QUERY}`, payload);
      return response.data;
    },
    onSuccess: (response) => {
      // Invalidate the projects query to refetch the list
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });

      // Show success message
      const message = response?.message || "Project created successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Project creation failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create project";
      toast.error(t(errorMessage));
    },
  });

  return {
    createProject: (payload: CreateProjectPayload) => {
      createMutation.mutate(payload);
    },
    isCreating: createMutation.isPending,
  };
}

export function useUpdateProjectTemplate() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProjectTemplatePayload;
    }) => {
      const response = await axiosClient.patch(
        `${BASE_QUERY}/${id}/template`,
        payload
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY, "templates"] });
      const message = response?.message || "Project template updated successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Project template update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update project template";
      toast.error(t(errorMessage));
    },
  });

  return {
    updateProjectTemplate: (
      id: string,
      payload: UpdateProjectTemplatePayload
    ) => {
      if (!id || id === "undefined" || id === "[object Object]") {
        toast.error(t("Invalid project ID"));
        return;
      }
      updateMutation.mutate({ id, payload });
    },
    isUpdatingTemplate: updateMutation.isPending,
  };
}

// Keep factory-based implementation for updates and deletes
export function useCreateProjectFactory() {
  const { createItem, createMutation } = useProjectMutations();

  return {
    createProject: (payload: CreateProjectPayload) => {
      createItem(payload as Partial<Project>);
    },
    isCreating: createMutation.isPending,
  };
}

export function useUpdateProject(onError?: (error: unknown) => void) {
  const { updateItem, updateMutation } = useProjectMutations();

  return {
    updateProject: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProjectPayload;
    }) => {
      updateItem({ id, updates: payload });
    },
    isUpdating: updateMutation.isPending,
  };
}

export function useDeleteProject(onError?: (error: unknown) => void) {
  const { deleteItem, deleteMutation } = useProjectMutations();

  return {
    deleteProject: (id: string) => {
      deleteItem(id);
    },
    isDeleting: deleteMutation.isPending,
  };
}

// Utility function to get project status display
export function getProjectStatusDisplay(
  status: Project["status"] | string | undefined,
  t: (key: string) => string
) {
  const statusMap = {
    active: { label: t("Active"), color: "green" },
    inactive: { label: t("Inactive"), color: "gray" },
    archived: { label: t("Archived"), color: "red" },
  };

  return statusMap[status as keyof typeof statusMap] || statusMap.active;
}
