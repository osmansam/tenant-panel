import { describe, expect, it } from "vitest";
import { listComponentRequestSlots, validatePageRequests } from "./pageRequests";
import type { PageModel } from "./api/page";

const request = { id: "products", name: "Products", source: { transport: "table-source", kind: "schema", schemaName: "products" }, result: { kind: "records" } } as const;
const page = (requests: unknown[] = [request], requestId = "products") => ({ name: "Products", requests, sections: [{ type: "component", component: { id: "table", type: "table", requestBindings: { data: { requestId } } } }] }) as PageModel;
describe("page requests", () => {
 it("accepts a connected record consumer and legacy pages", () => {
  expect(validatePageRequests(page())).toEqual([]);
  expect(validatePageRequests({ name: "Legacy", sections: [] })).toEqual([]);
 });
 it("rejects missing and duplicate requests", () => {
  expect(validatePageRequests(page([], "missing")).length).toBeGreaterThan(0);
  expect(validatePageRequests(page([request, request])).length).toBeGreaterThan(0);
 });
 it("rejects unsafe result paths, reserved parameters and incompatible shapes", () => {
  expect(validatePageRequests(page([{ ...request, result: { kind: "records", path: ["constructor"] } }])).length).toBeGreaterThan(0);
  expect(validatePageRequests(page([{ ...request, defaults: { params: { schemaName: "other" } } }])).length).toBeGreaterThan(0);
  expect(validatePageRequests(page([{ ...request, result: { kind: "value" } }])).length).toBeGreaterThan(0);
 });
 it("lists main data and independent matrix feeds", () => {
  expect(listComponentRequestSlots({ id: "t", type: "table" }).map(slot => slot.key)).toContain("data");
  expect(listComponentRequestSlots({ id: "m", type: "relationMatrix" }).map(slot => slot.key)).toEqual(["rows", "columns"]);
 });
 it("rejects missing page-filter and component-output bindings on definitions", () => {
  expect(validatePageRequests(page([{ ...request, bindings: { params: { product: { source: "pageFilter", filterId: "missing" } } } }])).length).toBeGreaterThan(0);
  expect(validatePageRequests(page([{ ...request, bindings: { params: { product: { source: "componentOutput", componentId: "missing", outputId: "missing" } } } }])).length).toBeGreaterThan(0);
 });

 it("lists matrix filter dropdowns as independent connections", () => {
  const slots = listComponentRequestSlots({ id: "matrix", type: "relationMatrix", relationMatrix: { filterPanel: { inputs: [{ id: "status", formKey: "status", type: "select" }] } } } as never);
  expect(slots.map(slot => slot.key)).toContain("filterOptions:status");
 });

});


it("ignores retired visual connections and their legacy fallback sources", () => {
 const component = { id: "visual", type: "custom", requestBindings: { "dataset:products": { requestId: "removed-request" } }, props: { visualBuilder: { document: { root: { id: "root", type: "section", children: [{ id: "rows", type: "repeater", datasetId: "products", source: { kind: "autotable", schemaName: "product", limit: 20 }, children: [] }] } } } } };
 expect(listComponentRequestSlots(component as never)).toEqual([]);
 expect(validatePageRequests({ name: "Catalog", sections: [{ type: "component", component }] } as never)).toEqual([]);
});
