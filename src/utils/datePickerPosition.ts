const POPUP_WIDTH = 320;
const POPUP_HEIGHT = 320;
const VIEWPORT_MARGIN = 8;
const ANCHOR_GAP = 4;

type AnchorRect = Pick<DOMRect, "left" | "top" | "bottom" | "width">;

export const getDatePickerPopupPosition = (
  anchor: AnchorRect,
  viewport: { width: number; height: number },
) => {
  const left = Math.min(
    Math.max(anchor.left, VIEWPORT_MARGIN),
    viewport.width - POPUP_WIDTH - VIEWPORT_MARGIN,
  );
  const fitsBelow = anchor.bottom + ANCHOR_GAP + POPUP_HEIGHT <= viewport.height;
  const top = fitsBelow
    ? anchor.bottom + ANCHOR_GAP
    : Math.max(VIEWPORT_MARGIN, anchor.top - POPUP_HEIGHT - ANCHOR_GAP);

  return { left, top };
};
