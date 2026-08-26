import { FormElementsState } from "../types";
import {
  FormComponentConfig,
  FormItemCalculationConfig,
  FormObjectListConfig,
  FormQuantityDiscountTierConfig,
} from "../types/page";

export type FormCalculationErrorCode =
  | "missing_mapping"
  | "invalid_number"
  | "invalid_operation";

export class FormCalculationError extends Error {
  code: FormCalculationErrorCode;
  field?: string;

  constructor(code: FormCalculationErrorCode, message: string, field?: string) {
    super(message);
    this.name = "FormCalculationError";
    this.code = code;
    this.field = field;
  }
}

type EmbeddedItem = Record<string, unknown>;

const qualifiedSource = (field: string): [string, string] | undefined => {
  const separator = field.indexOf(".");
  return separator > 0 && separator < field.length - 1 ? [field.slice(0, separator), field.slice(separator + 1)] : undefined;
};

const calculationValue = (item: EmbeddedItem, field: string): unknown => {
  const qualified = qualifiedSource(field);
  if (!qualified) return item[field];
  const [formKey, sourceField] = qualified;
  const optionData = item._optionData as Record<string, EmbeddedItem> | undefined;
  return optionData?.[formKey]?.[sourceField];
};

const numericValue = (value: unknown, field: string): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  throw new FormCalculationError(
    "invalid_number",
    `Calculation field '${field}' must be numeric`,
    field,
  );
};

const roundDecimal = (value: number, precision = 2): number => {
  const scale = 10 ** precision;
  return Math.round((value + Number.EPSILON) * scale) / scale;
};

export const getQuantityDiscountTiers = (
  calculation: FormItemCalculationConfig,
): FormQuantityDiscountTierConfig[] => calculation.discountTiers?.length
  ? calculation.discountTiers
  : calculation.minimumQuantity !== undefined && calculation.discountPercentage !== undefined
    ? [{ minimumQuantity: calculation.minimumQuantity, discountPercentage: calculation.discountPercentage }]
    : [];

export const getNextQuantityDiscountTier = (
  calculation: FormItemCalculationConfig,
  quantity: number,
): FormQuantityDiscountTierConfig | undefined => getQuantityDiscountTiers(calculation)
  .find((tier) => tier.minimumQuantity > quantity);

export const snapshotMappedFields = (
  config: FormObjectListConfig,
  item: EmbeddedItem,
  sourceItems: Record<string, EmbeddedItem | undefined>,
): EmbeddedItem => {
  const result = { ...item };
  (config.fieldMappings || []).forEach((mapping) => {
    const value = sourceItems[mapping.sourceFormKey]?.[mapping.sourceField];
    if (
      mapping.required &&
      (value === undefined || value === null || value === "")
    ) {
      throw new FormCalculationError(
        "missing_mapping",
        `Required source field '${mapping.sourceField}' is missing`,
        mapping.targetField,
      );
    }
    if (value !== undefined) result[mapping.targetField] = value;
  });
  const optionData: Record<string, EmbeddedItem> = {};
  (config.itemCalculations || []).flatMap((calculation) => calculation.inputs).forEach((input) => {
    const qualified = qualifiedSource(input);
    if (!qualified) return;
    const [formKey, sourceField] = qualified;
    const value = sourceItems[formKey]?.[sourceField];
    if (value !== undefined) optionData[formKey] = { ...(optionData[formKey] || {}), [sourceField]: value };
  });
  if (Object.keys(optionData).length > 0) result._optionData = optionData;
  return result;
};

export const calculateObjectListItem = (
  config: FormObjectListConfig,
  item: EmbeddedItem,
): EmbeddedItem => {
  const result = { ...item };
  (config.itemCalculations || []).forEach((calculation) => {
    const [leftField, rightField] = calculation.inputs;
    const left = numericValue(calculationValue(result, leftField), leftField);
    const right = numericValue(calculationValue(result, rightField), rightField);
    if (calculation.operation === "quantityDiscount") {
      const tiers = getQuantityDiscountTiers(calculation);
      if (!calculation.originalTargetField || tiers.length === 0) {
        throw new FormCalculationError("invalid_operation", "Quantity discount configuration is incomplete");
      }
      const original = roundDecimal(left * right, calculation.precision ?? 2);
      const reachedTier = tiers.reduce<FormQuantityDiscountTierConfig | undefined>(
        (selected, tier) => right >= tier.minimumQuantity ? tier : selected,
        undefined,
      );
      result[calculation.originalTargetField] = original;
      result[calculation.targetField] = reachedTier
        ? roundDecimal(original * (1 - reachedTier.discountPercentage / 100), calculation.precision ?? 2)
        : original;
      return;
    }
    if (calculation.operation !== "multiply") {
      throw new FormCalculationError(
        "invalid_operation",
        `Unsupported item operation '${calculation.operation}'`,
      );
    }
    result[calculation.targetField] = roundDecimal(
      left * right,
      calculation.precision ?? 2,
    );
  });
  return result;
};

export const calculateFormSummaries = (
  form: FormComponentConfig,
  state: FormElementsState,
): Record<string, number> => {
  const results: Record<string, number> = {};
  (form.summaries || []).forEach((summary) => {
    const precision = summary.format?.precision ?? 2;
    if (summary.operation === "sum") {
      const rawItems = state[summary.objectListKey || ""];
      const items = Array.isArray(rawItems) ? rawItems : [];
      const total = items.reduce<number>(
        (sum, item) =>
          sum + numericValue((item as EmbeddedItem)[summary.sourceField], summary.sourceField),
        0,
      );
      results[summary.targetField] = roundDecimal(total, precision);
      return;
    }
    if (summary.operation === "copy") {
      results[summary.targetField] = roundDecimal(
        numericValue(results[summary.sourceField], summary.sourceField),
        precision,
      );
      return;
    }
    throw new FormCalculationError(
      "invalid_operation",
      `Unsupported summary operation '${summary.operation}'`,
    );
  });
  return results;
};

export const recalculateFormState = (
  form: FormComponentConfig,
  state: FormElementsState,
): FormElementsState => {
  const next: FormElementsState = { ...state };
  (form.objectLists || []).forEach((config) => {
    const rawItems = state[config.key];
    if (!Array.isArray(rawItems)) return;
    next[config.key] = rawItems.map((item) =>
      calculateObjectListItem(config, item as EmbeddedItem),
    );
  });
  return { ...next, ...calculateFormSummaries(form, next) };
};
