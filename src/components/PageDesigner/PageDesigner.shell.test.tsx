// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import { PageDesigner } from "./PageDesigner";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../utils/api/container")>();
  return { ...actual, useGetContainers: () => [] };
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
        id: "cell-summary",
        row: 1,
        column: 1,
        components: [
          {
            id: "component-summary",
            type: "table",
            title: "Quarterly revenue performance by customer segment",
          },
        ],
      },
    ],
  },
  { columns: 1, gap: 16, cells: [] },
];

describe("PageDesigner workspace shell", () => {
  it("presents an empty workspace with a single direct creation action", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={[]} onChange={onChange} />);

    expect(screen.getByTestId("page-designer-workspace")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Page structure" })).toBeInTheDocument();
    expect(screen.getByText("Start with a section")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add section" }));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ columns: 1, gap: 16, cells: [] }),
    ]);
  });

  it("keeps section navigation, selection, destructive actions, and long content reachable", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageDesigner sections={sections} onChange={onChange} />);

    const navigator = screen.getByRole("navigation", { name: "Page structure" });
    const firstSection = within(navigator).getByRole("button", { name: /^Section 1/i });
    expect(firstSection).toHaveAttribute("aria-current", "false");

    await user.click(firstSection);
    expect(firstSection).toHaveAttribute("aria-current", "true");
    expect(
      screen.getByText("Quarterly revenue performance by customer segment"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete section 1" })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: "Page canvas" })).toBeInTheDocument();
    expect(screen.getByTestId("section-layout-toolbar")).toContainElement(
      screen.getByLabelText("Grid Columns"),
    );
    expect(screen.getByTestId("grid-layout-canvas")).toHaveClass("min-h-[280px]");
  });
});
