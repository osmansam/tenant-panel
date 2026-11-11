import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import type { ColorValue } from "../../../model/paint";
import type { BarChartNode, ComponentNode, ProgressNode, TableNode } from "../../../model";
import { TABLE_STRUCTURE_LIMITS, tableStructurePatch, type TableStructureEdit } from "../../../operations";
import type { ComponentRendererMap, SemanticRendererContext } from "../types";
import { colorCss } from "../../../renderer/paintStyles";
import { InlineEditableText, InlineEntryText } from "../../../renderer/InlineTextEditor";

const ALERT_LEGEND = {
  info: "Information",
  success: "Success",
  warning: "Warning",
  danger: "Error",
} as const;

function isInlineEditing(node: ComponentNode, context: SemanticRendererContext): boolean {
  return context.mode === "canvas" && context.inlineEditingNodeId === node.id && context.inlineEditingTarget == null && context.onInlineTextCommit !== undefined && context.onInlineTextCancel !== undefined;
}

function renderTable(node: TableNode, context: SemanticRendererContext) {
  const showControls = context.mode === "canvas" && context.canvasSelected === true && context.onNodePatch !== undefined;

  const applyEdit = (edit: TableStructureEdit) => {
    if (context.onNodePatch === undefined) return;
    const patch = tableStructurePatch(node, edit);
    if (patch !== null) context.onNodePatch(node.id, patch);
  };

  const controlClick = (edit: TableStructureEdit) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    applyEdit(edit);
  };

  return (
    <figure className={context.className} style={context.combineNodeStyles(node)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          {node.headers.length > 0 ? (
            <thead>
              <tr>{node.headers.map((header, index) => (
                <th key={`${index}:${header}`} scope="col" className="vb-table-header-cell border-b border-current/30 px-3 py-2 font-semibold">
                  <InlineEntryText node={node} target={{ base: "headers", index }} context={context} />
                  {showControls ? (
                    <span className="vb-table-cell-controls" data-table-controls="column">
                      <button type="button" className="vb-table-control" aria-label={`Move column ${index + 1} left`} title="Move column left" disabled={index === 0} onClick={controlClick({ kind: "moveColumn", index, offset: -1 })}>←</button>
                      <button type="button" className="vb-table-control" aria-label={`Move column ${index + 1} right`} title="Move column right" disabled={index === node.headers.length - 1} onClick={controlClick({ kind: "moveColumn", index, offset: 1 })}>→</button>
                      <button type="button" className="vb-table-control" aria-label={`Remove column ${index + 1}`} title="Remove column" disabled={node.headers.length <= 1} onClick={controlClick({ kind: "removeColumn", index })}>×</button>
                    </span>
                  ) : null}
                </th>
              ))}</tr>
            </thead>
          ) : null}
          <tbody>
            {node.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-black/[0.03]" : undefined}>
                {row.map((cell, cellIndex) => {
                  const lastCell = cellIndex === row.length - 1;
                  return (
                    <td key={cellIndex} className={`border-b border-current/10 px-3 py-2${lastCell && showControls ? " vb-table-last-cell" : ""}`}>
                      <InlineEntryText node={node} target={{ base: "rows", index: rowIndex, sub: cellIndex }} context={context} />
                      {lastCell && showControls ? (
                        <span className="vb-table-cell-controls vb-table-row-controls" data-table-controls="row">
                          <button type="button" className="vb-table-control" aria-label={`Move row ${rowIndex + 1} up`} title="Move row up" disabled={rowIndex === 0} onClick={controlClick({ kind: "moveRow", index: rowIndex, offset: -1 })}>↑</button>
                          <button type="button" className="vb-table-control" aria-label={`Move row ${rowIndex + 1} down`} title="Move row down" disabled={rowIndex === node.rows.length - 1} onClick={controlClick({ kind: "moveRow", index: rowIndex, offset: 1 })}>↓</button>
                          <button type="button" className="vb-table-control" aria-label={`Remove row ${rowIndex + 1}`} title="Remove row" disabled={node.rows.length <= 1} onClick={controlClick({ kind: "removeRow", index: rowIndex })}>×</button>
                        </span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {node.caption ? <figcaption className="mt-2 text-xs opacity-70"><InlineEntryText node={node} target={{ base: "caption" }} context={context} /></figcaption> : null}
      {showControls ? (
        <div className="vb-table-add-controls" data-table-controls="add">
          <button type="button" className="vb-table-add-control" aria-label="Add column" disabled={node.headers.length >= TABLE_STRUCTURE_LIMITS.maxColumns} onClick={controlClick({ kind: "addColumn", index: node.headers.length - 1 })}>+ Column</button>
          <button type="button" className="vb-table-add-control" aria-label="Add row" disabled={node.rows.length >= TABLE_STRUCTURE_LIMITS.maxRows} onClick={controlClick({ kind: "addRow", index: node.rows.length - 1 })}>+ Row</button>
        </div>
      ) : null}
    </figure>
  );
}

function accentStyle(color: ColorValue | undefined): CSSProperties | undefined {
  return color === undefined ? undefined : { "--ve-accent": colorCss(color) } as CSSProperties;
}

function ProgressBar({ node, context }: { node: ProgressNode; context: SemanticRendererContext }) {
  const editable = context.mode === "canvas" && context.onNodePatch !== undefined;
  const [draft, setDraft] = useState<number | null>(null);
  const draftRef = useRef<number | null>(null);
  const percent = Math.round(Math.max(0, Math.min(100, draft ?? node.value)));

  const pointerValue = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return null;
    return Math.round(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 100);
  };
  const updateDraft = (event: ReactPointerEvent<HTMLDivElement>) => {
    const value = pointerValue(event);
    if (value === null) return;
    draftRef.current = value;
    setDraft(value);
  };
  const start = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!editable || event.button > 0) return;
    event.preventDefault();
    event.stopPropagation();
    context.onSelect?.(node.id);
    event.currentTarget.focus();
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    updateDraft(event);
  };
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draftRef.current === null) return;
    event.preventDefault();
    event.stopPropagation();
    updateDraft(event);
  };
  const finish = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draftRef.current === null) return;
    event.preventDefault();
    event.stopPropagation();
    const value = draftRef.current;
    draftRef.current = null;
    setDraft(null);
    try {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch { /* Cleanup may run after this browser resource has already been released. */ }
    if (value !== Math.round(Math.max(0, Math.min(100, node.value)))) context.onNodePatch?.(node.id, { value });
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!editable) return;
    const step = event.shiftKey ? 10 : 1;
    const next = event.key === "ArrowRight" || event.key === "ArrowUp" ? Math.min(100, percent + step)
      : event.key === "ArrowLeft" || event.key === "ArrowDown" ? Math.max(0, percent - step)
        : event.key === "PageUp" ? Math.min(100, percent + 10)
          : event.key === "PageDown" ? Math.max(0, percent - 10)
            : event.key === "Home" ? 0
              : event.key === "End" ? 100
                : null;
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    if (next !== percent) context.onNodePatch?.(node.id, { value: next });
  };

  return (
    <div
      className={context.className}
      style={context.combineNodeStyles(node, accentStyle(node.accentColor))}
      role={editable ? undefined : "progressbar"}
      aria-valuemin={editable ? undefined : 0}
      aria-valuemax={editable ? undefined : 100}
      aria-valuenow={editable ? undefined : percent}
      data-progress={percent}
      data-progress-dragging={draft !== null ? "true" : undefined}
    >
      {node.label !== undefined
        ? <span data-progress-label>{isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.label} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : node.label}</span>
        : null}
      <div
        data-progress-track
        data-progress-editable={editable ? "true" : undefined}
        aria-hidden={editable ? undefined : true}
        role={editable ? "slider" : undefined}
        tabIndex={editable ? 0 : undefined}
        aria-label={editable ? "Progress value" : undefined}
        aria-valuemin={editable ? 0 : undefined}
        aria-valuemax={editable ? 100 : undefined}
        aria-valuenow={editable ? percent : undefined}
        aria-valuetext={editable ? `${percent}%` : undefined}
        title={editable ? "Drag to set progress" : undefined}
        onPointerDown={editable ? start : undefined}
        onPointerMove={editable ? move : undefined}
        onPointerUp={editable ? finish : undefined}
        onPointerCancel={editable ? finish : undefined}
        onKeyDown={editable ? keyDown : undefined}
        onClick={editable ? (event) => event.stopPropagation() : undefined}
        onDragStart={editable ? (event) => { event.preventDefault(); event.stopPropagation(); } : undefined}
      ><div data-progress-fill style={{ width: `${percent}%` }} /></div>
      {node.showValue ? <span data-progress-value>{percent}%</span> : null}
    </div>
  );
}

