// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import { PageDesigner } from "./PageDesigner";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../utils/api/container")>();
  return {
    ...actual,
    useGetContainers: () => [{ schemaName: "orders", fields: [] }],
  };
});

vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));

const sections: GridSection[] = [{
  columns: 1,
  gap: 12,
  cells: [{
    id: "cell-1",
    row: 1,
    column: 1,
    components: [{ id: "text-1", type: "text", title: "Orders" }],
  }],
}];

describe("PageDesigner component modal controls", () => {
  it("uses the shared controls and portals select menus outside the editor", async () => {
    const user = userEvent.setup();
    render(<PageDesigner sections={sections} onChange={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /^Section 1/i }));
    await user.click(screen.getByTitle("Edit Component"));
    expect(screen.getByText("Edit Component")).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveAttribute(
      "data-control-size",
      "md",
    );

    const schema = screen.getByRole("combobox", { name: "Schema Name" });
    expect(schema.closest("[data-control-size]"))?.toHaveAttribute(
      "data-control-size",
      "md",
    );
    await user.click(schema);
    expect(document.body).toContainElement(screen.getByRole("listbox"));
    await user.click(screen.getByRole("option", { name: "orders" }));
  });
});
