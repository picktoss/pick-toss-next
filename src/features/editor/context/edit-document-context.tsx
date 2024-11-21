'use client'

import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

interface EditDocumentContextValues {
  documentTitle: string
  setDocumentTitle: (title: string) => void
  editorMarkdownContent: string
  setEditorMarkdownContent: (markdown: string) => void
}

const EditDocumentContext = createContext<EditDocumentContextValues | null>(null)

export function EditDocumentProvider({ children }: PropsWithChildren) {
  const [documentTitle, setDocumentTitle] = useState('')
  const [editorMarkdownContent, setEditorMarkdownContent] = useState('')

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
