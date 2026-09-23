import { useState } from "react";
import { Button, Input } from "../ui";
import type { FieldPresentationProps } from "./field.types";
import { FieldShell } from "./field-shell";

export interface TextFieldProps extends FieldPresentationProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "url" | "tel";
  placeholder?: string;
  autoComplete?: string;
  onClear?: () => void;
}

export const TextField = ({
  autoComplete,
  disabled,
  onChange,
  onClear,
  placeholder,
  readOnly,
  type = "text",
  value,
  ...presentation
}: TextFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <FieldShell {...presentation} disabled={disabled} readOnly={readOnly}>
      {({ controlId, describedBy, invalid }) => (
        <div className="relative">
          <Input
            id={controlId}
            name={presentation.name}
            type={isPassword && passwordVisible ? "text" : type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            readOnly={readOnly}
            required={presentation.required}
            invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => onChange(event.target.value)}
            className={isPassword || onClear ? "pr-24" : undefined}
          />
          {(isPassword || onClear) && (
            <div className="absolute inset-y-0 right-1 flex items-center gap-1">
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  aria-label={`${passwordVisible ? "Hide" : "Show"} password`}
                  className="h-8 px-2 shadow-none"
                >
                  {passwordVisible ? "Hide" : "Show"}
                  <span className="sr-only"> password</span>
                </Button>
              )}
              {onClear && value && !readOnly && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  onClick={onClear}
                  className="h-8 px-2 shadow-none"
                >
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </FieldShell>
  );
};
