// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ContainerModel } from "../../../utils/api/container";
import { ContainerDataModal } from "./ContainerDataModal";

const mockGenericPaginatedPage = vi.fn((_props: unknown) => (
  <div>Read-only records</div>
));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (text, [name, value]) => text.replace(`{{${name}}}`, value),
        key,
      ),
  }),
}));

vi.mock("../FormElements/GenericPaginatedPage", () => ({
  default: (props: unknown) => mockGenericPaginatedPage(props),
}));

const stock = {
  id: "stock-id",
  schemaName: "stock",
  collectionName: "tenant_stock",
  fields: [],
  routes: {},
  redis: { isRedisCached: false, cacheTime: 0, triggeredRedisCaches: [] },
  pipelines: [],
  dynamicFunctions: [],
  dynamicApis: [],
  populatedRoutes: [],
} satisfies ContainerModel;

describe("ContainerDataModal", () => {
  it("opens a read-only data workspace for the selected container", () => {
    render(
      <ContainerDataModal
        isOpen
        onClose={vi.fn()}
        container={stock}
      />,
    );

    expect(mockGenericPaginatedPage).toHaveBeenCalledWith(
      expect.objectContaining({
        schemaName: "stock",
        actionsEnabled: false,
        isHeader: false,
        customTitle: "stock data",
      }),
    );
    const dialog = screen.getByRole("dialog", { name: "stock data" });
    expect(dialog).toBeInTheDocument();
    expect(dialog.children.item(1)).toHaveClass("min-w-0");
    expect(screen.getByRole("heading", { name: "stock data" }).firstElementChild).toHaveClass(
      "break-all",
      "sm:break-normal",
    );
    expect(screen.getByText("Read-only records from stock")).toHaveClass(
      "break-all",
      "sm:break-normal",
    );
  });
});
