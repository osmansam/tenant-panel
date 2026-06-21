import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiEdit2,
  FiGrid,
  FiLayout,
  FiPlus,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import { MdBarChart, MdTab, MdTableChart } from "react-icons/md";
import {
  ComponentBlock,
  DistributionBlockItemConfig,
  DistributionBlocksConfig,
  GroupBy,
  InfoBlockColorRule,
  InfoBlockItemConfig,
  InfoBlocksConfig,
  InfoBlocksSource,
  LinkType,
  GridCell,
  GridSection,
  RowClassConfig,
  TableActionConfig,
  TableActionFormFieldConfig,
  TableActionFormKeyType,
  TableActionInputType,
  TableActionOptionsSource,
  TableActionModalType,
  TableColumnConfig,
  TableComponentConfig,
  TableFilterPanelInputConfig,
  TabPanelTab,
} from "../../types/page";
import {
  ContainerModel,
  DynamicWorkflow,
  Field,
  PipelineStage,
  WorkflowStep,
  useGetContainers,
} from "../../utils/api/container";
import type { OptionType } from "../../types";
import { getIconByName } from "../../utils/menuIcons";
import SelectInput from "../panelComponents/FormElements/SelectInput";
import { CellExcelUploadModal } from "./CellExcelUploadModal";

interface PageDesignerProps {
  sections: GridSection[];
  onChange: (sections: GridSection[]) => void;
}

const CHART_TYPES = [
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

const INFO_BLOCK_SOURCES: { value: InfoBlocksSource; label: string }[] = [
  { value: "static", label: "Static values" },
  { value: "schema", label: "Schema rows" },
  { value: "pipeline", label: "Pipeline request" },
  { value: "workflow", label: "Workflow request" },
];

const createInfoBlockItem = (
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

const resizeInfoBlockItems = (
  count: number,
  current: InfoBlockItemConfig[],
): InfoBlockItemConfig[] =>
  Array.from({ length: Math.min(Math.max(count, 1), 5) }, (_item, index) =>
    createInfoBlockItem(index, current[index]),
  );

const DISTRIBUTION_BLOCK_COLORS = ["#4f46e5", "#4d7c0f", "#2563eb"];
const DISTRIBUTION_BLOCK_LABELS = ["Strateji", "Soyut", "Parti / Diğer"];

const createDistributionBlockItem = (
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

const resizeDistributionBlockItems = (
  count: number,
  current: DistributionBlockItemConfig[],
): DistributionBlockItemConfig[] =>
  Array.from({ length: Math.min(Math.max(count, 1), 5) }, (_item, index) =>
    createDistributionBlockItem(index, current[index]),
  );

const createInfoBlockColorRule = (): InfoBlockColorRule => ({
  condition: "",
  color: "#16a34a",
});

const EMPTY_GROUP_BY: GroupBy = {
  groupByObjectId: "",
  groupByField: "",
  groupedSchemaName: "",
  groupedField: "",
  sourceSchemaName: "",
  sourceValueField: "_id",
  sourceLabelField: "",
  filterField: "",
};

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: "external", label: "External" },
  { value: "internal", label: "Internal" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];


const ACTION_MODAL_TYPES: { value: TableActionModalType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "confirm", label: "Confirm" },
  { value: "form", label: "Form" },
];

const ACTION_KIND_OPTIONS: {
  value: TableActionConfig["kind"];
  label: string;
}[] = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "update", label: "Update" },
  { value: "link", label: "Link" },
];

const ACTION_INPUT_TYPES: { value: TableActionInputType; label: string }[] = [
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

const formKeyTypeForActionInput = (
  type: TableActionInputType,
  isMultiple?: boolean,
): TableActionFormKeyType => {
  if (isMultiple) return "stringArray";
  if (type === "number") return "number";
  if (type === "date" || type === "time" || type === "hour" || type === "monthYear") {
    return "date";
  }
  if (type === "checkbox") return "boolean";
  if (type === "color") return "color";
  return "string";
};

const isActionNumberInput = (type?: string) =>
  (type || "").toLowerCase() === "number";

const ACTION_OPTIONS_SOURCES: {
  value: TableActionOptionsSource;
  label: string;
}[] = [
  { value: "static", label: "Static" },
  { value: "schema", label: "Schema" },
];

const ACTION_ICON_OPTIONS = [
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

const getDefaultActionsForSource = (
  sourceType: "schema" | "pipeline" | "workflow",
  fields: Field[] = [],
) => (sourceType === "schema" ? buildDefaultSchemaActions(fields) : []);

type TableSettingsTab =
  | "columns"
  | "links"
  | "cellClasses"
  | "rows"
  | "actions"
  | "filterInputs";

const TABLE_SETTINGS_TABS: { value: TableSettingsTab; label: string }[] = [
  { value: "columns", label: "Columns" },
  { value: "links", label: "Links" },
  { value: "cellClasses", label: "Cell Classes" },
  { value: "rows", label: "Row Classes" },
  { value: "actions", label: "Actions" },
  { value: "filterInputs", label: "Filter Inputs" },
];

const buildTableColumnsFromFields = (fields: Field[]): TableColumnConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .map((field) => ({
      field: field.name,
      type: "field" as const,
      displayName: field.frontend?.displayName || "",
      cellClassName: field.frontend?.rowKeyClassName || [],
      link: field.frontend?.linkTemplate
        ? {
            template: field.frontend.linkTemplate,
            labelField: field.frontend.linkLabelField,
            type: field.frontend.linkType || "external",
      }
      : undefined,
    }));

const actionInputTypeFromField = (field: Field): TableActionInputType => {
  const fieldType = (field.type || "").toLowerCase();
  if (fieldType.includes("image")) return "image";
  if (fieldType.includes("date")) return "date";
  if (
    fieldType.includes("number") ||
    fieldType.includes("int") ||
    fieldType.includes("float") ||
    fieldType.includes("double")
  ) {
    return "number";
  }
  if (fieldType.includes("bool")) return "checkbox";
  if (
    fieldType === "objectid" ||
    fieldType === "autoincrementid" ||
    fieldType === "objectidarray" ||
    (field.enumList && field.enumList.length > 0)
  ) {
    return "select";
  }
  return "text";
};

const buildActionFormFieldsFromFields = (
  fields: Field[],
): TableActionFormFieldConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .filter((field) => !field.equation)
    .map((field) => {
      const inputType = actionInputTypeFromField(field);
      const fieldType = (field.type || "").toLowerCase();
      const isMultiple = fieldType === "objectidarray";
      return {
        formKey: field.name,
        type: inputType,
        formKeyType: formKeyTypeForActionInput(inputType, isMultiple),
        label: field.frontend?.displayName || field.name,
        placeholder: field.frontend?.displayName || field.name,
        required: field.tag?.includes("required") || false,
        disabledCondition: "",
        requiredCondition: "",
        isMultiple,
        optionsSource:
          inputType === "select" && field.objectSchemaName
            ? "schema"
            : "static",
        staticOptionsJson:
          field.enumList && field.enumList.length > 0
            ? JSON.stringify(
                field.enumList.map((value) => ({ value, label: String(value) })),
                null,
                2,
              )
            : "[]",
        sourceSchemaName: field.objectSchemaName || "",
        sourceValueField: "_id",
        sourceLabelField: field.populationSettings?.inputSelectionField || "",
        sourceFilterCondition: "",
      };
    });

const buildFilterPanelInputsFromFields = (
  fields: Field[],
): TableFilterPanelInputConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .filter((field) => !field.equation)
    .filter((field) => {
      const fieldType = (field.type || "").toLowerCase();
      return fieldType !== "image" && fieldType !== "img";
    })
    .map((field) => {
      const fieldType = (field.type || "").toLowerCase();
      const baseInputType = actionInputTypeFromField(field);
      const isBoolean = fieldType.includes("bool");
      const inputType: TableActionInputType = isBoolean ? "select" : baseInputType;
      const isMultiple =
        fieldType === "objectidarray" ||
        fieldType === "stringarray" ||
        fieldType === "intarray" ||
        fieldType === "numberarray" ||
        fieldType === "string[]" ||
        fieldType === "int[]" ||
        fieldType === "number[]";
      const staticOptions =
        field.enumList && field.enumList.length > 0
          ? field.enumList.map((value) => ({ value, label: String(value) }))
          : isBoolean
            ? [
                { value: "true", label: "True" },
                { value: "false", label: "False" },
              ]
            : [];

      return {
        formKey: field.name,
        type: inputType,
        formKeyType: formKeyTypeForActionInput(inputType, isMultiple),
        label: field.frontend?.displayName || field.name,
        placeholder: field.frontend?.displayName || field.name,
        required: false,
        disabledCondition: "",
        requiredCondition: "",
        isDisabled: false,
        isMultiple,
        optionsSource:
          inputType === "select" && field.objectSchemaName
            ? "schema"
            : "static",
        staticOptionsJson: JSON.stringify(staticOptions, null, 2),
        sourceSchemaName: field.objectSchemaName || "",
        sourceValueField: "_id",
        sourceLabelField: field.populationSettings?.inputSelectionField || "",
        sourceFilterCondition: "",
      };
    });

const buildDefaultSchemaActions = (fields: Field[]): TableActionConfig[] => [
  {
    id: "default-edit",
    kind: "edit",
    label: "Edit",
    icon: "FiEdit",
    order: 1,
    enabled: true,
    modalType: "form",
    formFields: buildActionFormFieldsFromFields(fields),
  },
  {
    id: "default-delete",
    kind: "delete",
    label: "Delete",
    icon: "HiOutlineTrash",
    order: 2,
    enabled: true,
    modalType: "confirm",
    confirmText: "GeneralDeleteMessage",
  },
];

const buildDefaultCreateAction = (fields: Field[]): TableActionConfig => ({
  id: "default-create",
  kind: "create",
  label: "Add",
  buttonName: "Create",
  icon: "FiPlus",
  order: 1,
  enabled: true,
  modalType: "form",
  formFields: buildActionFormFieldsFromFields(fields),
});

const hydrateSchemaEditActionFields = (
  actions: TableActionConfig[],
  fields: Field[],
): TableActionConfig[] =>
  actions
    .filter((action) => action.kind !== "create")
    .map((action) =>
      action.kind === "edit" && action.formFields === undefined
        ? { ...action, formFields: buildActionFormFieldsFromFields(fields) }
        : action,
    );

const hydrateSchemaAddButton = (
  addButton: TableActionConfig | undefined,
  actions: TableActionConfig[] | undefined,
  fields: Field[],
): TableActionConfig =>
  addButton ||
  actions?.find((action) => action.kind === "create") ||
  buildDefaultCreateAction(fields);

const buildTableColumnsFromNames = (fields: string[]): TableColumnConfig[] =>
  fields
    .map((field) => field.trim())
    .filter((field, index, all) => field && !["_id", "id"].includes(field) && all.indexOf(field) === index)
    .map((field) => ({ field, type: "field", displayName: "" }));

const normalizeOutputFields = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item, index, all) => item && all.indexOf(item) === index);
};

const pipelineJson = (pipeline: PipelineStage): string =>
  (pipeline as any).pipelineJson || (pipeline as any).PipelineJSON || "";

const inferFieldsFromProjectStage = (stage: Record<string, any>): string[] => {
  const project = stage.$project || stage.project;
  if (!project || typeof project !== "object" || Array.isArray(project)) {
    return [];
  }

  return Object.entries(project)
    .filter(([field, value]) => {
      if (field === "_id") return false;
      if (value === 0 || value === false) return false;
      return true;
    })
    .map(([field]) => field);
};

const inferFieldsFromPipelineStage = (stage: Record<string, any>): string[] => {
  const projected = inferFieldsFromProjectStage(stage);
  if (projected.length > 0) return projected;

  if (typeof stage.$count === "string" && stage.$count.trim()) {
    return [stage.$count.trim()];
  }

  const group = stage.$group || stage.group;
  if (group && typeof group === "object" && !Array.isArray(group)) {
    return Object.keys(group).filter((field) => field !== "_id");
  }

  return [];
};

const inferPipelineOutputFields = (
  pipeline: PipelineStage,
  fallbackFields: Field[],
): string[] => {
  const explicit = normalizeOutputFields((pipeline as any).outputFields);
  if (explicit.length > 0) return explicit;

  try {
    const parsed = JSON.parse(pipelineJson(pipeline));
    if (Array.isArray(parsed)) {
      const lastStage = parsed[parsed.length - 1];
      if (lastStage?.$out || lastStage?.$merge) {
        return [];
      }
      for (let index = parsed.length - 1; index >= 0; index -= 1) {
        const stage = parsed[index];
        if (stage && typeof stage === "object" && !Array.isArray(stage)) {
          const projected = inferFieldsFromPipelineStage(stage);
          if (projected.length > 0) return projected;
        }
      }
    }
  } catch {
    return [];
  }

  return fallbackFields.map((field) => field.name).filter(Boolean);
};

const flattenWorkflowSteps = (steps: WorkflowStep[] = []): WorkflowStep[] =>
  steps.flatMap((step) => [
    step,
    ...flattenWorkflowSteps(step.steps || []),
    ...flattenWorkflowSteps(step.elseSteps || []),
    ...((step.branches || []).flatMap((branch) =>
      flattenWorkflowSteps(branch.steps || []),
    )),
  ]);

const workflowStepId = (step: WorkflowStep): string => step.name || (step as any).id || "";

const configOutputFields = (config: Record<string, any> | undefined): string[] =>
  normalizeOutputFields(
    config?.outputFields || config?.returnFields || config?.fields,
  );

const schemaFieldNames = (
  containers: ContainerModel[],
  schemaName: string | undefined,
): string[] =>
  (containers.find((container) => container.schemaName === schemaName)?.fields || [])
    .map((field) => field.name)
    .filter(Boolean);

const inferWorkflowStepFields = (
  step: WorkflowStep | undefined,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  if (!step) return [];
  const explicit = configOutputFields(step.config);
  if (explicit.length > 0) return explicit;

  if (step.config?.projection && typeof step.config.projection === "object") {
    const projected = inferFieldsFromProjectStage({ $project: step.config.projection });
    if (projected.length > 0) return projected;
  }

  if (Array.isArray(step.config?.pipeline)) {
    for (let index = step.config.pipeline.length - 1; index >= 0; index -= 1) {
      const projected = inferFieldsFromPipelineStage(step.config.pipeline[index]);
      if (projected.length > 0) return projected;
    }
  }

  if (typeof step.config?.value === "object" && !Array.isArray(step.config.value)) {
    const keys = Object.keys(step.config.value).filter((key) => key !== "_id");
    if (keys.length > 0) return keys;
  }

  if (["find_records", "get_record"].includes(step.type)) {
    return schemaFieldNames(containers, step.targetSchema || fallbackSchemaName);
  }

  return [];
};

const inferWorkflowOutputFields = (
  workflow: DynamicWorkflow,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  const explicit = normalizeOutputFields(
    (workflow as any).outputFields || (workflow as any).returnFields,
  );
  if (explicit.length > 0) return explicit;

  const steps = flattenWorkflowSteps(workflow.steps || []);
  const returnStep = steps.find((step) => step.type === "return" && step.isActive !== false);
  if (returnStep) {
    const fromReturn = inferWorkflowStepFields(returnStep, containers, fallbackSchemaName);
    if (fromReturn.length > 0) return fromReturn;

    const value = returnStep.config?.value;
    if (typeof value === "string") {
      const match = value.match(/^\{\{\s*([^.}]+)(?:\.items)?\s*\}\}$/);
      if (match) {
        const referenced = steps.find((step) => workflowStepId(step) === match[1]);
        const inferred = inferWorkflowStepFields(referenced, containers, fallbackSchemaName);
        if (inferred.length > 0) return inferred;
      }
    }
  }

  if (workflow.returnStep) {
    const referenced = steps.find((step) => workflowStepId(step) === workflow.returnStep);
    return inferWorkflowStepFields(referenced, containers, fallbackSchemaName);
  }

  return [];
};

const cleanRules = (rules: RowClassConfig[] = []): RowClassConfig[] =>
  rules.filter((rule) => rule.condition.trim() || rule.className.trim());

const parseJsonObject = (value?: string): Record<string, unknown> | undefined => {
  if (!value?.trim()) return undefined;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : undefined;
  } catch {
    return undefined;
  }
};

