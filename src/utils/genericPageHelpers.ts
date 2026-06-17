// Shared helper functions for GenericPaginatedPage and GenericUnpaginatedPage
import {
  FormKeyTypeEnum,
  InputTypes,
} from "../components/panelComponents/shared/types";
import { TableActionConfig } from "../types/page";
import { ContainerModel, Field, Frontend, Types } from "./api/container";

type GenericItem = Record<string, unknown> & { _id: string };
type ComparableValue = string | number | boolean | null | undefined;
type RowClassRule = {
  condition?: string;
  className?: string;
  Condition?: string;
  ClassName?: string;
};
type ActionFormFieldConfig = NonNullable<TableActionConfig["formFields"]>[number];
type RawActionFormFieldConfig = Partial<ActionFormFieldConfig> & {
  FormKey?: string;
  Type?: ActionFormFieldConfig["type"];
  FormKeyType?: ActionFormFieldConfig["formKeyType"];
  Label?: string;
  Placeholder?: string;
  Required?: boolean;
  RequiredCondition?: string;
  DisabledCondition?: string;
  IsDisabled?: boolean;
  IsMultiple?: boolean;
  IsNumberButtonsActive?: boolean;
  OptionsSource?: ActionFormFieldConfig["optionsSource"];
  StaticOptions?: ActionFormFieldConfig["staticOptions"];
  StaticOptionsJson?: string;
  SourceSchemaName?: string;
  SourceValueField?: string;
  SourceLabelField?: string;
  SourceFilterCondition?: string;
  InvalidateKeys?: string[];
  DefaultValue?: ActionFormFieldConfig["defaultValue"];
  Min?: number;
  Max?: number;
  MinLength?: number;
  MaxLength?: number;
  Pattern?: string;
  ValidationMessage?: string;
};
type RawActionConfig = Partial<TableActionConfig> & {
  ID?: string;
  Kind?: TableActionConfig["kind"];
  Label?: string;
  ButtonName?: string;
  Icon?: string;
  Order?: number;
  Enabled?: boolean;
  ModalType?: TableActionConfig["modalType"];
  FormFields?: RawActionFormFieldConfig[];
  Fields?: string[];
  ExcludeFields?: string[];
  FieldOverrides?: TableActionConfig["fieldOverrides"];
  ConstantValues?: Record<string, unknown>;
  ConstantValuesJson?: string;
  DisabledCondition?: string;
  HiddenCondition?: string;
  RequiredCondition?: string;
  ConfirmTitle?: string;
  ConfirmText?: string;
  LinkTemplate?: string;
  LinkType?: TableActionConfig["linkType"];
  ClassName?: string;
  ButtonClassName?: string;
  IsButton?: boolean;
};

const toComparableValue = (value: unknown): ComparableValue => {
  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record._id !== undefined) return String(record._id);
    if (record.id !== undefined) return String(record.id);
  }

  return String(value);
};

const compareValues = (
  left: ComparableValue,
  right: ComparableValue,
  operator: ">=" | "<=" | ">" | "<",
) => {
  if (
    left === null ||
    left === undefined ||
    right === null ||
    right === undefined
  ) {
    return false;
  }

  switch (operator) {
    case ">=":
      return left >= right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case "<":
      return left < right;
  }
};

export type RawPopulationSettings = {
  fieldName?: string;
  FieldName?: string;
  populatedFields?: string[];
  PopulatedFields?: string[];
  displayFields?: string[];
  DisplayFields?: string[];
  inputSelectionField?: string;
  InputSelectionField?: string;
  displayLabel?: string;
  DisplayLabel?: string;
};

