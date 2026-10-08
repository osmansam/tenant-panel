// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RoutePermissions from "./RoutePermissions";

const state = vi.hoisted(() => ({
  updateContainer: vi.fn(),
  updateContainerAsync: vi.fn(),
  containers: [],
  container: {
    id: "container-1",
    schemaName: "orders",
    fields: [],
    routes: {
      createItem: {
        isActive: true,
        isAuthenticated: true,
        isAuthorized: true,
        authorizeRole: ["admin"],
        method: "POST",
      },
      listItems: {
        isActive: false,
        isAuthenticated: true,
        isAuthorized: true,
        authorizeRole: ["user"],
        method: "GET",
      },
    },
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (value: string) => value }),
}));

vi.mock("../utils/api/container", () => ({
  useContainer: () => state.container,
  useContainers: () => state.containers,
  useUpdateContainer: () => ({
    updateContainer: state.updateContainer,
    updateContainerAsync: state.updateContainerAsync,
  }),
}));

vi.mock("../utils/api/roleInfo", () => ({
  useRoleItems: () => [],
}));

vi.mock("./panelComponents/Tables/GenericTable", () => ({
  default: ({ columns, filters, rowKeys, rows }: {
    columns: Array<{ key: string; headerNode?: React.ReactNode }>;
    filters: Array<{ label: string; node: React.ReactNode }>;
    rowKeys: Array<{ key: string; node: (row: any) => React.ReactNode }>;
    rows: any[];
  }) => (
    <div>
      {filters.map((filter) => (
        <div key={filter.label}>{filter.node}</div>
      ))}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.key}
                {column.headerNode}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.routeName}>
              {rowKeys.map((rowKey) => (
                <td key={rowKey.key}>{rowKey.node(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}));

async function enableEditing() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("switch"));
  return user;
}

describe("RoutePermissions bulk switches", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.updateContainerAsync.mockResolvedValue(undefined);
    state.container = {
      id: "container-1",
      schemaName: "orders",
      fields: [],
      routes: {
        createItem: {
          isActive: true,
          isAuthenticated: true,
          isAuthorized: true,
          authorizeRole: ["admin"],
          method: "POST",
        },
        listItems: {
          isActive: false,
          isAuthenticated: true,
          isAuthorized: true,
          authorizeRole: ["user"],
          method: "GET",
        },
      },
    };
  });

  it("shows bulk switches in edit mode and turns every active route on", async () => {
    render(<RoutePermissions containerId="container-1" />);

    expect(screen.queryByRole("switch", { name: "Set all Is Active" })).not.toBeInTheDocument();
    const user = await enableEditing();

    const activeSwitch = screen.getByRole("switch", { name: "Set all Is Active" });
    expect(activeSwitch).not.toBeChecked();
    await user.click(activeSwitch);

    expect(state.updateContainerAsync).toHaveBeenCalledWith({
      id: "container-1",
      payload: {
        ...state.container,
        routes: {
          createItem: {
            isActive: true,
            isAuthenticated: true,
            isAuthorized: true,
            authorizeRole: ["admin"],
            method: "POST",
          },
          listItems: {
            isActive: true,
            isAuthenticated: true,
            isAuthorized: true,
            authorizeRole: ["user"],
            method: "GET",
          },
        },
      },
    });
  });

  it("turns authentication off for every route", async () => {
    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();

    const authenticatedSwitch = screen.getByRole("switch", {
      name: "Set all Is Authenticated",
    });
    expect(authenticatedSwitch).toBeChecked();
    await user.click(authenticatedSwitch);

    expect(state.updateContainerAsync.mock.calls[0][0].payload.routes).toEqual({
      createItem: {
        isActive: true,
        isAuthenticated: false,
        isAuthorized: true,
        authorizeRole: ["admin"],
        method: "POST",
      },
      listItems: {
        isActive: false,
        isAuthenticated: false,
        isAuthorized: true,
        authorizeRole: ["user"],
        method: "GET",
      },
    });
  });

  it("turns authorization off for every route and clears assigned roles", async () => {
    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();

    const authorizedSwitch = screen.getByRole("switch", {
      name: "Set all Is Authorized",
    });
    expect(authorizedSwitch).toBeChecked();
    await user.click(authorizedSwitch);

    expect(state.updateContainerAsync.mock.calls[0][0].payload.routes).toEqual({
      createItem: {
        isActive: true,
        isAuthenticated: true,
        isAuthorized: false,
        authorizeRole: [],
        method: "POST",
      },
      listItems: {
        isActive: false,
        isAuthenticated: true,
        isAuthorized: false,
        authorizeRole: [],
        method: "GET",
      },
    });
  });

  it("queues rapid bulk changes and carries the first change into the second payload", async () => {
    let finishFirstUpdate: (() => void) | undefined;
    state.updateContainerAsync
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finishFirstUpdate = resolve;
          }),
      )
      .mockResolvedValueOnce(undefined);

    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();

    await user.click(screen.getByRole("switch", { name: "Set all Is Active" }));
    await user.click(
      screen.getByRole("switch", { name: "Set all Is Authenticated" }),
    );

    expect(state.updateContainerAsync).toHaveBeenCalledTimes(1);
    finishFirstUpdate?.();
    await waitFor(() => expect(state.updateContainerAsync).toHaveBeenCalledTimes(2));

    expect(state.updateContainerAsync.mock.calls[1][0].payload.routes).toEqual({
      createItem: {
        isActive: true,
        isAuthenticated: false,
        isAuthorized: true,
        authorizeRole: ["admin"],
        method: "POST",
      },
      listItems: {
        isActive: true,
        isAuthenticated: false,
        isAuthorized: true,
        authorizeRole: ["user"],
        method: "GET",
      },
    });
  });

  it("accepts a different authoritative route state after the update settles", async () => {
    const { rerender } = render(
      <RoutePermissions containerId="container-1" />,
    );
    const user = await enableEditing();

    await user.click(screen.getByRole("switch", { name: "Set all Is Active" }));
    await waitFor(() =>
      expect(state.updateContainerAsync).toHaveBeenCalledTimes(1),
    );
    expect(
      screen.getByRole("switch", { name: "Set all Is Active" }),
    ).toBeChecked();

    state.container = {
      ...state.container,
      routes: {
        ...state.container.routes,
        createItem: {
          ...state.container.routes.createItem,
          isActive: false,
        },
        listItems: {
          ...state.container.routes.listItems,
          isActive: false,
        },
      },
    };
    rerender(<RoutePermissions containerId="container-1" />);

    await waitFor(() =>
      expect(
        screen.getByRole("switch", { name: "Set all Is Active" }),
      ).not.toBeChecked(),
    );
  });
});

