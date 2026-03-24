const DEFAULT_ENDPOINT =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cmn4iwrhg004i07uztuwdxz30/master";

export function getHygraphEndpoint(): string {
  return process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_ENDPOINT;
}

export async function hygraphFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(getHygraphEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.HYGRAPH_TOKEN
        ? { Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
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
