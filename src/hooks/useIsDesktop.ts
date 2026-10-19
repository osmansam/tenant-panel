import { useEffect, useState } from "react";

/** Matches the md breakpoint used by the application navigation. */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);
  return isDesktop;
}
