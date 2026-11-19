import { useCallback, useEffect, useRef } from "react";
import type { ComponentBlock, GridSection } from "../../types/page";
import type { PageModel as RuntimePageModel } from "../../utils/api/page";
import { ensurePageRuntimeIds } from "../../utils/pageBindings";
import { ensureDesignerGridCellIds } from "../../utils/pageDesignerTableConfig";
import { commitDesignerComponent } from "./componentCommit";

interface UseDesignerPersistenceOptions {
  sections: GridSection[];
  runtimePage: RuntimePageModel;
  onChange: (sections: GridSection[]) => void;
  onComponentSave?: (sections: GridSection[]) => Promise<void> | void;
}

export function useDesignerPersistence({
  sections,
  runtimePage,
  onChange,
  onComponentSave,
}: UseDesignerPersistenceOptions) {
  const isEnsuringRuntimeIds = useRef(false);

  useEffect(() => {
    if (isEnsuringRuntimeIds.current) {
      isEnsuringRuntimeIds.current = false;
      return;
    }
    const ensuredCellSections = ensureDesignerGridCellIds(sections);
    if (ensuredCellSections !== sections) {
      isEnsuringRuntimeIds.current = true;
      onChange(ensuredCellSections);
      return;
    }
    const ensured = ensurePageRuntimeIds(runtimePage);
    if (ensured.sections && ensured.sections !== runtimePage.sections) {
      isEnsuringRuntimeIds.current = true;
      onChange(ensured.sections as unknown as GridSection[]);
    }
  }, [onChange, runtimePage, sections]);

  const commitComponent = useCallback(
    async (
      cellId: string,
      component: ComponentBlock,
      editingComponentId?: string | null,
    ) => {
      const nextSections = await commitDesignerComponent({
        sections,
        cellId,
        component,
        editingComponentId: editingComponentId ?? undefined,
        persist: onComponentSave || (() => undefined),
      });
      // A persistence owner applies its own state update, preserving newer drafts.
      if (!onComponentSave) onChange(nextSections);
    },
    [onChange, onComponentSave, sections],
  );

  return { commitComponent };
}
