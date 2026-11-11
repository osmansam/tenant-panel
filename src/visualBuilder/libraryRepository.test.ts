import axios, { AxiosHeaders } from "axios";
import { expect, it } from "vitest";
import { createLibraryRepository } from "./libraryRepository";
import { sampleDocument } from "./testFixtures";
it("saves a standalone design without a page and retains revision and authored keys", async () => {
 const calls: string[] = [];
 const client = axios.create();
 client.defaults.adapter = async config => {
  calls.push(`${config.method} ${config.url}`);
  const input = config.data ? JSON.parse(config.data) : {};
  return { config, status: 200, statusText: "OK", headers: new AxiosHeaders(), data: config.method === "get" ? [] : { ...input, id: "design-1", revision: input.revision ? input.revision + 1 : 1 } };
 };
 const repo = createLibraryRepository({ tenant: "acme", project: "shop" }, client);
 const saved = await repo.save({ name: "Card", value: { document: sampleDocument } });
 expect(saved).toMatchObject({ id: "design-1", name: "Card", revision: 1 });
 await repo.save({ ...saved, name: "Renamed" });
 expect(calls).toEqual(["post /admin/visual-components", "put /admin/visual-components/design-1"]);
});
