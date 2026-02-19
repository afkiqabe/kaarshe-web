import { cn } from '@/lib/utils/cn'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'burgundy' | 'gold' | 'primary'
  className?: string
}

const variants = {
  burgundy: 'bg-accent-burgundy/10 text-accent-burgundy',
  gold: 'bg-accent-gold/10 text-accent-gold',
  primary: 'bg-primary text-white',
}

export function Badge({ children, variant = 'burgundy', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}