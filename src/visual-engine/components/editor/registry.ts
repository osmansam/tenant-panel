import { componentRegistry } from "../core";
import { createSidebarPanel } from "../../model/sidebar";
import { createDefaultRepeaterLayout } from "../../model/repeaterLayout";
import type { ComponentNode, NodeType } from "../../model/nodes";
import type { ComponentEditorDefinition, ComponentEditorDefinitionMap, ComponentEditorRegistry, NodeIdFactory } from "./types";

function createTab(ids: NodeIdFactory, label: string, defaultOpen: boolean): Extract<ComponentNode, { type: "disclosure" }> {
  return {
    id: ids(), type: "disclosure", defaultOpen, transition: "none",
    children: [
      { id: ids(), type: "slot", name: "trigger", children: [{ id: ids(), type: "text", text: label }] },
      { id: ids(), type: "slot", name: "content", children: [{ id: ids(), type: "text", text: `Design the ${label.toLowerCase()} panel here.` }] },
    ],
  };
}

function createScrollScene(ids: NodeIdFactory, index: number): Extract<ComponentNode, { type: "scroll-scene" }> {
  const number = index + 1;
  return {
    id: ids(),
    type: "scroll-scene",
    length: 1.2,
    media: { kind: "image", src: "/visual-builder/placeholder.svg", alt: `Scene ${number} background`, objectFit: "cover" },
    children: [
      { id: ids(), type: "heading", level: 2, text: `Scene ${number}` },
      { id: ids(), type: "text", text: "Add the story beat for this scene." },
    ],
  };
}

