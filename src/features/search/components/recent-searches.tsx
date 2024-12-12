'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { RefObject } from 'react'
import { useRecentSearches } from '../hooks/use-recent-searches'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  onUpdateKeyword: (keyword: string) => void
}

const RecentSearches = ({ containerRef, onUpdateKeyword }: Props) => {
  const { recentSearches, deleteRecentSearch, deleteAllRecentSearches } = useRecentSearches()

  return (
    <div
      ref={containerRef}
      className="flex flex-col border-t border-border-divider px-[16px] py-[20px]"
    >
      <div className="mb-[14px] flex items-center justify-between text-text1-medium">
        <Text typography="text1-bold" className="text-text-secondary">
          최근 검색어
        </Text>
        <button className="text-text-caption" onClick={deleteAllRecentSearches}>
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
                deleteRecentSearch(keyword)
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
