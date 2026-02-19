// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { cn } from '@/lib/utils/cn'
// import { navigation } from '@/lib/constants'

// interface NavigationProps {
//   className?: string
//   mobile?: boolean
//   onItemClick?: () => void
// }

// export function Navigation({ className, mobile = false, onItemClick }: NavigationProps) {
//   const pathname = usePathname()

//   if (mobile) {
//     return (
//       <ul className={cn('flex flex-col space-y-4', className)}>
//         {navigation.map((item) => (
//           <li key={item.href}>
//             <Link
//               href={item.href}
//               className={cn(
//                 'block text-sm font-bold uppercase tracking-wider transition-colors',
//                 pathname === item.href
//                   ? 'text-primary'
//                   : 'text-primary/70 hover:text-primary'
//               )}
//               onClick={onItemClick}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     )
//   }

//   return (
//     <ul className={cn('hidden md:flex items-center gap-8', className)}>
//       {navigation.map((item) => (
//         <li key={item.href}>
//           <Link
//             href={item.href}
//             className={cn(
//               'text-xs font-bold uppercase tracking-widest transition-colors',
//               pathname === item.href
//                 ? 'text-primary'
//                 : 'text-primary/70 hover:text-primary'
//             )}
//           >
//             {item.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   )
// }