// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContainerModel } from "../../../utils/api/container";
import { ContainersSection } from "./ContainersSection";

const makeContainer = (number: number): ContainerModel => ({
  id: `container-id-${number}`,
  schemaName: `schema-${number}`,
  collectionName: `collection-${number}`,
  fields: [{ name: `field-${number}`, type: "string" }],
  routes: {},
  redis: { isRedisCached: false, cacheTime: 0, triggeredRedisCaches: [] },
  pipelines: [],
  dynamicFunctions: [],
  dynamicApis: [],
  populatedRoutes: [],
});

const allContainers = Array.from({ length: 40 }, (_, index) =>
  makeContainer(index + 1),
);
let mockContainers: ContainerModel[] = allContainers;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, string | number>) =>
      Object.entries(values || {}).reduce(
        (text, [name, value]) => text.replace(`{{${name}}}`, String(value)),
        key,
      ),
  }),
}));

vi.mock("../../../context/User.context", () => ({
  useUserContext: () => ({ user: { roles: ["project_developer"] } }),
}));

vi.mock("../../../utils/api/container", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../utils/api/container")>();
  return {
    ...actual,
    useContainers: () => mockContainers,
    useCreateContainer: () => ({ createContainer: vi.fn(), isCreating: false }),
  };
});

vi.mock("../Modals/CreateContainerModal", () => ({
  CreateContainerModal: () => null,
}));
vi.mock("../Modals/CreateWithJsonModal", () => ({
  CreateWithJsonModal: () => null,
}));
vi.mock("../../PageDesigner/ExcelUploadModal", () => ({
  ExcelUploadModal: () => null,
}));
vi.mock("../Modals/ContainerDetailsModal", () => ({
  ContainerDetailsModal: ({
    isOpen,
    container,
    intent,
    focusArea,
  }: {
    isOpen: boolean;
    container: ContainerModel | null;
    intent?: string;
    focusArea?: string;
  }) =>
    isOpen ? (
      <div
        role="dialog"
        aria-label={`container-${intent}`}
        data-container={container?.schemaName}
        data-focus-area={focusArea}
      />
    ) : null,
}));
vi.mock("../Modals/ContainerDataModal", () => ({
  ContainerDataModal: ({
    isOpen,
    container,
  }: {
    isOpen: boolean;
    container: ContainerModel | null;
  }) =>
    isOpen ? (
      <div role="dialog" aria-label="container-data" data-container={container?.schemaName} />
    ) : null,
}));

describe("ContainersSection", () => {
  beforeEach(() => {
    mockContainers = allContainers;
  });

  it("paginates collections and changes page size", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    expect(screen.getAllByRole("article")).toHaveLength(10);
    expect(screen.getByRole("article", { name: "schema-1 collection" })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: "schema-11 collection" })).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1–10 of 40 collections")).toBeInTheDocument();
    expect(screen.getByText("Total Collections").previousElementSibling).toHaveTextContent("40");

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("article", { name: "schema-11 collection" })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: "schema-1 collection" })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Collections per page"), "20");
    expect(screen.getAllByRole("article")).toHaveLength(20);
    expect(screen.getByRole("article", { name: "schema-20 collection" })).toBeInTheDocument();
  });

  it("uses collection terminology for actions and the toolbar", () => {
    render(<ContainersSection />);

    const actions = screen.getByRole("group", { name: "Collection actions" });
    expect(within(actions).getByRole("button", { name: "Create Collection" })).toHaveAttribute(
      "data-primary-action",
      "true",
    );
    expect(screen.getByRole("toolbar", { name: "Collection toolbar" })).toBeInTheDocument();
    expect(screen.getByRole("search", { name: "Search collections" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Collections" })).not.toHaveTextContent(
      /\bcontainers?\b/i,
    );
  });

  it("uses token-backed dense rows with bounded identifiers and shared focus treatment", () => {
    render(<ContainersSection />);

    const row = screen.getByRole("article", { name: "schema-1 collection" });
    expect(row).toHaveAttribute("data-density", "dense");
    expect(row).toHaveClass("min-h-[var(--ui-row-dense)]");
    expect(within(row).getByRole("heading", { name: "schema-1" })).toHaveClass("truncate");
    expect(within(row).getByRole("button", { name: "Edit" })).toHaveClass("ui-focus-ring");
  });

  it("searches schema, collection, and ID and distinguishes no results", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    const search = screen.getByRole("searchbox", { name: "Search collections" });
    await user.type(search, "collection-35");

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("article", { name: "schema-35 collection" })).toBeInTheDocument();
    expect(screen.getByText("Showing 1–1 of 1 collections")).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "not-a-container");
    expect(screen.getByText("No collections match your search")).toBeInTheDocument();
    expect(screen.queryByText("No collections found in this project")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });

  it("opens Details, Edit, and View Data for the selected container", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    const row = screen.getByRole("article", { name: "schema-3 collection" });
    await user.click(within(row).getByRole("button", { name: "Details" }));
    expect(screen.getByRole("dialog", { name: "container-details" })).toHaveAttribute(
      "data-container",
      "schema-3",
    );
    expect(screen.getByRole("dialog", { name: "container-details" })).toHaveAttribute(
      "data-focus-area",
      "summary",
    );

    await user.click(within(row).getByRole("button", { name: "Edit" }));
    expect(screen.getByRole("dialog", { name: "container-manage" })).toHaveAttribute(
      "data-container",
      "schema-3",
    );
    expect(screen.getByRole("dialog", { name: "container-manage" })).toHaveAttribute(
      "data-focus-area",
      "fields",
    );

    await user.click(within(row).getByRole("button", { name: "View Data" }));
    expect(screen.getByRole("dialog", { name: "container-data" })).toHaveAttribute(
      "data-container",
      "schema-3",
    );
  });

  it("shows the project empty state when there are no collections", () => {
    mockContainers = [];
    render(<ContainersSection />);
    expect(screen.getByText("No collections found in this project")).toBeInTheDocument();
    expect(screen.queryByText("No collections match your search")).not.toBeInTheDocument();
  });
});
