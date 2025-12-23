import React from "react";

interface OverlineProps {
  children: React.ReactNode;
  className?: string;
}

const Overline: React.FC<OverlineProps> = ({ children, className = "" }) => {
  return (
    <p
      className={`text-xs font-normal ${className}`}
      style={{ lineHeight: "31px" }}
    >
      {children}
    </p>
  );
};

export default Overline;
