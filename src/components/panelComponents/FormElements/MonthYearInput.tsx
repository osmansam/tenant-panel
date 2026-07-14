import { useMemo } from "react";
import Select, { StylesConfig } from "react-select";

type MonthYearOption = {
  value: string;
  label: string;
};

type MonthYearInputProps = {
  label?: string;
  value?: string | Date | null;
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
const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
const yearOptions = generateOptions(currentYear - 10, currentYear + 10);
const selectMenuStyles: StylesConfig<MonthYearOption, false> = {
  menu: (base) => ({
    ...base,
    zIndex: 99999,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 99999,
  }),
};

const normalizeMonthYearValue = (value: MonthYearInputProps["value"]) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return {
      selectedMonth: String(value.getMonth() + 1).padStart(2, "0"),
      selectedYear: String(value.getFullYear()),
    };
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    const monthYearMatch = /^(0[1-9]|1[0-2])-(\d{4})$/.exec(normalized);
    if (monthYearMatch) {
      return { selectedMonth: monthYearMatch[1], selectedYear: monthYearMatch[2] };
    }

    const yearMonthMatch = /^(\d{4})-(0[1-9]|1[0-2])(?:-\d{2})?/.exec(normalized);
    if (yearMonthMatch) {
      return { selectedMonth: yearMonthMatch[2], selectedYear: yearMonthMatch[1] };
    }
  }

  return {
    selectedMonth: currentMonth,
    selectedYear: String(currentYear),
  };
};

const MonthYearInput = ({
  label,
  value,
  onChange,
  requiredField = false,
  isReadOnly = false,
}: MonthYearInputProps) => {
  const { selectedMonth, selectedYear } = useMemo(() => {
    return normalizeMonthYearValue(value);
  }, [value]);

  const handleChange = (newMonth: string, newYear: string) => {
    const month = newMonth || currentMonth;
    const year = newYear || String(currentYear);
    const formatted = `${month}-${year}`;
    onChange(formatted);
  };
  const menuPortalTarget =
    typeof document === "undefined" ? undefined : document.body;

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
          menuPortalTarget={menuPortalTarget}
          styles={selectMenuStyles}
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
          menuPortalTarget={menuPortalTarget}
          styles={selectMenuStyles}
        />
      </div>
    </div>
  );
};

export default MonthYearInput;
