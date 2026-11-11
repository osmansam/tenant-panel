import { useState } from "react";
// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider, onlineManager } from "@tanstack/react-query";
import { BrowserRouter, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { afterEach, expect, it, vi } from "vitest";
import VisualBuilderPage from "./VisualBuilderPage";
import { sampleDocument } from "./testFixtures";
import type { ComponentDocument } from "../visual-engine/model";
vi.mock("../visual-engine/editor/VisualBuilder", () => ({ VisualBuilder: ({ initialDocument, onSaveDocument }: { initialDocument: ComponentDocument; onSaveDocument: (doc: ComponentDocument) => Promise<void> }) => {
 const [text, setText] = useState(initialDocument.name);
 return <div data-testid="visual-editor"><span>{initialDocument.name}</span><input aria-label="Canvas text" value={text} onChange={event => setText(event.target.value)} /><button onClick={() => void onSaveDocument(initialDocument).catch(() => {})}>Save document</button></div>;
} }));
const adapter = axios.defaults.adapter;
afterEach(() => { axios.defaults.adapter = adapter; onlineManager.setOnline(true); });
it("creates a library design with zero pages and no page selection", async () => {
 window.history.replaceState(null, "", "/pages/visual-builder");
 const calls: string[] = [];
 axios.defaults.adapter = async config => {
  calls.push(`${config.method} ${config.url}`);
  const input = config.data ? JSON.parse(config.data) : {};
  return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: config.method === "get" ? [] : { ...input, id: "design-1", revision: 1 } };
 };
 render(<QueryClientProvider client={new QueryClient()}><BrowserRouter><VisualBuilderPage scope={{ tenant: "acme", project: "shop" }} /></BrowserRouter></QueryClientProvider>);
 await userEvent.click((await screen.findAllByRole("button", { name: "New design" }))[0]);
 await screen.findByTestId("visual-editor");
 expect(screen.queryByRole("combobox", { name: "Builder page" })).not.toBeInTheDocument();
 await userEvent.click(screen.getByRole("button", { name: "Save document" }));
 await waitFor(() => expect(calls.some(call => call.startsWith("post "))).toBe(true));
 expect(calls.every(call => (call.includes("/admin/visual-components") || call.endsWith("/container")))).toBe(true);
});

it("loads the correct placed document when navigation changes the fixed target", async () => {
 window.history.replaceState(null, "", "/pages/visual-builder?page=page-1&component=first");
 axios.defaults.adapter = async config => {
  const second = config.url?.endsWith("/page-2");
  const page = { id: second ? "page-2" : "page-1", name: second ? "Second page" : "First page", sections: [{ type: "component", component: { id: second ? "second" : "first", type: "custom", props: { visualBuilder: { document: { ...sampleDocument, name: second ? "Second design" : "First design" } } } } }] };
  return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: page };
 };
 function Switcher() { const navigate = useNavigate(); return <button onClick={() => navigate("?page=page-2&component=second")}>Switch copy</button>; }
 render(<QueryClientProvider client={new QueryClient()}><BrowserRouter><Switcher /><VisualBuilderPage scope={{ tenant: "acme", project: "shop" }} /></BrowserRouter></QueryClientProvider>);
 await screen.findByText("First design");
 await userEvent.click(screen.getByRole("button", { name: "Switch copy" }));
 await screen.findByText("Second design");
 expect(screen.queryByText("First design")).not.toBeInTheDocument();
});

it("blocks edits and creating another design during a delayed reload, then opens fresh data", async () => {
 window.history.replaceState(null, "", "/pages/visual-builder?design=design-1");
 let count = 0, finish: () => void = () => {};
 axios.defaults.adapter = async config => {
  count++;
  if (count > 1) await new Promise<void>(resolve => { finish = resolve; });
  return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: [{ id: "design-1", name: "Card", revision: count, value: { document: { ...sampleDocument, name: count === 1 ? "Saved design" : "Fresh design" } } }] };
 };
 render(<QueryClientProvider client={new QueryClient()}><BrowserRouter><VisualBuilderPage scope={{ tenant: "acme", project: "shop" }} /></BrowserRouter></QueryClientProvider>);
 await screen.findByText("Saved design");
 await userEvent.click(screen.getByRole("button", { name: "Reload designs" }));
 try {
  expect(screen.getByRole("button", { name: "New design" })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: "Design name" })).toBeDisabled();
  expect(screen.getByTestId("visual-editor").closest(".vb-host__editor")).toHaveAttribute("inert");
  await userEvent.click(screen.getByRole("button", { name: "New design" }));
 } finally { finish(); }
 await screen.findByText("Fresh design");
 expect(screen.getByRole("textbox", { name: "Canvas text" })).toHaveValue("Fresh design");
});
it("attempts a bounded local management request even when the browser reports offline", async () => {
 onlineManager.setOnline(false);
 window.history.replaceState(null, "", "/pages/visual-builder");
 axios.defaults.adapter = async config => { throw new AxiosError("Timeout", "ECONNABORTED", config); };
 render(<QueryClientProvider client={new QueryClient()}><BrowserRouter><VisualBuilderPage scope={{ tenant: "acme", project: "shop" }} /></BrowserRouter></QueryClientProvider>);
 expect(await screen.findByRole("alert")).toHaveTextContent("timed out");
 await userEvent.click(screen.getAllByRole("button", { name: "New design" })[0]);
 expect(await screen.findByTestId("visual-editor")).toBeInTheDocument();
});
