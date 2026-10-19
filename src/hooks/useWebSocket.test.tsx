// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";
import { useWebSocket } from "./useWebSocket";

afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });

it("recovers from a corrupted saved project before connecting", () => {
  localStorage.setItem("currentProject", "broken-json");
  const connect = vi.fn();
  class FakeWebSocket { constructor(url: string) { connect(url); } close() {} }
  vi.stubGlobal("WebSocket", FakeWebSocket);
  const client = new QueryClient();
  expect(() => renderHook(() => useWebSocket(), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  })).not.toThrow();
  expect(localStorage.getItem("currentProject")).toBeNull();
});
