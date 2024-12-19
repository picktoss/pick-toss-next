import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuizNavigation } from './use-quiz-navigation'
import { useQuizState } from './use-quiz-state'
import { prepareQuizResults } from '@/features/quiz/utils'
import { useUpdateWrongQuizResult } from '@/requests/quiz/hooks'
import { useRouter } from 'next/navigation'

export const useBombQuiz = (key: Date) => {
  const router = useRouter()
  const [openExplanation, setOpenExplanation] = useState(false)

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
  // 남은 퀴즈 수가 1개일 때, 미리 서버에서 오답 리스트 불러와서 현재 리스트에 추가

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

  // 초기 데이터가 로드되면 quizList를 설정하고 초기 페칭을 비활성화
  useEffect(() => {
    if (initialData?.quizzes && shouldFetchInitial) {
      setBombQuizList(initialData.quizzes)
      setShouldFetchInitial(false)
    }
  }, [initialData, shouldFetchInitial])

  // leftQuizCount가 1이 되면 추가 데이터를 가져오는 효과
  useEffect(() => {
    const fetchMoreQuizzes = () => {
      if (leftQuizCount === 1 && !isLoadingMore) {
        const results = prepareQuizResults(quizResults)

        updateWrongQuizResultMutate(
          { quizzes: results },
          {
            onSuccess: async () => {
              setIsLoadingMore(true)
              const result = await refetchAdditionalData()
              if (result.data?.quizzes) {
                if (
                  result.data?.quizzes.length === 1 &&
                  result.data?.quizzes[0]?.id === currentQuizInfo?.id
                ) {
                  setIsLoadingMore(false)
                  return
                }

                setBombQuizList((prevList) => [...prevList, ...result.data.quizzes])
                // quizResults 배열도 확장
                setQuizResults((prev) => [
                  ...prev,
                  ...(new Array(result.data.quizzes.length).fill(null) as null[]),
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
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      // 마지막 문제였다면 모든 결과를 한번에 업데이트
      const results = prepareQuizResults(quizResults)
      if (results.length > 0) {
        updateWrongQuizResultMutate(
          { quizzes: results },
          {
            onSuccess: () => {
              window.location.reload()
            },
            onError: () => {
              alert('결과 업데이트에 실패했습니다')
            },
          }
        )
      }
    }
  }

  const handleExit = () => {
    // 현재까지 퀴즈 결과 서버에 전송
    // onSuccess: 메인 화면으로 이동
    const results = prepareQuizResults(quizResults)

    if (results.length > 0) {
      updateWrongQuizResultMutate(
        { quizzes: results },
        {
          onSuccess: () => {
            router.replace('/main')
          },
          onError: () => {
            alert('결과 업데이트에 실패했습니다')
            router.replace('/main')
          },
        }
      )
    } else {
      router.replace('/main')
    }
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
