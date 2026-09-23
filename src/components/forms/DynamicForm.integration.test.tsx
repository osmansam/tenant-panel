// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FormComponentConfig } from "../../types/page";
import DynamicForm from "./DynamicForm";

const boundary = vi.hoisted(() => ({
  create: vi.fn(),
  createMany: vi.fn(),
  workflow: vi.fn(),
  pending: false,
  selections: new Map<string, Array<Record<string, unknown>>>(),
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock("../../utils/dynamic", () => ({
  useDynamicCrud: () => ({
    createMutation: {
      mutateAsync: boundary.create,
      isPending: boundary.pending,
    },
    createManyMutation: {
      mutateAsync: boundary.createMany,
      isPending: boundary.pending,
    },
    executeWorkflowMutation: {
      mutateAsync: boundary.workflow,
      isPending: boundary.pending,
    },
  }),
}));

vi.mock("./useFormSelectionData", () => ({
  useFormSelectionData: () => boundary.selections,
}));

vi.mock("react-toastify", () => ({
  toast: { success: boundary.success, error: boundary.error },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();
  return { ...original, useParams: () => ({ pageId: "page-1" }) };
});

const representativeForm: FormComponentConfig = {
  title: "Representative form",
  schemaName: "orders",
  fields: [
    { formKey: "name", type: "text", label: "Name", required: true },
    { formKey: "password", type: "password", label: "Password", defaultValue: "secret" },
    { formKey: "amount", type: "number", label: "Amount", defaultValue: 2 },
    { formKey: "color", type: "color", label: "Color", defaultValue: "#123456" },
    { formKey: "approved", type: "checkbox", label: "Approved", defaultValue: false },
    { formKey: "notes", type: "textarea", label: "Notes", defaultValue: "note" },
    { formKey: "image", type: "image", label: "Image" },
    { formKey: "date", type: "date", label: "Date", defaultValue: "2026-09-22" },
    { formKey: "time", type: "time", label: "Time", defaultValue: "09:15" },
    { formKey: "hour", type: "hour", label: "Hour", defaultValue: "10:30" },
    { formKey: "month", type: "monthYear", label: "Month", defaultValue: "09-2026" },
    {
      formKey: "status",
      type: "select",
      label: "Status",
      defaultValue: "closed",
      staticOptions: [
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
      ],
    },
    {
      formKey: "conditional",
      type: "text",
      label: "Conditional",
      requiredCondition: 'status = "open"',
    },
    {
      formKey: "internalNote",
      type: "text",
      label: "Internal note",
      defaultValue: "retained",
      disabledCondition: 'status = "closed"',
    },
  ],
  actions: [{ kind: "submit", buttonName: "Save" }],
};

const relationForm: FormComponentConfig = {
  schemaName: "relations",
  fields: [
    {
      formKey: "parent",
      type: "select",
      label: "Parent",
      optionsSource: "schema",
      sourceSchemaName: "parents",
      sourceValueField: "_id",
      sourceLabelField: "name",
      invalidateKeys: ["child"],
    },
    {
      formKey: "child",
      type: "select",
      label: "Child",
      optionsSource: "schema",
      sourceSchemaName: "children",
      sourceValueField: "_id",
      sourceLabelField: "name",
      sourceFilterCondition: "parentId = {{parent}}",
    },
  ],
};

const objectListForm = (mode: "create" | "createMany" = "create"): FormComponentConfig => ({
  schemaName: "orders",
  fields: [
    {
      formKey: "productId",
      type: "select",
      label: "Product",
      optionsSource: "schema",
      sourceSchemaName: "products",
      sourceValueField: "_id",
      sourceLabelField: "name",
    },
    { formKey: "quantity", type: "number", label: "Quantity", defaultValue: 1 },
  ],
  objectLists: [
    {
      key: "items",
      title: "Items",
      itemFields: ["productId", "quantity"],
      fieldMappings: [
        { sourceFormKey: "productId", sourceField: "price", targetField: "unitPrice", required: true },
      ],
      itemCalculations: [
        { operation: "multiply", inputs: ["unitPrice", "quantity"], targetField: "lineTotal", precision: 2 },
      ],
      addAction: {
        kind: "addObject",
        targetObjectList: "items",
        sourceFields: ["productId", "quantity"],
        clearSourceFields: ["productId", "quantity"],
      },
      display: { primaryField: "productIdLabel", rightTemplate: "{{lineTotal}} TRY" },
      actions: [
        { kind: "editObject", label: "Edit item" },
        { kind: "removeObject", label: "Remove item" },
      ],
    },
  ],
  summaries: [
    { key: "total", operation: "sum", objectListKey: "items", sourceField: "lineTotal", targetField: "total", label: "Total" },
  ],
  actions: [{ kind: "submit", buttonName: "Save" }],
  submit: mode === "createMany" ? { mode, bulkObjectListKey: "items" } : { mode },
});

const selectOption = async (label: string, option: string) => {
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox", { name: label }));
  await user.click(screen.getByText(option));
};

beforeEach(() => {
  boundary.create.mockReset().mockResolvedValue({});
  boundary.createMany.mockReset().mockResolvedValue({});
  boundary.workflow.mockReset().mockResolvedValue({});
  boundary.success.mockReset();
  boundary.error.mockReset();
  boundary.pending = false;
  boundary.selections = new Map();
});

describe("DynamicForm representative integration", () => {
  it("keeps multi-area layouts stacked until wide desktop space is available", () => {
    render(
      <DynamicForm
        form={{
          ...representativeForm,
          fields: representativeForm.fields?.map((field, index) =>
            index === 0 ? { ...field, area: "right" as const } : field,
          ),
          layout: {
            columns: 2,
            areas: [
              { key: "main", title: "Details" },
              { key: "right", title: "Review" },
            ],
          },
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Representative form" }).nextElementSibling)
      .toHaveClass("xl:grid-cols-2");
    expect(screen.getByRole("heading", { name: "Review" }).closest("section"))
      .toHaveClass("xl:col-start-2");
  });

  it("keeps legacy-hidden values, validates inline, submits, and resets", async () => {
    const user = userEvent.setup();
    render(<DynamicForm form={representativeForm} componentId="form-1" />);

    expect(screen.queryByLabelText("Internal note")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText("This field is required")).toHaveAttribute("aria-live", "polite");
    expect(boundary.error).toHaveBeenCalledWith("Please fix the errors in the form");

    fireEvent.change(screen.getByRole("textbox", { name: "Name required" }), {
      target: { value: "Ada" },
    });
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(boundary.create).toHaveBeenCalled());
    expect(boundary.create.mock.calls[0][0]).toMatchObject({
      name: "Ada",
      internalNote: "retained",
      date: "2026-09-22",
      time: "09:15",
      hour: "10:30",
      month: "09-2026",
    });
    expect(boundary.success).toHaveBeenCalledWith("Saved");
    expect(screen.getByRole("textbox", { name: "Name required" })).toHaveValue("");
  });

  it("resets and visually clears dependent relation selections", async () => {
    boundary.selections = new Map([
      ["parent", [
        { _id: "p1", name: "Parent one" },
        { _id: "p2", name: "Parent two" },
      ]],
      ["child", [
        { _id: "c1", name: "Child one", parentId: "p1" },
        { _id: "c1b", name: "Child one alternate", parentId: "p1" },
        { _id: "c2", name: "Child two", parentId: "p2" },
        { _id: "c2b", name: "Child two alternate", parentId: "p2" },
      ]],
    ]);
    render(<DynamicForm form={relationForm} />);
    await selectOption("Parent", "Parent one");
    await selectOption("Child", "Child one");
    expect(screen.getByText("Child one")).toBeVisible();
    await selectOption("Parent", "Parent two");
    expect(screen.queryByText("Child one")).not.toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole("combobox", { name: "Child" }));
    expect(screen.getByText("Child two")).toBeVisible();
  });

  it("adds, edits, removes, and calculates object-list items", async () => {
    const user = userEvent.setup();
    boundary.selections = new Map([
      ["productId", [{ _id: "tea", name: "Tea", price: 10 }]],
    ]);
    render(<DynamicForm form={objectListForm()} />);
    await selectOption("Product", "Tea");
    fireEvent.change(screen.getByRole("spinbutton", { name: "Quantity" }), {
      target: { value: "2" },
    });
    await user.click(screen.getByRole("button", { name: "Add Item" }));
    expect(screen.getByText("20 TRY")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Edit item" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "Quantity" }), {
      target: { value: "3" },
    });
    await user.click(screen.getByRole("button", { name: "Save Item" }));
    expect(screen.getByText("30 TRY")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Remove item" }));
    expect(screen.getByText("No items")).toBeVisible();
  });

  it("preserves create-many and workflow request shapes", async () => {
    const user = userEvent.setup();
    boundary.selections = new Map([
      ["productId", [{ _id: "tea", name: "Tea", price: 10 }]],
    ]);
    const { unmount } = render(<DynamicForm form={objectListForm("createMany")} />);
    await selectOption("Product", "Tea");
    await user.click(screen.getByRole("button", { name: "Add Item" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(boundary.createMany).toHaveBeenCalledWith([
      { productId: "tea", quantity: 1, unitPrice: 10, lineTotal: 10 },
    ]);

    const workflowForm: FormComponentConfig = {
      schemaName: "orders",
      fields: [{ formKey: "name", type: "text", label: "Name", defaultValue: "Ada" }],
      summaries: [{ key: "copy", operation: "copy", sourceField: "name", targetField: "copied" }],
      submit: { mode: "workflow", workflowSchema: "orders", workflowName: "create-order" },
    };
    unmount();
    render(<DynamicForm form={workflowForm} componentId="form-1" />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(boundary.workflow).toHaveBeenCalledWith({
      workflowName: "create-order",
      workflowSchema: "orders",
      body: {
        record: { name: "Ada", copied: undefined },
        formConfigRef: { pageId: "page-1", componentId: "form-1" },
      },
    });
  });

  it("disables and marks submit busy while a mutation is pending", () => {
    boundary.pending = true;
    render(<DynamicForm form={representativeForm} />);
    const submit = screen.getByRole("button", { name: "Save" });
    expect(submit).toBeDisabled();
    expect(submit).toHaveAttribute("aria-busy", "true");
  });
});
