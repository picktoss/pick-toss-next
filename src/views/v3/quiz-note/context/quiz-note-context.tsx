'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizNoteContextValues {
  selectedFolderId: string
  setSelectedFolderId: (id: string) => void
  dialogState: { isOpen: boolean; type: 'create' | 'edit' | 'delete' }
  setDialogState: (state: QuizNoteContextValues['dialogState']) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
}

const QuizNoteContext = createContext<QuizNoteContextValues | null>(null)

export function QuizNoteProvider({ children }: PropsWithChildren) {
  const [selectedFolderId, setSelectedFolderId] = useState('')
  const [dialogState, setDialogState] = useState<QuizNoteContextValues['dialogState']>({
    isOpen: false,
    type: 'create',
  })
  const [isSelectMode, setIsSelectMode] = useState(false)

  const values = useMemo(
    () => ({
      selectedFolderId,
      setSelectedFolderId,
      dialogState,
      setDialogState,
      isSelectMode,
      setIsSelectMode,
    }),
    [
      selectedFolderId,
      setSelectedFolderId,
      dialogState,
      setDialogState,
      isSelectMode,
      setIsSelectMode,
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
