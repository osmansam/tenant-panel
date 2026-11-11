import type { SectionNode } from "../../../model";
import { isDesignPresetId } from "../../../model/designPresets";
import { configuredDesignPaletteStyle } from "../../../operations/designStyle";
import { useOptionalActiveTheme } from "../../../theme";
import type { SemanticRendererContext } from "../types";

export function SectionRenderer({ node, context }: { node: SectionNode; context: SemanticRendererContext }) {
  const theme = useOptionalActiveTheme();
  const palette = theme?.palette ?? (context.themeMode === "dark" ? "dark" : "light");
  return (
    <section
      className={[context.className, node.style?.background?.length ? "relative isolate" : ""].filter(Boolean).join(" ")}
      style={context.combineNodeStyles(node, isDesignPresetId(node.designPreset) ? configuredDesignPaletteStyle(node.designPreset, palette, node.designStyle) : undefined)}
      data-design-preset={node.designPreset}
    >{context.backgrounds}{context.renderStructuralChildren(node)}</section>
  );
}
