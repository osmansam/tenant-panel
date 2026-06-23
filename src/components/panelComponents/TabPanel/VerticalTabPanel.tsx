import React, { startTransition, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineMenu } from "react-icons/md";
import { useGeneralContext } from "../../../context/General.context";
import "../../../index.css";
import { GenericButton } from "../FormElements/GenericButton";
import { P1 } from "../Typography";
import { Tab } from "../shared/types";

type Props = {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  additionalClickAction?: () => void;
  additionalOpenAction?: () => void;
  sideClassName?: string; // Optional extra class for the sidebar container
  filters?: React.ReactNode[];
  isLanguageChange?: boolean;
};

const VerticalTabPanelResponsive: React.FC<Props> = ({
  additionalClickAction,
  tabs,
  activeTab,
  setActiveTab,
  sideClassName,
  filters,
}) => {
  const { t } = useTranslation();
  const { resetGeneralContext } = useGeneralContext();
  const adjustedTabs = useMemo(
    () =>
      tabs
        .filter((tab) => !tab.isDisabled)
        .map((tab, index) => ({
          ...tab,
          adjustedNumber: index,
        })),
    [tabs],
  );
  const activeAdjustedTab = useMemo(
    () => adjustedTabs.find((tab) => tab.adjustedNumber === activeTab),
    [activeTab, adjustedTabs],
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab: Tab) => {
    additionalClickAction && additionalClickAction();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setActiveTab(tab.adjustedNumber ?? tab.number);
    startTransition(() => {
      resetGeneralContext();
      activeAdjustedTab?.onCloseAction?.();
      tab.onOpenAction?.();
    });
  };

  return (
    <div className="flex flex-col border rounded-lg border-gray-200 bg-white w-[98%] mx-auto my-6">
      {/* Small Screen Top Bar */}
      <div className="md:hidden flex items-center p-4 border-b sticky top-16 ">
        <GenericButton onClick={() => setIsMenuOpen(true)} variant="icon">
          <MdOutlineMenu size={24} />
        </GenericButton>
        <div className="ml-4">
          <P1 className="text-blue-500">
            {t(activeAdjustedTab?.label || "")}
          </P1>
        </div>
      </div>

      <div className="flex flex-1 ">
        <div
          className={`hidden md:flex flex-col pt-10 ${
            sideClassName ? sideClassName : "w-48"
          } border-r h-fit sticky top-16`}
        >
          {adjustedTabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 flex flex-row items-center gap-2 cursor-pointer ${
                activeTab === tab.adjustedNumber ? "text-blue-500" : ""
              }`}
            >
              {tab.icon}
              <P1 className="inline ml-2">{t(tab.label)}</P1>
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0 overflow-x-auto">
          {filters && filters.length > 0 && (
            <div className="px-6 py-4 border-b flex flex-row flex-wrap gap-4 items-center justify-end">
              {filters.map((filter, idx) => (
                <div key={idx}>{filter}</div>
              ))}
            </div>
          )}
          <div className="p-4">
            {activeAdjustedTab?.content}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4 border-b flex items-center">
            <GenericButton onClick={() => setIsMenuOpen(false)} variant="icon">
              {/* Reusing the menu icon as a close button; you can swap it for a dedicated close icon if preferred */}
              <MdOutlineMenu size={24} />
            </GenericButton>
            <div className="ml-4">
              <P1 className="font-bold">
                {t(activeAdjustedTab?.label ?? "")}
              </P1>
            </div>
          </div>
          <div className="flex flex-col">
            {adjustedTabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-3 flex flex-row items-center gap-2 cursor-pointer ${
                  activeTab === tab.adjustedNumber ? "text-blue-500" : ""
                }`}
              >
                {tab.icon}
                <P1 className="inline ml-2">{t(tab.label)}</P1>
              </div>
            ))}
            {filters && filters.length > 0 && (
              <div className="p-4">
                {filters.map((filter, idx) => (
                  <div key={idx}>{filter}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalTabPanelResponsive;
