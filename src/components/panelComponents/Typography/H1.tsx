import React from "react";

interface H1Props {
  children: React.ReactNode;
  className?: string;
}

const H1: React.FC<H1Props> = ({ children, className = "" }) => {
  const combinedClassName = `text-3xl font-medium  ${className}`;

  return <h1 className={combinedClassName}>{children}</h1>;
};

export default H1;
