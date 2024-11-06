'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizNoteContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  selectedFolderId: string
  setSelectedFolderId: (id: string) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
  isExpandedBtns: boolean
  setIsExpandedBtns: (value: boolean) => void
}

const QuizNoteContext = createContext<QuizNoteContextValues | null>(null)

interface InitialValues {
  isSelectMode?: boolean
  buttonHidden?: boolean
  isExpandedBtns?: boolean
}

export function QuizNoteProvider({
  initialValues,
  children,
}: PropsWithChildren & { initialValues?: InitialValues }) {
  const [selectedFolderId, setSelectedFolderId] = useState('')
  const [isSelectMode, setIsSelectMode] = useState(initialValues?.isSelectMode ?? false)
  const [buttonHidden, setButtonHidden] = useState(initialValues?.buttonHidden ?? false)
  const [isExpandedBtns, setIsExpandedBtns] = useState(initialValues?.isExpandedBtns ?? false)

  const values = useMemo(
    () => ({
      selectedFolderId,
      setSelectedFolderId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
    }),
    [
      selectedFolderId,
      setSelectedFolderId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
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
