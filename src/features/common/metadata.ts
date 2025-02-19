import { Metadata } from 'next'

export const Metadatas = {
  root(): Metadata {
    return {
      metadataBase: new URL(`https://www.picktoss.com`),
      title: '픽토스 | 나만의 AI 퀴즈',
      manifest: '/manifest.json',
      description: 'AI로 생성하는 나만의 퀴즈',
      // description:
      //   '나의 노트로부터 생성되는 다양한 퀴즈와 요점 정리를 통해 효율적으로 메타인지 할 수 있어요!',
      icons: {
        icon: '/images/picktoss-logo.png',
      },
      openGraph: {
        url: 'https://www.picktoss.com',
        images: {
          url: '/images/share-thumbnail.png',
        },
        title: '지금 가입하고 별 50개 더 받으세요!',
        description:
          '픽토스에서는 AI퀴즈로 매일 간단하게 내가 배운 걸 기억할 수 있어요. 이 초대권을 통해 픽토스에 가입하실 경우 두 분 모두에게 퀴즈를 만들 수 있는 별 50를 추가로 드려요!',
      },
    }
  },
}
