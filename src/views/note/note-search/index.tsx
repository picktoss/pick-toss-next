'use client'

import Icon from '@/shared/components/icon'
import { Input } from '@/shared/components/ui/input'
// import Text from '@/shared/components/ui/text'
// import { cn } from '@/shared/lib/utils'
// import NoteTypeIcon from '../shared/note-type-icon'
import SearchItem from './components/search-item'
import SearchList from './components/search-list'
import { useEffect, useRef, useState } from 'react'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const Search = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
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
      <header
        ref={searchHeaderRef}
        className="flex-center relative right-1/2 z-20 h-[56px] w-full max-w-mobile grow translate-x-1/2  bg-background-base-01 px-[16px] text-subtitle2-medium"
      >
        <div tabIndex={-1} className="relative grow">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="노트명, 노트, 퀴즈 검색"
            className="h-[40px] placeholder:text-text-placeholder-01"
            variant={'round'}
            left={<Icon name="search-bar" className="size-[20px] text-icon-secondary" />}
            right={
              <button>
                <Icon
                  name="cancel-circle"
                  className="size-[24px]"
                  fill="var(--color-gray-100)"
                  stroke="var(--color-gray-300)"
                />
              </button>
            }
          />
        </div>
        <button
          onClick={() => {
            if (isSearchFocused) {
              setIsSearchFocused(false)
            } else router.back()
          }}
          className="ml-[17px] w-fit text-text-secondary"
        >
          취소
        </button>
      </header>

      <main ref={searchContainerRef}>
        {/* input 클릭 시 나타날 최근 검색어 */}
        {isSearchFocused && (
          <div className="flex flex-col border-t border-border-divider px-[16px] py-[20px]">
            <div className="mb-[24px] flex items-center justify-between text-text1-medium">
              <Text typography="text1-bold" className="text-text-secondary">
                최근 검색어
              </Text>
              <button className="text-text-caption">전체삭제</button>
            </div>

            <div className="flex flex-col gap-[20px]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <Text typography="text1-medium">최근 검색어 {idx}</Text>
                  <button className="text-icon-tertiary">
                    <Icon name="cancel" className="size-[16px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 검색 결과 O : 검색 결과 리스트 */}
        {!isSearchFocused && (
          <SearchList length={5}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <SearchItem
                key={idx}
                noteType={idx % 2 === 0 ? 'file' : 'write'}
                noteTitle="제무제표 분석하기"
                matchingSentence="...제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 기초 육류, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품..."
                resultType="note"
                noteFolder="전공 공부"
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

export default Search
