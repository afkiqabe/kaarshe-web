export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Vision', href: '/vision' },
  { label: 'Blog', href: '/blog' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
]

export const siteConfig = {
  name: 'KAARSHE',
  description: 'Official Leadership Portal - Leading with Integrity, Building for the Future',
  url: 'https://kaarshe.com',
  ogImage: 'https://kaarshe.com/og.jpg',
  slogan: 'Leading with Integrity, Building for the Future',
  mission: 'To lead with unwavering integrity, fostering transparent governance and innovative solutions that empower communities and ensure long-term prosperity.',
  logo: {
    icon: 'account_balance',
    text: 'KAARSHE',
  },
  social: {
    twitter: 'https://twitter.com/kaarshe',
    linkedin: 'https://linkedin.com/company/kaarshe',
    email: 'info@kaarshe.com',
  },
  footer: {
    quickLinks: [
      { label: 'About the Visionary', href: '/about' },
      { label: 'Strategic Framework', href: '/vision' },
      { label: 'Resource Archive', href: '/research' },
      { label: 'Speaking Engagements', href: '/contact' },
    ],
    resources: [
      { label: 'White Papers', href: '/research/white-papers' },
      { label: 'Annual Reports', href: '/research/annual-reports' },
      { label: 'Policy Briefs', href: '/research/policy-briefs' },
      { label: 'Press Kit', href: '/press-kit' },
    ],
  },
}