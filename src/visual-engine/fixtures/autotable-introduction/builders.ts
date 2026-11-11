import type {
  BackgroundToken,
  CodeNode,
  ColorToken,
  ComponentDocument,
  ComponentNode,
  StackNode,
  StyleSpec,
} from "../../model";
import { blocks, design } from "../professional/builders";

export const AUTOTABLE_PALETTE = {
  ink: "#17211B",
  ivory: "#FAF7EF",
  sage: "#E4EBE4",
  forest: "#28624F",
  amber: "#B8792C",
  slate: "#526057",
  mist: "#BBC5BB",
  parchment: "#F0ECE2",
} as const;

const TEXT_COLORS: Partial<Record<ColorToken, string>> = {
  text: AUTOTABLE_PALETTE.ink,
  "text-muted": AUTOTABLE_PALETTE.slate,
  "text-subtle": AUTOTABLE_PALETTE.slate,
  inverse: AUTOTABLE_PALETTE.ivory,
  "inverse-muted": AUTOTABLE_PALETTE.mist,
  primary: AUTOTABLE_PALETTE.forest,
  "primary-deep": AUTOTABLE_PALETTE.forest,
  "primary-soft": AUTOTABLE_PALETTE.forest,
  accent: AUTOTABLE_PALETTE.amber,
  "accent-soft": AUTOTABLE_PALETTE.amber,
};

const BACKGROUND_COLORS: Partial<Record<BackgroundToken, string>> = {
  surface: AUTOTABLE_PALETTE.ivory,
  "surface-muted": AUTOTABLE_PALETTE.sage,
  "surface-sunken": AUTOTABLE_PALETTE.parchment,
  primary: AUTOTABLE_PALETTE.forest,
  "primary-deep": AUTOTABLE_PALETTE.ink,
  "primary-soft": AUTOTABLE_PALETTE.sage,
  accent: AUTOTABLE_PALETTE.amber,
  "accent-soft": AUTOTABLE_PALETTE.parchment,
  text: AUTOTABLE_PALETTE.ink,
  "text-muted": AUTOTABLE_PALETTE.slate,
  "text-subtle": AUTOTABLE_PALETTE.mist,
  inverse: AUTOTABLE_PALETTE.ivory,
  "inverse-muted": AUTOTABLE_PALETTE.mist,
};

function baseTextToken(token: ColorToken | undefined): ColorToken | undefined {
  if (token === "primary" || token === "primary-deep" || token === "primary-soft") return "accent";
  return token;
}

function baseBackgroundToken(token: BackgroundToken | undefined): BackgroundToken | undefined {
  if (token === "primary" || token === "primary-deep") return "text";
  if (token === "primary-soft") return "surface-muted";
  if (token === "gradient-primary" || token === "gradient-hero") return "text";
  if (token === "gradient-surface") return "surface";
  return token;
}

function paletteStyle(style: StyleSpec | undefined): StyleSpec | undefined {
  if (style === undefined) return undefined;
  const textToken = style.color?.text;
  const backgroundToken = style.color?.background;
  const textColor = textToken === undefined ? undefined : TEXT_COLORS[textToken];
  const backgroundColor = backgroundToken === undefined ? undefined : BACKGROUND_COLORS[backgroundToken];
  const borderToken = style.border?.color;

  return {
    ...style,
    color: style.color === undefined ? undefined : {
      ...style.color,
      text: baseTextToken(textToken),
      background: baseBackgroundToken(backgroundToken),
    },
    textPaint: textColor === undefined
      ? style.textPaint
      : { kind: "custom", value: textColor },
    background: backgroundColor === undefined || backgroundToken === "transparent"
      ? style.background
      : [{ kind: "solid", color: { kind: "custom", value: backgroundColor } }],
    border: style.border === undefined ? undefined : {
      ...style.border,
      color: borderToken === undefined || borderToken === "transparent"
        ? borderToken
        : "accent-soft",
    },
  };
}

function applyAutotablePalette(node: ComponentNode): void {
  node.style = paletteStyle(node.style);
  if (node.effects !== undefined) {
    node.effects = node.effects.map((effect) => effect.effectId === "ozmishow.text.shimmer"
      ? {
          ...effect,
          props: {
            ...effect.props,
            color: node.type === "heading" ? AUTOTABLE_PALETTE.ivory : AUTOTABLE_PALETTE.amber,
            highlight: node.type === "heading" ? AUTOTABLE_PALETTE.amber : AUTOTABLE_PALETTE.ivory,
          },
        }
      : effect);
  }
  if ("children" in node) node.children.forEach(applyAutotablePalette);
}

export const AUTOTABLE_SCREENSHOT_NODE_IDS = {
  tenantPanel: "autotable-introduction-tenant-panel-screenshot",
  ozmishow: "autotable-introduction-ozmishow-screenshot",
} as const;

export function compactDesign(
  id: string,
  name: string,
  build: (builder: ReturnType<typeof blocks>) => ComponentNode[],
  dark = false,
): ComponentDocument {
  const document = design(id, name, build, dark);
  document.root.style = {
    ...document.root.style,
    custom: { ...document.root.style?.custom, padding: "4vw" },
  };

  const shell = document.root.children[0];
  if (shell?.type === "stack") {
    shell.style = {
      ...shell.style,
      custom: { ...shell.style?.custom, gap: "1.5rem" },
    };
  }

  applyAutotablePalette(document.root);

  return document;
}

export function codeBlock(
  id: string,
  code: string,
  language = "http",
): CodeNode {
  return {
    id,
    type: "code",
    code,
    language,
    showLanguage: true,
    showCopy: true,
    wrap: false,
  };
}

export function screenshotFrame(options: {
  id: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
}): StackNode {
  return {
    id: `${options.id}-frame`,
    type: "stack",
    direction: "column",
    alignment: "stretch",
    distribution: "start",
    wrap: false,
    gap: "sm",
    style: {
      color: { background: "surface-sunken", text: "text" },
      border: {
        radius: "xl",
        width: "hairline",
        color: "text-subtle",
        shadow: "lg",
      },
      spacing: { padding: "sm" },
    },
    children: [
      {
        id: `${options.id}-chrome`,
        type: "flex",
        direction: "row",
        alignment: "center",
        distribution: "between",
        wrap: true,
        gap: "sm",
        children: [
          {
            id: `${options.id}-label`,
            type: "text",
            text: options.label,
            style: {
              color: { text: "text" },
              typography: { size: "sm", weight: "semibold" },
            },
          },
          {
            id: `${options.id}-status`,
            type: "text",
            text: "EDITABLE PREVIEW",
            style: {
              color: { text: "primary" },
              typography: { size: "sm", weight: "semibold", tracking: "wide" },
            },
          },
        ],
      },
      {
        id: options.id,
        type: "image",
        src: options.src,
        alt: options.alt,
        aspectRatio: "wide",
        objectFit: "contain",
        style: {
          sizing: { width: "full" },
          color: { background: "surface" },
          border: { radius: "lg", width: "hairline", color: "text-subtle" },
        },
      },
      {
        id: `${options.id}-caption`,
        type: "text",
        text: options.caption,
        style: {
          color: { text: "text-muted" },
          typography: { size: "sm", leading: "snug" },
        },
      },
    ],
  };
}
