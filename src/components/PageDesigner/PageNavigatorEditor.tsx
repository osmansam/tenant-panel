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

interface Props {
  value?: PageNavigatorConfig;
  pages: PageModel[];
  currentPageId: string;
  onChange: (value: PageNavigatorConfig | undefined) => void;
}

const inputClass = "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

export function PageNavigatorEditor({ value, pages, currentPageId, onChange }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const config = value || { ...defaultPageNavigatorConfig(), enabled: false };
  const errors = useMemo(() => validatePageNavigatorDraft(config, pages), [config, pages]);
  const preview = useMemo(() => resolvePageNavigatorPreview({ pages, currentPageId, config }), [pages, currentPageId, config]);
  const update = (patch: Partial<PageNavigatorConfig>) => onChange({ ...config, ...patch });
  const items = config.additionalItems || [];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Page header</p>
          <h3 className="mt-1 text-base font-semibold text-neutral-900">Breadcrumb navigation</h3>
          <p className="mt-1 text-sm text-neutral-500">Generate a clear location trail from the project page hierarchy.</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700">
          <input type="checkbox" checked={config.enabled} onChange={(event) => update({ enabled: event.target.checked })} className="h-4 w-4 accent-violet-600" />
          Enabled
        </label>
      </div>

      {config.enabled && (
        <div className="mt-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-1.5 text-sm font-medium text-neutral-700">Mode
              <select className={inputClass} value={config.mode} onChange={(event) => update({ mode: event.target.value as PageNavigatorConfig["mode"] })}>
                <option value="automatic">Automatic hierarchy</option>
                <option value="custom">Custom trail</option>
              </select>
            </label>
            <label className="space-y-1.5 text-sm font-medium text-neutral-700">Home label
              <input className={inputClass} maxLength={100} value={config.homeLabel || ""} onChange={(event) => update({ homeLabel: event.target.value })} placeholder="Home" />
              {errors.homeLabel && <span className="block text-xs text-red-600">{errors.homeLabel}</span>}
            </label>
            <label className="flex items-center gap-2 self-end rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium text-neutral-700">
              <input type="checkbox" checked={config.showHome} onChange={(event) => update({ showHome: event.target.checked })} className="h-4 w-4 accent-violet-600" />
              Show project home
            </label>
          </div>

          {config.mode === "automatic" && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-800">Generated hierarchy overrides</h4>
              <div className="mt-2 grid gap-2">
                {resolvePageNavigatorPreview({ pages, currentPageId, config: { ...config, overrides: [] } }).filter((item) => !item.current && item.pageId).map((item) => {
                  const override = config.overrides?.find((candidate) => candidate.pageId === item.pageId);
                  const setOverride = (patch: { label?: string; hidden?: boolean }) => {
                    const others = (config.overrides || []).filter((candidate) => candidate.pageId !== item.pageId);
                    update({ overrides: [...others, { pageId: item.pageId!, ...override, ...patch }] });
                  };
                  return <div key={item.pageId} className="grid items-center gap-2 rounded-lg border border-neutral-200 bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
                    <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                    <input className={inputClass} value={override?.label || ""} onChange={(event) => setOverride({ label: event.target.value })} placeholder="Custom label" maxLength={100} />
                    <label className="flex items-center gap-2 text-xs font-medium text-neutral-600"><input type="checkbox" checked={Boolean(override?.hidden)} onChange={(event) => setOverride({ hidden: event.target.checked })} /> Hide</label>
                  </div>;
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <div><h4 className="text-sm font-semibold text-neutral-800">Additional links</h4><p className="text-xs text-neutral-500">Use project pages or safe external URLs.</p></div>
              <button type="button" onClick={() => onChange(addPageNavigatorItem(config))} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700"><FiPlus /> Add link</button>
            </div>
            <div className="mt-3 space-y-3">
              {items.map((item, index) => (
                <div key={item.id} draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (draggedIndex !== null) onChange(movePageNavigatorItem(config, draggedIndex, index)); setDraggedIndex(null); }} className="rounded-xl border border-neutral-200 bg-white p-3">
                  <div className="grid gap-3 lg:grid-cols-[auto_1fr_150px_1.5fr_auto] lg:items-start">
                    <FiMenu className="mt-3 cursor-grab text-neutral-400" aria-hidden />
                    <label className="space-y-1 text-xs font-medium text-neutral-600">Label<input className={inputClass} maxLength={100} value={item.label} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, label: event.target.value } : candidate) })} />{errors[`additionalItems.${index}.label`] && <span className="text-red-600">{errors[`additionalItems.${index}.label`]}</span>}</label>
                    <label className="space-y-1 text-xs font-medium text-neutral-600">Type<select className={inputClass} value={item.destination.type} onChange={(event) => onChange(changePageNavigatorDestinationType(config, item.id, event.target.value as "page" | "external"))}><option value="page">Project page</option><option value="external">External URL</option></select></label>
                    <label className="space-y-1 text-xs font-medium text-neutral-600">Destination
                      {item.destination.type === "page" ? <select className={inputClass} value={item.destination.pageId} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, destination: { type: "page", pageId: event.target.value } } : candidate) })}><option value="">Select a page</option>{pages.filter((page) => page.id && page.id !== currentPageId).map((page) => <option key={page.id} value={page.id}>{page.name}</option>)}</select> : <input className={inputClass} value={item.destination.url} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, destination: { type: "external", url: event.target.value } } : candidate) })} placeholder="https://example.com" />}
                      {errors[`additionalItems.${index}.destination`] && <span className="text-red-600">{errors[`additionalItems.${index}.destination`]}</span>}
                      {item.destination.type === "external" && <span className="mt-1 flex items-center gap-1"><input type="checkbox" checked={Boolean(item.openInNewTab)} onChange={(event) => update({ additionalItems: items.map((candidate) => candidate.id === item.id ? { ...candidate, openInNewTab: event.target.checked } : candidate) })} /> Open in new tab</span>}
                    </label>
                    <div className="flex gap-1 pt-5"><button type="button" aria-label="Move link up" disabled={index === 0} onClick={() => onChange(movePageNavigatorItem(config, index, index - 1))} className="rounded p-2 hover:bg-neutral-100 disabled:opacity-30"><FiArrowUp /></button><button type="button" aria-label="Move link down" disabled={index === items.length - 1} onClick={() => onChange(movePageNavigatorItem(config, index, index + 1))} className="rounded p-2 hover:bg-neutral-100 disabled:opacity-30"><FiArrowDown /></button><button type="button" aria-label="Remove link" onClick={() => onChange(removePageNavigatorItem(config, item.id))} className="rounded p-2 text-red-600 hover:bg-red-50"><FiTrash2 /></button></div>
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
