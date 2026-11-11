import { componentRegistry } from "../components/core";
import { isConditionalColorRules, supportsConditionalColors } from "./conditionalColors";
import { isHostAction } from "./hostActions";
import { sidebarTriggerHasName } from "./sidebar";
import { FONT_FAMILIES } from "./styles";
import { isDesignPresetId } from "./designPresets";
import { parseDesignStyleOptions } from "./designStyle";
import { COLLECTION_FILTER_OPERATORS, type CollectionFilterOperator, IMAGE_COMPARISON_ASPECT_RATIOS } from "./nodes";
import type { CustomDimensionSpec } from "./styles";
import { ANIMATION_EASINGS, ANIMATION_LIMITS, ANIMATION_PRESETS, ANIMATION_TRIGGERS, type AnimationSpec } from "./animation";
import { NODE_DEFINITIONS } from "./capabilities";
import { DOCUMENT_KINDS, type ComponentDocument, type ComponentDocumentKind } from "./document";
import type {
  ButtonNode,
  IconNode,
  BadgeNode,
  LinkNode,
  AvatarNode,
  BindableProperty,
  ListNode,
  StatNode,
  RatingNode,
  QuoteNode,
  CodeNode,
  AccordionNode,
  TabsNode,
  SidebarNode,
  InfiniteSliderNode,
  ExpandableCardNode,
  ScrollStoryNode,
  ScrollSceneNode,
  ScrollSceneMedia,
  DisclosureNode,
  ComponentNode,
  DividerNode,
  FlexNode,
  GridNode,
  HeadingNode,
  ImageNode,
  ImageComparisonNode,
  LayoutAlignment,
  LayoutDirection,
  LayoutDistribution,
  NavigationMenuNode,
  MenuToggleNode,
  MenuPanelNode,
  NodeBase,
  NodeType,
  RepeaterNode,
  RepeaterItemsLayout,
  CardNode,
  OverlayNode,
  FormNode,
  InputNode,
  TextareaNode,
  SelectNode,
  SelectOption,
  CheckboxNode,
  SectionNode,
  StackNode,
  SlotNode,
  TextNode,
  ThemeSwitcherNode,
  ImageAspectRatio,
  VideoNode,
  AudioNode,
  EmbedNode,
  TableNode,
  ProgressNode,
  StepsNode,
  TimelineNode,
  TimelineEntry,
  AlertNode,
  TagsNode,
  KbdNode,
  BarChartNode,
  BarChartBar,
  SparklineNode,
} from "./nodes";
import { ALERT_VARIANTS, IMAGE_ASPECT_RATIOS, IMAGE_OBJECT_FITS, INPUT_TYPES, LIST_MARKERS, OVERLAY_ALIGNMENTS, SCROLL_SCENE_MEDIA_KINDS, SCROLL_STORY_LIMITS, SCROLL_STORY_LAYOUTS, SCROLL_STORY_MOBILE_MODES, SCROLL_STORY_TRANSITIONS, isFormFieldNode } from "./nodes";
import {
  isPlacementInBounds,
  type BreakpointValue,
  type ChildLayoutSpec,
  type FlowGridPosition,
  type GridPlacement,
  type GridPlacementByBreakpoint,
  type ResponsiveSpacingSpec,
  type ResponsiveSpec,
} from "./responsive";
import type { BackgroundLayer, ColorValue, GradientPaint } from "./paint";
import { isSafeCustomColor } from "./paint";
import type { MediaLayoutSpec, SlotLayout, SlotLayoutOverride, SlotOverride, SlotSpec } from "./mediaLayout";
import { MEDIA_LAYOUT_PRESETS, resolveSlotLayout, validateResolvedSlotLayout } from "./mediaLayout";
import type { ShuffleAnimationSpec } from "./shuffle";
import { cloneJsonObject, isJsonObject, type EffectAttachment } from "./effects";
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
  POSITION_TOKENS,
  isSafeCustomLength,
  type StyleSpec,
} from "./styles";
import { normalizeFormActionUrl, normalizeImageUrl, normalizeVideoUrl, normalizeLinkUrl, type UrlPolicyResult } from "./urls";
import { isOzmishowIconId } from "./icons";

export interface ValidationIssue {
  path: string;
  code: string;
  message: string;
}

export type ValidationResult<T> =
  | { success: true; value: T; issues: [] }
  | { success: false; issues: ValidationIssue[] };

const styleTokens = {
  spacing: {
    padding: SPACING_TOKENS,
    margin: SPACING_TOKENS,
    paddingX: SPACING_TOKENS,
    paddingY: SPACING_TOKENS,
    paddingTop: SPACING_TOKENS,
    paddingRight: SPACING_TOKENS,
    paddingBottom: SPACING_TOKENS,
    paddingLeft: SPACING_TOKENS,
    marginX: SPACING_TOKENS,
    marginY: SPACING_TOKENS,
    marginTop: SPACING_TOKENS,
    marginRight: SPACING_TOKENS,
    marginBottom: SPACING_TOKENS,
    marginLeft: SPACING_TOKENS,

    gap: SPACING_TOKENS,
  },
  color: {
    text: COLOR_TOKENS,
    background: [...COLOR_TOKENS, ...GRADIENT_TOKENS],
  },
  typography: {
    family: FONT_FAMILIES,
    size: TYPOGRAPHY_SIZES,
    weight: TYPOGRAPHY_WEIGHTS,
    align: TEXT_ALIGNMENTS,
    tracking: TRACKING_TOKENS,
    leading: LEADING_TOKENS,
  },
  border: {
    radius: RADIUS_TOKENS,
    topLeftRadius: RADIUS_TOKENS,
    topRightRadius: RADIUS_TOKENS,
    bottomLeftRadius: RADIUS_TOKENS,
    bottomRightRadius: RADIUS_TOKENS,
    width: BORDER_WIDTHS,
    color: COLOR_TOKENS,
    shadow: SHADOW_TOKENS,
  },
  sizing: {
    width: WIDTH_TOKENS,
    height: HEIGHT_TOKENS,
    scaleFromHeight: HEIGHT_TOKENS,
    maxWidth: MAX_WIDTH_TOKENS,
    align: SIZING_ALIGNS,
    fit: OBJECT_FITS,
    objectPosition: OBJECT_POSITIONS,
  },
  positioning: {
    position: POSITION_TOKENS,
    top: SPACING_TOKENS,
  },
} as const;

const breakpoints = ["mobile", "tablet", "desktop"] as const;
const layoutDirections: readonly LayoutDirection[] = ["row", "column"];
const layoutAlignments: readonly LayoutAlignment[] = ["start", "center", "end", "stretch"];
const layoutDistributions: readonly LayoutDistribution[] = ["start", "center", "end", "between", "around", "evenly"];
const layoutGaps = styleTokens.spacing.gap;
const bindingProperties = {
  heading: ["text"],
  text: ["text"],
  image: ["src", "alt"],
  button: ["label", "href", "accessibleLabel"],
  icon: ["accessibleLabel"],
  badge: ["text"],
  link: ["label", "href", "accessibleLabel"],
  avatar: ["src", "alt", "fallback"],
  stat: ["value", "label", "prefix", "suffix"],
  quote: ["quote", "author", "role", "avatarSrc", "avatarAlt"],
} as const;
const unsafePathSegments = new Set(["__proto__", "prototype", "constructor"]);
const nodeBaseKeys = ["id", "type", "style", "responsive", "layout", "animation", "effects", "bindings", "conditionalColors", "slideLink"] as const;
const extendedNodeKeys: Partial<Record<NodeType, readonly string[]>> = {
  "image-comparison": ["beforeSrc", "afterSrc", "beforeAlt", "afterAlt", "beforeLabel", "afterLabel", "accessibleLabel", "position", "showLabels", "aspectRatio", "objectFit"],
  "expandable-card": ["accessibleLabel", "closeLabel", "children"],
  "infinite-slider": ["accessibleLabel", "autoPlay", "speed", "direction", "slideWidth", "gap", "pauseOnHover", "fadeEdges", "centerEmphasis", "children"],
  icon: ["iconId", "size", "decorative", "accessibleLabel"], badge: ["text"],
  link: ["label", "href", "openInNewTab", "accessibleLabel"], avatar: ["src", "alt", "fallback"],
  list: ["items", "marker", "iconId"], stat: ["value", "label", "prefix", "suffix"],
  rating: ["value", "max", "showValue", "accessibleLabel"], quote: ["quote", "author", "role", "avatarSrc", "avatarAlt"],
  video: ["src", "title", "poster", "aspectRatio", "autoplay", "loop", "muted"],
  audio: ["src", "accessibleLabel", "autoplay", "loop"],
  embed: ["src", "title", "aspectRatio", "loading"],
  table: ["headers", "rows", "caption"],
  progress: ["value", "label", "showValue", "accentColor"],
  steps: ["items", "current"],
  timeline: ["entries"],
  alert: ["body", "variant", "title"],
  tags: ["items"],
  kbd: ["keys"],
  "bar-chart": ["bars", "showValues", "accentColor"],
  sparkline: ["points", "ariaLabel", "showArea", "accentColor"],
  card: ["element", "children"], overlay: ["alignment", "inset", "tint", "mobileFallback", "children"],
  "scroll-story": ["transition", "mobileMode", "sceneLayout", "showProgress", "accessibleLabel", "children"],
  "scroll-scene": ["length", "media", "children"],
  form: ["action", "method", "successMessage", "children"],
  input: ["fieldName", "label", "inputType", "placeholder", "required"],
  textarea: ["fieldName", "label", "placeholder", "required", "rows"],
  select: ["fieldName", "label", "placeholder", "required", "options"],
  checkbox: ["fieldName", "label", "value", "required", "checkedByDefault"],
};

export function parseComponentDocument(input: unknown): ValidationResult<ComponentDocument> {
  const issues: ValidationIssue[] = [];
  if (!isRecord(input)) return failure("$", "document.object_required", "Document must be an object");

  if (input.version !== 1 && input.version !== 2) issues.push(issue("$.version", "version.unsupported", "Only document versions 1 and 2 are supported"));
  if (typeof input.id !== "string" || input.id.length === 0) issues.push(issue("$.id", "document.id_required", "Document ID is required"));
  if (typeof input.name !== "string" || input.name.trim().length === 0) issues.push(issue("$.name", "document.name_required", "Document name is required"));
  const kind = input.kind === undefined ? "section" : DOCUMENT_KINDS.includes(input.kind as ComponentDocumentKind) ? input.kind as ComponentDocumentKind : "section";
  if (input.kind !== undefined && !DOCUMENT_KINDS.includes(input.kind as ComponentDocumentKind)) issues.push(issue("$.kind", "document.kind_invalid", "Document kind must be section, navbar, or footer"));

  const root = parseNode(input.root, "$.root", null, issues);
  if (root?.type !== "section") issues.push(issue("$.root", "root.section_required", "Document root must be a section"));
  if (root) validateTreeInvariants(root, kind, issues);

  const source = parseSource(input.source, issues);
  if (issues.length > 0 || root?.type !== "section") return { success: false, issues };

  return {
    success: true,
    value: {
      version: input.version as 1 | 2,
      id: input.id as string,
      name: (input.name as string).trim(),
      ...(input.kind === undefined ? {} : { kind }),
      root,
      ...source,
    },
    issues: [],
  };
}

