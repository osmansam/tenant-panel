export interface OrderedPageLike {
  id?: string;
  _id?: string;
  order?: number;
}

export type PageMoveDirection = "up" | "down";

const pageId = (page: OrderedPageLike) => page._id || page.id || "";

const pageOrder = (page: OrderedPageLike, index: number) =>
  typeof page.order === "number" ? page.order : index + 1;

export function sortPagesForDisplay<T extends OrderedPageLike>(pages: T[]): T[] {
  return pages
    .map((page, index) => ({ page, index }))
    .sort((left, right) => {
      const orderDiff = pageOrder(left.page, left.index) - pageOrder(right.page, right.index);
      return orderDiff || left.index - right.index;
    })
    .map(({ page }) => page);
}

export function buildPageOrderSwap(
  pages: OrderedPageLike[],
  index: number,
  direction: PageMoveDirection,
) {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || targetIndex < 0 || index >= pages.length || targetIndex >= pages.length) {
    return [];
  }

  const current = pages[index];
  const target = pages[targetIndex];
  const currentId = pageId(current);
  const targetId = pageId(target);
  if (!currentId || !targetId) {
    return [];
  }

  return [
    { id: currentId, order: pageOrder(target, targetIndex) },
    { id: targetId, order: pageOrder(current, index) },
  ];
}
