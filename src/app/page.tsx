import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { hygraphFetch } from "@/lib/hygraph";
import { FEATURED_PRODUCTS } from "@/lib/queries";
import type { ProductCard as PC } from "@/types/cms";

type FeaturedData = {
  products: PC[];
};

export default async function HomePage() {
  const data = await hygraphFetch<FeaturedData>(FEATURED_PRODUCTS);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-sky-50 via-white to-[#f0f4f8]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,134,184,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0086b8]">
            Industrial laser scanning
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Precision scan systems for production lines
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Explore modular XY scanners, pre-focusing optics, FocusShifter
            modules, SP-ICE control electronics, and RAYGUIDE software — built
            for repeatable throughput and integration with factory systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-[#0086b8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200/60 transition hover:bg-[#0099d4]"
            >
              Browse products
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#0086b8]/40 hover:bg-sky-50/80"
            >
              Events & webinars
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured</h2>
            <p className="mt-1 text-slate-500">
              High-impact systems for conversion-focused product pages
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-[#0086b8] hover:underline"
          >
            View all products →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
