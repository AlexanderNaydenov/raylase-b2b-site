import Image from "next/image";
import Link from "next/link";
import type { ProductCard as T } from "@/types/cms";

export function ProductCard({ product }: { product: T }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/50 transition hover:border-[#0086b8]/35 hover:shadow-md hover:shadow-slate-300/60"
    >
      <div className="relative aspect-[4/3] bg-slate-50">
        {product.heroImage?.url ? (
          <Image
            src={product.heroImage.url}
            alt={product.title}
            fill
            className="object-contain p-2 transition group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category?.name && (
          <span className="text-xs font-medium uppercase tracking-wider text-[#0086b8]">
            {product.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#0086b8]">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="text-sm text-slate-600">{product.subtitle}</p>
        )}
        {product.excerpt && (
          <p className="line-clamp-2 text-sm text-slate-500">{product.excerpt}</p>
        )}
        <span className="mt-auto pt-2 text-sm font-medium text-[#0086b8]">
          View details →
        </span>
      </div>
    </Link>
  );
}
