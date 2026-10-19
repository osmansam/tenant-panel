// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import type { ContainerModel } from "../../utils/api/container";
import { PageDesigner } from "./PageDesigner";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("../../utils/api/container", async (importOriginal) => ({
  ...await importOriginal<typeof import("../../utils/api/container")>(),
  useGetContainers: () => [{
    id: "products-id",
    schemaName: "products",
    fields: [{ name: "title", type: "string" }],
    routes: {},
    redis: {},
    pipelines: [],
    populatedRoutes: [],
    dynamicApis: [],
    dynamicFunctions: [{ name: "legacy-function", isActive: true }],
    workflows: [{ name: "save-products", isActive: true, steps: [] }],
  } as unknown as ContainerModel],
}));

vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));

const sections: GridSection[] = [{
  columns: 1,
  gap: 12,
  cells: [{
    id: "cell-table",
    row: 1,
    column: 1,
    components: [{
      id: "component-table",
      type: "table",
      title: "Products",
      dataBinding: { kind: "schema", schemaName: "products" },
    }],
  }],
}];

async function editTable(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /^Section 1/i }));
  await user.click(screen.getByTitle("Edit Component"));
}

describe("PageDesigner with dynamic functions paused", () => {
  it.each(["Bulk Edit", "Bulk Delete"])(
    "offers workflows without a direct function selector for %s",
    async (actionName) => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<PageDesigner sections={sections} onChange={onChange} />);
      await editTable(user);
      await user.click(screen.getByRole("button", { name: "Bulk Actions" }));
      await user.click(within(screen.getByRole("tablist", { name: "Bulk actions" }))
        .getByRole("tab", { name: actionName }));

      expect(screen.queryByRole("combobox", { name: "Function" })).not.toBeInTheDocument();
      expect(screen.queryByText("Function", { exact: true })).not.toBeInTheDocument();
      await user.click(screen.getByRole("combobox", { name: /^Workflow\b/ }));
      expect(screen.queryByRole("option", { name: /legacy-function/ })).not.toBeInTheDocument();
      await user.click(screen.getByRole("option", { name: "products / save-products" }));
      await user.click(screen.getByRole("button", { name: "Save Changes" }));

      const key = actionName === "Bulk Edit" ? "edit" : "delete";
      const savedTable = onChange.mock.lastCall![0][0].cells[0].components[0].table;
      expect(savedTable.bulkActions[key].submit).toEqual({
        workflowName: "save-products",
        workflowSchema: "products",
      });
    },
  );

  it("describes the add button's workflow option without recommending dynamic-function steps", async () => {
    const user = userEvent.setup();
    render(<PageDesigner sections={sections} onChange={vi.fn()} />);
    await editTable(user);
    await user.click(screen.getByRole("button", { name: "Actions" }));

    expect(screen.queryAllByText(/dynamic.function/i)).toHaveLength(0);
    expect(screen.getByText("Workflow", { exact: true })).toBeVisible();
  });

  it("preserves existing function metadata when saving unrelated table settings", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const configured = structuredClone(sections);
    configured[0].cells[0].components[0].table = {
      bulkActions: {
        edit: { kind: "update", submit: { functionName: "legacy-edit" } },
        delete: { kind: "delete", submit: {
          workflowName: "save-products",
          workflowSchema: "products",
          functionName: "legacy-delete",
        } },
      },
    };
    render(<PageDesigner sections={configured} onChange={onChange} />);
    await editTable(user);
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    const savedTable = onChange.mock.lastCall![0][0].cells[0].components[0].table;
    expect(savedTable.bulkActions.edit.submit).toEqual({ functionName: "legacy-edit" });
    expect(savedTable.bulkActions.delete.submit).toEqual({
      workflowName: "save-products",
      workflowSchema: "products",
      functionName: "legacy-delete",
    });
  });
});
