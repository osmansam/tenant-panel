// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ColumnType, RowKeyType } from "../shared/types";
import DataTable from "./DataTable";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

type Row = { name: string; status: boolean };

const rows: Row[] = [
  { name: "alpha", status: true },
  { name: "beta", status: false },
];

const columns: ColumnType[] = [
  { key: "Name", correspondingKey: "name", isSortable: true },
  {
    key: "Status",
    correspondingKey: "status",
    isSortable: true,
    headerNode: <button type="button">Set all</button>,
  },
];

const rowKeys: RowKeyType<Row>[] = [
  { key: "name", node: (row) => <span>{row.name}</span> },
  { key: "status", node: (row) => <span>{row.status ? "Yes" : "No"}</span> },
];

describe("DataTable", () => {
  it("renders header controls passed through headerNode", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKeys={rowKeys}
        isSearch={false}
      />,
    );

    const header = screen.getByRole("columnheader", { name: /Status/ });
    expect(header).toContainElement(
      screen.getByRole("button", { name: "Set all" }),
    );
  });

  it("filters rows with search and shows the empty state", async () => {
    const user = userEvent.setup();
    render(<DataTable rows={rows} columns={columns} rowKeys={rowKeys} />);

    await user.type(screen.getByPlaceholderText("Search"), "beta");

    expect(screen.getByText("beta")).toBeInTheDocument();
    expect(screen.queryByText("alpha")).not.toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText("Search"));
    await user.type(screen.getByPlaceholderText("Search"), "missing");

    expect(screen.getByText("No matching records")).toBeInTheDocument();
  });
});
