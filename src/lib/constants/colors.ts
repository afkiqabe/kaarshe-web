export const colors = {
  primary: {
    DEFAULT: '#1f1f1f',
    50: '#f7f7f7',
    100: '#e5e5e5',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1f1f1f',
    950: '#0d0d0d',
  },
  accent: {
    burgundy: '#6B1F2A',
    gold: '#D4AF37',
  },
  background: {
    light: '#f7f7f7',
    dark: '#191919',
  },
} as const

export type ColorPalette = typeof colors