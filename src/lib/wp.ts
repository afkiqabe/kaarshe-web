export type WpRendered = { rendered: string };

export type WpMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<
      string,
      { source_url: string; width: number; height: number }
    >;
  };
};

export type WpAuthor = {
  id: number;
  name: string;
  avatar_urls?: Record<string, string>;
};

export type WpTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
};

export type WpPost = {
  id: number;
  slug: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  date: string;
  featured_media?: number;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    author?: WpAuthor[];
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
  };
};

export type WpCptItem = {
  id: number;
  slug: string;
  title: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  date?: string;
  _embedded?: {
    author?: WpAuthor[];
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
  };
  acf?: Record<string, unknown>;
};

export type WpPage = {
  id: number;
  slug: string;
  title: WpRendered;
  content: WpRendered;
  excerpt?: WpRendered;
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
  acf?: Record<string, unknown>;
};

const WP_API_BASE = process.env.WORDPRESS_API_BASE;
if (!WP_API_BASE) {
  throw new Error("Missing WORDPRESS_API_BASE env var");
}

// Optional auth headers (if you use Application Passwords)
export function getWpAuthHeaders() {
  const user = process.env.WORDPRESS_APP_USER;
  const pass = process.env.WORDPRESS_APP_PASSWORD;
  if (!user || !pass) return {} as Record<string, string>;
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return { Authorization: `Basic ${token}` } as Record<string, string>;
}

function decodeHtmlEntities(input: string) {
  return input
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

export function stripHtml(input: string) {
  return decodeHtmlEntities(
    input
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

export function formatWpDate(dateIso: string) {
  try {
    return new Date(dateIso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return dateIso;
  }
}

export function estimateReadTimeFromHtml(html: string) {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

async function wpFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: { revalidate?: number; tag?: string },
) {
  const url = new URL(
    `${WP_API_BASE}${path.startsWith("/") ? "" : "/"}${path}`,
  );
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    headers: { ...getWpAuthHeaders() },
    next: {
      revalidate: options?.revalidate ?? 60,
      tags: options?.tag ? [options.tag] : undefined,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WordPress fetch failed (${res.status}) ${url}: ${text}`);
  }

  const data = (await res.json()) as T;
  return { data, res };
}

export async function getWpPosts(params?: {
  perPage?: number;
  page?: number;
  search?: string;
  categories?: number;
  exclude?: number[];
}) {
  const perPage = params?.perPage ?? 10;
  const page = params?.page ?? 1;

  const { data, res } = await wpFetch<WpPost[]>(
    "/posts",
    {
      per_page: perPage,
      page,
      search: params?.search,
      categories: params?.categories,
      exclude: params?.exclude?.join(","),
      _embed: true,
    },
    { revalidate: 60, tag: "wp:posts" },
  );

  const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
  const total = Number(res.headers.get("x-wp-total") ?? String(data.length));

  return { posts: data, totalPages, total };
}

export async function getWpPostBySlug(slug: string) {
  const { data } = await wpFetch<WpPost[]>(
    "/posts",
    {
      slug,
      _embed: true,
    },
    { revalidate: 60, tag: `wp:post:${slug}` },
  );

  return data[0] ?? null;
}

export async function getWpCptItems(
  postType: string,
  params?: { perPage?: number; page?: number },
) {
  const perPage = params?.perPage ?? 20;
  const page = params?.page ?? 1;

  const { data, res } = await wpFetch<WpCptItem[]>(
    `/${postType}`,
    {
      per_page: perPage,
      page,
      _embed: true,
    },
    { revalidate: 60, tag: `wp:cpt:${postType}` },
  );

  const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
  const total = Number(res.headers.get("x-wp-total") ?? String(data.length));

  return { items: data, totalPages, total };
}

export function pickFirstTermByTaxonomy(
  post: { _embedded?: { "wp:term"?: WpTerm[][] } },
  taxonomy: string,
) {
  const terms = post._embedded?.["wp:term"] ?? [];
  for (const group of terms) {
    const match = group.find((t) => t.taxonomy === taxonomy);
    if (match) return match;
  }
  return null;
}

export async function getWpCategories(params?: { perPage?: number }) {
  const { data } = await wpFetch<WpTerm[]>(
    "/categories",
    {
      per_page: params?.perPage ?? 100,
      hide_empty: true,
    },
    { revalidate: 3600, tag: "wp:categories" },
  );
  return data;
}

export async function getWpPageBySlug(slug: string) {
  const { data } = await wpFetch<WpPage[]>(
    "/pages",
    {
      slug,
      _embed: true,
    },
    { revalidate: 300, tag: `wp:page:${slug}` },
  );
  return data[0] ?? null;
}

export function pickFeaturedImageUrl(post: Pick<WpPost, "_embedded">) {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

export function pickFeaturedImageAlt(post: Pick<WpPost, "_embedded">) {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? "";
}

export function pickPrimaryCategory(post: Pick<WpPost, "_embedded">) {
  const terms = post._embedded?.["wp:term"] ?? [];
  for (const group of terms) {
    const firstCategory = group.find((t) => t.taxonomy === "category");
    if (firstCategory) return firstCategory;
  }
  return null;
}

export function pickTags(post: Pick<WpPost, "_embedded">) {
  const terms = post._embedded?.["wp:term"] ?? [];
  const tags: WpTerm[] = [];
  for (const group of terms) {
    for (const term of group) {
      if (term.taxonomy === "post_tag") tags.push(term);
    }
  }
  return tags;
}
