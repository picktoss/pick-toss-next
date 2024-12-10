'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { RefObject } from 'react'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  onUpdateKeyword: (keyword: string) => void
  searches: string[]
  onClearSearches: () => void
  onDeleteSearchItem: (keyword: string) => void
}

const RecentSearches = ({
  containerRef,
  onUpdateKeyword,
  searches,
  onClearSearches,
  onDeleteSearchItem,
}: Props) => {
  return (
    <div
      ref={containerRef}
      className="flex flex-col border-t border-border-divider px-[16px] py-[20px]"
    >
      <div className="mb-[14px] flex items-center justify-between text-text1-medium">
        <Text typography="text1-bold" className="text-text-secondary">
          최근 검색어
        </Text>
        <button className="text-text-caption" onClick={onClearSearches}>
          전체삭제
        </button>
      </div>

      <div className="flex flex-col">
        {searches.map((keyword) => (
          <div
            key={keyword}
            onClick={() => onUpdateKeyword(keyword)}
            className="flex cursor-pointer items-center justify-between py-[10px]"
          >
            <Text typography="text1-medium">{keyword}</Text>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteSearchItem(keyword)
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
