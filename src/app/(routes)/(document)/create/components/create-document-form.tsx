'use client'

import { Input } from '@/components/ui/input'
import { useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { VisualEditor } from './editor'
import { useState } from 'react'
import { createDocument } from '@/apis/fetchers/document/create-document'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCreateDocumentContext } from '../contexts/create-document-context'

interface Props {}

export default function CreateDocumentForm({}: Props) {
  const { selectedCategoryId } = useCreateDocumentContext()

  const [documentName, setDocumentName] = useState('')
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
      <Input
        name="documentName"
        placeholder="제목 추가"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      />
      <VisualEditor visual={visual} />

      <Button>문서 생성하기</Button>
      <Link href="/repository">노트 창고로 이동하기</Link>
    </form>
  )
}
