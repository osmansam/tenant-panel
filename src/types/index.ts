export type User = {
  _id: string;
  email: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export enum RowPerPageEnum {
  FIRST = 10,
  SECOND = 20,
  THIRD = 50,
  ALL = 10000000000,
}

export enum DateFormatEnum {
  "MM/DD/YYYY" = "MM/DD/YYYY",
  "DD/MM/YYYY" = "DD/MM/YYYY",
  "YYYY/MM/DD" = "YYYY/MM/DD",
  "DD-MM-YYYY" = "DD-MM-YYYY",
  "MM-DD-YYYY" = "MM-DD-YYYY",
  "YYYY-MM-DD" = "YYYY-MM-DD",
}

export const DEFAULT_DATE_FORMAT = DateFormatEnum["MM-DD-YYYY"];

export const NUMBER_FILTER_OPERATORS = [
  { value: "=", label: "=" },
  { value: "gte", label: ">=" },
  { value: "gt", label: ">" },
  { value: "lte", label: "<=" },
  { value: "lt", label: "<" },
] as const;

export const NO_IMAGE_URL =
  "https://res.cloudinary.com/dvbg/image/upload/ar_4:4,c_crop/c_fit,h_100/davinci/no-image_pyet1d.jpg";

// Type for form element values - covers all possible form input types
export type FormElementValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | Date
  | null
  | undefined;

export type FormElementsState = {
  [key: string]: FormElementValue;
};

export interface OptionType {
  value: string | number;
  label: string;
  imageUrl?: string;
  bgColor?: string;
  textColor?: string;
  [key: string]: string | number | boolean | undefined;
}
