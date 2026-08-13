import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosClient } from "./axiosClient";
import { deleteDynamicArrayRow, reorderDynamicArrayRows, updateDynamicArrayRow } from "./dynamicArray";

vi.mock("./axiosClient", () => ({ axiosClient: { patch: vi.fn(), delete: vi.fn() } }));

describe("dynamic array API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: { data: { parent: {} } } });
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: { data: { parent: {} } } });
  });

  it("encodes target segments and sends a row-scoped update", async () => {
    await updateDynamicArrayRow({ schemaName: "check/list", parentId: "abc", arrayField: "du ties", rowIdentityField: "duty", rowIdentity: "Close/store", updates: { locations: [1, 3] } });
    expect(axiosClient.patch).toHaveBeenCalledWith(
      "/dynamic/check%2Flist/abc/array/du%20ties/Close%2Fstore",
      { rowIdentityField: "duty", updates: { locations: [1, 3] } },
    );
  });

  it("sends delete identity metadata in the request body", async () => {
    await deleteDynamicArrayRow({ schemaName: "checklist", parentId: "abc", arrayField: "duties", rowIdentityField: "duty", rowIdentity: "Open" });
    expect(axiosClient.delete).toHaveBeenCalledWith("/dynamic/checklist/abc/array/duties/Open", { data: { rowIdentityField: "duty" } });
  });

  it("sends the complete reorder set", async () => {
    await reorderDynamicArrayRows({ schemaName: "checklist", parentId: "abc", arrayField: "duties", rowIdentityField: "duty", orderField: "order", rowIdentities: ["Clean", "Open"] });
    expect(axiosClient.patch).toHaveBeenCalledWith("/dynamic/checklist/abc/array/duties/reorder", { rowIdentityField: "duty", orderField: "order", rowIdentities: ["Clean", "Open"] });
  });
});
