import type { AriaAttributes } from "react";
import { Select } from "../../ui";

type HourInputProps = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  requiredField?: boolean;
  isReadOnly?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  className?: string;
  hideLabel?: boolean;
};

const generateOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    value: String(start + i).padStart(2, "0"),
    label: String(start + i).padStart(2, "0"),
  }));

const hourOptions = generateOptions(0, 23);
const minuteOptions = generateOptions(0, 59);

const HourInput = ({
  label,
  value,
  onChange,
  requiredField = false,
  isReadOnly = false,
  disabled = false,
  id,
  name,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  hideLabel = false,
}: HourInputProps) => {
  const [selectedHour = "00", selectedMinute = "00"] =
    typeof value === "string" ? value.split(":") : [];

  const handleHourChange = (hour: string) =>
    onChange(`${hour}:${selectedMinute}`);
  const handleMinuteChange = (minute: string) =>
    onChange(`${selectedHour}:${minute}`);
  const invalid =
    ariaInvalid !== undefined &&
    ariaInvalid !== false &&
    ariaInvalid !== "false";

  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""}`}>
      {!hideLabel && label && (
        <label className="text-sm font-medium">
          {label} {requiredField && <span className="text-ui-danger">*</span>}
        </label>
      )}
      <div className="flex gap-2 items-center">
        {/* Hour Dropdown */}
        <Select
          options={hourOptions}
          value={hourOptions.find((option) => option.value === selectedHour) || null}
          onChange={(option) =>
            option && "value" in option && handleHourChange(option.value)
          }
          disabled={disabled}
          readOnly={isReadOnly}
          id={id}
          name={name}
          aria-label="Hour"
          aria-describedby={ariaDescribedBy}
          invalid={invalid}
          className="w-24"
        />

        <span className="text-lg">:</span>

        {/* Minute Dropdown */}
        <Select
          options={minuteOptions}
          value={minuteOptions.find(
            (option) => option.value === selectedMinute
          ) || null}
          onChange={(option) =>
            option && "value" in option && handleMinuteChange(option.value)
          }
          disabled={disabled}
          readOnly={isReadOnly}
          aria-label="Minute"
          aria-describedby={ariaDescribedBy}
          invalid={invalid}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default HourInput;
