import type { GridSection, Section } from "../utils/api/page";

// Enumerable symbols survive the native designer's object spreads but never
// enter stored JSON. They associate each edited grid with its original slot.
const sourceSlot = Symbol("native-grid-source-slot");
type DesignerGrid = GridSection & { [sourceSlot]?: number };
const isGrid = (section: Section) => !!((section.type === "grid" && section.grid) || (section.columns && section.cells));
function orderedSlots(sections: readonly Section[]) {
  return sections.map((section, index) => ({ section, index })).sort((left, right) => (left.section.order ?? 0) - (right.section.order ?? 0));
}
export function orderedPageSections(sections: readonly Section[]): Section[] {
  return orderedSlots(sections).map(entry => entry.section);
}
export function designerGridSections(sections: Section[]): GridSection[] {
  return orderedSlots(sections).flatMap(({ section, index }) => {
    if (!isGrid(section)) return [];
    const grid = section.grid || { columns: section.columns!, gap: section.gap, cells: section.cells! };
    return [{ ...grid, [sourceSlot]: index }];
  });
}
function cleanGrid(grid: DesignerGrid): GridSection {
  const copy = { ...grid };
  delete copy[sourceSlot];
  return copy;
}
/** The native grid editor owns grid slots; preserve every other section. */
export function mergeDesignerGridSections(original: Section[], grids: GridSection[]): Section[] {
  const tagged = grids as DesignerGrid[];
  const retained = new Map(tagged.filter(grid => grid[sourceSlot] !== undefined).map(grid => [grid[sourceSlot]!, grid]));
  const result: Section[] = [];
  for (const { index, section } of orderedSlots(original)) {
    if (isGrid(section)) {
      const grid = retained.get(index);
      if (grid) result.push(section.grid ? { ...section, grid: cleanGrid(grid) } : { ...section, ...cleanGrid(grid) });
    } else result.push(section);
  }
  result.push(...tagged.filter(grid => grid[sourceSlot] === undefined).map(cleanGrid));
  return result.map((section, order) => ({ ...section, order }));
}

/** Move by the displayed/runtime position, retaining every top-level section. */
export function movePageSection(sections: Section[], from: number, to: number): Section[] {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= sections.length || to >= sections.length || from === to) return sections;
  const ordered = orderedPageSections(sections);
  const [moved] = ordered.splice(from, 1);
  ordered.splice(to, 0, moved);
  return ordered.map((section, order) => ({ ...section, order }));
}
