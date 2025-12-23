import TextInput from "../components/panelComponents/FormElements/TextInput";
import { FormElementsState } from "../types";

export type OutsideSearchProps = {
  t: (key: string) => string;
  filterPanelFormElements: FormElementsState;
  setFilterPanelFormElements: (
    state: FormElementsState | ((prev: FormElementsState) => FormElementsState)
  ) => void;
  extraProps?: React.ComponentProps<typeof TextInput>;
};
export const outsideSearch = ({
  t,
  filterPanelFormElements,
  setFilterPanelFormElements,
  extraProps,
}: OutsideSearchProps) => (
  <TextInput
    placeholder={t("Search")}
    type="text"
    value={filterPanelFormElements.search}
    isDebounce
    onChange={(value) =>
      setFilterPanelFormElements((prev) => ({ ...prev, search: value }))
    }
    {...extraProps}
  />
);
