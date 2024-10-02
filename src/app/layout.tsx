import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { dmSans, suit } from '@/shared/lib/fonts'
import { Metadatas } from '@/features/metadata'
import { Providers } from '@/providers'
import { Toaster } from '@/shared/components/ui/toaster'

export const metadata: Metadata = Metadatas.root()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn(suit.variable, dmSans.variable, 'bg-gray-01 font-dm-suit')}>
        <Providers>
          <div className="mx-auto min-h-screen max-w-[430px] shadow-lg">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
