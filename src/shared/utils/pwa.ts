export const isAppLaunched = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(display-mode: standalone)').matches
  }
  return false
}

export const checkPWAAppLaunched = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('pwaInstalled') === 'true'
  }
}

export const setPWAAppLaunched = (launched: boolean) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('pwaInstalled', launched.toString())
  }
}
