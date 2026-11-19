// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import { PageDesigner } from "./PageDesigner";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async (original) => ({
  ...await original<typeof import("../../utils/api/container")>(),
  useGetContainers: () => [],
}));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));

const initialSections: GridSection[] = [
  { columns: 2, gap: 12, cells: [{ id: "cell_1", row: 1, column: 1, components: [] }] },
  { columns: 1, gap: 24, cells: [] },
];

function Harness() {
  const [sections, setSections] = useState(initialSections);
  return <PageDesigner sections={sections} onChange={setSections} />;
}

describe("Page Designer keyboard flow", () => {
  it("selects a section and cell with the keyboard and edits its labelled layout controls", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.tab(); // Add section
    await user.tab();
    expect(screen.getByRole("button", { name: /^Section 1,/ })).toHaveFocus();
    await user.keyboard("{Enter}");

    const selectCell = screen.getByRole("button", { name: "Select cell 1,1" });
    // Reach the cell through the normal tab order, including section/layout controls.
    for (let i = 0; i < 20 && document.activeElement !== selectCell; i++) await user.tab();
    expect(selectCell).toHaveFocus();
    expect(selectCell).toHaveAttribute("aria-pressed", "false");
    await user.keyboard(" ");
    expect(selectCell).toHaveAttribute("aria-pressed", "true");
    const row = screen.getByRole("spinbutton", { name: /^Row$/ });
    for (let i = 0; i < 6 && document.activeElement !== row; i++) await user.tab();
    expect(row).toHaveFocus();
    await user.type(row, "2");
    expect(row).toHaveValue(12);
    expect(screen.getByRole("button", { name: "Select cell 12,1" })).toHaveAttribute("aria-pressed", "true");

    const secondSection = screen.getByRole("button", { name: /^Section 2,/ });
    secondSection.focus();
    await user.keyboard("{Enter}");
    expect(secondSection).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("spinbutton", { name: "Gap (pixels)" })).toHaveValue(24);
    expect(screen.queryByRole("button", { name: "Select cell 12,1" })).not.toBeInTheDocument();
  });

  it("opens the component editor from the keyboard, traps focus and restores its opener on Escape", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const section = screen.getByRole("button", { name: /^Section 1,/ });
    section.focus();
    await user.keyboard("{Enter}");
    const add = screen.getByTitle("Add component");
    add.focus();
    await user.keyboard("{Enter}");
    const dialog = screen.getByRole("dialog", { name: "Add Component" });
    const close = within(dialog).getByRole("button", { name: "Close component editor" });
    close.focus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(add).toHaveFocus();
    // Opening an independent action must not accidentally select the cell.
    expect(screen.getByRole("button", { name: "Select cell 1,1" })).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps dialog content clicks inside and closes through the backdrop control", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /^Section 1,/ }));
    const add = screen.getByTitle("Add component");
    await user.click(add);
    const dialog = screen.getByRole("dialog", { name: "Add Component" });
    await user.click(within(dialog).getByRole("heading", { name: "Add Component" }));
    expect(dialog).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss component editor" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(add).toHaveFocus();
  });
});
