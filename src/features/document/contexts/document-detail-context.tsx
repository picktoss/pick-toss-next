'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DocumentDetailContextValues {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

const DocumentDetailContext = createContext<DocumentDetailContextValues | null>(null)

export function DocumentDetailProvider({ children }: PropsWithChildren) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const values = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [isDrawerOpen, setIsDrawerOpen]
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
