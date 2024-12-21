'use client'

import Icon from '@/shared/components/custom/icon'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import Loading from '@/shared/components/custom/loading'
import { useBombQuiz } from '../quiz-view/hooks/use-bomb-quiz'
import EmptyBombList from '../../components/empty-bomb-list'
import BombQuiz from '../../components/bomb-quiz'
import BombAnimation from '../../components/bomb-animation'
import WrongAnswerDialog from '../../components/wrong-answer-dialog'
import { getAnswerText } from '../../utils'

const BombQuizView = () => {
  const [key] = useState(new Date())

  const {
    isLoading,
    isEmptyList,

    openExplanation,
    setOpenExplanation,

    bombQuizList,

    currentIndex,
    currentQuizInfo,
    currentAnswerState,
    quizResults,
    leftQuizCount,

    onAnswer,
    onNext,
    handleExit,
  } = useBombQuiz(key)

  if (isLoading) {
    return <Loading center />
  }

  if (isEmptyList) {
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
              setOpenExplanation={setOpenExplanation}
            />
          </div>
        </div>
      </div>

      <WrongAnswerDialog
        isOpen={openExplanation}
        setIsOpen={setOpenExplanation}
        answer={getAnswerText(currentQuizInfo?.answer ?? '')}
        explanation={currentQuizInfo?.explanation ?? ''}
        directoryName={currentQuizInfo?.directory?.name ?? ''}
        documentName={currentQuizInfo?.document.name ?? ''}
        onNext={onNext}
      />
    </div>
  )
}

export default BombQuizView
