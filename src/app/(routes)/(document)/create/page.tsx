'use client'

import Loading from '@/components/loading'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { CreateDocumentProvider } from './contexts/create-document-context'
import { Header } from './components/header'
import { TitleInput } from './components/title-input'
import { createDocument } from '@/apis/fetchers/document/create-document'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useGetCategories } from '@/apis/fetchers/category/get-categories/query'

const VisualEditor = dynamic(() => import('./components/visual-editor'), {
  ssr: false,
  loading: () => <Loading center />,
})

export default function CreateDocument() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const { data: categories } = useGetCategories()

  const { mutateAsync } = useMutation({
    mutationFn: createDocument,
  })

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
    setIsLoading(true)

    const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
    const file = new File([documentBlob], `${documentName}.md`, { type: 'text/markdown' })

    await mutateAsync(
      {
        accessToken: session?.user.accessToken || '',
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
