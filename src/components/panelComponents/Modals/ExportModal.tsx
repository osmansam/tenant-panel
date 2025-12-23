import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosClose } from "react-icons/io";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { Field } from "../../../utils/api/container";
import { GenericButton } from "../FormElements/GenericButton";

const humanize = (key: string) =>
  key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const getFieldLabel = (field: Field): string => {
  return field.frontend?.displayName || humanize(field.name);
};

type Props = {
  isOpen: boolean;
  close: () => void;
  fields: Field[];
  onExport: (
    selectedFields: string[],
    includeSearch: boolean,
    includeFilters: boolean,
    exportScope: "all" | "currentPage" | "numberOfPages",
    pageCount?: number
  ) => void;
  schemaName: string;
  currentPage: number;
  totalPages: number;
};

export default function ExportModal({
  isOpen,
  close,
  fields,
  onExport,
  schemaName,
  currentPage,
  totalPages,
}: Props) {
  const { t } = useTranslation();

  // Initialize with all fields selected using useMemo
  const defaultSelectedFields = useMemo(
    () => fields.map((f) => f.name),
    [fields]
  );

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [includeSearch, setIncludeSearch] = useState(true);
  const [includeFilters, setIncludeFilters] = useState(true);
  const [exportScope, setExportScope] = useState<
    "all" | "currentPage" | "numberOfPages"
  >("all");
  const [pageCount, setPageCount] = useState<number>(1);

  // Reset to defaults when modal opens
  useEffect(() => {
    if (isOpen && selectedFields.length === 0) {
      setSelectedFields(defaultSelectedFields);
    }
  }, [isOpen, selectedFields.length, defaultSelectedFields]);

  const handleToggleField = (fieldName: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldName)
        ? prev.filter((f) => f !== fieldName)
        : [...prev, fieldName]
    );
  };

  const handleSelectAll = () => {
    if (selectedFields.length === fields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(fields.map((f) => f.name));
    }
  };

  const handleExport = () => {
    onExport(
      selectedFields,
      includeSearch,
      includeFilters,
      exportScope,
      exportScope === "numberOfPages" ? pageCount : undefined
    );
    // Reset state when closing
    setSelectedFields(fields.map((f) => f.name));
    setIncludeSearch(true);
    setIncludeFilters(true);
    setExportScope("all");
    setPageCount(1);
    close();
  };

  if (!isOpen) return null;

  return (
    <div
      className="__className_a182b8 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-md shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 max-w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {t("Export {{name}}", { name: schemaName })}
          </h2>
          <IoIosClose
            className="text-3xl cursor-pointer hover:bg-gray-100 rounded-full"
            onClick={close}
          />
        </div>

        <div className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[70vh]">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-lg">{t("Select Fields")}</h3>
            <GenericButton
              onClick={handleSelectAll}
              className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
            >
              {selectedFields.length === fields.length
                ? t("Deselect All")
                : t("Select All")}
            </GenericButton>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
            {fields.map((field) => (
              <div
                key={field.name}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
              >
                <CheckSwitch
                  checked={selectedFields.includes(field.name)}
                  onChange={() => handleToggleField(field.name)}
                />
                <span
                  className="text-sm truncate cursor-pointer"
                  title={getFieldLabel(field)}
                  onClick={() => handleToggleField(field.name)}
                >
                  {t(getFieldLabel(field))}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-2 flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{t("Export Scope")}</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="exportScope"
                  value="all"
                  checked={exportScope === "all"}
                  onChange={() => setExportScope("all")}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm">{t("All Data")}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="exportScope"
                  value="currentPage"
                  checked={exportScope === "currentPage"}
                  onChange={() => setExportScope("currentPage")}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm">
                  {t("This Page")} ({t("Page")} {currentPage})
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="exportScope"
                  value="numberOfPages"
                  checked={exportScope === "numberOfPages"}
                  onChange={() => setExportScope("numberOfPages")}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm">{t("Number of Pages")}</span>
              </label>

              {exportScope === "numberOfPages" && (
                <div className="ml-6 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={pageCount}
                    onChange={(e) =>
                      setPageCount(
                        Math.max(
                          1,
                          Math.min(totalPages, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="border border-gray-300 rounded px-3 py-1.5 w-20 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    {t("of")} {totalPages} {t("pages")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4 mt-2 flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{t("Options")}</h3>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIncludeSearch(!includeSearch)}
              >
                <CheckSwitch
                  checked={includeSearch}
                  onChange={() => setIncludeSearch(!includeSearch)}
                />
                <span>{t("Include Current Search")}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIncludeFilters(!includeFilters)}
              >
                <CheckSwitch
                  checked={includeFilters}
                  onChange={() => setIncludeFilters(!includeFilters)}
                />
                <span>{t("Include Active Filters")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <GenericButton
            onClick={close}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            {t("Cancel")}
          </GenericButton>
          <GenericButton
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={selectedFields.length === 0}
          >
            {t("Export")}
          </GenericButton>
        </div>
      </div>
    </div>
  );
}
