// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { ContainerModel } from "../../../utils/api/container";
import { ContainerDetailsModal } from "./ContainerDetailsModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (text, [name, value]) => text.replace(`{{${name}}}`, value),
        key,
      ),
  }),
}));

vi.mock("../../../utils/dynamic", () => ({
  useGetSelection: () => [],
}));

vi.mock("../../../hooks/useTenant", () => ({
  useTenant: () => ({ currentTenant: { slug: "acme" } }),
}));

vi.mock("../../../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({ currentProject: { slug: "shop" } }),
}));

vi.mock("../../../utils/api/roleInfo", () => ({
  useRoleItems: () => ({ data: [] }),
}));

vi.mock("../../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../../utils/api/container")
  >();
  return {
    ...actual,
    useGetContainers: () => [],
    useCreateProjectAuthUser: () => ({
      createAuthUser: vi.fn(),
      isCreatingAuthUser: false,
    }),
    useUpdateContainer: () => ({
      updateContainer: vi.fn(),
      updateContainerAsync: vi.fn().mockResolvedValue(undefined),
      isUpdating: false,
    }),
    useUpdatePipelines: () => ({
      updatePipelines: vi.fn(),
      isUpdating: false,
    }),
    useUpdateWorkflows: () => ({
      updateWorkflows: vi.fn(),
      updateWorkflowsAsync: vi.fn().mockResolvedValue(undefined),
      isUpdating: false,
    }),
    useUpdateDynamicApis: () => ({
      updateDynamicApis: vi.fn(),
      isUpdating: false,
    }),
  };
});

const stock: ContainerModel = {
  id: "stock-id",
  schemaName: "stock",
  collectionName: "tenant_stock",
  fields: [
    {
      name: "product",
      type: "objectId",
      objectSchemaName: "catalog",
      tag: "required",
      isSearchable: true,
    },
    { name: "quantity", type: "int", tag: "required,min=1" },
  ],
  routes: {},
  redis: {
    isRedisCached: false,
    cacheTime: 10,
    triggeredRedisCaches: [],
  },
  pipelines: [],
  workflows: [],
  dynamicFunctions: [],
  dynamicApis: [],
  populatedRoutes: [],
};

