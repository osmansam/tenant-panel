import React from "react";

interface EnterpriseCheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  indeterminate?: boolean;
}

const EnterpriseCheckbox: React.FC<EnterpriseCheckboxProps> = ({
  checked,
  onChange,
  className = "",
  indeterminate = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer group ${className}`}
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
      />
      <div
        className={`w-5 h-5 rounded border-2 transition-all duration-200 ease-in-out flex items-center justify-center
          ${
            checked
              ? "bg-blue-600 border-blue-600 shadow-sm"
              : indeterminate
              ? "bg-blue-600 border-blue-600 shadow-sm"
              : "bg-white border-gray-300 group-hover:border-blue-400"
          }
          ${!checked && !indeterminate ? "group-hover:bg-blue-50" : ""}
        `}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 4L6 11.3333L2.66667 8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {indeterminate && !checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default EnterpriseCheckbox;
