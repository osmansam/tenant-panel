import { Menu } from "@headlessui/react";
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  Fragment,
} from "react";
import { cn } from "../../utils/cn";

/* ── Root ── */
export interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <Menu as="div" className="relative inline-block text-left">{children}</Menu>;
}

/* ── Trigger ── */
export type DropdownMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownMenuTrigger({
  className,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <Menu.Button
      className={cn(
        "ui-focus-ring inline-flex items-center justify-center gap-2 rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm font-medium text-ui-foreground shadow-ui-sm transition-colors hover:border-ui-border-hover",
        "h-ui-md",
        className,
      )}
      {...props}
    >
      {children}
    </Menu.Button>
  );
}

/* ── Panel ── */
export interface DropdownMenuContentProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Alignment relative to the trigger. */
  align?: "start" | "end";
}

export function DropdownMenuContent({
  align = "end",
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Items
      className={cn(
        "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-ui-md border border-ui-border bg-ui-surface py-1 shadow-ui-dialog focus:outline-none",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      {...props}
    >
      {children}
    </Menu.Items>
  );
}

/* ── Item ── */
export interface DropdownMenuItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Apply destructive (danger) styling. */
  destructive?: boolean;
}

export function DropdownMenuItem({
  destructive = false,
  className,
  children,
  disabled,
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item as={Fragment}>
      {({ active }) => (
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
            active && !destructive && "bg-ui-surface-subtle text-ui-foreground",
            active && destructive && "bg-ui-danger-subtle text-ui-danger",
            !active && !destructive && "text-ui-foreground",
            !active && destructive && "text-ui-danger",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

/* ── Separator ── */
export function DropdownMenuSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-ui-border", className)}
      {...props}
    />
  );
}
