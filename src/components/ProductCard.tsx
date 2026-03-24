import Image from "next/image";
import Link from "next/link";
import type { ProductCard as T } from "@/types/cms";

export function ProductCard({ product }: { product: T }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0f141c] transition hover:border-[#00a3e0]/40 hover:shadow-lg hover:shadow-[#00a3e0]/5"
    >
      <div className="relative aspect-[4/3] bg-[#0a0e14]">
        {product.heroImageUrl ? (
          <Image
            src={product.heroImageUrl}
            alt={product.title}
            fill
            className="object-contain p-2 transition group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-600">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category?.name && (
          <span className="text-xs font-medium uppercase tracking-wider text-[#00a3e0]">
            {product.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-white group-hover:text-[#00a3e0]">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="text-sm text-zinc-400">{product.subtitle}</p>
        )}
        {product.excerpt && (
          <p className="line-clamp-2 text-sm text-zinc-500">{product.excerpt}</p>
        )}
        <span className="mt-auto pt-2 text-sm font-medium text-[#00a3e0]">
          View details →
        </span>
      </div>
    </Link>
  );
}
