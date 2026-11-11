import type { NodeType } from "../../model/nodes";
import type {
  ComponentDefinition,
  ComponentDefinitionMap,
  ComponentRegistry,
} from "./types";

export function createComponentRegistry(
  definitions: ComponentDefinitionMap,
): ComponentRegistry {
  const list = Object.freeze(Object.entries(definitions).map(([key, definition]) => {
    if (key !== definition.type) {
      throw new Error(`Component registry key ${key} does not match type ${definition.type}`);
    }
    return freezeDefinition(definition);
  }));
  const byType = new Map(list.map((definition) => [definition.type, definition]));
  const visible = Object.freeze(list.filter(({ libraryVisibility }) => libraryVisibility === "visible"));

  return Object.freeze({
    get<TType extends NodeType>(type: TType): ComponentDefinition<TType> {
      const definition = byType.get(type);
      if (!definition) throw new Error(`Component type ${type} is not registered`);
      return definition as ComponentDefinition<TType>;
    },
    find: (type: string) => byType.get(type as NodeType),
    has: (type: string): type is NodeType => byType.has(type as NodeType),
    list: () => list,
    listVisible: () => visible,
  });
}

function freezeDefinition<TType extends NodeType>(
  definition: ComponentDefinition<TType>,
): ComponentDefinition<TType> {
  return Object.freeze({
    ...definition,
    allowedChildren: Object.freeze([...definition.allowedChildren]),
    propertyGroups: Object.freeze([...definition.propertyGroups]),
    ...(definition.documentKinds ? { documentKinds: Object.freeze([...definition.documentKinds]) } : {}),
  });
}
