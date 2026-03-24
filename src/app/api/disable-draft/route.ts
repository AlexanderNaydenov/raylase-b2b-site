import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/** Disables Draft Mode (exit Hygraph Live Preview). */
export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const fallback = request.nextUrl.searchParams.get("redirect");
  const path =
    fallback && fallback.startsWith("/") && !fallback.startsWith("//")
      ? fallback
      : "/en";

  const url = request.nextUrl.clone();
  url.pathname = path;
  url.search = "";
  return NextResponse.redirect(url);
}
