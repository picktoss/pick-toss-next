import Cookies from 'js-cookie'

export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error)
  }
}

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage`, error)
    return null
  }
}

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage`, error)
  }
}

export const clearAllCookies = () => {
  const cookies = Cookies.get() // 현재 설정된 모든 쿠키 가져오기

  for (const name in cookies) {
    Cookies.remove(name, { path: '/' }) // ✅ 모든 쿠키 삭제
    Cookies.remove(name, { path: '/', domain: window.location.hostname }) // ✅ 도메인 설정된 쿠키 삭제
  }
}
