import { useEffect } from 'react'
import { AD_ID } from '../config'

const QuizSetFullAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (document.getElementById('adfit-script-quiz')) {
        return
      }

      const ins = document.createElement('ins')
      ins.className = 'kakao_ad_area'
      ins.style.display = 'none'
      ins.setAttribute('data-ad-unit', AD_ID.QUIZ_SET)
      ins.setAttribute('data-ad-width', '300')
      ins.setAttribute('data-ad-height', '250')

      const script = document.createElement('script')
      script.id = 'adfit-script-quiz' // 중복 로드 방지용 id
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
      script.async = true

      const adContainer = document.getElementById('adfit-full-quiz')
      if (adContainer) {
        adContainer.innerHTML = '' // 기존 광고 제거 (중복 방지)
        adContainer.appendChild(ins)
        adContainer.appendChild(script)
      }
    }
  }, [])

  return <div id="adfit-full-quiz" className="flex-center h-[250px] w-[300px]"></div>
}

export default QuizSetFullAd
