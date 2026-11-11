"use client";
import { ConditionalColorsInspector } from "./ConditionalColorsInspector";
import { supportsConditionalColors } from "../model/conditionalColors";
import { CollectionDataInspector } from "./CollectionDataInspector";
import { RepeaterLayoutInspector } from "./RepeaterLayoutInspector";
import { useVisualDataSchemas } from "../host/DataContext";
import { SidebarInspector } from "./SidebarInspector";
import type { SidebarItemAction } from "../operations/sidebar";
import { useId, useMemo, useRef, useState } from "react";
import "./inspector-polish.css";
import { directStylePatch, directStyleValue, supportsDirectStyle, type DirectStyleProperty } from "./directStyle";
import { FONT_FAMILIES } from "../model/styles";

import {
  ANIMATION_EASINGS,
  ANIMATION_LIMITS,
  ANIMATION_PRESETS,
  ANIMATION_TRIGGERS,
  DEFAULT_ANIMATION,
  type AnimationEasing,
  type AnimationPreset,
  type AnimationSpec,
  type AnimationTrigger,
} from "../model/animation";
import { componentRegistry } from "../components/core";
import type { PropertyGroup } from "../model/capabilities";
import { heightScale } from "../model/proportionalSizing";
import type { BindableProperty, ComponentNode, LayoutAlignment, LayoutDirection, LayoutDistribution, NodeType, StructuralNode } from "../model/nodes";
import type { ColorValue } from "../model/paint";
import { supportsChildGap } from "../model/nodes";
import type { Breakpoint, GridPlacement, ResponsiveSpacingSpec, ResponsiveSpec } from "../model";
import {
  BORDER_WIDTHS,
  COLOR_TOKENS,
  GRADIENT_TOKENS,
  HEIGHT_TOKENS,
  LEADING_TOKENS,
  MAX_WIDTH_TOKENS,
  OBJECT_FITS,
  OBJECT_POSITIONS,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SIZING_ALIGNS,
  SPACING_TOKENS,
  TEXT_ALIGNMENTS,
  TRACKING_TOKENS,
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_WEIGHTS,
  WIDTH_TOKENS,
  type CustomDimensionSpec,
  type SpacingToken,
  type StyleSpec,
} from "../model/styles";
import { canUsePositioningGrid, type NodePatch } from "../operations";
import { NodeTypeIcon, ReplayIcon, ChevronIcon } from "./icons";
import { ScrollSceneInspector, ScrollStoryInspector } from "./ScrollStoryInspector";
import {
  InspectorCheckbox,
  InspectorInput,
  InspectorLengthInput,
  InspectorNumber,
  InspectorSection,
  InspectorSelect,
  InspectorTextarea,
  InspectorTokenSelect,
  InspectorToolsContext,
  type InspectorCategory,
} from "./InspectorSection";
import { COLOR_SWATCHES } from "./tokenLabels";
import { MediaLayoutInspector } from "./MediaLayoutInspector";
import { ColorPaintControl } from "./ColorPaintControl";
import { PaintInspector } from "./PaintInspector";
import { EffectInspector } from "./EffectInspector";
import type { EffectRegistry } from "../effects/core";
import { MetadataFieldEditor } from "./MetadataFieldEditor";
import { ListItemsEditor } from "./ListItemsEditor";
import { OverlayInspector } from "./OverlayInspector";
import { SelectOptionsEditor } from "./SelectOptionsEditor";
import { FormInspector } from "./FormInspector";
import { SlideLinkInspector } from "./SlideLinkInspector";
import { BarChartEditor, KbdEditor, StepsEditor, TableEditor, TagsEditor, TimelineEditor } from "./ExtendedContentEditors";

const backgroundTokens: readonly string[] = [...COLOR_TOKENS, ...GRADIENT_TOKENS];
const layoutDirections: readonly LayoutDirection[] = ["row", "column"];
const layoutAlignments: readonly LayoutAlignment[] = ["start", "center", "end", "stretch"];
const layoutDistributions: readonly LayoutDistribution[] = ["start", "center", "end", "between", "around", "evenly"];
const breakpoints = ["mobile", "tablet", "desktop"] as const;
const breakpointNames = { mobile: "Mobile", tablet: "Tablet", desktop: "Desktop" } as const;
type SpacingTarget = "base" | "tablet" | "desktop";

const PRESET_LABELS: Record<AnimationPreset, string> = {
  none: "None",
  fade: "Fade",
  "fade-up": "Fade up",
  "fade-down": "Fade down",
  "fade-left": "Fade left",
  "fade-right": "Fade right",
  "scale-in": "Scale in",
  "slide-up": "Slide up",
  "slide-left": "Slide left",
  "slide-right": "Slide right",
};
const TRIGGER_LABELS: Record<AnimationTrigger, string> = { load: "On load", "in-view": "In view", hover: "On hover" };
const EASING_LABELS: Record<AnimationEasing, string> = {
  linear: "Linear",
  ease: "Ease",
  "ease-in": "Ease in",
  "ease-out": "Ease out",
  "ease-in-out": "Ease in-out",
};

export interface PropertiesInspectorProps {
  node: ComponentNode | null;
  parent?: StructuralNode | null;
  parentContainer?: StructuralNode | null;
  parentType?: NodeType | null;
  breakpoint?: Breakpoint;
  onUpdate(patch: NodePatch): void;
  onPromoteGrid?(): void;
  onSetGridPlacement?(patch: Partial<GridPlacement>): void;
  onConvertParentToGrid?(): void;
  onReplayAnimation?(nodeId: string): void;
  effectRegistry?: EffectRegistry;
  disclosurePreview?: "default" | "open" | "closed";
  onDisclosurePreview?: (state: "default" | "open" | "closed") => void;
  onAddAccordionItem?: () => void;
  onAddTabItem?: () => void;
  onRemoveTabItem?: () => void;
  onSidebarItemAction?: (action: SidebarItemAction) => void;
  onSelectNode?: (id: string) => void;
  onAddScrollScene?: () => void;
  onRemoveScrollScene?: () => void;
  bindingAlias?: string;
  bindingSchemaName?: string;
  onEditCardDetails?(): void;
  onCreateProjectPage?(): void;
}

export function PropertiesInspector({ node, parent = null, parentContainer = null, parentType = parent?.type ?? null, breakpoint = "desktop", onUpdate, onPromoteGrid, onSetGridPlacement, onConvertParentToGrid, onReplayAnimation, effectRegistry, disclosurePreview = "default", onDisclosurePreview, onAddAccordionItem, onAddTabItem, onRemoveTabItem, onSidebarItemAction, onSelectNode, onAddScrollScene, onRemoveScrollScene, bindingAlias, bindingSchemaName, onEditCardDetails, onCreateProjectPage }: PropertiesInspectorProps) {
  if (node === null) {
    return (
      <aside aria-label="Properties" className="vb-inspector vb-inspector--polished">
        <div className="vb-inspector__empty">
          <p>Select an element on the canvas or in Layers to edit its properties.</p>
        </div>
      </aside>
    );
  }

  return (
    <InspectorContent
      key={node.id}
      node={node}
      parent={parent}
      parentContainer={parentContainer}
      parentType={parentType}
      breakpoint={breakpoint}
      onUpdate={onUpdate}
      onPromoteGrid={onPromoteGrid}
      onSetGridPlacement={onSetGridPlacement}
      onConvertParentToGrid={onConvertParentToGrid}
      onReplayAnimation={onReplayAnimation}
      effectRegistry={effectRegistry}
      disclosurePreview={disclosurePreview}
      onDisclosurePreview={onDisclosurePreview}
      onAddAccordionItem={onAddAccordionItem}
      onAddTabItem={onAddTabItem}
      onRemoveTabItem={onRemoveTabItem}
      onSidebarItemAction={onSidebarItemAction}
      onSelectNode={onSelectNode}
      onAddScrollScene={onAddScrollScene}
      onRemoveScrollScene={onRemoveScrollScene}
      bindingAlias={bindingAlias}
      bindingSchemaName={bindingSchemaName}
      onEditCardDetails={onEditCardDetails}
      onCreateProjectPage={onCreateProjectPage}
    />
  );
}

