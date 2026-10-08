import type { CreateContainerRawPayload } from "../../../utils/api/container";

const defaultRoute = (Method: string) => ({
  IsAuthenticated: false,
  IsAuthorized: false,
  AuthorizeRole: [],
  IsActive: true,
  Method,
});

export const buildCreateContainerPayload = (
  schemaName: string,
): CreateContainerRawPayload => ({
  SchemaName: schemaName.trim(),
  Fields: [],
  Routes: {
    CreateDynamicModelItem: defaultRoute("POST"),
    GetAllDynamicModelItems: defaultRoute("GET"),
    CreateMultipleDynamicModelItem: defaultRoute("POST"),
    GetAllDynamicModelItemsWithPagination: defaultRoute("GET"),
    GetPipeline: defaultRoute("GET"),
    TestPipeline: defaultRoute("POST"),
    HandleSearchDynamicModelItem: defaultRoute("GET"),
    HandleFilterDynamicModelItem: defaultRoute("GET"),
    DeleteDynamicModelItem: defaultRoute("DELETE"),
    UpdateDynamicModelItem: defaultRoute("PATCH"),
    UpdateMultipleDynamicModelItem: defaultRoute("PATCH"),
    GetDynamicModelItem: defaultRoute("GET"),
    DeleteMultipleDynamicModelItem: defaultRoute("DELETE"),
    ExportDynamicModelItems: defaultRoute("GET"),
    GetItemsForSelection: defaultRoute("GET"),
  },
  Redis: {
    IsRedisCached: false,
    CacheTime: 10,
    TriggeredRedisCaches: [],
  },
  Pipelines: [],
  DynamicFunctions: [],
  DynamicApis: [],
  IsAuthContainer: false,
  IsRegisterActive: false,
  PopulatedRoutes: [],
  Indexes: null,
  RowAccess: null,
});
