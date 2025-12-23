import React from "react";

interface H5Props {
  children: React.ReactNode;
  className?: string;
}

const H5: React.FC<H5Props> = ({ children, className = "" }) => {
  return (
    <h5 className={`text-base font-medium leading-6 ${className}`}>
      {children}
    </h5>
  );
};

export default H5;
