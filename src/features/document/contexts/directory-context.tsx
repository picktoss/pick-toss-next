'use client'

import { useGetDocuments } from '@/requests/document/hooks'
import { useCheckList, UseCheckListReturn } from '@/shared/hooks/use-check-list'
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DirectoryContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  selectedDirectoryId: number | null
  setSelectedDirectoryId: (id: number | null) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
  isExpandedBtns: boolean
  setIsExpandedBtns: (value: boolean) => void
  checkDoc: UseCheckListReturn<{ id: number; checked: boolean }>
}

const DirectoryContext = createContext<DirectoryContextValues | null>(null)

interface InitialValues {
  isSelectMode?: boolean
  buttonHidden?: boolean
  isExpandedBtns?: boolean
}

export function DirectoryProvider({
  initialValues,
  children,
}: PropsWithChildren & { initialValues?: InitialValues }) {
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(null)
  const [isSelectMode, setIsSelectMode] = useState(initialValues?.isSelectMode ?? false)
  const [buttonHidden, setButtonHidden] = useState(initialValues?.buttonHidden ?? false)
  const [isExpandedBtns, setIsExpandedBtns] = useState(initialValues?.isExpandedBtns ?? false)

  const { data } = useGetDocuments()
  const documentCheckList =
    data?.documents.map((document) => ({ id: document.id, checked: false })) ?? []

  const checkDoc = useCheckList(documentCheckList)

  const values = useMemo(
    () => ({
      selectedDirectoryId,
      setSelectedDirectoryId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      checkDoc,
    }),
    [
      selectedDirectoryId,
      setSelectedDirectoryId,
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      checkDoc,
    ]
  )

  return <DirectoryContext.Provider value={values}>{children}</DirectoryContext.Provider>
}

export const useDirectoryContext = () => {
  const values = useContext(DirectoryContext)

  if (values == null) {
    throw new Error('DirectoryProvider 내에서 사용해주세요.')
  }

  return values
}
