import DateInput from "../panelComponents/FormElements/DateInput";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface DateFieldProps extends FieldPresentationProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  onClear?: () => void;
  initiallyOpen?: boolean;
  arrowsEnabled?: boolean;
}

export const DateField = ({
  arrowsEnabled = false,
  disabled,
  initiallyOpen = false,
  label,
  onChange,
  onClear,
  placeholder,
  readOnly,
  value,
  ...presentation
}: DateFieldProps) => (
  <FieldShell
    {...presentation}
    label={label}
    disabled={disabled}
    readOnly={readOnly}
  >
    {({ controlId, describedBy, invalid }) => (
      <DateInput
        id={controlId}
        name={presentation.name}
        label={typeof label === "string" ? label : presentation.name}
        value={value}
        onChange={onChange}
        onClear={onClear}
        placeholder={placeholder}
        requiredField={presentation.required}
        disabled={disabled}
        isReadOnly={readOnly}
        isDateInitiallyOpen={initiallyOpen}
        isArrowsEnabled={arrowsEnabled}
        isOnClearActive={Boolean(onClear)}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        hideLabel
      />
    )}
  </FieldShell>
);
