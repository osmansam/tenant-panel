import React from "react";

interface Subtitle1Props {
  children: React.ReactNode;
  className?: string;
}

const Subtitle1: React.FC<Subtitle1Props> = ({ children, className = "" }) => {
  return (
    <p className={`text-base font-normal leading-7 ${className}`}>{children}</p>
  );
};

export default Subtitle1;
