'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface EditDocumentContextValues {
  documentTitle: string
  setDocumentTitle: (title: string) => void
  editorMarkdownContent: string
  setEditorMarkdownContent: (markdown: string) => void
}

const EditDocumentContext = createContext<EditDocumentContextValues | null>(null)

interface Props extends PropsWithChildren {
  prevTitle?: string
  prevContent?: string
}

export function EditDocumentProvider({ children, prevTitle, prevContent }: Props) {
  const [documentTitle, setDocumentTitle] = useState(prevTitle ?? '')
  const [editorMarkdownContent, setEditorMarkdownContent] = useState(prevContent ?? '')

  const values = useMemo(
    () => ({
      documentTitle,
      setDocumentTitle,
      editorMarkdownContent,
      setEditorMarkdownContent,
    }),
    [documentTitle, setDocumentTitle, editorMarkdownContent, setEditorMarkdownContent]
  )

  return <EditDocumentContext.Provider value={values}>{children}</EditDocumentContext.Provider>
}

export const useEditDocumentContext = () => {
  const values = useContext(EditDocumentContext)

  if (values == null) {
    throw new Error('EditDocumentProvider 내에서 사용해주세요.')
  }

  return values
}
