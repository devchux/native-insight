import type { WpCollection, WpPage, WpPost, WpTerm } from "@/types/wordpress";

const WORDPRESS_URL = (process.env.WORDPRESS_URL ?? "https://cms.nativeinsightng.com").replace(/\/$/, "");
const REVALIDATE_SECONDS = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? 300);
const REQUEST_TIMEOUT_MS = Number(process.env.WORDPRESS_REQUEST_TIMEOUT_MS ?? 10000);

type QueryValue = string | number | boolean | undefined;

function endpoint(path: string, query: Record<string, QueryValue> = {}) {
  const url = new URL(`/wp-json/wp/v2/${path.replace(/^\//, "")}`, WORDPRESS_URL);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url;
}

async function wpFetch<T>(path: string, query?: Record<string, QueryValue>): Promise<{ data: T; headers: Headers }> {
  const response = await fetch(endpoint(path, query), {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["wordpress", `wordpress:${path.split("/")[0]}`] },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status}) for ${path}`);
  }

  return { data: (await response.json()) as T, headers: response.headers };
}

async function wpFetchOr<T>(
  path: string,
  query: Record<string, QueryValue> | undefined,
  fallback: T,
): Promise<{ data: T; headers: Headers }> {
  try {
    return await wpFetch<T>(path, query);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`WordPress request unavailable for ${path}: ${reason}`);
    return { data: fallback, headers: new Headers() };
  }
}

export async function getPosts({
  page = 1,
  perPage = 9,
  category,
}: {
  page?: number;
  perPage?: number;
  category?: number;
} = {}): Promise<WpCollection<WpPost>> {
  const { data, headers } = await wpFetchOr<WpPost[]>("posts", {
    page,
    per_page: perPage,
    categories: category,
    _embed: true,
  }, []);

  return {
    items: data,
    total: Number(headers.get("X-WP-Total") ?? data.length),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 1),
  };
}

export async function getCategories(): Promise<WpTerm[]> {
  const { data } = await wpFetchOr<WpTerm[]>("categories", {
    per_page: 100,
    hide_empty: true,
  }, []);
  return data;
}

export async function getPost(slug: string): Promise<WpPost | null> {
  const { data } = await wpFetchOr<WpPost[]>("posts", { slug, _embed: true }, []);
  return data[0] ?? null;
}

export async function getReport(slug: string): Promise<WpPost | null> {
  const { data } = await wpFetchOr<WpPost[]>("report", { slug, _embed: true }, []);
  return data[0] ?? null;
}

export async function getPage(slug: string): Promise<WpPage | null> {
  const { data } = await wpFetchOr<WpPage[]>("pages", { slug, _embed: true }, []);
  return data[0] ?? null;
}

export async function getContentItem(slug: string): Promise<WpPost | null> {
  const post = await getPost(slug);
  if (post) return post;
  for (const type of ["report", "media-piece"] as const) {
    const { data } = await wpFetchOr<WpPost[]>(type, { slug, _embed: true }, []);
    if (data[0]) return data[0];
  }
  return null;
}

export async function getContentByType<T>(type: "report" | "media-piece" | "team", options: { page?: number; perPage?: number } = {}) {
  const { data, headers } = await wpFetchOr<T[]>(type, {
    page: options.page ?? 1,
    per_page: options.perPage ?? 100,
    _embed: true,
  }, []);

  return {
    items: data,
    total: Number(headers.get("X-WP-Total") ?? data.length),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 1),
  };
}

export { WORDPRESS_URL };
