'use client'

import { getCategories } from '@/apis/fetchers/category/get-categories'
import Loading from '@/components/loading'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { CreateDocumentProvider } from './contexts/create-document-context'
import { Header } from './components/header'
import { TitleInput } from './components/title-input'

const CreateDocumentForm = dynamic(() => import('./components/create-document-form'), {
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

  if (!categories) {
    return null
  }

  return (
    <CreateDocumentProvider initCategoryId={categories[0].id}>
      <Header categories={categories} />
      <TitleInput />
      <CreateDocumentForm />
    </CreateDocumentProvider>
  )
}
