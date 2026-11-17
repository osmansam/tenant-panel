import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
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
    for (const group of groups) expect(Buffer.byteLength(group.code)).toBeLessThanOrEqual(128_000);
  }
});
