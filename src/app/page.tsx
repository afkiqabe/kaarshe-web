import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/layout/Section";
import { PolicyCard } from "@/components/ui/PolicyCard";
import { PostCard } from "@/components/ui/PostCard";
import { Icon } from "@/components/ui/Icon";
import { homePageContent } from "@/lib/constants";
import {
  formatWpDate,
  getWpPageBySlug,
  getWpPosts,
  pickFeaturedImageUrl,
  pickPrimaryCategory,
  stripHtml,
} from "@/lib/wp";
import { acfGet, acfImage, acfString, coerceStringList } from "@/lib/wpAcf";

export default async function HomePage() {
  const fallback = homePageContent;

  const homeSlug = process.env.WORDPRESS_HOME_PAGE_SLUG ?? "home";
  const wpPage = await getWpPageBySlug(homeSlug);
  const acf = wpPage?.acf;

  const hero = {
    title: acfString(acf, ["hero.title", "hero_title"], fallback.hero.title),
    titleHighlight: acfString(
      acf,
      ["hero.title_highlight", "hero_title_highlight"],
      fallback.hero.titleHighlight,
    ),
    titleSuffix: acfString(
      acf,
      ["hero.title_suffix", "hero_title_suffix"],
      fallback.hero.titleSuffix,
    ),
    titleHighlight2: acfString(
      acf,
      ["hero.title_highlight_2", "hero_title_highlight_2"],
      fallback.hero.titleHighlight2,
    ),
    description: acfString(
      acf,
      ["hero.description", "hero_description"],
      fallback.hero.description,
    ),
    cta: {
      primary: {
        label: acfString(
          acf,
          ["hero.cta_primary_label", "cta_primary_label"],
          fallback.hero.cta.primary.label,
        ),
        href: acfString(
          acf,
          ["hero.cta_primary_href", "cta_primary_href"],
          fallback.hero.cta.primary.href,
        ),
        icon: acfString(
          acf,
          ["hero.cta_primary_icon", "cta_primary_icon"],
          fallback.hero.cta.primary.icon,
        ),
      },
      secondary: {
        label: acfString(
          acf,
          ["hero.cta_secondary_label", "cta_secondary_label"],
          fallback.hero.cta.secondary.label,
        ),
        href: acfString(
          acf,
          ["hero.cta_secondary_href", "cta_secondary_href"],
          fallback.hero.cta.secondary.href,
        ),
      },
    },
    image: acfImage(acf, ["hero.image", "hero_image"], fallback.hero.image),
  };

  const mission = {
    quote: acfString(
      acf,
      ["mission.quote_icon", "mission_quote_icon"],
      fallback.mission.quote,
    ),
    text: acfString(
      acf,
      ["mission.text", "mission_text"],
      fallback.mission.text,
    ),
  };

  const policyHighlights = {
    title: acfString(
      acf,
      ["policy_highlights.title", "policy_highlights_title"],
      fallback.policyHighlights.title,
    ),
    policies: (
      (acfGet<unknown>(
        acf,
        ["policy_highlights.policies", "policies"],
        undefined,
      ) as
        | Array<{
            icon?: string;
            title?: string;
            description?: string;
            points?: unknown;
          }>
        | undefined) ?? fallback.policyHighlights.policies
    ).map((policy, index) => ({
      ...policy,
      points:
        coerceStringList(policy.points, {
          keys: ["text", "point", "value", "label"],
        }) ??
        fallback.policyHighlights.policies[index]?.points ??
        [],
    })),
  };

  const latest = await getWpPosts({ perPage: 3, page: 1 });
  const insights = {
    badge: acfString(
      acf,
      ["insights.badge", "insights_badge"],
      fallback.insights.badge,
    ),
    title: acfString(
      acf,
      ["insights.title", "insights_title"],
      fallback.insights.title,
    ),
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
