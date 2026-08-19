import {
  FormComponentConfig,
  FormFieldMappingConfig,
  FormItemCalculationConfig,
} from "../../types/page";

const updateList = (
  form: FormComponentConfig,
  listIndex: number,
  update: (list: NonNullable<FormComponentConfig["objectLists"]>[number]) => NonNullable<FormComponentConfig["objectLists"]>[number],
) => ({
  ...form,
  objectLists: (form.objectLists || []).map((list, index) => index === listIndex ? update(list) : list),
});

export interface CalculationInputOption {
  value: string;
  label: string;
  group: "Item fields" | "Additional option data" | "Calculated fields";
}

export const getAvailableCalculationInputs = (
  form: FormComponentConfig,
  listIndex: number,
  calculationIndex: number,
): CalculationInputOption[] => {
  const list = form.objectLists?.[listIndex];
  if (!list) return [];
  const options: CalculationInputOption[] = (list.itemFields || []).map((field) => ({ value: field, label: field, group: "Item fields" }));
  (list.fieldMappings || []).forEach((mapping) => {
    if (mapping.targetField.trim()) options.push({ value: mapping.targetField, label: mapping.targetField, group: "Item fields" });
  });
  (form.fields || []).forEach((field) => {
    if (field.type !== "select" || field.optionsSource !== "schema") return;
    (field.sourceDataFields || []).forEach((sourceField) => options.push({
      value: `${field.formKey}.${sourceField}`,
      label: `${field.label || field.formKey} → ${sourceField}`,
      group: "Additional option data",
    }));
  });
  (list.itemCalculations || []).slice(0, calculationIndex).forEach((calculation) => {
    if (calculation.targetField.trim()) options.push({ value: calculation.targetField, label: calculation.targetField, group: "Calculated fields" });
  });
  return options;
};

export const addFieldMapping = (form: FormComponentConfig, listIndex: number) =>
  updateList(form, listIndex, (list) => ({
    ...list,
    fieldMappings: [...(list.fieldMappings || []), { sourceFormKey: "", sourceField: "", targetField: "", required: true }],
  }));

export const updateFieldMapping = (
  form: FormComponentConfig,
  listIndex: number,
  mappingIndex: number,
  patch: Partial<FormFieldMappingConfig>,
) => updateList(form, listIndex, (list) => ({
  ...list,
  fieldMappings: (list.fieldMappings || []).map((mapping, index) => index === mappingIndex ? { ...mapping, ...patch } : mapping),
}));

export const removeFieldMapping = (form: FormComponentConfig, listIndex: number, mappingIndex: number) =>
  updateList(form, listIndex, (list) => ({
    ...list,
    fieldMappings: (list.fieldMappings || []).filter((_mapping, index) => index !== mappingIndex),
  }));

export const addItemCalculation = (form: FormComponentConfig, listIndex: number) =>
  updateList(form, listIndex, (list) => ({
    ...list,
    itemCalculations: [...(list.itemCalculations || []), {
      operation: "multiply",
      inputs: ["", ""],
      targetField: "",
      precision: 2,
    }],
  }));

export const updateItemCalculation = (
  form: FormComponentConfig,
  listIndex: number,
  calculationIndex: number,
  patch: Partial<FormItemCalculationConfig>,
) => updateList(form, listIndex, (list) => ({
  ...list,
  itemCalculations: (list.itemCalculations || []).map((calculation, index) => index === calculationIndex ? { ...calculation, ...patch } : calculation),
}));

export const removeItemCalculation = (form: FormComponentConfig, listIndex: number, calculationIndex: number) =>
  updateList(form, listIndex, (list) => ({
    ...list,
    itemCalculations: (list.itemCalculations || []).filter((_calculation, index) => index !== calculationIndex),
  }));

export const addSummary = (form: FormComponentConfig): FormComponentConfig => ({
  ...form,
  summaries: [...(form.summaries || []), {
    key: "",
    label: "",
    area: "right",
    operation: "sum",
    objectListKey: form.objectLists?.[0]?.key || "",
    sourceField: "",
    targetField: "",
    format: { style: "currency", currency: "TRY", precision: 2 },
  }],
});

