import { isActionNumberInput } from "./designerFieldDefaults";
import { RowClassConfig, TableActionConfig, TableComponentConfig, TableFilterPanelInputConfig } from "../../types/page";
import { cleanDesignerActionFormLayout } from "../../utils/pageDesignerTableConfig";
import type { SelectFilterBinding } from "../../types/selectFilters";
import { cleanSourceRequestFilters, formatRequestFiltersInput, parseRequestFiltersInput, type RequestFilterFieldContext } from "../../utils/requestFilterTemplates";

export const cleanRules = (rules: RowClassConfig[] = []): RowClassConfig[] =>
  rules.filter((rule) => rule.condition.trim() || rule.className.trim());

export const parseJsonObject = (
  value?: string,
): Record<string, unknown> | undefined => {
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

export const cleanTableActions = (
  actions: TableActionConfig[] = [],
): TableActionConfig[] =>
  actions
    .filter((action) => action.kind)
    .map((action, index) => {
      const constantValues =
        action.constantValues || parseJsonObject(action.constantValuesJson);
      const actionId =
        action.id?.trim() ||
        action.key?.trim() ||
        `${action.kind}-${index + 1}`;
      return {
        kind: action.kind,
        id: actionId,
        key: action.key?.trim() || actionId,
        ...(action.label?.trim() ? { label: action.label.trim() } : {}),
        ...(action.buttonName?.trim()
          ? { buttonName: action.buttonName.trim() }
          : {}),
        ...(action.icon?.trim() ? { icon: action.icon.trim() } : {}),
        order: Number(action.order ?? index + 1),
        enabled: action.enabled !== false,
        modalType: action.modalType || "none",
        ...(cleanDesignerActionFormLayout(action.formLayout)
          ? { formLayout: cleanDesignerActionFormLayout(action.formLayout) }
          : {}),
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
                  ...(isActionNumberInput(field.type) &&
                  field.isNumberButtonsActive
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
                  ...(field.sourceDataFields?.filter((key) => key.trim()).length
                    ? {
                        sourceDataFields: field.sourceDataFields
                          .map((key) => key.trim())
                          .filter(Boolean),
                      }
                    : {}),
                  ...(field.optionDisplay &&
                  (field.optionDisplay.leftTemplate?.trim() ||
                    field.optionDisplay.rightTemplate?.trim())
                    ? {
                        optionDisplay: {
                          leftTemplate:
                            field.optionDisplay.leftTemplate?.trim() || "",
                          rightTemplate:
                            field.optionDisplay.rightTemplate?.trim() || "",
                        },
                      }
                    : {}),
                  ...(cleanConstantFilters(field.sourceRequestFilters, field)
                    ? {
                        sourceRequestFilters: cleanConstantFilters(
                          field.sourceRequestFilters,
                          field,
                        ),
                      }
                    : {}),
                  ...(cleanSelectFilterBindings(field.sourceFilterBindings)
                    ? {
                        sourceFilterBindings: cleanSelectFilterBindings(
                          field.sourceFilterBindings,
                        ),
                      }
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
                  ...(field.defaultValue !== undefined &&
                  field.defaultValue !== ""
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
        // Preserve legacy function metadata when saving existing pages. The
        // function picker and runtime forwarding remain commented out.
        ...(action.submit?.workflowName?.trim() ||
        action.submit?.functionName?.trim()
          ? {
              submit: {
                ...(action.submit.workflowName?.trim()
                  ? {
                      workflowName: action.submit.workflowName.trim(),
                      ...(action.submit.workflowSchema?.trim()
                        ? { workflowSchema: action.submit.workflowSchema.trim() }
                        : {}),
                    }
                  : {}),
                ...(action.submit.functionName?.trim()
                  ? { functionName: action.submit.functionName.trim() }
                  : {}),
              },
            }
          : {}),
        ...(action.path?.trim() ? { path: action.path.trim() } : {}),
        ...(action.linkTemplate?.trim()
          ? { linkTemplate: action.linkTemplate.trim() }
          : {}),
        ...(action.fields?.filter((f) => f.trim()).length
          ? { fields: action.fields.map((f) => f.trim()).filter(Boolean) }
          : {}),
        ...(action.excludeFields?.filter((f) => f.trim()).length
          ? {
              excludeFields: action.excludeFields
                .map((f) => f.trim())
                .filter(Boolean),
            }
          : {}),
        ...(action.linkType ? { linkType: action.linkType } : {}),
        ...(action.className?.trim()
          ? { className: action.className.trim() }
          : {}),
        ...(action.buttonClassName?.trim()
          ? { buttonClassName: action.buttonClassName.trim() }
          : {}),
        ...(action.isButton ? { isButton: true } : {}),
      };
    });

export const cleanFilterPanelInputs = (
  inputs: TableFilterPanelInputConfig[] = [],
): TableFilterPanelInputConfig[] =>
  inputs
    .filter((field) => field.formKey.trim())
    .map((field) => ({
      ...(field.id ? { id: field.id } : {}),
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
      ...(field.sourceDataFields?.filter((key) => key.trim()).length
        ? {
            sourceDataFields: field.sourceDataFields
              .map((key) => key.trim())
              .filter(Boolean),
          }
        : {}),
      ...(field.optionDisplay &&
      (field.optionDisplay.leftTemplate?.trim() ||
        field.optionDisplay.rightTemplate?.trim())
        ? {
            optionDisplay: {
              leftTemplate: field.optionDisplay.leftTemplate?.trim() || "",
              rightTemplate: field.optionDisplay.rightTemplate?.trim() || "",
            },
          }
        : {}),
      ...(cleanConstantFilters(field.sourceRequestFilters, field)
        ? {
            sourceRequestFilters: cleanConstantFilters(
              field.sourceRequestFilters,
              field,
            ),
          }
        : {}),
      ...(cleanSelectFilterBindings(field.sourceFilterBindings)
        ? {
            sourceFilterBindings: cleanSelectFilterBindings(
              field.sourceFilterBindings,
            ),
          }
        : {}),
      ...(field.sourceFilterCondition?.trim()
        ? { sourceFilterCondition: field.sourceFilterCondition.trim() }
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
      ...(field.minLength !== undefined ? { minLength: field.minLength } : {}),
      ...(field.maxLength !== undefined ? { maxLength: field.maxLength } : {}),
      ...(field.pattern?.trim() ? { pattern: field.pattern.trim() } : {}),
      ...(field.validationMessage?.trim()
        ? { validationMessage: field.validationMessage.trim() }
        : {}),
    }));

export const cleanSelectFilterBindings = (
  bindings?: SelectFilterBinding[],
): SelectFilterBinding[] | undefined => {
  if (!Array.isArray(bindings)) return undefined;
  const cleaned = bindings
    .filter((rule) => rule && rule.id?.trim() && rule.field?.trim())
    .map((rule) => {
      const value = rule.value;
      const cleanedValue: SelectFilterBinding["value"] =
        value.source === "literal"
          ? { source: "literal", value: value.value }
          : value.source === "record"
            ? {
                source: "record",
                fieldKey: value.fieldKey.trim(),
                path: (value.path || []).map((part) => part.trim()).filter(Boolean),
              }
            : { source: "field", fieldKey: value.fieldKey.trim() };
      return {
        id: rule.id.trim(),
        field: rule.field.trim(),
        operator: rule.operator === "in" ? ("in" as const) : ("eq" as const),
        value: cleanedValue,
      };
    });
  return cleaned.length ? cleaned : undefined;
};

export const cleanConstantFilters = (
  filters?: Record<string, unknown>,
  context?: RequestFilterFieldContext,
): Record<string, unknown> | undefined =>
  cleanSourceRequestFilters(filters, context);

export const formatSourceRequestFilters = (filters?: Record<string, unknown>) =>
  formatRequestFiltersInput(filters);

export const parseSourceRequestFiltersInput = (
  value: string,
  context?: RequestFilterFieldContext,
) => parseRequestFiltersInput(value, context);

export const cleanConstantSort = (
  sort?: TableComponentConfig["constantSort"],
): TableComponentConfig["constantSort"] | undefined => {
  const sortField = typeof sort?.sort === "string" ? sort.sort.trim() : "";
  if (!sortField) return undefined;
  return {
    sort: sortField,
    asc: sort?.asc ?? 1,
  };
};
