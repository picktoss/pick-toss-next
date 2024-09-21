/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'

interface EditDocumentContextValues {
  documentName: string
  changeDocumentName: (title: string) => void
  editorMarkdownContent: string
  changeMarkdownContent: (markdown: string) => void
}

const EditDocumentContext = createContext<EditDocumentContextValues | null>(null)

interface Props extends PropsWithChildren {
  prevTitle: string
  prevContent: string
}

export function EditDocumentProvider({ children, prevTitle, prevContent }: Props) {
  const [documentName, setDocumentName] = useState(prevTitle)
  const [editorMarkdownContent, setEditorMarkdownContent] = useState(prevContent)

  const changeDocumentName = useCallback((title: string) => {
    setDocumentName(title)
  }, [])

  const changeMarkdownContent = useCallback((markdown: string) => {
    setEditorMarkdownContent(markdown)
  }, [])

  const values = useMemo(
    () => ({
      documentName,
      changeDocumentName,
      editorMarkdownContent,
      changeMarkdownContent,
    }),
    [documentName, changeDocumentName, editorMarkdownContent, changeMarkdownContent]
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
