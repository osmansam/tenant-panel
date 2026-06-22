import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FormElementsState, FormElementValue } from "../../types";
import {
  FormActionConfig,
  FormAreaKey,
  FormComponentConfig,
  FormFieldConfig,
  FormObjectListConfig,
} from "../../types/page";
import { useDynamicCrud } from "../../utils/dynamic";
import {
  addOrReplaceObjectListItem,
  adjustObjectListNumber,
  buildFormInputs,
  buildFormSubmitRequestBody,
  buildFormSubmitPayload,
  buildInitialFormState,
  copySourceFieldsToObject,
  filterFormInputOptions,
  getAddObjectActions,
  getAreaClassName,
  getEnabledFormActions,
  getFieldArea,
  getFormSubmitMode,
  getObjectListArea,
  isFormConditionMet,
  normalizeObjectListValue,
  removeObjectListItem,
} from "../../utils/formConfig";
import { validateField, ValidationRules } from "../../utils/validationHelper";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import DynamicFormField from "./DynamicFormField";
import DynamicFormObjectList from "./DynamicFormObjectList";
import { useFormSelectionData } from "./useFormSelectionData";

type Props = {
  form: FormComponentConfig;
  title?: string;
};

type DynamicRecord = Record<string, unknown> & { _id: string | number };
type EditingState = { listKey: string; index: number } | null;

const areaOrder: FormAreaKey[] = ["top", "left", "main", "right", "bottom"];
const columnClasses = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};
const widthClasses = {
  full: "col-span-full",
  half: "md:col-span-1",
  third: "lg:col-span-1",
};

