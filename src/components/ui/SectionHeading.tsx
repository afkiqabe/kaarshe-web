import { cn } from '@/lib/utils/cn'
import { ReactNode } from 'react'

interface SectionHeadingProps {
  badge?: string
  title: string | ReactNode
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  badgeClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      'space-y-4',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}>
      {badge && (
        <span className={cn(
          'inline-block px-3 py-1 bg-accent-burgundy/10 text-accent-burgundy text-xs font-bold uppercase tracking-widest rounded',
          badgeClassName
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-black tracking-tight',
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-lg text-primary/60 max-w-2xl mx-auto leading-relaxed',
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  )
}