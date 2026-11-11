import axios, { type AxiosInstance } from "axios";
import { createManagementClient } from "./managementClient";
import { readVisualBlock, sameValue } from "./pageAdapter";
import type { ProjectScope, VisualBlockValue } from "./types";
export interface LibraryDesign { id: string; name: string; value: VisualBlockValue; revision: number }
function readDesign(input: unknown): LibraryDesign {
 if (!input || typeof input !== "object") throw new Error("Invalid visual design response.");
 const row = input as LibraryDesign;
 if (typeof row.id !== "string" || !row.id || typeof row.name !== "string" || !row.name.trim() || !Number.isSafeInteger(row.revision) || row.revision < 1) throw new Error("Invalid visual design metadata.");
 return { id: row.id, name: row.name, revision: row.revision, value: readVisualBlock({ id: row.id, type: "custom", props: { visualBuilder: row.value } }) };
}
export function createLibraryRepository(scope: ProjectScope, client: AxiosInstance = createManagementClient(scope)) {
 const request = async <T,>(run: () => Promise<T>) => {
  try { return await run(); }
  catch (error) {
   if (axios.isAxiosError(error) && error.response?.status === 404) throw new Error("The visual components API is unavailable. Restart or update the AutoTable backend, then retry.");
   if (axios.isAxiosError(error) && error.response?.status === 409) throw new Error("This design changed in another editor. Reload before saving; your draft is still here.");
   throw error;
  }
 };
 return {
  list: () => request(async () => {
   const rows: unknown = (await client.get("/admin/visual-components")).data;
   if (!Array.isArray(rows)) throw new Error("Invalid visual design list.");
   return rows.map(readDesign);
  }),
  save: (input: { id?: string; name: string; value: VisualBlockValue; revision?: number }) => request(async () => {
   const value = readVisualBlock({ id: "input", type: "custom", props: { visualBuilder: input.value } });
   const payload = { name: input.name.trim(), value, ...(input.id ? { revision: input.revision } : {}) };
   const result = input.id ? await client.put(`/admin/visual-components/${encodeURIComponent(input.id)}`, payload) : await client.post("/admin/visual-components", payload);
   const saved = readDesign(result.data);
   if (!sameValue(saved.value, value) || saved.name !== payload.name || (input.id && saved.id !== input.id)) throw new Error("The saved visual design could not be confirmed. Reload before retrying.");
   return saved;
  }),
 };
}
