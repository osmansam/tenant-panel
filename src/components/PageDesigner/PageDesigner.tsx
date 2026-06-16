import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiEdit2,
  FiGrid,
  FiLayout,
  FiPlus,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import { MdBarChart, MdTab, MdTableChart } from "react-icons/md";
import {
  ComponentBlock,
  LinkType,
  GridCell,
  GridSection,
  RowClassConfig,
  TableColumnConfig,
  TableComponentConfig,
  TabPanelTab,
} from "../../types/page";
import {
  ContainerModel,
  DynamicWorkflow,
  Field,
  PipelineStage,
  WorkflowStep,
  useGetContainers,
} from "../../utils/api/container";
import { CellExcelUploadModal } from "./CellExcelUploadModal";

interface PageDesignerProps {
  sections: GridSection[];
  onChange: (sections: GridSection[]) => void;
}

const CHART_TYPES = [
  { value: "barChart", label: "Bar Chart", icon: MdBarChart },
  { value: "lineChart", label: "Line Chart", icon: MdBarChart },
  { value: "pieChart", label: "Pie Chart", icon: MdBarChart },
  { value: "areaChart", label: "Area Chart", icon: MdBarChart },
  { value: "radarChart", label: "Radar Chart", icon: MdBarChart },
  { value: "heatmapChart", label: "Heatmap", icon: MdBarChart },
  { value: "scatterChart", label: "Scatter", icon: MdBarChart },
  { value: "funnelChart", label: "Funnel", icon: MdBarChart },
  { value: "sankeyChart", label: "Sankey", icon: MdBarChart },
  { value: "sunburstChart", label: "Sunburst", icon: MdBarChart },
  { value: "treemapChart", label: "Treemap", icon: MdBarChart },
  { value: "calendarChart", label: "Calendar", icon: MdBarChart },
  { value: "bumpChart", label: "Bump", icon: MdBarChart },
  { value: "streamChart", label: "Stream", icon: MdBarChart },
  { value: "waffleChart", label: "Waffle", icon: MdBarChart },
  { value: "circlePackingChart", label: "Circle Packing", icon: MdBarChart },
];

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: "external", label: "External" },
  { value: "internal", label: "Internal" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

type TableSettingsTab =
  | "columns"
  | "links"
  | "cellClasses"
  | "rows";

const TABLE_SETTINGS_TABS: { value: TableSettingsTab; label: string }[] = [
  { value: "columns", label: "Columns" },
  { value: "links", label: "Links" },
  { value: "cellClasses", label: "Cell Classes" },
  { value: "rows", label: "Row Classes" },
];

const buildTableColumnsFromFields = (fields: Field[]): TableColumnConfig[] =>
  fields
    .filter((field) => field.name && !["_id", "id"].includes(field.name))
    .map((field) => ({
      field: field.name,
      displayName: field.frontend?.displayName || "",
      cellClassName: field.frontend?.rowKeyClassName || [],
      link: field.frontend?.linkTemplate
        ? {
            template: field.frontend.linkTemplate,
            labelField: field.frontend.linkLabelField,
            type: field.frontend.linkType || "external",
          }
        : undefined,
    }));

const buildTableColumnsFromNames = (fields: string[]): TableColumnConfig[] =>
  fields
    .map((field) => field.trim())
    .filter((field, index, all) => field && !["_id", "id"].includes(field) && all.indexOf(field) === index)
    .map((field) => ({ field, displayName: "" }));

const normalizeOutputFields = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item, index, all) => item && all.indexOf(item) === index);
};

const pipelineJson = (pipeline: PipelineStage): string =>
  (pipeline as any).pipelineJson || (pipeline as any).PipelineJSON || "";

const inferFieldsFromProjectStage = (stage: Record<string, any>): string[] => {
  const project = stage.$project || stage.project;
  if (!project || typeof project !== "object" || Array.isArray(project)) {
    return [];
  }

  return Object.entries(project)
    .filter(([field, value]) => {
      if (field === "_id") return false;
      if (value === 0 || value === false) return false;
      return true;
    })
    .map(([field]) => field);
};

const inferFieldsFromPipelineStage = (stage: Record<string, any>): string[] => {
  const projected = inferFieldsFromProjectStage(stage);
  if (projected.length > 0) return projected;

  if (typeof stage.$count === "string" && stage.$count.trim()) {
    return [stage.$count.trim()];
  }

  const group = stage.$group || stage.group;
  if (group && typeof group === "object" && !Array.isArray(group)) {
    return Object.keys(group).filter((field) => field !== "_id");
  }

  return [];
};

const inferPipelineOutputFields = (
  pipeline: PipelineStage,
  fallbackFields: Field[],
): string[] => {
  const explicit = normalizeOutputFields((pipeline as any).outputFields);
  if (explicit.length > 0) return explicit;

  try {
    const parsed = JSON.parse(pipelineJson(pipeline));
    if (Array.isArray(parsed)) {
      const lastStage = parsed[parsed.length - 1];
      if (lastStage?.$out || lastStage?.$merge) {
        return [];
      }
      for (let index = parsed.length - 1; index >= 0; index -= 1) {
        const stage = parsed[index];
        if (stage && typeof stage === "object" && !Array.isArray(stage)) {
          const projected = inferFieldsFromPipelineStage(stage);
          if (projected.length > 0) return projected;
        }
      }
    }
  } catch {
    return [];
  }

  return fallbackFields.map((field) => field.name).filter(Boolean);
};

const flattenWorkflowSteps = (steps: WorkflowStep[] = []): WorkflowStep[] =>
  steps.flatMap((step) => [
    step,
    ...flattenWorkflowSteps(step.steps || []),
    ...flattenWorkflowSteps(step.elseSteps || []),
    ...((step.branches || []).flatMap((branch) =>
      flattenWorkflowSteps(branch.steps || []),
    )),
  ]);

const workflowStepId = (step: WorkflowStep): string => step.name || (step as any).id || "";

