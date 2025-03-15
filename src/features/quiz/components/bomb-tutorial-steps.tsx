'use client'

import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { isMobile } from 'react-device-detect'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Icon from '@/shared/components/custom/icon'
import { cn } from '@/shared/lib/utils'
import BombDefaultState from './bomb-default-state'

interface FirstTutorialProps {
  leftQuizCount: number
  onClickNext: () => void
  quizAreaHeight: number
}

interface TutorialProps {
  currentAnswerState: boolean | undefined
  onClickNext: () => void
  quizAreaHeight: number
}

// 튜토리얼 진행 화면 - 1
export const BombTutorialFirstStep = ({
  leftQuizCount,
  onClickNext,
  quizAreaHeight,
}: FirstTutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="relative z-40 flex h-[75dvh] max-h-[610px] min-h-fit w-full flex-col items-center justify-end px-[16px]">
        <div style={{ height: quizAreaHeight }} className="w-full" />

        <Text typography="text1-medium" color="primary-inverse" className="absolute bottom-[65px]">
          남은 오답 수가 표시돼요
        </Text>

        <div className="absolute bottom-0 mb-[11px] w-fit">
          <Text typography="subtitle1-bold" color="primary-inverse" className="center">
            {leftQuizCount}
          </Text>
          <Image src={'/images/count-device.png'} alt="" width={79} height={38} />
        </div>
      </div>

      <div className="relative z-40 flex size-full grow justify-center">
        <button type="button" onClick={onClickNext} className="mb-[10px] mt-[25px] size-fit">
          <Text typography="button1" color="accent">
            다음
          </Text>
        </button>
      </div>
    </div>
  )
}

// 튜토리얼 진행 화면 - 2
export const BombTutorialNextStep = ({
  currentAnswerState,
  onClickNext,
  quizAreaHeight,
}: TutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="h-[75dvh] max-h-[610px] min-h-fit w-full px-[16px]">
        <div style={{ height: quizAreaHeight }} className="w-full" />
      </div>

      <div className="flex-center relative z-40 size-full grow">
        <Text
          typography="text1-medium"
          color="primary-inverse"
          className="absolute bottom-[22dvh] right-1/2 z-50 w-full translate-x-1/2 text-center"
        >
          문제를 맞추면, 오답을 터뜨릴 수 있어요
        </Text>

        <button type="button" onClick={onClickNext} className="absolute z-50 mb-[10px]">
          <Text typography="button1" color="accent">
            다음
          </Text>
        </button>

        <div className="flex-center absolute z-40 mb-[10px] w-full">
          <Icon
            name="focus-box"
            className={cn(
              'center z-40 size-[100px] transition-transform',
              currentAnswerState === false && 'scale-[0.82]'
            )}
            fill={currentAnswerState === false ? '#f4502c' : '#EFC364'}
          />

          <BombDefaultState leftQuizCount={1} isTutorial />
        </div>
      </div>
    </div>
  )
}

// 튜토리얼 진행 화면 - 3
export const BombTutorialFinalStep = ({
  currentAnswerState,
  onClickNext,
  quizAreaHeight,
}: TutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="h-[75dvh] max-h-[610px] min-h-fit w-full px-[16px]">
        <div style={{ height: quizAreaHeight }} className="w-full" />
      </div>

      <div className="flex-center relative z-40 h-[30dvh] w-full grow">
        <Text
          typography="text1-medium"
          color="primary-inverse"
          className="absolute bottom-[22dvh] right-1/2 z-50 w-full translate-x-1/2 text-center"
        >
          틀렸다면, 다음 기회를 노려보세요!
        </Text>

        <button type="button" onClick={onClickNext} className="z-50 mb-[10px]">
          <Text typography="button1" color="accent">
            시작!
          </Text>
        </button>

        <div className="flex-center absolute z-40 mb-[10px] w-full">
          <Icon
            name="focus-box"
            className={cn(
              'center z-40 size-[100px] transition-transform',
              currentAnswerState === false && 'scale-[0.82]'
            )}
            fill={currentAnswerState === false ? '#f4502c' : '#EFC364'}
          />

          <BombDefaultState leftQuizCount={0} isTutorial />
        </div>
      </div>
    </div>
  )
}
