'use client'

import { createContext, useContext, ReactNode, useMemo, useState } from 'react'

interface TodayQuizSettingContextType {
  quizCount: number
  setQuizCount: (value: number) => void
  selectedFolderId: number
  setSelectedFolderId: (value: number) => void
}

const TodayQuizSettingContext = createContext<TodayQuizSettingContextType | undefined>(undefined)

export const TodayQuizSettingProvider = ({ children }: { children: ReactNode }) => {
  const [quizCount, setQuizCount] = useState(10)
  const [selectedFolderId, setSelectedFolderId] = useState(0)

  const values = useMemo(
    () => ({
      quizCount,
      setQuizCount,
      selectedFolderId,
      setSelectedFolderId,
    }),
    [quizCount, setQuizCount, selectedFolderId, setSelectedFolderId]
  )

  return (
    <TodayQuizSettingContext.Provider value={values}>{children}</TodayQuizSettingContext.Provider>
  )
}

// Context를 쉽게 사용할 수 있도록 훅 생성
export const useTodayQuizSetting = () => {
  const context = useContext(TodayQuizSettingContext)
  if (!context) {
    throw new Error('TodayQuizSettingProvider 내에서 사용해주세요')
  }
  return context
}