function parseNode(input: unknown, path: string, parentType: NodeType | null, issues: ValidationIssue[]): ComponentNode | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "node.object_required", "Node must be an object"));
    return undefined;
  }
  if (!isNodeType(input.type)) {
    issues.push(issue(`${path}.type`, "node.type_invalid", "Node type is not supported"));
    return undefined;
  }

  const base = parseNodeBase(input, path, parentType, issues);
  if (!base) return undefined;
  validateBindingFallbacks(base.bindings, input, path, issues);
  const extendedKeys = extendedNodeKeys[input.type];
  if (extendedKeys) rejectUnknownKeys(input, [...nodeBaseKeys, ...extendedKeys], path, "node.key_unknown", issues);
  if (!NODE_DEFINITIONS[input.type].canHaveChildren && input.children !== undefined) {
    issues.push(issue(`${path}.children`, "node.children_not_allowed", "Content nodes cannot have children"));
  }

  switch (input.type) {
    case "expandable-card":
      return { ...base, type: "expandable-card", accessibleLabel: requiredText(input.accessibleLabel, `${path}.accessibleLabel`, "expandable_card.label_required", "Expandable Card project name is required", issues), closeLabel: requiredText(input.closeLabel, `${path}.closeLabel`, "expandable_card.close_label_required", "Expandable Card close label is required", issues), children: parseChildren(input.children, path, "expandable-card", issues) as SlotNode[] } satisfies ExpandableCardNode;
    case "section": {
      if (input.designPreset !== undefined && !isDesignPresetId(input.designPreset)) issues.push(issue(`${path}.designPreset`, "design.preset_invalid", "Design preset is not supported"));
      const settings = input.designStyle === undefined ? undefined : parseDesignStyleOptions(input.designStyle, `${path}.designStyle`);
      if (settings && !settings.success) issues.push(...settings.issues);
      if (settings && !isDesignPresetId(input.designPreset)) issues.push(issue(`${path}.designStyle`, "design.preset_required", "Style settings need a supported design preset"));
      return { ...base, type: "section", ...(isDesignPresetId(input.designPreset) ? { designPreset: input.designPreset } : {}), ...(settings?.success ? { designStyle: settings.value } : {}), children: parseChildren(input.children, path, "section", issues) } satisfies SectionNode;
    }
    case "grid":
      if (input.columns !== 12) issues.push(issue(`${path}.columns`, "grid.columns_required", "Grid columns must be 12"));
      return {
        ...base,
        type: "grid",
        columns: 12,
        children: parseChildren(input.children, path, "grid", issues),
        ...optionalMediaLayout(input.mediaLayout, `${path}.mediaLayout`, issues),
      } satisfies GridNode;
    case "stack": {
      const layout = parseLayoutContainerFields(input, path, issues);
      return {
        ...base,
        type: "stack",
        ...layout,
        children: parseChildren(input.children, path, "stack", issues),
      } satisfies StackNode;
    }
    case "flex": {
      const layout = parseLayoutContainerFields(input, path, issues);
      return { ...base, type: "flex", ...layout, children: parseChildren(input.children, path, "flex", issues) } satisfies FlexNode;
    }
    case "slot":
      return { ...base, type: "slot", name: parseSlotName(input.name, `${path}.name`, issues), children: parseChildren(input.children, path, "slot", issues) } satisfies SlotNode;
    case "disclosure":
      if (typeof input.defaultOpen !== "boolean") issues.push(issue(`${path}.defaultOpen`, "disclosure.default_open_boolean_required", "Disclosure defaultOpen must be a boolean"));
      if (input.transition !== "none" && input.transition !== "height-fade") issues.push(issue(`${path}.transition`, "disclosure.transition_invalid", "Disclosure transition is not supported"));
      return {
        ...base,
        type: "disclosure",
        defaultOpen: input.defaultOpen === true,
        transition: input.transition === "height-fade" ? "height-fade" : "none",
        children: parseChildren(input.children, path, "disclosure", issues) as DisclosureNode["children"],
      } satisfies DisclosureNode;
    case "accordion":
      if (input.openMode !== "single" && input.openMode !== "multiple") issues.push(issue(`${path}.openMode`, "accordion.open_mode_invalid", "Accordion open mode is not supported"));
      if (typeof input.collapsible !== "boolean") issues.push(issue(`${path}.collapsible`, "accordion.collapsible_boolean_required", "Accordion collapsible must be a boolean"));
      return {
        ...base,
        type: "accordion",
        openMode: input.openMode === "multiple" ? "multiple" : "single",
        collapsible: input.collapsible === true,
        children: parseChildren(input.children, path, "accordion", issues) as AccordionNode["children"],
      } satisfies AccordionNode;
    case "tabs":
      return {
        ...base,
        type: "tabs",
        children: parseChildren(input.children, path, "tabs", issues) as TabsNode["children"],
      } satisfies TabsNode;
    case "sidebar": {
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "sidebar.label_invalid", "Sidebar navigation label must not be blank", issues);
      if (input.accessibleLabel === undefined) issues.push(issue(`${path}.accessibleLabel`, "sidebar.label_required", "Sidebar navigation label is required"));
      return { ...base, type: "sidebar", accessibleLabel: accessibleLabel ?? "Sidebar navigation", navigationWidth: parseClampedNumber(input.navigationWidth, `${path}.navigationWidth`, 160, 360, "sidebar.width_invalid", "Sidebar width must be between 160 and 360 pixels", issues), children: parseChildren(input.children, path, "sidebar", issues) as SidebarNode["children"] } satisfies SidebarNode;
    }
    case "infinite-slider": {
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "slider.label_invalid", "Slider accessible label must not be blank", issues);
      if (input.accessibleLabel === undefined) issues.push(issue(`${path}.accessibleLabel`, "slider.label_required", "Slider accessible label is required"));
      for (const key of ["autoPlay", "pauseOnHover", "fadeEdges", "centerEmphasis"] as const) {
        if (typeof input[key] !== "boolean") issues.push(issue(`${path}.${key}`, "slider.boolean_required", `${key} must be a boolean`));
      }
      if (input.direction !== "left" && input.direction !== "right") issues.push(issue(`${path}.direction`, "slider.direction_invalid", "Slider direction must be left or right"));
      return {
        ...base, type: "infinite-slider", accessibleLabel: accessibleLabel ?? "Slider",
        autoPlay: input.autoPlay === true, pauseOnHover: input.pauseOnHover === true,
        fadeEdges: input.fadeEdges === true, centerEmphasis: input.centerEmphasis === true,
        direction: input.direction === "right" ? "right" : "left",
        speed: parseClampedNumber(input.speed, `${path}.speed`, 0, 200, "slider.speed_invalid", "Slider speed must be between 0 and 200 pixels per second", issues),
        slideWidth: parseClampedNumber(input.slideWidth, `${path}.slideWidth`, 120, 960, "slider.width_invalid", "Slide width must be between 120 and 960 pixels", issues),
        gap: parseClampedNumber(input.gap, `${path}.gap`, 0, 96, "slider.gap_invalid", "Slider gap must be between 0 and 96 pixels", issues),
        children: parseChildren(input.children, path, "infinite-slider", issues),
      } satisfies InfiniteSliderNode;
    }
    case "scroll-story": {
      const transition = typeof input.transition === "string" && SCROLL_STORY_TRANSITIONS.includes(input.transition as ScrollStoryNode["transition"]) ? input.transition as ScrollStoryNode["transition"] : "fade";
      if (transition !== input.transition) issues.push(issue(`${path}.transition`, "scroll_story.transition_invalid", "Scroll story transition must be fade, slide-up, or none"));
      const mobileMode = typeof input.mobileMode === "string" && SCROLL_STORY_MOBILE_MODES.includes(input.mobileMode as ScrollStoryNode["mobileMode"]) ? input.mobileMode as ScrollStoryNode["mobileMode"] : "stack";
      if (mobileMode !== input.mobileMode) issues.push(issue(`${path}.mobileMode`, "scroll_story.mobile_mode_invalid", "Scroll story mobile mode must be stack or scrub"));
      const sceneLayout = typeof input.sceneLayout === "string" && SCROLL_STORY_LAYOUTS.includes(input.sceneLayout as ScrollStoryNode["sceneLayout"]) ? input.sceneLayout as ScrollStoryNode["sceneLayout"] : "background";
      if (sceneLayout !== input.sceneLayout) issues.push(issue(`${path}.sceneLayout`, "scroll_story.layout_invalid", "Scroll story layout must be background or split-right"));
      if (typeof input.showProgress !== "boolean") issues.push(issue(`${path}.showProgress`, "scroll_story.show_progress_boolean_required", "Scroll story showProgress must be a boolean"));
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "scroll_story.accessible_label_invalid", "Scroll story accessible label must not be blank", issues);
      return {
        ...base,
        type: "scroll-story",
        transition,
        mobileMode,
        sceneLayout,
        showProgress: input.showProgress === true,
        ...(accessibleLabel === undefined ? {} : { accessibleLabel }),
        children: parseChildren(input.children, path, "scroll-story", issues) as ScrollStoryNode["children"],
      } satisfies ScrollStoryNode;
    }
    case "scroll-scene": {
      const length = typeof input.length === "number" && Number.isFinite(input.length) && input.length >= SCROLL_STORY_LIMITS.minSceneLength && input.length <= SCROLL_STORY_LIMITS.maxSceneLength ? input.length : 1;
      if (length !== input.length) issues.push(issue(`${path}.length`, "scroll_scene.length_invalid", "Scroll scene length must be between 0.5 and 5 screens"));
      return {
        ...base,
        type: "scroll-scene",
        length,
        media: parseScrollSceneMedia(input.media, `${path}.media`, issues),
        children: parseChildren(input.children, path, "scroll-scene", issues) as ScrollSceneNode["children"],
      } satisfies ScrollSceneNode;
    }
    case "repeater":
      return {
        ...base,
        type: "repeater",
        source: parseCollectionSource(input.source, `${path}.source`, issues),
        itemAlias: parseIdentifier(input.itemAlias, `${path}.itemAlias`, "repeater.alias_invalid", issues),
        ...(input.itemsLayout === undefined ? {} : { itemsLayout: parseRepeaterItemsLayout(input.itemsLayout, `${path}.itemsLayout`, issues) }),
        children: parseChildren(input.children, path, "repeater", issues) as RepeaterNode["children"],
      } satisfies RepeaterNode;
    case "card": {
      const element = input.element === "div" || input.element === "article" ? input.element : "article";
      if (element !== input.element) issues.push(issue(`${path}.element`, "card.element_invalid", "Card element must be div or article"));
      return { ...base, type: "card", element, children: parseChildren(input.children, path, "card", issues) } satisfies CardNode;
    }
    case "overlay": {
      const alignment = typeof input.alignment === "string" && OVERLAY_ALIGNMENTS.includes(input.alignment as OverlayNode["alignment"]) ? input.alignment as OverlayNode["alignment"] : "center";
      if (alignment !== input.alignment) issues.push(issue(`${path}.alignment`, "overlay.alignment_invalid", "Overlay alignment is not supported"));
      const inset = typeof input.inset === "string" && SPACING_TOKENS.includes(input.inset as OverlayNode["inset"]) ? input.inset as OverlayNode["inset"] : "lg";
      if (inset !== input.inset) issues.push(issue(`${path}.inset`, "overlay.inset_invalid", "Overlay inset is not supported"));
      const mobileFallback = input.mobileFallback === "stack" || input.mobileFallback === "overlay" ? input.mobileFallback : "stack";
      if (mobileFallback !== input.mobileFallback) issues.push(issue(`${path}.mobileFallback`, "overlay.mobile_fallback_invalid", "Overlay mobile fallback must be stack or overlay"));
      const tint = parseOverlayTint(input.tint, `${path}.tint`, issues);
      return { ...base, type: "overlay", alignment, inset, mobileFallback, ...(tint === undefined ? {} : { tint }), children: parseChildren(input.children, path, "overlay", issues) } satisfies OverlayNode;
    }
    case "form": {
      const actionText = requiredText(input.action, `${path}.action`, "form.action_required", "Form action is required", issues);
      const action = actionText.length > 0 ? requireSafeUrl(normalizeFormActionUrl(actionText), `${path}.action`, issues) ?? "" : "";
      const method = input.method === "get" || input.method === "post" ? input.method : "post";
      if (method !== input.method) issues.push(issue(`${path}.method`, "form.method_invalid", "Form method must be get or post"));
      return { ...base, type: "form", action, method, successMessage: requiredText(input.successMessage, `${path}.successMessage`, "form.success_message_required", "Form success message is required", issues), children: parseChildren(input.children, path, "form", issues) } satisfies FormNode;
    }
    case "input": {
      const inputType = typeof input.inputType === "string" && INPUT_TYPES.includes(input.inputType as InputNode["inputType"]) ? input.inputType as InputNode["inputType"] : "text";
      if (inputType !== input.inputType) issues.push(issue(`${path}.inputType`, "input.type_invalid", "Input type is not supported"));
      return { ...base, type: "input", fieldName: parseFieldName(input.fieldName, `${path}.fieldName`, issues), label: requiredText(input.label, `${path}.label`, "field.label_required", "Field label is required", issues), inputType, ...optionalPlaceholder(input.placeholder, `${path}.placeholder`, issues), required: parseRequiredBoolean(input.required, `${path}.required`, "field.required_boolean", issues) } satisfies InputNode;
    }
    case "textarea": {
      const rows = typeof input.rows === "number" && Number.isInteger(input.rows) && input.rows >= 2 && input.rows <= 20 ? input.rows : 5;
      if (rows !== input.rows) issues.push(issue(`${path}.rows`, "textarea.rows_invalid", "Textarea rows must be an integer from 2 through 20"));
      return { ...base, type: "textarea", fieldName: parseFieldName(input.fieldName, `${path}.fieldName`, issues), label: requiredText(input.label, `${path}.label`, "field.label_required", "Field label is required", issues), ...optionalPlaceholder(input.placeholder, `${path}.placeholder`, issues), required: parseRequiredBoolean(input.required, `${path}.required`, "field.required_boolean", issues), rows } satisfies TextareaNode;
    }
    case "select":
      return { ...base, type: "select", fieldName: parseFieldName(input.fieldName, `${path}.fieldName`, issues), label: requiredText(input.label, `${path}.label`, "field.label_required", "Field label is required", issues), ...optionalPlaceholder(input.placeholder, `${path}.placeholder`, issues), required: parseRequiredBoolean(input.required, `${path}.required`, "field.required_boolean", issues), options: parseSelectOptions(input.options, `${path}.options`, issues) } satisfies SelectNode;
    case "checkbox":
      return { ...base, type: "checkbox", fieldName: parseFieldName(input.fieldName, `${path}.fieldName`, issues), label: requiredText(input.label, `${path}.label`, "field.label_required", "Field label is required", issues), value: requiredText(input.value, `${path}.value`, "checkbox.value_required", "Checkbox value is required", issues), required: parseRequiredBoolean(input.required, `${path}.required`, "field.required_boolean", issues), checkedByDefault: parseRequiredBoolean(input.checkedByDefault, `${path}.checkedByDefault`, "checkbox.checked_boolean", issues) } satisfies CheckboxNode;
    case "heading":
      return { ...base, type: "heading", text: requiredText(input.text, `${path}.text`, "heading.text_required", "Heading text is required", issues), level: parseHeadingLevel(input.level, path, issues) } satisfies HeadingNode;
    case "text":
      return { ...base, type: "text", text: requiredText(input.text, `${path}.text`, "text.content_required", "Text content is required", issues) } satisfies TextNode;
    case "code":
      if (typeof input.code !== "string") issues.push(issue(`${path}.code`, "code.content_invalid", "Code content must be text"));
      if (typeof input.language !== "string") issues.push(issue(`${path}.language`, "code.language_invalid", "Code language must be text"));
      if (typeof input.showLanguage !== "boolean") issues.push(issue(`${path}.showLanguage`, "code.show_language_boolean_required", "Code showLanguage must be a boolean"));
      if (typeof input.showCopy !== "boolean") issues.push(issue(`${path}.showCopy`, "code.show_copy_boolean_required", "Code showCopy must be a boolean"));
      if (typeof input.wrap !== "boolean") issues.push(issue(`${path}.wrap`, "code.wrap_boolean_required", "Code wrap must be a boolean"));
      return {
        ...base,
        type: "code",
        code: typeof input.code === "string" ? input.code : "",
        language: typeof input.language === "string" ? input.language : "",
        showLanguage: input.showLanguage === true,
        showCopy: input.showCopy === true,
        wrap: input.wrap === true,
      } satisfies CodeNode;
    case "image":
      return {
        ...base,
        type: "image",
        src: parseRequiredUrl(input.src, `${path}.src`, "image.src_required", "Image source is required", "image", issues),
        alt: requiredText(input.alt, `${path}.alt`, "image.alt_required", "Image alternative text is required", issues),
        ...optionalImagePresentation(input, path, issues),
      } satisfies ImageNode;
    case "image-comparison": {
      const aspectRatio = parseControlledLayoutValue(input.aspectRatio, IMAGE_COMPARISON_ASPECT_RATIOS, "wide", `${path}.aspectRatio`, "comparison.aspect_invalid", "Comparison aspect ratio is not supported", issues);
      const objectFit = parseControlledLayoutValue(input.objectFit, IMAGE_OBJECT_FITS, "cover", `${path}.objectFit`, "comparison.fit_invalid", "Comparison image fit is not supported", issues);
      if (typeof input.showLabels !== "boolean") issues.push(issue(`${path}.showLabels`, "comparison.labels_invalid", "Show labels must be a boolean"));
      return { ...base, type: "image-comparison",
        beforeSrc: parseRequiredUrl(input.beforeSrc, `${path}.beforeSrc`, "comparison.before_required", "Before image is required", "image", issues),
        afterSrc: parseRequiredUrl(input.afterSrc, `${path}.afterSrc`, "comparison.after_required", "After image is required", "image", issues),
        beforeAlt: requiredText(input.beforeAlt, `${path}.beforeAlt`, "comparison.alt_required", "Before image alternative text is required", issues),
        afterAlt: requiredText(input.afterAlt, `${path}.afterAlt`, "comparison.alt_required", "After image alternative text is required", issues),
        beforeLabel: requiredText(input.beforeLabel, `${path}.beforeLabel`, "comparison.label_required", "Before label is required", issues),
        afterLabel: requiredText(input.afterLabel, `${path}.afterLabel`, "comparison.label_required", "After label is required", issues),
        accessibleLabel: requiredText(input.accessibleLabel, `${path}.accessibleLabel`, "comparison.name_required", "Comparison accessible name is required", issues),
        position: parseClampedNumber(input.position, `${path}.position`, 0, 100, "comparison.position_invalid", "Comparison position must be between 0 and 100", issues),
        showLabels: input.showLabels === true, aspectRatio, objectFit,
      } satisfies ImageComparisonNode;
    }
    case "button": {
      if (input.action !== undefined && !isHostAction(input.action)) issues.push(issue(`${path}.action`, "button.action_invalid", "Button action must contain a name and bounded safe JSON configuration"));
      if (input.action !== undefined && input.submit === true) issues.push(issue(`${path}.action`, "button.action_submit_invalid", "An action button cannot also submit a native form"));
      const href = parseOptionalUrl(input.href, `${path}.href`, issues);
      const iconId = parseOptionalIconId(input.iconId, `${path}.iconId`, issues);
      const iconPosition = input.iconPosition === undefined ? undefined : input.iconPosition === "start" || input.iconPosition === "end" ? input.iconPosition : undefined;
      if (input.iconPosition !== undefined && iconPosition === undefined) issues.push(issue(`${path}.iconPosition`, "button.icon_position_invalid", "Button icon position must be start or end"));
      if (input.openInNewTab !== undefined && typeof input.openInNewTab !== "boolean") issues.push(issue(`${path}.openInNewTab`, "button.new_tab_boolean_required", "Button new-tab behavior must be a boolean"));
      if (input.submit !== undefined && typeof input.submit !== "boolean") issues.push(issue(`${path}.submit`, "button.submit_boolean_required", "Button submit behavior must be a boolean"));
      if (input.submit === true && href !== undefined) issues.push(issue(`${path}.href`, "button.submit_href_invalid", "Submit buttons cannot have a link"));
      if (input.submit === true && input.openInNewTab !== undefined) issues.push(issue(`${path}.openInNewTab`, "button.submit_new_tab_invalid", "Submit buttons cannot open a new tab"));
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "button.accessible_label_invalid", "Button accessible label must not be blank", issues);
      return {
        ...base,
        type: "button",
        label: requiredText(input.label, `${path}.label`, "button.label_required", "Button label is required", issues),
        ...(href === undefined ? {} : { href }),
        ...(iconId === undefined ? {} : { iconId }),
        ...(iconPosition === undefined ? {} : { iconPosition }),
        ...(input.openInNewTab === undefined ? {} : { openInNewTab: input.openInNewTab === true }),
        ...(accessibleLabel === undefined ? {} : { accessibleLabel }),
        ...(input.submit === undefined ? {} : { submit: input.submit === true }),
        ...(isHostAction(input.action) ? { action: { name: input.action.name, config: cloneJsonObject(input.action.config) } } : {}),
      } satisfies ButtonNode;
    }
    case "icon": {
      const iconId = isOzmishowIconId(input.iconId) ? input.iconId : "sparkles";
      if (!isOzmishowIconId(input.iconId)) issues.push(issue(`${path}.iconId`, "icon.id_invalid", "Icon ID is not supported"));
      const size = typeof input.size === "number" && Number.isInteger(input.size) && input.size >= 12 && input.size <= 160 ? input.size : 24;
      if (size !== input.size) issues.push(issue(`${path}.size`, "icon.size_invalid", "Icon size must be an integer from 12 through 160"));
      if (typeof input.decorative !== "boolean") issues.push(issue(`${path}.decorative`, "icon.decorative_boolean_required", "Icon decorative value must be a boolean"));
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "icon.accessible_label_invalid", "Icon accessible label must not be blank", issues);
      if (input.decorative === false && accessibleLabel === undefined) issues.push(issue(`${path}.accessibleLabel`, "icon.accessible_label_required", "Informative icons require an accessible label"));
      if (input.decorative !== false && base.bindings?.accessibleLabel) issues.push(issue(`${path}.bindings.accessibleLabel`, "binding.property_invalid", "Decorative icons cannot bind an accessible label"));
      return { ...base, type: "icon", iconId, size, decorative: input.decorative !== false, ...(accessibleLabel === undefined ? {} : { accessibleLabel }) } satisfies IconNode;
    }
    case "badge":
      return { ...base, type: "badge", text: requiredText(input.text, `${path}.text`, "badge.text_required", "Badge text is required", issues) } satisfies BadgeNode;
    case "link": {
      const href = parseRequiredUrl(input.href, `${path}.href`, "link.href_required", "Link URL is required", "link", issues);
      if (typeof input.openInNewTab !== "boolean") issues.push(issue(`${path}.openInNewTab`, "link.new_tab_boolean_required", "Link new-tab behavior must be a boolean"));
      const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "link.accessible_label_invalid", "Link accessible label must not be blank", issues);
      return { ...base, type: "link", label: requiredText(input.label, `${path}.label`, "link.label_required", "Link label is required", issues), href, openInNewTab: input.openInNewTab === true, ...(accessibleLabel === undefined ? {} : { accessibleLabel }) } satisfies LinkNode;
    }
    case "avatar":
      return {
        ...base,
        type: "avatar",
        src: parseRequiredUrl(input.src, `${path}.src`, "avatar.src_required", "Avatar source is required", "image", issues),
        alt: requiredText(input.alt, `${path}.alt`, "avatar.alt_required", "Avatar alternative text is required", issues),
        fallback: requiredText(input.fallback, `${path}.fallback`, "avatar.fallback_required", "Avatar fallback is required", issues),
      } satisfies AvatarNode;
    case "list": {
      const items = parseListItems(input.items, `${path}.items`, issues);
      const marker = typeof input.marker === "string" && LIST_MARKERS.includes(input.marker as ListNode["marker"]) ? input.marker as ListNode["marker"] : "bullet";
      if (marker !== input.marker) issues.push(issue(`${path}.marker`, "list.marker_invalid", "List marker is not supported"));
      const iconId = marker === "icon" ? parseOptionalIconId(input.iconId, `${path}.iconId`, issues) : undefined;
      if (marker === "icon" && iconId === undefined) issues.push(issue(`${path}.iconId`, "list.icon_required", "Icon lists require a marker icon"));
      return { ...base, type: "list", items, marker, ...(iconId === undefined ? {} : { iconId }) } satisfies ListNode;
    }
    case "stat": {
      const prefix = parseOptionalText(input.prefix, `${path}.prefix`, "stat.prefix_invalid", "Stat prefix must not be blank", issues);
      const suffix = parseOptionalText(input.suffix, `${path}.suffix`, "stat.suffix_invalid", "Stat suffix must not be blank", issues);
      return { ...base, type: "stat", value: requiredText(input.value, `${path}.value`, "stat.value_required", "Stat value is required", issues), label: requiredText(input.label, `${path}.label`, "stat.label_required", "Stat label is required", issues), ...(prefix === undefined ? {} : { prefix }), ...(suffix === undefined ? {} : { suffix }) } satisfies StatNode;
    }
    case "rating": {
      const max = typeof input.max === "number" && Number.isInteger(input.max) && input.max >= 1 && input.max <= 10 ? input.max : 5;
      if (max !== input.max) issues.push(issue(`${path}.max`, "rating.max_invalid", "Rating maximum must be an integer from 1 through 10"));
      const value = typeof input.value === "number" && Number.isFinite(input.value) && input.value >= 0 && input.value <= max && input.value * 2 === Math.round(input.value * 2) ? input.value : 0;
      if (value !== input.value) issues.push(issue(`${path}.value`, "rating.value_invalid", "Rating value must be between zero and its maximum in half-step increments"));
      if (typeof input.showValue !== "boolean") issues.push(issue(`${path}.showValue`, "rating.show_value_boolean_required", "Rating showValue must be a boolean"));
      return { ...base, type: "rating", value, max, showValue: input.showValue === true, accessibleLabel: requiredText(input.accessibleLabel, `${path}.accessibleLabel`, "rating.accessible_label_required", "Rating accessible label is required", issues) } satisfies RatingNode;
    }
    case "quote": {
      const role = parseOptionalText(input.role, `${path}.role`, "quote.role_invalid", "Quote role must not be blank", issues);
      const avatarSrc = input.avatarSrc === undefined ? undefined : parseRequiredUrl(input.avatarSrc, `${path}.avatarSrc`, "quote.avatar_src_invalid", "Quote avatar source is invalid", "image", issues);
      const avatarAlt = parseOptionalText(input.avatarAlt, `${path}.avatarAlt`, "quote.avatar_alt_invalid", "Quote avatar alt text must not be blank", issues);
      if (avatarSrc !== undefined && avatarAlt === undefined) issues.push(issue(`${path}.avatarAlt`, "quote.avatar_alt_required", "Quote avatar alt text is required when an avatar is present"));
      if (avatarSrc === undefined && input.avatarAlt !== undefined) issues.push(issue(`${path}.avatarAlt`, "quote.avatar_src_required", "Quote avatar source is required when alt text is present"));
      return { ...base, type: "quote", quote: requiredText(input.quote, `${path}.quote`, "quote.text_required", "Quote text is required", issues), author: requiredText(input.author, `${path}.author`, "quote.author_required", "Quote author is required", issues), ...(role === undefined ? {} : { role }), ...(avatarSrc === undefined || avatarAlt === undefined ? {} : { avatarSrc, avatarAlt }) } satisfies QuoteNode;
    }
    case "divider":
      return { ...base, type: "divider" } satisfies DividerNode;
    case "video": {
      const src = parseRequiredUrl(input.src, `${path}.src`, "video.src_required", "Video source is required", "video", issues);
      const title = requiredText(input.title, `${path}.title`, "video.title_required", "Video title is required for accessibility", issues);
      const poster = parseOptionalUrl(input.poster, `${path}.poster`, issues);
      const aspectRatio = parseOptionalAspectRatio(input.aspectRatio, `${path}.aspectRatio`, issues);
      return {
        ...base,
        type: "video",
        src,
        title,
        ...(poster === undefined ? {} : { poster }),
        ...(aspectRatio === undefined ? {} : { aspectRatio }),
        ...(input.autoplay === undefined ? {} : { autoplay: input.autoplay === true }),
        ...(input.loop === undefined ? {} : { loop: input.loop === true }),
        ...(input.muted === undefined ? {} : { muted: input.muted === true }),
      } satisfies VideoNode;
    }
    case "audio": {
      const src = parseRequiredUrl(input.src, `${path}.src`, "audio.src_required", "Audio source is required", "video", issues);
      const accessibleLabel = requiredText(input.accessibleLabel, `${path}.accessibleLabel`, "audio.label_required", "Audio requires an accessible label", issues);
      return { ...base, type: "audio", src, accessibleLabel, ...(input.autoplay === undefined ? {} : { autoplay: input.autoplay === true }), ...(input.loop === undefined ? {} : { loop: input.loop === true }) } satisfies AudioNode;
    }
    case "embed": {
      const src = parseRequiredUrl(input.src, `${path}.src`, "embed.src_required", "Embed source is required", "video", issues);
      const title = requiredText(input.title, `${path}.title`, "embed.title_required", "Embed title is required for accessibility", issues);
      const aspectRatio = parseOptionalAspectRatio(input.aspectRatio, `${path}.aspectRatio`, issues);
      const loading = input.loading === "eager" ? "eager" as const : "lazy" as const;
      if (input.loading !== undefined && input.loading !== "lazy" && input.loading !== "eager") issues.push(issue(`${path}.loading`, "embed.loading_invalid", "Embed loading must be lazy or eager"));
      return { ...base, type: "embed", src, title, ...(aspectRatio === undefined ? {} : { aspectRatio }), loading } satisfies EmbedNode;
    }
    case "table": {
      const headers = parseListItems(input.headers, `${path}.headers`, issues);
      const rows = parseTableRows(input.rows, `${path}.rows`, issues);
      if (headers.length > 0 && rows.some((row) => row.length !== headers.length)) issues.push(issue(`${path}.rows`, "table.rows_width", "Every table row must match the header count"));
      const caption = parseOptionalText(input.caption, `${path}.caption`, "table.caption_invalid", "Table caption must not be blank", issues);
      return { ...base, type: "table", headers, rows, ...(caption === undefined ? {} : { caption }) } satisfies TableNode;
    }
    case "progress": {
      const value = parseClampedNumber(input.value, `${path}.value`, 0, 100, "progress.value_invalid", "Progress value must be a number from 0 through 100", issues);
      const label = parseOptionalText(input.label, `${path}.label`, "progress.label_invalid", "Progress label must not be blank", issues);
      const accentColor = parseAccentColor(input.accentColor, `${path}.accentColor`, issues);
      return { ...base, type: "progress", value, ...(label === undefined ? {} : { label }), showValue: input.showValue === true, ...(accentColor === undefined ? {} : { accentColor }) } satisfies ProgressNode;
    }
    case "steps": {
      const items = parseListItems(input.items, `${path}.items`, issues);
      const current = typeof input.current === "number" && Number.isInteger(input.current) && input.current >= 0 && input.current < Math.max(items.length, 1) ? input.current : 0;
      if (current !== input.current) issues.push(issue(`${path}.current`, "steps.current_invalid", "Steps current index must be a whole number inside the item range"));
      return { ...base, type: "steps", items, current } satisfies StepsNode;
    }
    case "timeline": {
      const entries = parseTimelineEntries(input.entries, `${path}.entries`, issues);
      return { ...base, type: "timeline", entries } satisfies TimelineNode;
    }
    case "alert": {
      const body = requiredText(input.body, `${path}.body`, "alert.body_required", "Alert body is required", issues);
      const variant = normalizeVariant(input.variant, `${path}.variant`, "alert.variant_invalid", "Alert variant must be info, success, warning, or danger", ALERT_VARIANTS, "info", issues);
      const title = parseOptionalText(input.title, `${path}.title`, "alert.title_invalid", "Alert title must not be blank", issues);
      return { ...base, type: "alert", body, variant, ...(title === undefined ? {} : { title }) } satisfies AlertNode;
    }
    case "tags": {
      const items = parseListItems(input.items, `${path}.items`, issues);
      return { ...base, type: "tags", items } satisfies TagsNode;
    }
    case "kbd": {
      const keys = parseListItems(input.keys, `${path}.keys`, issues);
      return { ...base, type: "kbd", keys } satisfies KbdNode;
    }
    case "bar-chart": {
      const bars = parseChartBars(input.bars, `${path}.bars`, issues);
      const accentColor = parseAccentColor(input.accentColor, `${path}.accentColor`, issues);
      return { ...base, type: "bar-chart", bars, showValues: input.showValues === true, ...(accentColor === undefined ? {} : { accentColor }) } satisfies BarChartNode;
    }
    case "sparkline": {
      const points = parseNumberList(input.points, `${path}.points`, issues);
      const ariaLabel = requiredText(input.ariaLabel, `${path}.ariaLabel`, "sparkline.label_required", "Sparkline requires an accessible label", issues);
      const accentColor = parseAccentColor(input.accentColor, `${path}.accentColor`, issues);
      return { ...base, type: "sparkline", points, ariaLabel, ...(input.showArea === undefined ? {} : { showArea: input.showArea === true }), ...(accentColor === undefined ? {} : { accentColor }) } satisfies SparklineNode;
    }
    case "site-logo":
      return { ...base, type: "site-logo" };
    case "site-name":
      return { ...base, type: "site-name" };
    case "navigation-menu":
      if (input.orientation !== "horizontal" && input.orientation !== "vertical") issues.push(issue(`${path}.orientation`, "navigation.orientation_invalid", "Navigation orientation must be horizontal or vertical"));
      if (typeof input.showChildren !== "boolean") issues.push(issue(`${path}.showChildren`, "navigation.show_children_boolean_required", "Navigation showChildren must be a boolean"));
      return { ...base, type: "navigation-menu", orientation: input.orientation === "vertical" ? "vertical" : "horizontal", showChildren: input.showChildren === true, ...optionalStateColors(input, path, issues) } satisfies NavigationMenuNode;
    case "language-switcher":
      return { ...base, type: "language-switcher" };
    case "theme-switcher": {
      if (input.presentation !== "segmented" && input.presentation !== "select") {
        issues.push(issue(`${path}.presentation`, "theme_switcher.presentation_invalid", "Theme switcher presentation must be segmented or select"));
      }
      const labels = parseThemeSwitcherLabels(input.labels, `${path}.labels`, issues);
      return {
        ...base,
        type: "theme-switcher",
        presentation: input.presentation === "select" ? "select" : "segmented",
        labels,
        accessibleLabel: requiredText(input.accessibleLabel, `${path}.accessibleLabel`, "theme_switcher.accessible_label_required", "Theme switcher accessible label is required", issues),
      } satisfies ThemeSwitcherNode;
    }
    case "menu-toggle":
      return {
        ...base,
        type: "menu-toggle",
        label: requiredText(input.label, `${path}.label`, "menu_toggle.label_required", "Menu toggle label is required", issues),
        targetId: requiredText(input.targetId, `${path}.targetId`, "menu_toggle.target_required", "Menu toggle target is required", issues),
      } satisfies MenuToggleNode;
    case "menu-panel":
      return { ...base, type: "menu-panel", children: parseChildren(input.children, path, "menu-panel", issues) } satisfies MenuPanelNode;
    case "footer-links":
      return { ...base, type: "footer-links", ...optionalStateColors(input, path, issues) };
    case "copyright":
      return { ...base, type: "copyright" };
  }
}

