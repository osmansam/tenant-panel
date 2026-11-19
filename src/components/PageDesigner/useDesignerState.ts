import { useEffect, useMemo, useState } from "react";
import { orderedPageSections } from "../../visualBuilder/gridSections";
import type { ComponentBlock, GridCell, GridSection } from "../../types/page";
import type {
  PageFilterDefinition,
  PageModel as RuntimePageModel,
  Section as DesignerPageSection,
} from "../../utils/api/page";
import { dependentBindings } from "../../utils/pageBindings";

export type StructureItem =
  | { kind: "grid"; index: number; position: number }
  | {
      kind: "visual";
      component: NonNullable<DesignerPageSection["component"]>;
      position: number;
    }
  | { kind: "other"; section: DesignerPageSection; position: number };

interface UseDesignerStateOptions {
  sections: GridSection[];
  pageSections?: DesignerPageSection[];
  focusedVisualId?: string | null;
  filters: PageFilterDefinition[];
  onChange: (sections: GridSection[]) => void;
  onFiltersChange?: (filters: PageFilterDefinition[]) => void;
  onNestedEditorChange?: (open: boolean) => void;
}

function nextCellPosition(section: GridSection): { row: number; column: number } {
  if (section.cells.length === 0) return { row: 1, column: 1 };
  const maxRow = Math.max(...section.cells.map((c) => c.row));
  const cellsInMaxRow = section.cells.filter((c) => c.row === maxRow);
  if (cellsInMaxRow.length >= section.columns) {
    return { row: maxRow + 1, column: 1 };
  }
  return { row: maxRow, column: cellsInMaxRow.length + 1 };
}

