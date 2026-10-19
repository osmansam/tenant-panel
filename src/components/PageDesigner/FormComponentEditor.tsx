import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  FormAreaKey,
  FormComponentConfig,
  FormFieldConfig,
  FormObjectActionConfig,
  FormObjectListConfig,
  FormSubmitMode,
} from "../../types/page";
import { buildFormSubmitRequestPreview } from "../../utils/formConfig";
import { ContainerModel, Field } from "../../utils/api/container";
import { Checkbox, Input, Select, type SelectOption } from "../ui";
import FormFieldEditor from "./FormFieldEditor";
import {
  addDiscountTier,
  addFieldMapping,
  addItemCalculation,
  addSummary,
  getAvailableCalculationInputs,
  removeFieldMapping,
  removeDiscountTier,
  removeItemCalculation,
  updateFieldMapping,
  updateDiscountTier,
  updateItemCalculation,
  validateDesignerCalculations,
} from "./formCalculationEditor";

type Props = {
  value: FormComponentConfig;
  schemaFields: Field[];
  containers: ContainerModel[];
  onChange: (value: FormComponentConfig) => void;
};

type ScalarOption = SelectOption<string | number>;
const ScalarSelect = ({ label, value, options, disabled, onChange }: {
  label: string;
  value: string | number;
  options: readonly ScalarOption[];
  disabled?: boolean;
  onChange: (value: string | number) => void;
}) => (
  <Select<ScalarOption>
    value={options.find((option) => Object.is(option.value, value)) || null}
    options={options}
    disabled={disabled}
    onChange={(selected) => {
      const option = selected as ScalarOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
  />
);

const FORM_AREAS: { value: FormAreaKey; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "main", label: "Main" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
];

const OBJECT_ACTION_KINDS: {
  value: FormObjectActionConfig["kind"];
  label: string;
}[] = [
  { value: "editObject", label: "Edit" },
  { value: "removeObject", label: "Remove" },
  { value: "increment", label: "Increase" },
  { value: "decrement", label: "Decrease" },
];

const fieldLabel = (field: Field) => field.frontend?.displayName || field.name;

const FieldPicker = ({
  fields,
  selected,
  onChange,
}: {
  fields: Field[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) => (
  <div className="grid max-h-40 grid-cols-1 gap-1 overflow-y-auto rounded border border-ui-border bg-white p-2 sm:grid-cols-2">
    {fields.map((field) => (
      <label key={field.name} className="flex items-center gap-2 text-xs text-ui-foreground">
        <Checkbox
          checked={selected.includes(field.name)}
          onChange={(event) =>
            onChange(
              event.target.checked
                ? [...selected, field.name]
                : selected.filter((name) => name !== field.name),
            )
          }
        />
        <span className="truncate">{fieldLabel(field)}</span>
      </label>
    ))}
  </div>
);

const FormComponentEditor = ({
  value,
  schemaFields,
  containers,
  onChange,
}: Props) => {
  const submitMode = value.submit?.mode || "create";
  const workflowOptions = containers.flatMap((container) =>
    (container.workflows || [])
      .filter((workflow) => workflow.isActive !== false)
      .map((workflow) => ({ schemaName: container.schemaName, workflow })),
  );
  const workflowBodyOptions = [
    { key: "items", label: "Items" },
    ...(value.objectLists || [])
      .filter((objectList) => objectList.key !== "items")
      .map((objectList) => ({
        key: objectList.key,
        label: objectList.title || objectList.key,
      })),
  ];
  const requestPreview = buildFormSubmitRequestPreview(value);
  const calculationErrors = validateDesignerCalculations(value);

  const addCustomField = () => {
    const index = (value.fields || []).length + 1;
    onChange({
      ...value,
      fields: [
        ...(value.fields || []),
        {
          formKey: `field${index}`,
          type: "text",
          formKeyType: "string",
          label: `Field ${index}`,
          placeholder: "",
          required: false,
          area: "main",
          width: "full",
          order: index,
        },
      ],
    });
  };

  const updateField = (index: number, updates: Partial<FormFieldConfig>) => {
    const fields = [...(value.fields || [])];
    fields[index] = { ...fields[index], ...updates };
    onChange({ ...value, fields });
  };

  const updateObjectList = (
    index: number,
    updates: Partial<FormObjectListConfig>,
  ) => {
    onChange({
      ...value,
      objectLists: (value.objectLists || []).map((objectList, itemIndex) =>
        itemIndex === index ? { ...objectList, ...updates } : objectList,
      ),
    });
  };

  const addObjectList = () => {
    const index = (value.objectLists || []).length + 1;
    onChange({
      ...value,
      objectLists: [
        ...(value.objectLists || []),
        {
          key: index === 1 ? "items" : `items${index}`,
          title: index === 1 ? "Items" : `Items ${index}`,
          area: "right",
          source: "embedded",
          itemFields: [],
          display: {},
          addAction: {
            kind: "addObject",
            label: "Add Item",
            area: "left",
            sourceFields: [],
            clearSourceFields: [],
            enabled: true,
          },
          actions: [
            { kind: "editObject", position: "end", label: "Edit" },
            { kind: "removeObject", position: "end", label: "Remove" },
          ],
        },
      ],
    });
  };

  const updateObjectAction = (
    listIndex: number,
    actionIndex: number,
    updates: Partial<FormObjectActionConfig>,
  ) => {
    const objectList = (value.objectLists || [])[listIndex];
    const actions = [...(objectList.actions || [])];
    actions[actionIndex] = { ...actions[actionIndex], ...updates };
    updateObjectList(listIndex, { actions });
  };

  const updateAreaTitle = (key: FormAreaKey, title: string) => {
    const areas = value.layout?.areas || [];
    const existingArea = areas.find((area) => area.key === key);
    const nextAreas = existingArea
      ? areas.map((area) => (area.key === key ? { ...area, title } : area))
      : title
        ? [...areas, { key, title, order: areas.length + 1 }]
        : areas;
    onChange({
      ...value,
      layout: {
        ...value.layout,
        variant: "page",
        areas: nextAreas,
      },
    });
  };

  return (
    <div className="space-y-5 rounded-xl border border-ui-border bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-ui-foreground">Form Builder</h4>
          <p className="mt-1 text-xs text-ui-muted">
            Arrange schema fields and configure embedded object lists.
          </p>
        </div>
        <button
          type="button"
          onClick={addObjectList}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-ui-border px-3 text-sm font-medium text-ui-foreground hover:bg-ui-surface-subtle"
        >
          <FiPlus /> Add List
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <label className="text-xs font-semibold text-ui-muted">
          Form title
          <Input
            value={value.title || ""}
            onChange={(event) => onChange({ ...value, title: event.target.value })}
            className="mt-1 w-full font-normal"
          />
        </label>
        <label className="text-xs font-semibold text-ui-muted">
          Columns
          <ScalarSelect
            label="Columns"
            value={value.layout?.columns || 2}
            onChange={(columns) =>
              onChange({
                ...value,
                layout: {
                  ...value.layout,
                  variant: "page",
                  columns: Number(columns) as 1 | 2 | 3,
                },
              })
            }
            options={[1, 2, 3].map((column) => ({ value: column, label: String(column) }))}
          />
        </label>
        <label className="text-xs font-semibold text-ui-muted">
          Save button
          <Input
            value={value.actions?.find((action) => action.kind === "submit")?.buttonName || ""}
            onChange={(event) =>
              onChange({
                ...value,
                actions: (value.actions || []).map((action) =>
                  action.kind === "submit"
                    ? { ...action, buttonName: event.target.value }
                    : action,
                ),
              })
            }
            className="mt-1 w-full font-normal"
          />
        </label>
        <label className="text-xs font-semibold text-ui-muted">
          Save area
          <ScalarSelect
            label="Save area"
            value={value.actions?.find((action) => action.kind === "submit")?.area || "right"}
            onChange={(area) =>
              onChange({
                ...value,
                actions: (value.actions || []).map((action) =>
                  action.kind === "submit"
                    ? { ...action, area: area as FormAreaKey }
                    : action,
                ),
              })
            }
            options={FORM_AREAS}
          />
        </label>
      </div>

      <section className="space-y-4 border-y border-ui-border py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-xs font-semibold text-ui-muted">
            Submit function
            <ScalarSelect
              label="Submit function"
              value={submitMode}
              onChange={(mode) =>
                onChange({
                  ...value,
                  submit: {
                    ...value.submit,
                    mode: mode as FormSubmitMode,
                  },
                })
              }
              options={[{ value: "create", label: "Create" }, { value: "createMany", label: "Bulk Create" }, { value: "workflow", label: "Workflow" }]}
            />
          </label>

          {submitMode === "createMany" && (
            <label className="text-xs font-semibold text-ui-muted">
              Bulk object list
              <ScalarSelect
                label="Bulk object list"
                value={value.submit?.bulkObjectListKey || ""}
                onChange={(bulkObjectListKey) =>
                  onChange({
                    ...value,
                    submit: {
                      ...value.submit,
                      mode: "createMany",
                      bulkObjectListKey: String(bulkObjectListKey),
                    },
                  })
                }
                options={[{ value: "", label: "Select object list" }, ...(value.objectLists || []).map((objectList) => ({ value: objectList.key, label: objectList.title || objectList.key }))]}
              />
            </label>
          )}

          {submitMode === "workflow" && (
            <>
              <label className="text-xs font-semibold text-ui-muted">
                Workflow body
                <ScalarSelect
                  label="Workflow body"
                  value={value.submit?.bulkObjectListKey || ""}
                  onChange={(bulkObjectListKey) =>
                    onChange({
                      ...value,
                      submit: {
                        ...value.submit,
                        mode: "workflow",
                        bulkObjectListKey: String(bulkObjectListKey),
                      },
                    })
                  }
                  options={[{ value: "", label: "Record object" }, ...workflowBodyOptions.map((option) => ({ value: option.key, label: option.label }))]}
                />
              </label>

              <label className="text-xs font-semibold text-ui-muted">
                Workflow
                <ScalarSelect
                  label="Workflow"
                  value={
                    value.submit?.workflowSchema && value.submit.workflowName
                      ? `${value.submit.workflowSchema}::${value.submit.workflowName}`
                      : ""
                  }
                  onChange={(workflowValue) => {
                    const [workflowSchema, workflowName] =
                      String(workflowValue).split("::");
                    onChange({
                      ...value,
                      submit: {
                        ...value.submit,
                        mode: "workflow",
                        workflowSchema,
                        workflowName,
                      },
                    });
                  }}
                  options={[{ value: "", label: "Select workflow" }, ...workflowOptions.map(({ schemaName, workflow }) => ({ value: `${schemaName}::${workflow.name}`, label: `${schemaName} / ${workflow.name}` }))]}
                />
              </label>
            </>
          )}
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-ui-muted">
            Request body preview
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg border border-ui-ink bg-ui-ink-hover p-4 text-xs leading-5 text-white">
            {JSON.stringify(requestPreview, null, 2)}
          </pre>
        </div>
      </section>

      <div>
        <h5 className="mb-3 text-xs font-semibold uppercase text-ui-muted">
          Area headers
        </h5>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FORM_AREAS.map((area) => (
            <label key={area.value} className="text-xs font-semibold text-ui-muted">
              {area.label}
              <Input
                value={
                  value.layout?.areas?.find(
                    (candidate) => candidate.key === area.value,
                  )?.title || ""
                }
                onChange={(event) =>
                  updateAreaTitle(area.value, event.target.value)
                }
                className="mt-1 w-full font-normal"
                placeholder="Optional"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-semibold uppercase text-ui-muted">Fields</h5>
          <button
            type="button"
            onClick={addCustomField}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-ui-border px-2 text-xs hover:bg-ui-surface-subtle"
          >
            <FiPlus /> Add Field
          </button>
        </div>
        {(value.fields || []).map((field, index) => (
          <FormFieldEditor
            key={`${field.formKey}-${index}`}
            field={field}
            index={index}
            containers={containers}
            formFields={value.fields || []}
            onChange={(updates) => updateField(index, updates)}
            onRemove={() =>
              onChange({
                ...value,
                fields: (value.fields || []).filter(
                  (_item, itemIndex) => itemIndex !== index,
                ),
              })
            }
          />
        ))}
      </div>

      <div className="space-y-4">
        {(value.objectLists || []).map((objectList, listIndex) => (
          <section key={`${objectList.key}-${listIndex}`} className="border-t border-ui-border pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm font-semibold text-ui-foreground">Object List {listIndex + 1}</h5>
              <button
                type="button"
                title="Remove list"
                aria-label="Remove list"
                onClick={() =>
                  onChange({
                    ...value,
                    objectLists: (value.objectLists || []).filter((_item, index) => index !== listIndex),
                  })
                }
                className="inline-flex h-8 w-8 items-center justify-center text-ui-danger hover:bg-ui-danger-subtle"
              >
                <FiTrash2 />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="rounded-lg border border-ui-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-ui-foreground">Source field snapshots</div>
                    <div className="text-[11px] text-ui-muted">Copy product fields such as price into each cart item.</div>
                  </div>
                  <button type="button" onClick={() => onChange(addFieldMapping(value, listIndex))} className="inline-flex h-8 items-center gap-1 rounded-md border border-ui-border px-2 text-xs"><FiPlus /> Mapping</button>
                </div>
                <div className="space-y-2">
                  {(objectList.fieldMappings || []).map((mapping, mappingIndex) => (
                    <div key={mappingIndex} className="grid grid-cols-1 gap-2 md:grid-cols-5">
                      <ScalarSelect label={`Mapping ${mappingIndex + 1} source select`} value={mapping.sourceFormKey} onChange={(sourceFormKey) => onChange(updateFieldMapping(value, listIndex, mappingIndex, { sourceFormKey: String(sourceFormKey) }))} options={[{ value: "", label: "Source select" }, ...(value.fields || []).filter((field) => field.type === "select" && field.optionsSource === "schema").map((field) => ({ value: field.formKey, label: field.label || field.formKey }))]} />
                      <Input value={mapping.sourceField} onChange={(event) => onChange(updateFieldMapping(value, listIndex, mappingIndex, { sourceField: event.target.value }))} className="text-xs" placeholder="Source field (price)" />
                      <Input value={mapping.targetField} onChange={(event) => onChange(updateFieldMapping(value, listIndex, mappingIndex, { targetField: event.target.value }))} className="text-xs" placeholder="Item field (unitPrice)" />
                      <label className="flex items-center gap-2 text-xs text-ui-muted"><Checkbox checked={mapping.required ?? false} onChange={(event) => onChange(updateFieldMapping(value, listIndex, mappingIndex, { required: event.target.checked }))} /> Required</label>
                      <button type="button" aria-label="Remove mapping" onClick={() => onChange(removeFieldMapping(value, listIndex, mappingIndex))} className="inline-flex h-8 w-8 items-center justify-center text-ui-danger"><FiTrash2 /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-ui-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-ui-foreground">Item calculations</div>
                    <div className="text-[11px] text-ui-muted">Calculate fields such as unitPrice × quantity.</div>
                  </div>
                  <button type="button" onClick={() => onChange(addItemCalculation(value, listIndex))} className="inline-flex h-8 items-center gap-1 rounded-md border border-ui-border px-2 text-xs"><FiPlus /> Calculation</button>
                </div>
                <div className="space-y-2">
                  {(objectList.itemCalculations || []).map((calculation, calculationIndex) => (
                    <div key={calculationIndex} className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                      <ScalarSelect label={`Calculation ${calculationIndex + 1} operation`} value={calculation.operation} onChange={(nextOperation) => {
                        const operation = nextOperation as typeof calculation.operation;
                        onChange(updateItemCalculation(value, listIndex, calculationIndex, operation === "quantityDiscount" ? {
                          operation,
                          originalTargetField: calculation.originalTargetField || "originalLineTotal",
                          discountTiers: calculation.discountTiers?.length ? calculation.discountTiers : [{ minimumQuantity: 6, discountPercentage: 30 }],
                          minimumQuantity: undefined,
                          discountPercentage: undefined,
                        } : {
                          operation,
                          originalTargetField: undefined,
                          discountTiers: undefined,
                          minimumQuantity: undefined,
                          discountPercentage: undefined,
                        }));
                      }} options={[{ value: "multiply", label: "Multiply" }, { value: "quantityDiscount", label: "Quantity discount" }]} />
                      {[0, 1].map((inputIndex) => {
                        const options = getAvailableCalculationInputs(value, listIndex, calculationIndex);
                        const groups = ["Item fields", "Additional option data", "Calculated fields"] as const;
                        return (
                          <ScalarSelect key={inputIndex} label={`Calculation input ${inputIndex + 1}`} value={calculation.inputs[inputIndex] || ""} onChange={(nextInput) => {
                            const inputs = [...calculation.inputs];
                            inputs[inputIndex] = String(nextInput);
                            onChange(updateItemCalculation(value, listIndex, calculationIndex, { inputs }));
                          }} options={[{ value: "", label: "Select input" }, ...groups.flatMap((group) => options.filter((option) => option.group === group).map((option) => ({ value: option.value, label: `${group}: ${option.label}` })))]} />
                        );
                      })}
                      {calculation.operation === "quantityDiscount" && <>
                        <Input value={calculation.originalTargetField || ""} onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { originalTargetField: event.target.value }))} className="text-xs" placeholder="Original total field" aria-label="Original total field" />
                        {calculation.discountTiers ? (
                          <div className="space-y-2 rounded-md border border-ui-border bg-ui-surface-subtle p-2 md:col-span-2 xl:col-span-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-ui-muted">Discount tiers</span>
                              <button type="button" onClick={() => onChange(addDiscountTier(value, listIndex, calculationIndex))} className="inline-flex h-7 items-center gap-1 rounded-md border border-ui-border bg-white px-2 text-[11px] font-medium text-ui-foreground"><FiPlus /> Add tier</button>
                            </div>
                            {calculation.discountTiers.map((tier, tierIndex) => (
                              <div key={tierIndex} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                                <Input type="number" min={0.000001} value={tier.minimumQuantity} onChange={(event) => onChange(updateDiscountTier(value, listIndex, calculationIndex, tierIndex, { minimumQuantity: Number(event.target.value) }))} className="text-xs" placeholder="Minimum quantity" aria-label={`Tier ${tierIndex + 1} minimum quantity`} />
                                <Input type="number" min={0.000001} max={100} value={tier.discountPercentage} onChange={(event) => onChange(updateDiscountTier(value, listIndex, calculationIndex, tierIndex, { discountPercentage: Number(event.target.value) }))} className="text-xs" placeholder="Discount %" aria-label={`Tier ${tierIndex + 1} discount percentage`} />
                                <button type="button" aria-label={`Remove discount tier ${tierIndex + 1}`} onClick={() => onChange(removeDiscountTier(value, listIndex, calculationIndex, tierIndex))} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ui-danger hover:bg-ui-danger-subtle"><FiTrash2 /></button>
                              </div>
                            ))}
                          </div>
                        ) : <>
                          <Input type="number" min={0.000001} value={calculation.minimumQuantity ?? 6} onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { minimumQuantity: Number(event.target.value) }))} className="text-xs" placeholder="Minimum quantity" aria-label="Minimum quantity" />
                          <Input type="number" min={0.000001} max={100} value={calculation.discountPercentage ?? 30} onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { discountPercentage: Number(event.target.value) }))} className="text-xs" placeholder="Discount %" aria-label="Discount percentage" />
                        </>}
                        <label className="space-y-1 md:col-span-2 xl:col-span-4">
                          <span className="text-xs font-medium text-ui-foreground">Discount message</span>
                          <Input
                            value={calculation.discountMessage || ""}
                            onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { discountMessage: event.target.value }))}
                            className="w-full text-xs"
                            placeholder="%{{discountPercentage}} indirim için {{missingQuantity}} ürün daha ekleyin"
                          />
                          <span className="block text-[11px] text-ui-muted">
                            {"Use {{discountPercentage}} for the next discount and {{missingQuantity}} for the number of items to add. Leave empty for the default message."}
                          </span>
                        </label>
                      </>}
                      <Input value={calculation.targetField} onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { targetField: event.target.value }))} className="text-xs" placeholder="lineTotal" />
                      <Input type="number" min={0} max={6} value={calculation.precision ?? 2} onChange={(event) => onChange(updateItemCalculation(value, listIndex, calculationIndex, { precision: Number(event.target.value) }))} className="text-xs" aria-label="Calculation precision" />
                      <button type="button" aria-label="Remove calculation" onClick={() => onChange(removeItemCalculation(value, listIndex, calculationIndex))} className="inline-flex h-8 w-8 items-center justify-center text-ui-danger"><FiTrash2 /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Input
                value={objectList.key}
                onChange={(event) => updateObjectList(listIndex, { key: event.target.value })}
                placeholder="items"
              />
              <Input
                value={objectList.title || ""}
                onChange={(event) => updateObjectList(listIndex, { title: event.target.value })}
                placeholder="List title"
              />
              <ScalarSelect
                label={`Object list ${listIndex + 1} area`}
                value={objectList.area || "right"}
                onChange={(area) => updateObjectList(listIndex, { area: area as FormAreaKey })}
                options={FORM_AREAS}
              />
              <Input
                value={objectList.addAction?.label || ""}
                onChange={(event) =>
                  updateObjectList(listIndex, {
                    addAction: { ...objectList.addAction!, kind: "addObject", label: event.target.value },
                  })
                }
                placeholder="Add button label"
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <label className="text-xs font-semibold text-ui-muted">
                Item/source fields
                <FieldPicker
                  fields={schemaFields}
                  selected={objectList.itemFields || []}
                  onChange={(fields) =>
                    updateObjectList(listIndex, {
                      itemFields: fields,
                      addAction: {
                        ...objectList.addAction!,
                        kind: "addObject",
                        sourceFields: fields,
                      },
                    })
                  }
                />
              </label>
              <label className="text-xs font-semibold text-ui-muted">
                Clear after add
                <FieldPicker
                  fields={schemaFields}
                  selected={objectList.addAction?.clearSourceFields || []}
                  onChange={(fields) =>
                    updateObjectList(listIndex, {
                      addAction: {
                        ...objectList.addAction!,
                        kind: "addObject",
                        clearSourceFields: fields,
                      },
                    })
                  }
                />
              </label>
              <div className="grid grid-cols-1 gap-2">
                <ScalarSelect
                  label={`Object list ${listIndex + 1} add action area`}
                  value={objectList.addAction?.area || "left"}
                  onChange={(area) =>
                    updateObjectList(listIndex, {
                      addAction: {
                        ...objectList.addAction!,
                        kind: "addObject",
                        area: area as FormAreaKey,
                      },
                    })
                  }
                  options={FORM_AREAS.map((area) => ({ ...area, label: `Add action: ${area.label}` }))}
                />
                <Input
                  value={objectList.display?.primaryField || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, primaryField: event.target.value },
                    })
                  }
                  placeholder="Primary field, e.g. productLabel"
                />
                <Input
                  value={objectList.display?.secondaryTemplate || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, secondaryTemplate: event.target.value },
                    })
                  }
                  placeholder="Secondary template, e.g. {{quantity}} items"
                />
                <Input
                  value={objectList.display?.imageField || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, imageField: event.target.value },
                    })
                  }
                  placeholder="Image field"
                />
                <Input
                  value={objectList.display?.rightTemplate || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, rightTemplate: event.target.value },
                    })
                  }
                  placeholder="Right-side template, e.g. {{lineTotal}} TRY"
                />
              </div>
              <div className="mt-3 rounded-lg border border-ui-border p-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-ui-foreground">
                  <Checkbox
                    checked={Boolean(objectList.display?.priceComparison)}
                    onChange={(event) => updateObjectList(listIndex, {
                      display: {
                        ...objectList.display,
                        priceComparison: event.target.checked ? {
                          originalField: "originalLineTotal",
                          discountedField: "lineTotal",
                          currency: "TRY",
                          precision: 2,
                        } : undefined,
                      },
                    })}
                  />
                  Show original and discounted prices
                </label>
                {objectList.display?.priceComparison && (
                  <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-4">
                    <Input value={objectList.display.priceComparison.originalField} onChange={(event) => updateObjectList(listIndex, { display: { ...objectList.display, priceComparison: { ...objectList.display!.priceComparison!, originalField: event.target.value } } })} className="text-xs" placeholder="Original price field" aria-label="Original price field" />
                    <Input value={objectList.display.priceComparison.discountedField} onChange={(event) => updateObjectList(listIndex, { display: { ...objectList.display, priceComparison: { ...objectList.display!.priceComparison!, discountedField: event.target.value } } })} className="text-xs" placeholder="Discounted price field" aria-label="Discounted price field" />
                    <Input value={objectList.display.priceComparison.currency || ""} maxLength={3} onChange={(event) => updateObjectList(listIndex, { display: { ...objectList.display, priceComparison: { ...objectList.display!.priceComparison!, currency: event.target.value.toUpperCase() } } })} className="text-xs" placeholder="TRY" aria-label="Price currency" />
                    <Input type="number" min={0} max={6} value={objectList.display.priceComparison.precision ?? 2} onChange={(event) => updateObjectList(listIndex, { display: { ...objectList.display, priceComparison: { ...objectList.display!.priceComparison!, precision: Number(event.target.value) } } })} className="text-xs" aria-label="Price precision" />
                  </div>
                )}
              </div>
              <div className="mt-3 rounded-lg border border-ui-border p-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-ui-foreground">
                  <Checkbox
                    checked={Boolean(objectList.mergeOnAdd)}
                    onChange={(event) => updateObjectList(listIndex, {
                      mergeOnAdd: event.target.checked ? {
                        matchField: objectList.itemFields?.includes("productId") ? "productId" : objectList.itemFields?.[0] || "",
                        quantityField: objectList.itemFields?.includes("quantity") ? "quantity" : objectList.itemFields?.[1] || objectList.itemFields?.[0] || "",
                      } : undefined,
                    })}
                  />
                  Merge repeated items when adding
                </label>
                {objectList.mergeOnAdd && (
                  <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <ScalarSelect label="Merge match field" value={objectList.mergeOnAdd.matchField} onChange={(matchField) => updateObjectList(listIndex, { mergeOnAdd: { ...objectList.mergeOnAdd!, matchField: String(matchField) } })} options={[{ value: "", label: "Match field" }, ...(objectList.itemFields || []).map((field) => ({ value: field, label: field }))]} />
                    <ScalarSelect label="Merge quantity field" value={objectList.mergeOnAdd.quantityField} onChange={(quantityField) => updateObjectList(listIndex, { mergeOnAdd: { ...objectList.mergeOnAdd!, quantityField: String(quantityField) } })} options={[{ value: "", label: "Quantity field" }, ...(objectList.itemFields || []).map((field) => ({ value: field, label: field }))]} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ui-muted">Item actions</span>
                <button
                  type="button"
                  onClick={() =>
                    updateObjectList(listIndex, {
                      actions: [...(objectList.actions || []), { kind: "editObject", position: "end" }],
                    })
                  }
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-ui-border px-2 text-xs hover:bg-ui-surface-subtle"
                >
                  <FiPlus /> Add Action
                </button>
              </div>
              {(objectList.actions || []).map((action, actionIndex) => (
                <div key={`${action.kind}-${actionIndex}`} className="grid grid-cols-1 gap-2 md:grid-cols-7">
                  <ScalarSelect
                    label={`Action ${actionIndex + 1} kind`}
                    value={action.kind}
                    onChange={(kind) =>
                      updateObjectAction(listIndex, actionIndex, {
                        kind: kind as FormObjectActionConfig["kind"],
                      })
                    }
                    options={OBJECT_ACTION_KINDS}
                  />
                  <ScalarSelect
                    label={`Action ${actionIndex + 1} position`}
                    value={action.position || "end"}
                    onChange={(position) =>
                      updateObjectAction(listIndex, actionIndex, {
                        position: position as "start" | "end",
                      })
                    }
                    options={[{ value: "start", label: "Left" }, { value: "end", label: "Right" }]}
                  />
                  <Input value={action.label || ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { label: event.target.value })} className="text-xs" placeholder="Label" />
                  <Input value={action.field || ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { field: event.target.value })} className="text-xs" placeholder="Numeric field" />
                  <Input type="number" value={action.min ?? ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { min: event.target.value === "" ? undefined : Number(event.target.value) })} className="text-xs" placeholder="Min" />
                  <Input type="number" value={action.step ?? 1} onChange={(event) => updateObjectAction(listIndex, actionIndex, { step: Number(event.target.value) })} className="text-xs" placeholder="Step" />
                  <button type="button" title="Remove action" aria-label="Remove action" onClick={() => updateObjectList(listIndex, { actions: (objectList.actions || []).filter((_item, index) => index !== actionIndex) })} className="inline-flex h-8 w-8 items-center justify-center text-ui-danger hover:bg-ui-danger-subtle"><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-ui-border pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h5 className="text-sm font-semibold text-ui-foreground">Order summaries</h5>
            <p className="text-xs text-ui-muted">Display subtotal and total in a form area.</p>
          </div>
          <button type="button" onClick={() => onChange(addSummary(value))} className="inline-flex h-8 items-center gap-1 rounded-md border border-ui-border px-2 text-xs"><FiPlus /> Summary</button>
        </div>
        <div className="space-y-2">
          {(value.summaries || []).map((summary, summaryIndex) => {
            const updateSummary = (patch: Partial<typeof summary>) => onChange({ ...value, summaries: (value.summaries || []).map((item, index) => index === summaryIndex ? { ...item, ...patch } : item) });
            return <div key={summaryIndex} className="grid grid-cols-2 gap-2 rounded-lg border border-ui-border p-3 md:grid-cols-10">
              <Input value={summary.key} onChange={(event) => updateSummary({ key: event.target.value })} className="text-xs" placeholder="Key" />
              <Input value={summary.label || ""} onChange={(event) => updateSummary({ label: event.target.value })} className="text-xs" placeholder="Label" />
              <ScalarSelect label={`Summary ${summaryIndex + 1} operation`} value={summary.operation} onChange={(operation) => updateSummary({ operation: operation as "sum" | "copy" })} options={[{ value: "sum", label: "Sum list" }, { value: "copy", label: "Copy summary" }]} />
              <ScalarSelect label={`Summary ${summaryIndex + 1} list`} value={summary.objectListKey || ""} disabled={summary.operation !== "sum"} onChange={(objectListKey) => updateSummary({ objectListKey: String(objectListKey) })} options={[{ value: "", label: "List" }, ...(value.objectLists || []).map((list) => ({ value: list.key, label: list.title || list.key }))]} />
              <Input value={summary.sourceField} onChange={(event) => updateSummary({ sourceField: event.target.value })} className="text-xs" placeholder="Source field" />
              <Input value={summary.targetField} onChange={(event) => updateSummary({ targetField: event.target.value })} className="text-xs" placeholder="Target field" />
              <ScalarSelect label={`Summary ${summaryIndex + 1} area`} value={summary.area || "right"} onChange={(area) => updateSummary({ area: area as FormAreaKey })} options={FORM_AREAS} />
              <Input maxLength={3} value={summary.format?.currency || "TRY"} onChange={(event) => updateSummary({ format: { ...summary.format, style: "currency", currency: event.target.value.toUpperCase() } })} className="text-xs" placeholder="TRY" />
              <Input type="number" min={0} max={6} value={summary.format?.precision ?? 2} onChange={(event) => updateSummary({ format: { ...summary.format, precision: Number(event.target.value) } })} className="text-xs" aria-label="Summary precision" />
              <button type="button" aria-label="Remove summary" onClick={() => onChange({ ...value, summaries: (value.summaries || []).filter((_item, index) => index !== summaryIndex) })} className="inline-flex h-8 w-8 items-center justify-center text-ui-danger"><FiTrash2 /></button>
            </div>;
          })}
        </div>
        {calculationErrors.length > 0 && <div role="alert" className="mt-3 rounded-md border border-ui-danger/30 bg-ui-danger-subtle p-3 text-xs text-ui-danger"><div className="font-semibold">Fix calculation configuration before saving:</div><ul className="mt-1 list-disc pl-5">{calculationErrors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
      </section>
    </div>
  );
};

export default FormComponentEditor;
