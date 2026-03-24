"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type AppLocale } from "@/lib/locales";

const labels: Record<AppLocale, string> = {
  en: "EN",
  de: "DE",
  zh: "中文",
};

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();
  const stripped =
    pathname.replace(/^\/(en|de|zh)(?=\/|$)/, "") || "/";
  const hrefFor = (l: AppLocale) =>
    stripped === "/" ? `/${l}` : `/${l}${stripped}`;

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-medium">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            className={
              active
                ? "rounded-full bg-white px-2.5 py-1 text-slate-900 shadow-sm"
                : "rounded-full px-2.5 py-1 text-slate-500 transition hover:text-slate-800"
            }
          >
            {labels[l]}
          </Link>
        );
      })}
    </div>
  );
}