const cleanTableActions = (
  actions: TableActionConfig[] = [],
): TableActionConfig[] =>
  actions
    .filter((action) => action.kind)
    .map((action, index) => {
      const constantValues =
        action.constantValues || parseJsonObject(action.constantValuesJson);
      return {
        kind: action.kind,
        id: action.id?.trim() || `${action.kind}-${index + 1}`,
        ...(action.label?.trim() ? { label: action.label.trim() } : {}),
        ...(action.buttonName?.trim()
          ? { buttonName: action.buttonName.trim() }
          : {}),
        ...(action.icon?.trim() ? { icon: action.icon.trim() } : {}),
        order: Number(action.order ?? index + 1),
        enabled: action.enabled !== false,
        modalType: action.modalType || "none",
        ...(action.formFields !== undefined
          ? {
              formFields: action.formFields
                .filter((field) => field.formKey.trim())
                .map((field) => ({
                  formKey: field.formKey.trim(),
                  type: field.type || "text",
                  formKeyType: field.formKeyType || "string",
                  ...(field.label?.trim() ? { label: field.label.trim() } : {}),
                  ...(field.placeholder?.trim()
                    ? { placeholder: field.placeholder.trim() }
                    : {}),
                  ...(field.required ? { required: true } : {}),
                  ...(field.isDisabled ? { isDisabled: true } : {}),
                  ...(field.disabledCondition?.trim()
                    ? { disabledCondition: field.disabledCondition.trim() }
                    : {}),
                  ...(field.requiredCondition?.trim()
                    ? { requiredCondition: field.requiredCondition.trim() }
                    : {}),
                  ...(field.isMultiple ? { isMultiple: true } : {}),
                  ...(isActionNumberInput(field.type) && field.isNumberButtonsActive
                    ? { isNumberButtonsActive: true }
                    : {}),
                  ...(field.optionsSource
                    ? { optionsSource: field.optionsSource }
                    : {}),
                  ...(field.staticOptionsJson?.trim()
                    ? { staticOptionsJson: field.staticOptionsJson.trim() }
                    : {}),
                  ...(field.sourceSchemaName?.trim()
                    ? { sourceSchemaName: field.sourceSchemaName.trim() }
                    : {}),
                  ...(field.sourceValueField?.trim()
                    ? { sourceValueField: field.sourceValueField.trim() }
                    : {}),
                  ...(field.sourceLabelField?.trim()
                    ? { sourceLabelField: field.sourceLabelField.trim() }
                    : {}),
                  ...(field.sourceFilterCondition?.trim()
                    ? {
                        sourceFilterCondition:
                          field.sourceFilterCondition.trim(),
                      }
                    : {}),
                  ...(field.invalidateKeys?.filter((key) => key.trim()).length
                    ? {
                        invalidateKeys: field.invalidateKeys
                          .map((key) => key.trim())
                          .filter(Boolean),
                      }
                    : {}),
                  ...(field.defaultValue !== undefined && field.defaultValue !== ""
                    ? { defaultValue: field.defaultValue }
                    : {}),
                  ...(field.min !== undefined ? { min: field.min } : {}),
                  ...(field.max !== undefined ? { max: field.max } : {}),
                  ...(field.minLength !== undefined
                    ? { minLength: field.minLength }
                    : {}),
                  ...(field.maxLength !== undefined
                    ? { maxLength: field.maxLength }
                    : {}),
                  ...(field.pattern?.trim()
                    ? { pattern: field.pattern.trim() }
                    : {}),
                  ...(field.validationMessage?.trim()
                    ? { validationMessage: field.validationMessage.trim() }
                    : {}),
                })),
            }
          : {}),

        ...(action.fieldOverrides?.filter((override) => override.field.trim())
          .length
          ? {
              fieldOverrides: action.fieldOverrides
                .filter((override) => override.field.trim())
                .map((override) => ({
                  field: override.field.trim(),
                  ...(override.required !== undefined
                    ? { required: override.required }
                    : {}),
                  ...(override.disabledCondition?.trim()
                    ? { disabledCondition: override.disabledCondition.trim() }
                    : {}),
                })),
            }
          : {}),
        ...(constantValues ? { constantValues } : {}),
        ...(action.disabledCondition?.trim()
          ? { disabledCondition: action.disabledCondition.trim() }
          : {}),
        ...(action.hiddenCondition?.trim()
          ? { hiddenCondition: action.hiddenCondition.trim() }
          : {}),
        ...(action.requiredCondition?.trim()
          ? { requiredCondition: action.requiredCondition.trim() }
          : {}),
        ...(action.confirmTitle?.trim()
          ? { confirmTitle: action.confirmTitle.trim() }
          : {}),
        ...(action.confirmText?.trim()
          ? { confirmText: action.confirmText.trim() }
          : {}),
        ...(action.submit?.workflowName?.trim() && action.submit?.workflowSchema?.trim()
          ? {
              submit: {
                workflowName: action.submit.workflowName.trim(),
                workflowSchema: action.submit.workflowSchema.trim(),
              },
            }
          : {}),
        ...(action.linkType ? { linkType: action.linkType } : {}),
        ...(action.className?.trim() ? { className: action.className.trim() } : {}),
        ...(action.buttonClassName?.trim()
          ? { buttonClassName: action.buttonClassName.trim() }
          : {}),
        ...(action.isButton ? { isButton: true } : {}),
      };
    });

const cleanFilterPanelInputs = (
  inputs: TableFilterPanelInputConfig[] = [],
): TableFilterPanelInputConfig[] =>
  inputs
    .filter((field) => field.formKey.trim())
    .map((field) => ({
      formKey: field.formKey.trim(),
      type: field.type || "text",
      formKeyType: field.formKeyType || "string",
      ...(field.label?.trim() ? { label: field.label.trim() } : {}),
      ...(field.placeholder?.trim()
        ? { placeholder: field.placeholder.trim() }
        : {}),
      ...(field.required ? { required: true } : {}),
      ...(field.isDisabled ? { isDisabled: true } : {}),
      ...(field.disabledCondition?.trim()
        ? { disabledCondition: field.disabledCondition.trim() }
        : {}),
      ...(field.requiredCondition?.trim()
        ? { requiredCondition: field.requiredCondition.trim() }
        : {}),
      ...(field.isMultiple ? { isMultiple: true } : {}),
      ...(isActionNumberInput(field.type) && field.isNumberButtonsActive
        ? { isNumberButtonsActive: true }
        : {}),
      ...(field.optionsSource ? { optionsSource: field.optionsSource } : {}),
      ...(field.staticOptionsJson?.trim()
        ? { staticOptionsJson: field.staticOptionsJson.trim() }
        : {}),
      ...(field.sourceSchemaName?.trim()
        ? { sourceSchemaName: field.sourceSchemaName.trim() }
        : {}),
      ...(field.sourceValueField?.trim()
        ? { sourceValueField: field.sourceValueField.trim() }
        : {}),
      ...(field.sourceLabelField?.trim()
        ? { sourceLabelField: field.sourceLabelField.trim() }
        : {}),
      ...(field.sourceFilterCondition?.trim()
        ? { sourceFilterCondition: field.sourceFilterCondition.trim() }
        : {}),
      ...(field.defaultValue !== undefined && field.defaultValue !== ""
        ? { defaultValue: field.defaultValue }
        : {}),
      ...(field.min !== undefined ? { min: field.min } : {}),
      ...(field.max !== undefined ? { max: field.max } : {}),
      ...(field.minLength !== undefined ? { minLength: field.minLength } : {}),
      ...(field.maxLength !== undefined ? { maxLength: field.maxLength } : {}),
      ...(field.pattern?.trim() ? { pattern: field.pattern.trim() } : {}),
      ...(field.validationMessage?.trim()
        ? { validationMessage: field.validationMessage.trim() }
        : {}),
    }));

const cleanTableConfig = (
  tableConfig: TableComponentConfig,
): TableComponentConfig => ({
  columns: (tableConfig.columns || [])
    .filter((column) => column.field.trim())
    .map((column) => ({
      field: column.field.trim(),
      ...(column.type && column.type !== "field" ? { type: column.type } : {}),
      ...(column.displayName?.trim()
        ? { displayName: column.displayName.trim() }
        : {}),
      ...(column.type === "computedLabel" &&
      (column.computedLabelRules || []).some(
        (rule) => rule.condition?.trim() || rule.value?.trim(),
      )
        ? {
            computedLabelRules: (column.computedLabelRules || [])
              .filter((rule) => rule.condition?.trim() || rule.value?.trim())
              .map((rule) => ({
                condition: rule.condition?.trim() || "",
                value: rule.value?.trim() || "",
              })),
          }
        : {}),
      ...(column.type === "computedLabel" && column.fallbackValue?.trim()
        ? { fallbackValue: column.fallbackValue.trim() }
        : {}),
      ...(column.type === "progressBar"
        ? {
            progressBar: {
              sourceField:
                column.progressBar?.sourceField?.trim() || column.field.trim(),
              max: Number(column.progressBar?.max ?? 8),
              ...(column.progressBar?.maxField?.trim()
                ? { maxField: column.progressBar.maxField.trim() }
                : {}),
              color: column.progressBar?.color?.trim() || "#4d9f24",
              trackColor:
                column.progressBar?.trackColor?.trim() || "#e7e5df",
              height: Number(column.progressBar?.height ?? 12),
              width: Number(column.progressBar?.width ?? 260),
              showValue: column.progressBar?.showValue !== false,
              ...(column.progressBar?.colorRules?.some(
                (rule) => rule.condition?.trim() || rule.color?.trim(),
              )
                ? {
                    colorRules: column.progressBar.colorRules
                      .filter(
                        (rule) => rule.condition?.trim() || rule.color?.trim(),
                      )
                      .map((rule) => ({
                        condition: rule.condition?.trim() || "",
                        color: rule.color?.trim() || "",
                      })),
                  }
                : {}),
            },
          }
        : {}),
      ...(cleanRules(column.cellClassName).length > 0
        ? { cellClassName: cleanRules(column.cellClassName) }
        : {}),
      ...(column.link?.template?.trim()
        ? {
            link: {
              template: column.link.template.trim(),
              ...(column.link.labelField?.trim()
                ? { labelField: column.link.labelField.trim() }
                : {}),
              type: column.link.type || "external",
            },
          }
        : {}),
    })),
  ...(cleanRules(tableConfig.rows?.className).length > 0
    ? { rows: { className: cleanRules(tableConfig.rows?.className) } }
    : {}),
  ...(tableConfig.cache?.invalidateKeys?.filter((key) => key.trim()).length
    ? {
        cache: {
          invalidateKeys: tableConfig.cache.invalidateKeys
            .map((key) => key.trim())
            .filter(Boolean),
        },
      }
    : {}),
  ...(cleanTableActions(
    tableConfig.addButton ? [tableConfig.addButton] : [],
  )[0]
    ? {
        addButton: cleanTableActions(
          tableConfig.addButton ? [tableConfig.addButton] : [],
        )[0],
      }
    : {}),
  ...(cleanTableActions(
    (tableConfig.actions || []).filter((action) => action.kind !== "create"),
  ).length > 0
    ? {
        actions: cleanTableActions(
          (tableConfig.actions || []).filter(
            (action) => action.kind !== "create",
          ),
        ),
      }
    : {}),
  ...(tableConfig.filterPanel !== undefined
    ? {
        filterPanel: {
          inputs: cleanFilterPanelInputs(tableConfig.filterPanel.inputs || []),
        },
      }
    : {}),
});

