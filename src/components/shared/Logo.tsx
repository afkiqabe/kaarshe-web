// import Link from 'next/link'
// import { Icon } from '@/components/ui/Icon'
// import { siteConfig } from '@/lib/constants'
// import { cn } from '@/lib/utils/cn'

// interface LogoProps {
//   variant?: 'light' | 'dark'
//   showIcon?: boolean
//   className?: string
//   iconClassName?: string
//   textClassName?: string
// }

// export function Logo({ 
//   variant = 'dark', 
//   showIcon = true,
//   className,
//   iconClassName,
//   textClassName 
// }: LogoProps) {
//   const isDark = variant === 'dark'
  
//   return (
//     <Link href="/" className={cn('flex items-center gap-3', className)}>
//       {showIcon && (
//         <div className={cn(
//           'size-8 flex items-center justify-center rounded',
//           isDark ? 'bg-primary' : 'bg-white',
//           iconClassName
//         )}>
//           <Icon 
//             name={siteConfig.logo.icon} 
//             className={cn(isDark ? 'text-white' : 'text-primary')}
//             size="sm"
//           />
//         </div>
//       )}
//       <h2 className={cn(
//         'text-2xl font-black tracking-tighter',
//         isDark ? 'text-primary' : 'text-white',
//         textClassName
//       )}>
//         {siteConfig.logo.text}
//       </h2>
//     </Link>
//   )
// }