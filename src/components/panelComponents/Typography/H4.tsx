import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H4: React.FC<H4Props> = ({ children, className = "" }) => {
  return (
    <h4
      className={`text-lg font-medium ${className}`}
      style={{ lineHeight: "27px" }}
    >
      {children}
    </h4>
  );
};

export default H4;
