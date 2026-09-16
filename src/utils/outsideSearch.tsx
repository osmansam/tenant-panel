import TextInput from "../components/panelComponents/FormElements/TextInput";
import { FormElementsState } from "../types";

export type OutsideSearchProps = {
  placeholder?: string;
  t: (key: string) => string;
  filterPanelFormElements: FormElementsState;
  setFilterPanelFormElements: (
    state: FormElementsState | ((prev: FormElementsState) => FormElementsState)
  ) => void;
  extraProps?: React.ComponentProps<typeof TextInput>;
};
export const outsideSearch = ({
  placeholder,
  t,
  filterPanelFormElements,
  setFilterPanelFormElements,
  extraProps,
}: OutsideSearchProps) => (
  <TextInput
    type="text"
    value={filterPanelFormElements.search}
    isDebounce
    onChange={(value) =>
      setFilterPanelFormElements((prev) => ({ ...prev, search: value }))
    }
    {...extraProps}
    placeholder={placeholder?.trim() ? placeholder : extraProps?.placeholder ?? t("Search")}
  />
);
