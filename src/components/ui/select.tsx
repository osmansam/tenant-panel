import {
  Children,
  isValidElement,
  type ChangeEvent,
  type ChangeEventHandler,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import ReactSelect, {
  components,
  type ActionMeta,
  type GroupBase,
  type InputProps as ReactSelectInputProps,
  type OptionProps,
  type StylesConfig,
} from "react-select";
import { cn } from "../../utils/cn";
import type { ControlSize } from "./input";

export interface SelectOption<Value = string | number> {
  value: Value;
  label: string;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  imageUrl?: string;
}

export type SelectChangeMeta<
  Option extends SelectOption = SelectOption,
> = ActionMeta<Option>;

export type SelectSingleValue<Option> = Option | null;
export type SelectMultiValue<Option> = readonly Option[];

export interface SelectProps<Option extends SelectOption = SelectOption> {
  id?: string;
  name?: string;
  value: Option | readonly Option[] | null;
  options: readonly Option[];
  onChange: (
    value: Option | readonly Option[] | null,
    actionMeta: SelectChangeMeta<Option>,
  ) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  loading?: boolean;
  required?: boolean;
  placeholder?: string;
  noOptionsMessage?: string;
  controlSize?: ControlSize;
  sortOptions?: boolean;
  menuPortalTarget?: HTMLElement | null;
  className?: string;
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface LegacySelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "defaultValue" | "onChange" | "size" | "value"
  > {
  children: ReactNode;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  controlSize?: ControlSize;
  invalid?: boolean;
  searchable?: boolean;
}

export const normalizeSelectSearch = (text: string) =>
  text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

const controlHeights: Record<ControlSize, string> = {
  sm: "var(--ui-control-sm)",
  md: "var(--ui-control-md)",
  lg: "var(--ui-control-lg)",
};

const LEGACY_WRAPPER_CHROME_PATTERN =
  /^(?:ui-control(?:-invalid)?|appearance-none|truncate|border(?:-.*)?|rounded(?:-.*)?|bg-.*|p[xytblr]?-.*|h-(?:ui-(?:sm|md|lg)|\d+|full|auto)|min-h-.*|font-(?:normal|medium|semibold|bold)|text-(?:xs|sm|base|lg|ui-.*|neutral-.*|slate-.*|gray-.*)|shadow(?:-.*)?|ring(?:-.*)?|outline(?:-.*)?|cursor-.*|transition(?:-.*)?|(?:hover|focus|focus-visible|active|disabled):.*)$/;

const sanitizeSelectWrapperClassName = (className?: string) => {
  if (!className) return undefined;
  const kept = className
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !LEGACY_WRAPPER_CHROME_PATTERN.test(token));
  return kept.length ? kept.join(" ") : undefined;
};

const inferControlSizeFromClassName = (
  className?: string,
  explicitSize?: ControlSize,
): ControlSize => {
  if (explicitSize) return explicitSize;
  if (!className) return "md";
  const tokens = className.split(/\s+/);
  if (
    tokens.some(
      (token) =>
        token === "h-8" ||
        token === "h-7" ||
        token === "h-ui-sm" ||
        token === "py-1" ||
        token === "py-1.5",
    )
  ) {
    return "sm";
  }
  if (tokens.some((token) => token === "h-11" || token === "h-ui-lg")) {
    return "lg";
  }
  return "md";
};

const getSelectStyles = <Option extends SelectOption>(
  invalid: boolean,
  controlSize: ControlSize,
): StylesConfig<Option, boolean, GroupBase<Option>> => ({
  control: (base, state) => ({
    ...base,
    minHeight: controlHeights[controlSize],
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
      ? `0 0 0 4px hsl(var(${invalid ? "--ui-danger" : "--ui-focus"}) / 0.14)`
      : "none",
    color: "hsl(var(--ui-foreground))",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    fontSize: controlSize === "sm" ? "0.75rem" : "0.875rem",
    lineHeight: "1.25rem",
    transition: "border-color 150ms, box-shadow 150ms",
    ":hover": {
      borderColor: invalid
        ? "hsl(var(--ui-danger))"
        : "hsl(var(--ui-border-hover))",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: controlSize === "sm" ? "0 0.625rem" : "0 0.75rem",
    gap: "0.25rem",
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--ui-foreground))",
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: controlSize === "sm" ? "0 0.5rem 0 0.25rem" : "0 0.625rem 0 0.25rem",
    color: state.isFocused
      ? "hsl(var(--ui-foreground))"
      : "hsl(var(--ui-muted-foreground))",
    ":hover": {
      color: "hsl(var(--ui-foreground))",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "0 0.25rem",
    color: "hsl(var(--ui-muted-foreground))",
    ":hover": {
      color: "hsl(var(--ui-foreground))",
    },
  }),
  indicatorsContainer: (base) => ({
    ...base,
    minHeight: `calc(${controlHeights[controlSize]} - 2px)`,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100000,
    overflow: "hidden",
    border: "1px solid hsl(var(--ui-border))",
    borderRadius: "var(--ui-radius-lg)",
    backgroundColor: "hsl(var(--ui-surface))",
    boxShadow: "var(--ui-shadow-popover)",
    fontSize: "0.875rem",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 100000 }),
  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    color: state.isDisabled
      ? "hsl(var(--ui-muted-foreground))"
      : "hsl(var(--ui-foreground))",
    backgroundColor:
      state.isSelected || state.isFocused
        ? "hsl(var(--ui-surface-subtle))"
        : "hsl(var(--ui-surface))",
    ":active": { backgroundColor: "hsl(var(--ui-disabled))" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--ui-placeholder))",
    margin: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--ui-foreground))",
    margin: 0,
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "var(--ui-radius-sm)",
    backgroundColor: "hsl(var(--ui-surface-subtle))",
  }),
});

