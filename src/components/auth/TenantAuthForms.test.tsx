// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TenantLoginForm } from "./TenantLoginForm";
import { TenantRegisterForm } from "./TenantRegisterForm";

const tenantLogin = vi.fn();
const tenantRegister = vi.fn();
const initiateGoogleLogin = vi.fn();
let loginError: ((error: unknown) => void) | undefined;
let registerError: ((error: unknown) => void) | undefined;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("../../utils/api/auth", () => ({
  useTenantLogin: (_success: unknown, onError: (error: unknown) => void) => { loginError = onError; return { tenantLogin }; },
  useTenantRegister: (_success: unknown, onError: (error: unknown) => void) => { registerError = onError; return { tenantRegister }; },
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
    await user.type(screen.getByLabelText(/^Password/), "123");
    fireEvent.submit(form);
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(tenantLogin).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText(/Email/));
    await user.type(screen.getByLabelText(/Email/), "owner@example.com");
    await user.clear(screen.getByLabelText(/^Password/));
    await user.type(screen.getByLabelText(/^Password/), "secret12{Enter}");
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

  it("offers password manager hints and focuses invalid login fields", async () => {
    render(<TenantLoginForm />);
    const email = screen.getByLabelText(/^Email/);
    const password = screen.getByLabelText(/^Password/);
    expect(email).toHaveAttribute("autocomplete", "username");
    expect(password).toHaveAttribute("autocomplete", "current-password");
    fireEvent.submit(screen.getByTestId("tenant-login-form"));
    await waitFor(() => expect(email).toHaveFocus());
    expect(email).toHaveAccessibleDescription("Email is required");
  });


  it("validates an empty login when the primary action is clicked", async () => {
    const user = userEvent.setup();
    render(<TenantLoginForm />);
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/^Email/)).toHaveFocus());
  });

  it("preserves an explicitly edited tenant slug while the tenant name changes", async () => {
    const user = userEvent.setup();
    render(<TenantRegisterForm />);
    await user.type(screen.getByLabelText(/Tenant Name/), "North Star");
    const slug = screen.getByLabelText(/Tenant Slug/);
    await user.clear(slug);
    await user.type(slug, "my-team");
    await user.type(screen.getByLabelText(/Tenant Name/), " Labs");
    expect(slug).toHaveValue("my-team");
  });


  it("keeps login failures visible and preserves entered credentials for retry", async () => {
    const user = userEvent.setup();
    render(<TenantLoginForm />);
    await user.type(screen.getByLabelText(/^Email/), "alex@example.com");
    await user.type(screen.getByLabelText(/^Password/), "secret12");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByTestId("tenant-login-form")).toHaveAttribute("aria-busy", "true");
    act(() => loginError?.(new Error("Offline")));
    expect(screen.getByRole("alert")).toHaveTextContent("could not sign you in");
    expect(screen.getByLabelText(/^Email/)).toHaveValue("alex@example.com");
    expect(screen.getByRole("button", { name: "Login" })).toBeEnabled();
  });

  it("trims registration identity fields before submitting", async () => {
    const user = userEvent.setup();
    render(<TenantRegisterForm />);
    await user.type(screen.getByLabelText(/^Email/), "alex@example.com");
    await user.type(screen.getByLabelText(/^Password/), "secret12");
    await user.type(screen.getByLabelText(/Full Name/), " Alex Morgan ");
    await user.type(screen.getByLabelText(/Tenant Name/), " Acme Studio ");
    await user.click(screen.getByRole("button", { name: "Create Account" }));
    expect(tenantRegister).toHaveBeenCalledWith({ email: "alex@example.com", password: "secret12", name: "Alex Morgan", tenantName: "Acme Studio", tenantSlug: "acme-studio" });
    act(() => registerError?.(new Error("Offline")));
    expect(screen.getByRole("alert")).toHaveTextContent("could not create your account");
  });

});
