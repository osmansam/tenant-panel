import { useMemo, useState } from "react";
import { Button, WorkspaceDialog } from "../components/ui";
import type { ComponentDocument, RepeaterNode } from "../visual-engine/model";
import type { VisualDataSchema } from "../visual-engine/host/DataContext";
import { findAncestors, findNode } from "../visual-engine/operations/queryNode";
import { VisualRenderer } from "../visual-engine/renderer";
import { collectionSourceKey } from "../visual-engine/renderer/repeaters";
import { ThemeProvider } from "../visual-engine/host/ThemeProvider";
import { ThemeScope, type SiteTheme } from "../visual-engine/theme";
import { instantiateDocument } from "../visual-engine/renderer/instances";
import { parseSampleRecords, wrapWithRepeater } from "./visualData";
import { planCollection } from "./data/collectionPlan";
const examples = Array.from({ length: 5 }, (_, index) => ({ _id: `example-${index + 1}`, name: `Example product ${index + 1}`, price: (index + 1) * 10, imageUrl: "/visual-builder/placeholder.svg" }));
export default function VisualDataTools({ document, selectedId, onReplace, onSelect, schemas, theme }: { document: ComponentDocument; selectedId: string | null; onReplace: (doc: ComponentDocument) => void; onSelect: (id: string) => void; schemas: readonly VisualDataSchema[]; theme?: SiteTheme }) {
 const selected = selectedId ? findNode(document.root, selectedId) : undefined;
 const canRepeat = !!selected && ["card", "stack", "flex"].includes(selected.type);
 const repeater = (selected?.type === "repeater" ? selected : selectedId ? findAncestors(document.root, selectedId).reverse().find(node => node.type === "repeater") : undefined) as RepeaterNode | undefined;
 const [open, setOpen] = useState(false), [preview, setPreview] = useState(false), [error, setError] = useState("");
 const [samples, setSamples] = useState<Record<string, { text: string; source: string }>>({});
 const key = repeater ? collectionSourceKey(repeater.source) : "";
 const current = repeater && samples[repeater.id]?.source === key ? samples[repeater.id].text : "";
 const change = (text: string) => { if (repeater) setSamples(previous => ({ ...previous, [repeater.id]: { text, source: key } })); setPreview(false); setError(""); };
 const collections = useMemo(() => {
  const result: Record<string, Record<string, unknown>[]> = {};
  const visit = (node: ComponentDocument["root"] | import("../visual-engine/model").ComponentNode) => {
   if (node.type === "repeater") { const sample = samples[node.id]; if (sample && sample.source === collectionSourceKey(node.source)) { try { result[sample.source] = parseSampleRecords(sample.text); } catch { /* current input is validated on preview */ } } }
   if ("children" in node) node.children.forEach(visit);
  };
  visit(document.root); return result;
 }, [samples, document]);
 const copied = useMemo(() => instantiateDocument(document, "sample-preview"), [document]);
 let diagnostic = "";
 if (repeater) { const plan = planCollection(repeater.source, Object.fromEntries((schemas.find(schema => schema.name === repeater.source.schemaName)?.fields || []).map(field => [field.name, field.type]))); if (!plan.ok) diagnostic = plan.reason; }
 return <div className="flex flex-wrap items-center gap-3 border-b bg-white px-4 py-2 text-sm text-slate-700">
  <Button variant="outline" disabled={!canRepeat} title={!canRepeat ? "Select a Card, Stack or Flex in Layers to repeat it." : undefined} onClick={() => { try { const wrapped = wrapWithRepeater(document, selectedId!, schemas[0]?.name || "products"); onReplace(wrapped.document); onSelect(wrapped.repeaterId); setError(""); } catch (reason) { setError((reason as Error).message); } }}>Repeat with data</Button>
  <Button variant="outline" disabled={!repeater} onClick={() => { setOpen(true); setPreview(false); }}>Sample records</Button>
  {!canRepeat && !repeater && <span>Select a Card, Stack or Flex in Layers to repeat it.</span>}
  <span>Design one item. Use <code>{"{{item.name}}"}</code> or <code>{"Price: {{item.price}}"}</code> in its content fields. Preview sample records before publishing.</span>
  {diagnostic && <span role="status">{diagnostic}</span>}{error && <span role="alert">{error}</span>}
  {open && repeater && <WorkspaceDialog open title="Sample records" size="workspace" onClose={() => { setOpen(false); setPreview(false); }} footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setOpen(false)}>Close samples</Button><Button onClick={() => { try { if (!current) throw new Error("Add sample records first."); parseSampleRecords(current); setError(""); setPreview(true); } catch (reason) { setError((reason as Error).message); } }}>Preview data</Button></div>}>
   <p className="mb-3 text-sm">Sample data only. Records stay in this editor session and are never saved with the design. Published pages request live data using the visitor's permissions.</p>
   <Button variant="outline" onClick={() => change(JSON.stringify(examples, null, 2))}>Load five example products</Button>
   <textarea aria-label="Sample records JSON" className="my-3 h-44 w-full rounded border p-3 font-mono text-xs" value={current} onChange={event => change(event.target.value)} />
   {error && <p role="alert">{error}</p>}
   {preview && <div className="ve-utilities" aria-label="Sample data preview"><ThemeProvider projectKey="samples" defaultMode="light" fixedMode="light"><ThemeScope theme={theme} palette="light" defaultMode="light" scopeId="visual-sample-data"><VisualRenderer document={copied} mode="preview" themeMode="light" resolvedCollections={collections} /></ThemeScope></ThemeProvider></div>}
  </WorkspaceDialog>}
 </div>;
}
