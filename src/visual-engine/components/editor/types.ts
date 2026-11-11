import type { PropertyGroup } from "../../model/capabilities";
import type { ComponentNode, NodeType } from "../../model/nodes";

export type EditorFieldControl =
  | "text"
  | "textarea"
  | "boolean"
  | "select"
  | "url"
  | "icon"
  | "enum"
  | "number";

export interface EditorFieldOption<TValue extends string = string> {
  readonly value: TValue;
  readonly label: string;
}

type SharedOrProtectedField = "id" | "type" | "children" | "style" | "responsive" | "layout" | "animation" | "effects" | "bindings";
type EditableScalar = string | number | boolean;
type NodeFor<TType extends NodeType> = Extract<ComponentNode, { type: TType }>;

export type EditableFieldKey<TType extends NodeType> = TType extends NodeType ? ({
  [TKey in keyof NodeFor<TType>]-?: TKey extends SharedOrProtectedField
    ? never
    : Exclude<NodeFor<TType>[TKey], undefined> extends EditableScalar
      ? TKey
      : never;
}[keyof NodeFor<TType>] & string) : never;

export interface EditorFieldDefinition<
  TType extends NodeType = NodeType,
  TKey extends EditableFieldKey<TType> = EditableFieldKey<TType>,
> {
  readonly key: TKey;
  readonly label: string;
  readonly control: EditorFieldControl;
  readonly group: Extract<PropertyGroup, "content" | "media" | "behavior">;
  readonly ariaLabel?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly options?: readonly EditorFieldOption[];
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

export type NodeIdFactory = () => string;
export type NodeTypeIconKey = NodeType;

export interface ComponentEditorDefinition<TType extends NodeType = NodeType> {
  readonly type: TType;
  readonly icon: NodeTypeIconKey;
  readonly fields?: readonly EditorFieldDefinition<TType>[];
  createDefault(idFactory: NodeIdFactory): Extract<ComponentNode, { type: TType }>;
}

export type ComponentEditorDefinitionMap = {
  readonly [TType in NodeType]: ComponentEditorDefinition<TType>;
};

export interface ComponentEditorRegistry {
  get<TType extends NodeType>(type: TType): ComponentEditorDefinition<TType>;
  listTypes(): readonly NodeType[];
  editableFieldKeys(type: NodeType): readonly string[];
}
