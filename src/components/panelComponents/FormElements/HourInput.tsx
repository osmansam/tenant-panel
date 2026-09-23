import type { AriaAttributes } from "react";
import Select from "react-select";

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

  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""}`}>
      {!hideLabel && label && (
        <label className="text-sm font-medium">
          {label} {requiredField && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2 items-center">
        {/* Hour Dropdown */}
        <Select
          options={hourOptions}
          value={hourOptions.find((option) => option.value === selectedHour)}
          onChange={(option) => option && handleHourChange(option.value)}
          isDisabled={disabled || isReadOnly}
          inputId={id}
          name={name}
          aria-label="Hour"
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className="w-24"
          menuPosition="fixed"
        />

        <span className="text-lg">:</span>

        {/* Minute Dropdown */}
        <Select
          options={minuteOptions}
          value={minuteOptions.find(
            (option) => option.value === selectedMinute
          )}
          onChange={(option) => option && handleMinuteChange(option.value)}
          isDisabled={disabled || isReadOnly}
          aria-label="Minute"
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className="w-24"
          menuPosition="fixed"
        />
      </div>
    </div>
  );
};

export default HourInput;
