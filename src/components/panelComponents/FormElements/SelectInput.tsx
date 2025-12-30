import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import { MdArrowDropDown, MdOutlineDone } from "react-icons/md";
import Select, {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  MultiValue,
  OptionProps,
  PropsValue,
  SingleValue,
  components,
} from "react-select";
import { OptionType } from "../../../types";
import { H6 } from "../Typography";
import { GenericButton } from "./GenericButton";

const CustomOption = (
  props: OptionProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value: any; label: string },
    boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GroupBase<{ value: any; label: string }>
  >
) => (
  <components.Option {...props}>
    {props.label}
    {props.isSelected && (
      <MdOutlineDone className="text-blue-700 font-bold text-xl " />
    )}
  </components.Option>
);

interface SelectInputProps {
  label?: string;
  options: OptionType[];
  value: PropsValue<OptionType> | null;
  onChange: (
    value: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  onClear?: () => void;
  onChangeTrigger?: (
    value: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  placeholder?: string;
  isMultiple?: boolean;
  requiredField?: boolean;
  isAutoFill?: boolean;
  isOnClearActive?: boolean;
  isReadOnly?: boolean;
  isTopFlexRow?: boolean;
  suggestedOption?: { value: string; label: string }[] | null;
  isSortDisabled?: boolean;
  customControlBackgroundColor?: string;
}

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
};

const customFilterOption = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: { value: any; label: string },

