export const isPwaInstalled = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(display-mode: standalone)').matches
  }
  return false
}
