import type { WpCollection, WpPage, WpPost, WpTerm } from "@/types/wordpress";

const WORDPRESS_URL = (process.env.WORDPRESS_URL ?? "https://nativeinsightng.com").replace(/\/$/, "");
const REVALIDATE_SECONDS = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? 300);

type QueryValue = string | number | boolean | undefined;

function endpoint(path: string, query: Record<string, QueryValue> = {}) {
  const url = new URL(`/wp-json/wp/v2/${path.replace(/^\//, "")}`, WORDPRESS_URL);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url;
}

async function wpFetch<T>(path: string, query?: Record<string, QueryValue>): Promise<{ data: T; headers: Headers }> {
  let response: Response | undefined;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch(endpoint(path, query), {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["wordpress", `wordpress:${path.split("/")[0]}`] },
    });
    if (response.ok || response.status < 500) break;
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }

  if (!response?.ok) {
    throw new Error(`WordPress request failed (${response?.status ?? "network"}) for ${path}`);
  }

  return { data: (await response.json()) as T, headers: response.headers };
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
  const { data, headers } = await wpFetch<WpPost[]>("posts", {
    page,
    per_page: perPage,
    categories: category,
    _embed: true,
  });

  return {
    items: data,
    total: Number(headers.get("X-WP-Total") ?? data.length),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 1),
  };
}

export async function getCategories(): Promise<WpTerm[]> {
  const { data } = await wpFetch<WpTerm[]>("categories", {
    per_page: 100,
    hide_empty: true,
  });
  return data;
}

export async function getPost(slug: string): Promise<WpPost | null> {
  const { data } = await wpFetch<WpPost[]>("posts", { slug, _embed: true });
  return data[0] ?? null;
}

export async function getReport(slug: string): Promise<WpPost | null> {
  const { data } = await wpFetch<WpPost[]>("report", { slug, _embed: true });
  return data[0] ?? null;
}

export async function getPage(slug: string): Promise<WpPage | null> {
  const { data } = await wpFetch<WpPage[]>("pages", { slug, _embed: true });
  return data[0] ?? null;
}

export async function getContentItem(slug: string): Promise<WpPost | null> {
  const post = await getPost(slug);
  if (post) return post;
  for (const type of ["report", "media-piece"] as const) {
    const { data } = await wpFetch<WpPost[]>(type, { slug, _embed: true });
    if (data[0]) return data[0];
  }
  return null;
}

export async function getContentByType<T>(type: "report" | "media-piece" | "team", options: { page?: number; perPage?: number } = {}) {
  const { data, headers } = await wpFetch<T[]>(type, {
    page: options.page ?? 1,
    per_page: options.perPage ?? 100,
    _embed: true,
  });

  return {
    items: data,
    total: Number(headers.get("X-WP-Total") ?? data.length),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 1),
  };
}

export { WORDPRESS_URL };
