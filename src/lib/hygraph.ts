import { draftMode } from "next/headers";

const DEFAULT_ENDPOINT =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cmn4iwrhg004i07uztuwdxz30/master";

export function getHygraphEndpoint(): string {
  return process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_ENDPOINT;
}

type Stage = "DRAFT" | "PUBLISHED";

type HygraphFetchContext = {
  stage: Stage;
  token: string | undefined;
  isDraft: boolean;
};

function getBuildContext(): HygraphFetchContext {
  const token =
    process.env.PRODUCTION_TOKEN ?? process.env.HYGRAPH_TOKEN ?? undefined;
  return { stage: "PUBLISHED", token, isDraft: false };
}

async function getRequestContext(): Promise<HygraphFetchContext> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const token = process.env.PREVIEW_TOKEN;
    if (!token) {
      throw new Error(
        "PREVIEW_TOKEN is not set. Add it in .env.local for Hygraph draft / live preview.",
      );
    }
    return { stage: "DRAFT", token, isDraft: true };
  }
  return getBuildContext();
}

export type HygraphFetchOptions = {
  /**
   * Use for `generateStaticParams` and any code that runs at build time.
   * Skips `draftMode()` (not available without a request) and always uses PUBLISHED + production token.
   */
  staticBuild?: boolean;
};

/**
 * GraphQL fetch with draft-aware stage, tokens, and caching.
 * - Production: PRODUCTION_TOKEN (or legacy HYGRAPH_TOKEN), stage PUBLISHED, ISR revalidate.
 * - Draft mode: PREVIEW_TOKEN, stage DRAFT, no cache (Hygraph live preview).
 */
export async function hygraphFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: HygraphFetchOptions,
): Promise<T> {
  const { stage, token, isDraft } = options?.staticBuild
    ? getBuildContext()
    : await getRequestContext();
  const merged = { ...variables, stage };

  const res = await fetch(getHygraphEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables: merged }),
    ...(isDraft
      ? { cache: "no-store" as const }
      : { next: { revalidate: 120 } }),
  });

  if (!res.ok) {
    throw new Error(`Hygraph HTTP ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("No data from Hygraph");
  }

  return json.data;
}
