import localFont from 'next/font/local'
import { DM_Sans } from 'next/font/google'

export const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
})

export const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  adjustFontFallback: false,
})
