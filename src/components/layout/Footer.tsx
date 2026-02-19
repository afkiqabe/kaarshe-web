import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Logo
              variant="light"
              iconClassName="size-6 bg-white rounded-sm"
              textClassName="text-xl"
            />
            <p className="text-white/50 text-sm leading-relaxed">
              {siteConfig.mission}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Social link"
              >
                <Icon name="public" size="sm" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="size-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Icon name="mail" size="sm" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
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

          {/* Column 3: Resources */}
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

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-accent-gold">
              Stay Informed
            </h5>
            <p className="text-sm text-white/75">
              Receive strategic updates and research insights directly in your
              inbox.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border-white/10 rounded-lg py-3 px-4 text-sm focus:ring-accent-burgundy focus:border-accent-burgundy transition-all text-white placeholder:text-white/30"
                aria-label="Email for newsletter"
              />
              <Button
                size="sm"
                className="absolute right-2 top-2 bg-accent-burgundy hover:bg-accent-burgundy/80 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter"
              >
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-3 text-center text-[10px] font-bold uppercase tracking-[0.2em]  text-white/70">
          <p>© 2026 KAARSHE. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
