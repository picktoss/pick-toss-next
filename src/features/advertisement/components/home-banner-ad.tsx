import { useEffect } from 'react'
import { AD_ID } from '../config'

const HomeBannerAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (document.getElementById('adfit-script-home')) {
        return
      }

      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', AD_ID.HOME_BANNER)
      ins.setAttribute('data-ad-width', '320')
      ins.setAttribute('data-ad-height', '100')

      const script = document.createElement('script')
      script.id = 'adfit-script-home' // 중복 로드 방지용 id
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
      script.async = true

      const adContainer = document.getElementById('adfit-banner-home')
      if (adContainer) {
        adContainer.innerHTML = '' // 기존 광고 제거 (중복 방지)
        adContainer.appendChild(ins)
        adContainer.appendChild(script)
      }
    }
  }, [])

  return (
    <div
      id="adfit-banner-home"
      className="flex-center h-[100px] w-[320px] overflow-hidden rounded-[20px]"
    ></div>
  )
}

export default HomeBannerAd
