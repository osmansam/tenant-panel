// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PageDetailsModal } from "./PageDetailsModal";

vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock("../../PagePermissions", () => ({ default: ({ pageId, readOnly }: { pageId?: string; readOnly?: boolean }) => <p>{`Permissions for ${pageId}${readOnly ? " (read only)" : ""}`}</p> }));
const page = { id: "page-1", name: "Customer Overview", slug: "customers", sections: [] };

describe("page details workspace", () => {
  it("scopes permissions to the selected page and protects read-only users", async () => {
    const close = vi.fn();
    const user = userEvent.setup();
    render(<PageDetailsModal isOpen onClose={close} page={page} />);
    expect(screen.getByRole("dialog", { name: page.name })).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Permissions" }));
    expect(screen.getByText("Permissions for page-1 (read only)")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Edit Page" })).not.toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(close).toHaveBeenCalledOnce();
  });
  it("reports a failed clipboard copy without claiming success", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("Clipboard unavailable"));
    render(<PageDetailsModal isOpen onClose={vi.fn()} page={page} />);
    await user.click(screen.getByRole("tab", { name: "JSON" }));
    await user.click(screen.getByRole("button", { name: "Copy JSON" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not be copied"));
    expect(screen.getByLabelText("Page JSON")).toHaveTextContent('"name": "Customer Overview"');
  });
});