type InspectorContentProps = Omit<PropertiesInspectorProps, "node"> & { node: ComponentNode };

function InspectorContent({ node, parent, parentContainer, parentType, breakpoint = "desktop", onUpdate, onPromoteGrid, onSetGridPlacement, onConvertParentToGrid, onReplayAnimation, effectRegistry, disclosurePreview = "default", onDisclosurePreview, onAddAccordionItem, onAddTabItem, onRemoveTabItem, onSidebarItemAction, onSelectNode, onAddScrollScene, onRemoveScrollScene, bindingAlias, bindingSchemaName, onEditCardDetails, onCreateProjectPage }: InspectorContentProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<InspectorCategory>("all");
  const tabsId = useId();
  const [collapseSignal, setCollapseSignal] = useState(0);
  const [expandSignal, setExpandSignal] = useState(0);
  const tools = useMemo(
    () => ({ query, category, collapseSignal, expandSignal }),
    [query, category, collapseSignal, expandSignal],
  );

  return (
    <aside aria-label="Properties" className="vb-inspector vb-inspector--polished">
      <div className="vb-inspector__top">
        <header className="vb-inspector__header">
          <NodeTypeIcon type={node.type} className="vb-inspector__icon" />
          <div>
            <span className="vb-inspector__eyebrow">Selected element</span>
            <h2>{componentRegistry.get(node.type).label}</h2>
            <code className="vb-inspector__id" title={node.id}>{node.id}</code>
          </div>
        </header>
        <div role="tablist" aria-label="Property categories" className="vb-inspector__tabs">
          {(["all", "content", "design", "advanced"] as const).map((tab, index, tabs) => <button
            key={tab} id={`${tabsId}-${tab}`} type="button" role="tab" aria-selected={category === tab}
            aria-controls={`${tabsId}-panel`} tabIndex={category === tab ? 0 : -1}
            onClick={() => setCategory(tab)}
            onKeyDown={event => {
              const nextIndex = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
              if (nextIndex < 0) return;
              event.preventDefault();
              setCategory(tabs[nextIndex]);
              document.getElementById(`${tabsId}-${tabs[nextIndex]}`)?.focus();
            }}
          >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>)}
        </div>
        <InspectorToolbar
          onQuery={setQuery}
          onCollapseAll={() => setCollapseSignal((current) => current + 1)}
          onExpandAll={() => setExpandSignal((current) => current + 1)}
        />
      </div>
      <NodeDiagnostics node={node} />
      {bindingAlias ? <p className="px-3 py-2 text-xs opacity-70">Use <code>{"{{item.name}}"}</code> or <code>{"Price: {{item.price}}"}</code> in content fields. Templates use the current record in Sample records preview and on published pages. If a field already has a binding, choose Static under Data binding to use its template.</p> : null}
      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${category}`} className="vb-inspector__panel">
      <InspectorToolsContext.Provider value={tools}>
        {node.type === "repeater" ? <RepeaterLayoutInspector node={node} onUpdate={onUpdate} /> : null}
        {node.type === "expandable-card" && onEditCardDetails ? <InspectorSection title="Full-screen details"><button type="button" className="vb-button" onClick={onEditCardDetails}>Edit full-screen details</button><p>Design the expanded view with the normal canvas and inspector.</p></InspectorSection> : null}
        {parentType === "infinite-slider" ? <SlideLinkInspector node={node} onUpdate={onUpdate} onCreateProjectPage={onCreateProjectPage} /> : null}
        {componentRegistry.get(node.type).propertyGroups.map((group) => (
          <PropertyGroupEditor key={group} group={group} node={node} parentType={parentType} onUpdate={onUpdate} />
        ))}
        {parentType === "flex" || parentType === "stack" ? <ItemAlignmentSection node={node} onUpdate={onUpdate} /> : null}
        {node.type === "overlay" ? <OverlayInspector node={node} onUpdate={onUpdate} /> : null}
        {node.type === "form" ? <FormInspector node={node} /> : null}
        {node.type === "select" ? <SelectOptionsEditor node={node} onUpdate={onUpdate} /> : null}
        {node.type === "disclosure" ? (
          <InspectorSection title="Editor preview">
            <InspectorSelect label="State" ariaLabel="Editor preview" value={disclosurePreview} options={[{ value: "default", label: "Use default" }, { value: "open", label: "Open" }, { value: "closed", label: "Closed" }]} onChange={(value) => onDisclosurePreview?.(value as "default" | "open" | "closed")} />
          </InspectorSection>
        ) : null}
        {node.type === "accordion" && onAddAccordionItem ? <button type="button" className="vb-button" onClick={onAddAccordionItem}>Add item</button> : null}
        {node.type === "tabs" && onAddTabItem ? <button type="button" className="vb-button" onClick={onAddTabItem}>Add tab</button> : null}
        {node.type === "sidebar" && onSidebarItemAction ? <SidebarInspector node={node} onAction={onSidebarItemAction} onSelectNode={onSelectNode} /> : null}
        {node.type === "scroll-story" ? <ScrollStoryInspector node={node} onUpdate={onUpdate} onAddScene={onAddScrollScene} /> : null}
        {node.type === "scroll-scene" && parent?.type === "scroll-story" ? <ScrollSceneInspector node={node} story={parent} onUpdate={onUpdate} onRemoveScene={onRemoveScrollScene} /> : null}
        {node.type === "disclosure" && parent?.type === "tabs" && onRemoveTabItem ? (
          <InspectorSection title="Tab panel">
            <button type="button" className="vb-button" disabled={parent.children.length <= 2} onClick={onRemoveTabItem}>Remove tab</button>
            {parent.children.length <= 2 ? <p>Tabs must keep at least two panels.</p> : null}
          </InspectorSection>
        ) : null}
        {bindingAlias ? <BindingSection node={node} alias={bindingAlias} schemaName={bindingSchemaName} onUpdate={onUpdate} /> : null}
        {node.type === "grid" && (node.mediaLayout !== undefined || node.children.every((child) => child.type === "image")) ? <MediaLayoutInspector node={node} onUpdate={onUpdate} /> : null}
        {supportsDirectStyle(node) ? <TransformSection node={node} onUpdate={onUpdate} /> : null}
        <PaintInspector node={node} onUpdate={onUpdate} />
        {bindingAlias && supportsConditionalColors(node.type) ? <ConditionalColorsInspector key={node.id} node={node} schemaName={bindingSchemaName} onUpdate={onUpdate} /> : null}
        {effectRegistry && node.type !== "scroll-story" && node.type !== "scroll-scene" ? <EffectInspector node={node} registry={effectRegistry} onUpdate={onUpdate} /> : null}
        {node.type !== "scroll-story" && node.type !== "scroll-scene" ? <PositioningSection node={node} onUpdate={onUpdate} /> : null}
        {parentType === "grid" ? <GridPlacementSection node={node} breakpoint={breakpoint} onUpdate={onUpdate} onPromote={onPromoteGrid} onSetPlacement={onSetGridPlacement} /> : null}
        {parent?.type === "stack" || parent?.type === "flex" ? (
          <InspectorSection title="Positioning grid" category="content">
            <button type="button" className="vb-button" disabled={!canUsePositioningGrid(parent, parentContainer)} onClick={onConvertParentToGrid}>Convert to positioning grid</button>
            <p>Allows children to be positioned independently across a responsive 12×12 grid.</p>
            {!canUsePositioningGrid(parent, parentContainer) ? <p>Choose a height on this container or its parent before positioning its children.</p> : null}
          </InspectorSection>
        ) : null}
        {node.type !== "scroll-story" && node.type !== "scroll-scene" ? <AnimationSection node={node} onUpdate={onUpdate} onReplay={onReplayAnimation} /> : null}
        {node.type !== "scroll-story" && node.type !== "scroll-scene" ? <ResponsiveSection node={node} onUpdate={onUpdate} /> : null}
      </InspectorToolsContext.Provider>
      </div>
    </aside>
  );
}

function InspectorToolbar({ onQuery, onCollapseAll, onExpandAll }: { onQuery(value: string): void; onCollapseAll(): void; onExpandAll(): void }) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const change = (next: string) => {
    setQuery(next);
    onQuery(next);
  };

  return (
    <div className="vb-inspector__toolbar">
      <div className="vb-inspector__search">
        <input
          ref={searchRef}
          type="search"
          placeholder="Search all properties…"
          aria-label="Filter properties"
          value={query}
          onChange={(event) => change(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") change("");
          }}
        />
        {query !== "" ? (
          <button type="button" className="vb-inspector__search-clear" aria-label="Clear filter" title="Clear filter" onClick={() => { change(""); searchRef.current?.focus(); }}>✕</button>
        ) : null}
      </div>
      <div className="vb-inspector__toolbar-actions">
        <button
          type="button"
          className="vb-icon-button vb-icon-button--small"
          aria-label="Collapse all sections"
          title="Collapse all sections"
          onClick={onCollapseAll}
        >
          <ChevronIcon open={false} size={12} />
        </button>
        <button
          type="button"
          className="vb-icon-button vb-icon-button--small"
          aria-label="Expand all sections"
          title="Expand all sections"
          onClick={onExpandAll}
        >
          <ChevronIcon open size={12} />
        </button>
      </div>
    </div>
  );
}

function NodeDiagnostics({ node }: { node: ComponentNode }) {
  const messages: string[] = [];
  if (node.type === "icon" && !node.decorative && !node.accessibleLabel?.trim()) messages.push("Informative icons require an accessible label.");
  if (node.type === "rating" && (!Number.isInteger(node.max) || node.max < 1 || node.max > 10 || node.value < 0 || node.value > node.max || node.value * 2 !== Math.round(node.value * 2))) messages.push("Rating values must fit the maximum in half-star increments.");
  if (node.type === "quote" && Boolean(node.avatarSrc) !== Boolean(node.avatarAlt)) messages.push("Quote avatars require both a source and alternative text.");
  if ((node.type === "input" || node.type === "textarea" || node.type === "select" || node.type === "checkbox") && !/^[A-Za-z][A-Za-z0-9_.-]{0,63}$/.test(node.fieldName)) messages.push("Field names must start with a letter and use at most 64 letters, numbers, dots, dashes, or underscores.");
  if (node.type === "select" && (node.options.length < 1 || node.options.length > 50 || node.options.some((option) => !option.value.trim() || !option.label.trim()) || new Set(node.options.map((option) => option.value)).size !== node.options.length)) messages.push("Select options require unique, non-empty values and labels.");
  if (node.type === "button" && node.submit === true && (node.href !== undefined || node.openInNewTab !== undefined)) messages.push("Submit buttons cannot have a link or open in a new tab.");
  if (messages.length === 0) return null;
  return <div role="status" className="vb-inspector__diagnostic">{messages.map((message) => <p key={message}>{message}</p>)}</div>;
}

type GroupProps = { node: ComponentNode; onUpdate: PropertiesInspectorProps["onUpdate"] };

function PropertyGroupEditor({ group, node, parentType, onUpdate }: { group: PropertyGroup; parentType?: NodeType | null } & GroupProps) {
  switch (group) {
    case "content": return <><MetadataFieldEditor node={node} group="content" onUpdate={onUpdate} /><ContentSection node={node} onUpdate={onUpdate} /></>;
    case "media": return <><MetadataFieldEditor node={node} group="media" onUpdate={onUpdate} /><MediaSection node={node} onUpdate={onUpdate} /></>;
    case "layout": return <LayoutSection node={node} onUpdate={onUpdate} />;
    case "spacing": return <SpacingSection node={node} onUpdate={onUpdate} />;
    case "color": return <ColorSection node={node} onUpdate={onUpdate} />;
    case "typography": return <TypographySection node={node} onUpdate={onUpdate} />;
    case "border": return <BorderSection node={node} onUpdate={onUpdate} />;
    case "sizing": return <SizingSection node={node} parentType={parentType} onUpdate={onUpdate} />;
    case "behavior": return <><MetadataFieldEditor node={node} group="behavior" onUpdate={onUpdate} /><BehaviorSection node={node} onUpdate={onUpdate} /></>;
    case "data": return <DataSection node={node} onUpdate={onUpdate} />;
  }
}

function DataSection({ node, onUpdate }: GroupProps) {
 return node.type === "repeater" ? <CollectionDataInspector node={node} onUpdate={onUpdate} /> : null;
}

function BindingSection({ node, alias, schemaName, onUpdate }: GroupProps & { alias: string; schemaName?: string }) {
  const fields = useVisualDataSchemas().find(schema => schema.name === schemaName)?.fields || [];
  const properties: Array<{ property: BindableProperty; label: string }> =
    node.type === "heading" || node.type === "text" ? [{ property: "text", label: "Text" }]
      : node.type === "image" ? [{ property: "src", label: "Image source" }, { property: "alt", label: "Alt text" }]
        : node.type === "button" ? [{ property: "label", label: "Label" }, { property: "href", label: "Link" }, { property: "accessibleLabel", label: "Accessible label" }]
          : node.type === "badge" ? [{ property: "text", label: "Text" }]
            : node.type === "link" ? [{ property: "label", label: "Label" }, { property: "href", label: "Link" }, { property: "accessibleLabel", label: "Accessible label" }]
              : node.type === "avatar" ? [{ property: "src", label: "Avatar source" }, { property: "alt", label: "Alt text" }, { property: "fallback", label: "Fallback" }]
                : node.type === "icon" && !node.decorative ? [{ property: "accessibleLabel", label: "Accessible label" }]
                  : node.type === "stat" ? [{ property: "value", label: "Value" }, { property: "label", label: "Label" }, { property: "prefix", label: "Prefix" }, { property: "suffix", label: "Suffix" }]
                    : node.type === "quote" ? [{ property: "quote", label: "Quote" }, { property: "author", label: "Author" }, { property: "role", label: "Role" }, { property: "avatarSrc", label: "Avatar source" }, { property: "avatarAlt", label: "Avatar alt text" }]
                      : [];
  if (properties.length === 0) return null;
  const updateBinding = (property: BindableProperty, value: string) => {
    const prefix = `${alias}.`;
    const rawPath = value.startsWith(prefix) ? value.slice(prefix.length) : value;
    const path = rawPath.split(".").filter(Boolean);
    onUpdate({ bindings: { ...node.bindings, [property]: { source: "item", path } } });
  };
  return (
    <InspectorSection title="Data binding">
      <p>Static fields also accept templates such as <code>{"{{item.name}}"}</code>, <code>{"Price: {{item.price}}"}</code> and image sources such as <code>{"{{item.imageUrl}}"}</code>. Use <code>item</code> in templates, even if the repeater alias is different.</p>
      {properties.map(({ property, label }) => {
        const binding = node.bindings?.[property];
        return (
          <div key={property}>
            <InspectorSelect
              label={`${label} source`}
              value={binding ? "binding" : "static"}
              options={[{ value: "static", label: "Static" }, { value: "binding", label: "Binding" }]}
              onChange={(mode) => {
                if (mode === "binding") updateBinding(property, `${alias}.field`);
                else {
                  const bindings = { ...node.bindings };
                  delete bindings[property];
                  onUpdate({ bindings: Object.keys(bindings).length > 0 ? bindings : undefined });
                }
              }}
            />
            {!!fields.length && <InspectorSelect label={`${label} item field`} ariaLabel={`${label} item field`} value={binding ? JSON.stringify(binding.path) : ""} options={[{ value: "", label: "Choose field or enter manually" }, ...fields.map(field => ({ value: JSON.stringify(field.path), label: field.path.join(".") }))]} onChange={value => { if (value) onUpdate({ bindings: { ...node.bindings, [property]: { source: "item", path: JSON.parse(value) } } }); }} />}
            {binding ? <InspectorInput label={`${label} binding`} ariaLabel={`${label} binding`} value={`${alias}.${binding.path.join(".")}`} onChange={(value) => updateBinding(property, value)} /> : null}
          </div>
        );
      })}
    </InspectorSection>
  );
}

function BehaviorSection({ node, onUpdate }: GroupProps) {
  if (node.type === "disclosure") {
    return (
      <InspectorSection title="Behavior">
        <InspectorSelect label="Default state" ariaLabel="Default state" value={node.defaultOpen ? "open" : "closed"} options={[{ value: "closed", label: "Closed" }, { value: "open", label: "Open" }]} onChange={(value) => onUpdate({ defaultOpen: value === "open" })} />
        <InspectorSelect label="Transition" value={node.transition} options={[{ value: "none", label: "None" }, { value: "height-fade", label: "Height and fade" }]} onChange={(value) => onUpdate({ transition: value as "none" | "height-fade" })} />
      </InspectorSection>
    );
  }
  if (node.type === "accordion") {
    return (
      <InspectorSection title="Behavior">
        <InspectorSelect label="Open items" value={node.openMode} options={[{ value: "single", label: "One at a time" }, { value: "multiple", label: "Multiple" }]} onChange={(value) => onUpdate({ openMode: value as "single" | "multiple" })} />
        <InspectorCheckbox label="Allow all items closed" checked={node.collapsible} onChange={(collapsible) => onUpdate({ collapsible })} />
      </InspectorSection>
    );
  }
  if (node.type === "navigation-menu") {
    return (
      <InspectorSection title="Behavior">
        <InspectorSelect label="Direction" value={node.orientation} options={[{ value: "horizontal", label: "Horizontal" }, { value: "vertical", label: "Vertical" }]} onChange={(orientation) => onUpdate({ orientation: orientation as "horizontal" | "vertical" })} />
        <InspectorCheckbox label="Show child pages" checked={node.showChildren} onChange={(showChildren) => onUpdate({ showChildren })} />
        <InspectorInput label="Active link color" value={node.activeColor ?? ""} onChange={(activeColor) => onUpdate({ activeColor: activeColor || undefined })} />
        <InspectorInput label="Hover link color" value={node.hoverColor ?? ""} onChange={(hoverColor) => onUpdate({ hoverColor: hoverColor || undefined })} />
      </InspectorSection>
    );
  }
  if (node.type === "footer-links") {
    return (
      <InspectorSection title="Behavior">
        <InspectorInput label="Active link color" value={node.activeColor ?? ""} onChange={(activeColor) => onUpdate({ activeColor: activeColor || undefined })} />
        <InspectorInput label="Hover link color" value={node.hoverColor ?? ""} onChange={(hoverColor) => onUpdate({ hoverColor: hoverColor || undefined })} />
      </InspectorSection>
    );
  }
  if (node.type === "menu-toggle") {
    return (
      <InspectorSection title="Behavior">
        <InspectorInput label="Menu panel ID" ariaLabel="Menu panel ID" value={node.targetId} onChange={(targetId) => onUpdate({ targetId })} />
      </InspectorSection>
    );
  }
  if (node.type === "theme-switcher") {
    return (
      <InspectorSection title="Behavior">
        <InspectorSelect label="Presentation" value={node.presentation} options={[{ value: "segmented", label: "Segmented buttons" }, { value: "select", label: "Select menu" }]} onChange={(presentation) => onUpdate({ presentation: presentation as "segmented" | "select" })} />
      </InspectorSection>
    );
  }
  return null;
}

function ContentSection({ node, onUpdate }: GroupProps) {
  switch (node.type) {
    case "heading":
    case "text":
    case "button":
      return null;
    case "code":
      return (
        <InspectorSection title="Content">
          <InspectorTextarea label="Code" value={node.code} onChange={(code) => onUpdate({ code })} />
          <InspectorInput label="Language" value={node.language} onChange={(language) => onUpdate({ language })} />
          <InspectorCheckbox label="Show language label" checked={node.showLanguage} onChange={(showLanguage) => onUpdate({ showLanguage })} />
          <InspectorCheckbox label="Show copy button" checked={node.showCopy} onChange={(showCopy) => onUpdate({ showCopy })} />
          <InspectorCheckbox label="Wrap long lines" checked={node.wrap} onChange={(wrap) => onUpdate({ wrap })} />
        </InspectorSection>
      );
    case "list":
      return <ListItemsEditor node={node} onUpdate={onUpdate} />;
    case "tags":
      return <TagsEditor node={node} onUpdate={onUpdate} />;
    case "kbd":
      return <KbdEditor node={node} onUpdate={onUpdate} />;
    case "steps":
      return <StepsEditor node={node} onUpdate={onUpdate} />;
    case "table":
      return <TableEditor node={node} onUpdate={onUpdate} />;
    case "timeline":
      return <TimelineEditor node={node} onUpdate={onUpdate} />;
    case "bar-chart":
      return <BarChartEditor node={node} onUpdate={onUpdate} />;
    case "menu-toggle":
      return (
        <InspectorSection title="Content">
          <InspectorInput label="Label" ariaLabel="Menu toggle label" value={node.label} onChange={(label) => onUpdate({ label })} />
        </InspectorSection>
      );
    case "theme-switcher":
      return (
        <InspectorSection title="Content">
          <InspectorInput label="Accessible label" value={node.accessibleLabel} onChange={(accessibleLabel) => onUpdate({ accessibleLabel })} />
          <InspectorInput label="Light label" value={node.labels.light} onChange={(light) => onUpdate({ labels: { ...node.labels, light } })} />
          <InspectorInput label="Dark label" value={node.labels.dark} onChange={(dark) => onUpdate({ labels: { ...node.labels, dark } })} />
          <InspectorInput label="System label" value={node.labels.system} onChange={(system) => onUpdate({ labels: { ...node.labels, system } })} />
        </InspectorSection>
      );
    default:
      return null;
  }
}

function MediaSection({ node, onUpdate }: GroupProps) {
  if (node.type !== "image") return null;
  return (
    <InspectorSection title="Media">
      <InspectorNumber label="Image opacity" value={node.style?.media?.opacity ?? 1} min={0} max={1} step={0.05} onChange={(opacity) => onUpdate({ style: { ...node.style, media: { ...node.style?.media, opacity } } })} />
      <InspectorNumber label="Blur" value={node.style?.media?.filters?.blur ?? 0} min={0} max={40} step={1} unit="px" onChange={(blur) => updateImageFilter(node, onUpdate, { blur })} />
      <InspectorNumber label="Brightness" value={node.style?.media?.filters?.brightness ?? 100} min={0} max={300} step={5} unit="%" onChange={(brightness) => updateImageFilter(node, onUpdate, { brightness })} />
      <InspectorNumber label="Contrast" value={node.style?.media?.filters?.contrast ?? 100} min={0} max={300} step={5} unit="%" onChange={(contrast) => updateImageFilter(node, onUpdate, { contrast })} />
      <InspectorNumber label="Grayscale" value={node.style?.media?.filters?.grayscale ?? 0} min={0} max={100} step={5} unit="%" onChange={(grayscale) => updateImageFilter(node, onUpdate, { grayscale })} />
      <InspectorNumber label="Saturation" value={node.style?.media?.filters?.saturation ?? 100} min={0} max={300} step={5} unit="%" onChange={(saturation) => updateImageFilter(node, onUpdate, { saturation })} />
    </InspectorSection>
  );
}

function LayoutSection({ node, onUpdate }: GroupProps) {
  if (node.type !== "stack" && node.type !== "flex") return null;
  return (
    <InspectorSection title="Layout">
      <InspectorSelect label="Direction" value={node.direction} options={layoutDirections} onChange={(direction) => onUpdate({ direction: direction as LayoutDirection })} />
      <InspectorSelect label="Alignment" value={node.alignment} options={layoutAlignments} onChange={(alignment) => onUpdate({ alignment: alignment as LayoutAlignment })} />
      <InspectorSelect label="Distribution" value={node.distribution} options={layoutDistributions} onChange={(distribution) => onUpdate({ distribution: distribution as LayoutDistribution })} />
      <InspectorSelect label="Gap" ariaLabel="Layout gap" value={node.gap} options={SPACING_TOKENS} onChange={(gap) => onUpdate({ gap: gap as SpacingToken })} />
      <InspectorLengthInput label="Custom gap" ariaLabel="Custom layout gap" value={node.style?.custom?.gap} onChange={(gap) => updateCustomDimension(node, onUpdate, "gap", gap)} />
      <InspectorCheckbox label="Wrap children" checked={node.wrap} onChange={(wrap) => onUpdate({ wrap })} />
    </InspectorSection>
  );
}

function GridPlacementSection({ node, breakpoint, onUpdate, onPromote, onSetPlacement }: GroupProps & {
  breakpoint: Breakpoint;
  onPromote?: () => void;
  onSetPlacement?: (patch: Partial<GridPlacement>) => void;
}) {
  const placement = node.layout?.placement?.[breakpoint];
  if (placement) {
    return (
      <InspectorSection title="Grid placement">
        <p>{breakpointNames[breakpoint]}</p>
        <InspectorNumber label="Column" ariaLabel="Grid column" value={placement.column} min={1} max={13 - placement.columnSpan} onChange={(column) => onSetPlacement?.({ column })} />
        <InspectorNumber label="Row" ariaLabel="Grid row" value={placement.row} min={1} max={13 - placement.rowSpan} onChange={(row) => onSetPlacement?.({ row })} />
        <InspectorNumber label="Width" ariaLabel="Grid width" value={placement.columnSpan} min={1} max={13 - placement.column} onChange={(columnSpan) => onSetPlacement?.({ columnSpan })} />
        <InspectorNumber label="Height" ariaLabel="Grid height" value={placement.rowSpan} min={1} max={13 - placement.row} onChange={(rowSpan) => onSetPlacement?.({ rowSpan })} />
      </InspectorSection>
    );
  }
  const span = node.layout?.span ?? { mobile: 12, tablet: 12, desktop: 12 };
  const flowStart = node.layout?.start?.[breakpoint] ?? null;
  const spanOptions = Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: `${index + 1} / 12` }));
  return (
    <InspectorSection title="Grid placement">
      {flowStart !== null ? (
        <>
          <p>{breakpointNames[breakpoint]} slot: column {flowStart.column}, row {flowStart.row}.</p>
          <button type="button" className="vb-button" onClick={() => {
            const start = node.layout?.start;
            if (start === undefined) return;
            const next = { ...start, [breakpoint]: null };
            const hasStart = next.mobile !== null || next.tablet !== null || next.desktop !== null;
            onUpdate({ layout: { ...node.layout, ...(hasStart ? { start: next } : { start: undefined }) } });
          }}>Use automatic flow</button>
        </>
      ) : null}
      <button type="button" className="vb-button" onClick={onPromote}>Switch to positioning mode</button>
      {breakpoints.map((breakpoint) => (
        <InspectorSelect
          key={breakpoint}
          label={breakpointNames[breakpoint]}
          ariaLabel={`${breakpointNames[breakpoint]} span`}
          value={String(span[breakpoint])}
          options={spanOptions}
          onChange={(value) => onUpdate({ layout: { span: { ...span, [breakpoint]: Number(value) } } })}
        />
      ))}
    </InspectorSection>
  );
}

function AnimationSection({ node, onUpdate, onReplay }: GroupProps & { onReplay?: (nodeId: string) => void }) {
  const animation = node.animation;
  const active = animation !== undefined && animation.preset !== "none";
  const current: AnimationSpec = animation ?? DEFAULT_ANIMATION;
  const isContainer = componentRegistry.get(node.type).canHaveChildren;

  const patch = (changes: Partial<AnimationSpec>) => {
    onUpdate({ animation: { ...current, ...changes } });
  };

  const changePreset = (preset: string) => {
    if (preset === "none") {
      if (animation !== undefined) onUpdate({ animation: undefined });
      return;
    }
    patch({ preset: preset as AnimationPreset });
  };

  return (
    <InspectorSection
      title="Animation"
      defaultOpen={active}
      actions={active && onReplay !== undefined ? (
        <button type="button" className="vb-icon-button vb-icon-button--small" aria-label="Replay animation" title="Replay animation" onClick={() => onReplay(node.id)}>
          <ReplayIcon size={14} />
        </button>
      ) : undefined}
    >
      <InspectorSelect
        label="Effect"
        value={active ? current.preset : "none"}
        options={ANIMATION_PRESETS.map((preset) => ({ value: preset, label: PRESET_LABELS[preset] }))}
        onChange={changePreset}
      />
      {active ? (
        <>
          <InspectorSelect label="Trigger" value={current.trigger} options={ANIMATION_TRIGGERS.map((trigger) => ({ value: trigger, label: TRIGGER_LABELS[trigger] }))} onChange={(trigger) => patch({ trigger: trigger as AnimationTrigger })} />
          <InspectorNumber label="Duration" value={current.duration} min={ANIMATION_LIMITS.duration.min} max={ANIMATION_LIMITS.duration.max} step={50} unit="ms" onChange={(duration) => patch({ duration })} />
          <InspectorNumber label="Delay" value={current.delay} min={ANIMATION_LIMITS.delay.min} max={ANIMATION_LIMITS.delay.max} step={50} unit="ms" onChange={(delay) => patch({ delay })} />
          <InspectorSelect label="Easing" value={current.easing} options={ANIMATION_EASINGS.map((easing) => ({ value: easing, label: EASING_LABELS[easing] }))} onChange={(easing) => patch({ easing: easing as AnimationEasing })} />
          <InspectorCheckbox label="Play once" checked={current.once} onChange={(once) => patch({ once })} />
          {isContainer ? (
            <>
              <InspectorCheckbox
                label="Stagger children"
                checked={current.stagger !== undefined}
                onChange={(enabled) => {
                  if (enabled) patch({ stagger: 100 });
                  else onUpdate({ animation: withoutStagger(current) });
                }}
              />
              {current.stagger !== undefined ? (
                <InspectorNumber label="Stagger" value={current.stagger} min={ANIMATION_LIMITS.stagger.min} max={ANIMATION_LIMITS.stagger.max} step={25} unit="ms" onChange={(stagger) => patch({ stagger })} />
              ) : null}
            </>
          ) : null}
        </>
      ) : null}
    </InspectorSection>
  );
}

function ResponsiveSection({ node, onUpdate }: GroupProps) {
  const visibility = node.responsive?.visibility ?? { mobile: true, tablet: true, desktop: true };
  return (
    <InspectorSection title="Responsive" defaultOpen={false}>
      {breakpoints.map((breakpoint) => (
        <InspectorCheckbox
          key={breakpoint}
          label={`Visible on ${breakpoint}`}
          checked={visibility[breakpoint]}
          onChange={(checked) => onUpdate({ responsive: { ...node.responsive, visibility: { ...visibility, [breakpoint]: checked } } })}
        />
      ))}
    </InspectorSection>
  );
}

function SpacingSection({ node, onUpdate }: GroupProps) {
  const [spacingTarget, setSpacingTarget] = useState<SpacingTarget>("base");
  const responsiveSpacing = spacingTarget === "base" ? undefined : node.responsive?.spacing?.[spacingTarget];
  const spacing = spacingTarget === "base" ? node.style?.spacing : responsiveSpacing?.spacing;
  const custom = spacingTarget === "base" ? node.style?.custom : responsiveSpacing?.custom;

  const writeSpacing = (next: StyleSpec["spacing"]) => {
    if (spacingTarget === "base") {
      const style = { ...node.style };
      if (next === undefined || Object.keys(next).length === 0) delete style.spacing;
      else style.spacing = next;
      onUpdate({ style });
      return;
    }
    updateResponsiveSpacing(node, onUpdate, spacingTarget, { spacing: next });
  };

  const updateAllSides = (kind: "margin" | "padding" | "gap", value: string) => {
    const next = { ...spacing };
    if (value === "") delete next[kind];
    else next[kind] = value as SpacingToken;
    writeSpacing(next);
  };

  const updateSide = (kind: "margin" | "padding", side: string, value: string) => {
    const field = `${kind}${side}` as keyof NonNullable<StyleSpec["spacing"]>;
    const next = { ...spacing };
    if (value === "") delete next[field];
    else next[field] = value as SpacingToken;
    writeSpacing(next);
  };

  const updateCustom = (key: "padding" | "margin" | "gap", value: string | undefined) => {
    if (spacingTarget === "base") {
      updateCustomDimension(node, onUpdate, key, value);
      return;
    }
    updateResponsiveSpacing(node, onUpdate, spacingTarget, { custom: { [key]: value } });
  };

  return (
    <InspectorSection title="Spacing">
      <InspectorSelect
        label="Spacing breakpoint"
        value={spacingTarget}
        options={[
          { value: "base", label: "Mobile (base)" },
          { value: "tablet", label: "Tablet" },
          { value: "desktop", label: "Desktop" },
        ]}
        onChange={(value) => setSpacingTarget(value as SpacingTarget)}
      />
      {spacingTarget !== "base" ? (
        <>
          <p className="vb-inspector__hint">Values inherit upward. Clear a field to use the previous breakpoint.</p>
          {responsiveSpacing !== undefined ? (
            <button
              type="button"
              className="vb-button"
              onClick={() => updateResponsiveSpacing(node, onUpdate, spacingTarget, { spacing: undefined, custom: undefined })}
            >
              Clear {breakpointNames[spacingTarget]} spacing
            </button>
          ) : null}
        </>
      ) : null}

      {supportsDirectStyle(node) ? <div className="vb-padding-editor" role="group" aria-label="Visual padding editor">
        <span className="vb-padding-editor__caption">Padding · {spacingTarget === "base" ? "Mobile (base)" : breakpointNames[spacingTarget]} · px</span>
        {(["Top", "Right", "Bottom", "Left"] as const).map(side => <DirectStyleNumber key={side} node={node} breakpoint={spacingTarget === "base" ? "mobile" : spacingTarget} property={`padding${side}`} label={side} ariaLabel={`Padding ${side.toLowerCase()} pixels`} resetLabel={`Reset ${side.toLowerCase()} padding`} onUpdate={onUpdate} />)}
        <span className="vb-padding-editor__center" aria-hidden="true">Content</span>
      </div> : null}
      <fieldset className="vb-spacing-fieldset">
        <legend className="vb-spacing-legend">Padding</legend>
        <InspectorTokenSelect label="All sides" value={spacing?.padding} tokens={SPACING_TOKENS} onChange={(padding) => updateAllSides("padding", padding)} />
        <InspectorLengthInput label="Custom padding" value={custom?.padding} onChange={(padding) => updateCustom("padding", padding)} />
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <InspectorTokenSelect compact label="Top" ariaLabel="Padding Top" value={spacing?.paddingTop} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "Top", v)} />
          <InspectorTokenSelect compact label="Bottom" ariaLabel="Padding Bottom" value={spacing?.paddingBottom} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "Bottom", v)} />
          <InspectorTokenSelect compact label="Left" ariaLabel="Padding Left" value={spacing?.paddingLeft} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "Left", v)} />
          <InspectorTokenSelect compact label="Right" ariaLabel="Padding Right" value={spacing?.paddingRight} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "Right", v)} />
        </div>
      </fieldset>

      <fieldset className="vb-spacing-fieldset">
        <legend className="vb-spacing-legend">Margin</legend>
        <InspectorTokenSelect label="All sides" value={spacing?.margin} tokens={SPACING_TOKENS} onChange={(margin) => updateAllSides("margin", margin)} />
        <InspectorLengthInput label="Custom margin" value={custom?.margin} onChange={(margin) => updateCustom("margin", margin)} />
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <InspectorTokenSelect compact label="Top" ariaLabel="Margin Top" value={spacing?.marginTop} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "Top", v)} />
          <InspectorTokenSelect compact label="Bottom" ariaLabel="Margin Bottom" value={spacing?.marginBottom} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "Bottom", v)} />
          <InspectorTokenSelect compact label="Left" ariaLabel="Margin Left" value={spacing?.marginLeft} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "Left", v)} />
          <InspectorTokenSelect compact label="Right" ariaLabel="Margin Right" value={spacing?.marginRight} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "Right", v)} />
        </div>
      </fieldset>

      <details className="vb-spacing-details">
        <summary>Axis shortcuts (X / Y)</summary>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <InspectorTokenSelect compact label="Pad X" ariaLabel="Padding X" value={spacing?.paddingX} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "X", v)} />
          <InspectorTokenSelect compact label="Pad Y" ariaLabel="Padding Y" value={spacing?.paddingY} tokens={SPACING_TOKENS} onChange={(v) => updateSide("padding", "Y", v)} />
          <InspectorTokenSelect compact label="Mar X" ariaLabel="Margin X" value={spacing?.marginX} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "X", v)} />
          <InspectorTokenSelect compact label="Mar Y" ariaLabel="Margin Y" value={spacing?.marginY} tokens={SPACING_TOKENS} onChange={(v) => updateSide("margin", "Y", v)} />
        </div>
      </details>

      {supportsChildGap(node.type) ? (
        <fieldset className="vb-spacing-fieldset">
          <legend className="vb-spacing-legend">Space between components</legend>
          <InspectorTokenSelect label="Gap" value={spacing?.gap} tokens={SPACING_TOKENS} onChange={(gap) => updateAllSides("gap", gap)} />
          <InspectorLengthInput label="Custom gap" ariaLabel="Custom gap between components" value={custom?.gap} onChange={(gap) => updateCustom("gap", gap)} />
        </fieldset>
      ) : null}
    </InspectorSection>
  );
}

function defaultAccentColor(node: ComponentNode): ColorValue {
  return { kind: "token", value: node.style?.color?.text ?? "text" };
}

function ColorSection({ node, onUpdate }: GroupProps) {
  return (
    <InspectorSection title="Color">
      <InspectorTokenSelect label="Text color" value={node.style?.color?.text} tokens={COLOR_TOKENS} swatches={COLOR_SWATCHES} onChange={(text) => {
        const style = { ...node.style, color: { ...node.style?.color, text: text as (typeof COLOR_TOKENS)[number] } };
        delete style.textPaint;
        onUpdate({ style });
      }} />
      <InspectorTokenSelect label="Background" value={node.style?.color?.background} tokens={backgroundTokens} swatches={COLOR_SWATCHES} onChange={(background) => updateStyle(node, onUpdate, "color", { background })} />
      {node.type === "progress" || node.type === "bar-chart" || node.type === "sparkline" ? (
        <>
          <ColorPaintControl
            label={node.type === "progress" ? "Progress bar color" : node.type === "bar-chart" ? "Bar color" : "Line and area color"}
            value={node.accentColor ?? defaultAccentColor(node)}
            onChange={(accentColor) => onUpdate({ accentColor })}
          />
          {node.accentColor !== undefined ? <button type="button" className="vb-button" onClick={() => onUpdate({ accentColor: undefined })}>Use text color</button> : null}
          {node.type === "progress" ? <p className="vb-paint-hint">Drag the bar on the canvas to change its value.</p> : null}
        </>
      ) : null}
    </InspectorSection>
  );
}

function TypographySection({ node, onUpdate }: GroupProps) {
  return (
    <InspectorSection title="Typography">
      <InspectorTokenSelect label="Font family" value={node.style?.typography?.family} tokens={FONT_FAMILIES} onChange={(family) => {
        const typography = { ...node.style?.typography };
        if (family === "") delete typography.family;
        else typography.family = family as (typeof FONT_FAMILIES)[number];
        onUpdate({ style: { ...node.style, typography } });
      }} />
      <InspectorTokenSelect label="Size" ariaLabel="Text size" value={node.style?.typography?.size} tokens={TYPOGRAPHY_SIZES} onChange={(size) => updateStyle(node, onUpdate, "typography", { size })} />
      <InspectorTokenSelect label="Weight" ariaLabel="Text weight" value={node.style?.typography?.weight} tokens={TYPOGRAPHY_WEIGHTS} onChange={(weight) => updateStyle(node, onUpdate, "typography", { weight })} />
      <InspectorTokenSelect label="Align" ariaLabel="Text alignment" value={node.style?.typography?.align} tokens={TEXT_ALIGNMENTS} onChange={(align) => updateStyle(node, onUpdate, "typography", { align })} />
      <InspectorTokenSelect label="Letter spacing" value={node.style?.typography?.tracking} tokens={TRACKING_TOKENS} onChange={(tracking) => updateStyle(node, onUpdate, "typography", { tracking })} />
      <InspectorTokenSelect label="Line height" value={node.style?.typography?.leading} tokens={LEADING_TOKENS} onChange={(leading) => updateStyle(node, onUpdate, "typography", { leading })} />
    </InspectorSection>
  );
}

function BorderSection({ node, onUpdate }: GroupProps) {
  return (
    <InspectorSection title="Border & shadow">
      <InspectorTokenSelect label="Radius" ariaLabel="Corner radius" value={node.style?.border?.radius} tokens={RADIUS_TOKENS} onChange={(radius) => updateStyle(node, onUpdate, "border", { radius })} />
      <InspectorLengthInput label="Custom border radius" value={node.style?.custom?.borderRadius} onChange={(borderRadius) => updateCustomDimension(node, onUpdate, "borderRadius", borderRadius)} />
      {node.type === "image" ? (
        <>
          <InspectorTokenSelect label="Top left" ariaLabel="Top left radius" value={node.style?.border?.topLeftRadius} tokens={RADIUS_TOKENS} onChange={(topLeftRadius) => updateStyle(node, onUpdate, "border", { topLeftRadius })} />
          <InspectorTokenSelect label="Top right" ariaLabel="Top right radius" value={node.style?.border?.topRightRadius} tokens={RADIUS_TOKENS} onChange={(topRightRadius) => updateStyle(node, onUpdate, "border", { topRightRadius })} />
          <InspectorTokenSelect label="Bottom left" ariaLabel="Bottom left radius" value={node.style?.border?.bottomLeftRadius} tokens={RADIUS_TOKENS} onChange={(bottomLeftRadius) => updateStyle(node, onUpdate, "border", { bottomLeftRadius })} />
          <InspectorTokenSelect label="Bottom right" ariaLabel="Bottom right radius" value={node.style?.border?.bottomRightRadius} tokens={RADIUS_TOKENS} onChange={(bottomRightRadius) => updateStyle(node, onUpdate, "border", { bottomRightRadius })} />
        </>
      ) : null}
      <InspectorTokenSelect label="Border width" value={node.style?.border?.width} tokens={BORDER_WIDTHS} onChange={(width) => updateStyle(node, onUpdate, "border", { width })} />
      <InspectorLengthInput label="Custom border width" value={node.style?.custom?.borderWidth} onChange={(borderWidth) => updateCustomDimension(node, onUpdate, "borderWidth", borderWidth)} />
      <InspectorTokenSelect label="Color" ariaLabel="Border color" value={node.style?.border?.color} tokens={COLOR_TOKENS} swatches={COLOR_SWATCHES} onChange={(color) => updateStyle(node, onUpdate, "border", { color })} />
      <InspectorTokenSelect label="Shadow" value={node.style?.border?.shadow} tokens={SHADOW_TOKENS} onChange={(shadow) => updateStyle(node, onUpdate, "border", { shadow })} />
    </InspectorSection>
  );
}

function DividerSizingSection({ node, onUpdate }: GroupProps) {
  const customWidth = node.style?.custom?.width;
  const sizingWidth = node.style?.sizing?.width;

  const isFull = sizingWidth === "full" || customWidth === "100%";
  const isMedium = customWidth === "50%";
  const isShort = (!sizingWidth) && (customWidth === undefined || customWidth === "" || customWidth === "48px" || customWidth === "3rem");

  const setPreset = (preset: "full" | "medium" | "short") => {
    if (preset === "full") {
      updateCustomDimension(node, onUpdate, "width", "100%");
      updateStyle(node, onUpdate, "sizing", { width: "full" });
    } else if (preset === "medium") {
      updateCustomDimension(node, onUpdate, "width", "50%");
      updateStyle(node, onUpdate, "sizing", { width: "" });
    } else if (preset === "short") {
      updateCustomDimension(node, onUpdate, "width", "48px");
      updateStyle(node, onUpdate, "sizing", { width: "" });
    }
  };

  return (
    <InspectorSection title="Divider Length & Alignment">
      <div className="space-y-3">
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-slate-600">Length Presets</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              className={`rounded border px-2 py-1.5 text-xs font-bold transition ${isFull ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              onClick={() => setPreset("full")}
            >
              Full (100%)
            </button>
            <button
              type="button"
              className={`rounded border px-2 py-1.5 text-xs font-bold transition ${isMedium ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              onClick={() => setPreset("medium")}
            >
              Medium (50%)
            </button>
            <button
              type="button"
              className={`rounded border px-2 py-1.5 text-xs font-bold transition ${isShort ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              onClick={() => setPreset("short")}
            >
              Short (48px)
            </button>
          </div>
        </div>

        <InspectorLengthInput
          label="Custom length"
          value={node.style?.custom?.width}
          onChange={(width) => updateCustomDimension(node, onUpdate, "width", width)}
        />

        <InspectorTokenSelect
          label="Alignment"
          value={node.style?.sizing?.align ?? "start"}
          tokens={SIZING_ALIGNS}
          onChange={(align) => updateStyle(node, onUpdate, "sizing", { align })}
        />
      </div>
    </InspectorSection>
  );
}

function SizingSection({ node, parentType, onUpdate }: GroupProps & { parentType?: NodeType | null }) {
  if (node.type === "divider") {
    return <DividerSizingSection node={node} onUpdate={onUpdate} />;
  }
  const sizing = node.style?.sizing;
  const canScale = heightScale(sizing?.height, sizing?.height) !== null;
  const setHeight = (height: string) => {
    const next = { ...sizing, height: height as NonNullable<typeof sizing>["height"] };
    if (height === "") delete next.height;
    if (next.scaleFromHeight && heightScale(next.scaleFromHeight, next.height) === null) delete next.scaleFromHeight;
    onUpdate({ style: { ...node.style, sizing: next } });
  };
  return (
    <InspectorSection title="Sizing">
      <InspectorTokenSelect label="Width" value={node.style?.sizing?.width} tokens={WIDTH_TOKENS} onChange={(width) => updateStyle(node, onUpdate, "sizing", { width })} />
      <InspectorLengthInput label="Custom width" value={node.style?.custom?.width} onChange={(width) => updateCustomDimension(node, onUpdate, "width", width)} />
      <InspectorTokenSelect label="Height" value={node.style?.sizing?.height} tokens={HEIGHT_TOKENS} onChange={setHeight} />
      <InspectorLengthInput label="Custom height" value={node.style?.custom?.height} onChange={(height) => updateCustomDimension(node, onUpdate, "height", height)} />
      {"children" in node ? <>
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" aria-label="Scale contents with height" disabled={!canScale} checked={sizing?.scaleFromHeight !== undefined} onChange={(event) => {
          const next = { ...sizing };
          if (event.target.checked) next.scaleFromHeight = next.height;
          else delete next.scaleFromHeight;
          onUpdate({ style: { ...node.style, sizing: next } });
        }} />Scale contents with height</label>
        <p className="text-xs opacity-70">Enable before resizing to scale text, images, and spacing together. Choose a fixed height and keep the same unit. Auto or a different unit turns scaling off.</p>
      </> : null}
      <InspectorTokenSelect label="Max width" ariaLabel="Maximum width" value={node.style?.sizing?.maxWidth} tokens={MAX_WIDTH_TOKENS} onChange={(maxWidth) => updateStyle(node, onUpdate, "sizing", { maxWidth })} />
      <InspectorLengthInput label="Custom maximum width" value={node.style?.custom?.maxWidth} onChange={(maxWidth) => updateCustomDimension(node, onUpdate, "maxWidth", maxWidth)} />
      {parentType === "flex" || parentType === "stack" ? null : (
        <InspectorTokenSelect label="Alignment" value={node.style?.sizing?.align} tokens={SIZING_ALIGNS} onChange={(align) => updateStyle(node, onUpdate, "sizing", { align })} />
      )}
      {node.type === "image" ? (
        <>
          <InspectorTokenSelect label="Fit" ariaLabel="Image fit" value={node.style?.sizing?.fit} tokens={OBJECT_FITS} onChange={(fit) => updateStyle(node, onUpdate, "sizing", { fit })} />
          <InspectorTokenSelect label="Position" ariaLabel="Object position" value={node.style?.sizing?.objectPosition} tokens={OBJECT_POSITIONS} onChange={(objectPosition) => updateStyle(node, onUpdate, "sizing", { objectPosition })} />
        </>
      ) : null}
    </InspectorSection>
  );
}

function ItemAlignmentSection({ node, onUpdate }: GroupProps) {
  const size = node.style?.sizing;
  const setAlign = (align: string) => {
    const next = { ...size };
    if (align === "") delete next.align;
    else next.align = align as NonNullable<typeof size>["align"];
    onUpdate({ style: { ...node.style, sizing: next } });
  };
  return (
    <InspectorSection title="Item alignment">
      <InspectorTokenSelect label="Alignment" ariaLabel="Item alignment" value={node.style?.sizing?.align} tokens={SIZING_ALIGNS} onChange={setAlign} />
      <p className="text-xs opacity-70">Overrides the container alignment for this item only. Center places it in the middle of the row or column.</p>
    </InspectorSection>
  );
}

const STICKY_TOP_LABELS: Record<SpacingToken, string> = {
  none: "None (0)",
  xs: "Extra Small (0.5rem)",
  sm: "Small (1rem)",
  md: "Medium (2rem)",
  lg: "Large (4rem)",
  xl: "Extra Large (5rem - Below Navbar)",
  "2xl": "2X Large (6rem)",
};

function PositioningSection({ node, onUpdate }: GroupProps) {
  const currentPosition = node.style?.positioning?.position ?? "static";
  const currentTop = node.style?.positioning?.top ?? "xl";
  const isSticky = currentPosition === "sticky";

  const handlePositionChange = (position: string) => {
    if (position === "static" || position === "") {
      const nextStyle = { ...node.style };
      if (nextStyle.positioning) {
        const nextPos = { ...nextStyle.positioning };
        delete nextPos.position;
        if (Object.keys(nextPos).length === 0) {
          delete nextStyle.positioning;
        } else {
          nextStyle.positioning = nextPos;
        }
      }
      onUpdate({ style: nextStyle });
    } else {
      updateStyle(node, onUpdate, "positioning", { position, top: currentTop });
    }
  };

  const handleTopChange = (top: string) => {
    updateStyle(node, onUpdate, "positioning", { position: "sticky", top });
  };

  return (
    <InspectorSection title="Positioning & Sticky">
      <InspectorSelect
        label="Position"
        ariaLabel="Position mode"
        value={currentPosition}
        options={[
          { value: "static", label: "Default (Static)" },
          { value: "sticky", label: "Sticky (Pin to top)" },
          { value: "relative", label: "Relative" },
        ]}
        onChange={handlePositionChange}
      />
      {isSticky ? (
        <>
          <InspectorSelect
            label="Sticky top offset"
            ariaLabel="Sticky top offset"
            value={currentTop}
            options={SPACING_TOKENS.map((token) => ({
              value: token,
              label: STICKY_TOP_LABELS[token] ?? token,
            }))}
            onChange={handleTopChange}
          />
          <p className="text-xs text-slate-500 mt-1">
            Pins this component to the top of the viewport as its container scrolls. In a side-by-side grid, the sticky element stays in view while adjacent content scrolls past.
          </p>
        </>
      ) : null}
    </InspectorSection>
  );
}

function updateStyle(node: ComponentNode, onUpdate: PropertiesInspectorProps["onUpdate"], group: "spacing" | "color" | "typography" | "border" | "sizing" | "positioning", patch: Record<string, string>) {
  onUpdate({ style: { ...node.style, [group]: { ...node.style?.[group], ...patch } } });
}

function updateCustomDimension(node: ComponentNode, onUpdate: PropertiesInspectorProps["onUpdate"], key: keyof CustomDimensionSpec, value: string | undefined) {
  const custom = { ...node.style?.custom } as CustomDimensionSpec;
  if (value === undefined) delete custom[key];
  else custom[key] = value;
  const style = { ...node.style };
  if (Object.keys(custom).length === 0) delete style.custom;
  else style.custom = custom;
  onUpdate({ style });
}

function updateResponsiveSpacing(
  node: ComponentNode,
  onUpdate: PropertiesInspectorProps["onUpdate"],
  target: Exclude<SpacingTarget, "base">,
  patch: { spacing?: StyleSpec["spacing"]; custom?: Partial<Pick<CustomDimensionSpec, "padding" | "margin" | "gap">> },
) {
  const spacingByBreakpoint = { ...node.responsive?.spacing };
  const current: ResponsiveSpacingSpec = { ...spacingByBreakpoint[target] };
  if ("spacing" in patch) {
    if (patch.spacing !== undefined && Object.keys(patch.spacing).length > 0) current.spacing = patch.spacing;
    else delete current.spacing;
  }
  if ("custom" in patch) {
    const custom = patch.custom === undefined ? {} : { ...current.custom };
    for (const [key, value] of Object.entries(patch.custom ?? {})) {
      if (value === undefined) delete custom[key as keyof typeof custom];
      else custom[key as keyof typeof custom] = value;
    }
    if (Object.keys(custom).length > 0) current.custom = custom;
    else delete current.custom;
  }
  if (Object.keys(current).length > 0) spacingByBreakpoint[target] = current;
  else delete spacingByBreakpoint[target];
  const responsive: ResponsiveSpec = { ...node.responsive };
  if (Object.keys(spacingByBreakpoint).length > 0) responsive.spacing = spacingByBreakpoint;
  else delete responsive.spacing;
  onUpdate({ responsive: Object.keys(responsive).length > 0 ? responsive : undefined });
}

function updateImageFilter(node: Extract<ComponentNode, { type: "image" }>, onUpdate: PropertiesInspectorProps["onUpdate"], patch: Record<string, number>) {
  onUpdate({ style: { ...node.style, media: { ...node.style?.media, filters: { ...node.style?.media?.filters, ...patch } } } });
}

function withoutStagger(animation: AnimationSpec): AnimationSpec {
  const next = { ...animation };
  delete next.stagger;
  return next;
}


function DirectStyleNumber({ node, breakpoint = "mobile", property, label, ariaLabel = label, resetLabel, onUpdate }: GroupProps & { breakpoint?: Breakpoint; property: DirectStyleProperty; label: string; ariaLabel?: string; resetLabel?: string }) {
  const value = directStyleValue(node, breakpoint, property);
  return <div className={`vb-direct-number vb-direct-number--${property}`}>
    <InspectorNumber label={label} ariaLabel={ariaLabel} value={value} min={property === "rotate" ? -180 : 0} max={property === "rotate" ? 180 : 512} unit={property === "rotate" ? "°" : "px"} onChange={next => onUpdate(directStylePatch(node, breakpoint, property, next))} />
    <button type="button" className="vb-direct-number__reset" aria-label={resetLabel ?? `Reset ${label.toLowerCase()}`} title="Use inherited value" onClick={() => onUpdate(directStylePatch(node, breakpoint, property, null))}>↺</button>
  </div>;
}

function TransformSection({ node, onUpdate }: GroupProps) {
  return <InspectorSection title="Transform" category="design">
    <DirectStyleNumber node={node} property="rotate" label="Rotation" onUpdate={onUpdate} />
    <DirectStyleNumber node={node} property="borderRadius" label="Corner radius" onUpdate={onUpdate} />
    <p className="vb-inspector__hint">Exact values also stay in sync with the canvas Style handles.</p>
  </InspectorSection>;
}
