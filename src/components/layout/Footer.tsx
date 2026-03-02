import Link from "next/link";
import { Container } from "./Container";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/constants";
import { FooterNewsletterFormClient } from "./FooterNewsletterFormClient";

type FooterLink = { label: string; href: string };

export function Footer({
  newsletter,
  quickLinks = siteConfig.footer.quickLinks,
  resources = siteConfig.footer.resources,
  legal = siteConfig.footer.legal,
  socials = siteConfig.social,
  copyright,
}: {
  newsletter?: {
    title?: string;
    description?: string;
    emailPlaceholder?: string;
    buttonLabel?: string;
  };
  quickLinks?: FooterLink[];
  resources?: FooterLink[];
  legal?: FooterLink[];
  socials?: Partial<typeof siteConfig.social>;
  copyright?: string;
}) {
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
                {newsletter?.title || "Get KAARSHE Updates"}
              </h2>
              <div className="mt-3 text-white/75 text-sm sm:text-base max-w-3xl mx-auto">
                {newsletter?.description ||
                  "Subscribe to receive monthly updates on newly released research, policy briefs, and economic insights directly to your inbox."}
              </div>

              <FooterNewsletterFormClient
                emailPlaceholder={newsletter?.emailPlaceholder || "Email"}
                buttonLabel={newsletter?.buttonLabel || "Sign up"}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <div className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pl-10 md:first:border-l-0">
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Quick Links
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {quickLinks.map((link) => (
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
          <div className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pl-10 md:first:border-l-0">
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Resources
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {resources.map((link) => (
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
          <div className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pl-10 md:first:border-l-0">
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Legal
            </h5>
            <ul className="space-y-4 text-sm text-white/75">
              {legal.map((link) => (
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
            {copyright ?? "© 2026 KAARSHE. All rights reserved."}
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" size="sm" />
            </a>
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="X"
            >
              <Icon name="x" size="sm" />
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <Icon name="facebook" size="sm" />
            </a>
            <a
              href={socials.instagram}
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
