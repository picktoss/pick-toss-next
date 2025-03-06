import { nativeShare } from './share'

interface ShareOptions {
  title: string
  description: string
  imageUrl: string
  inviteLinkUrl: string
}

export const loadKakaoSDK = () => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') return

    if (window.Kakao && window.Kakao.isInitialized()) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY

        if (appKey) {
          window.Kakao.init(appKey)
          resolve()
        } else {
          reject(new Error('Kakao API Key가 설정되지 않았습니다.'))
        }
      }
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 폴백 : 기본 공유, 카카오톡 웹 공유
const fallbackToWebShare = async (options: ShareOptions) => {
  const { title, description, inviteLinkUrl } = options

  try {
    // 기본 공유 기능 사용
    const content = {
      title,
      text: description,
      url: inviteLinkUrl,
    }

    await nativeShare(content)
  } catch (error) {
    console.error(error)
  }

  try {
    // 카카오톡 웹 공유 링크로 폴백
    const webShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(
      inviteLinkUrl
    )}`
    window.open(webShareUrl, '_blank')
  } catch (error) {
    console.error(error)
  }
}

let isSharing = false // 공유 중 여부 체크

export const shareToKakao = async (options: ShareOptions) => {
  if (isSharing) return // 공유 중이면 요청 무시
  isSharing = true

  const { inviteLinkUrl } = options
  const templateId = process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID

  if (!window.Kakao?.isInitialized()) {
    isSharing = false
    throw new Error('Kakao SDK가 초기화되지 않았습니다.')
  }

  try {
    // 카카오 메시지 템플릿 사용
    window.Kakao.Share.sendCustom({
      templateId: Number(templateId),
      templateArgs: {
        code: inviteLinkUrl.split('/invite/')[1] ?? '',
      },
    })
  } catch (error) {
    console.error('카카오 공유 실패:', error)
    // 폴백 처리
    return fallbackToWebShare(options)
  } finally {
    setTimeout(() => (isSharing = false), 500)
  }
}
