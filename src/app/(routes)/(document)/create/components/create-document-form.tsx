'use client'

import { Input } from '@/components/ui/input'
import { useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { VisualEditor } from './editor'
import { useState } from 'react'
import { createDocument } from '@/apis/fetchers/document/create-document'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function CreateDocumentForm() {
  const session = useSession()

  const [title, setTitle] = useState('')
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

        if (!title || !editorContent) return
        const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
        const file = new File([documentBlob], `${title}.md`, { type: 'text/markdown' })
        const categoryId = '5'

        await mutateAsync({
          accessToken: session.data?.user.accessToken || '',
          userDocumentName: title,
          file,
          categoryId,
        })
      }}
    >
      <Input
        name="userDocumentName"
        placeholder="제목 추가"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <VisualEditor visual={visual} />
      <button>문서 생성하기</button>
    </form>
  )
}
