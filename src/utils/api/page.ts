import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";
import { useGet, useGetList } from "./factory";

// Type definitions based on Go models
export type BindingKind =
  | "schema"
  | "pipeline"
  | "workflow"
  | "api"
  | "function";

export interface DataBinding {
  kind: BindingKind;
  schemaName?: string;
  pipelineName?: string;
  workflowName?: string;
  apiName?: string;
  functionName?: string;
  params?: Record<string, any>;
}

export interface GroupBy {
  groupByObjectId?: string;
  groupByField?: string;
}

export type ComponentType =
  | "table"
  | "tabPanel"
  | "form"
  | "text"
  | "custom"
  | "barChart"
  | "lineChart"
  | "pieChart"
  | "areaChart"
  | "radarChart"
  | "heatmapChart"
  | "scatterChart"
  | "funnelChart"
  | "sankeyChart"
  | "sunburstChart"
  | "treemapChart"
  | "calendarChart"
  | "bumpChart"
  | "streamChart"
  | "waffleChart"
  | "circlePackingChart";

export interface TabPanelTab {
  title: string;
  icon?: string;
  components: ComponentBlock[];
}

export interface ComponentBlock {
  id: string;
  type: ComponentType;
  title?: string;
  order?: number;
  dataBinding?: DataBinding;
  groupBy?: GroupBy;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  props?: Record<string, any>;
  tabs?: TabPanelTab[];
}

export interface GridCell {
  id: string;
  row: number;
  column: number;
  rowSpan?: number;
  colSpan?: number;
  components: ComponentBlock[];
}

export interface GridSection {
  columns: number;
  gap?: number;
  cells: GridCell[];
}

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  order: number;
  sections: Section[];
}

export interface TabsSection {
  tabs: Tab[];
}

export type SectionType = "grid" | "component" | "tabs";

export interface Section {
  id?: string;
  type?: SectionType;
  order?: number;
  // Nested structure (preferred)
  grid?: GridSection;
  tabs?: TabsSection;
  component?: ComponentBlock;
  // Flat structure (for backward compatibility)
  columns?: number;
  gap?: number;
  cells?: GridCell[];
}

export interface PageModel {
  id?: string;
  _id?: string; // For factory compatibility
  name: string;
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections?: Section[];
  subPage?: PageModel;
}

export interface CreatePagePayload {
  name: string;
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections?: Section[];
  subPage?: PageModel;
}

export interface UpdatePagePayload {
  name?: string;
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections?: Section[];
  subPage?: PageModel;
}

// Context hook for tenant and project
function usePageContext() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const tenantSlug = currentTenant?.slug;
  const projectSlug = currentProject?.slug;

  if (!tenantSlug || !projectSlug) {
    throw new Error("Page operations require tenant and project context");
  }

  return { tenantSlug, projectSlug };
}

// Build page API path
function buildPagePath(tenantSlug: string, projectSlug: string, suffix = "") {
  return `/${tenantSlug}/${projectSlug}/page${suffix}`;
}

// Get all pages (public access)
export function useGetAllPages() {
  const { tenantSlug, projectSlug } = usePageContext();
  const path = buildPagePath(tenantSlug, projectSlug);
  const queryKey = ["pages", tenantSlug, projectSlug];

  return useGetList<PageModel>(path, queryKey);
}

// Get all pages (tenant access)
export function useGetTenantPages() {
  const { tenantSlug, projectSlug } = usePageContext();
  const path = buildPagePath(tenantSlug, projectSlug);
  const queryKey = ["pages", tenantSlug, projectSlug];

  return useGetList<PageModel>(path, queryKey);
}

// Get single page
export function useGetPage(id: string) {
  const { tenantSlug, projectSlug } = usePageContext();
  const path = buildPagePath(tenantSlug, projectSlug, `/${id}`);
  const queryKey = ["page", tenantSlug, projectSlug, id];

  return useGet<PageModel>(path, queryKey);
}

// Create page mutation
export function useCreatePage() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = usePageContext();

  const createMutation = useMutation({
    mutationFn: async (payload: CreatePagePayload) => {
      const path = buildPagePath(tenantSlug, projectSlug);
      const response = await axiosClient.post(path, payload);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["tenantPages", tenantSlug, projectSlug],
      });

      const message = response?.message || "Page created successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Page creation failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create page";
      toast.error(t(errorMessage));
    },
  });

  return {
    createPage: (payload: CreatePagePayload) => {
      createMutation.mutate(payload);
    },
    isCreating: createMutation.isPending,
  };
}

// Update page mutation
export function useUpdatePage() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = usePageContext();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePagePayload;
    }) => {
      const path = buildPagePath(tenantSlug, projectSlug, `/${id}`);
      const response = await axiosClient.patch(path, payload);
      return response.data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["tenantPages", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["page", tenantSlug, projectSlug, variables.id],
      });

      const message = response?.message || "Page updated successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Page update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update page";
      toast.error(t(errorMessage));
    },
  });

  return {
    updatePage: (params: { id: string; payload: UpdatePagePayload }) => {
      updateMutation.mutate(params);
    },
    isUpdating: updateMutation.isPending,
  };
}

// Delete page mutation
export function useDeletePage() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = usePageContext();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const path = buildPagePath(tenantSlug, projectSlug, `/${id}`);
      const response = await axiosClient.delete(path);
      return response.data;
    },
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["tenantPages", tenantSlug, projectSlug],
      });
      queryClient.removeQueries({
        queryKey: ["page", tenantSlug, projectSlug, id],
      });

      const message = response?.message || "Page deleted successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete page";
      toast.error(t(errorMessage));
    },
  });

  return {
    deletePage: (id: string) => {
      deleteMutation.mutate(id);
    },
    isDeleting: deleteMutation.isPending,
  };
}
