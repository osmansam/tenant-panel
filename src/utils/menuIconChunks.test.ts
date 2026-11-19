import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { runInNewContext } from "node:vm";
import { expect, it } from "vitest";
import { createIconGroups } from "../../scripts/menu-icon-chunks";

it("preserves every export exactly once in bounded groups", () => {
  const source = `import { GenIcon } from '../lib/index.mjs';
export function GiOne(props) { return GenIcon({})(props); };
export function GiTwo(props) { return GenIcon({})(props); };
export function GiThree(props) { return GenIcon({})(props); };`;
  const groups = createIconGroups(source, 140);
  expect(groups.length).toBeGreaterThan(1);
  expect(groups.flatMap(group => group.names)).toEqual(["GiOne", "GiTwo", "GiThree"]);
  for (const group of groups) expect(Buffer.byteLength(group.code)).toBeLessThanOrEqual(140);
});

it("fails loudly when the installed icon format is unsupported", () => {
  expect(() => createIconGroups("export const changedFormat = 1;")).toThrow("Unsupported react-icons module format");
});


it("preserves every icon in every supported installed family", () => {
  const require = createRequire(import.meta.url);
  const families = ["ai", "bi", "bs", "cg", "di", "fa", "fc", "fi", "gi", "go", "gr", "hi", "im", "io", "md", "ri", "si", "sl", "tb", "ti"];
  for (const family of families) {
    const directory = dirname(require.resolve(`react-icons/${family}`));
    const source = readFileSync(join(directory, "index.mjs"), "utf8");
    const declarations = readFileSync(join(directory, "index.d.ts"), "utf8");
    const expected = [...declarations.matchAll(/export declare const (\w+):/g)].map(match => match[1]);
    const groups = createIconGroups(source);
    expect(expected.length).toBeGreaterThan(0);
    expect(groups.flatMap(group => group.names)).toEqual(expected);
    for (const group of groups) expect(Buffer.byteLength(group.code)).toBeLessThanOrEqual(384_000);
  }
}, 30_000);

it("reduces decimal path data while preserving icon trees, export names and props forwarding", () => {
  const data = { tag: "svg", attr: { viewBox: "0 0 512 512", fill: "none", strokeWidth: "1.23456" }, child: [{ tag: "path", attr: { d: "M0.123456 1.987654L2.123456 3.987654", stroke: "currentColor", strokeLinecap: "round" }, child: [] }, { tag: "circle", attr: { cx: "1.23456", r: "2.34567" }, child: [] }] };
  const source = `export function GiPrecise(props) { return GenIcon(${JSON.stringify(data)})(props); };`;
  const [group] = createIconGroups(source);
  const result = JSON.parse(group.code.match(/return GenIcon\((.*)\)\(props\)/)![1]);
  expect(group.names).toEqual(["GiPrecise"]);
  expect(result.child[0].attr.d).toBe("m.12 1.99 2 2");
  result.child[0].attr.d = data.child[0].attr.d;
  expect(result).toEqual(data);
  const props = { size: 32, color: "tomato", strokeWidth: 3, className: "custom-icon", "aria-label": "Precise" };
  const rendered = runInNewContext(group.code.replace(/import[^;]+;/, "").replace("export function", "function") + "; GiPrecise(props)", {
    GenIcon: (tree: unknown) => (forwarded: unknown) => ({ tree, props: forwarded }), props,
  });
  expect(rendered.props).toBe(props);
  expect(rendered.tree.attr).toEqual(data.attr);
});

it("preserves stroked open paths and zero-length segments", () => {
  const source = 'export function FiOpen(props) { return GenIcon({"tag":"svg","attr":{"stroke":"currentColor","strokeWidth":"2","fill":"none"},"child":[{"tag":"path","attr":{"d":"M0 0L10 0L0 0l0 0","strokeLinecap":"round"},"child":[]}]})(props); };';
  const [group] = createIconGroups(source);
  const path = JSON.parse(group.code.match(/return GenIcon\((.*)\)\(props\)/)![1]).child[0].attr.d;
  expect(path).not.toMatch(/[zZ]/);
  expect(path).toMatch(/(?:h0|l0 0)/);
});

it.each(["M0 0h.001v.001", "M12 12L12.001 12.001", "M12 12c.001 0 .001 .001 0 0"])("retains subpixel geometry if precision reduction would collapse it: %s", (d) => {
  const source = `export function SiTiny(props) { return GenIcon(${JSON.stringify({ tag: "svg", attr: {}, child: [{ tag: "path", attr: { d }, child: [] }] })})(props); };`;
  const [group] = createIconGroups(source);
  expect(JSON.parse(group.code.match(/return GenIcon\((.*)\)\(props\)/)![1]).child[0].attr.d).toBe(d);
});
