// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrandingEditor } from "./BrandingEditor";

const state = vi.hoisted(() => ({
  error: false,
  loading: false,
  pending: false,
  patch: vi.fn(),
  upload: vi.fn(),
  reset: vi.fn(),
}));

const branding = {
  overrides: { displayName: "A very long project branding name that must remain readable", primaryColor: "#7C3AED" },
  effective: {
    displayName: "Tenant Brand", logoAlt: "Tenant logo", primaryColor: "#7C3AED",
    loginBrandingEnabled: true, logoUrl: "/logo.png", compactLogoUrl: "/compact.png", faviconUrl: "/favicon.png",
  },
};

vi.mock("react-toastify", () => ({ toast: { error: vi.fn(), success: vi.fn(), info: vi.fn() } }));
vi.mock("../../utils/api/branding", () => ({
  useTenantBranding: () => ({ data: branding, isError: state.error, isLoading: state.loading }),
  useProjectBranding: () => ({ data: branding, isError: state.error, isLoading: state.loading }),
  usePatchBranding: () => ({ mutateAsync: state.patch, isPending: state.pending }),
  useUploadBrandingAsset: () => ({ mutateAsync: state.upload, isPending: false }),
  useResetBrandingAsset: () => ({ mutateAsync: state.reset, isPending: false }),
}));

describe("BrandingEditor", () => {
  beforeEach(() => {
    state.error = false;
    state.loading = false;
    state.pending = false;
    vi.clearAllMocks();
  });

  it("associates validation errors and keeps long names readable", async () => {
    const user = userEvent.setup();
    render(<BrandingEditor scope="project" tenantId="tenant-1" projectId="project-1" />);
    const color = screen.getByRole("textbox", { name: "Primary color" });
    await user.clear(color);
    await user.type(color, "not-a-color");
    await user.click(screen.getByRole("button", { name: "Save branding" }));
    expect(color).toHaveAttribute("aria-invalid", "true");
    expect(color).toHaveAccessibleDescription(/six-digit hex color/i);
    expect(screen.getByDisplayValue(/A very long project branding/)).toHaveClass("min-w-0");
  });

  it("supports inheritance and warns while changes are dirty", async () => {
    const user = userEvent.setup();
    render(<BrandingEditor scope="project" tenantId="tenant-1" projectId="project-1" />);
    await user.click(screen.getAllByRole("button", { name: "Use tenant default" })[0]);
    const event = new Event("beforeunload", { cancelable: true });
    fireEvent(window, event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("disables duplicate saves while pending and exposes load failures", () => {
    state.pending = true;
    const { rerender } = render(<BrandingEditor scope="tenant" tenantId="tenant-1" />);
    expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
    state.error = true;
    rerender(<BrandingEditor scope="tenant" tenantId="tenant-1" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Branding settings could not be loaded");
  });
});
