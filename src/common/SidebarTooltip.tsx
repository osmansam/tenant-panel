import React, { useEffect, useRef, useState } from "react";
import { useGeneralContext } from "../context/General.context";

type Props = {
  children: React.ReactNode;
  content: string;
};

export default function SidebarTooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const { isSidebarOpen } = useGeneralContext();

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsVisible(false);
    }
  }, [isSidebarOpen]);

  if (!content || isSidebarOpen) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={elementRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: "translateY(-50%)",
            animation: "fadeInTooltip 0.15s ease-in",
          }}
        >
          <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
            {content}
            <div
              className="absolute right-full top-1/2 -translate-y-1/2"
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "6px solid rgb(17, 24, 39)", // gray-900
              }}
            />
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeInTooltip {
          from {
            opacity: 0;
            transform: translateX(-4px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
      `}</style>
    </>
  );
}