export type RawField = {
  name?: string;
  Name?: string;
  type?: string;
  Type?: string;
  tag?: string;
  Tag?: string;
  objectSchemaName?: string;
  ObjectSchemaName?: string;
  enumList?: (string | number)[];
  EnumList?: (string | number)[];
  isForceDelete?: boolean;
  IsForceDelete?: boolean;
  unique?: boolean;
  Unique?: boolean;
  isHashed?: boolean;
  IsHashed?: boolean;
  isLoginCredential?: boolean;
  IsLoginCredential?: boolean;
  isSearchable?: boolean;
  IsSearchable?: boolean;
  children?: RawField[];
  Children?: RawField[];
  authorizeRole?: string[];
  AuthorizeRole?: string[];
  isAuthorized?: boolean;
  IsAuthorized?: boolean;
  frontend?: {
    displayName?: string;
    rowClassName?: {
      condition: string;
      className: string;
    }[];
    rowKeyClassName?: {
      condition: string;
      className: string;
    }[];
    invalidateKeys?: string[];
    linkTemplate?: string;
    linkLabelField?: string;
    linkType?: string;
    actions?: RawActionConfig[];
  };
  Frontend?: {
    DisplayName?: string;
    RowClassName?: {
      Condition: string;
      ClassName: string;
    }[];
    RowKeyClassName?: {
      Condition: string;
      ClassName: string;
    }[];
    invalidateKeys?: string[];
    linkTemplate?: string;
    linkLabelField?: string;
    linkType?: string;
    Actions?: RawActionConfig[];
  };
  populationSettings?: RawPopulationSettings;
  PopulationSettings?: RawPopulationSettings;
  equation?: string;

  Equation?: string;
};

export type RawContainer = {
  _id?: string;
  ID?: string;
  schemaName?: string;
  SchemaName?: string;
  fields?: RawField[];
  Fields?: RawField[];
  routes?: unknown;
  Routes?: unknown;
  redis?: unknown;
  Redis?: unknown;
  pipelines?: unknown[];
  Pipelines?: unknown[];
  workflows?: unknown[];
  Workflows?: unknown[];
  dynamicFunctions?: unknown[];
  DynamicFunctions?: unknown[];
  dynamicApis?: unknown[];
  DynamicApis?: unknown[];
  isAuthContainer?: boolean;
  IsAuthContainer?: boolean;
  isRegisterActive?: boolean;
  IsRegisterActive?: boolean;
  populationArray?: unknown[];
  PopulationArray?: unknown[];
  populatedRoutes?: string[];
  PopulatedRoutes?: string[];
  frontend?: {
    displayName?: string;
    rowClassName?: {
      condition: string;
      className: string;
    }[];
    invalidateKeys?: string[];
    actions?: RawActionConfig[];
  };
  Frontend?: {
    DisplayName?: string;
    RowClassName?: {
      Condition: string;
      ClassName: string;
    }[];
    invalidateKeys?: string[];
    Actions?: RawActionConfig[];
  };
};

const normalizeActionFormFieldConfig = (
  field: RawActionFormFieldConfig,
): ActionFormFieldConfig => ({
  formKey: field.formKey ?? field.FormKey ?? "",
  type: (field.type ?? field.Type ?? "text") as ActionFormFieldConfig["type"],
  formKeyType: field.formKeyType ?? field.FormKeyType,
  label: field.label ?? field.Label,
  placeholder: field.placeholder ?? field.Placeholder,
  required: field.required ?? field.Required,
  requiredCondition: field.requiredCondition ?? field.RequiredCondition,
  disabledCondition: field.disabledCondition ?? field.DisabledCondition,
  isDisabled: field.isDisabled ?? field.IsDisabled,
  isMultiple: field.isMultiple ?? field.IsMultiple,
  isNumberButtonsActive:
    field.isNumberButtonsActive ?? field.IsNumberButtonsActive,
  optionsSource: field.optionsSource ?? field.OptionsSource,
  staticOptions: field.staticOptions ?? field.StaticOptions,
  staticOptionsJson: field.staticOptionsJson ?? field.StaticOptionsJson,
  sourceSchemaName: field.sourceSchemaName ?? field.SourceSchemaName,
  sourceValueField: field.sourceValueField ?? field.SourceValueField,
  sourceLabelField: field.sourceLabelField ?? field.SourceLabelField,
  sourceFilterCondition:
    field.sourceFilterCondition ?? field.SourceFilterCondition,
  invalidateKeys: field.invalidateKeys ?? field.InvalidateKeys,
  defaultValue: field.defaultValue ?? field.DefaultValue,
  min: field.min ?? field.Min,
  max: field.max ?? field.Max,
  minLength: field.minLength ?? field.MinLength,
  maxLength: field.maxLength ?? field.MaxLength,
  pattern: field.pattern ?? field.Pattern,
  validationMessage: field.validationMessage ?? field.ValidationMessage,
});

