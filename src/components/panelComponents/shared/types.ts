import { Dispatch, SetStateAction } from "react";

export interface Tab {
  number: number;
  content: React.ReactNode;
  icon?: React.ReactNode | null;
  label: string;
  isDisabled: boolean;
  onOpenAction?: () => void;
  onCloseAction?: () => void;
  adjustedNumber?: number;
}

export interface BreadCrumbItem {
  title: string;
  path: string;
}

export interface ActionType<T> {
  name: string;
  isModal?: boolean;
  className?: string;
  icon?: React.ReactNode;
  isButton?: boolean;
  buttonClassName?: string;
  isDisabled?: boolean;
  node?: (row: T) => React.ReactNode;
  modal?: React.ReactNode;
  onClick?: (row: T) => void;
  isModalOpen?: boolean;
  setIsModal?: (value: boolean) => void;
  setRow?: (value: T) => void;
  isPath?: boolean;
  path?: string;
}

export interface FilterType {
  node: React.ReactNode;
  label?: string;
  isUpperSide: boolean;
  isDisabled?: boolean;
}

export interface RowKeyType<T> {
  key: string;
  node?: (row: T) => React.ReactNode;
  isParseFloat?: boolean;
  isOptional?: boolean;
  isImage?: boolean;
  isDate?: boolean;
  isBoolean?: boolean;
  className?: string | ((row: T) => string);
  options?: {
    label: string;
    bgColor: string; // must be css color
    textColor: string; // must be css color
  }[];
}

export interface ColumnType {
  key: string;
  isSortable: boolean;
  isAddable?: boolean;
  className?: string;
  generalColumnClassName?: string;
  isActive?: boolean;
  correspondingKey?: string;
  node?: () => React.ReactNode;
  onClick?: () => void;
}
type FormElementValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | Record<string, unknown>
  | Record<string, unknown>[]
  | Date
  | File
  | null
  | undefined;

type FormElementsState = {
  [key: string]: FormElementValue;
};

export interface OptionType {
  value: string | number;
  label: string;
  imageUrl?: string;
  bgColor?: string;
  textColor?: string;
  sourceItem?: Record<string, unknown>;
  [key: string]: string | number | boolean | Record<string, unknown> | undefined;
}

export interface PanelFilterType {
  isFilterPanelActive: boolean;
  inputs: GenericInputType[];
  formElements: FormElementsState; // Add this to hold the current form state
  setFormElements: Dispatch<SetStateAction<FormElementsState>>; // Add this to update the form state
  closeFilters: () => void;
  isApplyButtonActive?: boolean;
  isFilterPanelCoverTable?: boolean;
  additionalFilterCleanFunction?: () => void;
  isCloseButtonActive?: boolean;
}
export interface GenericInputType {
  type: InputTypes;
  required: boolean;
  additionalType?: string;
  formKey: string;
  options?: OptionType[];
  label?: string;
  placeholder?: string;
  folderName?: string;
  inputClassName?: string;
  isMultiple?: boolean;
  isDatePicker?: boolean;
  suggestedOption?: { value: string; label: string }[] | null;
  isDateInitiallyOpen?: boolean;
  isTopFlexRow?: boolean;
  isDisabled?: boolean;
  minNumber?: number;
  isNumberButtonsActive?: boolean;
  isOnClearActive?: boolean;
  isAutoFill?: boolean;
  isMinNumber?: boolean;
  isDebounce?: boolean;
  isDatePickerLabel?: boolean;
  isArrowsEnabled?: boolean;
  triggerTabOpenOnChangeFor?: string;
  isSortDisabled?: boolean;
  setIsExtraModalOpen?: Dispatch<SetStateAction<boolean>>;
  isExtraModalOpen?: boolean;
  extraModal?: React.ReactNode;
  handleTriggerTabOptions?: (value: FormElementValue) => {
    value: FormElementValue;
    label: string;
    imageUrl?: string;
  }[];
  additionalOnChange?: (value: FormElementValue) => void;
  onChangeTrigger?: (value: FormElementValue) => void;
  disabledCondition?: string;
  requiredCondition?: string;
  sourceFilterCondition?: string;
  isReadOnly?: boolean;
  invalidateKeys?: {
    key: string;
    defaultValue:
      | string
      | boolean
      | number
      | undefined
      | Array<string>
      | Array<number>;
  }[];
  // Validation properties
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  validationMessage?: string;
  error?: string; // Validation error message to display
}

export interface FormKeyType {
  key: string;
  type: string;
}

export enum InputTypes {
  TEXT = "text",
  DATE = "date",
  NUMBER = "number",
  SELECT = "select",
  TEXTAREA = "textarea",
  IMAGE = "image",
  PASSWORD = "password",
  TIME = "time",
  COLOR = "color",
  CHECKBOX = "checkbox",
  CUSTOMINPUT = "customInput",
  HOUR = "hour",
  MONTHYEAR = "monthYear",
  TAB = "tab",
}
export enum FormKeyTypeEnum {
  STRING = "string",
  NUMBER = "number",
  COLOR = "color",
  DATE = "date",
  BOOLEAN = "boolean",
  CHECKBOX = "checkbox",
  STRING_ARRAY = "stringArray",
  NUMBER_ARRAY = "numberArray",
  INT_ARRAY = "intArray",
}

export interface NavigationType {
  name: string;
  path: string;
  additionalSubmitFunction?: () => void;
  canBeClicked: boolean;
}
