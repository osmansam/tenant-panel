import type { FormElementsState } from "../types";

export const outsideSort = (
  key: string,
  filterPanelFormElements: FormElementsState,
  setFilterPanelFormElements: (state: FormElementsState) => void
) => {
  return (
    <th
      key={key}
      className="font-bold text-left cursor-pointer"
      onClick={() =>
        handleSort(key, filterPanelFormElements, setFilterPanelFormElements)
      }
    >
      <div className=" items-center cursor-pointer ">
        {filterPanelFormElements.sort === key &&
        filterPanelFormElements.asc === 0 ? (
          <p className="font-bold">↑</p>
        ) : (
          <p className="font-bold">↓</p>
        )}
      </div>
    </th>
  );
};

function handleSort(
  value: string,
  filterPanelFormElements: FormElementsState,
  setFilterPanelFormElements: (state: FormElementsState) => void
) {
  if (filterPanelFormElements.sort === value) {
    setFilterPanelFormElements({
      ...filterPanelFormElements,
      asc: filterPanelFormElements.asc === 1 ? 0 : 1,
    });
  } else {
    setFilterPanelFormElements({
      ...filterPanelFormElements,
      asc: 0,
      sort: value,
    });
  }
}
