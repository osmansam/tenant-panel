import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { TabOption } from "../components/panelComponents/FormElements/TabInputScreen";
import { useIsDesktop } from "../hooks/useIsDesktop";

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

type GeneralContextType = {
  userPageActiveTab: number;
  setUserPageActiveTab: (tab: number) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
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

  const isDesktop = useIsDesktop();
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(() => {
    return localStorage.getItem("sidebar-open") !== "false";
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSidebarOpen = isDesktop ? desktopSidebarOpen : mobileSidebarOpen;

  useEffect(() => {
    if (isDesktop) setMobileSidebarOpen(false);
  }, [isDesktop]);

  const setIsSidebarOpen = useCallback((open: boolean) => {
    if (isDesktop) {
      localStorage.setItem("sidebar-open", JSON.stringify(open));
      setDesktopSidebarOpen(open);
    } else {
      setMobileSidebarOpen(open);
    }
  }, [isDesktop]);
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
