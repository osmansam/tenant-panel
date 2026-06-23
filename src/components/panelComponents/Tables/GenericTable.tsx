import { Tooltip } from "@material-tailwind/react";
import "pdfmake/build/pdfmake";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFilePdf } from "react-icons/bs";
import { FaFileExcel, FaFileUpload } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { PiFadersHorizontal } from "react-icons/pi";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useGeneralContext } from "../../../context/General.context";
import {
  DateFormatEnum,
  DEFAULT_DATE_FORMAT,
  FormElementsState,
  RowPerPageEnum,
} from "../../../types";
import { Field } from "../../../utils/api/container";
import {
  outsideSearch,
  OutsideSearchProps,
} from "../../../utils/outsideSearch";
import { outsideSort } from "../../../utils/outsideSort";
import { GenericButton } from "../FormElements/GenericButton";
import ImageModal from "../Modals/ImageModal";
import { OrientationToggle } from "../TabPanel/OrientationToggle";
import { useTabPanelContext } from "../TabPanel/UnifiedTabPanel";
import { Caption, H4, H5, P1 } from "../Typography";
import {
  ActionType,
  ColumnType,
  FilterType,
  PanelFilterType,
  RowKeyType,
} from "../shared/types";
import ButtonTooltip from "./ButtonTooltip";
import ColumnActiveModal from "./ColumnActiveModal";
import EnterpriseCheckbox from "./EnterpriseCheckbox";
import ExpandCollapseIcon from "./ExpandCollapseIcon";
import FilterPanel from "./FilterPanel";
import IconButton from "./IconButton";
import SelectionToggleButton from "./SelectionToggleButton";
import CustomTooltip from "./Tooltip";
import "./table.css";

type PaginationProps = {
  totalPages: number;
  totalRows: number;
};
type OutsideSortProps = {
  filterPanelFormElements: FormElementsState;
  setFilterPanelFormElements: (state: FormElementsState) => void;
};

type Props<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  isDraggable?: boolean;
  onDragEnter?: (DraggedRow: T, TargetRow: T) => void;
  isActionsActive: boolean;
  columns: ColumnType[];
  isCollapsible?: boolean;
  rowKeys: RowKeyType<T>[];
  searchRowKeys?: RowKeyType<T>[];
  actions?: ActionType<T>[];
  isPdf?: boolean;
  collapsibleActions?: ActionType<T>[];
  title?: string;
  addButton?: ActionType<T>;
  addCollapsible?: ActionType<T>;
  filterPanel?: PanelFilterType;
  isColumnFilter?: boolean;
  imageHolder?: string;
  tooltipLimit?: number;
  rowsPerPageOptions?: number[];
  filters?: FilterType[];
  isRowsPerPage?: boolean;
  rowClassNameFunction?: (row: T) => string;
  rowStyleFunction?: (row: T) => React.CSSProperties;
  isSearch?: boolean;
  isPagination?: boolean;
  isActionsAtFront?: boolean;
  isCollapsibleCheckActive?: boolean;
  isExcel?: boolean;
  excelFileName?: string;
  pagination?: PaginationProps;
  outsideSortProps?: OutsideSortProps;
  outsideSearchProps?: OutsideSearchProps;
  selectionActions?: ActionType<T>[];
  isToolTipEnabled?: boolean;
  isEmtpyExcel?: boolean;
  showOrientationToggle?: boolean;
  onExcelUpload?: (items: Partial<T>[]) => void;
  dateFormat?: DateFormatEnum;
  containerFields?: Field[]; // Add container fields for type conversion
  onExcelExport?: () => void;
};

