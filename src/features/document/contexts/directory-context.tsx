'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DirectoryContextValues {
  buttonHidden: boolean
  setButtonHidden: (value: boolean) => void
  selectedDirectoryId: string
  setSelectedDirectoryId: (id: string) => void
  isSelectMode: boolean
  setIsSelectMode: (value: boolean) => void
  isExpandedBtns: boolean
  setIsExpandedBtns: (value: boolean) => void
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
  const [selectedDirectoryId, setSelectedDirectoryId] = useState('')
  const [isSelectMode, setIsSelectMode] = useState(initialValues?.isSelectMode ?? false)
  const [buttonHidden, setButtonHidden] = useState(initialValues?.buttonHidden ?? false)
  const [isExpandedBtns, setIsExpandedBtns] = useState(initialValues?.isExpandedBtns ?? false)

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
