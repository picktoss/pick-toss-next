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
