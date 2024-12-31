import localFont from 'next/font/local'

export const suit = localFont({
  src: [
    {
      path: '../../../public/fonts/SUIT-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-suit',
})
