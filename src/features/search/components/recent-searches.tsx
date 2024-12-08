'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { getRecentSearches } from '../utils'
import { RefObject, useEffect, useState } from 'react'
import { RECENT_SEARCHES } from '../config'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  onUpdateKeyword: (keyword: string) => void
  // recentSearches: string[]
  // handleDelete: (keyword: string) => void
  // handleClearAll: () => void
}

const RecentSearches = ({
  containerRef,
  onUpdateKeyword,
}: // recentSearches,
// handleDelete,
// handleClearAll,
Props) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const storageSearches = getRecentSearches()
    setRecentSearches(storageSearches)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('recentSearches changed: ', recentSearches)
  }, [recentSearches])

  const handleDelete = (keyword: string) => {
    const updatedSearches = recentSearches.filter((search) => search !== keyword)
    setRecentSearches(updatedSearches)
    localStorage.setItem(RECENT_SEARCHES, JSON.stringify(updatedSearches))
  }

  const handleClearAll = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES)
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col border-t border-border-divider px-[16px] py-[20px]"
    >
      <div className="mb-[14px] flex items-center justify-between text-text1-medium">
        <Text typography="text1-bold" className="text-text-secondary">
          최근 검색어
        </Text>
        <button className="text-text-caption" onClick={handleClearAll}>
          전체삭제
        </button>
      </div>

      <div className="flex flex-col">
        {recentSearches.map((keyword) => (
          <div
            key={keyword}
            onClick={() => onUpdateKeyword(keyword)}
            className="flex cursor-pointer items-center justify-between py-[10px]"
          >
            <Text typography="text1-medium">{keyword}</Text>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(keyword)
              }}
              className="text-icon-tertiary"
            >
              <Icon name="cancel" className="size-[16px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches
