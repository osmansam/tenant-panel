import { useEffect, useState } from "react";

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 640 : true
  );

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLarge;
};

export default useIsLargeScreen;
