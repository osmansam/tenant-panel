import type { ConditionalColorRule } from "./conditionalColors";
import type { AnimationSpec } from "./animation";
import type { BreakpointValue, ChildLayoutSpec, ResponsiveSpec } from "./responsive";
import type { SpacingToken, StyleSpec } from "./styles";
import type { MediaLayoutSpec } from "./mediaLayout";
import type { ColorValue } from "./paint";
import type { EffectAttachment, JsonObject } from "./effects";
import type { OzmishowIconId } from "./icons";
import type { DesignPresetId } from "./designPresets";
import type { DesignStyleOptions } from "./designStyle";

export type NodeType =
  | "section"
  | "grid"
  | "stack"
  | "flex"
  | "slot"
  | "disclosure"
  | "accordion"
  | "tabs"
  | "sidebar"
  | "infinite-slider"
  | "scroll-story"
  | "scroll-scene"
  | "repeater"
  | "card"
  | "expandable-card"
  | "overlay"
  | "form"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "heading"
  | "text"
  | "code"
  | "image"
  | "image-comparison"
  | "button"
  | "icon"
  | "badge"
  | "link"
  | "avatar"
  | "list"
  | "stat"
  | "rating"
  | "quote"
  | "divider"
  | "video"
  | "audio"
  | "embed"
  | "table"
  | "progress"
  | "steps"
  | "timeline"
  | "alert"
  | "tags"
  | "kbd"
  | "bar-chart"
  | "sparkline"
  | "site-logo"
  | "site-name"
  | "navigation-menu"
  | "language-switcher"
  | "theme-switcher"
  | "menu-toggle"
  | "menu-panel"
  | "footer-links"
  | "copyright";
const CHILD_GAP_TYPES: ReadonlySet<NodeType> = new Set(["section", "grid", "stack", "flex", "card", "form"]);

export function supportsChildGap(type: NodeType): boolean {
  return CHILD_GAP_TYPES.has(type);
}

export function usesFlexChildGap(type: NodeType): boolean {
  return type === "section" || type === "form";
}

export type LayoutDirection = "row" | "column";
export type LayoutAlignment = "start" | "center" | "end" | "stretch";
export type LayoutDistribution =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export interface LayoutContainerFields {
  direction: LayoutDirection;
  alignment: LayoutAlignment;
  distribution: LayoutDistribution;
  wrap: boolean;
  gap: SpacingToken;
}
export interface NodeBase {
  id: string;

  style?: StyleSpec;

  responsive?: ResponsiveSpec;

  layout?: ChildLayoutSpec;

  animation?: AnimationSpec;

  effects?: EffectAttachment[];

  bindings?: NodeBindings;

  conditionalColors?: ConditionalColorRule[];

  /** Optional destination when this node is an immediate infinite-slider child. */
  slideLink?: SlideLink;
}

export interface SlideLink {
  href: string;
  openInNewTab?: boolean;
  accessibleLabel?: string;
}

export type BindableProperty = "text" | "src" | "alt" | "label" | "href" | "fallback" | "accessibleLabel" | "quote" | "author" | "role" | "value" | "prefix" | "suffix" | "avatarSrc" | "avatarAlt";
export interface FieldBinding {
  source: "item";
  path: string[];
}
export type NodeBindings = Partial<Record<BindableProperty, FieldBinding>>;

export interface SectionNode extends NodeBase {
  type: "section";
  designPreset?: DesignPresetId;
  designStyle?: DesignStyleOptions;
  children: ComponentNode[];
}

export interface GridNode extends NodeBase {
  type: "grid";
  columns: 12;
  children: ComponentNode[];
  mediaLayout?: MediaLayoutSpec;
}

export interface StackNode extends NodeBase, LayoutContainerFields {
  type: "stack";
  children: ComponentNode[];
}

export interface FlexNode extends NodeBase, LayoutContainerFields {
  type: "flex";
  children: ComponentNode[];
}

export type SlotName = "trigger" | "content" | "item" | "background" | "stage" | "preview" | "details";
export interface SlotNode extends NodeBase {
  type: "slot";
  name: SlotName;
  children: ComponentNode[];
}

export type DisclosureTransition = "none" | "height-fade";
export interface DisclosureNode extends NodeBase {
  type: "disclosure";
  defaultOpen: boolean;
  transition: DisclosureTransition;
  children: ComponentNode[];
}

export interface AccordionNode extends NodeBase {
  type: "accordion";
  openMode: "single" | "multiple";
  collapsible: boolean;
  children: ComponentNode[];
}

