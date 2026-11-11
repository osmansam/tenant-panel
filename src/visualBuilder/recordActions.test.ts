import { describe, expect, it } from "vitest";
import { buildRecordActionPayload, prepareRecordAction, readRecordAction } from "./recordActions";
import type { HostActionSpec } from "../visual-engine/model";

const spec = (kind = "edit"): HostActionSpec => ({ name: "record", config: { schemaName: "products", action: { kind, modalType: "form", formFields: [{ formKey: "name", type: "text" }, { formKey: "price", type: "number" }] }, valueBindings: { productId: ["_id"], price: ["price"], enabled: ["enabled"], info: ["info"] } } });
const item = { _id: "id-a", name: "Chair", price: 0, enabled: false, info: { code: "A" } };
describe("visual record action values", () => {
 it("retains undisplayed id and typed hidden values without changing the source record", () => {
  const before = JSON.stringify(item), config = readRecordAction(spec());
  const prepared = prepareRecordAction(config, item);
  expect(prepared.id).toBe("id-a");
  expect(prepared.initialValues).toMatchObject({ name: "Chair", price: 0 });
  expect(prepared.hiddenValues).toEqual({ productId: "id-a", enabled: false, info: { code: "A" } });
  const payload = buildRecordActionPayload(config, prepared, { name: "Edited", price: 12, productId: "tampered", _id: "retarget" });
  expect(payload).toEqual({ name: "Edited", price: 12, productId: "id-a", enabled: false, info: { code: "A" } });
  expect(JSON.stringify(item)).toBe(before);
 });
 it("applies defaults then edit record then mappings then constants", () => {
  const input = spec(); input.config.action = { kind: "edit", modalType: "form", formFields: [{ formKey: "price", type: "number", defaultValue: 99 }], constantValues: { price: 7 } };
  const prepared = prepareRecordAction(readRecordAction(input), item);
  expect(prepared.initialValues.price).toBe(7);
 });
 it("creates another schema record from explicit mappings without copying the source id or unrelated fields", () => {
  const config = readRecordAction(spec("create")), prepared = prepareRecordAction(config, item);
  expect(buildRecordActionPayload(config, prepared, { name: "Order", price: 0 })).toEqual({ name: "Order", price: 0, productId: "id-a", enabled: false, info: { code: "A" } });
  expect(prepared.initialValues.name).not.toBe("Chair");
 });
 it("fails locally for missing record ids, unsafe ids, missing mappings and prototype paths", () => {
  const config = readRecordAction(spec());
  for (const record of [undefined, { ...item, _id: "../other" }, { ...item, _id: "" }, { _id: "only" }]) expect(() => prepareRecordAction(config, record)).toThrow();
  const input = spec(); input.config.valueBindings = { value: ["constructor", "name"] };
  expect(() => readRecordAction(input)).toThrow();
 });
 it("rejects malformed and unsupported host/action/workflow configuration", () => {
  for (const input of [{ ...spec(), name: "unknown" }, { ...spec(), config: { schemaName: "https://bad", action: { kind: "edit" } } }, { ...spec(), config: { schemaName: "products", action: { kind: "defaults" } } }, { ...spec(), config: { schemaName: "products", action: { kind: "edit", submit: { functionName: "old" } } } }, { ...spec(), config: { schemaName: "products", action: { kind: "update", submit: { workflowName: "process" } } } }]) expect(() => readRecordAction(input as HostActionSpec)).toThrow();
 });
});
it("rejects malformed consumed form settings before a modal can mount", () => {
 for (const malformed of [{ label: { bad: true } }, { type: "select", staticOptions: "oops" }, { invalidateKeys: "name" }, { sourceDataFields: "name" }, { optionDisplay: { leftTemplate: 12 } }, { formKeyType: "unknown" }, { requiredCondition: {} }, { type: "select", sourceFilterBindings: [{ id: "r1", field: "location", operator: "eq", value: { source: "field", fieldKey: "missingPeer" } }] }]) {
  const input = JSON.parse(JSON.stringify({ name: "record", config: { schemaName: "products", action: { kind: "edit", modalType: "form", formFields: [{ formKey: "name", type: "text", ...malformed }] } } })) as HostActionSpec;
  expect(() => readRecordAction(input)).toThrow();
 }
});
