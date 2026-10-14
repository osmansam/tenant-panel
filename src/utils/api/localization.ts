import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";

export type TranslationRow = {
  translationKey: string;
  resourceType: string;
  sourceText: string;
  translatedText: string;
  origin: "untranslated" | "ai" | "manual";
  status: "missing" | "current" | "outdated" | "failed";
};

export type TranslationJobResult = {
  id: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  total: number;
  completed: number;
  skippedManual: number;
  failed: number;
  errorSummary?: string[];
};

export type LocaleSettingsResult = {
  translationJobId?: string;
  localizationVersion?: number;
};

export type GenerateTranslationsPayload = {
  targetLocales: string[];
  translationKeys?: string[];
};

export type LocaleSettingsPayload = {
  sourceLocale: string;
  defaultLocale: string;
  enabledLocales: string[];
  generateWithAI: boolean;
};

export async function saveLocaleSettings(projectId: string, payload: LocaleSettingsPayload): Promise<LocaleSettingsResult> {
  const response = await axiosClient.patch(`/tenant/projects/${projectId}/locales`, payload);
  return response.data.data as LocaleSettingsResult;
}

export function useSaveLocaleSettings(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LocaleSettingsPayload) => saveLocaleSettings(projectId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project", projectId] }),
  });
}

export function translationQueryOptions(projectId: string, locale: string) {
  return {
    queryKey: ["project-translations", projectId, locale],
    queryFn: async () =>
      (await axiosClient.get(`/tenant/projects/${projectId}/translations`, { params: { locale } })).data
        .data as TranslationRow[],
    enabled: Boolean(projectId && locale),
    refetchInterval: false,
  } as const;
}

export function useTranslations(projectId: string, locale: string) {
  return useQuery(translationQueryOptions(projectId, locale));
}

export function translationJobQueryOptions(projectId: string, jobId: string) {
  return {
    queryKey: ["project-translation-job", projectId, jobId],
    queryFn: async () =>
      (await axiosClient.get(`/tenant/projects/${projectId}/translation-jobs/${jobId}`)).data.data as TranslationJobResult,
    enabled: Boolean(projectId && jobId),
    refetchInterval: (query: { state: { data?: TranslationJobResult } }) => {
      const status = query.state.data?.status;
      return status === "pending" || status === "running" ? 1000 : false;
    },
  } as const;
}

export function useTranslationJob(projectId: string, jobId: string) {
  return useQuery(translationJobQueryOptions(projectId, jobId));
}

export async function generateTranslations(projectId: string, payload: GenerateTranslationsPayload): Promise<{ translationJobId: string }> {
  const body = payload.translationKeys?.length
    ? payload
    : { targetLocales: payload.targetLocales };
  const response = await axiosClient.post(`/tenant/projects/${projectId}/translations/generate`, body);
  return response.data.data as { translationJobId: string };
}

export function useGenerateTranslations(projectId: string) {
  return useMutation({
    mutationFn: (payload: GenerateTranslationsPayload) => generateTranslations(projectId, payload),
  });
}

export function useEditTranslation(projectId: string, locale: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, translatedText }: { key: string; translatedText: string }) =>
      axiosClient.patch(`/tenant/projects/${projectId}/translations/${locale}/${encodeURIComponent(key)}`, { translatedText }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-translations", projectId, locale] }),
  });
}
