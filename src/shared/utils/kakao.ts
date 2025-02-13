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

// iOS Safari에서 실행 중인지 확인
// const isIOSSafari = (): boolean => {
//   const ua = navigator.userAgent.toLowerCase()
//   return (
//     /iphone|ipad|ipod/.test(ua) &&
//     /safari/.test(ua) &&
//     !/(chrome|crios|fxios|line|edge|fb|instagram)/.test(ua)
//   )
// }

// PWA에서 실행 중인지 확인
// const isPWA = (): boolean => {
//   return window.matchMedia('(display-mode: standalone)').matches
// }

export const shareToKakao = async (options: ShareOptions) => {
  const { title, description, inviteLinkUrl } = options
  // const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const templateId = process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID

  if (!window.Kakao?.isInitialized()) {
    throw new Error('Kakao SDK가 초기화되지 않았습니다.')
  }

  // iOS PWA 환경에서의 처리
  // if (isPWA() && isIOSSafari()) {
  //   const kakaoLink = encodeURIComponent(
  //     JSON.stringify({
  //       template_id: templateId, // 카카오 템플릿 ID
  //       template_args: {
  //         web_url: inviteLinkUrl,
  //         mobile_web_url: inviteLinkUrl,
  //       },
  //     })
  //   )

  //   const linkUrl = `kakaolink://send?app_key=${appKey}&template_id=${templateId}&template_args=${kakaoLink}`

  //   setTimeout(() => {
  //     window.location.href = linkUrl
  //   }, 100)
  //   return
  // }

  try {
    // 카카오 메시지 템플릿 사용
    window.Kakao.Share.sendCustom({
      templateId: Number(templateId),
      templateArgs: {
        web_url: inviteLinkUrl,
        mobile_web_url: inviteLinkUrl,
      },
    })
  } catch (error) {
    console.error('카카오 공유 실패:', error)
    // 폴백: 기본 공유 API 사용
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: description,
        url: inviteLinkUrl,
      })
    }
  }
}
