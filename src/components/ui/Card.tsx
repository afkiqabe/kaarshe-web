import { cn } from '@/lib/utils/cn'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const paddings = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-200',
        paddings[padding],
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border-b border-gray-200 pb-4 mb-4', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border-t border-gray-200 pt-4 mt-4', className)}>
      {children}
    </div>
  )
}