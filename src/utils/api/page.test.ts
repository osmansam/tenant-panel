import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mutateAsync: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(() => ({
    isPending: false,
    mutate: vi.fn(),
    mutateAsync: mocks.mutateAsync,
  })),
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
  axiosClient: { patch: vi.fn() },
}));

vi.mock("./factory", () => ({
  useGet: vi.fn(),
  useGetList: vi.fn(),
}));

import { useUpdatePage } from "./page";

describe("useUpdatePage", () => {
  beforeEach(() => {
    mocks.mutateAsync.mockReset();
  });

  it("exposes an async update so page designer saves can wait for persistence", async () => {
    mocks.mutateAsync.mockResolvedValue({ ok: true });
    const { updatePageAsync } = useUpdatePage();
    const params = {
      id: "page-1",
      payload: { name: "Dashboard", sections: [] },
    };

    await expect(updatePageAsync(params)).resolves.toEqual({ ok: true });
    expect(mocks.mutateAsync).toHaveBeenCalledWith(params);
  });
});
