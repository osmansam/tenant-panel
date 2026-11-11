// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PageDesigner } from "./PageDesigner";
import { sampleDocument } from "../../visualBuilder/testFixtures";
import type { GridSection, TabPanelTab } from "../../types/page";
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock("../../utils/api/container", async original => ({ ...await original<typeof import("../../utils/api/container")>(), useGetContainers: () => [] }));
vi.mock("./CellExcelUploadModal", () => ({ CellExcelUploadModal: () => null }));
let denyDesignReads = false;
const adapter = axios.defaults.adapter;
const source = { id: "source-card", name: "Product card", revision: 1, value: { document: sampleDocument } };
let libraryPages = [source];
const grid: GridSection[] = [{ columns: 1, cells: [{ id: "cell_1", row: 1, column: 1, components: [] }] }];
beforeEach(() => {
  denyDesignReads = false;
  libraryPages = [source];
  localStorage.setItem("currentProject", JSON.stringify({ id: "project", name: "Shop", tenantSlug: "acme", slug: "shop" }));
  axios.defaults.adapter = async config => {
    if (denyDesignReads) throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, { config, status: 403, statusText: "Forbidden", headers: new AxiosHeaders(), data: {} });
    return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: libraryPages };
  };
});
afterEach(() => { axios.defaults.adapter = adapter; localStorage.clear(); });
function mount(persist: (sections: GridSection[]) => Promise<void>, sections = grid) {
  return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><PageDesigner sections={sections} onChange={vi.fn()} onComponentSave={persist} /></QueryClientProvider>);
}
async function openPicker() {
  await userEvent.click(screen.getByRole("button", { name: /^Section 1/i }));
  await userEvent.click(screen.getByTitle("Add component"));
  await userEvent.click(screen.getByRole("combobox", { name: "Component Type" }));
  await userEvent.click(screen.getByRole("option", { name: "Visual component" }));
}
describe("native page visual component insertion", () => {
  it("adds an independent saved design to the selected cell without requiring a schema", async () => {
    const persist = vi.fn().mockResolvedValue(undefined);
    mount(persist);
    await openPicker();
    expect(screen.queryByRole("combobox", { name: "Schema Name" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    await userEvent.click(screen.getByRole("button", { name: "Add Component" }));
    await waitFor(() => expect(persist).toHaveBeenCalledTimes(1));
    const component = persist.mock.calls[0][0][0].cells[0].components[0];
    expect(component).toMatchObject({ type: "custom", title: "Product card", props: { visualBuilder: { document: { root: { children: [{ text: "Products" }] } } } } });
    expect(component.id).not.toBe("source-card");
    expect(component.props?.visualBuilder.document.id).not.toBe(sampleDocument.id);
    expect(screen.queryByRole("dialog", { name: "Add Component" })).not.toBeInTheDocument();
  });
  it("adds a visual child to a tab and persists it only when the parent is saved", async () => {
    const persist = vi.fn().mockResolvedValue(undefined);
    const tabs: GridSection[] = [{ columns: 1, cells: [{ id: "cell_1", row: 1, column: 1, components: [{ id: "tab_panel", type: "tabPanel", tabs: [{ title: "Cards", components: [] }] }] }] }];
    mount(persist, tabs);
    await userEvent.click(screen.getByRole("button", { name: /^Section 1/i }));
    await userEvent.click(screen.getByTitle("Edit Component"));
    await userEvent.click(screen.getByRole("button", { name: "Add Visual component" }));
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    await userEvent.click(screen.getByRole("button", { name: "Add Component" }));
    expect(persist).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    await waitFor(() => expect(persist).toHaveBeenCalledTimes(1));
    expect(persist.mock.calls[0][0][0].cells[0].components[0].tabs?.[0].components[0]).toMatchObject({ type: "custom", title: "Product card" });
  });
  it("retains an existing tab visual copy unchanged when its parent is saved", async () => {
    const persist = vi.fn().mockResolvedValue(undefined);
    const visual = { id: "saved_copy", type: "custom" as const, title: "Saved card", props: { visualBuilder: { document: structuredClone(sampleDocument) }, keep: "ProductSKU" } };
    mount(persist, [{ columns: 1, cells: [{ id: "cell_1", row: 1, column: 1, components: [{ id: "tab_panel", type: "tabPanel", tabs: [{ title: "Cards", components: [visual] }] }] }] }]);
    await userEvent.click(screen.getByRole("button", { name: /^Section 1/i }));
    await userEvent.click(screen.getByTitle("Edit Component"));
    await userEvent.click(screen.getByTitle("Edit visual component"));
    const inner = screen.getAllByRole("dialog", { name: "Edit Component" }).at(-1)!;
    await userEvent.click(within(inner).getByRole("button", { name: "Save Changes" }));
    await userEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    await waitFor(() => expect(persist).toHaveBeenCalledTimes(1));
    const saved = persist.mock.calls[0][0][0].cells[0].components[0].tabs?.[0].components[0];
    expect(saved?.id).toBe(visual.id);
    expect(saved?.props).toEqual(visual.props);
  });

  it("does not enable insertion when there are no saved designs", async () => {
    axios.defaults.adapter = async config => ({ config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: [] });
    mount(vi.fn());
    await openPicker();
    expect(await screen.findByText(/No saved visual designs/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled();
  });

  it("clears a selection on project change rather than inserting another project's design", async () => {
    mount(vi.fn());
    await openPicker();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    localStorage.setItem("currentProject", JSON.stringify({ id: "other", name: "Other", tenantSlug: "acme", slug: "other" }));
    window.dispatchEvent(new Event("currentProjectChange"));
    await waitFor(() => expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled());
  });
  it("disables a stale selection on a failed refresh and supports retrying the list", async () => {
    mount(vi.fn());
    await openPicker();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    denyDesignReads = true;
    await userEvent.click(screen.getByRole("button", { name: "Refresh designs" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("permission"));
    expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled();
    denyDesignReads = false;
    await userEvent.click(screen.getByRole("button", { name: "Retry designs" }));
    expect(await screen.findByRole("radio", { name: /Product card/ })).not.toBeChecked();
  });

  it("requires a new selection when a successful refresh removes the chosen source", async () => {
    mount(vi.fn());
    await openPicker();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    libraryPages = [];
    await userEvent.click(screen.getByRole("button", { name: "Refresh designs" }));
    await screen.findByText(/No saved visual designs/);
    expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled();
    expect(screen.queryByText(/Current copy:/)).not.toBeInTheDocument();
  });
  it("requires a new selection when the refreshed source content changes", async () => {
    mount(vi.fn());
    await openPicker();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    libraryPages = structuredClone([source]);
    libraryPages[0].value.document.root.children[0] = { id: "new_title", type: "heading", level: 2, text: "New source content" };
    await userEvent.click(screen.getByRole("button", { name: "Refresh designs" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Add Component" })).toBeDisabled());
  });
  it("can add the same design to two tab drafts before saving the parent", async () => {
    const persist = vi.fn().mockResolvedValue(undefined);
    mount(persist, [{ columns: 1, cells: [{ id: "cell_1", row: 1, column: 1, components: [{ id: "tab_panel", type: "tabPanel", tabs: [{ title: "First", components: [] }, { title: "Second", components: [] }] }] }] }]);
    await userEvent.click(screen.getByRole("button", { name: /^Section 1/i }));
    await userEvent.click(screen.getByTitle("Edit Component"));
    for (let index = 0; index < 2; index++) {
      await userEvent.click(screen.getAllByRole("button", { name: "Add Visual component" })[0]);
      await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
      await userEvent.click(screen.getByRole("button", { name: "Add Component" }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    await waitFor(() => expect(persist).toHaveBeenCalledTimes(1));
    const copies = persist.mock.calls[0][0][0].cells[0].components[0].tabs!.map((tab: TabPanelTab) => tab.components[0]);
    expect(copies[0].id).not.toBe(copies[1].id);
    expect(copies[0].stateKey).not.toBe(copies[1].stateKey);
  });

  it("keeps the selected design available when saving fails", async () => {
    const persist = vi.fn().mockRejectedValue(new Error("Offline"));
    mount(persist);
    await openPicker();
    await userEvent.click(await screen.findByRole("radio", { name: /Product card/ }));
    await userEvent.click(screen.getByRole("button", { name: "Add Component" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("could not be saved"));
    expect(screen.getByRole("radio", { name: /Product card/ })).toBeChecked();
    expect(screen.getByRole("dialog", { name: "Add Component" })).toBeInTheDocument();
  });
});
