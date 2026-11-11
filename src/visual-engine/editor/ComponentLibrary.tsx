"use client";

import { useState } from "react";
import { componentRegistry, type ComponentCategory, type ComponentDefinition } from "../components/core";
import { componentEditorRegistry, type NodeIdFactory } from "../components/editor";
import { canAcceptChild } from "../model/capabilities";
import { canInsertNodeAt, canInsertTypeAt } from "../operations/formPlacement";
import type { ComponentNode, NodeType, SectionNode, StructuralNode } from "../model/nodes";
import type { ComponentDocumentKind } from "../model/document";
import { CloseIcon, NodeTypeIcon, SearchIcon } from "./icons";
import { describeLayer } from "./layerLabels";
import { setLayerDragPayload } from "./layerDrag";

const libraryGroups = [
  { label: "Layout", categories: ["layout"] },
  { label: "Interactive", categories: ["interactive", "data"] },
  { label: "Forms", categories: ["form"] },
  { label: "Content", categories: ["content"] },
  { label: "Site", categories: ["site"] },
] as const satisfies readonly { label: string; categories: readonly ComponentCategory[] }[];

const SEARCH_SYNONYMS: Partial<Record<NodeType, string>> = {
  section: "band page area wrapper",
  grid: "columns rows layout",
  stack: "vertical horizontal column row layout",
  flex: "inline row layout",
  card: "box panel container",
  "expandable-card": "project fullscreen expand modal details story portfolio card",
  overlay: "hero background layer cover",
  form: "contact submit fields",
  input: "field textbox email name",
  textarea: "field message multiline",
  select: "dropdown options choice",
  checkbox: "consent boolean check",
  heading: "title headline h1 h2 h3 h4 h5 h6",
  text: "paragraph copy body description",
  code: "snippet codeblock programming",
  image: "img photo picture media",
  "image-comparison": "before after compare comparison reveal image slider divider",
  button: "cta call to action submit",
  icon: "symbol glyph",
  badge: "label status chip",
  link: "anchor navigation url",
  avatar: "profile photo picture user",
  list: "bullets items checklist",
  stat: "metric number kpi data",
  rating: "stars review",
  quote: "testimonial citation",
  divider: "line separator hr rule",
  video: "movie media player youtube",
  audio: "sound podcast media player",
  embed: "iframe youtube map media",
  table: "data grid rows columns spreadsheet",
  progress: "bar loading completion",
  steps: "numbered process stages",
  timeline: "history dates events",
  alert: "note warning error info",
  tags: "chips keywords labels",
  kbd: "keyboard shortcut keys",
  "bar-chart": "chart graph data bars",
  sparkline: "chart trend graph data",
  repeater: "collection data list loop autotable",
  disclosure: "expand collapse accordion faq",
  accordion: "expand collapse faq",
  tabs: "tabbed panels",
  sidebar: "side bar vertical tabs menu navigation panels documentation",
  "infinite-slider": "carousel marquee infinite loop gallery slider scrolling slides",
  "scroll-story": "scroll pinned scenes parallax story",
  "scroll-scene": "scroll story scene slide",
  "site-logo": "brand logo",
  "site-name": "brand title",
  "navigation-menu": "nav menu links",
  "language-switcher": "locale language",
  "theme-switcher": "dark mode light theme",
  "menu-toggle": "hamburger menu",
  "menu-panel": "mobile menu",
  "footer-links": "footer nav links",
  copyright: "year legal",
};

const defaultIdFactory: NodeIdFactory = () => crypto.randomUUID();

export interface InsertTarget {
  parent: StructuralNode;
  index: number;
}

export interface ComponentLibraryProps {
  documentKind?: ComponentDocumentKind;
  documentRoot?: SectionNode;
  target: InsertTarget | null;
  onAdd(node: ComponentNode): void;
  /** Fired when a library item drag starts (HTML5 drag source). */
  onDragStart?: (nodeType: NodeType, event: React.DragEvent) => void;
  idFactory?: NodeIdFactory;
}

