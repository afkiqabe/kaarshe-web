/**
 * Constants Index
 * This file exports all constants from the constants directory
 * for easier imports throughout the application.
 *
 * Usage: import { siteConfig, navigation, colors } from '@/lib/constants'
 */

// Core (explicit to avoid duplicate re-export name collisions)
export { colors } from './colors'
export { siteConfig } from './site'
export { navigation } from './navigation'
export type { NavItem } from './navigation'

// Page Content (safe to wildcard if they don’t collide)
export * from './content'
export * from './home'
export * from './about'
export * from './vision'
export * from './blog'
export * from './blogPosts'
export * from './research'
export * from './contact'
export * from './publications'

// Default export (optional)
import { siteConfig } from './site'
import { colors } from './colors'
import { navigation } from './navigation'

const constants = {
  siteConfig,
  colors,
  navigation,
}

export default constants