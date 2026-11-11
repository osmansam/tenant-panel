"use client";

import type { BarChartNode, TableNode, TimelineNode, TagsNode, KbdNode, StepsNode } from "../model";
import type { NodePatch } from "../operations";
import { InspectorButtonRow, InspectorInput, InspectorNumber, InspectorSection } from "./InspectorSection";

export function TagsEditor({ node, onUpdate }: { node: TagsNode; onUpdate(patch: NodePatch): void }) {
  return <StringArrayEditor sectionTitle="Tags" label="Tag" items={node.items} onItems={(items) => onUpdate({ items })} />;
}

export function KbdEditor({ node, onUpdate }: { node: KbdNode; onUpdate(patch: NodePatch): void }) {
  return <StringArrayEditor sectionTitle="Keys" label="Key" items={node.keys} onItems={(keys) => onUpdate({ keys })} singular="press" />;
}

export function StepsEditor({ node, onUpdate }: { node: StepsNode; onUpdate(patch: NodePatch): void }) {
  return (
    <>
      <StringArrayEditor sectionTitle="Steps" label="Step" items={node.items} onItems={(items) => onUpdate({ items: items.length === 0 ? node.items : items, current: Math.min(node.current, items.length - 1) })} singular="step" />
      <InspectorSection title="Progress">
        <InspectorNumber
          label="Current step"
          ariaLabel="Current step index"
          value={node.current}
          min={0}
          max={Math.max(node.items.length - 1, 0)}
          step={1}
          onChange={(current) => onUpdate({ current })}
        />
      </InspectorSection>
    </>
  );
}

export function TableEditor({ node, onUpdate }: { node: TableNode; onUpdate(patch: NodePatch): void }) {
  const setHeaders = (headers: string[]) => onUpdate({ headers, rows: node.rows.map((row) => headers.map((_, index) => row[index] ?? "")) });
  const setRows = (rows: string[][]) => onUpdate({ rows });
  return (
    <>
      <InspectorSection title="Table headers">
        {node.headers.map((header, index) => (
          <div key={index} className="vb-field vb-field--stacked">
            <InspectorInput
              label={`Column ${index + 1}`}
              ariaLabel={`Table column ${index + 1} header`}
              value={header}
              onChange={(value) => setHeaders(node.headers.map((existing, headerIndex) => headerIndex === index ? value : existing))}
            />
            <InspectorButtonRow
              upDisabled={index === 0}
              downDisabled={index === node.headers.length - 1}
              removeDisabled={node.headers.length === 1}
              onUp={() => move(node.headers, setHeaders, index, -1)}
              onDown={() => move(node.headers, setHeaders, index, 1)}
              onRemove={() => setHeaders(node.headers.filter((_, headerIndex) => headerIndex !== index))}
              onAdd={() => onUpdate({ headers: [...node.headers, `Column ${node.headers.length + 1}`], rows: node.rows.map((row) => [...row, ""]) })}
            />
          </div>
        ))}
      </InspectorSection>
      <InspectorSection title="Table rows">
        {node.rows.map((row, rowIndex) => (
          <fieldset key={rowIndex} className="vb-spacing-fieldset">
            <legend className="vb-spacing-legend">Row {rowIndex + 1}</legend>
            {row.map((cell, cellIndex) => (
              <InspectorInput
                key={cellIndex}
                compact
                label={node.headers[cellIndex] ?? `Cell ${cellIndex + 1}`}
                ariaLabel={`Row ${rowIndex + 1} cell ${cellIndex + 1}`}
                value={cell}
                stacked
                onChange={(value) => setRows(node.rows.map((existing, existingRowIndex) => existingRowIndex === rowIndex ? existing.map((cellValue, cellIndex2) => cellIndex2 === cellIndex ? value : cellValue) : existing))}
              />
            ))}
            <InspectorButtonRow
              upDisabled={rowIndex === 0}
              downDisabled={rowIndex === node.rows.length - 1}
              removeDisabled={node.rows.length === 1}
              onUp={() => move(node.rows, setRows, rowIndex, -1)}
              onDown={() => move(node.rows, setRows, rowIndex, 1)}
              onRemove={() => setRows(node.rows.filter((_, existingRowIndex) => existingRowIndex !== rowIndex))}
              onAdd={() => setRows([...node.rows.slice(0, rowIndex + 1), node.headers.map(() => "New value"), ...node.rows.slice(rowIndex + 1)])}
            />
          </fieldset>
        ))}
      </InspectorSection>
    </>
  );
}

