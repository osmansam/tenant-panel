import { PropsWithChildren, createContext, useContext, useState } from "react";
import { TabOption } from "../components/panelComponents/FormElements/TabInputScreen";
import { ColumnType } from "../components/panelComponents/shared/types";
import { RowPerPageEnum } from "../types";

// Type for form element values - consistent with types.ts
type FormElementValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | Date
  | null
  | undefined;

export type TabOrientation = "horizontal" | "vertical";

// Generic type for table rows - can be customized based on your data structure
export type TableRow = Record<string, unknown>;

type GeneralContextType = {
  sortConfigKey: {
    key: string;
    direction: "ascending" | "descending";
  } | null;
  setSortConfigKey: (
    config: {
      key: string;
      direction: "ascending" | "descending";
    } | null
  ) => void;

  userPageActiveTab: number;
  setUserPageActiveTab: (tab: number) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  expandedRows: { [key: string]: boolean };
  setExpandedRows: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  tableColumns: { [key: string]: ColumnType[] };
  setTableColumns: React.Dispatch<
    React.SetStateAction<{ [key: string]: ColumnType[] }>
  >;
  isSelectionActive: boolean;
  setIsSelectionActive: (isActive: boolean) => void;
  selectedRows: TableRow[];
  setSelectedRows: (rows: TableRow[]) => void;
  resetGeneralContext: () => void;
  isTabInputScreenOpen: boolean;
  setIsTabInputScreenOpen: (isOpen: boolean) => void;
  tabInputScreenOptions: TabOption[];
  setTabInputScreenOptions: (options: TabOption[]) => void;
  tabInputFormKey: string;
  setTabInputFormKey: (key: string) => void;
  tabInputInvalidateKeys?: {
    key: string;
    defaultValue: FormElementValue;
  }[];
  setTabInputInvalidateKeys: (
    keys: {
      key: string;
      defaultValue: FormElementValue;
    }[]
  ) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  tabOrientation: TabOrientation;
  setTabOrientation: (orientation: TabOrientation) => void;
  isExtraModalOpen: boolean;
  setIsExtraModalOpen: (open: boolean) => void;
};

const GeneralContext = createContext<GeneralContextType>({
  userPageActiveTab: 0,
  setUserPageActiveTab: () => {},
  isNotificationOpen: false,
  setIsNotificationOpen: () => {},
  sortConfigKey: null,
  setSortConfigKey: () => {},
  setCurrentPage: () => {},
  currentPage: 1,
  searchQuery: "",
  setSearchQuery: () => {},
  rowsPerPage: RowPerPageEnum.FIRST,
  setRowsPerPage: () => {},
  expandedRows: {},
  setExpandedRows: () => {},
  tableColumns: {},
  setTableColumns: () => {},
  isSelectionActive: false,
  setIsSelectionActive: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
  resetGeneralContext: () => {},
  isTabInputScreenOpen: false,
  setIsTabInputScreenOpen: () => {},
  tabInputScreenOptions: [],
  setTabInputScreenOptions: () => {},
  tabInputFormKey: "",
  setTabInputFormKey: () => {},
  tabInputInvalidateKeys: [],
  setTabInputInvalidateKeys: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  tabOrientation: "horizontal",
  setTabOrientation: () => {},
  isExtraModalOpen: false,
  setIsExtraModalOpen: () => {},
});

export const GeneralContextProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [tabInputFormKey, setTabInputFormKey] = useState<string>("");
  const [tabInputInvalidateKeys, setTabInputInvalidateKeys] = useState<
    { key: string; defaultValue: FormElementValue }[]
  >([]);
  const [tabInputScreenOptions, setTabInputScreenOptions] = useState<
    TabOption[]
  >([]);
  const [isTabInputScreenOpen, setIsTabInputScreenOpen] =
    useState<boolean>(false);
  const [userPageActiveTab, setUserPageActiveTab] = useState<number>(0);

  const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(RowPerPageEnum.FIRST);

  const [tableColumns, setTableColumns] = useState<{
    [key: string]: ColumnType[];
  }>({});
  const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);

  const [sortConfigKey, setSortConfigKey] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpenState] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved ? JSON.parse(saved) : true;
  });
  const setIsSidebarOpen = (open: boolean) => {
    localStorage.setItem("sidebar-open", JSON.stringify(open));
    setIsSidebarOpenState(open);
  };
  const [tabOrientation, setTabOrientationState] = useState<TabOrientation>(
    () => {
      const saved = localStorage.getItem("tab-orientation");
      return (saved as TabOrientation) || "horizontal";
    }
  );
  const setTabOrientation = (orientation: TabOrientation) => {
    localStorage.setItem("tab-orientation", orientation);
    setTabOrientationState(orientation);
  };

  const [isExtraModalOpen, setIsExtraModalOpen] = useState<boolean>(false);

  const resetGeneralContext = () => {
    setIsSelectionActive(false);
    setSelectedRows([]);
    setSortConfigKey(null);
    setExpandedRows({});
    setSearchQuery("");
    setCurrentPage(1);
    setIsNotificationOpen(false);
    setIsTabInputScreenOpen(false);
    setTabInputScreenOptions([]);
    setTabInputFormKey("");
    setTabInputInvalidateKeys([]);
  };

  return (
    <GeneralContext.Provider
      value={{
        userPageActiveTab,
        setUserPageActiveTab,
        isNotificationOpen,
        setIsNotificationOpen,
        tableColumns,
        setTableColumns,
        sortConfigKey,
        setSortConfigKey,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        expandedRows,
        setExpandedRows,
        searchQuery,
        setSearchQuery,
        isSelectionActive,
        setIsSelectionActive,
        selectedRows,
        setSelectedRows,
        resetGeneralContext,
        isTabInputScreenOpen,
        setIsTabInputScreenOpen,
        tabInputScreenOptions,
        setTabInputScreenOptions,
        tabInputFormKey,
        setTabInputFormKey,
        tabInputInvalidateKeys,
        setTabInputInvalidateKeys,
        isSidebarOpen,
        setIsSidebarOpen,
        tabOrientation,
        setTabOrientation,
        isExtraModalOpen,
        setIsExtraModalOpen,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
export const useGeneralContext = () => useContext(GeneralContext);
