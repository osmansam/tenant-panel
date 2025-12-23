// src/components/InfoBox.tsx
import React from "react";

interface InfoBoxProps {
  title: string;
  count: number;
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, count, className }) => {
  return (
    <div
      className={`flex flex-col gap-1 justify-center items-center ${className}`}
    >
      <h4 className="text-center text-[14px]  ">{title}</h4>
      <p className="font-thin ">{count}</p>
    </div>
  );
};

export default InfoBox;
