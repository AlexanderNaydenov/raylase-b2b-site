import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCarousel } from "@/components/ProductCarousel";
import { RichHtml } from "@/components/RichHtml";
import { hygraphFetch } from "@/lib/hygraph";
import { PRODUCT_BY_SLUG, PRODUCT_SLUGS } from "@/lib/queries";
import type { ProductDetail } from "@/types/cms";

type ProductSlugData = { products: { slug: string }[] };
type ProductData = { products: ProductDetail[] };

export async function generateStaticParams() {
  const data = await hygraphFetch<ProductSlugData>(PRODUCT_SLUGS);
  return data.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await hygraphFetch<ProductData>(PRODUCT_BY_SLUG, { slug });
  const p = data.products[0];
  if (!p) return { title: "Product" };
  return {
    title: p.title,
    description: p.excerpt ?? p.subtitle ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await hygraphFetch<ProductData>(PRODUCT_BY_SLUG, { slug });
  const product = data.products[0];
  if (!product) notFound();

  return (
    <article className="pb-20">
      <div className="border-b border-slate-200 bg-gradient-to-b from-sky-50/90 to-[#f0f4f8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center sm:px-6">
          <div>
            {product.category?.name && (
              <Link
                href="/products"
                className="text-xs font-semibold uppercase tracking-wider text-[#0086b8] hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="mt-3 text-lg text-[#007aa8]">{product.subtitle}</p>
            )}
            {product.excerpt && (
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {product.excerpt}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.raylase.de/de/kontakt.html"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#0086b8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200/50 transition hover:bg-[#0099d4]"
              >
                Request consultation
              </a>
              <Link
                href="/products"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Back to catalog
              </Link>
            </div>
          </div>
          <div className="relative aspect-square max-h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 lg:max-h-none">
            {product.heroImage?.url ? (
              <Image
                src={product.heroImage.url}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {product.body?.html && (
              <RichHtml html={product.body.html} className="text-base" />
            )}
          </div>
          <aside className="lg:col-span-1">
            {product.specs && product.specs.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Specifications
                </h2>
                <dl className="mt-4 space-y-4">
                  {product.specs.map((row) => (
                    <div
                      key={`${row.label}-${row.value}`}
                      className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-sm text-slate-800">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>

        {product.relatedProducts?.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-16">
            <ProductCarousel products={product.relatedProducts} />
          </div>
        )}
      </div>
    </article>
  );
}
