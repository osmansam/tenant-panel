import React from "react";

interface ExpandCollapseIconProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

const ExpandCollapseIcon: React.FC<ExpandCollapseIconProps> = ({
  isExpanded,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center w-6 h-6 cursor-pointer rounded transition-all duration-200 hover:bg-blue-50 group ${className}`}
      onClick={onClick}
    >
      <svg
        className={`w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-all duration-200 ${
          isExpanded ? "rotate-180" : "rotate-0"
        }`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ExpandCollapseIcon;
