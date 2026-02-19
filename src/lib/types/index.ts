export interface BaseContent {
  id: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Post extends BaseContent {
  excerpt: string
  content: string
  author: string
  category: string
  image?: string
  tags?: string[]
}

export interface Page extends BaseContent {
  content: string
  featuredImage?: string
  meta?: {
    title?: string
    description?: string
  }
}