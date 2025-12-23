import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export default function ButtonTooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="z-[]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            transform: "translateX(-30%)",
            bottom: "100%",
            width: "max-content",
            padding: "4px 10px",
            overflow: "auto",
            backgroundColor: "black",
            color: "#fff",
            borderRadius: "6px",
            border: "1px solid black",
            whiteSpace: "normal",
            fontSize: "1rem",
            zIndex: "9999",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
