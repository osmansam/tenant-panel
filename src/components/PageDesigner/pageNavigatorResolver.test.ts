import { describe, expect, it } from "vitest";
import type { PageModel, PageNavigatorConfig } from "../../types/page";
import {
  defaultPageNavigatorConfig,
  resolvePageNavigatorPreview,
} from "./pageNavigatorResolver";

const pages: PageModel[] = [
  { id: "home", name: "Home", slug: "home", isMainPage: true, sections: [] },
  { id: "catalog", name: "Catalog", slug: "catalog", parentPageId: "home", sections: [] },
  { id: "products", name: "Products", slug: "products", parentPageId: "catalog", sections: [] },
  { id: "orders", name: "Orders", slug: "orders", parentPageId: "home", sections: [] },
];

const automatic = (): PageNavigatorConfig => ({
  ...defaultPageNavigatorConfig(),
  overrides: [{ pageId: "catalog", label: "Shop" }],
});

describe("page navigator preview resolver", () => {
  it("builds an automatic root-to-current trail with overrides", () => {
    expect(resolvePageNavigatorPreview({ pages, currentPageId: "products", config: automatic() })).toEqual([
      { id: "page:home", label: "Home", pageId: "home", current: false, external: false, openInNewTab: false },
      { id: "page:catalog", label: "Shop", pageId: "catalog", current: false, external: false, openInNewTab: false },
      { id: "page:products", label: "Products", pageId: "products", current: true, external: false, openInNewTab: false },
    ]);
  });

  it("hides ancestors, de-duplicates home, and keeps current last", () => {
    const config: PageNavigatorConfig = {
      ...automatic(),
      overrides: [{ pageId: "catalog", hidden: true }],
      additionalItems: [
        { id: "orders-link", label: "Orders", destination: { type: "page", pageId: "orders" } },
        { id: "current-again", label: "Duplicate", destination: { type: "page", pageId: "products" } },
      ],
    };
    expect(resolvePageNavigatorPreview({ pages, currentPageId: "products", config }).map((item) => item.label)).toEqual([
      "Home",
      "Orders",
      "Products",
    ]);
  });

  it("supports custom mode and omits missing or unsafe destinations", () => {
    const config: PageNavigatorConfig = {
      enabled: true,
      mode: "custom",
      showHome: true,
      homeLabel: "Project",
      additionalItems: [
        { id: "missing", label: "Missing", destination: { type: "page", pageId: "deleted" } },
        { id: "unsafe", label: "Unsafe", destination: { type: "external", url: "javascript:alert(1)" } },
        { id: "docs", label: "Docs", destination: { type: "external", url: "https://docs.example.com" }, openInNewTab: true },
      ],
    };
    expect(resolvePageNavigatorPreview({ pages, currentPageId: "products", config })).toEqual([
      { id: "page:home", label: "Project", pageId: "home", current: false, external: false, openInNewTab: false },
      { id: "manual:docs", label: "Docs", href: "https://docs.example.com", current: false, external: true, openInNewTab: true },
      { id: "page:products", label: "Products", pageId: "products", current: true, external: false, openInNewTab: false },
    ]);
  });

  it("stops cyclic parent chains", () => {
    const cyclic: PageModel[] = [
      { id: "a", name: "A", parentPageId: "b", sections: [] },
      { id: "b", name: "B", parentPageId: "a", sections: [] },
    ];
    expect(resolvePageNavigatorPreview({ pages: cyclic, currentPageId: "a", config: automatic() }).map((item) => item.pageId)).toEqual(["b", "a"]);
  });
});

