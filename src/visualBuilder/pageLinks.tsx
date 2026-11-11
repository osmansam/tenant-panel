import { hasManagementPermission } from "../utils/managementPermissions";
import type { ProjectScope } from "./types";
export const VISUAL_BUILDER_PATH = "/pages/visual-builder";
export function canOpenVisualBuilder(roles: readonly string[] | undefined, hasProject: boolean) {
  return hasProject && hasManagementPermission(roles, "project.page.write");
}
export function visualBuilderURL(pageId: string, componentId?: string) {
  return componentId ? `${VISUAL_BUILDER_PATH}?${new URLSearchParams({ page: pageId, component: componentId })}` : VISUAL_BUILDER_PATH;
}
export function VisualBuilderPageLink({ page, canEdit }: { page: { id?: string; _id?: string; name: string; isGroupOnly?: boolean }; canEdit: boolean }) {
  const id = page._id || page.id;
  if (!canEdit || page.isGroupOnly || !id) return null;
  return <a className="inline-flex min-h-8 items-center rounded-ui-md border border-ui-border px-3 text-xs font-medium text-ui-foreground hover:bg-ui-surface-subtle" href={visualBuilderURL(id)} aria-label={`Open visual builder: ${page.name}`}>Visual builder</a>;
}
export function runtimePageURL(host: string | undefined, scope: ProjectScope, slug: string): string | undefined {
  try {
    const url = new URL(host ?? "");
    if (!["http:", "https:"].includes(url.protocol)) return undefined;
    url.pathname = `/t/${encodeURIComponent(scope.tenant)}/p/${encodeURIComponent(scope.project)}/${slug.split("/").map(encodeURIComponent).join("/")}`;
    url.search = ""; url.hash = "";
    return url.href;
  } catch { return undefined; }
}