function BarChart({ node, context }: { node: BarChartNode; context: SemanticRendererContext }) {
  const editable = context.mode === "canvas" && context.onNodePatch !== undefined;
  const dataMax = Math.max(...node.bars.map((bar) => bar.value), 0);
  // Preserve the editing range when the tallest bar is lowered, including across undo/redo.
  const [editingMax, setEditingMax] = useState(() => dataMax || 100);
  const max = editable ? Math.max(editingMax, dataMax) : dataMax;
  type Draft = { index: number; value: number; pointerId: number; max: number };
  const [draft, setDraft] = useState<Draft | null>(null);
  const draftRef = useRef<Draft | null>(null);

  const pointerValue = (event: ReactPointerEvent<HTMLDivElement>, range: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.height <= 0) return null;
    return Math.min(range, Math.round(Math.max(0, Math.min(1, (rect.bottom - event.clientY) / rect.height)) * range));
  };
  const clearDraft = (target: HTMLDivElement) => {
    const active = draftRef.current;
    draftRef.current = null;
    setDraft(null);
    try {
      if (active && target.hasPointerCapture?.(active.pointerId)) target.releasePointerCapture(active.pointerId);
    } catch { /* Cleanup may run after this browser resource has already been released. */ }
  };
  const commit = (index: number, value: number, range: number) => {
    setEditingMax(range);
    if (value !== node.bars[index].value) {
      context.onNodePatch?.(node.id, { bars: node.bars.map((bar, barIndex) => barIndex === index ? { ...bar, value } : bar) });
    }
  };
  const start = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
    if (event.button > 0 || draftRef.current !== null) return;
    const value = pointerValue(event, max);
    if (value === null) return;
    event.preventDefault();
    event.stopPropagation();
    context.onSelect?.(node.id);
    event.currentTarget.focus();
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Cleanup may run after this browser resource has already been released. */ }
    draftRef.current = { index, value, pointerId: event.pointerId, max };
    setDraft(draftRef.current);
  };
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const active = draftRef.current;
    if (active === null || active.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const value = pointerValue(event, active.max);
    if (value === null) return;
    draftRef.current = { ...active, value };
    setDraft(draftRef.current);
  };
  const finish = (event: ReactPointerEvent<HTMLDivElement>) => {
    const active = draftRef.current;
    if (active === null || active.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const value = pointerValue(event, active.max) ?? active.value;
    clearDraft(event.currentTarget);
    commit(active.index, value, active.max);
  };
  const cancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draftRef.current?.pointerId !== event.pointerId) return;
    event.stopPropagation();
    clearDraft(event.currentTarget);
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (draftRef.current !== null) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        clearDraft(event.currentTarget);
      }
      return;
    }
    const value = node.bars[index].value;
    const step = event.shiftKey ? 10 : 1;
    const next = event.key === "ArrowUp" || event.key === "ArrowRight" ? Math.min(max, value + step)
      : event.key === "ArrowDown" || event.key === "ArrowLeft" ? Math.max(0, value - step)
        : event.key === "PageUp" ? Math.min(max, value + 10)
          : event.key === "PageDown" ? Math.max(0, value - 10)
            : event.key === "Home" ? 0 : event.key === "End" ? max : null;
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    commit(index, next, max);
  };

  return (
    <div className={context.className} style={context.combineNodeStyles(node, accentStyle(node.accentColor))} data-bar-chart data-bar-dragging={draft !== null ? "true" : undefined}>
      {node.bars.map((bar, index) => {
        const value = draft?.index === index ? draft.value : bar.value;
        return (
          <div key={index} data-bar-column>
            {node.showValues ? <span data-bar-value>{value}</span> : <span data-bar-value aria-hidden="true" />}
            <div
              data-bar-track
              data-bar-editable={editable ? "true" : undefined}
              aria-hidden={editable ? undefined : true}
              role={editable ? "slider" : undefined}
              tabIndex={editable ? 0 : undefined}
              aria-label={editable ? `Bar ${index + 1}: ${bar.label}` : undefined}
              aria-orientation={editable ? "vertical" : undefined}
              aria-valuemin={editable ? 0 : undefined}
              aria-valuemax={editable ? max : undefined}
              aria-valuenow={editable ? value : undefined}
              title={editable ? "Drag up or down to set bar value" : undefined}
              onPointerDown={editable ? (event) => start(event, index) : undefined}
              onPointerMove={editable ? move : undefined}
              onPointerUp={editable ? finish : undefined}
              onPointerCancel={editable ? cancel : undefined}
              onLostPointerCapture={editable ? cancel : undefined}
              onKeyDown={editable ? (event) => keyDown(event, index) : undefined}
              onClick={editable ? (event) => event.stopPropagation() : undefined}
              onDragStart={editable ? (event) => { event.preventDefault(); event.stopPropagation(); } : undefined}
            >
              <div data-bar-fill style={{ height: `${max > 0 ? Math.round((value / max) * 100) : 0}%` }} />
            </div>
            <span data-bar-label><InlineEntryText node={node} target={{ base: "bars", index, sub: "label" }} context={context} /></span>
          </div>
        );
      })}
    </div>
  );
}

