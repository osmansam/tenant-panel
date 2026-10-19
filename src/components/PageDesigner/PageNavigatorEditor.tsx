import { useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiMenu, FiPlus, FiTrash2 } from "react-icons/fi";
import type { PageModel, PageNavigatorConfig } from "../../types/page";
import {
  addPageNavigatorItem,
  changePageNavigatorDestinationType,
  movePageNavigatorItem,
  removePageNavigatorItem,
  validatePageNavigatorDraft,
} from "./pageNavigatorEditorState";
import { defaultPageNavigatorConfig, resolvePageNavigatorPreview } from "./pageNavigatorResolver";
import { PageNavigatorPreview } from "./PageNavigatorPreview";
import { Checkbox, Input, Select, type SelectOption } from "../ui";

interface Props {
  value?: PageNavigatorConfig;
  pages: PageModel[];
  currentPageId: string;
  onChange: (value: PageNavigatorConfig | undefined) => void;
}

type StringOption = SelectOption<string>;
const ScalarSelect = ({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: readonly StringOption[];
  onChange: (value: string) => void;
}) => (
  <Select<StringOption>
    value={options.find((option) => option.value === value) || null}
    options={options}
    onChange={(selected) => {
      const option = selected as StringOption | null;
      if (option) onChange(option.value);
    }}
    aria-label={label}
  />
);

