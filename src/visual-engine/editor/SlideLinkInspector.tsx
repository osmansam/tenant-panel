"use client";

import { useEffect, useState } from "react";
import type { ComponentNode } from "../model";
import { normalizeLinkUrl } from "../model/urls";
import type { NodePatch } from "../operations";
import { InspectorCheckbox, InspectorInput, InspectorSection } from "./InspectorSection";

export function SlideLinkInspector({ node, onUpdate, onCreateProjectPage }: { node: ComponentNode; onUpdate(patch: NodePatch): void; onCreateProjectPage?(): void }) {
  const [destination, setDestination] = useState(node.slideLink?.href ?? "");
  const [label, setLabel] = useState(node.slideLink?.accessibleLabel ?? "");
  useEffect(() => setDestination(node.slideLink?.href ?? ""), [node.id, node.slideLink?.href]);
  useEffect(() => {
    const saved = node.slideLink?.accessibleLabel ?? "";
    setLabel(current => current.trim() === saved ? current : saved);
  }, [node.id, node.slideLink?.accessibleLabel]);
  const normalized = normalizeLinkUrl(destination);
  return <InspectorSection title="Slide link" category="content">
    {onCreateProjectPage ? <button type="button" className="vb-button vb-inspector__create-page" onClick={onCreateProjectPage}>Create project page</button> : null}
    <InspectorInput label="Destination" ariaLabel="Slide destination" value={destination} onChange={value => {
      setDestination(value);
      if (!value.trim()) onUpdate({ slideLink: undefined });
      else {
        const result = normalizeLinkUrl(value);
        if (result.success) onUpdate({ slideLink: { ...node.slideLink, href: result.value } });
      }
    }} />
    <p>Leave empty for an unlinked slide. Use a page path, anchor, or website URL.</p>
    {destination.trim() && !normalized.success ? <p role="alert">Enter a valid link destination.</p> : null}
    {normalized.success ? <>
      <InspectorCheckbox label="Open in new tab" ariaLabel="Open slide link in new tab" checked={node.slideLink?.openInNewTab === true} onChange={openInNewTab => onUpdate({ slideLink: { ...node.slideLink, href: normalized.value, openInNewTab } })} />
      <InspectorInput label="Accessible label" ariaLabel="Slide link accessible label" value={label} onChange={accessibleLabel => {
        setLabel(accessibleLabel);
        onUpdate({ slideLink: { ...node.slideLink, href: normalized.value, accessibleLabel: accessibleLabel.trim() || undefined } });
      }} />
    </> : null}
  </InspectorSection>;
}
