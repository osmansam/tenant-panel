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

export type RuntimeValueType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "dateRange"
  | "stringArray"
  | "numberArray";

export interface PageVariableDefinition {
  id: string;
  key: string;
  type: RuntimeValueType;
  initialValue?: unknown;
}

export interface PageFilterPlacement {
  kind: "navbar" | "cell";
  cellId?: string;
}

export interface PageFilterDefinition {
  id: string;
  key: string;
  label: string;
  type: RuntimeValueType;
  defaultValue?: unknown;
  defaultPreset?:
    | "today"
    | "yesterday"
    | "tomorrow"
    | "thisWeek"
    | "lastWeek"
    | "thisMonth"
    | "lastMonth"
    | "thisYear"
    | "lastYear";
  arraySerialization?: "comma" | "repeat";
  placement: PageFilterPlacement;
}

export type ComponentOutputSource =
  | { kind: "tableFilter"; filterId: string }
  | { kind: "tableSelectedIds" }
  | { kind: "tableSearch" };

export interface ComponentOutputDefinition {
  id: string;
  key: string;
  type: RuntimeValueType;
  source: ComponentOutputSource;
}

export type ParameterBinding =
  | { source: "static"; value: unknown }
  | {
      source: "pageFilter";
      filterId: string;
      field?: "value" | "start" | "end" | "preset" | "timezone";
    }
  | { source: "pageVariable"; variableId: string }
  | {
      source: "componentOutput";
      componentId: string;
      outputId: string;
      field?: "start" | "end" | "preset" | "timezone";
    }
  | {
      source: "system";
      value: "today" | "thisWeek" | "thisMonth" | "thisYear" | "now";
      field?: "start" | "end";
    }
  | {
      source: "derived";
      input: ParameterBinding;
      transform: "previousCalendarPeriod" | "previousEqualDuration";
      field?: "start" | "end";
    };

export interface DataBinding {
  kind: BindingKind;
  schemaName?: string;
  pipelineName?: string;
  workflowName?: string;
  apiName?: string;
  functionName?: string;
  params?: Record<string, unknown>;
  parameters?: Record<string, ParameterBinding>;
}

export interface GroupBy {
  groupByObjectId?: string;
  groupByField?: string;
  groupedSchemaName?: string;
  groupedField?: string;
  sourceSchemaName?: string;
  sourceValueField?: string;
  sourceLabelField?: string;
  filterField?: string;
}

export interface PageRowClassConfig {
  condition: string;
  className: string;
}

export interface PageTableLinkConfig {
  template?: string;
  labelField?: string;
  type?: string;
}

export type PageTableColumnType =
  | "field"
  | "computedLabel"
  | "progressBar"
  | "number"
  | "currency"
  | "percentage"
  | "growthPercentage"
  | "date"
  | "boolean"
  | "image"
  | "badge"
  | "array";

export interface PageTableComputedLabelRule {
  condition?: string;
  value?: string;
}

export interface PageTableProgressBarColorRule {
  condition?: string;
  color?: string;
}

export interface PageTableProgressBarConfig {
  sourceField?: string;
  max?: number;
  maxField?: string;
  color?: string;
  trackColor?: string;
  height?: number;
  width?: number;
  showValue?: boolean;
  colorRules?: PageTableProgressBarColorRule[];
}

export interface PageTableColumnConfig {
  field: string;
  type?: PageTableColumnType;
  displayName?: string;
  computedLabelRules?: PageTableComputedLabelRule[];
  fallbackValue?: string;
  progressBar?: PageTableProgressBarConfig;
  cellClassName?: PageRowClassConfig[];
  link?: PageTableLinkConfig;
}

export interface PageTableRowsConfig {
  className?: PageRowClassConfig[];
}

export interface PageTableCacheConfig {
  invalidateKeys?: string[];
}

export interface PageTableActionFormOptionConfig {
  value: string | number;
  label: string;
}