function parseThemeSwitcherLabels(input: unknown, path: string, issues: ValidationIssue[]): ThemeSwitcherNode["labels"] {
  if (!isRecord(input)) {
    issues.push(issue(path, "theme_switcher.labels_required", "Theme switcher labels are required"));
    return { light: "", dark: "", system: "" };
  }
  return {
    light: requiredText(input.light, `${path}.light`, "theme_switcher.label_required", "Light theme label is required", issues),
    dark: requiredText(input.dark, `${path}.dark`, "theme_switcher.label_required", "Dark theme label is required", issues),
    system: requiredText(input.system, `${path}.system`, "theme_switcher.label_required", "System theme label is required", issues),
  };
}

function parseFieldName(input: unknown, path: string, issues: ValidationIssue[]): string {
  if (typeof input === "string" && /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/.test(input)) return input;
  issues.push(issue(path, "field.name_invalid", "Field name must start with a letter and contain at most 64 safe characters"));
  return "field";
}

function optionalPlaceholder(input: unknown, path: string, issues: ValidationIssue[]): { placeholder?: string } {
  const placeholder = parseOptionalText(input, path, "field.placeholder_invalid", "Placeholder must not be blank", issues);
  return placeholder === undefined ? {} : { placeholder };
}

function parseRequiredBoolean(input: unknown, path: string, code: string, issues: ValidationIssue[]): boolean {
  if (typeof input !== "boolean") issues.push(issue(path, code, "Value must be a boolean"));
  return input === true;
}

