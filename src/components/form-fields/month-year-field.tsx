import MonthYearInput from "../panelComponents/FormElements/MonthYearInput";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface MonthYearFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export const MonthYearField = ({
  disabled,
  label,
  language,
  onChange,
  readOnly,
  value,
  ...presentation
}: MonthYearFieldProps) => (
  <FieldShell
    {...presentation}
    label={label}
    disabled={disabled}
    readOnly={readOnly}
  >
    {({ controlId, describedBy, invalid }) => (
      <MonthYearInput
        id={controlId}
        name={presentation.name}
        label={typeof label === "string" ? label : presentation.name}
        language={language}
        value={value}
        onChange={onChange}
        requiredField={presentation.required}
        disabled={disabled}
        isReadOnly={readOnly}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        hideLabel
      />
    )}
  </FieldShell>
);
