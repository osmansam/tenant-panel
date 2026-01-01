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
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Modern Header - Fixed with blur */}
      <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Page Designer
                </h1>
                <p className="text-xs text-neutral-500">
                  Build your page structure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowJson(!showJson)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span>{showJson ? "Hide" : "Show"} JSON</span>
              </button>

              <label className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all active:scale-95 cursor-pointer">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                <span>Export</span>
              </button>

              <div className="w-px h-6 bg-neutral-200 mx-1" />

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg transition-all active:scale-95 shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Preview */}
      {showJson && (
        <div className="border-b border-neutral-200 bg-neutral-900 shadow-lg animate-slide-in">
          <div className="px-8 lg:px-12 py-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-neutral-100">
                  Page Structure JSON
                </h3>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(sections, null, 2)
                  );
                  toast.success("Copied to clipboard!");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-all active:scale-95"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy to clipboard</span>
              </button>
            </div>
            <pre className="text-xs text-emerald-300 overflow-auto max-h-64 bg-neutral-950 rounded-xl p-4 border border-neutral-800 font-mono shadow-inner">
              {JSON.stringify(sections, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Page Designer */}
      <div className="flex-1 overflow-hidden">
        <PageDesigner sections={sections} onChange={setSections} />
      </div>
    </div>
  );
};
