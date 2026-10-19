import type { Field, Routes } from "./api/container";
import { isContainerRouteAvailable } from "./containerRoutes";
import { generateMockData } from "./mockDataGenerator";

export type ContainerEndpointParam = {
  name: string;
  location: "path" | "query";
  required: boolean;
};

export type ContainerRouteEndpoint = {
  routeName: string;
  method: string;
  path: string;
  summary: string;
  description: string;
  body?: string;
  exampleBody?: string;
  exampleResponse?: string;
  params: ContainerEndpointParam[];
  isActive: boolean;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  authorizeRole: string[];
};

type RouteEndpointMeta = {
  method: string;
  path: string;
  summary: string;
  description: string;
  body?: string;
  params: ContainerEndpointParam[];
  buildExample?: (fields: Field[], schemaName: string) => unknown;
  buildResponseExample?: (fields: Field[]) => unknown;
};

export const DYNAMIC_API_BASE_PATH = "/dynamic";

export const DEFAULT_API_BASE_URL = "https://api-production.autoapi.org/api/v1/";

const schemaNameParam: ContainerEndpointParam = {
  name: "schemaName",
  location: "query",
  required: true,
};

const MAX_EXAMPLE_FIELDS = 8;

const exampleFieldNames = (fields: Field[]) =>
  fields
    .filter(
      (field) =>
        !field.equation && field.name !== "_id" && field.name !== "id",
    )
    .slice(0, MAX_EXAMPLE_FIELDS)
    .map((field) => field.name);

const mockRecords = (fields: Field[], count: number) =>
  generateMockData<Record<string, unknown> & { _id: string }>(fields, count);

const withoutId = (record: Record<string, unknown>) => {
  const copy = { ...record };
  delete copy._id;
  return copy;
};

const firstRecord = (fields: Field[]) =>
  withoutId(mockRecords(fields, 1)[0] ?? {});

const paginatedResponse = (fields: Field[]) => {
  const items = mockRecords(fields, 2);
  return {
    items,
    totalItems: items.length,
    totalPages: 1,
    currentPage: 1,
  };
};

