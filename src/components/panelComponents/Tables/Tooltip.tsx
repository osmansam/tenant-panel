import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export default function CustomTooltip({ children, content }: Props) {
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
            transform: "translateX(-20%)",
            top: "100%",
            left: "30%",
            marginBottom: "1px",
            width: "300px",
            overflow: "auto",
            padding: "5px",
            backgroundColor: "#fff",
            color: "black",
            borderRadius: "6px",
            border: "1px solid #ccc",
            whiteSpace: "normal",
            zIndex: "9999",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
