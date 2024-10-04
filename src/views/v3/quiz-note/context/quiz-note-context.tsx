'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface QuizNoteContextValues {
  menuState: { isOpened: boolean; type: string }
  setMenu: (value: QuizNoteContextValues['menuState']) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

const QuizNoteContext = createContext<QuizNoteContextValues | null>(null)

export function QuizNoteProvider({ children }: PropsWithChildren) {
  const [menuState, setMenu] = useState({ isOpened: false, type: '' })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const values = useMemo(
    () => ({
      menuState,
      setMenu,
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [menuState, setMenu, isDrawerOpen, setIsDrawerOpen]
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