const normalizeActionFormFields = (
  fields: RawActionFormFieldConfig[] | undefined,
): TableActionConfig["formFields"] | undefined =>
  fields?.map(normalizeActionFormFieldConfig);

const normalizeActionConfig = (
  action: RawActionConfig,
): TableActionConfig => ({
  id: action.id ?? action.ID,
  kind: (action.kind ?? action.Kind ?? "update") as TableActionConfig["kind"],
  label: action.label ?? action.Label,
  buttonName: action.buttonName ?? action.ButtonName,
  icon: action.icon ?? action.Icon,
  order: action.order ?? action.Order,
  enabled: action.enabled ?? action.Enabled,
  modalType: action.modalType ?? action.ModalType,
  formFields:
    normalizeActionFormFields(action.formFields as RawActionFormFieldConfig[]) ??
    normalizeActionFormFields(action.FormFields),
  fields: action.fields ?? action.Fields,
  excludeFields: action.excludeFields ?? action.ExcludeFields,
  fieldOverrides: action.fieldOverrides ?? action.FieldOverrides,
  constantValues: action.constantValues ?? action.ConstantValues,
  constantValuesJson: action.constantValuesJson ?? action.ConstantValuesJson,
  disabledCondition: action.disabledCondition ?? action.DisabledCondition,
  hiddenCondition: action.hiddenCondition ?? action.HiddenCondition,
  requiredCondition: action.requiredCondition ?? action.RequiredCondition,
  confirmTitle: action.confirmTitle ?? action.ConfirmTitle,
  confirmText: action.confirmText ?? action.ConfirmText,
  linkTemplate: action.linkTemplate ?? action.LinkTemplate,
  linkType: action.linkType ?? action.LinkType,
  className: action.className ?? action.ClassName,
  buttonClassName: action.buttonClassName ?? action.ButtonClassName,
  isButton: action.isButton ?? action.IsButton,
});

/**
 * Humanize a string by converting camelCase/snake_case to Title Case
 */
export const humanize = (key: string) =>
  key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

/**
 * Get display label for a field - uses Frontend.DisplayName if available, otherwise humanizes the field name
 */
export const getFieldLabel = (field: Field): string => {
  return field.frontend?.displayName || humanize(field.name);
};

/**
 * Normalize a field from raw API response to standard Field type
 */
