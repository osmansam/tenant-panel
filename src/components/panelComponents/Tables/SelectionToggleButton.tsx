import React from "react";

interface SelectionToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const SelectionToggleButton: React.FC<SelectionToggleButtonProps> = ({
  isActive,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border ${
        isActive
          ? "bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 shadow-sm"
          : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
      } ${className}`}
    >
      <svg
        className={`w-5 h-5 transition-colors duration-200 ${
          isActive ? "text-white" : "text-gray-600"
        }`}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isActive ? (
          // Close icon (X)
          <>
            <path
              d="M6 6L14 14M14 6L6 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          // Selection icon (checkbox with checkmark)
          <>
            <rect
              x="3"
              y="3"
              width="14"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M6.5 10L9 12.5L13.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </button>
  );
};

export default SelectionToggleButton;
