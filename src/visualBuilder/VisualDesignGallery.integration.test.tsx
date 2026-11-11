// @vitest-environment jsdom
import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import LibraryVisualBuilderPage from "./LibraryVisualBuilderPage";
import VisualComponentPicker from "./VisualComponentPicker";
import { sampleDocument } from "./testFixtures";
import type { VisualDesignSelection } from "./componentLibrary";
import type { ComponentDocument } from "../visual-engine/model";
import { saveTemplate } from "../visual-engine/persistence/localStorage";
vi.mock("../visual-engine/editor/VisualBuilder", () => ({ VisualBuilder: ({ initialDocument }: { initialDocument: ComponentDocument }) => <div data-testid="editor-document">{initialDocument.id}</div> }));
const adapter = axios.defaults.adapter;
const scope = { tenant: "acme", project: "shop" };
const template = { version: 1 as const, id: "my-template", name: "My reusable layout", scope: "project" as const, snapshot: sampleDocument, createdAt: "2026-11-03T00:00:00Z", updatedAt: "2026-11-03T00:00:00Z" };
const record = { id: "saved-card", name: "Product card", revision: 1, value: { document: sampleDocument } };
beforeEach(() => {
 localStorage.setItem("currentProject", JSON.stringify({ id: "project", name: "Shop", tenantSlug: "acme", slug: "shop" }));
 window.history.replaceState(null, "", "/pages/visual-builder");
 axios.defaults.adapter = async config => ({ config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: [record] });
});
afterEach(() => { axios.defaults.adapter = adapter; localStorage.clear(); });
function mount(children: React.ReactNode) { return render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><BrowserRouter>{children}</BrowserRouter></QueryClientProvider>); }
it("browses a saved design visually, searches by name and opens its existing identity", async () => {
 mount(<LibraryVisualBuilderPage scope={scope} />);
 expect(await screen.findByRole("button", { name: "Preview Product card" })).toBeInTheDocument();
 const search = screen.getByRole("searchbox", { name: "Search designs" });
 await userEvent.type(search, "missing");
 expect(screen.queryByRole("button", { name: "Preview Product card" })).not.toBeInTheDocument();
 await userEvent.clear(search);
 await userEvent.click(screen.getByRole("button", { name: "Open Product card" }));
 expect(await screen.findByTestId("editor-document")).toHaveTextContent(sampleDocument.id);
 expect(window.location.search).toBe("?design=saved-card");
});
it("creates an independent draft from this project’s browser template", async () => {
 saveTemplate(template, "acme/shop");
 mount(<LibraryVisualBuilderPage scope={scope} />);
 await screen.findByRole("button", { name: "Preview Product card" });
 await userEvent.click(screen.getByRole("tab", { name: /Browser templates/ }));
 expect(document.querySelector("button button")).toBeNull();
 await userEvent.type(screen.getByRole("searchbox", { name: "Search designs" }), template.name);
 await userEvent.click(screen.getAllByRole("button", { name: `Use ${template.name}` })[0]);
 expect(await screen.findByTestId("editor-document")).not.toHaveTextContent(sampleDocument.id);
 expect(window.location.search).toBe("");
 expect(screen.getByRole("textbox", { name: "Design name" })).toHaveValue(template.name);
});
it("opens a large preview from a thumbnail without selecting it", async () => {
 function Picker() { const [selection, setSelection] = useState<VisualDesignSelection | null>(null); return <><VisualComponentPicker selection={selection} onChange={setSelection} /><output>{selection?.name || "No selection"}</output></>; }
 mount(<Picker />);
 await userEvent.click(await screen.findByRole("button", { name: "Preview Product card" }));
 expect(await screen.findByRole("dialog", { name: "Preview: Product card" })).toBeInTheDocument();
 expect(screen.getByText("No selection")).toBeInTheDocument();
 await userEvent.click(screen.getByRole("button", { name: "Choose Product card" }));
 await waitFor(() => expect(screen.queryByRole("dialog", { name: "Preview: Product card" })).not.toBeInTheDocument());
 expect(screen.getByRole("radio", { name: "Product card" })).toBeChecked();
});
it("keeps own browser template choices usable when loading saved designs fails", async () => {
 saveTemplate(template, "acme/shop");
 axios.defaults.adapter = async config => { throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, { config, status: 403, statusText: "Forbidden", headers: new AxiosHeaders(), data: {} }); };
 function Picker() { const [selection, setSelection] = useState<VisualDesignSelection | null>(null); return <VisualComponentPicker selection={selection} onChange={setSelection} />; }
 mount(<Picker />);
 await screen.findByRole("alert");
 await userEvent.click(screen.getByRole("tab", { name: /Browser templates/ }));
 await userEvent.type(screen.getByRole("searchbox", { name: "Search designs" }), template.name);
 const radio = screen.getAllByRole("radio", { name: template.name })[0];
 await userEvent.click(radio);
 expect(radio).toBeChecked();
});

