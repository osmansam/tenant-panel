import type { ReactNode } from "react";

export interface FieldPresentationProps {
  id?: string;
  name: string;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  optionalLabel?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export interface FieldControlAccessibility {
  controlId: string;
  descriptionId?: string;
  errorId?: string;
  describedBy?: string;
  invalid: boolean;
}
