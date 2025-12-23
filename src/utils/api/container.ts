import { useGetList } from "./factory";
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
  invalidateKeys?: {
    key: string;
    defaultValue: string | boolean | number | undefined | string[] | number[]|undefined
  }[];
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
  /** NOTE: Go bson tag is `isActivated`; keeping that key for parity */
  isActivated: boolean;
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

/** The main container model */
export interface ContainerModel {
  _id?: Id;
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
  frontend?: Frontend;
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

export function useGetContainers() {
  return useGetList<ContainerModel>("/container");
}
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
