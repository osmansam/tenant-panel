import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const registryId = "virtual:menu-icon-loaders";
const groupPrefix = "virtual:menu-icon-group/";
const familyPrefix = "virtual:menu-icon-family/";
const families = ["ai", "bi", "bs", "cg", "di", "fa", "fc", "fi", "gi", "go", "gr", "hi", "im", "io", "md", "ri", "si", "sl", "tb", "ti"];
const header = 'import { GenIcon } from "react-icons/lib";\n';

export function createIconGroups(source: string, maxBytes = 128_000) {
  // react-icons ships generated, self-contained function declarations. Keep
  // their implementations intact and fail on format changes during upgrades.
  const exports = [...source.matchAll(/export function (\w+)\s*\(props\) \{[\s\S]*?\n?\};/g)];
  if (!exports.length || exports.length !== (source.match(/export function /g) || []).length) {
    throw new Error("Unsupported react-icons module format");
  }
  const groups: { names: string[]; code: string }[] = [];
  const headerBytes = Buffer.byteLength(header);
  let groupBytes = headerBytes;
  let group = { names: [] as string[], code: header };
  for (const [code, name] of exports) {
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
