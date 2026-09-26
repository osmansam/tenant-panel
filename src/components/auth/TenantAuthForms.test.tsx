// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TenantLoginForm } from "./TenantLoginForm";
import { TenantRegisterForm } from "./TenantRegisterForm";

const tenantLogin = vi.fn();
const tenantRegister = vi.fn();
const initiateGoogleLogin = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("../../utils/api/auth", () => ({
  useTenantLogin: () => ({ tenantLogin }),
  useTenantRegister: () => ({ tenantRegister }),
  useGoogleLogin: () => ({ initiateGoogleLogin }),
}));

describe("tenant authentication forms", () => {
  beforeEach(() => vi.clearAllMocks());

  it("exposes a compact login form and preserves validation and keyboard submission", async () => {
    const user = userEvent.setup();
    render(<TenantLoginForm />);

    const form = screen.getByTestId("tenant-login-form");
    expect(form).toHaveAttribute("aria-busy", "false");

    await user.type(screen.getByLabelText(/Email/), "invalid");
    await user.type(screen.getByLabelText(/Password/), "123");
    fireEvent.submit(form);
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(tenantLogin).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText(/Email/));
    await user.type(screen.getByLabelText(/Email/), "owner@example.com");
    await user.clear(screen.getByLabelText(/Password/));
    await user.type(screen.getByLabelText(/Password/), "secret12{Enter}");
    expect(tenantLogin).toHaveBeenCalledWith({ email: "owner@example.com", password: "secret12" });
  });

  it("keeps registration slug generation and all account fields reachable", async () => {
    const user = userEvent.setup();
    render(<TenantRegisterForm />);

    expect(screen.getByTestId("tenant-register-form")).toHaveAttribute("aria-busy", "false");
    await user.type(screen.getByLabelText(/Tenant Name/), "North Star Labs");
    expect(screen.getByLabelText(/Tenant Slug/)).toHaveValue("north-star-labs");
    expect(screen.getByRole("button", { name: "Create Account" })).toHaveAttribute(
      "data-primary-action",
      "true",
    );
  });
});
