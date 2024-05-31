'use client'

import { useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { VisualEditor } from './editor'
import { createDocument } from '@/apis/fetchers/document/create-document'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useCreateDocumentContext } from '../contexts/create-document-context'

interface Props {}

export default function CreateDocumentForm({}: Props) {
  const { selectedCategoryId, documentName } = useCreateDocumentContext()

  const visual = useRemirror({
    extensions,
    stringHandler: 'markdown',
    content: '**Markdown** content is the _best_',
  })
  const editorContent = visual.state as unknown as string
  const { mutateAsync } = useMutation({
    mutationFn: createDocument,
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!selectedCategoryId) return
        if (!documentName || !editorContent) return
        const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
        const file = new File([documentBlob], `${documentName}.md`, { type: 'text/markdown' })

        await mutateAsync({
          accessToken: 'asd' || '',
          documentName: documentName,
          file,
          categoryId: selectedCategoryId,
        })
      }}
    >
      <VisualEditor visual={visual} />

      <Button>문서 생성하기</Button>
    </form>
  )
}
