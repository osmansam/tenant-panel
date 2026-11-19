import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";
import { optimize } from "svgo";

const require = createRequire(import.meta.url);
const registryId = "virtual:menu-icon-loaders";
const groupPrefix = "virtual:menu-icon-group/";
const familyPrefix = "virtual:menu-icon-family/";
const families = ["ai", "bi", "bs", "cg", "di", "fa", "fc", "fi", "gi", "go", "gr", "hi", "im", "io", "md", "ri", "si", "sl", "tb", "ti"];
const header = 'import { GenIcon } from "react-icons/lib";\n';

// A path containing only moves or zero-length segments must keep its original
// precision. This protects tiny glyphs from disappearing after rounding.
function isCollapsedPath(path: string): boolean {
  let x = 0, y = 0, startX = 0, startY = 0;
  const arities: Record<string, number> = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 };
  for (const [, command, argumentsText] of path.matchAll(/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g)) {
    const kind = command.toLowerCase();
    const relative = command === kind;
    if (kind === "z") {
      if (x !== startX || y !== startY) return false;
      continue;
    }
    const args = (argumentsText.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? []).map(Number);
    const arity = arities[kind];
    if (!arity || args.length % arity) return false;
    for (let index = 0; index < args.length; index += arity) {
      const values = args.slice(index, index + arity);
      if (kind === "h" || kind === "v") {
        const value = values[0] + (relative ? (kind === "h" ? x : y) : 0);
        if (value !== (kind === "h" ? x : y)) return false;
      } else {
        const coordinates = kind === "a" ? values.slice(-2) : values;
        for (let point = 0; point < coordinates.length; point += 2) {
          const nextX = coordinates[point] + (relative ? x : 0);
          const nextY = coordinates[point + 1] + (relative ? y : 0);
          if (kind === "m" && index === 0) { x = nextX; y = nextY; startX = x; startY = y; }
          else if (nextX !== x || nextY !== y) return false;
        }
      }
    }
  }
  return true;
}

function optimizeIconPaths(code: string, paths: Map<string, string>): string {
  return code.replace(/"d":("(?:\\.|[^"\\])*")/g, (match, encoded: string) => {
    const path: string = JSON.parse(encoded);
    let optimized = paths.get(path);
    if (optimized === undefined) {
      const escaped = path.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
      // SVGO accepts false for makeArcs at runtime; its published params type
      // currently omits that value. Keep the explicit runtime configuration.
      const params: Record<string, unknown> = {
        floatPrecision: 2, applyTransforms: false, makeArcs: false,
        convertToZ: false, removeUseless: false,
      };
      const result = optimize(`<svg><path d="${escaped}"/></svg>`, {
        plugins: [{ name: "convertPathData", params }],
      }).data;
      const candidate = result.match(/ d="([^"]*)"/)?.[1];
      optimized = candidate && !isCollapsedPath(candidate) ? candidate : path;
      paths.set(path, optimized);
    }
    return optimized === path ? match : `"d":${JSON.stringify(optimized)}`;
  });
}

export function createIconGroups(source: string, maxBytes = 384_000) {
  // react-icons ships generated, self-contained function declarations. Keep
  // names, wrappers and non-path attributes intact; only path coordinates change.
  const exports = [...source.matchAll(/export function (\w+)\s*\(props\) \{[\s\S]*?\n?\};/g)];
  if (!exports.length || exports.length !== (source.match(/export function /g) || []).length) {
    throw new Error("Unsupported react-icons module format");
  }
  const groups: { names: string[]; code: string }[] = [];
  const headerBytes = Buffer.byteLength(header);
  let groupBytes = headerBytes;
  let group = { names: [] as string[], code: header };
  const paths = new Map<string, string>();
  for (const [originalCode, name] of exports) {
    const code = optimizeIconPaths(originalCode, paths);
    const codeBytes = Buffer.byteLength(code) + 1;
    if (headerBytes + codeBytes > maxBytes) throw new Error(`Icon ${name} exceeds the lazy chunk budget`);
    if (groupBytes + codeBytes > maxBytes) {
      groups.push(group);
      group = { names: [], code: header };
      groupBytes = headerBytes;
    }
    group.names.push(name);
    group.code += code + "\n";
    groupBytes += codeBytes;
  }
  if (group.names.length) groups.push(group);
  return groups;
}

export function menuIconChunks(): Plugin {
  const modules = new Map<string, string>();
  let registry: Promise<string> | undefined;
  const buildRegistry = async () => {
    const entries = await Promise.all(families.map(async family => {
      const file = join(dirname(require.resolve(`react-icons/${family}`)), "index.mjs");
      const source = await readFile(file, "utf8");
      const groups = createIconGroups(source).map((group, index) => {
        const id = `${groupPrefix}${family}/${index}`;
        modules.set(id, group.code);
        // Each group shares one loader, so concurrent icons reuse one request.
        return `[${JSON.stringify(group.names)}, () => import(${JSON.stringify(id)})]`;
      }).join(",\n");
      const id = `${familyPrefix}${family}`;
      modules.set(id, `const groups = [${groups}];\nexport default Object.fromEntries(groups.flatMap(([names, load]) => names.map(name => [name, load])));`);
      const prefix = family[0].toUpperCase() + family.slice(1);
      return `${JSON.stringify(prefix)}: () => import(${JSON.stringify(id)})`;
    }));
    // Only 20 family loaders are eager; tens of thousands of stored icon names
    // remain compatible in family indexes fetched on demand.
    return `export default {${entries.join(",\n")}};`;
  };
  return {
    name: "bounded-menu-icon-chunks",
    resolveId(id) {
      if (id === registryId || id.startsWith(groupPrefix) || id.startsWith(familyPrefix)) return "\0" + id;
    },
    async load(id) {
      if (id === "\0" + registryId) return registry ??= buildRegistry();
      if (id.startsWith("\0" + groupPrefix) || id.startsWith("\0" + familyPrefix)) {
        await registry;
        return modules.get(id.slice(1));
      }
    },
  };
}
