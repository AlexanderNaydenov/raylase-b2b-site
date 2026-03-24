"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { ProductCard as T } from "@/types/cms";

export function ProductCarousel({ products }: { products: T[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products.length) return null;

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Related products
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="rounded border border-white/15 bg-[#0f141c] px-3 py-2 text-sm text-zinc-200 transition hover:border-[#00a3e0]/50 hover:text-white"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="rounded border border-white/15 bg-[#0f141c] px-3 py-2 text-sm text-zinc-200 transition hover:border-[#00a3e0]/50 hover:text-white"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
