"use client";

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { ExpandableCardNode } from "../model";
import "./expandable-card.css";

export const CARD_EXPANSION_EVENT = "ve:card-expansion";
const scrollLocks = new WeakMap<Document, { count: number; overflow: string }>();
function lockPage(doc: Document) {
  const lock = scrollLocks.get(doc) ?? { count: 0, overflow: doc.documentElement.style.overflow };
  lock.count++;
  scrollLocks.set(doc, lock);
  doc.documentElement.style.overflow = "hidden";
  return () => {
    if (--lock.count === 0) {
      doc.documentElement.style.overflow = lock.overflow;
      scrollLocks.delete(doc);
    }
  };
}

function themeSnapshot(element: HTMLElement): CSSProperties {
  const computed = getComputedStyle(element);
  const tokens: Record<string, string> = {};
  for (let index = 0; index < computed.length; index++) {
    const key = computed.item(index);
    if (key.startsWith("--theme-")) tokens[key] = computed.getPropertyValue(key);
  }
  return { ...tokens, fontFamily: computed.fontFamily, fontSize: computed.fontSize, lineHeight: computed.lineHeight, color: computed.color };
}

interface Props {
  node: ExpandableCardNode;
  interactive: boolean;
  reducedMotion?: boolean;
  className?: string;
  style?: CSSProperties;
  face: ReactNode;
  details: ReactNode | (() => ReactNode);
  backgrounds?: ReactNode;
  editorControls?: ReactNode;
}

export function ExpandableCardRuntime({ node, interactive, reducedMotion = false, className, style, face, details, backgrounds, editorControls }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState<CSSProperties>({});
  const id = useId();
  return <div ref={root} className={[className, "ve-expandable-card"].filter(Boolean).join(" ")} style={style} data-expandable-card>
    {backgrounds}
    {interactive ? <>
      <button ref={opener} type="button" className="ve-expandable-card__trigger" data-expandable-card-trigger draggable={false} aria-label={`Open ${node.accessibleLabel}`} aria-haspopup="dialog" aria-expanded={expanded} onClick={() => {
        if (!root.current) return;
        setTheme(themeSnapshot(root.current));
        setExpanded(true);
      }} />
      <div className="ve-expandable-card__face">{face}</div>
      <span className="ve-expandable-card__hint" aria-hidden="true">Explore project <span>↗</span></span>
    </> : face}
    {editorControls}
    {expanded && createPortal(<ProjectDialog label={node.accessibleLabel} closeLabel={node.closeLabel} source={root.current!} opener={opener.current} instanceId={id} theme={theme} reducedMotion={reducedMotion} onClosed={() => setExpanded(false)}>{typeof details === "function" ? details() : details}</ProjectDialog>, document.body)}
  </div>;
}

interface DialogProps {
  label: string;
  closeLabel: string;
  source: HTMLElement;
  opener: HTMLButtonElement | null;
  instanceId: string;
  theme: CSSProperties;
  reducedMotion: boolean;
  onClosed(): void;
  children: ReactNode;
}

function ProjectDialog({ label, closeLabel, source, opener, instanceId, theme, reducedMotion, onClosed, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animation = useRef<Animation | null>(null);
  const closing = useRef(false);
  const active = useRef(false);
  const shouldReduceMotion = () => reducedMotion || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  const notify = (open: boolean) => source.dispatchEvent(new CustomEvent(CARD_EXPANSION_EVENT, { bubbles: true, detail: { id: instanceId, open } }));
  const geometry = () => {
    const rect = source.getBoundingClientRect();
    return { top: `${rect.top}px`, left: `${rect.left}px`, width: `${Math.max(1, rect.width)}px`, height: `${Math.max(1, rect.height)}px`, borderRadius: "24px" };
  };
  const fullscreen = () => ({ top: "0px", left: "0px", width: `${window.innerWidth}px`, height: `${window.innerHeight}px`, borderRadius: "0px" });

  useLayoutEffect(() => {
    active.current = true;
    const dialog = dialogRef.current!;
    const unlock = lockPage(dialog.ownerDocument);
    notify(true);
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotion = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      animation.current?.cancel();
      animation.current = null;
      if (closing.current) onClosed();
    };
    media?.addEventListener("change", updateMotion);
    if (!shouldReduceMotion() && typeof dialog.animate === "function") {
      const entering = dialog.animate([geometry(), fullscreen()], { duration: 440, easing: "cubic-bezier(.22,1,.36,1)" });
      animation.current = entering;
      void entering.finished.then(() => { if (animation.current === entering) { entering.cancel(); animation.current = null; } }, () => {});
    }
    return () => {
      active.current = false;
      media?.removeEventListener("change", updateMotion);
      animation.current?.cancel();
      dialog.close();
      unlock();
      notify(false);
      const restore = opener?.closest("[data-slider-copy='true']")?.closest<HTMLElement>("[data-slider-viewport]") ?? opener;
      if (restore?.isConnected) restore.focus({ preventScroll: true });
    };
    // A modal owns its source and theme snapshot for its lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current!;
    const rect = dialog.getBoundingClientRect();
    const visible = { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: getComputedStyle(dialog).borderRadius };
    animation.current?.cancel();
    if (shouldReduceMotion() || typeof dialog.animate !== "function") { onClosed(); return; }
    dialog.scrollTop = 0;
    const exiting = dialog.animate([visible, geometry()], { duration: 320, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" });
    animation.current = exiting;
    void exiting.finished.then(onClosed, () => {});
  };

  return <dialog ref={dialogRef} className="ve-project-dialog" aria-label={label} style={theme} data-project-dialog
    onCancel={event => { event.preventDefault(); close(); }}
    onClose={event => { if (active.current && !event.currentTarget.open) onClosed(); }}
    onKeyDown={event => {
      if (event.key === "Tab") {
        const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input, textarea, select, summary, iframe, video[controls], audio[controls], [tabindex], [contenteditable='true']"))
          .filter(element => element.tabIndex >= 0 && !element.matches(":disabled") && !element.closest("[hidden], [inert]") && element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && event.target === first && last) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && event.target === last && first) { event.preventDefault(); first.focus(); }
      }
      event.stopPropagation();
    }}
    onPointerDown={event => event.stopPropagation()}
    onPointerMove={event => event.stopPropagation()}
    onPointerUp={event => event.stopPropagation()}
    onClick={event => event.stopPropagation()}
  >
    <div className="ve-project-dialog__toolbar"><span>{label}</span><button ref={closeRef} type="button" className="ve-project-dialog__close" aria-label={closeLabel} onClick={close}>{closeLabel} <span aria-hidden="true">×</span></button></div>
    <div className="ve-project-dialog__content">{children}</div>
  </dialog>;
}
