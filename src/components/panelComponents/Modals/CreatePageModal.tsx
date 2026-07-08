import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import {
  PageModel,
  useCreatePage,
  useGetTenantPages,
} from "../../../utils/api/page";
import { getIconByName } from "../../../utils/menuIcons";
import {
  filterPageIcons,
  PAGE_ICON_CATEGORIES,
  PAGE_ICON_OPTIONS,
  PageIconCategory,
} from "../../../utils/pageIcons";
import TextInput from "../FormElements/TextInput";

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buildPathFromName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const normalizePagePath = (path: string) =>
  path
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-");

const isValidPagePath = (path: string) => {
  if (!path) return true;

  return path.split("/").every((segment) => {
    if (!segment) return false;
    if (segment.startsWith(":")) {
      return /^:[A-Za-z][A-Za-z0-9_-]*$/.test(segment);
    }
    return /^[a-z0-9][a-z0-9-]*$/.test(segment);
  });
};

export const CreatePageModal: React.FC<CreatePageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [isPagePathEdited, setIsPagePathEdited] = useState(false);
  const [isOnSidebar, setIsOnSidebar] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("MdSpaceDashboard");
  const [isIconBrowserOpen, setIsIconBrowserOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [iconCategory, setIconCategory] = useState<
    PageIconCategory | "All"
  >("All");
  const [parentPageId, setParentPageId] = useState("");
  const { createPage, isCreating } = useCreatePage();
  const pages = useGetTenantPages() || [];

  const getPageId = (page: PageModel) => page._id || page.id || "";
  const parentOptions = pages.filter((page) => getPageId(page));
  const normalizedPagePath = useMemo(
    () => normalizePagePath(pagePath),
    [pagePath],
  );
  const pathError =
    normalizedPagePath && !isValidPagePath(normalizedPagePath)
      ? t("Use path segments like count, count/:id, or reports/:reportId")
      : "";
  const filteredIcons = useMemo(
    () => filterPageIcons(iconSearch, iconCategory),
    [iconCategory, iconSearch],
  );

  useEffect(() => {
    if (isPagePathEdited) return;
    setPagePath(buildPathFromName(pageName));
  }, [isPagePathEdited, pageName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName.trim() || pathError) return;

    // Create page with just name, icon, and empty sections
    createPage({
      name: pageName.trim(),
      icon: selectedIcon,
      slug: normalizedPagePath || undefined,
      parentPageId: parentPageId || undefined,
      isOnSidebar,
      sections: [], // Empty sections as requested
      isAuthenticated: true, // Default to authenticated
    });

    // Reset form and close modal
    setPageName("");
    setPagePath("");
    setIsPagePathEdited(false);
    setIsOnSidebar(true);
    setSelectedIcon("MdSpaceDashboard");
    setIsIconBrowserOpen(false);
    setIconSearch("");
    setIconCategory("All");
    setParentPageId("");
    onClose();
  };

  const handleCancel = () => {
    setPageName("");
    setPagePath("");
    setIsPagePathEdited(false);
    setIsOnSidebar(true);
    setSelectedIcon("MdSpaceDashboard");
    setIsIconBrowserOpen(false);
    setIconSearch("");
    setIconCategory("All");
    setParentPageId("");
    onClose();
  };

  if (!isOpen) return null;

  const SelectedIconComponent = getIconByName(selectedIcon);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              {t("Create New Page")}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t("Set up a new page for your project")}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 active:scale-95"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Preview Section - Moved to Top */}
          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-neutral-200 text-neutral-700">
              <SelectedIconComponent size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-500 mb-0.5">
                {t("Preview")}
              </p>
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {pageName || t("test")}
              </p>
              <p className="mt-1 text-xs font-mono text-neutral-500 truncate">
                /{normalizedPagePath || buildPathFromName(pageName) || "test"}
              </p>
            </div>
          </div>

          {/* Page Name and Icon - Side by Side */}
          <div className="grid grid-cols-[1fr,auto] gap-4">
            {/* Page Name Input */}
            <div>
              <TextInput
                label={t("Page Name")}
                value={pageName}
                onChange={(value) => setPageName(value)}
                placeholder={t("Enter page name")}
                type="text"
                requiredField
              />
            </div>

            {/* Icon Selection */}
            <div className="w-48">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t("Icon")}
              </label>
              <select
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              >
                {PAGE_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsIconBrowserOpen((current) => !current)}
                className="mt-2 w-full px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {isIconBrowserOpen
                  ? t("Close icon browser")
                  : t("Browse icons")}
              </button>
            </div>
          </div>

          {isIconBrowserOpen && (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {t("Browse icons")}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {t("Search by icon name or filter by category")}
                  </p>
                </div>
                <span className="text-xs font-medium text-neutral-500">
                  {filteredIcons.length} {t("icons")}
                </span>
              </div>

              <input
                type="search"
                value={iconSearch}
                onChange={(event) => setIconSearch(event.target.value)}
                placeholder={t("Search icons...")}
                className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />

              <div className="flex flex-wrap gap-1.5">
                {(["All", ...PAGE_ICON_CATEGORIES] as const).map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setIconCategory(category)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                        iconCategory === category
                          ? "bg-neutral-900 text-white"
                          : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                      }`}
                    >
                      {t(category)}
                    </button>
                  ),
                )}
              </div>

              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
                  {filteredIcons.map((option) => {
                    const IconComponent = getIconByName(option.value);
                    const isSelected = selectedIcon === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        title={`${option.label} (${option.value})`}
                        onClick={() => {
                          setSelectedIcon(option.value);
                          setIsIconBrowserOpen(false);
                        }}
                        className={`min-h-20 rounded-lg border p-2 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                          isSelected
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100"
                        }`}
                      >
                        <IconComponent size={22} />
                        <span className="w-full truncate text-[10px] font-medium">
                          {t(option.label)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-sm text-neutral-500">
                  {t("No icons match your search")}
                </div>
              )}
            </div>
          )}

          {/* Page Path */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t("Page Path")}
            </label>
            <input
              value={pagePath}
              onChange={(e) => {
                setIsPagePathEdited(true);
                setPagePath(e.target.value);
              }}
              placeholder="count/:id"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all font-mono ${
                pathError ? "border-red-400" : "border-neutral-300"
              }`}
            />
            <p
              className={`mt-2 text-xs ${
                pathError ? "text-red-600" : "text-neutral-500"
              }`}
            >
              {pathError ||
                t(
                  "Use :param for route values, for example count/:id. Components can use {{route.id}} in source params."
                )}
            </p>
          </div>

          {/* Sidebar Visibility */}
          <label className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-3">
            <input
              type="checkbox"
              checked={isOnSidebar}
              onChange={(event) => setIsOnSidebar(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <span>
              <span className="block text-sm font-medium text-neutral-800">
                {t("Show in sidebar")}
              </span>
              <span className="mt-0.5 block text-xs text-neutral-500">
                {t(
                  "Turn this off for detail pages like count/:id that should only open from links."
                )}
              </span>
            </span>
          </label>

          {/* Parent Page Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t("Parent Page")}
            </label>
            <select
              value={parentPageId}
              onChange={(e) => setParentPageId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            >
              <option value="">{t("No parent page")}</option>
              {parentOptions.map((page) => {
                const pageId = getPageId(page);
                return (
                  <option key={pageId} value={pageId}>
                    {page.name}
                    {page.slug ? ` /${page.slug}` : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <svg
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-blue-900 leading-relaxed">
              {t(
                "The page will be created with an empty structure. You can add sections and components later."
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isCreating}
              className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              disabled={!pageName.trim() || Boolean(pathError) || isCreating}
              className="px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
            >
              {isCreating ? t("Creating...") : t("Create Page")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
