import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import type { AppLocale } from "@/lib/locales";
import { withLocale } from "@/lib/locales";

export function Footer({ locale }: { locale: AppLocale }) {
  const d = getDictionary(locale);

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#e8eef4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            RAYLASE
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
            {d.footerTagline}
          </p>
        </div>
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-500">{d.footerHq}</p>
          <p className="mt-2">
            Argelsrieder Feld 2+4
            <br />
            82234 Wessling, Germany
          </p>
          <p className="mt-2">
            <a
              href="tel:+4981539999699"
              className="font-medium text-[#0086b8] hover:underline"
            >
              +49 8153 9999 699
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link
            href={withLocale(locale, "/products")}
            className="text-slate-700 hover:text-slate-900"
          >
            {d.footerProducts}
          </Link>
          <Link
            href={withLocale(locale, "/events")}
            className="text-slate-700 hover:text-slate-900"
          >
            {d.footerEvents}
          </Link>
          <a
            href="https://www.raylase.de/de/produkte.html"
            target="_blank"
            rel="noreferrer"
            className="text-slate-700 hover:text-slate-900"
          >
            {d.footerRaylaseRef}
          </a>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-4 text-center text-xs text-slate-500">
        {d.footerDisclaimer}
      </div>
    </footer>
  );
}