export interface PageTableActionFormFieldConfig {
  id?: string;
  formKey: string;
  type: string;
  formKeyType?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  requiredCondition?: string;
  disabledCondition?: string;
  isMultiple?: boolean;
  isNumberButtonsActive?: boolean;
  optionsSource?: string;
  staticOptions?: PageTableActionFormOptionConfig[];
  staticOptionsJson?: string;
  sourceSchemaName?: string;
  sourceValueField?: string;
  sourceLabelField?: string;
  sourceFilterCondition?: string;
  invalidateKeys?: string[];
  defaultValue?: string | number | boolean | string[] | number[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  validationMessage?: string;
}

export type PageTableFilterPanelInputConfig = PageTableActionFormFieldConfig;

export interface PageTableFilterPanelConfig {
  inputs?: PageTableFilterPanelInputConfig[];
}

export interface PageTableActionFieldConfig {
  field: string;
  value?: unknown;
  required?: boolean;
  disabledCondition?: string;
}

export interface PageTableActionSubmitConfig {
  fields?: PageTableActionFieldConfig[];
  includeFields?: string[];
  excludeFields?: string[];
  constantValues?: Record<string, unknown>;
  workflowName?: string;
  workflowSchema?: string;
}

export interface PageTableActionConfig {
  id?: string;
  key?: string;
  name?: string;
  label?: string;
  buttonName?: string;
  kind: string;
  icon?: string;
  className?: string;
  buttonClassName?: string;
  order?: number;
  enabled?: boolean;
  isModal?: boolean;
  isButton?: boolean;
  modalType?: string;
  confirmTitle?: string;
  confirmText?: string;
  path?: string;
  linkTemplate?: string;
  disabledCondition?: string;
  hiddenCondition?: string;
  requiredCondition?: string;
  formFields?: PageTableActionFormFieldConfig[];
  fieldOverrides?: PageTableActionFieldConfig[];
  constantValues?: Record<string, unknown>;
  submit?: PageTableActionSubmitConfig;
}

export interface PageTableComponentConfig {
  columns?: PageTableColumnConfig[];
  rows?: PageTableRowsConfig;
  cache?: PageTableCacheConfig;
  addButton?: PageTableActionConfig;
  actions?: PageTableActionConfig[];
  filterPanel?: PageTableFilterPanelConfig;
}


export type PageFormAreaKey = "top" | "main" | "bottom" | "left" | "right";

export interface PageFormAreaConfig {
  key: PageFormAreaKey;
  title?: string;
  order?: number;
  className?: string;
}

export interface PageFormLayoutConfig {
  variant?: "modal" | "page";
  columns?: 1 | 2 | 3;
  areas?: PageFormAreaConfig[];
}

export interface PageFormFieldConfig extends PageTableActionFormFieldConfig {
  area?: PageFormAreaKey;
  order?: number;
  width?: "full" | "half" | "third";
}

export interface PageFormObjectListDisplayConfig {
  primaryField?: string;
  primaryTemplate?: string;
  secondaryField?: string;
  secondaryTemplate?: string;
  imageField?: string;
}

export interface PageFormObjectActionConfig {
  kind: "editObject" | "removeObject" | "increment" | "decrement";
  label?: string;
  icon?: string;
  position?: "start" | "end";
  field?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface PageFormActionConfig {
  kind: "addObject" | "submit";
  label?: string;
  buttonName?: string;
  area?: PageFormAreaKey;
  targetObjectList?: string;
  sourceFields?: string[];
  clearSourceFields?: string[];
  preserveSourceFields?: string[];
  enabled?: boolean;
  order?: number;
}

export interface PageFormObjectListConfig {
  key: string;
  title?: string;
  area?: PageFormAreaKey;
  source?: "embedded";
  itemFields?: string[];
  addAction?: PageFormActionConfig;
  display?: PageFormObjectListDisplayConfig;
  actions?: PageFormObjectActionConfig[];
}

export type PageFormSubmitMode = "create" | "createMany" | "workflow";

export interface PageFormSubmitConfig {
  mode?: PageFormSubmitMode;
  buttonName?: string;
  constantValues?: Record<string, unknown>;
  bulkObjectListKey?: string;
  workflowSchema?: string;
  workflowName?: string;
}

export interface PageFormComponentConfig {
  title?: string;
  schemaName: string;
  layout?: PageFormLayoutConfig;
  fields?: PageFormFieldConfig[];
  objectLists?: PageFormObjectListConfig[];
  actions?: PageFormActionConfig[];
  submit?: PageFormSubmitConfig;
}

export type ComponentType =
  | "table"
  | "tabPanel"
  | "form"
  | "text"
  | "custom"
  | "infoBlocks"
  | "distributionBlocks"
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
  stateKey?: string;
  type: ComponentType;
  title?: string;
  order?: number;
  dataBinding?: DataBinding;
  outputs?: ComponentOutputDefinition[];
  groupBy?: GroupBy;
  table?: PageTableComponentConfig;
  form?: PageFormComponentConfig;
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
  variables?: PageVariableDefinition[];
  filters?: PageFilterDefinition[];
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isOnSidebar?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections?: Section[];
  subPage?: PageModel;
}

export interface CreatePagePayload {
  name: string;
  variables?: PageVariableDefinition[];
  filters?: PageFilterDefinition[];
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isOnSidebar?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections?: Section[];
  subPage?: PageModel;
}

export interface UpdatePagePayload {
  name?: string;
  variables?: PageVariableDefinition[];
  filters?: PageFilterDefinition[];
  icon?: string;
  slug?: string;
  parentPageId?: string | null;
  order?: number;
  isGroupOnly?: boolean;
  isOnSidebar?: boolean;
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
