import { Metadata } from 'next'

/** TODO: 배포 url 변경 후 수정 필요 */
export const Metadatas = {
  root(): Metadata {
    const baseUrl = 'https://pick-toss-next.vercel.app'
    // const baseUrl = 'https://www.picktoss.com';

    return {
      metadataBase: new URL(baseUrl),
      title: '픽토스 | 나만의 AI 퀴즈',
      manifest: '/manifest.json',
      description: 'AI로 생성하는 나만의 퀴즈',
      // description:
      //   '나의 노트로부터 생성되는 다양한 퀴즈와 요점 정리를 통해 효율적으로 메타인지 할 수 있어요!',
      icons: {
        icon: '/images/picktoss-logo.png',
      },
      openGraph: {
        url: baseUrl,
        images: {
          url: `${baseUrl}/images/share-thumbnail.png`,
        },
        title: '픽토스: 나를 성장시키는 똑똑한 퀴즈',
        description: '픽토스에서는 AI퀴즈로 매일 간단하게 내가 배운 걸 기억할 수 있어요.',
      },
    }
  },
}