function parseSelectOptions(input: unknown, path: string, issues: ValidationIssue[]): SelectOption[] {
  if (!Array.isArray(input) || input.length < 1 || input.length > 50) {
    issues.push(issue(path, "select.options_invalid", "Select options must contain between 1 and 50 entries"));
    return [];
  }
  const values = new Set<string>();
  return input.map((candidate, index) => {
    const optionPath = `${path}[${index}]`;
    if (!isRecord(candidate)) {
      issues.push(issue(optionPath, "select.option_object_required", "Select option must be an object"));
      return { value: "", label: "" };
    }
    rejectUnknownKeys(candidate, ["value", "label"], optionPath, "select.option_key_unknown", issues);
    const value = requiredText(candidate.value, `${optionPath}.value`, "select.option_value_required", "Select option value is required", issues);
    const label = requiredText(candidate.label, `${optionPath}.label`, "select.option_label_required", "Select option label is required", issues);
    if (value && values.has(value)) issues.push(issue(`${optionPath}.value`, "select.option_value_duplicate", "Select option values must be unique"));
    if (value) values.add(value);
    return { value, label };
  });
}

function optionalStateColors(input: Record<string, unknown>, path: string, issues: ValidationIssue[]): { activeColor?: string; hoverColor?: string } {
  const result: { activeColor?: string; hoverColor?: string } = {};
  for (const field of ["activeColor", "hoverColor"] as const) {
    if (input[field] === undefined) continue;
    if (typeof input[field] !== "string" || !isSafeCustomColor(input[field])) issues.push(issue(`${path}.${field}`, "navigation.color_invalid", "Navigation state color must be a safe CSS color"));
    else result[field] = input[field];
  }
  return result;
}

function optionalImagePresentation(
  input: Record<string, unknown>,
  path: string,
  issues: ValidationIssue[],
): Pick<ImageNode, "aspectRatio" | "objectFit"> {
  const result: Pick<ImageNode, "aspectRatio" | "objectFit"> = {};
  if (input.aspectRatio !== undefined) {
    if (typeof input.aspectRatio !== "string" || !IMAGE_ASPECT_RATIOS.includes(input.aspectRatio as NonNullable<ImageNode["aspectRatio"]>)) {
      issues.push(issue(`${path}.aspectRatio`, "image.aspect_ratio_invalid", "Image aspect ratio is not supported"));
    } else {
      result.aspectRatio = input.aspectRatio as ImageNode["aspectRatio"];
    }
  }
  if (input.objectFit !== undefined) {
    if (typeof input.objectFit !== "string" || !IMAGE_OBJECT_FITS.includes(input.objectFit as NonNullable<ImageNode["objectFit"]>)) {
      issues.push(issue(`${path}.objectFit`, "image.object_fit_invalid", "Image object fit is not supported"));
    } else {
      result.objectFit = input.objectFit as ImageNode["objectFit"];
    }
  }
  return result;
}

function parseRequiredUrl(
  input: unknown,
  path: string,
  requiredCode: string,
  requiredMessage: string,
  kind: "image" | "video" | "link",
  issues: ValidationIssue[],
): string {
  const value = requiredText(input, path, requiredCode, requiredMessage, issues);
  if (value.length === 0) return value;
  const result = kind === "video" ? normalizeVideoUrl(value) : kind === "image" ? normalizeImageUrl(value) : normalizeLinkUrl(value);
  return requireSafeUrl(result, path, issues) ?? "";
}

function parseOptionalUrl(input: unknown, path: string, issues: ValidationIssue[]): string | undefined {
  const value = parseOptionalText(input, path, "button.href_invalid", "Button href must be a non-empty string", issues);
  if (value === undefined) return undefined;
  return requireSafeUrl(normalizeLinkUrl(value), path, issues);
}

function requireSafeUrl(result: UrlPolicyResult, path: string, issues: ValidationIssue[]): string | undefined {
  if (result.success) return result.value;
  const messages = {
    control_character: "URLs cannot contain control characters",
    encoded_obfuscation: "Encoded URL obfuscation is not allowed",
    scheme_unsupported: "The URL scheme is not allowed",
  } as const;
  issues.push(issue(path, `url.${result.reason}`, messages[result.reason]));
  return undefined;
}

function parseLayoutContainerFields(
  input: Record<string, unknown>,
  path: string,
  issues: ValidationIssue[],
): Pick<StackNode, "direction" | "alignment" | "distribution" | "wrap" | "gap"> {
  const direction = parseControlledLayoutValue(input.direction, layoutDirections, "column", `${path}.direction`, "layout.direction_invalid", "Layout direction must be row or column", issues);
  const alignment = parseControlledLayoutValue(input.alignment, layoutAlignments, "stretch", `${path}.alignment`, "layout.alignment_invalid", "Layout alignment is not supported", issues);
  const distribution = parseControlledLayoutValue(input.distribution, layoutDistributions, "start", `${path}.distribution`, "layout.distribution_invalid", "Layout distribution is not supported", issues);
  const gap = parseControlledLayoutValue(input.gap, layoutGaps, "none", `${path}.gap`, "layout.gap_invalid", "Layout gap is not supported", issues);
  if (typeof input.wrap !== "boolean") issues.push(issue(`${path}.wrap`, "layout.wrap_boolean_required", "Layout wrap must be a boolean"));
  return { direction, alignment, distribution, wrap: typeof input.wrap === "boolean" ? input.wrap : false, gap };
}

function parseControlledLayoutValue<const Value extends string>(
  input: unknown,
  values: readonly Value[],
  fallback: Value,
  path: string,
  code: string,
  message: string,
  issues: ValidationIssue[],
): Value {
  if (typeof input !== "string" || !values.includes(input as Value)) {
    issues.push(issue(path, code, message));
    return fallback;
  }
  return input as Value;
}

function parseNodeBase(input: Record<string, unknown>, path: string, parentType: NodeType | null, issues: ValidationIssue[]): NodeBase | undefined {
  if (typeof input.id !== "string" || input.id.length === 0) {
    issues.push(issue(`${path}.id`, "node.id_required", "Node ID is required"));
    return undefined;
  }
  const styleResult = input.style === undefined
    ? undefined
    : parseStyleSpec(input.style, `${path}.style`);
  if (styleResult && !styleResult.success) issues.push(...styleResult.issues);
  const style = styleResult?.success ? styleResult.value : undefined;
  const responsive = parseResponsive(input.responsive, `${path}.responsive`, issues);
  const layout = parseLayout(input.layout, `${path}.layout`, parentType, issues);
  const animation = parseAnimation(input.animation, `${path}.animation`, input.type as NodeType, issues);
  const effects = parseEffectAttachments(input.effects, `${path}.effects`, issues);
  const bindings = parseBindings(input.bindings, input.type as NodeType, `${path}.bindings`, issues);
  const slideLink = parseSlideLink(input.slideLink, `${path}.slideLink`, issues);
  const conditionalColors = input.conditionalColors === undefined ? undefined : isConditionalColorRules(input.conditionalColors) && supportsConditionalColors(input.type as NodeType) ? structuredClone(input.conditionalColors) : undefined;
  if (input.conditionalColors !== undefined && conditionalColors === undefined) issues.push(issue(`${path}.conditionalColors`, "conditional_colors.invalid", "Use up to 20 valid color rules on a styled component, with safe field paths, typed values and solid colors."));
  return {
    id: input.id,
    ...(style === undefined ? {} : { style }),
    ...(responsive === undefined ? {} : { responsive }),
    ...(layout === undefined ? {} : { layout }),
    ...(animation === undefined ? {} : { animation }),
    ...(effects === undefined ? {} : { effects }),
    ...(bindings === undefined ? {} : { bindings }),
    ...(slideLink === undefined ? {} : { slideLink }),
    ...(conditionalColors === undefined ? {} : { conditionalColors }),
  };
}

function parseSlideLink(input: unknown, path: string, issues: ValidationIssue[]): NodeBase["slideLink"] {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "slide.link_invalid", "Slide link must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["href", "openInNewTab", "accessibleLabel"], path, "slide.link_key_unknown", issues);
  const href = requireSafeUrl(normalizeLinkUrl(input.href), `${path}.href`, issues);
  if (input.openInNewTab !== undefined && typeof input.openInNewTab !== "boolean") issues.push(issue(`${path}.openInNewTab`, "slide.link_target_invalid", "Open in new tab must be a boolean"));
  const accessibleLabel = parseOptionalText(input.accessibleLabel, `${path}.accessibleLabel`, "slide.link_label_invalid", "Slide link label must not be blank", issues);
  return href === undefined ? undefined : { href, ...(input.openInNewTab === undefined ? {} : { openInNewTab: input.openInNewTab === true }), ...(accessibleLabel === undefined ? {} : { accessibleLabel }) };
}

function parseSlotName(input: unknown, path: string, issues: ValidationIssue[]): SlotNode["name"] {
  if (input === "trigger" || input === "content" || input === "item" || input === "background" || input === "stage" || input === "preview" || input === "details") return input;
  issues.push(issue(path, "slot.name_invalid", "Slot name is not supported"));
  return "content";
}

function parseScrollSceneMedia(input: unknown, path: string, issues: ValidationIssue[]): ScrollSceneMedia {
  if (!isRecord(input)) {
    issues.push(issue(path, "scroll_scene.media_required", "Scroll scene media is required"));
    return { kind: "none" };
  }
  const kind = typeof input.kind === "string" && SCROLL_SCENE_MEDIA_KINDS.includes(input.kind as ScrollSceneMedia["kind"]) ? input.kind as ScrollSceneMedia["kind"] : "none";
  if (kind !== input.kind) issues.push(issue(`${path}.kind`, "scroll_scene.media_kind_invalid", "Scroll scene media kind must be none, image, video, or sequence"));
  const objectFit = parseScrollMediaObjectFit(input.objectFit, `${path}.objectFit`, issues);

  if (kind === "image") {
    rejectUnknownKeys(input, ["kind", "src", "alt", "objectFit"], path, "scroll_scene.media_key_unknown", issues);
    return {
      kind,
      src: parseRequiredUrl(input.src, `${path}.src`, "scroll_scene.image_src_required", "Scene image source is required", "image", issues),
      alt: requiredText(input.alt, `${path}.alt`, "scroll_scene.image_alt_required", "Scene image alternative text is required", issues),
      ...(objectFit === undefined ? {} : { objectFit }),
    };
  }
  if (kind === "video") {
    rejectUnknownKeys(input, ["kind", "src", "poster", "title", "trimStart", "trimEnd", "objectFit"], path, "scroll_scene.media_key_unknown", issues);
    const trimStart = parseOptionalSeconds(input.trimStart, `${path}.trimStart`, issues);
    const trimEnd = parseOptionalSeconds(input.trimEnd, `${path}.trimEnd`, issues);
    if (trimStart !== undefined && trimEnd !== undefined && trimEnd <= trimStart) issues.push(issue(`${path}.trimEnd`, "scroll_scene.trim_invalid", "Scene video trim end must be after trim start"));
    return {
      kind,
      src: parseRequiredUrl(input.src, `${path}.src`, "scroll_scene.video_src_required", "Scene video source is required", "video", issues),
      poster: parseRequiredUrl(input.poster, `${path}.poster`, "scroll_scene.video_poster_required", "Scene video poster is required", "image", issues),
      title: requiredText(input.title, `${path}.title`, "scroll_scene.video_title_required", "Scene video title is required for accessibility", issues),
      ...(trimStart === undefined ? {} : { trimStart }),
      ...(trimEnd === undefined ? {} : { trimEnd }),
      ...(objectFit === undefined ? {} : { objectFit }),
    };
  }
  if (kind === "sequence") {
    rejectUnknownKeys(input, ["kind", "frames", "poster", "alt", "objectFit"], path, "scroll_scene.media_key_unknown", issues);
    return {
      kind,
      frames: parseScrollSequenceFrames(input.frames, `${path}.frames`, issues),
      poster: parseRequiredUrl(input.poster, `${path}.poster`, "scroll_scene.sequence_poster_required", "Scene sequence poster is required", "image", issues),
      alt: requiredText(input.alt, `${path}.alt`, "scroll_scene.sequence_alt_required", "Scene sequence alternative text is required", issues),
      ...(objectFit === undefined ? {} : { objectFit }),
    };
  }
  rejectUnknownKeys(input, ["kind"], path, "scroll_scene.media_key_unknown", issues);
  return { kind: "none" };
}

function parseScrollMediaObjectFit(input: unknown, path: string, issues: ValidationIssue[]) {
  if (input === undefined) return undefined;
  if (input === "cover" || input === "contain") return input;
  issues.push(issue(path, "scroll_scene.object_fit_invalid", "Scene media object fit must be cover or contain"));
  return undefined;
}

function parseOptionalSeconds(input: unknown, path: string, issues: ValidationIssue[]): number | undefined {
  if (input === undefined) return undefined;
  if (typeof input === "number" && Number.isFinite(input) && input >= 0 && input <= 86400) return input;
  issues.push(issue(path, "scroll_scene.trim_seconds_invalid", "Scene video trim values must be between 0 and 86400 seconds"));
  return undefined;
}

