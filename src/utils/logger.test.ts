import * as Sentry from "@sentry/react";
import { afterEach, expect, it, vi } from "vitest";
import { scrubEvent } from "../observability/privacy";
import { logger } from "./logger";

afterEach(async () => {
  await Sentry.close(1_000);
  vi.unstubAllEnvs();
});

it("retains a safe error stack when production diagnostics contain no Error instance", async () => {
  let delivered: unknown;
  vi.stubEnv("DEV", false);
  Sentry.init({
    dsn: "https://public@monitor.example.test/1",
    integrations: [],
    beforeSend: scrubEvent,
    transport: () => ({
      send: (envelope) => {
        delivered = envelope[1].find(([header]) => header.type === "event")?.[1];
        return Promise.resolve({ statusCode: 200 });
      },
      flush: () => Promise.resolve(true),
    }),
  });

  logger.error("Failed request for private@example.test", { token: "private-token" });
  await Sentry.flush(1_000);

  expect(delivered).toMatchObject({ exception: { values: [expect.objectContaining({
    type: "Error", value: "[Filtered]", stacktrace: { frames: expect.any(Array) },
  })] } });
  expect(JSON.stringify(delivered)).not.toMatch(/private@example\.test|private-token/);
});
