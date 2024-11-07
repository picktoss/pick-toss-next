'use client'

import { useEffect, useRef, useState } from 'react'
import SearchList from '../components/search-list'
import SearchItem from '../components/search-item'
import RecentSearches from '../components/recent-searches'
import HeaderInDocument from '../components/header-in-document'

const SearchInDocument = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchHeaderRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !searchHeaderRef.current?.contains(e.target as Node) &&
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

  return (
    <>
      <HeaderInDocument
        searchHeaderRef={searchHeaderRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      <main ref={searchContainerRef}>
        {/* input 클릭 시 나타날 최근 검색어 */}
        {isSearchFocused && <RecentSearches />}

        {/* 검색 결과 O : 검색 결과 리스트 */}
        {!isSearchFocused && (
          <SearchList length={5}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <SearchItem
                key={idx}
                noteType={idx % 2 === 0 ? 'file' : 'write'}
                noteTitle="제무제표 분석하기"
                matchingSentence="...제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 기초 육류, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품..."
                resultType="document"
                noteDirectory="전공 공부"
                lastItem={idx === 4}
              />
            ))}
          </SearchList>
        )}

        {/* 검색 결과 X : 검색 결과 리스트 */}
        {/* <div className="h-[calc(100dvh-88px-56px)] flex-center flex-col">
          <Text typography="subtitle1-bold">검색결과가 없습니다</Text>
          <Text typography="text1-medium" className="text-text-sub">
            다른 키워드를 입력해보세요
          </Text>
        </div> */}
      </main>
    </>
  )
}

export default SearchInDocument
