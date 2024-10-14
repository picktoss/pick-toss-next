'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizNoteContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  selectedFolderId: string
  setSelectedFolderId: (id: string) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
}

const QuizNoteContext = createContext<QuizNoteContextValues | null>(null)

export function QuizNoteProvider({ children }: PropsWithChildren) {
  const [selectedFolderId, setSelectedFolderId] = useState('')
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [buttonHidden, setButtonHidden] = useState(false)

  const values = useMemo(
    () => ({
      selectedFolderId,
      setSelectedFolderId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
    }),
    [
      selectedFolderId,
      setSelectedFolderId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
    ]
  )

  return <QuizNoteContext.Provider value={values}>{children}</QuizNoteContext.Provider>
}

export const useQuizNoteContext = () => {
  const values = useContext(QuizNoteContext)

  if (values == null) {
    throw new Error('QuizNoteProvider 내에서 사용해주세요.')
  }

  return values
}
