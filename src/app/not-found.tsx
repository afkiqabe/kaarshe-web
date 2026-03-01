import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <Section
      size="lg"
      background="white"
      className="fixed inset-0 z-50 flex items-center justify-center"
      containerClassName="relative flex items-center justify-center"
   >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 w-64 h-64 bg-accent-burgundy/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-xl w-full text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-black text-primary leading-none tracking-tight">
          Error <span className="text-accent-burgundy inline-block align-baseline">404</span>
        </h1>
        <p className="text-primary/60 text-base md:text-lg max-w-lg mx-auto">
          This page could not be found.
        </p>
        <p className="text-primary/60 text-sm md:text-base max-w-lg mx-auto">
          The link you followed may be broken, or the page may have been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/" size="lg" className="gap-2">
            <Icon name="home" size="sm" />
            Go Home
          </Button>
        </div>
      </div>
    </Section>
  );
}