export const extendedContentRenderers = {
  video: (node, context) => {
    const wrapperClassName = [context.className, node.aspectRatio === "square" ? "aspect-square" : node.aspectRatio === "landscape" ? "aspect-[4/3]" : node.aspectRatio === "wide" ? "aspect-video" : node.aspectRatio === "portrait" ? "aspect-[3/4]" : ""].filter(Boolean).join(" ");
    return (
      <video
        className={wrapperClassName}
        style={context.combineNodeStyles(node)}
        src={node.src}
        title={node.title}
        poster={node.poster}
        controls
        preload="metadata"
        {...(node.autoplay ? { autoPlay: true } : {})}
        {...(node.loop ? { loop: true } : {})}
        {...(node.muted || node.autoplay ? { muted: true } : {})}
      />
    );
  },
  audio: (node, context) => (
    <audio
      className={context.className}
      style={context.combineNodeStyles(node)}
      src={node.src}
      aria-label={node.accessibleLabel}
      controls
      preload="metadata"
      {...(node.autoplay ? { autoPlay: true } : {})}
      {...(node.loop ? { loop: true } : {})}
    />
  ),
  embed: (node, context) => {
    const wrapperClassName = [context.className, node.aspectRatio === "square" ? "aspect-square" : node.aspectRatio === "landscape" ? "aspect-[4/3]" : node.aspectRatio === "wide" ? "aspect-video" : node.aspectRatio === "portrait" ? "aspect-[3/4]" : "", "block w-full"].filter(Boolean).join(" ");
    return (
      <iframe
        className={wrapperClassName}
        style={context.combineNodeStyles(node)}
        src={node.src}
        title={node.title}
        loading={node.loading}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  },
  table: renderTable,
  progress: (node, context) => <ProgressBar node={node} context={context} />,
  steps: (node, context) => (
    <ol className={context.className} style={context.combineNodeStyles(node)} data-steps-current={node.current}>
      {node.items.map((item, index) => (
        <li key={`${index}:${item}`} data-step-state={index < node.current ? "done" : index === node.current ? "current" : "todo"}>
          <span data-step-number aria-hidden="true">{index < node.current ? "✓" : index + 1}</span>
          <span data-step-label><InlineEntryText node={node} target={{ base: "items", index }} context={context} /></span>
        </li>
      ))}
    </ol>
  ),
  timeline: (node, context) => (
    <ol className={context.className} style={context.combineNodeStyles(node)}>
      {node.entries.map((entry, index) => (
        <li key={`${index}:${entry.title}`} data-timeline-entry>
          <span data-timeline-dot aria-hidden="true" />
          <div>
            <div data-timeline-title><InlineEntryText node={node} target={{ base: "entries", index, sub: "title" }} context={context} /></div>
            <div data-timeline-description><InlineEntryText node={node} target={{ base: "entries", index, sub: "description" }} context={context} /></div>
          </div>
        </li>
      ))}
    </ol>
  ),
  alert: (node, context) => (
    <div className={context.className} style={context.combineNodeStyles(node)} role="alert" data-alert-variant={node.variant}>
      <span data-alert-legend aria-hidden="true">{node.title !== undefined ? <InlineEntryText node={node} target={{ base: "title" }} context={context} /> : ALERT_LEGEND[node.variant]}</span>
      <p data-alert-body>{isInlineEditing(node, context) ? <InlineEditableText nodeId={node.id} value={node.body} onCommit={context.onInlineTextCommit!} onCancel={context.onInlineTextCancel!} /> : node.body}</p>
    </div>
  ),
  tags: (node, context) => (
    <div className={context.className} style={context.combineNodeStyles(node)}>
      {node.items.map((item, index) => (
        <span key={`${index}:${item}`} data-tag-chip><InlineEntryText node={node} target={{ base: "items", index }} context={context} /></span>
      ))}
    </div>
  ),
  kbd: (node, context) => (
    <div className={context.className} style={context.combineNodeStyles(node)}>
      {node.keys.map((key, index) => (
        <span key={`${index}:${key}`} className="inline-flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true" className="opacity-60">+</span> : null}
          <kbd data-kbd-key><InlineEntryText node={node} target={{ base: "keys", index }} context={context} /></kbd>
        </span>
      ))}
    </div>
  ),
  "bar-chart": (node, context) => <BarChart node={node} context={context} />,
  sparkline: (node, context) => {
    const points = node.points;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 120;
    const height = 32;
    const coordinates = points.map((value, index) => `${(index / Math.max(points.length - 1, 1)) * (width - 8) + 4},${height - 4 - ((value - min) / range) * (height - 8)}`);
    const last = coordinates[coordinates.length - 1]?.split(",") ?? [width, height];
    return (
      <span className={context.className} style={context.combineNodeStyles(node, accentStyle(node.accentColor))} role="img" aria-label={`${node.ariaLabel}: ${points.join(", ")}`}>
        <svg data-sparkline viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true" focusable="false">
          {node.showArea ? <polygon data-sparkline-area points={`4,${height - 4} ${coordinates.join(" ")} ${last[0]},${height - 4}`} /> : null}
          <polyline data-sparkline-line points={coordinates.join(" ")} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  },
} satisfies Pick<ComponentRendererMap, "video" | "audio" | "embed" | "table" | "progress" | "steps" | "timeline" | "alert" | "tags" | "kbd" | "bar-chart" | "sparkline">;
