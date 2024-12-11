'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import RecentSearches from '../components/recent-searches'
import HeaderInDocument from '../components/header-in-document'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Loading from '@/shared/components/custom/loading'
import { RECENT_SEARCHES } from '../config'
import { getLocalStorage, setLocalStorage } from '@/shared/utils/storage'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import DocumentQuizSearchList from '../components/document-quiz-search-list'
import NoResults from './no-results'

// 퀴즈노트 탭 내 검색창 화면
const SearchInDocument = () => {
  usePreviousPath()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('keyword') || ''

  const [keyword, setKeyword] = useState(initialKeyword)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const { data, isPending } = useQuery(queries.document.search({ keyword: initialKeyword }))
  const searchResults = [...(data?.documents ?? []), ...(data?.quizzes ?? [])] as Partial<
    Document.SearchedDocument & Document.SearchedQuiz
  >[]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !searchInputRef.current?.contains(e.target as Node) &&
        !searchContainerRef.current?.contains(e.target as Node)
      ) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 검색 후 반영
  useEffect(() => {
    if (!initialKeyword) return

    const storageSearches = getLocalStorage<string[]>(RECENT_SEARCHES) ?? []
    const newSearches = [
      initialKeyword,
      ...storageSearches.filter((search) => search !== initialKeyword),
    ].slice(0, 5)
    setLocalStorage(RECENT_SEARCHES, newSearches)
  }, [initialKeyword])

  /** 최근 검색어 리스트에서 특정 검색어 클릭 시 검색창에 키워드가 반영되도록하는 함수 */
  const handleUpdateKeyword = (selectedKeyword: string) => {
    setKeyword(selectedKeyword)
    searchInputRef.current?.focus()
  }

  /** 검색창에 입력되어있는 키워드를 삭제하는 함수 */
  const handleDeleteKeyword = () => {
    setKeyword('')
    router.push('/document/search')
  }

  // 검색
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.')
      return
    }

    router.push(`?keyword=${keyword}`)
    searchInputRef.current?.blur()
    setIsSearchFocused(false)
  }

  return (
    <div>
      <HeaderInDocument
        inputValue={keyword}
        onChangeInputValue={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        onDeleteKeyword={handleDeleteKeyword}
        onSubmit={handleSubmit}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      <main>
        {/* input 클릭 시 나타날 최근 검색어 */}
        {isSearchFocused && (
          <RecentSearches containerRef={searchContainerRef} onUpdateKeyword={handleUpdateKeyword} />
        )}

        {isPending && <Loading center />}

        {!isSearchFocused &&
          // 검색 결과 X
          (!data || searchResults.length === 0 ? (
            <NoResults className="h-[calc(100dvh-56px)]" />
          ) : (
            // 검색 결과 O : 검색 결과 리스트
            data &&
            searchResults.length > 0 && (
              <div className="h-[calc(100dvh-56px)] overflow-y-auto text-text1-medium">
                <DocumentQuizSearchList
                  length={searchResults.length}
                  searchResults={searchResults}
                  keyword={initialKeyword}
                />
              </div>
            )
          ))}
      </main>
    </div>
  )
}

export default SearchInDocument