export const PageDesigner: React.FC<PageDesignerProps> = ({
  sections,
  onChange,
}) => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  const [excelTargetSectionIndex, setExcelTargetSectionIndex] = useState<
    number | null
  >(null);

  const containers = useGetContainers();
  const schemas = containers?.map((c: any) => c.schemaName || c.name) || [];
  const containerOptions =
    containers?.map((c: any) => ({
      value: c.schemaName,
      label: c.schemaName,
    })) || [];

  // Add new section
  const addSection = () => {
    const newSection: GridSection = {
      columns: 1,
      gap: 16,
      cells: [],
    };
    onChange([...sections, newSection]);
    setSelectedSection(sections.length);
  };

  // Update section
  const updateSection = (index: number, updates: Partial<GridSection>) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  // Delete section
  const deleteSection = (index: number) => {
    onChange(sections.filter((_, i) => i !== index));
    setSelectedSection(null);
  };

  // Add cell to section
  const addCell = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const maxRow =
      section.cells.length > 0
        ? Math.max(...section.cells.map((c) => c.row))
        : 0;

    // Count cells in the current max row
    const cellsInMaxRow = section.cells.filter((c) => c.row === maxRow);

    // Determine row and column for new cell
    let newRow = maxRow;
    let newColumn = cellsInMaxRow.length + 1;

    // If this is the first cell or current row is full, handle accordingly
    if (section.cells.length === 0) {
      newRow = 1;
      newColumn = 1;
    } else if (cellsInMaxRow.length >= section.columns) {
      newRow = maxRow + 1;
      newColumn = 1;
    }

    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row: newRow,
      column: newColumn,
      components: [],
    };
    updateSection(sectionIndex, {
      cells: [...section.cells, newCell],
    });
  };

  // Add cell with Excel upload option
  const openCellExcelUpload = (sectionIndex: number) => {
    setExcelTargetSectionIndex(sectionIndex);
    setShowExcelUploadModal(true);
  };

  // Handle Excel upload success for cells
  const handleCellExcelUploadSuccess = (
    schemaName: string,
    component: ComponentBlock
  ) => {
    if (excelTargetSectionIndex === null) return;

    const section = sections[excelTargetSectionIndex];
    const maxRow =
      section.cells.length > 0
        ? Math.max(...section.cells.map((c) => c.row))
        : 0;

    const cellsInMaxRow = section.cells.filter((c) => c.row === maxRow);

    let newRow = maxRow;
    let newColumn = cellsInMaxRow.length + 1;

    if (section.cells.length === 0) {
      newRow = 1;
      newColumn = 1;
    } else if (cellsInMaxRow.length >= section.columns) {
      newRow = maxRow + 1;
      newColumn = 1;
    }

    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row: newRow,
      column: newColumn,
      components: [component],
    };

    updateSection(excelTargetSectionIndex, {
      cells: [...section.cells, newCell],
    });

    setExcelTargetSectionIndex(null);
  };

  // Update cell
  const updateCell = (
    sectionIndex: number,
    cellId: string,
    updates: Partial<GridCell>
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId ? { ...cell, ...updates } : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Delete cell
  const deleteCell = (sectionIndex: number, cellId: string) => {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      cells: section.cells.filter((c) => c.id !== cellId),
    });
    setSelectedCell(null);
  };

  // Add component to cell
  const addComponentToCell = (
    sectionIndex: number,
    cellId: string,
    component: ComponentBlock
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? { ...cell, components: [...cell.components, component] }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Delete component from cell
  const deleteComponent = (
    sectionIndex: number,
    cellId: string,
    componentId: string
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? {
            ...cell,
            components: cell.components.filter((c) => c.id !== componentId),
          }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Update component in cell
  const updateComponent = (
    sectionIndex: number,
    cellId: string,
    componentId: string,
    updatedComponent: ComponentBlock
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? {
            ...cell,
            components: cell.components.map((c) =>
              c.id === componentId ? updatedComponent : c
            ),
          }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Left Sidebar - Sections List */}
      <div className="w-72 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">
            Page Structure
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            {sections.length} section{sections.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="p-4">
          <button
            onClick={addSection}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
          >
            <FiPlus size={16} strokeWidth={2.5} />
            <span>Add Section</span>
          </button>
        </div>

        <div className="space-y-2 p-4 pt-0">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`group p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedSection === index
                  ? "border-violet-500 bg-violet-50 shadow-sm"
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
              onClick={() => setSelectedSection(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-lg ${
                      selectedSection === index
                        ? "bg-violet-500 text-white"
                        : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
                    } transition-colors`}
                  >
                    <FiLayout size={14} />
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      selectedSection === index
                        ? "text-violet-900"
                        : "text-neutral-900"
                    }`}
                  >
                    Section {index + 1}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(index);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all"
                >
                  <FiTrash2 size={13} strokeWidth={2} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <FiGrid size={12} />
                  {section.columns} col{section.columns > 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>
                  {section.cells.length} cell
                  {section.cells.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto">
        {selectedSection !== null ? (
          <SectionEditor
            section={sections[selectedSection]}
            sectionIndex={selectedSection}
            schemas={schemas}
            containerOptions={containerOptions}
            containers={containers || []}
            onUpdateSection={(updates) =>
              updateSection(selectedSection, updates)
            }
            onAddCell={() => addCell(selectedSection)}
            onAddCellWithExcel={() => openCellExcelUpload(selectedSection)}
            onUpdateCell={(cellId, updates) =>
              updateCell(selectedSection, cellId, updates)
            }
            onDeleteCell={(cellId) => deleteCell(selectedSection, cellId)}
            onAddComponent={(cellId, component) =>
              addComponentToCell(selectedSection, cellId, component)
            }
            onDeleteComponent={(cellId, componentId) =>
              deleteComponent(selectedSection, cellId, componentId)
            }
            onUpdateComponent={(cellId, componentId, component) =>
              updateComponent(selectedSection, cellId, componentId, component)
            }
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 flex items-center justify-center">
                <FiLayout size={36} className="text-neutral-400" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-1">
                No section selected
              </h3>
              <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                Select a section from the sidebar or create a new one to start
                designing your page
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Excel Upload Modal for Cells */}
      <CellExcelUploadModal
        isOpen={showExcelUploadModal}
        onClose={() => setShowExcelUploadModal(false)}
        onSuccess={handleCellExcelUploadSuccess}
        mode="cell"
      />
    </div>
  );
};

// Section Editor Component
interface SectionEditorProps {
  section: GridSection;
  sectionIndex: number;
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  onUpdateSection: (updates: Partial<GridSection>) => void;
  onAddCell: () => void;
  onAddCellWithExcel: () => void;
  onUpdateCell: (cellId: string, updates: Partial<GridCell>) => void;
  onDeleteCell: (cellId: string) => void;
  onAddComponent: (cellId: string, component: ComponentBlock) => void;
  onDeleteComponent: (cellId: string, componentId: string) => void;
  onUpdateComponent: (
    cellId: string,
    componentId: string,
    component: ComponentBlock
  ) => void;
  selectedCell: string | null;
  setSelectedCell: (cellId: string | null) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  sectionIndex,
  schemas,
  containerOptions,
  containers,
  onUpdateSection,
  onAddCell,
  onAddCellWithExcel,
  onUpdateCell,
  onDeleteCell,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent,
  selectedCell,
  setSelectedCell,
}) => {
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [currentCellId, setCurrentCellId] = useState<string | null>(null);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);

  const openComponentModal = (cellId: string, component?: ComponentBlock) => {
    setCurrentCellId(cellId);
    setEditingComponent(component || null);
    setShowComponentModal(true);
  };

  return (
    <div className="space-y-5 p-8">
      {/* Section Settings */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-neutral-900 mb-4">
          Section Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Grid Columns
            </label>
            <select
              value={section.columns}
              onChange={(e) =>
                onUpdateSection({ columns: parseInt(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Column{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Gap (pixels)
            </label>
            <input
              type="number"
              value={section.gap}
              onChange={(e) =>
                onUpdateSection({ gap: parseInt(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              min="0"
              max="64"
            />
          </div>
        </div>
      </div>

      {/* Grid Preview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Grid Layout
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Design your page structure with cells and components
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onAddCell}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
            >
              <FiPlus size={16} strokeWidth={2.5} />
              <span>Add Cell</span>
            </button>
            <button
              onClick={onAddCellWithExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 active:scale-[0.98] transition-all shadow-sm"
              title="Upload Excel and create cell with table"
            >
              <FiUpload size={16} strokeWidth={2.5} />
              <span>Excel</span>
            </button>
          </div>
        </div>

        <div
          className="grid gap-3 border-2 border-dashed border-neutral-300 rounded-xl p-5 min-h-[400px] bg-neutral-50/50"
          style={{
            gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
            gap: `${section.gap}px`,
          }}
        >
          {section.cells.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <FiGrid size={28} className="text-neutral-400" />
                </div>
                <p className="text-sm text-neutral-500 mb-3">No cells yet</p>
                <button
                  onClick={onAddCell}
                  className="text-sm text-neutral-900 font-medium hover:underline"
                >
                  Add your first cell
                </button>
              </div>
            </div>
          ) : (
            section.cells.map((cell) => (
              <CellEditor
                key={cell.id}
                cell={cell}
                schemas={schemas}
                isSelected={selectedCell === cell.id}
                onSelect={() => setSelectedCell(cell.id)}
                onUpdate={(updates) => onUpdateCell(cell.id, updates)}
                onDelete={() => onDeleteCell(cell.id)}
                onAddComponent={() => openComponentModal(cell.id)}
                onDeleteComponent={(componentId) =>
                  onDeleteComponent(cell.id, componentId)
                }
                onEditComponent={(component) =>
                  openComponentModal(cell.id, component)
                }
              />
            ))
          )}
        </div>
      </div>

      {/* Component Modal */}
      {showComponentModal && currentCellId && (
        <ComponentModal
          schemas={schemas}
          containerOptions={containerOptions}
          containers={containers}
          editingComponent={editingComponent}
          onClose={() => {
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
          onAdd={(component) => {
            if (editingComponent) {
              // Update existing component
              onUpdateComponent(currentCellId, editingComponent.id, component);
            } else {
              // Add new component
              onAddComponent(currentCellId, component);
            }
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
        />
      )}
    </div>
  );
};

// Cell Editor Component
interface CellEditorProps {
  cell: GridCell;
  schemas: string[];
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<GridCell>) => void;
  onDelete: () => void;
  onAddComponent: () => void;
  onDeleteComponent: (componentId: string) => void;
  onEditComponent: (component: ComponentBlock) => void;
}

const CellEditor: React.FC<CellEditorProps> = ({
  cell,
  schemas,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onAddComponent,
  onDeleteComponent,
  onEditComponent,
}) => {
  return (
    <div
      className={`group relative border-2 rounded-xl p-4 min-h-[180px] cursor-pointer transition-all ${
        isSelected
          ? "border-violet-500 bg-violet-50/50 shadow-md"
          : "border-neutral-300 hover:border-neutral-400 bg-white hover:shadow-sm"
      }`}
      style={{
        gridRow: `${cell.row} / span ${cell.rowSpan || 1}`,
        gridColumn: `${cell.column} / span ${cell.colSpan || 1}`,
      }}
      onClick={onSelect}
    >
      {/* Cell Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-md ${
              isSelected
                ? "bg-violet-500 text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            <FiGrid size={14} />
          </div>
          <span className="text-xs font-semibold text-neutral-700">
            Cell {cell.row},{cell.column}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddComponent();
            }}
            className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-all flex items-center gap-1"
            title="Add component"
          >
            <FiPlus size={13} />
            <span>Add</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all flex items-center gap-1"
            title="Delete cell"
          >
            <FiTrash2 size={13} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Cell Controls - Show when selected */}
      {isSelected && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Row
            </label>
            <input
              type="number"
              value={cell.row}
              onChange={(e) => onUpdate({ row: parseInt(e.target.value) || 1 })}
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Column
            </label>
            <input
              type="number"
              value={cell.column}
              onChange={(e) =>
                onUpdate({ column: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Row Span
            </label>
            <input
              type="number"
              value={cell.rowSpan || 1}
              onChange={(e) =>
                onUpdate({ rowSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Col Span
            </label>
            <input
              type="number"
              value={cell.colSpan || 1}
              onChange={(e) =>
                onUpdate({ colSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
        </div>
      )}

      {/* Components List */}
      <div className="space-y-2">
        {cell.components.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs text-neutral-400 mb-2">No components</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddComponent();
              }}
              className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
            >
              Add your first component
            </button>
          </div>
        ) : (
          cell.components.map((component) => (
            <div
              key={component.id}
              className="group p-3 bg-white border border-neutral-200 rounded-lg hover:border-violet-400 hover:shadow-sm transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {component.type === "table" && (
                    <div className="p-1 bg-blue-100 rounded-md">
                      <MdTableChart className="text-blue-600" size={14} />
                    </div>
                  )}
                  {component.type === "tabPanel" && (
                    <div className="p-1 bg-purple-100 rounded-md">
                      <MdTab className="text-purple-600" size={14} />
                    </div>
                  )}
                  {CHART_TYPES.find((c) => c.value === component.type) && (
                    <div className="p-1 bg-emerald-100 rounded-md">
                      <MdBarChart className="text-emerald-600" size={14} />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-neutral-700 capitalize">
                    {component.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditComponent(component)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-all flex items-center gap-1"
                    title="Edit Component"
                  >
                    <FiEdit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteComponent(component.id)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all flex items-center gap-1"
                    title="Delete Component"
                  >
                    <FiTrash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Component Details */}
              <div className="text-[11px] space-y-1 text-neutral-600">
                {component.title && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Title:
                    </span>
                    <span className="text-neutral-700">{component.title}</span>
                  </div>
                )}

                {component.dataBinding && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Data:
                    </span>
                    {component.dataBinding.kind === "schema" ? (
                      <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {component.dataBinding.schemaName}
                      </span>
                    ) : component.dataBinding.kind === "pipeline" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.pipelineName}
                        </span>
                        <span className="text-neutral-400">in</span>
                        <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : component.dataBinding.kind === "workflow" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.workflowName}
                        </span>
                        <span className="text-neutral-400">in</span>
                        <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}

                {component.tabs && component.tabs.length > 0 && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Tabs:
                    </span>
                    <span className="text-neutral-700">
                      {component.tabs.length} tab
                      {component.tabs.length > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Component Modal
interface ComponentModalProps {
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  editingComponent: ComponentBlock | null;
  onClose: () => void;
  onAdd: (component: ComponentBlock) => void;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  schemas,
  containerOptions,
  containers,
  editingComponent,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();
  const [componentType, setComponentType] = useState<string>("table");
  const [schemaName, setSchemaName] = useState<string>("");
  const [tableSourceType, setTableSourceType] = useState<
    "schema" | "pipeline" | "workflow"
  >("schema");
  const [pipelineName, setPipelineName] = useState<string>("");
  const [workflowName, setWorkflowName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<TabPanelTab[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>(EMPTY_GROUP_BY);
  const [showTabExcelModal, setShowTabExcelModal] = useState(false);
  const [params, setParams] = useState<string>(""); // JSON string for params
  const [tableConfig, setTableConfig] = useState<TableComponentConfig>({
    columns: [],
    rows: { className: [] },
    cache: { invalidateKeys: [] },
    addButton: undefined,
    actions: [],
  });
  const [infoBlocksSource, setInfoBlocksSource] =
    useState<InfoBlocksSource>("static");
  const [infoBlockItems, setInfoBlockItems] = useState<InfoBlockItemConfig[]>(
    resizeInfoBlockItems(4, []),
  );
  const [distributionBlocksSource, setDistributionBlocksSource] =
    useState<InfoBlocksSource>("static");
  const [distributionBlockItems, setDistributionBlockItems] = useState<
    DistributionBlockItemConfig[]
  >(resizeDistributionBlockItems(3, []));
  const [activeTableSettingsTab, setActiveTableSettingsTab] =
    useState<TableSettingsTab>("columns");

  const selectedContainer = useMemo(
    () => containers.find((container) => container.schemaName === schemaName),
    [containers, schemaName]
  );
  const selectedFields = selectedContainer?.fields || [];
  const groupByTemplateSchemaName = useMemo(
    () =>
      tabs.find((tab) => tab.components[0]?.type === "table")?.components[0]
        ?.dataBinding?.schemaName || "",
    [tabs],
  );
  const selectedGroupedContainer = useMemo(
    () =>
      containers.find(
        (container) =>
          container.schemaName ===
          (groupBy.groupedSchemaName || groupByTemplateSchemaName),
      ),
    [containers, groupBy.groupedSchemaName, groupByTemplateSchemaName],
  );
  const groupByGroupedFields = useMemo(
    () =>
      (selectedGroupedContainer?.fields || [])
        .filter((field) => field.name && field.name !== "_id")
        .map((field) => ({
          name: field.name,
          label: field.frontend?.displayName || field.name,
        })),
    [selectedGroupedContainer?.fields],
  );
  const selectedGroupByContainer = useMemo(
    () =>
      containers.find(
        (container) =>
          container.schemaName === groupBy.sourceSchemaName,
      ),
    [containers, groupBy.sourceSchemaName],
  );
  const groupByLabelFields = useMemo(
    () =>
      (selectedGroupByContainer?.fields || []).filter(
        (field) => field.name && !["_id", "id"].includes(field.name),
      ),
    [selectedGroupByContainer?.fields],
  );
  const groupByValueFields = useMemo(
    () => [
      { name: "_id", label: "_id" },
      ...(selectedGroupByContainer?.fields || [])
        .filter((field) => field.name && field.name !== "_id")
        .map((field) => ({
          name: field.name,
          label: field.frontend?.displayName || field.name,
        })),
    ],
    [selectedGroupByContainer?.fields],
  );
  const pipelineOptions = useMemo(
    () =>
      (selectedContainer?.pipelines || [])
        .map((pipeline) => ({
          pipeline,
          outputFields: inferPipelineOutputFields(pipeline, selectedFields),
        }))
        .filter(
          ({ pipeline, outputFields }) =>
            pipeline.isActive !== false && outputFields.length > 0,
        ),
    [selectedContainer?.pipelines, selectedFields],
  );
  const projectWorkflowOptions = useMemo(
    () =>
      containers.flatMap((container) =>
        (container.workflows || [])
          .filter((workflow) => workflow.isActive !== false)
          .map((workflow) => ({
            schemaName: container.schemaName,
            workflow,
          })),
      ),
    [containers],
  );

  const workflowOptions = useMemo(
    () =>
      (selectedContainer?.workflows || [])
        .map((workflow) => ({
          workflow,
          outputFields: inferWorkflowOutputFields(
            workflow,
            containers,
            schemaName,
          ),
        }))
        .filter(
          ({ workflow, outputFields }) =>
            workflow.isActive !== false && outputFields.length > 0,
        ),
    [containers, schemaName, selectedContainer?.workflows],
  );

  // Initialize form with editingComponent data
  useEffect(() => {
    if (editingComponent) {
      setComponentType(editingComponent.type);
      setTitle(editingComponent.title || "");

      if (editingComponent.dataBinding) {
        setTableSourceType(
          editingComponent.dataBinding.kind === "pipeline" ||
            editingComponent.dataBinding.kind === "workflow"
            ? editingComponent.dataBinding.kind
            : "schema"
        );
        setSchemaName(editingComponent.dataBinding.schemaName || "");
        setPipelineName(editingComponent.dataBinding.pipelineName || "");
        setWorkflowName(editingComponent.dataBinding.workflowName || "");
        setParams(
          editingComponent.dataBinding.params
            ? JSON.stringify(editingComponent.dataBinding.params, null, 2)
            : ""
        );
      }

      setTabs(editingComponent.tabs || []);
      setGroupBy(editingComponent.groupBy || EMPTY_GROUP_BY);
      if (editingComponent.type === "infoBlocks") {
        const infoBlocks = editingComponent.props?.infoBlocks as
          | InfoBlocksConfig
          | undefined;
        const nextSource =
          infoBlocks?.source ||
          (editingComponent.dataBinding?.kind as InfoBlocksSource | undefined) ||
          "static";
        setInfoBlocksSource(nextSource);
        setInfoBlockItems(
          resizeInfoBlockItems(
            Math.min(Math.max(infoBlocks?.items?.length || 4, 1), 5),
            infoBlocks?.items || [],
          ),
        );
      }
      if (editingComponent.type === "distributionBlocks") {
        const distributionBlocks = editingComponent.props?.distributionBlocks as
          | DistributionBlocksConfig
          | undefined;
        const nextSource =
          distributionBlocks?.source ||
          (editingComponent.dataBinding?.kind as InfoBlocksSource | undefined) ||
          "static";
        setDistributionBlocksSource(nextSource);
        setDistributionBlockItems(
          resizeDistributionBlockItems(
            Math.min(Math.max(distributionBlocks?.items?.length || 3, 1), 5),
            distributionBlocks?.items || [],
          ),
        );
      }
      if (
        editingComponent.type === "tabPanel" &&
        !editingComponent.dataBinding?.schemaName &&
        editingComponent.groupBy?.groupedSchemaName
      ) {
        setSchemaName(editingComponent.groupBy.groupedSchemaName);
      }

      if (editingComponent.table) {
        const editingSourceType =
          editingComponent.dataBinding?.kind === "pipeline" ||
          editingComponent.dataBinding?.kind === "workflow"
            ? editingComponent.dataBinding.kind
            : "schema";
        setTableConfig({
          columns: editingComponent.table.columns || [],
          rows: { className: editingComponent.table.rows?.className || [] },
          cache: {
            invalidateKeys: editingComponent.table.cache?.invalidateKeys || [],
          },
          addButton:
            editingSourceType === "schema"
              ? hydrateSchemaAddButton(
                  editingComponent.table.addButton,
                  editingComponent.table.actions,
                  containers.find(
                    (container) =>
                      container.schemaName ===
                      editingComponent.dataBinding?.schemaName,
                  )?.fields || [],
                )
              : editingComponent.table.addButton,
          actions:
            editingComponent.table.actions && editingComponent.table.actions.length
              ? editingSourceType === "schema"
                ? hydrateSchemaEditActionFields(
                    editingComponent.table.actions,
                    containers.find(
                      (container) =>
                        container.schemaName ===
                        editingComponent.dataBinding?.schemaName,
                    )?.fields || [],
                  )
                : editingComponent.table.actions
              : getDefaultActionsForSource(
                  editingSourceType,
                  containers.find(
                    (container) =>
                      container.schemaName ===
                      editingComponent.dataBinding?.schemaName,
                  )?.fields || [],
                ),
          filterPanel:
            editingComponent.table.filterPanel !== undefined
              ? {
                  inputs: editingComponent.table.filterPanel.inputs || [],
                }
              : {
                  inputs: buildFilterPanelInputsFromFields(
                    containers.find(
                      (container) =>
                        container.schemaName ===
                        editingComponent.dataBinding?.schemaName,
                    )?.fields || [],
                  ),
                },
        });
      }
    } else {
      setGroupBy(EMPTY_GROUP_BY);
      setTabs([]);
      setInfoBlocksSource("static");
      setInfoBlockItems(resizeInfoBlockItems(4, []));
      setDistributionBlocksSource("static");
      setDistributionBlockItems(resizeDistributionBlockItems(3, []));
    }
  }, [editingComponent]);

  useEffect(() => {
    if (
      !["table", "tabPanel"].includes(componentType) ||
      !schemaName ||
      editingComponent?.table
    ) {
      return;
    }

    const container = containers.find((item) => item.schemaName === schemaName);
    if (!container) return;

    setTableConfig((current) => {
      if (current.columns && current.columns.length > 0) return current;

      return {
        ...current,
        columns: buildTableColumnsFromFields(container.fields || []),
        addButton:
          current.addButton ||
          hydrateSchemaAddButton(
            current.addButton,
            current.actions,
            container.fields || [],
          ),
        actions:
          current.actions && current.actions.length > 0
            ? hydrateSchemaEditActionFields(current.actions, container.fields || [])
            : getDefaultActionsForSource("schema", container.fields || []),
        filterPanel:
          current.filterPanel !== undefined &&
          current.filterPanel.inputs !== undefined
            ? current.filterPanel
            : {
                inputs: buildFilterPanelInputsFromFields(container.fields || []),
              },
      };
    });
  }, [componentType, containers, editingComponent?.table, schemaName]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "pipeline") {
      return;
    }

    const selected = pipelineOptions.find(
      ({ pipeline }) => pipeline.name === pipelineName,
    );
    if (!selected) {
      setPipelineName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: buildTableColumnsFromNames(selected.outputFields),
      actions: [],
    }));
  }, [componentType, pipelineName, pipelineOptions, tableSourceType]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "workflow") {
      return;
    }

    const selected = workflowOptions.find(
      ({ workflow }) => workflow.name === workflowName,
    );
    if (!selected) {
      setWorkflowName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: buildTableColumnsFromNames(selected.outputFields),
      actions: [],
    }));
  }, [componentType, tableSourceType, workflowName, workflowOptions]);

  const handleAdd = () => {
    const component: ComponentBlock = {
      id: editingComponent?.id || `comp-${Date.now()}`,
      type: componentType as any,
      title,
      order: editingComponent?.order || 1,
    };

    if (componentType === "table") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.dataBinding = {
        kind: tableSourceType,
        schemaName,
        ...(tableSourceType === "pipeline" && { pipelineName }),
        ...(tableSourceType === "workflow" && { workflowName }),
        ...(parsedParams && { params: parsedParams }),
      };
      component.table = cleanTableConfig(tableConfig);
    } else if (componentType === "tabPanel") {
      const groupedSchemaName = (
        groupBy.groupedSchemaName ||
        groupByTemplateSchemaName ||
        schemaName ||
        ""
      ).trim();
      const groupedField = (
        groupBy.groupedField ||
        groupBy.filterField ||
        groupBy.groupByObjectId ||
        ""
      ).trim();
      const sourceSchemaName = (
        groupBy.sourceSchemaName ||
        ""
      ).trim();
      const sourceValueField = (groupBy.sourceValueField || "_id").trim();
      const sourceLabelField = (
        groupBy.sourceLabelField ||
        groupBy.groupByField ||
        ""
      ).trim();
      const cleanGroupBy = {
        groupByObjectId: groupedField,
        groupByField: sourceLabelField,
        groupedSchemaName,
        groupedField,
        sourceSchemaName,
        sourceValueField,
        sourceLabelField,
        filterField: groupedField,
      };

      component.tabs = tabs;
      if (
        cleanGroupBy.groupedSchemaName &&
        cleanGroupBy.groupedField &&
        cleanGroupBy.sourceSchemaName &&
        cleanGroupBy.sourceLabelField
      ) {
        component.dataBinding = {
          kind: "schema",
          schemaName: cleanGroupBy.groupedSchemaName,
        };
        component.table = cleanTableConfig(tableConfig);
        component.groupBy = cleanGroupBy;
      }
    } else if (componentType === "infoBlocks") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.props = {
        infoBlocks: {
          source: infoBlocksSource,
          items: infoBlockItems,
        } satisfies InfoBlocksConfig,
      };

      if (infoBlocksSource !== "static") {
        component.dataBinding = {
          kind: infoBlocksSource,
          schemaName,
          ...(infoBlocksSource === "pipeline" && { pipelineName }),
          ...(infoBlocksSource === "workflow" && { workflowName }),
          ...(parsedParams && { params: parsedParams }),
        };
      }
    } else if (componentType === "distributionBlocks") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.props = {
        distributionBlocks: {
          source: distributionBlocksSource,
          items: distributionBlockItems,
        } satisfies DistributionBlocksConfig,
      };

      if (distributionBlocksSource !== "static") {
        component.dataBinding = {
          kind: distributionBlocksSource,
          schemaName,
          ...(distributionBlocksSource === "pipeline" && { pipelineName }),
          ...(distributionBlocksSource === "workflow" && { workflowName }),
          ...(parsedParams && { params: parsedParams }),
        };
      }
    } else if (CHART_TYPES.find((c) => c.value === componentType)) {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
          console.log("✅ Parsed params:", parsedParams);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.dataBinding = {
        kind: "pipeline",
        schemaName,
        pipelineName,
        ...(parsedParams && { params: parsedParams }),
      };

      console.log("📊 Chart component created:", component);
    }

    onAdd(component);
  };

  const resetTableColumnsForSchema = (nextSchemaName: string) => {
    const container = containers.find(
      (item) => item.schemaName === nextSchemaName,
    );
    setTableConfig({
      columns: buildTableColumnsFromFields(container?.fields || []),
      rows: { className: [] },
      cache: { invalidateKeys: [] },
      addButton: buildDefaultCreateAction(container?.fields || []),
      actions: getDefaultActionsForSource("schema", container?.fields || []),
    });
  };

  const updateTableColumn = (
    fieldName: string,
    updates: Partial<TableColumnConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName ? { ...column, ...updates } : column,
      ),
    }));
  };

  const addTableColumn = () => {
    setTableConfig((current) => {
      const columns = current.columns || [];
      let index = columns.length + 1;
      let field = `field${index}`;
      while (columns.some((column) => column.field === field)) {
        index += 1;
        field = `field${index}`;
      }
      return {
        ...current,
        columns: [...columns, { field, type: "field", displayName: "" }],
      };
    });
  };

  const addTableComputedLabelRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              computedLabelRules: [
                ...(column.computedLabelRules || []),
                { condition: "", value: "" },
              ],
            }
          : column,
      ),
    }));
  };

  const updateTableComputedLabelRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<NonNullable<TableColumnConfig["computedLabelRules"]>[number]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const rules = [...(column.computedLabelRules || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...column, computedLabelRules: rules };
      }),
    }));
  };

  const removeTableComputedLabelRule = (
    fieldName: string,
    ruleIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              computedLabelRules: (column.computedLabelRules || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : column,
      ),
    }));
  };

  const updateTableProgressBar = (
    fieldName: string,
    updates: Partial<NonNullable<TableColumnConfig["progressBar"]>>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                sourceField: column.progressBar?.sourceField || column.field,
                max: column.progressBar?.max ?? 8,
                color: column.progressBar?.color || "#4d9f24",
                trackColor: column.progressBar?.trackColor || "#e7e5df",
                height: column.progressBar?.height ?? 12,
                width: column.progressBar?.width ?? 260,
                showValue: column.progressBar?.showValue ?? true,
                ...(column.progressBar || {}),
                ...updates,
              },
            }
          : column,
      ),
    }));
  };

  const addTableProgressBarColorRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                sourceField: column.progressBar?.sourceField || column.field,
                max: column.progressBar?.max ?? 8,
                color: column.progressBar?.color || "#4d9f24",
                trackColor: column.progressBar?.trackColor || "#e7e5df",
                height: column.progressBar?.height ?? 12,
                width: column.progressBar?.width ?? 260,
                showValue: column.progressBar?.showValue ?? true,
                ...(column.progressBar || {}),
                colorRules: [
                  ...(column.progressBar?.colorRules || []),
                  { condition: "", color: "#4d9f24" },
                ],
              },
            }
          : column,
      ),
    }));
  };

  const updateTableProgressBarColorRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<
      NonNullable<
        NonNullable<TableColumnConfig["progressBar"]>["colorRules"]
      >[number]
    >,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const colorRules = [...(column.progressBar?.colorRules || [])];
        colorRules[ruleIndex] = { ...colorRules[ruleIndex], ...updates };
        return {
          ...column,
          progressBar: {
            ...(column.progressBar || {}),
            sourceField: column.progressBar?.sourceField || column.field,
            colorRules,
          },
        };
      }),
    }));
  };

  const removeTableProgressBarColorRule = (
    fieldName: string,
    ruleIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              progressBar: {
                ...(column.progressBar || {}),
                sourceField: column.progressBar?.sourceField || column.field,
                colorRules: (column.progressBar?.colorRules || []).filter(
                  (_, index) => index !== ruleIndex,
                ),
              },
            }
          : column,
      ),
    }));
  };

  const removeTableColumn = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).filter(
        (column) => column.field !== fieldName,
      ),
    }));
  };

  const updateTableColumnLink = (
    fieldName: string,
    updates: NonNullable<TableColumnConfig["link"]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? { ...column, link: { type: "external", ...column.link, ...updates } }
          : column,
      ),
    }));
  };

  const updateTableColumnRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const rules = [...(column.cellClassName || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...column, cellClassName: rules };
      }),
    }));
  };

  const addTableColumnRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: [
                ...(column.cellClassName || []),
                { condition: "", className: "" },
              ],
            }
          : column,
      ),
    }));
  };

  const removeTableColumnRule = (fieldName: string, ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: (column.cellClassName || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : column,
      ),
    }));
  };

  const updateRowRule = (
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => {
      const rules = [...(current.rows?.className || [])];
      rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
      return { ...current, rows: { className: rules } };
    });
  };

  const addRowRule = () => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: [
          ...(current.rows?.className || []),
          { condition: "", className: "" },
        ],
      },
    }));
  };

  const removeRowRule = (ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: (current.rows?.className || []).filter(
          (_, index) => index !== ruleIndex,
        ),
      },
    }));
  };

  const updateInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
    ruleIndex: number,
    updates: Partial<InfoBlockColorRule>,
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) => {
        if (itemIndex !== blockIndex) return block;
        const rules = [...(block[target] || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...block, [target]: rules };
      }),
    );
  };

  const addInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex
          ? {
              ...block,
              [target]: [...(block[target] || []), createInfoBlockColorRule()],
            }
          : block,
      ),
    );
  };

  const removeInfoBlockColorRule = (
    blockIndex: number,
    target: "titleColorRules" | "footerColorRules",
    ruleIndex: number,
  ) => {
    setInfoBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex
          ? {
              ...block,
              [target]: (block[target] || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : block,
      ),
    );
  };

  const updateDistributionBlockItem = (
    blockIndex: number,
    updates: Partial<DistributionBlockItemConfig>,
  ) => {
    setDistributionBlockItems((current) =>
      current.map((block, itemIndex) =>
        itemIndex === blockIndex ? { ...block, ...updates } : block,
      ),
    );
  };

  const addTableAction = () => {
    setTableConfig((current) => {
      const actions = current.actions || [];
      const nextOrder = actions.length + 1;
      return {
        ...current,
        actions: [
          ...actions,
          {
            id: `action-${Date.now()}`,
            kind: "update",
            label: "Action",
            buttonName: "",
            icon: "MdTouchApp",
            order: nextOrder,
            enabled: true,
            modalType: "none",
            fieldOverrides: [],
            constantValuesJson: "{}",
          },
        ],
      };
    });
  };

  const updateTableAction = (
    actionIndex: number,
    updates: Partial<TableActionConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex ? { ...action, ...updates } : action,
      ),
    }));
  };

  const updateTableAddButton = (updates: Partial<TableActionConfig>) => {
    setTableConfig((current) => ({
      ...current,
      addButton: {
        ...(current.addButton || buildDefaultCreateAction(selectedFields)),
        ...updates,
      },
    }));
  };

  const removeTableAction = (actionIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).filter(
        (_, index) => index !== actionIndex,
      ),
    }));
  };


  const addActionFieldOverride = (actionIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              fieldOverrides: [
                ...(action.fieldOverrides || []),
                { field: "", required: false, disabledCondition: "" },
              ],
            }
          : action,
      ),
    }));
  };

  const updateActionFieldOverride = (
    actionIndex: number,
    overrideIndex: number,
    updates: Partial<NonNullable<TableActionConfig["fieldOverrides"]>[number]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) => {
        if (index !== actionIndex) return action;
        const overrides = [...(action.fieldOverrides || [])];
        overrides[overrideIndex] = {
          ...overrides[overrideIndex],
          ...updates,
        };
        return { ...action, fieldOverrides: overrides };
      }),
    }));
  };

  const removeActionFieldOverride = (
    actionIndex: number,
    overrideIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              fieldOverrides: (action.fieldOverrides || []).filter(
                (_, currentIndex) => currentIndex !== overrideIndex,
              ),
            }
          : action,
      ),
    }));
  };

  const addActionFormField = (actionIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              modalType: action.modalType === "none" ? "form" : action.modalType,
              formFields: [
                ...(action.formFields || []),
                {
                  formKey: "",
                  type: "text",
                  formKeyType: "string",
                  label: "",
                  placeholder: "",
                  required: false,
                  isDisabled: false,
                  requiredCondition: "",
                  disabledCondition: "",
                  optionsSource: "static",
                  staticOptionsJson: "[]",
                  sourceSchemaName: "",
                  sourceValueField: "_id",
                  sourceLabelField: "",
                  sourceFilterCondition: "",
                },
              ],
            }
          : action,
      ),
    }));
  };

  const updateActionFormField = (
    actionIndex: number,
    fieldIndex: number,
    updates: Partial<TableActionFormFieldConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) => {
        if (index !== actionIndex) return action;
        const formFields = [...(action.formFields || [])];
        formFields[fieldIndex] = { ...formFields[fieldIndex], ...updates };
        return { ...action, formFields };
      }),
    }));
  };

  const removeActionFormField = (
    actionIndex: number,
    fieldIndex: number,
  ) => {
    setTableConfig((current) => ({
      ...current,
      actions: (current.actions || []).map((action, index) =>
        index === actionIndex
          ? {
              ...action,
              formFields: (action.formFields || []).filter(
                (_, currentIndex) => currentIndex !== fieldIndex,
              ),
            }
          : action,
      ),
    }));
  };

  const addAddButtonFormField = () => {
    setTableConfig((current) => {
      const addButton = current.addButton || buildDefaultCreateAction(selectedFields);
      return {
        ...current,
        addButton: {
          ...addButton,
          modalType: "form",
          formFields: [
            ...(addButton.formFields || []),
            {
              formKey: "",
              type: "text",
              formKeyType: "string",
              label: "",
              placeholder: "",
              required: false,
              isDisabled: false,
              requiredCondition: "",
              disabledCondition: "",
              optionsSource: "static",
              staticOptionsJson: "[]",
              sourceSchemaName: "",
              sourceValueField: "_id",
              sourceLabelField: "",
              sourceFilterCondition: "",
            },
          ],
        },
      };
    });
  };

  const updateAddButtonFormField = (
    fieldIndex: number,
    updates: Partial<TableActionFormFieldConfig>,
  ) => {
    setTableConfig((current) => {
      const addButton = current.addButton || buildDefaultCreateAction(selectedFields);
      const formFields = [...(addButton.formFields || [])];
      formFields[fieldIndex] = { ...formFields[fieldIndex], ...updates };
      return {
        ...current,
        addButton: { ...addButton, formFields },
      };
    });
  };

  const removeAddButtonFormField = (fieldIndex: number) => {
    setTableConfig((current) => {
      const addButton = current.addButton || buildDefaultCreateAction(selectedFields);
      return {
        ...current,
        addButton: {
          ...addButton,
          formFields: (addButton.formFields || []).filter(
            (_, currentIndex) => currentIndex !== fieldIndex,
          ),
        },
      };
    });
  };

  const addFilterPanelInput = () => {
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: [
          ...(current.filterPanel?.inputs || []),
          {
            formKey: "",
            type: "text",
            formKeyType: "string",
            label: "",
            placeholder: "",
            required: false,
            isDisabled: false,
            requiredCondition: "",
            disabledCondition: "",
            optionsSource: "static",
            staticOptionsJson: "[]",
            sourceSchemaName: "",
            sourceValueField: "_id",
            sourceLabelField: "",
            sourceFilterCondition: "",
          },
        ],
      },
    }));
  };

  const buildDefaultFilterPanelInputsForCurrentSource =
    (): TableFilterPanelInputConfig[] => {
      if (tableSourceType === "pipeline") {
        const outputFields =
          pipelineOptions.find(({ pipeline }) => pipeline.name === pipelineName)
            ?.outputFields || [];
        return buildTableColumnsFromNames(outputFields).map((column) => ({
          formKey: column.field,
          type: "text",
          formKeyType: "string",
          label: column.displayName || column.field,
          placeholder: column.displayName || column.field,
          required: false,
          disabledCondition: "",
          requiredCondition: "",
          isDisabled: false,
          isMultiple: false,
          optionsSource: "static",
          staticOptionsJson: "[]",
          sourceValueField: "_id",
          sourceFilterCondition: "",
        }));
      }

      if (tableSourceType === "workflow") {
        const outputFields =
          workflowOptions.find(({ workflow }) => workflow.name === workflowName)
            ?.outputFields || [];
        return buildTableColumnsFromNames(outputFields).map((column) => ({
          formKey: column.field,
          type: "text",
          formKeyType: "string",
          label: column.displayName || column.field,
          placeholder: column.displayName || column.field,
          required: false,
          disabledCondition: "",
          requiredCondition: "",
          isDisabled: false,
          isMultiple: false,
          optionsSource: "static",
          staticOptionsJson: "[]",
          sourceValueField: "_id",
          sourceFilterCondition: "",
        }));
      }

      return buildFilterPanelInputsFromFields(selectedFields);
    };

  const areDefaultFilterPanelInputsActive = () => {
    const currentInputs = tableConfig.filterPanel?.inputs || [];
    const defaultInputs = buildDefaultFilterPanelInputsForCurrentSource();
    if (currentInputs.length !== defaultInputs.length) return false;

    const currentKeys = currentInputs.map((input) => input.formKey).sort();
    const defaultKeys = defaultInputs.map((input) => input.formKey).sort();
    return currentKeys.every((key, index) => key === defaultKeys[index]);
  };

  const setDefaultFilterPanelInputsActive = (isActive: boolean) => {
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: isActive ? buildDefaultFilterPanelInputsForCurrentSource() : [],
      },
    }));
  };

  const updateFilterPanelInput = (
    inputIndex: number,
    updates: Partial<TableFilterPanelInputConfig>,
  ) => {
    setTableConfig((current) => {
      const inputs = [...(current.filterPanel?.inputs || [])];
      inputs[inputIndex] = { ...inputs[inputIndex], ...updates };
      return {
        ...current,
        filterPanel: { inputs },
      };
    });
  };

  const removeFilterPanelInput = (inputIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      filterPanel: {
        inputs: (current.filterPanel?.inputs || []).filter(
          (_, currentIndex) => currentIndex !== inputIndex,
        ),
      },
    }));
  };

  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: `Tab ${tabs.length + 1}`,
        components: [],
      },
    ]);
  };

  // Open Excel upload for tab
  const openTabExcelUpload = () => {
    setShowTabExcelModal(true);
  };

  // Handle Excel upload success for tabs
  const handleTabExcelUploadSuccess = (
    schemaName: string,
    component: ComponentBlock
  ) => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: schemaName,
        components: [component],
      },
    ]);
  };

  const addTableToTab = (tabIndex: number, schema: string) => {
    const updatedTabs = [...tabs];
    const container = containers.find((item) => item.schemaName === schema);
    updatedTabs[tabIndex].components.push({
      id: `comp-${Date.now()}`,
      type: "table",
      order: updatedTabs[tabIndex].components.length + 1,
      dataBinding: {
        kind: "schema",
        schemaName: schema,
      },
      table: {
        columns: buildTableColumnsFromFields(container?.fields || []),
      },
    });
    setTabs(updatedTabs);
  };

  const removeTab = (tabIndex: number) => {
    setTabs(tabs.filter((_, i) => i !== tabIndex));
  };

  const removeTableFromTab = (tabIndex: number, componentId: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].components = updatedTabs[tabIndex].components.filter(
      (comp) => comp.id !== componentId
    );
    setTabs(updatedTabs);
  };

  const currentAddButton =
    tableConfig.addButton || buildDefaultCreateAction(selectedFields);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[min(96vw,1440px)] max-h-[96vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {editingComponent ? "Edit Component" : "Add Component"}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configure the component settings and data binding
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-neutral-50/40">
          <div className="space-y-6">
            {/* Component Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-neutral-200 bg-white p-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                  Component Type
                </label>
                <select
                  value={componentType}
                  onChange={(e) => setComponentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                >
                  <option value="table">Table</option>
                  <option value="tabPanel">Tab Panel</option>
                  <option value="infoBlocks">Information Blocks</option>
                  <option value="distributionBlocks">Distribution Blocks</option>
                  {CHART_TYPES.map((chart) => (
                    <option key={chart.value} value={chart.value}>
                      {chart.label}
                    </option>
                  ))}
                </select>
              </div>

              {componentType !== "tabPanel" &&
                componentType !== "infoBlocks" &&
                componentType !== "distributionBlocks" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="Optional component title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Schema Name
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      value={schemaName}
                      onChange={(e) => {
                        setSchemaName(e.target.value);
                        if (componentType === "table") {
                          resetTableColumnsForSchema(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a schema...</option>
                      {containerOptions.map((container) => (
                        <option key={container.value} value={container.value}>
                          {container.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {componentType === "table" && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                          Table Source
                        </label>
                        <select
                          value={tableSourceType}
                          onChange={(e) => {
                            setTableSourceType(
                              e.target.value as "schema" | "pipeline" | "workflow",
                            );
                            setPipelineName("");
                            setWorkflowName("");
                            if (e.target.value === "schema") {
                              resetTableColumnsForSchema(schemaName);
                            } else {
                              setTableConfig((current) => ({
                                ...current,
                                columns: [],
                                actions: [],
                              }));
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        >
                          <option value="schema">Schema rows</option>
                          <option value="pipeline">Pipeline request</option>
                          <option value="workflow">Workflow request</option>
                        </select>
                      </div>

                      {tableSourceType === "pipeline" && (
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                            Pipeline Name
                            <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <select
                            value={pipelineName}
                            onChange={(e) => setPipelineName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          >
                            <option value="">
                              {pipelineOptions.length > 0
                                ? "Select a pipeline..."
                                : "No data-returning pipelines"}
                            </option>
                            {pipelineOptions.map(({ pipeline }) => (
                              <option key={pipeline.name} value={pipeline.name}>
                                {pipeline.name}
                              </option>
                            ))}
                          </select>
                          {pipelineName && (
                            <p className="mt-1 text-xs text-neutral-500">
                              Output fields:{" "}
                              {pipelineOptions
                                .find(({ pipeline }) => pipeline.name === pipelineName)
                                ?.outputFields.join(", ")}
                            </p>
                          )}
                        </div>
                      )}

                      {tableSourceType === "workflow" && (
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                            Workflow Name
                            <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <select
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          >
                            <option value="">
                              {workflowOptions.length > 0
                                ? "Select a workflow..."
                                : "No data-returning workflows"}
                            </option>
                            {workflowOptions.map(({ workflow }) => (
                              <option key={workflow.name} value={workflow.name}>
                                {workflow.name}
                              </option>
                            ))}
                          </select>
                          {workflowName && (
                            <p className="mt-1 text-xs text-neutral-500">
                              Output fields:{" "}
                              {workflowOptions
                                .find(({ workflow }) => workflow.name === workflowName)
                                ?.outputFields.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {componentType === "infoBlocks" && (
              <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="Optional component title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Source
                    </label>
                    <select
                      value={infoBlocksSource}
                      onChange={(e) => {
                        const nextSource = e.target.value as InfoBlocksSource;
                        setInfoBlocksSource(nextSource);
                        setPipelineName("");
                        setWorkflowName("");
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      {INFO_BLOCK_SOURCES.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Blocks
                    </label>
                    <select
                      value={infoBlockItems.length}
                      onChange={(e) =>
                        setInfoBlockItems((current) =>
                          resizeInfoBlockItems(Number(e.target.value), current),
                        )
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      {[1, 2, 3, 4, 5].map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>

                  {infoBlocksSource !== "static" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Schema Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={schemaName}
                        onChange={(e) => setSchemaName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a schema...</option>
                        {containerOptions.map((container) => (
                          <option key={container.value} value={container.value}>
                            {container.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {infoBlocksSource === "pipeline" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Pipeline Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={pipelineName}
                        onChange={(e) => setPipelineName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          {pipelineOptions.length > 0
                            ? "Select a pipeline..."
                            : "No data-returning pipelines"}
                        </option>
                        {pipelineOptions.map(({ pipeline }) => (
                          <option key={pipeline.name} value={pipeline.name}>
                            {pipeline.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {infoBlocksSource === "workflow" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Workflow Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          {workflowOptions.length > 0
                            ? "Select a workflow..."
                            : "No data-returning workflows"}
                        </option>
                        {workflowOptions.map(({ workflow }) => (
                          <option key={workflow.name} value={workflow.name}>
                            {workflow.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {infoBlockItems.map((item, index) => {
                    return (
                      <div
                        key={`info-block-editor-${index}`}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                      >
                      <div className="mb-3 text-sm font-semibold text-neutral-800">
                        Block {index + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) =>
                            setInfoBlockItems((current) =>
                              current.map((block, itemIndex) =>
                                itemIndex === index
                                  ? { ...block, title: e.target.value }
                                  : block,
                              ),
                            )
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="Upper text"
                        />
                        <input
                          type="text"
                          value={item.value || ""}
                          onChange={(e) =>
                            setInfoBlockItems((current) =>
                              current.map((block, itemIndex) =>
                                itemIndex === index
                                  ? { ...block, value: e.target.value }
                                  : block,
                              ),
                            )
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="{{quantity}}"
                        />
                        <input
                          type="text"
                          value={item.footer || ""}
                          onChange={(e) =>
                            setInfoBlockItems((current) =>
                              current.map((block, itemIndex) =>
                                itemIndex === index
                                  ? { ...block, footer: e.target.value }
                                  : block,
                              ),
                            )
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="Lower text"
                        />
                        <input
                          type="color"
                          value={item.color || "#ffffff"}
                          onChange={(e) =>
                            setInfoBlockItems((current) =>
                              current.map((block, itemIndex) =>
                                itemIndex === index
                                  ? { ...block, color: e.target.value }
                                  : block,
                              ),
                            )
                          }
                          className="h-[42px] w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-2"
                          title="Side color"
                        />
                        <div className="md:col-span-2 rounded-lg border border-neutral-200 bg-white p-3">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                              Upper text color rules
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                addInfoBlockColorRule(index, "titleColorRules")
                              }
                              className="text-xs font-medium text-violet-700 hover:text-violet-900"
                            >
                              + Add rule
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(item.titleColorRules || []).map(
                              (rule, ruleIndex) => (
                                <div
                                  key={ruleIndex}
                                  className="grid grid-cols-[1fr_96px_auto] gap-2"
                                >
                                  <input
                                    type="text"
                                    value={rule.condition || ""}
                                    onChange={(e) =>
                                      updateInfoBlockColorRule(
                                        index,
                                        "titleColorRules",
                                        ruleIndex,
                                        { condition: e.target.value },
                                      )
                                    }
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    placeholder="{{high}} > 4 or default"
                                  />
                                  <input
                                    type="color"
                                    value={rule.color || "#16a34a"}
                                    onChange={(e) =>
                                      updateInfoBlockColorRule(
                                        index,
                                        "titleColorRules",
                                        ruleIndex,
                                        { color: e.target.value },
                                      )
                                    }
                                    className="h-[38px] w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-2"
                                    title="Upper text color"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeInfoBlockColorRule(
                                        index,
                                        "titleColorRules",
                                        ruleIndex,
                                      )
                                    }
                                    className="rounded-lg bg-red-50 px-2 text-red-700 hover:bg-red-100"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2 rounded-lg border border-neutral-200 bg-white p-3">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                              Lower text color rules
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                addInfoBlockColorRule(index, "footerColorRules")
                              }
                              className="text-xs font-medium text-violet-700 hover:text-violet-900"
                            >
                              + Add rule
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(item.footerColorRules || []).map(
                              (rule, ruleIndex) => (
                                <div
                                  key={ruleIndex}
                                  className="grid grid-cols-[1fr_96px_auto] gap-2"
                                >
                                  <input
                                    type="text"
                                    value={rule.condition || ""}
                                    onChange={(e) =>
                                      updateInfoBlockColorRule(
                                        index,
                                        "footerColorRules",
                                        ruleIndex,
                                        { condition: e.target.value },
                                      )
                                    }
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    placeholder="{{high}} > 4 or default"
                                  />
                                  <input
                                    type="color"
                                    value={rule.color || "#16a34a"}
                                    onChange={(e) =>
                                      updateInfoBlockColorRule(
                                        index,
                                        "footerColorRules",
                                        ruleIndex,
                                        { color: e.target.value },
                                      )
                                    }
                                    className="h-[38px] w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-2"
                                    title="Lower text color"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeInfoBlockColorRule(
                                        index,
                                        "footerColorRules",
                                        ruleIndex,
                                      )
                                    }
                                    className="rounded-lg bg-red-50 px-2 text-red-700 hover:bg-red-100"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

            {componentType === "distributionBlocks" && (
              <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="Kategori Dağılımı (adet)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Source
                    </label>
                    <select
                      value={distributionBlocksSource}
                      onChange={(e) => {
                        const nextSource = e.target.value as InfoBlocksSource;
                        setDistributionBlocksSource(nextSource);
                        setPipelineName("");
                        setWorkflowName("");
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      {INFO_BLOCK_SOURCES.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Blocks
                    </label>
                    <select
                      value={distributionBlockItems.length}
                      onChange={(e) =>
                        setDistributionBlockItems((current) =>
                          resizeDistributionBlockItems(
                            Number(e.target.value),
                            current,
                          ),
                        )
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      {[1, 2, 3, 4, 5].map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>

                  {distributionBlocksSource !== "static" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Schema Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={schemaName}
                        onChange={(e) => setSchemaName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a schema...</option>
                        {containerOptions.map((container) => (
                          <option key={container.value} value={container.value}>
                            {container.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {distributionBlocksSource === "pipeline" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Pipeline Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={pipelineName}
                        onChange={(e) => setPipelineName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          {pipelineOptions.length > 0
                            ? "Select a pipeline..."
                            : "No data-returning pipelines"}
                        </option>
                        {pipelineOptions.map(({ pipeline }) => (
                          <option key={pipeline.name} value={pipeline.name}>
                            {pipeline.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {distributionBlocksSource === "workflow" && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                        Workflow Name
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          {workflowOptions.length > 0
                            ? "Select a workflow..."
                            : "No data-returning workflows"}
                        </option>
                        {workflowOptions.map(({ workflow }) => (
                          <option key={workflow.name} value={workflow.name}>
                            {workflow.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {distributionBlockItems.map((item, index) => (
                    <div
                      key={`distribution-block-editor-${index}`}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                    >
                      <div className="mb-3 text-sm font-semibold text-neutral-800">
                        Block {index + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.label || ""}
                          onChange={(e) =>
                            updateDistributionBlockItem(index, {
                              label: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder='{{high > 4 ? "↑ Strateji" : "Strateji"}}'
                        />
                        <input
                          type="text"
                          value={item.value || ""}
                          onChange={(e) =>
                            updateDistributionBlockItem(index, {
                              value: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="{{strategyCount}}"
                        />
                        <input
                          type="text"
                          value={item.percent || ""}
                          onChange={(e) =>
                            updateDistributionBlockItem(index, {
                              percent: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="{{strategyPercent}}"
                        />
                        <input
                          type="color"
                          value={item.color || "#4f46e5"}
                          onChange={(e) =>
                            updateDistributionBlockItem(index, {
                              color: e.target.value,
                            })
                          }
                          className="h-[42px] w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-2"
                          title="Block color"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(componentType !== "tabPanel" || componentType === "tabPanel") && (
              <>
                {/* Table Configuration */}
                {(componentType === "table" || componentType === "tabPanel") && (
                  <div className="space-y-5 border border-neutral-200 rounded-2xl p-5 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-neutral-900">
                          Table Settings
                        </h4>
                        <p className="text-sm text-neutral-500 mt-1">
                          Configure column labels, links, cell classes, filters,
                          actions, and rows for this table component.
                        </p>
                      </div>
                      {schemaName && (
                        <div className="shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                          <span className="font-semibold text-neutral-800">
                            {tableConfig.columns?.length || 0}
                          </span>{" "}
                          columns
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-[220px_1fr] gap-5 min-h-[620px]">
                      <div className="space-y-1 rounded-xl border border-neutral-200 bg-neutral-50 p-2">
                        {TABLE_SETTINGS_TABS.map((tab) => (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTableSettingsTab(tab.value)}
                            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                              activeTableSettingsTab === tab.value
                                ? "bg-white text-violet-700 shadow-sm border border-violet-200"
                                : "text-neutral-600 hover:bg-white border border-transparent"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-5">
                        {!schemaName ? (
                          <div className="text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-lg p-4">
                            Select a schema to configure table settings.
                          </div>
                        ) : selectedFields.length === 0 &&
                          (tableConfig.columns || []).length === 0 ? (
                          <div className="text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-lg p-4">
                            Add output fields for this table source.
                          </div>
                        ) : (
                          <>
                            {activeTableSettingsTab === "columns" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                <button
                                  type="button"
                                  onClick={addTableColumn}
                                  className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                                >
                                  <FiPlus size={14} />
                                  Add output field
                                </button>
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="border border-neutral-200 rounded-xl p-4 space-y-3"
                                  >
                                    <div className="grid grid-cols-[minmax(160px,0.8fr)_minmax(150px,0.7fr)_1fr_auto] gap-4">
                                      <div>
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Field
                                        </label>
                                        <input
                                          type="text"
                                          value={column.field}
                                          onChange={(e) =>
                                            updateTableColumn(column.field, {
                                              field: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Type
                                        </label>
                                        <select
                                          value={column.type || "field"}
                                          onChange={(e) => {
                                            const nextType = e.target
                                              .value as TableColumnConfig["type"];
                                            updateTableColumn(column.field, {
                                              type: nextType,
                                              ...(nextType === "progressBar" &&
                                              !column.progressBar
                                                ? {
                                                    progressBar: {
                                                      sourceField: column.field,
                                                      max: 8,
                                                      color: "#4d9f24",
                                                      trackColor: "#e7e5df",
                                                      height: 12,
                                                      width: 260,
                                                      showValue: true,
                                                      colorRules: [],
                                                    },
                                                  }
                                                : {}),
                                            });
                                          }}
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                                        >
                                          <option value="field">Field</option>
                                          <option value="computedLabel">
                                            Computed Label
                                          </option>
                                          <option value="progressBar">
                                            Progress Bar
                                          </option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Display Name
                                        </label>
                                        <input
                                          type="text"
                                          value={column.displayName || ""}
                                          onChange={(e) =>
                                            updateTableColumn(column.field, {
                                              displayName: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder={column.field}
                                        />
                                      </div>
                                      <div className="flex items-end">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeTableColumn(column.field)
                                          }
                                          className="rounded-lg bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100"
                                          title="Remove field"
                                        >
                                          <FiTrash2 size={16} />
                                        </button>
                                      </div>
                                    </div>
                                    {(column.type || "field") ===
                                      "computedLabel" && (
                                      <div className="space-y-2 rounded-lg border border-neutral-100 bg-neutral-50 p-3">
                                        <div className="grid grid-cols-[1fr_auto] gap-3">
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Fallback Value
                                            </label>
                                            <input
                                              type="text"
                                              value={column.fallbackValue || ""}
                                              onChange={(e) =>
                                                updateTableColumn(column.field, {
                                                  fallbackValue: e.target.value,
                                                })
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder="Optional"
                                            />
                                          </div>
                                          <div className="flex items-end">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                addTableComputedLabelRule(
                                                  column.field,
                                                )
                                              }
                                              className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
                                            >
                                              Add rule
                                            </button>
                                          </div>
                                        </div>
                                        {(column.computedLabelRules || []).map(
                                          (rule, ruleIndex) => (
                                            <div
                                              key={ruleIndex}
                                              className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                            >
                                              <input
                                                type="text"
                                                value={rule.condition || ""}
                                                onChange={(e) =>
                                                  updateTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                    {
                                                      condition: e.target.value,
                                                    },
                                                  )
                                                }
                                                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="stock == 1"
                                              />
                                              <input
                                                type="text"
                                                value={rule.value || ""}
                                                onChange={(e) =>
                                                  updateTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                    { value: e.target.value },
                                                  )
                                                }
                                                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="critical"
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeTableComputedLabelRule(
                                                    column.field,
                                                    ruleIndex,
                                                  )
                                                }
                                                className="rounded-lg bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100"
                                                title="Remove rule"
                                              >
                                                <FiTrash2 size={14} />
                                              </button>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    )}
                                    {(column.type || "field") ===
                                      "progressBar" && (
                                      <div className="space-y-3 rounded-lg border border-neutral-100 bg-neutral-50 p-3">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Source Field
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                column.progressBar
                                                  ?.sourceField || column.field
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    sourceField: e.target.value,
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder="stock"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Max
                                            </label>
                                            <input
                                              type="number"
                                              value={
                                                column.progressBar?.max ?? 8
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    max:
                                                      e.target.value === ""
                                                        ? undefined
                                                        : Number(
                                                            e.target.value,
                                                          ),
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              min={0}
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Max Field
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                column.progressBar?.maxField ||
                                                ""
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    maxField: e.target.value,
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder="Optional"
                                            />
                                          </div>
                                          <label className="flex items-end gap-2 pb-2 text-sm text-neutral-700">
                                            <input
                                              type="checkbox"
                                              checked={
                                                column.progressBar
                                                  ?.showValue !== false
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    showValue:
                                                      e.target.checked,
                                                  },
                                                )
                                              }
                                            />
                                            Show value
                                          </label>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Default Color
                                            </label>
                                            <input
                                              type="color"
                                              value={
                                                column.progressBar?.color ||
                                                "#4d9f24"
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  { color: e.target.value },
                                                )
                                              }
                                              className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-2"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Track Color
                                            </label>
                                            <input
                                              type="color"
                                              value={
                                                column.progressBar
                                                  ?.trackColor || "#e7e5df"
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    trackColor:
                                                      e.target.value,
                                                  },
                                                )
                                              }
                                              className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-2"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Height
                                            </label>
                                            <input
                                              type="number"
                                              value={
                                                column.progressBar?.height ?? 12
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    height: Number(
                                                      e.target.value,
                                                    ),
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              min={4}
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                              Width
                                            </label>
                                            <input
                                              type="number"
                                              value={
                                                column.progressBar?.width ?? 260
                                              }
                                              onChange={(e) =>
                                                updateTableProgressBar(
                                                  column.field,
                                                  {
                                                    width: Number(
                                                      e.target.value,
                                                    ),
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              min={80}
                                            />
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div className="text-xs font-semibold text-neutral-700">
                                            Color Rules
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              addTableProgressBarColorRule(
                                                column.field,
                                              )
                                            }
                                            className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
                                          >
                                            Add rule
                                          </button>
                                        </div>
                                        {(
                                          column.progressBar?.colorRules || []
                                        ).map((rule, ruleIndex) => (
                                          <div
                                            key={ruleIndex}
                                            className="grid grid-cols-[1fr_120px_auto] gap-2"
                                          >
                                            <input
                                              type="text"
                                              value={rule.condition || ""}
                                              onChange={(e) =>
                                                updateTableProgressBarColorRule(
                                                  column.field,
                                                  ruleIndex,
                                                  {
                                                    condition: e.target.value,
                                                  },
                                                )
                                              }
                                              className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder="stock < 2"
                                            />
                                            <input
                                              type="color"
                                              value={rule.color || "#4d9f24"}
                                              onChange={(e) =>
                                                updateTableProgressBarColorRule(
                                                  column.field,
                                                  ruleIndex,
                                                  { color: e.target.value },
                                                )
                                              }
                                              className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-2"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeTableProgressBarColorRule(
                                                  column.field,
                                                  ruleIndex,
                                                )
                                              }
                                              className="rounded-lg bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100"
                                              title="Remove rule"
                                            >
                                              <FiTrash2 size={14} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "links" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="border border-neutral-200 rounded-xl p-4 space-y-3"
                                  >
                                    <div className="text-xs font-semibold text-neutral-700">
                                      {column.displayName || column.field}
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Type
                                        </label>
                                        <select
                                          value={column.link?.type || "external"}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              type: e.target.value as LinkType,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                                        >
                                          {LINK_TYPES.map((linkType) => (
                                            <option
                                              key={linkType.value}
                                              value={linkType.value}
                                            >
                                              {linkType.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Template
                                        </label>
                                        <input
                                          type="text"
                                          value={column.link?.template || ""}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              template: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="https://example.com/{{value}}"
                                        />
                                      </div>
                                      <div className="col-span-3">
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Label Field
                                        </label>
                                        <input
                                          type="text"
                                          value={column.link?.labelField || ""}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              labelField: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="Optional field name for link text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "cellClasses" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="border border-neutral-200 rounded-xl p-4 space-y-3"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="text-xs font-semibold text-neutral-700">
                                        {column.displayName || column.field}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          addTableColumnRule(column.field)
                                        }
                                        className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                      >
                                        + Add rule
                                      </button>
                                    </div>
                                    {(column.cellClassName || []).map(
                                      (rule, ruleIndex) => (
                                        <div
                                          key={ruleIndex}
                                          className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                        >
                                          <input
                                            type="text"
                                            value={rule.condition}
                                            onChange={(e) =>
                                              updateTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                                { condition: e.target.value },
                                              )
                                            }
                                            className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="status = 'active'"
                                          />
                                          <input
                                            type="text"
                                            value={rule.className}
                                            onChange={(e) =>
                                              updateTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                                { className: e.target.value },
                                              )
                                            }
                                            className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="text-green-600"
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                              )
                                            }
                                            className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                          >
                                            <FiTrash2 size={14} />
                                          </button>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "rows" && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                                    Row Class Rules
                                  </label>
                                  <button
                                    type="button"
                                    onClick={addRowRule}
                                    className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                  >
                                    + Add rule
                                  </button>
                                </div>
                                {(tableConfig.rows?.className || []).map(
                                  (rule, ruleIndex) => (
                                    <div
                                      key={ruleIndex}
                                      className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                    >
                                      <input
                                        type="text"
                                        value={rule.condition}
                                        onChange={(e) =>
                                          updateRowRule(ruleIndex, {
                                            condition: e.target.value,
                                          })
                                        }
                                        className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="status = 'active'"
                                      />
                                      <input
                                        type="text"
                                        value={rule.className}
                                        onChange={(e) =>
                                          updateRowRule(ruleIndex, {
                                            className: e.target.value,
                                          })
                                        }
                                        className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="bg-green-50"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeRowRule(ruleIndex)}
                                        className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                      >
                                        <FiTrash2 size={14} />
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {activeTableSettingsTab === "filterInputs" && (
                              <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                                      Filter Panel Inputs
                                    </label>
                                    <p className="mt-1 text-xs text-neutral-500">
                                      Use defaults from the selected source or customize the list manually.
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-700">
                                      <input
                                        type="checkbox"
                                        checked={areDefaultFilterPanelInputsActive()}
                                        onChange={(e) =>
                                          setDefaultFilterPanelInputsActive(
                                            e.target.checked,
                                          )
                                        }
                                      />
                                      Use defaults
                                    </label>
                                    <button
                                      type="button"
                                      onClick={addFilterPanelInput}
                                      className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                                    >
                                      <FiPlus size={14} />
                                      Add input
                                    </button>
                                  </div>
                                </div>

                                {(tableConfig.filterPanel?.inputs || []).map(
                                  (field, fieldIndex) => (
                                    <div
                                      key={fieldIndex}
                                      className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3"
                                    >
                                      <div className="grid grid-cols-[1fr_160px_auto] gap-2">
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Form key
                                          </span>
                                          <input
                                            type="text"
                                            value={field.formKey}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                formKey: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="field name"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Input type
                                          </span>
                                          <select
                                            value={field.type}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                type: e.target
                                                  .value as TableActionInputType,
                                                formKeyType:
                                                  formKeyTypeForActionInput(
                                                    e.target
                                                      .value as TableActionInputType,
                                                    field.isMultiple,
                                                  ),
                                                isNumberButtonsActive:
                                                  isActionNumberInput(
                                                    e.target.value,
                                                  )
                                                    ? field.isNumberButtonsActive
                                                    : false,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          >
                                            {ACTION_INPUT_TYPES.map((inputType) => (
                                              <option
                                                key={inputType.value}
                                                value={inputType.value}
                                              >
                                                {inputType.label}
                                              </option>
                                            ))}
                                          </select>
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeFilterPanelInput(fieldIndex)
                                          }
                                          className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                        >
                                          <FiTrash2 size={14} />
                                        </button>
                                      </div>

                                      <div className="grid grid-cols-4 gap-2">
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Label
                                          </span>
                                          <input
                                            type="text"
                                            value={field.label || ""}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                label: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="label"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Placeholder
                                          </span>
                                          <input
                                            type="text"
                                            value={field.placeholder || ""}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                placeholder: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="placeholder"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Disabled condition
                                          </span>
                                          <input
                                            type="text"
                                            value={field.disabledCondition || ""}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                disabledCondition: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="disabled condition"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Required condition
                                          </span>
                                          <input
                                            type="text"
                                            value={field.requiredCondition || ""}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                requiredCondition: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="required condition"
                                          />
                                        </label>
                                      </div>

                                      <div className="grid grid-cols-[auto_auto_auto_auto_1fr] gap-3">
                                        <label className="flex items-center gap-2 text-xs text-neutral-700">
                                          <input
                                            type="checkbox"
                                            checked={!!field.required}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                required: e.target.checked,
                                              })
                                            }
                                          />
                                          Required
                                        </label>
                                        <label className="flex items-center gap-2 text-xs text-neutral-700">
                                          <input
                                            type="checkbox"
                                            checked={!!field.isDisabled}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                isDisabled: e.target.checked,
                                              })
                                            }
                                          />
                                          Disabled
                                        </label>
                                        <label className="flex items-center gap-2 text-xs text-neutral-700">
                                          <input
                                            type="checkbox"
                                            checked={!!field.isMultiple}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                isMultiple: e.target.checked,
                                                formKeyType:
                                                  formKeyTypeForActionInput(
                                                    field.type,
                                                    e.target.checked,
                                                  ),
                                              })
                                            }
                                          />
                                          Multiple
                                        </label>
                                        {isActionNumberInput(field.type) && (
                                          <label className="flex items-center gap-2 text-xs text-neutral-700">
                                            <input
                                              type="checkbox"
                                              checked={
                                                !!field.isNumberButtonsActive
                                              }
                                              onChange={(e) =>
                                                updateFilterPanelInput(
                                                  fieldIndex,
                                                  {
                                                    isNumberButtonsActive:
                                                      e.target.checked,
                                                  },
                                                )
                                              }
                                            />
                                            Number buttons
                                          </label>
                                        )}
                                        <label className="space-y-1">
                                          <span className="text-xs font-medium text-neutral-600">
                                            Default value
                                          </span>
                                          <input
                                            type="text"
                                            value={String(field.defaultValue ?? "")}
                                            onChange={(e) =>
                                              updateFilterPanelInput(fieldIndex, {
                                                defaultValue: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="default value"
                                          />
                                        </label>
                                      </div>

                                      {field.type === "select" && (
                                        <div className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                          <div className="grid grid-cols-4 gap-2">
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Options source
                                              </span>
                                              <select
                                                value={
                                                  field.optionsSource || "static"
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      optionsSource: e.target
                                                        .value as TableActionOptionsSource,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              >
                                                {ACTION_OPTIONS_SOURCES.map(
                                                  (source) => (
                                                    <option
                                                      key={source.value}
                                                      value={source.value}
                                                    >
                                                      {source.label}
                                                    </option>
                                                  ),
                                                )}
                                              </select>
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Source schema
                                              </span>
                                              <select
                                                value={
                                                  field.sourceSchemaName || ""
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      sourceSchemaName:
                                                        e.target.value,
                                                      sourceValueField: "_id",
                                                      sourceLabelField: "",
                                                    },
                                                  )
                                                }
                                                disabled={
                                                  field.optionsSource !== "schema"
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                              >
                                                <option value="">
                                                  Source schema...
                                                </option>
                                                {containers.map((container) => (
                                                  <option
                                                    key={container.schemaName}
                                                    value={container.schemaName}
                                                  >
                                                    {container.schemaName}
                                                  </option>
                                                ))}
                                              </select>
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Value field
                                              </span>
                                              <select
                                                value={
                                                  field.sourceValueField || "_id"
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      sourceValueField:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                disabled={
                                                  field.optionsSource !==
                                                    "schema" ||
                                                  !field.sourceSchemaName
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                              >
                                                <option value="_id">_id</option>
                                                {(containers.find(
                                                  (container) =>
                                                    container.schemaName ===
                                                    field.sourceSchemaName,
                                                )?.fields || []).map(
                                                  (sourceField) => (
                                                    <option
                                                      key={sourceField.name}
                                                      value={sourceField.name}
                                                    >
                                                      {sourceField.name}
                                                    </option>
                                                  ),
                                                )}
                                              </select>
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Label field
                                              </span>
                                              <select
                                                value={
                                                  field.sourceLabelField || ""
                                                }
                                                onChange={(e) =>
                                                  updateFilterPanelInput(
                                                    fieldIndex,
                                                    {
                                                      sourceLabelField:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                disabled={
                                                  field.optionsSource !==
                                                    "schema" ||
                                                  !field.sourceSchemaName
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                              >
                                                <option value="">
                                                  Label field...
                                                </option>
                                                <option value="_id">_id</option>
                                                {(containers.find(
                                                  (container) =>
                                                    container.schemaName ===
                                                    field.sourceSchemaName,
                                                )?.fields || []).map(
                                                  (sourceField) => (
                                                    <option
                                                      key={sourceField.name}
                                                      value={sourceField.name}
                                                    >
                                                      {sourceField.name}
                                                    </option>
                                                  ),
                                                )}
                                              </select>
                                            </label>
                                          </div>
                                          <label className="space-y-1">
                                            <span className="text-xs font-medium text-neutral-600">
                                              Option filter condition
                                            </span>
                                            <input
                                              type="text"
                                              value={
                                                field.sourceFilterCondition || ""
                                              }
                                              onChange={(e) =>
                                                updateFilterPanelInput(
                                                  fieldIndex,
                                                  {
                                                    sourceFilterCondition:
                                                      e.target.value,
                                                  },
                                                )
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder="option filter condition"
                                            />
                                          </label>
                                          <SelectInput
                                            label="Invalidate keys"
                                            options={(
                                              tableConfig.filterPanel?.inputs || []
                                            )
                                              .filter(
                                                (candidate, candidateIndex) =>
                                                  candidateIndex !==
                                                    fieldIndex &&
                                                  candidate.formKey.trim(),
                                              )
                                              .map((candidate) => ({
                                                value: candidate.formKey,
                                                label:
                                                  candidate.label ||
                                                  candidate.formKey,
                                              }))}
                                            value={(field.invalidateKeys || []).map(
                                              (key) => {
                                                const candidate = (
                                                  tableConfig.filterPanel
                                                    ?.inputs || []
                                                ).find(
                                                  (input) =>
                                                    input.formKey === key,
                                                );
                                                return {
                                                  value: key,
                                                  label:
                                                    candidate?.label || key,
                                                };
                                              },
                                            )}
                                            onChange={(selectedOptions) => {
                                              const selected = Array.isArray(
                                                selectedOptions,
                                              )
                                                ? selectedOptions
                                                : [];
                                              updateFilterPanelInput(fieldIndex, {
                                                invalidateKeys: selected.map(
                                                  (option: OptionType) =>
                                                    String(option.value),
                                                ),
                                              });
                                            }}
                                            isMultiple
                                            isAutoFill={false}
                                            placeholder="Select fields to clear"
                                          />
                                          <label className="space-y-1">
                                            <span className="text-xs font-medium text-neutral-600">
                                              Static options JSON
                                            </span>
                                            <textarea
                                              value={
                                                field.staticOptionsJson || "[]"
                                              }
                                              onChange={(e) =>
                                                updateFilterPanelInput(
                                                  fieldIndex,
                                                  {
                                                    staticOptionsJson:
                                                      e.target.value,
                                                  },
                                                )
                                              }
                                              className="min-h-20 w-full px-3 py-2 text-sm font-mono border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              placeholder='[{"value":"active","label":"Active"}]'
                                            />
                                          </label>
                                        </div>
                                      )}

                                      <div className="grid grid-cols-5 gap-2">
                                        <input
                                          type="number"
                                          value={field.min ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              min: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="min"
                                        />
                                        <input
                                          type="number"
                                          value={field.max ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              max: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="max"
                                        />
                                        <input
                                          type="number"
                                          value={field.minLength ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              minLength: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="min length"
                                        />
                                        <input
                                          type="number"
                                          value={field.maxLength ?? ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              maxLength: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="max length"
                                        />
                                        <input
                                          type="text"
                                          value={field.pattern || ""}
                                          onChange={(e) =>
                                            updateFilterPanelInput(fieldIndex, {
                                              pattern: e.target.value,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="pattern"
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        value={field.validationMessage || ""}
                                        onChange={(e) =>
                                          updateFilterPanelInput(fieldIndex, {
                                            validationMessage: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="validation message"
                                      />
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            {activeTableSettingsTab === "actions" && (
                              <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1">
                                <div className="space-y-4 border border-blue-200 bg-blue-50/60 rounded-xl p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-sm font-semibold text-blue-900">
                                        Add Button
                                      </h4>
                                      <p className="text-xs text-blue-700">
                                        Controls the top table add button, not row actions.
                                      </p>
                                    </div>
                                    <label className="flex h-9 items-center gap-2 text-xs text-neutral-700">
                                      <input
                                        type="checkbox"
                                        checked={
                                          (tableConfig.addButton ||
                                            buildDefaultCreateAction(selectedFields))
                                            .enabled !== false
                                        }
                                        onChange={(e) =>
                                          updateTableAddButton({
                                            enabled: e.target.checked,
                                          })
                                        }
                                      />
                                      On
                                    </label>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                        Label
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          (tableConfig.addButton ||
                                            buildDefaultCreateAction(selectedFields))
                                            .label || ""
                                        }
                                        onChange={(e) =>
                                          updateTableAddButton({
                                            label: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                        Form button
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          (tableConfig.addButton ||
                                            buildDefaultCreateAction(selectedFields))
                                            .buttonName || ""
                                        }
                                        onChange={(e) =>
                                          updateTableAddButton({
                                            buttonName: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-3 rounded-lg border border-blue-100 bg-white p-3">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-semibold text-neutral-700">
                                        Add Form Fields
                                      </label>
                                      <button
                                        type="button"
                                        onClick={addAddButtonFormField}
                                        className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                      >
                                        + Add field
                                      </button>
                                    </div>
                                    {(currentAddButton.formFields || []).map(
                                      (field, fieldIndex) => (
                                        <div
                                          key={fieldIndex}
                                          className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3"
                                        >
                                          <div className="grid grid-cols-[1fr_160px_auto] gap-2">
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Form key
                                              </span>
                                              <input
                                                type="text"
                                                value={field.formKey}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    { formKey: e.target.value },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="form key"
                                              />
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Input type
                                              </span>
                                              <select
                                                value={field.type}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      type: e.target
                                                        .value as TableActionInputType,
                                                      formKeyType:
                                                        formKeyTypeForActionInput(
                                                          e.target
                                                            .value as TableActionInputType,
                                                          field.isMultiple,
                                                        ),
                                                      isNumberButtonsActive:
                                                        isActionNumberInput(
                                                          e.target.value,
                                                        )
                                                          ? field.isNumberButtonsActive
                                                          : false,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                              >
                                                {ACTION_INPUT_TYPES.map(
                                                  (inputType) => (
                                                    <option
                                                      key={inputType.value}
                                                      value={inputType.value}
                                                    >
                                                      {inputType.label}
                                                    </option>
                                                  ),
                                                )}
                                              </select>
                                            </label>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeAddButtonFormField(
                                                  fieldIndex,
                                                )
                                              }
                                              className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                            >
                                              <FiTrash2 size={14} />
                                            </button>
                                          </div>
                                          <div className="grid grid-cols-4 gap-2">
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Label
                                              </span>
                                              <input
                                                type="text"
                                                value={field.label || ""}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    { label: e.target.value },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="label"
                                              />
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Placeholder
                                              </span>
                                              <input
                                                type="text"
                                                value={field.placeholder || ""}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      placeholder:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="placeholder"
                                              />
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Disabled condition
                                              </span>
                                              <input
                                                type="text"
                                                value={
                                                  field.disabledCondition || ""
                                                }
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      disabledCondition:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="disabled condition"
                                              />
                                            </label>
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Required condition
                                              </span>
                                              <input
                                                type="text"
                                                value={
                                                  field.requiredCondition || ""
                                                }
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      requiredCondition:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="required condition"
                                              />
                                            </label>
                                          </div>
                                          <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3">
                                            <label className="flex items-center gap-2 text-xs text-neutral-700">
                                              <input
                                                type="checkbox"
                                                checked={!!field.required}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      required:
                                                        e.target.checked,
                                                    },
                                                  )
                                                }
                                              />
                                              Required
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-neutral-700">
                                              <input
                                                type="checkbox"
                                                checked={!!field.isDisabled}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      isDisabled:
                                                        e.target.checked,
                                                    },
                                                  )
                                                }
                                              />
                                              Disabled
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-neutral-700">
                                              <input
                                                type="checkbox"
                                                checked={!!field.isMultiple}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      isMultiple:
                                                        e.target.checked,
                                                      formKeyType:
                                                        formKeyTypeForActionInput(
                                                          field.type,
                                                          e.target.checked,
                                                        ),
                                                    },
                                                  )
                                                }
                                              />
                                              Multiple
                                            </label>
                                            {isActionNumberInput(field.type) && (
                                              <label className="flex items-center gap-2 text-xs text-neutral-700">
                                                <input
                                                  type="checkbox"
                                                  checked={
                                                    !!field.isNumberButtonsActive
                                                  }
                                                  onChange={(e) =>
                                                    updateAddButtonFormField(
                                                      fieldIndex,
                                                      {
                                                        isNumberButtonsActive:
                                                          e.target.checked,
                                                      },
                                                    )
                                                  }
                                                />
                                                Number buttons
                                              </label>
                                            )}
                                            <label className="space-y-1">
                                              <span className="text-xs font-medium text-neutral-600">
                                                Default value
                                              </span>
                                              <input
                                                type="text"
                                                value={String(
                                                  field.defaultValue ?? "",
                                                )}
                                                onChange={(e) =>
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      defaultValue:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="default value"
                                              />
                                            </label>
                                          </div>

                                          {isActionNumberInput(field.type) && (
                                            <div className="grid grid-cols-2 gap-2">
                                              <label className="space-y-1">
                                                <span className="text-xs font-medium text-neutral-600">
                                                  Min value
                                                </span>
                                                <input
                                                  type="number"
                                                  value={field.min ?? ""}
                                                  onChange={(e) =>
                                                    updateAddButtonFormField(
                                                      fieldIndex,
                                                      {
                                                        min: e.target.value
                                                          ? Number(
                                                              e.target.value,
                                                            )
                                                          : undefined,
                                                      },
                                                    )
                                                  }
                                                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  placeholder="min"
                                                />
                                              </label>
                                              <label className="space-y-1">
                                                <span className="text-xs font-medium text-neutral-600">
                                                  Max value
                                                </span>
                                                <input
                                                  type="number"
                                                  value={field.max ?? ""}
                                                  onChange={(e) =>
                                                    updateAddButtonFormField(
                                                      fieldIndex,
                                                      {
                                                        max: e.target.value
                                                          ? Number(
                                                              e.target.value,
                                                            )
                                                          : undefined,
                                                      },
                                                    )
                                                  }
                                                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  placeholder="max"
                                                />
                                              </label>
                                            </div>
                                          )}

                                          {field.type === "select" && (
                                            <div className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                              <div className="grid grid-cols-4 gap-2">
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Options source
                                                  </span>
                                                  <select
                                                    value={
                                                      field.optionsSource ||
                                                      "static"
                                                    }
                                                    onChange={(e) =>
                                                      updateAddButtonFormField(
                                                        fieldIndex,
                                                        {
                                                          optionsSource: e
                                                            .target
                                                            .value as TableActionOptionsSource,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  >
                                                    {ACTION_OPTIONS_SOURCES.map(
                                                      (source) => (
                                                        <option
                                                          key={source.value}
                                                          value={source.value}
                                                        >
                                                          {source.label}
                                                        </option>
                                                      ),
                                                    )}
                                                  </select>
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Source schema
                                                  </span>
                                                  <select
                                                    value={
                                                      field.sourceSchemaName || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateAddButtonFormField(
                                                        fieldIndex,
                                                        {
                                                          sourceSchemaName:
                                                            e.target.value,
                                                          sourceValueField: "_id",
                                                          sourceLabelField: "",
                                                        },
                                                      )
                                                    }
                                                    disabled={
                                                      field.optionsSource !==
                                                      "schema"
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                  >
                                                    <option value="">
                                                      Source schema...
                                                    </option>
                                                    {containers.map(
                                                      (container) => (
                                                        <option
                                                          key={
                                                            container.schemaName
                                                          }
                                                          value={
                                                            container.schemaName
                                                          }
                                                        >
                                                          {container.schemaName}
                                                        </option>
                                                      ),
                                                    )}
                                                  </select>
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Value field
                                                  </span>
                                                  <select
                                                    value={
                                                      field.sourceValueField ||
                                                      "_id"
                                                    }
                                                    onChange={(e) =>
                                                      updateAddButtonFormField(
                                                        fieldIndex,
                                                        {
                                                          sourceValueField:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    disabled={
                                                      field.optionsSource !==
                                                        "schema" ||
                                                      !field.sourceSchemaName
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                  >
                                                    <option value="_id">
                                                      _id
                                                    </option>
                                                    {(
                                                      containers.find(
                                                        (container) =>
                                                          container.schemaName ===
                                                          field.sourceSchemaName,
                                                      )?.fields || []
                                                    ).map((sourceField) => (
                                                      <option
                                                        key={sourceField.name}
                                                        value={sourceField.name}
                                                      >
                                                        {sourceField.name}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Label field
                                                  </span>
                                                  <select
                                                    value={
                                                      field.sourceLabelField || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateAddButtonFormField(
                                                        fieldIndex,
                                                        {
                                                          sourceLabelField:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    disabled={
                                                      field.optionsSource !==
                                                        "schema" ||
                                                      !field.sourceSchemaName
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                  >
                                                    <option value="">
                                                      Label field...
                                                    </option>
                                                    <option value="_id">
                                                      _id
                                                    </option>
                                                    {(
                                                      containers.find(
                                                        (container) =>
                                                          container.schemaName ===
                                                          field.sourceSchemaName,
                                                      )?.fields || []
                                                    ).map((sourceField) => (
                                                      <option
                                                        key={sourceField.name}
                                                        value={sourceField.name}
                                                      >
                                                        {sourceField.name}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </label>
                                              </div>
                                              <label className="space-y-1">
                                                <span className="text-xs font-medium text-neutral-600">
                                                  Option filter condition
                                                </span>
                                                <input
                                                  type="text"
                                                  value={
                                                    field.sourceFilterCondition ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    updateAddButtonFormField(
                                                      fieldIndex,
                                                      {
                                                        sourceFilterCondition:
                                                          e.target.value,
                                                      },
                                                    )
                                                  }
                                                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  placeholder="option filter condition"
                                                />
                                              </label>
                                              <SelectInput
                                                label="Invalidate keys"
                                                options={(
                                                  currentAddButton.formFields ||
                                                  []
                                                )
                                                  .filter(
                                                    (
                                                      candidate,
                                                      candidateIndex,
                                                    ) =>
                                                      candidateIndex !==
                                                        fieldIndex &&
                                                      candidate.formKey.trim(),
                                                  )
                                                  .map((candidate) => ({
                                                    value: candidate.formKey,
                                                    label:
                                                      candidate.label ||
                                                      candidate.formKey,
                                                  }))}
                                                value={(
                                                  field.invalidateKeys || []
                                                ).map((key) => {
                                                  const candidate = (
                                                    currentAddButton.formFields ||
                                                    []
                                                  ).find(
                                                    (formField) =>
                                                      formField.formKey === key,
                                                  );
                                                  return {
                                                    value: key,
                                                    label:
                                                      candidate?.label || key,
                                                  };
                                                })}
                                                onChange={(selectedOptions) => {
                                                  const selected = Array.isArray(
                                                    selectedOptions,
                                                  )
                                                    ? selectedOptions
                                                    : [];
                                                  updateAddButtonFormField(
                                                    fieldIndex,
                                                    {
                                                      invalidateKeys:
                                                        selected.map(
                                                          (
                                                            option: OptionType,
                                                          ) =>
                                                            String(
                                                              option.value,
                                                            ),
                                                        ),
                                                    },
                                                  );
                                                }}
                                                isMultiple
                                                isAutoFill={false}
                                                placeholder="Select fields to clear"
                                              />
                                              <label className="space-y-1">
                                                <span className="text-xs font-medium text-neutral-600">
                                                  Static options JSON
                                                </span>
                                                <textarea
                                                  value={
                                                    field.staticOptionsJson ||
                                                    "[]"
                                                  }
                                                  onChange={(e) =>
                                                    updateAddButtonFormField(
                                                      fieldIndex,
                                                      {
                                                        staticOptionsJson:
                                                          e.target.value,
                                                      },
                                                    )
                                                  }
                                                  className="min-h-20 w-full px-3 py-2 text-sm font-mono border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  placeholder='[{"value":"active","label":"Active"}]'
                                                />
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={addTableAction}
                                  className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                                >
                                  <FiPlus size={14} />
                                  Add action
                                </button>
                                {(tableConfig.actions || []).map(
                                  (action, actionIndex) => (
                                    <div
                                      key={action.id || actionIndex}
                                      className="space-y-4 border border-neutral-200 rounded-xl p-4"
                                    >
                                      <div className="grid grid-cols-[130px_1fr_160px_110px_110px_auto] gap-3">
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Kind
                                          </label>
                                          <select
                                            value={action.kind}
                                            onChange={(e) => {
                                              const kind = e.target
                                                .value as TableActionConfig["kind"];
                                              updateTableAction(actionIndex, {
                                                kind,
                                                label:
                                                  kind === "create"
                                                    ? "Add"
                                                    : kind === "edit"
                                                      ? "Edit"
                                                      : kind === "delete"
                                                        ? "Delete"
                                                        : action.label || "Action",
                                                buttonName:
                                                  kind === "create"
                                                    ? "Create"
                                                    : action.buttonName,
                                                icon:
                                                  kind === "create"
                                                    ? "FiPlus"
                                                    : kind === "edit"
                                                      ? "FiEdit"
                                                      : kind === "delete"
                                                        ? "HiOutlineTrash"
                                                        : action.icon ||
                                                          "MdTouchApp",
                                                modalType:
                                                  kind === "create" ||
                                                  kind === "edit"
                                                    ? "form"
                                                    : kind === "delete"
                                                      ? "confirm"
                                                      : action.modalType ||
                                                        "none",
                                              });
                                            }}
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          >
                                            {ACTION_KIND_OPTIONS.map((kind) => (
                                              <option
                                                key={kind.value}
                                                value={kind.value}
                                              >
                                                {kind.label}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Label
                                          </label>
                                          <input
                                            type="text"
                                            value={action.label || ""}
                                            onChange={(e) =>
                                              updateTableAction(actionIndex, {
                                                label: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Form button
                                          </label>
                                          <input
                                            type="text"
                                            value={action.buttonName || ""}
                                            onChange={(e) =>
                                              updateTableAction(actionIndex, {
                                                buttonName: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="Update"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Modal
                                          </label>
                                          <select
                                            value={action.modalType || "none"}
                                            onChange={(e) =>
                                              updateTableAction(actionIndex, {
                                                modalType: e.target
                                                  .value as TableActionModalType,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          >
                                            {ACTION_MODAL_TYPES.map((modal) => (
                                              <option
                                                key={modal.value}
                                                value={modal.value}
                                              >
                                                {modal.label}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Order
                                          </label>
                                          <input
                                            type="number"
                                            value={action.order ?? actionIndex + 1}
                                            onChange={(e) =>
                                              updateTableAction(actionIndex, {
                                                order: Number(e.target.value),
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          />
                                        </div>
                                        <div className="flex items-end gap-2">
                                          <label className="flex h-9 items-center gap-2 text-xs text-neutral-700">
                                            <input
                                              type="checkbox"
                                              checked={action.enabled !== false}
                                              onChange={(e) =>
                                                updateTableAction(actionIndex, {
                                                  enabled: e.target.checked,
                                                })
                                              }
                                            />
                                            On
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableAction(actionIndex)
                                            }
                                            className="h-9 rounded-lg bg-red-50 px-3 text-red-700 hover:bg-red-100"
                                          >
                                            <FiTrash2 size={14} />
                                          </button>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div>
                                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                            Icon
                                          </label>
                                          <div className="flex items-center gap-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700">
                                              {React.createElement(
                                                getIconByName(
                                                  action.icon || "MdTouchApp",
                                                ),
                                                { size: 16 },
                                              )}
                                            </div>
                                            <select
                                              value={action.icon || "MdTouchApp"}
                                              onChange={(e) =>
                                                updateTableAction(actionIndex, {
                                                  icon: e.target.value,
                                                })
                                              }
                                              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            >
                                              {ACTION_ICON_OPTIONS.map((icon) => (
                                                <option
                                                  key={icon.value}
                                                  value={icon.value}
                                                >
                                                  {icon.label}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-3 gap-3">
                                        <input
                                          type="text"
                                          value={action.disabledCondition || ""}
                                          onChange={(e) =>
                                            updateTableAction(actionIndex, {
                                              disabledCondition: e.target.value,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="Disabled condition"
                                        />
                                        <input
                                          type="text"
                                          value={action.hiddenCondition || ""}
                                          onChange={(e) =>
                                            updateTableAction(actionIndex, {
                                              hiddenCondition: e.target.value,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="Hidden condition"
                                        />
                                        <input
                                          type="text"
                                          value={action.requiredCondition || ""}
                                          onChange={(e) =>
                                            updateTableAction(actionIndex, {
                                              requiredCondition: e.target.value,
                                            })
                                          }
                                          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="Required condition"
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-3">
                                        <textarea
                                          value={
                                            action.constantValuesJson ||
                                            JSON.stringify(
                                              action.constantValues || {},
                                              null,
                                              2,
                                            )
                                          }
                                          onChange={(e) =>
                                            updateTableAction(actionIndex, {
                                              constantValuesJson: e.target.value,
                                              constantValues: undefined,
                                            })
                                          }
                                          className="min-h-24 px-3 py-2 text-sm font-mono border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder='{"status":"approved"}'
                                        />
                                        <div className="space-y-3">
                                          <select
                                            value={
                                              action.submit?.workflowSchema &&
                                              action.submit?.workflowName
                                                ? `${action.submit.workflowSchema}::${action.submit.workflowName}`
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const [workflowSchema, workflowName] =
                                                e.target.value.split("::");
                                              updateTableAction(actionIndex, {
                                                submit:
                                                  workflowSchema && workflowName
                                                    ? { workflowSchema, workflowName }
                                                    : undefined,
                                              });
                                            }}
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          >
                                            <option value="">Select workflow...</option>
                                            {projectWorkflowOptions.map(({ schemaName, workflow }) => (
                                              <option
                                                key={`${schemaName}::${workflow.name}`}
                                                value={`${schemaName}::${workflow.name}`}
                                              >
                                                {schemaName} / {workflow.name}
                                              </option>
                                            ))}
                                          </select>
                                          <input
                                            type="text"
                                            value={action.confirmText || ""}
                                            onChange={(e) =>
                                              updateTableAction(actionIndex, {
                                                confirmText: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="Confirm text"
                                          />
                                          <label className="flex items-center gap-2 text-xs text-neutral-700">
                                            <input
                                              type="checkbox"
                                              checked={!!action.isButton}
                                              onChange={(e) =>
                                                updateTableAction(actionIndex, {
                                                  isButton: e.target.checked,
                                                })
                                              }
                                            />
                                            Render as text button
                                          </label>
                                        </div>
                                      </div>

                                      <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-xs font-semibold text-neutral-700">
                                            Form Fields
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              addActionFormField(actionIndex)
                                            }
                                            className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                          >
                                            + Add field
                                          </button>
                                        </div>
                                        {(action.formFields || []).map(
                                          (field, fieldIndex) => (
                                            <div
                                              key={fieldIndex}
                                              className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3"
                                            >
                                              <div className="grid grid-cols-[1fr_160px_auto] gap-2">
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Form key
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={field.formKey}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        { formKey: e.target.value },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="form key"
                                                  />
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Input type
                                                  </span>
                                                  <select
                                                    value={field.type}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          type: e.target.value as TableActionInputType,
                                                          formKeyType:
                                                            formKeyTypeForActionInput(
                                                              e.target.value as TableActionInputType,
                                                              field.isMultiple,
                                                            ),
                                                          isNumberButtonsActive:
                                                            isActionNumberInput(
                                                              e.target.value,
                                                            )
                                                              ? field.isNumberButtonsActive
                                                              : false,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                  >
                                                    {ACTION_INPUT_TYPES.map(
                                                      (inputType) => (
                                                        <option
                                                          key={inputType.value}
                                                          value={inputType.value}
                                                        >
                                                          {inputType.label}
                                                        </option>
                                                      ),
                                                    )}
                                                  </select>
                                                </label>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeActionFormField(
                                                      actionIndex,
                                                      fieldIndex,
                                                    )
                                                  }
                                                  className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                                >
                                                  <FiTrash2 size={14} />
                                                </button>
                                              </div>
                                              <div className="grid grid-cols-4 gap-2">
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Label
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={field.label || ""}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        { label: e.target.value },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="label"
                                                  />
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Placeholder
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={field.placeholder || ""}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          placeholder:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="placeholder"
                                                  />
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Disabled condition
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={
                                                      field.disabledCondition || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          disabledCondition:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="disabled condition"
                                                  />
                                                </label>
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Required condition
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={
                                                      field.requiredCondition || ""
                                                    }
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          requiredCondition:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="required condition"
                                                  />
                                                </label>
                                              </div>
                                              <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3">
                                                <label className="flex items-center gap-2 text-xs text-neutral-700">
                                                  <input
                                                    type="checkbox"
                                                    checked={!!field.required}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          required:
                                                            e.target.checked,
                                                        },
                                                      )
                                                    }
                                                  />
                                                  Required
                                                </label>
                                                <label className="flex items-center gap-2 text-xs text-neutral-700">
                                                  <input
                                                    type="checkbox"
                                                    checked={!!field.isDisabled}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          isDisabled:
                                                            e.target.checked,
                                                        },
                                                      )
                                                    }
                                                  />
                                                  Disabled
                                                </label>
                                                <label className="flex items-center gap-2 text-xs text-neutral-700">
                                                  <input
                                                    type="checkbox"
                                                    checked={!!field.isMultiple}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          isMultiple:
                                                            e.target.checked,
                                                          formKeyType:
                                                            formKeyTypeForActionInput(
                                                              field.type,
                                                              e.target.checked,
                                                            ),
                                                        },
                                                      )
                                                    }
                                                  />
                                                  Multiple
                                                </label>
                                                {isActionNumberInput(field.type) && (
                                                  <label className="flex items-center gap-2 text-xs text-neutral-700">
                                                    <input
                                                      type="checkbox"
                                                      checked={
                                                        !!field.isNumberButtonsActive
                                                      }
                                                      onChange={(e) =>
                                                        updateActionFormField(
                                                          actionIndex,
                                                          fieldIndex,
                                                          {
                                                            isNumberButtonsActive:
                                                              e.target.checked,
                                                          },
                                                        )
                                                      }
                                                    />
                                                    Number buttons
                                                  </label>
                                                )}
                                                <label className="space-y-1">
                                                  <span className="text-xs font-medium text-neutral-600">
                                                    Default value
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={String(
                                                      field.defaultValue ?? "",
                                                    )}
                                                    onChange={(e) =>
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          defaultValue:
                                                            e.target.value,
                                                        },
                                                      )
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                    placeholder="default value"
                                                  />
                                                </label>
                                              </div>

                                              {isActionNumberInput(field.type) && (
                                                <div className="grid grid-cols-2 gap-2">
                                                  <label className="space-y-1">
                                                    <span className="text-xs font-medium text-neutral-600">
                                                      Min value
                                                    </span>
                                                    <input
                                                      type="number"
                                                      value={field.min ?? ""}
                                                      onChange={(e) =>
                                                        updateActionFormField(
                                                          actionIndex,
                                                          fieldIndex,
                                                          {
                                                            min: e.target.value
                                                              ? Number(
                                                                  e.target.value,
                                                                )
                                                              : undefined,
                                                          },
                                                        )
                                                      }
                                                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                      placeholder="min"
                                                    />
                                                  </label>
                                                  <label className="space-y-1">
                                                    <span className="text-xs font-medium text-neutral-600">
                                                      Max value
                                                    </span>
                                                    <input
                                                      type="number"
                                                      value={field.max ?? ""}
                                                      onChange={(e) =>
                                                        updateActionFormField(
                                                          actionIndex,
                                                          fieldIndex,
                                                          {
                                                            max: e.target.value
                                                              ? Number(
                                                                  e.target.value,
                                                                )
                                                              : undefined,
                                                          },
                                                        )
                                                      }
                                                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                      placeholder="max"
                                                    />
                                                  </label>
                                                </div>
                                              )}

                                              {field.type === "select" && (
                                                <div className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                                  <div className="grid grid-cols-4 gap-2">
                                                    <label className="space-y-1">
                                                      <span className="text-xs font-medium text-neutral-600">
                                                        Options source
                                                      </span>
                                                      <select
                                                        value={
                                                          field.optionsSource ||
                                                          "static"
                                                        }
                                                        onChange={(e) =>
                                                          updateActionFormField(
                                                            actionIndex,
                                                            fieldIndex,
                                                            {
                                                              optionsSource: e
                                                                .target
                                                                .value as TableActionOptionsSource,
                                                            },
                                                          )
                                                        }
                                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                      >
                                                        {ACTION_OPTIONS_SOURCES.map(
                                                          (source) => (
                                                            <option
                                                              key={source.value}
                                                              value={source.value}
                                                            >
                                                              {source.label}
                                                            </option>
                                                          ),
                                                        )}
                                                      </select>
                                                    </label>
                                                    <label className="space-y-1">
                                                      <span className="text-xs font-medium text-neutral-600">
                                                        Source schema
                                                      </span>
                                                      <select
                                                        value={field.sourceSchemaName || ""}
                                                        onChange={(e) =>
                                                          updateActionFormField(
                                                            actionIndex,
                                                            fieldIndex,
                                                            {
                                                              sourceSchemaName: e.target.value,
                                                              sourceValueField: "_id",
                                                              sourceLabelField: "",
                                                            },
                                                          )
                                                        }
                                                        disabled={field.optionsSource !== "schema"}
                                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                      >
                                                        <option value="">Source schema...</option>
                                                        {containers.map((container) => (
                                                          <option
                                                            key={container.schemaName}
                                                            value={container.schemaName}
                                                          >
                                                            {container.schemaName}
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </label>
                                                    <label className="space-y-1">
                                                      <span className="text-xs font-medium text-neutral-600">
                                                        Value field
                                                      </span>
                                                      <select
                                                        value={field.sourceValueField || "_id"}
                                                        onChange={(e) =>
                                                          updateActionFormField(
                                                            actionIndex,
                                                            fieldIndex,
                                                            {
                                                              sourceValueField: e.target.value,
                                                            },
                                                          )
                                                        }
                                                        disabled={field.optionsSource !== "schema" || !field.sourceSchemaName}
                                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                      >
                                                        <option value="_id">_id</option>
                                                        {(containers.find((container) => container.schemaName === field.sourceSchemaName)?.fields || []).map((sourceField) => (
                                                          <option key={sourceField.name} value={sourceField.name}>
                                                            {sourceField.name}
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </label>
                                                    <label className="space-y-1">
                                                      <span className="text-xs font-medium text-neutral-600">
                                                        Label field
                                                      </span>
                                                      <select
                                                        value={field.sourceLabelField || ""}
                                                        onChange={(e) =>
                                                          updateActionFormField(
                                                            actionIndex,
                                                            fieldIndex,
                                                            {
                                                              sourceLabelField: e.target.value,
                                                            },
                                                          )
                                                        }
                                                        disabled={field.optionsSource !== "schema" || !field.sourceSchemaName}
                                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-neutral-100"
                                                      >
                                                        <option value="">Label field...</option>
                                                        <option value="_id">_id</option>
                                                        {(containers.find((container) => container.schemaName === field.sourceSchemaName)?.fields || []).map((sourceField) => (
                                                          <option key={sourceField.name} value={sourceField.name}>
                                                            {sourceField.name}
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </label>
                                                  </div>
                                                  <label className="space-y-1">
                                                    <span className="text-xs font-medium text-neutral-600">
                                                      Option filter condition
                                                    </span>
                                                    <input
                                                      type="text"
                                                      value={
                                                        field.sourceFilterCondition ||
                                                        ""
                                                      }
                                                      onChange={(e) =>
                                                        updateActionFormField(
                                                          actionIndex,
                                                          fieldIndex,
                                                          {
                                                            sourceFilterCondition:
                                                              e.target.value,
                                                          },
                                                        )
                                                      }
                                                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                      placeholder="option filter condition"
                                                    />
                                                  </label>
                                                  <SelectInput
                                                    label="Invalidate keys"
                                                    options={(action.formFields || [])
                                                      .filter((candidate, candidateIndex) =>
                                                        candidateIndex !== fieldIndex && candidate.formKey.trim(),
                                                      )
                                                      .map((candidate) => ({
                                                        value: candidate.formKey,
                                                        label: candidate.label || candidate.formKey,
                                                      }))}
                                                    value={(field.invalidateKeys || []).map((key) => {
                                                      const candidate = (action.formFields || []).find(
                                                        (formField) => formField.formKey === key,
                                                      );
                                                      return {
                                                        value: key,
                                                        label: candidate?.label || key,
                                                      };
                                                    })}
                                                    onChange={(selectedOptions) => {
                                                      const selected = Array.isArray(selectedOptions)
                                                        ? selectedOptions
                                                        : [];
                                                      updateActionFormField(
                                                        actionIndex,
                                                        fieldIndex,
                                                        {
                                                          invalidateKeys: selected.map((option: OptionType) =>
                                                            String(option.value),
                                                          ),
                                                        },
                                                      );
                                                    }}
                                                    isMultiple
                                                    isAutoFill={false}
                                                    placeholder="Select fields to clear"
                                                  />
                                                  <label className="space-y-1">
                                                    <span className="text-xs font-medium text-neutral-600">
                                                      Static options JSON
                                                    </span>
                                                    <textarea
                                                      value={
                                                        field.staticOptionsJson ||
                                                        "[]"
                                                      }
                                                      onChange={(e) =>
                                                        updateActionFormField(
                                                          actionIndex,
                                                          fieldIndex,
                                                          {
                                                            staticOptionsJson:
                                                              e.target.value,
                                                          },
                                                        )
                                                      }
                                                      className="min-h-20 w-full px-3 py-2 text-sm font-mono border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                      placeholder='[{"value":"active","label":"Active"}]'
                                                    />
                                                  </label>
                                                </div>
                                              )}
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <label className="text-xs font-semibold text-neutral-700">
                                            Field Overrides
                                          </label>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              addActionFieldOverride(actionIndex)
                                            }
                                            className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                          >
                                            + Add override
                                          </button>
                                        </div>
                                        {(action.fieldOverrides || []).map(
                                          (override, overrideIndex) => (
                                            <div
                                              key={overrideIndex}
                                              className="grid grid-cols-[1fr_auto_1fr_auto] gap-2"
                                            >
                                              <input
                                                type="text"
                                                value={override.field}
                                                onChange={(e) =>
                                                  updateActionFieldOverride(
                                                    actionIndex,
                                                    overrideIndex,
                                                    { field: e.target.value },
                                                  )
                                                }
                                                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="field"
                                              />
                                              <label className="flex items-center gap-2 px-2 text-xs text-neutral-700">
                                                <input
                                                  type="checkbox"
                                                  checked={!!override.required}
                                                  onChange={(e) =>
                                                    updateActionFieldOverride(
                                                      actionIndex,
                                                      overrideIndex,
                                                      {
                                                        required:
                                                          e.target.checked,
                                                      },
                                                    )
                                                  }
                                                />
                                                Required
                                              </label>
                                              <input
                                                type="text"
                                                value={
                                                  override.disabledCondition ||
                                                  ""
                                                }
                                                onChange={(e) =>
                                                  updateActionFieldOverride(
                                                    actionIndex,
                                                    overrideIndex,
                                                    {
                                                      disabledCondition:
                                                        e.target.value,
                                                    },
                                                  )
                                                }
                                                className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                                placeholder="disabled condition"
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeActionFieldOverride(
                                                    actionIndex,
                                                    overrideIndex,
                                                  )
                                                }
                                                className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                              >
                                                <FiTrash2 size={14} />
                                              </button>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pipeline Name (for charts) */}
                {(CHART_TYPES.find((c) => c.value === componentType) ||
                  (componentType === "table" &&
                    tableSourceType !== "schema") ||
                  (componentType === "infoBlocks" &&
                    infoBlocksSource !== "static") ||
                  (componentType === "distributionBlocks" &&
                    distributionBlocksSource !== "static")) && (
                  <>
                    {CHART_TYPES.find((c) => c.value === componentType) && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Pipeline Name
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="text"
                          value={pipelineName}
                          onChange={(e) => setPipelineName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="Enter pipeline name"
                        />
                      </div>
                    )}

                    {/* Pipeline Params */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Source Parameters (JSON)
                      </label>
                      <textarea
                        value={params}
                        onChange={(e) => setParams(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                        placeholder='{"key": "value", "filter": "active"}'
                        rows={4}
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        Optional parameters to pass to the pipeline (JSON
                        format)
                      </p>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Tab Panel Configuration */}
            {componentType === "tabPanel" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-700">
                    Tabs Configuration
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={addTab}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-medium rounded-lg hover:bg-violet-600 active:scale-95 transition-all shadow-sm"
                    >
                      <FiPlus size={14} strokeWidth={2.5} />
                      <span>Add Tab</span>
                    </button>
                    <button
                      onClick={openTabExcelUpload}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 active:scale-95 transition-all shadow-sm"
                      title="Upload Excel as new tab with table"
                    >
                      <FiUpload size={14} strokeWidth={2.5} />
                      <span>Excel</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">
                        Group By
                      </label>
                      <p className="text-xs text-neutral-500 mt-1">
                        Optional. Uses the first table tab as the template for dynamic tabs.
                      </p>
                    </div>
                    {(groupBy.groupedSchemaName ||
                      groupBy.groupedField ||
                      groupBy.sourceSchemaName ||
                      groupBy.groupByObjectId ||
                      (groupBy.sourceValueField &&
                        groupBy.sourceValueField !== "_id") ||
                      groupBy.sourceLabelField ||
                      groupBy.groupByField ||
                      groupBy.filterField) && (
                      <button
                        type="button"
                        onClick={() => setGroupBy(EMPTY_GROUP_BY)}
                        className="px-2.5 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Grouped schema
                      </label>
                      <select
                        value={
                          groupBy.groupedSchemaName ||
                          groupByTemplateSchemaName ||
                          ""
                        }
                        onChange={(e) => {
                          setSchemaName(e.target.value);
                          resetTableColumnsForSchema(e.target.value);
                          setGroupBy((current) => ({
                            ...current,
                            groupedSchemaName: e.target.value,
                            groupedField: "",
                            groupByObjectId: "",
                            filterField: "",
                          }));
                        }}
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select grouped schema...</option>
                        {schemas.map((schema) => (
                          <option key={schema} value={schema}>
                            {schema}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Grouped field
                      </label>
                      <select
                        value={
                          groupBy.groupedField ||
                          groupBy.filterField ||
                          groupBy.groupByObjectId ||
                          ""
                        }
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            groupedField: e.target.value,
                            filterField: e.target.value,
                            groupByObjectId: e.target.value,
                          }))
                        }
                        disabled={
                          !(
                            groupBy.groupedSchemaName ||
                            groupByTemplateSchemaName
                          )
                        }
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white disabled:bg-neutral-100 disabled:text-neutral-400"
                      >
                        <option value="">Select grouped field...</option>
                        {(groupBy.groupedField ||
                          groupBy.filterField ||
                          groupBy.groupByObjectId) &&
                          !groupByGroupedFields.some(
                            (field) =>
                              field.name ===
                              (groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId),
                          ) && (
                            <option
                              value={
                                groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId
                              }
                            >
                              {groupBy.groupedField ||
                                groupBy.filterField ||
                                groupBy.groupByObjectId}
                            </option>
                          )}
                        {groupByGroupedFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Source schema
                      </label>
                      <select
                        value={groupBy.sourceSchemaName || ""}
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceSchemaName: e.target.value,
                            sourceValueField: "_id",
                            sourceLabelField: "",
                            groupByField: "",
                          }))
                        }
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select source schema...</option>
                        {schemas.map((schema) => (
                          <option key={schema} value={schema}>
                            {schema}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Source value field
                      </label>
                      <select
                        value={groupBy.sourceValueField || "_id"}
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceValueField: e.target.value,
                          }))
                        }
                        disabled={!groupBy.sourceSchemaName}
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white disabled:bg-neutral-100 disabled:text-neutral-400"
                      >
                        {groupByValueFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Source label field
                      </label>
                      <select
                        value={groupBy.sourceLabelField || groupBy.groupByField || ""}
                        onChange={(e) =>
                          setGroupBy((current) => ({
                            ...current,
                            sourceLabelField: e.target.value,
                            groupByField: e.target.value,
                          }))
                        }
                        disabled={!groupBy.sourceSchemaName}
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white disabled:bg-neutral-100 disabled:text-neutral-400"
                      >
                        <option value="">Select label field...</option>
                        {groupByLabelFields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.frontend?.displayName || field.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {tabs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-xl">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <MdTab className="text-neutral-400" size={24} />
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">No tabs yet</p>
                    <button
                      onClick={addTab}
                      className="text-sm text-neutral-900 font-medium hover:underline"
                    >
                      Add your first tab
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className="border border-neutral-200 rounded-xl p-4 space-y-3 bg-neutral-50/50"
                      >
                        {/* Tab Title */}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-violet-100 rounded-md">
                            <MdTab className="text-violet-600" size={16} />
                          </div>
                          <input
                            type="text"
                            value={tab.title}
                            onChange={(e) => {
                              const updated = [...tabs];
                              updated[index].title = e.target.value;
                              setTabs(updated);
                            }}
                            className="flex-1 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="Tab title"
                          />
                          <button
                            onClick={() => removeTab(index)}
                            className="p-1.5 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Remove tab"
                          >
                            <FiTrash2 size={14} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Tables in Tab */}
                        <div className="space-y-2">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                addTableToTab(index, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                          >
                            <option value="">+ Add table to this tab...</option>
                            {schemas.map((schema) => (
                              <option key={schema} value={schema}>
                                {schema}
                              </option>
                            ))}
                          </select>

                          {tab.components.length > 0 && (
                            <div className="space-y-1.5">
                              {tab.components.map((comp) => (
                                <div
                                  key={comp.id}
                                  className="flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <MdTableChart
                                      className="text-blue-600"
                                      size={16}
                                    />
                                    <span className="text-neutral-700 font-medium">
                                      {comp.dataBinding?.schemaName}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeTableFromTab(index, comp.id)
                                    }
                                    className="p-1 text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
                                    title="Remove table"
                                  >
                                    <FiTrash2 size={13} strokeWidth={2} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-neutral-200 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={
              (componentType !== "tabPanel" &&
                componentType !== "infoBlocks" &&
                componentType !== "distributionBlocks" &&
                !schemaName) ||
              (componentType === "table" &&
                tableSourceType === "pipeline" &&
                !pipelineName) ||
              (componentType === "table" &&
                tableSourceType === "workflow" &&
                !workflowName) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource !== "static" &&
                !schemaName) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource === "pipeline" &&
                !pipelineName) ||
              (componentType === "infoBlocks" &&
                infoBlocksSource === "workflow" &&
                !workflowName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource !== "static" &&
                !schemaName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource === "pipeline" &&
                !pipelineName) ||
              (componentType === "distributionBlocks" &&
                distributionBlocksSource === "workflow" &&
                !workflowName)
            }
            className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-600 flex items-center gap-2"
          >
            {editingComponent ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FiPlus size={16} strokeWidth={2.5} />
                <span>Add Component</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Excel Upload Modal for Tabs */}
      <CellExcelUploadModal
        isOpen={showTabExcelModal}
        onClose={() => setShowTabExcelModal(false)}
        onSuccess={handleTabExcelUploadSuccess}
        mode="tab"
      />
    </div>
  );
};
