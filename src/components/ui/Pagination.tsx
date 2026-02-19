'use client'

import { cn } from '@/lib/utils/cn'
import { Icon } from './Icon'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (currentPage <= 3) return i + 1
    if (currentPage >= totalPages - 2) return totalPages - 4 + i
    return currentPage - 2 + i
  })

  return (
    <div className={cn('mt-12 flex items-center justify-between border-t border-neutral-200 pt-8', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="arrow_back" size="sm" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg bg-white text-neutral-600 hover:bg-neutral-100 text-sm font-bold"
            >
              1
            </button>
            {pages[0] > 2 && <span className="px-2 text-neutral-400">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 rounded-lg text-sm font-bold transition-all',
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-100'
            )}
          >
            {page}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-neutral-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg bg-white text-neutral-600 hover:bg-neutral-100 text-sm font-bold"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent-burgundy transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <Icon name="arrow_forward" size="sm" />
      </button>
    </div>
  )
}