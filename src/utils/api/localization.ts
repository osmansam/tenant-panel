import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";

export type TranslationRow = {
  translationKey: string;
  resourceType: string;
  sourceText: string;
  translatedText: string;
  origin: "ai" | "manual";
  status: "current" | "outdated" | "failed";
};

export type LocaleSettingsPayload = {
  sourceLocale: string;
  defaultLocale: string;
  enabledLocales: string[];
  generateWithAI: boolean;
};

export function useSaveLocaleSettings(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LocaleSettingsPayload) =>
      axiosClient.patch(`/tenant/projects/${projectId}/locales`, payload),
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

export function useEditTranslation(projectId: string, locale: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, translatedText }: { key: string; translatedText: string }) =>
      axiosClient.patch(`/tenant/projects/${projectId}/translations/${locale}/${encodeURIComponent(key)}`, { translatedText }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-translations", projectId, locale] }),
  });
}
