import type {
  PageModel,
  PageNavigatorAdditionalItem,
  PageNavigatorConfig,
  PageNavigatorDestination,
} from "../../types/page";

type DestinationType = PageNavigatorDestination["type"];

const pageId = (page: PageModel) => page.id || "";

export function addPageNavigatorItem(
  config: PageNavigatorConfig,
  idFactory: () => string = () =>
    globalThis.crypto?.randomUUID?.() || `navigator-${Date.now()}`,
): PageNavigatorConfig {
  const item: PageNavigatorAdditionalItem = {
    id: idFactory(),
    label: "New link",
    destination: { type: "page", pageId: "" },
  };
  return {
    ...config,
    additionalItems: [...(config.additionalItems || []), item],
  };
}

export function removePageNavigatorItem(
  config: PageNavigatorConfig,
  id: string,
): PageNavigatorConfig {
  return {
    ...config,
    additionalItems: (config.additionalItems || []).filter((item) => item.id !== id),
  };
}

export function movePageNavigatorItem(
  config: PageNavigatorConfig,
  from: number,
  to: number,
): PageNavigatorConfig {
  const items = [...(config.additionalItems || [])];
  if (from < 0 || from >= items.length || to < 0 || to >= items.length || from === to) {
    return config;
  }
  const [item] = items.splice(from, 1);
  items.splice(to, 0, item);
  return { ...config, additionalItems: items };
}

export function changePageNavigatorDestinationType(
  config: PageNavigatorConfig,
  id: string,
  type: DestinationType,
): PageNavigatorConfig {
  return {
    ...config,
    additionalItems: (config.additionalItems || []).map((item) =>
      item.id === id
        ? {
            ...item,
            openInNewTab: type === "external" ? item.openInNewTab : undefined,
            destination:
              type === "page"
                ? { type: "page", pageId: "" }
                : { type: "external", url: "" },
          }
        : item,
    ),
  };
}

function isSafeExternalURL(value: string): boolean {
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) && Boolean(parsed.host);
  } catch {
    return false;
  }
}

export function validatePageNavigatorDraft(
  config: PageNavigatorConfig,
  pages: PageModel[],
): Record<string, string> {
  if (!config.enabled) return {};
  const errors: Record<string, string> = {};
  const pageIDs = new Set(pages.map(pageId).filter(Boolean));
  if (!["automatic", "custom"].includes(config.mode)) {
    errors.mode = "Choose Automatic or Custom mode";
  }
  if ((config.homeLabel || "").trim().length > 100) {
    errors.homeLabel = "Home label must be 100 characters or fewer";
  }
  if ((config.overrides || []).length > 20) {
    errors.overrides = "Use no more than 20 overrides";
  }
  if ((config.additionalItems || []).length > 20) {
    errors.additionalItems = "Use no more than 20 additional items";
  }
  const ids = new Set<string>();
  (config.additionalItems || []).forEach((item, index) => {
    const prefix = `additionalItems.${index}`;
    const id = item.id.trim();
    if (!id || ids.has(id)) errors[`${prefix}.id`] = "Item IDs must be present and unique";
    ids.add(id);
    if (!item.label.trim()) errors[`${prefix}.label`] = "Label is required";
    else if ([...item.label.trim()].length > 100) errors[`${prefix}.label`] = "Label must be 100 characters or fewer";
    if (item.destination.type === "page") {
      if (!pageIDs.has(item.destination.pageId)) {
        errors[`${prefix}.destination`] = "The selected page no longer exists";
      }
    } else if (!isSafeExternalURL(item.destination.url)) {
      errors[`${prefix}.destination`] = "Enter an absolute HTTP or HTTPS URL";
    }
  });
  return errors;
}

