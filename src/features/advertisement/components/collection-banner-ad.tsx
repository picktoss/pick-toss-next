import { useEffect } from 'react'
import { AD_ID } from '../config'

const CollectionBannerAd = ({ adId }: { adId?: string }) => {
  const id = adId ?? AD_ID.COLLECTION1

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (document.getElementById(`adfit-script-collection-${id}`)) {
        return
      }

      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', id)
      ins.setAttribute('data-ad-width', '320')
      ins.setAttribute('data-ad-height', '50')

      const script = document.createElement('script')
      script.id = `adfit-script-collection-${id}` // 중복 로드 방지용 id
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
      script.async = true

      const adContainer = document.getElementById(`adfit-banner-collection-${id}`)
      if (adContainer) {
        adContainer.innerHTML = '' // 기존 광고 제거 (중복 방지)
        adContainer.appendChild(ins)
        adContainer.appendChild(script)
      }
    }
  }, [])

  return (
    <div
      id={`adfit-banner-collection-${id}`}
      className="flex-center h-[48px] w-[319px] overflow-hidden rounded-[12px]"
    ></div>
  )
}

export default CollectionBannerAd
