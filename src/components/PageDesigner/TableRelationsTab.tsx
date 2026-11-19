import { FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui";
import type { GeneratedRelationColumnsConfig, TableComponentConfig } from "../../types/page";
import type { Field } from "../../utils/api/container";

export interface TableRelationsTabProps {
  tableConfig: TableComponentConfig;
  selectedFields: Field[];
  containerOptions: { value: string; label: string }[];
  getLookupFieldOptions: (schemaName?: string) => { value: string; label: string }[];
  addGeneratedRelationColumns: () => void;
  updateGeneratedRelationColumns: (index: number, updates: Partial<GeneratedRelationColumnsConfig>) => void;
  moveGeneratedRelationColumns: (index: number, direction: -1 | 1) => void;
  removeGeneratedRelationColumns: (index: number) => void;
}

export function TableRelationsTab({
  tableConfig,
  selectedFields,
  containerOptions,
  getLookupFieldOptions,
  addGeneratedRelationColumns,
  updateGeneratedRelationColumns,
  moveGeneratedRelationColumns,
  removeGeneratedRelationColumns,
}: TableRelationsTabProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={addGeneratedRelationColumns}
        className="inline-flex items-center gap-2 rounded-lg border border-ui-border bg-ui-active-subtle px-3 py-2 text-sm font-semibold text-ui-foreground hover:bg-ui-active-subtle"
      >
        <FiPlus size={14} />
        Add generated relation group
      </button>
      {(tableConfig.generatedRelationColumns || []).map(
        (group, groupIndex) => {
          const sourceFields = getLookupFieldOptions(
            group.sourceSchemaName,
          );
          const sharesArrayWithAnotherSchema = (
            tableConfig.generatedRelationColumns || []
          ).some(
            (candidate, candidateIndex) =>
              candidateIndex !== groupIndex &&
              candidate.arrayField &&
              candidate.arrayField === group.arrayField &&
              candidate.sourceSchemaName !==
                group.sourceSchemaName,
          );
          return (
            <div
              key={group.id || groupIndex}
              className="space-y-3 rounded-xl border border-ui-border p-4"
            >
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">
                    Stable group ID
                  </span>
                  <Input
                    value={group.id}
                    onChange={(e) =>
                      updateGeneratedRelationColumns(
                        groupIndex,
                        { id: e.target.value },
                      )
                    }
                    className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm"
                  />
                </label>
                <div className="flex items-end gap-1">
                  <button type="button" disabled={groupIndex === 0} onClick={() => moveGeneratedRelationColumns(groupIndex, -1)} className="rounded-lg bg-ui-surface-subtle p-2 disabled:opacity-40" title="Move up"><FiChevronUp size={15} /></button>
                  <button type="button" disabled={groupIndex === (tableConfig.generatedRelationColumns || []).length - 1} onClick={() => moveGeneratedRelationColumns(groupIndex, 1)} className="rounded-lg bg-ui-surface-subtle p-2 disabled:opacity-40" title="Move down"><FiChevronDown size={15} /></button>
                  <button type="button" onClick={() => removeGeneratedRelationColumns(groupIndex)} className="rounded-lg bg-ui-danger-subtle p-2 text-ui-danger" title="Remove"><FiTrash2 size={15} /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Row array field</span>
                  <Select value={group.arrayField} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { arrayField: e.target.value })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                    <option value="">Select array field</option>
                    {selectedFields.filter((field) => field.type?.toLowerCase().includes("array")).map((field) => <option key={field.name} value={field.name}>{field.frontend?.displayName || field.name}</option>)}
                  </Select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Source schema</span>
                  <Select value={group.sourceSchemaName} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { sourceSchemaName: e.target.value, sourceIdField: "_id", sourceLabelField: "" })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                    <option value="">Select schema</option>
                    {containerOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </Select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Source ID field</span>
                  <Select value={group.sourceIdField || "_id"} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { sourceIdField: e.target.value })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                    <option value="_id">_id</option>
                    {sourceFields.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </Select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Source label field</span>
                  <Select value={group.sourceLabelField} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { sourceLabelField: e.target.value })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                    <option value="">Select label field</option>
                    {sourceFields.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </Select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Source record limit</span>
                  <Input type="number" min={1} max={100} value={group.sourceLimit || 100} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { sourceLimit: Math.min(100, Math.max(1, Number(e.target.value) || 100)) })} className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm" />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Boolean edit toggle</span>
                  <Select value={group.booleanEditToggle?.toggleId || ""} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { booleanEditToggle: e.target.value ? { toggleId: e.target.value, when: group.booleanEditToggle?.when ?? true } : undefined })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm">
                    <option value="">Always editable</option>
                    {(tableConfig.toggles || []).map((toggle) => <option key={toggle.id} value={toggle.id}>{toggle.label || toggle.id}</option>)}
                  </Select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-ui-muted">Editable when</span>
                  <Select disabled={!group.booleanEditToggle?.toggleId} value={String(group.booleanEditToggle?.when ?? true)} onChange={(e) => updateGeneratedRelationColumns(groupIndex, { booleanEditToggle: group.booleanEditToggle ? { ...group.booleanEditToggle, when: e.target.value === "true" } : undefined })} className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm disabled:bg-ui-surface-subtle">
                    <option value="true">On</option><option value="false">Off</option>
                  </Select>
                </label>
              </div>
              {sharesArrayWithAnotherSchema && <p className="text-xs text-ui-warning">Groups sharing this row array field must use compatible, non-overlapping ID namespaces.</p>}
            </div>
          );
        },
      )}
    </div>
  );
}