const definitions = {
  section: { type: "section", icon: "section", createDefault: (ids) => ({ id: ids(), type: "section", children: [], style: { spacing: { padding: "xl" } } }) },
  grid: { type: "grid", icon: "grid", createDefault: (ids) => ({ id: ids(), type: "grid", columns: 12, children: [] }) },
  stack: { type: "stack", icon: "stack", createDefault: (ids) => ({ id: ids(), type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "lg", children: [] }) },
  flex: { type: "flex", icon: "flex", createDefault: (ids) => ({ id: ids(), type: "flex", direction: "row", alignment: "center", distribution: "start", wrap: true, gap: "md", children: [] }) },
  slot: { type: "slot", icon: "slot", createDefault: (ids) => ({ id: ids(), type: "slot", name: "content", children: [] }) },
  disclosure: { type: "disclosure", icon: "disclosure", createDefault: (ids) => ({
    id: ids(), type: "disclosure", defaultOpen: false, transition: "height-fade",
    children: [
      { id: ids(), type: "slot", name: "trigger", children: [{ id: ids(), type: "text", text: "Disclosure title" }] },
      { id: ids(), type: "slot", name: "content", children: [{ id: ids(), type: "text", text: "Add expandable content here." }] },
    ],
  }) },
  accordion: { type: "accordion", icon: "accordion", createDefault: (ids) => ({ id: ids(), type: "accordion", openMode: "single", collapsible: true, children: [createRegisteredDefault("disclosure", ids)] }) },
  tabs: { type: "tabs", icon: "tabs", createDefault: (ids) => ({ id: ids(), type: "tabs", children: [createTab(ids, "First tab", true), createTab(ids, "Second tab", false)] }) },
  sidebar: { type: "sidebar", icon: "sidebar", fields: [
    { key: "accessibleLabel", label: "Navigation label", ariaLabel: "Sidebar navigation label", control: "text", group: "content", required: true },
    { key: "navigationWidth", label: "Menu width (px)", ariaLabel: "Sidebar menu width", control: "number", group: "behavior", required: true, min: 160, max: 360, step: 8 },
  ], createDefault: ids => ({ id: ids(), type: "sidebar", accessibleLabel: "Sidebar navigation", navigationWidth: 224, children: [createSidebarPanel(ids, "Overview", true), createSidebarPanel(ids, "Details")] }) },
  "expandable-card": { type: "expandable-card", icon: "expandable-card", fields: [
    { key: "accessibleLabel", label: "Project name", ariaLabel: "Expandable card project name", control: "text", group: "content", required: true },
    { key: "closeLabel", label: "Close label", ariaLabel: "Expandable card close label", control: "text", group: "content", required: true },
  ], createDefault: ids => ({ id: ids(), type: "expandable-card", accessibleLabel: "Your project", closeLabel: "Close project", style: { border: { radius: "xl" } }, children: [
    { id: ids(), type: "slot", name: "preview", children: [
      { id: ids(), type: "image", src: "/visual-builder/placeholder.svg", alt: "Project preview", aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "xl" } } },
      { id: ids(), type: "heading", level: 3, text: "Your next great project", style: { spacing: { marginTop: "md" }, typography: { size: "xl" } } },
      { id: ids(), type: "text", text: "Click to explore the story.", style: { color: { text: "text-muted" } } },
    ] },
    { id: ids(), type: "slot", name: "details", children: [
      { id: ids(), type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "lg", children: [
        { id: ids(), type: "text", text: "SELECTED PROJECT", style: { color: { text: "text-muted" } } },
        { id: ids(), type: "heading", level: 1, text: "Your next great project", style: { typography: { size: "4xl", weight: "medium", tracking: "tight" } } },
        { id: ids(), type: "image", src: "/visual-builder/placeholder.svg", alt: "Project detail", aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "xl" } } },
        { id: ids(), type: "text", text: "Tell the full story here. Add images, explain your process, and give visitors a closer look at what makes this project special." },
        { id: ids(), type: "button", label: "Start a conversation", href: "mailto:hello@example.com", style: { color: { background: "primary", text: "primary-foreground" }, border: { radius: "full" }, spacing: { padding: "md" } } },
      ] },
    ] },
  ] }) },
  "infinite-slider": { type: "infinite-slider", icon: "infinite-slider", fields: [
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Slider accessible label", control: "text", group: "content", required: true },
    { key: "autoPlay", label: "Scroll automatically", ariaLabel: "Slider autoplay", control: "boolean", group: "behavior", required: true },
    { key: "speed", label: "Speed (px/s)", ariaLabel: "Slider speed", control: "number", group: "behavior", required: true, min: 0, max: 200, step: 1 },
    { key: "direction", label: "Direction", ariaLabel: "Slider direction", control: "enum", group: "behavior", required: true, options: [{ value: "left", label: "Left" }, { value: "right", label: "Right" }] },
    { key: "slideWidth", label: "Slide width (px)", ariaLabel: "Slider slide width", control: "number", group: "behavior", required: true, min: 120, max: 960, step: 10 },
    { key: "gap", label: "Gap (px)", ariaLabel: "Slider gap", control: "number", group: "behavior", required: true, min: 0, max: 96, step: 1 },
    { key: "pauseOnHover", label: "Pause on hover", ariaLabel: "Slider pause on hover", control: "boolean", group: "behavior", required: true },
    { key: "fadeEdges", label: "Fade edges", ariaLabel: "Slider fade edges", control: "boolean", group: "behavior", required: true },
    { key: "centerEmphasis", label: "Emphasize center", ariaLabel: "Slider center emphasis", control: "boolean", group: "behavior", required: true },
  ], createDefault: (ids) => ({
    id: ids(), type: "infinite-slider", accessibleLabel: "Selected work", autoPlay: true, speed: 35, direction: "left", slideWidth: 420, gap: 20, pauseOnHover: true, fadeEdges: true, centerEmphasis: true,
    children: ["Make something memorable.", "A different perspective.", "Room for your next idea."].map((text, index) => ({
      id: ids(), type: "card", element: "article", style: { color: { background: "surface", text: "text" }, border: { radius: "xl", width: "hairline", color: "border" }, spacing: { padding: "sm" } }, children: [
        { id: ids(), type: "image", src: "/visual-builder/placeholder.svg", alt: `Project ${index + 1} preview`, aspectRatio: "wide", objectFit: "cover", style: { border: { radius: "lg" }, sizing: { width: "full" } } },
        { id: ids(), type: "stack", direction: "column", alignment: "start", distribution: "start", wrap: false, gap: "xs", style: { spacing: { padding: "md" } }, children: [
          { id: ids(), type: "badge", text: `0${index + 1} / SELECTED WORK` },
          { id: ids(), type: "heading", text, level: 3, style: { typography: { size: "xl", weight: "medium", tracking: "tight" } } },
          { id: ids(), type: "text", text: "Replace this card with your own images, text, or components.", style: { typography: { size: "sm" }, color: { text: "text-muted" } } },
        ] },
      ],
    })),
  }) },
  "scroll-story": { type: "scroll-story", icon: "scroll-story", fields: [
    { key: "transition", label: "Scene transition", ariaLabel: "Scene transition", control: "enum", group: "behavior", required: true, options: [{ value: "fade", label: "Fade" }, { value: "slide-up", label: "Slide up" }, { value: "none", label: "None" }] },
    { key: "mobileMode", label: "Mobile behavior", ariaLabel: "Mobile scroll story behavior", control: "enum", group: "behavior", required: true, options: [{ value: "stack", label: "Stack scenes" }, { value: "scrub", label: "Scrub scenes" }] },
    { key: "sceneLayout", label: "Scene layout", ariaLabel: "Scroll story scene layout", control: "enum", group: "behavior", required: true, options: [{ value: "background", label: "Full-bleed background" }, { value: "split-right", label: "Text left, media right" }] },
    { key: "showProgress", label: "Show progress", ariaLabel: "Show scroll story progress", control: "boolean", group: "behavior", required: true },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Scroll story accessible label", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "scroll-story", transition: "fade", mobileMode: "stack", sceneLayout: "background", showProgress: true, accessibleLabel: "Story", children: [
    { id: ids(), type: "slot", name: "stage", children: [] },
    createScrollScene(ids, 0),
    createScrollScene(ids, 1),
    createScrollScene(ids, 2),
  ] }) },
  "scroll-scene": { type: "scroll-scene", icon: "scroll-scene", fields: [
    { key: "length", label: "Scroll length", ariaLabel: "Scene scroll length", control: "number", group: "behavior", required: true, min: 0.5, max: 5, step: 0.1 },
  ], createDefault: (ids) => createScrollScene(ids, 0) },
  repeater: { type: "repeater", icon: "repeater", createDefault: (ids) => ({ id: ids(), type: "repeater", source: { kind: "autotable", schemaName: "products", limit: 12 }, itemAlias: "product", itemsLayout: createDefaultRepeaterLayout(), children: [{ id: ids(), type: "slot", name: "item", children: [{ id: ids(), type: "text", text: "Repeated item" }] }] }) },
  card: { type: "card", icon: "card", fields: [{ key: "element", label: "Element", ariaLabel: "Card element", control: "enum", group: "content", required: true, options: [{ value: "article", label: "Article" }, { value: "div", label: "Div" }] }], createDefault: (ids) => ({ id: ids(), type: "card", element: "article", children: [], style: { spacing: { padding: "lg" }, border: { width: "hairline", color: "border", radius: "lg" } } }) },
  overlay: { type: "overlay", icon: "overlay", fields: [
    { key: "alignment", label: "Alignment", ariaLabel: "Overlay alignment", control: "enum", group: "behavior", required: true, options: ["top-start", "top-center", "top-end", "center-start", "center", "center-end", "bottom-start", "bottom-center", "bottom-end"].map((value) => ({ value, label: value.replace("-", " ") })) },
    { key: "inset", label: "Inset", ariaLabel: "Overlay inset", control: "enum", group: "behavior", required: true, options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"].map((value) => ({ value, label: value })) },
    { key: "mobileFallback", label: "Mobile layout", ariaLabel: "Overlay mobile layout", control: "enum", group: "behavior", required: true, options: [{ value: "stack", label: "Stack" }, { value: "overlay", label: "Overlay" }] },
  ], createDefault: (ids) => ({ id: ids(), type: "overlay", alignment: "center", inset: "lg", tint: { color: { kind: "token", value: "text" }, opacity: 0.35 }, mobileFallback: "stack", children: [
    { id: ids(), type: "slot", name: "background", children: [{ id: ids(), type: "image", src: "/visual-builder/placeholder.svg", alt: "Overlay background", style: { sizing: { width: "full" } } }] },
    { id: ids(), type: "slot", name: "content", children: [{ id: ids(), type: "stack", direction: "column", alignment: "center", distribution: "center", wrap: false, gap: "sm", children: [{ id: ids(), type: "heading", text: "Overlay heading", level: 2 }, { id: ids(), type: "text", text: "Add supporting overlay content." }] }] },
  ] }) },
  form: { type: "form", icon: "form", fields: [
    { key: "action", label: "Action", ariaLabel: "Form action URL", control: "url", group: "behavior", required: true },
    { key: "method", label: "Method", ariaLabel: "Form method", control: "enum", group: "behavior", required: true, options: [{ value: "get", label: "GET" }, { value: "post", label: "POST" }] },
    { key: "successMessage", label: "Success message", ariaLabel: "Form success message", control: "textarea", group: "content", required: true },
  ], createDefault: (ids) => {
    const formId = ids();
    const stackId = ids();
    const nameId = ids();
    const emailId = ids();
    const messageId = ids();
    const buttonId = ids();
    return { id: formId, type: "form", action: "/api/contact", method: "post", successMessage: "Thanks — your message has been received.", style: { spacing: { padding: "lg" }, border: { width: "hairline", color: "border", radius: "lg" }, color: { background: "surface", text: "text" } }, children: [
      { id: stackId, type: "stack", direction: "column", alignment: "stretch", distribution: "start", wrap: false, gap: "md", children: [
        { id: nameId, type: "input", fieldName: "name", label: "Name", inputType: "text", placeholder: "Your name", required: true },
        { id: emailId, type: "input", fieldName: "email", label: "Email", inputType: "email", placeholder: "you@example.com", required: true },
        { id: messageId, type: "textarea", fieldName: "message", label: "Message", placeholder: "How can we help?", required: true, rows: 5 },
        { id: buttonId, type: "button", label: "Send message", submit: true, style: { color: { background: "primary", text: "primary-foreground" }, border: { radius: "md", shadow: "sm" } } },
      ] },
    ] };
  } },
  input: { type: "input", icon: "input", fields: [
    { key: "fieldName", label: "Field name", ariaLabel: "Input field name", control: "text", group: "behavior", required: true },
    { key: "label", label: "Label", ariaLabel: "Input label", control: "text", group: "content", required: true },
    { key: "inputType", label: "Input type", ariaLabel: "Input type", control: "enum", group: "behavior", required: true, options: ["text", "email", "tel", "number", "date"].map((value) => ({ value, label: value })) },
    { key: "placeholder", label: "Placeholder", ariaLabel: "Input placeholder", control: "text", group: "content" },
    { key: "required", label: "Required", ariaLabel: "Input required", control: "boolean", group: "behavior", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "input", fieldName: "name", label: "Name", inputType: "text", placeholder: "Your name", required: true }) },
  textarea: { type: "textarea", icon: "textarea", fields: [
    { key: "fieldName", label: "Field name", ariaLabel: "Textarea field name", control: "text", group: "behavior", required: true },
    { key: "label", label: "Label", ariaLabel: "Textarea label", control: "text", group: "content", required: true },
    { key: "placeholder", label: "Placeholder", ariaLabel: "Textarea placeholder", control: "text", group: "content" },
    { key: "required", label: "Required", ariaLabel: "Textarea required", control: "boolean", group: "behavior", required: true },
    { key: "rows", label: "Rows", ariaLabel: "Textarea rows", control: "number", group: "behavior", required: true, min: 2, max: 20, step: 1 },
  ], createDefault: (ids) => ({ id: ids(), type: "textarea", fieldName: "message", label: "Message", placeholder: "How can we help?", required: true, rows: 5 }) },
  select: { type: "select", icon: "select", fields: [
    { key: "fieldName", label: "Field name", ariaLabel: "Select field name", control: "text", group: "behavior", required: true },
    { key: "label", label: "Label", ariaLabel: "Select label", control: "text", group: "content", required: true },
    { key: "placeholder", label: "Placeholder", ariaLabel: "Select placeholder", control: "text", group: "content" },
    { key: "required", label: "Required", ariaLabel: "Select required", control: "boolean", group: "behavior", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "select", fieldName: "topic", label: "Topic", placeholder: "Choose a topic", required: true, options: [{ value: "general", label: "General inquiry" }, { value: "support", label: "Support" }] }) },
  checkbox: { type: "checkbox", icon: "checkbox", fields: [
    { key: "fieldName", label: "Field name", ariaLabel: "Checkbox field name", control: "text", group: "behavior", required: true },
    { key: "label", label: "Label", ariaLabel: "Checkbox label", control: "text", group: "content", required: true },
    { key: "value", label: "Value", ariaLabel: "Checkbox submitted value", control: "text", group: "content", required: true },
    { key: "required", label: "Required", ariaLabel: "Checkbox required", control: "boolean", group: "behavior", required: true },
    { key: "checkedByDefault", label: "Checked by default", ariaLabel: "Checkbox checked by default", control: "boolean", group: "behavior", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "checkbox", fieldName: "consent", label: "I agree to be contacted about this request.", value: "yes", required: true, checkedByDefault: false }) },
  heading: { type: "heading", icon: "heading", fields: [
    { key: "text", label: "Text", ariaLabel: "Heading text", control: "text", group: "content", required: true },
    { key: "level", label: "Level", ariaLabel: "Heading level", control: "enum", group: "content", required: true, options: [1, 2, 3, 4, 5, 6].map((level) => ({ value: String(level), label: `H${level}` })) },
  ], createDefault: (ids) => ({ id: ids(), type: "heading", text: "Heading", level: 2, style: { typography: { size: "2xl", weight: "semibold", tracking: "tight" } } }) },
  text: { type: "text", icon: "text", fields: [
    { key: "text", label: "Text", ariaLabel: "Text content", control: "textarea", group: "content", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "text", text: "Describe this section in a sentence or two.", style: { color: { text: "text-muted" }, typography: { size: "lg", leading: "relaxed" }, sizing: { maxWidth: "2xl" } } }) },
  code: { type: "code", icon: "code", createDefault: (ids) => ({ id: ids(), type: "code", code: "{\n  \"example\": true\n}", language: "json", showLanguage: true, showCopy: true, wrap: false }) },
  image: { type: "image", icon: "image", fields: [
    { key: "src", label: "Source", ariaLabel: "Image source", control: "url", group: "media", required: true },
    { key: "alt", label: "Alt text", ariaLabel: "Alternative text", control: "text", group: "media", required: true },
    { key: "aspectRatio", label: "Aspect ratio", ariaLabel: "Image aspect ratio", control: "enum", group: "media", options: [{ value: "original", label: "Original" }, { value: "square", label: "Square" }, { value: "landscape", label: "Landscape" }, { value: "wide", label: "Wide" }, { value: "portrait", label: "Portrait" }] },
    { key: "objectFit", label: "Object fit", ariaLabel: "Image object fit", control: "enum", group: "media", options: [{ value: "", label: "Default" }, { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" }] },
  ], createDefault: (ids) => ({ id: ids(), type: "image", src: "/visual-builder/placeholder.svg", alt: "Placeholder image", style: { border: { radius: "lg", shadow: "sm" }, sizing: { width: "full", fit: "cover" } } }) },
  "image-comparison": { type: "image-comparison", icon: "image-comparison", fields: [
    { key: "beforeSrc", label: "Before image", ariaLabel: "Before image source", control: "url", group: "media", required: true },
    { key: "beforeAlt", label: "Before alt text", ariaLabel: "Before image alternative text", control: "text", group: "media", required: true },
    { key: "afterSrc", label: "After image", ariaLabel: "After image source", control: "url", group: "media", required: true },
    { key: "afterAlt", label: "After alt text", ariaLabel: "After image alternative text", control: "text", group: "media", required: true },
    { key: "aspectRatio", label: "Aspect ratio", ariaLabel: "Comparison aspect ratio", control: "enum", group: "media", required: true, options: [{ value: "wide", label: "Wide" }, { value: "landscape", label: "Landscape" }, { value: "square", label: "Square" }, { value: "portrait", label: "Portrait" }] },
    { key: "objectFit", label: "Image fit", ariaLabel: "Comparison image fit", control: "enum", group: "media", required: true, options: [{ value: "cover", label: "Cover" }, { value: "contain", label: "Contain" }] },
    { key: "accessibleLabel", label: "Accessible name", ariaLabel: "Comparison accessible name", control: "text", group: "content", required: true },
    { key: "beforeLabel", label: "Before label", ariaLabel: "Comparison before label", control: "text", group: "content", required: true },
    { key: "afterLabel", label: "After label", ariaLabel: "Comparison after label", control: "text", group: "content", required: true },
    { key: "position", label: "Starting position (%)", ariaLabel: "Comparison starting position", control: "number", group: "behavior", required: true, min: 0, max: 100, step: 1 },
    { key: "showLabels", label: "Show labels", ariaLabel: "Comparison show labels", control: "boolean", group: "behavior", required: true },
  ], createDefault: ids => ({ id: ids(), type: "image-comparison", beforeSrc: "/visual-builder/comparison-before.svg", afterSrc: "/visual-builder/comparison-after.svg", beforeAlt: "The original workspace with a dense interface", afterAlt: "The redesigned workspace with a calmer layout", beforeLabel: "Before", afterLabel: "After", accessibleLabel: "Workspace redesign", position: 50, showLabels: true, aspectRatio: "wide", objectFit: "cover", style: { sizing: { width: "full" }, border: { radius: "xl" } } }) },
  button: { type: "button", icon: "button", fields: [
    { key: "label", label: "Label", ariaLabel: "Button label", control: "text", group: "content", required: true },
    { key: "href", label: "Link", ariaLabel: "Button link", control: "url", group: "content" },
    { key: "iconId", label: "Icon", ariaLabel: "Button icon", control: "icon", group: "content" },
    { key: "iconPosition", label: "Icon position", ariaLabel: "Button icon position", control: "enum", group: "content", options: [{ value: "start", label: "Start" }, { value: "end", label: "End" }] },
    { key: "openInNewTab", label: "Open in new tab", ariaLabel: "Open button link in new tab", control: "boolean", group: "behavior" },
    { key: "submit", label: "Submit form", ariaLabel: "Submit form", control: "boolean", group: "behavior" },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Button accessible label", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "button", label: "Button", href: "/", style: { color: { background: "primary", text: "primary-foreground" }, border: { radius: "md", shadow: "sm" } } }) },
  icon: { type: "icon", icon: "icon", fields: [
    { key: "iconId", label: "Icon", ariaLabel: "Icon", control: "icon", group: "content", required: true },
    { key: "size", label: "Size", ariaLabel: "Icon size", control: "number", group: "content", required: true, min: 12, max: 160, step: 1 },
    { key: "decorative", label: "Decorative", ariaLabel: "Decorative icon", control: "boolean", group: "content", required: true },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Icon accessible label", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "icon", iconId: "sparkles", size: 24, decorative: true }) },
  badge: { type: "badge", icon: "badge", fields: [
    { key: "text", label: "Text", ariaLabel: "Badge text", control: "text", group: "content", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "badge", text: "New", style: { spacing: { paddingX: "sm", paddingY: "xs" }, border: { width: "hairline", color: "border", radius: "full" } } }) },
  link: { type: "link", icon: "link", fields: [
    { key: "label", label: "Label", ariaLabel: "Link label", control: "text", group: "content", required: true },
    { key: "href", label: "URL", ariaLabel: "Link URL", control: "url", group: "content", required: true },
    { key: "openInNewTab", label: "Open in new tab", ariaLabel: "Open link in new tab", control: "boolean", group: "behavior", required: true },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Link accessible label", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "link", label: "Learn more", href: "/", openInNewTab: false }) },
  avatar: { type: "avatar", icon: "avatar", fields: [
    { key: "src", label: "Source", ariaLabel: "Avatar source", control: "url", group: "media", required: true },
    { key: "alt", label: "Alt text", ariaLabel: "Avatar alt text", control: "text", group: "media", required: true },
    { key: "fallback", label: "Fallback", ariaLabel: "Avatar fallback", control: "text", group: "media", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "avatar", src: "/visual-builder/placeholder.svg", alt: "Profile photo", fallback: "OS", style: { border: { radius: "full" }, custom: { width: "64px", height: "64px" } } }) },
  list: { type: "list", icon: "list", createDefault: (ids) => ({ id: ids(), type: "list", items: ["First benefit", "Second benefit", "Third benefit"], marker: "check" }) },
  stat: { type: "stat", icon: "stat", fields: [
    { key: "value", label: "Value", ariaLabel: "Stat value", control: "text", group: "content", required: true },
    { key: "label", label: "Label", ariaLabel: "Stat label", control: "text", group: "content", required: true },
    { key: "prefix", label: "Prefix", ariaLabel: "Stat prefix", control: "text", group: "content" },
    { key: "suffix", label: "Suffix", ariaLabel: "Stat suffix", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "stat", value: "10+", label: "Years of experience" }) },
  rating: { type: "rating", icon: "rating", fields: [
    { key: "value", label: "Value", ariaLabel: "Rating value", control: "number", group: "content", required: true, min: 0, max: 10, step: 0.5 },
    { key: "max", label: "Maximum", ariaLabel: "Rating maximum", control: "number", group: "content", required: true, min: 1, max: 10, step: 1 },
    { key: "showValue", label: "Show value", ariaLabel: "Show rating value", control: "boolean", group: "content", required: true },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Rating accessible label", control: "text", group: "content", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "rating", value: 5, max: 5, showValue: false, accessibleLabel: "5 out of 5 stars" }) },
  quote: { type: "quote", icon: "quote", fields: [
    { key: "quote", label: "Quote", ariaLabel: "Quote text", control: "textarea", group: "content", required: true },
    { key: "author", label: "Author", ariaLabel: "Quote author", control: "text", group: "content", required: true },
    { key: "role", label: "Role", ariaLabel: "Quote author role", control: "text", group: "content" },
    { key: "avatarSrc", label: "Avatar source", ariaLabel: "Quote avatar source", control: "url", group: "media" },
    { key: "avatarAlt", label: "Avatar alt text", ariaLabel: "Quote avatar alt text", control: "text", group: "media" },
  ], createDefault: (ids) => ({ id: ids(), type: "quote", quote: "A thoughtful experience from start to finish.", author: "Happy client" }) },
  divider: { type: "divider", icon: "divider", createDefault: (ids) => ({ id: ids(), type: "divider", style: { color: { text: "primary" } } }) },
  "site-logo": { type: "site-logo", icon: "site-logo", createDefault: (ids) => ({ id: ids(), type: "site-logo", style: { sizing: { width: "auto", height: "4rem" } } }) },
  "site-name": { type: "site-name", icon: "site-name", createDefault: (ids) => ({ id: ids(), type: "site-name", style: { typography: { size: "xl", weight: "bold" } } }) },
  "navigation-menu": { type: "navigation-menu", icon: "navigation-menu", createDefault: (ids) => ({ id: ids(), type: "navigation-menu", orientation: "horizontal", showChildren: true, activeColor: "#4f46e5", hoverColor: "#6366f1" }) },
  "language-switcher": { type: "language-switcher", icon: "language-switcher", createDefault: (ids) => ({ id: ids(), type: "language-switcher" }) },
  "theme-switcher": { type: "theme-switcher", icon: "theme-switcher", createDefault: (ids) => ({
    id: ids(),
    type: "theme-switcher",
    presentation: "segmented",
    labels: { light: "Light", dark: "Dark", system: "System" },
    accessibleLabel: "Theme",
    style: {
      spacing: { padding: "xs" },
      color: { background: "surface", text: "text" },
      border: { width: "hairline", color: "border", radius: "md" },
    },
  }) },
  "menu-toggle": { type: "menu-toggle", icon: "menu-toggle", createDefault: (ids) => ({ id: ids(), type: "menu-toggle", label: "Menu", targetId: "menu-panel" }) },
  "menu-panel": { type: "menu-panel", icon: "menu-panel", createDefault: (ids) => ({ id: ids(), type: "menu-panel", children: [] }) },
  "footer-links": { type: "footer-links", icon: "footer-links", createDefault: (ids) => ({ id: ids(), type: "footer-links", activeColor: "#4f46e5", hoverColor: "#6366f1" }) },
  copyright: { type: "copyright", icon: "copyright", createDefault: (ids) => ({ id: ids(), type: "copyright" }) },
  video: { type: "video", icon: "video", fields: [
    { key: "src", label: "Source", ariaLabel: "Video source", control: "url", group: "media", required: true },
    { key: "title", label: "Title", ariaLabel: "Video title", control: "text", group: "media", required: true },
    { key: "poster", label: "Poster image", ariaLabel: "Video poster image", control: "url", group: "media" },
    { key: "aspectRatio", label: "Aspect ratio", ariaLabel: "Video aspect ratio", control: "enum", group: "media", options: [{ value: "", label: "Original" }, { value: "square", label: "Square" }, { value: "landscape", label: "Landscape" }, { value: "wide", label: "Wide" }, { value: "portrait", label: "Portrait" }] },
    { key: "autoplay", label: "Autoplay", ariaLabel: "Video autoplay", control: "boolean", group: "behavior" },
    { key: "loop", label: "Loop", ariaLabel: "Video loop", control: "boolean", group: "behavior" },
    { key: "muted", label: "Muted", ariaLabel: "Video muted", control: "boolean", group: "behavior" },
  ], createDefault: (ids) => ({ id: ids(), type: "video", src: "/media/product-tour.mp4", title: "Product tour", poster: "/media/product-tour-poster.jpg", aspectRatio: "wide", muted: true }) },
  audio: { type: "audio", icon: "audio", fields: [
    { key: "src", label: "Source", ariaLabel: "Audio source", control: "url", group: "media", required: true },
    { key: "accessibleLabel", label: "Accessible label", ariaLabel: "Audio accessible label", control: "text", group: "media", required: true },
    { key: "autoplay", label: "Autoplay", ariaLabel: "Audio autoplay", control: "boolean", group: "behavior" },
    { key: "loop", label: "Loop", ariaLabel: "Audio loop", control: "boolean", group: "behavior" },
  ], createDefault: (ids) => ({ id: ids(), type: "audio", src: "/media/lesson-01.mp3", accessibleLabel: "Lesson audio" }) },
  embed: { type: "embed", icon: "embed", fields: [
    { key: "src", label: "Source", ariaLabel: "Embed source", control: "url", group: "media", required: true },
    { key: "title", label: "Title", ariaLabel: "Embed title", control: "text", group: "media", required: true },
    { key: "aspectRatio", label: "Aspect ratio", ariaLabel: "Embed aspect ratio", control: "enum", group: "media", options: [{ value: "", label: "Original" }, { value: "square", label: "Square" }, { value: "landscape", label: "Landscape" }, { value: "wide", label: "Wide" }, { value: "portrait", label: "Portrait" }] },
    { key: "loading", label: "Loading", ariaLabel: "Embed loading", control: "enum", group: "behavior", required: true, options: [{ value: "lazy", label: "Lazy" }, { value: "eager", label: "Eager" }] },
  ], createDefault: (ids) => ({ id: ids(), type: "embed", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Embedded video", aspectRatio: "wide", loading: "lazy" }) },
  table: { type: "table", icon: "table", fields: [
    { key: "caption", label: "Caption", ariaLabel: "Table caption", control: "text", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "table", headers: ["Plan", "Price"], rows: [["Basic", "$9 / mo"], ["Pro", "$29 / mo"]], caption: "Pricing overview" }) },
  progress: { type: "progress", icon: "progress", fields: [
    { key: "value", label: "Value", ariaLabel: "Progress value", control: "number", group: "content", required: true, min: 0, max: 100, step: 1 },
    { key: "label", label: "Label", ariaLabel: "Progress label", control: "text", group: "content" },
    { key: "showValue", label: "Show value", ariaLabel: "Show progress value", control: "boolean", group: "content", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "progress", value: 70, label: "Course progress", showValue: true }) },
  steps: { type: "steps", icon: "steps", fields: [
    { key: "current", label: "Current step", ariaLabel: "Current step index", control: "number", group: "content", required: true, min: 0, max: 99, step: 1 },
  ], createDefault: (ids) => ({ id: ids(), type: "steps", items: ["Create account", "Pick a plan", "Begin learning"], current: 1 }) },
  timeline: { type: "timeline", icon: "timeline", createDefault: (ids) => ({ id: ids(), type: "timeline", entries: [
    { title: "2024", description: "Launched the learning platform." },
    { title: "2025", description: "Reached ten thousand students." },
  ] }) },
  alert: { type: "alert", icon: "alert", fields: [
    { key: "title", label: "Title", ariaLabel: "Alert title", control: "text", group: "content" },
    { key: "body", label: "Body", ariaLabel: "Alert body", control: "textarea", group: "content", required: true },
    { key: "variant", label: "Variant", ariaLabel: "Alert variant", control: "enum", group: "content", required: true, options: [{ value: "info", label: "Info" }, { value: "success", label: "Success" }, { value: "warning", label: "Warning" }, { value: "danger", label: "Danger" }] },
  ], createDefault: (ids) => ({ id: ids(), type: "alert", body: "Enable two-factor authentication to keep your account safe.", variant: "info" }) },
  tags: { type: "tags", icon: "tags", createDefault: (ids) => ({ id: ids(), type: "tags", items: ["Design", "Marketing", "Automation"] }) },
  kbd: { type: "kbd", icon: "kbd", createDefault: (ids) => ({ id: ids(), type: "kbd", keys: ["Ctrl", "K"] }) },
  "bar-chart": { type: "bar-chart", icon: "bar-chart", fields: [
    { key: "showValues", label: "Show values", ariaLabel: "Show chart values", control: "boolean", group: "content", required: true },
  ], createDefault: (ids) => ({ id: ids(), type: "bar-chart", bars: [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 65 },
    { label: "Mar", value: 52 },
  ], showValues: true }) },
  sparkline: { type: "sparkline", icon: "sparkline", fields: [
    { key: "ariaLabel", label: "Accessible label", ariaLabel: "Sparkline accessible label", control: "text", group: "content", required: true },
    { key: "showArea", label: "Fill area", ariaLabel: "Sparkline fill area", control: "boolean", group: "content" },
  ], createDefault: (ids) => ({ id: ids(), type: "sparkline", points: [4, 8, 5, 11, 9, 14], ariaLabel: "Weekly signups trend", showArea: true }) },
} as const satisfies ComponentEditorDefinitionMap;

const frozenDefinitions = Object.freeze(Object.fromEntries(
  Object.entries(definitions).map(([type, definition]) => [type, freezeEditorDefinition(definition)]),
)) as unknown as ComponentEditorDefinitionMap;

function createRegisteredDefault<TType extends NodeType>(type: TType, idFactory: NodeIdFactory): Extract<ComponentNode, { type: TType }> {
  return frozenDefinitions[type].createDefault(idFactory) as Extract<ComponentNode, { type: TType }>;
}

const orderedTypes = Object.freeze(componentRegistry.list().map(({ type }) => type));

export const componentEditorRegistry: ComponentEditorRegistry = Object.freeze({
  get<TType extends NodeType>(type: TType): ComponentEditorDefinition<TType> {
    return frozenDefinitions[type] as ComponentEditorDefinition<TType>;
  },
  listTypes: () => orderedTypes,
  editableFieldKeys(type: NodeType): readonly string[] {
    const definition = frozenDefinitions[type] as ComponentEditorDefinition;
    return definition.fields?.map(({ key }) => key) ?? [];
  },
});

function freezeEditorDefinition<TType extends NodeType>(definition: ComponentEditorDefinition<TType>): ComponentEditorDefinition<TType> {
  return Object.freeze({
    ...definition,
    ...(definition.fields ? {
      fields: Object.freeze(definition.fields.map((field) => Object.freeze({
        ...field,
        ...(field.options ? { options: Object.freeze(field.options.map((option) => Object.freeze({ ...option }))) } : {}),
      }))),
    } : {}),
  });
}
