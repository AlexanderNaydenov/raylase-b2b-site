import { draftMode } from "next/headers";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Enables Next.js Draft Mode for Hygraph Live Preview.
 * Configure the Preview widget URL template in Hygraph Studio, e.g.:
 * https://your-domain.com/api/draft?secret=YOUR_PREVIEW_SECRET&redirect=/en/products/{slug}
 *
 * @see https://hygraph.com/docs/developer-guides/schema/live-preview
 */
function isSafeRedirectPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const redirectPath = request.nextUrl.searchParams.get("redirect");

  if (!process.env.PREVIEW_SECRET) {
    return new Response("PREVIEW_SECRET is not configured", { status: 500 });
  }
  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }
  if (!redirectPath || !isSafeRedirectPath(redirectPath)) {
    return new Response(
      "Missing or invalid redirect (must be a relative path, e.g. /en/products/my-slug)",
      { status: 400 },
    );
  }

  const draft = await draftMode();
  draft.enable();

  // Allow the draft cookie inside Hygraph's Live Preview iframe (sameSite + secure).
  // @see https://hygraph.com/docs/developer-guides/schema/live-preview#nextjs
  const cookieStore = await cookies();
  const bypass = cookieStore.get("__prerender_bypass");
  if (bypass?.value) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: bypass.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  url.search = "";
  return NextResponse.redirect(url);
}
