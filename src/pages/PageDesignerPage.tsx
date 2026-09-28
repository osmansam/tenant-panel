import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiCheck, FiCode, FiCopy, FiDownload, FiUpload } from "react-icons/fi";
import { PageDesigner } from "../components/PageDesigner/PageDesigner";
import { GenericButton } from "../components/panelComponents/FormElements/GenericButton";
import { Badge } from "../components/ui";
import { GridSection } from "../types/page";
import type { PageFilterDefinition } from "../utils/api/page";

export const PageDesignerPage: React.FC = () => {
  const [sections, setSections] = useState<GridSection[]>([]);
  const [filters, setFilters] = useState<PageFilterDefinition[]>([]);
  const [showJson, setShowJson] = useState(false);

  const handleSave = async () => {
    try {
      // Here you would save to your API
      console.log("Saving page structure:", { sections, filters });

      // Example API call:
      // await savePage({ sections });

      toast.success("Page structure saved successfully!");
    } catch (error) {
      toast.error("Failed to save page structure");
      console.error(error);
    }
  };

  const handleExport = () => {
    const json = JSON.stringify({ sections, filters }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page-structure.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Page structure exported!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setSections(Array.isArray(imported) ? imported : imported.sections || []);
        setFilters(Array.isArray(imported) ? [] : imported.filters || []);
        toast.success("Page structure imported!");
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen min-h-0 flex-col bg-ui-canvas font-ui">
      <header className="z-20 border-b border-ui-border bg-ui-surface">
        <div className="flex min-h-16 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-ui-foreground">Page Designer</h1>
              <Badge variant="mono" className="text-xs">
                {sections.length} section{sections.length !== 1 ? "s" : ""}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-ui-muted">Compose the page grid, data components, and filters.</p>
          </div>

          <div role="toolbar" aria-label="Page designer actions" className="flex flex-wrap items-center gap-1.5">
            <GenericButton variant="ghost" size="sm" onClick={() => setShowJson(!showJson)} iconLeft={<FiCode size={15} />}>
              {showJson ? "Hide JSON" : "View JSON"}
            </GenericButton>
            <label className="ui-focus-ring inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-ui-md px-3 text-xs font-medium text-ui-foreground transition hover:bg-ui-surface-subtle">
              <FiUpload size={15} aria-hidden="true" />
              Import
              <input type="file" accept=".json" onChange={handleImport} className="sr-only" />
            </label>
            <GenericButton variant="ghost" size="sm" onClick={handleExport} iconLeft={<FiDownload size={15} />}>
              Export
            </GenericButton>
            <span className="mx-1 hidden h-5 w-px bg-ui-border sm:block" aria-hidden="true" />
            <GenericButton size="sm" onClick={handleSave} iconLeft={<FiCheck size={15} />} data-primary-action="true">
              Save page
            </GenericButton>
          </div>
        </div>
      </header>

      {/* JSON Preview */}
      {showJson && (
        <section aria-labelledby="page-json-title" className="border-b border-neutral-800 bg-neutral-950">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 id="page-json-title" className="text-sm font-semibold text-neutral-100">Page structure JSON</h2>
              <GenericButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify({ sections, filters }, null, 2)
                  );
                  toast.success("Copied to clipboard!");
                }}
                variant="ghost"
                size="sm"
                className="text-neutral-300 hover:bg-neutral-800 hover:text-white"
                iconLeft={<FiCopy size={14} />}
              >
                Copy
              </GenericButton>
            </div>
            <pre className="max-h-56 overflow-auto rounded-ui-md border border-neutral-800 bg-neutral-900 p-3 font-mono text-xs text-emerald-300">
              {JSON.stringify({ sections, filters }, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* Page Designer */}
      <div className="flex-1 overflow-hidden">
        <PageDesigner
          sections={sections}
          filters={filters}
          onChange={setSections}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  );
};
