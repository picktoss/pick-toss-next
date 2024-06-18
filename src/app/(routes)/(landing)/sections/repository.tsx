'use client'

import { useEffect } from 'react'
import { Section } from '../components/section'
import { AIPickIcon, AIPickTextIcon, Quiz1Icon, RingIcon } from '../svgs'
import useMeasure from 'react-use-measure'
import { motion, animate, useMotionValue } from 'framer-motion'

export function Repository() {
  const items = [Quiz1Icon, Quiz1Icon, Quiz1Icon, Quiz1Icon]

  const [ref, { width }] = useMeasure()

  const xTranslation = useMotionValue(0)

  useEffect(() => {
    const finalPosition = -width / 2

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      duration: 20,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    })

    return controls.stop
  }, [xTranslation, width])

  return (
    <Section
      title="노트 창고"
      description={
        <>
          평소 수업 필기부터 시험 준비까지,
          <br />
          내가 배우고 있는 것들을
          <br />
          노트로 만들어보세요
        </>
      }
      className="mt-[60px] overflow-hidden"
    >
      <div className="px-[20px]">
        <div className="relative mx-auto mt-[60px] size-[159px]">
          <div className="center absolute">
            <div className="flex size-[90px] flex-col items-center justify-center gap-[2.1px] rounded-[20px] shadow-lg">
              <div className="ml-[9px]">
                <AIPickIcon />
              </div>
              <AIPickTextIcon />
            </div>
          </div>
          <div className="absolute left-0 top-0">
            <RingIcon />
          </div>
        </div>
        <div className="mt-[22px] text-center text-text-bold text-orange-06">
          AI가 퀴즈로 만들 내용을 선정하고,
          <br />
          요점을 돌아볼 수 있는 질문 리스트를 생성해요
        </div>
      </div>
      <motion.div
        ref={ref}
        style={{ x: xTranslation }}
        className="mt-[40px] inline-flex h-[536px] w-full *:shrink-0"
      >
        {[...items, ...items].map((Item, index) => (
          <Item key={index} />
        ))}
      </motion.div>
    </Section>
  )
}
