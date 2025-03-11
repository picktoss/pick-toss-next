'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import QuizSetFullAd from '../components/quiz-set-full-ad'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface Props {
  onClose: () => void
}

const QuizSetFullAdView = ({ onClose }: Props) => {
  useDynamicThemeColor(isMobile, '#FFFFFF', '#FFFFFF')

  const [count, setCount] = useState(3)

  useEffect(() => {
    const adContainer = document.getElementById('adfit-full-quiz')
    if (!adContainer) return // adContainer가 없으면 실행 안 함

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval)
          onClose() // 3초 후 자동 닫힘
          return 0
        }
        return prev - 1
      })
    }, 1000) // 1초마다 감소

    return () => clearInterval(interval)
  }, [onClose])

  return (
    <main className="flex-center fixed right-1/2 top-0 h-dvh w-full max-w-mobile translate-x-1/2 flex-col overflow-y-auto overflow-x-hidden bg-background-base-01 scrollbar-hide">
      <QuizSetFullAd />

      <Text typography="subtitle2-medium" color="sub" className="mt-[20px]">
        {count}초 후에 자동으로 닫혀요
      </Text>

      <button onClick={onClose} type="button" className="mt-[32px] flex items-center gap-[8px]">
        <Icon name="cancel" className="size-[20px] text-icon-secondary" />
        <Text typography="button1" color="secondary">
          닫기
        </Text>
      </button>
    </main>
  )
}

export default QuizSetFullAdView
