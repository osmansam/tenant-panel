import { useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Label } from "./label";

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children"> {
  /** Input element ID. Auto-generated when omitted. */
  id?: string;
  label: ReactNode;
  /** Help text rendered below the control. */
  description?: ReactNode;
  /** Error text. When present, the control is marked invalid. */
  error?: ReactNode;
  required?: boolean;
  /** Text shown after label when the field is optional (e.g. "optional"). */
  optionalLabel?: ReactNode;
  /** Render-prop that receives ARIA-linking IDs for the control. */
  children: (accessibility: FieldAccessibility) => ReactNode;
}

export interface FieldAccessibility {
  controlId: string;
  descriptionId?: string;
  errorId?: string;
  describedBy?: string;
  invalid: boolean;
}

export function Field({
  id,
  label,
  description,
  error,
  required = false,
  optionalLabel,
  children,
  className,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const controlId =
    id || `field-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const accessibility: FieldAccessibility = {
    controlId,
    descriptionId,
    errorId,
    describedBy,
    invalid: Boolean(error),
  };

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5 font-ui", className)} {...props}>
      <Label htmlFor={controlId}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-1 text-ui-danger">
              *
            </span>{" "}
            <span className="sr-only">required</span>
          </>
        ) : optionalLabel ? (
          <span className="ml-1 font-normal text-ui-muted">{optionalLabel}</span>
        ) : null}
      </Label>
      {children(accessibility)}
      {description && (
        <p id={descriptionId} className="text-xs leading-5 text-ui-muted">
          {description}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          aria-live="polite"
          className="text-xs font-medium leading-5 text-ui-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns at the sm breakpoint. Default 1. */
  columns?: 1 | 2 | 3;
}

const columnClasses: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function FieldGroup({
  columns = 1,
  className,
  children,
  ...props
}: FieldGroupProps) {
  return (
    <div
      className={cn("grid gap-x-4 gap-y-5", columnClasses[columns], className)}
      {...props}
    >
      {children}
    </div>
  );
}
