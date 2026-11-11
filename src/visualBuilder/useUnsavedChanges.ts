import { useCallback, useContext, useLayoutEffect, useRef } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { canDiscardDraft } from "./draftLifecycle";

/** BrowserRouter navigation, browser history and full-document exits share one guard. */
export function useUnsavedChanges(dirty: boolean, saving: boolean) {
  const state = useRef({ dirty, saving }); state.current = { dirty, saving };
  const { navigator } = useContext(UNSAFE_NavigationContext);
  const confirmDiscard = useCallback(() => {
    const allowed = canDiscardDraft(state.current, () => window.confirm("Discard your unsaved visual changes?"));
    if (allowed) state.current.dirty = false;
    return allowed;
  }, []);
  useLayoutEffect(() => {
    const originalPush = navigator.push; const originalReplace = navigator.replace; const originalGo = navigator.go;
    let currentHref = window.location.href; let currentState = window.history.state; let restoring = false;
    const remember = () => { currentHref = window.location.href; currentState = window.history.state; };
    navigator.push = (...args) => { if (confirmDiscard()) { originalPush.apply(navigator, args); remember(); } };
    navigator.replace = (...args) => { if (confirmDiscard()) { originalReplace.apply(navigator, args); remember(); } };
    navigator.go = delta => { if (confirmDiscard()) originalGo.call(navigator, delta); };
    const unload = (event: BeforeUnloadEvent) => {
      if (!state.current.dirty && !state.current.saving) return;
      event.preventDefault(); event.returnValue = "";
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.href === window.location.href) return;
      if (!confirmDiscard()) { event.preventDefault(); event.stopPropagation(); }
    };
    const pop = (event: PopStateEvent) => {
      if (restoring) { restoring = false; event.stopImmediatePropagation(); return; }
      if (confirmDiscard()) { currentHref = window.location.href; currentState = window.history.state; return; }
      event.stopImmediatePropagation();
      const before = currentState?.idx; const after = event.state?.idx;
      if (typeof before === "number" && typeof after === "number" && before !== after) { restoring = true; window.history.go(before - after); }
      else window.history.pushState(currentState, "", currentHref);
    };
    window.addEventListener("beforeunload", unload);
    window.addEventListener("popstate", pop, true);
    document.addEventListener("click", click, true);
    return () => {
      navigator.push = originalPush; navigator.replace = originalReplace; navigator.go = originalGo;
      window.removeEventListener("beforeunload", unload); window.removeEventListener("popstate", pop, true); document.removeEventListener("click", click, true);
    };
  }, [navigator, confirmDiscard]);
  return confirmDiscard;
}
