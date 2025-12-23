import React from "react";

interface P1Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const P1: React.FC<P1Props> = ({ children, className = "", style }) => {
  return (
    <p className={`text-base ${className}`} style={style}>
      {children}
    </p>
  );
};

export default P1;
