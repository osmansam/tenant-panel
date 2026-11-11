// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { PageDesigner } from "./PageDesigner";
import { sampleDocument } from "../../visualBuilder/testFixtures";
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async original => ({ ...await original<typeof import("../../utils/api/container")>(), useGetContainers: () => [] }));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));
it("offers visual sections from Structure Add and displays them beside grids", async () => {
 const add = vi.fn(), remove = vi.fn();
 render(<PageDesigner sections={[{ columns: 1, cells: [] }]} onChange={vi.fn()} pageSections={[
  { columns: 1, cells: [] },
  { id: "visual-section", type: "component", component: { id: "visual", type: "custom", title: "Product hero", props: { visualBuilder: { document: sampleDocument } } } },
 ]} onAddVisualSection={add} onDeleteVisualSection={remove} />);
 const nav = screen.getByRole("navigation", { name: "Page structure" });
 expect(within(nav).getByText("Product hero")).toBeInTheDocument();
 expect(within(nav).getByText("2 sections")).toBeInTheDocument();
 await userEvent.click(screen.getByRole("button", { name: "Add section" }));
 await userEvent.click(screen.getByRole("menuitem", { name: "Visual section" }));
 expect(add).toHaveBeenCalledOnce();
 await userEvent.click(screen.getByRole("button", { name: /Product hero, visual section/ }));
 expect(await screen.findByRole("heading", { name: "Product hero" })).toBeInTheDocument();
 await userEvent.click(screen.getByRole("button", { name: "Delete visual section Product hero" }));
 expect(remove).toHaveBeenCalledWith("visual");
});

it("shows mixed sections in their runtime order rather than raw array order", async () => {
 render(<PageDesigner sections={[{ columns: 1, cells: [] }, { columns: 2, cells: [] }]} onChange={vi.fn()} pageSections={[
  { id: "visual", type: "component", order: 20, component: { id: "hero", type: "custom", title: "Ordered hero", props: { visualBuilder: { document: sampleDocument } } } },
  { id: "later-grid", type: "grid", order: 30, grid: { columns: 2, cells: [] } },
  { id: "grid", type: "grid", order: 10, grid: { columns: 1, cells: [] } },
 ]} />);
 const nav = screen.getByRole("navigation", { name: "Page structure" });
 const entries = within(nav).getAllByRole("button").filter(button => button.hasAttribute("aria-current"));
 expect(entries[0]).toHaveAccessibleName(/^Section 1/);
 expect(entries[1]).toHaveAccessibleName("Ordered hero, visual section");
 expect(entries[2]).toHaveAccessibleName(/^Section 3/);
 await userEvent.click(entries[2]);
 expect(screen.getByTestId("section-layout-toolbar")).toHaveTextContent("Section 3");
});
