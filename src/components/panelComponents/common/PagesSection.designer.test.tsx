// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PagesSection } from "./PagesSection";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));
vi.mock("react-router-dom", () => ({ useNavigate: () => vi.fn() }));
vi.mock("../../../context/User.context", () => ({
  useUserContext: () => ({ user: { roles: ["project_developer"] } }),
}));
vi.mock("../../../utils/api/page", () => ({
  useGetTenantPages: () => [{
    id: "page-1",
    name: "Happy Friday",
    slug: "happy-friday",
    icon: "MdCardGiftcard",
    sections: [{ columns: 1, gap: 16, cells: [] }],
    filters: [],
  }],
  useUpdatePage: () => ({ updatePage: vi.fn(), updatePageAsync: vi.fn(), isUpdating: false }),
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
  it("separates content, navigation, and page settings into accessible tabs", async () => {
    const user = userEvent.setup();
    render(<PagesSection />);
    await user.click(screen.getByRole("button", { name: "Edit" }));

    const tabs = screen.getByRole("tablist", { name: "Page editor sections" });
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
});