function parseScrollSequenceFrames(input: unknown, path: string, issues: ValidationIssue[]): string[] {
  if (!Array.isArray(input) || input.length < SCROLL_STORY_LIMITS.minSequenceFrames || input.length > SCROLL_STORY_LIMITS.maxSequenceFrames) {
    issues.push(issue(path, "scroll_scene.sequence_frames_invalid", "Scene sequences must contain between 2 and 120 frames"));
    return [];
  }
  const frames: string[] = [];
  const seen = new Set<string>();
  input.forEach((frame, index) => {
    const framePath = `${path}[${index}]`;
    if (typeof frame !== "string" || frame.trim().length === 0) {
      issues.push(issue(framePath, "scroll_scene.sequence_frame_required", "Sequence frame URLs must not be blank"));
      return;
    }
    const normalized = normalizeImageUrl(frame);
    if (!normalized.success) {
      requireSafeUrl(normalized, framePath, issues);
      return;
    }
    if (seen.has(normalized.value)) {
      issues.push(issue(framePath, "scroll_scene.sequence_frame_duplicate", "Sequence frame URLs must be unique"));
      return;
    }
    seen.add(normalized.value);
    frames.push(normalized.value);
  });
  return frames;
}

function parseRequestSlot(input: unknown, path: string, issues: ValidationIssue[]): string {
  if (typeof input === "string" && /^[A-Za-z0-9_-]{1,160}$/.test(input)) return input;
  issues.push(issue(path, "repeater.request_slot_invalid", "Choose a valid collection slot"));
  return "invalid";
}

function parseIdentifier(input: unknown, path: string, code: string, issues: ValidationIssue[]): string {
  if (typeof input === "string" && /^[A-Za-z][A-Za-z0-9_]*$/.test(input)) return input;
  issues.push(issue(path, code, "Value must be a safe identifier"));
  return "item";
}

function parseBindings(input: unknown, nodeType: NodeType, path: string, issues: ValidationIssue[]): NodeBase["bindings"] {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "binding.object_required", "Bindings must be an object"));
    return undefined;
  }
  const allowed = nodeType in bindingProperties
    ? bindingProperties[nodeType as keyof typeof bindingProperties] as readonly string[]
    : [];
  const result: NonNullable<NodeBase["bindings"]> = {};
  for (const [property, candidate] of Object.entries(input)) {
    if (!allowed.includes(property)) {
      issues.push(issue(`${path}.${property}`, "binding.property_invalid", `The ${property} property cannot be bound on ${nodeType}`));
      continue;
    }
    if (!isRecord(candidate) || candidate.source !== "item" || !Array.isArray(candidate.path)) {
      issues.push(issue(`${path}.${property}`, "binding.invalid", "Binding must contain an item source and field path"));
      continue;
    }
    rejectUnknownKeys(candidate, ["source", "path"], `${path}.${property}`, "binding.key_unknown", issues);
    const segments = candidate.path;
    const valid = segments.length > 0 && segments.length <= 8 && segments.every((segment) =>
      typeof segment === "string" && /^[A-Za-z][A-Za-z0-9_-]*$/.test(segment) && !unsafePathSegments.has(segment),
    );
    if (!valid) {
      issues.push(issue(`${path}.${property}.path`, "binding.path_invalid", "Binding path contains an invalid field segment"));
      continue;
    }
    result[property as keyof typeof result] = { source: "item", path: segments as string[] };
  }
  return Object.keys(result).length === 0 ? undefined : result;
}

function validateBindingFallbacks(bindings: NodeBase["bindings"], input: Record<string, unknown>, path: string, issues: ValidationIssue[]): void {
  for (const property of Object.keys(bindings ?? {}) as BindableProperty[]) {
    if (input[property] === undefined) {
      issues.push(issue(`${path}.${property}`, "binding.fallback_required", `A static ${property} fallback is required when the property is bound`));
    }
  }
}

function parseCollectionSource(input: unknown, path: string, issues: ValidationIssue[]): RepeaterNode["source"] {
  if (!isRecord(input)) {
    issues.push(issue(path, "repeater.source_object_required", "Repeater source must be an object"));
    return { kind: "autotable", schemaName: "invalid", limit: 1 };
  }
  rejectUnknownKeys(input, ["kind", "schemaName", "filters", "sort", "limit", "requestSlot"], path, "repeater.source_key_unknown", issues);
  if (input.kind !== "autotable") issues.push(issue(`${path}.kind`, "repeater.source_kind_invalid", "Only AutoTable collection sources are supported"));
  const schemaName = parseIdentifier(input.schemaName, `${path}.schemaName`, "repeater.schema_invalid", issues);
  const limit = typeof input.limit === "number" && Number.isInteger(input.limit) && input.limit >= 1 && input.limit <= 100
    ? input.limit
    : 1;
  if (limit !== input.limit) issues.push(issue(`${path}.limit`, "repeater.limit_invalid", "Repeater limit must be an integer from 1 through 100"));
  const filters = parseCollectionFilters(input.filters, `${path}.filters`, issues);
  const sort = parseCollectionSort(input.sort, `${path}.sort`, issues);
  return { kind: "autotable", schemaName, limit, ...(input.requestSlot === undefined ? {} : { requestSlot: parseRequestSlot(input.requestSlot, `${path}.requestSlot`, issues) }), ...(filters ? { filters } : {}), ...(sort ? { sort } : {}) };
}

function parseCollectionFilters(input: unknown, path: string, issues: ValidationIssue[]): RepeaterNode["source"]["filters"] {
  if (input === undefined) return undefined;
  if (!Array.isArray(input) || input.length > 10) {
    issues.push(issue(path, "repeater.filters_invalid", "Repeater filters must be an array with at most 10 entries"));
    return undefined;
  }
  return input.map((entry, index) => {
    const entryPath = `${path}[${index}]`;
    if (!isRecord(entry)) {
      issues.push(issue(entryPath, "repeater.filter_invalid", "Filter must be an object"));
      return { field: "invalid", operator: "eq" as const, value: null };
    }
    rejectUnknownKeys(entry, ["field", "operator", "value"], entryPath, "repeater.filter_key_unknown", issues);
    const field = parseIdentifier(entry.field, `${entryPath}.field`, "repeater.filter_field_invalid", issues);
    const supported = COLLECTION_FILTER_OPERATORS.includes(entry.operator as CollectionFilterOperator);
    const operator: CollectionFilterOperator = supported ? entry.operator as CollectionFilterOperator : "eq";
    if (!supported) issues.push(issue(`${entryPath}.operator`, "repeater.filter_operator_invalid", "Filter operator is not supported"));
    const scalar = (value: unknown) => value === null || typeof value === "string" || (typeof value === "number" && Number.isFinite(value)) || typeof value === "boolean";
    const validValue = operator === "in" ? Array.isArray(entry.value) && entry.value.length <= 50 && entry.value.every(scalar) : scalar(entry.value);
    if (!validValue) issues.push(issue(`${entryPath}.value`, "repeater.filter_value_invalid", "Filter value must be a JSON scalar or bounded scalar array"));
    return { field, operator, value: validValue ? entry.value as never : null };
  });
}

function parseCollectionSort(input: unknown, path: string, issues: ValidationIssue[]): RepeaterNode["source"]["sort"] {
  if (input === undefined) return undefined;
  if (!Array.isArray(input) || input.length > 3) {
    issues.push(issue(path, "repeater.sort_invalid", "Repeater sort must be an array with at most 3 entries"));
    return undefined;
  }
  return input.map((entry, index) => {
    const entryPath = `${path}[${index}]`;
    if (!isRecord(entry)) {
      issues.push(issue(entryPath, "repeater.sort_entry_invalid", "Sort entry must be an object"));
      return { field: "invalid", direction: "asc" as const };
    }
    rejectUnknownKeys(entry, ["field", "direction"], entryPath, "repeater.sort_key_unknown", issues);
    const field = parseIdentifier(entry.field, `${entryPath}.field`, "repeater.sort_field_invalid", issues);
    const direction = entry.direction === "desc" ? "desc" : "asc";
    if (entry.direction !== "asc" && entry.direction !== "desc") issues.push(issue(`${entryPath}.direction`, "repeater.sort_direction_invalid", "Sort direction must be asc or desc"));
    return { field, direction };
  });
}

function parseEffectAttachments(input: unknown, path: string, issues: ValidationIssue[]): EffectAttachment[] | undefined {
  if (input === undefined) return undefined;
  if (!Array.isArray(input)) {
    issues.push(issue(path, "effect.array_required", "Effects must be an array"));
    return undefined;
  }
  return input.map((entry, index) => parseEffectAttachment(entry, `${path}[${index}]`, issues));
}

function parseEffectAttachment(input: unknown, path: string, issues: ValidationIssue[]): EffectAttachment {
  if (!isRecord(input)) {
    issues.push(issue(path, "effect.object_required", "Effect attachment must be an object"));
    return { attachmentId: "", effectId: "", version: 1, enabled: false, props: {} };
  }
  rejectUnknownKeys(input, ["attachmentId", "effectId", "version", "enabled", "props", "metadata"], path, "effect.key_unknown", issues);
  const attachmentId = typeof input.attachmentId === "string" && input.attachmentId.length > 0 ? input.attachmentId : "";
  const effectId = typeof input.effectId === "string" && input.effectId.length > 0 ? input.effectId : "";
  const version = typeof input.version === "number" && Number.isInteger(input.version) && input.version > 0 ? input.version : 1;
  const enabled = input.enabled === true;
  if (attachmentId.length === 0) issues.push(issue(`${path}.attachmentId`, "effect.attachment_id_required", "Effect attachment ID is required"));
  if (effectId.length === 0) issues.push(issue(`${path}.effectId`, "effect.id_required", "Effect ID is required"));
  if (typeof input.version !== "number" || !Number.isInteger(input.version) || input.version < 1) issues.push(issue(`${path}.version`, "effect.version_invalid", "Effect version must be a positive integer"));
  if (typeof input.enabled !== "boolean") issues.push(issue(`${path}.enabled`, "effect.enabled_boolean_required", "Effect enabled must be a boolean"));
  const props = isJsonObject(input.props) ? cloneJsonObject(input.props) : {};
  if (!isJsonObject(input.props)) issues.push(issue(`${path}.props`, "effect.props_json_required", "Effect props must be a JSON object"));
  let metadata: EffectAttachment["metadata"];
  if (input.metadata !== undefined) {
    if (!isJsonObject(input.metadata)) issues.push(issue(`${path}.metadata`, "effect.metadata_json_required", "Effect metadata must be a JSON object"));
    else metadata = cloneJsonObject(input.metadata);
  }
  return { attachmentId, effectId, version, enabled, props, ...(metadata === undefined ? {} : { metadata }) };
}

function parseAnimation(input: unknown, path: string, nodeType: NodeType, issues: ValidationIssue[]): AnimationSpec | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "animation.object_required", "Animation must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["preset", "trigger", "duration", "delay", "easing", "once", "stagger", "shuffle"], path, "animation.key_unknown", issues);

  const preset = parseControlledLayoutValue(input.preset, ANIMATION_PRESETS, "none", `${path}.preset`, "animation.preset_invalid", "Animation preset is not supported", issues);
  const trigger = parseControlledLayoutValue(input.trigger, ANIMATION_TRIGGERS, "load", `${path}.trigger`, "animation.trigger_invalid", "Animation trigger is not supported", issues);
  const easing = parseControlledLayoutValue(input.easing, ANIMATION_EASINGS, "ease", `${path}.easing`, "animation.easing_invalid", "Animation easing is not supported", issues);
  const duration = parseMilliseconds(input.duration, ANIMATION_LIMITS.duration, `${path}.duration`, "animation.duration_invalid", issues);
  const delay = parseMilliseconds(input.delay, ANIMATION_LIMITS.delay, `${path}.delay`, "animation.delay_invalid", issues);
  if (typeof input.once !== "boolean") issues.push(issue(`${path}.once`, "animation.once_boolean_required", "Animation once must be a boolean"));

  let stagger: number | undefined;
  if (input.stagger !== undefined) {
    if (!NODE_DEFINITIONS[nodeType].canHaveChildren) {
      issues.push(issue(`${path}.stagger`, "animation.stagger_container_required", "Stagger is only valid on structural nodes"));
    } else {
      stagger = parseMilliseconds(input.stagger, ANIMATION_LIMITS.stagger, `${path}.stagger`, "animation.stagger_invalid", issues);
    }
  }
  const shuffle = parseShuffle(input.shuffle, `${path}.shuffle`, issues);

  return {
    preset,
    trigger,
    duration,
    delay,
    easing,
    once: typeof input.once === "boolean" ? input.once : true,
    ...(stagger === undefined ? {} : { stagger }),
    ...(shuffle === undefined ? {} : { shuffle }),
  };
}

function parseMilliseconds(input: unknown, limits: { min: number; max: number }, path: string, code: string, issues: ValidationIssue[]): number {
  if (typeof input !== "number" || !Number.isFinite(input) || input < limits.min || input > limits.max) {
    issues.push(issue(path, code, `Value must be a number between ${limits.min} and ${limits.max} milliseconds`));
    return limits.min;
  }
  return input;
}

function parseShuffle(input: unknown, path: string, issues: ValidationIssue[]): ShuffleAnimationSpec | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "shuffle.object_required", "Shuffle configuration must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["enabled", "intervalMs", "durationMs", "easing", "seed"], path, "shuffle.key_unknown", issues);
  if (typeof input.enabled !== "boolean") issues.push(issue(`${path}.enabled`, "shuffle.enabled_boolean_required", "Shuffle enabled must be a boolean"));
  const intervalMs = parseMilliseconds(input.intervalMs, { min: 2000, max: 30000 }, `${path}.intervalMs`, "shuffle.interval_invalid", issues);
  const durationMs = parseMilliseconds(input.durationMs, { min: 100, max: 2000 }, `${path}.durationMs`, "shuffle.duration_invalid", issues);
  const easing = parseControlledLayoutValue(input.easing, ANIMATION_EASINGS, "ease-in-out", `${path}.easing`, "shuffle.easing_invalid", "Shuffle easing is not supported", issues);
  let seed: number | undefined;
  if (input.seed !== undefined) {
    if (!Number.isInteger(input.seed) || typeof input.seed !== "number") issues.push(issue(`${path}.seed`, "shuffle.seed_invalid", "Shuffle seed must be an integer"));
    else seed = input.seed;
  }
  return { enabled: input.enabled === true, intervalMs, durationMs, easing, ...(seed === undefined ? {} : { seed }) };
}

function optionalMediaLayout(input: unknown, path: string, issues: ValidationIssue[]): Pick<GridNode, "mediaLayout"> {
  if (input === undefined) return {};
  if (!isRecord(input)) {
    issues.push(issue(path, "media_layout.object_required", "Media layout must be an object"));
    return {};
  }
  rejectUnknownKeys(input, ["mode", "preset", "aspectRatio", "overflow", "breakpoints"], path, "media_layout.key_unknown", issues);
  if (input.mode !== "slots") issues.push(issue(`${path}.mode`, "media_layout.mode_invalid", "Only slot media layouts are supported"));
  if (input.overflow !== "hidden") issues.push(issue(`${path}.overflow`, "media_layout.overflow_hidden_required", "Slot media layouts must hide overflow"));
  if (input.preset !== undefined && (typeof input.preset !== "string" || !MEDIA_LAYOUT_PRESETS.includes(input.preset as never))) {
    issues.push(issue(`${path}.preset`, "media_layout.preset_invalid", "Media layout preset is not supported"));
  }
  const aspects = ["square", "landscape", "wide", "portrait"];
  if (typeof input.aspectRatio !== "string" || !aspects.includes(input.aspectRatio)) issues.push(issue(`${path}.aspectRatio`, "media_layout.aspect_required", "A supported aspect ratio is required to bound the media area"));
  if (!isRecord(input.breakpoints)) {
    issues.push(issue(`${path}.breakpoints`, "media_layout.breakpoints_required", "Media layout breakpoints are required"));
    return {};
  }
  rejectUnknownKeys(input.breakpoints, ["mobile", "tablet", "desktop"], `${path}.breakpoints`, "media_layout.breakpoint_unknown", issues);
  const mobile = parseSlotLayout(input.breakpoints.mobile, `${path}.breakpoints.mobile`, false, issues) as SlotLayout;
  const tablet = parseSlotLayout(input.breakpoints.tablet, `${path}.breakpoints.tablet`, true, issues) as SlotLayoutOverride | undefined;
  const desktop = parseSlotLayout(input.breakpoints.desktop, `${path}.breakpoints.desktop`, true, issues) as SlotLayoutOverride | undefined;
  const mediaLayout: MediaLayoutSpec = {
    mode: "slots",
    overflow: "hidden",
    ...(typeof input.preset === "string" && MEDIA_LAYOUT_PRESETS.includes(input.preset as never) ? { preset: input.preset as MediaLayoutSpec["preset"] } : {}),
    aspectRatio: typeof input.aspectRatio === "string" && aspects.includes(input.aspectRatio) ? input.aspectRatio as MediaLayoutSpec["aspectRatio"] : "landscape",
    breakpoints: { mobile, ...(tablet === undefined ? {} : { tablet }), ...(desktop === undefined ? {} : { desktop }) },
  };
  for (const breakpoint of breakpoints) {
    validateResolvedSlotLayout(resolveSlotLayout(mediaLayout, breakpoint)).forEach((code) => issues.push(issue(`${path}.breakpoints.${breakpoint}`, code, "Slot layout geometry is invalid")));
  }
  return { mediaLayout };
}

