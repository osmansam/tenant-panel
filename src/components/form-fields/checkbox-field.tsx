import { Checkbox } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface CheckboxFieldProps extends FieldPresentationProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const CheckboxField = ({
  disabled,
  onChange,
  readOnly,
  value,
  ...presentation
}: CheckboxFieldProps) => (
  <FieldShell {...presentation} disabled={disabled} readOnly={readOnly}>
    {({ controlId, describedBy, invalid }) => (
      <div className="flex min-h-10 items-center">
        <Checkbox
          id={controlId}
          name={presentation.name}
          checked={value}
          disabled={disabled}
          required={presentation.required}
          invalid={invalid}
          aria-describedby={describedBy}
          aria-readonly={readOnly || undefined}
          onChange={(event) => {
            if (!readOnly) onChange(event.target.checked);
          }}
        />
      </div>
    )}
  </FieldShell>
);
