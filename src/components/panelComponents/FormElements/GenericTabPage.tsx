import { useMemo, useState } from "react";
import { IconType } from "react-icons";
// import { GiGreatPyramid } from "react-icons/gi";
import { useGeneralContext } from "../../../context/General.context";
import { getIconByName } from "../../../utils/menuIcons";
import UnifiedTabPanel from "../TabPanel/UnifiedTabPanel";
import GenericPaginatedPage from "./GenericPaginatedPage";
import GenericUnpaginatedPage from "./GenericUnpaginatedPage";

type TabConfig = {
  schemaName: string;
  label?: string;
  icon?: IconType;
  iconName?: string; // Icon name string (e.g., "MdSportsEsports")
  includeFields?: string[];
  excludeFields?: string[];
  actionsEnabled?: boolean;
  isPaginated?: boolean; // Add isPaginated prop, default true
  constantFilter?: Record<string, unknown>; // Constant filter that won't be editable
};

type Props = {
  tabs: TabConfig[];
  showLocationSelector?: boolean;
  allowOrientationToggle?: boolean;
};

const humanize = (key: string) =>
  key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

export default function GenericTabPage({
  tabs,
  allowOrientationToggle = true,
}: Props) {
  const { setCurrentPage, setSearchQuery } = useGeneralContext();
  const [activeTab, setActiveTab] = useState(0);
  const builtTabs = useMemo(
    () =>
      tabs.map((t, idx) => {
        const label = t.label ?? humanize(t.schemaName);
        const isPaginated = t.isPaginated ?? true; // Default to true

        // Get icon from iconName string or use the icon prop
        let iconElement = undefined;
        if (t.iconName) {
          const IconComponent = getIconByName(t.iconName);
          iconElement = <IconComponent className="text-lg font-thin" />;
        } else if (t.icon) {
          iconElement = <t.icon className="text-lg font-thin" />;
        }

        return {
          number: idx,
          label,
          icon: iconElement,
          isDisabled: false,
          content: isPaginated ? (
            <GenericPaginatedPage
              schemaName={t.schemaName}
              includeFields={t.includeFields}
              excludeFields={t.excludeFields}
              actionsEnabled={t.actionsEnabled ?? true}
              constantFilter={t.constantFilter}
              customTitle={label}
            />
          ) : (
            <GenericUnpaginatedPage
              schemaName={t.schemaName}
              includeFields={t.includeFields}
              excludeFields={t.excludeFields}
              actionsEnabled={t.actionsEnabled ?? true}
            />
          ),
        };
      }),
    [tabs]
  );

  return (
    <>
      <div className="flex flex-col gap-2 h-full">
        <UnifiedTabPanel
          tabs={builtTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          additionalOpenAction={() => {
            setCurrentPage(1);
            setSearchQuery("");
          }}
          allowOrientationToggle={allowOrientationToggle}
        />
      </div>
    </>
  );
}
