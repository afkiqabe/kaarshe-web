import type { ResearchDocument } from "@/lib/types/content";

type ResearchPageContent = {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    stats: Array<{ icon: string; label: string }>;
  };
  categories: Array<{ label: string; value: string; active: boolean }>;
  documents: ResearchDocument[];
};

export const researchPageContent = {
  hero: {
    badge: "Digital Repository",
    title: "The Intellectual Archive",
    titleHighlight: "Research & Analysis",
    description:
      "Explore peer-reviewed research, policy briefs, and data-led economic analysis—curated to support decision-making, public value, and measurable impact.",
    stats: [
      { icon: "description", label: "1,240+ Documents" },
      { icon: "update", label: "Updated regularly" },
      { icon: "verified", label: "Peer-reviewed" },
    ],
  },
  categories: [
    { label: "All Fields", value: "all", active: true },
    { label: "Economy", value: "economy", active: false },
    { label: "Society", value: "society", active: false },
    { label: "Governance", value: "governance", active: false },
    { label: "Technology", value: "technology", active: false },
  ],
  documents: [
    {
      id: "doc-1",
      title:
        "Global Trade Resilience in the Post-Pandemic Era: A Structural Analysis",
      description:
        'This report examines the shifts in supply chain architectures across the EMEA region, highlighting the transition from "just-in-time" to "just-in-case" inventory models and their long-term economic implications...',
      category: "Economy",
      categoryColor: "burgundy",
      date: "Oct 24, 2023",
      author: "Marcus Thorne",
      readTime: "12 min read",
      downloadUrl: "/research/global-trade-resilience.pdf",
    },
    {
      id: "doc-2",
      title:
        "Decentralized Governance: Challenges and Opportunities for Emerging Economies",
      description:
        "An in-depth study of administrative decentralization in East Africa, analyzing fiscal autonomy at the municipal level and the resulting impact on public service delivery...",
      category: "Governance",
      categoryColor: "blue",
      date: "Sep 12, 2023",
      author: "Marcus Thorne",
      readTime: "18 min read",
      downloadUrl: "/research/decentralized-governance.pdf",
    },
    {
      id: "doc-3",
      title: "Digital Literacy and Social Equity: Mapping the Urban Divide",
      description:
        "A longitudinal study on the correlation between high-speed internet access and educational attainment in metropolitan centers, proposing new frameworks for digital inclusion...",
      category: "Society",
      categoryColor: "emerald",
      date: "Aug 05, 2023",
      author: "Marcus Thorne",
      readTime: "9 min read",
      downloadUrl: "/research/digital-literacy-social-equity.pdf",
    },
    {
      id: "doc-4",
      title: "Fiscal Policy and Inflationary Pressures: A Comparative Review",
      description:
        "Examining the efficacy of central bank interventions across G20 nations between 2021-2023, with a focus on interest rate cycles and sovereign debt sustainability...",
      category: "Economy",
      categoryColor: "burgundy",
      date: "Jul 19, 2023",
      author: "Marcus Thorne",
      readTime: "25 min read",
      downloadUrl: "/research/fiscal-policy-inflationary-pressures.pdf",
    },
  ],
} satisfies ResearchPageContent;
