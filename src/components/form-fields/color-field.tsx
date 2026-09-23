import { useId, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface ColorFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const ColorField = ({
  disabled,
  label,
  onChange,
  onClear,
  readOnly,
  value,
  ...presentation
}: ColorFieldProps) => {
  const [open, setOpen] = useState(false);
  const popoverId = `color-picker-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const labelText = typeof label === "string" ? label : presentation.name;
  const locked = Boolean(disabled || readOnly);

  return (
    <FieldShell
      {...presentation}
      label={label}
      disabled={disabled}
      readOnly={readOnly}
    >
      {({ controlId, describedBy, invalid }) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              id={controlId}
              name={presentation.name}
              type="button"
              variant="outline"
              disabled={locked}
              aria-label={`Choose ${labelText}`}
              aria-expanded={open}
              aria-controls={popoverId}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onClick={() => setOpen((current) => !current)}
              className="min-w-0 flex-1 justify-start"
            >
              <span
                aria-hidden="true"
                className="size-5 rounded-ui-sm border border-ui-border"
                style={{ backgroundColor: value || "transparent" }}
              />
              <span className="truncate">{value || "No color"}</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={locked || !value}
              aria-label={`Clear ${labelText}`}
              onClick={onClear || (() => onChange(""))}
              className="shadow-none"
            >
              Clear
            </Button>
          </div>
          {open && (
            <div
              id={popoverId}
              role="region"
              aria-label={`${labelText} picker`}
              className="w-fit rounded-ui-md border border-ui-border bg-ui-surface p-2 shadow-ui-dialog"
            >
              <SketchPicker
                color={value}
                onChange={(color) => onChange(color.hex)}
                disableAlpha
              />
            </div>
          )}
        </div>
      )}
    </FieldShell>
  );
};
