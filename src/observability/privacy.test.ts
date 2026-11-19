import { expect, it } from "vitest";
import { scrubEvent } from "./privacy";
import type { Event } from "@sentry/react";

it("drops authored data and identity while retaining actionable stack locations", () => {
  const secret = "private@example.test";
  const event: Event = {
    message: `Failed request for ${secret}`,
    user: { email: secret, id: "user-secret" },
    extra: { password: "password-secret" },
    contexts: { custom: { token: "token-secret" } },
    request: { url: `https://panel.example/projects/user-secret#${secret}`, headers: { Cookie: "cookie-secret" }, data: "body-secret" },
    breadcrumbs: [{ message: secret, data: { url: `https://api.example/?token=${secret}`, body: secret } }],
    exception: { values: [{ type: "TypeError", value: secret, stacktrace: { frames: [{ filename: "app.tsx", abs_path: `https://panel.example/assets/app.js?token=${secret}`, lineno: 12, vars: { secret } }] } }] },
    tags: { customer: secret, web_vital: "LCP", rating: "good" },
    measurements: { LCP: { value: 123, unit: "millisecond" }, [secret]: { value: 1, unit: "secret-unit" } },
    debug_meta: { images: [
      { type: "sourcemap", debug_id: "b605ec19-924e-48a4-82c3-b7c9e434c54d", code_file: "https://panel.example/assets/app.js" },
      { type: "sourcemap", debug_id: secret, code_file: `https://panel.example/invitations#${secret}` },
    ] },
  };
  const scrubbed = scrubEvent(event);
  const encoded = JSON.stringify(scrubbed);
  for (const value of [secret, "user-secret", "password-secret", "token-secret", "cookie-secret", "body-secret"]) expect(encoded).not.toContain(value);
  expect(scrubbed.exception?.values?.[0].stacktrace?.frames?.[0]).toMatchObject({ lineno: 12, filename: "app.tsx", abs_path: "https://panel.example/assets/app.js" });
  expect(scrubbed.tags).toEqual({ web_vital: "LCP", rating: "good" });
  expect(scrubbed.measurements).toEqual({ LCP: { value: 123, unit: "millisecond" } });
  expect(scrubbed.debug_meta).toEqual({ images: [{ type: "sourcemap", debug_id: "b605ec19-924e-48a4-82c3-b7c9e434c54d", code_file: "https://panel.example/assets/app.js" }] });
  expect(event.user?.email).toBe(secret);
});
it("removes invitation fragments and arbitrary messages from breadcrumbs", () => {
  const result = scrubEvent({ breadcrumbs: [{ category: "navigation", message: "sensitive name", data: { from: "/invitations/accept#opaque-secret", to: "/members?email=private" } }] });
  expect(JSON.stringify(result)).not.toMatch(/opaque-secret|sensitive name|email=private/);
});
