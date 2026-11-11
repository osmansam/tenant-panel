// @vitest-environment jsdom
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import PageRequestsEditor from "./PageRequestsEditor";
import type { PageModel } from "../../utils/api/page";
it("adds a named request and connects a table without duplicating its source", () => {
 function App() {
  const [page, setPage] = useState<PageModel>({ name: "Products", sections: [{ type: "component", component: { id: "table", title: "Products table", type: "table" } }] });
  return <><PageRequestsEditor page={page} onChange={setPage} /><output data-testid="saved">{JSON.stringify(page)}</output></>;
 }
 render(<App />);
 fireEvent.click(screen.getByRole("button", { name: "Add request" }));
 fireEvent.change(screen.getByLabelText("Request name"), { target: { value: "Product list" } });
 fireEvent.change(screen.getByLabelText("Schema"), { target: { value: "products" } });
 const state = JSON.parse(screen.getByTestId("saved").textContent!);
 fireEvent.change(screen.getByLabelText("Products table · Data request"), { target: { value: state.requests[0].id } });
 expect(JSON.parse(screen.getByTestId("saved").textContent!).sections[0].component.requestBindings.data.requestId).toBe(state.requests[0].id);
 expect(screen.getByRole("button", { name: "Delete request" })).toBeDisabled();
});
