import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";
import { Button } from "./button";

export interface WorkspaceDialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "large" | "workspace";
  closeLabel?: string;
  layer?: "base" | "nested";
  bodyClassName?: string;
}

export function WorkspaceDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "large",
  closeLabel = "Close dialog",
  layer = "base",
  bodyClassName,
}: WorkspaceDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      data-testid="workspace-dialog-backdrop"
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-[hsl(var(--ui-overlay)/0.48)] sm:p-4",
        layer === "nested" ? "z-[60]" : "z-50",
      )}
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border border-ui-border bg-ui-surface text-ui-foreground shadow-ui-dialog",
          size === "workspace"
            ? "h-dvh w-screen rounded-none sm:h-[92vh] sm:w-[96vw] sm:max-w-[1600px] sm:rounded-ui-lg"
            : "max-h-[90vh] w-[calc(100vw-2rem)] max-w-[1120px] rounded-ui-lg",
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-ui-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold text-ui-foreground">
              {title}
            </h2>
            {description && (
              <div
                id={descriptionId}
                className="mt-1 text-sm text-ui-muted"
              >
                {description}
              </div>
            )}
          </div>
          <Button
            ref={closeButtonRef}
            type="button"
            variant="icon"
            size="sm"
            aria-label={closeLabel}
            onClick={onClose}
            className="shrink-0 px-2"
          >
            <FiX aria-hidden="true" size={20} />
          </Button>
        </header>

        <div className={cn("min-h-0 overflow-y-auto p-5 sm:p-6", bodyClassName)}>
          {children}
        </div>

        {footer && (
          <footer className="border-t border-ui-border bg-ui-surface-subtle px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