describe("ContainerDetailsModal", () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it.each([
    [5, "Cache enabled (5 min)"],
    [0, "Cache enabled (server default)"],
  ])("shows the configured workflow cache duration %s in the Workflows tab", async (cacheTime, label) => {
    const user = userEvent.setup();
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{ ...stock, workflows: [
          { name: "loadPublicPage", isActive: true, isRedisCached: true, cacheTime },
          { name: "legacyWorkflow", isActive: true },
        ] }}
      />,
    );
    await user.click(screen.getByRole("tab", { name: "Workflows" }));
    expect(screen.getAllByText(/Cache enabled/)).toHaveLength(1);
    expect(screen.getByText(label)).toBeVisible();
  });

  it("omits paused function routes from the overview and its route count", async () => {
    const user = userEvent.setup();
    const route = {
      isActive: true,
      isAuthenticated: false,
      isAuthorized: false,
      authorizeRole: [],
      method: "GET",
    };
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{
          ...stock,
          routes: {
            ExecuteDynamicCode: route,
            ExecuteWorkflow: route,
            GetPipeline: route,
          },
        }}
      />,
    );

    const summary = screen.getByText("Available Routes").closest("summary")!;
    expect(within(summary).getByText("2")).toBeInTheDocument();
    await user.click(summary);
    expect(screen.queryByText("Execute Dynamic Code")).not.toBeInTheDocument();
    expect(screen.getByText("Execute Workflow")).toBeVisible();
    expect(screen.getByText("Get Pipeline")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Workflows" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Dynamic APIs" })).toBeInTheDocument();
  });

  it("omits the available-routes summary when only a paused function route remains", () => {
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{ ...stock, routes: { ExecuteDynamicCode: {
          isActive: true,
          isAuthenticated: false,
          isAuthorized: false,
          authorizeRole: [],
          method: "GET",
        } } }}
      />,
    );

    expect(screen.queryByText("Available Routes")).not.toBeInTheDocument();
  });

  it("opens the manager at its searchable Fields section", async () => {
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={stock}
        intent="manage"
        initialSection="structured"
        focusArea="fields"
      />,
    );

    expect(
      screen.getByRole("dialog", { name: "Manage stock" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^Fields/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: "Search fields" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("toolbar", { name: "Field toolbar" })).toBeInTheDocument();
    await waitFor(() =>
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled(),
    );
  });

  it("labels authentication configuration semantically", () => {
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{ ...stock, isAuthContainer: true }}
        intent="details"
      />,
    );

    expect(screen.getByRole("region", { name: "Authentication" })).toBeInTheDocument();
    expect(screen.getAllByText("Auth Collection")[0]).toHaveAttribute(
      "data-variant",
      "success",
    );
    expect(screen.getByRole("dialog")).not.toHaveTextContent(/\bcontainers?\b/i);
  });

  it("uses keyboard-accessible workspace tabs and a compact overview", async () => {
    const user = userEvent.setup();
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={stock}
        intent="details"
      />,
    );

    const structuredTab = screen.getByRole("tab", { name: "Structured" });
    expect(screen.getByRole("tablist")).toHaveClass("overflow-x-auto");
    expect(screen.getByRole("tab", { name: "Endpoints" })).toBeInTheDocument();
    const dialog = screen.getByRole("dialog", { name: "stock" });
    expect(dialog.children.item(1)).toHaveClass("min-w-0");
    expect(within(dialog).getByRole("heading", { name: "stock" }).firstElementChild).toHaveClass(
      "break-all",
      "sm:break-normal",
    );
    expect(structuredTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("region", { name: "Collection overview" })).toBeInTheDocument();

    structuredTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Endpoints" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Pipelines" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("lists swagger-style request paths for available routes", async () => {
    const user = userEvent.setup();
    const route = {
      isActive: true,
      isAuthenticated: true,
      isAuthorized: false,
      authorizeRole: [],
      method: "GET",
    };
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{
          ...stock,
          routes: {
            GetAllDynamicModelItems: { ...route, method: "GET" },
            CreateDynamicModelItem: { ...route, method: "POST" },
            UpdateDynamicModelItem: { ...route, method: "PATCH" },
            ExecuteDynamicCode: route,
          },
        }}
        intent="details"
      />,
    );

    await user.click(screen.getByRole("tab", { name: "Endpoints" }));

    expect(
      screen.getByText("https://api-production.autoapi.org/api/v1/acme/shop/"),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("/dynamic?schemaName=stock").length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByText("/dynamic/{id}?schemaName=stock"),
    ).toBeInTheDocument();
    expect(screen.getByText("Create a record")).toBeInTheDocument();
    expect(
      screen.getAllByText("Example payload").length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Example response")).toBeInTheDocument();
    expect(screen.getAllByText(/"product":/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/"quantity":/).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("Execute Dynamic Code")).not.toBeInTheDocument();
  });

  it("renders accessible Edit and Delete buttons for each field", () => {
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={stock}
        intent="details"
      />,
    );

    const productRow = screen.getByRole("row", { name: /product/i });
    expect(productRow).toHaveAttribute("data-density", "dense");
    expect(productRow).toHaveClass("min-h-[var(--ui-row-dense)]");
    expect(within(productRow).getByText("product")).toHaveClass("truncate");
    expect(within(productRow).getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(within(productRow).getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("keeps authentication settings labeled at standard row density", () => {
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={{ ...stock, isAuthContainer: true }}
        intent="details"
      />,
    );

    const authentication = screen.getByRole("region", { name: "Authentication" });
    const registration = within(authentication).getByRole("switch", {
      name: "Registration Active",
    });
    const registrationRow = registration.closest("label");
    expect(registrationRow).toHaveAttribute("data-density", "standard");
    expect(registrationRow).toHaveClass("min-h-[var(--ui-row-standard)]");
  });

  it("filters fields safely and keeps the parent open after editing", async () => {
    const user = userEvent.setup();
    render(
      <ContainerDetailsModal
        isOpen
        onClose={vi.fn()}
        container={stock}
        intent="details"
      />,
    );

    const search = screen.getByRole("searchbox", { name: "Search fields" });
    await user.type(search, "quantity");
    expect(screen.getByRole("searchbox", { name: "Search fields" })).toHaveValue("quantity");
    expect(screen.getByRole("heading", { name: "Fields (1/2)" })).toBeInTheDocument();

    const stockDialogs = screen.getAllByRole("dialog", { name: "stock" });
    const currentDialog = stockDialogs[stockDialogs.length - 1];
    expect(within(currentDialog).queryByText("product")).not.toBeInTheDocument();
    expect(within(currentDialog).getByText("quantity")).toBeInTheDocument();
    within(currentDialog)
      .getAllByTitle("Clear field search to reorder fields")
      .forEach((button) => expect(button).toBeDisabled());
    expect(within(currentDialog).getByRole("button", { name: "Add Field" })).toBeInTheDocument();

    const quantityRow = within(currentDialog).getByRole("row", { name: /quantity/i });
    await user.click(within(quantityRow).getByRole("button", { name: "Edit" }));
    expect(
      await screen.findByRole("dialog", { name: "Edit field: quantity" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(currentDialog).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "missing");
    expect(within(currentDialog).getByText("No fields match your search")).toBeInTheDocument();
    expect(within(currentDialog).getByRole("button", { name: "Add Field" })).toBeInTheDocument();
    const clearButtons = within(currentDialog).getAllByRole("button", {
      name: "Clear field search",
    });
    await user.click(clearButtons[clearButtons.length - 1]);
    expect(within(currentDialog).getByText("product")).toBeInTheDocument();
  });
});