function parseSlotLayout(input: unknown, path: string, optional: boolean, issues: ValidationIssue[]): SlotLayout | SlotLayoutOverride | undefined {
  if (input === undefined && optional) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "slot.layout_object_required", "Slot layout must be an object"));
    return optional ? undefined : { columns: 1, rows: 1, slots: [] };
  }
  rejectUnknownKeys(input, ["columns", "rows", "slots"], path, "slot.layout_key_unknown", issues);
  const columns = parsePositiveInteger(input.columns, `${path}.columns`, optional, issues);
  const rows = parsePositiveInteger(input.rows, `${path}.rows`, optional, issues);
  let slots: Array<SlotSpec | SlotOverride> | undefined;
  if (input.slots !== undefined) {
    if (!Array.isArray(input.slots)) issues.push(issue(`${path}.slots`, "slot.array_required", "Slots must be an array"));
    else slots = input.slots.map((slot, index) => parseSlot(slot, `${path}.slots[${index}]`, optional, issues));
  } else if (!optional) {
    issues.push(issue(`${path}.slots`, "slot.array_required", "Base slots are required"));
    slots = [];
  }
  return { ...(columns === undefined ? {} : { columns }), ...(rows === undefined ? {} : { rows }), ...(slots === undefined ? {} : { slots }) } as SlotLayout | SlotLayoutOverride;
}

function parseSlot(input: unknown, path: string, partial: boolean, issues: ValidationIssue[]): SlotSpec | SlotOverride {
  if (!isRecord(input)) {
    issues.push(issue(path, "slot.object_required", "Slot must be an object"));
    return { id: "" };
  }
  rejectUnknownKeys(input, ["id", "columnStart", "rowStart", "columnSpan", "rowSpan", "aspectRatio"], path, "slot.key_unknown", issues);
  const id = typeof input.id === "string" && input.id.length > 0 ? input.id : "";
  if (id.length === 0) issues.push(issue(`${path}.id`, "slot.id_required", "Slot ID is required"));
  const result: SlotOverride = { id };
  for (const key of ["columnStart", "rowStart", "columnSpan", "rowSpan"] as const) {
    const value = parsePositiveInteger(input[key], `${path}.${key}`, partial, issues);
    if (value !== undefined) result[key] = value;
  }
  if (input.aspectRatio !== undefined) {
    const aspects = ["square", "landscape", "portrait", "wide"] as const;
    if (typeof input.aspectRatio !== "string" || !aspects.includes(input.aspectRatio as typeof aspects[number])) issues.push(issue(`${path}.aspectRatio`, "slot.aspect_invalid", "Slot aspect ratio is not supported"));
    else result.aspectRatio = input.aspectRatio as SlotSpec["aspectRatio"];
  }
  return result;
}

function parsePositiveInteger(input: unknown, path: string, optional: boolean, issues: ValidationIssue[]): number | undefined {
  if (input === undefined && optional) return undefined;
  if (typeof input !== "number" || !Number.isInteger(input) || input < 1) {
    issues.push(issue(path, "slot.positive_integer_required", "Value must be a positive integer"));
    return undefined;
  }
  return input;
}

function parsePaint(input: unknown, path: string, issues: ValidationIssue[]): ColorValue | GradientPaint | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "paint.object_required", "Paint must be an object"));
    return undefined;
  }
  if (input.kind === "token" || input.kind === "custom") return parseColorValue(input, path, issues);
  if (input.kind === "linear-gradient" || input.kind === "radial-gradient") return parseGradient(input, path, issues);
  issues.push(issue(`${path}.kind`, "paint.kind_invalid", "Paint kind is not supported"));
  return undefined;
}

function parseOverlayTint(input: unknown, path: string, issues: ValidationIssue[]): OverlayNode["tint"] | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "overlay.tint_object_required", "Overlay tint must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["color", "opacity"], path, "overlay.tint_key_unknown", issues);
  const color = parsePaint(input.color, `${path}.color`, issues);
  if (color && color.kind !== "token" && color.kind !== "custom") {
    issues.push(issue(`${path}.color`, "overlay.tint_color_invalid", "Overlay tint must use a solid color"));
  }
  const opacity = typeof input.opacity === "number" && Number.isFinite(input.opacity) && input.opacity >= 0 && input.opacity <= 1 ? input.opacity : 0.35;
  if (opacity !== input.opacity) issues.push(issue(`${path}.opacity`, "overlay.tint_opacity_invalid", "Overlay tint opacity must be between zero and one"));
  return color && (color.kind === "token" || color.kind === "custom") ? { color, opacity } : undefined;
}

function parseColorValue(input: Record<string, unknown>, path: string, issues: ValidationIssue[]): ColorValue {
  rejectUnknownKeys(input, ["kind", "value"], path, "paint.key_unknown", issues);
  if (input.kind === "token") {
    if (typeof input.value !== "string" || !COLOR_TOKENS.includes(input.value as never)) issues.push(issue(`${path}.value`, "paint.token_invalid", "Color token is not supported"));
    return { kind: "token", value: COLOR_TOKENS.includes(input.value as never) ? input.value as ColorValue & never : "text" } as ColorValue;
  }
  const value = typeof input.value === "string" ? input.value.trim() : "";
  if (!isSafeCustomColor(value)) issues.push(issue(`${path}.value`, "paint.custom_color_invalid", "Custom color must be a safe hex, rgb, rgba, hsl, or hsla value"));
  return { kind: "custom", value };
}

function parseAccentColor(input: unknown, path: string, issues: ValidationIssue[]): ColorValue | undefined {
  const paint = parsePaint(input, path, issues);
  if (paint !== undefined && paint.kind !== "token" && paint.kind !== "custom") {
    issues.push(issue(path, "paint.solid_color_required", "Accent color must be a solid color"));
    return undefined;
  }
  return paint;
}

function parseGradient(input: Record<string, unknown>, path: string, issues: ValidationIssue[]): GradientPaint {
  const linear = input.kind === "linear-gradient";
  rejectUnknownKeys(input, linear ? ["kind", "angle", "stops", "opacity"] : ["kind", "shape", "stops", "opacity"], path, "paint.key_unknown", issues);
  if (linear && (typeof input.angle !== "number" || !Number.isFinite(input.angle) || input.angle < 0 || input.angle > 360)) issues.push(issue(`${path}.angle`, "paint.angle_invalid", "Gradient angle must be between 0 and 360"));
  if (!linear && input.shape !== "circle" && input.shape !== "ellipse") issues.push(issue(`${path}.shape`, "paint.shape_invalid", "Radial gradient shape is not supported"));
  const stops: GradientPaint["stops"] = [];
  if (!Array.isArray(input.stops) || input.stops.length < 2) issues.push(issue(`${path}.stops`, "paint.stops_invalid", "A gradient requires at least two stops"));
  else input.stops.forEach((stop, index) => {
    if (!isRecord(stop)) return issues.push(issue(`${path}.stops[${index}]`, "paint.stop_object_required", "Gradient stop must be an object"));
    rejectUnknownKeys(stop, ["color", "position"], `${path}.stops[${index}]`, "paint.stop_key_unknown", issues);
    const position = typeof stop.position === "number" ? stop.position : -1;
    if (!Number.isFinite(position) || position < 0 || position > 100) issues.push(issue(`${path}.stops[${index}].position`, "paint.stop_position_invalid", "Gradient stop position must be from 0 to 100"));
    if (index > 0 && position < stops[index - 1]!.position) issues.push(issue(`${path}.stops[${index}].position`, "paint.stop_order_invalid", "Gradient stops must be ordered by position"));
    const color = isRecord(stop.color) ? parseColorValue(stop.color, `${path}.stops[${index}].color`, issues) : { kind: "token" as const, value: "text" as const };
    stops.push({ color, position });
  });
  return linear ? { kind: "linear-gradient", angle: typeof input.angle === "number" ? input.angle : 0, stops } : { kind: "radial-gradient", shape: input.shape === "ellipse" ? "ellipse" : "circle", stops };
}

function parseBackground(input: unknown, path: string, issues: ValidationIssue[]): BackgroundLayer[] | undefined {
  if (input === undefined) return undefined;
  if (!Array.isArray(input)) {
    issues.push(issue(path, "background.array_required", "Background layers must be an array"));
    return undefined;
  }
  return input.map((layer, index): BackgroundLayer => {
    const layerPath = `${path}[${index}]`;
    if (!isRecord(layer)) {
      issues.push(issue(layerPath, "background.layer_object_required", "Background layer must be an object"));
      return { kind: "solid", color: { kind: "token", value: "transparent" } };
    }
    if (layer.kind === "solid") {
      rejectUnknownKeys(layer, ["kind", "color", "opacity"], layerPath, "background.key_unknown", issues);
      const color = isRecord(layer.color) ? parseColorValue(layer.color, `${layerPath}.color`, issues) : { kind: "token" as const, value: "transparent" as const };
      return { kind: "solid", color, ...parseOpacity(layer.opacity, layerPath, issues) };
    }
    if (layer.kind === "linear-gradient" || layer.kind === "radial-gradient") return { ...parseGradient(layer, layerPath, issues), ...parseOpacity(layer.opacity, layerPath, issues) };
    if (layer.kind === "image") {
      rejectUnknownKeys(layer, ["kind", "src", "fit", "position", "repeat", "opacity"], layerPath, "background.key_unknown", issues);
      const src = parseRequiredUrl(layer.src, `${layerPath}.src`, "background.image_src_required", "Background image source is required", "image", issues);
      if (!["cover", "contain", "fill"].includes(String(layer.fit))) issues.push(issue(`${layerPath}.fit`, "background.fit_invalid", "Background image fit is not supported"));
      if (!["center", "top", "right", "bottom", "left"].includes(String(layer.position))) issues.push(issue(`${layerPath}.position`, "background.position_invalid", "Background image position is not supported"));
      if (!["no-repeat", "repeat", "repeat-x", "repeat-y"].includes(String(layer.repeat))) issues.push(issue(`${layerPath}.repeat`, "background.repeat_invalid", "Background image repeat is not supported"));
      return { kind: "image", src, fit: layer.fit === "contain" || layer.fit === "fill" ? layer.fit : "cover", position: ["top", "right", "bottom", "left"].includes(String(layer.position)) ? layer.position as "top" : "center", repeat: ["repeat", "repeat-x", "repeat-y"].includes(String(layer.repeat)) ? layer.repeat as "repeat" : "no-repeat", ...parseOpacity(layer.opacity, layerPath, issues) };
    }
    if (layer.kind === "video") {
      rejectUnknownKeys(layer, ["kind", "src", "fit", "position", "muted", "loop", "opacity"], layerPath, "background.key_unknown", issues);
      const src = parseRequiredUrl(layer.src, `${layerPath}.src`, "background.video_src_required", "Background video source is required", "video", issues);
      if (!["cover", "contain"].includes(String(layer.fit))) issues.push(issue(`${layerPath}.fit`, "background.fit_invalid", "Background video fit must be cover or contain"));
      if (!["center", "top", "right", "bottom", "left"].includes(String(layer.position))) issues.push(issue(`${layerPath}.position`, "background.position_invalid", "Background video position is not supported"));
      return { kind: "video", src, fit: layer.fit === "contain" ? "contain" : "cover", position: ["top", "right", "bottom", "left"].includes(String(layer.position)) ? layer.position as "top" : "center", muted: true, loop: true, ...parseOpacity(layer.opacity, layerPath, issues) };
    }
    if (layer.kind === "svg") {
      rejectUnknownKeys(layer, ["kind", "src", "fit", "position", "opacity"], layerPath, "background.key_unknown", issues);
      const src = parseRequiredUrl(layer.src, `${layerPath}.src`, "background.svg_src_required", "Background SVG source is required", "image", issues);
      if (!["cover", "contain", "fill"].includes(String(layer.fit))) issues.push(issue(`${layerPath}.fit`, "background.fit_invalid", "Background SVG fit is not supported"));
      if (!["center", "top", "right", "bottom", "left"].includes(String(layer.position))) issues.push(issue(`${layerPath}.position`, "background.position_invalid", "Background SVG position is not supported"));
      return { kind: "svg", src, fit: layer.fit === "contain" || layer.fit === "fill" ? layer.fit : "cover", position: ["top", "right", "bottom", "left"].includes(String(layer.position)) ? layer.position as "top" : "center", ...parseOpacity(layer.opacity, layerPath, issues) };
    }
    issues.push(issue(`${layerPath}.kind`, "background.kind_invalid", "Background layer kind is not supported"));
    return { kind: "solid", color: { kind: "token", value: "transparent" } };
  });
}

function parseOpacity(input: unknown, path: string, issues: ValidationIssue[]): { opacity?: number } {
  if (input === undefined) return {};
  if (typeof input !== "number" || !Number.isFinite(input) || input < 0 || input > 1) {
    issues.push(issue(`${path}.opacity`, "style.opacity_invalid", "Opacity must be between 0 and 1"));
    return {};
  }
  return { opacity: input };
}

function parseMediaEffects(input: unknown, path: string, issues: ValidationIssue[]): StyleSpec["media"] | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "style.media_object_required", "Media effects must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["opacity", "filters"], path, "style.key_unknown", issues);
  const opacity = parseOpacity(input.opacity, path, issues).opacity;
  if (input.filters === undefined) return opacity === undefined ? {} : { opacity };
  if (!isRecord(input.filters)) {
    issues.push(issue(`${path}.filters`, "style.filters_object_required", "Image filters must be an object"));
    return opacity === undefined ? {} : { opacity };
  }
  rejectUnknownKeys(input.filters, ["blur", "brightness", "contrast", "grayscale", "saturation"], `${path}.filters`, "style.key_unknown", issues);
  const ranges = { blur: [0, 40], brightness: [0, 300], contrast: [0, 300], grayscale: [0, 100], saturation: [0, 300] } as const;
  const filters: NonNullable<StyleSpec["media"]>["filters"] = {};
  for (const key of Object.keys(ranges) as Array<keyof typeof ranges>) {
    const value = input.filters[key];
    if (value === undefined) continue;
    const [min, max] = ranges[key];
    if (typeof value !== "number" || value < min || value > max) issues.push(issue(`${path}.filters.${key}`, "style.filter_range_invalid", `Filter must be between ${min} and ${max}`));
    else filters[key] = value;
  }
  return { ...(opacity === undefined ? {} : { opacity }), filters };
}

