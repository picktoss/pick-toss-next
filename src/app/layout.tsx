import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { suit } from '@/shared/lib/fonts'
import { Metadatas } from '@/features/common/metadata'
import { Providers } from '@/providers'
import { Toaster } from '@/shared/components/ui/toaster'
import ClientSetUp from '@/shared/components/custom/client-set-up'

export const metadata: Metadata = Metadatas.root()

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn(suit.variable, 'font-suit bg-gray-01')}>
        <Providers>
          <ClientSetUp />
          <div className="mx-auto min-h-screen max-w-mobile shadow-lg">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
