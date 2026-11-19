import React, { lazy, Suspense } from "react";
import { FiLayout } from "react-icons/fi";
import type { GridSection } from "../../types/page";
import { useGetContainers } from "../../utils/api/container";
import type {
  PageFilterDefinition,
  Section as DesignerPageSection,
} from "../../utils/api/page";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { CellExcelUploadModal } from "./CellExcelUploadModal";
import PageFilterModal from "./PageFilterModal";
import { SectionEditor } from "./SectionEditor";
import { SectionList } from "./SectionList";
import { useDesignerPersistence } from "./useDesignerPersistence";
import { useDesignerState } from "./useDesignerState";
import { useSectionDrag } from "./useSectionDrag";

const VisualSectionPreview = lazy(
  () => import("../../visualBuilder/VisualSectionPreview"),
);

export interface PageDesignerProps {
  sections: GridSection[];
  pageSections?: DesignerPageSection[];
  onReorderPageSections?: (sections: DesignerPageSection[]) => void;
  onAddVisualSection?: () => void;
  onDeleteVisualSection?: (componentId: string) => void;
  editableVisualIds?: readonly string[];
  focusedVisualId?: string | null;
  onChange: (sections: GridSection[]) => void;
  /** Persists and applies committed sections in the parent workspace. */
  onComponentSave?: (sections: GridSection[]) => Promise<void> | void;
  onVisualComponentEdit?: (componentId: string) => void;
  filters?: PageFilterDefinition[];
  onFiltersChange?: (filters: PageFilterDefinition[]) => void;
  onNestedEditorChange?: (open: boolean) => void;
}

export const PageDesigner: React.FC<PageDesignerProps> = ({
  sections,
  pageSections,
  onReorderPageSections,
  onAddVisualSection,
  onDeleteVisualSection,
  editableVisualIds,
  focusedVisualId,
  onChange,
  onComponentSave,
  onVisualComponentEdit,
  filters = [],
  onFiltersChange,
  onNestedEditorChange,
}) => {
  const state = useDesignerState({
    sections,
    pageSections,
    focusedVisualId,
    filters,
    onChange,
    onFiltersChange,
    onNestedEditorChange,
  });

  const { structureNavRef, canReorderSections, moveSection } = useSectionDrag({
    structure: state.structure,
    sections,
    pageSections,
    selectedSection: state.selectedSection,
    setSelectedSection: state.setSelectedSection,
    onChange,
    onReorderPageSections,
  });

  const { commitComponent } = useDesignerPersistence({
    sections,
    runtimePage: state.runtimePage,
    onChange,
    onComponentSave,
  });

  const containers = useGetContainers();
  const schemas = (containers || []).map((c) => c.schemaName);
  const containerOptions = (containers || []).map((c) => ({
    value: c.schemaName,
    label: c.schemaName,
  }));

  return (
    <div
      data-testid="page-designer-workspace"
      className="flex h-full min-h-0 flex-col bg-ui-page lg:flex-row"
    >
      <SectionList
        navRef={structureNavRef}
        structure={state.structure}
        sections={sections}
        selectedSection={state.selectedSection}
        selectedVisualId={state.selectedVisualId}
        canReorderSections={canReorderSections}
        onAddSection={state.addSection}
        onAddVisualSection={onAddVisualSection}
        onDeleteSection={state.deleteSection}
        onDeleteVisualSection={onDeleteVisualSection}
        onSelectSection={(index) => {
          state.setSelectedVisualId(null);
          state.setSelectedSection(index);
        }}
        onSelectVisual={(componentId) => {
          state.setSelectedVisualId(componentId);
          state.setSelectedSection(null);
        }}
        onMoveSection={moveSection}
      />

      <main aria-label="Page canvas" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {state.visual ? (
          <section className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-4 rounded-ui-lg border border-ui-border bg-ui-surface p-4">
              <div>
                <p className="text-xs text-ui-muted">Visual section</p>
                <h3 className="text-base font-semibold text-ui-foreground">
                  {state.visual.title || "Visual section"}
                </h3>
                {editableVisualIds && !editableVisualIds.includes(state.visual.id) && (
                  <p className="mt-1 text-xs text-ui-muted">
                    Save the page before opening this copy in the visual editor.
                  </p>
                )}
              </div>
              {onVisualComponentEdit && (
                <GenericButton
                  variant="outline"
                  disabled={
                    !!editableVisualIds &&
                    !editableVisualIds.includes(state.visual.id)
                  }
                  onClick={() => onVisualComponentEdit(state.visual!.id)}
                >
                  Edit visual section
                </GenericButton>
              )}
            </div>
            <div className="overflow-hidden rounded-ui-lg border border-ui-border bg-white p-3">
              <Suspense fallback={<p role="status">Loading section preview…</p>}>
                <VisualSectionPreview component={state.visual} />
              </Suspense>
            </div>
          </section>
        ) : state.selectedSection !== null && sections[state.selectedSection] ? (
          <SectionEditor
            section={sections[state.selectedSection]}
            sectionIndex={
              state.structure.find(
                (entry) =>
                  entry.kind === "grid" && entry.index === state.selectedSection,
              )?.position ?? state.selectedSection
            }
            onVisualComponentEdit={onVisualComponentEdit}
            onEditorOpenChange={state.setIsComponentEditorOpen}
            schemas={schemas}
            containerOptions={containerOptions}
            containers={containers || []}
            page={state.runtimePage}
            filters={filters}
            onUpdateSection={(updates) =>
              state.updateSection(state.selectedSection!, updates)
            }
            onAddCell={() => state.addCell(state.selectedSection!)}
            onAddCellWithExcel={() =>
              state.openCellExcelUpload(state.selectedSection!)
            }
            onUpdateCell={(cellId, updates) =>
              state.updateCell(state.selectedSection!, cellId, updates)
            }
            onDeleteCell={(cellId) =>
              state.deleteCell(state.selectedSection!, cellId)
            }
            onDeleteComponent={(cellId, componentId) =>
              state.deleteComponent(state.selectedSection!, cellId, componentId)
            }
            onCommitComponent={commitComponent}
            onAddPageFilter={(cellId) =>
              state.setFilterModal({ cellId, filter: null })
            }
            onEditPageFilter={(cellId, filter) =>
              state.setFilterModal({ cellId, filter })
            }
            onDeletePageFilter={state.deletePageFilter}
            selectedCell={state.selectedCell}
            setSelectedCell={state.setSelectedCell}
          />
        ) : (
          <div className="flex min-h-[360px] h-full items-center justify-center p-6">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-ui-lg border border-ui-border bg-ui-surface text-ui-muted">
                <FiLayout size={22} />
              </div>
              <h3 className="text-base font-semibold text-ui-foreground">
                {state.structure.length === 0
                  ? "Start with a section"
                  : "Choose a section"}
              </h3>
              <p className="mt-1 text-sm text-ui-muted">
                {state.structure.length === 0
                  ? "Add the first section to define the page grid."
                  : "Select a section in the structure panel to edit its layout and components."}
              </p>
            </div>
          </div>
        )}
      </main>

      <CellExcelUploadModal
        isOpen={state.showExcelUploadModal}
        onClose={() => state.setShowExcelUploadModal(false)}
        onSuccess={state.handleCellExcelUploadSuccess}
        mode="cell"
      />
      {state.filterModal && (
        <PageFilterModal
          filter={state.filterModal.filter}
          defaultCellId={state.filterModal.cellId}
          cells={state.allCellOptions}
          onClose={() => state.setFilterModal(null)}
          onSave={state.savePageFilter}
        />
      )}
    </div>
  );
};
