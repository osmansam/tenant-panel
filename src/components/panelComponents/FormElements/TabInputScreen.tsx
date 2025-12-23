import React, { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useGeneralContext } from "../../../context/General.context";
import useIsLargeScreen from "../../../hooks/useIsLargeScreen";
import { FormElementsState } from "../../../types";
import { GenericInputType, InputTypes } from "../shared/types";
import { GenericButton } from "./GenericButton";

export type TabOption = {
  value: string | number;
  label: string;
  imageUrl?: string;
  keywords?: string[];
  triggerExtraModal?: boolean;
};

interface Props {
  options: TabOption[];
  topClassName?: string;
  formElements: FormElementsState;
  setFormElements: React.Dispatch<React.SetStateAction<FormElementsState>>;
  inputs: GenericInputType[];
  setForm?: React.Dispatch<React.SetStateAction<FormElementsState>>;
}

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

const TabInputScreen = ({
  options,
  topClassName,
  formElements,
  setFormElements,
  inputs,
  setForm,
}: Props) => {
  const {
    isTabInputScreenOpen,
    setIsTabInputScreenOpen,
    setTabInputScreenOptions,
    tabInputFormKey,
    tabInputInvalidateKeys,
    setTabInputFormKey,
    setTabInputInvalidateKeys,
  } = useGeneralContext();
  const [searchTerm, setSearchTerm] = useState("");
  const isLargeScreen = useIsLargeScreen();
  const listRef = useRef<HTMLDivElement>(null);

  if (!isTabInputScreenOpen) return null;
  const handleClose = () => {
    setIsTabInputScreenOpen(false);
    setTabInputScreenOptions([]);
  };
  const changedInput = inputs.find(
    (input) => input.formKey === tabInputFormKey
  );
  const handleSelect = (option: TabOption) => {
    setFormElements((prev: FormElementsState) => ({
      ...prev,
      [tabInputFormKey]: option.value,
    }));
    setForm?.((prev: FormElementsState) => ({
      ...prev,
      [tabInputFormKey]: option.value,
    }));
    if (tabInputInvalidateKeys) {
      tabInputInvalidateKeys.forEach((key) => {
        setFormElements((prev: FormElementsState) => ({
          ...prev,
          [key.key]: key.defaultValue,
        }));
      });
    }
    if (
      changedInput?.triggerTabOpenOnChangeFor &&
      changedInput?.handleTriggerTabOptions
    ) {
      const targetKey = changedInput.triggerTabOpenOnChangeFor;
      const targetInput = inputs.find((i) => i.formKey === targetKey);
      if (targetInput?.type === InputTypes.TAB) {
        setTabInputScreenOptions(
          (changedInput?.handleTriggerTabOptions(option.value) ??
            targetInput.options) as TabOption[]
        );
        listRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
        setTabInputFormKey(targetInput.formKey);
        setTabInputInvalidateKeys(targetInput.invalidateKeys ?? []);
      }
    } else if (
      changedInput?.extraModal &&
      changedInput?.setIsExtraModalOpen &&
      option?.triggerExtraModal
    ) {
      changedInput?.setIsExtraModalOpen(true);
    } else {
      setIsTabInputScreenOpen(false);
      setTabInputScreenOptions([]);
    }
  };
  const filtered = options.filter((opt) => {
    return (
      normalizeText(opt?.label).includes(normalizeText(searchTerm)) ||
      opt?.keywords?.some((keyword) =>
        normalizeText(keyword).includes(normalizeText(searchTerm))
      )
    );
  });
  const lower = normalizeText(searchTerm);
  const sortedFiltered = changedInput?.isSortDisabled
    ? filtered
    : filtered.sort((a, b) => {
        const aStarts = normalizeText(a.label).startsWith(lower);
        const bStarts = normalizeText(b.label).startsWith(lower);
        if (aStarts && !bStarts) return -1;
        if (bStarts && !aStarts) return 1;
        return a.label.localeCompare(b.label);
      });
  if (changedInput?.isExtraModalOpen && changedInput?.extraModal) {
    const node = changedInput.extraModal;
    const closeAll = () => {
      changedInput.setIsExtraModalOpen?.(false);
      setIsTabInputScreenOpen(false);
      setTabInputScreenOptions([]);
    };
    if (typeof node === "function") {
      const renderFn = node as unknown as (ctx: {
        isOpen: boolean;
        closeModal: () => void;
        setFormElements: React.Dispatch<
          React.SetStateAction<FormElementsState>
        >;
        formElements: FormElementsState;
        setForm?: React.Dispatch<React.SetStateAction<FormElementsState>>;
        formKey: string;
      }) => React.ReactNode;

      return (
        <>
          {renderFn({
            isOpen: true,
            closeModal: closeAll,
            setFormElements,
            formElements,
            setForm,
            formKey: tabInputFormKey,
          })}
        </>
      );
    }
    if (React.isValidElement(node)) {
      return React.cloneElement(node as React.ReactElement, {
        isOpen: true,
        closeModal: closeAll,
        setFormElements,
        formElements,
        setForm,
        formKey: tabInputFormKey,
      });
    }
    return <>{node}</>;
  }
  return (
    <div className={`${topClassName} bg-white rounded-lg shadow-lg p-2`}>
      {/* header: search + close */}
      <div className="w-full px-2 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={sortedFiltered.length > 0}
          placeholder="Search..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2 mt-2"
        />
        <GenericButton onClick={handleClose} variant="icon">
          <IoIosClose className="w-8 h-8 p-1 cursor-pointer hover:bg-gray-50 hover:rounded-full" />
        </GenericButton>
      </div>

      <div ref={listRef} className="p-2 overflow-y-auto no-scrollbar ">
        <div className="grid grid-cols-2 gap-4">
          {sortedFiltered.map((opt) => {
            const isSelected = formElements[tabInputFormKey] === opt.value;
            return (
              <GenericButton
                key={opt.value}
                onClick={() => handleSelect(opt)}
                variant="ghost"
                fullWidth={true}
                className={`
                  relative flex flex-col items-center justify-center
                  border rounded-lg p-3
                  hover:shadow-lg
                  min-h-[120px]
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  {opt?.imageUrl && isLargeScreen && (
                    <img
                      src={opt.imageUrl}
                      alt={opt.label}
                      className="w-16 h-16 object-cover rounded-md hidden sm:block"
                    />
                  )}
                  <span className="text-gray-800 text-center">{opt.label}</span>
                </div>
              </GenericButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MemoizedTabInputScreen = React.memo(TabInputScreen);
MemoizedTabInputScreen.displayName = "TabInputScreen";

export default MemoizedTabInputScreen;
