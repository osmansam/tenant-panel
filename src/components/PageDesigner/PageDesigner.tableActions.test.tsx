// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import { PageDesigner } from "./PageDesigner";
import type { ContainerModel, Field } from "../../utils/api/container";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const fields: Field[] = [
  { name: "title", type: "string", frontend: { displayName: "Title" } },
  { name: "status", type: "select", frontend: { displayName: "Status" } },
];

const container: ContainerModel = {
  id: "container-1",
  schemaName: "products",
  fields,
  routes: {},
  populatedRoutes: [],
  redis: {} as ContainerModel["redis"],
  pipelines: [],
  dynamicFunctions: [],
  dynamicApis: [],
};

vi.mock("../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../utils/api/container")>();
  return { ...actual, useGetContainers: () => [container] };
});

vi.mock("./CellExcelUploadModal", () => ({
  CellExcelUploadModal: () => null,
}));

const sections: GridSection[] = [
  {
    columns: 2,
    gap: 12,
    cells: [
      {
        id: "cell-table",
        row: 1,
        column: 1,
        components: [
          {
            id: "component-table",
            type: "table",
            title: "Products table",
            dataBinding: { kind: "schema", schemaName: "products" } as never,
          },
        ],
      },
    ],
  },
];

const openTableActions = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: /^Section 1/i }));
  await user.click(screen.getByTitle("Edit Component"));
  await user.click(screen.getByRole("button", { name: "Actions" }));
};

const selectAction = async (user: ReturnType<typeof userEvent.setup>, name: string) => {
  const actions = screen.getByRole("tablist", { name: "Table actions" });
  await user.click(within(actions).getByRole("tab", { name }));
};

