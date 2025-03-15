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
import { setLocalStorage } from '@/shared/utils/storage'
import { LOCAL_KEY } from '@/constants'
import GoBackButton from '@/shared/components/custom/go-back-button'
import {
  BombTutorialFinalStep,
  BombTutorialFirstStep,
  BombTutorialNextStep,
} from '../../components/bomb-tutorial-steps'

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

  // 조건에 따라 timer로 선택지 요소 클릭
  useEffect(() => {
    let clickMultipleTimer: NodeJS.Timeout, clickMixupTimer: NodeJS.Timeout

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
        clickMultipleTimer = setTimeout(() => clickMultiple(), 500)
      } else if (currentIndex === 1) {
        clickMixupTimer = setTimeout(() => clickMixup(), 1000)
      }
    }

    return () => {
      clearTimeout(clickMultipleTimer)
      clearTimeout(clickMixupTimer)
    }
  }, [currentIndex, openFirst, openNext, openStart])

  // onAnswer
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

  // onNext
  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, bombQuizList.length)

    if (hasNextQuiz) {
      setOpenNext(true)
    } else {
      setOpenStart(true)
    }
  }

  // handleExit
  const handleExit = () => {
    router.replace('/main')
  }

  // handleClickFirstStep
  const handleClickFirstStep = () => {
    setOpenFirst(false)
  }

  // handleClickNextStep
  const handleClickNextStep = () => {
    setOpenNext(false)
    navigateToNext(currentIndex)
  }

  // handleClickFinalStep
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
        {/* 헤더 + 문제 영역 */}
        <div className="h-[75dvh] max-h-[610px] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
          <div className="flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between">
            {/* 헤더 */}
            <header className="h-[54px] w-full py-[16px]">
              <GoBackButton
                icon="cancel"
                onClick={() => {
                  handleExit()
                }}
              />
            </header>

            {/* 문제 */}
            <BombQuiz
              quizzes={bombQuizList}
              currentIndex={currentIndex}
              onAnswer={onAnswer}
              quizResults={quizResults}
              leftQuizCount={leftQuizCount}
            />
          </div>
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

      {openFirst && (
        <BombTutorialFirstStep
          leftQuizCount={leftQuizCount}
          onClickNext={handleClickFirstStep}
          quizData={{ bombQuizList, currentIndex, onAnswer, quizResults }}
        />
      )}

      {openNext && (
        <BombTutorialNextStep
          currentAnswerState={currentAnswerState}
          onClickNext={handleClickNextStep}
          quizData={{ bombQuizList, currentIndex, onAnswer, quizResults, leftQuizCount }}
        />
      )}

      {openStart && (
        <BombTutorialFinalStep
          currentAnswerState={currentAnswerState}
          onClickNext={handleClickFinalStep}
          quizData={{ bombQuizList, currentIndex, onAnswer, quizResults, leftQuizCount }}
        />
      )}
    </div>
  )
}

export default BombTutorial
