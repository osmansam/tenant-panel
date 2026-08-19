import { ComponentBlock, GridSection } from "../../types/page";

type CommitDesignerComponentInput = {
  sections: GridSection[];
  cellId: string;
  component: ComponentBlock;
  editingComponentId?: string;
  persist: (sections: GridSection[]) => Promise<void> | void;
};

export const commitDesignerComponent = async ({
  sections,
  cellId,
  component,
  editingComponentId,
  persist,
}: CommitDesignerComponentInput) => {
  const next = sections.map((section) => ({
    ...section,
    cells: section.cells.map((cell) => {
      if (cell.id !== cellId) return cell;
      return {
        ...cell,
        components: editingComponentId
          ? cell.components.map((candidate) =>
              candidate.id === editingComponentId ? component : candidate,
            )
          : [...cell.components, component],
      };
    }),
  }));
  await persist(next);
  return next;
};
