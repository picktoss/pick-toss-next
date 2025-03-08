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
import { Button } from '@/shared/components/ui/button'
import { useSession } from 'next-auth/react'
import { getLocalStorage } from '@/shared/utils/storage'
import { LOCAL_KEY } from '@/constants'
import RandomTutorial from '../random-tutorial'
import { useDirectory } from '@/requests/directory/hooks'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface Props {
  directories: DeepRequired<components['schemas']['GetAllDirectoriesDirectoryDto']>[]
}

const RandomQuizView = ({ directories }: Props) => {
  const { randomquizChangeEvent, randomquizExitEvent } = useAmplitudeContext()
  const router = useRouter()
  const { data: session } = useSession()

  const [randomQuizList, setRandomQuizList] = useState<Quiz.RandomItem[]>([])
  const [repository, setRepository] = useState<'directory' | 'collection'>('directory')
  const [activeDirectoryIndex, setActiveDirectoryIndex] = useState(0)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const activeDirectoryId = useMemo(
    () => directories[activeDirectoryIndex]?.id,
    [activeDirectoryIndex, directories]
  )
  const activeCategoryId = useMemo(() => CATEGORIES[activeCategoryIndex]?.id, [activeCategoryIndex])

  const { data: randomCollectionQuizzesData, isLoading: isLoadingCollectionQuizzes } =
    useRandomCollectionQuizzes(activeCategoryId)
  const randomCollectionQuizzes = useMemo(
    () => randomCollectionQuizzesData?.quizzes ?? [],
    [randomCollectionQuizzesData?.quizzes]
  )

  const { data: randomDirectoryQuizzesData, isLoading: isLoadingDirectoryQuizzes } =
    useDirectoryQuizzes(activeDirectoryId ?? null)
  const { data: activeDirectoryData } = useDirectory(activeDirectoryId!)

  const randomDirectoryQuizzes = useMemo(
    () => randomDirectoryQuizzesData?.quizzes ?? [],
    [randomDirectoryQuizzesData?.quizzes]
  )

  const isLoading = isLoadingCollectionQuizzes || isLoadingDirectoryQuizzes

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
    if (typeof window !== 'undefined') {
      if (repository === 'directory') {
        setRandomQuizList(randomDirectoryQuizzes)
      } else {
        setRandomQuizList(randomCollectionQuizzes)
      }
      router.replace('/quiz/random')
      setQuizResults([])
    }
  }, [repository, randomDirectoryQuizzes, randomCollectionQuizzes])

  if (session?.user.isNewUser && !getLocalStorage(LOCAL_KEY.RANDOM_TUTORIAL_COMPLETE)) {
    return <RandomTutorial />
  }

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
            <GoBackButton
              icon="cancel"
              onClick={() => {
                randomquizExitEvent()
                router.back()
              }}
            />
          </div>

          {/* 문제 영역 */}
          {currentQuiz ? (
            <div className="flex flex-col items-center">
              <Tag className="rounded-[8px] bg-background-base-02 px-[8px] py-[4px] hover:bg-background-base-02">
                <Text typography="text2-bold" color="sub">
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
          ) : isLoading ? (
            <Loading center />
          ) : repository === 'collection' ? (
            <EmptyState
              description="컬렉션을 만들거나, 다음에 드는 컬렉션을 담아보세요"
              buttonText="컬렉션 보러가기"
              onClick={() => router.push('/collections')}
            />
          ) : (
            <EmptyState
              description="내 노트를 추가하고 랜덤 퀴즈를 풀어보세요"
              buttonText="노트 추가하러 가기"
              onClick={() => router.push('/document')}
            />
          )}

          {/* 탭 영역 */}
          <Tabs
            defaultValue="directory"
            className="absolute bottom-4 right-1/2 h-[36px] w-[210px] translate-x-1/2 rounded-[12px] bg-background-base-02 p-[3px]"
            onValueChange={(value) => {
              randomquizChangeEvent({
                option: value === 'directory' ? '퀴즈노트' : '컬렉션',
              })
              setRepository(value as 'directory' | 'collection')
            }}
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
              slidesPerView={slideItems.length > 2 ? 3 : slideItems.length}
              loop={true}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              initialSlide={repository === 'directory' ? activeDirectoryIndex : activeCategoryIndex}
              onSlideChange={(data) => handleSlideChange(data.realIndex)}
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
        repository={repository}
        collectionName={currentQuiz?.collection?.name || ''}
        directoryName={activeDirectoryData?.name || ''}
        documentName={currentQuiz?.document?.name || ''}
        onNext={onNext}
      />
    </div>
  )
}

interface EmptyStateProps {
  description: string
  buttonText: string
  onClick: () => void
}

const EmptyState = ({ description, buttonText, onClick }: EmptyStateProps) => {
  return (
    <div className="center flex w-full flex-col items-center justify-center">
      <svg
        width="81"
        height="98"
        viewBox="0 0 81 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2H69C74.5228 2 79 6.47715 79 12V86C79 91.5228 74.5228 96 69 96H12C6.47715 96 2 91.5228 2 86V12Z"
          stroke="#D3DCE4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        <path
          d="M36.5305 54.4624C36.5305 49.2796 37.8537 47.6667 40.2866 46.1183C42.1646 44.8925 43.5945 43.6882 43.6159 41.8172C43.5945 39.9462 42.122 38.6989 40.2866 38.7204C39.0785 38.7061 37.9461 39.2736 37.3118 40.296C36.7375 41.2215 35.9148 42.1613 34.8255 42.1613H32.0273C30.9121 42.1613 29.9876 41.2394 30.2002 40.1447C31.1511 35.2468 35.3546 33 40.3293 33C46.5183 33 50.9787 36.0108 51 41.4731C50.9787 45.1075 49.0793 47.3226 46.2195 49.043C43.9146 50.3979 42.8262 51.7312 42.8049 54.4624C42.8049 54.7949 42.5353 55.0645 42.2027 55.0645H37.1326C36.8001 55.0645 36.5305 54.7949 36.5305 54.4624ZM35.9329 61.086C35.8902 58.9785 37.6616 57.2581 39.7744 57.2581C41.8232 57.2581 43.6372 58.9785 43.6585 61.086C43.6372 63.2581 41.8232 65 39.7744 65C37.6616 65 35.8902 63.2581 35.9329 61.086Z"
          fill="#D3DCE4"
        />
      </svg>
      <div className="mt-5 flex flex-col items-center gap-8">
        <Text typography="text1-medium" color="sub" className="text-center">
          아직 퀴즈가 없어요
          <br />
          {description}
        </Text>
        <Button variant="mediumRound" onClick={onClick} className="w-fit px-6">
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

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
          // currentStyle.shadow,
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
        {isActive && (
          <Text typography="text2-medium" color="primary-inverse" className="mt-[3px]">
            {quizCount}문제
          </Text>
        )}
      </div>
      <Text typography="hero">{data.emoji}</Text>
    </div>
  )
}

export default RandomQuizView
