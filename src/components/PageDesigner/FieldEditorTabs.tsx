import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui";

interface EditorField {
  formKey: string;
  label?: string;
}

interface FieldEditorTabsProps<T extends EditorField> {
  fields: T[];
  label: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  children: (field: T, index: number) => ReactNode;
}

export default function FieldEditorTabs<T extends EditorField>({
  fields,
  label,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  children,
}: FieldEditorTabsProps<T>) {
  const [localIndex, setLocalIndex] = useState(0);
  const activeIndex = controlledIndex ?? localIndex;
  const selectIndex = useCallback((index: number) => {
    setLocalIndex(index);
    onActiveIndexChange?.(index);
  }, [onActiveIndexChange]);
  const previousFields = useRef(fields);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const pendingFocusIndex = useRef<number | null>(null);
  const selectedIndex = Math.max(0, Math.min(activeIndex, fields.length - 1));

  useEffect(() => {
    const previous = previousFields.current;
    if (previous === fields) return;
    previousFields.current = fields;
    const movedIndex = fields.indexOf(previous[activeIndex]);
    const nextIndex = fields.length > previous.length
      ? fields.length - 1
      : movedIndex >= 0
        ? movedIndex
        : Math.max(0, Math.min(activeIndex, fields.length - 1));
    if (fields.length < previous.length || (movedIndex >= 0 && movedIndex !== activeIndex)) {
      pendingFocusIndex.current = nextIndex;
    }
    if (nextIndex !== activeIndex) selectIndex(nextIndex);
  }, [fields, activeIndex, selectIndex]);

  useEffect(() => {
    if (pendingFocusIndex.current !== selectedIndex) return;
    pendingFocusIndex.current = null;
    if (document.activeElement === document.body) {
      tabContainerRef.current
        ?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')
        ?.focus();
    }
  }, [fields, selectedIndex]);

  if (fields.length === 0) return null;

  return (
    <div ref={tabContainerRef} className="min-w-0">
      <Tabs value={String(selectedIndex)} onValueChange={(value) => selectIndex(Number(value))}>
        <TabsList aria-label={label}>
          {fields.map((field, index) => (
            <TabsTrigger key={index} value={String(index)}>
              {field.label?.trim() || field.formKey.trim() || `Field ${index + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {fields.map((field, index) => (
          <TabsContent key={`${fields.length}-${index}`} value={String(index)} className="py-3">
            {children(field, index)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
