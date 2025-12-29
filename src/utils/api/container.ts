import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import { useTenant } from "../../hooks/useTenant";
import { axiosClient } from "./axiosClient";
import { useGet, useGetList } from "./factory";

// If you prefer using mongodb's ObjectId type, import it and replace string with ObjectId
// import { ObjectId } from "mongodb";
// type Id = ObjectId;
type Id = string;

/** Field definition for dynamic container schemas */
export interface PopulationSettings {
  fieldName: string;
  populatedFields: string[];
  displayFields: string[];
  inputSelectionField: string;
  displayLabel: string;
}

export interface RowClassConfig {
  condition: string;
  className: string;
}

export type LinkType = "external" | "internal" | "email" | "phone" | "file";

export interface Frontend {
  displayName?: string;
  rowClassName?: RowClassConfig[];
  rowKeyClassName?: RowClassConfig[];
  invalidateKeys?: string[]; // Made optional to fix type compatibility
  linkTemplate?: string;
  linkLabelField?: string;
  linkType?: LinkType;
}

export interface Field {
  name: string;
  type: string;
  tag?: string;
  objectSchemaName?: string;
  enumList?: (string | number)[];
  isForceDelete?: boolean;
  unique?: boolean;
  isHashed?: boolean;
  isLoginCredential?: boolean;
  isSearchable?: boolean;
  children?: Field[];
  frontend?: Frontend;
  populationSettings?: PopulationSettings;
  equation?: string;
  authorizeRole?: string[];
  isAuthorized?: boolean;
}

/** Per-route auth/availability spec */
export interface RouteSpec {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean; // Updated to match Go model (isActive instead of isActivated)
  method: string; // e.g., "GET" | "POST" | "PUT" | "DELETE"
}

/** All routes toggles */
export interface Routes {
  createDynamicModelItem: RouteSpec;
  getAllDynamicModelItems: RouteSpec;
  createMultipleDynamicModelItem: RouteSpec;
  getAllDynamicModelItemsWithPagination: RouteSpec;
  getPipeline: RouteSpec;
  testPipeline: RouteSpec;
  handleSearchDynamicModelItem: RouteSpec;
  handleFilterDynamicModelItem: RouteSpec;
  deleteDynamicModelItem: RouteSpec;
  updateDynamicModelItem: RouteSpec;
  updateMultipleDynamicModelItem: RouteSpec;
  getDynamicModelItem: RouteSpec;
  deleteMultipleDynamicModelItem: RouteSpec;
  exportDynamicModelItems: RouteSpec;
  getItemsForSelection: RouteSpec;
}

/** Redis caching controls (global) */
export interface Redis {
  isRedisCached: boolean;
  cacheTime: number; // seconds
  triggeredRedisCaches: string[];
}

/** Aggregation pipeline stage specification */
export interface PipelineStage {
  name: string;
  pipelineJson: string; // serialized JSON string
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean;
  isRedisCached: boolean;
  cacheTime: number;
}

/** Dynamic function spec (server-executed code) */
export interface DynamicFunction {
  name: string;
  codeJson: string; // serialized JSON / code payload
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean;
  isRedisCached: boolean;
  cacheTime: number;
}

/** Outbound/Proxy API spec */
export interface DynamicApiModel {
  name: string;
  url: string;
  method: string; // e.g., "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  dependencies?: string[];
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
  isActive: boolean;
  isRedisCached: boolean;
  cacheTime: number;
}

/** Population config for referenced fields */
export interface Population {
  fieldName: string;
  populatedVariables: string[];
}

// IndexField represents a single field in an index
export interface IndexField {
  fieldName: string; // Name of the field to index
  order: number; // 1 for ascending, -1 for descending
}

// Index represents a MongoDB index configuration
export interface Index {
  name: string; // Index name (e.g., "idx_createdAt")
  fields: IndexField[]; // Fields to index (supports compound indexes)
  unique?: boolean; // Whether index should enforce uniqueness
  sparse?: boolean; // Whether to index only documents with the field
  ttl?: number; // TTL in seconds (0 = no TTL)
  background?: boolean; // Build index in background
}

// Condition for row access rules
export interface Condition {
  field: string;
  operator: string; // "=", ">", "<", "in", etc.
  value: any; // can support "{{user.id}}" etc.
  extractFilter?: boolean;
  roles?: string[];
}

