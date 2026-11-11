import { removeRetiredVisualConnections } from "../visual-engine/model/retiredData";
import type { ComponentBlock, PageModel, PageSection } from "./pageTypes";
import { migrateComponentDocument } from "../visual-engine/model/migrations";
import { parseSiteTheme } from "../visual-engine/theme/validation";
import type { VisualBlockValue, VisualTarget } from "./types";

export class VisualConflictError extends Error {}
export const isVisualBlock = (component: ComponentBlock) => component.type === "custom" && component.props?.visualBuilder !== undefined;

function visitPage(page: PageModel, visit: (component: ComponentBlock) => void) {
  const component = (block: ComponentBlock) => {
    visit(block);
    for (const tab of block.tabs ?? []) for (const child of tab.components ?? []) component(child);
  };
  const section = (item: PageSection) => {
    if (item.component) component(item.component);
    for (const cell of item.grid?.cells ?? []) for (const block of cell.components ?? []) component(block);
    for (const cell of item.cells ?? []) for (const block of cell.components ?? []) component(block);
    for (const tab of item.tabs?.tabs ?? []) for (const child of tab.sections ?? []) section(child);
  };
  for (const item of page.sections ?? []) section(item);
  if (page.subPage) visitPage(page.subPage, visit);
}
export function listPageComponents(page: PageModel): ComponentBlock[] {
  const found: ComponentBlock[] = [];
  visitPage(page, component => found.push(component));
  return found;
}
export function listVisualBlocks(page: PageModel): ComponentBlock[] {
  const found: ComponentBlock[] = [];
  visitPage(page, component => { if (isVisualBlock(component)) found.push(component); });
  return found;
}
export function readVisualBlock(component: ComponentBlock): VisualBlockValue {
  const envelope: unknown = component.props?.visualBuilder;
  if (!isVisualBlock(component) || !envelope || typeof envelope !== "object") throw new Error("Invalid visual block configuration.");
  const input = envelope as Record<string, unknown>;
  const document = migrateComponentDocument(input.document);
  if (!document.success) throw new Error(`Invalid visual document: ${document.issues[0]?.message ?? "unsupported data"}`);
  if (input.theme === undefined) return { document: document.value };
  const theme = parseSiteTheme(input.theme);
  if (!theme.success) throw new Error(`Invalid visual theme: ${theme.issues[0]?.message ?? "unsupported data"}`);
  return { document: document.value, theme: theme.value };
}
/** Map key ordering is not stable across a Go/Mongo response round trip. */
export function sameValue(left: unknown, right: unknown): boolean {
  const stable = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(stable);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined).sort(([a], [b]) => a.localeCompare(b)).map(([key, entry]) => [key, stable(entry)]));
    return value;
  };
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}
export function mergeVisualBlock(latest: PageModel, target: VisualTarget, value: VisualBlockValue): PageModel {
  if (latest.isGroupOnly) throw new Error("Group-only pages cannot contain a rendered visual section.");
  const validated = readVisualBlock({ id: target.componentId, type: "custom", props: { visualBuilder: value } });
  const result = structuredClone(latest);
  const matches: ComponentBlock[] = [];
  visitPage(result, block => { if (block.id === target.componentId) matches.push(block); });
  if (matches.length > 1) throw new VisualConflictError("Duplicate component IDs make this target ambiguous. Fix the page in Tenant Panel and reload.");
  if (target.isNew) {
    if (matches.length) throw new VisualConflictError("This component already exists. Reload the page before saving.");
    result.sections ??= [];
    const order = Math.max(-1, ...result.sections.map(section => section.order ?? 0)) + 1;
    result.sections.push({ id: `visual-section-${target.componentId}`, type: "component", order, component: { id: target.componentId, type: "custom", title: validated.document.name, props: { visualBuilder: validated } } });
  } else {
    if (!matches.length) throw new VisualConflictError("This visual component was removed. Reload the page before saving.");
    if (!target.baseline || !sameValue(matches[0], target.baseline)) throw new VisualConflictError("This visual component changed in another editor. Reload before saving.");
    if (Object.hasOwn(target, "requestBindings")) matches[0].requestBindings = structuredClone(target.requestBindings || {});
    matches[0].props = { ...matches[0].props, visualBuilder: validated };
    if (target.cellSizing === "fill") matches[0].props.visualCellSizing = "fill";
    else if (target.cellSizing === "natural") delete matches[0].props.visualCellSizing;
    if (Object.hasOwn(target, "itemBinding")) {
      const parameters = { ...matches[0].dataBinding?.parameters };
      if (target.itemBinding == null) delete parameters.item;
      else {
        const binding = target.itemBinding;
        const producer = listPageComponents(result).filter(block => binding.source === "componentOutput" && block.id === binding.componentId);
        if (binding.source !== "componentOutput" || producer.length !== 1 || producer[0].type !== "table" || !producer[0].outputs?.some(output => output.id === binding.outputId && output.type === "record" && output.source.kind === "tableSelectedRecord")) throw new Error("Choose an exposed selected-record output from a table on this page.");
        parameters.item = binding;
      }
      matches[0].dataBinding = { ...matches[0].dataBinding, kind: matches[0].dataBinding?.kind || "schema", parameters };
    }
  }
  return result;
}
export function pageWritePayload(page: PageModel): Omit<PageModel, "id" | "_id"> {
  const payload = structuredClone(page);
  visitPage(payload, component => Object.assign(component, removeRetiredVisualConnections(component)));
  delete payload.id; delete payload._id;
  return payload;
}
function unwrap(value: unknown): unknown {
  for (let i = 0; i < 4 && value && typeof value === "object" && !Array.isArray(value); i++) {
    const object = value as Record<string, unknown>;
    if (typeof object.name === "string" || !("data" in object)) break;
    value = object.data;
  }
  return value;
}
export function extractPage(value: unknown): PageModel {
  const page = unwrap(value);
  if (!page || typeof page !== "object" || Array.isArray(page)) throw new Error("The API returned an invalid page.");
  const candidate = page as PageModel;
  if (typeof candidate.name !== "string" || (!candidate.id && !candidate._id) || (candidate.sections !== undefined && !Array.isArray(candidate.sections))) throw new Error("The API returned an invalid page definition.");
  const result = structuredClone({ ...candidate, sections: candidate.sections ?? [] });
  visitPage(result, component => Object.assign(component, removeRetiredVisualConnections(component)));
  return result;
}
export function extractPages(value: unknown): PageModel[] {
  const pages = unwrap(value);
  if (pages === null) return [];
  if (!Array.isArray(pages)) throw new Error("The API returned an invalid page list.");
  return pages.map(extractPage);
}