export const normalizeField = (f: RawField): Field => {
  const rawPopSettings = f.populationSettings ?? f.PopulationSettings;
  return {
    name: f.name ?? f.Name ?? "",
    type: f.type ?? f.Type ?? "",
    tag: f.tag ?? f.Tag,
    objectSchemaName: f.objectSchemaName ?? f.ObjectSchemaName,
    enumList: f.enumList ?? f.EnumList,
    isForceDelete: f.isForceDelete ?? f.IsForceDelete,
    unique: f.unique ?? f.Unique,
    isHashed: f.isHashed ?? f.IsHashed,
    isLoginCredential: f.isLoginCredential ?? f.IsLoginCredential,
    isSearchable: f.isSearchable ?? f.IsSearchable,
    children: (f.children ?? f.Children ?? [])?.map((c: RawField) =>
      normalizeField(c)
    ),
    frontend:
      f.frontend
        ? ({
            ...f.frontend,
            linkType: f.frontend.linkType as Frontend["linkType"],
            actions: (f.frontend.actions || []).map(normalizeActionConfig),
          } as Frontend)
        : f.Frontend
          ? ({
              displayName: f.Frontend.DisplayName,
              rowClassName: f.Frontend.RowClassName?.map((rc) => ({
                condition: rc.Condition,
                className: rc.ClassName,
              })),
              rowKeyClassName: f.Frontend.RowKeyClassName?.map((rc) => ({
                condition: rc.Condition,
                className: rc.ClassName,
              })),
              invalidateKeys: f.Frontend.invalidateKeys || [],
              linkTemplate: f.Frontend.linkTemplate,
              linkLabelField: f.Frontend.linkLabelField,
              linkType: f.Frontend.linkType as
                | "external"
                | "internal"
                | "email"
                | "phone"
                | "file"
                | undefined,
              actions: (f.Frontend.Actions || []).map(normalizeActionConfig),
            } as Frontend)
          : undefined,
    populationSettings: rawPopSettings
      ? {
          fieldName: rawPopSettings.fieldName ?? rawPopSettings.FieldName ?? "",
          populatedFields:
            rawPopSettings.populatedFields ??
            rawPopSettings.PopulatedFields ??
            [],
          displayFields:
            rawPopSettings.displayFields ?? rawPopSettings.DisplayFields ?? [],
          inputSelectionField:
            rawPopSettings.inputSelectionField ??
            rawPopSettings.InputSelectionField ??
            "",
          displayLabel:
            rawPopSettings.displayLabel ?? rawPopSettings.DisplayLabel ?? "",
        }
      : undefined,
    equation: f.equation ?? f.Equation,
    authorizeRole: f.authorizeRole ?? f.AuthorizeRole,
    isAuthorized: f.isAuthorized ?? f.IsAuthorized,
  };
};

/**
 * Normalize a container from raw API response to standard ContainerModel type
 */
export const normalizeContainer = (c: RawContainer): ContainerModel => ({
  id: c._id ?? c.ID ?? "", // Add required id field
  _id: c._id ?? c.ID,
  schemaName: c.schemaName ?? c.SchemaName ?? "",
  fields: (c.fields ?? c.Fields ?? []).map((f: RawField) => normalizeField(f)),
  routes:
    (c.routes as ContainerModel["routes"]) ??
    (c.Routes as ContainerModel["routes"]),
  redis:
    (c.redis as ContainerModel["redis"]) ??
    (c.Redis as ContainerModel["redis"]),
  pipelines: (c.pipelines ?? c.Pipelines ?? []) as ContainerModel["pipelines"],
  workflows: (c.workflows ?? c.Workflows ?? []) as ContainerModel["workflows"],
  dynamicFunctions: (c.dynamicFunctions ??
    c.DynamicFunctions ??
    []) as ContainerModel["dynamicFunctions"],
  dynamicApis: (c.dynamicApis ??
    c.DynamicApis ??
    []) as ContainerModel["dynamicApis"],
  isAuthContainer: c.isAuthContainer ?? c.IsAuthContainer ?? false,
  isRegisterActive: c.isRegisterActive ?? c.IsRegisterActive ?? false,
  populationArray: (c.populationArray ??
    c.PopulationArray ??
    []) as ContainerModel["populationArray"],
  populatedRoutes: c.populatedRoutes ?? c.PopulatedRoutes ?? [],
  frontend:
    c.frontend
      ? ({
          ...c.frontend,
          actions: (c.frontend.actions || []).map(normalizeActionConfig),
        } as Frontend)
      : c.Frontend
        ? ({
            displayName: c.Frontend.DisplayName,
            rowClassName: c.Frontend.RowClassName?.map((rc) => ({
              condition: rc.Condition,
              className: rc.ClassName,
            })),
            invalidateKeys: c.Frontend.invalidateKeys || [],
            actions: (c.Frontend.Actions || []).map(normalizeActionConfig),
          } as Frontend)
        : undefined,
});

/**
 * Convert Tailwind bg classes to inline styles
 */
