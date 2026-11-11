import type { CSSProperties, ReactNode } from "react";
import type { Breakpoint, ComponentNode, StructuralNode } from "../../model";
import type { NodePatch } from "../../operations";
import type { InlineEditTarget } from "../../renderer/InlineTextEditor";
import type { VisualSiteContext } from "../../renderer/siteContext";
import type { ThemeMode } from "../../theme";

export interface RenderNodeOptions { readonly imagePriority?: false }

export interface SemanticRendererContext {
  readonly imagePriority?: boolean;
  readonly mode: "preview" | "canvas";
  readonly reducedMotion?: boolean;
  readonly breakpoint?: Breakpoint;
  readonly className: string;
  readonly responsiveChildGapClassName?: string;
  readonly backgrounds: ReactNode;
  readonly disclosurePreview?: Record<string, "default" | "open" | "closed">;
  readonly interactiveDisclosures?: boolean;
  readonly interactiveExpansions?: boolean;
  readonly site?: VisualSiteContext;
  readonly themeMode?: ThemeMode;
  readonly currentNode: ComponentNode;
  onHostAction?(): void;
  readonly hostActionState?: { hidden?: boolean; disabled?: boolean; reason?: string };
  /** True when this node is the current canvas selection. */
  readonly canvasSelected?: boolean;
  readonly selectedNodeId?: string;
  /** Canvas inline text editing: id of the node currently being edited (null/undefined when none). */
  readonly inlineEditingNodeId?: string | null;
  /** Field target being edited (null/undefined for the node's default single text field). */
  readonly inlineEditingTarget?: InlineEditTarget | null;
  onInlineTextCommit?(nodeId: string, value: string, target?: InlineEditTarget): void;
  onInlineTextCancel?(nodeId: string): void;
  onInlineTextEditStart?(nodeId: string, target?: InlineEditTarget): void;
  /** Applies a structural patch to a node from an on-canvas control. */
  onNodePatch?(nodeId: string, patch: NodePatch): void;
  /** Selects a node from an interactive on-canvas control. */
  onSelect?(nodeId: string): void;
  isMenuPanelOpen(nodeId: string): boolean;
  toggleMenuPanel(nodeId: string): void;
  combineNodeStyles(node: ComponentNode, extra?: CSSProperties): CSSProperties | undefined;
  renderNode(node: ComponentNode, instanceKey?: string, options?: RenderNodeOptions): ReactNode;
  renderPreviewNode(node: ComponentNode, instanceKey?: string, options?: RenderNodeOptions): ReactNode;
  renderStructuralChildren(node: StructuralNode): ReactNode;
  renderDisclosure(
    node: Extract<ComponentNode, { type: "disclosure" }>,
    open?: boolean,
    onOpenChange?: (open: boolean) => void,
    forcedState?: "default" | "open" | "closed",
  ): ReactNode;
  renderTabs(node: Extract<ComponentNode, { type: "tabs" | "sidebar" }>): ReactNode;
}

export type ComponentRenderer<TType extends ComponentNode["type"] = ComponentNode["type"]> = (
  node: Extract<ComponentNode, { type: TType }>,
  context: SemanticRendererContext,
) => ReactNode;

export type ComponentRendererMap = {
  readonly [TType in ComponentNode["type"]]: ComponentRenderer<TType>;
};