export interface TabsNode extends NodeBase {
  type: "tabs";
  children: ComponentNode[];
}

export interface SidebarNode extends NodeBase {
  type: "sidebar";
  accessibleLabel: string;
  navigationWidth: number;
  children: ComponentNode[];
}

export interface InfiniteSliderNode extends NodeBase {
  type: "infinite-slider";
  accessibleLabel: string;
  autoPlay: boolean;
  speed: number;
  direction: "left" | "right";
  slideWidth: number;
  gap: number;
  pauseOnHover: boolean;
  fadeEdges: boolean;
  centerEmphasis: boolean;
  children: ComponentNode[];
}

export const COLLECTION_FILTER_OPERATORS = ["eq", "in", "gt", "gte", "lt", "lte"] as const;
export type CollectionFilterOperator = typeof COLLECTION_FILTER_OPERATORS[number];

export interface CollectionFilter {
  field: string;
  operator: CollectionFilterOperator;
  value: string | number | boolean | null | Array<string | number | boolean | null>;
}
export interface CollectionSort {
  field: string;
  direction: "asc" | "desc";
}
export interface AutoTableCollectionSource {
  requestSlot?: string;
  kind: "autotable";
  schemaName: string;
  filters?: CollectionFilter[];
  sort?: CollectionSort[];
  limit: number;
}
export interface RepeaterItemsLayout {
  columns: BreakpointValue<number>;
  gap: BreakpointValue<number>;
  alignment: "stretch" | "start" | "center" | "end";
}
export interface RepeaterNode extends NodeBase {
  type: "repeater";
  source: AutoTableCollectionSource;
  itemAlias: string;
  /** Absent on legacy documents: repeated instances follow their parent layout. */
  itemsLayout?: RepeaterItemsLayout;
  children: ComponentNode[];
}

export type CardElement = "div" | "article";
export interface CardNode extends NodeBase {
  type: "card";
  element: CardElement;
  children: ComponentNode[];
}

export interface ExpandableCardNode extends NodeBase {
  type: "expandable-card";
  accessibleLabel: string;
  closeLabel: string;
  children: ComponentNode[];
}

export const OVERLAY_ALIGNMENTS = ["top-start", "top-center", "top-end", "center-start", "center", "center-end", "bottom-start", "bottom-center", "bottom-end"] as const;
export type OverlayAlignment = (typeof OVERLAY_ALIGNMENTS)[number];
export type OverlayMobileFallback = "stack" | "overlay";
export interface OverlayTint { color: ColorValue; opacity: number }
export interface OverlayNode extends NodeBase {
  type: "overlay";
  alignment: OverlayAlignment;
  inset: SpacingToken;
  tint?: OverlayTint;
  mobileFallback: OverlayMobileFallback;
  children: ComponentNode[];
}

export type FormMethod = "get" | "post";
export interface FormNode extends NodeBase {
  type: "form";
  action: string;
  method: FormMethod;
  successMessage: string;
  children: ComponentNode[];
}

