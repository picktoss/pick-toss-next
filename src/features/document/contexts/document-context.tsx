'use client'

import { useCheckList, UseCheckListReturn } from '@/shared/hooks/use-check-list'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'

interface DocumentContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
  isExpandedBtns: boolean
  setIsExpandedBtns: (value: boolean) => void
  sortOption: Document.Sort
  setSortOption: (sortOption: Document.Sort) => void
  checkDoc: UseCheckListReturn<Document.ItemInList & { checked: boolean }>
  checkedDocsQuizCount: number
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
  const [sortOption, setSortOption] = useState<Document.Sort>('CREATED_AT')

  const { data } = useQuery(queries.document.list())

  const documentCheckList = useMemo(
    () => data?.documents.map((document) => ({ ...document, checked: false })) ?? [],
    [data]
  )

  const checkDoc = useCheckList(documentCheckList)

  useEffect(() => {
    if (!isSelectMode) checkDoc.unCheckAll()
  }, [isSelectMode])

  const values = useMemo(
    () => ({
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      sortOption,
      setSortOption,
      checkDoc,
      checkedDocsQuizCount: checkDoc
        .getCheckedList()
        .reduce((acc, document) => acc + document.totalQuizCount, 0),
    }),
    [
      isSelectMode,
      setIsSelectMode,
      buttonHidden,
      setButtonHidden,
      isExpandedBtns,
      setIsExpandedBtns,
      sortOption,
      setSortOption,
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
