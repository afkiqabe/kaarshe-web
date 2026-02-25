import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { visionPageContent } from "@/lib/constants";
import { getWpPageBySlug } from "@/lib/wp";
import { acfGet, acfString, coerceStringList } from "@/lib/wpAcf";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function VisionPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const fallback = visionPageContent;
  const visionSlug = process.env.WORDPRESS_VISION_PAGE_SLUG ?? "vision";
  const wpPage = await getWpPageBySlug(visionSlug);
  const acf = wpPage?.acf;

  const hero = {
    title: acfString(acf, ["hero.title", "hero_title"], fallback.hero.title),
    titleHighlight: acfString(
      acf,
      ["hero.title_highlight", "hero_title_highlight"],
      fallback.hero.titleHighlight,
    ),
    description: acfString(
      acf,
      ["hero.description", "hero_description"],
      fallback.hero.description,
    ),
  };

  const pillars = (
    (acfGet<unknown>(acf, ["pillars", "policy_pillars"], undefined) as
      | Array<{
          icon?: string;
          title?: string;
          description?: string;
          points?: unknown;
        }>
      | undefined) ?? fallback.pillars
  ).map((pillar, index) => ({
    ...pillar,
    points:
      coerceStringList(pillar.points, {
        keys: ["text", "point", "value", "label"],
      }) ??
      fallback.pillars[index]?.points ??
      [],
  }));

  const quote = {
    text: acfString(acf, ["quote.text", "quote_text"], fallback.quote.text),
    author: acfString(
      acf,
      ["quote.author", "quote_author"],
      fallback.quote.author,
    ),
    title: acfString(acf, ["quote.title", "quote_title"], fallback.quote.title),
  };

  const strategies = (
    (acfGet<unknown>(acf, ["strategies", "topics"], undefined) as
      | Array<{
          id?: string;
          title?: string;
          description?: string;
          image?: unknown;
          objectives?: unknown;
        }>
      | undefined) ?? fallback.strategies
  ).map((strategy, index) => ({
    ...strategy,
    objectives:
      coerceStringList(strategy.objectives, {
        keys: ["text", "objective", "value", "label"],
      }) ??
      fallback.strategies[index]?.objectives ??
      [],
  }));
  const resolvedSearchParams = (await searchParams) ?? {};
  const activeTopic =
    typeof resolvedSearchParams.topic === "string"
      ? resolvedSearchParams.topic
      : "economy";
  const activeStrategy =
    strategies.find((strategy) => strategy.id === activeTopic) ?? strategies[0];

  const activeImage = (() => {
    const raw = activeStrategy?.image;

    if (typeof raw === "string" && raw) {
      return { src: raw, alt: activeStrategy?.title ?? "" };
    }

    if (typeof raw === "object" && raw !== null) {
      const record = raw as Record<string, unknown>;
      const src =
        (typeof record.url === "string" && record.url) ||
        (typeof record.src === "string" && record.src) ||
        "";
      const alt =
        (typeof record.alt === "string" && record.alt) ||
        activeStrategy?.title ||
        "";
      if (src) return { src, alt };
    }

    const fallbackMatch = fallback.strategies.find(
      (s) => s.id === activeStrategy?.id,
    );
    return {
      src: fallbackMatch?.image ?? fallback.strategies[0]?.image ?? "",
      alt: activeStrategy?.title ?? fallbackMatch?.title ?? "",
    };
  })();

  const getMenuItemClassName = (isActive: boolean) =>
    isActive
      ? "flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-accent-burgundy text-primary font-bold transition-all"
      : "flex items-center gap-3 p-3 hover:bg-white rounded-lg text-gray-500 font-medium transition-all group";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-gray-100">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1f1f1f 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative text-center">
          {/* <div className="inline-block bg-accent-burgundy/10 text-accent-burgundy px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            {hero.badge}
          </div> */}
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight mb-6 tracking-tight max-w-4xl mx-auto">
            {hero.title}
            <span className="text-accent-burgundy">{hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {hero.description}
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={hero.cta.primary.href}
              size="lg"
              className="shadow-lg"
            >
              {hero.cta.primary.label}
            </Button>
            <Button href={hero.cta.secondary.href} variant="outline" size="lg">
              {hero.cta.secondary.label}
            </Button>
          </div> */}
        </div>
      </section>

      {/* Policy Pillars Grid */}
      <Section id="pillars">
        <div className="mb-12">
          <h2 className="text-accent-burgundy text-3xl font-bold tracking-tight mb-2">
            Our Policy Pillars
          </h2>
          <div className="w-20 h-1 bg-accent-gold" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border border-primary/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-accent-gold mb-4">
                <Icon
                  name={
                    pillar.icon ??
                    fallback.pillars[index]?.icon ??
                    "trending_up"
                  }
                  size="xl"
                />
              </div>
              <h3 className="text-accent-burgundy text-xl font-bold mb-4">
                {pillar.title ?? fallback.pillars[index]?.title ?? ""}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {pillar.description ??
                  fallback.pillars[index]?.description ??
                  ""}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {(pillar.points ?? fallback.pillars[index]?.points ?? []).map(
                  (point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon
                        name="check_circle"
                        className="text-accent-gold"
                        size="sm"
                      />
                      {point}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Quote Block */}
      <section className="bg-primary py-24 px-6 text-center overflow-hidden relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-accent-gold" />
        <div className="max-w-4xl mx-auto relative">
          <Icon
            name="format_quote"
            className="text-accent-gold text-6xl opacity-30 mb-8 block"
          />
          <blockquote className="text-3xl md:text-5xl font-light italic text-white leading-tight mb-10">
            {quote.text}
          </blockquote>
          <cite className="not-italic flex flex-col items-center">
            <span className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-2">
              {quote.author}
            </span>
            <span className="text-gray-400 text-sm font-medium">
              {quote.title}
            </span>
          </cite>
        </div>
      </section>

      {/* Detailed Strategy */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16">
        {/* Sidebar Nav */}
        <aside className="lg:w-1/4">
          <div className="sticky top-32 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              Strategy Menu
            </h4>
            <Link
              href="/vision?topic=economy"
              scroll={false}
              className={getMenuItemClassName(activeStrategy.id === "economy")}
            >
              <Icon name="payments" /> Economy
            </Link>
            <Link
              href="/vision?topic=healthcare"
              scroll={false}
              className={getMenuItemClassName(
                activeStrategy.id === "healthcare",
              )}
            >
              <Icon
                name="health_and_safety"
                className={cn(
                  "transition-colors",
                  activeStrategy.id === "healthcare"
                    ? "text-accent-burgundy"
                    : "group-hover:text-accent-burgundy",
                )}
              />
              Healthcare
            </Link>
            <Link
              href="/vision?topic=infrastructure"
              scroll={false}
              className={getMenuItemClassName(
                activeStrategy.id === "infrastructure",
              )}
            >
              <Icon
                name="bolt"
                className={cn(
                  "transition-colors",
                  activeStrategy.id === "infrastructure"
                    ? "text-accent-burgundy"
                    : "group-hover:text-accent-burgundy",
                )}
              />
              Infrastructure
            </Link>
            <Link
              href="/vision?topic=governance"
              scroll={false}
              className={getMenuItemClassName(
                activeStrategy.id === "governance",
              )}
            >
              <Icon
                name="shield"
                className={cn(
                  "transition-colors",
                  activeStrategy.id === "governance"
                    ? "text-accent-burgundy"
                    : "group-hover:text-accent-burgundy",
                )}
              />
              Governance
            </Link>
          </div>
        </aside>

        {/* Detailed Content */}
        <div className="lg:w-3/4 space-y-16">
          <div>
            <h2 className="text-accent-burgundy text-3xl font-bold mb-8">
              Deep-Dive: {activeStrategy.title}
            </h2>
            <div className="aspect-video w-full rounded-xl mb-8 overflow-hidden bg-neutral-200">
              {activeImage.src ? (
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>{activeStrategy.description}</p>
              <h4 className="text-primary font-bold text-xl mt-8 mb-4">
                Key Objectives:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-5">
                {(activeStrategy.objectives ?? []).map((objective, index) => (
                  <li key={index} className="gold-bullet py-1">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
