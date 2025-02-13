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
