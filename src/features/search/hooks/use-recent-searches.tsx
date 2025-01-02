import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/shared/utils/storage'
import { useEffect, useState } from 'react'
import { LOCAL_KEY } from '@/constants'

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const storageSearches = getLocalStorage<string[]>(LOCAL_KEY.RECENT_SEARCHES) ?? []
    setRecentSearches(storageSearches)
  }, [])

  /** 로컬스토리지에서 특정 검색어 삭제 */
  const deleteRecentSearch = (keyword: string) => {
    const newRecentSearches = recentSearches.filter((search) => search !== keyword)
    setLocalStorage(LOCAL_KEY.RECENT_SEARCHES, newRecentSearches)
    setRecentSearches(newRecentSearches)
  }

  /** 전체 검색어 삭제 */
  const deleteAllRecentSearches = () => {
    removeLocalStorage(LOCAL_KEY.RECENT_SEARCHES)
    setRecentSearches([])
  }

  return {
    recentSearches,
    setRecentSearches,
    deleteRecentSearch,
    deleteAllRecentSearches,
  }
}
