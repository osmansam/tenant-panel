import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it } from "vitest";
import { checkBundleSize } from "../../scripts/check-bundle-size.mjs";

const directories: string[] = [];
afterEach(async () => { await Promise.all(directories.splice(0).map(path => rm(path, { recursive: true, force: true }))); });
async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), "tenant-bundle-"));
  directories.push(directory);
  await mkdir(join(directory, "assets"));
  return directory;
}
it("rejects a minified JavaScript chunk over 2 MB", async () => {
  const directory = await fixture();
  await writeFile(join(directory, "assets", "large.js"), "x".repeat(2_000_001));
  await expect(checkBundleSize(directory)).rejects.toThrow("large.js");
});
it("accepts chunks within budget and reports their real byte sizes", async () => {
  const directory = await fixture();
  await writeFile(join(directory, "assets", "small.js"), "ok");
  await expect(checkBundleSize(directory)).resolves.toEqual([expect.objectContaining({ bytes: 2 })]);
});
it("fails if a build produced no JavaScript", async () => {
  const directory = await fixture();
  await expect(checkBundleSize(directory)).rejects.toThrow("No JavaScript");
});
