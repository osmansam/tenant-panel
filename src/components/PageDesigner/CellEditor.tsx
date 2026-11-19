import { CHART_TYPES } from "./designerConstants";
import React from "react";
import { FiEdit2, FiGrid, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdBarChart, MdTab, MdTableChart } from "react-icons/md";
import { Input } from "../ui";
import { ComponentBlock, GridCell } from "../../types/page";
import type { PageFilterDefinition } from "../../utils/api/page";

export interface CellEditorProps {
  cell: GridCell;
  filters: PageFilterDefinition[];
  schemas: string[];
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<GridCell>) => void;
  onDelete: () => void;
  onAddComponent: () => void;
  onAddPageFilter: () => void;
  onEditPageFilter: (filter: PageFilterDefinition) => void;
  onDeletePageFilter: (filterId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onEditComponent: (component: ComponentBlock) => void;
}

export const CellEditor: React.FC<CellEditorProps> = ({
  cell,
  filters,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onAddComponent,
  onAddPageFilter,
  onEditPageFilter,
  onDeletePageFilter,
  onDeleteComponent,
  onEditComponent,
}) => {
  return (
    <div
      className={`group relative border-2 rounded-xl p-4 min-h-[180px] transition-all ${
        isSelected
          ? "border-ui-primary bg-ui-active-subtle/50 shadow-md"
          : "border-ui-border hover:border-ui-border-strong bg-white hover:shadow-sm"
      }`}
      style={{
        gridRow: `${cell.row} / span ${cell.rowSpan || 1}`,
        gridColumn: `${cell.column} / span ${cell.colSpan || 1}`,
      }}
    >
      {/* Cell Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-1 rounded-md ${
              isSelected
                ? "bg-ui-ink text-white"
                : "bg-ui-surface-subtle text-ui-muted"
            }`}
          >
            <FiGrid size={14} />
          </div>
          <span className="text-xs font-semibold text-ui-foreground">
            Cell {cell.row},{cell.column}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label={`Select cell ${cell.row},${cell.column}`}
            aria-pressed={isSelected}
            onClick={onSelect}
            className="px-2 py-1 text-xs font-medium text-ui-foreground bg-ui-active-subtle rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus"
          >
            Select cell
          </button>
          <button
            type="button"
            onClick={onAddComponent}
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-success bg-ui-success-subtle hover:bg-ui-success-subtle rounded-md transition-all flex items-center gap-1"
            title="Add component"
          >
            <FiPlus size={13} />
            <span>Add</span>
          </button>
          <button
            type="button"
            onClick={onAddPageFilter}
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-foreground bg-ui-active-subtle hover:bg-ui-active-subtle rounded-md transition-all flex items-center gap-1"
            title="Add page filter"
          >
            <FiPlus size={13} />
            <span>Filter</span>
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-md transition-all flex items-center gap-1"
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
            <label className="block"><span className="block text-[10px] font-medium text-ui-muted mb-1 uppercase tracking-wide">
              Row
            </span>
            <Input
              type="number"
              value={cell.row}
              onChange={(e) => onUpdate({ row: parseInt(e.target.value) || 1 })}
              className="w-full px-2 py-1.5 text-xs border border-ui-border rounded-md focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent"
              min="1"
            /></label>
          </div>
          <div>
            <label className="block"><span className="block text-[10px] font-medium text-ui-muted mb-1 uppercase tracking-wide">
              Column
            </span>
            <Input
              type="number"
              value={cell.column}
              onChange={(e) =>
                onUpdate({ column: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-ui-border rounded-md focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent"
              min="1"
            /></label>
          </div>
          <div>
            <label className="block"><span className="block text-[10px] font-medium text-ui-muted mb-1 uppercase tracking-wide">
              Row Span
            </span>
            <Input
              type="number"
              value={cell.rowSpan || 1}
              onChange={(e) =>
                onUpdate({ rowSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-ui-border rounded-md focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent"
              min="1"
            /></label>
          </div>
          <div>
            <label className="block"><span className="block text-[10px] font-medium text-ui-muted mb-1 uppercase tracking-wide">
              Col Span
            </span>
            <Input
              type="number"
              value={cell.colSpan || 1}
              onChange={(e) =>
                onUpdate({ colSpan: parseInt(e.target.value) || 1 })
              }
              className="w-full px-2 py-1.5 text-xs border border-ui-border rounded-md focus:outline-none focus:ring-2 focus:ring-ui-focus focus:border-transparent"
              min="1"
            /></label>
          </div>
        </div>
      )}

      {/* Components List */}
      <div className="space-y-2">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="group/filter p-3 bg-ui-active-subtle border border-ui-border rounded-lg hover:border-ui-primary hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-ui-foreground">
                  {filter.label || filter.key}
                </div>
                <div className="text-[11px] text-ui-foreground font-mono">
                  {filter.key} · {filter.type}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onEditPageFilter(filter)}
                  className="opacity-0 group-hover/filter:opacity-100 group-focus-within/filter:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-foreground bg-ui-active-subtle hover:bg-ui-active-subtle rounded-md transition-all flex items-center gap-1"
                  title="Edit Page Filter"
                >
                  <FiEdit2 size={12} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeletePageFilter(filter.id)}
                  className="opacity-0 group-hover/filter:opacity-100 group-focus-within/filter:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-md transition-all flex items-center gap-1"
                  title="Delete Page Filter"
                >
                  <FiTrash2 size={12} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {cell.components.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-xs text-ui-placeholder mb-2">
              {filters.length > 0
                ? "No components"
                : "No components or filters"}
            </p>
            <button
              type="button"
              onClick={onAddComponent}
              className="text-xs text-ui-muted hover:text-ui-foreground font-medium"
            >
              Add your first component
            </button>
            <button
              type="button"
              onClick={onAddPageFilter}
              className="ml-3 text-xs text-ui-foreground hover:text-ui-foreground font-medium"
            >
              Add page filter
            </button>
          </div>
        ) : (
          cell.components.map((component) => (
            <div
              key={component.id}
              className="group p-3 bg-white border border-ui-border rounded-lg hover:border-ui-primary hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {component.type === "table" && (
                    <div className="p-1 bg-ui-active-subtle rounded-md">
                      <MdTableChart className="text-ui-primary" size={14} />
                    </div>
                  )}
                  {component.type === "relationMatrix" && (
                    <div className="p-1 bg-ui-active-subtle rounded-md">
                      <MdTableChart className="text-ui-primary" size={14} />
                    </div>
                  )}
                  {component.type === "tabPanel" && (
                    <div className="p-1 bg-purple-100 rounded-md">
                      <MdTab className="text-purple-600" size={14} />
                    </div>
                  )}
                  {CHART_TYPES.find((c) => c.value === component.type) && (
                    <div className="p-1 bg-ui-success-subtle rounded-md">
                      <MdBarChart className="text-ui-success" size={14} />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-ui-foreground capitalize">
                    {component.type === "custom" && component.props?.visualBuilder ? "Visual component" : component.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditComponent(component)}
                    className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-foreground bg-ui-active-subtle hover:bg-ui-active-subtle rounded-md transition-all flex items-center gap-1"
                    title="Edit Component"
                  >
                    <FiEdit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteComponent(component.id)}
                    className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 px-2 py-1 text-xs font-medium text-ui-danger bg-ui-danger-subtle hover:bg-ui-danger-subtle rounded-md transition-all flex items-center gap-1"
                    title="Delete Component"
                  >
                    <FiTrash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Component Details */}
              <div className="text-[11px] space-y-1 text-ui-muted">
                {component.title && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-ui-muted min-w-[45px]">
                      Title:
                    </span>
                    <span className="text-ui-foreground">{component.title}</span>
                  </div>
                )}

                {component.dataBinding && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-ui-muted min-w-[45px]">
                      Data:
                    </span>
                    {component.dataBinding.kind === "schema" ? (
                      <span className="font-mono text-ui-primary bg-ui-active-subtle px-1.5 py-0.5 rounded">
                        {component.dataBinding.schemaName}
                      </span>
                    ) : component.dataBinding.kind === "pipeline" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-ui-success bg-ui-success-subtle px-1.5 py-0.5 rounded">
                          {component.dataBinding.pipelineName}
                        </span>
                        <span className="text-ui-placeholder">in</span>
                        <span className="font-mono text-ui-primary bg-ui-active-subtle px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : component.dataBinding.kind === "workflow" ? (
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-mono text-ui-warning bg-ui-warning-subtle px-1.5 py-0.5 rounded">
                          {component.dataBinding.workflowName}
                        </span>
                        <span className="text-ui-placeholder">in</span>
                        <span className="font-mono text-ui-primary bg-ui-active-subtle px-1.5 py-0.5 rounded">
                          {component.dataBinding.schemaName}
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}

                {component.relationMatrix && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-ui-muted min-w-[45px]">
                      Matrix:
                    </span>
                    <span className="font-mono text-ui-foreground bg-ui-active-subtle px-1.5 py-0.5 rounded">
                      {component.relationMatrix.rowSchemaName} × {component.relationMatrix.columnSchemaName}
                    </span>
                  </div>
                )}

                {component.tabs && component.tabs.length > 0 && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-medium text-ui-muted min-w-[45px]">
                      Tabs:
                    </span>
                    <span className="text-ui-foreground">
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
