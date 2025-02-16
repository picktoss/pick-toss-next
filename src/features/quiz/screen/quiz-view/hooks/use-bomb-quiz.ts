import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuizNavigation } from './use-quiz-navigation'
import { useQuizState } from './use-quiz-state'
import { prepareQuizResults } from '@/features/quiz/utils'
import { useUpdateWrongQuizResult } from '@/requests/quiz/hooks'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/use-toast'

export const useBombQuiz = (key: Date) => {
  const router = useRouter()
  const { toast } = useToast()

  const [openExplanation, setOpenExplanation] = useState(false)
  const [openFinished, setOpenFinished] = useState(false)

  const [shouldFetchInitial, setShouldFetchInitial] = useState(true)
  const [bombQuizList, setBombQuizList] = useState<Quiz.Item[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { handleNext, quizResults, setQuizResults, leftQuizCount } = useQuizState({
    quizCount: bombQuizList.length,
    currentIndex: currentIndex,
  })

  const { mutate: updateWrongQuizResultMutate } = useUpdateWrongQuizResult()
  // 무한 오답 터뜨리기 구현을 위한 쿼리 분리
  // 남은 퀴즈 수가 3개일 때, 미리 서버에서 오답 리스트 불러와서 현재 리스트에 추가

  // 초기 퀴즈 데이터 쿼리 - enabled 옵션으로 한 번만 실행되도록 제어
  const { data: initialData, isLoading: isInitialLoading } = useQuery({
    ...queries.quiz.bomb(key),
    enabled: shouldFetchInitial,
  })
  // 추가 퀴즈 데이터를 위한 별도의 쿼리
  const { refetch: refetchAdditionalData } = useQuery({
    ...queries.quiz.bomb(key),
    enabled: false, // 초기에는 실행하지 않음
  })

  const currentQuizInfo = bombQuizList[currentIndex]
  const currentAnswerState = quizResults[currentIndex]?.answer

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(bombQuizList)
  }, [bombQuizList])

  // 초기 데이터가 로드되면 quizList를 설정하고 초기 페칭을 비활성화
  useEffect(() => {
    if (initialData?.quizzes && shouldFetchInitial) {
      setBombQuizList(initialData.quizzes)
      setShouldFetchInitial(false)
    }
  }, [initialData, shouldFetchInitial])

  // leftQuizCount가 3이 되면 추가 데이터를 가져오는 효과
  useEffect(() => {
    const fetchMoreQuizzes = () => {
      if (leftQuizCount === 3 && !isLoadingMore) {
        // 추후 확장성을 위해 저장된 배열을 이용하는 코드를 남겨두었습니다
        const results = prepareQuizResults(quizResults)

        updateWrongQuizResultMutate(
          { quizzes: results },
          {
            onSuccess: async () => {
              setIsLoadingMore(true)
              const result = await refetchAdditionalData()

              if (result.data?.quizzes) {
                const lastThreeQuizIds = bombQuizList.map((quiz, index) => {
                  if (
                    index === currentIndex ||
                    index === currentIndex + 1 ||
                    index === currentIndex + 2
                  ) {
                    return quiz.id
                  }
                })
                const addList = result.data.quizzes.filter(
                  (quiz) => !lastThreeQuizIds.includes(quiz.id)
                )

                if (
                  result.data?.quizzes.length === 1 &&
                  result.data?.quizzes[0]?.id === currentQuizInfo?.id
                ) {
                  setIsLoadingMore(false)
                  return
                }

                setBombQuizList((prevList) => [...prevList, ...addList])
                // quizResults 배열도 확장
                setQuizResults((prev) => [
                  ...prev,
                  ...(new Array(addList.length).fill(null) as null[]),
                ])
              }
              setIsLoadingMore(false)
            },
          }
        )
      }
    }

    fetchMoreQuizzes()
  }, [leftQuizCount, refetchAdditionalData])

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
        elapsedTime: 1,
      }
      return newResults
    })
  }

  const onNext = () => {
    if (openExplanation) {
      setOpenExplanation(false)
    }

    const hasNextQuiz = handleNext(currentIndex, bombQuizList.length)
    const results = prepareQuizResults(quizResults)

    updateWrongQuizResultMutate(
      { quizzes: results },
      {
        onSuccess: async () => {
          if (hasNextQuiz) {
            navigateToNext(currentIndex)
          } else {
            const result = await refetchAdditionalData()
            if (result.data?.quizzes.length) {
              window.location.replace('/quiz/bomb')
            } else {
              setBombQuizList([])
              setOpenFinished(true)
            }
          }
        },
        onError: () => {
          toast({ title: '결과 업데이트에 실패했습니다' })
        },
      }
    )
  }

  const handleExit = () => {
    router.replace('/main')
  }

  const isLoading = useMemo(() => {
    return isInitialLoading || !initialData
  }, [isInitialLoading, initialData])

  const isEmptyList = useMemo(() => {
    return !bombQuizList || bombQuizList.length === 0
  }, [bombQuizList])

  return {
    isLoading,
    isEmptyList,

    openExplanation,
    setOpenExplanation,
    openFinished,
    setOpenFinished,

    bombQuizList,

    currentIndex,
    currentQuizInfo,
    currentAnswerState,
    quizResults,
    leftQuizCount,

    onAnswer,
    onNext,
    handleExit,
  }
}
