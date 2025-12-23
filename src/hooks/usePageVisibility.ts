import { useEffect, useState } from "react";

function getVisibility() {
  if (typeof document === "undefined") return true;

  if (window.innerWidth > 768) return true;
  return document.visibilityState;
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getVisibility());

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(getVisibility() === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Also listen to resize events to re-evaluate when the window size changes
    window.addEventListener("resize", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
