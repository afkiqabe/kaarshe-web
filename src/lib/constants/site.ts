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
  // { label: "Publications", href: "/publications" },
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
    image: {
      src: "/images/logo.png",
      alt: "Kaarshe logo",
    },
  },
  contact: {
    address: {
      street: "Makka Al-Mukarama",
      city: "Mogadishu",
      state: "",
      zip: "",
      country: "Somalia",
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
      { label: "About", href: "/about" },
      { label: "Vision", href: "/vision" },

      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Book Speaking", href: "/book-speaking" },
      // { label: "Publications", href: "/publications" },
      { label: "Research", href: "/research" },
      { label: "Blog", href: "/blog" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-and-conditions" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
};
