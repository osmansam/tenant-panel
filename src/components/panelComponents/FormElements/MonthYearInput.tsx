import { useMemo } from "react";
import Select from "react-select";

type MonthYearInputProps = {
  label?: string;
  value?: string; // Expected format: "MM-YYYY"
  onChange: (value: string) => void;
  requiredField?: boolean;
  isReadOnly?: boolean;
};

const generateOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => {
    const value = (start + i).toString();
    return { value, label: value };
  });

const monthOptions = generateOptions(1, 12).map((opt) => ({
  value: opt.value.padStart(2, "0"),
  label: opt.value.padStart(2, "0"),
}));

const currentYear = new Date().getFullYear();
const yearOptions = generateOptions(currentYear - 10, currentYear + 10);

const MonthYearInput = ({
  label,
  value,
  onChange,
  requiredField = false,
  isReadOnly = false,
}: MonthYearInputProps) => {
  const { selectedMonth, selectedYear } = useMemo(() => {
    if (value) {
      const [month, year] = value.split("-");
      if (month && year) {
        return { selectedMonth: month, selectedYear: year };
      }
    }
    return {
      selectedMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
      selectedYear: new Date().getFullYear().toString(),
    };
  }, [value]);

  const handleChange = (newMonth: string, newYear: string) => {
    const formatted = `${newMonth}-${newYear}`;
    onChange(formatted);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium">
          {label} {requiredField && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2 items-center">
        {/* Month Dropdown */}
        <Select
          options={monthOptions}
          value={monthOptions.find((opt) => opt.value === selectedMonth)}
          onChange={(option) =>
            option && handleChange(option.value, selectedYear)
          }
          isDisabled={isReadOnly}
          className="w-28"
          menuPosition="fixed"
        />

        {/* Year Dropdown */}
        <Select
          options={yearOptions}
          value={yearOptions.find((opt) => opt.value === selectedYear)}
          onChange={(option) =>
            option && handleChange(selectedMonth, option.value)
          }
          isDisabled={isReadOnly}
          className="w-32"
          menuPosition="fixed"
        />
      </div>
    </div>
  );
};

export default MonthYearInput;
