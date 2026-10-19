import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Input, Select, WorkspaceDialog } from "../../ui";
import { GenericButton } from "../FormElements/GenericButton";
import { createUrlSlug } from "../../../utils/urlSlug";

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buildPathFromName = createUrlSlug;

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
  const formId = useId();
  const nameId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const pathId = useId();
  const pathHelpId = useId();
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
  const { createPageAsync, isCreating } = useCreatePage();
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!pageName.trim() || pathError || isCreating || submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await createPageAsync({
        name: pageName.trim(), icon: selectedIcon,
        slug: normalizedPagePath || undefined,
        parentPageId: parentPageId || undefined,
        isOnSidebar, sections: [], isAuthenticated: true,
      });
      resetForm();
      onClose();
    } catch {
      setSubmitError(t("Your page could not be created. Your changes are still here. Please try again."));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPageName(""); setPagePath(""); setIsPagePathEdited(false);
    setIsOnSidebar(true); setSelectedIcon("MdSpaceDashboard");
    setIsIconBrowserOpen(false); setIconSearch(""); setIconCategory("All");
    setParentPageId(""); setSubmitError("");
  };

  const handleCancel = () => {
    if (isCreating || submittingRef.current) return;
    resetForm();
    onClose();
  };
  const busy = isCreating || isSubmitting;

  if (!isOpen) return null;

  const SelectedIconComponent = getIconByName(selectedIcon);

  return (
    <WorkspaceDialog initialFocusRef={nameRef} open={isOpen} onClose={handleCancel} title={t("Create New Page")} description={t("Set up a new page for your project")} className="max-w-xl" footer={
      <div className="flex justify-end gap-2.5">
        <GenericButton variant="outline" onClick={handleCancel} disabled={busy}>{t("Cancel")}</GenericButton>
        <GenericButton type="submit" form={formId} disabled={!pageName.trim() || Boolean(pathError) || busy} isLoading={busy}>{busy ? t("Creating...") : t("Create Page")}</GenericButton>
      </div>
    }>
      <form id={formId} aria-label={t("Create page")} onSubmit={handleSubmit} className="space-y-5">
        {submitError && <p role="alert" className="rounded-ui-md bg-ui-danger-subtle p-3 text-sm text-ui-danger">{submitError}</p>}
        <fieldset disabled={busy} className="min-w-0 space-y-5 border-0 p-0">
          {/* Preview Section - Moved to Top */}
          <div className="flex items-center gap-4 p-4 bg-ui-surface-subtle border border-ui-border rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-ui-border text-ui-foreground">
              <SelectedIconComponent size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-ui-muted mb-0.5">
                {t("Preview")}
              </p>
              <p className="text-sm font-semibold text-ui-foreground truncate">
                {pageName || t("New Page")}
              </p>
              <p className="mt-1 text-xs font-mono text-ui-muted truncate">
                /{normalizedPagePath || buildPathFromName(pageName) || "new-page"}
              </p>
            </div>
          </div>

          {/* Page Name and Icon - Side by Side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
            {/* Page Name Input */}
            <div>
              <label htmlFor={nameId} className="mb-2 block text-sm font-medium text-ui-foreground">{t("Page Name")} <span aria-hidden="true" className="text-ui-danger">*</span></label>
              <Input ref={nameRef} id={nameId} name="pageName" value={pageName} onChange={(event) => { setPageName(event.target.value); setSubmitError(""); }} placeholder={t("Enter page name")} required className="w-full" />
            </div>

            {/* Icon Selection */}
            <div className="min-w-0">
              <label className="block text-sm font-medium text-ui-foreground mb-2">
                {t("Icon")}
              </label>
              <Select
                disabled={busy}
                aria-label={t("Icon")}
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-ink focus:border-transparent transition-all"
              >
                {PAGE_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setIsIconBrowserOpen((current) => !current)}
                className="mt-2 w-full px-3 py-2 text-xs font-medium text-ui-foreground bg-ui-surface-subtle border border-ui-border rounded-lg hover:bg-ui-surface-subtle transition-colors"
              >
                {isIconBrowserOpen
                  ? t("Close icon browser")
                  : t("Browse icons")}
              </button>
            </div>
          </div>

          {isIconBrowserOpen && (
            <div className="rounded-xl border border-ui-border bg-ui-surface-subtle p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-ui-foreground">
                    {t("Browse icons")}
                  </h3>
                  <p className="text-xs text-ui-muted">
                    {t("Search by icon name or filter by category")}
                  </p>
                </div>
                <span className="text-xs font-medium text-ui-muted">
                  {filteredIcons.length} {t("icons")}
                </span>
              </div>

              <Input
                type="search"
                aria-label={t("Search icons")}
                value={iconSearch}
                onChange={(event) => setIconSearch(event.target.value)}
                placeholder={t("Search icons...")}
                className="w-full px-3 py-2 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-ink focus:border-transparent"
              />

              <div className="flex flex-wrap gap-1.5">
                {(["All", ...PAGE_ICON_CATEGORIES] as const).map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={iconCategory === category}
                      onClick={() => setIconCategory(category)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                        iconCategory === category
                          ? "bg-ui-ink-hover text-white"
                          : "bg-white text-ui-muted border border-ui-border hover:bg-ui-surface-subtle"
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
                        aria-pressed={isSelected}
                        title={`${option.label} (${option.value})`}
                        onClick={() => {
                          setSelectedIcon(option.value);
                          setIsIconBrowserOpen(false);
                        }}
                        className={`min-h-20 rounded-lg border p-2 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                          isSelected
                            ? "bg-ui-ink bg-ui-ink-hover text-white"
                            : "border-ui-border bg-white text-ui-foreground hover:border-ui-border-strong hover:bg-ui-surface-subtle"
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
                <div className="rounded-lg border border-dashed border-ui-border bg-white px-4 py-8 text-center text-sm text-ui-muted">
                  {t("No icons match your search")}
                </div>
              )}
            </div>
          )}

          {/* Page Path */}
          <div>
            <label htmlFor={pathId} className="block text-sm font-medium text-ui-foreground mb-2">
              {t("Page Path")}
            </label>
            <Input
              id={pathId}
              aria-invalid={Boolean(pathError)}
              aria-describedby={pathHelpId}
              value={pagePath}
              onChange={(e) => {
                setIsPagePathEdited(true);
                setPagePath(e.target.value);
              }}
              placeholder="count/:id"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-ink focus:border-transparent transition-all font-mono ${
                pathError ? "border-ui-danger" : "border-ui-border"
              }`}
            />
            <p
              id={pathHelpId}
              className={`mt-2 text-xs ${
                pathError ? "text-ui-danger" : "text-ui-muted"
              }`}
            >
              {pathError ||
                t(
                  "Use :param for route values, for example count/:id. Components can use {{route.id}} in source params."
                )}
            </p>
          </div>

          {/* Sidebar Visibility */}
          <label className="flex items-start gap-3 rounded-lg border border-ui-border bg-white p-3">
            <Input
              type="checkbox"
              checked={isOnSidebar}
              onChange={(event) => setIsOnSidebar(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ui-border text-ui-foreground focus:ring-ui-ink"
            />
            <span>
              <span className="block text-sm font-medium text-ui-foreground">
                {t("Show in sidebar")}
              </span>
              <span className="mt-0.5 block text-xs text-ui-muted">
                {t(
                  "Turn this off for detail pages like count/:id that should only open from links."
                )}
              </span>
            </span>
          </label>

          {/* Parent Page Selection */}
          <div>
            <label className="block text-sm font-medium text-ui-foreground mb-2">
              {t("Parent Page")}
            </label>
            <Select
              disabled={busy}
              aria-label={t("Parent Page")}
              value={parentPageId}
              onChange={(e) => setParentPageId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ui-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-ink focus:border-transparent transition-all"
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
            </Select>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-ui-active-subtle border border-ui-border rounded-lg p-4">
            <svg
              className="w-5 h-5 text-ui-primary flex-shrink-0 mt-0.5"
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
            <p className="text-xs text-ui-foreground leading-relaxed">
              {t(
                "The page will be created with an empty structure. You can add sections and components later."
              )}
            </p>
          </div>

        </fieldset>
      </form>
    </WorkspaceDialog>
  );
};
