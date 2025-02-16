interface ShareContent {
  title: string
  text: string
  url: string
  imageUrl: string
}

export const nativeShare = async (shareContent: ShareContent, fallback?: () => Promise<void>) => {
  const { title, text, url, imageUrl } = shareContent
  if (navigator.share) {
    try {
      await navigator.share({ url: imageUrl })
      await navigator.share({ title, text, url })
    } catch (error) {
      console.error('공유하기 실패:', error)
    }
  } else {
    if (fallback) {
      // 공유 API를 지원하지 않는 환경에서 실행될 폴백 함수
      await fallback()
    }
  }
}
