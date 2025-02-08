import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { suit } from '@/shared/lib/fonts'
import { Metadatas } from '@/features/common/metadata'
import { Providers } from '@/providers'
import { Toaster } from '@/shared/components/ui/toaster'
import ClientSetUp from '@/shared/components/custom/client-set-up'
import '@/../../firebase'

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
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="picktoss" />
      </head>
      <body className={cn(suit.variable, 'font-suit bg-gray-01')}>
        <Providers>
          <ClientSetUp />
          <div className="mx-auto min-h-dvh max-w-mobile shadow-lg">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
