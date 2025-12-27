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
  status?: "active" | "inactive" | "archived"; // Keep for compatibility
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Not in current API response
  settings?: Record<string, any>; // Not in current API response
}

export interface CreateProjectPayload {
  name: string;
  slug: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  status?: "active" | "inactive" | "archived";
  settings?: Record<string, any>;
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
  return projects.map((project) => ({ ...project, _id: project.id }));
}

export function useProject(id: string, enabled: boolean = true) {
  return useGet<Project>(
    `${BASE_QUERY}/${id}`,
    ["project", id],
    enabled && !!id
  );
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
      console.log("Creating project with payload:", payload);
      const response = await axiosClient.post(`${BASE_QUERY}`, payload);
      console.log("Create project response:", response.data);
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Project creation successful:", response);
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

// Keep factory-based implementation for updates and deletes
export function useCreateProjectFactory() {
  const { createItem, createMutation } = useProjectMutations();

  return {
    createProject: (payload: CreateProjectPayload) => {
      console.log("Creating project with factory:", payload);
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
