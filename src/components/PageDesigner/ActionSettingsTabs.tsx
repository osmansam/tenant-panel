import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { FiPlus } from "react-icons/fi";
import type { TableActionConfig } from "../../types/page";
import { Input, Tabs, TabsContent, TabsList, TabsTrigger } from "../ui";

interface ActionSettingsTabsProps {
  expanded: boolean;
  id: string;
  label: string;
  className?: string;
  actionContent: ReactNode;
  formContent?: {
    fields: ReactNode;
    layout: ReactNode;
    defaultValues: ReactNode;
    overrides?: ReactNode;
  };
  conditionsContent: ReactNode;
}

export default function ActionSettingsTabs({
  expanded,
  id,
  label,
  className,
  actionContent,
  formContent,
  conditionsContent,
}: ActionSettingsTabsProps) {
  const [activeTab, setActiveTab] = useState("action");
  const [activeFormTab, setActiveFormTab] = useState("fields");
  if (!expanded) return null;

  return (
    <Tabs id={id} value={activeTab} onValueChange={setActiveTab} className={className}>
      <TabsList aria-label={label}>
        <TabsTrigger value="action">Action</TabsTrigger>
        {formContent && <TabsTrigger value="form">Form</TabsTrigger>}
        <TabsTrigger value="conditions">Conditions</TabsTrigger>
      </TabsList>
      <TabsContent value="action" className="space-y-4 pb-0 pt-4">
        {actionContent}
      </TabsContent>
      {formContent && <TabsContent value="form" className="space-y-4 pb-0 pt-4">
        <Tabs value={activeFormTab} onValueChange={setActiveFormTab}>
          <TabsList aria-label={`${label} form sections`}>
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="defaultValues">Default values</TabsTrigger>
            {formContent.overrides && <TabsTrigger value="overrides">Overrides</TabsTrigger>}
          </TabsList>
          <TabsContent value="fields" className="space-y-4 pb-0 pt-4">{formContent.fields}</TabsContent>
          <TabsContent value="layout" className="space-y-4 pb-0 pt-4">{formContent.layout}</TabsContent>
          <TabsContent value="defaultValues" className="space-y-4 pb-0 pt-4">{formContent.defaultValues}</TabsContent>
          {formContent.overrides && (
            <TabsContent value="overrides" className="space-y-4 pb-0 pt-4">{formContent.overrides}</TabsContent>
          )}
        </Tabs>
      </TabsContent>}
      <TabsContent value="conditions" className="space-y-4 pb-0 pt-4">
        {conditionsContent}
      </TabsContent>
    </Tabs>
  );
}

export function TableActionTabs({
  tabs,
  value,
  onValueChange,
  onAdd,
  label = "Table actions",
}: {
  tabs: { value: string; label: string; render: (selected: boolean) => ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  onAdd?: () => void;
  label?: string;
}) {
  const baseId = useId();
  const selectedValue = tabs.some((tab) => tab.value === value) ? value : tabs[0]?.value;
  const navigationRef = useRef<HTMLDivElement>(null);
  const previousValue = useRef(selectedValue);
  useEffect(() => {
    const previous = previousValue.current;
    previousValue.current = selectedValue;
    if (previous !== selectedValue && !tabs.some((tab) => tab.value === previous)) {
      navigationRef.current
        ?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')
        ?.focus();
    }
  }, [selectedValue, tabs]);
  return (
    <Tabs value={selectedValue || ""} onValueChange={onValueChange} className="space-y-4">
      <div ref={navigationRef} className="flex flex-wrap items-center gap-3">
        <TabsList aria-label={label} className="min-w-0 flex-1">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              id={`${baseId}-tab-${index}`}
              aria-controls={`${baseId}-panel-${index}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {onAdd && <button type="button" onClick={onAdd} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-ui-border bg-ui-active-subtle px-3 py-2 text-sm font-semibold text-ui-foreground hover:bg-ui-active-subtle">
          <FiPlus size={14} /> Add action
        </button>}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.value}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={tab.value !== selectedValue}
          tabIndex={tab.value === selectedValue ? 0 : -1}
        >
          {tab.render(tab.value === selectedValue)}
        </div>
      ))}
    </Tabs>
  );
}

const ACTION_CONDITIONS = [
  { key: "disabledCondition", label: "Disabled condition" },
  { key: "hiddenCondition", label: "Hidden condition" },
  { key: "requiredCondition", label: "Required condition" },
] as const;

export function ActionConditionsEditor({
  action,
  onChange,
}: {
  action: TableActionConfig;
  onChange: (updates: Partial<TableActionConfig>) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {ACTION_CONDITIONS.map(({ key, label }) => (
        <label key={key} className="space-y-1">
          <span className="text-xs font-medium text-ui-muted">{label}</span>
          <Input
            value={action[key] || ""}
            onChange={(event) => onChange({ [key]: event.target.value })}
            placeholder={label}
          />
        </label>
      ))}
    </div>
  );
}
