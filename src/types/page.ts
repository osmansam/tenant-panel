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

export type TableActionKind = "edit" | "delete" | "update" | "link";
export type TableActionModalType = "none" | "confirm" | "form";
export type TableActionInputType =
  | "text"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "image"
  | "password"
  | "time"
  | "color"
  | "checkbox"
  | "hour"
  | "monthYear";
export type TableActionFormKeyType =
  | "string"
  | "number"
  | "color"
  | "date"
  | "boolean"
  | "checkbox"
  | "stringArray"
  | "numberArray"
  | "intArray";
export type TableActionOptionsSource = "static" | "schema";

export interface TableActionFieldConfig {
  field: string;
  required?: boolean;
  disabledCondition?: string;
}

export interface TableActionFormOptionConfig {
  value: string | number;
  label: string;
}

export interface TableActionFormFieldConfig {
  formKey: string;
  type: TableActionInputType;
  formKeyType?: TableActionFormKeyType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  requiredCondition?: string;
  disabledCondition?: string;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isNumberButtonsActive?: boolean;
  optionsSource?: TableActionOptionsSource;
  staticOptions?: TableActionFormOptionConfig[];
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

export type TableFilterPanelInputConfig = TableActionFormFieldConfig;

export interface TableFilterPanelConfig {
  inputs?: TableFilterPanelInputConfig[];
}

export interface TableActionSubmitConfig {
  workflowName?: string;
  workflowSchema?: string;
}

export interface TableActionConfig {
  id?: string;
  kind: TableActionKind;
  label?: string;
  buttonName?: string;
  icon?: string;
  order?: number;
  enabled?: boolean;
  modalType?: TableActionModalType;
  formFields?: TableActionFormFieldConfig[];
  fields?: string[];
  excludeFields?: string[];
  fieldOverrides?: TableActionFieldConfig[];
  constantValues?: Record<string, unknown>;
  constantValuesJson?: string;
  disabledCondition?: string;
  hiddenCondition?: string;
  requiredCondition?: string;
  confirmTitle?: string;
  confirmText?: string;
  submit?: TableActionSubmitConfig;
  linkTemplate?: string;
  linkType?: LinkType;
  className?: string;
  buttonClassName?: string;
  isButton?: boolean;
}

export interface TableComponentConfig {
  columns?: TableColumnConfig[];
  rows?: TableRowsConfig;
  cache?: TableCacheConfig;
  actions?: TableActionConfig[];
  filterPanel?: TableFilterPanelConfig;
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
