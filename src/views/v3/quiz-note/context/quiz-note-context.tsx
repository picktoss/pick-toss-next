'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizNoteContextValues {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
  selectedFolderId: string
  setSelectedFolderId: (id: string) => void
}

const QuizNoteContext = createContext<QuizNoteContextValues | null>(null)

export function QuizNoteProvider({ children }: PropsWithChildren) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState('')

  const values = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      selectedFolderId,
      setSelectedFolderId,
    }),
    [isDrawerOpen, setIsDrawerOpen, selectedFolderId, setSelectedFolderId]
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
