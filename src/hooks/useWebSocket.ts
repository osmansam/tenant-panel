// useWebSocket.ts
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type WSInvalidateEvent =
  | { type: "invalidate"; schema: string; ts?: number }
  | { type: "pageChanged"; ts?: number }
  | { type: "containerChanged"; ts?: number };

const API_URL = import.meta.env.VITE_API_URL as string;

function toWsUrl(httpUrl: string, wsPath = "/ws") {
  const u = new URL(httpUrl);
  u.protocol = u.protocol === "https:" ? "wss:" : "ws:";
  u.pathname = wsPath.startsWith("/") ? wsPath : `/${wsPath}`;
  u.search = "";
  return u.toString();
}
export function useWebSocket() {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const stateRef = useRef({ userClosed: false, delay: 1000 });

  const [connectTrigger, setConnectTrigger] = useState(0);

  useEffect(() => {
    if (!API_URL) {
      console.warn("VITE_API_URL is not set; WebSocket will not connect.");
      return;
    }

    const WS_URL = toWsUrl(API_URL, "/ws");
    const state = stateRef.current;

    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS connected:", WS_URL);
        state.delay = 1000;
      };

      ws.onmessage = async (evt) => {
        try {
          const msg: WSInvalidateEvent = JSON.parse(evt.data);
          console.log("WS message received:", msg);

          // Handle pageChanged event
          if (msg?.type === "pageChanged") {
            console.log("WS: Page data changed, invalidating page queries");
            await queryClient.invalidateQueries({
              queryKey: ["page"],
              type: "all",
              exact: false,
            });
            return;
          }

          // Handle containerChanged event
          if (msg?.type === "containerChanged") {
            console.log(
              "WS: Container data changed, invalidating container queries"
            );
            await queryClient.invalidateQueries({
              queryKey: ["container"],
              type: "all",
              exact: false,
            });
            return;
          }

          // Handle schema invalidate event
          if (msg?.type !== "invalidate" || !msg?.schema) return;
          console.log("WS invalidating queries for schema:", msg.schema);
          await queryClient.invalidateQueries({
            queryKey: ["dynamic", msg.schema],
            type: "all",
            exact: false,
          });

          // (Optional) be extra-safe: directly hit array keys you know exist
          // await queryClient.invalidateQueries({ queryKey: ["dynamic", msg.schema] });
          // await queryClient.invalidateQueries({ queryKey: ["dynamic", msg.schema, "all"] });
        } catch {
          /* ignore non-JSON */
        }
      };

      ws.onerror = () => {
        try {
          ws.close();
        } catch {
          /* ignore non-JSON */
        }
      };

      ws.onclose = () => {
        console.log("WS disconnected. Reconnecting...");
        if (state.userClosed) return;
        const d = state.delay;
        setTimeout(connect, d);
        state.delay = Math.min(d + 1000, 5000);
      };
    };

    connect();

    return () => {
      state.userClosed = true;
      try {
        wsRef.current?.close();
      } catch {
        /* ignore non-JSON */
      }
      wsRef.current = null;
    };
  }, [queryClient, connectTrigger]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Tab became visible, refreshing data and checking WS...");
        // Always invalidate to get fresh data
        queryClient.invalidateQueries();

        // Reconnect if not open
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          console.log("WS not open, forcing reconnect...");
          setConnectTrigger((prev: number) => prev + 1);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryClient]);
}
