// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { onlineManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";
import { useGetQuery } from "./factory";
import { get } from ".";

vi.mock(".", () => ({ get: vi.fn(), patch: vi.fn(), post: vi.fn(), remove: vi.fn() }));
afterEach(() => { onlineManager.setOnline(true); vi.clearAllMocks(); });

it("refreshes stale cached data when a screen remounts", async () => {
  vi.mocked(get).mockResolvedValue({ value: "fresh" });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(["records"], { value: "old" }, { updatedAt: Date.now() - 60_000 });
  const { result, unmount } = renderHook(() => useGetQuery<{ value: string }>("/records", ["records"]), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
  await waitFor(() => expect(result.current.data?.value).toBe("fresh"));
  unmount();
  client.clear();
});

it("refreshes stale cached data after network reconnection", async () => {
  vi.mocked(get).mockResolvedValue({ value: "fresh" });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(["records"], { value: "old" }, { updatedAt: Date.now() - 60_000 });
  onlineManager.setOnline(false);
  const { result, unmount } = renderHook(() => useGetQuery<{ value: string }>("/records", ["records"]), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
  expect(result.current.data?.value).toBe("old");
  act(() => onlineManager.setOnline(true));
  await waitFor(() => expect(result.current.data?.value).toBe("fresh"));
  unmount();
  client.clear();
});
