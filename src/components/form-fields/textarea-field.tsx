import { Textarea } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface TextareaFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextareaField = ({
  disabled,
  onChange,
  placeholder,
  readOnly,
  rows = 4,
  value,
  ...presentation
}: TextareaFieldProps) => (
  <FieldShell {...presentation} disabled={disabled} readOnly={readOnly}>
    {({ controlId, describedBy, invalid }) => (
      <Textarea
        id={controlId}
        name={presentation.name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        required={presentation.required}
        invalid={invalid}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
    )}
  </FieldShell>
);
