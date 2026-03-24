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
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Events & webinars
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Marketing landing pages for trade shows, online sessions, and
        announcements — aligned with a B2B conversion journey.
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {data.marketingPages.map((page) => (
          <Link
            key={page.id}
            href={`/events/${page.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f141c] transition hover:border-[#00a3e0]/40"
          >
            <div className="relative aspect-[21/9] bg-[#0a0e14]">
              {page.heroImage?.url ? (
                <Image
                  src={page.heroImage.url}
                  alt=""
                  fill
                  className="object-cover opacity-90 transition group-hover:opacity-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-[#00a3e0]/90 px-3 py-1 text-xs font-semibold text-[#0a0e14]">
                {typeLabel[page.pageType] ?? page.pageType}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-semibold text-white group-hover:text-[#00a3e0]">
                {page.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-500">
                {formatDate(page.eventDate) && (
                  <span>{formatDate(page.eventDate)}</span>
                )}
                {page.location && <span>· {page.location}</span>}
              </div>
              {page.excerpt && (
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  {page.excerpt}
                </p>
              )}
              <span className="mt-6 text-sm font-medium text-[#00a3e0]">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
