const FIXED_HEIGHT_VIEW_MODES = new Set([
  "permissions",
  "routes",
  "pipelines",
  "workflows",
  "apis",
]);

export function getContainerDetailsContentClass(viewMode: string): string {
  if (viewMode === "permissions" || viewMode === "routes") {
    return "h-[70vh] overflow-y-auto";
  }

  if (FIXED_HEIGHT_VIEW_MODES.has(viewMode)) {
    return "h-[70vh]";
  }

  return "max-h-[70vh] overflow-y-auto";
}
