import type { PropertyGroup } from "../../model/capabilities";
import type { NodeType } from "../../model/nodes";
import type { ComponentDocumentKind } from "../../model/document";

export type ComponentProviderId = "native" | "ozmishow";
export type ComponentCategory = "layout" | "interactive" | "data" | "form" | "content" | "site" | "internal";
export type ComponentLibraryVisibility = "visible" | "internal";

export interface ComponentDefinition<TType extends NodeType = NodeType> {
  readonly type: TType;
  readonly provider: ComponentProviderId;
  readonly label: string;
  readonly description: string;
  readonly category: ComponentCategory;
  readonly libraryVisibility: ComponentLibraryVisibility;
  readonly canHaveChildren: boolean;
  readonly allowedChildren: readonly NodeType[];
  readonly propertyGroups: readonly PropertyGroup[];
  readonly documentKinds?: readonly ComponentDocumentKind[];
}

export type ComponentDefinitionMap = {
  readonly [TType in NodeType]: ComponentDefinition<TType>;
};

export interface ComponentRegistry {
  get<TType extends NodeType>(type: TType): ComponentDefinition<TType>;
  find(type: string): ComponentDefinition | undefined;
  has(type: string): type is NodeType;
  list(): readonly ComponentDefinition[];
  listVisible(): readonly ComponentDefinition[];
}
