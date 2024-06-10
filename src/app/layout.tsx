import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { SessionProvider } from 'next-auth/react'
import TanstackProvider from '@/providers/tanstack-provider'
import { dmSans, suit } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Picktoss',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(suit.variable, dmSans.variable, 'bg-gray-01 font-dm-suit')}>
        <SessionProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