const isEmpty = (value: unknown) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const DynamicForm = ({ form, title }: Props) => {
  const { t } = useTranslation();
  const selectionDataMap = useFormSelectionData(form);
  const inputs = useMemo(
    () => buildFormInputs(form, selectionDataMap),
    [form, selectionDataMap],
  );
  const inputMap = useMemo(
    () => new Map(inputs.map((input) => [input.formKey, input])),
    [inputs],
  );
  const fieldMap = useMemo(
    () => new Map((form.fields || []).map((field) => [field.formKey, field])),
    [form.fields],
  );
  const addActions = useMemo(() => {
    return getAddObjectActions(form);
  }, [form]);
  const submitAction = getEnabledFormActions(form, "submit")[0] || {
    kind: "submit" as const,
    area: "bottom" as const,
    buttonName: form.submit?.buttonName,
  };
  const [formElements, setFormElements] = useState<FormElementsState>(() =>
    buildInitialFormState(form),
  );
  const [editing, setEditing] = useState<EditingState>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasImageField = (form.fields || []).some(
    (field) => field.type === "image",
  );
  const { createMutation, createManyMutation, executeWorkflowMutation } =
    useDynamicCrud<DynamicRecord>(
    form.schemaName,
    hasImageField,
  );
  const isSubmitPending =
    createMutation.isPending ||
    createManyMutation.isPending ||
    executeWorkflowMutation.isPending;

  const updateField = (key: string, value: FormElementValue) => {
    setFormElements((current) => {
      const next = { ...current, [key]: value };
      const invalidated = inputMap.get(key)?.invalidateKeys || [];
      invalidated.forEach(({ key: invalidatedKey, defaultValue }) => {
        next[invalidatedKey] = defaultValue;
      });
      return next;
    });
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validateFields = (fieldKeys: string[]) => {
    const nextErrors: Record<string, string> = {};
    fieldKeys.forEach((key) => {
      const field = fieldMap.get(key);
      if (!field) return;
      const rules: ValidationRules = {
        required:
          !!field.required ||
          isFormConditionMet(field.requiredCondition, formElements),
        minlength: field.minLength,
        maxlength: field.maxLength,
        min: field.min,
        max: field.max,
        pattern: field.pattern,
      };
      const value = formElements[key];
      const message = validateField(
        value,
        rules,
        field.formKeyType || field.type,
      );
      if (message || (rules.required && isEmpty(value))) {
        nextErrors[key] = field.validationMessage || message || t("Required");
      }
    });
    setErrors((current) => ({ ...current, ...nextErrors }));
    if (Object.keys(nextErrors).length > 0) {
      toast.error(t("Please fix the errors in the form"));
      return false;
    }
    return true;
  };

  const enrichItemDisplayValues = (
    item: Record<string, unknown>,
    sourceFields: string[],
  ) => {
    const enriched = { ...item };
    sourceFields.forEach((fieldKey) => {
      const input = inputMap.get(fieldKey);
      if (!input?.options?.length) return;
      const rawValue = formElements[fieldKey];
      if (Array.isArray(rawValue)) return;
      const option = input.options.find(
        (candidate) => candidate.value === rawValue,
      );
      if (!option) return;
      enriched[`${fieldKey}Label`] = option.label;
      if (option.sourceItem) {
        Object.entries(option.sourceItem).forEach(([key, value]) => {
          if (!Object.prototype.hasOwnProperty.call(enriched, key)) {
            enriched[key] = value;
          }
        });
      }
    });
    return enriched;
  };

  const clearSourceFields = (action: FormActionConfig) => {
    const preserved = new Set(action.preserveSourceFields || []);
    const initial = buildInitialFormState(form);
    setFormElements((current) => {
      const next = { ...current };
      (action.clearSourceFields || []).forEach((key) => {
        if (!preserved.has(key)) next[key] = initial[key];
      });
      return next;
    });
  };

  const handleAddObject = (action: FormActionConfig) => {
    const objectList = (form.objectLists || []).find(
      (candidate) => candidate.key === action.targetObjectList,
    );
    if (!objectList) {
      toast.error(t("Object list configuration was not found"));
      return;
    }
    const sourceFields = action.sourceFields?.length
      ? action.sourceFields
      : objectList.itemFields || [];
    if (!validateFields(sourceFields)) return;
    const item = enrichItemDisplayValues(
      copySourceFieldsToObject(formElements, sourceFields),
      sourceFields,
    );
    const editingIndex =
      editing?.listKey === objectList.key ? editing.index : null;
    setFormElements((current) => ({
      ...current,
      [objectList.key]: addOrReplaceObjectListItem(
        current[objectList.key],
        item,
        editingIndex,
      ),
    }));
    clearSourceFields(action);
    setEditing(null);
  };

  const handleEditObject = (
    objectList: FormObjectListConfig,
    item: Record<string, unknown>,
    index: number,
  ) => {
    setFormElements((current) => {
      const next = { ...current };
      (objectList.itemFields || Object.keys(item)).forEach((field) => {
        const value = item[field];
        if (value !== undefined) next[field] = value as FormElementValue;
      });
      return next;
    });
    setEditing({ listKey: objectList.key, index });
  };

  const handleSubmit = async () => {
    const transientFields = new Set(
      addActions.flatMap((action) => action.sourceFields || []),
    );
    const parentFieldKeys = (form.fields || [])
      .map((field) => field.formKey)
      .filter((key) => !transientFields.has(key));
    if (!validateFields(parentFieldKeys)) return;
    const mode = getFormSubmitMode(form);
    const requestBody = buildFormSubmitRequestBody(form, formElements);
    if (mode === "createMany") {
      if (!form.submit?.bulkObjectListKey || !Array.isArray(requestBody)) {
        toast.error(t("Bulk create requires an object list"));
        return;
      }
      await createManyMutation.mutateAsync(
        requestBody as Array<Partial<DynamicRecord>>,
      );
    } else if (mode === "workflow") {
      if (!form.submit?.workflowSchema || !form.submit.workflowName) {
        toast.error(t("Workflow configuration is incomplete"));
        return;
      }
      const record = (requestBody as { record: Record<string, unknown> }).record;
      await executeWorkflowMutation.mutateAsync({
        workflowName: form.submit.workflowName,
        workflowSchema: form.submit.workflowSchema,
        record,
      });
    } else {
      await createMutation.mutateAsync(
        buildFormSubmitPayload(form, formElements) as Partial<DynamicRecord>,
      );
    }
    setFormElements(buildInitialFormState(form));
    setEditing(null);
    setErrors({});
    toast.success(t("Saved"));
  };

  const getFieldWidthClass = (field?: FormFieldConfig) =>
    widthClasses[field?.width || "full"];

  const isInputVisible = (input: (typeof inputs)[number]) =>
    !input.isDisabled &&
    !isFormConditionMet(input.disabledCondition, formElements);

  const bodyAreas = new Set<FormAreaKey>([
    ...inputs
      .filter(isInputVisible)
      .map((input) => fieldMap.get(input.formKey))
      .filter((field): field is FormFieldConfig => !!field)
      .map(getFieldArea),
    ...(form.objectLists || []).map(getObjectListArea),
  ]);

  const resolveActionArea = (action: FormActionConfig): FormAreaKey => {
    const requestedArea = action.area || "bottom";
    if (bodyAreas.has(requestedArea)) return requestedArea;

    if (action.kind === "addObject") {
      const sourceField = (action.sourceFields || [])
        .map((key) => fieldMap.get(key))
        .find(Boolean);
      if (sourceField) return getFieldArea(sourceField);
    }

    if (action.kind === "submit") {
      const objectListArea = form.objectLists?.[0]
        ? getObjectListArea(form.objectLists[0])
        : undefined;
      if (objectListArea) return objectListArea;
    }

    return bodyAreas.has("left")
      ? "left"
      : bodyAreas.has("main")
        ? "main"
        : Array.from(bodyAreas)[0] || "main";
  };

  const renderArea = (area: FormAreaKey) => {
    const areaConfig = form.layout?.areas?.find(
      (candidate) => candidate.key === area,
    );
    const areaInputs = inputs.filter((input) => {
      const field = fieldMap.get(input.formKey);
      return field && getFieldArea(field) === area && isInputVisible(input);
    });
    const areaLists = (form.objectLists || []).filter(
      (objectList) => getObjectListArea(objectList) === area,
    );
    const areaActions = [
      ...addActions,
      ...(submitAction ? [submitAction] : []),
    ].filter((action) => resolveActionArea(action) === area);
    if (!areaInputs.length && !areaLists.length && !areaActions.length)
      return null;
    const hasBody = areaInputs.length > 0 || areaLists.length > 0;
    return (
      <section
        key={area}
        className={`${getAreaClassName(area)} overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm ${areaConfig?.className || ""}`}
      >
        {areaConfig?.title && (
          <header className="border-b border-neutral-100 px-5 py-4 sm:px-6">
            <h3 className="text-base font-semibold text-neutral-950">
              {areaConfig.title}
            </h3>
          </header>
        )}
        {hasBody && (
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            {areaInputs.length > 0 && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                {areaInputs.map((input) => (
                  <div
                    key={input.formKey}
                    className={getFieldWidthClass(fieldMap.get(input.formKey))}
                  >
                    <DynamicFormField
                      input={{
                        ...filterFormInputOptions(input, formElements),
                        required:
                          input.required ||
                          isFormConditionMet(
                            input.requiredCondition,
                            formElements,
                          ),
                      }}
                      formElements={formElements}
                      error={errors[input.formKey]}
                      onChange={updateField}
                    />
                  </div>
                ))}
              </div>
            )}
            {areaLists.length > 0 && (
              <div className={areaInputs.length > 0 ? "mt-6" : ""}>
                {areaLists.map((objectList) => (
                  <DynamicFormObjectList
                    key={objectList.key}
                    config={objectList}
                    items={normalizeObjectListValue(
                      formElements[objectList.key],
                    )}
                    editingIndex={
                      editing?.listKey === objectList.key
                        ? editing.index
                        : undefined
                    }
                    onEdit={(item, index) =>
                      handleEditObject(objectList, item, index)
                    }
                    onRemove={(index) => {
                      setFormElements((current) => ({
                        ...current,
                        [objectList.key]: removeObjectListItem(
                          current[objectList.key],
                          index,
                        ),
                      }));
                      if (
                        editing?.listKey === objectList.key &&
                        editing.index === index
                      ) {
                        setEditing(null);
                      }
                    }}
                    onAdjust={(index, field, delta, min, max) =>
                      setFormElements((current) => ({
                        ...current,
                        [objectList.key]: adjustObjectListNumber(
                          current[objectList.key],
                          index,
                          field,
                          delta,
                          min,
                          max,
                        ),
                      }))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {areaActions.length > 0 && (
          <footer
            className={`flex flex-wrap justify-end gap-2 bg-neutral-50/70 px-5 py-4 sm:px-6 ${hasBody || areaConfig?.title ? "border-t border-neutral-100" : ""}`}
          >
            {areaActions.map((action, index) =>
              action.kind === "addObject" ? (
                <GenericButton
                  key={`${action.kind}-${action.targetObjectList}-${index}`}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAddObject(action)}
                >
                  {editing?.listKey === action.targetObjectList
                    ? t("Save Item")
                    : t(action.buttonName || action.label || "Add Item")}
                </GenericButton>
              ) : (
                <GenericButton
                  key={`${action.kind}-${index}`}
                  variant="primary"
                  size="lg"
                    isLoading={isSubmitPending}
                  onClick={handleSubmit}
                >
                  {t(
                    action.buttonName ||
                      action.label ||
                      form.submit?.buttonName ||
                      "Save",
                  )}
                </GenericButton>
              ),
            )}
          </footer>
        )}
      </section>
    );
  };

  if (!form.schemaName) {
    return (
      <div className="border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        {t("Form component requires schema configuration")}
      </div>
    );
  }

  const columns = form.layout?.columns || 2;
  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 ">
      <h2 className="mb-6 text-2xl font-semibold text-neutral-950">
        {form.title || title || t("Form")}
      </h2>
      <div
        className={`grid grid-cols-1 items-start gap-5 ${columnClasses[columns]}`}
      >
        {areaOrder.map(renderArea)}
      </div>
    </div>
  );
};

export default DynamicForm;
