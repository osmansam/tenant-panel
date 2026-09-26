import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Project } from "../../types";
import { useEditTranslation, useSaveLocaleSettings, useTranslations } from "../../utils/api/localization";
import { GenericButton } from "../panelComponents/FormElements/GenericButton";
import { Badge, EmptyState, Section, SectionHeader, Switch } from "../ui";
import { validateLocaleSettings } from "./localeSettings";

const LANGUAGES = [
  ["en", "English"], ["tr", "Türkçe"], ["de", "Deutsch"], ["es", "Español"],
  ["fr", "Français"], ["ar", "العربية"], ["pt-BR", "Português (Brasil)"],
] as const;

const selectClassName = "h-9 w-full rounded-ui-md border border-ui-border bg-ui-surface px-3 text-sm text-ui-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus";

export function ProjectLocalizationSection({ project }: { project: Project }) {
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
    <div className="space-y-2">
      <Section surface="outlined">
        <SectionHeader
          title="Language settings"
          description="Choose the source, default, and enabled project languages."
        />
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

        <fieldset className="mt-5 border-t border-ui-border pt-4">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-ui-muted">Enabled languages</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {LANGUAGES.map(([code, name]) => (
              <label key={code} className="inline-flex items-center gap-2 rounded-ui-md border border-ui-border px-3 py-2 text-sm text-ui-foreground hover:bg-ui-subtle">
                <input type="checkbox" checked={enabledLocales.includes(code)} onChange={() => toggleLocale(code)} className="h-4 w-4" />
                {name}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 border-t border-ui-border pt-4">
          <Switch
            checked={generateWithAI}
            onCheckedChange={setGenerateWithAI}
            label="Generate missing translations with AI"
            description="Runs after saving newly enabled languages."
          />
        </div>
        <div className="mt-4 flex justify-end">
          <GenericButton variant="primary" onClick={save} disabled={saveSettings.isPending}>
            {saveSettings.isPending ? "Saving…" : "Save language settings"}
          </GenericButton>
        </div>
      </Section>

      <Section surface="outlined">
        <SectionHeader
          title="Translation editor"
          description="Review generated content and edit translations inline. Changes save when a field loses focus."
          actions={
            <label className="flex items-center gap-2 text-xs font-medium text-ui-muted">
              Target
              <select aria-label="Target language" className="h-8 rounded-ui-md border border-ui-border bg-ui-surface px-2 text-sm text-ui-foreground" value={selectedLocale} onChange={(event) => setSelectedLocale(event.target.value)}>
                {enabledLocales.filter((locale) => locale !== sourceLocale).map((locale) => <option key={locale}>{locale}</option>)}
              </select>
            </label>
          }
        />

        {translations.isLoading ? (
          <div role="status" className="py-8 text-center text-sm text-ui-muted">Loading translations…</div>
        ) : translations.data?.length ? (
          <div className="divide-y divide-ui-border border-y border-ui-border">
            {translations.data.map((row) => (
              <div key={row.translationKey} data-layout="stacked-until-medium" className="grid gap-3 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-ui-muted">
                    <span>{row.resourceType}</span><span aria-hidden="true">·</span><span>{row.status}</span>
                  </div>
                  <div className="break-words text-sm text-ui-foreground">{row.sourceText}</div>
                </div>
                <input
                  aria-label={`Translation for ${row.sourceText}`}
                  className="min-h-9 min-w-0 rounded-ui-md border border-ui-border bg-ui-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus"
                  defaultValue={row.translatedText}
                  onBlur={(event) => {
                    if (event.target.value !== row.translatedText) editTranslation.mutate({ key: row.translationKey, translatedText: event.target.value });
                  }}
                />
                <Badge variant={row.origin === "manual" ? "success" : "info"}>{row.origin}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No translations yet" description="Translations appear here after another language is enabled and content is generated." />
        )}
      </Section>
    </div>
  );
}
