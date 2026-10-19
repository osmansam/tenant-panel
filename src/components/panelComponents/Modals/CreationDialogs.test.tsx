// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePageModal } from "./CreatePageModal";
import { CreateContainerModal } from "./CreateContainerModal";
import { CreateWithJsonModal } from "./CreateWithJsonModal";

const createPage = vi.fn();
const createCollection = vi.fn();
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock("../../../utils/api/page", () => ({ useCreatePage: () => ({ createPageAsync: createPage, isCreating: false }), useGetTenantPages: () => [] }));
vi.mock("../../../utils/api/container", () => ({ useCreateContainer: () => ({ createContainerAsync: createCollection, isCreating: false }) }));

describe("creation dialog request feedback", () => {
  beforeEach(() => { createPage.mockReset(); createCollection.mockReset(); });
  it("retains a page name and custom path after failure, then closes after a successful retry", async () => {
    createPage.mockRejectedValueOnce(new Error("Offline")).mockResolvedValueOnce({});
    const close = vi.fn();
    const user = userEvent.setup();
    render(<CreatePageModal isOpen onClose={close} />);
    await user.type(screen.getByRole("textbox", { name: /Page Name/ }), "Müşteri Portalı");
    expect(screen.getByRole("textbox", { name: "Page Path" })).toHaveValue("musteri-portali");
    await user.clear(screen.getByRole("textbox", { name: "Page Path" }));
    await user.type(screen.getByRole("textbox", { name: "Page Path" }), "customers/:id");
    await user.click(screen.getByRole("button", { name: "Create Page" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not be created"));
    expect(close).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: /Page Name/ })).toHaveValue("Müşteri Portalı");
    expect(screen.getByRole("textbox", { name: "Page Path" })).toHaveValue("customers/:id");
    await user.click(screen.getByRole("button", { name: "Create Page" }));
    await waitFor(() => expect(close).toHaveBeenCalledOnce());
    expect(createPage).toHaveBeenLastCalledWith(expect.objectContaining({ name: "Müşteri Portalı", slug: "customers/:id" }));
  });
  it("retains a failed collection draft and uses the form submit contract", async () => {
    createCollection.mockRejectedValueOnce(new Error("Offline"));
    const close = vi.fn();
    const user = userEvent.setup();
    render(<CreateContainerModal isOpen onClose={close} />);
    await user.type(screen.getByRole("textbox", { name: /Schema Name/ }), "customers");
    fireEvent.submit(screen.getByRole("form", { name: "Create collection" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not be created"));
    expect(close).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: /Schema Name/ })).toHaveValue("customers");
  });
  it("waits for JSON persistence, prevents cancellation while pending, and retains a rejected payload", async () => {
    let rejectSave: (error: Error) => void = () => {};
    const submit = vi.fn(() => new Promise<void>((_, reject) => { rejectSave = reject; }));
    const close = vi.fn();
    const user = userEvent.setup();
    render(<CreateWithJsonModal isOpen title="Create with JSON" description="Paste a payload" submitLabel="Create" initialJson={{ name: "customers" }} validate={() => null} normalize={(value) => value} onSubmit={submit} onClose={close} />);
    await user.click(screen.getByRole("button", { name: "Create" }));
    expect(close).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    await user.keyboard("{Escape}");
    expect(close).not.toHaveBeenCalled();
    await act(async () => { rejectSave(new Error("Server unavailable")); });
    expect(screen.getByRole("alert")).toHaveTextContent("Server unavailable");
    expect(screen.getByLabelText("JSON payload")).toHaveValue(JSON.stringify({ name: "customers" }, null, 2));
  });
});
