'use client'

import { useCallback, useEffect, useState } from 'react'
import { RECENT_SEARCHES } from '../config'

/**
 * 최근 검색어를 관리하는 커스텀 훅
 */
export const useRecentSearches = () => {
  const [searches, setSearches] = useState<string[]>([])

  // localStorage에서 검색어 가져오기
  const getRecentSearches = useCallback(() => {
    try {
      const storageSearches = localStorage.getItem(RECENT_SEARCHES)
      if (storageSearches) {
        const parsedSearches = JSON.parse(storageSearches) as { recentSearches: string[] }
        return parsedSearches.recentSearches || []
      }
    } catch (error) {
      console.error('Failed to parse recent searches:', error)
    }
    return []
  }, [])

  // 검색어 저장
  const saveRecentSearches = useCallback(
    (keyword: string) => {
      if (!keyword || keyword.trim() === '') return

      const prevSearches = getRecentSearches()

      let newSearchList = prevSearches.filter((search) => search !== keyword)
      newSearchList.unshift(keyword)

      if (newSearchList.length > 5) {
        newSearchList = newSearchList.slice(0, 5)
      }

      const newSearches = { recentSearches: [...newSearchList] }
      localStorage.setItem(RECENT_SEARCHES, JSON.stringify(newSearches))
      setSearches(newSearchList) // 상태 업데이트
    },
    [getRecentSearches]
  )

  // 특정 검색어 삭제
  const deleteRecentSearch = useCallback(
    (keyword: string) => {
      const prevSearches = getRecentSearches()
      const newSearchList = prevSearches.filter((search) => search !== keyword)
      localStorage.setItem(RECENT_SEARCHES, JSON.stringify({ recentSearches: newSearchList }))
      setSearches(newSearchList) // 상태 업데이트
    },
    [getRecentSearches]
  )

  // 초기화
  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES)
    setSearches([])
  }, [])

  useEffect(() => {
    setSearches(getRecentSearches())
  }, [getRecentSearches])

  return {
    searches,
    saveRecentSearches,
    deleteRecentSearch,
    clearRecentSearches,
  }
}
