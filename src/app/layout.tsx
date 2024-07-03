import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { SessionProvider } from 'next-auth/react'
import TanstackProvider from '@/providers/tanstack-provider'
import { dmSans, suit } from '@/lib/fonts'
import { Toaster } from '@/components/ui/toaster'
import { Metadatas } from '@/features/metadata'

export const metadata: Metadata = Metadatas.root()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn(suit.variable, dmSans.variable, 'bg-gray-01 font-dm-suit')}>
        <SessionProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
