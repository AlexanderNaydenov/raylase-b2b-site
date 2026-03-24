import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#06080c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            RAYLASE
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
            Modular laser scan systems for industrial marking, welding, cutting,
            and battery applications — with integrated software and control
            electronics.
          </p>
        </div>
        <div className="text-sm text-zinc-400">
          <p className="font-medium text-zinc-500">Headquarters</p>
          <p className="mt-2">
            Argelsrieder Feld 2+4
            <br />
            82234 Wessling, Germany
          </p>
          <p className="mt-2">
            <a
              href="tel:+4981539999699"
              className="text-[#00a3e0] hover:underline"
            >
              +49 8153 9999 699
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/products" className="text-zinc-300 hover:text-white">
            Products
          </Link>
          <Link href="/events" className="text-zinc-300 hover:text-white">
            Events & webinars
          </Link>
          <a
            href="https://www.raylase.de/de/produkte.html"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white"
          >
            Raylase.de (reference)
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-zinc-600">
        Demo B2B site — content powered by Hygraph. Not affiliated with RAYLASE
        GmbH.
      </div>
    </footer>
  );
}
