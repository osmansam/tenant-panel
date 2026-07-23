import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  axiosPatch: vi.fn(),
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  mutationFn: undefined as undefined | ((variables: any) => Promise<unknown>),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn((options) => {
    mocks.mutationFn = options.mutationFn;
    return {
      isPending: false,
      mutate: mocks.mutate,
      mutateAsync: mocks.mutateAsync,
    };
  }),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (message: string) => message }),
}));

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("../../hooks/useTenant", () => ({
  useTenant: () => ({ currentTenant: { slug: "acme" } }),
}));

vi.mock("../../hooks/useCurrentProject", () => ({
  useCurrentProject: () => ({ currentProject: { slug: "retail" } }),
}));

vi.mock("./axiosClient", () => ({
  axiosClient: { patch: mocks.axiosPatch },
}));

vi.mock("./factory", () => ({
  useGet: vi.fn(),
}));

import {
  normalizeDynamicApiModel,
  normalizeDynamicWorkflow,
  useUpdateContainer,
  useUpdateWorkflows,
} from "./container";

describe("container API normalization", () => {
  it("normalizes Dynamic API models returned with Go field names", () => {
    expect(
      normalizeDynamicApiModel({
        Name: "status",
        Url: "https://api.example.com/status",
        Method: "POST",
        Dependencies: ["id", "token"],
        IsAuthenticated: true,
        IsAuthorized: true,
        AuthorizeRole: ["admin"],
        IsActive: false,
        IsRedisCached: true,
        CacheTime: 30,
      })
    ).toEqual({
      name: "status",
      url: "https://api.example.com/status",
      method: "POST",
      dependencies: ["id", "token"],
      isAuthenticated: true,
      isAuthorized: true,
      authorizeRole: ["admin"],
      isActive: false,
      isRedisCached: true,
      cacheTime: 30,
    });
  });

  it("normalizes Dynamic Workflows returned with Go field names", () => {
    expect(
      normalizeDynamicWorkflow({
        ID: "workflow-1",
        Name: "notify",
        Version: 2,
        Trigger: "event",
        Schedule: "0 * * * *",
        Timezone: "UTC",
        Mode: "transactional",
        IsActive: false,
        IsAuthenticated: true,
        IsAuthorized: true,
        AuthorizeRole: ["admin"],
        Description: "Send notifications",
        Payload: { channel: "email" },
        Conditions: [{ field: "status", operator: "=", value: "ready" }],
        Steps: [{ name: "send", type: "action" }],
        StopOnError: false,
        TimeoutSec: 30,
        ReturnStep: "send",
        OutputFields: ["messageId"],
        RunInTransaction: true,
      })
    ).toEqual({
      id: "workflow-1",
      name: "notify",
      version: 2,
      trigger: "event",
      schedule: "0 * * * *",
      timezone: "UTC",
      mode: "transactional",
      isActive: false,
      isAuthenticated: true,
      isAuthorized: true,
      authorizeRole: ["admin"],
      description: "Send notifications",
      payload: { channel: "email" },
      conditions: [{ field: "status", operator: "=", value: "ready" }],
      steps: [{ name: "send", type: "action" }],
      stopOnError: false,
      timeoutSec: 30,
      returnStep: "send",
      outputFields: ["messageId"],
      runInTransaction: true,
    });
  });
});

describe("useUpdateWorkflows", () => {
  beforeEach(() => {
    mocks.axiosPatch.mockReset();
    mocks.axiosPatch.mockResolvedValue({ data: {} });
    mocks.mutate.mockReset();
    mocks.mutateAsync.mockReset();
    mocks.mutationFn = undefined;
  });

  it("PATCHes the container workflow endpoint with the PascalCase payload", async () => {
    useUpdateWorkflows();

    const payload = {
      Workflows: [{ name: "notify", isActive: true }],
    };

    expect(mocks.mutationFn).toBeTypeOf("function");
    await mocks.mutationFn!({ id: "container-1", payload });

    expect(mocks.axiosPatch).toHaveBeenCalledWith(
      "/acme/retail/container/workflows/container-1",
      {
        Workflows: [{ name: "notify", isActive: true }],
      }
    );
  });
});


describe("useUpdateContainer", () => {
  beforeEach(() => {
    mocks.axiosPatch.mockReset();
    mocks.axiosPatch.mockResolvedValue({ data: {} });
    mocks.mutate.mockReset();
    mocks.mutateAsync.mockReset();
    mocks.mutationFn = undefined;
  });

  it("exposes an async update so field modals can wait for persistence", async () => {
    mocks.mutateAsync.mockResolvedValue({ ok: true });
    const { updateContainerAsync } = useUpdateContainer();

    const params = {
      id: "container-1",
      payload: {
        schemaName: "orders",
        fields: [{ name: "status", type: "string" }],
      },
    };

    await expect(updateContainerAsync(params)).resolves.toEqual({ ok: true });
    expect(mocks.mutateAsync).toHaveBeenCalledWith(params);
  });
});
