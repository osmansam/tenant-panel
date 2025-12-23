import React, { PropsWithChildren, createContext, useContext } from "react";
import { useGeneralContext } from "../../../context/General.context";
import useIsLargeScreen from "../../../hooks/useIsLargeScreen";
import { Tab } from "../shared/types";
import { OrientationToggle } from "./OrientationToggle";
import TabPanel from "./TabPanel";
import VerticalTabPanel from "./VerticalTabPanel";

// TabPanel için local context
type TabPanelContextType = {
  allowOrientationToggle: boolean;
};

const TabPanelContext = createContext<TabPanelContextType>({
  allowOrientationToggle: false,
});

export const useTabPanelContext = () => useContext(TabPanelContext);

const TabPanelProvider = ({
  children,
  allowOrientationToggle = false,
}: PropsWithChildren<{ allowOrientationToggle?: boolean }>) => {
  return (
    <TabPanelContext.Provider value={{ allowOrientationToggle }}>
      {children}
    </TabPanelContext.Provider>
  );
};

type Props = {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  additionalClickAction?: () => void;
  additionalOpenAction?: () => void;
  topClassName?: string;
  filters?: React.ReactNode[];
  isLanguageChange?: boolean;
  sideClassName?: string;
  allowOrientationToggle?: boolean;
  // Sadece bazı ekranlarda (örn. Orders) toggle'ı TabPanel filtrelerine enjekte etmek için
  injectOrientationToggleToFilters?: boolean;
};

const UnifiedTabPanel: React.FC<Props> = ({
  allowOrientationToggle = false,
  filters,
  injectOrientationToggleToFilters = false,
  ...props
}) => {
  const { tabOrientation, setTabOrientation } = useGeneralContext();
  const isLargeScreen = useIsLargeScreen();

  // Mobile'da her zaman horizontal
  const actualOrientation = !isLargeScreen ? "horizontal" : tabOrientation;

  const TabComponent =
    actualOrientation === "vertical" ? VerticalTabPanel : TabPanel;

  // Toggle button'ı filter'ların başına ekle (yalnızca açıkça istenirse)
  const enhancedFilters = React.useMemo(() => {
    if (!injectOrientationToggleToFilters) return filters;

    if (!allowOrientationToggle || !isLargeScreen) {
      return filters;
    }

    const toggleButton = (
      <OrientationToggle
        key="orientation-toggle"
        orientation={tabOrientation}
        onChange={setTabOrientation}
      />
    );

    // Toggle button'ı her zaman en başa ekle (sağda ilk eleman olacak)
    return filters ? [toggleButton, ...filters] : [toggleButton];
  }, [
    allowOrientationToggle,
    isLargeScreen,
    tabOrientation,
    setTabOrientation,
    filters,
  ]);

  return (
    <TabPanelProvider allowOrientationToggle={allowOrientationToggle}>
      <TabComponent {...props} filters={enhancedFilters} />
    </TabPanelProvider>
  );
};

export default UnifiedTabPanel;
