'use client'

import { getCategories } from '@/apis/fetchers/category/get-categories'
import Loading from '@/components/loading'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { CreateDocumentProvider } from './contexts/create-document-context'
import { Header } from './components/header'
import { TitleInput } from './components/title-input'
import { createDocument } from '@/apis/fetchers/document/create-document'

const VisualEditor = dynamic(() => import('./components/visual-editor'), {
  ssr: false,
  loading: () => <Loading center />,
})

export default function CreateDocument() {
  const session = useSession()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({
        accessToken: session.data?.user.accessToken || '',
      }).then((res) => res.categories),
    enabled: !!session.data?.user.accessToken,
  })

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
    if (!categoryId) return
    if (!documentName || !editorContent) return
    const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
    const file = new File([documentBlob], `${documentName}.md`, { type: 'text/markdown' })

    await mutateAsync({
      accessToken: session.data?.user.accessToken || '',
      documentName: documentName,
      file,
      categoryId,
    })
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
    </CreateDocumentProvider>
  )
}
