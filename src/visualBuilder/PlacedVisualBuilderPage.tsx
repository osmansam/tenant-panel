import VisualRequestConnectionEditor from "./VisualRequestConnectionEditor";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CellSizingEditor from "./CellSizingEditor";
import type { VisualCellSizing } from "./cellSizing";
import RecordConnectionEditor from "./RecordConnectionEditor";
import type { ParameterBinding } from "../utils/api/page";
import VisualDataBuilder from "./VisualDataBuilder";
import { DEFAULT_SITE_THEME, type SiteTheme } from "../visual-engine/theme";
import type { ComponentDocument } from "../visual-engine/model";
import { listVisualBlocks, readVisualBlock } from "./pageAdapter";
import { createPageRepository } from "./pageRepository";
import { createLibraryRepository } from "./libraryRepository";
import { copyVisualDesign } from "./componentLibrary";
import { managementErrorMessage } from "./managementClient";
import { useUnsavedChanges } from "./useUnsavedChanges";
import type { ComponentBlock } from "./pageTypes";
import type { ProjectScope, VisualBlockValue } from "./types";
import "../visual-engine/host/utilities.css";
import "./visual-builder-host.css";
interface Session { key: string; baseline: ComponentBlock; initial: VisualBlockValue }
export default function PlacedVisualBuilderPage({ scope, pageId, componentId }: { scope: ProjectScope; pageId: string; componentId: string }) {
 const client = useQueryClient();
 const repository = useMemo(() => createPageRepository(scope), [scope.tenant, scope.project]);
 const library = useMemo(() => createLibraryRepository(scope), [scope.tenant, scope.project]);
 const key = ["visual-builder", "page", scope.tenant, scope.project, pageId];
 const query = useQuery({ networkMode: "always", queryKey: key, queryFn: () => repository.load(pageId), retry: false });
 const [session, setSession] = useState<Session | null>(null);
 const sessionRef = useRef(session); sessionRef.current = session;
 const [dirty, setDirty] = useState(false), [saving, setSaving] = useState(false), [reloading, setReloading] = useState(false);
 const busy = useRef(false);
 const [error, setError] = useState(""), [message, setMessage] = useState("");
 const documentRef = useRef<ComponentDocument | null>(null);
 const confirmDiscard = useUnsavedChanges(dirty, saving || reloading);
 const initialize = useCallback((page: NonNullable<typeof query.data>) => {
  const blocks = listVisualBlocks(page).filter(block => block.id === componentId);
  if (blocks.length !== 1) throw new Error("The selected visual component is missing or has duplicate IDs.");
  const initial = readVisualBlock(blocks[0]); documentRef.current = initial.document;
  setSession({ key: crypto.randomUUID(), baseline: structuredClone(blocks[0]), initial }); setDirty(false);
 }, [componentId]);
 useEffect(() => {
  if (!query.data || sessionRef.current || busy.current) return;
  try { initialize(query.data); } catch (reason) { setError(managementErrorMessage(reason)); }
 }, [query.data, initialize]);
 const persist = async (document: ComponentDocument, theme?: SiteTheme, itemBinding?: ParameterBinding | null, cellSizing?: VisualCellSizing, requestBindings?: ComponentBlock["requestBindings"]) => {
  const editing = sessionRef.current;
  if (!editing || busy.current) throw new Error("A save is already in progress.");
  busy.current = true; setSaving(true); setError("");
  try {
   const saved = await repository.save({ pageId, target: { componentId, baseline: editing.baseline, isNew: false, ...(itemBinding === undefined ? {} : { itemBinding }), ...(cellSizing === undefined ? {} : { cellSizing }), ...(requestBindings === undefined ? {} : { requestBindings }) }, value: { document, theme: theme || editing.initial.theme } });
   const block = listVisualBlocks(saved).find(block => block.id === componentId)!;
   setSession(current => current?.key === editing.key ? { ...current, baseline: structuredClone(block), initial: readVisualBlock(block) } : current);
   client.setQueryData(key, saved);
   for (const prefix of ["page", "pages", "tenantPages"]) void client.invalidateQueries({ queryKey: [prefix, scope.tenant, scope.project] });
   setMessage("Page copy saved.");
  } catch (reason) { const text = managementErrorMessage(reason); if (itemBinding === undefined && cellSizing === undefined) setError(text); throw new Error(text); }
  finally { busy.current = false; setSaving(false); }
 };
 const reload = async () => {
  if (busy.current || !confirmDiscard()) return;
  busy.current = true; setReloading(true); setError("");
  try { const result = await query.refetch(); if (result.error) throw result.error; if (result.data) initialize(result.data); }
  catch (reason) { setError(managementErrorMessage(reason)); }
  finally { busy.current = false; setReloading(false); }
 };
 const saveCopy = async () => {
  if (!session || dirty || busy.current) return;
  busy.current = true; setSaving(true); setError("");
  try {
   const copied = copyVisualDesign(session.initial, session.baseline.title || session.initial.document.name);
   await library.save({ name: copied.title!, value: copied.props!.visualBuilder });
   void client.invalidateQueries({ queryKey: ["visual-component-designs", scope.tenant, scope.project] });
   setMessage("Independent design saved to the project library.");
  } catch (reason) { setError(managementErrorMessage(reason)); }
  finally { busy.current = false; setSaving(false); }
 };
 const onDocumentChange = useCallback((document: ComponentDocument) => { documentRef.current = document; }, []);
 return <div className="vb-host"><header className="vb-host__bar"><div className="vb-host__identity"><strong>Edit placed visual section</strong><span>{scope.tenant} / {scope.project} · {query.data?.name || "Page"}</span></div><button type="button" disabled={saving || reloading} onClick={() => void reload()}>Reload copy</button><button type="button" title="Save this page copy before adding it to the library" disabled={!session || dirty || saving || reloading} onClick={() => void saveCopy()}>Save copy to library</button>{session && query.data && <VisualRequestConnectionEditor page={query.data} component={session.baseline} disabled={dirty || saving || reloading} onSave={block => { const value = readVisualBlock(block); return persist(value.document, value.theme, undefined, undefined, block.requestBindings || {}); }} />}{session && query.data && <RecordConnectionEditor page={query.data} component={session.baseline} disabled={dirty || saving || reloading} onSave={binding => persist(session.initial.document, session.initial.theme, binding)} />}{session && <CellSizingEditor component={session.baseline} disabled={dirty || saving || reloading} onSave={sizing => persist(session.initial.document, session.initial.theme, undefined, sizing)} />}<a href="/pages/visual-builder">Visual components</a><a href="/pages">Back to Pages</a><span role="status">{saving ? "Saving…" : dirty ? "Unsaved changes" : message}</span></header>
 {(error || query.error) && <div role="alert" className="vb-host__notice">{error || managementErrorMessage(query.error)}</div>}
 {!session && query.isPending && <p role="status" className="vb-host__empty">Loading placed visual section…</p>}
 {session && <div className="ve-utilities vb-host__editor" inert={reloading ? "" : undefined}><VisualDataBuilder scope={scope} key={session.key} initialDocument={session.initial.document} initialTheme={session.initial.theme || DEFAULT_SITE_THEME} storageMode="external" storageNamespace={`${scope.tenant}/${scope.project}`} versionNamespace={`${scope.tenant}/${scope.project}/${pageId}/${componentId}`} onDirtyChange={setDirty} onDocumentChange={onDocumentChange} onSaveDocument={doc => persist(doc)} onSaveTheme={theme => documentRef.current ? persist(documentRef.current, theme) : Promise.reject(new Error("No document selected."))} /></div>}
 </div>;
}
