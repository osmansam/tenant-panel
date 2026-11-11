import type { ComponentDocument } from "../model";
import { REACT_BITS_SHOWCASE_DOCUMENT } from "./reactBitsShowcase";

interface BackgroundStarter {
  id: string;
  name: string;
  effectId: string;
  props: Record<string, string | number | boolean>;
}

const BACKGROUND_STARTERS: BackgroundStarter[] = [
  {
    id: "react-bits-showcase",
    name: "React Bits background lab",
    effectId: "reactbits.background.threads",
    props: { colorA: "#ffffff", amplitude: 1, distance: 0, enableMouseInteraction: true },
  },

];

function createStarter(starter: BackgroundStarter): ComponentDocument {
  const document = structuredClone(REACT_BITS_SHOWCASE_DOCUMENT);
  document.id = starter.id;
  document.name = starter.name;
  document.root.style = {
    ...document.root.style,
    sizing: { ...document.root.style?.sizing, height: "opening-screen" },
  };
  document.root.effects = [{
    attachmentId: `${starter.id}-background`,
    effectId: starter.effectId,
    version: 1,
    enabled: true,
    props: starter.props,
  }];
  const shell = document.root.children[0];
  if (shell?.type === "stack") {
    const content = shell.children.find((child) => child.id === "reactbits-content");
    if (content) {
      const { direction: _direction, alignment: _alignment, distribution: _distribution, wrap: _wrap, gap: _gap, ...common } = shell;
      document.root.children[0] = {
        ...common,
        type: "grid",
        columns: 12,
        style: { ...shell.style, sizing: { ...shell.style?.sizing, height: "full" } },
        children: [{
          ...content,
          layout: {
            ...content.layout,
            placement: {
              mobile: { column: 1, row: 3, columnSpan: 12, rowSpan: 8 },
              tablet: { column: 2, row: 4, columnSpan: 10, rowSpan: 6 },
              desktop: { column: 3, row: 4, columnSpan: 8, rowSpan: 6 },
            },
          },
        }],
      };
    }
  }
  return document;
}

export const BACKGROUND_TEMPLATE_STARTERS = BACKGROUND_STARTERS.map(createStarter);
