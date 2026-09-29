// @vitest-environment jsdom

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RoutePermissions from "./RoutePermissions";

const state = vi.hoisted(() => ({
  updateContainer: vi.fn(),
  updateContainerAsync: vi.fn(),
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
  useUpdateContainer: () => ({
    updateContainer: state.updateContainer,
    updateContainerAsync: state.updateContainerAsync,
  }),
}));

vi.mock("../utils/api/roleInfo", () => ({
  useRoleItems: () => [],
}));

vi.mock("./panelComponents/Tables/GenericTable", () => ({
  default: ({ columns, filters }: { columns: Array<{ key: string; headerNode?: React.ReactNode }>; filters: Array<{ label: string; node: React.ReactNode }> }) => (
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
