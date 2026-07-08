import type {
  ComponentBlock,
  ComponentOutputDefinition,
  PageFilterDefinition,
  PageModel,
  PageTableActionFormFieldConfig,
  ParameterBinding,
  RuntimeValueType,
  Section,
} from "./api/page";

export type RuntimeIdPrefix = "cmp" | "tfl" | "out" | "var" | "pfl";

export type BindingTarget =
  | { kind: "component"; componentId: string }
  | { kind: "output"; componentId: string; outputId: string }
  | { kind: "filter"; filterId: string }
  | { kind: "pageFilter"; filterId: string }
  | { kind: "variable"; variableId: string };

export interface BindingLocation {
  componentId: string;
  parameter: string;
  path: string;
  binding: ParameterBinding;
}

export interface PageBindingIssue {
  code: string;
  message: string;
  path: string;
  componentId?: string;
  parameter?: string;
  target?: BindingTarget;
}

interface LocatedComponent {
  component: ComponentBlock;
  path: string;
}

interface LocatedVariables {
  variables: NonNullable<PageModel["variables"]>;
  path: string;
}

interface LocatedPageFilter {
  filter: PageFilterDefinition;
  path: string;
}

class InvalidPageGraphError extends Error {
  constructor(
    readonly code: "invalid_page_structure" | "cyclic_page_reference",
    message = "Invalid page graph",
  ) {
    super(message);
    this.name = "InvalidPageGraphError";
  }
}

const SAFE_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;
const UNSAFE_NAMES = new Set(["__proto__", "prototype", "constructor"]);
const VALUE_TYPES = new Set<RuntimeValueType>([
  "string",
  "number",
  "boolean",
  "date",
  "dateRange",
  "stringArray",
  "numberArray",
]);
const DATE_DEFAULT_PRESETS = new Set(["today", "yesterday", "tomorrow"]);
const DATE_RANGE_DEFAULT_PRESETS = new Set([
  "today",
  "yesterday",
  "thisWeek",
  "lastWeek",
  "thisMonth",
  "lastMonth",
  "thisYear",
  "lastYear",
]);

export function createRuntimeId(prefix: RuntimeIdPrefix): string {
  return `${prefix}_${crypto.randomUUID().split("-").join("")}`;
}

function mapArray<T>(items: T[] | undefined, mapper: (item: T, index: number) => T): T[] | undefined {
  if (!items) return items;
  if (!Array.isArray(items)) throw new InvalidPageGraphError("invalid_page_structure");
  let changed = false;
  const next = items.map((item, index) => {
    const mapped = mapper(item, index);
    changed ||= mapped !== item;
    return mapped;
  });
  return changed ? next : items;
}

function assertOptionalArray(value: unknown): void {
  if (value !== undefined && !Array.isArray(value)) {
    throw new InvalidPageGraphError("invalid_page_structure");
  }
}

function assertObjectNode(value: unknown): asserts value is object {
  if (!value || typeof value !== "object") {
    throw new InvalidPageGraphError("invalid_page_structure");
  }
}

function mapComponent(
  component: ComponentBlock,
  updater: (component: ComponentBlock) => ComponentBlock,
  active = new WeakSet<object>(),
  seen = new WeakMap<object, ComponentBlock>(),
): ComponentBlock {
  if (!component || typeof component !== "object") {
    throw new InvalidPageGraphError("invalid_page_structure");
  }
  const prior = seen.get(component);
  if (prior) return prior;
  if (active.has(component)) throw new InvalidPageGraphError("cyclic_page_reference");
  active.add(component);
  const tabs = mapArray(component.tabs, (tab) => {
    assertObjectNode(tab);
    const components = mapArray(tab.components, (child) => mapComponent(child, updater, active, seen));
    return components === tab.components ? tab : { ...tab, components: components! };
  });
  const nested = tabs === component.tabs ? component : { ...component, tabs };
  const result = updater(nested);
  active.delete(component);
  seen.set(component, result);
  return result;
}

