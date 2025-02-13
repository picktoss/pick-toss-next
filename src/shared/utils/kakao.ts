import type { KakaoShareDefault } from '@/types/kakao'

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

// 카카오톡 앱이 설치되어 있는지 확인
const isKakaoInstalled = (): boolean => {
  const ua = navigator.userAgent.toLowerCase()
  const isAndroid = ua.indexOf('android') > -1
  const isIOS = /iphone|ipad|ipod/.test(ua)

  if (isAndroid) {
    return window.Kakao?.isInitialized() && navigator.userAgent.indexOf('KAKAOTALK') > -1
  }
  if (isIOS) {
    // iOS에서는 정확한 확인이 어려워 우선 true 반환
    return true
  }
  return false
}

// 모바일 환경인지 확인
const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// iOS Safari에서 실행 중인지 확인
const isIOSSafari = (): boolean => {
  const ua = navigator.userAgent.toLowerCase()
  return (
    /iphone|ipad|ipod/.test(ua) &&
    /safari/.test(ua) &&
    !/(chrome|crios|fxios|line|edge|fb|instagram)/.test(ua)
  )
}

export const shareToKakao = async (options: ShareOptions) => {
  const { title, description, imageUrl, inviteLinkUrl } = options

  if (!window.Kakao?.isInitialized()) {
    throw new Error('Kakao SDK가 초기화되지 않았습니다.')
  }

  // PWA에서 실행 중인지 확인
  const isPWA = window.matchMedia('(display-mode: standalone)').matches

  if (isPWA && isIOSSafari()) {
    // iOS PWA에서는 직접 URL 스키마 사용
    const kakaoLink = encodeURIComponent(
      JSON.stringify({
        template_id: process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID, // 카카오 템플릿 ID
        template_args: {
          title,
          description,
          image_url: imageUrl,
          web_url: inviteLinkUrl,
          mobile_web_url: inviteLinkUrl,
        },
      })
    )

    window.location.href = `kakaolink://send?template_id=${process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID}&template_args=${kakaoLink}`
    return
  }

  // 일반적인 공유 로직
  const shareData: KakaoShareDefault = {
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl,
      link: {
        webUrl: inviteLinkUrl,
        mobileWebUrl: inviteLinkUrl,
      },
    },
    buttons: [
      {
        title: '링크로 이동',
        link: {
          webUrl: inviteLinkUrl,
          mobileWebUrl: inviteLinkUrl,
        },
      },
    ],
  }

  // 모바일이고 카카오톡이 설치되어 있지 않은 경우
  if (isMobile() && !isKakaoInstalled()) {
    // 앱 스토어로 이동하는 로직
    const isAndroid = /android/i.test(navigator.userAgent)
    if (isAndroid) {
      window.location.href = 'market://details?id=com.kakao.talk'
    } else {
      window.location.href = 'itms-apps://itunes.apple.com/app/id362057947'
    }
    return
  }

  try {
    window.Kakao.Share.sendDefault(shareData)
  } catch (error) {
    console.error('카카오 공유 실패:', error)
    // 폴백: 기본 공유 API 사용
    if (navigator.share) {
      await navigator.share({
        title,
        text: description,
        url: inviteLinkUrl,
      })
    }
  }
}
