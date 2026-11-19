import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Architecture boundaries (dependency-free alternative to dependency-cruiser):
 *   pages -> features -> shared (components, hooks, utils, context, common, types)
 *   visual-engine is independent of the rest of the app
 *   no deep cross-feature imports (use the feature's index)
 */
const SRC = join(process.cwd(), "src");
const RELATIVE_IMPORT = /(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']*)["']/g;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(ts|tsx)$/.test(name) ? [full] : [];
  });

const isTest = (file: string) => /\.test\.(ts|tsx)$/.test(file) || file.includes(`${sep}test${sep}`);

type Edge = { from: string; to: string; spec: string };

const edges: Edge[] = walk(SRC)
  .filter((file) => !isTest(file))
  .flatMap((file) => {
    const source = readFileSync(file, "utf8");
    return [...source.matchAll(RELATIVE_IMPORT)].map((match) => ({
      from: relative(SRC, file),
      to: normalize(relative(SRC, join(dirname(file), match[1]))),
      spec: match[1],
    }));
  });

const top = (path: string) => path.split(sep)[0];
const describeEdge = (edge: Edge) => `${edge.from} -> ${edge.spec}`;

describe("architecture boundaries", () => {
  it("keeps visual-engine independent of the rest of the app", () => {
    const offenders = edges.filter((e) => top(e.from) === "visual-engine" && top(e.to) !== "visual-engine");
    expect(offenders.map(describeEdge)).toEqual([]);
  });

  it("only pages and navigation may import pages", () => {
    const offenders = edges.filter((e) => top(e.to) === "pages" && !["pages", "navigation"].includes(top(e.from)));
    expect(offenders.map(describeEdge)).toEqual([]);
  });

  it("keeps shared layers from importing features", () => {
    const shared = ["components", "hooks", "utils", "context", "common", "types", "visual-engine", "visualBuilder"];
    const offenders = edges.filter((e) => top(e.to) === "features" && shared.includes(top(e.from)));
    expect(offenders.map(describeEdge)).toEqual([]);
  });

  it("forbids deep cross-feature imports (use the feature index)", () => {
    const offenders = edges.filter((e) => {
      if (top(e.to) !== "features") return false;
      const [, targetFeature, ...rest] = e.to.split(sep);
      const sameFeature = top(e.from) === "features" && e.from.split(sep)[1] === targetFeature;
      return !sameFeature && rest.length > 0 && !(rest.length === 1 && rest[0] === "index");
    });
    expect(offenders.map(describeEdge)).toEqual([]);
  });

  it("does not regrow the utils barrel", () => {
    const offenders = edges.filter((e) => e.to === "utils" || e.to === join("utils", "index"));
    expect(offenders.map(describeEdge)).toEqual([]);
  });
});
