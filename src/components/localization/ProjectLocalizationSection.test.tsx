// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectLocalizationSection } from "./ProjectLocalizationSection";

const state = vi.hoisted(() => ({
  translations: [] as Array<Record<string, any>>,
  loading: false,
  savePending: false,
  save: vi.fn(),
  edit: vi.fn(),
	generate: vi.fn(),
	refetch: vi.fn(),
	job: undefined as undefined | Record<string, any>,
}));

vi.mock("react-toastify", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("../../utils/api/localization", () => ({
  useSaveLocaleSettings: () => ({ mutateAsync: state.save, isPending: state.savePending }),
  useTranslations: () => ({ data: state.translations, isLoading: state.loading, refetch: state.refetch }),
  useEditTranslation: () => ({ mutate: state.edit }),
	useGenerateTranslations: () => ({ mutateAsync: state.generate, isPending: false }),
	useTranslationJob: () => ({ data: state.job }),
}));

const project = {
  id: "project-1",
  name: "Retail",
  sourceLocale: "en",
  defaultLocale: "tr",
  enabledLocales: ["en", "tr"],
} as any;

describe("ProjectLocalizationSection", () => {
  beforeEach(() => {
    state.translations = [];
    state.loading = false;
    state.savePending = false;
	state.job = undefined;
	state.save.mockResolvedValue({ translationJobId: "" });
	state.generate.mockResolvedValue({ translationJobId: "job-generate" });
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("saves the existing locale settings payload", async () => {
    const user = userEvent.setup();
    render(<ProjectLocalizationSection project={project} />);
    await user.click(screen.getByRole("tab", { name: "Languages" }));
    await user.click(screen.getByRole("button", { name: "Save language settings" }));
    expect(state.save).toHaveBeenCalledWith({
      sourceLocale: "en",
      defaultLocale: "tr",
      enabledLocales: ["en", "tr"],
      generateWithAI: true,
    });
  });

  it("opens on translations and separates language configuration into a keyboard-accessible tab", async () => {
    const user = userEvent.setup();
    state.translations = [{
      translationKey: "product.title",
      resourceType: "field",
      status: "translated",
      sourceText: "Product",
      translatedText: "Ürün",
      origin: "manual",
    }];
    render(<ProjectLocalizationSection project={project} />);

    const translationsTab = screen.getByRole("tab", { name: "Translations" });
    expect(translationsTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("table", { name: "Translations" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Source language")).not.toBeInTheDocument();

    translationsTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Languages" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByLabelText("Source language")).toBeInTheDocument();
    expect(screen.queryByRole("table", { name: "Translations" })).not.toBeInTheDocument();
  });

  it("shows a semantic empty translation state", () => {
    render(<ProjectLocalizationSection project={project} />);
    expect(screen.getByRole("status", { name: "No translations yet" })).toBeInTheDocument();
  });

  it("preserves origin badges and saves changed translations on blur", async () => {
    const user = userEvent.setup();
    state.translations = [{
      translationKey: "product.title",
      resourceType: "field",
      status: "translated",
      sourceText: "A very long source value that must wrap safely in a narrow editor row",
      translatedText: "Ürün",
      origin: "manual",
    }];
    render(<ProjectLocalizationSection project={project} />);
    expect(screen.getByText("manual")).toHaveAttribute("data-variant", "success");
    const input = screen.getByRole("textbox", { name: "Translation for A very long source value that must wrap safely in a narrow editor row" });
    await user.clear(input);
    await user.type(input, "Yeni ürün");
    await user.tab();
    expect(state.edit).toHaveBeenCalledWith({ key: "product.title", translatedText: "Yeni ürün" });
    expect(screen.getByText(/A very long source/)).toHaveClass("break-words");
    expect(input.closest("[data-layout]")).toHaveAttribute("data-layout", "stacked-until-medium");
  });

  it("disables duplicate settings submissions while saving", async () => {
    const user = userEvent.setup();
    state.savePending = true;
    render(<ProjectLocalizationSection project={project} />);
    await user.click(screen.getByRole("tab", { name: "Languages" }));
    expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
  });

	it("shows progress after saving a language with AI generation", async () => {
		const user = userEvent.setup();
		state.save.mockResolvedValue({ translationJobId: "job-save" });
		state.job = { status: "running", total: 10, completed: 4, skippedManual: 1, failed: 0, errorSummary: [] };
		render(<ProjectLocalizationSection project={project} />);
		await user.click(screen.getByRole("tab", { name: "Languages" }));
		await user.click(screen.getByRole("button", { name: "Save language settings" }));
		expect(await screen.findByRole("status", { name: "Translation generation progress" })).toHaveTextContent("4 of 10");
	});

	it("refreshes translations when generation completes", () => {
		state.job = { status: "completed", total: 2, completed: 2, skippedManual: 0, failed: 0, errorSummary: [] };
		render(<ProjectLocalizationSection project={project} />);
		expect(state.refetch).toHaveBeenCalled();
	});

	it("starts project-wide regeneration and supports retry after failure", async () => {
		const user = userEvent.setup();
		state.job = { status: "failed", total: 2, completed: 1, skippedManual: 0, failed: 1, errorSummary: ["tr: provider unavailable"] };
		render(<ProjectLocalizationSection project={project} />);
		expect(screen.getByText("tr: provider unavailable")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Retry translation generation" }));
		expect(state.generate).toHaveBeenCalledWith({ targetLocales: ["tr"] });
	});

	it("shows missing and outdated states while keeping untranslated fields editable", () => {
		state.translations = [
			{ translationKey: "missing", resourceType: "field", status: "missing", sourceText: "Missing", translatedText: "", origin: "untranslated" },
			{ translationKey: "outdated", resourceType: "field", status: "outdated", sourceText: "Outdated", translatedText: "Eski", origin: "ai" },
		];
		render(<ProjectLocalizationSection project={project} />);
		expect(screen.getByText("missing")).toBeInTheDocument();
		expect(screen.getByText("outdated")).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: "Translation for Missing" })).toBeEnabled();
	});
});
