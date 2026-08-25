import { describe, expect, it } from "vitest";
import type { PageModel, PageNavigatorConfig } from "../../types/page";
import {
  addPageNavigatorItem,
  changePageNavigatorDestinationType,
  movePageNavigatorItem,
  removePageNavigatorItem,
  validatePageNavigatorDraft,
} from "./pageNavigatorEditorState";

const pages: PageModel[] = [
  { id: "home", name: "Home", sections: [] },
  { id: "orders", name: "Orders", sections: [] },
];

const config = (): PageNavigatorConfig => ({
  enabled: true,
  mode: "automatic",
  showHome: true,
  additionalItems: [
    { id: "one", label: "One", destination: { type: "page", pageId: "orders" } },
    { id: "two", label: "Two", destination: { type: "external", url: "https://example.com" } },
  ],
});

describe("page navigator editor state", () => {
  it("adds, reorders, and removes immutable items", () => {
    const original = config();
    const added = addPageNavigatorItem(original, () => "three");
    expect(original.additionalItems).toHaveLength(2);
    expect(added.additionalItems?.map((item) => item.id)).toEqual(["one", "two", "three"]);
    expect(movePageNavigatorItem(added, 2, 0).additionalItems?.map((item) => item.id)).toEqual(["three", "one", "two"]);
    expect(removePageNavigatorItem(added, "two").additionalItems?.map((item) => item.id)).toEqual(["one", "three"]);
  });

  it("clears stale destination fields when type changes", () => {
    expect(changePageNavigatorDestinationType(config(), "two", "page").additionalItems?.[1].destination).toEqual({
      type: "page",
      pageId: "",
    });
  });

  it("reports unsafe URLs, missing pages, and duplicate ids", () => {
    const draft: PageNavigatorConfig = {
      ...config(),
      additionalItems: [
        { id: "same", label: "Missing", destination: { type: "page", pageId: "deleted" } },
        { id: "same", label: "Unsafe", destination: { type: "external", url: "javascript:alert(1)" } },
      ],
    };
    const errors = validatePageNavigatorDraft(draft, pages);
    expect(errors["additionalItems.0.destination"]).toContain("no longer exists");
    expect(errors["additionalItems.1.id"]).toContain("unique");
    expect(errors["additionalItems.1.destination"]).toContain("HTTP");
  });

  it("retains disabled drafts without validation errors", () => {
    const disabled = { ...config(), enabled: false, homeLabel: "x".repeat(101) };
    expect(validatePageNavigatorDraft(disabled, pages)).toEqual({});
    expect(disabled.additionalItems).toHaveLength(2);
  });
});

