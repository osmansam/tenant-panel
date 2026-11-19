import { useEffect, useRef } from "react";
import { movePageSection } from "../../visualBuilder/gridSections";
import type { GridSection } from "../../types/page";
import type { Section as DesignerPageSection } from "../../utils/api/page";
import { moveArrayItem } from "../../utils/pageDesignerTableConfig";
import type { StructureItem } from "./useDesignerState";

interface UseSectionDragOptions {
  structure: StructureItem[];
  sections: GridSection[];
  pageSections?: DesignerPageSection[];
  selectedSection: number | null;
  setSelectedSection: (index: number | null) => void;
  onChange: (sections: GridSection[]) => void;
  onReorderPageSections?: (sections: DesignerPageSection[]) => void;
}

export function useSectionDrag({
  structure,
  sections,
  pageSections,
  selectedSection,
  setSelectedSection,
  onChange,
  onReorderPageSections,
}: UseSectionDragOptions) {
  const structureNavRef = useRef<HTMLElement>(null);
  const orderFocus = useRef<{ position: number; direction: -1 | 1 } | null>(null);

  useEffect(() => {
    const request = orderFocus.current;
    if (!request) return;
    const row = structureNavRef.current?.querySelector<HTMLElement>(
      `[data-page-section-position="${request.position}"]`,
    );
    const target =
      row?.querySelector<HTMLElement>(
        `button[data-order-direction="${request.direction}"]:not(:disabled)`,
      ) ||
      row?.querySelector<HTMLElement>("button[aria-current]") ||
      row;
    target?.focus();
    orderFocus.current = null;
  }, [structure]);

  const canReorderSections = !pageSections || !!onReorderPageSections;

  const moveSection = (from: number, direction: -1 | 1) => {
    const to = from + direction;
    if (!canReorderSections || to < 0 || to >= structure.length) return;
    const selectedPosition = structure.find(
      (entry) => entry.kind === "grid" && entry.index === selectedSection,
    )?.position;
    const movedPositions = moveArrayItem(
      structure.map((entry) => entry.position),
      from,
      direction,
    );
    if (selectedPosition !== undefined) {
      const gridPositions = new Set(
        structure
          .filter((entry) => entry.kind === "grid")
          .map((entry) => entry.position),
      );
      const newPosition = movedPositions.indexOf(selectedPosition);
      setSelectedSection(
        movedPositions
          .slice(0, newPosition)
          .filter((position) => gridPositions.has(position)).length,
      );
    }
    orderFocus.current = { position: to, direction };
    if (pageSections) onReorderPageSections?.(movePageSection(pageSections, from, to));
    else onChange(moveArrayItem(sections, from, direction));
  };

  return { structureNavRef, canReorderSections, moveSection };
}
