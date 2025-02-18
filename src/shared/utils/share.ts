interface ShareContent {
  title: string
  text: string
  url: string
}

export const nativeShare = async (shareContent: ShareContent, fallback?: () => Promise<void>) => {
  const { title, text, url } = shareContent

  if (navigator.share) {
    try {
      // URL의 웹페이지에 Open Graph 메타태그가 있어야 썸네일 표시 가능
      await navigator.share({ title, text, url })
    } catch (error) {
      console.error('공유하기 실패:', error)

      if (error instanceof Error) {
        // 오류가 사용자 취소가 아닌 경우에만 fallback 실행
        if (error.name !== 'AbortError' && fallback) {
          await fallback()
        }
      }
    }
  } else {
    if (fallback) {
      // 공유 API를 지원하지 않는 환경에서 실행될 폴백 함수
      await fallback()
    }
  }
}
