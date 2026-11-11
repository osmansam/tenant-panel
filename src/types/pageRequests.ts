import type { ParameterBinding } from "./page";

export type JsonRequestValue = null | boolean | number | string | JsonRequestValue[] | { [key: string]: JsonRequestValue };
export type PageRequestSource = {
  transport: "table-source" | "list" | "page" | "pipeline" | "workflow" | "selection";
  schemaName: string;
  kind?: "schema" | "pipeline" | "workflow";
  pipelineName?: string;
  workflowName?: string;
  fieldName?: string;
  valueField?: string;
  dataFields?: string[];
};
export interface PageRequestControls {
  page?: number;
  limit?: number;
  sort?: string | null;
  asc?: boolean;
  search?: string | null;
}
export interface PageRequestValues {
  params?: Record<string, JsonRequestValue>;
  filters?: Record<string, JsonRequestValue>;
  controls?: PageRequestControls;
  fields?: string[];
}
export interface PageRequestParameterBindings {
  params?: Record<string, ParameterBinding>;
  filters?: Record<string, ParameterBinding>;
  controls?: Partial<Record<keyof PageRequestControls, ParameterBinding>>;
}
export interface PageRequestResult {
  kind: "records" | "value";
  path?: string[];
  totalPath?: string[];
}
export interface PageRequestDefinition {
  id: string;
  name: string;
  source: PageRequestSource;
  defaults?: PageRequestValues;
  bindings?: PageRequestParameterBindings;
  result: PageRequestResult;
}
export interface PageRequestConnection {
  requestId: string;
  overrides?: PageRequestValues;
  result?: PageRequestResult;
}
