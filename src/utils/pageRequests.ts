import { removeRetiredVisualConnections } from "../visual-engine/model/retiredData";
import type { ComponentBlock } from "./api/page";
import type { PageRequestDefinition, PageRequestResult, PageRequestSource, PageRequestValues } from "../types/pageRequests";

export interface PageRequestIssue { code: string; message: string; path: string; componentId?: string }
export interface PageRequestSlot { key: string; label: string; records: boolean; required?: boolean }
export const requestRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const unsafe = new Set(["__proto__", "constructor", "prototype"]);
export const requestReserved = new Set([...unsafe, "schemaName", "sourceType", "pipelineName", "workflowName", "page", "limit", "sort", "asc", "search", "fields", "fieldName", "valueField", "dataFields"]);
export function pageRequestControls(source: PageRequestSource): string[] {
  if (source.transport === "table-source" || source.transport === "page") return ["page", "limit", "sort", "asc", "search"];
  if (source.transport === "list") return ["sort", "asc", "search"];
  return source.transport === "selection" ? ["limit"] : [];
}
export function pageRequestComponents(page: { sections?: unknown[]; subPage?: unknown }): ComponentBlock[] {
  const found: ComponentBlock[] = [], seen = new WeakSet<object>();
  const walk = (value: unknown) => {
    if (!value || typeof value !== "object" || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) { value.forEach(walk); return; }
    const record = value as Record<string, unknown>;
    if (typeof record.id === "string" && typeof record.type === "string" && ("dataBinding" in record || "requestBindings" in record || !["grid", "component", "tabs"].includes(record.type))) {
      // Traverse only page structure, never visual document nodes or saved record data.
      found.push(removeRetiredVisualConnections(record as unknown as ComponentBlock));
      walk(record.tabs);
      return;
    }
    for (const key of ["sections", "subPage", "grid", "tabs", "cells", "components", "component"]) walk(record[key]);
  };
  walk(page);
  return found;
}
export function pageRequestDefinitions(page: { requests?: PageRequestDefinition[]; subPage?: unknown }): PageRequestDefinition[] {
  const result: PageRequestDefinition[] = [], seen = new WeakSet<object>();
  let current: unknown = page;
  while (requestRecord(current) && !seen.has(current)) { seen.add(current); if (Array.isArray(current.requests)) result.push(...current.requests as PageRequestDefinition[]); current = current.subPage; }
  return result;
}
export function listComponentRequestSlots(component: ComponentBlock): PageRequestSlot[] {
  component = removeRetiredVisualConnections(component);
  const slots: PageRequestSlot[] = [];
  const add = (key: string, label: string, records = true, required = false) => { if (!slots.some(slot => slot.key === key)) slots.push({ key, label, records, required }); };
  if (component.type === "relationMatrix") { add("rows", "Rows"); add("columns", "Columns"); }
  else if (component.type === "table" || component.type.includes("Chart") || component.type === "infoBlocks" || component.type === "distributionBlocks" || (component.type as string) === "calendar") add("data", "Data", component.type === "table");
  if (component.type === "tabPanel" && component.groupBy) add("groupOptions", "Tab groups");
  const c = component as unknown as Record<string, unknown>;
  const fields = (value: unknown, prefix: string) => {
    if (!Array.isArray(value)) return;
    for (const field of value) if (requestRecord(field) && field.type === "select" && typeof field.formKey === "string") add(`${prefix}:${prefix === "filterOptions" ? field.id || field.formKey : field.formKey}`, String(field.label || field.formKey));
  };
  const table = requestRecord(c.table) ? c.table : undefined;
  if (requestRecord(c.form)) fields(c.form.fields, "options");
  if (requestRecord(c.relationMatrix) && requestRecord(c.relationMatrix.filterPanel)) fields(c.relationMatrix.filterPanel.inputs, "filterOptions");
  if (table) {
    if (requestRecord(table.filterPanel)) fields(table.filterPanel.inputs, "filterOptions");
    for (const [index, action] of (Array.isArray(table.actions) ? table.actions : []).entries()) if (requestRecord(action)) fields(action.formFields, `actionOptions:${action.id || action.key || `${action.kind}-${index}`}`);
    for (const column of Array.isArray(table.columns) ? table.columns : []) if (requestRecord(column) && requestRecord(column.lookup)) {
      const lookup = column.lookup; add(`lookup:${lookup.schemaName}::${lookup.matchField || "_id"}::${lookup.labelField}`, `Lookup ${column.field}`);
    }
    for (const group of Array.isArray(table.generatedRelationColumns) ? table.generatedRelationColumns : []) if (requestRecord(group)) add(`relationOptions:${group.id}`, `Relation ${group.id}`);
  }
  const visual = component.props?.visualBuilder?.document?.root;
  const walk = (node: unknown) => {
    if (!requestRecord(node)) return;
    if (node.type === "repeater" && requestRecord(node.source)) add(`collection:${node.source.requestSlot || node.id}`, `Collection ${node.name || node.id}`, true, !!node.source.requestSlot);
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  walk(visual);
  return slots;
}
function isRequestJSON(value: unknown, depth = 0): boolean {
  if (depth > 30) return false;
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(item => isRequestJSON(item, depth + 1));
  return requestRecord(value) && Object.entries(value).every(([key, nested]) => !unsafe.has(key) && isRequestJSON(nested, depth + 1));
}
export function validateRequestValues(source: PageRequestSource, values?: PageRequestValues): string | undefined {
  if (!values) return;
  for (const bag of [values.params, values.filters]) {
    if (bag !== undefined && !requestRecord(bag)) return "Parameters and filters must be objects.";
    if (bag && !isRequestJSON(bag)) return "Request values must contain valid JSON values.";
    if (bag && Object.keys(bag).some(key => !key || requestReserved.has(key))) return "Source names and controls cannot be used as filter or parameter names.";
  }
  if (values.fields !== undefined && (source.transport !== "table-source" || !Array.isArray(values.fields) || values.fields.some(field => typeof field !== "string" || !field.trim()))) return "Returned fields require a table source and valid field names.";
  if (values.controls !== undefined && !requestRecord(values.controls)) return "Controls must be an object.";
  for (const [key, value] of Object.entries(values.controls || {})) {
    if (!pageRequestControls(source).includes(key)) return `This source does not support ${key}.`;
    if (["page", "limit"].includes(key) && (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)) return `${key} must be a positive integer.`;
    if (key === "asc" && typeof value !== "boolean") return "Sort direction must be boolean.";
    if (["sort", "search"].includes(key) && value !== null && typeof value !== "string") return `${key} must be text or null.`;
  }
}
export function validRequestResult(result: PageRequestResult): boolean {
  return requestRecord(result) && ["records", "value"].includes(result.kind) && [result.path, result.totalPath].every(path => path === undefined || Array.isArray(path) && path.every(key => typeof key === "string" && key.length > 0 && !unsafe.has(key)));
}
export function validatePageRequests(page: { name?: string; sections?: unknown[]; subPage?: unknown; requests?: PageRequestDefinition[] }): PageRequestIssue[] {
  const issues: PageRequestIssue[] = [], definitions = new Map<string, PageRequestDefinition>();
  const issue = (message: string, path: string, componentId?: string) => issues.push({ code: "invalid_page_request", message, path, componentId });
  const components = pageRequestComponents(page);
  const filters = new Map<string, Record<string, unknown>>();
  let current: unknown = page;
  const seen = new WeakSet<object>();
  while (requestRecord(current) && !seen.has(current)) { seen.add(current); if (current.requests !== undefined && !Array.isArray(current.requests)) issue("Page requests must be a list.", "requests"); if (Array.isArray(current.filters)) for (const filter of current.filters) if (requestRecord(filter) && typeof filter.id === "string") filters.set(filter.id, filter); current = current.subPage; }
  for (const request of pageRequestDefinitions(page)) {
    if (!requestRecord(request)) { issue("Each request must be an object.", "requests"); continue; }
    const path = `requests.${request.id}`;
    if (!request.id?.trim() || !request.name?.trim() || definitions.has(request.id)) issue("Requests need a unique ID and a name.", path);
    definitions.set(request.id, request);
    const source = request.source;
    if (!source || !source.schemaName?.trim() || !["table-source", "list", "page", "pipeline", "workflow", "selection"].includes(source.transport)) { issue("Choose a supported source and schema.", path); continue; }
    if (source.transport === "table-source" && !["schema", "pipeline", "workflow"].includes(source.kind || "")) issue("Choose a table source kind.", path);
    if ((source.transport === "pipeline" || source.transport === "table-source" && source.kind === "pipeline") && !source.pipelineName) issue("Choose a pipeline.", path);
    if ((source.transport === "workflow" || source.transport === "table-source" && source.kind === "workflow") && !source.workflowName) issue("Choose a workflow.", path);
    if (source.transport === "selection" && !source.fieldName) issue("Choose an option label field.", path);
    if (!validRequestResult(request.result)) issue("Choose a valid result and safe field paths.", path);
    const error = validateRequestValues(source, request.defaults); if (error) issue(error, path);
    for (const bag of ["params", "filters", "controls"] as const) for (const [key, binding] of Object.entries(request.bindings?.[bag] || {})) {
      if (bag === "controls" ? !pageRequestControls(source).includes(key) : requestReserved.has(key)) issue(`Invalid binding target ${key}.`, path);
      if (!requestRecord(binding)) { issue(`Invalid binding for ${key}.`, path); continue; }
      if (binding.source === "static") { if (!Object.hasOwn(binding, "value") || !isRequestJSON(binding.value)) issue(`Invalid static value for ${key}.`, path); }
      else if (binding.source === "pageFilter") {
        const filter = filters.get(binding.filterId);
        if (!filter) issue(`Missing page filter for ${key}.`, path);
        else { const allowed = filter.type === "dateRange" ? ["value", "start", "end", "preset", "timezone"] : filter.type === "monthYear" ? ["value", "month", "year"] : ["value"]; if (binding.field !== undefined && !allowed.includes(binding.field)) issue(`Invalid page filter field for ${key}.`, path); }
      } else if (binding.source === "componentOutput") {
        const producer = components.find(component => component.id === binding.componentId);
        const output = producer?.outputs?.find(output => output.id === binding.outputId);
        if (!output) issue(`Missing component output for ${key}.`, path);
        else if (binding.field !== undefined && (output.type !== "dateRange" || !["start", "end", "preset", "timezone"].includes(binding.field))) issue(`Invalid output field for ${key}.`, path);
      } else issue(`Unsupported binding for ${key}.`, path);

    }
  }
  for (const component of components) for (const [slot, connection] of Object.entries(component.requestBindings || {})) {
    const path = `components.${component.id}.requestBindings.${slot}`, request = definitions.get(connection.requestId);
    const target = listComponentRequestSlots(component).find(target => target.key === slot);
    if (!target) issue(`The connected input ${slot} no longer exists.`, path, component.id);
    if (!request) { issue(`The page request for ${slot} is missing.`, path, component.id); continue; }
    const result = connection.result || request.result;
    if (!validRequestResult(result) || target?.records && result.kind !== "records") issue(`${slot} requires a compatible record result.`, path, component.id);
    const error = validateRequestValues(request.source, connection.overrides); if (error) issue(error, path, component.id);
  }
  for (const component of components) for (const slot of listComponentRequestSlots(component)) if (slot.required && !component.requestBindings?.[slot.key]) issue(`Connect ${slot.label} to a page request or choose its component source.`, `components.${component.id}`, component.id);
  return issues;
}
