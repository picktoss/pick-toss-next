'use client'

import { animate, useMotionValue, motion, MotionValue } from 'framer-motion'
import { useCallback, useEffect } from 'react'

const GAP_SIZE = 24

export function VariousCategories() {
  const xTranslation1 = useMotionValue(0)
  const xTranslation2 = useMotionValue(0)
  const xTranslation3 = useMotionValue(0)

  const createAnimation = useCallback(
    ({
      xTranslation,
      startPosition,
      finalPosition,
      adjustSpeedValue,
    }: {
      xTranslation: MotionValue<number>
      startPosition: number
      finalPosition: number
      adjustSpeedValue?: number
    }) => {
      return animate(xTranslation, [startPosition, finalPosition], {
        ease: 'linear',
        duration: 15 + (adjustSpeedValue || 0),
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      })
    },
    []
  )

  useEffect(() => {
    const controls1 = createAnimation({
      xTranslation: xTranslation1,
      startPosition: -1079 - GAP_SIZE,
      finalPosition: GAP_SIZE,
    })
    const controls2 = createAnimation({
      xTranslation: xTranslation2,
      startPosition: GAP_SIZE,
      finalPosition: -1280 - GAP_SIZE,
      adjustSpeedValue: 3,
    })
    const controls3 = createAnimation({
      xTranslation: xTranslation3,
      startPosition: -1094 - GAP_SIZE,
      finalPosition: GAP_SIZE,
      adjustSpeedValue: -2,
    })

    return () => {
      controls1?.stop()
      controls2?.stop()
      controls3?.stop()
    }
  }, [xTranslation1, xTranslation2, xTranslation3, createAnimation])

  return (
    <div className="mt-[178px] text-center xl:mt-[228px]">
      <h2 className="text-h3-bold text-gray-09 xl:text-h1">다양한 분야를 픽토스의 퀴즈로</h2>
      <p className="mt-[16px] text-text-medium text-gray-08 xl:text-h4-medium">
        전공 요점정리, 취미생활, 자격증 공부, 상식 메모까지.
        <span className="hidden xl:inline-block"> </span>
        <br className="xl:hidden" />
        노트만 있다면, 무엇이든 픽토스의 퀴즈로 복습할 수 있어요
      </p>

      <div className="relative mx-auto mt-[58px] flex flex-col items-center gap-[32px] overflow-hidden xl:max-w-[1032px]">
        <motion.div style={{ x: xTranslation1 }} className="flex w-full gap-[24px] *:shrink-0">
          {[...items[0], ...items[0], ...items[0]].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-[32px] border border-gray-02 px-[32px] py-[16px] text-h4-bold text-gray-09"
            >
              {item.icon} {item.name}
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: xTranslation2 }} className="flex w-full gap-[24px] *:shrink-0">
          {[...items[1], ...items[1], ...items[1]].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-[32px] border border-gray-02 px-[32px] py-[16px] text-h4-bold text-gray-09"
            >
              {item.icon} {item.name}
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: xTranslation3 }} className="flex w-full gap-[24px] *:shrink-0">
          {[...items[2], ...items[2], ...items[2]].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-[32px] border border-gray-02 px-[32px] py-[16px] text-h4-bold text-gray-09"
            >
              {item.icon} {item.name}
            </div>
          ))}
        </motion.div>

        <div className="absolute left-0 h-full w-[50px] bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 h-full w-[50px] bg-gradient-to-r from-transparent to-white" />
      </div>
    </div>
  )
}

const items = [
  [
    {
      name: '한국사 시험',
      icon: '📚',
    },
    {
      name: '파이썬 문법',
      icon: '🖥️',
    },
    {
      name: '철학 교양공부',
      icon: '📜',
    },
    {
      name: '민법 사례정리',
      icon: '📖',
    },
    {
      name: '영양사 면허시험',
      icon: '🍴',
    },
  ],
  [
    {
      name: '경제학 이론',
      icon: '✏️',
    },
    {
      name: '소믈리에 자격증',
      icon: '🍷',
    },
    {
      name: '유전공학 필기',
      icon: '🧬',
    },
    {
      name: '게임 기믹 암시',
      icon: '⚔️',
    },
    {
      name: '산업안전기사',
      icon: '🔧',
    },
    {
      name: '작곡 기초',
      icon: '🎼',
    },
  ],
  [
    {
      name: '데이터처리 전문가',
      icon: '💾',
    },
    {
      name: '성경 복기',
      icon: '🖊️',
    },
    {
      name: '인체 면역학',
      icon: '🩺',
    },
    {
      name: '지구과학 요점정리',
      icon: '🌏',
    },
    {
      name: '재테크 상식',
      icon: '💰',
    },
  ],
]
