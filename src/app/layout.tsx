import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { suit } from '@/shared/lib/fonts'
import { Metadatas } from '@/features/common/metadata'
import { Providers } from '@/providers'
import { Toaster } from '@/shared/components/ui/toaster'
import ClientSetUp from '@/shared/components/custom/client-set-up'
import '@/../../firebase'
import { Suspense } from 'react'
import Splash from '@/features/view/splash'

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
        <meta property="og:title" content="지금 가입하고 별 50개 더 받으세요!" />
        <meta
          property="og:description"
          content="픽토스에서는 AI퀴즈로 매일 간단하게 내가 배운 걸 기억할 수 있어요. 이 초대권을 통해 픽토스에 가입하실 경우 두 분 모두에게 퀴즈를 만들 수 있는 별 50를 추가로 드려요!"
        />
        {/* 배포 후 url 수정 필요 */}
        <meta
          property="og:image"
          content="https://pick-toss-next.vercel.app/images/share-thumbnail.png"
        />
        <meta property="og:url" content="https://pick-toss-next.vercel.app/invite/" />
        <meta property="og:type" content="website" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="picktoss" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(suit.variable, 'font-suit bg-gray-01')}>
        <Suspense fallback={<Splash />}>
          <Providers>
            <ClientSetUp />
            <div className="mx-auto min-h-dvh max-w-mobile shadow-lg">{children}</div>
          </Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
