import { useId, useMemo, useState } from "react";
import { WorkspaceDialog, Button } from "../components/ui";
import { loadTemplates } from "../visual-engine/persistence/localStorage";
import type { ComponentDocument } from "../visual-engine/model";
import type { LibraryDesign } from "./libraryRepository";
import type { ProjectScope, VisualBlockValue } from "./types";
import { ADMIN_TEMPLATES } from "./adminTemplates";
import VisualDesignPreview from "./VisualDesignPreview";
import "./visual-design-gallery.css";

export interface GalleryDesign { key: string; name: string; value: VisualBlockValue; source: "saved" | "browser" | "builtin"; libraryId?: string; category?: string; description?: string }
const categories = ["All categories", "Heroes", "CTAs", "Features", "Pricing", "Testimonials", "Navbars", "Footers", "Interactive", "Layouts"];
function category(document: ComponentDocument) {
 const text = `${document.id} ${document.name}`.toLowerCase();
 if (document.kind === "navbar" || text.includes("navbar")) return "Navbars";
 if (document.kind === "footer" || text.includes("footer")) return "Footers";
 if (text.includes("pricing")) return "Pricing";
 if (text.includes("testimonial")) return "Testimonials";
 if (/\bcta\b|call to action/.test(text)) return "CTAs";
 if (text.includes("hero")) return "Heroes";
 if (/feature|bento/.test(text)) return "Features";
 if (/interactive|expandable|foldable|showcase|panel/.test(text)) return "Interactive";
 return "Layouts";
}
const adminCategories = ["All categories", ...new Set(ADMIN_TEMPLATES.map(template => template.category))];
const builtins: GalleryDesign[] = ADMIN_TEMPLATES.map(template => ({ key: `builtin:${template.id}`, name: template.name, value: template.value, source: "builtin", category: template.category, description: template.description }));
const designCategory = (design: GalleryDesign) => design.category || category(design.value.document);
const PAGE_SIZE = 9;
export default function VisualDesignGallery({ designs, scope, onChoose, selectedKey, picking = false, savedUnavailable = false, busy = false }: {
 designs: LibraryDesign[]; scope: ProjectScope; onChoose: (design: GalleryDesign) => void; selectedKey?: string;
 picking?: boolean; savedUnavailable?: boolean; busy?: boolean;
}) {
 const [tab, setTab] = useState<GalleryDesign["source"]>("saved");
 const [search, setSearch] = useState("");
 const [filter, setFilter] = useState(categories[0]);
 const [page, setPage] = useState(0);
 const [preview, setPreview] = useState<GalleryDesign | null>(null);
 const radioName = useId();
 const browser = useMemo<GalleryDesign[]>(() => loadTemplates(`${scope.tenant}/${scope.project}`).templates.map(template => ({ key: `browser:${template.id}`, name: template.name, value: { document: template.snapshot }, source: "browser" })), [scope.tenant, scope.project]);
 const saved = useMemo<GalleryDesign[]>(() => designs.map(design => ({ key: design.id, libraryId: design.id, name: design.name, value: design.value, source: "saved" })), [designs]);
 const all = tab === "saved" ? saved : tab === "builtin" ? builtins : browser;
 const availableCategories = tab === "builtin" ? adminCategories : categories;
 const filtered = all.filter(design => `${design.name} ${design.value.document.name} ${design.description || ""}`.toLowerCase().includes(search.toLowerCase().trim()) && (filter === categories[0] || designCategory(design) === filter));
 const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
 const activePage = Math.min(page, pages - 1);
 const visible = filtered.slice(activePage * PAGE_SIZE, (activePage + 1) * PAGE_SIZE);
 const disabled = (design: GalleryDesign) => busy || design.source === "saved" && savedUnavailable;
 const action = (design: GalleryDesign) => picking ? "Choose" : design.source === "saved" ? "Open" : "Use";
 const choose = (design: GalleryDesign) => { if (disabled(design)) return; onChoose(design); setPreview(null); };
 return <div className="vd-gallery">
  <div role="tablist" aria-label="Design sources" className="vd-gallery__tabs">{([
   ["saved", `Saved designs (${saved.length})`], ["builtin", `Built-in admin templates (${builtins.length})`], ["browser", `Browser templates (${browser.length})`],
  ] as const).map(([source, label]) => <button type="button" key={source} role="tab" aria-selected={tab === source} onClick={() => { setTab(source); setPage(0); setFilter(categories[0]); }}>{label}</button>)}</div>
  <div className="vd-gallery__filters"><input type="search" aria-label="Search designs" placeholder="Search designs…" value={search} onChange={event => { setSearch(event.target.value); setPage(0); }} /><select aria-label="Design category" value={filter} onChange={event => { setFilter(event.target.value); setPage(0); }}>{availableCategories.map(item => <option key={item}>{item}</option>)}</select><span aria-live="polite">{filtered.length} designs</span></div>
  {tab === "builtin" && <p className="vd-gallery__hint">Ready-made editable layouts with example content. Connect your own schemas and button actions after inserting a copy.</p>}
  {tab === "browser" && <p className="vd-gallery__hint">Templates saved in this browser for {scope.tenant} / {scope.project}. Use one to create an independent copy.</p>}
  {!visible.length && <p className="vd-gallery__hint">{search || filter !== categories[0] ? "No designs match these filters." : tab === "saved" ? "No saved visual designs in this project. Create and save a design in Visual components, then refresh this list." : "No browser templates saved for this project yet."}</p>}
  <div className="vd-gallery__grid">{visible.map(design => <article key={design.key} className={`vd-card ${selectedKey === design.key ? "vd-card--selected" : ""}`}>
   <div className="vd-card__thumbnail"><VisualDesignPreview value={design.value} /><span className="vd-card__badge">{designCategory(design)}</span><span className="vd-card__zoom">Preview ↗</span><button type="button" className="vd-card__preview-button" aria-label={`Preview ${design.name}`} onClick={() => setPreview(design)} /></div>
   <div className="vd-card__body"><h3 title={design.name}>{design.name}</h3>{design.description && <p className="vd-card__description">{design.description}</p>}{picking ? <label className="vd-card__choose"><input type="radio" name={radioName} aria-label={design.name} checked={selectedKey === design.key} disabled={disabled(design)} onChange={() => choose(design)} />{selectedKey === design.key ? "Selected" : "Choose design"}</label> : <button type="button" disabled={disabled(design)} onClick={() => choose(design)} aria-label={`${action(design)} ${design.name}`}>{action(design)} design →</button>}</div>
  </article>)}</div>
  {pages > 1 && <nav className="vd-gallery__pagination" aria-label="Design pages"><button type="button" disabled={activePage === 0} onClick={() => setPage(activePage - 1)}>Previous designs</button><span>Page {activePage + 1} of {pages}</span><button type="button" disabled={activePage === pages - 1} onClick={() => setPage(activePage + 1)}>Next designs</button></nav>}
  {preview && <WorkspaceDialog open layer="nested" size="workspace" title={`Preview: ${preview.name}`} description={preview.source === "builtin" ? "Example content only. Insert a copy, then connect your own data and actions." : "Static design preview. Animated effects and live data appear in the editor or published page."} onClose={() => setPreview(null)} footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setPreview(null)}>Back to designs</Button><Button aria-label={`${action(preview)} ${preview.name}`} disabled={disabled(preview)} onClick={() => choose(preview)}>{action(preview)} design</Button></div>}><VisualDesignPreview key={preview.key} value={preview.value} large /></WorkspaceDialog>}
 </div>;
}
