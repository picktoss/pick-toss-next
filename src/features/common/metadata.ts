import { Metadata } from 'next'

export const Metadatas = {
  root(): Metadata {
    return {
      metadataBase: new URL(`https://www.picktoss.com`),
      title: '픽토스 | 나만의 AI 퀴즈',
      manifest: '/manifest.json',
      description: 'AI로 생성하는 나만의 퀴즈',
      icons: {
        icon: '/images/picktoss-logo.png',
      },
      openGraph: {
        url: 'https://www.picktoss.com',
        images: {
          url: '/images/og-800x400.png',
        },
        title: '픽토스: AI로 생성하는 나만의 퀴즈',
        description:
          '나의 노트로부터 생성되는 다양한 퀴즈와 요점 정리를 통해 효율적으로 메타인지 할 수 있어요!',
      },
    }
  },
}
