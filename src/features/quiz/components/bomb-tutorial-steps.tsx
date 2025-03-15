'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { QuizItem } from '@/types/quiz'
import { isMobile } from 'react-device-detect'
import BombQuiz from './bomb-quiz'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import Icon from '@/shared/components/custom/icon'
import { cn } from '@/shared/lib/utils'
import BombDefaultState from './bomb-default-state'

type QuizDataForTutorial = {
  bombQuizList: QuizItem[]
  currentIndex: number
  onAnswer: ({
    id,
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => void
  quizResults: ({
    id: number
    answer: NonNullable<boolean | undefined>
    choseAnswer: string
    elapsedTime: number
  } | null)[]
  leftQuizCount?: number
}

interface FirstTutorialProps {
  leftQuizCount: number
  onClickNext: () => void
  quizData: QuizDataForTutorial
}

interface TutorialProps {
  currentAnswerState: boolean | undefined
  onClickNext: () => void
  quizData: QuizDataForTutorial
}

// 튜토리얼 진행 화면 - 1
export const BombTutorialFirstStep = ({
  leftQuizCount,
  onClickNext,
  quizData,
}: FirstTutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      {/* 튜토리얼 안내와 퀴즈 위치를 일치시키기 위해 퀴즈 요소를 opacity-0으로 넣음 */}
      <div className="relative z-40 flex h-[75dvh] max-h-[610px] min-h-fit w-full flex-col items-center justify-end px-[16px]">
        <div className="pointer-events-none flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between opacity-0">
          {/* 헤더 */}
          <header className="h-[54px] w-full py-[16px]">
            <GoBackButton icon="cancel" />
          </header>

          {/* 문제 */}
          <BombQuiz
            quizzes={quizData.bombQuizList}
            currentIndex={quizData.currentIndex}
            onAnswer={quizData.onAnswer}
            quizResults={quizData.quizResults}
            leftQuizCount={leftQuizCount}
          />
        </div>

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

      <div className="flex-center relative z-40 size-full grow">
        <button type="button" onClick={onClickNext} className="mb-[10px]">
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
  quizData,
}: TutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      {/* 튜토리얼 안내와 퀴즈 위치를 일치시키기 위해 퀴즈 요소를 opacity-0으로 넣음 */}
      <div className="h-[75dvh] max-h-[610px] min-h-fit w-full px-[16px]">
        <div className="pointer-events-none flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between opacity-0">
          {/* 헤더 */}
          <header className="h-[54px] w-full py-[16px]">
            <GoBackButton icon="cancel" />
          </header>

          {/* 문제 */}
          <BombQuiz
            quizzes={quizData.bombQuizList}
            currentIndex={quizData.currentIndex}
            onAnswer={quizData.onAnswer}
            quizResults={quizData.quizResults}
            leftQuizCount={quizData.leftQuizCount ?? 0}
          />
        </div>
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
  quizData,
}: TutorialProps) => {
  useDynamicThemeColor(isMobile, '#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      {/* 튜토리얼 안내와 퀴즈 위치를 일치시키기 위해 퀴즈 요소를 opacity-0으로 넣음 */}
      <div className="h-[75dvh] max-h-[610px] min-h-fit w-full px-[16px]">
        <div className="pointer-events-none flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between opacity-0">
          {/* 헤더 */}
          <header className="h-[54px] w-full py-[16px]">
            <GoBackButton icon="cancel" />
          </header>

          {/* 문제 */}
          <BombQuiz
            quizzes={quizData.bombQuizList}
            currentIndex={quizData.currentIndex}
            onAnswer={quizData.onAnswer}
            quizResults={quizData.quizResults}
            leftQuizCount={quizData.leftQuizCount ?? 0}
          />
        </div>
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
