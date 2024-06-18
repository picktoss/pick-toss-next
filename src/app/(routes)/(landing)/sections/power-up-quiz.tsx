'use client'

import { ReactNode, useState } from 'react'
import { Section } from '../components/section'
import { BlankQuizIcon, MultipleQuizIcon, OXQuizIcon, PhoneEdgeIcon } from '../svgs'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import oxGifSource from '../assets/select.gif'
import selectGifSource from '../assets/ox.gif'

export function PowerUpQuiz() {
  const [quiz, setQuiz] = useState<'multiple' | 'ox'>('multiple')

  return (
    <Section
      title="파워업 퀴즈"
      description={
        <>
          나의 노트에서 만들어진
          <br />
          다양한 유형의 퀴즈를 풀 수 있어요
        </>
      }
      className="mt-[94px]"
    >
      <div className="relative mt-[82px] flex h-[689px] items-end bg-blue-01 pb-[42px]">
        <div className="absolute right-1/2 top-[-45px] translate-x-1/2">
          <div className="relative h-[464.4px] w-[259.2px]">
            {quiz === 'multiple' ? (
              <div className="overflow-hidden">
                <Image src={oxGifSource} width={245.8} alt="" />
              </div>
            ) : (
              <Image src={selectGifSource} width={245.8} alt="" />
            )}
            <div className="absolute top-0">
              <PhoneEdgeIcon />
            </div>
            <div className="absolute bottom-1/2 right-1/2 mr-[6.5px] h-[445px] w-[218px] translate-x-1/2 translate-y-1/2 rounded-[36px] ring-[33px] ring-blue-01" />
          </div>
        </div>

        <div className="w-full">
          <p className="px-[20px] text-text-medium text-blue-06">* 클릭하여 퀴즈를 확인해보세요</p>

          <div className="mt-[8px] flex gap-[8px] overflow-auto pl-[20px] scrollbar-hide *:shrink-0">
            <QuizAnimationTriggerButton
              isSelected={quiz === 'multiple'}
              description={
                <>
                  4가지 선택지 중<br />
                  정답을 고르는
                </>
              }
              title="객관식"
              icon={
                <div className="absolute bottom-[25px] right-[12px]">
                  <MultipleQuizIcon />
                </div>
              }
              onClick={() => setQuiz('multiple')}
            />
            <QuizAnimationTriggerButton
              isSelected={quiz === 'ox'}
              description={
                <>
                  참인지 거짓인지
                  <br />
                  판단하는
                </>
              }
              title="O/X"
              icon={
                <div className="absolute bottom-[31.6px] right-[17.8px]">
                  <OXQuizIcon />
                </div>
              }
              onClick={() => setQuiz('ox')}
            />
            <QuizAnimationTriggerButton
              isSelected={false}
              description={
                <>
                  주어진 문장의
                  <br />빈 곳을 채우는
                </>
              }
              title="빈칸 채우기"
              icon={
                <div className="absolute bottom-[18.3px] right-[17.8px]">
                  <BlankQuizIcon />
                </div>
              }
              comingSoon
              className="mr-[20px]"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

interface QuizAnimationTriggerButtonProps {
  isSelected: boolean
  description: ReactNode
  title: string
  icon: ReactNode
  onClick?: () => void
  comingSoon?: boolean
  className?: HTMLElement['className']
}

function QuizAnimationTriggerButton({
  isSelected,
  title,
  description,
  icon,
  onClick,
  comingSoon,
  className,
}: QuizAnimationTriggerButtonProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        'relative h-[160px] w-[140px] rounded-[24px] border-2 border-gray-02 p-[20px] bg-white',
        isSelected && 'border-blue-03',
        className
      )}
    >
      <div className="text-small1-regular">{description}</div>
      <div className="mt-[4px] text-body1-bold text-gray-09">{title}</div>
      {comingSoon && (
        <div className="mt-[4px] w-fit rounded-[3px] bg-gray-02 pb-[2px] pl-[7px] pr-[6px] pt-px text-tag-eng text-gray-08">
          Coming soon
        </div>
      )}
      {icon}
    </div>
  )
}
