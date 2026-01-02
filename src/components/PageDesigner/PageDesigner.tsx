import React, { useEffect, useState } from "react";
import { FiEdit2, FiGrid, FiLayout, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdBarChart, MdTab, MdTableChart } from "react-icons/md";
import {
  ComponentBlock,
  GridCell,
  GridSection,
  TabPanelTab,
} from "../../types/page";
import { useGetContainers } from "../../utils/api/container";

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

export const PageDesigner: React.FC<PageDesignerProps> = ({
  sections,
  onChange,
}) => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<ComponentBlock | null>(null);

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
            onUpdateSection={(updates) =>
              updateSection(selectedSection, updates)
            }
            onAddCell={() => addCell(selectedSection)}
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
    </div>
  );
};

// Section Editor Component
interface SectionEditorProps {
  section: GridSection;
  sectionIndex: number;
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  onUpdateSection: (updates: Partial<GridSection>) => void;
  onAddCell: () => void;
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
  onUpdateSection,
  onAddCell,
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
          <button
            onClick={onAddCell}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm"
          >
            <FiPlus size={16} strokeWidth={2.5} />
            <span>Add Cell</span>
          </button>
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
  editingComponent: ComponentBlock | null;
  onClose: () => void;
  onAdd: (component: ComponentBlock) => void;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  schemas,
  containerOptions,
  editingComponent,
  onClose,
  onAdd,
}) => {
  const [componentType, setComponentType] = useState<string>("table");
  const [schemaName, setSchemaName] = useState<string>("");
  const [pipelineName, setPipelineName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<TabPanelTab[]>([]);

  // Initialize form with editingComponent data
  useEffect(() => {
    if (editingComponent) {
      setComponentType(editingComponent.type);
      setTitle(editingComponent.title || "");

      if (editingComponent.dataBinding) {
        setSchemaName(editingComponent.dataBinding.schemaName || "");
        setPipelineName(editingComponent.dataBinding.pipelineName || "");
      }

      if (editingComponent.tabs) {
        setTabs(editingComponent.tabs);
      }
    }
  }, [editingComponent]);

  const handleAdd = () => {
    const component: ComponentBlock = {
      id: editingComponent?.id || `comp-${Date.now()}`,
      type: componentType as any,
      title,
      order: editingComponent?.order || 1,
    };

    if (componentType === "table") {
      component.dataBinding = {
        kind: "schema",
        schemaName,
      };
    } else if (componentType === "tabPanel") {
      component.tabs = tabs;
    } else if (CHART_TYPES.find((c) => c.value === componentType)) {
      component.dataBinding = {
        kind: "pipeline",
        schemaName,
        pipelineName,
      };
    }

    onAdd(component);
  };

  const addTab = () => {
    setTabs([
      ...tabs,
      {
        title: `Tab ${tabs.length + 1}`,
        components: [],
      },
    ]);
  };

  const addTableToTab = (tabIndex: number, schema: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].components.push({
      id: `comp-${Date.now()}`,
      type: "table",
      order: updatedTabs[tabIndex].components.length + 1,
      dataBinding: {
        kind: "schema",
        schemaName: schema,
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
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
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Component Type */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Component Type
              </label>
              <select
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              >
                <option value="table">📊 Table</option>
                <option value="tabPanel">📑 Tab Panel</option>
                {CHART_TYPES.map((chart) => (
                  <option key={chart.value} value={chart.value}>
                    📈 {chart.label}
                  </option>
                ))}
              </select>
            </div>

            {componentType !== "tabPanel" && (
              <>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Title
                    <span className="text-neutral-400 text-xs ml-1.5">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder:text-neutral-400"
                    placeholder="Enter component title"
                  />
                </div>

                {/* Schema Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Schema Name
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    value={schemaName}
                    onChange={(e) => setSchemaName(e.target.value)}
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

                {/* Pipeline Name (for charts) */}
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
              </>
            )}

            {/* Tab Panel Configuration */}
            {componentType === "tabPanel" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-700">
                    Tabs Configuration
                  </label>
                  <button
                    onClick={addTab}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-medium rounded-lg hover:bg-violet-600 active:scale-95 transition-all shadow-sm"
                  >
                    <FiPlus size={14} strokeWidth={2.5} />
                    <span>Add Tab</span>
                  </button>
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
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={componentType !== "tabPanel" && !schemaName}
            className="px-4 py-2.5 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-500 flex items-center gap-2"
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
    </div>
  );
};