const RichOption = <Option extends SelectOption>(
  props: OptionProps<Option, boolean, GroupBase<Option>>,
) => (
  <components.Option {...props}>
    <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
      {props.data.imageUrl && (
        <img
          alt=""
          aria-hidden="true"
          src={props.data.imageUrl}
          className="size-6 shrink-0 rounded-ui-sm object-cover"
        />
      )}
      <span data-option-left className="min-w-0 flex-1 truncate">
        {props.data.leftLabel || props.data.label}
      </span>
      {props.data.rightLabel && (
        <span
          data-option-right
          className="shrink-0 text-right font-medium text-ui-foreground"
        >
          {props.data.rightLabel}
        </span>
      )}
    </span>
    {props.isSelected && <span aria-hidden="true">✓</span>}
  </components.Option>
);

const AccessibleInput = <Option extends SelectOption>(
  props: ReactSelectInputProps<Option, boolean, GroupBase<Option>>,
) => (
  <components.Input
    {...props}
    aria-busy={props.selectProps.isLoading || undefined}
    aria-describedby={
      (props.selectProps as typeof props.selectProps & {
        "aria-describedby"?: string;
      })["aria-describedby"] || props["aria-describedby"]
    }
  />
);

function ObjectSelect<Option extends SelectOption = SelectOption>({
  clearable = false,
  controlSize,
  disabled = false,
  invalid = false,
  loading = false,
  menuPortalTarget = typeof document === "undefined" ? null : document.body,
  multiple = false,
  noOptionsMessage = "No options",
  onChange,
  options,
  readOnly = false,
  required = false,
  searchable = true,
  sortOptions = false,
  value,
  className,
  id,
  name,
  placeholder,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SelectProps<Option>) {
  const resolvedControlSize = inferControlSizeFromClassName(
    className,
    controlSize,
  );
  const wrapperClassName = sanitizeSelectWrapperClassName(className);
  const displayedOptions = sortOptions
    ? [...options].sort((left, right) => left.label.localeCompare(right.label))
    : options;
  const locked = disabled || readOnly;

  return (
    <div
      className={cn("min-w-0 w-full font-ui", wrapperClassName)}
      data-control-size={resolvedControlSize}
      data-invalid={invalid || undefined}
      data-readonly={readOnly || undefined}
    >
      <ReactSelect<Option, boolean>
        inputId={id}
        name={name}
        value={value}
        options={displayedOptions}
        isMulti={multiple}
        isSearchable={searchable}
        isClearable={clearable && !required}
        isDisabled={locked}
        isLoading={loading}
        isOptionDisabled={(option) => Boolean(option.disabled)}
        closeMenuOnSelect={!multiple}
        hideSelectedOptions={!multiple}
        backspaceRemovesValue={clearable || multiple}
        menuPlacement="auto"
        menuPosition={menuPortalTarget ? "fixed" : "absolute"}
        menuPortalTarget={menuPortalTarget || undefined}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        components={{
          Input: AccessibleInput<Option>,
          Option: RichOption<Option>,
        }}
        styles={getSelectStyles<Option>(invalid, resolvedControlSize)}
        filterOption={(candidate, input) =>
          normalizeSelectSearch(candidate.label).includes(
            normalizeSelectSearch(input),
          )
        }
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={invalid || undefined}
        required={required}
        onChange={(selected, actionMeta) =>
          onChange(
            selected as Option | readonly Option[] | null,
            actionMeta as SelectChangeMeta<Option>,
          )
        }
      />
    </div>
  );
}

const textFromNode = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? textFromNode(child.props.children)
          : "",
    )
    .join("");

