'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface CreateNoteContextValues {
  noteTitle: string
  setNoteTitle: (title: string) => void
}

const CreateNoteContext = createContext<CreateNoteContextValues | null>(null)

export function CreateNoteProvider({ children }: PropsWithChildren) {
  const [noteTitle, setNoteTitle] = useState('')

  const values = useMemo(
    () => ({
      noteTitle,
      setNoteTitle,
    }),
    [noteTitle, setNoteTitle]
  )

  return <CreateNoteContext.Provider value={values}>{children}</CreateNoteContext.Provider>
}

export const useCreateNoteContext = () => {
  const values = useContext(CreateNoteContext)

  if (values == null) {
    throw new Error('CreateNoteProvider 내에서 사용해주세요.')
  }

  return values
}