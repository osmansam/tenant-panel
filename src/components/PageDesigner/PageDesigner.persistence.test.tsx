// @vitest-environment jsdom
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GridSection } from "../../types/page";
import { WorkspaceDialog } from "../ui";
import { PageDesigner } from "./PageDesigner";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async (importOriginal) => ({
  ...await importOriginal<typeof import("../../utils/api/container")>(),
  useGetContainers: () => [{ schemaName: "orders", fields: [] }],
}));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));

const sections: GridSection[] = [{ columns: 1, gap: 12, cells: [{
  id: "cell-1", row: 1, column: 1,
  components: [{ id: "cmp_text_1", type: "text", title: "Orders", dataBinding: { kind: "schema", schemaName: "orders" } }],
}] }];
const openComponent = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: /^Section 1/i }));
  await user.click(screen.getByTitle("Edit Component"));
};

describe("component editor draft protection", () => {
  it("dismisses only the component when Escape is pressed inside a page editor", async () => {
    const closePage = vi.fn();
    const user = userEvent.setup();
    render(<WorkspaceDialog open title="Page editor" onClose={closePage}><PageDesigner sections={sections} onChange={vi.fn()} /></WorkspaceDialog>);
    await openComponent(user);
    expect(screen.getByRole("dialog", { name: "Edit Component" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(closePage).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: "Edit Component" })).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Page editor" })).toBeInTheDocument();
  });

  it("keeps a failed component save open with its draft and an inline error", async () => {
    const persist = vi.fn().mockRejectedValue(new Error("Offline"));
    const user = userEvent.setup();
    render(<PageDesigner sections={sections} onChange={vi.fn()} onComponentSave={persist} />);
    await openComponent(user);
    await user.type(screen.getByRole("textbox", { name: "Title" }), " draft");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not be saved"));
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue("Orders draft");
    expect(screen.getByRole("dialog", { name: "Edit Component" })).toBeInTheDocument();
  });

  it("blocks dismissal during persistence and does not replace newer parent sections after it finishes", async () => {
    let finish: () => void = () => {};
    const persist = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<PageDesigner sections={sections} onChange={onChange} onComponentSave={persist} />);
    await openComponent(user);
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog", { name: "Edit Component" })).toBeInTheDocument();
    const newerSections = [...sections, { columns: 2, gap: 16, cells: [] }];
    rerender(<PageDesigner sections={newerSections} onChange={onChange} onComponentSave={persist} />);
    onChange.mockClear();
    await act(async () => { finish(); });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: "Edit Component" })).not.toBeInTheDocument();
  });
});
