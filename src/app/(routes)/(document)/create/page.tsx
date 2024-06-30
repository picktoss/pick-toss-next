'use client'

import Loading from '@/components/loading'
import dynamic from 'next/dynamic'
import { CreateDocumentProvider } from './contexts/create-document-context'
import { Header } from './components/header'
import { TitleInput } from './components/title-input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useGetCategoriesQuery } from '@/apis/fetchers/category/get-categories/query'
import { useCreateDocumentMutation } from '@/apis/fetchers/document/create-document/mutation'
import { MAX_CONTENT_LENGTH, MIN_CONTENT_LENGTH } from '@/constants/document'

const VisualEditor = dynamic(() => import('./components/visual-editor'), {
  ssr: false,
  loading: () => <Loading center />,
})

export default function CreateDocument() {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const { data: categories } = useGetCategoriesQuery()

  const { mutateAsync } = useCreateDocumentMutation()

  const handleSubmit = async ({
    categoryId,
    documentName,
    editorContent,
  }: {
    categoryId: number
    documentName: string
    editorContent: string
  }) => {
    if (isLoading || !categoryId || !documentName || !editorContent) {
      return
    }
    if (editorContent.length < MIN_CONTENT_LENGTH) {
      alert('최소 150자 이상의 본문을 입력해주세요.')
      return
    } else if (editorContent.length > MAX_CONTENT_LENGTH) {
      alert('본문의 길이는 15,000자를 넘길 수 없습니다.')
      return
    }

    setIsLoading(true)

    const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
    const file = new File([documentBlob], `${documentName}.md`, { type: 'text/markdown' })

    await mutateAsync(
      {
        documentName: documentName,
        file,
        categoryId,
      },
      {
        onSuccess: (data) => {
          toast({ description: '노트가 등록되었습니다' })
          router.push(`/document/${data.id}`)
        },
      }
    )
  }

  if (!categories) {
    return null
  }

  return (
    <CreateDocumentProvider initCategoryId={categories[0].id}>
      <Header categories={categories} handleSubmit={handleSubmit} />
      <div className="mt-[22px] min-h-screen rounded-t-[20px] bg-white shadow-sm">
        <TitleInput />
        <VisualEditor />
      </div>
      {isLoading && <Loading center />}
    </CreateDocumentProvider>
  )
}
