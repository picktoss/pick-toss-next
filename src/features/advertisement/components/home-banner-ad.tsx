import { useEffect } from 'react'
import { AD_ID } from '../config'

const HomeBannerAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', AD_ID.HOME_BANNER)
      ins.setAttribute('data-ad-width', '320')
      ins.setAttribute('data-ad-height', '100')

      const script = document.createElement('script')
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
      script.async = true

      const adContainer = document.getElementById('adfit-banner-home')
      if (adContainer) {
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
