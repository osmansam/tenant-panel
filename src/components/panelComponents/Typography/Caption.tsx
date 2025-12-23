import React from "react";

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
}

const Caption: React.FC<CaptionProps> = ({ children, className = "" }) => {
  const combinedClassName = `text-xs font-normal leading-5 ${className}`;

  return (
    <p className={combinedClassName} style={{ lineHeight: "19px" }}>
      {children}
    </p>
  );
};

export default Caption;
