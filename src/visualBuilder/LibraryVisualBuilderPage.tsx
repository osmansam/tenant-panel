import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import VisualDataBuilder from "./VisualDataBuilder";
import { DEFAULT_SITE_THEME, type SiteTheme } from "../visual-engine/theme";
import type { ComponentDocument } from "../visual-engine/model";
import { createLibraryRepository, type LibraryDesign } from "./libraryRepository";
import { managementErrorMessage } from "./managementClient";
import { useUnsavedChanges } from "./useUnsavedChanges";
import type { ProjectScope, VisualBlockValue } from "./types";
import { copyVisualDesign } from "./componentLibrary";
import VisualDesignGallery, { type GalleryDesign } from "./VisualDesignGallery";
import { WorkspaceDialog } from "../components/ui";
import "../visual-engine/host/utilities.css";
import "./visual-builder-host.css";
interface Session { key: string; id?: string; name: string; initial: VisualBlockValue; revision?: number }
export default function LibraryVisualBuilderPage({ scope }: { scope: ProjectScope }) {
 const [params, setParams] = useSearchParams();
 const wanted = params.get("design") || "";
 const client = useQueryClient();
 const repository = useMemo(() => createLibraryRepository(scope), [scope.tenant, scope.project]);
 const queryKey = useMemo(() => ["visual-component-designs", scope.tenant, scope.project], [scope.tenant, scope.project]);
 const query = useQuery({ networkMode: "always", queryKey, queryFn: repository.list, retry: false, staleTime: 0 });
 const [session, setSession] = useState<Session | null>(null);
 const sessionRef = useRef(session); sessionRef.current = session;
 const [name, setName] = useState("");
 const [dirty, setDirty] = useState(false);
 const [saving, setSaving] = useState(false);
 const savingRef = useRef(false);
 const [reloading, setReloading] = useState(false);
 const reloadRef = useRef(false);
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const [browsing, setBrowsing] = useState(false);
 const [pendingURL, setPendingURL] = useState<string | null>(null);
 const docRef = useRef<ComponentDocument | null>(null);
 const unsaved = dirty || !!session && (!session.id || name !== session.name);
 const confirmDiscard = useUnsavedChanges(unsaved, saving || reloading);
 const open = useCallback((record: LibraryDesign) => {
  setSession({ key: record.id, id: record.id, name: record.name, initial: record.value, revision: record.revision });
  docRef.current = record.value.document; setName(record.name); setDirty(false); setError(""); setMessage("");
 }, []);
 useEffect(() => {
  if (!query.data) return;
  if (!wanted) {
   if ((sessionRef.current && !sessionRef.current.id) || pendingURL) return;
   setSession(null); docRef.current = null; return;
  }
  if (sessionRef.current?.id === wanted) return;
  const record = query.data.find(item => item.id === wanted);
  if (record) { setPendingURL(null); open(record); }
  else { setSession(null); setError("This design is missing. Choose another design or create one."); }
 }, [wanted, query.data, pendingURL, open]);
 useEffect(() => {
  if (!pendingURL || saving || reloading || unsaved) return;
  setParams({ design: pendingURL }, { replace: true }); setPendingURL(null);
 }, [pendingURL, saving, reloading, unsaved, setParams]);
 const choose = (id: string) => {
  if (id === session?.id || !confirmDiscard()) return;
  const record = query.data?.find(item => item.id === id);
  if (record) { setPendingURL(null); open(record); setParams({ design: id }); }
 };
 const create = () => {
  if (!confirmDiscard()) return;
  const document: ComponentDocument = { version: 2, id: crypto.randomUUID(), name: "Untitled design", kind: "section", root: { id: crypto.randomUUID(), type: "section", children: [] } };
  setPendingURL(null); setParams({}); setSession({ key: document.id, name: document.name, initial: { document, theme: structuredClone(DEFAULT_SITE_THEME) } });
  docRef.current = document; setName(document.name); setDirty(false); setError(""); setMessage("");
  setBrowsing(false);
 };
 const chooseDesign = (design: GalleryDesign) => {
  if (savingRef.current || reloadRef.current) return;
  if (design.source === "saved") {
   if (query.isFetching || query.isError) return;
   choose(design.libraryId!); setBrowsing(false); return;
  }
  if (!confirmDiscard()) return;
  const value = copyVisualDesign(design.value, design.name).props!.visualBuilder as VisualBlockValue;
  const initial = { ...value, theme: value.theme || structuredClone(DEFAULT_SITE_THEME) };
  setPendingURL(null); setParams({}); setSession({ key: initial.document.id, name: design.name, initial });
  docRef.current = initial.document; setName(design.name); setDirty(false); setError(""); setMessage(""); setBrowsing(false);
 };
 const persist = async (document: ComponentDocument, theme?: SiteTheme) => {
  const editing = sessionRef.current;
  if (!editing || savingRef.current || reloadRef.current) throw new Error("A save is already in progress.");
  if (!name.trim()) throw new Error("Enter a design name before saving.");
  savingRef.current = true; setSaving(true); setError("");
  try {
   const saved = await repository.save({ id: editing.id, revision: editing.revision, name, value: { document, theme: theme || editing.initial.theme } });
   setSession(current => current?.key === editing.key ? { ...current, id: saved.id, name: saved.name, initial: saved.value, revision: saved.revision } : current);
   client.setQueryData<LibraryDesign[]>(queryKey, previous => [saved, ...(previous || []).filter(item => item.id !== saved.id)]);
   if (!editing.id) setPendingURL(saved.id);
   setMessage("Design saved to the project library.");
  } catch (reason) { const text = managementErrorMessage(reason); setError(text); throw new Error(text); }
  finally { savingRef.current = false; setSaving(false); }
 };
 const onDocumentChange = useCallback((document: ComponentDocument) => { docRef.current = document; }, []);
 const reload = async () => {
  if (savingRef.current || reloadRef.current || !confirmDiscard()) return;
  reloadRef.current = true; setReloading(true); setError("");
  try {
   const result = await query.refetch();
   if (result.error) throw result.error;
   if (session?.id) {
    const record = result.data?.find(item => item.id === session.id);
    if (record) { open(record); setSession(current => current && { ...current, key: `${record.id}/${crypto.randomUUID()}` }); }
    else setError("This design is no longer available. Your draft is still here.");
   }
  } catch (reason) { setError(managementErrorMessage(reason)); }
  finally { reloadRef.current = false; setReloading(false); }
 };
 return <div className="vb-host">
  <header className="vb-host__bar">
   <div className="vb-host__identity"><strong>Visual components</strong><span>{scope.tenant} / {scope.project}</span></div>
   <button type="button" disabled={saving || reloading} onClick={() => setBrowsing(true)}>Browse designs</button>
   <button type="button" disabled={saving || reloading} onClick={create}>New design</button>
   {session && <label>Design name<input aria-label="Design name" value={name} disabled={saving || reloading} onChange={event => setName(event.target.value)} /></label>}
   <button type="button" disabled={saving || reloading || query.isFetching} onClick={() => void reload()}>Reload designs</button>
   <a href="/pages">Back to Pages</a>
   <span role="status" className="vb-host__state">{reloading ? "Reloading…" : saving ? "Saving…" : unsaved ? "Unsaved changes" : message}</span>
  </header>
  {(error || query.error) && <div role="alert" className="vb-host__notice">{error || managementErrorMessage(query.error)}</div>}
  {!session && query.isPending && <p role="status" className="vb-host__empty">Loading visual designs…</p>}
  {!session && <main className="vb-host__gallery"><h1>Your visual designs</h1><p>Browse your project's saved designs and templates. Add independent copies to pages from Structure → Add → Visual section, or a cell's Add button.</p><VisualDesignGallery designs={query.isError ? [] : query.data || []} scope={scope} onChoose={chooseDesign} savedUnavailable={query.isFetching || query.isError} busy={saving || reloading} /></main>}
  {browsing && <WorkspaceDialog open size="workspace" title="Browse visual designs" onClose={() => setBrowsing(false)}><VisualDesignGallery designs={query.isError ? [] : query.data || []} scope={scope} onChoose={chooseDesign} selectedKey={session?.id} savedUnavailable={query.isFetching || query.isError} busy={saving || reloading} /></WorkspaceDialog>}
  {session && <div className="ve-utilities vb-host__editor" inert={reloading ? "" : undefined} aria-busy={reloading}><VisualDataBuilder scope={scope} key={session.key} initialDocument={session.initial.document} initialTheme={session.initial.theme || DEFAULT_SITE_THEME} storageMode="external" storageNamespace={`${scope.tenant}/${scope.project}`} versionNamespace={`${scope.tenant}/${scope.project}/library/${session.id || session.key}`} onDirtyChange={setDirty} onDocumentChange={onDocumentChange} onSaveDocument={document => persist(document)} onSaveTheme={theme => docRef.current ? persist(docRef.current, theme) : Promise.reject(new Error("No design is selected."))} /></div>}
  <footer className="vb-host__local-note">Designs are saved to this project. Templates and versions stay in this browser.</footer>
 </div>;
}
