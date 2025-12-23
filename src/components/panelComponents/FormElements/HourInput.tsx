import { useState } from "react";
import Select from "react-select";

type HourInputProps = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  requiredField?: boolean;
  isReadOnly?: boolean;
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
}: HourInputProps) => {
  const [selectedHour, setSelectedHour] = useState<string>(
    value ? value.split(":")[0] : "00"
  );
  const [selectedMinute, setSelectedMinute] = useState<string>(
    value ? value.split(":")[1] : "00"
  );

  const handleChange = (newHour: string, newMinute: string) => {
    const formattedTime = `${newHour}:${newMinute}`;
    setSelectedHour(newHour);
    setSelectedMinute(newMinute);
    onChange(formattedTime);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium">
          {label} {requiredField && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2 items-center">
        {/* Hour Dropdown */}
        <Select
          options={hourOptions}
          value={hourOptions.find((option) => option.value === selectedHour)}
          onChange={(option) =>
            option && handleChange(option.value, selectedMinute)
          }
          isDisabled={isReadOnly}
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
          onChange={(option) =>
            option && handleChange(selectedHour, option.value)
          }
          isDisabled={isReadOnly}
          className="w-24"
          menuPosition="fixed"
        />
      </div>
    </div>
  );
};

export default HourInput;
