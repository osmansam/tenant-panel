"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { exportTemplate } from "../persistence/importExport";
import type { VisualTemplate } from "../templates/types";
import type { ComponentDocument } from "../model";
import { ALL_CURATED_STARTERS, VISUAL_TEMPLATE_STARTERS } from "../fixtures/templateStarters";
import { getBlankStarterDocument } from "../fixtures/blankStarters";

export interface TemplatePanelProps {
  templates: VisualTemplate[];
  starters?: ComponentDocument[];
  onSaveAsTemplate(name: string): void;
  onImportTemplate(serialized: string): void;
  onUseTemplate(template: VisualTemplate): void;
  onSelectStarter?(doc: ComponentDocument): void;
}

type TemplateCategory = "all" | "navbar" | "footer" | "pricing" | "testimonial" | "cta" | "hero" | "feature" | "saved";

interface UnifiedTemplateItem {
  id: string;
  name: string;
  category: TemplateCategory;
  badge: string;
  badgeClass: string;
  kind: "saved" | "starter";
  savedTemplate?: VisualTemplate;
  starterDoc?: ComponentDocument;
}

export function TemplatePanel({
  templates,
  starters = ALL_CURATED_STARTERS,
  onSaveAsTemplate,
  onImportTemplate,
  onUseTemplate,
  onSelectStarter,
}: TemplatePanelProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateJson, setTemplateJson] = useState("");
  const [exportTemplateId, setExportTemplateId] = useState("");
  const [exportedJson, setExportedJson] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const createSavedTemplate = () => {
    const name = templateName.trim();
    if (name.length === 0) return;
    onSaveAsTemplate(name);
    setTemplateName("");
    setShowCreateForm(false);
  };

  const exportSavedTemplate = () => {
    const template = templates.find((candidate) => candidate.id === exportTemplateId);
    if (template === undefined) return;
    setExportedJson(exportTemplate(template));
  };

  // Build unified items
  const unifiedItems: UnifiedTemplateItem[] = useMemo(() => {
    const items: UnifiedTemplateItem[] = [];

    // Saved templates
    for (const t of templates) {
      items.push({
        id: t.id,
        name: t.name,
        category: "saved",
        badge: "Saved",
        badgeClass: "vb-templates__badge--saved",
        kind: "saved",
        savedTemplate: t,
      });
    }

    // Built-in starters
    for (const doc of starters) {
      const lowerId = doc.id.toLowerCase();
      const lowerName = doc.name.toLowerCase();
      const lowerTags = (doc as { tags?: readonly string[] }).tags ?? [];
      let cat: TemplateCategory = "feature";
      let badge = "Layout";
      let badgeClass = "vb-templates__badge--layout";

      if (doc.kind === "navbar" || lowerId.startsWith("navbar-") || lowerName.includes("navbar")) {
        cat = "navbar";
        badge = "Navbar";
        badgeClass = "vb-templates__badge--navbar";
      } else if (doc.kind === "footer" || lowerId.startsWith("footer-") || lowerName.includes("footer")) {
        cat = "footer";
        badge = "Footer";
        badgeClass = "vb-templates__badge--footer";
      } else if (lowerId.startsWith("pricing-") || lowerId.includes("pricing") || lowerName.includes("pricing") || lowerTags.includes("pricing")) {
        cat = "pricing";
        badge = "Pricing";
        badgeClass = "vb-templates__badge--pricing";
      } else if (lowerId.startsWith("testimonial-") || lowerId.includes("testimonial") || lowerName.includes("testimonial") || lowerTags.includes("testimonial")) {
        cat = "testimonial";
        badge = "Testimonial";
        badgeClass = "vb-templates__badge--testimonial";
      } else if (lowerId.startsWith("cta-") || lowerName.includes("cta") || lowerName.includes("call to action")) {
        cat = "cta";
        badge = "CTA";
        badgeClass = "vb-templates__badge--cta";
      } else if (lowerId.startsWith("hero-") || lowerName.includes("hero")) {
        cat = "hero";
        badge = "Hero";
        badgeClass = "vb-templates__badge--hero";
      } else if (lowerId.includes("bento") || lowerId.includes("feature") || lowerName.includes("feature")) {
        cat = "feature";
        badge = "Feature";
        badgeClass = "vb-templates__badge--feature";
      }

      items.push({
        id: doc.id,
        name: doc.name,
        category: cat,
        badge,
        badgeClass,
        kind: "starter",
        starterDoc: doc,
      });
    }

    return items;
  }, [templates, starters]);

  // Counts
  const counts = useMemo(() => {
    const res: Record<TemplateCategory, number> = {
      all: unifiedItems.length,
      navbar: 0,
      footer: 0,
      pricing: 0,
      testimonial: 0,
      cta: 0,
      hero: 0,
      feature: 0,
      saved: 0,
    };
    for (const item of unifiedItems) {
      res[item.category] = (res[item.category] ?? 0) + 1;
    }
    return res;
  }, [unifiedItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return unifiedItems.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!query) return true;
      return item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
    });
  }, [unifiedItems, selectedCategory, searchQuery]);

  const applyItem = useCallback(
    (item: UnifiedTemplateItem) => {
      if (item.kind === "saved" && item.savedTemplate) {
        onUseTemplate(item.savedTemplate);
      } else if (item.kind === "starter" && item.starterDoc) {
        if (onSelectStarter) {
          onSelectStarter(item.starterDoc);
        } else {
          onUseTemplate({
            version: 1,
            id: item.starterDoc.id,
            name: item.starterDoc.name,
            scope: "project",
            snapshot: item.starterDoc,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    },
    [onUseTemplate, onSelectStarter],
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = filteredItems.length;
    if (total === 0) return;

    let next = index;
    switch (e.key) {
      case "ArrowDown":
        next = (index + 1) % total;
        e.preventDefault();
        break;
      case "ArrowUp":
        next = (index - 1 + total) % total;
        e.preventDefault();
        break;
      case "Home":
        next = 0;
        e.preventDefault();
        break;
      case "End":
        next = total - 1;
        e.preventDefault();
        break;
      case "Enter":
        e.preventDefault();
        applyItem(filteredItems[index]);
        return;
      default:
        return;
    }

    setFocusedIndex(next);
    itemRefs.current[next]?.focus();
    itemRefs.current[next]?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
    requestAnimationFrame(() => {
      itemRefs.current[next]?.focus();
    });
  };

  const tabs: { id: TemplateCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "navbar", label: "Navbars" },
    { id: "footer", label: "Footers" },
    { id: "pricing", label: "Pricing" },
    { id: "testimonial", label: "Testimonials" },
    { id: "cta", label: "CTAs" },
    { id: "hero", label: "Heroes" },
    { id: "feature", label: "Features" },
    { id: "saved", label: "Saved" },
  ];

  return (
    <section className="vb-templates" aria-label="Templates">
      <div className="vb-templates__heading">
        <h2>Templates</h2>
        <button
          type="button"
          className="vb-button vb-button--small"
          onClick={() => setShowCreateForm((current) => !current)}
        >
          Save as Template
        </button>
      </div>

      {showCreateForm ? (
        <div className="vb-templates__create">
          <label className="vb-field vb-field--stacked">
            <span className="vb-field__label">Template name</span>
            <input
              className="vb-field__control"
              aria-label="Template name"
              value={templateName}
              onChange={(event) => setTemplateName(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="vb-button vb-button--primary vb-button--small"
            disabled={templateName.trim().length === 0}
            onClick={createSavedTemplate}
          >
            Create template
          </button>
        </div>
      ) : null}

      {/* Start from scratch action */}
      <div className="vb-templates__scratch">
        <button
          type="button"
          className="vb-templates__scratch-btn"
          aria-label="Start from scratch, Blank canvas"
          onClick={() => {
            const blankDoc = getBlankStarterDocument();
            if (onSelectStarter) {
              onSelectStarter(blankDoc);
            } else {
              onUseTemplate({
                version: 1,
                id: blankDoc.id,
                name: blankDoc.name,
                scope: "project",
                snapshot: blankDoc,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          }}
        >
          <span className="vb-templates__scratch-icon">+</span>
          <span className="vb-templates__scratch-title">Start from scratch</span>
          <span className="vb-templates__scratch-badge">Blank</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="vb-templates__controls">
        <div className="vb-templates__tabs" role="tablist" aria-label="Template categories">
          {tabs.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setFocusedIndex(0);
                }}
                className={`vb-templates__tab ${active ? "vb-templates__tab--active" : ""}`}
              >
                {tab.label} ({counts[tab.id]})
              </button>
            );
          })}
        </div>

        <input
          type="search"
          aria-label="Search templates"
          placeholder="Search templates (e.g. CTA, Hero, Bento)…"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFocusedIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (itemRefs.current[0]) {
                setFocusedIndex(0);
                itemRefs.current[0]?.focus();
                itemRefs.current[0]?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
              }
            } else if (e.key === "Enter" && filteredItems.length > 0) {
              e.preventDefault();
              applyItem(filteredItems[0]);
            }
          }}
          className="vb-templates__search"
        />

        <p className="vb-templates__kbd-hint">
          Keyboard navigation: Use ↑ ↓ arrows to browse, Enter to apply.
        </p>
      </div>

      {filteredItems.length === 0 ? (
        <p className="vb-hint">
          {searchQuery ? `No templates found matching "${searchQuery}".` : "No templates in this category."}
        </p>
      ) : (
        <ul className="vb-templates__list" role="listbox" aria-label="Template list">
          {filteredItems.map((item, index) => {
            const isFocused = focusedIndex === index;
            return (
              <li key={`${item.kind}-${item.id}`}>
                <div
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="option"
                  aria-selected={isFocused}
                  tabIndex={isFocused ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onClick={() => {
                    setFocusedIndex(index);
                    itemRefs.current[index]?.focus();
                  }}
                  className={`vb-templates__item-card ${isFocused ? "vb-templates__item-card--focused" : ""}`}
                  style={{ width: "100%", cursor: "pointer" }}
                >
                  <div className="vb-templates__item-info">
                    <span className={`vb-templates__badge ${item.badgeClass}`}>{item.badge}</span>
                    <span className="vb-templates__name" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="vb-button vb-button--small"
                    aria-label={`Use ${item.name}`}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyItem(item);
                    }}
                  >
                    Use
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <details className="vb-details">
        <summary>Import or export templates</summary>
        <label className="vb-field vb-field--stacked">
          <span className="vb-field__label">Template JSON</span>
          <textarea
            className="vb-code"
            aria-label="Template JSON"
            spellCheck={false}
            value={templateJson}
            onChange={(event) => setTemplateJson(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="vb-button vb-button--small"
          disabled={templateJson.trim().length === 0}
          onClick={() => onImportTemplate(templateJson)}
        >
          Import template
        </button>

        <label className="vb-field vb-field--stacked">
          <span className="vb-field__label">Template to export</span>
          <select
            className="vb-field__control"
            aria-label="Template to export"
            value={exportTemplateId}
            onChange={(event) => setExportTemplateId(event.target.value)}
          >
            <option value="">Choose template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="vb-button vb-button--small"
          disabled={exportTemplateId.length === 0}
          onClick={exportSavedTemplate}
        >
          Export template
        </button>
        {exportedJson.length > 0 ? (
          <label className="vb-field vb-field--stacked">
            <span className="vb-field__label">Template export</span>
            <textarea className="vb-code" aria-label="Template export" readOnly value={exportedJson} />
          </label>
        ) : null}
      </details>
    </section>
  );
}
