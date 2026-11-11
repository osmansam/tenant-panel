/** Compatibility cleanup only: retired dataset sources never become legacy queries. */
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
function cleanNode(input: unknown): unknown {
 if (!record(input)) return input;
 const next = { ...input };
 let changed = false;
 for (const key of ["dataContextId", "datasetId", "relationshipId"]) if (key in next) { delete next[key]; changed = true; }
 if (input.type === "repeater" && (input.datasetId !== undefined || input.relationshipId !== undefined)) {
  Object.assign(next, { type: "stack", direction: "column", alignment: "stretch", distribution: "start", gap: "none", wrap: false });
  delete next.source; delete next.itemAlias; delete next.itemsLayout;
  if (Array.isArray(input.children)) next.children = input.children.flatMap(child => record(child) && child.type === "slot" && child.name === "item" && Array.isArray(child.children) ? child.children : []);
 }
 if (Array.isArray(next.children)) {
  const children = next.children.map(cleanNode);
  if (children.some((child, index) => child !== (next.children as unknown[])[index])) { next.children = children; changed = true; }
 }
 if (record(next.bindings)) {
  const bindings = Object.entries(next.bindings).filter(([, binding]) => !record(binding) || binding.scope === undefined);
  if (bindings.length !== Object.keys(next.bindings).length) { next.bindings = Object.fromEntries(bindings); changed = true; }
 }
 if (Array.isArray(next.conditionalColors)) {
  const rules = next.conditionalColors.filter(rule => !record(rule) || rule.scope === undefined);
  if (rules.length !== next.conditionalColors.length) { next.conditionalColors = rules; changed = true; }
 }
 if (record(next.action) && record(next.action.config) && record(next.action.config.valueBindings)) {
  const bindings = Object.entries(next.action.config.valueBindings).filter(([, value]) => !record(value) || value.scope === undefined);
  if (bindings.length !== Object.keys(next.action.config.valueBindings).length) {
   next.action = { ...next.action, config: { ...next.action.config, valueBindings: Object.fromEntries(bindings) } }; changed = true;
  }
 }
 return changed ? next : input;
}
export function removeRetiredVisualData(input: unknown): unknown {
 if (!record(input)) return input;
 const root = cleanNode(input.root);
 if (!("datasets" in input) && !("dataContexts" in input) && root === input.root) return input;
 const next: Record<string, unknown> = { ...input, root };
 delete next.datasets; delete next.dataContexts;
 return next;
}

export function removeRetiredVisualConnections<T extends { type: string; props?: { visualBuilder?: unknown }; requestBindings?: Record<string, unknown> }>(component: T): T {
 if (component.type !== "custom" || !record(component.props?.visualBuilder)) return component;
 const envelope = component.props.visualBuilder;
 const document = removeRetiredVisualData(envelope.document);
 // Older API normalization removed the colon and camel-cased saved slot IDs.
 const entries = Object.entries(component.requestBindings || {}).filter(([slot]) => !/^dataset(?::|[A-Z0-9])/.test(slot));
 const bindingsChanged = entries.length !== Object.keys(component.requestBindings || {}).length;
 if (!bindingsChanged && document === envelope.document) return component;
 return { ...component, ...(bindingsChanged ? { requestBindings: Object.fromEntries(entries) } : {}), ...(document === envelope.document ? {} : { props: { ...component.props, visualBuilder: { ...envelope, document } } }) };
}
