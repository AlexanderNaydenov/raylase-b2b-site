import Image from "next/image";
import Link from "next/link";
import { hygraphFetch } from "@/lib/hygraph";
import { MARKETING_PAGES } from "@/lib/queries";
import type { MarketingPageCard } from "@/types/cms";

type Data = { marketingPages: MarketingPageCard[] };

const typeLabel: Record<string, string> = {
  EVENT: "Event",
  WEBINAR: "Webinar",
  TRADE_SHOW: "Trade show",
  NEWS: "News",
};

export const metadata = {
  title: "Events & marketing",
};

function formatDate(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const data = await hygraphFetch<Data>(MARKETING_PAGES);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Events & webinars
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Marketing landing pages for trade shows, online sessions, and
        announcements — aligned with a B2B conversion journey.
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {data.marketingPages.map((page) => (
          <Link
            key={page.id}
            href={`/events/${page.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 transition hover:border-[#0086b8]/35 hover:shadow-md"
          >
            <div className="relative aspect-[21/9] bg-slate-100">
              {page.heroImage?.url ? (
                <Image
                  src={page.heroImage.url}
                  alt=""
                  fill
                  className="object-cover opacity-95 transition group-hover:opacity-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-[#0086b8] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {typeLabel[page.pageType] ?? page.pageType}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-[#0086b8]">
                {page.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                {formatDate(page.eventDate) && (
                  <span>{formatDate(page.eventDate)}</span>
                )}
                {page.location && <span>· {page.location}</span>}
              </div>
              {page.excerpt && (
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {page.excerpt}
                </p>
              )}
              <span className="mt-6 text-sm font-medium text-[#0086b8]">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
