import { MdBarChart } from "react-icons/md";
import type { Field } from "../../utils/api/container";
import type {
  DistributionBlockItemConfig,
  GroupBy,
  InfoBlockColorRule,
  InfoBlockItemConfig,
  InfoBlocksSource,
  LinkType,
  RelationMatrixConfig,
  TableActionInputType,
  TableActionModalType,
  TableActionOptionsSource,
} from "../../types/page";
import { buildDefaultSchemaActions } from "./designerFieldDefaults";

export const CHART_TYPES = [
  { value: "barChart", label: "Bar Chart", icon: MdBarChart },
  { value: "lineChart", label: "Line Chart", icon: MdBarChart },
  { value: "pieChart", label: "Pie Chart", icon: MdBarChart },
  { value: "areaChart", label: "Area Chart", icon: MdBarChart },
  { value: "radarChart", label: "Radar Chart", icon: MdBarChart },
  { value: "heatmapChart", label: "Heatmap", icon: MdBarChart },
  { value: "scatterChart", label: "Scatter", icon: MdBarChart },
  { value: "funnelChart", label: "Funnel", icon: MdBarChart },
  { value: "sankeyChart", label: "Sankey", icon: MdBarChart },
  { value: "sunburstChart", label: "Sunburst", icon: MdBarChart },
  { value: "treemapChart", label: "Treemap", icon: MdBarChart },
  { value: "calendarChart", label: "Calendar", icon: MdBarChart },
  { value: "bumpChart", label: "Bump", icon: MdBarChart },
  { value: "streamChart", label: "Stream", icon: MdBarChart },
  { value: "waffleChart", label: "Waffle", icon: MdBarChart },
  { value: "circlePackingChart", label: "Circle Packing", icon: MdBarChart },
];

export const DEFAULT_RELATION_MATRIX: RelationMatrixConfig = {
  rowSchemaName: "",
  rowIdField: "_id",
  rowLabelField: "",
  columnSchemaName: "",
  columnIdField: "_id",
  columnLabelField: "",
  targetArrayField: "",
  targetItemMatchField: "",
  columnLimit: 100,
  toggles: [
    { id: "edit-relations", label: "Edit relations", defaultValue: false, isUpperSide: true },
  ],
  editToggle: { toggleId: "edit-relations", when: true },
};

export interface OptionField {
  name: string;
  label: string;
  type: "text" | "number" | "boolean" | "select" | "array";
  required?: boolean;
  defaultValue?: unknown;
  placeholder?: string;
  options?: string[];
}

