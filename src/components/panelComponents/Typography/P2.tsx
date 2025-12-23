import React from "react";

interface P2Props {
  children: React.ReactNode;
  className?: string;
}

const P2: React.FC<P2Props> = ({ children, className = "" }) => {
  return (
    <p className={`text-sm font-normal leading-5 ${className}`}>{children}</p>
  );
};

export default P2;
