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

  it("paginates the container collection and changes page size", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    expect(screen.getAllByRole("article")).toHaveLength(10);
    expect(screen.getByRole("article", { name: "schema-1 container" })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: "schema-11 container" })).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1–10 of 40 containers")).toBeInTheDocument();
    expect(screen.getByText("Total Containers").previousElementSibling).toHaveTextContent("40");

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("article", { name: "schema-11 container" })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: "schema-1 container" })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Containers per page"), "20");
    expect(screen.getAllByRole("article")).toHaveLength(20);
    expect(screen.getByRole("article", { name: "schema-20 container" })).toBeInTheDocument();
  });

  it("exposes one primary create action and a named container toolbar", () => {
    render(<ContainersSection />);

    const actions = screen.getByRole("group", { name: "Container actions" });
    expect(within(actions).getByRole("button", { name: "Create Container" })).toHaveAttribute(
      "data-primary-action",
      "true",
    );
    expect(screen.getByRole("search", { name: "Container toolbar" })).toBeInTheDocument();
  });

  it("searches schema, collection, and ID and distinguishes no results", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    const search = screen.getByRole("searchbox", { name: "Search containers" });
    await user.type(search, "collection-35");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("article", { name: "schema-35 container" })).toBeInTheDocument();
    expect(screen.getByText("Showing 1–1 of 1 containers")).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "not-a-container");
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(screen.getByText("No containers match your search")).toBeInTheDocument();
    expect(screen.queryByText("No containers found in this project")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getAllByRole("article")).toHaveLength(10);
  });

  it("opens Details, Edit, and View Data for the selected container", async () => {
    const user = userEvent.setup();
    render(<ContainersSection />);

    const row = screen.getByRole("article", { name: "schema-3 container" });
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

  it("shows the project empty state when there are no containers", () => {
    mockContainers = [];
    render(<ContainersSection />);
    expect(screen.getByText("No containers found in this project")).toBeInTheDocument();
    expect(screen.queryByText("No containers match your search")).not.toBeInTheDocument();
  });
});
