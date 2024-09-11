'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LOCAL_KEY } from '@/constants/local-key'
import RenderSearchResult from './components/render-search-result'
import RenderRepository from './components/render-repository'
import { getLocalStorage, setLocalStorage } from '@/shared/utils/storage'

const Repository = () => {
  const router = useRouter()
  const pathname = usePathname()
  const term = useSearchParams().get('term') ?? null

  const handleSubmit = (data: { term: string }, options?: { isResearch: boolean }) => {
    const trimTerm = data.term.trim()

    if (trimTerm === '') return

    const localItem = getLocalStorage<string[]>(LOCAL_KEY.SEARCH_DOCUMENT)
    const prevRecentTerms = localItem ?? ([] as string[])

    setLocalStorage(LOCAL_KEY.SEARCH_DOCUMENT, [trimTerm, ...prevRecentTerms].slice(0, 5))

    if (options?.isResearch) {
      router.replace(`${pathname}/?term=${trimTerm}`)
      return
    }
    router.push(`${pathname}/?term=${trimTerm}`)
  }

  return term != null ? (
    <RenderSearchResult term={term} handleSubmit={handleSubmit} />
  ) : (
    <RenderRepository handleSubmit={handleSubmit} />
  )
}

export default Repository
