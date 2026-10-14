import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosClient } from "./axiosClient";
import {
  generateTranslations,
  saveLocaleSettings,
  translationJobQueryOptions,
  translationQueryOptions,
} from "./localization";

vi.mock("./axiosClient", () => ({ axiosClient: { get: vi.fn(), patch: vi.fn(), post: vi.fn() } }));

describe("localization API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns the translation job id from saved locale settings", async () => {
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: { data: { translationJobId: "job-1", localizationVersion: 3 } } });
    await expect(saveLocaleSettings("project-1", {
      sourceLocale: "en", defaultLocale: "tr", enabledLocales: ["en", "tr"], generateWithAI: true,
    })).resolves.toEqual({ translationJobId: "job-1", localizationVersion: 3 });
  });

  it("polls only pending and running jobs", () => {
    const options = translationJobQueryOptions("project-1", "job-1");
    expect(options.enabled).toBe(true);
    expect(options.refetchInterval({ state: { data: { status: "pending" } } } as any)).toBe(1000);
    expect(options.refetchInterval({ state: { data: { status: "running" } } } as any)).toBe(1000);
    expect(options.refetchInterval({ state: { data: { status: "completed" } } } as any)).toBe(false);
    expect(options.refetchInterval({ state: { data: { status: "failed" } } } as any)).toBe(false);
    expect(translationJobQueryOptions("project-1", "").enabled).toBe(false);
  });

  it("omits the optional key filter for project-wide generation", async () => {
    vi.mocked(axiosClient.post).mockResolvedValue({ data: { data: { translationJobId: "job-2" } } });
    await generateTranslations("project-1", { targetLocales: ["tr"] });
    expect(axiosClient.post).toHaveBeenCalledWith("/tenant/projects/project-1/translations/generate", { targetLocales: ["tr"] });
  });

  it("does not poll translations continuously", () => {
    expect(translationQueryOptions("project-1", "tr").refetchInterval).toBe(false);
  });
});
