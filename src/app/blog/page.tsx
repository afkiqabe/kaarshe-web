import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/ui/PostCard";
import { BlogPaginationClient } from "./BlogPaginationClient";
import {
  formatWpDate,
  getWpCategories,
  getWpPosts,
  pickFeaturedImageAlt,
  pickFeaturedImageUrl,
  pickPrimaryCategory,
  stripHtml,
  type WpPost,
} from "@/lib/wp";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolved = (await searchParams) ?? {};
  const page = typeof resolved.page === "string" ? Number(resolved.page) : 1;
  const category =
    typeof resolved.category === "string" ? resolved.category : "all";

  const categories = await getWpCategories({ perPage: 100 });
  const activeCategoryTerm =
    category === "all"
      ? null
      : (categories.find((c) => c.slug === category) ?? null);

  const featuredResult = await getWpPosts({
    perPage: 1,
    page: 1,
    categories: activeCategoryTerm?.id,
  });
  const featured = featuredResult.posts[0] ?? null;

  const listResult = await getWpPosts({
    perPage: 6,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    categories: activeCategoryTerm?.id,
    exclude: featured ? [featured.id] : undefined,
  });

  const heroTitle = "Insights & Perspectives";
  const heroDescription =
    "Exploring the intersections of strategy, governance, and innovation. Written by the thinkers at Kaarshe.";

  const mapPostCard = (
    post: Pick<
      WpPost,
      "id" | "slug" | "title" | "excerpt" | "date" | "_embedded"
    >,
  ) => {
    const primaryCategory = pickPrimaryCategory(post)?.name ?? "Insights";
    return {
      id: String(post.id),
      category: primaryCategory,
      title: stripHtml(post.title.rendered),
      excerpt: stripHtml(post.excerpt.rendered),
      date: formatWpDate(post.date),
      image: pickFeaturedImageUrl(post),
      slug: post.slug,
    };
  };

  return (
    <>
      {/* Hero Section */}
      <Section background="white" className="border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title={heroTitle}
            description={heroDescription}
            align="center"
          />
        </div>
      </Section>

      {/* Featured Article */}
      {featured ? (
        <Section>
          <Link
            href={`/blog/${featured.slug}`}
            className="group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 overflow-hidden rounded-lg">
                <div className="aspect-video bg-zinc-200 relative transition-transform duration-700 group-hover:scale-105">
                  {pickFeaturedImageUrl(featured) ? (
                    <Image
                      src={pickFeaturedImageUrl(featured) ?? ""}
                      alt={
                        pickFeaturedImageAlt(featured) ||
                        stripHtml(featured.title.rendered)
                      }
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : null}
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent-burgundy text-xs font-bold uppercase tracking-widest">
                    {pickPrimaryCategory(featured)?.name ?? "Insights"}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
                    Featured
                  </span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight group-hover:text-accent-burgundy transition-colors">
                  {stripHtml(featured.title.rendered)}
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed mb-8">
                  {stripHtml(featured.excerpt.rendered)}
                </p>
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-zinc-200 relative overflow-hidden">
                    {/* WordPress author avatars are often from Gravatar (external domain). */}
                    {featured._embedded?.author?.[0]?.avatar_urls?.["96"] ? (
                      <Image
                        src={featured._embedded.author[0].avatar_urls["96"]}
                        alt={featured._embedded.author[0].name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {featured._embedded?.author?.[0]?.name ?? "Kaarshe"}
                    </p>
                    <p className="text-xs text-zinc-500 font-sans uppercase tracking-tight">
                      {formatWpDate(featured.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Section>
      ) : null}

      {/* Article Grid */}
      <Section background="gray" className="border-t border-zinc-200">
        <div className="flex items-end justify-between mb-12">
          <h3 className="text-2xl font-bold text-primary uppercase tracking-tighter">
            Latest Stories
          </h3>
          <div className="hidden md:flex gap-4">
            <Link
              href="/blog"
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                category === "all"
                  ? "text-accent-burgundy border-b-2 border-accent-burgundy"
                  : "text-zinc-400 hover:text-primary"
              }`}
            >
              All
            </Link>
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                href={`/blog?category=${c.slug}`}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  category === c.slug
                    ? "text-accent-burgundy border-b-2 border-accent-burgundy"
                    : "text-zinc-400 hover:text-primary"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listResult.posts.map((post) => (
            <PostCard key={post.id} post={mapPostCard(post)} />
          ))}
        </div>

        {/* Pagination */}
        <BlogPaginationClient
          currentPage={Number.isFinite(page) && page > 0 ? page : 1}
          totalPages={listResult.totalPages}
        />
      </Section>
    </>
  );
}
