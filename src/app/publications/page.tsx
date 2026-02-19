import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MediaCard } from '@/components/ui/MediaCard'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import Image from 'next/image'
import { publicationsPageContent } from '@/lib/constants'

export default function PublicationsPage() {
  const { hero, featuredBook, mediaItems } = publicationsPageContent

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 w-fit">
              <Icon name="auto_stories" size="sm" />
              <span className="text-xs font-bold uppercase tracking-widest">{hero.badge}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              {hero.title}
              <span className="text-primary/40">{hero.titleSuffix}</span>
            </h1>
            <p className="text-lg text-primary/70 max-w-xl leading-relaxed">
              {hero.description}
            </p>
            <div>
              <Button href="#publications" size="lg" className="gap-2">
                Explore Publications
                <Icon name="arrow_downward" size="sm" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
              <Image
                src={hero.image}
                alt="Publications hero"
                width={600}
                height={450}
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-primary/5">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={hero.latestAppearance.icon} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary/40 uppercase">{hero.latestAppearance.label}</p>
                  <p className="font-bold text-sm">{hero.latestAppearance.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Publication */}
      <Section className="mb-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Publication</h2>
            <p className="text-primary/60">Newest release available worldwide</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-primary/5 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
              <Image
                src={featuredBook.coverImage}
                alt={featuredBook.title}
                width={320}
                height={480}
                className="relative w-72 lg:w-80 h-auto rounded-lg shadow-2xl transition-transform duration-500 group-hover:-translate-y-4"
              />
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="text-sm font-bold text-primary/40 uppercase tracking-widest">
                Released {featuredBook.releaseDate}
              </span>
              <h3 className="text-4xl font-black text-primary leading-tight">{featuredBook.title}</h3>
            </div>
            <p className="text-lg text-primary/70 leading-relaxed">{featuredBook.description}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href={featuredBook.purchaseUrl} size="lg" className="gap-2">
                <Icon name="shopping_cart" size="sm" />
                Purchase Now
              </Button>
              <Button href={featuredBook.excerptUrl} variant="outline" size="lg">
                Read Excerpt
              </Button>
            </div>
            <div className="flex gap-8 mt-4 pt-8 border-t border-primary/10">
              <div>
                <p className="text-2xl font-black">{featuredBook.rating}/5</p>
                <p className="text-sm text-primary/50 font-medium">Reader Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black">{featuredBook.languages}+</p>
                <p className="text-sm text-primary/50 font-medium">Languages</p>
              </div>
              <div>
                <p className="text-2xl font-black">{featuredBook.copiesSold}</p>
                <p className="text-sm text-primary/50 font-medium">Copies Sold</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Media Gallery */}
      <Section id="publications">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Media Gallery & Press</h2>
            <p className="text-primary/60">Major appearances and interview highlights</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <Icon name="grid_view" />
            </button>
            <button className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <Icon name="list" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item) => (
            <MediaCard key={item.id} {...item} />
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="bg-neutral-100 rounded-3xl p-12 text-center flex flex-col items-center gap-6 border border-primary/5">
          <h2 className="text-3xl font-bold tracking-tight">Interested in collaborating?</h2>
          <p className="max-w-xl text-primary/60">
            For speaking engagements, book signings, or media interviews, please reach out to our communications team.
          </p>
          <div className="flex gap-4">
            <Button href="/contact" size="lg">
              Send Inquiry
            </Button>
            <Button href="/press-kit" variant="outline" size="lg">
              Download Press Kit
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}