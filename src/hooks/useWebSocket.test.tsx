// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";
import { useWebSocket } from "./useWebSocket";

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.useRealTimers(); localStorage.clear(); });

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

it("continues retrying after a visibility-triggered reconnect", async () => {
  vi.useFakeTimers();
  const sockets: FakeWebSocket[] = [];
  class FakeWebSocket {
    static OPEN = 1;
    readyState = 3;
    onopen: (() => void) | null = null;
    onclose: (() => void) | null = null;
    constructor() { sockets.push(this); }
    close() { this.onclose?.(); }
  }
  vi.stubGlobal("WebSocket", FakeWebSocket);
  vi.stubEnv("VITE_API_URL", "http://localhost:3000");
  vi.resetModules();
  const { useWebSocket: useSocket } = await import("./useWebSocket");
  const client = new QueryClient();
  const { unmount } = renderHook(() => useSocket(), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
  expect(sockets).toHaveLength(1);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  const { act } = await import("@testing-library/react");
  void act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(sockets).toHaveLength(2);
  // A delayed close from the disposed socket must not start another retry.
  void act(() => sockets[0].onclose?.());
  void act(() => sockets[1].onclose?.());
  void act(() => vi.advanceTimersByTime(1000));
  expect(sockets).toHaveLength(3);
  unmount();
  void act(() => vi.advanceTimersByTime(10_000));
  expect(sockets).toHaveLength(3);
  vi.useRealTimers();
});

it("invalidates cached data when the socket reconnects after missed events", async () => {
  vi.useFakeTimers();
  const sockets: FakeWebSocket[] = [];
  class FakeWebSocket {
    onopen: (() => void) | null = null;
    onclose: (() => void) | null = null;
    constructor() { sockets.push(this); }
    close() { this.onclose?.(); }
  }
  vi.stubGlobal("WebSocket", FakeWebSocket);
  vi.stubEnv("VITE_API_URL", "http://localhost:3000");
  vi.resetModules();
  const { useWebSocket: useSocket } = await import("./useWebSocket");
  const { act } = await import("@testing-library/react");
  const client = new QueryClient();
  client.setQueryData(["dynamic", "records"], ["cached record"]);
  const { unmount } = renderHook(() => useSocket(), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
  void act(() => sockets[0].onopen?.());
  expect(client.getQueryState(["dynamic", "records"])?.isInvalidated).toBe(false);
  void act(() => sockets[0].onclose?.());
  void act(() => vi.advanceTimersByTime(1000));
  void act(() => sockets[1].onopen?.());
  expect(client.getQueryState(["dynamic", "records"])?.isInvalidated).toBe(true);
  unmount();
  client.clear();
});
