'use client'

import { Input } from '@/components/ui/input'
import { useRemirror } from '@remirror/react'
import { extensions } from '../libs/extensions'
import { VisualEditor } from './editor'
import { useState } from 'react'
import { createDocument } from '@/apis/fetchers/document/create-document'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getCategories } from '@/apis/fetchers/category/get-categories'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CreateDocumentForm() {
  const session = useSession()

  const queryClient = useQueryClient()

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({ accessToken: session.data?.user.accessToken || '' }).then(
        (res) => res.categories
      ),
    enabled: !!session,
  })

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
        if (!selectedCategoryId) return
        if (!title || !editorContent) return
        const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
        const file = new File([documentBlob], `${title}.md`, { type: 'text/markdown' })

        await mutateAsync({
          accessToken: session.data?.user.accessToken || '',
          documentName: title,
          file,
          categoryId: selectedCategoryId,
        })
        await queryClient.invalidateQueries({ queryKey: ['categories'] })
      }}
    >
      <Input
        name="documentName"
        placeholder="제목 추가"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <VisualEditor visual={visual} />
      <div>
        <div>카테고리 목록</div>
        <select
          onChange={(e) => {
            setSelectedCategoryId(Number(e.target.value))
          }}
        >
          <option>default</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div>선택된 카테고리 id: {selectedCategoryId}</div>
      </div>
      <Button>문서 생성하기</Button>
      <Link href="/repository">노트 창고로 이동하기</Link>
    </form>
  )
}
