import { describe, expect, it } from "vitest";
import { parseComponentDocument } from "../visual-engine/model/validation";
import { matchingConditionalColors, type ConditionalColorRule } from "../visual-engine/model/conditionalColors";
const green = { text: { kind: "custom" as const, value: "#008000" } };
const rule = (operator: ConditionalColorRule["operator"], value: ConditionalColorRule["value"], upper?: number): ConditionalColorRule => ({ id: "r", path: ["price"], operator, value, ...(upper === undefined ? {} : { upper }), colors: green });
const doc = (rules: unknown) => ({ version: 2, id: "doc", name: "Colors", root: { id: "root", type: "section", children: [{ id: "price", type: "text", text: "{{item.price}}", conditionalColors: rules }] } });
describe("conditional color rules", () => {
 it("matches numeric boundaries and gives priority to the first complete rule", () => {
  const rules = [rule("lt", 20), { ...rule("between", 20, 100), id: "range", colors: { background: { kind: "custom" as const, value: "#ffbf00" } } }, { ...rule("gte", 100), id: "high", colors: { border: { kind: "token" as const, value: "danger" as const } } }];
  expect(matchingConditionalColors(rules, { price: 0 })).toEqual(green);
  expect(matchingConditionalColors(rules, { price: 19.99 })).toEqual(green);
  expect(matchingConditionalColors(rules, { price: 20 })).toEqual(rules[1].colors);
  expect(matchingConditionalColors(rules, { price: 99.99 })).toEqual(rules[1].colors);
  expect(matchingConditionalColors(rules, { price: 100 })).toEqual(rules[2].colors);
  expect(matchingConditionalColors([rule("gte", 0), rule("lt", 20)], { price: 10 })).toEqual(green);
  expect(matchingConditionalColors([rule("lt", -5)], { price: -5 })).toBeUndefined();
 });
 it("uses exact scalar types and safe nested own paths without turning missing data into zero", () => {
  for (const value of [undefined, null, "10", "", false, {}, [], NaN, Infinity]) expect(matchingConditionalColors([rule("lt", 20)], { price: value })).toBeUndefined();
  expect(matchingConditionalColors([rule("neq", 20)], {})).toBeUndefined();
  expect(matchingConditionalColors([rule("eq", false)], { price: false })).toEqual(green);
  expect(matchingConditionalColors([rule("eq", "active")], { price: "active" })).toEqual(green);
  expect(matchingConditionalColors([{ ...rule("eq", 12), path: ["details", "price"] }], { details: { price: 12 } })).toEqual(green);
  expect(matchingConditionalColors([rule("lt", 20)], Object.create({ price: 10 }))).toBeUndefined();
  expect(matchingConditionalColors([rule("lt", 20)], undefined)).toBeUndefined();
 });
 it("preserves rules through the actual document parser and rejects unsafe or malformed rules", () => {
  const valid = doc([rule("between", 20, 100)]), parsed = parseComponentDocument(valid);
  expect(parsed.success).toBe(true);
  if (parsed.success) expect(parsed.value.root.children[0].conditionalColors).toEqual([rule("between", 20, 100)]);
  const invalid = [{ ...rule("lt", 20), path: ["constructor"] }, { ...rule("lt", 20), operator: "eval" }, rule("between", 100, 20), rule("lt", "20"), { ...rule("lt", 20), colors: {} }, { ...rule("lt", 20), colors: { text: { kind: "custom", value: "url(https://bad.test)" } } }, { ...rule("lt", 20), extra: true }];
  for (const entry of invalid) expect(parseComponentDocument(doc([entry])).success).toBe(false);
  expect(parseComponentDocument(doc([rule("lt", 20), rule("gt", 30)])).success).toBe(false);
  expect(parseComponentDocument(doc(Array.from({ length: 21 }, (_, index) => ({ ...rule("lt", 20), id: String(index) })))).success).toBe(false);
 });
});