function mapSection(
  section: Section,
  updater: (component: ComponentBlock) => ComponentBlock,
  active = new WeakSet<object>(),
  seenComponents = new WeakMap<object, ComponentBlock>(),
  seenSections = new WeakMap<object, Section>(),
): Section {
  if (!section || typeof section !== "object") {
    throw new InvalidPageGraphError("invalid_page_structure");
  }
  const prior = seenSections.get(section);
  if (prior) return prior;
  if (active.has(section)) throw new InvalidPageGraphError("cyclic_page_reference");
  active.add(section);
  const component = section.component
    ? mapComponent(section.component, updater, new WeakSet(), seenComponents)
    : section.component;
  const mapCells = (cells: Section["cells"]) =>
    mapArray(cells, (cell) => {
      assertObjectNode(cell);
      const components = mapArray(cell.components, (child) => mapComponent(child, updater, new WeakSet(), seenComponents));
      return components === cell.components ? cell : { ...cell, components: components! };
    });
  const flatCells = mapCells(section.cells);
  const gridCells = mapCells(section.grid?.cells);
  const grid =
    section.grid && gridCells !== section.grid.cells
      ? { ...section.grid, cells: gridCells! }
      : section.grid;
  const pageTabs = mapArray(section.tabs?.tabs, (tab) => {
    assertObjectNode(tab);
    const sections = mapArray(tab.sections, (child) => mapSection(child, updater, active, seenComponents, seenSections));
    return sections === tab.sections ? tab : { ...tab, sections: sections! };
  });
  const tabs =
    section.tabs && pageTabs !== section.tabs.tabs
      ? { ...section.tabs, tabs: pageTabs! }
      : section.tabs;
  if (
    component === section.component &&
    flatCells === section.cells &&
    grid === section.grid &&
    tabs === section.tabs
  ) {
    active.delete(section);
    seenSections.set(section, section);
    return section;
  }
  const result = { ...section, component, cells: flatCells, grid, tabs };
  active.delete(section);
  seenSections.set(section, result);
  return result;
}

function mapPage(
  page: PageModel,
  updater: (component: ComponentBlock) => ComponentBlock,
  seen = new WeakMap<object, PageModel>(),
  active = new WeakSet<object>(),
): PageModel {
  if (!page || typeof page !== "object") {
    throw new InvalidPageGraphError("invalid_page_structure");
  }
  if (active.has(page)) throw new InvalidPageGraphError("cyclic_page_reference");
  const prior = seen.get(page);
  if (prior) return prior;
  active.add(page);
  const sections = mapArray(page.sections, (section) => mapSection(section, updater));
  const subPage = page.subPage ? mapPage(page.subPage, updater, seen, active) : page.subPage;
  const result =
    sections === page.sections && subPage === page.subPage
      ? page
      : { ...page, sections, subPage };
  active.delete(page);
  seen.set(page, result);
  return result;
}