export const tailwindBgToStyle = (className: string): React.CSSProperties => {
  const bgColorMap: Record<string, string> = {
    "bg-red-50": "#fef2f2",
    "bg-red-100": "#fee2e2",
    "bg-red-200": "#fecaca",
    "bg-red-300": "#fca5a5",
    "bg-red-400": "#f87171",
    "bg-red-500": "#ef4444",
    "bg-red-600": "#dc2626",
    "bg-red-700": "#b91c1c",
    "bg-red-800": "#991b1b",
    "bg-red-900": "#7f1d1d",
    "bg-blue-50": "#eff6ff",
    "bg-blue-100": "#dbeafe",
    "bg-blue-200": "#bfdbfe",
    "bg-blue-300": "#93c5fd",
    "bg-blue-400": "#60a5fa",
    "bg-blue-500": "#3b82f6",
    "bg-blue-600": "#2563eb",
    "bg-blue-700": "#1d4ed8",
    "bg-blue-800": "#1e40af",
    "bg-blue-900": "#1e3a8a",
    "bg-green-50": "#f0fdf4",
    "bg-green-100": "#dcfce7",
    "bg-green-200": "#bbf7d0",
    "bg-green-300": "#86efac",
    "bg-green-400": "#4ade80",
    "bg-green-500": "#22c55e",
    "bg-green-600": "#16a34a",
    "bg-green-700": "#15803d",
    "bg-green-800": "#166534",
    "bg-green-900": "#14532d",
    "bg-yellow-50": "#fefce8",
    "bg-yellow-100": "#fef9c3",
    "bg-yellow-200": "#fef08a",
    "bg-yellow-300": "#fde047",
    "bg-yellow-400": "#facc15",
    "bg-yellow-500": "#eab308",
    "bg-yellow-600": "#ca8a04",
    "bg-yellow-700": "#a16207",
    "bg-yellow-800": "#854d0e",
    "bg-yellow-900": "#713f12",
    "bg-purple-50": "#faf5ff",
    "bg-purple-100": "#f3e8ff",
    "bg-purple-200": "#e9d5ff",
    "bg-purple-300": "#d8b4fe",
    "bg-purple-400": "#c084fc",
    "bg-purple-500": "#a855f7",
    "bg-purple-600": "#9333ea",
    "bg-purple-700": "#7e22ce",
    "bg-purple-800": "#6b21a8",
    "bg-purple-900": "#581c87",
    "bg-pink-50": "#fdf2f8",
    "bg-pink-100": "#fce7f3",
    "bg-pink-200": "#fbcfe8",
    "bg-pink-300": "#f9a8d4",
    "bg-pink-400": "#f472b6",
    "bg-pink-500": "#ec4899",
    "bg-pink-600": "#db2777",
    "bg-pink-700": "#be185d",
    "bg-pink-800": "#9d174d",
    "bg-pink-900": "#831843",
    "bg-gray-50": "#f9fafb",
    "bg-gray-100": "#f3f4f6",
    "bg-gray-200": "#e5e7eb",
    "bg-gray-300": "#d1d5db",
    "bg-gray-400": "#9ca3af",
    "bg-gray-500": "#6b7280",
    "bg-gray-600": "#4b5563",
    "bg-gray-700": "#374151",
    "bg-gray-800": "#1f2937",
    "bg-gray-900": "#111827",
    "bg-orange-50": "#fff7ed",
    "bg-orange-100": "#ffedd5",
    "bg-orange-200": "#fed7aa",
    "bg-orange-300": "#fdba74",
    "bg-orange-400": "#fb923c",
    "bg-orange-500": "#f97316",
    "bg-orange-600": "#ea580c",
    "bg-orange-700": "#c2410c",
    "bg-orange-800": "#9a3412",
    "bg-orange-900": "#7c2d12",
  };

  const classes = className.split(" ");
  const style: React.CSSProperties = {};

  classes.forEach((cls) => {
    if (bgColorMap[cls]) {
      style.backgroundColor = bgColorMap[cls];
    }
  });

  return style;
};

/**
 * Parse a value from a condition string
 */
