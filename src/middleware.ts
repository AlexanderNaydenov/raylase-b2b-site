import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".") // static files: *.svg, *.png, etc.
  ) {
    return NextResponse.next();
  }

  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && isLocale(seg)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const rest = pathname === "/" ? "" : pathname;
  url.pathname = `/${defaultLocale}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/((?!_next|.*\\..*).*)"],
};
