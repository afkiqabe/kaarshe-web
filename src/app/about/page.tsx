import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/ui/Icon";
import { MilestoneCard } from "@/components/ui/MilestoneCard";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { aboutPageContent } from "@/lib/constants";
import { getWpPageBySlug } from "@/lib/wp";
import { acfGet, acfImage, acfString, acfStringArray } from "@/lib/wpAcf";

export default async function AboutPage() {
  const fallback = aboutPageContent;
  const aboutSlug = process.env.WORDPRESS_ABOUT_PAGE_SLUG ?? "about";
  const wpPage = await getWpPageBySlug(aboutSlug);
  const acf = wpPage?.acf;

  const hero = {
    badge: acfString(acf, ["hero.badge", "hero_badge"], fallback.hero.badge),
    title: acfString(acf, ["hero.title", "hero_title"], fallback.hero.title),
    description: acfString(
      acf,
      ["hero.description", "hero_description"],
      fallback.hero.description,
    ),
    stats: {
      years: acfString(
        acf,
        ["hero.stats.years", "hero_years"],
        fallback.hero.stats.years,
      ),
      label: acfString(
        acf,
        ["hero.stats.label", "hero_years_label"],
        fallback.hero.stats.label,
      ),
    },
    image: acfImage(acf, ["hero.image", "hero_image"], fallback.hero.image)!,
  };

  const biography = {
    quote: acfString(
      acf,
      ["biography.quote", "bio_quote"],
      fallback.biography.quote,
    ),
    paragraphs: acfStringArray(
      acf,
      ["biography.paragraphs", "bio_paragraphs"],
      fallback.biography.paragraphs,
    ),
  };

  const valuesRaw = acfGet<unknown>(acf, ["values", "core_values"], undefined);
  const values = Array.isArray(valuesRaw)
    ? (valuesRaw as Array<{
        icon?: string;
        title?: string;
        description?: string;
      }>)
    : fallback.values;

  const milestonesRaw = acfGet<unknown>(
    acf,
    ["milestones", "timeline"],
    undefined,
  );
  const milestones = Array.isArray(milestonesRaw)
    ? (milestonesRaw as Array<{
        year?: string;
        title?: string;
        description?: string;
        icon?: string;
      }>)
    : fallback.milestones;

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-widest">
                {hero.badge}
              </span>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {hero.title}
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-primary/70 max-w-2xl leading-relaxed">
              {hero.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="inline-flex size-10 rounded-full ring-2 ring-background-light bg-white border border-primary/10 items-center justify-center text-primary/70">
                  <Icon name="history_edu" size="sm" />
                </div>
                <div className="inline-flex size-10 rounded-full ring-2 ring-background-light bg-white border border-primary/10 items-center justify-center text-primary/70">
                  <Icon name="award_star" size="sm" />
                </div>
              </div>
              <div className="text-sm leading-tight">
                <div className="font-black tracking-tight text-primary">
                  {hero.stats.years}
                </div>
                <div className="text-primary/60 font-medium">
                  {hero.stats.label}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-primary/5 shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent z-10"></div>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Narrative Biography */}
      <Section background="white" className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            <div className="prose prose-xl max-w-none text-primary/80 leading-loose space-y-8">
              <h2 className="text-3xl font-black text-primary mb-6">
                The Journey
              </h2>
              <p className="text-xl font-light italic border-l-4 border-primary pl-6 py-2">
                {biography.quote}
              </p>
              {biography.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Values Grid */}
            <div className="pt-16 border-t border-primary/10">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-12 text-center">
                Core Values
              </h3>
              <div className="grid md:grid-cols-3 gap-12">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 text-center items-center"
                  >
                    <Icon
                      name={
                        value.icon ??
                        fallback.values[index]?.icon ??
                        "verified_user"
                      }
                      className="text-4xl text-primary/40"
                    />
                    <h4 className="font-bold text-xl">
                      {value.title ?? fallback.values[index]?.title ?? ""}
                    </h4>
                    <p className="text-sm text-primary/70 leading-relaxed">
                      {value.description ??
                        fallback.values[index]?.description ??
                        ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section>
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Milestones of Excellence
          </h2>
          <p className="text-primary/60 max-w-2xl mx-auto">
            A chronological record of significant achievements and pivotal
            moments in a career dedicated to progress.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={index}
              year={milestone.year ?? fallback.milestones[index]?.year ?? ""}
              title={milestone.title ?? fallback.milestones[index]?.title ?? ""}
              description={
                milestone.description ??
                fallback.milestones[index]?.description ??
                ""
              }
              icon={
                milestone.icon ?? fallback.milestones[index]?.icon ?? "school"
              }
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-24">
        <div className="bg-primary rounded-2xl p-12 lg:p-20 relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path d="M0 100 L50 0 L100 100 Z" fill="white" />
            </svg>
          </div>
          <h2 className="text-white text-3xl lg:text-5xl font-black mb-6 relative z-10">
            Shaping the Future Together
          </h2>
          <p className="text-white/70 max-w-2xl mb-10 text-lg relative z-10">
            Discover how our vision for the future translates into actionable
            policy and community-driven initiatives.
          </p>
          <Button
            href="/vision"
            variant="secondary"
            size="lg"
            className="relative z-10 whitespace-nowrap cursor-pointer hover:bg-white/50"
          >
            View the Vision
          </Button>
        </div>
      </Section>
    </>
  );
}
