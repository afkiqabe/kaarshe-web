import { cn } from '@/lib/utils/cn'
import { Icon } from './Icon'

interface MilestoneCardProps {
  year: string
  title: string
  description: string
  icon: string
  className?: string
}

export function MilestoneCard({ year, title, description, icon, className }: MilestoneCardProps) {
  return (
    <div className={cn(
      'bg-background-light dark:bg-background-dark p-8 flex flex-col gap-6',
      'hover:bg-white dark:hover:bg-neutral-800 transition-colors',
      className
    )}>
      <span className="text-4xl font-black opacity-10">{year}</span>
      <div className="space-y-2">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm opacity-60">{description}</p>
      </div>
      <Icon name={icon} className="self-start" size="lg" />
    </div>
  )
}