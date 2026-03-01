import { researchPageContent } from "@/lib/constants";
import type { ResearchDocument } from "@/lib/types/content";
import {
  type WpCptItem,
  estimateReadTimeFromHtml,
  formatWpDate,
  getWpCptItems,
  pickFirstTermByTaxonomy,
  stripHtml,
} from "@/lib/wp";
import { acfFileUrl, acfString } from "@/lib/wpAcf";
import { ResearchClient } from "./ResearchClient";

export default async function ResearchPage() {
  const fallback = researchPageContent;
  const heroFallback = fallback.hero;

  const researchPostType =
    process.env.WORDPRESS_RESEARCH_POST_TYPE ?? "research";

  let items: WpCptItem[] = [];
  let totalFromApi: number | null = null;
  try {
    const res = await getWpCptItems(researchPostType, {
      perPage: 100,
      page: 1,
    });
    items = res.items;
    totalFromApi = res.total;
  } catch {
    // If CPT isn't enabled yet, keep the fallback static content for now.
    items = [];
    totalFromApi = null;
  }

  const documents: ResearchDocument[] =
    items.length > 0
      ? items.map((item) => {
          const acfSource = item.acf ?? (item as any).meta;

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
            acfString(acfSource, ["read_time", "readTime"], "") ||
            (item.content?.rendered
              ? estimateReadTimeFromHtml(item.content.rendered)
              : "5 min read");

          const downloadUrl = acfFileUrl(
            acfSource,
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
            author:
              acfString(acfSource, ["author", "author_name"], "") ||
              item._embedded?.author?.[0]?.name ||
              "Kaarshe",
            readTime,
            downloadUrl: downloadUrl || "#",
          };
        })
      : fallback.documents;

  const documentCount = totalFromApi ?? documents.length;

  const hero = {
    ...heroFallback,
    stats: heroFallback.stats.map((stat, index) =>
      index === 0 && documentCount > 0
        ? {
            ...stat,
            label: `${documentCount.toLocaleString()} Document${documentCount === 1 ? "" : "s"}`,
          }
        : stat,
    ),
  };

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
