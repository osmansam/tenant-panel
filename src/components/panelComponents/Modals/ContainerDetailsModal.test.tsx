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
    expect(screen.getByRole("group", { name: "Field toolbar" })).toBeInTheDocument();
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
    expect(screen.getAllByText("Auth Container")[0]).toHaveAttribute(
      "data-variant",
      "success",
    );
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
    expect(structuredTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("region", { name: "Container overview" })).toBeInTheDocument();

    structuredTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Pipelines" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
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
    expect(within(productRow).getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(within(productRow).getByRole("button", { name: "Delete" })).toBeInTheDocument();
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
