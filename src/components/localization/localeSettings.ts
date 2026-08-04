export function validateLocaleSettings(
  sourceLocale: string,
  defaultLocale: string,
  enabledLocales: string[],
): string | null {
  if (!enabledLocales.includes(sourceLocale)) return "Source language must be enabled";
  if (!enabledLocales.includes(defaultLocale)) return "Default language must be enabled";
  return null;
}

