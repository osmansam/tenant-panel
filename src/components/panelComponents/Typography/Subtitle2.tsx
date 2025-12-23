import React from "react";

interface Subtitle2Props {
  children: React.ReactNode;
  className?: string;
}

const Subtitle2: React.FC<Subtitle2Props> = ({ children, className = "" }) => {
  return (
    <p className={`text-sm font-normal leading-6 ${className}`}>{children}</p>
  );
};

export default Subtitle2;
