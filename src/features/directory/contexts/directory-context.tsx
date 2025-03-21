'use client'

import { useDirectories } from '@/requests/directory/hooks'
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface DirectoryContextValues {
  directories: Directory.Item[]
  selectedDirectory: Directory.Item | null

  selectedDirectoryId: number | null
  selectDirectoryId: (id: number | null) => void

  globalDirectoryId: number | null
  totalDocsCount: number | undefined
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
      globalDirectoryId:
        data?.directories.find((directory) => directory.tag === 'DEFAULT')?.id ??
        selectedDirectoryId,
      totalDocsCount: data?.directories.reduce(
        (acc, directory) => acc + directory.documentCount,
        0
      ),
    }),
    [data, selectedDirectoryId]
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
