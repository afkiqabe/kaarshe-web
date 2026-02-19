import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { MilestoneCard } from '@/components/ui/MilestoneCard'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { aboutPageContent } from '@/lib/constants'

export default function AboutPage() {
  const { hero, biography, values, milestones } = aboutPageContent

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
            <div className="flex gap-4">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block size-10 rounded-full ring-2 ring-background-light bg-primary/20 flex items-center justify-center overflow-hidden">
                  <Icon name="history_edu" size="sm" />
                </div>
                <div className="inline-block size-10 rounded-full ring-2 ring-background-light bg-primary/20 flex items-center justify-center overflow-hidden">
                  <Icon name="award_star" size="sm" />
                </div>
              </div>
              <div className="text-sm">
                <p className="font-bold">{hero.stats.years}</p>
                <p className="opacity-60">{hero.stats.label}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-primary/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent z-10"></div>
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
              <h2 className="text-3xl font-black text-primary mb-6">The Journey</h2>
              <p className="text-xl font-light italic border-l-4 border-primary pl-6 py-2">
                {biography.quote}
              </p>
              {biography.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Values Grid */}
            <div className="pt-16 border-t border-primary/10">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-12 text-center">Core Values</h3>
              <div className="grid md:grid-cols-3 gap-12">
                {values.map((value, index) => (
                  <div key={index} className="flex flex-col gap-4 text-center items-center">
                    <Icon name={value.icon} className="text-4xl text-primary/40" />
                    <h4 className="font-bold text-xl">{value.title}</h4>
                    <p className="text-sm opacity-70 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section>
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Milestones of Excellence</h2>
          <p className="text-primary/60 max-w-xl">
            A chronological record of significant achievements and pivotal moments in a career dedicated to progress.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10 border border-primary/10 rounded-xl overflow-hidden">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-24">
        <div className="bg-primary rounded-2xl p-12 lg:p-20 relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 100 L50 0 L100 100 Z" fill="white" />
            </svg>
          </div>
          <h2 className="text-white text-3xl lg:text-5xl font-black mb-6 relative z-10">
            Shaping the Future Together
          </h2>
          <p className="text-white/70 max-w-2xl mb-10 text-lg relative z-10">
            Discover how our vision for the future translates into actionable policy and community-driven initiatives.
          </p>
          <Button href="/vision" variant="secondary" size="lg" className="relative z-10">
            View the Vision
          </Button>
        </div>
      </Section>
    </>
  )
}