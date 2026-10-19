import { lazy, Suspense, useEffect, useId, useRef, useState, type InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { Button, Checkbox, Input } from "../../ui";
import { cn } from "../../../utils/cn";
import { H6 } from "../Typography";
import { GenericButton } from "./GenericButton";

const SketchPicker = lazy(() => import("react-color").then((module) => ({ default: module.SketchPicker })));

type TextInputProps = {
  label?: string;
  placeholder?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
  onClear?: () => void;
  isDatePicker?: boolean;
  isTopFlexRow?: boolean;
  inputWidth?: string;
  requiredField?: boolean;
  isDateInitiallyOpen?: boolean;
  minNumber?: number;
  maxNumber?: number;
  isMinNumber?: boolean;
  isNumberButtonsActive?: boolean;
  isOnClearActive?: boolean;
  isDebounce?: boolean;
  isDatePickerLabel?: boolean;
  isReadOnly?: boolean;
  error?: string; // Validation error message
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  name?: string;
};

const TextInput = ({
  label,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  isTopFlexRow,
  onClear,
  inputWidth,
  minNumber = 0,
  maxNumber,
  isMinNumber = true,
  isNumberButtonsActive = false,
  isOnClearActive = true,
  requiredField = false,
  isDebounce = false,
  isReadOnly = false,
  error,
  autoComplete,
  name,
  className,
}: TextInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Debounce onChange
  const handleChange = (e: { target: { value: string | number } }) => {
    const inputValue = e.target.value;

    // Allow empty string for number inputs during editing
    if (type === "number" && inputValue === "") {
      setLocalValue("");
      if (isDebounce) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
          onChange(isMinNumber ? minNumber : "");
        }, 1000);
        setDebounceTimer(timer);
      } else {
        onChange(isMinNumber ? minNumber : "");
      }
      return;
    }

    const newValue =
      type === "number"
        ? Math.min(
            maxNumber ?? Number.POSITIVE_INFINITY,
            isMinNumber
              ? Math.max(Number(minNumber), Number(inputValue))
              : Number(inputValue),
          )
        : inputValue;
    setLocalValue(newValue);
    if (isDebounce) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        onChange(newValue);
      }, 1000);
      setDebounceTimer(timer);
    } else {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (disabled || isReadOnly) return;
    if (type === "number") {
      const newValue = Math.min(
        maxNumber ?? Number.POSITIVE_INFINITY,
        Math.max(minNumber, +localValue + 1),
      );
      setLocalValue(newValue);

      if (isDebounce) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
          onChange(newValue);
        }, 1000);
        setDebounceTimer(timer);
      } else {
        onChange(newValue);
      }

      if (inputRef.current) {
        inputRef.current.readOnly = true;
        setTimeout(() => {
          if (inputRef.current) inputRef.current.readOnly = false;
        }, 0);
      }
    }
  };
  const handleDecrement = () => {
    if (disabled || isReadOnly) return;
    if (type === "number" && +localValue > minNumber) {
      const newValue = Math.max(minNumber, +localValue - 1);
      setLocalValue(newValue);

      if (isDebounce) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
          onChange(newValue);
        }, 1000);
        setDebounceTimer(timer);
      } else {
        onChange(newValue);
      }

      if (inputRef.current) {
        inputRef.current.readOnly = true;
        setTimeout(() => {
          if (inputRef.current) inputRef.current.readOnly = false;
        }, 0);
      }
    }
  };

  const inputClassName = cn(
    "w-full text-sm",
    type === "number" && "inputHideNumberArrows",
    className,
  );

  const handleWheel = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  const isInputLocked = disabled || isReadOnly;

  if (type === "color") {
    return (
      <div
        className={` flex ${
          isTopFlexRow ? "flex-row sm:flex-col" : "flex-col"
        } gap-2  w-full items-center`}
      >
        <H6 className="min-w-10">
          {label}
          {requiredField && (
            <>
              <span className="text-ui-danger">* </span>
            </>
          )}
        </H6>
        <div className=" flex flex-row gap-2 ">
          <Suspense fallback={<div role="status" className="h-64 w-56 rounded-ui-md bg-ui-surface-subtle p-4 text-sm text-ui-muted">Loading color picker…</div>}>
          <SketchPicker
            color={value}
            onChange={(color) => {
              onChange(color.hex);
            }}
          />
          </Suspense>

          <GenericButton
            onClick={() => {
              onChange("");
            }}
            variant="danger"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <IoIosClose size={20} />
          </GenericButton>
        </div>
      </div>
    );
  }
  if (type === "checkbox") {
    return (
      <div className="flex justify-between items-center w-full">
        <label htmlFor={inputId} className="text-sm font-medium leading-6 my-auto">
          {label}
          {requiredField && <span className="text-ui-danger">*</span>}
        </label>
        <Checkbox
          id={inputId}
          checked={Boolean(localValue ?? value)}
          disabled={isInputLocked}
          required={requiredField}
          invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            const newValue = event.target.checked;
            setLocalValue(newValue);
            onChange(newValue);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={` flex ${isTopFlexRow ? "flex-row gap-4 " : "flex-col gap-2"}`}
      onClick={handleDivClick}
    >
      <label
        htmlFor={inputId}
        className={`text-sm font-medium leading-6 ${
          isTopFlexRow ? "min-w-20 " : "min-w-10"
        } my-auto`}
      >
        {label}
        {requiredField && (
          <>
            <span className="text-ui-danger">* </span>
          </>
        )}
      </label>
      <div
        className={`flex items-center justify-end ${
          isNumberButtonsActive ? "gap-4" : "gap-2"
        } ${inputWidth ? inputWidth : "w-full"} relative`}
      >
        <Input
          id={inputId}
          name={name}
          autoComplete={autoComplete}
          ref={inputRef}
          type={
            type === "password" && !showPassword
              ? "password"
              : type === "password"
              ? "text"
              : type
          }
          placeholder={placeholder}
          disabled={disabled}
          readOnly={isReadOnly}
          required={requiredField}
          invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={localValue}
          onChange={handleChange}
          className={cn(inputClassName, type === "password" && "pr-12")}
          {...(type === "number"
            ? {
                ...(isMinNumber ? { min: minNumber } : {}),
                ...(maxNumber !== undefined ? { max: maxNumber } : {}),
              }
            : {})}
          onWheel={type === "number" ? handleWheel : undefined}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="icon"
            size="sm"
            disabled={isInputLocked}
            aria-label={`${showPassword ? "Hide" : "Show"} ${label || "password"}`}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 text-ui-muted shadow-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} aria-hidden="true" />
            ) : (
              <AiOutlineEye size={20} aria-hidden="true" />
            )}
          </Button>
        )}
        {isNumberButtonsActive && (
          <Button
            type="button"
            variant="icon"
            size="sm"
            disabled={isInputLocked}
            aria-label={`Decrement ${label || "value"}`}
            onClick={handleDecrement}
            className="shrink-0 text-ui-danger shadow-none"
          >
            <FiMinusCircle className="h-5 w-5" aria-hidden="true" />
          </Button>
        )}
        {isNumberButtonsActive && (
          <Button
            type="button"
            variant="icon"
            size="sm"
            disabled={isInputLocked}
            aria-label={`Increment ${label || "value"}`}
            onClick={handleIncrement}
            className="shrink-0 text-ui-success shadow-none"
          >
            <GoPlusCircle className="h-5 w-5" aria-hidden="true" />
          </Button>
        )}
        {onClear && isOnClearActive && (
          <GenericButton
            type="button"
            aria-label={`Clear ${label || "input"}`}
            onClick={() => {
              setLocalValue("");
              onClear();
            }}
            variant="icon"
            className="my-auto h-8 w-8 text-2xl text-ui-muted hover:text-ui-danger"
          >
            <IoIosClose size={28} />
          </GenericButton>
        )}
      </div>
      {error && <p id={errorId} className="text-ui-danger text-sm" role="alert">{error}</p>}
    </div>
  );
};

export default TextInput;
