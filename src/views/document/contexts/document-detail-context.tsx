'use client'

import { DocumentStatus } from '@/actions/types/dto/document.dto'
import { useAiPick } from '@/shared/hooks/use-ai-pick'
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DocumentDetailContextValues {
  isPickOpen: boolean
  setIsPickOpen: (value: boolean) => void
  showToggle: boolean
  setShowToggle: (value: boolean) => void
  status: DocumentStatus
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  handleCreateAiPick: () => void
  handleReCreateAiPick: () => void
  handleToggleBookmark: (data: { keyPointId: number; bookmark: boolean }) => void
}

const DocumentDetailContext = createContext<DocumentDetailContextValues | null>(null)

export function DocumentDetailProvider({
  children,
  initKeyPoints,
  initStatus,
}: PropsWithChildren<{
  initKeyPoints: DocumentDetailContextValues['keyPoints']
  initStatus: DocumentStatus
}>) {
  const [isPickOpen, setIsPickOpen] = useState(false)
  const [showToggle, setShowToggle] = useState(false)

  const { status, keyPoints, handleCreateAiPick, handleReCreateAiPick, handleToggleBookmark } =
    useAiPick({ initKeyPoints, initStatus })

  const values = useMemo(
    () => ({
      isPickOpen,
      setIsPickOpen,
      showToggle,
      setShowToggle,
      status,
      keyPoints,
      handleCreateAiPick,
      handleReCreateAiPick,
      handleToggleBookmark,
    }),
    [
      isPickOpen,
      setIsPickOpen,
      showToggle,
      setShowToggle,
      status,
      keyPoints,
      handleCreateAiPick,
      handleReCreateAiPick,
      handleToggleBookmark,
    ]
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
