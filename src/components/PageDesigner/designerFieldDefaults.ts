import type { Field } from "../../utils/api/container";
import type {
  FormComponentConfig,
  FormFieldConfig,
  TableActionConfig,
  TableActionFormFieldConfig,
  TableActionFormKeyType,
  TableActionInputType,
  TableColumnConfig,
  TableFilterPanelInputConfig,
} from "../../types/page";

export const formKeyTypeForActionInput = (
  type: TableActionInputType,
  isMultiple?: boolean,
): TableActionFormKeyType => {
  if (isMultiple) return "stringArray";
  if (type === "number") return "number";
  if (
    type === "date" ||
    type === "time" ||
    type === "hour" ||
    type === "monthYear"
  ) {
    return "date";
  }
  if (type === "checkbox") return "boolean";
  if (type === "color") return "color";
  return "string";
};

export const buildTableColumnsFromFields = (fields: Field[]): TableColumnConfig[] =>
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

export const actionInputTypeFromField = (field: Field): TableActionInputType => {
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

export const buildActionFormFieldsFromFields = (
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
                field.enumList.map((value) => ({
                  value,
                  label: String(value),
                })),
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

export const flattenFormFields = (fields: Field[]): Field[] =>
  fields.flatMap((field) =>
    field.children?.length ? flattenFormFields(field.children) : [field],
  );

export const buildFormFieldsFromFields = (fields: Field[]): FormFieldConfig[] =>
  buildActionFormFieldsFromFields(flattenFormFields(fields)).map(
    (field, index) => ({
      ...field,
      area: "left",
      order: index + 1,
      width: "full",
    }),
  );

export const buildDefaultFormConfig = (
  schemaName: string,
  fields: Field[],
): FormComponentConfig => ({
  title: "",
  schemaName,
  layout: {
    variant: "page",
    columns: 2,
    areas: [
      { key: "left", title: "Details", order: 1 },
      { key: "right", title: "Items", order: 2 },
    ],
  },
  fields: buildFormFieldsFromFields(fields),
  objectLists: [],
  actions: [
    {
      kind: "submit",
      buttonName: "Save",
      area: "right",
      enabled: true,
      order: 1,
    },
  ],
  submit: { mode: "create" },
});

export const buildFilterPanelInputsFromFields = (
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
      const inputType: TableActionInputType = isBoolean
        ? "select"
        : baseInputType;
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

export const buildDefaultSchemaActions = (fields: Field[]): TableActionConfig[] => [
  {
    id: "default-edit",
    key: "default-edit",
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
    key: "default-delete",
    kind: "delete",
    label: "Delete",
    icon: "HiOutlineTrash",
    order: 2,
    enabled: true,
    modalType: "confirm",
    confirmText: "GeneralDeleteMessage",
  },
];

export const buildDefaultCreateAction = (fields: Field[]): TableActionConfig => ({
  id: "default-create",
  key: "default-create",
  kind: "create",
  label: "Add",
  buttonName: "Create",
  icon: "FiPlus",
  order: 1,
  enabled: true,
  modalType: "form",
  formFields: buildActionFormFieldsFromFields(fields),
});

export const buildDefaultBulkEditAction = (fields: Field[]): TableActionConfig => ({
  id: "bulk-edit",
  key: "bulk-edit",
  kind: "update",
  label: "Edit Selected",
  buttonName: "Edit",
  icon: "FiEdit",
  order: 1,
  enabled: true,
  modalType: "form",
  formFields: buildActionFormFieldsFromFields(fields),
});

export const buildDefaultBulkDeleteAction = (): TableActionConfig => ({
  id: "bulk-delete",
  key: "bulk-delete",
  kind: "delete",
  label: "Delete Selected",
  icon: "HiOutlineTrash",
  order: 2,
  enabled: true,
  modalType: "confirm",
  confirmTitle: "Delete Selected",
  confirmText: "Are you sure you want to delete the selected items?",
});

export const hydrateSchemaEditActionFields = (
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

export const hydrateSchemaAddButton = (
  addButton: TableActionConfig | undefined,
  actions: TableActionConfig[] | undefined,
  fields: Field[],
): TableActionConfig =>
  addButton ||
  actions?.find((action) => action.kind === "create") ||
  buildDefaultCreateAction(fields);

export const buildTableColumnsFromNames = (fields: string[]): TableColumnConfig[] =>
  fields
    .map((field) => field.trim())
    .filter(
      (field, index, all) =>
        field && !["_id", "id"].includes(field) && all.indexOf(field) === index,
    )
    .map((field) => ({ field, type: "field", displayName: "" }));

export const isActionNumberInput = (type?: string) =>
  (type || "").toLowerCase() === "number";