  searchInput: string
) => {
  const normalizedLabel = normalizeText(option.label);
  const normalizedSearch = normalizeText(searchInput);
  return normalizedLabel.includes(normalizedSearch);
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}
const SelectInput = ({
  label,
  options,
  value,
  onChange,
  onChangeTrigger,
  isMultiple,
  placeholder,
  onClear,
  isOnClearActive = true,
  isAutoFill = true,
  requiredField = false,
  isReadOnly = false,
  isTopFlexRow = false,
  isSortDisabled = false,
  suggestedOption,
  customControlBackgroundColor,
}: SelectInputProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDownIconClicked, setIsDownIconClicked] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);

  const sortedOptions = useMemo(() => {
    if (isSortDisabled) return options;

    return [...options].sort((a, b) => {
      const aStartsWith = normalizeText(a.label).startsWith(
        normalizeText(searchInput)
      );
      const bStartsWith = normalizeText(b.label).startsWith(
        normalizeText(searchInput)
      );
      if (aStartsWith && !bStartsWith) return -1;
      if (bStartsWith && !aStartsWith) return 1;
      return a?.label?.localeCompare(b.label);
    });
  }, [options, searchInput, isSortDisabled]);
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (base: any) => ({
      ...base,
      border: "1px solid #E2E8F0",
      borderRadius: "4px",
      fontSize: "16px",
      height: "auto",
      ...(customControlBackgroundColor && {
        backgroundColor: customControlBackgroundColor,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (base: any) => ({
      ...base,
      overflowY: "auto",
      zIndex: 9999, // Ensure dropdown appears above modal content
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (base: any, state: any) => ({
      ...base,
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#4B5563",
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#EDF7FF" : base.backgroundColor,
      ":hover": {
        color: "#0057FF",
      },
      fontSize: "16px",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placeholder: (base: any) => ({
      ...base,
      color: "#b0b5ba",
      fontSize: "16px",
      fontWeight: 400,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleValue: (base: any) => ({
      ...base,
      fontSize: "16px",
    }),
  };

  const handleInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      if (actionMeta.action === "input-change") {
        setSearchInput(newValue);
        return newValue;
      }
    },
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <MdArrowDropDown
          className="text-gray-500 text-2xl"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsSearchable(false);
            setIsDownIconClicked(true);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsSearchable(false);
            setIsDownIconClicked(true);
          }}
        />
      </components.DropdownIndicator>
    );
  };

  useEffect(() => {
    if (options.length === 1 && !value && isAutoFill) {
      const actionMeta: ActionMeta<OptionType> = {
        action: "select-option",
        option: options[0],
      };
      onChange(options[0], actionMeta);
      onChangeTrigger && onChangeTrigger(options[0], actionMeta);
    }
  }, [options, value, onChange]);

  return (
    <div
      ref={selectRef}
      className={`flex ${
        isTopFlexRow
          ? "flex-row items-center sm:flex-col sm:items-baseline "
          : "flex-col"
      } gap-2 __className_a182b8 `}
    >
      <H6 className="flex items-center gap-2">
        <span>{label}</span>
        {requiredField && <span className="text-red-400">*</span>}

        {Array.isArray(suggestedOption) &&
          suggestedOption
            // only keep suggestions that exist in the available options
            .filter((opt) => options.some((o) => o.value === opt.value))
            // exclude already selected ones
            .filter((opt) => {
              if (isMultiple) {
                const curr = (value as MultiValue<OptionType>) || [];
                return !curr.some((v) => v.value === opt.value);
              } else {
                const curr = value as SingleValue<OptionType> | null;
                return (curr?.value ?? null) !== opt.value;
              }
            })
            // render a button per remaining suggestion
            .map((opt) => (
              <GenericButton
                key={opt.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  const candidate = opt as OptionType;
                  const actionMeta: ActionMeta<OptionType> = {
                    action: "select-option",
                    option: candidate,
                  };

                  if (isMultiple) {
                    const curr = (value as MultiValue<OptionType>) || [];
                    const next = [...curr, candidate];
                    onChange(next, actionMeta);
                    onChangeTrigger && onChangeTrigger(next, actionMeta);
                  } else {
                    onChange(candidate, actionMeta);
                    onChangeTrigger && onChangeTrigger(candidate, actionMeta);
                  }
                }}
                variant="outline"
                size="sm"
                className="ml-2 text-xs sm:text-sm rounded-full"
                title={`Use suggested: ${opt.label}`}
              >
                {opt.label}
              </GenericButton>
            ))}
      </H6>

      <div className="flex flex-row gap-2 w-full ">
        <div className="w-full ">
          {isMultiple ? (
            <Select
              isMulti
              options={options}
              onChange={(value, actionMeta) => {
                onChange(value, actionMeta);
                onChangeTrigger && onChangeTrigger(value, actionMeta);
              }}
              value={value}
              components={{ Option: CustomOption, DropdownIndicator }}
              placeholder={placeholder}
              styles={customStyles}
              closeMenuOnSelect={false}
              filterOption={customFilterOption}
              isSearchable={!isSearchable && !isDownIconClicked}
              onMenuClose={() => {
                setIsSearchable(false);
                setIsDownIconClicked(false);
              }}
              isDisabled={isReadOnly}
              menuShouldScrollIntoView={true}
              menuPlacement={isMobile ? "bottom" : "auto"}
              menuPosition="absolute"
            />
          ) : (
            <Select
              options={sortedOptions}
              onChange={(value, actionMeta) => {
                onChange(value, actionMeta);
                onChangeTrigger && onChangeTrigger(value, actionMeta);
                setIsSearchable(false);
                setIsDownIconClicked(false);
              }}
              value={value}
              components={{ Option: CustomOption, DropdownIndicator }}
              placeholder={placeholder}
              styles={customStyles}
              filterOption={customFilterOption}
              hideSelectedOptions={true}
              isSearchable={!isSearchable && !isDownIconClicked}
              onInputChange={handleInputChange}
              onMenuClose={() => {
                setIsSearchable(false);
                setIsDownIconClicked(false);
              }}
              isDisabled={isReadOnly}
              menuShouldScrollIntoView={true}
              menuPlacement={isMobile ? "bottom" : "auto"}
              menuPosition="absolute"
              isClearable={false}
              backspaceRemovesValue={true}
            />
          )}
        </div>
        {!isReadOnly && !isMultiple && isOnClearActive && value && onClear && (
          <GenericButton
            onClick={onClear}
            variant="icon"
            className="w-10 h-10 my-auto text-gray-500 hover:text-red-700"
          >
            <IoIosClose size={28} />
          </GenericButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(SelectInput);
