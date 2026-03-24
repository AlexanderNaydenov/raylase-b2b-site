import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/products", label: "Products" },
  { href: "/events", label: "Events" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e14]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/raylase-logo.svg"
            alt="RAYLASE"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-3 py-2 text-zinc-200 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.raylase.de/de/kontakt.html"
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-full bg-[#00a3e0] px-4 py-2 text-sm font-semibold text-[#0a0e14] transition hover:bg-[#33b5e6]"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
