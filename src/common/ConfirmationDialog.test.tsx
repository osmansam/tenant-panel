// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WorkspaceDialog } from "../components/ui";
import { ConfirmationDialog } from "./ConfirmationDialog";
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));

describe("nested confirmation", () => {
  it("focuses Cancel and keeps the confirmation interactive above its parent", async () => {
    const close = vi.fn();
    const confirm = vi.fn();
    render(<><WorkspaceDialog open onClose={vi.fn()} title="Collection">Parent</WorkspaceDialog><ConfirmationDialog isOpen close={close} confirm={confirm} title="Delete field" text="This cannot be undone." /></>);
    const dialog = screen.getByRole("dialog", { name: "Delete field" });
    expect(dialog.closest("[inert]")).toBeNull();
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus());
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(close).toHaveBeenCalledOnce();
    expect(confirm).not.toHaveBeenCalled();
  });
});
