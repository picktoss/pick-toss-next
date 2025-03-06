'use client'

import { useEffect, useState } from 'react'
import { quizzes } from '../../config'
import { useQuizNavigation } from '../quiz-view/hooks/use-quiz-navigation'
import { useQuizState } from '../quiz-view/hooks/use-quiz-state'
import { useRouter } from 'next/navigation'
import BombQuiz from '../../components/bomb-quiz'
import Icon from '@/shared/components/custom/icon'
import BombAnimation from '../../components/bomb-animation'
import { cn } from '@/shared/lib/utils'
import Text from '@/shared/components/ui/text'
import Image from 'next/image'
import BombDefaultState from '../../components/bomb-default-state'
import { setLocalStorage } from '@/shared/utils/storage'
import { LOCAL_KEY } from '@/constants'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'

const BombTutorial = () => {
  const router = useRouter()

  const [openFirst, setOpenFirst] = useState(true)
  const [openNext, setOpenNext] = useState(false)
  const [openStart, setOpenStart] = useState(false)

  const bombQuizList = quizzes
  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { handleNext, quizResults, setQuizResults, leftQuizCount } = useQuizState({
    quizCount: bombQuizList.length,
    currentIndex: currentIndex,
  })

  const currentAnswerState = quizResults[currentIndex]?.answer

  useEffect(() => {
    const clickMultiple = () => {
      const targetElement = Array.from(document.querySelectorAll('*')).find(
        (element) => element.innerHTML === '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다'
      ) as HTMLElement

      if (targetElement) {
        targetElement.click()
      }
    }
    const clickMixup = () => {
      const correctButton = document.getElementById('correctBtn')
      if (correctButton) {
        correctButton.click()
      }
    }

    if (!openFirst && !openNext && !openStart) {
      if (currentIndex === 0) {
        const clickMultipleTimer = setTimeout(() => clickMultiple(), 500)

        return () => clearTimeout(clickMultipleTimer)
      } else if (currentIndex === 1) {
        const clickMixupTimer = setTimeout(() => clickMixup(), 1000)

        return () => clearTimeout(clickMixupTimer)
      }
    }
  }, [currentIndex, openFirst, openNext, openStart])

  const onAnswer = ({
    id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isRight,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      if (currentIndex === 0) {
        const newResults = [...prev]
        newResults[currentIndex] = {
          id,
          answer: true,
          choseAnswer: '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다',
          elapsedTime: 1,
        }
        return newResults
      } else {
        const newResults = [...prev]
        newResults[currentIndex] = {
          id,
          answer: false,
          choseAnswer: 'correct',
          elapsedTime: 1,
        }
        return newResults
      }
    })
  }

  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, bombQuizList.length)

    if (hasNextQuiz) {
      setOpenNext(true)
    } else {
      setOpenStart(true)
    }
  }

  const handleExit = () => {
    router.replace('/main')
  }

  const handleClickFirstStep = () => {
    setOpenFirst(false)
  }

  const handleClickNextStep = () => {
    setOpenNext(false)
    navigateToNext(currentIndex)
  }

  const handleClickFinalStep = () => {
    setLocalStorage(LOCAL_KEY.BOMB_TUTORIAL_COMPLETE, true)
    router.replace('/quiz/bomb')
  }

  return (
    <div>
      <div className="fixed z-40 h-dvh w-screen max-w-mobile"></div>

      {/* dimmed background */}
      <div className="fixed h-dvh w-screen max-w-mobile bg-gray-700"></div>

      <div className="fixed z-10 flex h-dvh w-screen max-w-mobile flex-col">
        {/* 문제 영역 */}
        <div className="h-[75dvh] max-h-[610px] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
          <BombQuiz
            quizzes={bombQuizList}
            currentIndex={currentIndex}
            onAnswer={onAnswer}
            quizResults={quizResults}
            leftQuizCount={leftQuizCount}
            handleExit={handleExit}
          />
        </div>

        {/* bomb 영역 */}
        <div className="flex-center size-full grow">
          <div className="flex-center relative mb-[10px] size-full">
            <Icon
              name="focus-box"
              className={cn(
                'center z-40 size-[100px] transition-transform',
                currentAnswerState === false && 'scale-[0.82]'
              )}
              fill={currentAnswerState === false ? '#f4502c' : '#EFC364'}
            />

            <BombAnimation
              leftQuizCount={leftQuizCount}
              currentIndex={currentIndex}
              quizResults={quizResults}
              onNext={onNext}
            />
          </div>
        </div>
      </div>

      {openFirst && <FirstStep leftQuizCount={leftQuizCount} onClickNext={handleClickFirstStep} />}

      {openNext && (
        <NextStep currentAnswerState={currentAnswerState} onClickNext={handleClickNextStep} />
      )}

      {openStart && (
        <FinalStep currentAnswerState={currentAnswerState} onClickNext={handleClickFinalStep} />
      )}
    </div>
  )
}

export default BombTutorial

// 튜토리얼 진행 화면 - 1
const FirstStep = ({
  leftQuizCount,
  onClickNext,
}: {
  leftQuizCount: number
  onClickNext: () => void
}) => {
  useDynamicThemeColor('#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="relative z-40 flex h-[75dvh] max-h-[610px] min-h-[556px] w-full flex-col items-center justify-end">
        <Text typography="text1-medium" color="primary-inverse" className="absolute bottom-[65px]">
          남은 오답 수가 표시돼요
        </Text>

        <div className="relative mb-[11px] w-fit">
          <Text typography="subtitle1-bold" color="primary-inverse" className="center">
            {leftQuizCount}
          </Text>
          <Image src={'/images/count-device.png'} alt="" width={79} height={38} />
        </div>
      </div>

      <div className="flex-center relative z-40 max-h-[30dvh] w-full grow">
        <button
          type="button"
          onClick={onClickNext}
          className="absolute right-1/2 top-[30px] translate-x-1/2"
        >
          <Text typography="button1" color="accent">
            다음
          </Text>
        </button>
      </div>
    </div>
  )
}

// 튜토리얼 진행 화면 - 2
const NextStep = ({
  currentAnswerState,
  onClickNext,
}: {
  currentAnswerState: boolean | undefined
  onClickNext: () => void
}) => {
  useDynamicThemeColor('#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="h-[75dvh] max-h-[610px] min-h-[550px] w-full"></div>

      <div className="flex-center relative z-40 max-h-[30dvh] w-full grow">
        <Text
          typography="text1-medium"
          color="primary-inverse"
          className="absolute bottom-[22dvh] right-1/2 z-50 w-full translate-x-1/2 text-center"
        >
          문제를 맞추면, 오답을 터뜨릴 수 있어요
        </Text>

        <button type="button" onClick={onClickNext} className="z-50">
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
const FinalStep = ({
  currentAnswerState,
  onClickNext,
}: {
  currentAnswerState: boolean | undefined
  onClickNext: () => void
}) => {
  useDynamicThemeColor('#313132', '#ffffff')

  return (
    <div className="fixed z-40 flex h-dvh w-screen max-w-mobile flex-col">
      <div className="absolute size-full bg-black opacity-80"></div>

      <div className="h-[75dvh] max-h-[610px] w-full"></div>

      <div className="flex-center relative z-40 h-[30dvh] w-full grow">
        <Text
          typography="text1-medium"
          color="primary-inverse"
          className="absolute bottom-[22dvh] right-1/2 z-50 w-full translate-x-1/2 text-center"
        >
          틀렸다면, 다음 기회를 노려보세요!
        </Text>

        <button type="button" onClick={onClickNext} className="z-50">
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
