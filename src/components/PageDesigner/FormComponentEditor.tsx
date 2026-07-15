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
import FormFieldEditor from "./FormFieldEditor";

type Props = {
  value: FormComponentConfig;
  schemaFields: Field[];
  containers: ContainerModel[];
  onChange: (value: FormComponentConfig) => void;
};

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
  <div className="grid max-h-40 grid-cols-1 gap-1 overflow-y-auto rounded border border-neutral-200 bg-white p-2 sm:grid-cols-2">
    {fields.map((field) => (
      <label key={field.name} className="flex items-center gap-2 text-xs text-neutral-700">
        <input
          type="checkbox"
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
    <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900">Form Builder</h4>
          <p className="mt-1 text-xs text-neutral-500">
            Arrange schema fields and configure embedded object lists.
          </p>
        </div>
        <button
          type="button"
          onClick={addObjectList}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-300 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <FiPlus /> Add List
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <label className="text-xs font-semibold text-neutral-600">
          Form title
          <input
            value={value.title || ""}
            onChange={(event) => onChange({ ...value, title: event.target.value })}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal"
          />
        </label>
        <label className="text-xs font-semibold text-neutral-600">
          Columns
          <select
            value={value.layout?.columns || 2}
            onChange={(event) =>
              onChange({
                ...value,
                layout: {
                  ...value.layout,
                  variant: "page",
                  columns: Number(event.target.value) as 1 | 2 | 3,
                },
              })
            }
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-neutral-600">
          Save button
          <input
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
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal"
          />
        </label>
        <label className="text-xs font-semibold text-neutral-600">
          Save area
          <select
            value={value.actions?.find((action) => action.kind === "submit")?.area || "right"}
            onChange={(event) =>
              onChange({
                ...value,
                actions: (value.actions || []).map((action) =>
                  action.kind === "submit"
                    ? { ...action, area: event.target.value as FormAreaKey }
                    : action,
                ),
              })
            }
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal"
          >
            {FORM_AREAS.map((area) => (
              <option key={area.value} value={area.value}>{area.label}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="space-y-4 border-y border-neutral-200 py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-xs font-semibold text-neutral-600">
            Submit function
            <select
              value={submitMode}
              onChange={(event) =>
                onChange({
                  ...value,
                  submit: {
                    ...value.submit,
                    mode: event.target.value as FormSubmitMode,
                  },
                })
              }
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10"
            >
              <option value="create">Create</option>
              <option value="createMany">Bulk Create</option>
              <option value="workflow">Workflow</option>
            </select>
          </label>

          {submitMode === "createMany" && (
            <label className="text-xs font-semibold text-neutral-600">
              Bulk object list
              <select
                value={value.submit?.bulkObjectListKey || ""}
                onChange={(event) =>
                  onChange({
                    ...value,
                    submit: {
                      ...value.submit,
                      mode: "createMany",
                      bulkObjectListKey: event.target.value,
                    },
                  })
                }
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10"
              >
                <option value="">Select object list</option>
                {(value.objectLists || []).map((objectList) => (
                  <option key={objectList.key} value={objectList.key}>
                    {objectList.title || objectList.key}
                  </option>
                ))}
              </select>
            </label>
          )}

          {submitMode === "workflow" && (
            <>
              <label className="text-xs font-semibold text-neutral-600">
                Workflow body
                <select
                  value={value.submit?.bulkObjectListKey || ""}
                  onChange={(event) =>
                    onChange({
                      ...value,
                      submit: {
                        ...value.submit,
                        mode: "workflow",
                        bulkObjectListKey: event.target.value,
                      },
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10"
                >
                  <option value="">Record object</option>
                  {workflowBodyOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-semibold text-neutral-600">
                Workflow
                <select
                  value={
                    value.submit?.workflowSchema && value.submit.workflowName
                      ? `${value.submit.workflowSchema}::${value.submit.workflowName}`
                      : ""
                  }
                  onChange={(event) => {
                    const [workflowSchema, workflowName] =
                      event.target.value.split("::");
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
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10"
                >
                  <option value="">Select workflow</option>
                  {workflowOptions.map(({ schemaName, workflow }) => (
                    <option
                      key={`${schemaName}::${workflow.name}`}
                      value={`${schemaName}::${workflow.name}`}
                    >
                      {schemaName} / {workflow.name}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-neutral-600">
            Request body preview
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-xs leading-5 text-neutral-100">
            {JSON.stringify(requestPreview, null, 2)}
          </pre>
        </div>
      </section>

      <div>
        <h5 className="mb-3 text-xs font-semibold uppercase text-neutral-500">
          Area headers
        </h5>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FORM_AREAS.map((area) => (
            <label key={area.value} className="text-xs font-semibold text-neutral-600">
              {area.label}
              <input
                value={
                  value.layout?.areas?.find(
                    (candidate) => candidate.key === area.value,
                  )?.title || ""
                }
                onChange={(event) =>
                  updateAreaTitle(area.value, event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm font-normal outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10"
                placeholder="Optional"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-semibold uppercase text-neutral-500">Fields</h5>
          <button
            type="button"
            onClick={addCustomField}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 px-2 text-xs hover:bg-neutral-50"
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
          <section key={`${objectList.key}-${listIndex}`} className="border-t border-neutral-200 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm font-semibold text-neutral-800">Object List {listIndex + 1}</h5>
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
                className="inline-flex h-8 w-8 items-center justify-center text-red-600 hover:bg-red-50"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <input
                value={objectList.key}
                onChange={(event) => updateObjectList(listIndex, { key: event.target.value })}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                placeholder="items"
              />
              <input
                value={objectList.title || ""}
                onChange={(event) => updateObjectList(listIndex, { title: event.target.value })}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                placeholder="List title"
              />
              <select
                value={objectList.area || "right"}
                onChange={(event) => updateObjectList(listIndex, { area: event.target.value as FormAreaKey })}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
              >
                {FORM_AREAS.map((area) => (
                  <option key={area.value} value={area.value}>{area.label}</option>
                ))}
              </select>
              <input
                value={objectList.addAction?.label || ""}
                onChange={(event) =>
                  updateObjectList(listIndex, {
                    addAction: { ...objectList.addAction!, kind: "addObject", label: event.target.value },
                  })
                }
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                placeholder="Add button label"
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <label className="text-xs font-semibold text-neutral-600">
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
              <label className="text-xs font-semibold text-neutral-600">
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
                <select
                  value={objectList.addAction?.area || "left"}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      addAction: {
                        ...objectList.addAction!,
                        kind: "addObject",
                        area: event.target.value as FormAreaKey,
                      },
                    })
                  }
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                >
                  {FORM_AREAS.map((area) => (
                    <option key={area.value} value={area.value}>Add action: {area.label}</option>
                  ))}
                </select>
                <input
                  value={objectList.display?.primaryField || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, primaryField: event.target.value },
                    })
                  }
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Primary field, e.g. productLabel"
                />
                <input
                  value={objectList.display?.secondaryTemplate || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, secondaryTemplate: event.target.value },
                    })
                  }
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Secondary template, e.g. {{quantity}} items"
                />
                <input
                  value={objectList.display?.imageField || ""}
                  onChange={(event) =>
                    updateObjectList(listIndex, {
                      display: { ...objectList.display, imageField: event.target.value },
                    })
                  }
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Image field"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">Item actions</span>
                <button
                  type="button"
                  onClick={() =>
                    updateObjectList(listIndex, {
                      actions: [...(objectList.actions || []), { kind: "editObject", position: "end" }],
                    })
                  }
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 px-2 text-xs hover:bg-neutral-50"
                >
                  <FiPlus /> Add Action
                </button>
              </div>
              {(objectList.actions || []).map((action, actionIndex) => (
                <div key={`${action.kind}-${actionIndex}`} className="grid grid-cols-1 gap-2 md:grid-cols-7">
                  <select
                    value={action.kind}
                    onChange={(event) =>
                      updateObjectAction(listIndex, actionIndex, {
                        kind: event.target.value as FormObjectActionConfig["kind"],
                      })
                    }
                    className="rounded-md border border-neutral-300 px-2 py-2 text-xs"
                  >
                    {OBJECT_ACTION_KINDS.map((kind) => (
                      <option key={kind.value} value={kind.value}>{kind.label}</option>
                    ))}
                  </select>
                  <select
                    value={action.position || "end"}
                    onChange={(event) =>
                      updateObjectAction(listIndex, actionIndex, {
                        position: event.target.value as "start" | "end",
                      })
                    }
                    className="rounded-md border border-neutral-300 px-2 py-2 text-xs"
                  >
                    <option value="start">Left</option>
                    <option value="end">Right</option>
                  </select>
                  <input value={action.label || ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { label: event.target.value })} className="rounded-md border border-neutral-300 px-2 py-2 text-xs" placeholder="Label" />
                  <input value={action.field || ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { field: event.target.value })} className="rounded-md border border-neutral-300 px-2 py-2 text-xs" placeholder="Numeric field" />
                  <input type="number" value={action.min ?? ""} onChange={(event) => updateObjectAction(listIndex, actionIndex, { min: event.target.value === "" ? undefined : Number(event.target.value) })} className="rounded-md border border-neutral-300 px-2 py-2 text-xs" placeholder="Min" />
                  <input type="number" value={action.step ?? 1} onChange={(event) => updateObjectAction(listIndex, actionIndex, { step: Number(event.target.value) })} className="rounded-md border border-neutral-300 px-2 py-2 text-xs" placeholder="Step" />
                  <button type="button" title="Remove action" aria-label="Remove action" onClick={() => updateObjectList(listIndex, { actions: (objectList.actions || []).filter((_item, index) => index !== actionIndex) })} className="inline-flex h-8 w-8 items-center justify-center text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FormComponentEditor;