function collectComponents(page: PageModel): LocatedComponent[] {
  const result: LocatedComponent[] = [];
  const seenPages = new WeakSet<object>();
  const activePages = new WeakSet<object>();
  const seenComponents = new WeakSet<object>();
  const activeComponents = new WeakSet<object>();
  const seenSections = new WeakSet<object>();
  const activeSections = new WeakSet<object>();
  const visitComponent = (component: ComponentBlock, path: string) => {
    if (!component || typeof component !== "object") {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    if (activeComponents.has(component)) throw new InvalidPageGraphError("cyclic_page_reference");
    if (!component || seenComponents.has(component)) return;
    activeComponents.add(component);
    seenComponents.add(component);
    result.push({ component, path });
    if (component.tabs !== undefined && !Array.isArray(component.tabs)) {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    assertOptionalArray(component.outputs);
    assertOptionalArray(component.table?.filterPanel?.inputs);
    component.outputs?.forEach(assertObjectNode);
    component.table?.filterPanel?.inputs?.forEach(assertObjectNode);
    component.tabs?.forEach((tab, tabIndex) => {
      assertObjectNode(tab);
      assertOptionalArray(tab.components);
      tab.components?.forEach((child, childIndex) =>
        visitComponent(child, `${path}.tabs[${tabIndex}].components[${childIndex}]`),
      );
    });
    activeComponents.delete(component);
  };
  const visitSection = (section: Section, path: string) => {
    if (!section || typeof section !== "object") {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    if (activeSections.has(section)) throw new InvalidPageGraphError("cyclic_page_reference");
    if (seenSections.has(section)) return;
    activeSections.add(section);
    seenSections.add(section);
    if (section.component) visitComponent(section.component, `${path}.component`);
    if (section.grid?.cells !== undefined && !Array.isArray(section.grid.cells)) {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    section.grid?.cells?.forEach((cell, cellIndex) => {
      assertObjectNode(cell);
      assertOptionalArray(cell.components);
      cell.components?.forEach((component, componentIndex) =>
        visitComponent(component, `${path}.grid.cells[${cellIndex}].components[${componentIndex}]`),
      );
    });
    if (section.cells !== undefined && !Array.isArray(section.cells)) {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    section.cells?.forEach((cell, cellIndex) => {
      assertObjectNode(cell);
      assertOptionalArray(cell.components);
      cell.components?.forEach((component, componentIndex) =>
        visitComponent(component, `${path}.cells[${cellIndex}].components[${componentIndex}]`),
      );
    });
    if (section.tabs?.tabs !== undefined && !Array.isArray(section.tabs.tabs)) {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    section.tabs?.tabs?.forEach((tab, tabIndex) => {
      assertObjectNode(tab);
      assertOptionalArray(tab.sections);
      tab.sections?.forEach((child, sectionIndex) =>
        visitSection(child, `${path}.tabs.tabs[${tabIndex}].sections[${sectionIndex}]`),
      );
    });
    activeSections.delete(section);
  };
  const visitPage = (current: PageModel, path: string) => {
    if (!current || typeof current !== "object") {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    if (activePages.has(current)) throw new InvalidPageGraphError("cyclic_page_reference");
    if (seenPages.has(current)) return;
    activePages.add(current);
    seenPages.add(current);
    if (current.sections !== undefined && !Array.isArray(current.sections)) {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    current.sections?.forEach((section, index) => visitSection(section, `${path}.sections[${index}]`));
    if (current.subPage) visitPage(current.subPage, `${path}.subPage`);
    activePages.delete(current);
  };
  visitPage(page, "page");
  return result;
}

function collectPageVariables(page: PageModel): LocatedVariables[] {
  const result: LocatedVariables[] = [];
  const seen = new WeakSet<object>();
  const active = new WeakSet<object>();
  const visit = (current: PageModel, path: string) => {
    if (!current || typeof current !== "object") {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    if (active.has(current)) throw new InvalidPageGraphError("cyclic_page_reference");
    if (seen.has(current)) return;
    active.add(current);
    seen.add(current);
    if (current.variables !== undefined) {
      if (!Array.isArray(current.variables)) throw new InvalidPageGraphError("invalid_page_structure");
      if (current.variables.some((variable) => !variable || typeof variable !== "object")) {
        throw new InvalidPageGraphError("invalid_page_structure");
      }
      result.push({ variables: current.variables, path });
    }
    if (current.subPage) visit(current.subPage, `${path}.subPage`);
    active.delete(current);
  };
  visit(page, "page");
  return result;
}

function collectPageFilters(page: PageModel): LocatedPageFilter[] {
  const result: LocatedPageFilter[] = [];
  const seen = new WeakSet<object>();
  const active = new WeakSet<object>();
  const visit = (current: PageModel, path: string) => {
    if (!current || typeof current !== "object") {
      throw new InvalidPageGraphError("invalid_page_structure");
    }
    if (active.has(current)) throw new InvalidPageGraphError("cyclic_page_reference");
    if (seen.has(current)) return;
    active.add(current);
    seen.add(current);
    if (current.filters !== undefined) {
      if (!Array.isArray(current.filters)) throw new InvalidPageGraphError("invalid_page_structure");
      current.filters.forEach((filter, index) => {
        assertObjectNode(filter);
        result.push({ filter, path: `${path}.filters[${index}]` });
      });
    }
    if (current.subPage) visit(current.subPage, `${path}.subPage`);
    active.delete(current);
  };
  visit(page, "page");
  return result;
}

function collectCellIds(page: PageModel): Set<string> {
  const cellIds = new Set<string>();
  const visitSection = (section: Section) => {
    for (const cell of section.grid?.cells ?? []) if (cell.id) cellIds.add(cell.id);
    for (const cell of section.cells ?? []) if (cell.id) cellIds.add(cell.id);
    for (const tab of section.tabs?.tabs ?? []) for (const nested of tab.sections ?? []) visitSection(nested);
  };
  for (const section of page.sections ?? []) visitSection(section);
  return cellIds;
}

function allVariables(page: PageModel) {
  const variables: Array<{ variable: NonNullable<PageModel["variables"]>[number]; path: string }> = [];
  for (const located of collectPageVariables(page)) {
    located.variables.forEach((variable, index) =>
      variables.push({ variable, path: `${located.path}.variables[${index}]` }),
    );
  }
  return variables;
}

function filtersOf(component: ComponentBlock): PageTableActionFormFieldConfig[] {
  return component.table?.filterPanel?.inputs ?? [];
}

function nextUniqueId(prefix: RuntimeIdPrefix, used: Set<string>): string {
  let id = createRuntimeId(prefix);
  while (used.has(id)) id = createRuntimeId(prefix);
  used.add(id);
  return id;
}

export function ensurePageRuntimeIds(page: PageModel): PageModel {
  const components = collectComponents(page);
  const usedComponents = new Set(components.map(({ component }) => component.id).filter(Boolean));
  const usedFilters = new Set(
    components.flatMap(({ component }) => filtersOf(component).map((filter) => filter.id)).filter(Boolean) as string[],
  );
  return mapPage(page, (component) => {
    let next = component;
    if (!isSafeRuntimeName(component.id)) {
      next = { ...next, id: nextUniqueId("cmp", usedComponents) };
    }
    const inputs = next.table?.filterPanel?.inputs;
    if (inputs) {
      const updatedInputs = mapArray(inputs, (filter) =>
        isSafeRuntimeName(filter.id)
          ? filter
          : { ...filter, id: nextUniqueId("tfl", usedFilters) },
      );
      if (updatedInputs !== inputs) {
        next = {
          ...next,
          table: {
            ...next.table!,
            filterPanel: { ...next.table!.filterPanel!, inputs: updatedInputs },
          },
        };
      }
    }
    return next;
  });
}

export function outputTypeForFilter(filter: PageTableActionFormFieldConfig): RuntimeValueType {
  const valueType = (filter.formKeyType || filter.type || "").toLowerCase();
  if (filter.isMultiple) {
    return ["number", "numberarray", "intarray"].includes(valueType)
      ? "numberArray"
      : "stringArray";
  }
  if (valueType === "number") return "number";
  if (valueType === "boolean" || valueType === "checkbox") return "boolean";
  if (valueType === "numberarray" || valueType === "intarray") return "numberArray";
  if (valueType === "stringarray") return "stringArray";
  return "string";
}

export function uniqueOutputKey(component: ComponentBlock, requested: string): string {
  const base = requested.trim() || "output";
  const keys = new Set((component.outputs ?? []).map((output) => output.key));
  if (!keys.has(base)) return base;
  let suffix = 2;
  while (keys.has(`${base}${suffix}`)) suffix += 1;
  return `${base}${suffix}`;
}

function safeRuntimeAlias(requested: string, fallback: string): string {
  const parts = requested
    .trim()
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  const candidate = parts
    .map((part, index) =>
      index === 0
        ? part.charAt(0).toLowerCase() + part.slice(1)
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
  const normalized = candidate || fallback;
  return /^[A-Za-z_]/.test(normalized) ? normalized : `${fallback}${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
}

export function uniqueComponentStateKey(
  page: PageModel,
  requested: string,
  fallback = "component",
): string {
  const base = safeRuntimeAlias(requested, fallback);
  const keys = new Set(
    collectComponents(page).map(({ component }) => component.stateKey).filter(Boolean),
  );
  if (!keys.has(base)) return base;
  let suffix = 2;
  while (keys.has(`${base}${suffix}`)) suffix += 1;
  return `${base}${suffix}`;
}

export function exposeTableFilter(
  page: PageModel,
  componentId: string,
  filterId: string,
  key: string,
): PageModel {
  const located = collectComponents(page).find(({ component }) => component.id === componentId);
  if (!located || located.component.type !== "table") return page;
  const filter = filtersOf(located.component).find((candidate) => candidate.id === filterId);
  if (!filter) return page;
  const used = new Set(
    collectComponents(page).flatMap(({ component }) => (component.outputs ?? []).map((output) => output.id)),
  );
  return mapPage(page, (component) => {
    if (component !== located.component) return component;
    const output: ComponentOutputDefinition = {
      id: nextUniqueId("out", used),
      key: uniqueOutputKey(component, key),
      type: outputTypeForFilter(filter),
      source: { kind: "tableFilter", filterId },
    };
    return { ...component, outputs: [...(component.outputs ?? []), output] };
  });
}

export function renameOutput(
  page: PageModel,
  componentId: string,
  outputId: string,
  key: string,
): PageModel {
  collectComponents(page);
  return mapPage(page, (component) => {
    if (component.id !== componentId) return component;
    const outputs = mapArray(component.outputs, (output) =>
      output.id === outputId && output.key !== key ? { ...output, key } : output,
    );
    return outputs === component.outputs ? component : { ...component, outputs };
  });
}

function bindingMatches(
  binding: ParameterBinding,
  target: BindingTarget,
  seen: WeakSet<object>,
): boolean {
  if (!binding || typeof binding !== "object" || seen.has(binding)) return false;
  seen.add(binding);
  if (target.kind === "component" && binding.source === "componentOutput") {
    return binding.componentId === target.componentId;
  }
  if (target.kind === "output" && binding.source === "componentOutput") {
    return binding.componentId === target.componentId && binding.outputId === target.outputId;
  }
  if ((target.kind === "filter" || target.kind === "pageFilter") && binding.source === "pageFilter") {
    return binding.filterId === target.filterId;
  }
  if (target.kind === "variable" && binding.source === "pageVariable") {
    return binding.variableId === target.variableId;
  }
  return binding.source === "derived"
    ? bindingMatches(binding.input, target, seen)
    : false;
}

export function dependentBindings(page: PageModel, target: BindingTarget): BindingLocation[] {
  const result: BindingLocation[] = [];
  let components: LocatedComponent[];
  try {
    components = collectComponents(page);
  } catch (error) {
    if (error instanceof InvalidPageGraphError) return [];
    throw error;
  }
  for (const { component, path } of components) {
    const parameters = component.dataBinding?.parameters;
    if (!parameters || typeof parameters !== "object") continue;
    for (const parameter of Object.keys(parameters).sort()) {
      if (!Object.prototype.hasOwnProperty.call(parameters, parameter)) continue;
      const binding = parameters[parameter];
      if (bindingMatches(binding, target, new WeakSet())) {
        result.push({
          componentId: component.id,
          parameter,
          path: `${path}.dataBinding.parameters.${parameter}`,
          binding,
        });
      }
    }
  }
  return result;
}

export function formatBindingLabel(page: PageModel, binding: ParameterBinding): string {
  try {
    collectComponents(page);
    collectPageVariables(page);
    collectPageFilters(page);
  } catch (error) {
    if (error instanceof InvalidPageGraphError) return "invalid page graph";
    throw error;
  }
  return formatBindingLabelInner(page, binding, new WeakSet());
}

function formatBindingLabelInner(
  page: PageModel,
  binding: ParameterBinding,
  seen: WeakSet<object>,
): string {
  if (!binding || typeof binding !== "object") return "invalid binding";
  if (seen.has(binding)) return "invalid binding";
  seen.add(binding);
  if (binding.source === "static") return "static";
  if (binding.source === "componentOutput") {
    const component = collectComponents(page).find(
      (candidate) => candidate.component.id === binding.componentId,
    )?.component;
    const output = component?.outputs?.find((candidate) => candidate.id === binding.outputId);
    if (!component || !output) return `invalid component output (${binding.componentId}.${binding.outputId})`;
    return [component.stateKey || component.id, output.key, binding.field]
      .filter(Boolean)
      .join(".");
  }
  if (binding.source === "pageVariable") {
    const matches = allVariables(page).filter(({ variable }) => variable.id === binding.variableId);
    if (matches.length > 1) return `ambiguous variable (${binding.variableId})`;
    const variable = matches[0]?.variable;
    return variable ? variable.key : `invalid variable (${binding.variableId})`;
  }
  if (binding.source === "pageFilter") {
    const filter = collectPageFilters(page).find(({ filter }) => filter.id === binding.filterId)?.filter;
    return filter
      ? `${filter.key}${binding.field ? `.${binding.field}` : ""}`
      : `invalid page filter (${binding.filterId})`;
  }
  if (binding.source === "system") return `system.${binding.value}${binding.field ? `.${binding.field}` : ""}`;
  if (binding.source === "derived") {
    const input = formatBindingLabelInner(page, binding.input, seen);
    return input === "invalid binding" ? input : `${binding.transform}(${input})`;
  }
  return "invalid binding";
}

function issue(
  code: string,
  message: string,
  path: string,
  extra: Omit<PageBindingIssue, "code" | "message" | "path"> = {},
): PageBindingIssue {
  return { code, message, path, ...extra };
}

export function isSafeRuntimeName(value: unknown): value is string {
  return typeof value === "string" && SAFE_NAME.test(value) && !UNSAFE_NAMES.has(value);
}

function isJsonSafe(value: unknown, seen = new WeakSet<object>()): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.every((item) => isJsonSafe(item, seen));
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return false;
  return Object.keys(value).every((key) =>
    isJsonSafe((value as Record<string, unknown>)[key], seen),
  );
}

function matchesRuntimeValueType(value: unknown, type: RuntimeValueType): boolean {
  if (value === null) return true;
  if (type === "string") return typeof value === "string";
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "boolean") return typeof value === "boolean";
  if (type === "date") return typeof value === "string" && !Number.isNaN(Date.parse(value));
  if (type === "stringArray") {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
  }
  if (type === "numberArray") {
    return Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isFinite(item));
  }
  if (type === "dateRange") {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const allowed = new Set(["start", "end", "preset", "timezone"]);
    const record = value as Record<string, unknown>;
    return Object.keys(record).every((key) => allowed.has(key)) &&
      ["start", "end", "preset", "timezone"].every(
        (key) => record[key] === undefined || record[key] === null || typeof record[key] === "string",
      );
  }
  return false;
}

function hasOwnProperty(value: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function validateBinding(
  binding: ParameterBinding,
  location: BindingLocation,
  componentById: Map<string, ComponentBlock>,
  pageFilterById: Map<string, PageFilterDefinition>,
): PageBindingIssue[] {
  const extra = { componentId: location.componentId, parameter: location.parameter };
  if (!binding || typeof binding !== "object") {
    return [issue("invalid_binding", "Binding must be an object.", location.path, extra)];
  }
  if (binding.source === "static") {
    return isJsonSafe(binding.value)
      ? []
      : [issue("invalid_static_value", "Static value must be JSON-safe.", location.path, extra)];
  }
  if (binding.source === "pageFilter") {
    if (!binding.filterId || !pageFilterById.has(binding.filterId)) {
      return [
        issue("missing_page_filter", "Page filter binding points to a missing filter.", location.path, {
          ...extra,
          target: { kind: "pageFilter", filterId: binding.filterId },
        }),
      ];
    }
    if (binding.field && !["value", "start", "end", "preset", "timezone"].includes(binding.field)) {
      return [issue("invalid_binding_field", "Page filter field is invalid.", location.path, extra)];
    }
    const filter = pageFilterById.get(binding.filterId);
    if (filter?.type !== "dateRange" && binding.field) {
      return [issue("invalid_binding_field", "Only date-range page filters allow a field.", location.path, extra)];
    }
    return [];
  }
  if (binding.source !== "componentOutput") {
    return [issue("unsupported_binding_source", `Binding source "${String(binding.source)}" is not supported.`, location.path, extra)];
  }
  if (binding.componentId === location.componentId) {
    return [
      issue("self_binding_component_output", "A component cannot bind a request parameter to its own output.", location.path, {
        ...extra,
        target: { kind: "component", componentId: binding.componentId },
      }),
    ];
  }
  const component = componentById.get(binding.componentId);
  if (!component) {
    return [
      issue("missing_binding_component", "Referenced component does not exist.", location.path, {
        ...extra,
        target: { kind: "component", componentId: binding.componentId },
      }),
    ];
  }
  const output = component.outputs?.find((candidate) => candidate.id === binding.outputId);
  if (!output) {
    return [
      issue("missing_binding_output", "Referenced output does not exist.", location.path, {
        ...extra,
        target: { kind: "output", componentId: binding.componentId, outputId: binding.outputId },
      }),
    ];
  }
  if (output.type === "dateRange") {
    return !binding.field || ["start", "end", "preset", "timezone"].includes(binding.field)
      ? []
      : [issue("invalid_binding_field", "Date-range field is invalid.", location.path, extra)];
  }
  return binding.field
    ? [issue("invalid_binding_field", "Scalar and array outputs do not allow a field.", location.path, extra)]
    : [];
}

export function validatePageBindings(page: PageModel): PageBindingIssue[] {
  const issues: PageBindingIssue[] = [];
  let components: LocatedComponent[];
  let variablePages: LocatedVariables[];
  let pageFilters: LocatedPageFilter[];
  try {
    components = collectComponents(page);
    variablePages = collectPageVariables(page);
    pageFilters = collectPageFilters(page);
  } catch (error) {
    if (error instanceof InvalidPageGraphError) {
      return [issue(error.code, error.message, "page")];
    }
    throw error;
  }
  const variables = variablePages.flatMap(({ variables: pageVariables, path }) =>
    pageVariables.map((variable, index) => ({ variable, path: `${path}.variables[${index}]` })),
  );
  const runtimeConfigured =
    variables.length > 0 ||
    pageFilters.length > 0 ||
    components.some(
      ({ component }) =>
        (component.outputs?.length ?? 0) > 0 ||
        Object.keys(component.dataBinding?.parameters ?? {}).length > 0,
    );

  for (const { variables: pageVariables, path: pagePath } of variablePages) {
    const variableIds = new Set<string>();
    const variableKeys = new Set<string>();
    for (const [index, variable] of pageVariables.entries()) {
      const path = `${pagePath}.variables[${index}]`;
      if (!variable.id) issues.push(issue("missing_variable_id", "Variable requires an id.", path));
      else if (variableIds.has(variable.id)) issues.push(issue("duplicate_variable_id", "Variable id must be unique within its page.", path));
      else {
      if (!isSafeRuntimeName(variable.id)) issues.push(issue("invalid_variable_id", "Variable id is invalid.", path));
        variableIds.add(variable.id);
      }
      if (!variable.key) issues.push(issue("missing_variable_key", "Variable requires a key.", path));
      else if (variableKeys.has(variable.key)) issues.push(issue("duplicate_variable_key", "Variable key must be unique within its page.", path));
      else if (!isSafeRuntimeName(variable.key)) issues.push(issue("invalid_variable_key", "Variable key is invalid.", path));
      else variableKeys.add(variable.key);
      if (!VALUE_TYPES.has(variable.type)) issues.push(issue("invalid_variable_type", "Variable type is invalid.", path));
      else if (hasOwnProperty(variable, "initialValue") && !matchesRuntimeValueType(variable.initialValue, variable.type)) {
        issues.push(issue("invalid_variable_initial_value", "Variable initial value does not match its declared type.", path));
      }
    }
  }

  const pageFilterById = new Map<string, PageFilterDefinition>();
  const pageFilterKeys = new Set<string>();
  const cellIds = collectCellIds(page);
  for (const { filter, path } of pageFilters) {
    if (!filter.id) {
      issues.push(issue("missing_page_filter_id", "Page filter requires an id.", path));
    } else if (pageFilterById.has(filter.id)) {
      issues.push(issue("duplicate_page_filter_id", "Page filter id must be unique.", path, {
        target: { kind: "pageFilter", filterId: filter.id },
      }));
    } else {
      if (!isSafeRuntimeName(filter.id)) issues.push(issue("invalid_page_filter_id", "Page filter id is invalid.", path));
      pageFilterById.set(filter.id, filter);
    }
    if (!filter.key) {
      issues.push(issue("missing_page_filter_key", "Page filter requires a key.", path));
    } else if (pageFilterKeys.has(filter.key)) {
      issues.push(issue("duplicate_page_filter_key", "Page filter key must be unique.", path));
    } else if (!isSafeRuntimeName(filter.key)) {
      issues.push(issue("invalid_page_filter_key", "Page filter key is invalid.", path));
    } else {
      pageFilterKeys.add(filter.key);
    }
    if (!VALUE_TYPES.has(filter.type)) {
      issues.push(issue("invalid_page_filter_type", "Page filter type is invalid.", path));
    } else if (hasOwnProperty(filter, "defaultValue") && !matchesRuntimeValueType(filter.defaultValue, filter.type)) {
      issues.push(issue("invalid_page_filter_default_value", "Page filter default value does not match its declared type.", path));
    }
    if (
      filter.defaultPreset !== undefined &&
      !(
        (filter.type === "date" && DATE_DEFAULT_PRESETS.has(filter.defaultPreset)) ||
        (filter.type === "dateRange" && DATE_RANGE_DEFAULT_PRESETS.has(filter.defaultPreset))
      )
    ) {
      issues.push(issue("invalid_page_filter_default_preset", "Page filter default preset is invalid.", path));
    }
    if (
      filter.arraySerialization !== undefined &&
      filter.arraySerialization !== "comma" &&
      filter.arraySerialization !== "repeat"
    ) {
      issues.push(issue("invalid_page_filter_array_serialization", "Page filter array serialization is invalid.", path));
    }
    if (!filter.placement || typeof filter.placement !== "object") {
      issues.push(issue("invalid_page_filter_placement", "Page filter placement is invalid.", path));
    } else if (filter.placement.kind === "cell") {
      if (!filter.placement.cellId) {
        issues.push(issue("missing_page_filter_cell", "Cell page filter placement requires a cell.", path));
      } else if (!cellIds.has(filter.placement.cellId)) {
        issues.push(issue("missing_page_filter_cell", "Cell page filter placement points to a missing cell.", path));
      }
    } else if (filter.placement.kind !== "navbar") {
      issues.push(issue("invalid_page_filter_placement", "Page filter placement is invalid.", path));
    }
  }

  const componentIds = new Set<string>();
  const stateKeys = new Set<string>();
  const filterIds = new Set<string>();
  const componentById = new Map<string, ComponentBlock>();

  for (const { component, path } of components) {
    if (!component.id) {
      if (runtimeConfigured) issues.push(issue("missing_component_id", "Component requires an id.", path));
    } else if (componentIds.has(component.id)) {
      issues.push(issue("duplicate_component_id", "Component id must be unique.", path, { componentId: component.id }));
    } else {
      if (!isSafeRuntimeName(component.id)) {
        issues.push(issue("invalid_component_id", "Component id is invalid.", path, {
          componentId: component.id,
        }));
      }
      componentIds.add(component.id);
      componentById.set(component.id, component);
    }
    if (component.stateKey) {
      if (stateKeys.has(component.stateKey)) issues.push(issue("duplicate_state_key", "Component state key must be unique.", path, { componentId: component.id }));
      else if (!isSafeRuntimeName(component.stateKey)) issues.push(issue("invalid_state_key", "Component state key is invalid.", path, { componentId: component.id }));
      else stateKeys.add(component.stateKey);
    }
    for (const [index, filter] of filtersOf(component).entries()) {
      const filterPath = `${path}.table.filterPanel.inputs[${index}]`;
      if (!filter.id) {
        if (runtimeConfigured) issues.push(issue("missing_filter_id", "Filter requires an id.", filterPath, { componentId: component.id }));
      } else if (filterIds.has(filter.id)) {
        issues.push(issue("duplicate_filter_id", "Filter id must be unique.", filterPath, { componentId: component.id }));
      } else {
        if (!isSafeRuntimeName(filter.id)) {
          issues.push(issue("invalid_filter_id", "Filter id is invalid.", filterPath, {
            componentId: component.id,
          }));
        }
        filterIds.add(filter.id);
      }
    }
    const localKeys = new Set<string>();
    const localOutputIds = new Set<string>();
    for (const [index, output] of (component.outputs ?? []).entries()) {
      const outputPath = `${path}.outputs[${index}]`;
      if (!output.id) issues.push(issue("missing_output_id", "Output requires an id.", outputPath, { componentId: component.id }));
      else if (localOutputIds.has(output.id)) issues.push(issue("duplicate_output_id", "Output id must be unique within its component.", outputPath, { componentId: component.id }));
      else {
        if (!isSafeRuntimeName(output.id)) {
          issues.push(issue("invalid_output_id", "Output id is invalid.", outputPath, {
            componentId: component.id,
          }));
        }
        localOutputIds.add(output.id);
      }
      if (!output.key) issues.push(issue("missing_output_key", "Output requires a key.", outputPath, { componentId: component.id }));
      else if (localKeys.has(output.key)) {
        issues.push(issue("duplicate_output_key", "Output key must be unique within its component.", outputPath, { componentId: component.id }));
      } else if (!isSafeRuntimeName(output.key)) {
        issues.push(issue("invalid_output_key", "Output key is invalid.", outputPath, { componentId: component.id }));
      } else {
        localKeys.add(output.key);
      }
    }
  }

  for (const { component, path } of components) {
    for (const [index, output] of (component.outputs ?? []).entries()) {
      const outputPath = `${path}.outputs[${index}]`;
      const source = output.source as ComponentOutputDefinition["source"] | undefined;
      let expected: RuntimeValueType | undefined;
      let tableSource = false;
      if (!VALUE_TYPES.has(output.type)) {
        issues.push(issue("invalid_output_type", "Output type is invalid.", outputPath, {
          componentId: component.id,
        }));
      }
      if (!source || typeof source !== "object" || !("kind" in source)) {
        issues.push(issue("unsupported_output_source", "Output source is not supported.", outputPath, {
          componentId: component.id,
        }));
      } else if (source.kind === "tableFilter") {
        tableSource = true;
        const filter = filtersOf(component).find((candidate) => candidate.id === source.filterId);
        if (!filter) {
          issues.push(issue("missing_output_filter", "Referenced filter does not exist.", outputPath, {
            componentId: component.id,
            target: { kind: "filter", filterId: source.filterId },
          }));
        } else expected = outputTypeForFilter(filter);
      } else if (source.kind === "tableSelectedIds") {
        tableSource = true;
        expected = "stringArray";
      } else if (source.kind === "tableSearch") {
        tableSource = true;
        expected = "string";
      }
      else {
        issues.push(issue("unsupported_output_source", "Output source is not supported.", outputPath, {
          componentId: component.id,
        }));
      }
      if (tableSource && component.type !== "table") {
        issues.push(issue("incompatible_output_source", "Table output source requires a table component.", outputPath, { componentId: component.id }));
      }
      if (expected && output.type !== expected) {
        issues.push(issue("output_type_mismatch", `Output type must be "${expected}".`, outputPath, { componentId: component.id }));
      }
    }
    const parameters = component.dataBinding?.parameters;
    if (!parameters || typeof parameters !== "object") continue;
    for (const parameter of Object.keys(parameters).sort()) {
      if (!Object.prototype.hasOwnProperty.call(parameters, parameter)) continue;
      const location: BindingLocation = {
        componentId: component.id,
        parameter,
        path: `${path}.dataBinding.parameters.${parameter}`,
        binding: parameters[parameter],
      };
      if (!isSafeRuntimeName(parameter)) {
        issues.push(issue("invalid_parameter_name", "Parameter name is invalid.", location.path, {
          componentId: component.id,
          parameter,
        }));
      }
      issues.push(...validateBinding(parameters[parameter], location, componentById, pageFilterById));
    }
  }
  return issues;
}
