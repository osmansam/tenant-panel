import React, { useEffect, useState } from "react";
import { FiGrid, FiPlus, FiUpload } from "react-icons/fi";
import { Input, Select } from "../ui";
import { ComponentBlock, GridCell, GridSection } from "../../types/page";
import { ContainerModel } from "../../utils/api/container";
import type { PageFilterDefinition, PageModel as RuntimePageModel } from "../../utils/api/page";
import { getDesignerEditableCellId } from "../../utils/pageDesignerTableConfig";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { CellEditor } from "./CellEditor";
import { ComponentModal } from "./ComponentModal";

export interface SectionEditorProps {
  section: GridSection;
  sectionIndex: number;
  onVisualComponentEdit?: (componentId: string) => void;
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  page: RuntimePageModel;
  filters: PageFilterDefinition[];
  onUpdateSection: (updates: Partial<GridSection>) => void;
  onEditorOpenChange: (open: boolean) => void;
  onAddCell: () => void;
  onAddCellWithExcel: () => void;
  onUpdateCell: (cellId: string, updates: Partial<GridCell>) => void;
  onDeleteCell: (cellId: string) => void;
  onDeleteComponent: (cellId: string, componentId: string) => void;
  onCommitComponent: (
    cellId: string,
    component: ComponentBlock,
    editingComponentId?: string,
  ) => Promise<void> | void;
  onAddPageFilter: (cellId: string) => void;
  onEditPageFilter: (cellId: string, filter: PageFilterDefinition) => void;
  onDeletePageFilter: (filterId: string) => void;
  selectedCell: string | null;
  setSelectedCell: (cellId: string | null) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  sectionIndex,
  onVisualComponentEdit,
  schemas,
  containerOptions,
  containers,
  page,
  filters,
  onUpdateSection,
  onEditorOpenChange,
  onAddCell,
  onAddCellWithExcel,
  onUpdateCell,
  onDeleteCell,
  onDeleteComponent,
  onCommitComponent,
  onAddPageFilter,
  onEditPageFilter,
  onDeletePageFilter,
  selectedCell,
  setSelectedCell,
}) => {
  const [showComponentModal, setShowComponentModal] = useState(false);
  useEffect(() => {
    onEditorOpenChange(showComponentModal);
    return () => onEditorOpenChange(false);
  }, [showComponentModal, onEditorOpenChange]);
  const [currentCellId, setCurrentCellId] = useState<string | null>(null);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);

  const openComponentModal = (cellId: string, component?: ComponentBlock) => {
    if (component?.type === "custom" && component.props?.visualBuilder && onVisualComponentEdit) {
      onVisualComponentEdit(component.id);
      return;
    }
    const editableCellId = getDesignerEditableCellId(cellId);
    if (editableCellId !== cellId) {
      onUpdateCell(cellId, { id: editableCellId });
    }
    setCurrentCellId(editableCellId);
    setEditingComponent(component || null);
    setShowComponentModal(true);
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-4 p-4">
      {/* Section Settings */}
      <section data-testid="section-layout-toolbar" aria-labelledby="section-settings-title" className="flex flex-col gap-3 rounded-ui-lg border border-ui-border bg-ui-surface p-3 lg:flex-row lg:items-end">
        <div className="min-w-44 lg:self-center">
          <p className="text-[11px] font-medium uppercase tracking-wide text-ui-muted">Section {sectionIndex + 1}</p>
          <h3 id="section-settings-title" className="text-sm font-semibold text-ui-foreground">Layout settings</h3>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-lg">
          <div className="grid grid-cols-[7rem_1fr] items-center gap-2 sm:block">
            <label htmlFor="section-grid-columns" className="text-xs font-medium text-ui-muted sm:mb-1 sm:block">
              Grid Columns
            </label>
            <Select
              id="section-grid-columns"
              value={section.columns}
              onChange={(e) =>
                onUpdateSection({ columns: parseInt(e.target.value) })
              }
              className="h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus:outline-none focus:ring-2 focus:ring-ui-focus"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Column{n > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-[7rem_1fr] items-center gap-2 sm:block">
            <label htmlFor="section-grid-gap" className="text-xs font-medium text-ui-muted sm:mb-1 sm:block">
              Gap (pixels)
            </label>
            <Input
              id="section-grid-gap"
              type="number"
              value={section.gap}
              onChange={(e) =>
                onUpdateSection({ gap: parseInt(e.target.value) })
              }
              className="h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus:outline-none focus:ring-2 focus:ring-ui-focus"
              min="0"
              max="64"
            />
          </div>
        </div>
      </section>

      {/* Grid Preview */}
      <section aria-labelledby="grid-layout-title">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 id="grid-layout-title" className="text-base font-semibold text-ui-foreground">
              Grid Layout
            </h3>
            <p className="text-xs text-ui-muted mt-0.5">
              Design your page structure with cells and components
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <GenericButton onClick={onAddCell} size="sm" iconLeft={<FiPlus size={15} />}>
              Add cell
            </GenericButton>
            <GenericButton
              onClick={onAddCellWithExcel}
              size="sm"
              variant="outline"
              iconLeft={<FiUpload size={15} />}
              title="Upload Excel and create cell with table"
            >
              Import Excel
            </GenericButton>
          </div>
        </div>

        <div
          data-testid="grid-layout-canvas"
          className="grid min-h-[280px] gap-3 rounded-ui-lg border border-dashed border-ui-border bg-ui-subtle/40 p-3"
          style={{
            gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
            gap: `${section.gap}px`,
          }}
        >
          {section.cells.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-ui-surface-subtle flex items-center justify-center">
                  <FiGrid size={28} className="text-ui-placeholder" />
                </div>
                <p className="text-sm text-ui-muted mb-3">No cells yet</p>
                <button
                  onClick={onAddCell}
                  className="text-sm text-ui-foreground font-medium hover:underline"
                >
                  Add your first cell
                </button>
              </div>
            </div>
          ) : (
            section.cells.map((cell) => (
              <CellEditor
                key={cell.id}
                cell={cell}
                filters={filters.filter(
                  (filter) =>
                    filter.placement.kind === "cell" &&
                    filter.placement.cellId === cell.id,
                )}
                schemas={schemas}
                isSelected={selectedCell === cell.id}
                onSelect={() => setSelectedCell(cell.id)}
                onUpdate={(updates) => onUpdateCell(cell.id, updates)}
                onDelete={() => onDeleteCell(cell.id)}
                onAddComponent={() => openComponentModal(cell.id)}
                onAddPageFilter={() => onAddPageFilter(cell.id)}
                onEditPageFilter={(filter) => onEditPageFilter(cell.id, filter)}
                onDeletePageFilter={onDeletePageFilter}
                onDeleteComponent={(componentId) =>
                  onDeleteComponent(cell.id, componentId)
                }
                onEditComponent={(component) =>
                  openComponentModal(cell.id, component)
                }
              />
            ))
          )}
        </div>
      </section>

      {/* Component Modal */}
      {showComponentModal && currentCellId !== null && (
        <ComponentModal
          schemas={schemas}
          containerOptions={containerOptions}
          containers={containers}
          page={page}
          currentCellId={currentCellId}
          editingComponent={editingComponent}
          onClose={() => {
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
          onAdd={async (component) => {
            await onCommitComponent(currentCellId, component, editingComponent?.id);
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
        />
      )}
    </div>
  );
};

// Cell Editor Component
