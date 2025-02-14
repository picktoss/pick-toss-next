import { nativeShare } from './share'

interface ShareOptions {
  title: string
  description: string
  imageUrl: string
  inviteLinkUrl: string
}

export const loadKakaoSDK = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.Kakao) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.onload = () => {
      const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
      if (appKey) {
        window.Kakao.init(appKey)
        resolve()
      }
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 폴백 : 기본 공유, 카카오톡 웹 공유
const fallbackToWebShare = async (options: ShareOptions) => {
  const { title, description, inviteLinkUrl, imageUrl } = options

  try {
    // 기본 공유 기능 사용
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'share-thumbnail.png', { type: blob.type })

    const content = {
      title,
      text: description,
      url: inviteLinkUrl,
      files: [file],
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

export const shareToKakao = async (options: ShareOptions) => {
  const { inviteLinkUrl } = options
  // const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const templateId = process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID

  if (!window.Kakao?.isInitialized()) {
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
  }
}