const configOutputFields = (config: Record<string, any> | undefined): string[] =>
  normalizeOutputFields(
    config?.outputFields || config?.returnFields || config?.fields,
  );

const schemaFieldNames = (
  containers: ContainerModel[],
  schemaName: string | undefined,
): string[] =>
  (containers.find((container) => container.schemaName === schemaName)?.fields || [])
    .map((field) => field.name)
    .filter(Boolean);

const inferWorkflowStepFields = (
  step: WorkflowStep | undefined,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  if (!step) return [];
  const explicit = configOutputFields(step.config);
  if (explicit.length > 0) return explicit;

  if (step.config?.projection && typeof step.config.projection === "object") {
    const projected = inferFieldsFromProjectStage({ $project: step.config.projection });
    if (projected.length > 0) return projected;
  }

  if (Array.isArray(step.config?.pipeline)) {
    for (let index = step.config.pipeline.length - 1; index >= 0; index -= 1) {
      const projected = inferFieldsFromPipelineStage(step.config.pipeline[index]);
      if (projected.length > 0) return projected;
    }
  }

  if (typeof step.config?.value === "object" && !Array.isArray(step.config.value)) {
    const keys = Object.keys(step.config.value).filter((key) => key !== "_id");
    if (keys.length > 0) return keys;
  }

  if (["find_records", "get_record"].includes(step.type)) {
    return schemaFieldNames(containers, step.targetSchema || fallbackSchemaName);
  }

  return [];
};

const inferWorkflowOutputFields = (
  workflow: DynamicWorkflow,
  containers: ContainerModel[],
  fallbackSchemaName: string,
): string[] => {
  const explicit = normalizeOutputFields(
    (workflow as any).outputFields || (workflow as any).returnFields,
  );
  if (explicit.length > 0) return explicit;

  const steps = flattenWorkflowSteps(workflow.steps || []);
  const returnStep = steps.find((step) => step.type === "return" && step.isActive !== false);
  if (returnStep) {
    const fromReturn = inferWorkflowStepFields(returnStep, containers, fallbackSchemaName);
    if (fromReturn.length > 0) return fromReturn;

    const value = returnStep.config?.value;
    if (typeof value === "string") {
      const match = value.match(/^\{\{\s*([^.}]+)(?:\.items)?\s*\}\}$/);
      if (match) {
        const referenced = steps.find((step) => workflowStepId(step) === match[1]);
        const inferred = inferWorkflowStepFields(referenced, containers, fallbackSchemaName);
        if (inferred.length > 0) return inferred;
      }
    }
  }

  if (workflow.returnStep) {
    const referenced = steps.find((step) => workflowStepId(step) === workflow.returnStep);
    return inferWorkflowStepFields(referenced, containers, fallbackSchemaName);
  }

  return [];
};

const cleanRules = (rules: RowClassConfig[] = []): RowClassConfig[] =>
  rules.filter((rule) => rule.condition.trim() || rule.className.trim());

const cleanTableConfig = (
  tableConfig: TableComponentConfig,
): TableComponentConfig => ({
  columns: (tableConfig.columns || [])
    .filter((column) => column.field.trim())
    .map((column) => ({
      field: column.field.trim(),
      ...(column.displayName?.trim()
        ? { displayName: column.displayName.trim() }
        : {}),
      ...(cleanRules(column.cellClassName).length > 0
        ? { cellClassName: cleanRules(column.cellClassName) }
        : {}),
      ...(column.link?.template?.trim()
        ? {
            link: {
              template: column.link.template.trim(),
              ...(column.link.labelField?.trim()
                ? { labelField: column.link.labelField.trim() }
                : {}),
              type: column.link.type || "external",
            },
          }
        : {}),
    })),
  ...(cleanRules(tableConfig.rows?.className).length > 0
    ? { rows: { className: cleanRules(tableConfig.rows?.className) } }
    : {}),
  ...(tableConfig.cache?.invalidateKeys?.filter((key) => key.trim()).length
    ? {
        cache: {
          invalidateKeys: tableConfig.cache.invalidateKeys
            .map((key) => key.trim())
            .filter(Boolean),
        },
      }
    : {}),
});