export interface RowAccessRule {
  conditions: Condition[];
}

export interface AuditLogsConfig {
  isAuthorized: boolean;
  authorizeRole: string[];
}

/** The main container model */
export interface ContainerModel {
  id: string; // API uses id
  _id?: Id; // For factory compatibility - mapped from id
  schemaName: string;
  fields: Field[];
  routes: Routes;
  redis: Redis;
  pipelines: PipelineStage[];
  dynamicFunctions: DynamicFunction[];
  dynamicApis: DynamicApiModel[];
  isAuthContainer?: boolean;
  populationArray?: Population[];
  populatedRoutes: string[];
  indexes?: Index[]; // MongoDB indexes for performance
  rowAccess?: RowAccessRule;
  frontend?: Frontend;

  // Multi-tenancy fields
  tenantId?: string; // Project-scoped containers
  projectId?: string; // Project-scoped containers
  collectionName?: string; // Stores "schemaName_<projectIdHex>"
  createdAt?: string;
  updatedAt?: string;
}

/** Helper used in some responses/utilities */
export interface ContainerTypes {
  id: string;
  schemaName: string;
  fieldTypes: Record<string, string>; // key: field name, value: declared type
}

/** Optional: constrain HTTP methods if you want stronger typing */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

// Payload types for API operations
export interface CreateContainerPayload {
  schemaName: string;
  fields: Field[];
  routes?: Partial<Routes>;
  redis?: Partial<Redis>;
  pipelines?: PipelineStage[];
  dynamicFunctions?: DynamicFunction[];
  dynamicApis?: DynamicApiModel[];
  isAuthContainer?: boolean;
  populatedRoutes?: string[];
  indexes?: Index[];
  rowAccess?: RowAccessRule;
}

export interface UpdateContainerPayload {
  schemaName?: string;
  fields?: Field[];
  routes?: Partial<Routes>;
  redis?: Partial<Redis>;
  populatedRoutes?: string[];
  indexes?: Index[];
  rowAccess?: RowAccessRule;
}

export interface UpdateDynamicFunctionsPayload {
  dynamicFunctions: DynamicFunction[];
}

export interface UpdatePipelinesPayload {
  pipelines: PipelineStage[];
}

// Raw payload types matching Go backend struct tags (PascalCase)
export interface CreateContainerRawPayload {
  SchemaName: string;
  Fields: any[]; // Empty array initially
  Routes: {
    CreateDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    GetAllDynamicModelItems: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    CreateMultipleDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    GetAllDynamicModelItemsWithPagination: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    GetPipeline: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    TestPipeline: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    HandleSearchDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    HandleFilterDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    DeleteDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    UpdateDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    UpdateMultipleDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    GetDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    DeleteMultipleDynamicModelItem: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    ExportDynamicModelItems: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
    GetItemsForSelection: {
      IsAuthenticated: boolean;
      IsAuthorized: boolean;
      AuthorizeRole: string[];
      IsActive: boolean;
      Method: string;
    };
  };
  Redis: {
    IsRedisCached: boolean;
    CacheTime: number;
    TriggeredRedisCaches: string[];
  };
  Pipelines: any[];
  DynamicFunctions: any[];
  DynamicApis: any[];
  IsAuthContainer: boolean;
  PopulatedRoutes: string[];
  Indexes: any;
  RowAccess: any;
}

// Helper function to build container API paths
function buildContainerPath(
  tenantSlug: string,
  projectSlug: string,
  suffix = ""
) {
  const basePath = `/${tenantSlug}/${projectSlug}/container`;
  return suffix ? `${basePath}${suffix}` : basePath;
}

// Hook to get current tenant and project context
function useContainerContext() {
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const tenantSlug = currentTenant?.slug;
  const projectSlug = currentProject?.slug;

  if (!tenantSlug || !projectSlug) {
    throw new Error(
      "Container operations require both tenant and project context"
    );
  }

  return { tenantSlug, projectSlug };
}

// Sort function for containers (by creation date, newest first)
const containerSortFunction = (
  a: Partial<ContainerModel>,
  b: Partial<ContainerModel>
) => {
  const dateA = new Date(a.createdAt || 0).getTime();
  const dateB = new Date(b.createdAt || 0).getTime();
  return dateB - dateA;
};

