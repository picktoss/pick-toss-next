'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DocumentDetailContextValues {
  isPickOpen: boolean
  setIsPickOpen: (value: boolean) => void
}

const DocumentDetailContext = createContext<DocumentDetailContextValues | null>(null)

export function DocumentDetailProvider({ children }: PropsWithChildren) {
  const [isPickOpen, setIsPickOpen] = useState(false)

  const values = useMemo(
    () => ({
      isPickOpen,
      setIsPickOpen,
    }),
    [isPickOpen, setIsPickOpen]
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
