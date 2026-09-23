import { useId, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Label } from "../ui";
import type {
  FieldControlAccessibility,
  FieldPresentationProps,
} from "./field.types";

export interface FieldShellProps extends FieldPresentationProps {
  children: (accessibility: FieldControlAccessibility) => ReactNode;
}

export const FieldShell = ({
  children,
  className,
  description,
  error,
  id,
  label,
  optionalLabel,
  required = false,
}: FieldShellProps) => {
  const generatedId = useId();
  const controlId =
    id || `field-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const accessibility: FieldControlAccessibility = {
    controlId,
    descriptionId,
    errorId,
    describedBy,
    invalid: Boolean(error),
  };

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5 font-ui", className)}>
      <Label htmlFor={controlId}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-1 text-ui-danger">
              *
            </span>
            {" "}
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
};
