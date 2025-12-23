import React from "react";

interface H3Props {
  children: React.ReactNode;
  className?: string;
}

const H3: React.FC<H3Props> = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-[21px] font-medium ${className}`}
      style={{ lineHeight: "31.5px" }}
    >
      {children}
    </h3>
  );
};

export default H3;