// React Query hooks
export function useContainers(enabled: boolean = true) {
  const { tenantSlug, projectSlug } = useContainerContext();
  const basePath = buildContainerPath(tenantSlug, projectSlug);
  const projectSpecificQueryKey = ["containers", tenantSlug, projectSlug];

  const response = useGet<ContainerModel[]>(
    basePath,
    projectSpecificQueryKey,
    enabled
  );

  // The API returns an array of containers directly
  // Handle the response which might be PascalCase from Go backend
  const containers = response || [];

  return containers.map((container: any) => ({
    id: container.ID || container.id,
    _id: container.ID || container.id,
    schemaName: container.SchemaName || container.schemaName,
    fields: container.Fields || container.fields || [],
    routes: container.Routes || container.routes,
    redis: container.Redis || container.redis,
    pipelines: container.Pipelines || container.pipelines || [],
    dynamicFunctions:
      container.DynamicFunctions || container.dynamicFunctions || [],
    dynamicApis: container.DynamicApis || container.dynamicApis || [],
    isAuthContainer:
      container.IsAuthContainer ?? container.isAuthContainer ?? false,
    populatedRoutes:
      container.PopulatedRoutes || container.populatedRoutes || [],
    indexes: container.Indexes || container.indexes,
    rowAccess: container.RowAccess || container.rowAccess,
    collectionName: container.CollectionName || container.collectionName,
    createdAt: container.CreatedAt || container.createdAt,
    updatedAt: container.UpdatedAt || container.updatedAt,
  }));
}

export function useContainer(id: string, enabled: boolean = true) {
  const { tenantSlug, projectSlug } = useContainerContext();
  const path = buildContainerPath(tenantSlug, projectSlug, `/${id}`);
  const projectSpecificQueryKey = ["container", tenantSlug, projectSlug, id];

  return useGet<ContainerModel>(path, projectSpecificQueryKey, enabled && !!id);
}

export function useContainerTypes(enabled: boolean = true) {
  const { tenantSlug, projectSlug } = useContainerContext();
  const path = buildContainerPath(tenantSlug, projectSlug, "/types");
  const projectSpecificQueryKey = ["containerTypes", tenantSlug, projectSlug];

  return useGet<ContainerTypes[]>(path, projectSpecificQueryKey, enabled);
}
// Container CRUD operations
export function useCreateContainer() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { currentTenant } = useTenant();
  const { currentProject } = useCurrentProject();

  const createMutation = useMutation({
    mutationFn: async (
      payload: CreateContainerPayload | CreateContainerRawPayload
    ) => {
      // Build path manually since useContainerContext might throw
      const tenantSlug = currentTenant?.slug;
      const projectSlug = currentProject?.slug;

      if (!tenantSlug || !projectSlug) {
        throw new Error(
          "Container operations require both tenant and project context"
        );
      }

      const path = buildContainerPath(tenantSlug, projectSlug);
      console.log("Creating container with payload:", payload);
      const response = await axiosClient.post(path, payload);
      console.log("Create container response:", response.data);
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Container creation successful:", response);
      const tenantSlug = currentTenant?.slug;
      const projectSlug = currentProject?.slug;

      if (tenantSlug && projectSlug) {
        queryClient.invalidateQueries({
          queryKey: ["containers", tenantSlug, projectSlug],
        });
        queryClient.invalidateQueries({
          queryKey: ["containerTypes", tenantSlug, projectSlug],
        });
      }

      const message = response?.message || "Container created successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Container creation failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create container";
      toast.error(t(errorMessage));
    },
  });

  return {
    createContainer: (
      payload: CreateContainerPayload | CreateContainerRawPayload
    ) => {
      createMutation.mutate(payload);
    },
    isCreating: createMutation.isPending,
  };
}

export function useUpdateContainer() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = useContainerContext();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateContainerPayload;
    }) => {
      const path = buildContainerPath(tenantSlug, projectSlug, `/${id}`);
      const response = await axiosClient.patch(path, payload);
      return response.data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", tenantSlug, projectSlug, variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["containerTypes", tenantSlug, projectSlug],
      });

      const message = response?.message || "Container updated successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Container update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update container";
      toast.error(t(errorMessage));
    },
  });

  return {
    updateContainer: (params: {
      id: string;
      payload: UpdateContainerPayload;
    }) => {
      updateMutation.mutate(params);
    },
    isUpdating: updateMutation.isPending,
  };
}

