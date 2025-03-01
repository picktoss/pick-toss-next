import { useEffect } from 'react'
import { AD_ID } from '../config'

const CollectionBannerAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', AD_ID.COLLECTION)
      ins.setAttribute('data-ad-width', '320')
      ins.setAttribute('data-ad-height', '50')

      const script = document.createElement('script')
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
      script.async = true

      const adContainer = document.getElementById('adfit-banner-collection')
      if (adContainer) {
        adContainer.appendChild(ins)
        adContainer.appendChild(script)
      }
    }
  }, [])

  return (
    <div
      id="adfit-banner-collection"
      className="flex-center h-[50px] w-[320px] overflow-hidden rounded-[20px]"
    ></div>
  )
}

export default CollectionBannerAd
