import { useEffect, useRef } from 'react'
import { AD_ID } from '../config'
import Script from 'next/script'

interface Props {
  adId?: string
}

const CollectionBannerAd = ({ adId }: Props) => {
  const adContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', adId ?? AD_ID.COLLECTION1)
      ins.setAttribute('data-ad-width', '320')
      ins.setAttribute('data-ad-height', '50')

      adContainerRef.current.innerHTML = ''
      adContainerRef.current.appendChild(ins)
    }
  }, [adId])

  return (
    <>
      <div
        ref={adContainerRef}
        className="flex-center h-[48px] w-[319px] overflow-hidden rounded-[12px]"
      ></div>
      <Script
        id="adfit-script-collection"
        src="https://t1.daumcdn.net/kas/static/ba.min.js"
        async
      />
    </>
  )
}

export default CollectionBannerAd
