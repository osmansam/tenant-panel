"use client";

import { useEffect, useState, type RefObject } from "react";

/** Stop animation clocks outside the nearby viewport or in a background tab. */
export function useAnimationVisibility(target: RefObject<HTMLElement | null>): boolean {
  // Match server markup; effects resolve browser visibility after mounting.
  const [nearViewport, setNearViewport] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const doc = element.ownerDocument;
    const updateDocument = () => setDocumentVisible(!doc.hidden);
    updateDocument();
    doc.addEventListener("visibilitychange", updateDocument);

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      const entry = entries.find(entry => entry.target === element);
      if (entry) setNearViewport(entry.isIntersecting);
    }, { rootMargin: "200px" });
    observer?.observe(element);

    return () => {
      doc.removeEventListener("visibilitychange", updateDocument);
      observer?.disconnect();
    };
  }, [target]);

  return nearViewport && documentVisible;
}