export const PageDesigner: React.FC<PageDesignerProps> = ({
  sections,
  onChange,
}) => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  const [excelTargetSectionIndex, setExcelTargetSectionIndex] = useState<
    number | null
  >(null);

  const containers = useGetContainers();
  const schemas = containers?.map((c: any) => c.schemaName || c.name) || [];
  const containerOptions =
    containers?.map((c: any) => ({
      value: c.schemaName,
      label: c.schemaName,
    })) || [];

  // Add new section
  const addSection = () => {
    const newSection: GridSection = {
      columns: 1,
      gap: 16,
      cells: [],
    };
    onChange([...sections, newSection]);
    setSelectedSection(sections.length);
  };

  // Update section
  const updateSection = (index: number, updates: Partial<GridSection>) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  // Delete section
  const deleteSection = (index: number) => {
    onChange(sections.filter((_, i) => i !== index));
    setSelectedSection(null);
  };

  // Add cell to section
  const addCell = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const maxRow =
      section.cells.length > 0
        ? Math.max(...section.cells.map((c) => c.row))
        : 0;

    // Count cells in the current max row
    const cellsInMaxRow = section.cells.filter((c) => c.row === maxRow);

    // Determine row and column for new cell
    let newRow = maxRow;
    let newColumn = cellsInMaxRow.length + 1;

    // If this is the first cell or current row is full, handle accordingly
    if (section.cells.length === 0) {
      newRow = 1;
      newColumn = 1;
    } else if (cellsInMaxRow.length >= section.columns) {
      newRow = maxRow + 1;
      newColumn = 1;
    }

    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row: newRow,
      column: newColumn,
      components: [],
    };
    updateSection(sectionIndex, {
      cells: [...section.cells, newCell],
    });
  };

  // Add cell with Excel upload option
  const openCellExcelUpload = (sectionIndex: number) => {
    setExcelTargetSectionIndex(sectionIndex);
    setShowExcelUploadModal(true);
  };

  // Handle Excel upload success for cells
  const handleCellExcelUploadSuccess = (
    schemaName: string,
    component: ComponentBlock
  ) => {
    if (excelTargetSectionIndex === null) return;

    const section = sections[excelTargetSectionIndex];
    const maxRow =
      section.cells.length > 0
        ? Math.max(...section.cells.map((c) => c.row))
        : 0;

    const cellsInMaxRow = section.cells.filter((c) => c.row === maxRow);

    let newRow = maxRow;
    let newColumn = cellsInMaxRow.length + 1;

    if (section.cells.length === 0) {
      newRow = 1;
      newColumn = 1;
    } else if (cellsInMaxRow.length >= section.columns) {
      newRow = maxRow + 1;
      newColumn = 1;
    }

    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row: newRow,
      column: newColumn,
      components: [component],
    };

    updateSection(excelTargetSectionIndex, {
      cells: [...section.cells, newCell],
    });

    setExcelTargetSectionIndex(null);
  };

  // Update cell
  const updateCell = (
    sectionIndex: number,
    cellId: string,
    updates: Partial<GridCell>
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId ? { ...cell, ...updates } : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Delete cell
  const deleteCell = (sectionIndex: number, cellId: string) => {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      cells: section.cells.filter((c) => c.id !== cellId),
    });
    setSelectedCell(null);
  };

  // Add component to cell
  const addComponentToCell = (
    sectionIndex: number,
    cellId: string,
    component: ComponentBlock
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? { ...cell, components: [...cell.components, component] }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Delete component from cell
  const deleteComponent = (
    sectionIndex: number,
    cellId: string,
    componentId: string
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? {
            ...cell,
            components: cell.components.filter((c) => c.id !== componentId),
          }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  // Update component in cell
  const updateComponent = (
    sectionIndex: number,
    cellId: string,
    componentId: string,
    updatedComponent: ComponentBlock
  ) => {
    const section = sections[sectionIndex];
    const cells = section.cells.map((cell) =>
      cell.id === cellId
        ? {
            ...cell,
            components: cell.components.map((c) =>
              c.id === componentId ? updatedComponent : c
            ),
          }
        : cell
    );
    updateSection(sectionIndex, { cells });
  };

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Left Sidebar - Sections List */}
      <div className="w-72 bg-white border-r border-neutral-200 overflow-y-auto">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">
            Page Structure
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            {sections.length} section{sections.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="p-4">
          <button
            onClick={addSection}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
          >
            <FiPlus size={16} strokeWidth={2.5} />
            <span>Add Section</span>
          </button>
        </div>

        <div className="space-y-2 p-4 pt-0">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`group p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedSection === index
                  ? "border-violet-500 bg-violet-50 shadow-sm"
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
              onClick={() => setSelectedSection(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-lg ${
                      selectedSection === index
                        ? "bg-violet-500 text-white"
                        : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
                    } transition-colors`}
                  >
                    <FiLayout size={14} />
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      selectedSection === index
                        ? "text-violet-900"
                        : "text-neutral-900"
                    }`}
                  >
                    Section {index + 1}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(index);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all"
                >
                  <FiTrash2 size={13} strokeWidth={2} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <FiGrid size={12} />
                  {section.columns} col{section.columns > 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>
                  {section.cells.length} cell
                  {section.cells.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto">
        {selectedSection !== null ? (
          <SectionEditor
            section={sections[selectedSection]}
            sectionIndex={selectedSection}
            schemas={schemas}
            containerOptions={containerOptions}
            containers={containers || []}
            onUpdateSection={(updates) =>
              updateSection(selectedSection, updates)
            }
            onAddCell={() => addCell(selectedSection)}
            onAddCellWithExcel={() => openCellExcelUpload(selectedSection)}
            onUpdateCell={(cellId, updates) =>
              updateCell(selectedSection, cellId, updates)
            }
            onDeleteCell={(cellId) => deleteCell(selectedSection, cellId)}
            onAddComponent={(cellId, component) =>
              addComponentToCell(selectedSection, cellId, component)
            }
            onDeleteComponent={(cellId, componentId) =>
              deleteComponent(selectedSection, cellId, componentId)
            }
            onUpdateComponent={(cellId, componentId, component) =>
              updateComponent(selectedSection, cellId, componentId, component)
            }
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 flex items-center justify-center">
                <FiLayout size={36} className="text-neutral-400" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-1">
                No section selected
              </h3>
              <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                Select a section from the sidebar or create a new one to start
                designing your page
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Excel Upload Modal for Cells */}
      <CellExcelUploadModal
        isOpen={showExcelUploadModal}
        onClose={() => setShowExcelUploadModal(false)}
        onSuccess={handleCellExcelUploadSuccess}
        mode="cell"
      />
    </div>
  );
};

// Section Editor Component
interface SectionEditorProps {
  section: GridSection;
  sectionIndex: number;
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  onUpdateSection: (updates: Partial<GridSection>) => void;
  onAddCell: () => void;
  onAddCellWithExcel: () => void;
  onUpdateCell: (cellId: string, updates: Partial<GridCell>) => void;
  onDeleteCell: (cellId: string) => void;
  onAddComponent: (cellId: string, component: ComponentBlock) => void;
  onDeleteComponent: (cellId: string, componentId: string) => void;
  onUpdateComponent: (
    cellId: string,
    componentId: string,
    component: ComponentBlock
  ) => void;
  selectedCell: string | null;
  setSelectedCell: (cellId: string | null) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  sectionIndex,
  schemas,
  containerOptions,
  containers,
  onUpdateSection,
  onAddCell,
  onAddCellWithExcel,
  onUpdateCell,
  onDeleteCell,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent,
  selectedCell,
  setSelectedCell,
}) => {
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [currentCellId, setCurrentCellId] = useState<string | null>(null);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);

  const openComponentModal = (cellId: string, component?: ComponentBlock) => {
    setCurrentCellId(cellId);
    setEditingComponent(component || null);
    setShowComponentModal(true);
  };

  return (
    <div className="space-y-5 p-8">
      {/* Section Settings */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-neutral-900 mb-4">
          Section Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Grid Columns
            </label>
            <select
              value={section.columns}
              onChange={(e) =>
                onUpdateSection({ columns: parseInt(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Column{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Gap (pixels)
            </label>
            <input
              type="number"
              value={section.gap}
              onChange={(e) =>
                onUpdateSection({ gap: parseInt(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              min="0"
              max="64"
            />
          </div>
        </div>
      </div>

      {/* Grid Preview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Grid Layout
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Design your page structure with cells and components
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onAddCell}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
            >
              <FiPlus size={16} strokeWidth={2.5} />
              <span>Add Cell</span>
            </button>
            <button
              onClick={onAddCellWithExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 active:scale-[0.98] transition-all shadow-sm"
              title="Upload Excel and create cell with table"
            >
              <FiUpload size={16} strokeWidth={2.5} />
              <span>Excel</span>
            </button>
          </div>
        </div>

        <div
          className="grid gap-3 border-2 border-dashed border-neutral-300 rounded-xl p-5 min-h-[400px] bg-neutral-50/50"
          style={{
            gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
            gap: `${section.gap}px`,
          }}
        >
          {section.cells.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <FiGrid size={28} className="text-neutral-400" />
                </div>
                <p className="text-sm text-neutral-500 mb-3">No cells yet</p>
                <button
                  onClick={onAddCell}
                  className="text-sm text-neutral-900 font-medium hover:underline"
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
                schemas={schemas}
                isSelected={selectedCell === cell.id}
                onSelect={() => setSelectedCell(cell.id)}
                onUpdate={(updates) => onUpdateCell(cell.id, updates)}
                onDelete={() => onDeleteCell(cell.id)}
                onAddComponent={() => openComponentModal(cell.id)}
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
      </div>

      {/* Component Modal */}
      {showComponentModal && currentCellId && (
        <ComponentModal
          schemas={schemas}
          containerOptions={containerOptions}
          containers={containers}
          editingComponent={editingComponent}
          onClose={() => {
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
          onAdd={(component) => {
            if (editingComponent) {
              // Update existing component
              onUpdateComponent(currentCellId, editingComponent.id, component);
            } else {
              // Add new component
              onAddComponent(currentCellId, component);
            }
            setShowComponentModal(false);
            setEditingComponent(null);
          }}
        />
      )}
    </div>
  );
};

// Cell Editor Component
interface CellEditorProps {
  cell: GridCell;
  schemas: string[];
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<GridCell>) => void;
  onDelete: () => void;
  onAddComponent: () => void;
  onDeleteComponent: (componentId: string) => void;
  onEditComponent: (component: ComponentBlock) => void;
}

const CellEditor: React.FC<CellEditorProps> = ({
  cell,
  schemas,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onAddComponent,
  onDeleteComponent,
  onEditComponent,
}) => {
  return (
    <div
      className={`group relative border-2 rounded-xl p-4 min-h-[180px] cursor-pointer transition-all ${
        isSelected
          ? "border-violet-500 bg-violet-50/50 shadow-md"
          : "border-neutral-300 hover:border-neutral-400 bg-white hover:shadow-sm"
      }`}
      style={{
        gridRow: `${cell.row} / span ${cell.rowSpan || 1}`,
        gridColumn: `${cell.column} / span ${cell.colSpan || 1}`,
      }}
      onClick={onSelect}
    >
      {/* Cell Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-md ${
              isSelected
                ? "bg-violet-500 text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            <FiGrid size={14} />
          </div>
          <span className="text-xs font-semibold text-neutral-700">
            Cell {cell.row},{cell.column}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddComponent();
            }}
            className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-all flex items-center gap-1"
            title="Add component"
          >
            <FiPlus size={13} />
            <span>Add</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all flex items-center gap-1"
            title="Delete cell"
          >
            <FiTrash2 size={13} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Cell Controls - Show when selected */}
      {isSelected && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Row
            </label>
            <input
              type="number"
              value={cell.row}
              onChange={(e) => onUpdate({ row: parseInt(e.target.value) || 1 })}
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Column
            </label>
            <input
              type="number"
              value={cell.column}
              onChange={(e) =>
                onUpdate({ column: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Row Span
            </label>
            <input
              type="number"
              value={cell.rowSpan || 1}
              onChange={(e) =>
                onUpdate({ rowSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
              Col Span
            </label>
            <input
              type="number"
              value={cell.colSpan || 1}
              onChange={(e) =>
                onUpdate({ colSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              min="1"
            />
          </div>
        </div>
      )}

      {/* Components List */}
      <div className="space-y-2">
        {cell.components.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs text-neutral-400 mb-2">No components</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddComponent();
              }}
              className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
            >
              Add your first component
            </button>
          </div>
        ) : (
          cell.components.map((component) => (
            <div
              key={component.id}
              className="group p-3 bg-white border border-neutral-200 rounded-lg hover:border-violet-400 hover:shadow-sm transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {component.type === "table" && (
                    <div className="p-1 bg-blue-100 rounded-md">
                      <MdTableChart className="text-blue-600" size={14} />
                    </div>
                  )}
                  {component.type === "tabPanel" && (
                    <div className="p-1 bg-purple-100 rounded-md">
                      <MdTab className="text-purple-600" size={14} />
                    </div>
                  )}
                  {CHART_TYPES.find((c) => c.value === component.type) && (
                    <div className="p-1 bg-emerald-100 rounded-md">
                      <MdBarChart className="text-emerald-600" size={14} />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-neutral-700 capitalize">
                    {component.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditComponent(component)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-all flex items-center gap-1"
                    title="Edit Component"
                  >
                    <FiEdit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteComponent(component.id)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-all flex items-center gap-1"
                    title="Delete Component"
                  >
                    <FiTrash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Component Details */}
              <div className="text-[11px] space-y-1 text-neutral-600">
                {component.title && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Title:
                    </span>
                    <span className="text-neutral-700">{component.title}</span>
                  </div>
                )}

                {component.dataBinding && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Data:
                    </span>
                    {component.dataBinding.kind === "schema" ? (
                      <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {component.dataBinding.schemaName}
                      </span>
                    ) : component.dataBinding.kind === "pipeline" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.pipelineName}
                        </span>
                        <span className="text-neutral-400">in</span>
                        <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : component.dataBinding.kind === "workflow" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.workflowName}
                        </span>
                        <span className="text-neutral-400">in</span>
                        <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}

                {component.tabs && component.tabs.length > 0 && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-neutral-500 min-w-[45px]">
                      Tabs:
                    </span>
                    <span className="text-neutral-700">
                      {component.tabs.length} tab
                      {component.tabs.length > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Component Modal
interface ComponentModalProps {
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  containers: ContainerModel[];
  editingComponent: ComponentBlock | null;
  onClose: () => void;
  onAdd: (component: ComponentBlock) => void;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  schemas,
  containerOptions,
  containers,
  editingComponent,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();
  const [componentType, setComponentType] = useState<string>("table");
  const [schemaName, setSchemaName] = useState<string>("");
  const [tableSourceType, setTableSourceType] = useState<
    "schema" | "pipeline" | "workflow"
  >("schema");
  const [pipelineName, setPipelineName] = useState<string>("");
  const [workflowName, setWorkflowName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<TabPanelTab[]>([]);
  const [showTabExcelModal, setShowTabExcelModal] = useState(false);
  const [params, setParams] = useState<string>(""); // JSON string for params
  const [tableConfig, setTableConfig] = useState<TableComponentConfig>({
    columns: [],
    rows: { className: [] },
    cache: { invalidateKeys: [] },
  });
  const [activeTableSettingsTab, setActiveTableSettingsTab] =
    useState<TableSettingsTab>("columns");

  const selectedContainer = useMemo(
    () => containers.find((container) => container.schemaName === schemaName),
    [containers, schemaName]
  );
  const selectedFields = selectedContainer?.fields || [];
  const pipelineOptions = useMemo(
    () =>
      (selectedContainer?.pipelines || [])
        .map((pipeline) => ({
          pipeline,
          outputFields: inferPipelineOutputFields(pipeline, selectedFields),
        }))
        .filter(
          ({ pipeline, outputFields }) =>
            pipeline.isActive !== false && outputFields.length > 0,
        ),
    [selectedContainer?.pipelines, selectedFields],
  );
  const workflowOptions = useMemo(
    () =>
      (selectedContainer?.workflows || [])
        .map((workflow) => ({
          workflow,
          outputFields: inferWorkflowOutputFields(
            workflow,
            containers,
            schemaName,
          ),
        }))
        .filter(
          ({ workflow, outputFields }) =>
            workflow.isActive !== false && outputFields.length > 0,
        ),
    [containers, schemaName, selectedContainer?.workflows],
  );

  // Initialize form with editingComponent data
  useEffect(() => {
    if (editingComponent) {
      setComponentType(editingComponent.type);
      setTitle(editingComponent.title || "");

      if (editingComponent.dataBinding) {
        setTableSourceType(
          editingComponent.dataBinding.kind === "pipeline" ||
            editingComponent.dataBinding.kind === "workflow"
            ? editingComponent.dataBinding.kind
            : "schema"
        );
        setSchemaName(editingComponent.dataBinding.schemaName || "");
        setPipelineName(editingComponent.dataBinding.pipelineName || "");
        setWorkflowName(editingComponent.dataBinding.workflowName || "");
        setParams(
          editingComponent.dataBinding.params
            ? JSON.stringify(editingComponent.dataBinding.params, null, 2)
            : ""
        );
      }

      if (editingComponent.tabs) {
        setTabs(editingComponent.tabs);
      }

      if (editingComponent.table) {
        setTableConfig({
          columns: editingComponent.table.columns || [],
          rows: { className: editingComponent.table.rows?.className || [] },
          cache: {
            invalidateKeys: editingComponent.table.cache?.invalidateKeys || [],
          },
        });
      }
    }
  }, [editingComponent]);

  useEffect(() => {
    if (componentType !== "table" || !schemaName || editingComponent?.table) {
      return;
    }

    const container = containers.find((item) => item.schemaName === schemaName);
    if (!container) return;

    setTableConfig((current) => {
      if (current.columns && current.columns.length > 0) return current;

      return {
        ...current,
        columns: buildTableColumnsFromFields(container.fields || []),
      };
    });
  }, [componentType, containers, editingComponent?.table, schemaName]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "pipeline") {
      return;
    }

    const selected = pipelineOptions.find(
      ({ pipeline }) => pipeline.name === pipelineName,
    );
    if (!selected) {
      setPipelineName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: buildTableColumnsFromNames(selected.outputFields),
    }));
  }, [componentType, pipelineName, pipelineOptions, tableSourceType]);

  useEffect(() => {
    if (componentType !== "table" || tableSourceType !== "workflow") {
      return;
    }

    const selected = workflowOptions.find(
      ({ workflow }) => workflow.name === workflowName,
    );
    if (!selected) {
      setWorkflowName("");
      return;
    }

    setTableConfig((current) => ({
      ...current,
      columns: buildTableColumnsFromNames(selected.outputFields),
    }));
  }, [componentType, tableSourceType, workflowName, workflowOptions]);

  const handleAdd = () => {
    const component: ComponentBlock = {
      id: editingComponent?.id || `comp-${Date.now()}`,
      type: componentType as any,
      title,
      order: editingComponent?.order || 1,
    };

    if (componentType === "table") {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.dataBinding = {
        kind: tableSourceType,
        schemaName,
        ...(tableSourceType === "pipeline" && { pipelineName }),
        ...(tableSourceType === "workflow" && { workflowName }),
        ...(parsedParams && { params: parsedParams }),
      };
      component.table = cleanTableConfig(tableConfig);
    } else if (componentType === "tabPanel") {
      component.tabs = tabs;
    } else if (CHART_TYPES.find((c) => c.value === componentType)) {
      let parsedParams = undefined;
      if (params.trim()) {
        try {
          parsedParams = JSON.parse(params);
          console.log("✅ Parsed params:", parsedParams);
        } catch (e) {
          console.error("Invalid params JSON:", e);
        }
      }

      component.dataBinding = {
        kind: "pipeline",
        schemaName,
        pipelineName,
        ...(parsedParams && { params: parsedParams }),
      };

      console.log("📊 Chart component created:", component);
    }

    onAdd(component);
  };

  const resetTableColumnsForSchema = (nextSchemaName: string) => {
    const container = containers.find(
      (item) => item.schemaName === nextSchemaName,
    );
    setTableConfig({
      columns: buildTableColumnsFromFields(container?.fields || []),
      rows: { className: [] },
      cache: { invalidateKeys: [] },
    });
  };

  const updateTableColumn = (
    fieldName: string,
    updates: Partial<TableColumnConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName ? { ...column, ...updates } : column,
      ),
    }));
  };

  const addTableColumn = () => {
    setTableConfig((current) => {
      const columns = current.columns || [];
      let index = columns.length + 1;
      let field = `field${index}`;
      while (columns.some((column) => column.field === field)) {
        index += 1;
        field = `field${index}`;
      }
      return {
        ...current,
        columns: [...columns, { field, displayName: "" }],
      };
    });
  };

  const removeTableColumn = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).filter(
        (column) => column.field !== fieldName,
      ),
    }));
  };

  const updateTableColumnLink = (
    fieldName: string,
    updates: NonNullable<TableColumnConfig["link"]>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? { ...column, link: { type: "external", ...column.link, ...updates } }
          : column,
      ),
    }));
  };

  const updateTableColumnRule = (
    fieldName: string,
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) => {
        if (column.field !== fieldName) return column;
        const rules = [...(column.cellClassName || [])];
        rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
        return { ...column, cellClassName: rules };
      }),
    }));
  };

  const addTableColumnRule = (fieldName: string) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: [
                ...(column.cellClassName || []),
                { condition: "", className: "" },
              ],
            }
          : column,
      ),
    }));
  };

  const removeTableColumnRule = (fieldName: string, ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      columns: (current.columns || []).map((column) =>
        column.field === fieldName
          ? {
              ...column,
              cellClassName: (column.cellClassName || []).filter(
                (_, index) => index !== ruleIndex,
              ),
            }
          : column,
      ),
    }));
  };

  const updateRowRule = (
    ruleIndex: number,
    updates: Partial<RowClassConfig>,
  ) => {
    setTableConfig((current) => {
      const rules = [...(current.rows?.className || [])];
      rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
      return { ...current, rows: { className: rules } };
    });
  };

  const addRowRule = () => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: [
          ...(current.rows?.className || []),
          { condition: "", className: "" },
        ],
      },
    }));
  };

  const removeRowRule = (ruleIndex: number) => {
    setTableConfig((current) => ({
      ...current,
      rows: {
        className: (current.rows?.className || []).filter(
          (_, index) => index !== ruleIndex,
        ),
      },
    }));
  };

  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: `Tab ${tabs.length + 1}`,
        components: [],
      },
    ]);
  };

  // Open Excel upload for tab
  const openTabExcelUpload = () => {
    setShowTabExcelModal(true);
  };

  // Handle Excel upload success for tabs
  const handleTabExcelUploadSuccess = (
    schemaName: string,
    component: ComponentBlock
  ) => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: schemaName,
        components: [component],
      },
    ]);
  };

  const addTableToTab = (tabIndex: number, schema: string) => {
    const updatedTabs = [...tabs];
    const container = containers.find((item) => item.schemaName === schema);
    updatedTabs[tabIndex].components.push({
      id: `comp-${Date.now()}`,
      type: "table",
      order: updatedTabs[tabIndex].components.length + 1,
      dataBinding: {
        kind: "schema",
        schemaName: schema,
      },
      table: {
        columns: buildTableColumnsFromFields(container?.fields || []),
      },
    });
    setTabs(updatedTabs);
  };

  const removeTab = (tabIndex: number) => {
    setTabs(tabs.filter((_, i) => i !== tabIndex));
  };

  const removeTableFromTab = (tabIndex: number, componentId: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].components = updatedTabs[tabIndex].components.filter(
      (comp) => comp.id !== componentId
    );
    setTabs(updatedTabs);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[min(96vw,1440px)] max-h-[96vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {editingComponent ? "Edit Component" : "Add Component"}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configure the component settings and data binding
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-neutral-50/40">
          <div className="space-y-6">
            {/* Component Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-neutral-200 bg-white p-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                  Component Type
                </label>
                <select
                  value={componentType}
                  onChange={(e) => setComponentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                >
                  <option value="table">Table</option>
                  <option value="tabPanel">Tab Panel</option>
                  {CHART_TYPES.map((chart) => (
                    <option key={chart.value} value={chart.value}>
                      {chart.label}
                    </option>
                  ))}
                </select>
              </div>

              {componentType !== "tabPanel" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="Optional component title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                      Schema Name
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      value={schemaName}
                      onChange={(e) => {
                        setSchemaName(e.target.value);
                        if (componentType === "table") {
                          resetTableColumnsForSchema(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a schema...</option>
                      {containerOptions.map((container) => (
                        <option key={container.value} value={container.value}>
                          {container.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {componentType === "table" && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                          Table Source
                        </label>
                        <select
                          value={tableSourceType}
                          onChange={(e) => {
                            setTableSourceType(
                              e.target.value as "schema" | "pipeline" | "workflow",
                            );
                            setPipelineName("");
                            setWorkflowName("");
                            if (e.target.value === "schema") {
                              resetTableColumnsForSchema(schemaName);
                            } else {
                              setTableConfig((current) => ({
                                ...current,
                                columns: [],
                              }));
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        >
                          <option value="schema">Schema rows</option>
                          <option value="pipeline">Pipeline request</option>
                          <option value="workflow">Workflow request</option>
                        </select>
                      </div>

                      {tableSourceType === "pipeline" && (
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                            Pipeline Name
                            <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <select
                            value={pipelineName}
                            onChange={(e) => setPipelineName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          >
                            <option value="">
                              {pipelineOptions.length > 0
                                ? "Select a pipeline..."
                                : "No data-returning pipelines"}
                            </option>
                            {pipelineOptions.map(({ pipeline }) => (
                              <option key={pipeline.name} value={pipeline.name}>
                                {pipeline.name}
                              </option>
                            ))}
                          </select>
                          {pipelineName && (
                            <p className="mt-1 text-xs text-neutral-500">
                              Output fields:{" "}
                              {pipelineOptions
                                .find(({ pipeline }) => pipeline.name === pipelineName)
                                ?.outputFields.join(", ")}
                            </p>
                          )}
                        </div>
                      )}

                      {tableSourceType === "workflow" && (
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
                            Workflow Name
                            <span className="text-red-500 ml-0.5">*</span>
                          </label>
                          <select
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          >
                            <option value="">
                              {workflowOptions.length > 0
                                ? "Select a workflow..."
                                : "No data-returning workflows"}
                            </option>
                            {workflowOptions.map(({ workflow }) => (
                              <option key={workflow.name} value={workflow.name}>
                                {workflow.name}
                              </option>
                            ))}
                          </select>
                          {workflowName && (
                            <p className="mt-1 text-xs text-neutral-500">
                              Output fields:{" "}
                              {workflowOptions
                                .find(({ workflow }) => workflow.name === workflowName)
                                ?.outputFields.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {componentType !== "tabPanel" && (
              <>
                {/* Table Configuration */}
                {componentType === "table" && (
                  <div className="space-y-5 border border-neutral-200 rounded-2xl p-5 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-neutral-900">
                        Table Settings
                        </h4>
                        <p className="text-sm text-neutral-500 mt-1">
                          Configure column labels, links, cell classes, and row
                          classes for this table component.
                        </p>
                      </div>
                      {schemaName && (
                        <div className="shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                          <span className="font-semibold text-neutral-800">
                            {tableConfig.columns?.length || 0}
                          </span>{" "}
                          columns
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-[220px_1fr] gap-5 min-h-[620px]">
                      <div className="space-y-1 rounded-xl border border-neutral-200 bg-neutral-50 p-2">
                        {TABLE_SETTINGS_TABS.map((tab) => (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTableSettingsTab(tab.value)}
                            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                              activeTableSettingsTab === tab.value
                                ? "bg-white text-violet-700 shadow-sm border border-violet-200"
                                : "text-neutral-600 hover:bg-white border border-transparent"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-5">
                        {!schemaName ? (
                          <div className="text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-lg p-4">
                            Select a schema to configure table settings.
                          </div>
                        ) : selectedFields.length === 0 &&
                          (tableConfig.columns || []).length === 0 ? (
                          <div className="text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-lg p-4">
                            Add output fields for this table source.
                          </div>
                        ) : (
                          <>
                            {activeTableSettingsTab === "columns" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                <button
                                  type="button"
                                  onClick={addTableColumn}
                                  className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                                >
                                  <FiPlus size={14} />
                                  Add output field
                                </button>
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="grid grid-cols-[minmax(180px,0.8fr)_1fr_auto] gap-4 border border-neutral-200 rounded-xl p-4"
                                  >
                                    <div>
                                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                        Field
                                      </label>
                                      <input
                                        type="text"
                                        value={column.field}
                                        onChange={(e) =>
                                          updateTableColumn(column.field, {
                                            field: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                        Display Name
                                      </label>
                                      <input
                                        type="text"
                                        value={column.displayName || ""}
                                        onChange={(e) =>
                                          updateTableColumn(column.field, {
                                            displayName: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder={column.field}
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeTableColumn(column.field)
                                        }
                                        className="rounded-lg bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100"
                                        title="Remove field"
                                      >
                                        <FiTrash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "links" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="border border-neutral-200 rounded-xl p-4 space-y-3"
                                  >
                                    <div className="text-xs font-semibold text-neutral-700">
                                      {column.displayName || column.field}
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Type
                                        </label>
                                        <select
                                          value={column.link?.type || "external"}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              type: e.target.value as LinkType,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                                        >
                                          {LINK_TYPES.map((linkType) => (
                                            <option
                                              key={linkType.value}
                                              value={linkType.value}
                                            >
                                              {linkType.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Template
                                        </label>
                                        <input
                                          type="text"
                                          value={column.link?.template || ""}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              template: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="https://example.com/{{value}}"
                                        />
                                      </div>
                                      <div className="col-span-3">
                                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                                          Link Label Field
                                        </label>
                                        <input
                                          type="text"
                                          value={column.link?.labelField || ""}
                                          onChange={(e) =>
                                            updateTableColumnLink(column.field, {
                                              labelField: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                          placeholder="Optional field name for link text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "cellClasses" && (
                              <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
                                {(tableConfig.columns || []).map((column) => (
                                  <div
                                    key={column.field}
                                    className="border border-neutral-200 rounded-xl p-4 space-y-3"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="text-xs font-semibold text-neutral-700">
                                        {column.displayName || column.field}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          addTableColumnRule(column.field)
                                        }
                                        className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                      >
                                        + Add rule
                                      </button>
                                    </div>
                                    {(column.cellClassName || []).map(
                                      (rule, ruleIndex) => (
                                        <div
                                          key={ruleIndex}
                                          className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                        >
                                          <input
                                            type="text"
                                            value={rule.condition}
                                            onChange={(e) =>
                                              updateTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                                { condition: e.target.value },
                                              )
                                            }
                                            className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="status = 'active'"
                                          />
                                          <input
                                            type="text"
                                            value={rule.className}
                                            onChange={(e) =>
                                              updateTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                                { className: e.target.value },
                                              )
                                            }
                                            className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            placeholder="text-green-600"
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableColumnRule(
                                                column.field,
                                                ruleIndex,
                                              )
                                            }
                                            className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                          >
                                            <FiTrash2 size={14} />
                                          </button>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {activeTableSettingsTab === "rows" && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                                    Row Class Rules
                                  </label>
                                  <button
                                    type="button"
                                    onClick={addRowRule}
                                    className="text-xs font-medium text-violet-700 hover:text-violet-900"
                                  >
                                    + Add rule
                                  </button>
                                </div>
                                {(tableConfig.rows?.className || []).map(
                                  (rule, ruleIndex) => (
                                    <div
                                      key={ruleIndex}
                                      className="grid grid-cols-[1fr_1fr_auto] gap-2"
                                    >
                                      <input
                                        type="text"
                                        value={rule.condition}
                                        onChange={(e) =>
                                          updateRowRule(ruleIndex, {
                                            condition: e.target.value,
                                          })
                                        }
                                        className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="status = 'active'"
                                      />
                                      <input
                                        type="text"
                                        value={rule.className}
                                        onChange={(e) =>
                                          updateRowRule(ruleIndex, {
                                            className: e.target.value,
                                          })
                                        }
                                        className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="bg-green-50"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeRowRule(ruleIndex)}
                                        className="px-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                                      >
                                        <FiTrash2 size={14} />
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pipeline Name (for charts) */}
                {(CHART_TYPES.find((c) => c.value === componentType) ||
                  (componentType === "table" &&
                    tableSourceType !== "schema")) && (
                  <>
                    {CHART_TYPES.find((c) => c.value === componentType) && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Pipeline Name
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="text"
                          value={pipelineName}
                          onChange={(e) => setPipelineName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                          placeholder="Enter pipeline name"
                        />
                      </div>
                    )}

                    {/* Pipeline Params */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Source Parameters (JSON)
                      </label>
                      <textarea
                        value={params}
                        onChange={(e) => setParams(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                        placeholder='{"key": "value", "filter": "active"}'
                        rows={4}
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        Optional parameters to pass to the pipeline (JSON
                        format)
                      </p>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Tab Panel Configuration */}
            {componentType === "tabPanel" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-700">
                    Tabs Configuration
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={addTab}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-medium rounded-lg hover:bg-violet-600 active:scale-95 transition-all shadow-sm"
                    >
                      <FiPlus size={14} strokeWidth={2.5} />
                      <span>Add Tab</span>
                    </button>
                    <button
                      onClick={openTabExcelUpload}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 active:scale-95 transition-all shadow-sm"
                      title="Upload Excel as new tab with table"
                    >
                      <FiUpload size={14} strokeWidth={2.5} />
                      <span>Excel</span>
                    </button>
                  </div>
                </div>

                {tabs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-xl">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <MdTab className="text-neutral-400" size={24} />
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">No tabs yet</p>
                    <button
                      onClick={addTab}
                      className="text-sm text-neutral-900 font-medium hover:underline"
                    >
                      Add your first tab
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tabs.map((tab, index) => (
                      <div
                        key={index}
                        className="border border-neutral-200 rounded-xl p-4 space-y-3 bg-neutral-50/50"
                      >
                        {/* Tab Title */}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-violet-100 rounded-md">
                            <MdTab className="text-violet-600" size={16} />
                          </div>
                          <input
                            type="text"
                            value={tab.title}
                            onChange={(e) => {
                              const updated = [...tabs];
                              updated[index].title = e.target.value;
                              setTabs(updated);
                            }}
                            className="flex-1 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="Tab title"
                          />
                          <button
                            onClick={() => removeTab(index)}
                            className="p-1.5 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Remove tab"
                          >
                            <FiTrash2 size={14} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Tables in Tab */}
                        <div className="space-y-2">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                addTableToTab(index, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                          >
                            <option value="">+ Add table to this tab...</option>
                            {schemas.map((schema) => (
                              <option key={schema} value={schema}>
                                {schema}
                              </option>
                            ))}
                          </select>

                          {tab.components.length > 0 && (
                            <div className="space-y-1.5">
                              {tab.components.map((comp) => (
                                <div
                                  key={comp.id}
                                  className="flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <MdTableChart
                                      className="text-blue-600"
                                      size={16}
                                    />
                                    <span className="text-neutral-700 font-medium">
                                      {comp.dataBinding?.schemaName}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeTableFromTab(index, comp.id)
                                    }
                                    className="p-1 text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
                                    title="Remove table"
                                  >
                                    <FiTrash2 size={13} strokeWidth={2} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-neutral-200 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={
              (componentType !== "tabPanel" && !schemaName) ||
              (componentType === "table" &&
                tableSourceType === "pipeline" &&
                !pipelineName) ||
              (componentType === "table" &&
                tableSourceType === "workflow" &&
                !workflowName)
            }
            className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-600 flex items-center gap-2"
          >
            {editingComponent ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <FiPlus size={16} strokeWidth={2.5} />
                <span>Add Component</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Excel Upload Modal for Tabs */}
      <CellExcelUploadModal
        isOpen={showTabExcelModal}
        onClose={() => setShowTabExcelModal(false)}
        onSuccess={handleTabExcelUploadSuccess}
        mode="tab"
      />
    </div>
  );
};