describe("PageDesigner actions tab", () => {
  it("separates component details, source, and outputs while saving edits", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={sections} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    const tabs = screen.getByRole("tablist", { name: "Component settings" });
    expect(within(tabs).getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByRole("combobox", { name: "Schema Name" })).not.toBeInTheDocument();
    expect(screen.queryByText("Component Outputs")).not.toBeInTheDocument();
    const title = screen.getByRole("textbox", { name: "Title" });
    await user.clear(title);
    await user.type(title, "Product dashboard");
    const stateKey = screen.getByRole("textbox", { name: "Runtime State Key" });
    await user.clear(stateKey);
    await user.type(stateKey, "productsGrid");
    await user.click(within(tabs).getByRole("tab", { name: "Data source" }));
    expect(screen.getByRole("combobox", { name: "Schema Name" })).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Table Source" })).toBeVisible();
    expect(screen.queryByRole("textbox", { name: "Title" })).not.toBeInTheDocument();
    await user.click(within(tabs).getByRole("tab", { name: "Outputs" }));
    expect(screen.getByText("Component Outputs")).toBeVisible();
    expect(screen.queryByRole("combobox", { name: "Schema Name" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Expose tableSearch" }));
    const outputKey = screen.getByRole("textbox", { name: /^Output key for/ });
    await user.clear(outputKey);
    await user.type(outputKey, "searchText");
    await user.click(within(tabs).getByRole("tab", { name: "General" }));
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue("Product dashboard");
    expect(screen.getByRole("textbox", { name: "Runtime State Key" })).toHaveValue("productsGrid");
    await user.click(within(tabs).getByRole("tab", { name: "Outputs" }));
    expect(screen.getByRole("textbox", { name: /^Output key for/ })).toHaveValue("searchText");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const saved = onChange.mock.lastCall![0][0].cells[0].components[0];
    expect(saved).toEqual(expect.objectContaining({ title: "Product dashboard", stateKey: "productsGrid" }));
    expect(saved.outputs).toEqual([expect.objectContaining({ key: "searchText", source: { kind: "tableSearch" } })]);
  });

  it("separates request sections and retains their saved values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const configured = structuredClone(sections);
    configured[0].cells[0].components[0].table = { constantFilters: { status: "pending" } };
    render(<PageDesigner sections={configured} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    await user.click(screen.getByRole("button", { name: "Request" }));
    const tabs = screen.getByRole("tablist", { name: "Request settings" });
    expect(within(tabs).getByRole("tab", { name: "Data loading" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("Additional data fields")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add filter" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox", { name: "Data loading" }));
    await user.click(screen.getByRole("option", { name: "All items" }));
    await user.click(within(tabs).getByRole("tab", { name: "Data fields" }));
    await user.click(screen.getByRole("combobox", { name: "Additional data fields" }));
    await user.click(screen.getByRole("option", { name: "Status" }));
    if (screen.queryByRole("listbox")) await user.keyboard("{Escape}");
    await user.click(within(tabs).getByRole("tab", { name: "Constant filters" }));
    const value = screen.getByRole("textbox", { name: "Value" });
    await user.clear(value);
    await user.type(value, "active");
    await user.click(within(tabs).getByRole("tab", { name: "Constant sort" }));
    expect(screen.queryByRole("button", { name: "Add filter" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox", { name: "Sort field" }));
    await user.click(screen.getByRole("option", { name: "title" }));
    await user.click(screen.getByRole("combobox", { name: "Direction" }));
    await user.click(screen.getByRole("option", { name: "Descending" }));
    await user.click(within(tabs).getByRole("tab", { name: "Row reordering" }));
    expect(screen.getByRole("checkbox", { name: "Enable row dragging" })).toBeVisible();
    expect(screen.queryByRole("combobox", { name: "Sort field" })).not.toBeInTheDocument();
    await user.click(within(tabs).getByRole("tab", { name: "Constant filters" }));
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("active");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const table = onChange.mock.lastCall![0][0].cells[0].components[0].table;
    expect(table).toEqual(expect.objectContaining({ dataMode: "all", dataFields: ["status"], constantFilters: { status: "active" }, constantSort: { sort: "title", asc: 0 } }));
  });

  it.each([
    { settings: "Actions", fieldsName: "Add button form fields", action: "Add Button" },
    { settings: "Actions", fieldsName: "Action form fields", action: "Edit" },
    { settings: "Filter Inputs", fieldsName: "Filter inputs", action: "" },
  ])("switches and preserves edits in $fieldsName tabs", async ({ settings, fieldsName, action }) => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const configuredSections = structuredClone(sections);
    const formFields = [
      { formKey: "title", type: "text" as const, label: "Title", placeholder: "Product title" },
      { formKey: "status", type: "text" as const, label: "Status", placeholder: "Product status" },
    ];
    configuredSections[0].cells[0].components[0].table = {
      columns: [],
      addButton: { kind: "create", formFields },
      actions: [{ id: "edit-product", kind: "edit", label: "Edit", formFields }],
      filterPanel: { inputs: formFields },
    };
    render(<PageDesigner sections={configuredSections} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    await user.click(screen.getByRole("button", { name: settings }));
    if (action) {
      await selectAction(user, action);
      await user.click(screen.getByRole("tab", { name: "Form" }));
    }
    const tablist = screen.getByRole("tablist", { name: fieldsName });
    const titleTab = within(tablist).getByRole("tab", { name: "Title" });
    const statusTab = within(tablist).getByRole("tab", { name: "Status" });
    expect(titleTab).toHaveAttribute("aria-selected", "true");
    let panel = screen.getByRole("tabpanel", { name: "Title" });
    const placeholder = within(panel).getByRole("textbox", { name: "Placeholder" });
    await user.clear(placeholder);
    await user.type(placeholder, "Updated title");
    await user.click(statusTab);
    expect(screen.queryByRole("tabpanel", { name: "Title" })).not.toBeInTheDocument();
    panel = screen.getByRole("tabpanel", { name: "Status" });
    expect(within(panel).getByRole("textbox", { name: "Placeholder" })).toHaveValue("Product status");
    await user.click(titleTab);
    panel = screen.getByRole("tabpanel", { name: "Title" });
    expect(within(panel).getByRole("textbox", { name: "Placeholder" })).toHaveValue("Updated title");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const savedTable = onChange.mock.lastCall![0][0].cells[0].components[0].table;
    const savedFields = action === "Add Button" ? savedTable.addButton.formFields
      : action === "Edit" ? savedTable.actions[0].formFields : savedTable.filterPanel.inputs;
    expect(savedFields[0].placeholder).toBe("Updated title");
    expect(savedFields[1].placeholder).toBe("Product status");
  });

  it("shows one action and one form section at a time while retaining selections and edits", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={sections} onChange={onChange} />);
    await openTableActions(user);
    await selectAction(user, "Edit");
    expect(screen.getByRole("group", { name: "Action 1: Edit" })).toBeVisible();
    expect(screen.queryByRole("group", { name: "Action 2: Delete" })).not.toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "Add Button" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Expand action" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Form" }));
    expect(screen.getByRole("tab", { name: "Fields" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tablist", { name: "Action form fields" })).toBeVisible();
    expect(screen.queryByText("Form layout")).not.toBeInTheDocument();
    expect(screen.queryByText("Default / hidden values")).not.toBeInTheDocument();
    expect(screen.queryByText("Field Overrides")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Status" }));
    await user.click(screen.getByRole("tab", { name: "Layout" }));
    expect(screen.getByText("Form layout")).toBeVisible();
    expect(screen.queryByRole("tablist", { name: "Action form fields" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "Form button" }), "Save product");
    await user.click(screen.getByRole("tab", { name: "Default values" }));
    expect(screen.getByText("Default / hidden values")).toBeVisible();
    expect(screen.queryByText("Form layout")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Overrides" }));
    expect(screen.getByText("Field Overrides")).toBeVisible();
    expect(screen.queryByText("Default / hidden values")).not.toBeInTheDocument();

    await selectAction(user, "Delete");
    expect(screen.queryByRole("group", { name: "Action 1: Edit" })).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Action" })).toHaveAttribute("aria-selected", "true");
    await selectAction(user, "Edit");
    expect(screen.getByRole("tab", { name: "Form" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Overrides" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Fields" }));
    expect(screen.getByRole("tab", { name: "Status" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Conditions" }));
    await user.type(screen.getByRole("textbox", { name: "Disabled condition" }), "row.locked");

    await selectAction(user, "Add Button");
    await user.click(screen.getByRole("tab", { name: "Form" }));
    expect(screen.getByRole("tablist", { name: "Add button form fields" })).toBeVisible();
    expect(screen.queryByRole("tab", { name: "Overrides" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Layout" }));
    const createButton = screen.getByRole("textbox", { name: "Form button" });
    await user.clear(createButton);
    await user.type(createButton, "Create product");
    await user.click(screen.getByRole("tab", { name: "Default values" }));
    expect(screen.getByText("Default / hidden values")).toBeVisible();
    expect(screen.queryByText("Form layout")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Conditions" }));
    await user.type(screen.getByRole("textbox", { name: "Hidden condition" }), "state.readOnly");
    await selectAction(user, "Edit");
    expect(screen.getByRole("textbox", { name: "Disabled condition" })).toHaveValue("row.locked");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const saved = onChange.mock.lastCall![0][0].cells[0].components[0].table;
    expect(saved.actions[0]).toEqual(expect.objectContaining({ buttonName: "Save product", disabledCondition: "row.locked" }));
    expect(saved.addButton).toEqual(expect.objectContaining({ buttonName: "Create product", hiddenCondition: "state.readOnly" }));
  });

  it("selects added actions and keeps tab identity through renaming, moving, and removal", async () => {
    const user = userEvent.setup();
    render(<PageDesigner sections={sections} onChange={vi.fn()} />);
    await openTableActions(user);
    await user.click(screen.getByRole("button", { name: "Add action" }));
    expect(within(screen.getByRole("tablist", { name: "Table actions" })).getByRole("tab", { name: "Action" })).toHaveAttribute("aria-selected", "true");
    const label = screen.getByRole("textbox", { name: "Action label" });
    await user.clear(label);
    await user.type(label, "Publish");
    await user.click(screen.getByRole("tab", { name: "Conditions" }));
    await user.type(screen.getByRole("textbox", { name: "Required condition" }), "row.ready");
    await user.click(screen.getByRole("button", { name: "Move action up" }));
    expect(within(screen.getByRole("tablist", { name: "Table actions" })).getByRole("tab", { name: "Publish" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("textbox", { name: "Required condition" })).toHaveValue("row.ready");
    await user.click(screen.getByRole("button", { name: "Remove action" }));
    expect(screen.queryByRole("tab", { name: "Publish" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("group", { name: /^Action \d:/ })).toHaveLength(1);
    expect(screen.getByRole("tab", { name: "Delete" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Remove action" }));
    expect(screen.getByRole("tab", { name: "Edit" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Remove action" }));
    expect(screen.getByRole("tab", { name: "Add Button" })).toHaveFocus();
    expect(screen.getByRole("group", { name: "Add Button" })).toBeVisible();
  });

  it("keeps imported actions without ids selected when reordered", async () => {
    const user = userEvent.setup();
    const configured = structuredClone(sections);
    configured[0].cells[0].components[0].table = {
      actions: [
        { kind: "edit", label: "Edit legacy" },
        { kind: "delete", label: "Delete legacy" },
      ],
    };
    render(<PageDesigner sections={configured} onChange={vi.fn()} />);
    await openTableActions(user);
    await selectAction(user, "Edit legacy");
    await user.click(screen.getByRole("tab", { name: "Form" }));
    await user.click(screen.getByRole("tab", { name: "Layout" }));
    await user.click(screen.getByRole("button", { name: "Move action down" }));
    expect(within(screen.getByRole("tablist", { name: "Table actions" })).getByRole("tab", { name: "Edit legacy" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Layout" })).toHaveAttribute("aria-selected", "true");
  });

  it("separates bulk actions and form sections while saving edits independently", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={sections} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    await user.click(screen.getByRole("button", { name: "Bulk Actions" }));
    const actions = screen.getByRole("tablist", { name: "Bulk actions" });
    expect(within(actions).getByRole("tab", { name: "Bulk Edit" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByRole("group", { name: "Bulk Delete" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add action" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Form" }));
    expect(screen.getByRole("tablist", { name: "Bulk edit form fields" })).toBeVisible();
    expect(screen.queryByText("Form layout")).not.toBeInTheDocument();
    expect(screen.queryByText("Default / hidden values")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Status" }));
    const fieldLabel = screen.getByRole("textbox", { name: "Field label" });
    await user.clear(fieldLabel);
    await user.type(fieldLabel, "State");
    await user.click(screen.getByRole("tab", { name: "Layout" }));
    expect(screen.getByText("Form layout")).toBeVisible();
    expect(screen.queryByRole("tablist", { name: "Bulk edit form fields" })).not.toBeInTheDocument();
    const buttonText = screen.getByRole("textbox", { name: "Button text" });
    await user.clear(buttonText);
    await user.type(buttonText, "Update selected");
    await user.click(screen.getByRole("tab", { name: "Default values" }));
    expect(screen.getByText("Default / hidden values")).toBeVisible();
    expect(screen.queryByText("Form layout")).not.toBeInTheDocument();
    await user.click(within(actions).getByRole("tab", { name: "Bulk Delete" }));
    expect(screen.queryByRole("tab", { name: "Form" })).not.toBeInTheDocument();
    const confirmTitle = screen.getByPlaceholderText("Confirm title");
    await user.clear(confirmTitle);
    await user.type(confirmTitle, "Remove selected products");
    const confirmText = screen.getByPlaceholderText("Confirm text");
    await user.clear(confirmText);
    await user.type(confirmText, "Confirm removal");
    await user.click(screen.getByRole("checkbox", { name: "On" }));
    await user.click(screen.getByRole("tab", { name: "Conditions" }));
    await user.type(screen.getByRole("textbox", { name: "Hidden condition" }), "state.readOnly");
    await user.click(within(actions).getByRole("tab", { name: "Bulk Edit" }));
    expect(screen.getByRole("tab", { name: "Default values" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Fields" }));
    expect(screen.getByRole("tab", { name: "State" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const saved = onChange.mock.lastCall![0][0].cells[0].components[0].table.bulkActions;
    expect(saved.edit.buttonName).toBe("Update selected");
    expect(saved.edit.formFields[1].label).toBe("State");
    expect(saved.edit.enabled).toBe(true);
    expect(saved.delete).toEqual(expect.objectContaining({ enabled: false, confirmTitle: "Remove selected products", confirmText: "Confirm removal", hiddenCondition: "state.readOnly" }));
  });

  it("keeps bulk field selection after adding, moving, and removing fields", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={sections} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    await user.click(screen.getByRole("button", { name: "Bulk Actions" }));
    await user.click(screen.getByRole("tab", { name: "Form" }));
    await user.click(screen.getByRole("tab", { name: "Status" }));
    await user.click(screen.getByRole("button", { name: "Move field up" }));
    const fields = screen.getByRole("tablist", { name: "Bulk edit form fields" });
    expect(within(fields).getAllByRole("tab")[0]).toHaveTextContent("Status");
    expect(within(fields).getByRole("tab", { name: "Status" })).toHaveAttribute("aria-selected", "true");
    expect(within(fields).getByRole("tab", { name: "Status" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "+ Add field" }));
    expect(screen.getByRole("tab", { name: "Field 3" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("button", { name: "Remove field" }));
    expect(screen.getByRole("tab", { name: "Title" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Title" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    const saved = onChange.mock.lastCall![0][0].cells[0].components[0].table.bulkActions.edit.formFields;
    expect(saved.map((field: { formKey: string }) => field.formKey)).toEqual(["status", "title"]);
  });

  it("keeps required, disabled, and multiple controls available inside the selected action fields", async () => {
    const user = userEvent.setup();
    render(<PageDesigner sections={sections} onChange={vi.fn()} />);
    await openTableActions(user);
    for (const action of ["Add Button", "new"]) {
      if (action === "new") await user.click(screen.getByRole("button", { name: "Add action" }));
      else await selectAction(user, action);
      await user.click(screen.getByRole("tab", { name: "Form" }));
      await user.click(screen.getByRole("button", { name: "+ Add field" }));
      expect(screen.getByText("Multiple")).toBeVisible();
      expect(screen.getByText("Required")).toBeVisible();
      expect(screen.getByText("Disabled")).toBeVisible();
    }
  });
});