export const INPUT_TYPES = ["text", "email", "tel", "number", "date"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
export interface InputNode extends NodeBase {
  type: "input";
  fieldName: string;
  label: string;
  inputType: InputType;
  placeholder?: string;
  required: boolean;
}

export interface TextareaNode extends NodeBase {
  type: "textarea";
  fieldName: string;
  label: string;
  placeholder?: string;
  required: boolean;
  rows: number;
}

export interface SelectOption { value: string; label: string }
export interface SelectNode extends NodeBase {
  type: "select";
  fieldName: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options: SelectOption[];
}

export interface CheckboxNode extends NodeBase {
  type: "checkbox";
  fieldName: string;
  label: string;
  value: string;
  required: boolean;
  checkedByDefault: boolean;
}

export interface HeadingNode extends NodeBase {
  type: "heading";
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextNode extends NodeBase {
  type: "text";
  text: string;
}

export interface CodeNode extends NodeBase {
  type: "code";
  code: string;
  language: string;
  showLanguage: boolean;
  showCopy: boolean;
  wrap: boolean;
}

export const IMAGE_ASPECT_RATIOS = ["original", "square", "landscape", "wide", "portrait"] as const;
export type ImageAspectRatio = (typeof IMAGE_ASPECT_RATIOS)[number];

export const IMAGE_OBJECT_FITS = ["cover", "contain"] as const;
export type ImageObjectFit = (typeof IMAGE_OBJECT_FITS)[number];

export interface ImageNode extends NodeBase {
  type: "image";

  src: string;

  alt: string;

  aspectRatio?: ImageAspectRatio;

  objectFit?: ImageObjectFit;
}

export const IMAGE_COMPARISON_ASPECT_RATIOS = ["wide", "landscape", "square", "portrait"] as const;
export interface ImageComparisonNode extends NodeBase {
  type: "image-comparison";
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  accessibleLabel: string;
  position: number;
  showLabels: boolean;
  aspectRatio: (typeof IMAGE_COMPARISON_ASPECT_RATIOS)[number];
  objectFit: ImageObjectFit;
}

export interface HostActionSpec { name: string; config: JsonObject }
export interface ButtonNode extends NodeBase {
  type: "button";

  label: string;

  href?: string;

  iconId?: OzmishowIconId;
  iconPosition?: IconPosition;
  openInNewTab?: boolean;
  accessibleLabel?: string;
  submit?: boolean;
  action?: HostActionSpec;
}

export type IconPosition = "start" | "end";

export interface IconNode extends NodeBase {
  type: "icon";
  iconId: OzmishowIconId;
  size: number;
  decorative: boolean;
  accessibleLabel?: string;
}

export interface BadgeNode extends NodeBase { type: "badge"; text: string }

export interface LinkNode extends NodeBase {
  type: "link";
  label: string;
  href: string;
  openInNewTab: boolean;
  accessibleLabel?: string;
}

export interface AvatarNode extends NodeBase {
  type: "avatar";
  src: string;
  alt: string;
  fallback: string;
}

export const LIST_MARKERS = ["bullet", "number", "check", "icon", "none"] as const;
export type ListMarker = (typeof LIST_MARKERS)[number];
export interface ListNode extends NodeBase {
  type: "list";
  items: string[];
  marker: ListMarker;
  iconId?: OzmishowIconId;
}

export interface StatNode extends NodeBase {
  type: "stat";
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface RatingNode extends NodeBase {
  type: "rating";
  value: number;
  max: number;
  showValue: boolean;
  accessibleLabel: string;
}

export interface QuoteNode extends NodeBase {
  type: "quote";
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface DividerNode extends NodeBase {
  type: "divider";
}

export interface VideoNode extends NodeBase {
  type: "video";
  src: string;
  title: string;
  poster?: string;
  aspectRatio?: ImageAspectRatio;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const SCROLL_STORY_TRANSITIONS = ["fade", "slide-up", "none"] as const;
export type ScrollStoryTransition = (typeof SCROLL_STORY_TRANSITIONS)[number];

export const SCROLL_STORY_MOBILE_MODES = ["stack", "scrub"] as const;
export type ScrollStoryMobileMode = (typeof SCROLL_STORY_MOBILE_MODES)[number];

export const SCROLL_STORY_LAYOUTS = ["background", "split-right"] as const;
export type ScrollStoryLayout = (typeof SCROLL_STORY_LAYOUTS)[number];

export const SCROLL_SCENE_MEDIA_KINDS = ["none", "image", "video", "sequence"] as const;
export type ScrollSceneMediaKind = (typeof SCROLL_SCENE_MEDIA_KINDS)[number];

export interface ScrollSceneNoMedia {
  kind: "none";
}

export interface ScrollSceneImageMedia {
  kind: "image";
  src: string;
  alt: string;
  objectFit?: ImageObjectFit;
}

export interface ScrollSceneVideoMedia {
  kind: "video";
  src: string;
  poster: string;
  title: string;
  trimStart?: number;
  trimEnd?: number;
  objectFit?: ImageObjectFit;
}

export interface ScrollSceneSequenceMedia {
  kind: "sequence";
  frames: string[];
  poster: string;
  alt: string;
  objectFit?: ImageObjectFit;
}

export type ScrollSceneMedia = ScrollSceneNoMedia | ScrollSceneImageMedia | ScrollSceneVideoMedia | ScrollSceneSequenceMedia;

export interface ScrollStoryNode extends NodeBase {
  type: "scroll-story";
  transition: ScrollStoryTransition;
  mobileMode: ScrollStoryMobileMode;
  sceneLayout: ScrollStoryLayout;
  showProgress: boolean;
  accessibleLabel?: string;
  children: ComponentNode[];
}

export interface ScrollSceneNode extends NodeBase {
  type: "scroll-scene";
  length: number;
  media: ScrollSceneMedia;
  children: ComponentNode[];
}

export const SCROLL_STORY_LIMITS = {
  maxScenes: 12,
  minSceneLength: 0.5,
  maxSceneLength: 5,
  minTotalLength: 2,
  maxTotalLength: 40,
  minSequenceFrames: 2,
  maxSequenceFrames: 120,
} as const;

export interface AudioNode extends NodeBase {
  type: "audio";
  src: string;
  accessibleLabel: string;
  autoplay?: boolean;
  loop?: boolean;
}

export type EmbedLoading = "lazy" | "eager";

export interface EmbedNode extends NodeBase {
  type: "embed";
  src: string;
  title: string;
  aspectRatio?: ImageAspectRatio;
  loading?: EmbedLoading;
}

export interface TableNode extends NodeBase {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ProgressNode extends NodeBase {
  type: "progress";
  value: number;
  label?: string;
  showValue: boolean;
  accentColor?: ColorValue;
}

export interface StepsNode extends NodeBase {
  type: "steps";
  items: string[];
  current: number;
}

export interface TimelineEntry {
  title: string;
  description: string;
}

export interface TimelineNode extends NodeBase {
  type: "timeline";
  entries: TimelineEntry[];
}

export const ALERT_VARIANTS = ["info", "success", "warning", "danger"] as const;
export type AlertVariant = (typeof ALERT_VARIANTS)[number];
export interface AlertNode extends NodeBase {
  type: "alert";
  body: string;
  variant: AlertVariant;
  title?: string;
}

export interface TagsNode extends NodeBase {
  type: "tags";
  items: string[];
}

export interface KbdNode extends NodeBase {
  type: "kbd";
  keys: string[];
}

export interface BarChartBar {
  label: string;
  value: number;
}

export interface BarChartNode extends NodeBase {
  type: "bar-chart";
  bars: BarChartBar[];
  showValues: boolean;
  accentColor?: ColorValue;
}

export interface SparklineNode extends NodeBase {
  type: "sparkline";
  points: number[];
  ariaLabel: string;
  showArea?: boolean;
  accentColor?: ColorValue;
}

export interface SiteLogoNode extends NodeBase { type: "site-logo" }
export interface SiteNameNode extends NodeBase { type: "site-name" }
export interface NavigationMenuNode extends NodeBase {
  type: "navigation-menu";
  orientation: "horizontal" | "vertical";
  showChildren: boolean;
  activeColor?: string;
  hoverColor?: string;
}
export interface LanguageSwitcherNode extends NodeBase { type: "language-switcher" }
export interface ThemeSwitcherNode extends NodeBase {
  type: "theme-switcher";
  presentation: "segmented" | "select";
  labels: {
    light: string;
    dark: string;
    system: string;
  };
  accessibleLabel: string;
}
export interface MenuToggleNode extends NodeBase {
  type: "menu-toggle";
  label: string;
  targetId: string;
}
export interface MenuPanelNode extends NodeBase {
  type: "menu-panel";
  children: ComponentNode[];
}
export interface FooterLinksNode extends NodeBase { type: "footer-links"; activeColor?: string; hoverColor?: string }
export interface CopyrightNode extends NodeBase { type: "copyright" }

export type StructuralNode = SectionNode | GridNode | StackNode | FlexNode | SlotNode | DisclosureNode | AccordionNode | TabsNode | SidebarNode | InfiniteSliderNode | ScrollStoryNode | ScrollSceneNode | RepeaterNode | CardNode | ExpandableCardNode | OverlayNode | FormNode | MenuPanelNode;

export type FormFieldNode = InputNode | TextareaNode | SelectNode | CheckboxNode;
export function isFormFieldNode(node: ComponentNode): node is FormFieldNode {
  return node.type === "input" || node.type === "textarea" || node.type === "select" || node.type === "checkbox";
}

export type ComponentNode =
  | StructuralNode
  | HeadingNode
  | TextNode
  | CodeNode
  | ImageNode
  | ImageComparisonNode
  | ButtonNode
  | IconNode
  | BadgeNode
  | LinkNode
  | AvatarNode
  | ListNode
  | StatNode
  | RatingNode
  | QuoteNode
  | InputNode
  | TextareaNode
  | SelectNode
  | CheckboxNode
  | DividerNode
  | VideoNode
  | AudioNode
  | EmbedNode
  | TableNode
  | ProgressNode
  | StepsNode
  | TimelineNode
  | AlertNode
  | TagsNode
  | KbdNode
  | BarChartNode
  | SparklineNode
  | SiteLogoNode
  | SiteNameNode
  | NavigationMenuNode
  | LanguageSwitcherNode
  | ThemeSwitcherNode
  | MenuToggleNode
  | FooterLinksNode
  | CopyrightNode;
