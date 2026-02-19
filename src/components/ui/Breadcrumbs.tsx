import Link from 'next/link'
import { Icon } from './Icon'
import { cn } from '@/lib/utils/cn'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400', className)}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <Icon name="chevron_right" size="xs" />}
          {index === items.length - 1 ? (
            <span className="text-accent-burgundy">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}