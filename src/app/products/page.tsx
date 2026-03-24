import { ProductCard } from "@/components/ProductCard";
import { hygraphFetch } from "@/lib/hygraph";
import { PRODUCTS_INDEX } from "@/lib/queries";
import type { ProductCard as PC } from "@/types/cms";

type Data = { products: PC[] };

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const data = await hygraphFetch<Data>(PRODUCTS_INDEX);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Products</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Catalog-style presentation without checkout — technical specs,
        narrative copy, and related product suggestions for each solution.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
