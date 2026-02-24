export const homePageContent = {
  hero: {
    // badge: "Official Leadership Portal",
    title: "Leading with ",
    titleHighlight: "Integrity",
    titleSuffix: ", Building for the ",
    titleHighlight2: "Future",
    description:
      "A vision for sustainable leadership and innovative policy design, committed to building a resilient future for all through transparent governance.",
    cta: {
      primary: {
        label: "Read the Vision",
        href: "/vision",
        icon: "arrow_forward",
      },
      secondary: { label: "Latest Research", href: "/research" },
    },
    image: {
      src: "/images/hero-portrait.jpg",
      alt: "Professional portrait of leader Kaarshe",
    },
  },
  mission: {
    quote: "format_quote",
    text: "To lead with unwavering integrity, fostering transparent governance and innovative solutions that empower communities and ensure long-term prosperity.",
  },
  policyHighlights: {
    badge: "",
    title: "Policy Highlights",
    description: "",
    policies: [
      {
        icon: "insights",
        title: "Economic Reform",
        description:
          "Implementing data-driven fiscal policies to stabilize emerging markets and promote sustainable investment in local industries.",
        points: [
          "Fiscal Transparency Initiatives",
          "Market Deregulation Strategies",
        ],
      },
      {
        icon: "diversity_3",
        title: "Social Infrastructure",
        description:
          "Building robust healthcare and education systems that provide equitable access to all citizens through public-private partnerships.",
        points: ["Universal Healthcare Access", "Digital Literacy Empowerment"],
      },
      {
        icon: "hub",
        title: "Infrastructure Modernization",
        description:
          "Accelerating reliable transport, ports, and digital backbone projects to reduce costs, improve access, and unlock private-sector growth.",
        points: [
          "Priority Corridor Investments",
          "Digital Connectivity Expansion",
        ],
      },
      {
        icon: "gpp_good",
        title: "Governance & Accountability",
        description:
          "Strengthening institutions with transparent procurement, measurable targets, and public reporting to increase trust and outcomes.",
        points: [
          "Open Contracting Standards",
          "Performance Monitoring & Audits",
        ],
      },
    ],
  },
  insights: {
    badge: "",
    title: "Latest Insights",
    posts: [
      {
        id: "1",
        category: "Research",
        date: "October 24, 2023",
        title: "The Future of Digital Governance in East Africa",
        excerpt:
          "Exploring how blockchain and AI can revolutionize public service delivery and reduce administrative friction.",
        image: "/images/blog/digital-governance.jpg",
        slug: "future-of-digital-governance-east-africa",
        author: "Marcus Thorne",
        readTime: "8 min read",
      },
      {
        id: "2",
        category: "Policy",
        date: "October 12, 2023",
        title: "Strategic Investment in Green Energy Networks",
        excerpt:
          "Why the transition to renewable power is the cornerstone of 2030 economic sovereignty goals.",
        image: "/images/blog/green-energy.jpg",
        slug: "strategic-investment-green-energy-networks",
        author: "Marcus Thorne",
        readTime: "6 min read",
      },
      {
        id: "3",
        category: "Leadership",
        date: "September 28, 2023",
        title: "Leadership Integrity in the Age of Misinformation",
        excerpt:
          "Developing resilience against polarized narratives and maintaining institutional trust through transparency.",
        image: "/images/blog/leadership-integrity.jpg",
        slug: "leadership-integrity-age-misinformation",
        author: "Marcus Thorne",
        readTime: "10 min read",
      },
    ],
  },
};
