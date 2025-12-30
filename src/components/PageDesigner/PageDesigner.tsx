import React, { useState } from "react";
import { FiGrid, FiLayout, FiPlus, FiTrash2 } from "react-icons/fi";
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
    const maxRow = Math.max(0, ...section.cells.map((c) => c.row));
    const newCell: GridCell = {
      id: `cell-${Date.now()}`,
      row: maxRow + 1,
      column: 1,
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Sections List */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Page Structure
          </h2>
        </div>

        <div className="p-4">
          <button
            onClick={addSection}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiPlus /> Add Section
          </button>
        </div>

        <div className="space-y-2 p-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedSection === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedSection(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiLayout className="text-gray-600" />
                  <span className="font-medium text-sm">
                    Section {index + 1}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                {section.columns} columns, {section.cells.length} cells
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto p-8">
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
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <FiLayout size={64} className="mx-auto mb-4" />
              <p>Select a section or create a new one to start designing</p>
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
  selectedCell,
  setSelectedCell,
}) => {
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [currentCellId, setCurrentCellId] = useState<string | null>(null);

  const openComponentModal = (cellId: string) => {
    setCurrentCellId(cellId);
    setShowComponentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Section Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columns
            </label>
            <select
              value={section.columns}
              onChange={(e) =>
                onUpdateSection({ columns: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Column{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gap (px)
            </label>
            <input
              type="number"
              value={section.gap}
              onChange={(e) =>
                onUpdateSection({ gap: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Grid Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Grid Layout</h3>
          <button
            onClick={onAddCell}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FiPlus /> Add Cell
          </button>
        </div>

        <div
          className="grid gap-4 border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px]"
          style={{
            gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
            gap: `${section.gap}px`,
          }}
        >
          {section.cells.map((cell) => (
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
            />
          ))}
        </div>
      </div>

      {/* Component Modal */}
      {showComponentModal && currentCellId && (
        <ComponentModal
          schemas={schemas}
          containerOptions={containerOptions}
          onClose={() => setShowComponentModal(false)}
          onAdd={(component) => {
            onAddComponent(currentCellId, component);
            setShowComponentModal(false);
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
}) => {
  return (
    <div
      className={`border-2 rounded-lg p-4 min-h-[200px] cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-400"
      }`}
      style={{
        gridRow: `${cell.row} / span ${cell.rowSpan || 1}`,
        gridColumn: `${cell.column} / span ${cell.colSpan || 1}`,
      }}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiGrid className="text-gray-600" />
          <span className="text-sm font-medium">
            Cell ({cell.row}, {cell.column})
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddComponent();
            }}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
          >
            <FiPlus size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {isSelected && (
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <label className="block text-gray-600 mb-1">Row</label>
            <input
              type="number"
              value={cell.row}
              onChange={(e) => onUpdate({ row: parseInt(e.target.value) || 1 })}
              className="w-full px-2 py-1 border rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Column</label>
            <input
              type="number"
              value={cell.column}
              onChange={(e) =>
                onUpdate({ column: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1 border rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Row Span</label>
            <input
              type="number"
              value={cell.rowSpan || 1}
              onChange={(e) =>
                onUpdate({ rowSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1 border rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Col Span</label>
            <input
              type="number"
              value={cell.colSpan || 1}
              onChange={(e) =>
                onUpdate({ colSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1 border rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Components List */}
      <div className="space-y-2">
        {cell.components.map((component) => (
          <div
            key={component.id}
            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {component.type === "table" && <MdTableChart />}
              {component.type === "tabPanel" && <MdTab />}
              {CHART_TYPES.find((c) => c.value === component.type) && (
                <MdBarChart />
              )}
              <span className="text-sm">{component.type}</span>
            </div>
            <button
              onClick={() => onDeleteComponent(component.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
        {cell.components.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-4">
            No components. Click + to add.
          </div>
        )}
      </div>
    </div>
  );
};

// Component Modal
interface ComponentModalProps {
  schemas: string[];
  containerOptions: { value: string; label: string }[];
  onClose: () => void;
  onAdd: (component: ComponentBlock) => void;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  schemas,
  containerOptions,
  onClose,
  onAdd,
}) => {
  const [componentType, setComponentType] = useState<string>("table");
  const [schemaName, setSchemaName] = useState<string>("");
  const [pipelineName, setPipelineName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabs, setTabs] = useState<TabPanelTab[]>([]);

  const handleAdd = () => {
    const component: ComponentBlock = {
      id: `comp-${Date.now()}`,
      type: componentType as any,
      title,
      order: 1,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Add Component</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Component Type
            </label>
            <select
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Component title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schema Name
                </label>
                <select
                  value={schemaName}
                  onChange={(e) => setSchemaName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select schema...</option>
                  {containerOptions.map((container) => (
                    <option key={container.value} value={container.value}>
                      {container.label}
                    </option>
                  ))}
                </select>
              </div>

              {CHART_TYPES.find((c) => c.value === componentType) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pipeline Name
                  </label>
                  <input
                    type="text"
                    value={pipelineName}
                    onChange={(e) => setPipelineName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Pipeline name"
                  />
                </div>
              )}
            </>
          )}

          {componentType === "tabPanel" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Tabs
                </label>
                <button
                  onClick={addTab}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add Tab
                </button>
              </div>
              {tabs.map((tab, index) => (
                <div key={index} className="border rounded p-3 space-y-2">
                  <input
                    type="text"
                    value={tab.title}
                    onChange={(e) => {
                      const updated = [...tabs];
                      updated[index].title = e.target.value;
                      setTabs(updated);
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="Tab title"
                  />
                  <div className="space-y-1">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addTableToTab(index, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">Add table to tab...</option>
                      {schemas.map((schema) => (
                        <option key={schema} value={schema}>
                          {schema}
                        </option>
                      ))}
                    </select>
                    {tab.components.map((comp) => (
                      <div
                        key={comp.id}
                        className="text-sm px-2 py-1 bg-gray-100 rounded"
                      >
                        Table: {comp.dataBinding?.schemaName}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleAdd}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Component
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
