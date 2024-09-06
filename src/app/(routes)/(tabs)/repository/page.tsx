'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { searchDocument } from '@/actions/fetchers/document/search-document'
import { LOCAL_KEY } from '@/constants/local-key'
import ViewRepository from '@/views/repository'

export default function Repository() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const term = useSearchParams().get('term')

  const { data: searchData } = useQuery({
    queryKey: ['search-document', term],
    queryFn: () =>
      searchDocument({
        term: term!,
      }),
    enabled: term != null,
  })

  const handleSubmit = (data: { term: string }, options?: { isResearch: boolean }) => {
    const trimTerm = data.term.trim()

    if (trimTerm === '') return

    const localItem = localStorage.getItem(LOCAL_KEY.SEARCH_DOCUMENT)
    const prevRecentTerms = localItem
      ? (JSON.parse(localItem) as unknown as string[])
      : ([] as string[])

    localStorage.setItem(
      LOCAL_KEY.SEARCH_DOCUMENT,
      JSON.stringify([trimTerm, ...prevRecentTerms].slice(0, 5))
    )

    if (options?.isResearch) {
      router.replace(`${pathname}/?term=${trimTerm}`)
      return
    }
    router.push(`${pathname}/?term=${trimTerm}`)
  }

  return (
    <>
      <ViewRepository
        searchData={searchData}
        term={term}
        session={session}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
