'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'

import './style.css'
import Text from '@/shared/components/ui/text'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import WrongAnswerDialog from '../../components/wrong-answer-dialog'
import { useQuizNavigation } from '../quiz-view/hooks/use-quiz-navigation'
import { useQuizState } from '../quiz-view/hooks/use-quiz-state'
import { getAnswerText } from '../../utils'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Tag from '@/shared/components/ui/tag'
import QuizOptions from '../quiz-view/components/quiz-option'
import { CATEGORIES } from '@/features/category/config'
import { useRouter } from 'next/navigation'
import { components } from '@/types/schema'
import { DeepRequired } from 'react-hook-form'
import { useRandomCollectionQuizzes } from '@/requests/collection/hooks'
import { useDirectoryQuizzes } from '@/requests/quiz/hooks'
import Loading from '@/shared/components/custom/loading'

interface Props {
  directories: DeepRequired<components['schemas']['GetAllDirectoriesDirectoryDto']>[]
}

const RandomQuizView = ({ directories }: Props) => {
  const router = useRouter()

  const [randomQuizList, setRandomQuizList] = useState<Quiz.RandomItem[]>([])
  const [repository, setRepository] = useState<'directory' | 'collection'>('directory')
  const [activeDirectoryIndex, setActiveDirectoryIndex] = useState(0)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const activeDirectoryId = useMemo(
    () => directories[activeDirectoryIndex]?.id,
    [activeDirectoryIndex, directories]
  )
  const activeCategoryId = useMemo(() => CATEGORIES[activeCategoryIndex]?.id, [activeCategoryIndex])

  const { data: randomCollectionQuizzesData } = useRandomCollectionQuizzes(activeCategoryId)
  const randomCollectionQuizzes = useMemo(
    () => randomCollectionQuizzesData?.quizzes ?? [],
    [randomCollectionQuizzesData?.quizzes]
  )

  const { data: randomDirectoryQuizzesData } = useDirectoryQuizzes(activeDirectoryId ?? null)
  const randomDirectoryQuizzes = useMemo(
    () => randomDirectoryQuizzesData?.quizzes ?? [],
    [randomDirectoryQuizzesData?.quizzes]
  )

  const [openExplanation, setOpenExplanation] = useState(false)

  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { quizResults, setQuizResults } = useQuizState({
    quizCount: randomQuizList.length,
    currentIndex,
  })

  const currentQuiz = randomQuizList[currentIndex]
  const currentResult = quizResults[currentIndex] as Exclude<
    (typeof quizResults)[number],
    undefined
  >

  const handleSlideChange = (index: number) => {
    if (repository === 'directory') {
      setActiveDirectoryIndex(index)
    } else {
      setActiveCategoryIndex(index)
    }
  }

  const onNext = () => {
    if (openExplanation) {
      setOpenExplanation(false)
    }

    if (repository === 'directory') {
      // API 요청
    }

    // 무한히 반복되기 위함
    setRandomQuizList((prev) => [...prev, currentQuiz!])
    navigateToNext(currentIndex)
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

  const [SwiperContainerWidth, setSwiperContainerWidth] = useState<number>(0)
  const swiperContainerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (swiperContainerRef.current) {
      setSwiperContainerWidth(swiperContainerRef.current.clientWidth)
    }
    const handleResize = () => {
      if (swiperContainerRef.current) {
        setSwiperContainerWidth(swiperContainerRef.current.clientWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slideItems = repository === 'directory' ? directories : CATEGORIES

  useEffect(() => {
    if (repository === 'directory') {
      setRandomQuizList(randomDirectoryQuizzes)
    } else {
      setRandomQuizList(randomCollectionQuizzes)
    }
    router.replace('/quiz/random')
    setQuizResults([])
  }, [repository, randomDirectoryQuizzes, randomCollectionQuizzes])

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
          {currentQuiz ? (
            <div className="flex flex-col items-center">
              <Tag colors={'secondary'} className="px-[8px] py-[4px]">
                <Text typography="text2-bold">
                  {currentQuiz.document?.name || currentQuiz.collection?.name}
                </Text>
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
                currentResult={currentResult ?? null}
                onAnswer={onAnswer}
                className="my-[16px] mt-[4dvh]"
              />
            </div>
          ) : (
            <Loading center />
          )}

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
        <div ref={swiperContainerRef} className="flex-center size-full grow">
          <div className="flex-center mb-[10px] mt-[24px] size-full">
            <Swiper
              key={repository}
              width={SwiperContainerWidth}
              slidesPerView={3}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              initialSlide={repository === 'directory' ? activeDirectoryIndex : activeCategoryIndex}
              onSlideChange={(data) => handleSlideChange(data.activeIndex)}
            >
              {slideItems.map((item, index) => {
                const isActive =
                  repository === 'directory'
                    ? index === activeDirectoryIndex
                    : index === activeCategoryIndex

                return (
                  <SwiperSlide key={index} className="!flex items-center justify-center">
                    <SlideItem
                      isActive={isActive}
                      data={{
                        id: item.id,
                        name: item.name,
                        emoji: item.emoji,
                      }}
                      variant={repository === 'directory' ? 'directory' : 'collection'}
                      quizCount={randomQuizList.length}
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
        answer={getAnswerText(currentQuiz?.answer || '')}
        explanation={currentQuiz?.explanation || ''}
        directoryName={currentQuiz?.collection?.name ?? ''}
        documentName={currentQuiz?.document?.name || currentQuiz?.collection?.name || ''}
        onNext={onNext}
      />
    </div>
  )
}

export default RandomQuizView

interface SlideItemProps {
  isActive: boolean
  data: {
    id: number | string
    name: string
    emoji: string
  }
  variant: 'directory' | 'collection'
  quizCount: number
}

const SlideItem = ({ isActive, data, variant, quizCount }: SlideItemProps) => {
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
        'flex flex-col items-center justify-between text-center min-h-[106px] max-h-[140px]',
        currentStyle.background.base,
        isActive && [
          'h-[16svh] max-h-[160px] min-h-[130px]',
          currentStyle.shadow,
          currentStyle.background.active,
        ]
      )}
    >
      <div>
        <Text
          typography={isActive ? 'subtitle2-bold' : 'text2-bold'}
          color={isActive ? 'primary-inverse' : currentStyle.textColor}
        >
          {data.name}
        </Text>
        {isActive && quizCount > 0 && (
          <Text typography="text2-medium" color="primary-inverse" className="mt-[3px]">
            {quizCount}문제
          </Text>
        )}
      </div>
      <Text typography="hero">{data.emoji}</Text>
    </div>
  )
}
