import { Button, Input } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface FileFieldProps extends FieldPresentationProps {
  value: File | null;
  onChange: (value: File | null) => void;
  accept?: string;
}

export const FileField = ({
  accept,
  disabled,
  onChange,
  readOnly,
  value,
  ...presentation
}: FileFieldProps) => (
  <FieldShell {...presentation} disabled={disabled} readOnly={readOnly}>
    {({ controlId, describedBy, invalid }) => (
      <div className="space-y-2">
        <Input
          id={controlId}
          name={presentation.name}
          type="file"
          accept={accept}
          disabled={disabled || readOnly}
          required={presentation.required}
          invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.files?.[0] || null)}
          className="cursor-pointer py-1.5 file:mr-3 file:rounded-ui-sm file:border-0 file:bg-ui-surface-subtle file:px-3 file:py-1 file:text-sm file:font-medium file:text-ui-foreground"
        />
        <div className="flex min-h-5 items-center justify-between gap-3 text-xs text-ui-muted">
          <span>
            {value ? `Selected file: ${value.name}` : accept ? `Accepted file types: ${accept}` : "Choose a file"}
          </span>
          {value && !readOnly && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => onChange(null)}
              className="h-8 px-2 shadow-none"
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    )}
  </FieldShell>
);
