// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IntegrationsPage from "./IntegrationsPage";

const state = vi.hoisted(() => ({
  inProject: true,
  credentials: [] as Array<Record<string, any>>,
  externalCredentials: [] as Array<Record<string, any>>,
  loading: false,
  externalLoading: false,
  createPending: false,
  createExternalPending: false,
  create: vi.fn(),
  createExternal: vi.fn(),
  revoke: vi.fn(),
  revokeExternal: vi.fn(),
  refetch: vi.fn(),
  refetchExternal: vi.fn(),
}));

vi.mock("react-router-dom", () => ({ Navigate: ({ to }: { to: string }) => <div>Redirect to {to}</div> }));
vi.mock("react-toastify", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({
    isInProject: state.inProject,
    currentProject: state.inProject ? { name: "Retail Platform" } : null,
  }),
}));
vi.mock("../utils/api/container", () => ({
  useContainers: () => [{ schemaName: "orders", workflows: [{ name: "sync" }], dynamicApis: [], pipelines: [] }],
}));
vi.mock("../utils/api/integration", async (importOriginal) => {
  const actual = await importOriginal<Record<string, any>>();
  return {
    ...actual,
    useIntegrationCredentials: () => ({ data: state.credentials, isLoading: state.loading, refetch: state.refetch }),
    useExternalAPICredentials: () => ({ data: state.externalCredentials, isLoading: state.externalLoading, refetch: state.refetchExternal }),
    useCreateIntegrationCredential: () => ({ mutateAsync: state.create, isPending: state.createPending }),
    useRevokeIntegrationCredential: () => ({ mutate: state.revoke }),
    useCreateExternalAPICredential: () => ({ mutateAsync: state.createExternal, isPending: state.createExternalPending }),
    useRevokeExternalAPICredential: () => ({ mutate: state.revokeExternal }),
  };
});

describe("IntegrationsPage", () => {
  beforeEach(() => {
    state.inProject = true;
    state.credentials = [];
    state.externalCredentials = [];
    state.loading = false;
    state.externalLoading = false;
    state.createPending = false;
    state.createExternalPending = false;
    vi.clearAllMocks();
  });

  it("shows one compact page heading and semantic empty states", () => {
    render(<IntegrationsPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Integrations", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "No external API credentials yet" })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "No integration credentials yet" })).toBeInTheDocument();
  });

  it("opens an accessible external credential dialog and toggles secret visibility", async () => {
    const user = userEvent.setup();
    render(<IntegrationsPage />);
    await user.click(screen.getByRole("button", { name: "New external API credential" }));
    expect(screen.getByRole("dialog", { name: "Create external API credential" })).toBeInTheDocument();
    const secret = screen.getByLabelText("External API token");
    expect(secret).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show external API token" }));
    expect(secret).toHaveAttribute("type", "text");
  });

  it("disables create actions while saving to prevent duplicate submissions", async () => {
    const user = userEvent.setup();
    state.createPending = true;
    render(<IntegrationsPage />);
    await user.click(screen.getByRole("button", { name: "New credential" }));
    expect(screen.getByRole("button", { name: "Create credential" })).toBeDisabled();
  });

  it("renders long generated identifiers without changing their value", () => {
    const id = "credential_" + "x".repeat(100);
    state.externalCredentials = [{
      id,
      name: "Staging service",
      authType: "bearer",
      allowedDomains: ["api.example.com"],
      expiresAt: null,
      lastUsedAt: null,
      revokedAt: null,
    }];
    render(<IntegrationsPage />);
    expect(screen.getByText(id)).toHaveClass("break-all");
    expect(screen.getByText("Active")).toHaveAttribute("data-variant", "success");
  });

  it("returns to projects when project context is unavailable", () => {
    state.inProject = false;
    render(<IntegrationsPage />);
    expect(screen.getByText("Redirect to /projects")).toBeInTheDocument();
  });

  it("opens confirmation dialog before revoking a credential", async () => {
    const user = userEvent.setup();
    state.externalCredentials = [{
      id: "cred_123",
      name: "Staging service",
      authType: "bearer",
      allowedDomains: ["api.example.com"],
      expiresAt: null,
      lastUsedAt: null,
      revokedAt: null,
    }];
    render(<IntegrationsPage />);
    const revokeButton = screen.getByRole("button", { name: "Revoke Staging service" });
    await user.click(revokeButton);
    expect(screen.getByRole("dialog", { name: "Revoke external API credential" })).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to revoke "Staging service"?/)).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "Revoke credential" });
    await user.click(confirmButton);
    expect(state.revokeExternal).toHaveBeenCalledWith("cred_123");
  });
});