const ROUTE_ENDPOINT_META: Record<string, RouteEndpointMeta> = {
  CreateDynamicModelItem: {
    method: "POST",
    path: `${DYNAMIC_API_BASE_PATH}?schemaName={schemaName}`,
    summary: "Create a record",
    description: "Creates a single item in this collection.",
    body: "JSON object of field values.",
    params: [schemaNameParam],
    buildExample: (fields) => firstRecord(fields),
  },
  CreateMultipleDynamicModelItem: {
    method: "POST",
    path: `${DYNAMIC_API_BASE_PATH}/multiple?schemaName={schemaName}`,
    summary: "Create multiple records",
    description: "Creates many items in one request.",
    body: "JSON array of field-value objects.",
    params: [schemaNameParam],
    buildExample: (fields) => mockRecords(fields, 2).map(withoutId),
  },
  ExportDynamicModelItems: {
    method: "POST",
    path: `${DYNAMIC_API_BASE_PATH}/export?schemaName={schemaName}`,
    summary: "Export records",
    description: "Exports the records of this collection.",
    body: "JSON object with fields, filters, search, page, and limit.",
    params: [schemaNameParam],
    buildExample: (fields, schemaName) => ({
      schemaName,
      fields: exampleFieldNames(fields),
      filters: {},
      search: "",
      page: 1,
      limit: 100,
    }),
  },
  GetAllDynamicModelItems: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}?schemaName={schemaName}`,
    summary: "List records",
    description: "Returns every item in this collection.",
    params: [schemaNameParam],
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
  GetAllDynamicModelItemsWithPagination: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/page?schemaName={schemaName}&page={page}&limit={limit}`,
    summary: "List records with pagination",
    description: "Returns a paginated, sortable, and filterable list.",
    params: [
      schemaNameParam,
      { name: "page", location: "query", required: false },
      { name: "limit", location: "query", required: false },
      { name: "search", location: "query", required: false },
      { name: "sort", location: "query", required: false },
      { name: "asc", location: "query", required: false },
    ],
    buildResponseExample: paginatedResponse,
  },
  GetTableSource: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/table-source?schemaName={schemaName}&sourceType={sourceType}`,
    summary: "Get table source data",
    description: "Loads rows from a schema, pipeline, or workflow binding.",
    params: [
      schemaNameParam,
      { name: "sourceType", location: "query", required: true },
    ],
    buildResponseExample: paginatedResponse,
  },
  TestPipeline: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/testPipeline?schemaName={schemaName}`,
    summary: "Test a pipeline",
    description: "Runs a pipeline stage to preview its results.",
    body: "JSON object with the pipeline stage to test.",
    params: [schemaNameParam],
    buildExample: () => ({
      pipelineStage: {
        name: "example-stage",
        pipelineJson: '[{"$match": {}}]',
        isActive: true,
      },
    }),
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
  GetPipeline: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/pipeline?schemaName={schemaName}&pipelineName={pipelineName}`,
    summary: "Run a pipeline",
    description: "Executes a saved aggregation pipeline.",
    params: [
      schemaNameParam,
      { name: "pipelineName", location: "query", required: true },
    ],
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
  ExecuteWorkflow: {
    method: "POST",
    path: `${DYNAMIC_API_BASE_PATH}/workflow/{workflowName}?schemaName={schemaName}`,
    summary: "Execute a workflow",
    description: "Runs a workflow by name with the given payload.",
    body: "JSON object or array passed to the workflow.",
    params: [
      { name: "workflowName", location: "path", required: true },
      schemaNameParam,
    ],
    buildExample: (fields) => ({ record: firstRecord(fields) }),
  },
  HandleSearchDynamicModelItem: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/search?schemaName={schemaName}&search={searchTerm}`,
    summary: "Search records",
    description: "Searches the collection's searchable fields.",
    params: [
      schemaNameParam,
      { name: "search", location: "query", required: true },
    ],
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
  HandleFilterDynamicModelItem: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/filter?schemaName={schemaName}`,
    summary: "Filter records",
    description: "Filters records with field operators passed as query parameters.",
    params: [schemaNameParam],
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
  ExecuteDynamicAPI: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/api?schemaName={schemaName}&apiName={apiName}`,
    summary: "Execute a dynamic API",
    description: "Runs a saved dynamic API for this collection.",
    body: "JSON request body (optional).",
    params: [
      schemaNameParam,
      { name: "apiName", location: "query", required: true },
    ],
    buildExample: (fields) => firstRecord(fields),
  },
  UpdateMultipleDynamicModelItem: {
    method: "PATCH",
    path: `${DYNAMIC_API_BASE_PATH}/multiple?schemaName={schemaName}`,
    summary: "Update multiple records",
    description: "Applies updates to many records at once.",
    body: "JSON array of records including the _id of each record.",
    params: [schemaNameParam],
    buildExample: (fields) => mockRecords(fields, 2),
  },
  DeleteMultipleDynamicModelItem: {
    method: "DELETE",
    path: `${DYNAMIC_API_BASE_PATH}/multiple?schemaName={schemaName}`,
    summary: "Delete multiple records",
    description: "Deletes many records by id.",
    body: "JSON array of { _id } objects.",
    params: [schemaNameParam],
    buildExample: (fields) =>
      mockRecords(fields, 2).map((record) => ({ _id: record._id })),
  },
  UpdateDynamicModelItem: {
    method: "PATCH",
    path: `${DYNAMIC_API_BASE_PATH}/{id}?schemaName={schemaName}`,
    summary: "Update a record",
    description: "Updates a single record by id.",
    body: "JSON object of field updates.",
    params: [
      { name: "id", location: "path", required: true },
      schemaNameParam,
    ],
    buildExample: (fields) => firstRecord(fields),
  },
  DeleteDynamicModelItem: {
    method: "DELETE",
    path: `${DYNAMIC_API_BASE_PATH}/{id}?schemaName={schemaName}`,
    summary: "Delete a record",
    description: "Deletes a single record by id.",
    params: [
      { name: "id", location: "path", required: true },
      schemaNameParam,
    ],
  },
  GetDynamicModelItem: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/{id}?schemaName={schemaName}`,
    summary: "Get a record",
    description: "Returns a single record by id.",
    params: [
      { name: "id", location: "path", required: true },
      schemaNameParam,
    ],
    buildResponseExample: (fields) => mockRecords(fields, 1)[0] ?? {},
  },
  GetItemsForSelection: {
    method: "GET",
    path: `${DYNAMIC_API_BASE_PATH}/selection?schemaName={schemaName}&fieldName={fieldName}`,
    summary: "Get records for selection",
    description: "Loads lightweight options for relation fields.",
    params: [
      schemaNameParam,
      { name: "fieldName", location: "query", required: true },
      { name: "valueField", location: "query", required: false },
      { name: "limit", location: "query", required: false },
    ],
    buildResponseExample: (fields) => mockRecords(fields, 2),
  },
};

const humanizeRouteName = (routeName: string) =>
  routeName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

const routeMetaLookup = new Map(
  Object.entries(ROUTE_ENDPOINT_META).map(([routeName, meta]) => [
    routeName.toLowerCase(),
    meta,
  ]),
);

const getRouteMeta = (routeName: string): RouteEndpointMeta | undefined =>
  ROUTE_ENDPOINT_META[routeName] ?? routeMetaLookup.get(routeName.toLowerCase());

const BODY_METHODS = ["POST", "PATCH", "PUT", "DELETE"];

const fillSchemaName = (path: string, schemaName: string) =>
  path.split("{schemaName}").join(schemaName || "{schemaName}");

export const getContainerRouteEndpoints = (
  routes: Routes | undefined,
  schemaName: string,
  fields: Field[] = [],
): ContainerRouteEndpoint[] =>
  Object.entries(routes || {})
    .filter(
      ([routeName, spec]) =>
        isContainerRouteAvailable(routeName) && Boolean(spec?.isActive),
    )
    .map(([routeName, spec]) => {
      const meta = getRouteMeta(routeName);
      const method = (meta?.method ?? spec?.method ?? "GET").toUpperCase();
      const canHaveBody = BODY_METHODS.includes(method);

      const exampleBody = meta?.buildExample
        ? JSON.stringify(meta.buildExample(fields, schemaName), null, 2)
        : canHaveBody
          ? JSON.stringify(
              method === "DELETE" ? { _id: "mock_id_1" } : firstRecord(fields),
              null,
              2,
            )
          : undefined;

      const exampleResponse = meta?.buildResponseExample
        ? JSON.stringify(meta.buildResponseExample(fields), null, 2)
        : method === "GET" && !meta?.body
          ? JSON.stringify(mockRecords(fields, 2), null, 2)
          : undefined;

      return {
        routeName,
        method,
        path: fillSchemaName(
          meta?.path ?? `${DYNAMIC_API_BASE_PATH}?schemaName={schemaName}`,
          schemaName,
        ),
        summary: meta?.summary ?? humanizeRouteName(routeName),
        description: meta?.description ?? "",
        body: meta?.body,
        exampleBody: exampleBody,
        exampleResponse: exampleResponse,
        params: meta?.params ?? [schemaNameParam],
        isActive: Boolean(spec?.isActive),
        isAuthenticated: Boolean(spec?.isAuthenticated),
        isAuthorized: Boolean(spec?.isAuthorized),
        authorizeRole: spec?.authorizeRole ?? [],
      };
    });

export const getApiBaseUrl = (tenantSlug?: string, projectSlug?: string): string => {
  if (!tenantSlug || !projectSlug) return DEFAULT_API_BASE_URL;
  return `${DEFAULT_API_BASE_URL}${encodeURIComponent(tenantSlug)}/${encodeURIComponent(
    projectSlug,
  )}/`;
};

export const buildEndpointRequestUrl = (
  endpointPath: string,
  tenantSlug?: string,
  projectSlug?: string,
): string =>
  `${getApiBaseUrl(tenantSlug, projectSlug)}${endpointPath.replace(/^\/+/, "")}`;
