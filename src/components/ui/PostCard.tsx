import Image from 'next/image'
import Link from 'next/link'
import { Icon } from './Icon'
import { Badge } from './Badge'
import { cn } from '@/lib/utils/cn'

interface PostCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    category: string
    image?: string
    slug: string
  }
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <article className={cn(
      'bg-white rounded-xl border border-primary/5 overflow-hidden',
      'hover:-translate-y-2 transition-transform duration-300',
      className
    )}>
      <div className="h-48 overflow-hidden relative">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="primary">{post.category}</Badge>
        </div>
      </div>
      <div className="p-8">
        <span className="text-xs text-primary/40 font-bold uppercase">
          {post.date}
        </span>
        <h4 className="text-xl font-bold mt-2 mb-4 leading-tight">
          {post.title}
        </h4>
        <p className="text-sm text-primary/60 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-accent-burgundy font-bold text-sm uppercase tracking-wider group"
        >
          Read More
          <Icon 
            name="arrow_right_alt" 
            size="sm" 
            className="group-hover:translate-x-1 transition-transform" 
          />
        </Link>
      </div>
    </article>
  )
}