export function ComponentLibrary({ documentKind = "section", documentRoot, target, onAdd, onDragStart, idFactory = defaultIdFactory }: ComponentLibraryProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);
  const visibleDefinitions = componentRegistry.listVisible().filter((definition) =>
    !definition.documentKinds || definition.documentKinds.includes(documentKind),
  );
  const registryOrder = new Map(visibleDefinitions.map((definition, index) => [definition.type, index]));

  const isAllowed = (definition: ComponentDefinition) =>
    target !== null && (documentRoot
      ? canInsertTypeAt(documentRoot, target.parent.id, definition.type)
      : canAcceptChild(target.parent.type, definition.type));

  const addDefinition = (definition: ComponentDefinition) => {
    const editor = componentEditorRegistry.get(definition.type);
    const node = connectMenuNode(editor.createDefault(idFactory), documentRoot ?? target?.parent);
    if (target === null || (documentRoot && !canInsertNodeAt(documentRoot, target.parent.id, node))) return;
    onAdd(node);
  };

  const searchResults = normalizedQuery === ""
    ? []
    : visibleDefinitions
      .filter((definition) => queryTerms.every((term) => searchableText(definition).includes(term)))
      .sort((left, right) =>
        searchScore(right, normalizedQuery) - searchScore(left, normalizedQuery)
        || (registryOrder.get(left.type) ?? 0) - (registryOrder.get(right.type) ?? 0),
      );
  const firstAllowedResult = searchResults.find((definition) => isAllowed(definition)) ?? null;

  const renderDefinition = (definition: ComponentDefinition) => {
    const type = definition.type;
    const editor = componentEditorRegistry.get(type);
    const allowed = isAllowed(definition);
    return (
      <button
        key={type}
        type="button"
        className="vb-library__item"
        aria-label={`Add ${definition.label}`}
        disabled={!allowed}
        title={allowed || target === null ? undefined : `${definition.label} cannot be placed inside ${componentRegistry.get(target.parent.type).label}`}
        draggable={allowed}
        onDragStart={(event) => { setLayerDragPayload(event, { kind: "library", nodeType: type as NodeType }); onDragStart?.(type as NodeType, event); }}
        onClick={() => addDefinition(definition)}
      >
        <NodeTypeIcon type={editor.icon} className="vb-library__icon" />
        <span className="vb-library__text">
          <span className="vb-library__name">{definition.label}</span>
          <span className="vb-library__description">{definition.description}</span>
        </span>
      </button>
    );
  };

  return (
    <aside aria-label="Component library" className="vb-library" data-testid="component-library">
      <div className="vb-library__search">
        <label className="vb-search">
          <SearchIcon className="vb-search__icon" />
          <input
            type="search"
            aria-label="Search components"
            placeholder="Search components"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || event.nativeEvent.isComposing || firstAllowedResult === null) return;
              event.preventDefault();
              addDefinition(firstAllowedResult);
            }}
          />
          {query === "" ? null : (
            <button type="button" className="vb-search__clear" aria-label="Clear component search" onClick={() => setQuery("")}>
              <CloseIcon />
            </button>
          )}
        </label>
      </div>

      <p className="vb-library__target" role="status" aria-label="Insertion target">
        {target === null
          ? "Select an element to choose where new components are inserted."
          : <>Adding into <strong>{describeLayer(target.parent)}</strong></>}
      </p>
      {normalizedQuery === "" ? (
        <p className="vb-library__hint">Tip: drop on the left or right edge of an element to place components side by side.</p>
      ) : firstAllowedResult === null ? null : (
        <p className="vb-library__hint">Press Enter to add {firstAllowedResult.label}.</p>
      )}

      {normalizedQuery === "" ? libraryGroups.map((group) => {
        const definitions = visibleDefinitions.filter((definition) => group.categories.includes(definition.category as never));
        if (definitions.length === 0) return null;

        return (
          <section key={group.label} aria-label={`${group.label} components`} className="vb-library__group">
            <h3>{group.label}</h3>
            {definitions.map(renderDefinition)}
          </section>
        );
      }) : (
        <section aria-label="Search results" className="vb-library__group">
          <div className="vb-library__results-head">
            <h3>Results</h3>
            <span className="vb-library__count" role="status">{searchResults.length} {searchResults.length === 1 ? "component" : "components"}</span>
          </div>
          {searchResults.length === 0 ? (
            <p className="vb-library__empty" role="status">
              No components match “{query.trim()}”. <button type="button" onClick={() => setQuery("")}>Clear search</button>
            </p>
          ) : searchResults.map(renderDefinition)}
        </section>
      )}
    </aside>
  );
}

function searchableText(definition: ComponentDefinition): string {
  return [
    definition.label,
    definition.description,
    definition.type,
    SEARCH_SYNONYMS[definition.type] ?? "",
    groupLabelFor(definition.category),
  ].join(" ").toLowerCase();
}

function searchScore(definition: ComponentDefinition, query: string): number {
  const label = definition.label.toLowerCase();
  if (label === query) return 100;
  if (label.startsWith(query)) return 90;
  if (label.includes(query)) return 80;
  if ((SEARCH_SYNONYMS[definition.type] ?? "").toLowerCase().includes(query)) return 60;
  if (definition.description.toLowerCase().includes(query)) return 40;
  if (groupLabelFor(definition.category).toLowerCase().includes(query)) return 20;
  return 10;
}

function groupLabelFor(category: ComponentCategory): string {
  return libraryGroups.find((group) => (group.categories as readonly ComponentCategory[]).includes(category))?.label ?? "";
}

export function connectMenuNode(node: ComponentNode, root: ComponentNode | undefined): ComponentNode {
  if (!root) return node;
  const nodes = flatten(root);
  if (node.type === "menu-toggle") {
    const panel = nodes.find((candidate) => candidate.type === "menu-panel");
    return panel ? { ...node, targetId: panel.id } : node;
  }
  if (node.type === "menu-panel") {
    const waiting = nodes.some((candidate) => candidate.type === "menu-toggle" && candidate.targetId === "menu-panel");
    const idAvailable = !nodes.some((candidate) => candidate.id === "menu-panel");
    return waiting && idAvailable ? { ...node, id: "menu-panel" } : node;
  }
  return node;
}

function flatten(root: ComponentNode): ComponentNode[] {
  return [root, ...("children" in root ? root.children.flatMap(flatten) : [])];
}
