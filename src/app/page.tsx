import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/layout/Section";
import { PolicyCard } from "@/components/ui/PolicyCard";
import { PostCard } from "@/components/ui/PostCard";
import { Icon } from "@/components/ui/Icon";
import { homePageContent } from "@/lib/constants";
import {
  formatWpDate,
  getWpPosts,
  pickFeaturedImageUrl,
  pickPrimaryCategory,
  stripHtml,
} from "@/lib/wp";

export default async function HomePage() {
  const hero = homePageContent.hero;
  const mission = homePageContent.mission;
  const policyHighlights = homePageContent.policyHighlights;

  const latest = await getWpPosts({ perPage: 3, page: 1 });
  const insights = {
    badge: homePageContent.insights.badge,
    title: homePageContent.insights.title,
    posts: latest.posts.map((post) => ({
      id: String(post.id),
      category: pickPrimaryCategory(post)?.name ?? "Insights",
      date: formatWpDate(post.date),
      title: stripHtml(post.title.rendered),
      excerpt: stripHtml(post.excerpt.rendered),
      image: pickFeaturedImageUrl(post),
      slug: post.slug,
    })),
  };

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-16 md:pt-24">
        <Hero
          // badge={hero.badge}
          title={hero.title}
          titleHighlight={hero.titleHighlight}
          titleSuffix={hero.titleSuffix}
          titleHighlight2={hero.titleHighlight2}
          description={hero.description}
          cta={hero.cta}
          image={hero.image}
        />
      </Section>

      {/* Mission Statement */}
      <Section className="border-y border-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Icon
            name={mission.quote}
            className="text-accent-gold"
            size="xl"
            weight={300}
          />
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-primary">
            {mission.text}
          </h2>
          <div className="w-20 h-1 bg-accent-burgundy mx-auto"></div>
        </div>
      </Section>

      {/* Policy Highlights */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-burgundy">
            {policyHighlights.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {policyHighlights.policies.map((policy, index) => (
            <PolicyCard
              key={index}
              icon={
                policy.icon ??
                fallback.policyHighlights.policies[index]?.icon ??
                "insights"
              }
              title={
                policy.title ??
                fallback.policyHighlights.policies[index]?.title ??
                ""
              }
              description={
                policy.description ??
                fallback.policyHighlights.policies[index]?.description ??
                ""
              }
              points={
                policy.points ??
                fallback.policyHighlights.policies[index]?.points ??
                []
              }
            />
          ))}
        </div>
      </Section>

      {/* Latest Insights */}
      <Section className="bg-grid-subtle rounded-3xl mb-24">
        <div className="text-center mb-16">
          {insights.badge ? (
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-burgundy mb-2">
              {insights.badge}
            </h3>
          ) : null}
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-burgundy">
            {insights.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
