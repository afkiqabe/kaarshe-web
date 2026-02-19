'use client'

import { cn } from '@/lib/utils/cn'
import { Icon } from './Icon'
import Image from 'next/image'

interface MediaCardProps {
  type: string
  source: string
  duration?: string
  format?: string
  title: string
  description?: string
  author?: string
  image?: string
  videoUrl?: string
  url?: string
  className?: string
}

export function MediaCard({
  type,
  source,
  duration,
  format,
  title,
  description,
  author,
  image,
  videoUrl,
  url,
  className,
}: MediaCardProps) {
  const isPress = type === 'Press'
  const isVideo = ['Interview', 'Keynote', 'Podcast', 'Conference'].includes(type)

  if (isPress) {
    return (
      <div className={cn(
        'bg-white dark:bg-neutral-900 p-8 rounded-2xl media-card-shadow border border-primary/5',
        'flex flex-col justify-between group hover:shadow-lg transition-shadow',
        className
      )}>
        <div className="space-y-4">
          <div className="size-10 bg-primary/5 dark:bg-white/10 rounded flex items-center justify-center">
            <Icon name="article" className="text-primary dark:text-white" />
          </div>
          <h4 className="text-xl font-bold leading-tight group-hover:text-accent-burgundy transition-colors italic">
            "{title}"
          </h4>
        </div>
        <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">{source}</p>
            {author && <p className="text-xs text-primary/40">Review by {author}</p>}
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary/20 hover:text-accent-burgundy transition-colors">
            <Icon name="open_in_new" size="md" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('group flex flex-col gap-4 cursor-pointer', className)}>
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-200">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {isVideo && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Icon name="play_arrow" className="text-white text-3xl" fill />
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {type}
        </div>
      </div>
      <div className="px-2">
        <p className="text-xs font-bold text-primary/40 dark:text-white/40 uppercase mb-1">
          {source} {duration && `• ${duration}`} {format && `• ${format}`}
        </p>
        <h4 className="text-lg font-bold group-hover:text-accent-burgundy transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-primary/60 dark:text-white/60 mt-2 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}