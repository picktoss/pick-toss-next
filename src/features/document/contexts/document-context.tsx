'use client'

import { useGetDocuments } from '@/requests/document/hooks'
import { useCheckList, UseCheckListReturn } from '@/shared/hooks/use-check-list'
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DocumentContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
  isExpandedBtns: boolean
  setIsExpandedBtns: (value: boolean) => void
  checkDoc: UseCheckListReturn<{ id: number; checked: boolean }>
}

const DocumentContext = createContext<DocumentContextValues | null>(null)

interface InitialValues {
  isSelectMode?: boolean
  buttonHidden?: boolean
  isExpandedBtns?: boolean
}

export function DocumentProvider({
  initialValues,
  children,
}: PropsWithChildren & { initialValues?: InitialValues }) {
  const [isSelectMode, setIsSelectMode] = useState(initialValues?.isSelectMode ?? false)
  const [buttonHidden, setButtonHidden] = useState(initialValues?.buttonHidden ?? false)
  const [isExpandedBtns, setIsExpandedBtns] = useState(initialValues?.isExpandedBtns ?? false)

  const { data } = useGetDocuments()
  const documentCheckList =
    data?.documents.map((document) => ({ id: document.id, checked: false })) ?? []

  const checkDoc = useCheckList(documentCheckList)

  const values = useMemo(
    () => ({
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      checkDoc,
    }),
    [
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      checkDoc,
    ]
  )

  return <DocumentContext.Provider value={values}>{children}</DocumentContext.Provider>
}

export const useDocumentContext = () => {
  const values = useContext(DocumentContext)

  if (values == null) {
    throw new Error('DocumentProvider 내에서 사용해주세요.')
  }

  return values
}
