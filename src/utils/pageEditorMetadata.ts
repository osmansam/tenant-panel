import type { PageModel } from "./api/page";

export const updatePageEditorMetadata = (
  page: PageModel,
  field: "name" | "icon",
  value: string,
): PageModel => ({
  ...page,
  [field]: value,
});
