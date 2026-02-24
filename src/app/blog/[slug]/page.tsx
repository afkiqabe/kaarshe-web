import { Section } from "@/components/layout/Section";
// import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";
import { blogPostContent } from "@/lib/constants";
import { notFound } from "next/navigation";

type PostBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: "h2" | "h3"; content: string }
  | { type: "list"; items: string[] }
  | { type: "takeaways"; items: string[] };

// This would normally fetch from an API
export default function BlogPostPage() {
  // In a real app, you'd fetch the post based on the slug
  // For now, we'll use our constant
  const post = blogPostContent;

  const marcusAvatar = "/images/authors/marcus-thorne.jpg";

  // If post not found, return 404
  if (!post) {
    notFound();
  }

  const contentBlocks = (post.content as PostBlock[]) ?? [];

  return (
    <>
      <ProgressBar />

      {/* Article Hero Section */}
      <Section size="sm" className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          {/* <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/blog" },
              {
                label: post.category,
                href: `/blog?category=${post.category.toLowerCase()}`,
              },
            ]}
            className="mb-8"
          /> */}

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-primary mb-10">
            {post.title}
          </h1>

          {/* Author Meta */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-neutral-200 overflow-hidden border border-neutral-100 relative">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-lg">{post.author.name}</p>
                <p className="text-neutral-500 text-sm">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-neutral-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Icon name="calendar_today" size="sm" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="schedule" size="sm" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Image */}
      <Section size="sm" className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-21/9 rounded-2xl overflow-hidden shadow-2xl relative">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Article Body */}
      <Section size="sm" className="px-6 pt-0 pb-24 relative">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <article className="space-y-8 article-content">
            {contentBlocks.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? "text-xl md:text-2xl leading-relaxed text-neutral-800"
                          : "text-base md:text-lg leading-8 text-neutral-700"
                      }
                    >
                      {block.content}
                    </p>
                  );
                case "heading":
                  return block.level === "h2" ? (
                    <h2
                      key={index}
                      className="text-2xl md:text-3xl font-bold text-primary mt-12"
                    >
                      {block.content}
                    </h2>
                  ) : (
                    <h3
                      key={index}
                      className="text-xl md:text-2xl font-bold text-primary mt-10"
                    >
                      {block.content}
                    </h3>
                  );
                case "list":
                  return (
                    <ul
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-5 text-base md:text-lg leading-8 text-neutral-700"
                    >
                      {block.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
                case "takeaways":
                  return (
                    <div
                      key={index}
                      className="my-12 p-8 bg-neutral-100 rounded-xl border border-neutral-200"
                    >
                      <h3 className="font-bold text-lg mb-4 uppercase tracking-tight">
                        Key Takeaways
                      </h3>
                      <ul className="space-y-4">
                        {block.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-neutral-700 leading-relaxed"
                          >
                            <Icon
                              name="check_circle"
                              className="text-accent-burgundy"
                              size="sm"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </article>

          {/* Share Buttons */}
          <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Share this insight
              </span>
              <div className="flex gap-2">
                <button className="size-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Icon name="share" size="sm" />
                </button>
                <button className="size-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Icon name="link" size="sm" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-100 rounded text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Recommended Reading */}
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
          {post.relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              href={`/blog/${relatedPost.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-video mb-6 overflow-hidden rounded-lg relative">
                <Image
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-bold text-accent-burgundy uppercase tracking-widest">
                {relatedPost.category}
              </span>
              <h3 className="text-xl font-bold mt-3 group-hover:text-accent-burgundy transition-colors leading-tight">
                {relatedPost.title}
              </h3>
              <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
                <div className="size-8 rounded-full bg-neutral-200 overflow-hidden border border-neutral-100 relative shrink-0">
                  <Image
                    src={marcusAvatar}
                    alt="Marcus Thorne"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-neutral-600">
                  Marcus Thorne
                </span>
                {relatedPost.readTime && (
                  <span className="text-neutral-400">
                    • {relatedPost.readTime}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
