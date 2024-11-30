'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

import './style.css'
import { quizzes } from '../../config'
import Text from '@/shared/components/ui/text'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import WrongAnswerDialog from '../../components/wrong-answer-dialog'
import { useQuizNavigation } from '../quiz-view/hooks/use-quiz-navigation'
import { useQuizState } from '../quiz-view/hooks/use-quiz-state'
import { getAnswerText } from '../../utils'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Tag from '@/shared/components/ui/tag'
import QuizOptions from '../quiz-view/components/quiz-option'

const RandomQuizView = () => {
  const randomQuizList = [...quizzes] // 임시

  const [repository, setRepository] = useState<'directory' | 'collection'>('directory')
  const [activeDirectoryIndex, setActiveDirectoryIndex] = useState(0)
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0)

  const [openExplanation, setOpenExplanation] = useState(false)

  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { handleNext, quizResults, setQuizResults } = useQuizState({
    quizCount: randomQuizList.length,
    currentIndex,
  })

  const handleSlideChange = (index: number) => {
    if (repository === 'directory') {
      setActiveDirectoryIndex(index)
    } else {
      setActiveCollectionIndex(index)
    }
  }

  const onNext = () => {
    if (openExplanation) {
      setOpenExplanation(false)
    }

    const hasNextQuiz = handleNext(currentIndex, randomQuizList.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      // TODO: 종료 로직 추가
    }
  }

  const onAnswer = ({
    id,
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      const newResults = [...prev]
      newResults[currentIndex] = {
        id,
        answer: isRight,
        choseAnswer,
        elapsedTime: 1, // 임시
      }
      return newResults
    })

    if (isRight) {
      setTimeout(() => onNext(), 1000)
    } else {
      setTimeout(() => setOpenExplanation(true), 1000)
    }
  }

  const mockData = repository === 'directory' ? mockDirectories : mockCategories

  const currentQuiz = randomQuizList[currentIndex]
  const currentResult = quizResults[currentIndex]

  return (
    <div>
      {/* dimmed background */}
      <div
        className={cn(
          'fixed h-dvh w-screen max-w-mobile',
          repository === 'directory' ? 'bg-orange-100' : 'bg-blue-100'
        )}
      />

      <div className="fixed z-10 flex w-screen max-w-mobile flex-col">
        <div className="relative h-[70dvh] min-h-fit w-full rounded-b-[24px] bg-white px-[16px]">
          {/* 헤더 영역 */}
          <div className="flex h-[54px] w-full items-center">
            <GoBackButton icon="cancel" onClick={() => {}} />
          </div>

          {/* 문제 영역 */}
          <div className="flex flex-col items-center">
            <Tag colors={'secondary'} className="px-[8px] py-[4px]">
              <Text typography="text2-bold">{currentQuiz.document.name as string}</Text>
            </Tag>

            <Text
              key={currentIndex}
              typography="question"
              className="mt-[12px] animate-fadeIn px-[30px] text-center"
            >
              {currentQuiz.question}
            </Text>

            <QuizOptions
              quiz={currentQuiz}
              currentResult={currentResult}
              onAnswer={onAnswer}
              className="my-[16px] mt-[4dvh]"
            />
          </div>

          {/* 탭 영역 */}
          <Tabs
            defaultValue="directory"
            className="absolute bottom-4 right-1/2 h-[36px] w-[210px] translate-x-1/2 rounded-[12px] bg-background-base-02 p-[3px]"
            onValueChange={(value) => setRepository(value as 'directory' | 'collection')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="directory" className="h-[30px]">
                퀴즈노트
              </TabsTrigger>
              <TabsTrigger value="collection" className="h-[30px]">
                컬렉션
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Swiper 영역 */}
        <div className="flex-center size-full grow">
          <div className="flex-center mb-[10px] mt-[24px] size-full">
            <Swiper
              key={repository}
              slidesPerView={3}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              initialSlide={
                repository === 'directory' ? activeDirectoryIndex : activeCollectionIndex
              }
              onSlideChange={(data) => handleSlideChange(data.activeIndex)}
            >
              {mockData.map((item, index) => {
                const isActive =
                  repository === 'directory'
                    ? index === activeDirectoryIndex
                    : index === activeCollectionIndex

                return (
                  <SwiperSlide key={index} className="!flex items-center justify-center">
                    <CategoryItem
                      isActive={isActive}
                      data={item}
                      variant={repository === 'directory' ? 'directory' : 'collection'}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>

      <WrongAnswerDialog
        isOpen={openExplanation}
        setIsOpen={setOpenExplanation}
        answer={getAnswerText(currentQuiz.answer)}
        explanation={currentQuiz.explanation}
        directoryName={currentQuiz.directory?.name ?? ''}
        documentName={currentQuiz.document.name as string}
        onNext={onNext}
      />
    </div>
  )
}

export default RandomQuizView

interface CategoryItemProps {
  isActive: boolean
  data: {
    id: number
    name: string
    emoji: string
  }
  variant: 'directory' | 'collection'
}

const CategoryItem = ({ isActive, data, variant }: CategoryItemProps) => {
  const styles = {
    directory: {
      background: {
        base: 'bg-orange-200',
        active: 'bg-orange-400',
      },
      shadow: 'drop-shadow-[0_4px_20px_rgba(255,138,0,0.4)]',
      textColor: 'accent',
    },
    collection: {
      background: {
        base: 'bg-blue-200',
        active: 'bg-blue-400',
      },
      shadow: 'drop-shadow-[0_4px_20px_rgba(96,165,250,0.4)]',
      textColor: 'info',
    },
  } as const

  const currentStyle = styles[variant]

  return (
    <div
      className={cn(
        'rounded-[16px] p-[12px_14px_15px_14px] h-[12svh] aspect-[90/108]',
        'flex flex-col items-center justify-between text-center min-h-[106px]',
        currentStyle.background.base,
        isActive && ['h-[16svh] min-h-[130px]', currentStyle.shadow, currentStyle.background.active]
      )}
    >
      <div>
        <Text
          typography={isActive ? 'subtitle2-bold' : 'text2-bold'}
          color={isActive ? 'primary-inverse' : currentStyle.textColor}
        >
          {data.name}
        </Text>
        {isActive && (
          <Text typography="text2-medium" color="primary-inverse" className="mt-[3px]">
            232문제
          </Text>
        )}
      </div>
      <Text typography="hero">{data.emoji}</Text>
    </div>
  )
}

const mockDirectories = [
  {
    id: 1,
    name: '파이썬기본문법과응용',
    emoji: '❄️',
  },
  {
    id: 2,
    name: '통계학이론',
    emoji: '🌱',
  },
  {
    id: 3,
    name: '제테크상식',
    emoji: '💵',
  },
  {
    id: 4,
    name: '전공 공부',
    emoji: '🔥',
  },
  {
    id: 5,
    name: '세계사 1급',
    emoji: '🌍',
  },
  {
    id: 6,
    name: '강의 복기',
    emoji: '✏️',
  },
  {
    id: 7,
    name: '통계학이론',
    emoji: '🌂',
  },
]

const mockCategories = [
  {
    id: 1,
    name: '역사·철학',
    emoji: '📦',
  },
  {
    id: 2,
    name: '과학·공학',
    emoji: '🔬',
  },
  {
    id: 3,
    name: '언어',
    emoji: '💬',
  },
  {
    id: 4,
    name: '기타',
    emoji: '∞',
  },
  {
    id: 5,
    name: '사회·정치',
    emoji: '⚖️',
  },
  {
    id: 6,
    name: '예술',
    emoji: '🎨',
  },
  {
    id: 7,
    name: 'IT·프로그래밍',
    emoji: '🌐',
  },
  {
    id: 8,
    name: '경영·경제',
    emoji: '💰',
  },
  {
    id: 9,
    name: '법학',
    emoji: '📖',
  },
  {
    id: 10,
    name: '의학·약학',
    emoji: '⚕️',
  },
]
