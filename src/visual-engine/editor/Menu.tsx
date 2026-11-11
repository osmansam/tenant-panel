"use client";

import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const MenuContext = createContext<{ close(): void } | null>(null);

/** Outermost viewport plus every scrollable/hiding ancestor that could clip the popover. */
function scrollLimits(element: HTMLElement): { top: number; bottom: number } {
  let top = 0;
  let bottom = window.innerHeight;
  let parent = element.parentElement;
  while (parent) {
    const style = window.getComputedStyle(parent);
    if (style.overflowY !== "visible" || style.overflowX !== "visible") {
      const rect = parent.getBoundingClientRect();
      bottom = Math.min(bottom, rect.bottom);
      top = Math.max(top, rect.top);
    }
    parent = parent.parentElement;
  }
  return { top, bottom };
}

export interface MenuProps {
  label: string;
  trigger: ReactNode;
  triggerClassName?: string;
  triggerTitle?: string;
  align?: "start" | "end";
  children: ReactNode;
}

export function Menu({ label, trigger, triggerClassName, triggerTitle, align = "end", children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const dismissOnOutsideClick = (event: PointerEvent) => {
      if (rootRef.current !== null && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", dismissOnOutsideClick);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOnOutsideClick);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  useLayoutEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const limits = scrollLimits(popover);
    const rect = popover.getBoundingClientRect();
    const spaceBelow = limits.bottom - rect.bottom;
    const spaceAbove = rect.top - limits.top;
    setFlipUp(rect.bottom > limits.bottom && spaceAbove > spaceBelow);
  }, [open]);

  return (
    <div className="vb-menu" ref={rootRef}>
      <button
        type="button"
        className={triggerClassName ?? "vb-icon-button"}
        aria-label={label}
        title={triggerTitle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={(event) => {
          event.stopPropagation();
          setFlipUp(false);
          setOpen((current) => !current);
        }}
      >
        {trigger}
      </button>
      {open ? (
        <MenuContext.Provider value={{ close: () => setOpen(false) }}>
          <div
            id={menuId}
            ref={popoverRef}
            role="menu"
            aria-label={label}
            className={[flipUp ? "vb-menu__popover--up" : "", `vb-menu__popover vb-menu__popover--${align}`].filter(Boolean).join(" ")}
          >
            {children}
          </div>
        </MenuContext.Provider>
      ) : null}
    </div>
  );
}

export interface MenuItemProps {
  label: string;
  ariaLabel?: string;
  disabled?: boolean;
  destructive?: boolean;
  keepOpen?: boolean;
  onSelect(): void;
}

export function MenuItem({ label, ariaLabel, disabled = false, destructive = false, keepOpen = false, onSelect }: MenuItemProps) {
  const menu = useContext(MenuContext);
  return (
    <button
      type="button"
      role="menuitem"
      className={`vb-menu__item${destructive ? " vb-menu__item--destructive" : ""}`}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
        if (!keepOpen) menu?.close();
      }}
    >
      {label}
    </button>
  );
}

export function MenuSeparator() {
  return <div role="separator" className="vb-menu__separator" />;
}

export function MenuHeading({ children }: { children: ReactNode }) {
  return <div className="vb-menu__heading">{children}</div>;
}
