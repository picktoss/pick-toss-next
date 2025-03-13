import { Metadata } from 'next'

export const Metadatas = {
  root(): Metadata {
    const baseUrl = 'https://www.picktoss.com'

    return {
      metadataBase: new URL(baseUrl),
      title: '픽토스(picktoss) | 나만의 AI퀴즈',
      manifest: '/manifest.json',
      description: 'AI로 생성하는 나만의 퀴즈',
      icons: {
        icon: '/images/picktoss-logo.png',
        apple: '/favicons/apple-touch-icon.png',
      },
      openGraph: {
        type: 'website',
        url: baseUrl,
        images: {
          url: `${baseUrl}/images/share-thumbnail.png`,
          alt: '픽토스 AI 퀴즈 썸네일',
        },
        title: '픽토스(picktoss) | 나만의 AI퀴즈',
        description: '픽토스에서는 AI퀴즈로 매일 간단하게 내가 배운 걸 기억할 수 있어요.',
      },
      twitter: {
        title: '픽토스(picktoss) | 나만의 AI퀴즈',
        description: 'AI로 생성하는 나만의 퀴즈',
        images: [`${baseUrl}/images/share-thumbnail.png`],
      },
      alternates: {
        canonical: baseUrl, // 중복 페이지 방지
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  },
}
