'use client'

import Icon from '@/shared/components/custom/icon'
import EmptyBombList from '../components/empty-bomb-list'
import { quizzes } from '../config'
import { useQuizNavigation } from './quiz-view/hooks/use-quiz-navigation'
import { useQuizState } from './quiz-view/hooks/use-quiz-state'
import BombQuiz from '../components/bomb-quiz'
import BombAnimation from '../components/bomb-animation'
import { useState } from 'react'
import Loading from '@/shared/components/custom/loading'
import BombWrongAnswerDialog from '../components/bomb-wrong-answer-dialog'
import { getAnswerText } from '../utils'
import { cn } from '@/shared/lib/utils'

const BombQuizView = () => {
  const bombQuizList = [...quizzes] // 임시
  // const bombQuizList = [] // 임시

  const [openExplanation, setOpenExplanation] = useState(false)
  const [processingResults, setProcessingResults] = useState(false)

  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { handleNext, quizResults, setQuizResults, leftQuizCount } = useQuizState({
    quizCount: bombQuizList.length,
    currentIndex: currentIndex,
  })

  const currentQuizInfo = bombQuizList[currentIndex]
  const currentAnswerState = quizResults[currentIndex]?.answer

  const onNext = () => {
    if (openExplanation) {
      setOpenExplanation(false)
    }

    const hasNextQuiz = handleNext(currentIndex, bombQuizList.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      setProcessingResults(true)
      // TODO: 퀴즈 종료 처리 로직 추가 (퀴즈 결과 서버에 전송)
      // onSuccess:
      // setProcessingResults(false)
      // query - 오답 터뜨리기 data 갱신
    }
  }

  if (processingResults) return <Loading center />

  if (!bombQuizList || bombQuizList.length === 0) {
    return (
      <div>
        <div className="fixed h-dvh w-screen max-w-mobile bg-gray-700"></div>

        <div className="fixed z-10 flex h-dvh w-screen max-w-mobile flex-col">
          <div className="h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
            <EmptyBombList />
          </div>

          <div className="flex-center size-full grow"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* dimmed background */}
      <div className="fixed h-dvh w-screen max-w-mobile bg-gray-700"></div>

      <div className="fixed z-10 flex h-dvh w-screen max-w-mobile flex-col">
        {/* 문제 영역 */}
        <div className="h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
          <BombQuiz
            quizzes={bombQuizList}
            currentIndex={currentIndex}
            quizResults={quizResults}
            setQuizResults={setQuizResults}
            leftQuizCount={leftQuizCount}
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
              setOpenExplanation={setOpenExplanation}
            />
          </div>
        </div>
      </div>

      <BombWrongAnswerDialog
        isOpen={openExplanation}
        setIsOpen={setOpenExplanation}
        answer={getAnswerText(currentQuizInfo.answer)}
        explanation={currentQuizInfo.explanation}
        directoryName={currentQuizInfo.directory?.name ?? ''}
        documentName={currentQuizInfo.document.name as string}
        onNext={onNext}
      />
    </div>
  )
}

export default BombQuizView
