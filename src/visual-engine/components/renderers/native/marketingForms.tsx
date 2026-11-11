import type { ComponentRendererMap } from "../types";
import { FormRenderer } from "./FormRenderer";
import { InlineEntryText } from "../../../renderer/InlineEntryText";

const controlClass = "mt-1 block w-full rounded-md border border-current bg-transparent px-3 py-2";

export const marketingFormRenderers = {
  form: (node, context) => <FormRenderer node={node} context={context} />,
  input: (node, context) => {
    const id = `${node.id}-control`;
    return <div className={context.className} style={context.combineNodeStyles(node)}><label htmlFor={id}><InlineEntryText node={node} target={{ base: "label" }} context={context} /></label><input id={id} className={controlClass} name={node.fieldName} type={node.inputType} placeholder={node.placeholder} required={node.required} /></div>;
  },
  textarea: (node, context) => {
    const id = `${node.id}-control`;
    return <div className={context.className} style={context.combineNodeStyles(node)}><label htmlFor={id}><InlineEntryText node={node} target={{ base: "label" }} context={context} /></label><textarea id={id} className={controlClass} name={node.fieldName} placeholder={node.placeholder} required={node.required} rows={node.rows} /></div>;
  },
  select: (node, context) => {
    const id = `${node.id}-control`;
    return <div className={context.className} style={context.combineNodeStyles(node)}><label htmlFor={id}><InlineEntryText node={node} target={{ base: "label" }} context={context} /></label><select id={id} className={controlClass} name={node.fieldName} required={node.required} defaultValue="">{node.placeholder ? <option value="" disabled>{node.placeholder}</option> : null}{node.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>;
  },
  checkbox: (node, context) => {
    const id = `${node.id}-control`;
    return <div className={[context.className, "flex items-start gap-2"].filter(Boolean).join(" ")} style={context.combineNodeStyles(node)}><input id={id} name={node.fieldName} type="checkbox" value={node.value} required={node.required} defaultChecked={node.checkedByDefault} /><label htmlFor={id}><InlineEntryText node={node} target={{ base: "label" }} context={context} /></label></div>;
  },
} satisfies Pick<ComponentRendererMap, "form" | "input" | "textarea" | "select" | "checkbox">;
