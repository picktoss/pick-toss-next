'use client'

import { useEffect } from 'react'
import { Section } from '../components/section'
import {
  AIPickIcon,
  AIPickTextIcon,
  Quiz1DesktopIcon,
  Quiz1Icon,
  Quiz2DesktopIcon,
  Quiz2Icon,
  RingIcon,
} from '../svgs'
import { motion, animate, useMotionValue } from 'framer-motion'

export function Repository() {
  const items = [Quiz1Icon, Quiz2Icon]

  const xTranslation = useMotionValue(0)

  useEffect(() => {
    const startPosition = 0
    const finalPosition = -712

    const controls = animate(xTranslation, [startPosition, finalPosition], {
      ease: 'linear',
      duration: 5,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    })

    return controls.stop
  }, [xTranslation])

  return (
    <>
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
        className="mt-[60px] overflow-hidden xl:hidden"
      >
        <div className="px-[20px]">
          <div className="relative mx-auto mt-[60px] size-[159px]">
            <div className="center absolute">
              <div className="flex size-[90px] flex-col items-center justify-center gap-[2.1px] rounded-[20px] shadow-lg">
                <div className="ml-[9px]">
                  <AIPickIcon svgKey="mobile-ai-pick" />
                </div>
                <AIPickTextIcon svgKey="mobile-api-pick-text" />
              </div>
            </div>
            <div className="absolute left-0 top-0">
              <RingIcon svgKey="mobile-ring" />
            </div>
          </div>
          <div className="mt-[22px] text-center text-text-bold text-orange-06">
            AI가 퀴즈로 만들 내용을 선정하고,
            <br />
            요점을 돌아볼 수 있는 질문 리스트를 생성해요
          </div>
        </div>
        <motion.div
          style={{ x: xTranslation }}
          className="mt-[40px] inline-flex h-[536px] w-full *:shrink-0"
        >
          {[...items, ...items].map((Item, index) => (
            <Item key={index} />
          ))}
        </motion.div>
      </Section>

      <section className="mx-auto mt-[199px] hidden max-w-[1032px] xl:block">
        <div className="flex justify-between">
          <div>
            <div className="text-h3-bold text-orange-06">노트창고</div>
            <div className="mt-[16px] text-h1 text-gray-09">
              평소 수업 필기부터 시험 준비까지,
              <br />
              내가 배우고 있는 것들을 노트로 만들어보세요
            </div>
          </div>

          <div className="pr-[10px]">
            <div className="relative mx-auto size-[310px]">
              <div className="center absolute">
                <div className="flex size-[180px] flex-col items-center justify-center gap-[4.3px] rounded-[40px] shadow-lg">
                  <div className="ml-[13px]">
                    <AIPickIcon svgKey="desktop-ai-pick" className="h-[68.6px] w-[66px]" />
                  </div>
                  <AIPickTextIcon svgKey="desktop-api-pick-text" className="h-[36px] w-[87px]" />
                </div>
              </div>
              <div className="absolute left-0 top-0">
                <RingIcon svgKey="desktop-ring" className="size-[310px]" />
              </div>
            </div>
            <div className="mt-[33px] text-center text-text2-bold text-orange-06">
              AI가 퀴즈로 만들 내용을 선정하고,
              <br />
              요점을 돌아볼 수 있는 질문 리스트를 생성해요
            </div>
          </div>
        </div>

        <div className="ml-[3px] mt-[-83px] flex *:shrink-0">
          <Quiz1DesktopIcon />
          <div className="ml-[-70px] pt-[143px]">
            <Quiz2DesktopIcon />
          </div>
        </div>
      </section>
    </>
  )
}
