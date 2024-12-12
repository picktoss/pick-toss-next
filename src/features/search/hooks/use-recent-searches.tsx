import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/shared/utils/storage'
import { useEffect, useState } from 'react'
import { RECENT_SEARCHES } from '../config'

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const storageSearches = getLocalStorage<string[]>(RECENT_SEARCHES) ?? []
    setRecentSearches(storageSearches)
  }, [])

  /** 로컬스토리지에서 특정 검색어 삭제 */
  const deleteRecentSearch = (keyword: string) => {
    const newRecentSearches = recentSearches.filter((search) => search !== keyword)
    setLocalStorage(RECENT_SEARCHES, newRecentSearches)
    setRecentSearches(newRecentSearches)
  }

  /** 전체 검색어 삭제 */
  const deleteAllRecentSearches = () => {
    removeLocalStorage(RECENT_SEARCHES)
    setRecentSearches([])
  }

  return {
    recentSearches,
    setRecentSearches,
    deleteRecentSearch,
    deleteAllRecentSearches,
  }
}
