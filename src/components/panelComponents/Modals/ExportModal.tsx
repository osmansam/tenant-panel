import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import type { Field } from "../../../utils/api/container";
import { Checkbox, Input, Label, ResponsiveActionBar, WorkspaceDialog } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";

const humanize = (key: string) => key.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim().replace(/^./, (c) => c.toUpperCase());
const getFieldLabel = (field: Field) => field.frontend?.displayName || humanize(field.name);

type Props = {
  isOpen: boolean;
  close: () => void;
  fields: Field[];
  onExport: (selectedFields: string[], includeSearch: boolean, includeFilters: boolean, exportScope: "all" | "currentPage" | "numberOfPages", pageCount?: number) => void;
  schemaName: string;
  currentPage: number;
  totalPages: number;
};

export default function ExportModal({ isOpen, close, fields, onExport, schemaName, currentPage, totalPages }: Props) {
  const { t } = useTranslation();
  const wasOpen = useRef(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [includeSearch, setIncludeSearch] = useState(true);
  const [includeFilters, setIncludeFilters] = useState(true);
  const [exportScope, setExportScope] = useState<"all" | "currentPage" | "numberOfPages">("all");
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      setSelectedFields(fields.map((field) => field.name));
      setIncludeSearch(true);
      setIncludeFilters(true);
      setExportScope("all");
      setPageCount(1);
      setSearch("");
    }
    wasOpen.current = isOpen;
  }, [isOpen, fields]);

  const visibleFields = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return fields.filter((field) => [getFieldLabel(field), field.name].some((label) => label.toLocaleLowerCase().includes(query)));
  }, [fields, search]);
  const selected = selectedFields.filter((name) => fields.some((field) => field.name === name));
  const allSelected = fields.length > 0 && selected.length === fields.length;
  const handleExport = () => {
    if (!selected.length) return;
    onExport(selected, includeSearch, includeFilters, exportScope, exportScope === "numberOfPages" ? Math.max(1, Math.min(totalPages, pageCount)) : undefined);
    close();
  };

  return (
    <WorkspaceDialog
      open={isOpen}
      onClose={close}
      title={t("Export {{name}}", { name: schemaName })}
      description={t("Choose columns and the records to include in your download.")}
      className="max-w-2xl"
      footer={<ResponsiveActionBar align="between"><p className="text-xs text-ui-muted" aria-live="polite">{t("{{selected}} of {{total}} fields selected", { selected: selected.length, total: fields.length })}</p><div className="flex flex-wrap gap-2"><GenericButton variant="ghost" onClick={close}>{t("Cancel")}</GenericButton><GenericButton onClick={handleExport} disabled={!selected.length}>{t("Export")}</GenericButton></div></ResponsiveActionBar>}
    >
      <div className="space-y-6">
        <fieldset className="min-w-0 space-y-3">
          <legend className="text-sm font-semibold">{t("Select Fields")}</legend>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-0 flex-1"><FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" /><Input type="search" aria-label={t("Search fields")} placeholder={t("Search fields…")} value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" /></div>
            <GenericButton variant="outline" size="sm" disabled={!fields.length} onClick={() => setSelectedFields(allSelected ? [] : fields.map((field) => field.name))}>{allSelected ? t("Deselect All") : t("Select All")}</GenericButton>
          </div>
          <div className="grid max-h-64 gap-1 overflow-y-auto rounded-ui-md border border-ui-border p-2 sm:grid-cols-2">
            {visibleFields.map((field) => <label key={field.name} className="flex min-w-0 cursor-pointer items-center gap-3 rounded-ui-sm p-2.5 text-sm hover:bg-ui-surface-subtle"><Checkbox checked={selected.includes(field.name)} onChange={() => setSelectedFields((previous) => previous.includes(field.name) ? previous.filter((name) => name !== field.name) : [...previous, field.name])} /><span className="min-w-0 break-words">{t(getFieldLabel(field))}</span></label>)}
            {!visibleFields.length && <p role="status" className="p-3 text-sm text-ui-muted sm:col-span-2">{fields.length ? t("No fields match your search.") : t("There are no fields available to export.")}</p>}
          </div>
        </fieldset>

        <fieldset className="space-y-2 border-t border-ui-border pt-4">
          <legend className="px-1 text-sm font-semibold">{t("Export Scope")}</legend>
          {([ ["all", t("All Data")], ["currentPage", `${t("This Page")} (${t("Page")} ${currentPage})`], ["numberOfPages", t("Number of Pages")] ] as const).map(([scope, label]) => <label key={scope} className="flex cursor-pointer items-center gap-3 rounded-ui-sm px-2.5 py-2 text-sm hover:bg-ui-surface-subtle"><Input type="radio" name="exportScope" value={scope} checked={exportScope === scope} onChange={() => setExportScope(scope)} />{label}</label>)}
          {exportScope === "numberOfPages" && <div className="ml-9 space-y-2"><Label htmlFor="export-page-count">{t("Pages to export")}</Label><div className="flex items-center gap-2"><Input id="export-page-count" type="number" min={1} max={Math.max(1, totalPages)} value={pageCount} onChange={(event) => setPageCount(Math.max(1, Math.min(Math.max(1, totalPages), Number(event.target.value) || 1)))} className="w-24" /><span className="text-xs text-ui-muted">{t("of")} {totalPages} {t("pages")}</span></div></div>}
        </fieldset>

        <fieldset className="space-y-2 border-t border-ui-border pt-4">
          <legend className="px-1 text-sm font-semibold">{t("Options")}</legend>
          <label className="flex cursor-pointer items-center gap-3 rounded-ui-sm px-2.5 py-2 text-sm hover:bg-ui-surface-subtle"><Checkbox checked={includeSearch} onChange={(event) => setIncludeSearch(event.target.checked)} />{t("Include Current Search")}</label>
          <label className="flex cursor-pointer items-center gap-3 rounded-ui-sm px-2.5 py-2 text-sm hover:bg-ui-surface-subtle"><Checkbox checked={includeFilters} onChange={(event) => setIncludeFilters(event.target.checked)} />{t("Include Active Filters")}</label>
        </fieldset>
      </div>
    </WorkspaceDialog>
  );
}
