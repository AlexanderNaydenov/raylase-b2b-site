import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichHtml } from "@/components/RichHtml";
import { hygraphFetch } from "@/lib/hygraph";
import { MARKETING_BY_SLUG, MARKETING_SLUGS } from "@/lib/queries";
import type { MarketingPageDetail } from "@/types/cms";

type SlugsData = { marketingPages: { slug: string }[] };
type PageData = { marketingPages: MarketingPageDetail[] };

const typeLabel: Record<string, string> = {
  EVENT: "Event",
  WEBINAR: "Webinar",
  TRADE_SHOW: "Trade show",
  NEWS: "News",
};

export async function generateStaticParams() {
  const data = await hygraphFetch<SlugsData>(MARKETING_SLUGS);
  return data.marketingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await hygraphFetch<PageData>(MARKETING_BY_SLUG, { slug });
  const p = data.marketingPages[0];
  if (!p) return { title: "Event" };
  return {
    title: p.title,
    description: p.excerpt ?? undefined,
  };
}

function formatDate(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await hygraphFetch<PageData>(MARKETING_BY_SLUG, { slug });
  const page = data.marketingPages[0];
  if (!page) notFound();

  return (
    <article>
      <div className="relative border-b border-white/10 bg-[#0c1219]">
        {page.heroImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={page.heroImage.url}
              alt=""
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14]/80 via-[#0a0e14] to-[#0a0e14]" />
          </div>
        )}
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-block rounded-full bg-[#00a3e0]/20 px-3 py-1 text-xs font-semibold text-[#33b5e6]">
            {typeLabel[page.pageType] ?? page.pageType}
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {page.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-400">
            {formatDate(page.eventDate) && <span>{formatDate(page.eventDate)}</span>}
            {page.location && <span>· {page.location}</span>}
          </div>
          {page.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-zinc-300">
              {page.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {page.body?.html && <RichHtml html={page.body.html} />}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/events"
            className="text-sm font-medium text-[#00a3e0] hover:underline"
          >
            ← All events
          </Link>
        </div>
      </div>
    </article>
  );
}
