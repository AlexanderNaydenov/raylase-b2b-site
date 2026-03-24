import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/products", label: "Products" },
  { href: "/events", label: "Events" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm shadow-slate-200/40">
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
              className="rounded px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.raylase.de/de/kontakt.html"
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-full bg-[#0086b8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0099d4]"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
