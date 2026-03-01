import { Section } from "@/components/layout/Section";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/ui/Icon";
import { ShareButtons } from "@/components/ui/ShareButtons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  estimateReadTimeFromHtml,
  formatWpDate,
  getWpPostBySlug,
  getWpPosts,
  pickFeaturedImageAlt,
  pickFeaturedImageUrl,
  pickPrimaryCategory,
  pickTags,
  stripHtml,
} from "@/lib/wp";
import { siteConfig } from "@/lib/constants/site";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) notFound();

  const category = pickPrimaryCategory(post);
  const tags = pickTags(post);

  const authorName = post._embedded?.author?.[0]?.name ?? "Kaarshe";
  const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.["96"];
  const readTime = estimateReadTimeFromHtml(post.content.rendered);

  const featuredImage = pickFeaturedImageUrl(post);
  const featuredAlt =
    pickFeaturedImageAlt(post) || stripHtml(post.title.rendered);

  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  const related = category
    ? await getWpPosts({
        perPage: 3,
        page: 1,
        categories: category.id,
        exclude: [post.id],
      })
    : { posts: [], totalPages: 1, total: 0 };

  return (
    <>
      <ProgressBar />

      {/* Article Hero Section */}
      <Section size="sm" className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-primary mb-10">
            {stripHtml(post.title.rendered)}
          </h1>

          {/* Author Meta */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-neutral-200 overflow-hidden border border-neutral-100 relative">
                {authorAvatar ? (
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="font-bold text-lg">{authorName}</p>
                <p className="text-neutral-500 text-sm">
                  {category?.name ?? "Insights"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-neutral-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Icon name="calendar_today" size="sm" />
                <span>{formatWpDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="schedule" size="sm" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Image */}
      {featuredImage ? (
        <Section size="sm" className="px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl relative">
              <Image
                src={featuredImage}
                alt={featuredAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Section>
      ) : null}

      {/* Article Body */}
      <Section size="sm" className="px-6 pt-0 pb-24 relative">
        <div className="max-w-3xl mx-auto">
          <article
            className="space-y-8 article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Share Buttons */}
          <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <ShareButtons
              url={shareUrl}
              title={stripHtml(post.title.rendered)}
            />
            <div className="flex gap-2 flex-wrap">
              {tags.slice(0, 8).map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-neutral-100 rounded text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Recommended Reading */}
      {related.posts.length > 0 ? (
        <Section background="gray" className="border-y border-neutral-200">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent-burgundy text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
                Exploration
              </span>
              <h2 className="text-4xl font-serif">Recommended Reading</h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-accent-burgundy transition-colors"
            >
              View all insights
              <Icon name="arrow_right_alt" size="sm" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {related.posts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group cursor-pointer"
              >
                <div className="aspect-video mb-6 overflow-hidden rounded-lg relative">
                  {pickFeaturedImageUrl(relatedPost) ? (
                    <Image
                      src={pickFeaturedImageUrl(relatedPost) ?? ""}
                      alt={
                        pickFeaturedImageAlt(relatedPost) ||
                        stripHtml(relatedPost.title.rendered)
                      }
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                </div>
                <span className="text-xs font-bold text-accent-burgundy uppercase tracking-widest">
                  {pickPrimaryCategory(relatedPost)?.name ?? "Insights"}
                </span>
                <h3 className="text-xl font-bold mt-3 group-hover:text-accent-burgundy transition-colors leading-tight">
                  {stripHtml(relatedPost.title.rendered)}
                </h3>
                <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
                  <span className="font-medium text-neutral-600">
                    {relatedPost._embedded?.author?.[0]?.name ?? "Kaarshe"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

export async function generateStaticParams() {
  const { posts } = await getWpPosts({ perPage: 100, page: 1 });
  return posts.map((post) => ({ slug: post.slug }));
}