export function TimelineEditor({ node, onUpdate }: { node: TimelineNode; onUpdate(patch: NodePatch): void }) {
  const setEntries = (entries: TimelineNode["entries"]) => onUpdate({ entries });
  return (
    <InspectorSection title="Timeline entries">
      {node.entries.map((entry, index) => (
        <fieldset key={index} className="vb-spacing-fieldset">
          <legend className="vb-spacing-legend">Entry {index + 1}</legend>
          <InspectorInput
            label="Date"
            ariaLabel={`Timeline entry ${index + 1} date`}
            value={entry.title}
            stacked
            onChange={(title) => setEntries(node.entries.map((existing, entryIndex) => entryIndex === index ? { ...existing, title } : existing))}
          />
          <InspectorInput
            label="Description"
            ariaLabel={`Timeline entry ${index + 1} description`}
            value={entry.description}
            stacked
            onChange={(description) => setEntries(node.entries.map((existing, entryIndex) => entryIndex === index ? { ...existing, description } : existing))}
          />
          <InspectorButtonRow
            upDisabled={index === 0}
            downDisabled={index === node.entries.length - 1}
            removeDisabled={node.entries.length === 1}
            onUp={() => move(node.entries, setEntries, index, -1)}
            onDown={() => move(node.entries, setEntries, index, 1)}
            onRemove={() => setEntries(node.entries.filter((_, entryIndex) => entryIndex !== index))}
            onAdd={() => setEntries([...node.entries.slice(0, index + 1), { title: "Today", description: "What happened next." }, ...node.entries.slice(index + 1)])}
          />
        </fieldset>
      ))}
    </InspectorSection>
  );
}

export function BarChartEditor({ node, onUpdate }: { node: BarChartNode; onUpdate(patch: NodePatch): void }) {
  const setBars = (bars: BarChartNode["bars"]) => onUpdate({ bars });
  return (
    <InspectorSection title="Chart bars">
      {node.bars.map((bar, index) => (
        <fieldset key={index} className="vb-spacing-fieldset">
          <legend className="vb-spacing-legend">Bar {index + 1}</legend>
          <InspectorInput
            label="Label"
            ariaLabel={`Chart bar ${index + 1} label`}
            value={bar.label}
            stacked
            onChange={(label) => setBars(node.bars.map((existing, barIndex) => barIndex === index ? { ...existing, label } : existing))}
          />
          <InspectorNumber
            label="Value"
            ariaLabel={`Chart bar ${index + 1} value`}
            value={bar.value}
            min={0}
            max={100000}
            step={1}
            stacked
            onChange={(value) => setBars(node.bars.map((existing, barIndex) => barIndex === index ? { ...existing, value } : existing))}
          />
          <InspectorButtonRow
            upDisabled={index === 0}
            downDisabled={index === node.bars.length - 1}
            removeDisabled={node.bars.length === 1}
            onUp={() => move(node.bars, setBars, index, -1)}
            onDown={() => move(node.bars, setBars, index, 1)}
            onRemove={() => setBars(node.bars.filter((_, barIndex) => barIndex !== index))}
            onAdd={() => setBars([...node.bars.slice(0, index + 1), { label: "New", value: 50 }, ...node.bars.slice(index + 1)])}
          />
        </fieldset>
      ))}
    </InspectorSection>
  );
}

function StringArrayEditor({ sectionTitle, label, items, onItems, singular = "item" }: { sectionTitle: string; label: string; items: string[]; onItems(items: string[]): void; singular?: string }) {
  return (
    <InspectorSection title={sectionTitle}>
      {items.map((item, index) => (
        <div key={index} className="vb-field vb-field--stacked">
          <InspectorInput label={`${label} ${index + 1}`} ariaLabel={`${label} ${index + 1}`} value={item} onChange={(value) => onItems(items.map((existing, itemIndex) => itemIndex === index ? value : existing))} />
          <InspectorButtonRow
            upDisabled={index === 0}
            downDisabled={index === items.length - 1}
            removeDisabled={items.length === 1}
            onUp={() => move(items, onItems, index, -1)}
            onDown={() => move(items, onItems, index, 1)}
            onRemove={() => onItems(items.filter((_, itemIndex) => itemIndex !== index))}
            onAdd={() => onItems([...items.slice(0, index + 1), `New ${singular}`, ...items.slice(index + 1)])}
          />
        </div>
      ))}
    </InspectorSection>
  );
}

function move<T>(items: T[], onChange: (items: T[]) => void, index: number, offset: -1 | 1): void {
  const target = index + offset;
  if (target < 0 || target >= items.length) return;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  onChange(next);
}
