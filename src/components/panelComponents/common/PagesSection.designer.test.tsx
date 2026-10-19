// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PagesSection } from "./PagesSection";

let mockLoading = false;
let mockError = false;
const mockRefetch = vi.fn();
const mockSave = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));
vi.mock("react-router-dom", async (importOriginal) => ({ ...await importOriginal<typeof import("react-router-dom")>(), useNavigate: () => vi.fn() }));
vi.mock("../../../context/User.context", () => ({
  useUserContext: () => ({ user: { roles: ["project_developer"] } }),
}));
vi.mock("../../../utils/api/page", () => ({
  useGetTenantPagesQuery: () => ({ isLoading: mockLoading, error: mockError ? new Error("Offline") : null, refetch: mockRefetch, data: mockLoading || mockError ? [] : [{
    id: "page-1",
    name: "Happy Friday",
    slug: "happy-friday",
    icon: "MdCardGiftcard",
    sections: [{ columns: 1, gap: 16, cells: [] }],
    filters: [],
  }] }),
  useUpdatePage: () => ({ updatePage: vi.fn(), updatePageAsync: mockSave, isUpdating: false }),
  useCreatePage: () => ({ createPage: vi.fn(), isCreating: false }),
}));
vi.mock("../../PageDesigner/PageDesigner", () => ({
  PageDesigner: () => <div data-testid="designer-content">Canvas workspace</div>,
}));
vi.mock("../../PageDesigner/PageNavigatorEditor", () => ({
  PageNavigatorEditor: () => <div data-testid="navigation-settings">Breadcrumb settings</div>,
}));
vi.mock("../Modals/CreatePageModal", () => ({ CreatePageModal: () => null }));
vi.mock("../Modals/CreateWithJsonModal", () => ({ CreateWithJsonModal: () => null }));
vi.mock("../Modals/PageDetailsModal", () => ({ PageDetailsModal: () => null }));

describe("PagesSection designer workspace", () => {
  beforeEach(() => { mockLoading = false; mockError = false; mockRefetch.mockClear(); mockSave.mockReset().mockResolvedValue({}); });
  it("separates content, navigation, and page settings into accessible tabs", async () => {
    const user = userEvent.setup();
    const { container } = render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));

    const workspace = screen.getByTestId("page-editor-workspace");
    expect(workspace).toHaveClass("bg-ui-page");
    expect(container).not.toContainElement(workspace);
    expect(document.body).toContainElement(workspace);

    const tabs = screen.getByRole("tablist", { name: "Page editor sections" });
    const toolbar = screen.getByTestId("page-editor-toolbar");
    expect(toolbar).toContainElement(tabs);
    expect(within(toolbar).getByRole("heading", { name: "Happy Friday" })).toBeInTheDocument();
    expect(within(toolbar).getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(within(toolbar).getByRole("button", { name: "Save Page" })).toBeInTheDocument();
    expect(tabs).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Content" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("designer-content")).toBeInTheDocument();
    expect(screen.queryByTestId("navigation-settings")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Navigation" }));
    expect(screen.getByTestId("navigation-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("designer-content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Page settings" }));
    expect(screen.getByLabelText("Page Name")).toHaveValue("Happy Friday");
    expect(screen.getByLabelText("Page Icon")).toBeInTheDocument();
  });

  it("shows page loading and retry states instead of an empty project", async () => {
    mockLoading = true;
    const { rerender } = render(<PagesSection />);
    expect(screen.getByRole("status", { name: "Loading pages" })).toBeInTheDocument();
    mockLoading = false;
    mockError = true;
    rerender(<PagesSection />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pages could not be loaded");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(mockRefetch).toHaveBeenCalledOnce();
  });


  it("keeps edited page details until changes are saved or explicitly discarded", async () => {
    const user = userEvent.setup();
    render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.click(screen.getByRole("tab", { name: "Page settings" }));
    await user.clear(screen.getByLabelText("Page Name"));
    await user.type(screen.getByLabelText("Page Name"), "Customer Portal");
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByRole("dialog", { name: "Discard unsaved changes?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Keep editing" }));
    expect(screen.getByLabelText("Page Name")).toHaveValue("Customer Portal");
    await user.click(screen.getByRole("button", { name: "Save Page" }));
    await waitFor(() => expect(screen.getByText("All changes saved")).toBeInTheDocument());
    expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ name: "Customer Portal" }) }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByTestId("page-editor-workspace")).not.toBeInTheDocument();
  });

  it("retains changes after a save failure and supports keyboard tab navigation", async () => {
    mockSave.mockRejectedValueOnce(new Error("Offline"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    const content = screen.getByRole("tab", { name: "Content" });
    content.focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Page settings" })).toHaveAttribute("aria-selected", "true");
    await user.type(screen.getByLabelText("Page Name"), " updated");
    await user.click(screen.getByRole("button", { name: "Save Page" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Your page could not be saved"));
    expect(screen.getByLabelText("Page Name")).toHaveValue("Happy Friday updated");
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
    vi.restoreAllMocks();
  });


  it("preserves edits made while an earlier save is in flight", async () => {
    let finishSave: (value: unknown) => void = () => {};
    mockSave.mockImplementationOnce(() => new Promise((resolve) => { finishSave = resolve; }));
    const user = userEvent.setup();
    render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.click(screen.getByRole("tab", { name: "Page settings" }));
    const name = screen.getByLabelText("Page Name");
    await user.clear(name);
    await user.type(name, "First draft");
    await user.click(screen.getByRole("button", { name: "Save Page" }));
    await user.clear(name);
    await user.type(name, "Newer draft");
    await act(async () => { finishSave({}); });
    expect(name).toHaveValue("Newer draft");
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
  });

  it("warns before leaving a dirty editor and removes the warning after discard", async () => {
    const user = userEvent.setup();
    render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.click(screen.getByRole("tab", { name: "Page settings" }));
    await user.type(screen.getByLabelText("Page Name"), " changed");
    const dirtyUnload = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(dirtyUnload);
    expect(dirtyUnload.defaultPrevented).toBe(true);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(screen.queryByTestId("page-editor-workspace")).not.toBeInTheDocument();
    const cleanUnload = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(cleanUnload);
    expect(cleanUnload.defaultPrevented).toBe(false);
  });


  it("finds pages by name or URL and distinguishes no results from an empty project", async () => {
    const user = userEvent.setup();
    render(<PagesSection />);
    const search = screen.getByRole("searchbox", { name: "Search pages" });
    await user.type(search, "happy-friday");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, "missing-page");
    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
    expect(screen.getByRole("status", { name: "No pages match your search" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

});
