import React, { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useGeneralContext } from "../../../context/General.context";
import "../../../index.css";
import { P1 } from "../Typography";
import { Tab } from "../shared/types";

// active tab is required to be outside so that when the item added into the tab and tabpanel is rerendered, the active tab will not be reset.
type Props = {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  additionalClickAction?: () => void;
  additionalOpenAction?: () => void;
  topClassName?: string;
  filters?: React.ReactNode[];
  isLanguageChange?: boolean;
};

const TabPanel: React.FC<Props> = ({
  additionalClickAction,
  tabs,
  activeTab,
  setActiveTab,
  additionalOpenAction,
  topClassName,
  filters,
  isLanguageChange = true,
}) => {
  const { t } = useTranslation();
  const adjustedTabs = useMemo(
    () =>
      tabs
        .filter((item) => !item.isDisabled)
        .map((tab, index) => {
          return {
            ...tab,
            adjustedNumber: index,
          };
        }),
    [tabs],
  );
  const activeAdjustedTab = useMemo(
    () => adjustedTabs.find((tab) => tab.adjustedNumber === activeTab),
    [activeTab, adjustedTabs],
  );

  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number;
    left: number;
  }>({ width: 0, left: 0 });
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { i18n } = useTranslation();
  const { resetGeneralContext } = useGeneralContext();

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftButton(scrollLeft > 10);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToDirection = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    additionalOpenAction?.();
    if (tabsRef.current[activeTab] && containerRef.current) {
      const activeTabElement = tabsRef.current[activeTab];
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        setIndicatorStyle({ width: offsetWidth, left: offsetLeft });
        const leftScrollPosition =
          activeTabElement.offsetLeft +
          activeTabElement.offsetWidth / 2 -
          containerRef.current.offsetWidth / 2;
        containerRef.current.scroll({
          left: leftScrollPosition,
          behavior: "smooth",
        });
      }
    }

    if (activeTab > adjustedTabs.length - 1) {
      setActiveTab(
        adjustedTabs.find((tab) => tab.number === activeTab)?.adjustedNumber ||
          0
      );
    }
  }, [activeTab, tabs.length, i18n.language]);

  useEffect(() => {
    checkScrollButtons();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [tabs.length]);

  const handleTabChange = (tab: Tab) => {
    additionalClickAction && additionalClickAction();
    setActiveTab(tab?.adjustedNumber ?? tab.number);
    startTransition(() => {
      resetGeneralContext();
      activeAdjustedTab?.onCloseAction?.();
      tab?.onOpenAction?.();
    });
  };

  return (
    <div
      className={` flex flex-col border h-max rounded-lg border-gray-200 bg-white w-[98%] mx-auto __className_a182b8 `}
    >
      <div className="flex flex-row border-b relative">
        {/* Sol scroll butonu */}
        {showLeftButton && (
          <button
            onClick={() => scrollToDirection("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-white/85 via-white/70 to-transparent backdrop-blur-[2px] flex items-center justify-start hover:from-gray-50/85 transition-all duration-300 hover:scale-105 group animate-fade-in"
            aria-label="Scroll left"
          >
            <div className="ml-1 p-1.5 rounded-full hover:bg-gray-200/40 transition-colors shadow-sm">
              <FiChevronLeft className="text-gray-700 text-2xl group-hover:text-gray-900 transition-colors" />
            </div>
          </button>
        )}

        <div
          ref={containerRef}
          className={`flex flex-row relative overflow-x-auto scroll-smooth scrollbar-hide ${
            topClassName ? "py-5" : "py-6"
          }`}
        >
          {adjustedTabs
            .filter((tab) => !tab.isDisabled)
            .map((tab, index) => (
              <div
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                className={`px-4  flex flex-row items-center gap-2 cursor-pointer ${
                  activeTab === tab.adjustedNumber ? "text-blue-500" : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.icon}
                <P1 className="w-max">
                  {isLanguageChange ? t(tab.label) : tab.label}
                </P1>
              </div>
            ))}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
            }}
          />
        </div>

        {/* Sağ scroll butonu */}
        {showRightButton && (
          <button
            onClick={() => scrollToDirection("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-white/85 via-white/70 to-transparent backdrop-blur-[2px] flex items-center justify-end hover:from-gray-50/85 transition-all duration-300 hover:scale-105 group animate-fade-in"
            aria-label="Scroll right"
          >
            <div className="mr-1 p-1.5 rounded-full hover:bg-gray-200/40 transition-colors shadow-sm animate-pulse-once">
              <FiChevronRight className="text-gray-700 text-2xl group-hover:text-gray-900 transition-colors" />
            </div>
          </button>
        )}

        {/* Filter'lar sağda */}
        {filters && filters.length > 0 && (
          <div className="ml-auto flex items-center gap-4 pr-4">
            {filters.map((filter, idx) => (
              <div key={idx}>{filter}</div>
            ))}
          </div>
        )}
      </div>
      {activeAdjustedTab?.content && !activeAdjustedTab?.isDisabled && (
          <div className={`${topClassName ? "pt-3" : "py-6"}`}>
            {activeAdjustedTab.content}
          </div>
        )}
    </div>
  );
};

export default TabPanel;
