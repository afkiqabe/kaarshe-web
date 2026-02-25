import type { Metadata } from "next";
import { Public_Sans, Playfair_Display, Lora } from "next/font/google";
import { cn } from "@/lib/utils/cn";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterModal } from "@/components/ui/NewsletterModal";
import { navigation, siteConfig } from "@/lib/constants";
import { getWpPageBySlug } from "@/lib/wp";
import { acfGet, acfImage, acfString } from "@/lib/wpAcf";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
  style: ["normal", "italic"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "700"],
});

async function getSiteSettingsAcf() {
  const settingsSlug =
    process.env.WORDPRESS_SITE_SETTINGS_PAGE_SLUG ?? "site-settings";
  try {
    const page = await getWpPageBySlug(settingsSlug);
    return page?.acf ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settingsAcf = await getSiteSettingsAcf();

  const seoSiteName = acfString(
    settingsAcf,
    ["seo.site_name"],
    siteConfig.name,
  );
  const seoShortName = acfString(
    settingsAcf,
    ["seo.short_name"],
    siteConfig.shortName,
  );
  const seoDescription = acfString(
    settingsAcf,
    ["seo.description"],
    siteConfig.description,
  );
  const seoTwitterCreator = acfString(
    settingsAcf,
    ["seo.twitter_creator"],
    "@kaarshe",
  );
  const seoGoogleVerification = acfString(
    settingsAcf,
    ["seo.google_verification"],
    "your-google-verification-code",
  );

  const ogImage = acfImage(settingsAcf, ["seo.og_image", "seo.ogImage"], {
    src: siteConfig.ogImage,
    alt: seoSiteName,
  }) ?? { src: siteConfig.ogImage, alt: seoSiteName };

  const iconImage = acfImage(
    settingsAcf,
    ["branding.logo_image", "branding.logoImage"],
    {
      src: siteConfig.logo.image?.src ?? "/favicon.ico",
      alt: seoSiteName,
    },
  ) ?? { src: siteConfig.logo.image?.src ?? "/favicon.ico", alt: seoSiteName };

  return {
    title: {
      default: seoSiteName,
      template: `%s | ${seoShortName}`,
    },
    description: seoDescription,
    icons: {
      icon: iconImage.src,
      apple: iconImage.src,
    },
    keywords: ["leadership", "policy", "research", "governance", "innovation"],
    authors: [{ name: seoShortName }],
    openGraph: {
      title: seoSiteName,
      description: seoDescription,
      url: siteConfig.url,
      siteName: seoShortName,
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: ogImage.alt ?? seoSiteName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoSiteName,
      description: seoDescription,
      images: [ogImage.src],
      creator: seoTwitterCreator,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: seoGoogleVerification,
    },
  };
}

type HeaderLink = { label: string; href: string };

function normalizeLinks(value: unknown): HeaderLink[] | null {
  if (!Array.isArray(value)) return null;
  const links: HeaderLink[] = [];
  for (const row of value) {
    if (!row || typeof row !== "object") continue;
    const record = row as Record<string, unknown>;
    const label = typeof record.label === "string" ? record.label : null;
    const href =
      typeof record.href === "string"
        ? record.href
        : typeof record.url === "string"
          ? record.url
          : null;
    if (label && href) links.push({ label, href });
  }
  return links.length ? links : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsAcf: unknown = await getSiteSettingsAcf();

  const navItems =
    normalizeLinks(
      acfGet<unknown>(
        settingsAcf,
        ["header.nav", "header_navigation", "nav"],
        null,
      ),
    ) ?? navigation;

  const ctaLabel = acfString(
    settingsAcf,
    ["header.cta_label", "header.ctaLabel"],
    "Contact",
  );
  const ctaHref = acfString(
    settingsAcf,
    ["header.cta_href", "header.ctaHref"],
    "/contact",
  );

  const footerQuickLinks =
    normalizeLinks(
      acfGet<unknown>(
        settingsAcf,
        ["footer.quick_links", "footer.quickLinks"],
        null,
      ),
    ) ?? siteConfig.footer.quickLinks;

  const footerResources =
    normalizeLinks(
      acfGet<unknown>(
        settingsAcf,
        ["footer.resources", "footer.resource_links"],
        null,
      ),
    ) ?? siteConfig.footer.resources;

  const footerLegal =
    normalizeLinks(
      acfGet<unknown>(
        settingsAcf,
        ["footer.legal", "footer.legal_links"],
        null,
      ),
    ) ?? siteConfig.footer.legal;

  const footerNewsletter = {
    title: acfString(settingsAcf, ["footer.newsletter.title"], ""),
    description: acfString(settingsAcf, ["footer.newsletter.description"], ""),
    emailPlaceholder: acfString(
      settingsAcf,
      ["footer.newsletter.email_placeholder"],
      "",
    ),
    buttonLabel: acfString(settingsAcf, ["footer.newsletter.button_label"], ""),
  };

  const footerCopyright = acfString(
    settingsAcf,
    ["footer.copyright"],
    "© 2026 KAARSHE. All rights reserved.",
  );

  const branding = {
    logoText: acfString(
      settingsAcf,
      ["branding.logo_text", "branding.logoText"],
      "",
    ),
    logoImage:
      acfImage(
        settingsAcf,
        ["branding.logo_image", "branding.logoImage"],
        undefined,
      ) ?? null,
  };

  const newsletterModal = {
    enabled: Boolean(
      acfGet<unknown>(settingsAcf, ["newsletter_modal.enabled"], true),
    ),
    delayMs: Number(
      acfGet<unknown>(settingsAcf, ["newsletter_modal.delay_ms"], 800),
    ),
    title: acfString(settingsAcf, ["newsletter_modal.title"], ""),
    description: acfString(settingsAcf, ["newsletter_modal.description"], ""),
    emailPlaceholder: acfString(
      settingsAcf,
      ["newsletter_modal.email_placeholder"],
      "",
    ),
    buttonLabel: acfString(settingsAcf, ["newsletter_modal.button_label"], ""),
    successMessage: acfString(
      settingsAcf,
      ["newsletter_modal.success_message"],
      "",
    ),
  };

  const socials = {
    ...siteConfig.social,
    twitter: acfString(
      settingsAcf,
      ["social.twitter"],
      siteConfig.social.twitter,
    ),
    linkedin: acfString(
      settingsAcf,
      ["social.linkedin"],
      siteConfig.social.linkedin,
    ),
    instagram: acfString(
      settingsAcf,
      ["social.instagram"],
      siteConfig.social.instagram,
    ),
    facebook: acfString(
      settingsAcf,
      ["social.facebook"],
      siteConfig.social.facebook,
    ),
  };

  return (
    <html
      lang="en"
      className={cn(publicSans.variable, playfair.variable, lora.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background-light text-primary selection:bg-accent-burgundy/20">
        <Header
          navItems={navItems}
          cta={{ label: ctaLabel, href: ctaHref }}
          branding={branding}
        />

        <NewsletterModal
          enabled={newsletterModal.enabled}
          delayMs={
            Number.isFinite(newsletterModal.delayMs)
              ? newsletterModal.delayMs
              : 800
          }
          onlyOnHome
          title={newsletterModal.title || undefined}
          description={newsletterModal.description || undefined}
          emailPlaceholder={newsletterModal.emailPlaceholder || undefined}
          buttonLabel={newsletterModal.buttonLabel || undefined}
          successMessage={newsletterModal.successMessage || undefined}
        />
        <main className="min-h-screen">{children}</main>
        <Footer
          newsletter={footerNewsletter}
          quickLinks={footerQuickLinks}
          resources={footerResources}
          legal={footerLegal}
          socials={socials}
          copyright={footerCopyright}
        />
      </body>
    </html>
  );
}
