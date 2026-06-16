/**
 * Types matching the Go backend PageModel structure
 */

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

export interface GroupBy {
  groupByObjectId: string; // Schema name to group by (e.g., "can")
  groupByField: string; // Field name to display from grouped object (e.g., "name")
}

export type LinkType = "external" | "internal" | "email" | "phone" | "file";

export interface RowClassConfig {
  condition: string;
  className: string;
}

export interface TableLinkConfig {
  template?: string;
  labelField?: string;
  type?: LinkType;
}

export interface TableColumnConfig {
  field: string;
  displayName?: string;
  cellClassName?: RowClassConfig[];
  link?: TableLinkConfig;
}

export interface TableRowsConfig {
  className?: RowClassConfig[];
}

export interface TableCacheConfig {
  invalidateKeys?: string[];
}

export interface TableComponentConfig {
  columns?: TableColumnConfig[];
  rows?: TableRowsConfig;
  cache?: TableCacheConfig;
}

export type ComponentType =
  | "table"
  | "tabPanel"
  | "form"
  | "text"
  | "custom"
  // Chart types
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

export interface TabContent {
  id?: string; // Tab identifier for operations like Excel upload
  title: string;
  icon?: string;
  components: ComponentBlock[];
}

// Alias for backend compatibility
export type TabPanelTab = TabContent;

export interface ComponentBlock {
  id: string;
  type: ComponentType;
  title?: string;
  order?: number;
  dataBinding?: DataBinding;
  groupBy?: GroupBy; // Grouping configuration for table components
  table?: TableComponentConfig;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  tabs?: TabContent[]; // For tabPanel type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
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

export interface PageModel {
  id?: string;
  name: string;
  icon?: string;
  slug?: string;
  order?: number;
  isGroupOnly?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections: GridSection[]; // Array of grid sections directly
  subPage?: PageModel; // Nested sub-page
}
