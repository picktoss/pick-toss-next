'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizListContextValues {
  showAnswer: boolean
  setShowAnswer: (value: boolean) => void
}

const QuizListContext = createContext<QuizListContextValues | null>(null)

export function QuizListProvider({ children }: PropsWithChildren) {
  const [showAnswer, setShowAnswer] = useState(false)

  const values = useMemo(
    () => ({
      showAnswer,
      setShowAnswer,
    }),
    [showAnswer, setShowAnswer]
  )

  return <QuizListContext.Provider value={values}>{children}</QuizListContext.Provider>
}

export const useQuizListContext = () => {
  const values = useContext(QuizListContext)

  if (values == null) {
    throw new Error('QuizListProvider 내에서 사용해주세요.')
  }

  return values
}
