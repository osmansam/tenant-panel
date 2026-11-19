import { FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui";
import { getDesignerToggleVisibilityTargets, type DesignerVisibilityTarget } from "../../utils/pageDesignerTableConfig";
import type { JsonValue, TableComponentConfig, TableToggleConfig, ToggleRequestEffect } from "../../types/page";

export interface TableTogglesTabProps {
  tableConfig: TableComponentConfig;
  addTableToggle: () => void;
  moveTableToggle: (index: number, direction: -1 | 1) => void;
  parseToggleRequestValue: (value: string) => JsonValue;
  removeTableToggle: (index: number) => void;
  updateTableToggle: (index: number, updates: Partial<TableToggleConfig>) => void;
  updateTableToggleRequestEffect: (index: number, state: "on" | "off", effect: ToggleRequestEffect | undefined) => void;
  updateTableToggleVisibilityTarget: (toggleId: string, target: DesignerVisibilityTarget, checked: boolean) => void;
}

export function TableTogglesTab({
  tableConfig,
  addTableToggle,
  moveTableToggle,
  parseToggleRequestValue,
  removeTableToggle,
  updateTableToggle,
  updateTableToggleRequestEffect,
  updateTableToggleVisibilityTarget,
}: TableTogglesTabProps) {
  return (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-ui-foreground">
                                      Table Display Toggles
                                    </span>
                                    <p className="mt-1 text-xs text-ui-muted">
                                      Control columns, Boolean editing, and optional request filters.
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={addTableToggle}
                                    className="inline-flex items-center gap-2 rounded-lg border border-ui-border bg-ui-active-subtle px-3 py-2 text-sm font-semibold text-ui-foreground hover:bg-ui-active-subtle"
                                  >
                                    <FiPlus size={14} /> Add toggle
                                  </button>
                                </div>
                                {(tableConfig.toggles || []).map(
                                  (toggle, toggleIndex) => (
                                    <div
                                      key={`${toggle.id}-${toggleIndex}`}
                                      className="space-y-3 rounded-xl border border-ui-border bg-white p-4"
                                    >
                                      <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-3">
                                        <label className="space-y-1">
                                          <span className="text-[11px] font-medium text-ui-muted">
                                            Stable ID
                                          </span>
                                          <Input
                                            type="text"
                                            value={toggle.id}
                                            onChange={(e) =>
                                              updateTableToggle(toggleIndex, {
                                                id: e.target.value,
                                              })
                                            }
                                            className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm"
                                          />
                                        </label>
                                        <label className="space-y-1">
                                          <span className="text-[11px] font-medium text-ui-muted">
                                            Label
                                          </span>
                                          <Input
                                            type="text"
                                            value={toggle.label}
                                            onChange={(e) =>
                                              updateTableToggle(toggleIndex, {
                                                label: e.target.value,
                                              })
                                            }
                                            className="w-full rounded-lg border border-ui-border px-3 py-2 text-sm"
                                          />
                                        </label>
                                        <label className="flex items-end gap-2 pb-2 text-xs text-ui-foreground">
                                          <Input
                                            type="checkbox"
                                            checked={toggle.defaultValue}
                                            onChange={(e) =>
                                              updateTableToggle(toggleIndex, {
                                                defaultValue: e.target.checked,
                                              })
                                            }
                                          />
                                          Default on
                                        </label>
                                        <label className="flex items-end gap-2 pb-2 text-xs text-ui-foreground">
                                          <Input
                                            type="checkbox"
                                            checked={toggle.isUpperSide !== false}
                                            onChange={(e) =>
                                              updateTableToggle(toggleIndex, {
                                                isUpperSide: e.target.checked,
                                              })
                                            }
                                          />
                                          Upper side
                                        </label>
                                        <div className="flex items-end gap-1">
                                          <button
                                            type="button"
                                            disabled={toggleIndex === 0}
                                            onClick={() =>
                                              moveTableToggle(toggleIndex, -1)
                                            }
                                            className="rounded-lg bg-ui-surface-subtle p-2 text-ui-muted disabled:opacity-40"
                                            title="Move toggle up"
                                          >
                                            <FiChevronUp size={15} />
                                          </button>
                                          <button
                                            type="button"
                                            disabled={
                                              toggleIndex ===
                                              (tableConfig.toggles || []).length -
                                                1
                                            }
                                            onClick={() =>
                                              moveTableToggle(toggleIndex, 1)
                                            }
                                            className="rounded-lg bg-ui-surface-subtle p-2 text-ui-muted disabled:opacity-40"
                                            title="Move toggle down"
                                          >
                                            <FiChevronDown size={15} />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeTableToggle(toggleIndex)
                                            }
                                            className="rounded-lg bg-ui-danger-subtle p-2 text-ui-danger"
                                            title="Remove toggle"
                                          >
                                            <FiTrash2 size={15} />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="space-y-2 rounded-lg border border-ui-border bg-ui-surface-subtle p-3">
                                        <div>
                                          <div className="text-xs font-semibold uppercase text-ui-foreground">
                                            Visible columns and groups
                                          </div>
                                          <p className="mt-1 text-xs text-ui-muted">
                                            Selected targets are visible while this toggle is on and hidden while it is off.
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                          {(tableConfig.columns || []).map(
                                            (column) => {
                                              const target =
                                                `column:${column.field}` as DesignerVisibilityTarget;
                                              return (
                                                <label
                                                  key={target}
                                                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs text-ui-foreground"
                                                >
                                                  <Input
                                                    type="checkbox"
                                                    checked={getDesignerToggleVisibilityTargets(
                                                      tableConfig,
                                                      toggle.id,
                                                    ).includes(target)}
                                                    onChange={(event) =>
                                                      updateTableToggleVisibilityTarget(
                                                        toggle.id,
                                                        target,
                                                        event.target.checked,
                                                      )
                                                    }
                                                  />
                                                  {column.displayName ||
                                                    column.field}
                                                  <span className="text-ui-placeholder">
                                                    Column
                                                  </span>
                                                </label>
                                              );
                                            },
                                          )}
                                          {(
                                            tableConfig.generatedRelationColumns ||
                                            []
                                          ).map((group) => {
                                            const target =
                                              `group:${group.id}` as DesignerVisibilityTarget;
                                            return (
                                              <label
                                                key={target}
                                                className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs text-ui-foreground"
                                              >
                                                <Input
                                                  type="checkbox"
                                                  checked={getDesignerToggleVisibilityTargets(
                                                    tableConfig,
                                                    toggle.id,
                                                  ).includes(target)}
                                                  onChange={(event) =>
                                                    updateTableToggleVisibilityTarget(
                                                      toggle.id,
                                                      target,
                                                      event.target.checked,
                                                    )
                                                  }
                                                />
                                                {group.id ||
                                                  group.sourceSchemaName ||
                                                  group.arrayField}
                                                <span className="text-ui-placeholder">
                                                  Group
                                                </span>
                                              </label>
                                            );
                                          })}
                                          {!(tableConfig.columns || []).length &&
                                            !(
                                              tableConfig.generatedRelationColumns ||
                                              []
                                            ).length && (
                                              <span className="text-xs text-ui-muted">
                                                Add table columns or generated relation groups first.
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {(["off", "on"] as const).map(
                                          (state) => {
                                            const effect =
                                              toggle.request?.[state];
                                            return (
                                              <div
                                                key={state}
                                                className="space-y-2 rounded-lg border border-ui-border bg-ui-surface-subtle p-3"
                                              >
                                                <div className="text-xs font-semibold uppercase text-ui-muted">
                                                  When {state}
                                                </div>
                                                <Select
                                                  value={effect?.type || "none"}
                                                  onChange={(e) => {
                                                    const type = e.target.value;
                                                    updateTableToggleRequestEffect(
                                                      toggleIndex,
                                                      state,
                                                      type === "set"
                                                        ? {
                                                            type: "set",
                                                            field: "",
                                                            value: false,
                                                          }
                                                        : type === "omit"
                                                          ? { type: "omit" }
                                                          : undefined,
                                                    );
                                                  }}
                                                  className="w-full rounded-lg border border-ui-border bg-white px-3 py-2 text-sm"
                                                >
                                                  <option value="none">
                                                    No request effect
                                                  </option>
                                                  <option value="set">
                                                    Set field/value
                                                  </option>
                                                  <option value="omit">
                                                    Omit contribution
                                                  </option>
                                                </Select>
                                                {effect?.type === "set" && (
                                                  <div className="grid grid-cols-2 gap-2">
                                                    <Input
                                                      type="text"
                                                      value={effect.field}
                                                      onChange={(e) =>
                                                        updateTableToggleRequestEffect(
                                                          toggleIndex,
                                                          state,
                                                          {
                                                            ...effect,
                                                            field:
                                                              e.target.value,
                                                          },
                                                        )
                                                      }
                                                      className="rounded-lg border border-ui-border px-3 py-2 text-sm"
                                                      placeholder="deleted"
                                                    />
                                                    <Input
                                                      key={`${toggle.id}-${state}-${JSON.stringify(effect.value)}`}
                                                      type="text"
                                                      defaultValue={JSON.stringify(
                                                        effect.value,
                                                      )}
                                                      onBlur={(e) =>
                                                        updateTableToggleRequestEffect(
                                                          toggleIndex,
                                                          state,
                                                          {
                                                            ...effect,
                                                            value:
                                                              parseToggleRequestValue(
                                                                e.target.value,
                                                              ),
                                                          },
                                                        )
                                                      }
                                                      className="rounded-lg border border-ui-border px-3 py-2 font-mono text-sm"
                                                      placeholder="false"
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
  );
}