const GenericTable = <T,>({
  rows,
  columns,
  rowKeys,
  actions,
  title,
  addButton,
  filters,
  imageHolder,
  addCollapsible,
  isActionsActive = true,
  isDraggable = false,
  filterPanel,
  isColumnFilter = true,
  collapsibleActions,
  onDragEnter,
  outsideSortProps,
  outsideSearchProps,
  isSearch = true,
  isPdf = false,
  isExcel = false,
  isCollapsible = false,
  isToolTipEnabled = false,
  isPagination = true,
  isRowsPerPage = true,
  isActionsAtFront = false,
  isCollapsibleCheckActive = true,
  rowsPerPageOptions = [
    RowPerPageEnum.FIRST,
    RowPerPageEnum.SECOND,
    RowPerPageEnum.THIRD,
  ],
  searchRowKeys,
  tooltipLimit = 40,
  rowClassNameFunction,
  rowStyleFunction,
  pagination,
  selectionActions,
  showOrientationToggle,
  onExcelUpload,
  dateFormat = DEFAULT_DATE_FORMAT,
  containerFields,
  onExcelExport,
}: Props<T>) => {
  const { t } = useTranslation();

  // Helper function to convert value based on field type
  const convertValueByType = (value: unknown, fieldType: string): unknown => {
    if (value === null || value === undefined || value === "") {
      return value;
    }

    const type = fieldType.toLowerCase();
    const originalType = fieldType;

    // Handle string array types
    const isStringArray =
      type === "stringarray" ||
      originalType === "stringArray" ||
      type === "string[]" ||
      type === "array<string>";

    if (isStringArray) {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
      }
      return [];
    }

    // Handle int array types
    const isIntArray =
      type === "intarray" ||
      originalType === "intArray" ||
      type === "int[]" ||
      type === "array<int>";

    if (isIntArray) {
      if (Array.isArray(value)) {
        return value
          .map((item) => (typeof item === "string" ? parseInt(item, 10) : item))
          .filter((item) => !isNaN(item as number));
      }
      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => parseInt(item.trim(), 10))
          .filter((item) => !isNaN(item));
      }
      return [];
    }

    // Handle number array types
    const isNumberArray =
      type === "numberarray" ||
      originalType === "numberArray" ||
      type === "number[]" ||
      type === "array<number>";

    if (isNumberArray) {
      if (Array.isArray(value)) {
        return value
          .map((item) => (typeof item === "string" ? parseFloat(item) : item))
          .filter((item) => !isNaN(item as number));
      }
      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => parseFloat(item.trim()))
          .filter((item) => !isNaN(item));
      }
      return [];
    }

    // Handle number types (int, float, double, number, etc.)
    if (
      type.includes("int") ||
      type.includes("float") ||
      type.includes("double") ||
      type === "number"
    ) {
      const num = Number(value);
      return isNaN(num) ? value : num;
    }

    // Handle boolean types
    if (type === "boolean" || type === "bool") {
      if (typeof value === "boolean") return value;
      const strValue = String(value).toLowerCase();
      return strValue === "true" || strValue === "1";
    }

    // Handle date types
    if (type === "date" || type === "datetime") {
      if (value instanceof Date) return value;
      const dateValue = new Date(value as string);
      return isNaN(dateValue.getTime()) ? value : dateValue;
    }

    // Default: return as-is
    return value;
  };

  // Helper function to format dates
  const formatDate = (value: unknown): string | null => {
    if (!value) return null;
    try {
      // handle ISO strings safely
      const str = String(value);

      // Detect "YYYY-MM-DD" or "YYYY/MM/DD" manually
      const match = str.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);
      let date: Date;

      if (match) {
        const [, y, m, d] = match;
        // ✅ Create date in local time
        date = new Date(Number(y), Number(m) - 1, Number(d));
      } else {
        date = new Date(value as string | number | Date);
      }

      if (isNaN(date.getTime())) return null;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      switch (dateFormat) {
        case DateFormatEnum["DD/MM/YYYY"]:
          return `${day}/${month}/${year}`;
        case DateFormatEnum["DD-MM-YYYY"]:
          return `${day}-${month}-${year}`;
        case DateFormatEnum["YYYY/MM/DD"]:
          return `${year}/${month}/${day}`;
        case DateFormatEnum["YYYY-MM-DD"]:
          return `${year}-${month}-${day}`;
        case DateFormatEnum["MM-DD-YYYY"]:
          return `${month}-${day}-${year}`;
        case DateFormatEnum["MM/DD/YYYY"]:
        default:
          return `${month}/${day}/${year}`;
      }
    } catch {
      return null;
    }
  };

  const {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    expandedRows,
    searchQuery,
    setSearchQuery,
    setExpandedRows,
    setSortConfigKey,
    sortConfigKey,
    tableColumns,
    setTableColumns,
    selectedRows,
    setSelectedRows,
    isSelectionActive,
    setIsSelectionActive,
    tabOrientation,
    setTabOrientation,
  } = useGeneralContext();
  const { allowOrientationToggle } = useTabPanelContext();
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");
  const [isColumnActiveModalOpen, setIsColumnActiveModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showHeaderLeftButton, setShowHeaderLeftButton] = useState(false);
  const [showHeaderRightButton, setShowHeaderRightButton] = useState(false);
  const headerScrollRef = useRef<HTMLDivElement | null>(null);
  const [isExcelMenuOpen, setIsExcelMenuOpen] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  // Derive sortConfig from sortConfigKey instead of maintaining separate state
  const sortConfig = sortConfigKey
    ? {
        key: sortConfigKey.key,
        direction: sortConfigKey.direction,
      }
    : null;

  const handleUploadExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed");
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log("File selected:", file.name);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      console.log("File loaded");
      const buffer = e.target?.result;
      if (buffer) {
        try {
          const wb = XLSX.read(buffer, { type: "array" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          console.log("Excel data parsed:", data);

          if (!data || data.length === 0) {
            toast.error(t("No data found in the Excel file"));
            return;
          }

          const headers = data[0] as string[];
          console.log("Excel headers:", headers);

          // Map column keys to their translated names
          const columnMap = new Map<string, string>();
          usedColumns.forEach((col, index) => {
            if (col.correspondingKey) {
              columnMap.set(col.key, usedRowKeys[index]?.key as string);
            }
          });

          console.log("Column map:", Array.from(columnMap.entries()));

          // Create a field type map for quick lookup
          const fieldTypeMap = new Map<string, string>();
          if (containerFields) {
            containerFields.forEach((field) => {
              fieldTypeMap.set(field.name, field.type);
            });
          }

          const items = data.slice(1).map((row) => {
            const item: Record<string, unknown> = {};
            (row as unknown[]).forEach((cell: unknown, index: number) => {
              const header = headers[index];
              const fieldKey = columnMap.get(header);
              if (fieldKey) {
                // Convert value based on field type if available
                const fieldType = fieldTypeMap.get(fieldKey);
                const convertedValue = fieldType
                  ? convertValueByType(cell, fieldType)
                  : cell;
                item[fieldKey] = convertedValue;
              }
            });
            return item;
          });

          console.log("Processed items:", items);

          if (items.length > 0 && onExcelUpload) {
            console.log("Calling onExcelUpload with processed items");
            onExcelUpload(items as Partial<T>[]);
            toast.success(t(`${items.length} items uploaded successfully`));
          } else if (items.length === 0) {
            toast.warning(t("No valid items found in the Excel file"));
          } else {
            console.log("No onExcelUpload callback provided");
          }
        } catch (error) {
          console.error("Error parsing Excel file:", error);
          toast.error(t("Error reading Excel file"));
        }
      }
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast.error(t("Error reading file"));
    };
    reader.readAsArrayBuffer(file);
    // Reset the input so the same file can be uploaded again
    event.target.value = "";
  };

  const handleUploadClick = () => {
    console.log("Upload button clicked");
    console.log("Upload input ref:", uploadInputRef.current);
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
      console.log("File input clicked");
    } else {
      console.error("Upload input ref is null");
    }
  };

  useEffect(() => {
    if (!title) return;
    const existing = tableColumns[title];
    if (!existing || existing.length !== columns.length) {
      setTableColumns((prev) => ({
        ...prev,
        [title]: columns.map((column) => ({ ...column, isActive: true })),
      }));
    }
  }, [title, columns, setTableColumns, tableColumns]);

  const checkHeaderScrollButtons = () => {
    if (headerScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = headerScrollRef.current;
      setShowHeaderLeftButton(scrollLeft > 10);
      setShowHeaderRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollHeaderToDirection = (direction: "left" | "right") => {
    if (headerScrollRef.current) {
      const scrollAmount = 200;
      headerScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const usedColumns = title
    ? tableColumns[title]?.filter((column) => column.isActive)
    : columns;

  const usedRowKeys = title
    ? rowKeys.filter(
        (_rk, index) =>
          tableColumns[title]?.[isActionsAtFront ? index + 1 : index]?.isActive
      )
    : rowKeys;

  const baseRows = useMemo(() => rows ?? [], [rows]);

  const filteredRows = useMemo(() => {
    if (!isSearch) return baseRows;
    const keys = searchRowKeys ?? usedRowKeys;
    const q = searchQuery.trimStart().toLocaleLowerCase("tr-TR");
    if (!q) return baseRows;
    return baseRows.filter((row) =>
      keys.some((rowKey) => {
        const value = row[rowKey.key as keyof typeof row];
        if (typeof value === "string")
          return value.toLocaleLowerCase("tr-TR").includes(q);
        if (typeof value === "number") return value.toString().includes(q);
        if (typeof value === "boolean")
          return (value ? "true" : "false").includes(q);
        return false;
      })
    );
  }, [baseRows, isSearch, searchQuery, searchRowKeys, usedRowKeys]);

  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;
    const { key, direction } = sortConfig;
    return [...filteredRows].sort((a, b) => {
      const isSortable = (a["isSortable"] ?? true) && (b["isSortable"] ?? true);
      if (!isSortable) return 0;
      const aNum = Number(a[key]);
      const bNum = Number(b[key]);
      const isNumeric = !isNaN(aNum) && !isNaN(bNum);
      const valA = isNumeric ? aNum : String(a[key] ?? "").toLowerCase();
      const valB = isNumeric ? bNum : String(b[key] ?? "").toLowerCase();
      if (valA < valB) return direction === "ascending" ? -1 : 1;
      if (valA > valB) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig]);

  const usedTotalRows = pagination ? pagination.totalRows : sortedRows?.length;
  const totalPages = Math.ceil(usedTotalRows / rowsPerPage);
  const usedTotalPages = pagination ? pagination.totalPages : totalPages;

  const currentRows = useMemo(() => {
    if (!isRowsPerPage || pagination) return sortedRows;
    const start = (currentPage - 1) * rowsPerPage;
    const end = currentPage * rowsPerPage;
    return sortedRows?.slice(start, end);
  }, [sortedRows, isRowsPerPage, pagination, currentPage, rowsPerPage]);

  const sortRows = (key: string, direction: "ascending" | "descending") => {
    setSortConfigKey({ key, direction });
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    draggedRow: T
  ) => {
    e.dataTransfer.setData("draggedRow", JSON.stringify(draggedRow));
  };
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };
  const handleDrop = (
    e: React.DragEvent<HTMLTableRowElement>,
    targetRow: T
  ) => {
    e.preventDefault();
    const draggedRowData = e.dataTransfer.getData("draggedRow");
    const draggedRow: T = JSON.parse(draggedRowData);
    if (onDragEnter) onDragEnter(draggedRow, targetRow);
    setExpandedRows({});
  };

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowId]: !prevExpandedRows[rowId],
    }));
  };

  const actionOnClick = (action: ActionType<T>, row: T) => {
    if (action.setRow) action.setRow(row);
    if (action.onClick) action.onClick(row);
    if (action?.isModal && action.setIsModal) {
      if (isSelectionActive) {
        if (selectedRows.length === 0) {
          toast.error(
            t("Please select at least one row to perform this action.")
          );
          return;
        }
      }
      action?.setIsModal(true);
    } else if (action.isPath && action.path) {
      navigate(action.path);
    }
  };

  const generatePDF = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfMake = (window as any).pdfMake;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = [];
    data.push(
      usedColumns
        .filter((column) => column.correspondingKey)
        ?.map((column) => ({
          text: column.key,
          style: "tableHeader",
        }))
    );
    sortedRows?.forEach((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rowData: any[] = [];
      usedColumns?.forEach((column) => {
        if (column.correspondingKey) {
          const value = String(row[column.correspondingKey]);
          rowData.push(value);
        }
      });
      data.push([...rowData]);
    });
    const documentDefinition = {
      content: [
        {
          table: { headerRows: 1, body: data },
          layout: {
            fillColor: (rowIndex: number) =>
              rowIndex === 0
                ? "#000080"
                : rowIndex % 2 === 0
                ? "#d8d2d2"
                : "#ffffff",
          },
        },
      ],
      styles: {
        yourTextStyle: { font: "Helvetica" },
        header: { fontSize: 12 },
        tableHeader: { bold: true, color: "#fff" },
      },
    };
    pdfMake.fonts = {
      Roboto: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
    };
    pdfMake.createPdf(documentDefinition).open();
  };

  const renderActionButtons = (row: T, actions: ActionType<T>[]) => (
    <div className="flex flex-row my-auto h-full gap-3 justify-center items-center">
      {actions?.map((action, index) => {
        if (action?.isDisabled || action?.node === null) return null;
        if (action.node) return <div key={index}>{action.node(row)}</div>;
        return (
          <div
            key={index}
            className={`${
              action.icon &&
              "rounded-full  h-6 w-6 flex my-auto items-center justify-center"
            } ${action?.className}`}
            onClick={() => actionOnClick(action, row)}
          >
            {action.icon && (
              <ButtonTooltip content={action.name}>{action.icon}</ButtonTooltip>
            )}
            {action.isButton && (
              <GenericButton className={action?.buttonClassName}>
                {action.name}
              </GenericButton>
            )}
          </div>
        );
      })}
    </div>
  );

  const currentRowsContent = currentRows.map((row, rowIndex) => {
    const rowId = `row-${rowIndex}`;
    const isRowExpanded = expandedRows[rowId];
    return (
      <Fragment key={rowId}>
        <tr
          draggable={isDraggable}
          onDragStart={(e) => handleDragStart(e, row)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, row)}
          className={`${
            rowIndex !== currentRows.length - 1 && !isRowExpanded
              ? "border-b "
              : ""
          }  ${rowClassNameFunction?.(row) ?? ""}`}
          style={rowStyleFunction?.(row)}
        >
          {selectionActions && isSelectionActive && (
            <td className="w-6 h-6 mx-auto p-1">
              <div className="flex items-center justify-center">
                <EnterpriseCheckbox
                  checked={selectedRows.includes(row)}
                  onChange={() => {
                    if (selectedRows.includes(row)) {
                      setSelectedRows(
                        selectedRows.filter(
                          (selectedRow) => selectedRow !== row
                        )
                      );
                    } else {
                      setSelectedRows([...selectedRows, row]);
                    }
                  }}
                />
              </div>
            </td>
          )}
          {(!isCollapsibleCheckActive ||
            (isCollapsible &&
              row?.collapsible?.collapsibleRows?.length > 0)) && (
            <td className="text-center">
              <ExpandCollapseIcon
                isExpanded={isRowExpanded}
                onClick={() => toggleRowExpansion(rowId)}
                className="mx-auto"
              />
            </td>
          )}
          {isCollapsibleCheckActive &&
            row?.collapsible?.collapsibleRows?.length === 0 && (
              <td className="w-6 h-6 mx-auto p-1 "></td>
            )}
          {actions && isActionsAtFront && isActionsActive && (
            <td>{renderActionButtons(row, actions)}</td>
          )}
          {usedRowKeys?.map((rowKey, keyIndex) => {
            // Compute className - handle both string and function
            const computedClassName =
              typeof rowKey?.className === "function"
                ? rowKey.className(row)
                : rowKey?.className || "";

            const columnClassName =
              usedColumns?.[keyIndex]?.generalColumnClassName || "";

            if (rowKey.node) {
              return (
                <td
                  key={keyIndex}
                  className={`px-4 py-3 min-w-20 ${columnClassName}`}
                >
                  <span className={computedClassName}>{rowKey.node(row)}</span>
                </td>
              );
            }
            if (
              !rowKey?.isImage &&
              (row[rowKey.key as keyof T] === undefined ||
                row[rowKey.key as keyof T] === null ||
                row[rowKey.key as keyof T] === "")
            ) {
              return (
                <td
                  key={keyIndex}
                  className={`px-4 py-3 min-w-20 ${columnClassName}`}
                >
                  <span className={computedClassName}>-</span>
                </td>
              );
            }
            if (rowKey.isParseFloat) {
              const formattedValue = parseFloat(
                row[rowKey.key as keyof T] as string
              )
                .toFixed(2)
                .replace(/\.?0*$/, "");
              return (
                <td
                  key={keyIndex}
                  className={`px-4 py-3 min-w-20 ${columnClassName}`}
                >
                  <P1 className={computedClassName}>{formattedValue} ₺</P1>
                </td>
              );
            }

            // Format date if explicitly marked as date field
            const rawValue = row[rowKey.key as keyof T];
            const cellValue = rowKey.isDate
              ? formatDate(rawValue) || `${rawValue}`
              : `${rawValue}`;

            const displayValue =
              cellValue.length > tooltipLimit && isToolTipEnabled
                ? `${cellValue.substring(0, tooltipLimit)}...`
                : cellValue;
            let style: React.CSSProperties = {};

            if (rowKey.isOptional && rowKey.options) {
              const matchedOption = rowKey.options.find(
                (option) => option.label === String(row[rowKey.key as keyof T])
              );
              style = {
                ...style,
                color: matchedOption?.textColor,
                backgroundColor: matchedOption?.bgColor,
              };
              return (
                <td
                  key={keyIndex}
                  className={`px-4 py-3 min-w-32 md:min-w-0 ${columnClassName}`}
                  style={style}
                >
                  <P1
                    className={`w-fit px-2 py-1 rounded-md font-semibold ${computedClassName}`}
                    style={style}
                  >
                    {matchedOption?.label}
                  </P1>
                </td>
              );
            }
            return (
              <td
                key={keyIndex}
                className={`px-4 py-3 min-w-20 md:min-w-0 ${columnClassName}`}
                style={style}
              >
                {rowKey.isImage ? (
                  <img
                    src={(row[rowKey.key as keyof T] as string) || imageHolder}
                    alt="img"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => {
                      setImageModalSrc(
                        (row[rowKey.key as keyof T] as string) ?? imageHolder
                      );
                      setIsImageModalOpen(true);
                    }}
                  />
                ) : cellValue.length > tooltipLimit && isToolTipEnabled ? (
                  <CustomTooltip content={cellValue}>
                    <P1 className={computedClassName}>{displayValue}</P1>
                  </CustomTooltip>
                ) : (
                  <P1 className={computedClassName} style={style}>
                    {displayValue}
                  </P1>
                )}
              </td>
            );
          })}
          <td>
            {actions &&
              isActionsActive &&
              !(row?.isSortable === false) &&
              !(row?.isActionsDisabled ?? false) &&
              !isActionsAtFront &&
              renderActionButtons(row, actions)}
            {actions &&
              isActionsActive &&
              (row?.isActionsDisabled ?? false) && (
                <div className="flex flex-row my-auto h-full gap-3 items-center">
                  <P1>{t("Constant")}</P1>
                </div>
              )}
          </td>
        </tr>
        {isRowExpanded && (
          <tr>
            <td
              colSpan={usedColumns?.length + (isActionsActive ? 1 : 0)}
              className="px-4 py-2 border-b transition-max-height duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: isRowExpanded ? "1000px" : "0" }}
            >
              {row?.collapsible?.collapsibleHeader && (
                <div className="w-[96%] mx-auto mb-2 bg-gray-100 rounded-md px-4 py-[0.3rem] flex flex-row justify-between items-center">
                  <H5>{row?.collapsible?.collapsibleHeader}</H5>
                  {addCollapsible && (
                    <GenericButton
                      variant="black"
                      size="sm"
                      className={`ml-auto ${addCollapsible.className || ""}`}
                      onClick={() => actionOnClick(addCollapsible, row)}
                    >
                      <H5>{addCollapsible.name}</H5>
                    </GenericButton>
                  )}
                </div>
              )}
              <table className="w-[96%] mx-auto">
                <thead className="w-full">
                  <tr>
                    {row?.collapsible?.collapsibleColumns.length > 0 &&
                      row?.collapsible?.collapsibleColumns?.map(
                        (column: ColumnType, index: number) => (
                          <th
                            key={index}
                            className={`text-left py-2 px-4 w-fit border-b  ${
                              column?.className || ""
                            } ${column?.generalColumnClassName || ""}`}
                          >
                            <h2 className="font-semibold text-sm ">
                              {column.key}
                            </h2>
                          </th>
                        )
                      )}
                  </tr>
                </thead>
                <tbody>
                  {row?.collapsible?.collapsibleRows.length > 0 &&
                    row?.collapsible?.collapsibleRows?.map(
                      (collapsibleRow: T, rowIndex: number) => (
                        <tr
                          key={rowIndex}
                          className={`${row?.collapsible?.className?.(
                            row?.collapsible?.collapsibleRows[rowIndex]
                          )} `}
                        >
                          {row?.collapsible?.collapsibleRowKeys?.map(
                            (rowKey: RowKeyType<T>, keyIndex: number) => {
                              const rawValue =
                                collapsibleRow[rowKey?.key as keyof T];
                              const cellValue = rowKey.isDate
                                ? formatDate(rawValue) || `${rawValue}`
                                : `${rawValue}`;

                              const computedClassName =
                                typeof rowKey?.className === "function"
                                  ? rowKey.className(collapsibleRow)
                                  : rowKey?.className || "";

                              const columnClassName =
                                row?.collapsible?.collapsibleColumns?.[keyIndex]
                                  ?.generalColumnClassName || "";

                              if (rowKey.node) {
                                return (
                                  <td
                                    key={keyIndex}
                                    className={`px-4 py-3 min-w-20 border-b ${columnClassName}`}
                                  >
                                    <P1 className={computedClassName}>
                                      {rowKey.node(collapsibleRow)}
                                    </P1>
                                  </td>
                                );
                              }
                              return (
                                <td
                                  key={keyIndex}
                                  className={`py-2 px-4 text-sm ${columnClassName} ${
                                    rowIndex !==
                                      row?.collapsible?.collapsibleRows.length -
                                        1 && "border-b"
                                  }`}
                                >
                                  {cellValue}
                                </td>
                              );
                            }
                          )}
                          {collapsibleActions && isActionsActive && (
                            <td
                              className={`py-2 px-4  ${
                                rowIndex !==
                                  row?.collapsible?.collapsibleRows.length -
                                    1 && "border-b"
                              }`}
                            >
                              {renderActionButtons(
                                { ...row, ...collapsibleRow },
                                collapsibleActions
                              )}
                            </td>
                          )}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </Fragment>
    );
  });

  useEffect(() => {
    checkHeaderScrollButtons();
    const container = headerScrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkHeaderScrollButtons);
      window.addEventListener("resize", checkHeaderScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkHeaderScrollButtons);
        window.removeEventListener("resize", checkHeaderScrollButtons);
      };
    }
  }, [usedColumns?.length]);

  const renderFilters = (isUpper: boolean) => {
    if (!filters) return null;
    return filters.map(
      (filter, index) =>
        filter.isUpperSide === isUpper &&
        !filter.isDisabled && (
          <div key={index} className="flex flex-row gap-2 items-center mr-1">
            {filter.label && (
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {filter.label}
              </span>
            )}
            {filter.node}
          </div>
        )
    );
  };

  const allVisibleSelected =
    selectedRows.length > 0 &&
    selectedRows.length === currentRows.length &&
    currentRows.every((r) => selectedRows.includes(r));

  return (
    <div
      className={`${
        filterPanel?.isFilterPanelActive ? "flex flex-row gap-2" : ""
      }`}
    >
      {filterPanel?.isFilterPanelActive && <FilterPanel {...filterPanel} />}
      <div
        className={`mx-auto w-full overflow-scroll no-scrollbar flex flex-col gap-4 __className_a182b8 `}
      >
        <div className="flex flex-row gap-4 justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            {isSearch && (
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t("Search")}
                  className="h-9 w-56 border border-gray-300 rounded-lg pl-9 pr-8 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg font-light"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            {outsideSearchProps && outsideSearch(outsideSearchProps)}
            {(showOrientationToggle ?? allowOrientationToggle) && (
              <div className="hidden sm:flex items-center">
                <OrientationToggle
                  orientation={tabOrientation}
                  onChange={setTabOrientation}
                />
              </div>
            )}
          </div>
          {!(selectionActions && isSelectionActive) && (
            <div className="hidden sm:flex flex-row flex-wrap gap-4 ml-auto relative z-10">
              {renderFilters(true)}
            </div>
          )}
        </div>
        <div className="flex flex-col bg-white border border-gray-100 shadow-sm rounded-lg relative z-0">
          <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap justify-between items-start sm:items-center gap-2 sm:gap-4 px-3 sm:px-6 border-b border-gray-200 py-3 sm:py-4">
            <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
              {selectionActions && (
                <Tooltip
                  content={
                    isSelectionActive
                      ? t("Close Selection")
                      : t("Activate Selection")
                  }
                  placement="top"
                >
                  <SelectionToggleButton
                    isActive={isSelectionActive}
                    onClick={() => {
                      if (isSelectionActive) setSelectedRows([]);
                      setIsSelectionActive(!isSelectionActive);
                    }}
                  />
                </Tooltip>
              )}
              {title && (
                <H4 className="mr-auto text-base sm:text-lg">{title}</H4>
              )}
            </div>
            {selectionActions &&
              isSelectionActive &&
              isActionsActive &&
              selectedRows.length > 0 &&
              renderActionButtons({} as unknown as T, selectionActions)}
            <div className="flex flex-row flex-wrap gap-2 sm:gap-4 relative items-center w-full sm:w-auto sm:ml-auto justify-end">
              {!(selectionActions && isSelectionActive) && (
                <>
                  {/* Alt filters (Total vs) */}
                  {renderFilters(false)}
                  {/* PDF Button */}
                  {isPdf && (
                    <Tooltip content={t("Export PDF")} placement="top">
                      <IconButton icon={<BsFilePdf />} onClick={generatePDF} />
                    </Tooltip>
                  )}
                  {/* Excel Button with Dropdown - mobilde de göster */}
                  {(isExcel || onExcelUpload) && (
                    <>
                      {onExcelUpload && (
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          onChange={handleUploadExcel}
                          style={{ display: "none" }}
                          ref={uploadInputRef}
                        />
                      )}
                      <Tooltip content={t("Excel")} placement="top">
                        <IconButton
                          icon={<FaFileExcel />}
                          onClick={() => {
                            setIsExcelMenuOpen((prev) => !prev);
                            setIsColumnActiveModalOpen(false);
                            setIsFilterModalOpen(false);
                          }}
                          active={isExcelMenuOpen}
                        />
                      </Tooltip>
                      {isExcelMenuOpen && (
                        <div className="absolute top-10 right-0 flex flex-col gap-2 bg-white rounded-md py-2 px-2 max-w-fit border border-gray-200 drop-shadow-lg z-[60] min-w-48">
                          {onExcelExport && (
                            <div
                              onClick={() => {
                                onExcelExport();
                                setIsExcelMenuOpen(false);
                              }}
                              className="flex flex-row items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                            >
                              <FaFileExcel className="text-green-600" />
                              <P1 className="text-sm font-medium">
                                {t("Download Excel")}
                              </P1>
                            </div>
                          )}
                          {onExcelUpload && (
                            <div
                              onClick={() => {
                                handleUploadClick();
                                setIsExcelMenuOpen(false);
                              }}
                              className="flex flex-row items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                            >
                              <FaFileUpload className="text-blue-600" />
                              <P1 className="text-sm font-medium">
                                {t("Upload Excel")}
                              </P1>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {/* Mobile Filter Button - dropdown style */}
                  {filters &&
                    filters.some((f) => f.isUpperSide && !f.isDisabled) && (
                      <>
                        <Tooltip content={t("Filters")} placement="top">
                          <IconButton
                            icon={<RiFilter3Line />}
                            onClick={() => {
                              setIsFilterModalOpen((prev) => !prev);
                              setIsExcelMenuOpen(false);
                              setIsColumnActiveModalOpen(false);
                            }}
                            active={isFilterModalOpen}
                            className="sm:hidden"
                          />
                        </Tooltip>
                        {isFilterModalOpen && (
                          <div className="absolute top-10 right-0 flex flex-col gap-2 bg-white rounded-md py-4 px-2 max-w-fit border-t border-gray-200 drop-shadow-lg z-50 min-w-64 sm:hidden">
                            {filters
                              .filter(
                                (filter) =>
                                  filter.isUpperSide && !filter.isDisabled
                              )
                              .map((filter, index) => (
                                <div
                                  key={index}
                                  className="flex flex-row justify-between items-center gap-4 pb-3 border-b border-gray-100 last:border-b-0"
                                >
                                  {filter.label && (
                                    <H5 className="text-sm font-semibold text-gray-700">
                                      {filter.label}
                                    </H5>
                                  )}
                                  <div className="flex items-center">
                                    {filter.node}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  {/* Column Filter Button */}
                  {isColumnFilter && (
                    <>
                      <Tooltip content={t("Filter Columns")} placement="top">
                        <IconButton
                          icon={<PiFadersHorizontal />}
                          onClick={() => {
                            setIsColumnActiveModalOpen((prev) => !prev);
                            setIsExcelMenuOpen(false);
                            setIsFilterModalOpen(false);
                          }}
                          active={isColumnActiveModalOpen}
                        />
                      </Tooltip>
                      {isColumnActiveModalOpen && title && (
                        <div className="absolute top-10 right-0 flex flex-col gap-2 bg-white rounded-md py-4 px-2 max-w-fit border-t border-gray-200  drop-shadow-lg z-50 min-w-64">
                          <ColumnActiveModal title={title} />
                        </div>
                      )}
                    </>
                  )}
                  {/* Add Button - mobilde yeni satırda */}
                  {addButton && !addButton.isDisabled && (
                    <GenericButton
                      variant="black"
                      size="sm"
                      className={`${
                        addButton.className || ""
                      } text-sm w-full sm:w-auto order-last sm:order-none`}
                      onClick={() =>
                        actionOnClick(addButton, {} as unknown as T)
                      }
                    >
                      <H5 className="text-xs sm:text-sm whitespace-nowrap">
                        {addButton.name}
                      </H5>
                    </GenericButton>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4 overflow-scroll no-scrollbar w-full  ">
            <div className="border border-gray-100 rounded-md w-full min-h-60 relative">
              {showHeaderLeftButton && (
                <button
                  onClick={() => scrollHeaderToDirection("left")}
                  className="absolute left-1 top-6 -translate-y-1/2 z-30 w-10 h-10 md:w-10 md:h-10 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-white hover:border-blue-400 hover:shadow-md transition-all duration-300 hover:scale-105 shadow-sm touch-manipulation"
                  aria-label="Scroll left"
                >
                  <FiChevronLeft className="text-gray-400 text-lg md:text-xl hover:text-blue-600 transition-colors" />
                </button>
              )}
              {showHeaderRightButton && (
                <button
                  onClick={() => scrollHeaderToDirection("right")}
                  className="absolute right-1 top-6 -translate-y-1/2 z-30 w-10 h-10 md:w-10 md:h-10 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center hover:bg-white hover:border-blue-400 hover:shadow-md transition-all duration-300 hover:scale-105 shadow-sm touch-manipulation"
                  aria-label="Scroll right"
                >
                  <FiChevronRight className="text-gray-400 text-lg md:text-xl hover:text-blue-600 transition-colors" />
                </button>
              )}
              <div
                ref={headerScrollRef}
                className={`overflow-auto scroll-smooth relative cursor-grab active:cursor-grabbing ${
                  rowsPerPage > 50 || rowsPerPage === RowPerPageEnum.ALL
                    ? "h-[600px]"
                    : "max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh]"
                }`}
              >
                <table className="bg-white w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      {selectionActions && isSelectionActive && (
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 shadow-sm px-4 py-3">
                          {selectionActions && isSelectionActive && (
                            <Tooltip content={t("Select All")} placement="top">
                              <div className="flex items-center justify-center">
                                <EnterpriseCheckbox
                                  checked={allVisibleSelected}
                                  indeterminate={
                                    selectedRows.length > 0 &&
                                    !allVisibleSelected
                                  }
                                  onChange={() => {
                                    if (allVisibleSelected) {
                                      setSelectedRows([]);
                                    } else {
                                      setSelectedRows(currentRows);
                                    }
                                  }}
                                />
                              </div>
                            </Tooltip>
                          )}
                        </th>
                      )}
                      {isCollapsible && (
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 w-12"></th>
                      )}
                      {usedColumns?.map((column, index) => {
                        if (column.node) return column.node();
                        return (
                          <th
                            key={index}
                            className={`sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 shadow-sm px-4 py-3.5 min-w-8 group ${
                              column?.generalColumnClassName || ""
                            }`}
                          >
                            <div
                              className={`text-xs uppercase tracking-wider font-semibold text-gray-700 w-max flex items-center gap-2 ${
                                column?.className || ""
                              } ${
                                index === usedColumns?.length - 1 &&
                                actions &&
                                isActionsActive
                                  ? "mx-auto justify-center"
                                  : ""
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {column?.isAddable && (
                                  <GoPlusCircle
                                    onClick={() => column?.onClick?.()}
                                    className="text-gray-500 hover:text-blue-600 transition-all cursor-pointer text-lg hover:scale-110"
                                  />
                                )}
                                <span className="select-none">
                                  {column.key}
                                </span>
                              </span>
                              <div className="inline-flex items-center">
                                {outsideSortProps &&
                                  column?.correspondingKey &&
                                  outsideSort(
                                    column.correspondingKey,
                                    outsideSortProps.filterPanelFormElements,
                                    outsideSortProps.setFilterPanelFormElements
                                  )}
                                {column.isSortable &&
                                  !outsideSortProps &&
                                  (sortConfig?.key ===
                                    usedRowKeys[index]?.key &&
                                  sortConfig?.direction === "ascending" ? (
                                    <button
                                      onClick={() =>
                                        sortRows(
                                          usedRowKeys[index].key as Extract<
                                            keyof T,
                                            string
                                          >,
                                          "descending"
                                        )
                                      }
                                      className="p-1 rounded hover:bg-gray-200/50 transition-colors"
                                      aria-label="Sort descending"
                                    >
                                      <FaChevronUp className="text-blue-600 text-sm" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        sortRows(
                                          usedRowKeys[index].key as Extract<
                                            keyof T,
                                            string
                                          >,
                                          "ascending"
                                        )
                                      }
                                      className="p-1 rounded hover:bg-gray-200/50 transition-colors opacity-0 group-hover:opacity-100"
                                      aria-label="Sort ascending"
                                    >
                                      <FaChevronDown className="text-gray-500 hover:text-blue-600 text-sm" />
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>{currentRowsContent}</tbody>
                </table>
              </div>
            </div>
            {rows.length > 0 && isRowsPerPage && (
              <div className="w-fit ml-auto flex flex-row gap-4">
                <div className="flex flex-row gap-2 px-6 items-center">
                  <Caption>{t("Rows per page")}:</Caption>
                  <select
                    className=" rounded-md py-2 flex items-center focus:outline-none h-8 text-xs cursor-pointer"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      const totalNewPages = Math.ceil(
                        usedTotalRows / Number(e.target.value)
                      );
                      if (currentPage > totalNewPages) {
                        setCurrentPage(Number(totalNewPages));
                      }
                    }}
                  >
                    {rowsPerPageOptions?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value={RowPerPageEnum.ALL}>{t("ALL")}</option>
                  </select>
                </div>
                {isPagination && (
                  <div className=" flex flex-row gap-2 items-center">
                    <Caption>
                      {Math.min(
                        (currentPage - 1) * rowsPerPage + 1,
                        usedTotalRows
                      )}
                      –{Math.min(currentPage * rowsPerPage, usedTotalRows)}{" "}
                      {"of"} {usedTotalRows}
                    </Caption>
                    <div className="flex flex-row gap-4">
                      <GenericButton
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(Number(currentPage) - 1);
                            setExpandedRows({});
                          }
                        }}
                        variant="ghost"
                        size="sm"
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </GenericButton>
                      <GenericButton
                        onClick={() => {
                          if (currentPage < usedTotalPages) {
                            setCurrentPage(Number(currentPage) + 1);
                            setExpandedRows({});
                          }
                        }}
                        variant="ghost"
                        size="sm"
                        disabled={currentPage === usedTotalPages}
                      >
                        {">"}
                      </GenericButton>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {actions?.map((action, index) => {
            if (action?.isModal && action?.isModalOpen && action?.modal) {
              return <div key={index}>{action.modal}</div>;
            }
          })}
          {selectionActions?.map((action, index) => {
            if (action?.isModal && action?.isModalOpen && action?.modal) {
              return <div key={index}>{action.modal}</div>;
            }
          })}
          {collapsibleActions?.map((action, index) => {
            if (action?.isModal && action?.isModalOpen && action?.modal) {
              return <div key={index}>{action.modal}</div>;
            }
          })}
          {addButton?.isModal && addButton?.isModalOpen && addButton?.modal && (
            <div>{addButton.modal}</div>
          )}
          {addCollapsible?.isModal &&
            addCollapsible?.isModalOpen &&
            addCollapsible?.modal && <div>{addCollapsible.modal}</div>}
          {isImageModalOpen && (
            <ImageModal
              isOpen={isImageModalOpen}
              close={() => {
                setIsImageModalOpen(false);
              }}
              img={imageModalSrc}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
