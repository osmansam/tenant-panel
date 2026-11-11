// @vitest-environment jsdom
import { useState, type ComponentProps } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { PageDesigner } from "./PageDesigner";
import { designerGridSections, mergeDesignerGridSections } from "../../visualBuilder/gridSections";
import { sampleDocument } from "../../visualBuilder/testFixtures";
import type { Section } from "../../utils/api/page";
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async original => ({ ...await original<typeof import("../../utils/api/container")>(), useGetContainers: () => [] }));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));
vi.mock("../../visualBuilder/VisualSectionPreview", () => ({ default: () => <div>Visual preview</div> }));
it("reorders page sections, keeps the active grid selected, and applies later edits to that same grid", async () => {
 const initial: Section[] = [{ id: "grid-b", type: "grid", order: 30, grid: { columns: 2, gap: 20, cells: [] } }, { id: "hero", type: "component", order: 20, component: { id: "visual", type: "custom", title: "Hero", props: { visualBuilder: { document: sampleDocument } } } }, { id: "grid-a", columns: 1, gap: 8, cells: [], order: 10 }, { id: "tabs", type: "tabs", order: 40, tabs: { tabs: [] } }, { id: "native", type: "component", order: 50, component: { id: "table", type: "table", title: "Orders" } }];
 function Harness() { const [sections, setSections] = useState(initial); return <><PageDesigner sections={designerGridSections(sections) as unknown as ComponentProps<typeof PageDesigner>["sections"]} pageSections={sections} onReorderPageSections={setSections} onChange={grids => setSections(current => mergeDesignerGridSections(current, grids))} /><output data-testid="saved-sections">{JSON.stringify(sections)}</output></>; }
 render(<Harness />);
 const nav = screen.getByRole("navigation", { name: "Page structure" });
 expect(within(nav).getByText("5 sections")).toBeInTheDocument();
 expect(screen.getByRole("button", { name: "Move section 1 up" })).toBeDisabled();
 expect(screen.getByRole("button", { name: "Move section 5 down" })).toBeDisabled();
 await userEvent.click(within(nav).getByRole("button", { name: /^Section 1,/ }));
 await userEvent.click(screen.getByRole("button", { name: "Move section 1 down" }));
 await userEvent.click(screen.getByRole("button", { name: "Move section 2 down" }));
 expect(screen.getByTestId("section-layout-toolbar")).toHaveTextContent("Section 3");
 expect(screen.getByRole("spinbutton", { name: "Gap (pixels)" })).toHaveValue(8);
 fireEvent.change(screen.getByRole("spinbutton", { name: "Gap (pixels)" }), { target: { value: "32" } });
 const saved: Section[] = JSON.parse(screen.getByTestId("saved-sections").textContent!);
 expect(saved.map(section => section.id)).toEqual(["hero", "grid-b", "grid-a", "tabs", "native"]);
 expect(saved[2].gap).toBe(32); expect(saved[1].grid?.gap).toBe(20);
 expect(saved[0].component?.props?.visualBuilder.document).toEqual(sampleDocument);
 await userEvent.click(screen.getByRole("button", { name: "Hero, visual section" }));
 await userEvent.click(screen.getByRole("button", { name: "Move section 1 down" }));
 expect(screen.getByRole("button", { name: "Hero, visual section" })).toHaveAttribute("aria-current", "true");
});

it("keeps the second grid selected when moving it up across the first and restores keyboard focus", async () => {
 const initial: Section[] = [{ id: "a", columns: 1, gap: 8, cells: [], order: 0 }, { id: "b", columns: 2, gap: 20, cells: [], order: 1 }];
 function Harness() { const [sections, setSections] = useState(initial); return <><PageDesigner sections={designerGridSections(sections) as unknown as ComponentProps<typeof PageDesigner>["sections"]} pageSections={sections} onReorderPageSections={setSections} onChange={grids => setSections(current => mergeDesignerGridSections(current, grids))} /><output data-testid="saved-sections">{JSON.stringify(sections)}</output></>; }
 render(<Harness />);
 await userEvent.click(screen.getByRole("button", { name: /^Section 2,/ }));
 await userEvent.click(screen.getByRole("button", { name: "Move section 2 up" }));
 expect(screen.getByRole("spinbutton", { name: "Gap (pixels)" })).toHaveValue(20);
 expect(screen.getByRole("button", { name: /^Section 1,/ })).toHaveFocus();
 fireEvent.change(screen.getByRole("spinbutton", { name: "Gap (pixels)" }), { target: { value: "44" } });
 const saved = JSON.parse(screen.getByTestId("saved-sections").textContent!);
 expect(saved.map((section: Section) => section.id)).toEqual(["b", "a"]);
 expect(saved[0].gap).toBe(44); expect(saved[1].gap).toBe(8);
});

it("moves standalone grids up and down by one position with their selection intact", async () => {
 function Harness() { const [sections, setSections] = useState<ComponentProps<typeof PageDesigner>["sections"]>([{ columns: 1, gap: 8, cells: [] }, { columns: 2, gap: 20, cells: [] }, { columns: 3, gap: 30, cells: [] }]); return <><PageDesigner sections={sections} onChange={setSections} /><output data-testid="standalone-sections">{JSON.stringify(sections)}</output></>; }
 render(<Harness />);
 await userEvent.click(screen.getByRole("button", { name: /^Section 2,/ }));
 await userEvent.click(screen.getByRole("button", { name: "Move section 2 up" }));
 const gaps = () => JSON.parse(screen.getByTestId("standalone-sections").textContent!).map((section: { gap: number }) => section.gap);
 expect(gaps()).toEqual([20,8,30]);
 await userEvent.click(screen.getByRole("button", { name: "Move section 1 down" })); expect(gaps()).toEqual([8,20,30]);
 await userEvent.click(screen.getByRole("button", { name: "Move section 2 down" })); expect(gaps()).toEqual([8,30,20]);
 expect(screen.getByRole("spinbutton", { name: "Gap (pixels)" })).toHaveValue(20);
 expect(screen.getByRole("button", { name: /^Section 3,/ })).toHaveFocus();
});
