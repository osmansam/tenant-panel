import type {
  TableToggleConfig,
  ToggleBinding,
} from "../types/page";

export type TableToggleState = Record<string, boolean>;

export const isTableToggleUpperSide = (
  toggle: TableToggleConfig,
): boolean => toggle.isUpperSide !== false;

export const appendShowFiltersControl = <T>(
  displayControls: T[],
  showFiltersControl?: T,
): T[] =>
  showFiltersControl
    ? [...displayControls, showFiltersControl]
    : displayControls;

export const createTableToggleState = (
  toggles: TableToggleConfig[] = [],
): TableToggleState =>
  Object.fromEntries(
    toggles
      .filter((toggle) => toggle.id)
      .map((toggle) => [toggle.id, toggle.defaultValue]),
  );

export const resolveToggleRequestEffects = (
  toggles: TableToggleConfig[] = [],
  state: TableToggleState = {},
): Record<string, unknown> =>
  toggles.reduce<Record<string, unknown>>((filters, toggle) => {
    if (!toggle.id) return filters;
    const isOn = state[toggle.id] ?? toggle.defaultValue;
    const effect = isOn ? toggle.request?.on : toggle.request?.off;
    if (effect?.type === "set" && effect.field.trim()) {
      filters[effect.field.trim()] = effect.value;
    }
    return filters;
  }, {});

export const mergeTableToggleFilters = (
  filterPanelValues: Record<string, unknown> = {},
  toggles: TableToggleConfig[] = [],
  state: TableToggleState = {},
  constantFilter: Record<string, unknown> = {},
): Record<string, unknown> => ({
  ...filterPanelValues,
  ...resolveToggleRequestEffects(toggles, state),
  ...constantFilter,
});

const bindingMatches = (
  binding: ToggleBinding | undefined,
  state: TableToggleState,
  toggles: TableToggleConfig[],
): boolean | undefined => {
  if (!binding) return undefined;
  const toggle = toggles.find((candidate) => candidate.id === binding.toggleId);
  if (!toggle) return undefined;
  return (state[toggle.id] ?? toggle.defaultValue) === binding.when;
};

export const isTableColumnVisible = (
  binding: ToggleBinding | undefined,
  state: TableToggleState,
  toggles: TableToggleConfig[] = [],
): boolean => bindingMatches(binding, state, toggles) ?? true;

export const isBooleanColumnEditable = (
  binding: ToggleBinding | undefined,
  state: TableToggleState,
  toggles: TableToggleConfig[] = [],
): boolean => bindingMatches(binding, state, toggles) ?? true;

export const isBooleanColumnSwitchPresentation = (
  binding: ToggleBinding | undefined,
  state: TableToggleState,
  toggles: TableToggleConfig[] = [],
): boolean => bindingMatches(binding, state, toggles) ?? true;
