import { Button, Input } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface NumberFieldProps extends FieldPresentationProps {
  value: number | "" | null;
  onChange: (value: number | "") => void;
  min?: number;
  max?: number;
  step?: number;
  showStepButtons?: boolean;
  onClear?: () => void;
}

const clamp = (value: number, min?: number, max?: number) =>
  Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, value));

export const NumberField = ({
  disabled,
  label,
  max,
  min,
  onChange,
  onClear,
  readOnly,
  showStepButtons = false,
  step = 1,
  value,
  ...presentation
}: NumberFieldProps) => {
  const locked = Boolean(disabled || readOnly);
  const numericValue = typeof value === "number" ? value : 0;
  const labelText = typeof label === "string" ? label : presentation.name;

  return (
    <FieldShell
      {...presentation}
      label={label}
      disabled={disabled}
      readOnly={readOnly}
    >
      {({ controlId, describedBy, invalid }) => (
        <div className="flex items-center gap-2">
          {showStepButtons && (
            <Button
              type="button"
              variant="outline"
              size="md"
              aria-label={`Decrease ${labelText}`}
              disabled={locked || (min !== undefined && numericValue <= min)}
              onClick={() => onChange(clamp(numericValue - step, min, max))}
              className="w-ui-md shrink-0 px-0"
            >
              −
            </Button>
          )}
          <div className="relative min-w-0 flex-1">
            <Input
              id={controlId}
              name={presentation.name}
              type="number"
              value={value ?? ""}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              readOnly={readOnly}
              required={presentation.required}
              invalid={invalid}
              aria-describedby={describedBy}
              onWheel={(event) => event.currentTarget.blur()}
              onChange={(event) => {
                if (event.target.value === "") {
                  onChange("");
                  return;
                }
                onChange(clamp(Number(event.target.value), min, max));
              }}
              className={onClear ? "pr-16" : undefined}
            />
            {onClear && value !== "" && value !== null && !readOnly && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={onClear}
                className="absolute right-1 top-1 h-8 px-2 shadow-none"
              >
                Clear
              </Button>
            )}
          </div>
          {showStepButtons && (
            <Button
              type="button"
              variant="outline"
              size="md"
              aria-label={`Increase ${labelText}`}
              disabled={locked || (max !== undefined && numericValue >= max)}
              onClick={() => onChange(clamp(numericValue + step, min, max))}
              className="w-ui-md shrink-0 px-0"
            >
              +
            </Button>
          )}
        </div>
      )}
    </FieldShell>
  );
};
