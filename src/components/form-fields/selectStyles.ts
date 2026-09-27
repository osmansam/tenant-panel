import type { StylesConfig } from "react-select";
import type { OptionType } from "../../types";

export const getSelectStyles = (
  invalid: boolean,
): StylesConfig<OptionType, boolean> => ({
  control: (base, state) => ({
    ...base,
    minHeight: "var(--ui-control-md)",
    borderColor: invalid
      ? "hsl(var(--ui-danger))"
      : state.isFocused
        ? "hsl(var(--ui-focus))"
        : "hsl(var(--ui-border))",
    borderRadius: "var(--ui-radius-md)",
    backgroundColor: state.isDisabled
      ? "hsl(var(--ui-disabled))"
      : "hsl(var(--ui-surface))",
    boxShadow: state.isFocused
      ? `0 0 0 3px hsl(var(${invalid ? "--ui-danger" : "--ui-focus"}) / 0.2)`
      : "none",
    fontSize: "0.875rem",
    transition: "border-color 150ms, box-shadow 150ms",
    ":hover": {
      borderColor: invalid
        ? "hsl(var(--ui-danger))"
        : "hsl(var(--ui-border-hover))",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 60,
    border: "1px solid hsl(var(--ui-border))",
    borderRadius: "var(--ui-radius-md)",
    backgroundColor: "hsl(var(--ui-surface))",
    boxShadow: "var(--ui-shadow-dialog)",
    overflow: "hidden",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 60 }),
  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "hsl(var(--ui-foreground))",
    backgroundColor: state.isSelected || state.isFocused
      ? "hsl(var(--ui-surface-subtle))"
      : "hsl(var(--ui-surface))",
    ":active": { backgroundColor: "hsl(var(--ui-disabled))" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--ui-placeholder))",
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--ui-foreground))",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "var(--ui-radius-sm)",
    backgroundColor: "hsl(var(--ui-surface-subtle))",
  }),
});