export function useDeleteContainer() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = useContainerContext();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const path = buildContainerPath(tenantSlug, projectSlug, `/${id}`);
      const response = await axiosClient.delete(path);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["containerTypes", tenantSlug, projectSlug],
      });

      const message = response?.message || "Container deleted successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Container deletion failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete container";
      toast.error(t(errorMessage));
    },
  });

  return {
    deleteContainer: (id: string) => {
      deleteMutation.mutate(id);
    },
    isDeleting: deleteMutation.isPending,
  };
}

// Dynamic Functions operations
export function useUpdateDynamicFunctions() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = useContainerContext();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateDynamicFunctionsPayload;
    }) => {
      const path = buildContainerPath(
        tenantSlug,
        projectSlug,
        `/dynamicFunctions/${id}`
      );
      const response = await axiosClient.patch(path, payload);
      return response.data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", tenantSlug, projectSlug, variables.id],
      });

      const message =
        response?.message || "Dynamic functions updated successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Dynamic functions update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update dynamic functions";
      toast.error(t(errorMessage));
    },
  });

  return {
    updateDynamicFunctions: (params: {
      id: string;
      payload: UpdateDynamicFunctionsPayload;
    }) => {
      updateMutation.mutate(params);
    },
    isUpdating: updateMutation.isPending,
  };
}

// Pipelines operations
export function useUpdatePipelines() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = useContainerContext();

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePipelinesPayload;
    }) => {
      const path = buildContainerPath(
        tenantSlug,
        projectSlug,
        `/pipelines/${id}`
      );
      const response = await axiosClient.patch(path, payload);
      return response.data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", tenantSlug, projectSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", tenantSlug, projectSlug, variables.id],
      });

      const message = response?.message || "Pipelines updated successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Pipelines update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update pipelines";
      toast.error(t(errorMessage));
    },
  });

  return {
    updatePipelines: (params: {
      id: string;
      payload: UpdatePipelinesPayload;
    }) => {
      updateMutation.mutate(params);
    },
    isUpdating: updateMutation.isPending,
  };
}

// Redis operations
export function useResetRedis() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { tenantSlug, projectSlug } = useContainerContext();

  const resetMutation = useMutation({
    mutationFn: async () => {
      const path = buildContainerPath(tenantSlug, projectSlug, "/reset-redis");
      const response = await axiosClient.post(path, {});
      return response.data;
    },
    onSuccess: (response) => {
      // Don't need to invalidate queries since this is just clearing Redis cache
      const message = response?.message || "Redis cache reset successfully";
      toast.success(t(message));
    },
    onError: (error: any) => {
      console.error("Redis reset failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset Redis cache";
      toast.error(t(errorMessage));
    },
  });

  return {
    resetRedis: () => {
      resetMutation.mutate();
    },
    isResetting: resetMutation.isPending,
  };
}

// Legacy hook for backward compatibility (non-scoped)
export function useGetContainers() {
  return useGetList<ContainerModel>("/container");
}

// Utility functions
export function getContainerFieldTypes(
  container: ContainerModel
): Record<string, string> {
  const fieldTypes: Record<string, string> = {};

  container.fields.forEach((field) => {
    fieldTypes[field.name] = field.type;

    // Handle nested children fields
    if (field.children && field.children.length > 0) {
      field.children.forEach((child) => {
        fieldTypes[`${field.name}.${child.name}`] = child.type;
      });
    }
  });

  return fieldTypes;
}

export function isRestrictedSchemaName(schemaName: string): boolean {
  const restrictedNames = ["containers"];
  return restrictedNames.includes(schemaName.toLowerCase());
}

export function getRoutePermissions(route: RouteSpec): {
  isPublic: boolean;
  requiredRoles: string[];
} {
  return {
    isPublic: !route.isAuthenticated && !route.isAuthorized,
    requiredRoles: route.authorizeRole || [],
  };
}

// Field type constants
export const Types = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Date: "date",
  Image: "image",
  ObjectId: "objectid",
  AutoIncrementId: "autoincrementid",
  ObjectIdArray: "objectidarray",
  StringArray: "stringarray",
  NumberArray: "numberarray",
  IntArray: "intarray",
} as const;
