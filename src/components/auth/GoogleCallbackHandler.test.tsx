// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ exchange: vi.fn(), onError: undefined as undefined | ((error: unknown) => void) }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (s: string) => s }) }));
vi.mock("../../utils/api/auth", () => ({
  useGoogleCallback: (_location: unknown, onError: (error: unknown) => void) => {
    mocks.onError = onError;
    return { handleGoogleCallback: mocks.exchange };
  },
}));
import { GoogleCallbackHandler } from "./GoogleCallbackHandler";
beforeEach(() => { vi.clearAllMocks(); });

it.each(["?error=access_denied", "", "?code="])("shows a recovery link instead of an endless spinner for %s", query => {
  render(<MemoryRouter initialEntries={[`/auth/google/callback${query}`]}><GoogleCallbackHandler /></MemoryRouter>);
  expect(screen.getByRole("alert")).toHaveTextContent("Google sign-in could not be completed");
  expect(screen.getByRole("link", { name: "Back to sign in" })).toHaveAttribute("href", "/login");
  expect(screen.queryByText("Completing Google sign-in...")).not.toBeInTheDocument();
  expect(mocks.exchange).not.toHaveBeenCalled();
});

it("recovers when the authorization code exchange fails", () => {
  const onError = vi.fn();
  render(<MemoryRouter initialEntries={["/auth/google/callback?code=one-time-code"]}><GoogleCallbackHandler onError={onError} /></MemoryRouter>);
  expect(mocks.exchange).toHaveBeenCalledWith("one-time-code");
  const error = new Error("Network failure");
  act(() => { mocks.onError?.(error); });
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(screen.queryByText("Completing Google sign-in...")).not.toBeInTheDocument();
  expect(onError).toHaveBeenCalledWith(error);
});

it("exchanges a one-time code once across StrictMode effects and parent rerenders", () => {
  const view = (onError: (error: unknown) => void) => <StrictMode><MemoryRouter initialEntries={["/auth/google/callback?code=one-time-code"]}><GoogleCallbackHandler onError={onError} /></MemoryRouter></StrictMode>;
  const { rerender } = render(view(vi.fn()));
  rerender(view(vi.fn()));
  expect(mocks.exchange).toHaveBeenCalledTimes(1);
});
