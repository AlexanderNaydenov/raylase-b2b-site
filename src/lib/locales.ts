export const locales = ["en", "de", "zh"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";

export function isLocale(s: string): s is AppLocale {
  return (locales as readonly string[]).includes(s);
}

/** Prefix a path (e.g. `/products`) with locale segment. */
export function withLocale(locale: AppLocale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `/${locale}`;
  return `/${locale}${p}`;
}

/**
 * Hygraph locale list for queries: primary locale first, then English so missing
 * localized fields (e.g. hero images) fall back to the default locale.
 */
export function localesForQuery(locale: AppLocale): AppLocale[] {
  return locale === "en" ? ["en"] : [locale, "en"];
}
