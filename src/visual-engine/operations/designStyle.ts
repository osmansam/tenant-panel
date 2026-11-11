import type { ComponentDocument, ComponentNode, StyleSpec } from "../model";
import type { DesignPresetId } from "../model/designPresets";
import { DESIGN_PALETTE_IDS, parseDesignStyleOptions, type DesignPaletteId, type DesignStyleOptions } from "../model/designStyle";
import type { ThemePaletteName } from "../theme/types";
import { applyDesignPreset, designPresetPaletteStyle } from "./designPreset";

export const DESIGN_PALETTES: readonly { id: DesignPaletteId; name: string }[] = DESIGN_PALETTE_IDS.map(id => ({ id, name: id[0].toUpperCase() + id.slice(1) }));

// Each colorway has a deep ink and a light tint, shared across related semantic roles.
const colorways: Record<Exclude<DesignPaletteId, "original">, { ink: string; tint: string; accent: string; accentTint: string }> = {
  ocean: { ink: "#155e75", tint: "#a5e0ed", accent: "#234e91", accentTint: "#b7d3ff" },
  forest: { ink: "#285c3c", tint: "#b3d9ae", accent: "#635620", accentTint: "#ded39c" },
  plum: { ink: "#70376f", tint: "#dfb6df", accent: "#593b8b", accentTint: "#cdbaf4" },
  ember: { ink: "#963e21", tint: "#f3be95", accent: "#8a5121", accentTint: "#efd097" },
  rose: { ink: "#973952", tint: "#f2b5c8", accent: "#793c63", accentTint: "#e6b9d9" },
  slate: { ink: "#3c5067", tint: "#c2d0df", accent: "#445e66", accentTint: "#bad7da" },
};

function mix(a: string, b: string, weight: number): string {
  const channels = [0, 1, 2].map(index => Math.round(parseInt(a.slice(1 + index * 2, 3 + index * 2), 16) * (1 - weight) + parseInt(b.slice(1 + index * 2, 3 + index * 2), 16) * weight).toString(16).padStart(2, "0"));
  return `#${channels.join("")}`;
}

/** Only the owning section receives these variables; explicit semantic overrides win. */
export function configuredDesignPaletteStyle(preset: DesignPresetId, mode: ThemePaletteName, options: DesignStyleOptions = {}): Record<`--theme-${string}`, string> {
  const parsed = parseDesignStyleOptions(options);
  const settings = parsed.success ? parsed.value : {};
  const base = designPresetPaletteStyle(preset, mode);
  const palette = settings.palette ?? "original";
  if (palette !== "original") {
    const colors = colorways[palette], light = mode === "light";
    const primary = light ? colors.ink : colors.tint;
    const accent = light ? colors.accent : colors.accentTint;
    const paper = light ? "#ffffff" : "#111820";
    const background = mix(paper, light ? colors.ink : colors.tint, light ? .025 : .035);
    const surface = mix(paper, light ? colors.ink : colors.tint, light ? .008 : .085);
    const mutedSurface = mix(paper, light ? colors.ink : colors.tint, light ? .09 : .15);
    Object.assign(base, {
      "--theme-background": background,
      "--theme-surface": surface,
      "--theme-surface-muted": mutedSurface,
      "--theme-surface-sunken": mix(paper, colors.ink, light ? .045 : .1),
      "--theme-text": light ? "#18212b" : "#f3f6fa",
      "--theme-text-muted": light ? "#4a5563" : "#becbd9",
      "--theme-text-subtle": light ? "#606c7b" : "#a9b7c6",
      "--theme-primary": primary,
      "--theme-primary-foreground": light ? "#ffffff" : "#111820",
      "--theme-primary-deep": mix(primary, light ? "#000000" : colors.ink, .2),
      "--theme-primary-soft": mix(paper, primary, light ? .12 : .19),
      "--theme-secondary": mutedSurface,
      "--theme-secondary-foreground": light ? "#18212b" : "#f3f6fa",
      "--theme-accent": accent,
      "--theme-accent-foreground": light ? "#ffffff" : "#111820",
      "--theme-accent-soft": mix(paper, accent, light ? .12 : .19),
      "--theme-border": mix(paper, primary, light ? .24 : .3),
      "--theme-input": mix(paper, primary, light ? .24 : .3),
      "--theme-ring": primary,
      "--theme-inverse": light ? "#ffffff" : "#111820",
      "--theme-inverse-muted": light ? "#dce4ed" : "#283340",
    });
  }
  for (const [token, color] of Object.entries(settings.colors?.[mode] ?? {})) base[`--theme-${token}`] = color;
  return base;
}