export const CHART_SPECIFIC_OPTIONS: Record<string, OptionField[]> = {
  barChart: [
    {
      name: "indexBy",
      label: "Index By (X-Axis Field)",
      type: "text",
      required: true,
      placeholder: "e.g. monthName",
    },
    {
      name: "keys",
      label: "Series Keys (Y-Axis Fields)",
      type: "array",
      required: true,
      placeholder: "e.g. totalQuantitySold, orderCount",
    },
    {
      name: "groupMode",
      label: "Group Mode",
      type: "select",
      options: ["stacked", "grouped"],
      defaultValue: "stacked",
    },
    {
      name: "layout",
      label: "Layout",
      type: "select",
      options: ["vertical", "horizontal"],
      defaultValue: "vertical",
    },
    {
      name: "padding",
      label: "Padding between bars",
      type: "number",
      defaultValue: 0.3,
    },
  ],
  lineChart: [
    {
      name: "curve",
      label: "Curve Type",
      type: "select",
      options: ["linear", "cardinal", "catmullRom", "monotoneX", "step"],
      defaultValue: "linear",
    },
    {
      name: "enableArea",
      label: "Enable Area Fill",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "useMesh",
      label: "Enable Interactive Mesh",
      type: "boolean",
      defaultValue: true,
    },
  ],
  pieChart: [
    {
      name: "id",
      label: "Slice ID Property",
      type: "text",
      placeholder: "e.g. categoryName",
    },
    {
      name: "value",
      label: "Slice Value Property",
      type: "text",
      placeholder: "e.g. totalQuantitySold",
    },
    {
      name: "innerRadius",
      label: "Inner Radius (0-1 for donut)",
      type: "number",
      defaultValue: 0.5,
    },
    {
      name: "padAngle",
      label: "Padding Angle",
      type: "number",
      defaultValue: 0.7,
    },
    {
      name: "cornerRadius",
      label: "Corner Radius",
      type: "number",
      defaultValue: 3,
    },
  ],
  radarChart: [
    {
      name: "indexBy",
      label: "Index By Field",
      type: "text",
      required: true,
      placeholder: "e.g. monthName",
    },
    {
      name: "keys",
      label: "Series Keys",
      type: "array",
      required: true,
      placeholder: "e.g. totalQuantitySold",
    },
    {
      name: "curve",
      label: "Curve Type",
      type: "select",
      options: ["linearClosed", "catmullRomClosed"],
      defaultValue: "linearClosed",
    },
  ],
  heatmapChart: [
    {
      name: "indexBy",
      label: "Index By Field",
      type: "text",
      required: true,
      placeholder: "e.g. monthName",
    },
    {
      name: "keys",
      label: "Series Keys",
      type: "array",
      required: true,
      placeholder: "e.g. totalQuantitySold",
    },
    {
      name: "forceSquare",
      label: "Force Square Cells",
      type: "boolean",
      defaultValue: false,
    },
  ],
  calendarChart: [
    {
      name: "from",
      label: "From Date (YYYY-MM-DD)",
      type: "text",
      placeholder: "e.g. 2026-01-01",
    },
    {
      name: "to",
      label: "To Date (YYYY-MM-DD)",
      type: "text",
      placeholder: "e.g. 2026-12-31",
    },
    {
      name: "emptyColor",
      label: "Empty Cell Color",
      type: "text",
      defaultValue: "#eeeeee",
    },
  ],
  treemapChart: [
    {
      name: "identity",
      label: "Identity Property",
      type: "text",
      defaultValue: "id",
    },
    {
      name: "value",
      label: "Value Property",
      type: "text",
      defaultValue: "value",
    },
  ],
  waffleChart: [
    {
      name: "total",
      label: "Total Waffle Cells",
      type: "number",
      required: true,
      defaultValue: 100,
    },
    {
      name: "rows",
      label: "Waffle Rows",
      type: "number",
      required: true,
      defaultValue: 10,
    },
    {
      name: "columns",
      label: "Waffle Columns",
      type: "number",
      required: true,
      defaultValue: 10,
    },
  ],
};

export const INFO_BLOCK_SOURCES: { value: InfoBlocksSource; label: string }[] = [
  { value: "static", label: "Static values" },
  { value: "schema", label: "Schema rows" },
  { value: "pipeline", label: "Pipeline request" },
  { value: "workflow", label: "Workflow request" },
];

export const createInfoBlockItem = (
  index: number,
  current?: InfoBlockItemConfig,
): InfoBlockItemConfig => ({
  title: current?.title || "",
  value: current?.value || (index === 0 ? "{{quantity}}" : ""),
  footer: current?.footer || "",
  color: current?.color || "",
  titleColorRules: current?.titleColorRules || [],
  footerColorRules: current?.footerColorRules || [],
});

export const resizeInfoBlockItems = (
  count: number,
  current: InfoBlockItemConfig[],
): InfoBlockItemConfig[] =>
  Array.from({ length: Math.min(Math.max(count, 1), 5) }, (_item, index) =>
    createInfoBlockItem(index, current[index]),
  );

export const DISTRIBUTION_BLOCK_COLORS = ["#4f46e5", "#4d7c0f", "#2563eb"];
export const DISTRIBUTION_BLOCK_LABELS = ["Strateji", "Soyut", "Parti / Diğer"];

