/**
 * Grid Layout System Types
 *
 * This file defines the core types for the dynamic layout engine.
 * These types match the backend data structure for rendering dynamic pages.
 */

import type { TableFilterPanelConfig } from "./page";

/**
 * Data binding configuration for components
 */
export interface DataBinding {
  /** Type of data source */
  kind: "schema" | "pipeline" | "workflow" | "api";
  /** Name of the schema (when kind="schema") */
  schemaName?: string;
  /** Name of the pipeline (when kind="pipeline") */
  pipelineName?: string;
  /** Name of the workflow (when kind="workflow") */
  workflowName?: string;
  /** API endpoint (when kind="api") */
  apiEndpoint?: string;
  /** Additional parameters for the data source */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
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

export interface TableCacheConfig {
  invalidateKeys?: string[];
}

export interface TableComponentConfig {
  columns?: TableColumnConfig[];
  rows?: TableRowsConfig;
  cache?: TableCacheConfig;
  filterPanel?: TableFilterPanelConfig;
}

/**
 * Component block - represents a single UI component
 */
export interface ComponentBlock {
  /** Unique identifier for the component */
  id: string;
  /** Type of component to render */
  type: "table" | "chart" | "form" | "text" | "kpi" | "custom";
  /** Optional title for the component */
  title?: string;
  /** Order for stacking multiple components in a cell */
  order: number;
  /** Data binding configuration */
  dataBinding?: DataBinding;
  /** Table-specific display, row, link, and cache config */
  table?: TableComponentConfig;
  /** Additional props passed to the component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

/**
 * Grid cell - represents a single cell in the grid layout
 */
export interface GridCell {
  /** Unique identifier for the cell */
  id: string;
  /** 1-based row index */
  row: number;
  /** 1-based column index */
  column: number;
  /** Number of rows this cell spans (default = 1) */
  rowSpan?: number;
  /** Number of columns this cell spans (default = 1) */
  colSpan?: number;
  /** Components to render inside this cell */
  components: ComponentBlock[];
}

/**
 * Grid section - represents a complete grid layout
 */
export interface GridSection {
  /** Total number of columns in the grid */
  columns: number;
  /** Spacing between cells in pixels */
  gap: number;
  /** Array of cells to render in this grid */
  cells: GridCell[];
}

/**
 * Section - represents a page section with optional tab configuration
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;
  /** Optional title for the section */
  title?: string;
  /** Grid layout configuration */
  grid: GridSection;
  /** Optional tab configuration if this section is part of a tab panel */
  tabConfig?: {
    /** Tab label */
    label: string;
    /** Tab icon */
    icon?: string;
    /** Tab order */
    order: number;
  };
}

/**
 * Page layout - represents a complete page with multiple sections
 */
export interface PageLayout {
  /** Page identifier */
  pageId: string;
  /** Page title */
  title: string;
  /** Array of sections to render */
  sections: Section[];
  /** Optional metadata */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}