function clearPadding<T extends { spacing?: StyleSpec["spacing"]; custom?: StyleSpec["custom"] }>(style: T): T {
  const result = { ...style };
  if (style.spacing) {
    const { padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft, ...spacing } = style.spacing;
    result.spacing = spacing;
  }
  if (style.custom) {
    const { padding, paddingTop, paddingRight, paddingBottom, paddingLeft, ...custom } = style.custom;
    result.custom = custom;
  }
  return result;
}

/** Writes selected settings into normal inspector styles and retains portable palette options. */
export function applyConfiguredDesign(document: ComponentDocument, preset: DesignPresetId, options: DesignStyleOptions = {}, preserveExistingStyles = false): ComponentDocument {
  const parsed = parseDesignStyleOptions(options);
  if (!parsed.success) throw new TypeError("Invalid design style options.");
  const settings = parsed.value;
  const previous = document.root.designStyle ?? {};
  const preserve = preserveExistingStyles && document.root.designPreset === preset;
  const base = preserve ? document : applyDesignPreset(document, preset);
  const edits = { ...settings };
  if (preserve) {
    for (const key of ["headingFont", "bodyFont", "headingSize", "bodySize", "headingWeight", "bodyLeading", "buttonRadius", "cardRadius", "shadow", "borderWidth", "buttonPadding", "cardPadding"] as const) {
      if (settings[key] === previous[key]) delete edits[key];
    }
  } else {
    // A reset only replaces internal padding previously owned by this configuration.
    if (settings.buttonPadding === undefined && previous.buttonPadding !== undefined) edits.buttonPadding = "md";
    if (settings.cardPadding === undefined && previous.cardPadding !== undefined) edits.cardPadding = "lg";
  }
  const visit = (node: ComponentNode): ComponentNode => {
    const result = { ...node };
    if (!["code", "kbd", "image", "image-comparison", "video", "audio", "embed"].includes(node.type)) {
      let style: StyleSpec = { ...node.style };
      const typography = { ...style.typography };
      if (node.type === "heading") {
        if (edits.headingFont !== undefined) typography.family = edits.headingFont;
        if (edits.headingSize !== undefined) typography.size = edits.headingSize;
        if (edits.headingWeight !== undefined) typography.weight = edits.headingWeight;
      } else {
        if (edits.bodyFont !== undefined) typography.family = edits.bodyFont;
        if (edits.bodySize !== undefined) typography.size = edits.bodySize;
        if (edits.bodyLeading !== undefined) typography.leading = edits.bodyLeading;
      }
      style.typography = typography;
      if (node.type === "button" || node.type === "card" || node.type === "expandable-card") {
        const button = node.type === "button";
        const radius = button ? edits.buttonRadius : edits.cardRadius;
        const padding = button ? edits.buttonPadding : edits.cardPadding;
        const border = { ...style.border };
        if (radius !== undefined) {
          delete border.topLeftRadius; delete border.topRightRadius;
          delete border.bottomLeftRadius; delete border.bottomRightRadius;
          border.radius = radius;
        }
        if (edits.shadow !== undefined) border.shadow = edits.shadow;
        if (edits.borderWidth !== undefined) border.width = edits.borderWidth;
        style.border = border;
        if (style.custom && (radius !== undefined || edits.borderWidth !== undefined)) {
          style.custom = { ...style.custom };
          if (radius !== undefined) delete style.custom.borderRadius;
          if (edits.borderWidth !== undefined) delete style.custom.borderWidth;
        }
        if (padding !== undefined) {
          style = clearPadding(style);
          style.spacing = { ...style.spacing, padding };
          if (node.responsive?.spacing) {
            const spacing = { ...node.responsive.spacing };
            for (const breakpoint of ["mobile", "tablet", "desktop"] as const) if (spacing[breakpoint]) spacing[breakpoint] = clearPadding(spacing[breakpoint]!);
            result.responsive = { ...node.responsive, spacing };
          }
        }
      }
      result.style = style;
    }
    if ("children" in result) result.children = result.children.map(visit);
    return result;
  };
  const root = visit(base.root) as ComponentDocument["root"];
  root.designStyle = settings;
  return { ...base, root };
}
