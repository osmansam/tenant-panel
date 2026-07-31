import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosClient } from "./axiosClient";
import { patch, put, remove } from ".";

vi.mock("./axiosClient", () => ({
  axiosClient: {
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("API mutation helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ["put", "put", () => put({ path: "/items/1", payload: { name: "updated" } })],
    ["patch", "patch", () => patch({ path: "/items/1", payload: { name: "updated" } })],
    ["remove", "delete", () => remove({ path: "/items/1" })],
  ])("returns response data for %s requests", async (_name, method, request) => {
    const responseData = { id: 1, name: "updated" };
    vi.mocked(axiosClient[method as "put" | "patch" | "delete"]).mockResolvedValue(
      { data: responseData } as never
    );

    await expect(request()).resolves.toEqual(responseData);
  });
});