export function PageNavigatorEditor({ value, pages, currentPageId, onChange }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const config = value || { ...defaultPageNavigatorConfig(), enabled: false };
  const errors = useMemo(() => validatePageNavigatorDraft(config, pages), [config, pages]);
  const preview = useMemo(() => resolvePageNavigatorPreview({ pages, currentPageId, config }), [pages, currentPageId, config]);
  const update = (patch: Partial<PageNavigatorConfig>) => onChange({ ...config, ...patch });
  const items = config.additionalItems || [];

  return (
    <section
      aria-label="Breadcrumb navigation"
      data-density="compact"
      className="rounded-ui-lg border border-ui-border bg-ui-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-ui-foreground">Breadcrumb navigation</h3>
          <p className="mt-0.5 text-xs text-ui-muted">Show the current page hierarchy in the page header.</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ui-foreground">
          <Checkbox checked={config.enabled} onChange={(event) => update({ enabled: event.target.checked })} />
          {config.enabled ? "Enabled" : "Disabled"}
        </label>
      </div>

      {config.enabled && (
        <div className="space-y-5 border-t border-ui-border bg-ui-subtle/30 p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-1.5 text-sm font-medium text-ui-foreground">Mode
              <ScalarSelect label="Mode" value={config.mode} options={[
                { value: "automatic", label: "Automatic hierarchy" },
                { value: "custom", label: "Custom trail" },
              ]} onChange={(mode) => update({ mode: mode as PageNavigatorConfig["mode"] })} />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-ui-foreground">Home label
              <Input maxLength={100} value={config.homeLabel || ""} onChange={(event) => update({ homeLabel: event.target.value })} placeholder="Home" />
              {errors.homeLabel && <span className="block text-xs text-ui-danger">{errors.homeLabel}</span>}
            </label>
            <label className="flex items-center gap-2 self-end rounded-lg border border-ui-border bg-white px-3 py-2.5 text-sm font-medium text-ui-foreground">
              <Checkbox checked={config.showHome} onChange={(event) => update({ showHome: event.target.checked })} />
              Show project home
            </label>
          </div>

          {config.mode === "automatic" && (
            <div>
              <h4 className="text-sm font-semibold text-ui-foreground">Generated hierarchy overrides</h4>
              <div className="mt-2 grid gap-2">
                {resolvePageNavigatorPreview({ pages, currentPageId, config: { ...config, overrides: [] } }).filter((item) => !item.current && item.pageId).map((item) => {
                  const override = config.overrides?.find((candidate) => candidate.pageId === item.pageId);
                  const setOverride = (patch: { label?: string; hidden?: boolean }) => {
                    const others = (config.overrides || []).filter((candidate) => candidate.pageId !== item.pageId);
                    update({ overrides: [...others, { pageId: item.pageId!, ...override, ...patch }] });
                  };
                  return <div key={item.pageId} className="grid items-center gap-2 rounded-lg border border-ui-border bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
                    <span className="text-sm font-medium text-ui-foreground">{item.label}</span>
                    <Input aria-label={`${item.label} custom label`} value={override?.label || ""} onChange={(event) => setOverride({ label: event.target.value })} placeholder="Custom label" maxLength={100} />
                    <label className="flex items-center gap-2 text-xs font-medium text-ui-muted"><Checkbox checked={Boolean(override?.hidden)} onChange={(event) => setOverride({ hidden: event.target.checked })} /> Hide</label>
                  </div>;
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <div><h4 className="text-sm font-semibold text-ui-foreground">Additional links</h4><p className="text-xs text-ui-muted">Use project pages or safe external URLs.</p></div>
              <button type="button" onClick={() => onChange(addPageNavigatorItem(config))} className="inline-flex items-center gap-1.5 rounded-lg bg-ui-ink px-3 py-2 text-xs font-semibold text-white hover:bg-ui-ink"><FiPlus /> Add link</button>
            </div>
            <div className="mt-3 space-y-3">
              {items.map((item, index) => (
                <div key={item.id} draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (draggedIndex !== null) onChange(movePageNavigatorItem(config, draggedIndex, index)); setDraggedIndex(null); }} className="rounded-xl border border-ui-border bg-white p-3">
                  <div className="grid gap-3 lg:grid-cols-[auto_1fr_150px_1.5fr_auto] lg:items-start">
                    <FiMenu className="mt-3 cursor-grab text-ui-placeholder" aria-hidden />
                    <label className="space-y-1 text-xs font-medium text-ui-muted">Label<Input maxLength={100} value={item.label} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, label: event.target.value } : candidate) })} />{errors[`additionalItems.${index}.label`] && <span className="text-ui-danger">{errors[`additionalItems.${index}.label`]}</span>}</label>
                    <label className="space-y-1 text-xs font-medium text-ui-muted">Type<ScalarSelect label={`Link ${index + 1} type`} value={item.destination.type} options={[{ value: "page", label: "Project page" }, { value: "external", label: "External URL" }]} onChange={(type) => onChange(changePageNavigatorDestinationType(config, item.id, type as "page" | "external"))} /></label>
                    <label className="space-y-1 text-xs font-medium text-ui-muted">Destination
                      {item.destination.type === "page" ? <ScalarSelect label={`Link ${index + 1} destination`} value={item.destination.pageId} options={[{ value: "", label: "Select a page" }, ...pages.filter((page) => page.id && page.id !== currentPageId).map((page) => ({ value: page.id!, label: page.name }))]} onChange={(pageId) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, destination: { type: "page", pageId } } : candidate) })} /> : <Input value={item.destination.url} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, destination: { type: "external", url: event.target.value } } : candidate) })} placeholder="https://example.com" />}
                      {errors[`additionalItems.${index}.destination`] && <span className="text-ui-danger">{errors[`additionalItems.${index}.destination`]}</span>}
                      {item.destination.type === "external" && <span className="mt-1 flex items-center gap-1"><Checkbox checked={Boolean(item.openInNewTab)} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, openInNewTab: event.target.checked } : candidate) })} /> Open in new tab</span>}
                    </label>
                    <div className="flex gap-1 pt-5"><button type="button" aria-label="Move link up" disabled={index === 0} onClick={() => onChange(movePageNavigatorItem(config, index, index - 1))} className="rounded p-2 hover:bg-ui-surface-subtle disabled:opacity-30"><FiArrowUp /></button><button type="button" aria-label="Move link down" disabled={index === items.length - 1} onClick={() => onChange(movePageNavigatorItem(config, index, index + 1))} className="rounded p-2 hover:bg-ui-surface-subtle disabled:opacity-30"><FiArrowDown /></button><button type="button" aria-label="Remove link" onClick={() => onChange(removePageNavigatorItem(config, item.id))} className="rounded p-2 text-ui-danger hover:bg-ui-danger-subtle"><FiTrash2 /></button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PageNavigatorPreview items={preview} />
        </div>
      )}
    </section>
  );
}
