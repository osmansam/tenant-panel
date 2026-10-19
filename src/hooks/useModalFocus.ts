import { useEffect, useRef, type RefObject } from "react";

const registeredDialogs = new Set<HTMLElement>();
const isolatedElements = new Map<HTMLElement, boolean>();
const layerStyles = new Map<HTMLElement, string>();
let previousOverflow: string | undefined;

function topDialog(registeredOnly = false) {
  const dialogs = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]'));
  const eligible = dialogs.filter((dialog) => !registeredOnly || registeredDialogs.has(dialog));
  return eligible[eligible.length - 1];
}

/** Recompute isolation for one active branch, including simultaneously mounted portals. */
function updateIsolation() {
  for (const [element, originallyInert] of isolatedElements) {
    if (!originallyInert) element.removeAttribute("inert");
  }
  isolatedElements.clear();
  for (const [element, originalZIndex] of layerStyles) element.style.zIndex = originalZIndex;
  layerStyles.clear();
  let currentLayer = 40;
  for (const dialog of Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]')).filter((element) => registeredDialogs.has(element))) {
    const layer = dialog.closest<HTMLElement>("[data-modal-layer]") || dialog;
    layerStyles.set(layer, layer.style.zIndex);
    currentLayer = Math.max(currentLayer + 10, Number(layer.getAttribute("data-modal-layer")) || 50);
    layer.style.zIndex = String(currentLayer);
  }
  const active = topDialog(true);
  if (!active) {
    if (previousOverflow !== undefined) document.body.style.overflow = previousOverflow;
    previousOverflow = undefined;
    return;
  }
  if (previousOverflow === undefined) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  let branch: HTMLElement = active;
  while (branch.parentElement && branch !== document.body) {
    for (const sibling of Array.from(branch.parentElement.children)) {
      if (sibling === branch || !(sibling instanceof HTMLElement) || sibling.tagName === "SCRIPT" || sibling.tagName === "STYLE") continue;
      // A drawer's backdrop remains clickable; other modal branches are isolated.
      if (active.id && sibling.getAttribute("data-modal-backdrop-for") === active.id) continue;
      isolatedElements.set(sibling, sibling.hasAttribute("inert"));
      sibling.setAttribute("inert", "");
    }
    branch = branch.parentElement;
  }
}

function focusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]',
  )).filter((element) => element.tabIndex >= 0 && !element.matches(":disabled") && !element.closest('[hidden], [inert], [aria-hidden="true"]') && getComputedStyle(element).visibility !== "hidden" && getComputedStyle(element).display !== "none");
}

/** Contains keyboard focus, isolates the background, and restores the opener. */
export function useModalFocus(dialogRef: RefObject<HTMLElement>, open: boolean, onClose: () => void, initialFocusRef?: RefObject<HTMLElement>) {
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    registeredDialogs.add(dialog);
    updateIsolation();
    const focusFrame = requestAnimationFrame(() => {
      if (topDialog() === dialog && !dialog.contains(document.activeElement)) {
        (initialFocusRef?.current || focusableElements(dialog)[0] || dialog).focus({ preventScroll: true });
      }
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (topDialog() !== dialog || event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
      }
      if (event.key !== "Tab") return;
      const controls = focusableElements(dialog);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      registeredDialogs.delete(dialog);
      updateIsolation();
      const active = topDialog();
      if (previouslyFocused?.isConnected && !previouslyFocused.closest("[inert]") && (!active || active.contains(previouslyFocused))) {
        previouslyFocused.focus({ preventScroll: true });
      } else if (active && !active.contains(document.activeElement)) {
        (focusableElements(active)[0] || active).focus({ preventScroll: true });
      }
    };
  }, [dialogRef, initialFocusRef, open]);
}
