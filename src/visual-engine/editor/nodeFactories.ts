import { componentEditorRegistry } from "../components/editor";
import type { NodeIdFactory } from "../components/editor";
import type { ComponentNode, NodeType } from "../model";

export type { NodeIdFactory } from "../components/editor";

export function createDefaultNode<TType extends NodeType>(
  type: TType,
  idFactory: NodeIdFactory,
): Extract<ComponentNode, { type: TType }> {
  return componentEditorRegistry.get(type).createDefault(idFactory);
}
