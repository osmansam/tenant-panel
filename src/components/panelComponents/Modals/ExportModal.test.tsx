// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Field } from "../../../utils/api/container";
import ExportModal from "./ExportModal";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
const fields = [{ name: "email", frontend: { displayName: "Email address" } }, { name: "fullName" }] as Field[];
function setup() {
  const onExport = vi.fn();
  const close = vi.fn();
  const props = { isOpen: true, close, fields, onExport, schemaName: "customers", currentPage: 2, totalPages: 5 };
  return { ...render(<ExportModal {...props} />), props, onExport, close };
}
describe("export configuration", () => {
  it("allows deselecting all fields and selecting a single column", async () => {
    const user = userEvent.setup();
    const { onExport } = setup();
    await user.click(screen.getByRole("button", { name: "Deselect All" }));
    expect(screen.getByRole("button", { name: "Export" })).toBeDisabled();
    await user.click(screen.getByRole("checkbox", { name: "Email address" }));
    await user.click(screen.getByRole("button", { name: "Export" }));
    expect(onExport).toHaveBeenCalledWith(["email"], true, true, "all", undefined);
  });
  it("changes filter options once per click and resets a cancelled session", async () => {
    const user = userEvent.setup();
    const { rerender, props, onExport } = setup();
    await user.click(screen.getByRole("checkbox", { name: "Include Current Search" }));
    expect(screen.getByRole("checkbox", { name: "Include Current Search" })).not.toBeChecked();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    rerender(<ExportModal {...props} isOpen={false} />);
    rerender(<ExportModal {...props} />);
    expect(screen.getByRole("checkbox", { name: "Include Current Search" })).toBeChecked();
    expect(onExport).not.toHaveBeenCalled();
  });
  it("searches column labels while preserving hidden field selections", async () => {
    const user = userEvent.setup();
    const { onExport } = setup();
    await user.type(screen.getByRole("searchbox", { name: "Search fields" }), "email");
    expect(screen.queryByRole("checkbox", { name: "Full Name" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Export" }));
    expect(onExport).toHaveBeenCalledWith(["email", "fullName"], true, true, "all", undefined);
  });
});
