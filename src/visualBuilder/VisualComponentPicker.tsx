import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { createLibraryRepository } from "./libraryRepository";
import { type VisualDesignSelection } from "./componentLibrary";
import { managementErrorMessage } from "./managementClient";
import { sameValue } from "./pageAdapter";
import VisualDesignGallery, { type GalleryDesign } from "./VisualDesignGallery";

export default function VisualComponentPicker({ selection, onChange }: { selection: VisualDesignSelection | null; onChange: (value: VisualDesignSelection | null) => void }) {
  const { currentProject } = useCurrentProject();
  const tenant = currentProject?.tenantSlug || "";
  const project = currentProject?.slug || "";
  const scopeKey = JSON.stringify([tenant, project]);
  const previousScope = useRef(scopeKey);
  const repository = useMemo(() => tenant && project ? createLibraryRepository({ tenant, project }) : null, [tenant, project]);
  const query = useQuery({ networkMode: "always", queryKey: ["visual-component-designs", tenant, project], queryFn: () => repository!.list(), enabled: !!repository, retry: false, staleTime: 0 });
  const designs = useMemo(() => (query.data || []).map(design => ({ ...design, key: design.id })), [query.data]);
  useEffect(() => {
    const savedSource = !selection?.sourceType || selection.sourceType === "saved";
    const refreshingSource = savedSource && !selection?.currentCopy && (query.isFetching || query.isError);
    const staleSource = savedSource && selection && !selection.currentCopy && query.isSuccess && !designs.some(design => design.key === selection.sourceKey && sameValue(design.value, selection.value));
    if (previousScope.current !== scopeKey || refreshingSource || staleSource) onChange(null);
    previousScope.current = scopeKey;
  }, [scopeKey, query.isFetching, query.isError, query.isSuccess, designs, selection, onChange]);
  if (!repository) return <p role="alert">Select a project before adding a visual component.</p>;
  const choose = (design: GalleryDesign) => {
    if (design.source === "saved" && (query.isFetching || query.isError || !designs.some(source => source.id === design.libraryId && sameValue(source.value, design.value)))) { onChange(null); return; }
    onChange({ sourceKey: design.key, sourceType: design.source, name: design.name, value: design.value, scope: { tenant, project } });
  };
  return <section aria-label="Visual component designs" className="space-y-3 rounded-xl border border-ui-border bg-ui-surface p-5">
    <div><h4 className="text-sm font-semibold text-ui-foreground">Choose a visual design</h4><p className="mt-1 text-xs text-ui-muted">This adds an independent copy to this page. Changes to the source design will not update this copy.</p></div>
    {query.isPending && <p role="status">Loading visual designs…</p>}
    {query.isError && <div role="alert"><p>{managementErrorMessage(query.error)}</p><button type="button" className="mt-2 underline" onClick={() => void query.refetch()}>Retry designs</button></div>}
    <VisualDesignGallery key={scopeKey} designs={query.isError ? [] : designs} scope={{ tenant, project }} picking selectedKey={selection?.sourceKey} savedUnavailable={query.isFetching || query.isError} onChoose={choose} />
    {selection?.currentCopy ? <p className="text-xs text-ui-muted">Current copy: {selection.name}. Choose a design above to replace it.</p> : null}
    <button type="button" className="text-xs underline" disabled={query.isFetching} onClick={() => void query.refetch()}>Refresh designs</button>
  </section>;
}
