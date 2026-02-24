import Link from "next/link";
import { Container } from "./Container";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-20">
      <Container>
        {/* Newsletter CTA (above footer links) */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_10px)]" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-accent-burgundy/25 via-transparent to-accent-gold/15" />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Join KAARSHE Updates
              </h2>
              <div className="mt-3 text-white/75 text-sm sm:text-base max-w-3xl mx-auto">
                Subscribe to receive monthly updates on newly released research,
                policy briefs, and economic insights directly to your inbox.
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center max-w-2xl mx-auto">
                <div className="relative w-full sm:flex-1 sm:max-w-xl">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl bg-black/20 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-burgundy/40"
                    aria-label="Email"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                    <Icon name="mail" size="sm" />
                  </span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="sm:self-stretch whitespace-nowrap cursor-pointer hover:bg-white/50"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Quick Links
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {siteConfig.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Resources
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {siteConfig.footer.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Legal
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {siteConfig.footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/75">
            © 2026 KAARSHE. All rights reserved.
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" size="sm" />
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="X"
            >
              <Icon name="x" size="sm" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <Icon name="facebook" size="sm" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <Icon name="instagram" size="sm" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
