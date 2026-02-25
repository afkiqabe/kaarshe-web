import { researchPageContent } from "@/lib/constants";
import type { ResearchDocument } from "@/lib/types/content";
import {
  type WpCptItem,
  estimateReadTimeFromHtml,
  formatWpDate,
  getWpCptItems,
  getWpPageBySlug,
  pickFirstTermByTaxonomy,
  stripHtml,
} from "@/lib/wp";
import { acfFileUrl, acfGet, acfString } from "@/lib/wpAcf";
import { ResearchClient } from "./ResearchClient";

export default async function ResearchPage() {
  const fallback = researchPageContent;

  const researchSlug = process.env.WORDPRESS_RESEARCH_PAGE_SLUG ?? "research";
  const wpPage = await getWpPageBySlug(researchSlug);
  const acf = wpPage?.acf;

  const hero = {
    badge: acfString(acf, ["hero.badge", "hero_badge"], fallback.hero.badge),
    title: acfString(acf, ["hero.title", "hero_title"], fallback.hero.title),
    titleHighlight: acfString(
      acf,
      ["hero.title_highlight", "hero_title_highlight"],
      fallback.hero.titleHighlight,
    ),
    description: acfString(
      acf,
      ["hero.description", "hero_description"],
      fallback.hero.description,
    ),
    stats:
      (acfGet<unknown>(acf, ["hero.stats", "hero_stats"], undefined) as
        | Array<{ icon: string; label: string }>
        | undefined) ?? fallback.hero.stats,
  };

  const researchPostType =
    process.env.WORDPRESS_RESEARCH_POST_TYPE ?? "research";

  let items: WpCptItem[] = [];
  try {
    const res = await getWpCptItems(researchPostType, {
      perPage: 100,
      page: 1,
    });
    items = res.items;
  } catch {
    // If CPT isn't enabled yet, keep the fallback static content for now.
    items = [];
  }

  const documents: ResearchDocument[] =
    items.length > 0
      ? items.map((item) => {
          const categoryTerm =
            pickFirstTermByTaxonomy(item, "research_category") ??
            pickFirstTermByTaxonomy(item, "category");

          const category = categoryTerm?.name ?? "Research";
          const categorySlug = categoryTerm?.slug ?? "research";

          const categoryColor: "burgundy" | "blue" | "emerald" | undefined =
            categorySlug === "economy"
              ? "burgundy"
              : categorySlug === "governance"
                ? "blue"
                : categorySlug === "society"
                  ? "emerald"
                  : undefined;

          const readTime =
            acfString(item.acf, ["read_time", "readTime"], "") ||
            (item.content?.rendered
              ? estimateReadTimeFromHtml(item.content.rendered)
              : "5 min read");

          const downloadUrl = acfFileUrl(
            item.acf,
            ["download_url", "downloadUrl", "pdf", "file"],
            "",
          );

          return {
            id: String(item.id),
            title: stripHtml(item.title?.rendered ?? ""),
            description: stripHtml(item.excerpt?.rendered ?? ""),
            category,
            categoryColor,
            date: item.date ? formatWpDate(item.date) : "",
            author: acfString(item.acf, ["author", "author_name"], "Kaarshe"),
            readTime,
            downloadUrl: downloadUrl || "#",
          };
        })
      : fallback.documents;

  const uniqueCategories = Array.from(
    new Map(
      documents
        .map((d) => d.category)
        .filter(Boolean)
        .map((name) => [name.toLowerCase(), name] as const),
    ).values(),
  );

  const categories = [
    { label: "All Fields", value: "all", active: true },
    ...uniqueCategories.map((name) => ({
      label: name,
      value: name.toLowerCase(),
      active: false,
    })),
  ];

  return (
    <ResearchClient hero={hero} categories={categories} documents={documents} />
  );
}
