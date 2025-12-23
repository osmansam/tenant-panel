import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = "",
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 border ${
        active
          ? "bg-blue-50 border-blue-200 text-blue-600"
          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
      } ${className}`}
    >
      <span className="text-lg">{icon}</span>
    </button>
  );
};

export default IconButton;