const optionsFromChildren = (children: ReactNode): SelectOption<string>[] =>
  Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{
      children?: ReactNode;
      disabled?: boolean;
      label?: string;
      value?: string | number;
    }>(child)) {
      return [];
    }
    if (child.type === "optgroup") {
      return optionsFromChildren(child.props.children);
    }
    if (child.type !== "option") return [];
    const label = textFromNode(child.props.children);
    return [{
      value: String(child.props.value ?? label),
      label,
      disabled: child.props.disabled,
    }];
  });

const LegacySelectAdapter = ({
  children,
  className,
  controlSize,
  defaultValue,
  disabled,
  id,
  invalid,
  multiple = false,
  name,
  onChange,
  required,
  searchable,
  value,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: LegacySelectProps) => {
  const options = optionsFromChildren(children);
  const rawValue = value ?? defaultValue ?? (multiple ? [] : "");
  const selectedValues = Array.isArray(rawValue)
    ? rawValue.map(String)
    : [String(rawValue)];
  const selected = multiple
    ? options.filter((option) => selectedValues.includes(option.value))
    : options.find((option) => option.value === selectedValues[0]) || null;

  return (
    <ObjectSelect<SelectOption<string>>
      id={id}
      name={name}
      value={selected}
      options={options}
      multiple={multiple}
      disabled={disabled}
      required={required}
      searchable={searchable}
      invalid={invalid}
      controlSize={controlSize}
      className={className}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onChange={(next) => {
        const values = Array.isArray(next) ? next : next ? [next] : [];
        const target = {
          value: values[0] ? String(values[0].value) : "",
          selectedOptions: values.map((option) => ({
            value: String(option.value),
          })),
        };
        onChange?.({
          target,
          currentTarget: target,
        } as unknown as ChangeEvent<HTMLSelectElement>);
      }}
    />
  );
};

export function Select<Option extends SelectOption = SelectOption>(
  props: SelectProps<Option>,
): JSX.Element;
export function Select(props: LegacySelectProps): JSX.Element;
export function Select<Option extends SelectOption = SelectOption>(
  props: SelectProps<Option> | LegacySelectProps,
) {
  return "children" in props ? (
    <LegacySelectAdapter {...props} />
  ) : (
    <ObjectSelect<Option> {...props} />
  );
}
