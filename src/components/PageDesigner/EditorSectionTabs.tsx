import { Fragment, useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui";

interface EditorSection {
  value: string;
  label: string;
  content: ReactNode;
}

interface EditorSectionTabsProps {
  label: string;
  sections: EditorSection[];
  tabbed?: boolean;
  className?: string;
  contentClassName?: string;
}

export default function EditorSectionTabs({
  label,
  sections,
  tabbed = true,
  className,
  contentClassName,
}: EditorSectionTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.value || "");

  if (!tabbed) {
    return (
      <div className={[className, contentClassName].filter(Boolean).join(" ")}>
        {sections.map((section, index) => <Fragment key={index}>{section.content}</Fragment>)}
      </div>
    );
  }

  // Preserve field order while combining entries belonging to the same section.
  const groups = new Map<string, { label: string; contents: ReactNode[] }>();
  sections.forEach((section) => {
    const group = groups.get(section.value) || { label: section.label, contents: [] };
    group.contents.push(section.content);
    groups.set(section.value, group);
  });
  const selectedTab = groups.has(activeTab) ? activeTab : sections[0]?.value || "";

  return (
    <Tabs value={selectedTab} onValueChange={setActiveTab} className={className}>
      <TabsList aria-label={label}>
        {Array.from(groups, ([value, group]) => (
          <TabsTrigger key={value} value={value}>{group.label}</TabsTrigger>
        ))}
      </TabsList>
      {Array.from(groups, ([value, group]) => (
        <TabsContent key={value} value={value} className="pb-0 pt-4">
          <div className={contentClassName}>
            {group.contents.map((content, index) => <Fragment key={index}>{content}</Fragment>)}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
