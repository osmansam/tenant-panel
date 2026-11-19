// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getBlankStarterDocument } from "../fixtures/blankStarters";
import { TemplatePanel } from "./TemplatePanel";

const { loadStarter, entries } = vi.hoisted(() => ({
  loadStarter: vi.fn(),
  entries: [
    { id: "hero-a", name: "Hero Alpha", source: 0, exportName: "hero", index: null },
    { id: "pricing-b", name: "Pricing Beta", source: 1, exportName: "pricing", index: null },
  ],
}));
vi.mock("../templates/starterCatalog", () => ({ STARTER_CATALOG: entries, loadStarter }));

function mount() {
  const onSelectStarter = vi.fn();
  render(<TemplatePanel templates={[]} onSaveAsTemplate={vi.fn()} onImportTemplate={vi.fn()} onUseTemplate={vi.fn()} onSelectStarter={onSelectStarter} />);
  return onSelectStarter;
}

beforeEach(() => { loadStarter.mockReset(); });

describe("TemplatePanel lazy starter selection", () => {
  it("browses and searches metadata without requesting starter snapshots", async () => {
    const user = userEvent.setup();
    mount();
    expect(screen.getByRole("button", { name: "Use Hero Alpha" })).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Pricing (1)" }));
    expect(screen.queryByRole("button", { name: "Use Hero Alpha" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("searchbox", { name: "Search templates" }), "Beta");
    expect(screen.getByRole("button", { name: "Use Pricing Beta" })).toBeVisible();
    expect(loadStarter).not.toHaveBeenCalled();
  });

  it("applies the selected starter once after loading and blocks repeated search activation while pending", async () => {
    const user = userEvent.setup();
    let resolveLoad!: (document: ReturnType<typeof getBlankStarterDocument>) => void;
    loadStarter.mockImplementation(() => new Promise(resolve => { resolveLoad = resolve; }));
    const apply = mount();
    const search = screen.getByRole("searchbox", { name: "Search templates" });
    await user.type(search, "Alpha{Enter}{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent("Loading template");
    expect(screen.getByRole("button", { name: "Start from scratch, Blank canvas" })).toBeDisabled();
    expect(apply).not.toHaveBeenCalled();
    expect(loadStarter).toHaveBeenCalledExactlyOnceWith(entries[0]);
    const document = getBlankStarterDocument();
    await act(async () => { resolveLoad(document); });
    expect(apply).toHaveBeenCalledExactlyOnceWith(document);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not apply a completed load after the template panel closes", async () => {
    const user = userEvent.setup();
    let resolveLoad!: (document: ReturnType<typeof getBlankStarterDocument>) => void;
    loadStarter.mockImplementation(() => new Promise(resolve => { resolveLoad = resolve; }));
    const apply = vi.fn();
    const { unmount } = render(<TemplatePanel templates={[]} onSaveAsTemplate={vi.fn()} onImportTemplate={vi.fn()} onUseTemplate={vi.fn()} onSelectStarter={apply} />);
    await user.click(screen.getByRole("button", { name: "Use Hero Alpha" }));
    unmount();
    await act(async () => { resolveLoad(getBlankStarterDocument()); });
    expect(apply).not.toHaveBeenCalled();
  });

  it("reports a load failure and lets the same control retry successfully", async () => {
    const user = userEvent.setup();
    const document = getBlankStarterDocument();
    loadStarter.mockRejectedValueOnce(new Error("Chunk unavailable")).mockResolvedValueOnce(document);
    const apply = mount();
    const use = screen.getByRole("button", { name: "Use Hero Alpha" });
    await user.click(use);
    expect(await screen.findByRole("alert")).toHaveTextContent("Unable to load this template");
    expect(apply).not.toHaveBeenCalled();
    expect(use).toBeEnabled();
    await user.click(use);
    await waitFor(() => expect(apply).toHaveBeenCalledExactlyOnceWith(document));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("browses native template buttons with arrows and applies only once on Enter", async () => {
    const user = userEvent.setup();
    const document = getBlankStarterDocument();
    loadStarter.mockResolvedValue(document);
    const apply = mount();
    const list = screen.getByRole("list", { name: "Template list" });
    const hero = within(list).getByRole("button", { name: "Use Hero Alpha" });
    hero.focus();
    await user.keyboard("{ArrowDown}");
    const pricing = within(list).getByRole("button", { name: "Use Pricing Beta" });
    expect(pricing).toHaveFocus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(apply).toHaveBeenCalledExactlyOnceWith(document));
    expect(loadStarter).toHaveBeenCalledExactlyOnceWith(entries[1]);
  });
});
