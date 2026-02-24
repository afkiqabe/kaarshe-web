import { Button } from "./Button";
import { Badge } from "./Badge";
import { Icon } from "./Icon";
import Image from "next/image";

interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  titleSuffix?: string;
  titleHighlight2?: string;
  description: string;
  cta?: {
    primary: { label: string; href: string; icon?: string };
    secondary: { label: string; href: string };
  };
  image?: {
    src: string;
    alt: string;
  };
}

export function Hero({
  badge,
  title,
  titleHighlight,
  titleSuffix,
  titleHighlight2,
  description,
  cta,
  image,
}: HeroProps) {
  return (
    <section className="py-16 md:py-24 flex flex-col md:flex-row items-center md:items-start gap-16">
      <div className="flex-1 space-y-8">
        {badge && <Badge variant="burgundy">{badge}</Badge>}

        <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tight">
          {title}
          {titleHighlight && (
            <span className="text-accent-burgundy">{titleHighlight}</span>
          )}
          {titleSuffix}
          {titleHighlight2 && (
            <span className="border-b-4 border-accent-gold">
              {titleHighlight2}
            </span>
          )}
        </h1>

        <p className="text-lg text-primary/60 max-w-lg leading-relaxed font-light">
          {description}
        </p>

        {cta && (
          <div className="flex items-center gap-4 pt-4">
            <Button href={cta.primary.href} size="lg" className="gap-2">
              {cta.primary.label}
              {cta.primary.icon && <Icon name={cta.primary.icon} size="sm" />}
            </Button>
            <Button href={cta.secondary.href} variant="outline" size="lg">
              {cta.secondary.label}
            </Button>
          </div>
        )}
      </div>

      {image && (
        <div className="w-full flex-none md:flex-1 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-gold/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-burgundy/10 rounded-full blur-2xl"></div>
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-none aspect-4/5 bg-neutral-200 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
