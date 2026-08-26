import type {
  PageModel,
  PageNavigatorConfig,
  PageNavigatorOverride,
} from "../../types/page";

export interface ResolvedPageNavigatorItem {
  id: string;
  label: string;
  pageId?: string;
  href?: string;
  current: boolean;
  external: boolean;
  openInNewTab: boolean;
}

export interface ResolvePageNavigatorPreviewArgs {
  pages: PageModel[];
  currentPageId: string;
  config: PageNavigatorConfig;
}

export function defaultPageNavigatorConfig(): PageNavigatorConfig {
  return {
    enabled: true,
    mode: "automatic",
    showHome: true,
    overrides: [],
    additionalItems: [],
  };
}

function safeExternalUrl(value: string): string | undefined {
  try {
    const trimmed = value.trim();
    const parsed = new URL(trimmed);
    return ["http:", "https:"].includes(parsed.protocol) ? trimmed : undefined;
  } catch {
    return undefined;
  }
}

function pageID(page: PageModel): string {
  return page.id || "";
}

function overrideFor(
  overrides: PageNavigatorOverride[] | undefined,
  id: string,
): PageNavigatorOverride | undefined {
  return overrides?.find((item) => item.pageId === id);
}

export function resolvePageNavigatorPreview({
  pages,
  currentPageId,
  config,
}: ResolvePageNavigatorPreviewArgs): ResolvedPageNavigatorItem[] {
  if (!config.enabled) return [];
  const byID = new Map(pages.map((page) => [pageID(page), page]));
  const current = byID.get(currentPageId);
  if (!current) return [];

  const pageItems: ResolvedPageNavigatorItem[] = [];
  const includedPageIDs = new Set<string>();

  const addPage = (page: PageModel, labelOverride?: string) => {
    const id = pageID(page);
    if (!id || includedPageIDs.has(id)) return;
    const override = overrideFor(config.overrides, id);
    if (override?.hidden && id !== currentPageId) return;
    includedPageIDs.add(id);
    pageItems.push({
      id: `page:${id}`,
      label: labelOverride?.trim() || override?.label?.trim() || page.name,
      pageId: id,
      current: id === currentPageId,
      external: false,
      openInNewTab: false,
    });
  };

  const home = pages.find((page) => page.isMainPage);
  if (config.showHome && home) {
    addPage(home, config.homeLabel);
  }

  if (config.mode === "automatic") {
    const ancestors: PageModel[] = [];
    const seen = new Set<string>([currentPageId]);
    let parentID = current.parentPageId || "";
    while (parentID && !seen.has(parentID)) {
      seen.add(parentID);
      const parent = byID.get(parentID);
      if (!parent) break;
      ancestors.push(parent);
      parentID = parent.parentPageId || "";
    }
    ancestors.reverse().forEach((page) => addPage(page));
  }

  const manualItems: ResolvedPageNavigatorItem[] = [];
  for (const item of config.additionalItems || []) {
    const label = item.label.trim();
    if (!label) continue;
    if (item.destination.type === "page") {
      const page = byID.get(item.destination.pageId);
      if (!page || includedPageIDs.has(item.destination.pageId) || item.destination.pageId === currentPageId) {
        continue;
      }
      includedPageIDs.add(item.destination.pageId);
      manualItems.push({
        id: `manual:${item.id}`,
        label,
        pageId: item.destination.pageId,
        current: false,
        external: false,
        openInNewTab: false,
      });
      continue;
    }
    const href = safeExternalUrl(item.destination.url);
    if (!href) continue;
    manualItems.push({
      id: `manual:${item.id}`,
      label,
      href,
      current: false,
      external: true,
      openInNewTab: Boolean(item.openInNewTab),
    });
  }

  const withoutCurrent = pageItems.filter((item) => !item.current);
  const currentOverride = overrideFor(config.overrides, currentPageId);
  return [
    ...withoutCurrent,
    ...manualItems,
    {
      id: `page:${currentPageId}`,
      label: currentOverride?.label?.trim() || current.name,
      pageId: currentPageId,
      current: true,
      external: false,
      openInNewTab: false,
    },
  ];
}
