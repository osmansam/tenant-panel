import { TextField } from "@mui/material";
import { tr } from "date-fns/locale";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import InputMask from "react-input-mask";
import { H6 } from "../Typography";
import { GenericButton } from "./GenericButton";
dayjs.extend(customParseFormat);

type DateInputProps = {
  label?: string;
  value: string | null; // expects "YYYY-MM-DD"
  onChange: (value: string | null) => void;
  onClear?: () => void;
  requiredField?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isTopFlexRow?: boolean;
  isOnClearActive?: boolean;
  isReadOnly?: boolean;
  isDateInitiallyOpen?: boolean;
  isDebounce?: boolean;
  isArrowsEnabled?: boolean;
};

export default function DateInput({
  label,
  value,
  onChange,
  onClear,
  requiredField = false,
  disabled = false,
  placeholder = "MM/DD/YYYY",
  isTopFlexRow = false,
  isOnClearActive = true,
  isReadOnly = false,
  isDateInitiallyOpen = false,
  isDebounce = false,
  isArrowsEnabled = false,
}: DateInputProps) {
  const [inputText, setInputText] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState(new Date());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const todayYear = String(dayjs().year());

  useEffect(() => {
    if (value) {
      const p = dayjs(value, "YYYY-MM-DD", true);
      if (p.isValid()) {
        setInputText(p.format("MM/DD/YYYY"));
        setMonth(p.toDate());
      }
    } else {
      setInputText("");
      setMonth(new Date());
    }
  }, [value]);

  useEffect(() => {
    if (isDateInitiallyOpen) {
      setShowCalendar(true);
      inputRef.current?.focus();
    }
  }, [isDateInitiallyOpen]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const commit = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const m = digits.slice(0, 2);
    const d = digits.slice(2, 4);
    const y = digits.slice(4, 8) || todayYear;
    const str = `${m}/${d}/${y}`;
    const p = dayjs(str, "MM/DD/YYYY", true);
    if (p.isValid()) {
      onChange(p.format("YYYY-MM-DD"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputText(raw);
    const doCommit = () => {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) commit(raw);
    };
    if (isDebounce) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(doCommit, 1000);
    } else {
      doCommit();
    }
  };

  const handleSelect = (date?: Date) => {
    if (date) {
      const p = dayjs(date);
      const txt = p.format("MM/DD/YYYY");
      setInputText(txt);
      onChange(p.format("YYYY-MM-DD"));
      setMonth(date);
      setShowCalendar(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    onChange(null);
    onClear?.();
    setMonth(new Date());
  };

  const selectedDate = (() => {
    const fromText = dayjs(inputText, "MM/DD/YYYY", true);
    if (fromText.isValid()) return fromText.toDate();
    if (value) {
      const fromVal = dayjs(value, "YYYY-MM-DD", true);
      if (fromVal.isValid()) return fromVal.toDate();
    }
    return undefined;
  })();

  const bumpDay = (delta: number) => {
    if (disabled || isReadOnly) return;
    const base =
      selectedDate ??
      (value ? dayjs(value, "YYYY-MM-DD", true).toDate() : new Date());
    const next = dayjs(base).add(delta, "day");
    setInputText(next.format("MM/DD/YYYY"));
    onChange(next.format("YYYY-MM-DD"));
    setMonth(next.toDate());
  };

  return (
    <div
      ref={containerRef}
      className={`flex ${
        isTopFlexRow ? "flex-row sm:flex-col" : "flex-col"
      } gap-2 w-full`}
    >
      {label && (
        <H6 className="min-w-10">
          {label}
          {requiredField && <span className="text-red-400">*</span>}
        </H6>
      )}

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          {isArrowsEnabled && (
            <GenericButton
              type="button"
              aria-label="Previous day"
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => bumpDay(-1)}
              disabled={disabled || isReadOnly}
            >
              <IoIosArrowBack size={20} />
            </GenericButton>
          )}

          <div className="relative flex items-center gap-2 w-full">
            <InputMask
              mask="99/99/9999"
              maskChar=""
              value={inputText}
              onChange={handleChange}
              onFocus={() => setShowCalendar(true)}
              disabled={disabled}
            >
              {(maskProps: React.InputHTMLAttributes<HTMLInputElement>) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { size, color, ...filteredProps } = maskProps;
                return (
                  <TextField
                    {...filteredProps}
                    fullWidth
                    placeholder={placeholder}
                    InputProps={{ readOnly: isReadOnly }}
                    inputRef={inputRef}
                  />
                );
              }}
            </InputMask>

            <FaRegCalendar
              className="absolute right-3 cursor-pointer text-gray-500"
              onClick={() => setShowCalendar((v) => !v)}
            />

            {showCalendar && (
              <div className="absolute top-full mt-1 z-10 bg-white shadow-lg rounded-md p-2">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  month={month}
                  onMonthChange={setMonth}
                  captionLayout="dropdown"
                  locale={tr}
                />
              </div>
            )}
          </div>

          {isArrowsEnabled && (
            <GenericButton
              type="button"
              aria-label="Next day"
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => bumpDay(1)}
              disabled={disabled || isReadOnly}
            >
              <IoIosArrowForward size={20} />
            </GenericButton>
          )}
        </div>

        {isOnClearActive && inputText && (
          <GenericButton
            onClick={handleClear}
            variant="icon"
            className="w-8 h-8 text-gray-500 hover:text-red-700"
          >
            <IoIosClose />
          </GenericButton>
        )}
      </div>
    </div>
  );
}
