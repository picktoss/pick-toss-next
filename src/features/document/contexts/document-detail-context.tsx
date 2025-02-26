'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DocumentDetailContextValues {
  isNewQuizOpen: boolean
  setIsNewQuizOpen: (value: boolean) => void
  isReplayQuizOpen: boolean
  setIsReplayQuizOpen: (value: boolean) => void
  isDrawerOpen: boolean
}

const DocumentDetailContext = createContext<DocumentDetailContextValues | null>(null)

export function DocumentDetailProvider({ children }: PropsWithChildren) {
  const [isNewQuizOpen, setIsNewQuizOpen] = useState(false)
  const [isReplayQuizOpen, setIsReplayQuizOpen] = useState(false)

  const values = useMemo(
    () => ({
      isNewQuizOpen,
      setIsNewQuizOpen,
      isReplayQuizOpen,
      setIsReplayQuizOpen,
      isDrawerOpen: isNewQuizOpen || isReplayQuizOpen,
    }),
    [isNewQuizOpen, setIsNewQuizOpen, isReplayQuizOpen, setIsReplayQuizOpen]
  )

  return <DocumentDetailContext.Provider value={values}>{children}</DocumentDetailContext.Provider>
}

export const useDocumentDetailContext = () => {
  const values = useContext(DocumentDetailContext)

  if (values == null) {
    throw new Error('DocumentDetailProvider 내에서 사용해주세요.')
  }

  return values
}