function parseChildren(input: unknown, path: string, parentType: NodeType, issues: ValidationIssue[]): ComponentNode[] {
  if (!Array.isArray(input)) {
    issues.push(issue(`${path}.children`, "node.children_array_required", "Structural nodes must have a children array"));
    return [];
  }
  const children: ComponentNode[] = [];
  input.forEach((child, index) => {
    const parsed = parseNode(child, `${path}.children[${index}]`, parentType, issues);
    if (parsed) children.push(parsed);
  });
  return children;
}

function parseStyleIntoIssues(input: unknown, path: string, issues: ValidationIssue[]): StyleSpec | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "style.object_required", "Style must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["spacing", "color", "typography", "border", "sizing", "textPaint", "background", "media", "custom", "positioning", "transform"], path, "style.key_unknown", issues);

  const spacing = parseStyleGroup(input.spacing, path, "spacing", issues);
  const color = parseStyleGroup(input.color, path, "color", issues);
  const typography = parseStyleGroup(input.typography, path, "typography", issues);
  const border = parseStyleGroup(input.border, path, "border", issues);
  const sizing = parseStyleGroup(input.sizing, path, "sizing", issues);
  const positioning = parseStyleGroup(input.positioning, path, "positioning", issues);
  const textPaint = parsePaint(input.textPaint, `${path}.textPaint`, issues);
  const background = parseBackground(input.background, `${path}.background`, issues);
  const media = parseMediaEffects(input.media, `${path}.media`, issues);
  const custom = parseCustomDimensions(input.custom, `${path}.custom`, issues);
  let transform: StyleSpec["transform"];
  if (input.transform !== undefined) {
    if (!isRecord(input.transform)) issues.push(issue(`${path}.transform`, "style.transform_object_required", "Transform must be an object"));
    else {
      rejectUnknownKeys(input.transform, ["rotate"], `${path}.transform`, "style.key_unknown", issues);
      const rotate = input.transform.rotate;
      if (rotate !== undefined && (typeof rotate !== "number" || !Number.isFinite(rotate) || rotate < -180 || rotate > 180)) issues.push(issue(`${path}.transform.rotate`, "style.rotation_invalid", "Rotation must be between -180 and 180 degrees"));
      else transform = rotate === undefined ? {} : { rotate: rotate as number };
    }
  }
  return {
    ...(spacing === undefined ? {} : { spacing }),
    ...(color === undefined ? {} : { color }),
    ...(typography === undefined ? {} : { typography }),
    ...(border === undefined ? {} : { border }),
    ...(sizing === undefined ? {} : { sizing }),
    ...(positioning === undefined ? {} : { positioning }),
    ...(textPaint === undefined ? {} : { textPaint }),
    ...(background === undefined ? {} : { background }),
    ...(media === undefined ? {} : { media }),
    ...(custom === undefined ? {} : { custom }),
    ...(transform === undefined ? {} : { transform }),
  };
}

export function parseStyleSpec(input: unknown, path = "$"): ValidationResult<StyleSpec> {
  const issues: ValidationIssue[] = [];
  const value = parseStyleIntoIssues(input, path, issues);
  if (issues.length > 0 || value === undefined) {
    return {
      success: false,
      issues: issues.length > 0
        ? issues
        : [issue(path, "style.object_required", "Style must be an object")],
    };
  }
  return { success: true, value, issues: [] };
}

const customDimensionKeys = ["padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "gap", "borderRadius", "borderWidth", "width", "height", "maxWidth"] as const;

function parseCustomDimensions(input: unknown, path: string, issues: ValidationIssue[], allowedKeys: readonly (keyof CustomDimensionSpec)[] = customDimensionKeys): StyleSpec["custom"] {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "style.custom_object_required", "Custom dimensions must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, allowedKeys, path, "style.custom_key_unknown", issues);
  const custom: NonNullable<StyleSpec["custom"]> = {};
  allowedKeys.forEach((key) => {
    const value = input[key];
    if (value === undefined) return;
    if (typeof value !== "string" || !isSafeCustomLength(value)) {
      issues.push(issue(`${path}.${key}`, "style.custom_length_invalid", "Use a number followed by px, rem, em, %, vh, vw, vmin, vmax, or ch"));
      return;
    }
    custom[key] = value.trim();
  });
  return custom;
}

function parseStyleGroup(
  input: unknown,
  stylePath: string,
  group: keyof typeof styleTokens,
  issues: ValidationIssue[],
): Record<string, string> | undefined {
  if (input === undefined) return undefined;
  const path = `${stylePath}.${group}`;
  if (!isRecord(input)) {
    issues.push(issue(path, "style.group_object_required", "Style groups must be objects"));
    return undefined;
  }
  const tokens = styleTokens[group] as Record<string, readonly string[]>;
  rejectUnknownKeys(input, Object.keys(tokens), path, "style.key_unknown", issues);
  const parsed: Record<string, string> = {};
  for (const [key, allowedTokens] of Object.entries(tokens)) {
    const value = input[key];
    if (value === undefined) continue;
    if (typeof value !== "string" || !allowedTokens.includes(value)) {
      issues.push(issue(`${path}.${key}`, "style.token_invalid", "Style token is not supported"));
      continue;
    }
    parsed[key] = value;
  }
  return parsed;
}

function parseRepeaterItemsLayout(input: unknown, path: string, issues: ValidationIssue[]): RepeaterItemsLayout | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "repeater.items_layout_invalid", "Repeated items layout must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["columns", "gap", "alignment"], path, "repeater.items_layout_key_unknown", issues);
  const numbers = (key: "columns" | "gap", min: number, max: number): BreakpointValue<number> => {
    const map = input[key];
    const result = { mobile: min, tablet: min, desktop: min };
    if (!isRecord(map)) {
      issues.push(issue(`${path}.${key}`, "repeater.items_layout_map_invalid", "Mobile, tablet and desktop settings are required"));
      return result;
    }
    rejectUnknownKeys(map, breakpoints, `${path}.${key}`, "repeater.items_layout_breakpoint_unknown", issues);
    for (const breakpoint of breakpoints) {
      const value = map[breakpoint];
      if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
        issues.push(issue(`${path}.${key}.${breakpoint}`, "repeater.items_layout_number_invalid", `${key} must be an integer from ${min} through ${max}`));
      } else result[breakpoint] = value;
    }
    return result;
  };
  const alignment = input.alignment;
  if (alignment !== "stretch" && alignment !== "start" && alignment !== "center" && alignment !== "end") {
    issues.push(issue(`${path}.alignment`, "repeater.items_layout_alignment_invalid", "Item alignment must be stretch, start, center or end"));
  }
  return { columns: numbers("columns", 1, 6), gap: numbers("gap", 0, 128), alignment: alignment === "start" || alignment === "center" || alignment === "end" ? alignment : "stretch" };
}

function parseResponsive(input: unknown, path: string, issues: ValidationIssue[]): ResponsiveSpec | undefined {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "responsive.object_required", "Responsive settings must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["visibility", "spacing"], path, "responsive.key_unknown", issues);

  const responsive: ResponsiveSpec = {};
  if (input.visibility !== undefined) {
    if (!isRecord(input.visibility)) {
      issues.push(issue(`${path}.visibility`, "responsive.visibility_object_required", "Visibility must be an object"));
    } else {
      rejectUnknownKeys(input.visibility, breakpoints, `${path}.visibility`, "responsive.key_unknown", issues);
      const visibility = {} as Record<(typeof breakpoints)[number], boolean>;
      for (const breakpoint of breakpoints) {
        const value = input.visibility[breakpoint];
        if (typeof value !== "boolean") {
          issues.push(issue(`${path}.visibility.${breakpoint}`, "responsive.visibility_boolean_required", "Visibility values must be booleans"));
        } else {
          visibility[breakpoint] = value;
        }
      }
      responsive.visibility = visibility;
    }
  }

  const spacing = parseResponsiveSpacing(input.spacing, `${path}.spacing`, issues);
  if (spacing !== undefined) responsive.spacing = spacing;
  return responsive;
}

