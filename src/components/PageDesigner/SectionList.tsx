import type { RefObject } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type { GridSection } from "../../types/page";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { SectionOrderControls } from "./SectionOrderControls";
import type { StructureItem } from "./useDesignerState";

interface SectionListProps {
  navRef: RefObject<HTMLElement>;
  structure: StructureItem[];
  sections: GridSection[];
  selectedSection: number | null;
  selectedVisualId: string | null;
  canReorderSections: boolean;
  onAddSection: () => void;
  onAddVisualSection?: () => void;
  onDeleteSection: (index: number) => void;
  onDeleteVisualSection?: (componentId: string) => void;
  onSelectSection: (index: number) => void;
  onSelectVisual: (componentId: string) => void;
  onMoveSection: (from: number, direction: -1 | 1) => void;
}

export function SectionList({
  navRef,
  structure,
  sections,
  selectedSection,
  selectedVisualId,
  canReorderSections,
  onAddSection,
  onAddVisualSection,
  onDeleteSection,
  onDeleteVisualSection,
  onSelectSection,
  onSelectVisual,
  onMoveSection,
}: SectionListProps) {
  return (
    <nav
      ref={navRef}
      aria-label="Page structure"
      className="flex w-full shrink-0 flex-col border-b border-ui-border bg-ui-surface lg:w-64 lg:border-b-0 lg:border-r"
    >
      <div className="flex items-center justify-between gap-3 border-b border-ui-border px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-ui-foreground">Structure</h2>
          <p className="mt-0.5 text-xs text-ui-muted">
            {structure.length} section{structure.length !== 1 ? "s" : ""}
          </p>
        </div>
        {onAddVisualSection ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Add section"
              className="inline-flex items-center gap-1 rounded-ui-md bg-ui-primary px-3 py-2 text-sm text-white"
            >
              <FiPlus size={15} />
              Add
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onAddSection}>Grid section</DropdownMenuItem>
              <DropdownMenuItem onClick={onAddVisualSection}>Visual section</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <GenericButton
            onClick={onAddSection}
            size="sm"
            aria-label="Add section"
            iconLeft={<FiPlus size={15} />}
          >
            Add
          </GenericButton>
        )}
      </div>

      <div className="flex gap-1.5 overflow-x-auto p-2 lg:block lg:flex-1 lg:space-y-1 lg:overflow-y-auto">
        {structure.map((entry) => {
          const orderControls = canReorderSections ? (
            <SectionOrderControls
              position={entry.position}
              count={structure.length}
              onMove={(direction) => onMoveSection(entry.position, direction)}
            />
          ) : null;

          if (entry.kind === "visual") {
            const block = entry.component;
            const title = block.title || "Visual section";
            return (
              <div
                key={block.id}
                data-page-section-position={entry.position}
                tabIndex={-1}
                className="group relative flex min-w-52 items-center lg:min-w-0"
              >
                <button
                  type="button"
                  aria-current={selectedVisualId === block.id ? "true" : "false"}
                  onClick={() => onSelectVisual(block.id)}
                  className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-ui-md px-3 py-2.5 text-left ${
                    selectedVisualId === block.id
                      ? "bg-ui-subtle text-ui-foreground"
                      : "text-ui-muted hover:bg-ui-subtle"
                  }`}
                >
                  <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ui-border text-[11px]">
                    {entry.position + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{title},</span>{" "}
                    <span className="block text-xs capitalize text-ui-muted">visual section</span>
                  </span>
                </button>
                {orderControls}
                {onDeleteVisualSection && (
                  <button
                    type="button"
                    aria-label={`Delete visual section ${title}`}
                    onClick={() => onDeleteVisualSection(block.id)}
                    className="shrink-0 rounded-md p-1.5 text-ui-muted hover:text-ui-danger"
                  >
                    <FiTrash2 size={13} />
                  </button>
                )}
              </div>
            );
          }

          if (entry.kind === "other") {
            const title =
              entry.section.component?.title ||
              (entry.section.type === "tabs"
                ? "Tabs"
                : entry.section.component?.type || `Section ${entry.position + 1}`);
            return (
              <div
                key={entry.section.id || `section-${entry.position}`}
                data-page-section-position={entry.position}
                tabIndex={-1}
                className="flex min-w-52 items-center lg:min-w-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ui-border text-[11px]">
                    {entry.position + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{title}</span>
                    <span className="block text-xs text-ui-muted">
                      {entry.section.type === "tabs" ? "Tabs section" : "Component section"}
                    </span>
                  </span>
                </div>
                {orderControls}
              </div>
            );
          }

          const index = entry.index;
          const section = sections[index];
          if (!section) return null;
          return (
            <div
              key={`grid-${entry.position}`}
              data-page-section-position={entry.position}
              tabIndex={-1}
              className="group relative flex min-w-52 items-center lg:min-w-0"
            >
              <button
                type="button"
                aria-current={selectedSection === index ? "true" : "false"}
                onClick={() => onSelectSection(index)}
                className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-ui-md px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus ${
                  selectedSection === index
                    ? "bg-ui-subtle text-ui-foreground"
                    : "text-ui-muted hover:bg-ui-subtle hover:text-ui-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold ${
                    selectedSection === index
                      ? "bg-ui-foreground text-ui-surface"
                      : "border border-ui-border bg-ui-surface"
                  }`}
                >
                  {entry.position + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    Section {entry.position + 1},
                  </span>{" "}
                  <span className="block truncate text-xs text-ui-muted">
                    {section.columns} column{section.columns !== 1 ? "s" : ""}, {section.cells.length} cell
                    {section.cells.length !== 1 ? "s" : ""}
                  </span>
                </span>
              </button>
              {orderControls}
              <button
                type="button"
                aria-label={`Delete section ${entry.position + 1}`}
                onClick={() => onDeleteSection(index)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ui-muted hover:bg-ui-danger-subtle hover:text-ui-danger"
              >
                <FiTrash2 size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