it("does not include ozmishow designs and isolates browser templates by project", async () => {
 saveTemplate(template, "other/project");
 mount(<LibraryVisualBuilderPage scope={scope} />);
 await screen.findByRole("button", { name: "Preview Product card" });
 expect(screen.queryByRole("tab", { name: /Ozmishow/ })).not.toBeInTheDocument();
 await userEvent.click(screen.getByRole("tab", { name: /Browser templates/ }));
 expect(screen.queryByRole("button", { name: `Preview ${template.name}` })).not.toBeInTheDocument();
 expect(screen.getByText(/No browser templates saved/)).toBeInTheDocument();
});

it("browses admin starters by category and description, previews and starts an independent draft", async () => {
 mount(<LibraryVisualBuilderPage scope={scope} />);
 await screen.findByRole("button", { name: "Preview Product card" });
 await userEvent.click(screen.getByRole("tab", { name: /Built-in admin templates/ }));
 expect(screen.getAllByRole("button", { name: /^Preview / })).toHaveLength(9);
 await userEvent.selectOptions(screen.getByRole("combobox", { name: "Design category" }), "Navigation");
 expect(screen.getByRole("button", { name: "Preview Breadcrumbs and page header" })).toBeInTheDocument();
 expect(screen.getByRole("button", { name: "Preview Quick actions and shortcuts" })).toBeInTheDocument();
 expect(screen.getByRole("button", { name: "Preview Filter and active tags toolbar" })).toBeInTheDocument();
 await userEvent.selectOptions(screen.getByRole("combobox", { name: "Design category" }), "Records");
 expect(screen.getByRole("button", { name: "Preview Record card grid" })).toBeInTheDocument();
 expect(screen.getByRole("button", { name: "Preview Compact record list" })).toBeInTheDocument();
 expect(screen.queryByRole("button", { name: "Preview Order summary" })).not.toBeInTheDocument();
 await userEvent.selectOptions(screen.getByRole("combobox", { name: "Design category" }), "All categories");
 await userEvent.type(screen.getByRole("searchbox", { name: "Search designs" }), "invoice");
 await userEvent.click(screen.getByRole("button", { name: "Preview Order summary" }));
 expect(await screen.findByRole("dialog", { name: "Preview: Order summary" })).toBeInTheDocument();
 expect(screen.queryByRole("textbox", { name: "Design name" })).not.toBeInTheDocument();
 await userEvent.click(screen.getAllByRole("button", { name: "Use Order summary" }).at(-1)!);
 expect(await screen.findByRole("textbox", { name: "Design name" })).toHaveValue("Order summary");
 expect(screen.getByTestId("editor-document").textContent).not.toBe("admin-order-summary");
 expect(window.location.search).toBe("");
});

it("keeps a built-in selection available when the project library fails and refreshes", async () => {
 let denied = true;
 axios.defaults.adapter = async config => {
  if (denied) throw new AxiosError("Forbidden", "ERR_BAD_REQUEST", config, undefined, { config, status: 403, statusText: "Forbidden", headers: new AxiosHeaders(), data: {} });
  return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: [record] };
 };
 function Picker() { const [selection, setSelection] = useState<VisualDesignSelection | null>(null); return <><VisualComponentPicker selection={selection} onChange={setSelection} /><output aria-label="Selected design">{selection?.sourceType || "none"}</output></>; }
 mount(<Picker />);
 await screen.findByRole("alert");
 await userEvent.click(screen.getByRole("tab", { name: /Built-in admin templates/ }));
 await userEvent.click(screen.getByRole("radio", { name: "Record details" }));
 expect(screen.getByRole("radio", { name: "Record details" })).toBeChecked();
 expect(screen.getByLabelText("Selected design")).toHaveTextContent("builtin");
 denied = false;
 await userEvent.click(screen.getByRole("button", { name: "Retry designs" }));
 await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
 expect(screen.getByRole("radio", { name: "Record details" })).toBeChecked();
});
