/**
 * Types matching the Go backend PageModel structure
 */

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
  | "monthYear"
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
  | "currentMonthYear"
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
      field?: "value" | "month" | "year" | "start" | "end" | "preset" | "timezone";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  parameters?: Record<string, ParameterBinding>;
}

export interface GroupBy {
  groupByObjectId: string; // Schema name to group by (e.g., "can")
  groupByField: string; // Field name to display from grouped object (e.g., "name")
  groupedSchemaName?: string;
  groupedField?: string;
  sourceSchemaName?: string;
  sourceValueField?: string;
  sourceLabelField?: string;
  filterField?: string;
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

export type TableColumnType =
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

export interface TableComputedLabelRule {
  condition?: string;
  value?: string;
}

export interface TableProgressBarColorRule {
  condition?: string;
  color?: string;
}

export interface TableProgressBarConfig {
  sourceField?: string;
  max?: number;
  maxField?: string;
  color?: string;
  trackColor?: string;
  height?: number;
  width?: number;
  showValue?: boolean;
  colorRules?: TableProgressBarColorRule[];
}

export interface TableColumnConfig {
  field: string;
  type?: TableColumnType;
  displayName?: string;
  computedLabelRules?: TableComputedLabelRule[];
  fallbackValue?: string;
  progressBar?: TableProgressBarConfig;
  cellClassName?: RowClassConfig[];
  link?: TableLinkConfig;
}

export interface TableRowsConfig {
  className?: RowClassConfig[];
}

export interface TableNestedRowColumnConfig {
  field: string;
  displayName?: string;
  type?: TableColumnType;
}

export interface TableNestedRowsConfig {
  enabled?: boolean;
  field?: string;
  header?: string;
  columns?: TableNestedRowColumnConfig[];
}

export interface TableCacheConfig {
  invalidateKeys?: string[];
}

export type TableActionKind = "create" | "edit" | "delete" | "update" | "link";
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
  id?: string;
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

export interface TableBulkActionsConfig {
  edit?: TableActionConfig;
  delete?: TableActionConfig;
}

export interface TableActionSubmitConfig {
  workflowName?: string;
  workflowSchema?: string;
  functionName?: string;
}

export interface TableActionConfig {
  id?: string;
  key?: string;
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
  path?: string;
  linkTemplate?: string;
  linkType?: LinkType;
  className?: string;
  buttonClassName?: string;
  isButton?: boolean;
}

export interface TableComponentConfig {
  columns?: TableColumnConfig[];
  rows?: TableRowsConfig;
  nestedRows?: TableNestedRowsConfig;
  cache?: TableCacheConfig;
  addButton?: TableActionConfig;
  actions?: TableActionConfig[];
  bulkActions?: TableBulkActionsConfig;
  filterPanel?: TableFilterPanelConfig;
}


export type FormAreaKey = "top" | "main" | "bottom" | "left" | "right";
export type FormFieldWidth = "full" | "half" | "third";

export interface FormAreaConfig {
  key: FormAreaKey;
  title?: string;
  order?: number;
  className?: string;
}

export interface FormLayoutConfig {
  variant?: "modal" | "page";
  columns?: 1 | 2 | 3;
  areas?: FormAreaConfig[];
}

export interface FormFieldConfig extends TableActionFormFieldConfig {
  area?: FormAreaKey;
  order?: number;
  width?: FormFieldWidth;
}

export interface FormObjectListDisplayConfig {
  primaryField?: string;
  primaryTemplate?: string;
  secondaryField?: string;
  secondaryTemplate?: string;
  imageField?: string;
}

export interface FormObjectActionConfig {
  kind: "editObject" | "removeObject" | "increment" | "decrement";
  label?: string;
  icon?: string;
  position?: "start" | "end";
  field?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface FormActionConfig {
  kind: "addObject" | "submit";
  label?: string;
  buttonName?: string;
  area?: FormAreaKey;
  targetObjectList?: string;
  sourceFields?: string[];
  clearSourceFields?: string[];
  preserveSourceFields?: string[];
  enabled?: boolean;
  order?: number;
}

export interface FormObjectListConfig {
  key: string;
  title?: string;
  area?: FormAreaKey;
  source?: "embedded";
  itemFields?: string[];
  addAction?: FormActionConfig;
  display?: FormObjectListDisplayConfig;
  actions?: FormObjectActionConfig[];
}

export type FormSubmitMode = "create" | "createMany" | "workflow";

export interface FormSubmitConfig {
  mode?: FormSubmitMode;
  buttonName?: string;
  constantValues?: Record<string, unknown>;
  bulkObjectListKey?: string;
  workflowSchema?: string;
  workflowName?: string;
}

export interface FormComponentConfig {
  title?: string;
  schemaName: string;
  layout?: FormLayoutConfig;
  fields?: FormFieldConfig[];
  objectLists?: FormObjectListConfig[];
  actions?: FormActionConfig[];
  submit?: FormSubmitConfig;
}

export type InfoBlocksSource = "static" | "schema" | "pipeline" | "workflow";

export interface InfoBlockColorRule {
  condition?: string;
  color?: string;
}

export interface InfoBlockItemConfig {
  title?: string;
  value?: string;
  footer?: string;
  color?: string;
  titleColorRules?: InfoBlockColorRule[];
  footerColorRules?: InfoBlockColorRule[];
}

export interface InfoBlocksConfig {
  source?: InfoBlocksSource;
  items?: InfoBlockItemConfig[];
  isDynamic?: boolean;
  dynamicLimit?: number;
  dynamicItem?: InfoBlockItemConfig;
}

export interface DistributionBlockItemConfig {
  label?: string;
  value?: string;
  percent?: string;
  color?: string;
}

export interface DistributionBlocksConfig {
  source?: InfoBlocksSource;
  items?: DistributionBlockItemConfig[];
  isDynamic?: boolean;
  dynamicLimit?: number;
  dynamicItem?: DistributionBlockItemConfig;
}

export type ComponentType =
  | "table"
  | "tabPanel"
  | "form"
  | "text"
  | "custom"
  | "infoBlocks"
  | "distributionBlocks"
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
  stateKey?: string;
  outputs?: ComponentOutputDefinition[];
  order?: number;
  dataBinding?: DataBinding;
  groupBy?: GroupBy; // Grouping configuration for table components
  table?: TableComponentConfig;
  form?: FormComponentConfig;
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
  variables?: PageVariableDefinition[];
  filters?: PageFilterDefinition[];
  id?: string;
  name: string;
  icon?: string;
  slug?: string;
  order?: number;
  isGroupOnly?: boolean;
  isOnSidebar?: boolean;
  isMainPage?: boolean;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  authorizeRole?: string[];
  sections: GridSection[]; // Array of grid sections directly
  subPage?: PageModel; // Nested sub-page
}