export function useDesignerState({
  sections,
  pageSections,
  focusedVisualId,
  filters,
  onChange,
  onFiltersChange,
  onNestedEditorChange,
}: UseDesignerStateOptions) {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedVisualId, setSelectedVisualId] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [isComponentEditorOpen, setIsComponentEditorOpen] = useState(false);
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  const [excelTargetSectionIndex, setExcelTargetSectionIndex] = useState<
    number | null
  >(null);
  const [filterModal, setFilterModal] = useState<{
    cellId: string;
    filter: PageFilterDefinition | null;
  } | null>(null);

  useEffect(() => {
    if (focusedVisualId) {
      setSelectedVisualId(focusedVisualId);
      setSelectedSection(null);
    }
  }, [focusedVisualId]);

  useEffect(() => {
    onNestedEditorChange?.(
      isComponentEditorOpen || Boolean(filterModal) || showExcelUploadModal,
    );
    return () => onNestedEditorChange?.(false);
  }, [isComponentEditorOpen, filterModal, showExcelUploadModal, onNestedEditorChange]);

  const structure = useMemo<StructureItem[]>(() => {
    let gridIndex = 0;
    const source: readonly (DesignerPageSection | GridSection)[] = pageSections
      ? orderedPageSections(pageSections)
      : sections;
    return source.flatMap<StructureItem>((section, index) => {
      const item = section as DesignerPageSection;
      if ((item.type === "grid" && item.grid) || (item.columns && item.cells)) {
        return [{ kind: "grid" as const, index: gridIndex++, position: index }];
      }
      if (item.component?.type === "custom" && item.component.props?.visualBuilder) {
        return [
          { kind: "visual" as const, component: item.component, position: index },
        ];
      }
      return [{ kind: "other" as const, section: item, position: index }];
    });
  }, [pageSections, sections]);

  const selectedVisual = structure.find(
    (item) => item.kind === "visual" && item.component.id === selectedVisualId,
  );
  const visual = selectedVisual?.kind === "visual" ? selectedVisual.component : null;

  const runtimePage = useMemo<RuntimePageModel>(
    () => ({
      name: "Designer",
      filters,
      sections: sections as unknown as RuntimePageModel["sections"],
    }),
    [filters, sections],
  );

  const allCellOptions = useMemo(
    () =>
      sections.flatMap((section, sectionIndex) =>
        section.cells.map((cell, cellIndex) => ({
          id: cell.id,
          label: `Section ${sectionIndex + 1}, Cell ${cellIndex + 1}`,
        })),
      ),
    [sections],
  );

  const savePageFilter = (next: PageFilterDefinition) => {
    onFiltersChange?.(
      filters.some((filter) => filter.id === next.id)
        ? filters.map((filter) => (filter.id === next.id ? next : filter))
        : [...filters, next],
    );
    setFilterModal(null);
  };

  const deletePageFilter = (filterId: string) => {
    const dependents = dependentBindings(runtimePage, {
      kind: "pageFilter",
      filterId,
    });
    if (dependents.length > 0) {
      alert(
        "This page filter is used by component request parameters. Remove those bindings before deleting it.",
      );
      return;
    }
    onFiltersChange?.(filters.filter((filter) => filter.id !== filterId));
  };

  const addSection = () => {
    setSelectedVisualId(null);
    const newSection: GridSection = { columns: 1, gap: 16, cells: [] };
    onChange([...sections, newSection]);
    setSelectedSection(sections.length);
  };

  const updateSection = (index: number, updates: Partial<GridSection>) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const deleteSection = (index: number) => {
    onChange(sections.filter((_, i) => i !== index));
    setSelectedSection(null);
  };

  const addCell = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const { row, column } = nextCellPosition(section);
    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row,
      column,
      components: [],
    };
    updateSection(sectionIndex, { cells: [...section.cells, newCell] });
  };

  const openCellExcelUpload = (sectionIndex: number) => {
    setExcelTargetSectionIndex(sectionIndex);
    setShowExcelUploadModal(true);
  };

  const handleCellExcelUploadSuccess = (
    _schemaName: string,
    component: ComponentBlock,
  ) => {
    if (excelTargetSectionIndex === null) return;
    const section = sections[excelTargetSectionIndex];
    const { row, column } = nextCellPosition(section);
    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row,
      column,
      components: [component],
    };
    updateSection(excelTargetSectionIndex, {
      cells: [...section.cells, newCell],
    });
    setExcelTargetSectionIndex(null);
  };

  const updateCell = (
    sectionIndex: number,
    cellId: string,
    updates: Partial<GridCell>,
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId ? { ...cell, ...updates } : cell,
    );
    updateSection(sectionIndex, { cells });
  };

  const deleteCell = (sectionIndex: number, cellId: string) => {
    const section = sections[sectionIndex];
    if (
      filters.some(
        (filter) =>
          filter.placement.kind === "cell" && filter.placement.cellId === cellId,
      )
    ) {
      alert(
        "This cell contains page filters. Move or delete those filters before deleting the cell.",
      );
      return;
    }
    const cell = section.cells.find((candidate) => candidate.id === cellId);
    const hasDependents = (cell?.components || []).some(
      (component) =>
        dependentBindings(runtimePage, {
          kind: "component",
          componentId: component.id,
        }).length > 0,
    );
    if (hasDependents) {
      alert(
        "This cell contains component outputs used by request parameters. Remove those bindings before deleting the cell.",
      );
      return;
    }
    updateSection(sectionIndex, {
      cells: section.cells.filter((c) => c.id !== cellId),
    });
    setSelectedCell(null);
  };

  const deleteComponent = (
    sectionIndex: number,
    cellId: string,
    componentId: string,
  ) => {
    const section = sections[sectionIndex];
    if (
      dependentBindings(runtimePage, {
        kind: "component",
        componentId,
      }).length > 0
    ) {
      alert(
        "This component has outputs used by request parameters. Remove those bindings before deleting the component.",
      );
      return;
    }
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? {
            ...cell,
            components: cell.components.filter((c) => c.id !== componentId),
          }
        : cell,
    );
    updateSection(sectionIndex, { cells });
  };

  return {
    selectedSection,
    setSelectedSection,
    selectedVisualId,
    setSelectedVisualId,
    selectedCell,
    setSelectedCell,
    isComponentEditorOpen,
    setIsComponentEditorOpen,
    showExcelUploadModal,
    setShowExcelUploadModal,
    filterModal,
    setFilterModal,
    structure,
    visual,
    runtimePage,
    allCellOptions,
    savePageFilter,
    deletePageFilter,
    addSection,
    updateSection,
    deleteSection,
    addCell,
    openCellExcelUpload,
    handleCellExcelUploadSuccess,
    updateCell,
    deleteCell,
    deleteComponent,
  };
}
