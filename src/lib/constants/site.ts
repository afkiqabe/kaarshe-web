export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Vision", href: "/vision" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const siteConfig = {
  name: "KAARSHE",
  shortName: "Kaarshe",
  description:
    "Official Leadership Portal - Leading with Integrity, Building for the Future",
  url: "https://kaarshe.com",
  ogImage: "https://kaarshe.com/og.jpg",
  slogan: "Leading with Integrity, Building for the Future",
  mission:
    "To lead with unwavering integrity, fostering transparent governance and innovative solutions that empower communities and ensure long-term prosperity.",
  logo: {
    icon: "account_balance",
    text: "KAARSHE",
  },
  contact: {
    email: "info@kaarshe.gov",
    pressEmail: "press@kaarshe.gov",
    phone: "+1 (555) 123-4567",
    address: {
      street: "1200 Pennsylvania Avenue NW",
      city: "Washington",
      state: "DC",
      zip: "20004",
      country: "United States",
    },
  },
  social: {
    twitter: "https://twitter.com/kaarshe",
    linkedin: "https://linkedin.com/company/kaarshe",
    instagram: "https://instagram.com/kaarshe",
    facebook: "https://facebook.com/kaarshe",
  },
  footer: {
    quickLinks: [
      { label: "About the Visionary", href: "/about" },
      { label: "Strategic Framework", href: "/vision" },
      { label: "Resource Archive", href: "/research" },
      { label: "Speaking Engagements", href: "/contact" },
      { label: "Media Center", href: "/publications" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    resources: [
      { label: "White Papers", href: "/research?type=white-papers" },
      { label: "Annual Reports", href: "/research?type=annual-reports" },
      { label: "Policy Briefs", href: "/research?type=policy-briefs" },
      { label: "Press Kit", href: "/press-kit" },
      { label: "Speeches", href: "/publications?type=speeches" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
};