export const createDistributionBlockItem = (
  index: number,
  current?: DistributionBlockItemConfig,
): DistributionBlockItemConfig => ({
  label: current?.label || DISTRIBUTION_BLOCK_LABELS[index] || "",
  value: current?.value || "",
  percent: current?.percent || "",
  color:
    current?.color ||
    DISTRIBUTION_BLOCK_COLORS[index % DISTRIBUTION_BLOCK_COLORS.length],
});

export const resizeDistributionBlockItems = (
  count: number,
  current: DistributionBlockItemConfig[],
): DistributionBlockItemConfig[] =>
  Array.from({ length: Math.min(Math.max(count, 1), 5) }, (_item, index) =>
    createDistributionBlockItem(index, current[index]),
  );

export const createInfoBlockColorRule = (): InfoBlockColorRule => ({
  condition: "",
  color: "#16a34a",
});

export const EMPTY_GROUP_BY: GroupBy = {
  groupByObjectId: "",
  groupByField: "",
  groupedSchemaName: "",
  groupedField: "",
  sourceSchemaName: "",
  sourceValueField: "_id",
  sourceLabelField: "",
  filterField: "",
};

export const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: "external", label: "External" },
  { value: "internal", label: "Internal" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export const ACTION_MODAL_TYPES: { value: TableActionModalType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "confirm", label: "Confirm" },
  { value: "form", label: "Form" },
];

export const ACTION_INPUT_TYPES: { value: TableActionInputType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "color", label: "Color" },
  { value: "time", label: "Time" },
  { value: "image", label: "Image" },
  { value: "password", label: "Password" },
  { value: "hour", label: "Hour" },
  { value: "monthYear", label: "Month Year" },
];

export const ACTION_OPTIONS_SOURCES: {
  value: TableActionOptionsSource;
  label: string;
}[] = [
  { value: "static", label: "Static" },
  { value: "schema", label: "Schema" },
];

export const ACTION_ICON_OPTIONS = [
  { value: "FiPlus", label: "Add" },
  { value: "FiEdit", label: "Edit" },
  { value: "HiOutlineTrash", label: "Trash" },
  { value: "MdTouchApp", label: "Action" },
  { value: "FiCheck", label: "Check" },
  { value: "FiX", label: "Close" },
  { value: "FiEye", label: "View" },
  { value: "FiSend", label: "Send" },
  { value: "FiDownload", label: "Download" },
  { value: "FiUpload", label: "Upload" },
  { value: "FiCopy", label: "Copy" },
  { value: "FiExternalLink", label: "External Link" },
  { value: "MdDone", label: "Done" },
  { value: "MdCancel", label: "Cancel" },
  { value: "MdApproval", label: "Approval" },
  { value: "MdArchive", label: "Archive" },
  { value: "MdRestore", label: "Restore" },
  { value: "MdEmail", label: "Email" },
  { value: "MdPhone", label: "Phone" },
];

export const getDefaultActionsForSource = (
  sourceType: "schema" | "pipeline" | "workflow",
  fields: Field[] = [],
) => (sourceType === "schema" ? buildDefaultSchemaActions(fields) : []);

export type TableSettingsTab =
  | "display"
  | "request"
  | "columns"
  | "links"
  | "cellClasses"
  | "rows"
  | "nestedRows"
  | "actions"
  | "bulkActions"
  | "filterInputs"
  | "relations"
  | "toggles";

export const TABLE_SETTINGS_TABS: { value: TableSettingsTab; label: string }[] = [
  { value: "display", label: "Display" },
  { value: "request", label: "Request" },
  { value: "columns", label: "Columns" },
  { value: "links", label: "Links" },
  { value: "cellClasses", label: "Cell Classes" },
  { value: "rows", label: "Row Classes" },
  { value: "nestedRows", label: "Nested Rows" },
  { value: "actions", label: "Actions" },
  { value: "bulkActions", label: "Bulk Actions" },
  { value: "filterInputs", label: "Filter Inputs" },
  { value: "relations", label: "Generated Relation Columns" },
  { value: "toggles", label: "Display Toggles" },
];
