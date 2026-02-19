import { Hero } from '@/components/ui/Hero'
import { Section } from '@/components/layout/Section'
import { PolicyCard } from '@/components/ui/PolicyCard'
import { PostCard } from '@/components/ui/PostCard'
import { Icon } from '@/components/ui/Icon'
import { homePageContent } from '@/lib/constants'

export default function HomePage() {
  const { hero, mission, policyHighlights, insights } = homePageContent

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-16 md:pt-24">
        <Hero
          badge={hero.badge}
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
          <Icon name={mission.quote} className="text-accent-gold" size="xl" weight={300} />
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-primary">
            {mission.text}
          </h2>
          <div className="w-20 h-1 bg-accent-burgundy mx-auto"></div>
        </div>
      </Section>

      {/* Policy Highlights */}
      <Section>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-burgundy mb-2">
              {policyHighlights.badge}
            </h3>
            <h2 className="text-4xl font-black tracking-tight">
              {policyHighlights.title}
            </h2>
          </div>
          <p className="text-primary/50 font-medium max-w-xs text-right hidden md:block">
            {policyHighlights.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {policyHighlights.policies.map((policy, index) => (
            <PolicyCard key={index} {...policy} />
          ))}
        </div>
      </Section>

      {/* Latest Insights */}
      <Section className="bg-grid-subtle rounded-3xl mb-24">
        <div className="text-center mb-16">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-burgundy mb-2">
            {insights.badge}
          </h3>
          <h2 className="text-4xl font-black tracking-tight">
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
  )
}