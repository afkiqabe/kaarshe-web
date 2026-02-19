export interface BaseContent {
  id: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Author {
  name: string
  role?: string
  image?: string
  bio?: string
}

export interface Post extends BaseContent {
  excerpt: string
  content: any[] // For rich content blocks
  author: Author | string
  category: string
  image?: string
  tags?: string[]
  readTime?: string
  featured?: boolean
}

export interface Page extends BaseContent {
  content: string
  featuredImage?: string
  meta?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface ResearchDocument {
  id: string
  title: string
  description: string
  category: string
  categoryColor?: 'burgundy' | 'blue' | 'emerald'
  date: string
  author: string
  readTime: string
  downloadUrl: string
}

export interface MediaItem {
  id: string
  type: 'Interview' | 'Keynote' | 'Press' | 'Podcast' | 'Conference'
  source: string
  duration?: string
  format?: string
  title: string
  description?: string
  author?: string
  image?: string
  videoUrl?: string
  url?: string
}

export interface Milestone {
  year: string
  title: string
  description: string
  icon: string
}

export interface PolicyPillar {
  icon: string
  title: string
  description: string
  points: string[]
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}