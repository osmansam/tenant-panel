import type { ComponentBlock, TabPanelTab } from "../types/page";

export const canAddTabChild = (tab: TabPanelTab): boolean =>
  (tab.components || []).length === 0;

export const saveSingleTabChild = (
  tab: TabPanelTab,
  component: ComponentBlock,
  editingComponentId?: string,
): TabPanelTab => {
  if (editingComponentId) {
    return {
      ...tab,
      components: (tab.components || []).map((current) =>
        current.id === editingComponentId ? component : current,
      ),
    };
  }
  if (!canAddTabChild(tab)) return tab;
  return { ...tab, components: [component] };
};

export const removeTabChild = (
  tab: TabPanelTab,
  componentId: string,
): TabPanelTab => ({
  ...tab,
  components: (tab.components || []).filter(
    (component) => component.id !== componentId,
  ),
});
