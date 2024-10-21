'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface EditNoteContextValues {
  noteTitle: string
  setNoteTitle: (title: string) => void
  editorMarkdownContent: string
  setEditorMarkdownContent: (markdown: string) => void
}

const EditNoteContext = createContext<EditNoteContextValues | null>(null)

interface Props extends PropsWithChildren {
  prevTitle: string
  prevContent: string
}

export function EditNoteProvider({ children, prevTitle, prevContent }: Props) {
  const [noteTitle, setNoteTitle] = useState(prevTitle)
  const [editorMarkdownContent, setEditorMarkdownContent] = useState(prevContent)

  const values = useMemo(
    () => ({
      noteTitle,
      setNoteTitle,
      editorMarkdownContent,
      setEditorMarkdownContent,
    }),
    [noteTitle, setNoteTitle, editorMarkdownContent, setEditorMarkdownContent]
  )

  return <EditNoteContext.Provider value={values}>{children}</EditNoteContext.Provider>
}

export const useEditNoteContext = () => {
  const values = useContext(EditNoteContext)

  if (values == null) {
    throw new Error('EditNoteProvider 내에서 사용해주세요.')
  }

  return values
}