describe("RoutePermissions access policies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.updateContainerAsync.mockResolvedValue(undefined);
    state.container = {
      id: "container-1",
      schemaName: "orders",
      fields: [
        { name: "ownerId", type: "objectId" },
        { name: "status", type: "string" },
      ],
      routes: {
        CreateDynamicModelItem: {
          isActive: true,
          isAuthenticated: false,
          isAuthorized: false,
          authorizeRole: [],
          method: "POST",
        },
        UpdateDynamicModelItem: {
          isActive: true,
          isAuthenticated: true,
          isAuthorized: false,
          authorizeRole: [],
          method: "PATCH",
          access: {
            any: [
              {
                field: "ownerId",
                operator: "eq",
                value: "{{auth.user.id}}",
              },
            ],
          },
        },
        GetPipeline: {
          isActive: true,
          isAuthenticated: false,
          isAuthorized: false,
          authorizeRole: [],
          method: "GET",
        },
      },
    } as any;
  });

  it("shows policy summaries and edit actions only for record-backed routes", async () => {
    render(<RoutePermissions containerId="container-1" />);
    expect(screen.getByText("No policy")).toBeInTheDocument();
    expect(
      screen.getByText("Allow ownerId equals current user ID"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Edit Policy" })).not.toBeInTheDocument();

    await enableEditing();
    expect(screen.getAllByRole("button", { name: "Edit Policy" })).toHaveLength(2);
  });

  it("saves a policy on only the selected route and forces authentication", async () => {
    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();
    await user.click(screen.getAllByRole("button", { name: "Edit Policy" })[0]);
    await user.click(screen.getByRole("button", { name: "Add allow rule" }));
    fireEvent.change(screen.getByLabelText("Rule value 1"), {
      target: { value: "{{auth.user.id}}" },
    });
    await user.click(screen.getByRole("button", { name: "Save policy" }));

    const savedRoutes = state.updateContainerAsync.mock.calls[0][0].payload.routes;
    expect(savedRoutes.CreateDynamicModelItem).toMatchObject({
      isAuthenticated: true,
      access: {
        any: [
          { field: "ownerId", operator: "eq", value: "{{auth.user.id}}" },
        ],
      },
    });
    expect(savedRoutes.UpdateDynamicModelItem.access).toEqual(
      (state.container.routes as any).UpdateDynamicModelItem.access,
    );
  });

  it("keeps policy-protected routes authenticated during a bulk disable", async () => {
    state.container = {
      ...state.container,
      routes: Object.fromEntries(
        Object.entries(state.container.routes).map(([name, route]) => [
          name,
          { ...route, isAuthenticated: true },
        ]),
      ),
    } as any;
    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();
    await user.click(
      screen.getByRole("switch", { name: "Set all Is Authenticated" }),
    );
    const savedRoutes = state.updateContainerAsync.mock.calls[0][0].payload.routes;
    expect(savedRoutes.CreateDynamicModelItem.isAuthenticated).toBe(false);
    expect(savedRoutes.UpdateDynamicModelItem.isAuthenticated).toBe(true);
  });

  it("locks authentication while a policy exists and unlocks it after removal", async () => {
    render(<RoutePermissions containerId="container-1" />);
    const user = await enableEditing();
    const authSwitch = screen.getByRole("switch", {
      name: "Is Authenticated Update Dynamic Model Item",
    });
    expect(authSwitch).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: "Edit Policy" })[1]);
    await user.click(screen.getByRole("button", { name: "Remove policy" }));
    await waitFor(() => expect(state.updateContainerAsync).toHaveBeenCalledTimes(1));

    expect(
      screen.getByRole("switch", {
        name: "Is Authenticated Update Dynamic Model Item",
      }),
    ).not.toBeDisabled();
  });
});
