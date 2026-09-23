import HourInput from "../panelComponents/FormElements/HourInput";
import { Button, Input } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface TimeFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "native" | "segmented";
  onClear?: () => void;
}

export const TimeField = ({
  disabled,
  label,
  onChange,
  onClear,
  readOnly,
  value,
  variant = "native",
  ...presentation
}: TimeFieldProps) => (
  <FieldShell
    {...presentation}
    label={label}
    disabled={disabled}
    readOnly={readOnly}
  >
    {({ controlId, describedBy, invalid }) =>
      variant === "segmented" ? (
        <HourInput
          id={controlId}
          name={presentation.name}
          label={typeof label === "string" ? label : presentation.name}
          value={value}
          onChange={onChange}
          requiredField={presentation.required}
          disabled={disabled}
          isReadOnly={readOnly}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          hideLabel
        />
      ) : (
        <div className="relative">
          <Input
            id={controlId}
            name={presentation.name}
            type="time"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            readOnly={readOnly}
            required={presentation.required}
            invalid={invalid}
            aria-describedby={describedBy}
            className={onClear ? "pr-16" : undefined}
          />
          {onClear && value && !readOnly && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={onClear}
              aria-label={`Clear ${typeof label === "string" ? label : presentation.name}`}
              className="absolute right-1 top-1 h-8 px-2 shadow-none"
            >
              Clear
            </Button>
          )}
        </div>
      )
    }
  </FieldShell>
);
