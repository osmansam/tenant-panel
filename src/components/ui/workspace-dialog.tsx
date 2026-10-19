import {
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useModalFocus } from "../../hooks/useModalFocus";
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
  className?: string;
  initialFocusRef?: RefObject<HTMLElement>;
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
  className,
  initialFocusRef,
}: WorkspaceDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useModalFocus(dialogRef, open, onClose, initialFocusRef || closeButtonRef);

  if (!open) return null;

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      data-testid="workspace-dialog-backdrop"
      data-modal-layer={layer === "nested" ? "60" : "50"}
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-[hsl(var(--ui-overlay)/0.32)] backdrop-blur-md sm:p-5",
        layer === "nested" ? "z-[60]" : "z-50",
      )}
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border border-ui-border/80 bg-ui-surface text-ui-foreground shadow-ui-dialog",
          size === "workspace"
            ? "h-dvh w-screen rounded-none sm:h-[94vh] sm:w-[97vw] sm:max-w-[1720px] sm:rounded-ui-2xl"
            : "max-h-[90vh] w-[calc(100vw-2rem)] max-w-[1120px] rounded-ui-xl",
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-ui-border/80 px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-[17px] font-semibold tracking-tight text-ui-foreground">
              {title}
            </h2>
            {description && (
              <div
                id={descriptionId}
                className="mt-1.5 text-sm leading-6 text-ui-muted"
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
            className="shrink-0 rounded-full text-ui-muted hover:bg-ui-surface-subtle"
          >
            <FiX aria-hidden="true" size={18} />
          </Button>
        </header>

        <div className={cn("min-h-0 overflow-y-auto p-5 sm:p-6", bodyClassName)}>
          {children}
        </div>

        {footer && (
          <footer className="border-t border-ui-border/80 bg-ui-surface px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
    `workspace-dialog-${layer}`,
  );
}