function parseResponsiveSpacing(input: unknown, path: string, issues: ValidationIssue[]): ResponsiveSpec["spacing"] {
  if (input === undefined) return undefined;
  if (!isRecord(input)) {
    issues.push(issue(path, "responsive.spacing_object_required", "Responsive spacing must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, breakpoints, path, "responsive.key_unknown", issues);
  const spacing: NonNullable<ResponsiveSpec["spacing"]> = {};
  for (const breakpoint of breakpoints) {
    const value = input[breakpoint];
    if (value === undefined) continue;
    const breakpointPath = `${path}.${breakpoint}`;
    if (!isRecord(value)) {
      issues.push(issue(breakpointPath, "responsive.spacing_breakpoint_object_required", "Breakpoint spacing must be an object"));
      continue;
    }
    rejectUnknownKeys(value, ["spacing", "custom"], breakpointPath, "responsive.key_unknown", issues);
    const spec: ResponsiveSpacingSpec = {};
    const parsedSpacing = parseStyleGroup(value.spacing, breakpointPath, "spacing", issues);
    if (parsedSpacing !== undefined) spec.spacing = parsedSpacing as StyleSpec["spacing"];
    const custom = parseCustomDimensions(value.custom, `${breakpointPath}.custom`, issues, ["padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "gap"]);
    if (custom !== undefined) spec.custom = custom;
    if (Object.keys(spec).length > 0) spacing[breakpoint] = spec;
  }
  return Object.keys(spacing).length > 0 ? spacing : undefined;
}

function parseLayout(input: unknown, path: string, parentType: NodeType | null, issues: ValidationIssue[]): ChildLayoutSpec | undefined {
  if (input === undefined) return undefined;
  if (parentType !== "grid") issues.push(issue(path, "layout.grid_parent_required", "Layout placement is only valid for direct Grid children"));
  if (!isRecord(input)) {
    issues.push(issue(path, "layout.object_required", "Layout must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, ["span", "placement", "start"], path, "layout.key_unknown", issues);
  if (input.span === undefined && input.placement === undefined && input.start === undefined) {
    issues.push(issue(`${path}.span`, "layout.span_required", "Layout must include spans for every breakpoint"));
    return {};
  }

  let span: ChildLayoutSpec["span"];
  if (input.span !== undefined) {
    if (!isRecord(input.span)) {
      issues.push(issue(`${path}.span`, "layout.span_object_required", "Span must be an object"));
    } else {
      rejectUnknownKeys(input.span, breakpoints, `${path}.span`, "layout.key_unknown", issues);
      const parsed = {} as Record<(typeof breakpoints)[number], number>;
      for (const breakpoint of breakpoints) {
        const value = input.span[breakpoint];
        if (!Number.isInteger(value) || typeof value !== "number" || value < 1 || value > 12) {
          issues.push(issue(`${path}.span.${breakpoint}`, "layout.span_invalid", "Grid spans must be integers from 1 through 12"));
        } else {
          parsed[breakpoint] = value;
        }
      }
      span = parsed;
    }
  }

  const placement = input.placement === undefined
    ? undefined
    : parsePlacement(input.placement, `${path}.placement`, issues);
  const start = input.start === undefined
    ? undefined
    : parseFlowStart(input.start, span, `${path}.start`, issues);
  return {
    ...(span === undefined ? {} : { span }),
    ...(placement === undefined ? {} : { placement }),
    ...(start === undefined ? {} : { start }),
  };
}

function parseFlowStart(
  input: unknown,
  span: ChildLayoutSpec["span"],
  path: string,
  issues: ValidationIssue[],
): ChildLayoutSpec["start"] {
  if (!isRecord(input)) {
    issues.push(issue(path, "layout.start_object_required", "Start positions must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, breakpoints, path, "layout.key_unknown", issues);
  const start = {} as BreakpointValue<FlowGridPosition | null>;
  for (const breakpoint of breakpoints) {
    const value = input[breakpoint];
    const breakpointPath = `${path}.${breakpoint}`;
    if (value === undefined) {
      issues.push(issue(breakpointPath, "layout.start_breakpoint_required", "Start positions must cover every breakpoint (use null for automatic flow)"));
      continue;
    }
    if (value === null) {
      start[breakpoint] = null;
      continue;
    }
    if (!isRecord(value)) {
      issues.push(issue(breakpointPath, "layout.start_value_invalid", "Start position must be an object or null"));
      continue;
    }
    rejectUnknownKeys(value, ["column", "row"], breakpointPath, "layout.key_unknown", issues);
    const column = value.column;
    const row = value.row;
    const spanValue = span?.[breakpoint] ?? 1;
    if (typeof column !== "number" || !Number.isInteger(column) || column < 1 || column + spanValue - 1 > 12) {
      issues.push(issue(`${breakpointPath}.column`, "layout.start_column_invalid", "Start columns must place the item inside the 12-column grid"));
      continue;
    }
    if (typeof row !== "number" || !Number.isInteger(row) || row < 1 || row > 100) {
      issues.push(issue(`${breakpointPath}.row`, "layout.start_row_invalid", "Start rows must be positive integers"));
      continue;
    }
    start[breakpoint] = { column, row };
  }
  return start;
}

function parsePlacement(input: unknown, path: string, issues: ValidationIssue[]): GridPlacementByBreakpoint | undefined {
  if (!isRecord(input)) {
    issues.push(issue(path, "layout.placement_object_required", "Placement must be an object"));
    return undefined;
  }
  rejectUnknownKeys(input, breakpoints, path, "layout.placement_key_unknown", issues);
  const placement = {} as GridPlacementByBreakpoint;
  for (const breakpoint of breakpoints) {
    const value = input[breakpoint];
    const breakpointPath = `${path}.${breakpoint}`;
    if (value === undefined) {
      issues.push(issue(breakpointPath, "layout.placement_breakpoint_required", "Placement is required for every breakpoint"));
      continue;
    }
    if (!isRecord(value)) {
      issues.push(issue(breakpointPath, "layout.placement_object_required", "Breakpoint placement must be an object"));
      continue;
    }
    rejectUnknownKeys(value, ["column", "row", "columnSpan", "rowSpan"], breakpointPath, "layout.placement_key_unknown", issues);
    const candidate = {
      column: value.column,
      row: value.row,
      columnSpan: value.columnSpan,
      rowSpan: value.rowSpan,
    };
    const keys = ["column", "row", "columnSpan", "rowSpan"] as const;
    const invalidKeys = keys.filter((key) => typeof candidate[key] !== "number" || !Number.isInteger(candidate[key]));
    for (const key of invalidKeys) {
      issues.push(issue(`${breakpointPath}.${key}`, "layout.placement_integer_required", "Grid placement values must be integers"));
    }
    if (invalidKeys.length > 0) continue;
    const parsed = candidate as GridPlacement;
    if (!isPlacementInBounds(parsed)) {
      issues.push(issue(breakpointPath, "layout.placement_bounds_invalid", "Grid placement must fit inside the 12 by 12 grid"));
      continue;
    }
    placement[breakpoint] = parsed;
  }
  return placement;
}

function parseSource(input: unknown, issues: ValidationIssue[]): Pick<ComponentDocument, "source"> {
  if (input === undefined) return {};
  if (!isRecord(input)) {
    issues.push(issue("$.source", "source.object_required", "Source must be an object"));
    return {};
  }
  rejectUnknownKeys(input, ["templateId"], "$.source", "source.key_unknown", issues);
  if (typeof input.templateId !== "string" || input.templateId.length === 0) {
    issues.push(issue("$.source.templateId", "source.template_id_required", "Source template ID is required"));
    return {};
  }
  return { source: { templateId: input.templateId } };
}

function validateTreeInvariants(root: ComponentNode, documentKind: ComponentDocumentKind, issues: ValidationIssue[]): void {
  const ids = new Set<string>();
  const nodeTypes = new Map<string, NodeType>();
  const attachmentIds = new Set<string>();
  const menuTargets: Array<{ targetId: string; path: string }> = [];
  const visit = (node: ComponentNode, path: string, parentType: NodeType | null, formNames?: Map<string, string>, insideRepeater = false): void => {
    if (ids.has(node.id)) issues.push(issue(`${path}.id`, "node.id_duplicate", "Node IDs must be unique"));
    ids.add(node.id);
    nodeTypes.set(node.id, node.type);
    if (node.type === "menu-toggle") menuTargets.push({ targetId: node.targetId, path: `${path}.targetId` });
    const allowedKinds = NODE_DEFINITIONS[node.type].documentKinds;
    if (allowedKinds && !allowedKinds.includes(documentKind)) issues.push(issue(path, "node.document_kind_invalid", `A ${node.type} node is not available in ${documentKind} documents`));
    node.effects?.forEach((effect, index) => {
      if (attachmentIds.has(effect.attachmentId)) issues.push(issue(`${path}.effects[${index}].attachmentId`, "effect.attachment_id_duplicate", "Effect attachment IDs must be unique"));
      attachmentIds.add(effect.attachmentId);
    });

    if (parentType && !NODE_DEFINITIONS[parentType].allowedChildren.includes(node.type)) {
      issues.push(issue(path, "node.nesting_invalid", `A ${node.type} node is not allowed inside ${parentType}`));
    }
    if (node.type === "form" && formNames) issues.push(issue(path, "form.nesting_invalid", "Forms cannot be nested inside another Form"));
    if (node.type === "form" && insideRepeater) issues.push(issue(path, "form.repeater_ancestor_invalid", "Forms cannot be placed inside Repeaters"));
    if (node.type === "repeater" && formNames) issues.push(issue(path, "repeater.form_ancestor_invalid", "Repeaters cannot be placed inside Forms"));
    if (isFormFieldNode(node)) {
      if (!formNames) issues.push(issue(path, "field.form_required", "Form fields must be placed inside a Form"));
      else {
        const previous = formNames.get(node.fieldName);
        if (previous) issues.push(issue(`${path}.fieldName`, "field.name_duplicate", `Field name ${node.fieldName} is already used at ${previous}`));
        else formNames.set(node.fieldName, `${path}.fieldName`);
      }
    }
    if (node.type === "button" && node.submit === true && !formNames) issues.push(issue(path, "button.submit_form_required", "Submit buttons must be placed inside a Form"));
    if (node.type === "grid" && node.mediaLayout !== undefined && node.children.some((child) => child.type !== "image")) {
      issues.push(issue(path, "media_layout.images_required", "A slot media layout may contain only Image children"));
    }
    if (node.type === "expandable-card") {
      const valid = node.children.length === 2 && node.children[0]?.type === "slot" && node.children[0].name === "preview" && node.children[1]?.type === "slot" && node.children[1].name === "details";
      if (!valid) issues.push(issue(path, "expandable_card.slots_invalid", "Expandable Card must contain Card face and Full-screen details slots in order"));
      if (formNames) issues.push(issue(path, "expandable_card.form_ancestor_invalid", "Expandable Cards must be placed outside Forms"));
    }
    if (node.type === "disclosure") {
      const valid = node.children.length === 2 && node.children[0]?.type === "slot" && node.children[0].name === "trigger" && node.children[1]?.type === "slot" && node.children[1].name === "content";
      if (!valid) issues.push(issue(path, "disclosure.slots_invalid", "Disclosure must contain trigger and content slots in order"));
      const trigger = node.children[0];
      if (trigger?.type === "slot" && containsInteractiveNode(trigger)) issues.push(issue(`${path}.children[0]`, "disclosure.trigger_interactive_invalid", "Disclosure triggers cannot contain interactive child nodes"));
    }
    if (node.type === "repeater") {
      const valid = node.children.length === 1 && node.children[0]?.type === "slot" && node.children[0].name === "item";
      if (!valid) issues.push(issue(path, "repeater.slot_invalid", "Repeater must contain one item slot"));
    }
    if (node.type === "overlay") {
      const valid = node.children.length === 2 && node.children[0]?.type === "slot" && node.children[0].name === "background" && node.children[1]?.type === "slot" && node.children[1].name === "content";
      if (!valid) issues.push(issue(path, "overlay.slots_invalid", "Overlay must contain Background and Content slots in order"));
    }
    if (node.type === "accordion" && node.children.length === 0) {
      issues.push(issue(path, "accordion.item_required", "Accordion must contain at least one Disclosure"));
    }
    if (node.type === "tabs" && node.children.length < 2) {
      issues.push(issue(path, "tabs.items_required", "Tabs must contain at least two Disclosures"));
    }
    if (node.type === "sidebar") {
      if (!node.children.length) issues.push(issue(path, "sidebar.item_required", "Sidebar must contain at least one panel"));
      if (node.children.filter(child => child.type === "disclosure" && child.defaultOpen).length > 1) issues.push(issue(path, "sidebar.default_invalid", "Sidebar can have only one default panel"));
      for (const child of node.children) {
        const trigger = child.type === "disclosure" && child.children.find(slot => slot.type === "slot" && slot.name === "trigger");
        if (!trigger || !sidebarTriggerHasName(trigger)) issues.push(issue(path, "sidebar.item_label_required", "Every sidebar item needs a visible text label or accessible image/icon label"));
      }
    }
    if (node.type === "grid" && node.children.length > 0 && node.children.every((child) => child.layout?.placement !== undefined) && node.children.some((child) => child.type === "repeater")) {
      issues.push(issue(path, "repeater.positioning_grid_unsupported", "Repeaters cannot be placed directly in a positioning grid"));
    }
    if ((node.type === "scroll-story" || node.type === "scroll-scene") && node.animation !== undefined) {
      issues.push(issue(`${path}.animation`, "scroll_story.animation_unsupported", "Scroll stories and scenes cannot use entrance animations"));
    }
    if ((node.type === "scroll-story" || node.type === "scroll-scene") && node.effects !== undefined && node.effects.length > 0) {
      issues.push(issue(`${path}.effects`, "scroll_story.effects_unsupported", "Scroll stories and scenes cannot use visual effects"));
    }
    if ((node.type === "scroll-story" || node.type === "scroll-scene") && node.style?.positioning !== undefined && Object.keys(node.style.positioning).length > 0) {
      issues.push(issue(`${path}.style.positioning`, "scroll_story.positioning_unsupported", "Scroll stories and scenes control their own positioning"));
    }
    if ((node.type === "scroll-story" || node.type === "scroll-scene") && node.responsive?.visibility !== undefined) {
      issues.push(issue(`${path}.responsive`, "scroll_story.responsive_unsupported", "Scroll stories and scenes cannot use responsive visibility"));
    }
    if (node.type === "scroll-story" && parentType !== "section") {
      issues.push(issue(path, "scroll_story.parent_invalid", "Scroll stories must be direct children of a Section"));
    }
    if (node.type === "scroll-scene" && parentType !== "scroll-story") {
      issues.push(issue(path, "scroll_scene.parent_invalid", "Scroll scenes must be direct children of a Scroll Story"));
    }
    if (node.type === "slot" && node.name === "stage" && parentType !== "scroll-story") {
      issues.push(issue(path, "slot.stage_parent_invalid", "Stage slots are only allowed inside a Scroll Story"));
    }
    if (node.type === "scroll-story") {
      const stage = node.children[0];
      const stageSlots = node.children.filter((child) => child.type === "slot" && child.name === "stage");
      const scenes = node.children.filter((child): child is ScrollSceneNode => child.type === "scroll-scene");
      const validStage = stage?.type === "slot" && stage.name === "stage";
      if (!validStage || stageSlots.length !== 1 || scenes.length !== node.children.length - 1) {
        issues.push(issue(path, "scroll_story.children_invalid", "A Scroll Story must contain one stage slot followed by only Scroll Scenes"));
      }
      if (scenes.length < 1 || scenes.length > SCROLL_STORY_LIMITS.maxScenes) {
        issues.push(issue(path, "scroll_story.scene_count_invalid", `A Scroll Story must contain between 1 and ${SCROLL_STORY_LIMITS.maxScenes} scenes`));
      }
      const totalLength = scenes.reduce((sum, scene) => sum + scene.length, 0);
      if (totalLength < SCROLL_STORY_LIMITS.minTotalLength || totalLength > SCROLL_STORY_LIMITS.maxTotalLength) {
        issues.push(issue(path, "scroll_story.total_length_invalid", "Scroll story scenes must total between 2 and 40 screens"));
      }
    }
    const childFormNames = node.type === "form" ? new Map<string, string>() : formNames;
    const childInsideRepeater = insideRepeater || node.type === "repeater";
    if ("children" in node) node.children.forEach((child, index) => visit(child, `${path}.children[${index}]`, node.type, childFormNames, childInsideRepeater));
  };
  visit(root, "$.root", null);
  for (const target of menuTargets) {
    if (nodeTypes.get(target.targetId) !== "menu-panel") issues.push(issue(target.path, "menu_toggle.target_invalid", "Menu toggle target must reference a Menu Panel in this document"));
  }
}

function containsInteractiveNode(node: ComponentNode): boolean {
  if (node.type === "button" || node.type === "link" || node.type === "disclosure" || node.type === "expandable-card" || node.type === "image-comparison" || node.type === "accordion" || node.type === "tabs" || node.type === "sidebar" || node.type === "theme-switcher" || node.type === "form" || isFormFieldNode(node)) return true;
  return "children" in node && node.children.some(containsInteractiveNode);
}

function requiredText(input: unknown, path: string, code: string, message: string, issues: ValidationIssue[]): string {
  if (typeof input !== "string" || input.trim().length === 0) {
    issues.push(issue(path, code, message));
    return "";
  }
  return input;
}

function parseOptionalText(input: unknown, path: string, code: string, message: string, issues: ValidationIssue[]): string | undefined {
  if (input === undefined) return undefined;
  if (typeof input !== "string" || input.trim().length === 0) {
    issues.push(issue(path, code, message));
    return undefined;
  }
  return input;
}

function parseOptionalIconId(input: unknown, path: string, issues: ValidationIssue[]) {
  if (input === undefined) return undefined;
  if (!isOzmishowIconId(input)) {
    issues.push(issue(path, "icon.id_invalid", "Icon ID is not supported"));
    return undefined;
  }
  return input;
}

function parseListItems(input: unknown, path: string, issues: ValidationIssue[]): string[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 100) {
    issues.push(issue(path, "list.items_required", "List requires between 1 and 100 items"));
    return [];
  }
  return input.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      issues.push(issue(`${path}[${index}]`, "list.item_required", "List items must contain text"));
      return "";
    }
    return item.trim();
  });
}

function parseOptionalAspectRatio(input: unknown, path: string, issues: ValidationIssue[]): ImageAspectRatio | undefined {
  if (input === undefined) return undefined;
  if (typeof input !== "string" || !IMAGE_ASPECT_RATIOS.includes(input as ImageAspectRatio)) {
    issues.push(issue(path, "aspect.ratio_invalid", "Aspect ratio is not one of the supported presets"));
    return undefined;
  }
  return input as ImageAspectRatio;
}

function parseClampedNumber(input: unknown, path: string, min: number, max: number, code: string, message: string, issues: ValidationIssue[]): number {
  if (typeof input !== "number" || Number.isFinite(input) === false || input < min || input > max) {
    issues.push(issue(path, code, message));
    return min;
  }
  return input;
}

function validVariantOptions<T extends string>(options: readonly T[], value: unknown): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function normalizeVariant<T extends string>(value: unknown, path: string, code: string, message: string, options: readonly T[], fallback: T, issues: ValidationIssue[]): T {
  if (value === undefined || !validVariantOptions(options, value)) {
    if (value !== undefined) issues.push(issue(path, code, message));
    return fallback;
  }
  return value;
}

function parseTableRows(input: unknown, path: string, issues: ValidationIssue[]): string[][] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 500) {
    issues.push(issue(path, "table.rows_required", "Table requires between 1 and 500 rows"));
    return [];
  }
  return input.map((row, index) => {
    if (!Array.isArray(row) || row.length === 0 || row.length > 40 || row.some((cell) => typeof cell !== "string")) {
      issues.push(issue(`${path}[${index}]`, "table.row_invalid", "Table rows must contain up to 40 text cells"));
      return [] as string[];
    }
    return row.map((cell: string) => cell.trim());
  });
}

function parseTimelineEntries(input: unknown, path: string, issues: ValidationIssue[]): TimelineEntry[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 100) {
    issues.push(issue(path, "timeline.entries_required", "Timeline requires between 1 and 100 entries"));
    return [];
  }
  return input.map((entry, index) => {
    if (!isRecord(entry) || typeof entry.title !== "string" || entry.title.trim().length === 0 || typeof entry.description !== "string" || entry.description.trim().length === 0) {
      issues.push(issue(`${path}[${index}]`, "timeline.entry_invalid", "Timeline entries require a title and description"));
      return { title: "", description: "" };
    }
    return { title: entry.title.trim(), description: entry.description.trim() };
  });
}

function parseChartBars(input: unknown, path: string, issues: ValidationIssue[]): BarChartBar[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 40) {
    issues.push(issue(path, "chart.bars_required", "Chart requires between 1 and 40 bars"));
    return [];
  }
  return input.map((bar, index) => {
    if (!isRecord(bar) || typeof bar.label !== "string" || bar.label.trim().length === 0 || typeof bar.value !== "number" || !Number.isFinite(bar.value) || bar.value < 0) {
      issues.push(issue(`${path}[${index}]`, "chart.bar_invalid", "Chart bars require a label and a non-negative number"));
      return { label: "", value: 0 };
    }
    return { label: bar.label.trim(), value: bar.value };
  });
}

function parseNumberList(input: unknown, path: string, issues: ValidationIssue[]): number[] {
  if (!Array.isArray(input) || input.length < 2 || input.length > 120) {
    issues.push(issue(path, "chart.points_required", "Sparkline requires between 2 and 120 points"));
    return [];
  }
  return input.map((value, index) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      issues.push(issue(`${path}[${index}]`, "chart.point_invalid", "Sparkline points must be numbers"));
      return 0;
    }
    return value;
  });
}

function parseHeadingLevel(input: unknown, path: string, issues: ValidationIssue[]): HeadingNode["level"] {
  if (typeof input !== "number" || !Number.isInteger(input) || input < 1 || input > 6) {
    issues.push(issue(`${path}.level`, "heading.level_invalid", "Heading level must be an integer from 1 through 6"));
    return 1;
  }
  return input as HeadingNode["level"];
}

function rejectUnknownKeys(input: Record<string, unknown>, allowed: readonly string[], path: string, code: string, issues: ValidationIssue[]): void {
  Object.keys(input).forEach((key) => {
    if (!allowed.includes(key)) issues.push(issue(`${path}.${key}`, code, "Field is not supported"));
  });
}

function isNodeType(input: unknown): input is NodeType {
  return typeof input === "string" && componentRegistry.has(input);
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

function issue(path: string, code: string, message: string): ValidationIssue {
  return { path, code, message };
}

function failure(path: string, code: string, message: string): ValidationResult<never> {
  return { success: false, issues: [issue(path, code, message)] };
}
