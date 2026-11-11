import type { PageModel } from "./pageTypes";
export function validateEditorTarget(pages: PageModel[], pageId: string) {
  const page = pages.find(page => (page.id || page._id) === pageId);
  if (!page) throw new Error("The selected page is missing or no longer available. Choose another page.");
  if (page.isGroupOnly) throw new Error("Group-only pages cannot contain visual content. Choose a content page.");
  return page;
}
