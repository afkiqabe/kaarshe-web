import { contactPageContent } from "@/lib/constants";
import { getWpPageBySlug } from "@/lib/wp";
import { acfGet, acfString } from "@/lib/wpAcf";
import { ContactClient, type ContactPageModel } from "./ContactClient";

export default async function ContactPage() {
  const fallback = contactPageContent;
  const slug = process.env.WORDPRESS_CONTACT_PAGE_SLUG ?? "contact";

  let acf: unknown = null;
  try {
    const page = await getWpPageBySlug(slug);
    acf = page?.acf ?? null;
  } catch {
    acf = null;
  }

  const socialLinks =
    (acfGet<unknown>(
      acf,
      ["contact.social_links", "social_links", "socialLinks"],
      undefined,
    ) as
      | Array<{
          platform?: unknown;
          icon?: unknown;
          url?: unknown;
          href?: unknown;
          label?: unknown;
        }>
      | undefined) ?? fallback.socialLinks;

  const model: ContactPageModel = {
    hero: {
      title: acfString(acf, ["hero.title", "hero_title"], fallback.hero.title),
      description: acfString(
        acf,
        ["hero.description", "hero_description"],
        fallback.hero.description,
      ),
    },
    form: {
      title: acfString(acf, ["form.title", "form_title"], fallback.form.title),
      description: acfString(
        acf,
        ["form.description", "form_description"],
        fallback.form.description,
      ),
    },
    office: {
      title: acfString(
        acf,
        ["office.title", "office_title"],
        fallback.office.title,
      ),
      address: {
        name: acfString(
          acf,
          ["office.address.name", "office_address_name"],
          fallback.office.address.name ?? "",
        ),
        street: acfString(
          acf,
          ["office.address.street", "office_address_street"],
          fallback.office.address.street,
        ),
        city: acfString(
          acf,
          ["office.address.city", "office_address_city"],
          fallback.office.address.city,
        ),
        state: acfString(
          acf,
          ["office.address.state", "office_address_state"],
          fallback.office.address.state ?? "",
        ),
        zip: acfString(
          acf,
          ["office.address.zip", "office_address_zip"],
          fallback.office.address.zip ?? "",
        ),
        country: acfString(
          acf,
          ["office.address.country", "office_address_country"],
          fallback.office.address.country,
        ),
      },
      mapEmbedUrl: acfString(
        acf,
        ["office.map_embed_url", "office.mapEmbedUrl", "map_embed_url"],
        fallback.office.mapEmbedUrl,
      ),
      mapLinkUrl: acfString(
        acf,
        ["office.map_link_url", "office.mapLinkUrl", "map_link_url"],
        fallback.office.mapLinkUrl,
      ),
    },
    socialLinks: Array.isArray(socialLinks)
      ? socialLinks
          .map((row: unknown) => {
            if (!row || typeof row !== "object") return null;
            const r = row as Record<string, unknown>;

            const platform =
              typeof r.platform === "string"
                ? r.platform
                : typeof r.label === "string"
                  ? r.label
                  : "";
            const icon = typeof r.icon === "string" ? r.icon : "public";
            const url =
              typeof r.url === "string"
                ? r.url
                : typeof r.href === "string"
                  ? r.href
                  : "";
            if (!platform || !url) return null;
            return { platform, icon, url };
          })
          .filter((x): x is { platform: string; icon: string; url: string } =>
            Boolean(x),
          )
      : fallback.socialLinks,
  };

  return <ContactClient content={model} />;
}