export const validateDesignerCalculations = (form: FormComponentConfig): string[] => {
  const errors: string[] = [];
  const formFields = new Map((form.fields || []).map((field) => [field.formKey, field]));
  const listFields = new Map<string, Set<string>>();
  (form.objectLists || []).forEach((list) => {
    const available = new Set(list.itemFields || []);
    (form.fields || []).forEach((field) => {
      if (field.type === "select" && field.optionsSource === "schema") {
        (field.sourceDataFields || []).forEach((sourceField) => available.add(`${field.formKey}.${sourceField}`));
      }
    });
    (list.fieldMappings || []).forEach((mapping, index) => {
      const source = formFields.get(mapping.sourceFormKey.trim());
      if (!source || source.type !== "select" || source.optionsSource !== "schema") errors.push(`${list.key} mapping ${index + 1}: source must be a schema-backed select`);
      if (!mapping.sourceField.trim() || !mapping.targetField.trim()) errors.push(`${list.key} mapping ${index + 1}: source and target fields are required`);
      if (available.has(mapping.targetField.trim())) errors.push(`${list.key}: duplicate item target ${mapping.targetField.trim()}`);
      available.add(mapping.targetField.trim());
    });
    (list.itemCalculations || []).forEach((calculation, index) => {
      if (calculation.inputs.length !== 2 || calculation.inputs.some((input) => !available.has(input.trim()))) errors.push(`${list.key} calculation ${index + 1}: inputs must reference available item fields`);
      if (calculation.precision !== undefined && (calculation.precision < 0 || calculation.precision > 6)) errors.push(`${list.key} calculation ${index + 1}: precision must be between 0 and 6`);
      if (!calculation.targetField.trim() || available.has(calculation.targetField.trim())) errors.push(`${list.key}: duplicate item target ${calculation.targetField.trim()}`);
      available.add(calculation.targetField.trim());
    });
    listFields.set(list.key.trim(), available);
  });
  const summaries = new Set<string>();
  (form.summaries || []).forEach((summary, index) => {
    if (summary.operation === "sum") {
      if (!listFields.get(summary.objectListKey?.trim() || "")?.has(summary.sourceField.trim())) errors.push(`Summary ${index + 1}: source must reference an available item field`);
    } else if (!summaries.has(summary.sourceField.trim())) errors.push(`Summary ${index + 1}: copy source must reference an earlier summary`);
    if (summary.format?.currency && !/^[A-Z]{3}$/.test(summary.format.currency)) errors.push(`Summary ${index + 1}: currency must be three uppercase letters`);
    if (summary.format?.precision !== undefined && (summary.format.precision < 0 || summary.format.precision > 6)) errors.push(`Summary ${index + 1}: precision must be between 0 and 6`);
    summaries.add(summary.targetField.trim());
  });
  return errors;
};

export const normalizeDesignerCalculations = (form: FormComponentConfig): FormComponentConfig => ({
  ...form,
  objectLists: (form.objectLists || []).map((list) => ({
    ...list,
    fieldMappings: (list.fieldMappings || []).map((mapping) => ({ ...mapping, sourceFormKey: mapping.sourceFormKey.trim(), sourceField: mapping.sourceField.trim(), targetField: mapping.targetField.trim() })),
    itemCalculations: (list.itemCalculations || []).map((calculation) => ({ ...calculation, inputs: calculation.inputs.map((input) => input.trim()), targetField: calculation.targetField.trim(), precision: calculation.precision ?? 2 })),
  })),
  summaries: (form.summaries || []).map((summary) => ({
    ...summary,
    key: summary.key.trim(),
    objectListKey: summary.objectListKey?.trim(),
    sourceField: summary.sourceField.trim(),
    targetField: summary.targetField.trim(),
    format: summary.format ? { ...summary.format, currency: summary.format.currency?.trim().toUpperCase(), precision: summary.format.precision ?? 2 } : undefined,
  })),
});
