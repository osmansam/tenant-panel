import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { randomBytes } from "node:crypto";
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
it("measures gzip and brotli instead of rejecting compressible raw bytes", async () => {
  const directory = await fixture();
  await writeFile(join(directory, "assets", "large.js"), "x".repeat(2_000_001));
  const chunks = await checkBundleSize(directory);
  expect(chunks[0]).toMatchObject({ bytes: 2_000_001 });
  expect(chunks[0].gzip).toBeLessThan(3_000);
  expect(chunks[0].brotli).toBeLessThan(100);
});
it.each(["gzip", "brotli"])("rejects incompressible chunks over the %s budget", async (encoding) => {
  const directory = await fixture();
  await writeFile(join(directory, "assets", "large.js"), randomBytes(5_000));
  await expect(checkBundleSize(directory, { [encoding]: 1_000 })).rejects.toThrow(`${encoding} chunk budget`);
});
it("enforces total transfer budgets across individually small chunks", async () => {
  const directory = await fixture();
  await writeFile(join(directory, "assets", "one.js"), randomBytes(1_000));
  await writeFile(join(directory, "assets", "two.js"), randomBytes(1_000));
  await expect(checkBundleSize(directory, { totalGzip: 1_500 })).rejects.toThrow("gzip total budget");
  await expect(checkBundleSize(directory, { totalBrotli: 1_500 })).rejects.toThrow("brotli total budget");
});
it("fails if a build produced no JavaScript", async () => {
  const directory = await fixture();
  await expect(checkBundleSize(directory)).rejects.toThrow("No JavaScript");
});
