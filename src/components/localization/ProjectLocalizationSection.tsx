import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Project } from "../../types";
import { useEditTranslation, useSaveLocaleSettings, useTranslations } from "../../utils/api/localization";
import { validateLocaleSettings } from "./localeSettings";

const LANGUAGES = [
  ["en", "English"], ["tr", "Türkçe"], ["de", "Deutsch"], ["es", "Español"],
  ["fr", "Français"], ["ar", "العربية"], ["pt-BR", "Português (Brasil)"],
] as const;

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
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Languages & translations</h2>
      <p className="mt-1 text-sm text-gray-600">Configure project languages and edit generated translations.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Source language
          <select className="mt-1 w-full rounded border p-2" value={sourceLocale} onChange={(e) => setSourceLocale(e.target.value)}>
            {LANGUAGES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Default language
          <select className="mt-1 w-full rounded border p-2" value={defaultLocale} onChange={(e) => setDefaultLocale(e.target.value)}>
            {enabledLocales.map((code) => <option key={code} value={code}>{LANGUAGES.find(([id]) => id === code)?.[1] || code}</option>)}
          </select>
        </label>
      </div>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Enabled languages</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {LANGUAGES.map(([code, name]) => (
            <label key={code} className="flex items-center gap-2 rounded border px-3 py-2 text-sm">
              <input type="checkbox" checked={enabledLocales.includes(code)} onChange={() => toggleLocale(code)} />{name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={generateWithAI} onChange={(e) => setGenerateWithAI(e.target.checked)} />
        Generate missing translations with AI after saving newly enabled languages
      </label>
      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50" disabled={saveSettings.isPending} onClick={save}>
        {saveSettings.isPending ? "Saving…" : "Save language settings"}
      </button>

      <div className="mt-8 border-t pt-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Translation editor</h3>
          <select className="rounded border p-2" value={selectedLocale} onChange={(e) => setSelectedLocale(e.target.value)}>
            {enabledLocales.filter((locale) => locale !== sourceLocale).map((locale) => <option key={locale}>{locale}</option>)}
          </select>
        </div>
        <div className="mt-3 space-y-2">
          {translations.data?.map((row) => (
            <div key={row.translationKey} className="grid gap-2 rounded border p-3 md:grid-cols-[1fr_1fr_auto]">
              <div><div className="text-xs text-gray-500">{row.resourceType} · {row.status}</div><div>{row.sourceText}</div></div>
              <input className="rounded border p-2" defaultValue={row.translatedText} onBlur={(e) => {
                if (e.target.value !== row.translatedText) editTranslation.mutate({ key: row.translationKey, translatedText: e.target.value });
              }} />
              <span className={`self-center rounded px-2 py-1 text-xs ${row.origin === "manual" ? "bg-green-100" : "bg-purple-100"}`}>{row.origin}</span>
            </div>
          ))}
          {!translations.isLoading && !translations.data?.length && <p className="text-sm text-gray-500">No translations yet.</p>}
        </div>
      </div>
    </section>
  );
}
