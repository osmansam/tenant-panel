import React, { useState } from "react";
import { toast } from "react-toastify";
import { PageDesigner } from "../components/PageDesigner/PageDesigner";
import { GridSection } from "../types/page";

export const PageDesignerPage: React.FC = () => {
  const [sections, setSections] = useState<GridSection[]>([]);
  const [showJson, setShowJson] = useState(false);

  const handleSave = async () => {
    try {
      // Here you would save to your API
      console.log("Saving page structure:", sections);

      // Example API call:
      // await savePage({ sections });

      toast.success("Page structure saved successfully!");
    } catch (error) {
      toast.error("Failed to save page structure");
      console.error(error);
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(sections, null, 2);
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
        setSections(imported);
        toast.success("Page structure imported!");
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Page Designer</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowJson(!showJson)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            {showJson ? "Hide" : "Show"} JSON
          </button>

          <label className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm cursor-pointer">
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Export
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            Save Page
          </button>
        </div>
      </div>

      {/* JSON Preview */}
      {showJson && (
        <div className="bg-gray-900 text-gray-100 p-4 overflow-auto max-h-64">
          <pre className="text-xs">{JSON.stringify(sections, null, 2)}</pre>
        </div>
      )}

      {/* Page Designer */}
      <div className="flex-1 overflow-hidden">
        <PageDesigner sections={sections} onChange={setSections} />
      </div>
    </div>
  );
};
