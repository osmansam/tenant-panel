// @vitest-environment jsdom
import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PagePermissions from "./PagePermissions";

let loading = false;
let failed = false;
let updating = false;
const update = vi.fn();
const retry = vi.fn();
const success = vi.fn();
const pages = [{ id: "page-1", name: "Customers", slug: "customers", isAuthenticated: false }, { id: "page-2", name: "Orders", slug: "orders" }];
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock("react-toastify", () => ({ toast: { success: (...args: unknown[]) => success(...args) } }));
vi.mock("../utils/api/page", () => ({
  useGetTenantPages: () => pages,
  useGetTenantPagesQuery: () => ({ data: pages, isLoading: loading, error: failed ? new Error("Offline") : null, refetch: retry }),
  useUpdatePage: () => ({ updatePage: update, isUpdating: updating }),
}));
vi.mock("../utils/api/roleInfo", () => ({ useRoleItems: () => ({ data: [] }) }));
vi.mock("./panelComponents/Tables/DataTable", () => ({ default: ({ rows, rowKeys, filters }: { rows: { pageId: string; pageName: string }[]; rowKeys: { key: string; node?: (row: unknown) => ReactNode }[]; filters: { label: string; node: ReactNode }[] }) => <div>{filters.map((filter) => <div key={filter.label}>{filter.node}</div>)}{rows.map((row) => <div key={row.pageId}><h2>{row.pageName}</h2>{rowKeys.map((key) => key.node ? <div key={key.key}>{key.node(row)}</div> : null)}</div>)}</div> }));

describe("page permissions feedback", () => {
  beforeEach(() => { loading = false; failed = false; updating = false; update.mockClear(); retry.mockClear(); success.mockClear(); });
  it("shows only the selected page and omits editing controls for a read-only view", () => {
    render(<PagePermissions pageId="page-1" readOnly />);
    expect(screen.getByRole("heading", { name: "Customers" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Orders" })).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });
  it("does not announce success before persistence and locks changes while a request is pending", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<PagePermissions pageId="page-1" />);
    await user.click(screen.getByRole("switch", { name: "Enable Edit" }));
    await user.click(screen.getByRole("switch", { name: "Sign-in required: Customers" }));
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ id: "page-1", payload: expect.objectContaining({ isAuthenticated: true }) }));
    expect(success).not.toHaveBeenCalled();
    updating = true;
    rerender(<PagePermissions pageId="page-1" />);
    expect(screen.getByRole("switch", { name: "Sign-in required: Customers" })).toBeDisabled();
  });
  it("distinguishes loading and failed requests from an empty permission table", async () => {
    loading = true;
    const { rerender } = render(<PagePermissions />);
    expect(screen.getByRole("status", { name: "Loading page permissions" })).toBeInTheDocument();
    loading = false; failed = true;
    rerender(<PagePermissions />);
    expect(screen.getByRole("alert")).toHaveTextContent("Page permissions could not be loaded");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
