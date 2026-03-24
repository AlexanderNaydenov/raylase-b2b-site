import { ProductCard } from "@/components/ProductCard";
import { getDictionary } from "@/lib/dictionaries";
import { hygraphFetch } from "@/lib/hygraph";
import { PRODUCTS_INDEX } from "@/lib/queries";
import { localesForQuery, type AppLocale } from "@/lib/locales";
import type { ProductCard as PC } from "@/types/cms";

type Data = { products: PC[] };

type PageProps = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return { title: d.metaProducts };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await hygraphFetch<Data>(PRODUCTS_INDEX, {
    locales: localesForQuery(locale),
  });
  const d = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {d.productsTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">{d.productsLead}</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
