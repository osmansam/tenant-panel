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
}));

vi.mock("react-toastify", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("../../utils/api/localization", () => ({
  useSaveLocaleSettings: () => ({ mutateAsync: state.save, isPending: state.savePending }),
  useTranslations: () => ({ data: state.translations, isLoading: state.loading }),
  useEditTranslation: () => ({ mutate: state.edit }),
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
});
