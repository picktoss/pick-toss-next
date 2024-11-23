'use client'

import { useDirectories } from '@/requests/directory/hooks'
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DirectoryContextValues {
  directories: Directory.List
  selectedDirectory: Directory.Item | null

  selectedDirectoryId: number | null
  selectDirectoryId: (id: number | null) => void
}

const DirectoryContext = createContext<DirectoryContextValues | null>(null)

export function DirectoryProvider({ children }: PropsWithChildren) {
  const { data } = useDirectories()
  const [selectedDirectoryId, selectDirectoryId] = useState<number | null>(null)

  const values = useMemo(
    () => ({
      directories: data?.directories || [],
      selectedDirectory:
        data?.directories.find((directory) => directory.id === selectedDirectoryId) || null,
      selectedDirectoryId,
      selectDirectoryId,
    }),
    [data, selectedDirectoryId, selectDirectoryId]
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