export const parseValue = (
  row: GenericItem,
  value: string,
): ComparableValue => {
  if (!value) return value;
  value = value.trim();

  // Check for row(field) syntax
  const rowMatch = value.match(/^row\((.+)\)$/);
  if (rowMatch) {
    const field = rowMatch[1];
    return toComparableValue(row[field]);
  }

  // Check for quoted strings
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  // Check for booleans
  if (value === "true") return true;
  if (value === "false") return false;

  // Check for numbers
  if (!isNaN(Number(value))) return Number(value);

  // Fallback: Check if value is a key in row
  if (value in row) {
    return toComparableValue(row[value]);
  }

  return value;
};

const splitLogicalExpression = (
  expression: string,
  operator: "&&" | "||",
): string[] => {
  const parts: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;

  for (let index = 0; index < expression.length; index += 1) {
    const char = expression[index];
    const next = expression[index + 1];

    if ((char === '"' || char === "'") && expression[index - 1] !== "\\") {
      quote = quote === char ? null : quote ?? char;
    }

    if (!quote && char === operator[0] && next === operator[1]) {
      parts.push(current.trim());
      current = "";
      index += 1;
      continue;
    }

    current += char;
  }

  parts.push(current.trim());
  return parts.filter(Boolean);
};

const evaluateSimpleRowCondition = (
  row: GenericItem,
  condition: string,
): boolean => {
  if (!condition?.trim()) return false;

  // Handle inequality (!=)
  if (condition.includes("!=")) {
    const [lhs, rhs] = condition.split("!=");
    if (!lhs || rhs === undefined) return false;
    const result = parseValue(row, lhs) != parseValue(row, rhs);
    return result;
  }

  // Handle >=
  if (condition.includes(">=")) {
    const [lhs, rhs] = condition.split(">=");
    if (!lhs || rhs === undefined) return false;
    const result = compareValues(parseValue(row, lhs), parseValue(row, rhs), ">=");
    return result;
  }

  // Handle <=
  if (condition.includes("<=")) {
    const [lhs, rhs] = condition.split("<=");
    if (!lhs || rhs === undefined) return false;
    const result = compareValues(parseValue(row, lhs), parseValue(row, rhs), "<=");
    return result;
  }

  // Handle >
  if (condition.includes(">")) {
    const [lhs, rhs] = condition.split(">");
    if (!lhs || rhs === undefined) return false;
    const result = compareValues(parseValue(row, lhs), parseValue(row, rhs), ">");
    return result;
  }

  // Handle <
  if (condition.includes("<")) {
    const [lhs, rhs] = condition.split("<");
    if (!lhs || rhs === undefined) return false;
    const result = compareValues(parseValue(row, lhs), parseValue(row, rhs), "<");
    return result;
  }

  // Handle equality (=)
  if (condition.includes("=")) {
    const [lhs, rhs] = condition.split("=");
    if (!lhs || rhs === undefined) return false;
    const result = parseValue(row, lhs) == parseValue(row, rhs);
    return result;
  }

  // Handle falsy check (!)
  if (condition.startsWith("!")) {
    const key = condition.substring(1).trim();
    return !parseValue(row, key);
  }

  // Handle truthy check (just field name)
  return !!parseValue(row, condition);
};

/**
 * Evaluate a row condition (e.g., "field > 5", "status = active", "type='farm' && count=4")
 */
export const evaluateRowCondition = (
  row: GenericItem,
  condition: string
): boolean => {
  const trimmedCondition = condition?.trim();
  if (!trimmedCondition) return false;

  const orParts = splitLogicalExpression(trimmedCondition, "||");
  if (orParts.length > 1) {
    return orParts.some((part) => evaluateRowCondition(row, part));
  }

  const andParts = splitLogicalExpression(trimmedCondition, "&&");
  if (andParts.length > 1) {
    return andParts.every((part) => evaluateRowCondition(row, part));
  }

  return evaluateSimpleRowCondition(row, trimmedCondition);
};

