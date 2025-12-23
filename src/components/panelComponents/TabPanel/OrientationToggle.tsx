import { Tooltip } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { MdViewColumn, MdViewDay } from "react-icons/md";
import { TabOrientation } from "../../../context/General.context";

type Props = {
  orientation: TabOrientation;
  onChange: (orientation: TabOrientation) => void;
  className?: string;
};

export function OrientationToggle({
  orientation,
  onChange,
  className = "",
}: Props) {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={t(
        orientation === "horizontal"
          ? "Switch to Vertical Layout"
          : "Switch to Horizontal Layout"
      )}
      placement="top"
    >
      <button
        onClick={() =>
          onChange(orientation === "horizontal" ? "vertical" : "horizontal")
        }
        className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
        aria-label="Toggle tab orientation"
      >
        {orientation === "horizontal" ? (
          <MdViewColumn className="text-xl text-gray-600" />
        ) : (
          <MdViewDay className="text-xl text-gray-600" />
        )}
      </button>
    </Tooltip>
  );
}
