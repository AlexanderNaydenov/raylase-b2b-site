import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichHtml } from "@/components/RichHtml";
import { getDictionary, pageTypeLabel } from "@/lib/dictionaries";
import { hygraphFetch } from "@/lib/hygraph";
import { MARKETING_BY_SLUG, MARKETING_SLUGS } from "@/lib/queries";
import { locales, localesForQuery, withLocale, type AppLocale } from "@/lib/locales";
import type { MarketingPageDetail } from "@/types/cms";

type SlugsData = { marketingPages: { slug: string }[] };
type PageData = { marketingPages: MarketingPageDetail[] };

type PageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>;
};

const dateLocale: Record<AppLocale, string> = {
  en: "en-GB",
  de: "de-DE",
  zh: "zh-CN",
};

export async function generateStaticParams() {
  const out: { locale: AppLocale; slug: string }[] = [];
  for (const locale of locales) {
    const data = await hygraphFetch<SlugsData>(MARKETING_SLUGS, {
      locales: [locale],
    });
    for (const p of data.marketingPages) {
      out.push({ locale, slug: p.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const data = await hygraphFetch<PageData>(MARKETING_BY_SLUG, {
    slug,
    locales: localesForQuery(locale),
  });
  const p = data.marketingPages[0];
  const d = getDictionary(locale);
  if (!p) return { title: d.metaEvents };
  return {
    title: p.title,
    description: p.excerpt ?? undefined,
  };
}

function formatDate(locale: AppLocale, iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleString(dateLocale[locale], {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const data = await hygraphFetch<PageData>(MARKETING_BY_SLUG, {
    slug,
    locales: localesForQuery(locale),
  });
  const page = data.marketingPages[0];
  if (!page) notFound();
  const d = getDictionary(locale);

  return (
    <article>
      <div className="relative border-b border-slate-200 bg-gradient-to-b from-sky-50 to-[#f0f4f8]">
        {page.heroImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={page.heroImage.url}
              alt=""
              fill
              className="object-cover opacity-25"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#f0f4f8]/95 to-[#f0f4f8]" />
          </div>
        )}
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-[#007aa8]">
            {pageTypeLabel(locale, page.pageType)}
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {page.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
            {formatDate(locale, page.eventDate) && (
              <span>{formatDate(locale, page.eventDate)}</span>
            )}
            {page.location && <span>· {page.location}</span>}
          </div>
          {page.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              {page.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {page.body?.html && <RichHtml html={page.body.html} />}
        <div className="mt-16 border-t border-slate-200 pt-10">
          <Link
            href={withLocale(locale, "/events")}
            className="text-sm font-medium text-[#0086b8] hover:underline"
          >
            {d.eventsBack}
          </Link>
        </div>
      </div>
    </article>
  );
}