export const getMatchingRowClassNames = (
  row: GenericItem,
  rules: RowClassRule[] = [],
): string => {
  const matchedClassNames: string[] = [];
  const fallbackClassNames: string[] = [];

  rules.forEach((rule) => {
    const condition = rule.condition ?? rule.Condition ?? "";
    const className = rule.className ?? rule.ClassName ?? "";
    if (!className.trim()) return;

    if (!condition.trim()) {
      fallbackClassNames.push(className);
      return;
    }

    if (evaluateRowCondition(row, condition)) {
      matchedClassNames.push(className);
    }
  });

  return (matchedClassNames.length > 0
    ? matchedClassNames
    : fallbackClassNames
  ).join(" ");
};

/**
 * Check if a field is a displayable primitive type
 */
export const isDisplayablePrimitive = (f: Field) => {
  const t = (f.type || "").toLowerCase();
  const originalType = f.type || "";

  // Check for array types (both camelCase and lowercase)
  const isArrayType =
    t === "stringarray" ||
    originalType === "stringArray" ||
    t === "string[]" ||
    t === "array<string>" ||
    t === "intarray" ||
    originalType === "intArray" ||
    t === "int[]" ||
    t === "array<int>" ||
    t === "numberarray" ||
    originalType === "numberArray" ||
    t === "number[]" ||
    t === "array<number>";

  const isPrimitive = [
    Types.String,
    Types.Number,
    Types.Boolean,
    Types.Date,
    "int",
    "float",
    "double",
    Types.Image,
    "img",
    Types.ObjectId,
    Types.AutoIncrementId,
    Types.ObjectIdArray,
  ].includes(t);

  return isPrimitive || isArrayType;
};

/**
 * Convert a field to input type and form key type
 */
export function fieldToInput(field: Field) {
  const t = (field.type || "").toLowerCase();
  const originalType = field.type || "";

  // Check for string array types
  const isStringArray =
    t === Types.StringArray ||
    originalType === "stringArray" ||
    t === "string[]" ||
    t === "array<string>";

  // Check for int array types
  const isIntArray =
    t === Types.IntArray ||
    originalType === "intArray" ||
    t === "int[]" ||
    t === "array<int>";

  // Check for number array types
  const isNumberArray =
    t === Types.NumberArray ||
    originalType === "numberArray" ||
    t === "number[]" ||
    t === "array<number>";

  if (isStringArray)
    return {
      inputType: InputTypes.TEXT as const,
      formKeyType: FormKeyTypeEnum.STRING_ARRAY as const,
    };

  if (isIntArray)
    return {
      inputType: InputTypes.TEXT as const,
      formKeyType: FormKeyTypeEnum.INT_ARRAY as const,
    };

  if (isNumberArray)
    return {
      inputType: InputTypes.TEXT as const,
      formKeyType: FormKeyTypeEnum.NUMBER_ARRAY as const,
    };

  if ([Types.Number, "int", "float", "double"].includes(t))
    return {
      inputType: InputTypes.NUMBER as const,
      formKeyType: FormKeyTypeEnum.NUMBER as const,
    };
  if ([Types.Boolean, "bool"].includes(t))
    return {
      inputType: InputTypes.CHECKBOX as const,
      formKeyType: FormKeyTypeEnum.BOOLEAN as const,
    };
  if ([Types.Image, "img"].includes(t))
    return {
      inputType: InputTypes.IMAGE as const,
      formKeyType: FormKeyTypeEnum.STRING as const,
    };
  if ([Types.Date, "datetime", "timestamp"].includes(t))
    return {
      inputType: InputTypes.DATE as const,
      formKeyType: FormKeyTypeEnum.DATE as const,
    };

  // Check if field is hashed (password field)
  if (field.isHashed) {
    return {
      inputType: InputTypes.PASSWORD as const,
      formKeyType: FormKeyTypeEnum.STRING as const,
    };
  }

  return {
    inputType: InputTypes.TEXT as const,
    formKeyType: FormKeyTypeEnum.STRING as const,
  };
}
