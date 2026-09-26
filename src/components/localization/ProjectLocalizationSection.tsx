import { useEffect, useState } from "react";
import { FiGlobe, FiSliders } from "react-icons/fi";
import { toast } from "react-toastify";
import type { Project } from "../../types";
import { useEditTranslation, useSaveLocaleSettings, useTranslations } from "../../utils/api/localization";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { Badge, EmptyState, Section, Switch, Tabs, TabsList, TabsTrigger } from "../ui";
import { validateLocaleSettings } from "./localeSettings";

const LANGUAGES = [
  ["en", "English"], ["tr", "Türkçe"], ["de", "Deutsch"], ["es", "Español"],
  ["fr", "Français"], ["ar", "العربية"], ["pt-BR", "Português (Brasil)"],
] as const;

const selectClassName = "h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus";

export function ProjectLocalizationSection({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState("translations");
  const [sourceLocale, setSourceLocale] = useState(project.sourceLocale || "en");
  const [defaultLocale, setDefaultLocale] = useState(project.defaultLocale || "en");
  const [enabledLocales, setEnabledLocales] = useState<string[]>(project.enabledLocales || ["en"]);
  const [selectedLocale, setSelectedLocale] = useState(
    defaultLocale !== sourceLocale ? defaultLocale : (project.enabledLocales || []).find((locale) => locale !== sourceLocale) || "",
  );
  const [generateWithAI, setGenerateWithAI] = useState(true);
  const saveSettings = useSaveLocaleSettings(project.id);
  const translations = useTranslations(project.id, selectedLocale);
  const editTranslation = useEditTranslation(project.id, selectedLocale);

  useEffect(() => {
    if (!selectedLocale || selectedLocale === sourceLocale || !enabledLocales.includes(selectedLocale)) {
      setSelectedLocale(enabledLocales.find((locale) => locale !== sourceLocale) || "");
    }
  }, [enabledLocales, selectedLocale, sourceLocale]);

  const toggleLocale = (locale: string) => {
    setEnabledLocales((current) => current.includes(locale) ? current.filter((item) => item !== locale) : [...current, locale]);
  };

  const save = async () => {
    const error = validateLocaleSettings(sourceLocale, defaultLocale, enabledLocales);
    if (error) return toast.error(error);
    try {
      await saveSettings.mutateAsync({ sourceLocale, defaultLocale, enabledLocales, generateWithAI });
      localStorage.setItem("currentProject", JSON.stringify({ ...project, sourceLocale, defaultLocale, enabledLocales }));
      toast.success("Language settings saved");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Could not save language settings");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Localization sections" className="bg-transparent">
          <TabsTrigger value="translations" className="inline-flex items-center gap-2">
            <FiGlobe aria-hidden="true" /> Translations
          </TabsTrigger>
          <TabsTrigger value="languages" className="inline-flex items-center gap-2">
            <FiSliders aria-hidden="true" /> Languages
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "translations" ? (
        <Section surface="outlined" className="p-0 sm:p-0">
          <div className="flex flex-col gap-3 border-b border-ui-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ui-foreground">Translation editor</h2>
                <Badge variant="neutral">{translations.data?.length || 0}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-ui-muted">Changes save automatically when a field loses focus.</p>
            </div>
            <label className="flex shrink-0 items-center gap-2 text-xs font-medium text-ui-muted">
              Target language
              <select aria-label="Target language" className="h-9 rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground" value={selectedLocale} onChange={(event) => setSelectedLocale(event.target.value)}>
                {enabledLocales.filter((locale) => locale !== sourceLocale).map((locale) => <option key={locale}>{LANGUAGES.find(([code]) => code === locale)?.[1] || locale}</option>)}
              </select>
            </label>
          </div>

          {translations.isLoading ? (
            <div role="status" className="py-10 text-center text-sm text-ui-muted">Loading translations…</div>
          ) : translations.data?.length ? (
            <div role="table" aria-label="Translations" className="min-w-0">
              <div role="row" className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_80px] gap-4 border-b border-ui-border bg-ui-surface-subtle px-5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ui-muted md:grid">
                <span role="columnheader">Source</span>
                <span role="columnheader">Translation</span>
                <span role="columnheader">Origin</span>
              </div>
              <div className="divide-y divide-ui-border">
                {translations.data.map((row) => (
                  <div key={row.translationKey} role="row" data-layout="stacked-until-medium" className="grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_80px] md:items-center md:gap-4 md:px-5">
                    <div role="cell" className="min-w-0">
                      <div className="break-words text-sm font-medium text-ui-foreground">{row.sourceText}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ui-muted">
                        <span>{row.resourceType}</span><span aria-hidden="true">·</span><span>{row.status}</span>
                      </div>
                    </div>
                    <div role="cell">
                      <input
                        aria-label={`Translation for ${row.sourceText}`}
                        className="min-h-9 w-full min-w-0 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus"
                        defaultValue={row.translatedText}
                        onBlur={(event) => {
                          if (event.target.value !== row.translatedText) editTranslation.mutate({ key: row.translationKey, translatedText: event.target.value });
                        }}
                      />
                    </div>
                    <div role="cell"><Badge variant={row.origin === "manual" ? "success" : "info"}>{row.origin}</Badge></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="No translations yet" description="Enable another language to begin translating project content." />
          )}
        </Section>
      ) : (
        <Section surface="outlined" className="mx-auto max-w-5xl">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-ui-foreground">Language settings</h2>
            <p className="mt-1 text-sm text-ui-muted">Choose the source, default, and enabled project languages.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-ui-foreground">
              Source language
              <select className={`${selectClassName} mt-1.5`} value={sourceLocale} onChange={(event) => setSourceLocale(event.target.value)}>
                {LANGUAGES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-ui-foreground">
              Default language
              <select className={`${selectClassName} mt-1.5`} value={defaultLocale} onChange={(event) => setDefaultLocale(event.target.value)}>
                {enabledLocales.map((code) => <option key={code} value={code}>{LANGUAGES.find(([id]) => id === code)?.[1] || code}</option>)}
              </select>
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className="text-xs font-semibold uppercase tracking-wide text-ui-muted">Enabled languages</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {LANGUAGES.map(([code, name]) => {
                const enabled = enabledLocales.includes(code);
                return (
                  <label key={code} className={`flex cursor-pointer items-center gap-3 rounded-ui-md border px-3 py-2.5 text-sm transition-colors ${enabled ? "border-ui-primary bg-ui-active-subtle text-ui-foreground" : "border-ui-border text-ui-muted hover:bg-ui-surface-subtle"}`}>
                    <input type="checkbox" checked={enabled} onChange={() => toggleLocale(code)} className="h-4 w-4 accent-[hsl(var(--ui-primary))]" />
                    <span className="font-medium">{name}</span>
                    <span className="ml-auto font-mono text-[11px] uppercase text-ui-muted">{code}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5 flex flex-col gap-4 border-t border-ui-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Switch checked={generateWithAI} onCheckedChange={setGenerateWithAI} label="Generate missing translations with AI" description="Runs after saving newly enabled languages." />
            <GenericButton variant="primary" onClick={save} disabled={saveSettings.isPending}>
              {saveSettings.isPending ? "Saving…" : "Save language settings"}
            </GenericButton>
          </div>
        </Section>
      )}
    </div>
  );
}
