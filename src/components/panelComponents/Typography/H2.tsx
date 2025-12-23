import React from "react";

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

const H2: React.FC<H2Props> = ({ children, className = "" }) => {
  return (
    <h2 className={`text-2xl font-medium leading-9 ${className}`}>
      {children}
    </h2>
  );
};

export default H2;
