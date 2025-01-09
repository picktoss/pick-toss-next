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
  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
    // 모든 path와 domain에서 쿠키 삭제
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
  }
}
